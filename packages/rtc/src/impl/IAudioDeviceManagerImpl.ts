import * as NATIVE_RTC from '@iris/native-rtc';
import { ILocalAudioTrack, IMicrophoneAudioTrack } from 'agora-rtc-sdk-ng';
import { CallApiReturnType } from 'iris-web-core';

import { IrisAudioSourceType } from '../base/BaseType';

import { AudioTrackPackage } from '../engine/IrisClientManager';
import { NotifyType } from '../engine/IrisClientObserver';
import { IrisIntervalType, IrisRtcEngine } from '../engine/IrisRtcEngine';
import { AgoraConsole } from '../util';

//@ts-ignore
export class IAudioDeviceManagerImpl implements NATIVE_RTC.IAudioDeviceManager {
  private _engine: IrisRtcEngine;

  public constructor(engine: IrisRtcEngine) {
    this._engine = engine;
  }

  enumeratePlaybackDevices(): CallApiReturnType {
    let deviceList: MediaDeviceInfo[] = [];
    let process = async () => {
      try {
        deviceList = (await this._engine.implHelper.enumerateDevices())
          ?.playbackDevices;
      } catch (e) {
        AgoraConsole.log(e);
        return this._engine.returnResult(false);
      }
      return this._engine.returnResult(
        true,
        0,
        JSON.stringify({ result: deviceList })
      );
    };
    return this._engine.execute(process);
  }

  enumerateRecordingDevices(): CallApiReturnType {
    let deviceList: MediaDeviceInfo[] = [];
    let process = async () => {
      try {
        deviceList = (await this._engine.implHelper.enumerateDevices())
          ?.recordingDevices;
      } catch (e) {
        AgoraConsole.log(e);
        return this._engine.returnResult(false);
      }
      return this._engine.returnResult(
        true,
        0,
        JSON.stringify({ result: deviceList })
      );
    };
    return this._engine.execute(process);
  }

  setPlaybackDevice(deviceId: string): CallApiReturnType {
    let process = async () => {
      this._engine.globalState.playbackDeviceId = deviceId;

      this._engine.irisClientManager.irisClientList.forEach(
        async (irisClient) => {
          irisClient.agoraRTCClient?.remoteUsers.forEach(async (remoteUser) => {
            if (remoteUser.hasAudio && remoteUser.audioTrack) {
              await this._engine.trackHelper.setPlaybackDevice(
                remoteUser.audioTrack,
                deviceId
              );
            }
          });
        }
      );
      this._engine.irisClientManager.localAudioTrackPackages.map(
        async (audioTrackPackage) => {
          if (
            audioTrackPackage.track &&
            this._engine.implHelper.isAudio(audioTrackPackage.type)
          ) {
            await this._engine.trackHelper.setPlaybackDevice(
              audioTrackPackage.track as ILocalAudioTrack,
              deviceId
            );
          }
        }
      );

      return this._engine.returnResult();
    };
    return this._engine.execute(process);
  }

  getPlaybackDevice(): CallApiReturnType {
    let process = async () => {
      let list: MediaDeviceInfo[] = [];
      let deviceId = '';
      if (this._engine.globalState.playbackDeviceId) {
        deviceId = this._engine.globalState.playbackDeviceId;
      } else {
        try {
          list = await this._engine.globalState.AgoraRTC.getPlaybackDevices();
        } catch (e) {
          return this._engine.returnResult(false);
        }
        if (list && list.length > 0) {
          deviceId = list[0].deviceId;
        }
      }
      return this._engine.returnResult(
        true,
        0,
        JSON.stringify({
          result: NATIVE_RTC.ERROR_CODE_TYPE.ERR_OK,
          deviceId,
        })
      );
    };
    return this._engine.execute(process);
  }

  setRecordingDevice(deviceId: string): CallApiReturnType {
    let process = async () => {
      this._engine.globalState.recordingDeviceId = deviceId;

      for (let audioTrackPackage of this._engine.irisClientManager
        .localAudioTrackPackages) {
        if (audioTrackPackage.track) {
          if (
            audioTrackPackage.type ==
              IrisAudioSourceType.kAudioSourceTypeMicrophonePrimary ||
            audioTrackPackage.type ==
              IrisAudioSourceType.kAudioSourceTypeMicrophoneSecondary
          ) {
            await this._engine.trackHelper.setDevice(
              audioTrackPackage.track as IMicrophoneAudioTrack,
              deviceId
            );
          }
        }
      }

      return this._engine.returnResult();
    };
    return this._engine.execute(process);
  }

  getRecordingDevice(): CallApiReturnType {
    let process = async () => {
      let list: MediaDeviceInfo[] = [];
      let deviceId = '';
      if (this._engine.globalState.recordingDeviceId) {
        deviceId = this._engine.globalState.recordingDeviceId;
      } else {
        try {
          list = await this._engine.globalState.AgoraRTC.getMicrophones();
        } catch (e) {
          return this._engine.returnResult(false);
        }
        if (list && list.length > 0) {
          deviceId = list[0].deviceId;
        }
      }
      return this._engine.returnResult(
        true,
        0,
        JSON.stringify({
          result: NATIVE_RTC.ERROR_CODE_TYPE.ERR_OK,
          deviceId,
        })
      );
    };
    return this._engine.execute(process);
  }

  release(): CallApiReturnType {
    let process = async () => {
      let engine = this._engine;
      engine.globalState.playbackDevices = new Array();
      engine.globalState.recordingDevices = new Array();
      return this._engine.returnResult();
    };
    return this._engine.execute(process);
  }

  startAudioDeviceLoopbackTest(indicationInterval: number): CallApiReturnType {
    let fun = async () => {
      try {
        let audioTrack = await this._engine.implHelper.createMicrophoneAudioTrack(
          this._engine.irisClientManager.getIrisClient()
        );
        this._engine.irisClientManager.addLocalAudioTrackPackage(
          new AudioTrackPackage(
            IrisAudioSourceType.kAudioSourceTypeMicrophoneLoopbackTest,
            audioTrack
          )
        );
        await this._engine.trackHelper.setEnabled(
          audioTrack as ILocalAudioTrack,
          true
        );
        this._engine.trackHelper.play(audioTrack as ILocalAudioTrack);
        this._engine.addIrisInterval(
          IrisIntervalType.loopbackTest,
          setInterval(() => {
            this._engine.rtcEngineEventHandler.onAudioVolumeIndicationEx(
              this._engine.irisClientManager.getIrisClient().connection,
              [
                {
                  uid: 0,
                  volume: audioTrack.getVolumeLevel() * 100 * 2.55,
                },
              ],
              audioTrack.getVolumeLevel() > 0 ? 1 : 0,
              audioTrack.getVolumeLevel() * 100 * 2.55
            );
          }, indicationInterval),
          0
        );
      } catch (e) {
        AgoraConsole.log(e);
        return this._engine.returnResult(false);
      }
      return this._engine.returnResult();
    };
    return this._engine.execute(fun);
  }

  stopAudioDeviceLoopbackTest(): CallApiReturnType {
    let fun = async () => {
      try {
        await this._engine.irisClientManager.irisClientObserver.notifyLocal(
          NotifyType.REMOVE_TRACK,
          this._engine.irisClientManager.localAudioTrackPackages.filter(
            (item) =>
              item.type ==
              IrisAudioSourceType.kAudioSourceTypeMicrophoneLoopbackTest
          )
        );
        this._engine.removeIrisIntervalByType(IrisIntervalType.loopbackTest);
      } catch (e) {
        AgoraConsole.log(e);
        return this._engine.returnResult(false);
      }
      return this._engine.returnResult();
    };
    return this._engine.execute(fun);
  }
}
