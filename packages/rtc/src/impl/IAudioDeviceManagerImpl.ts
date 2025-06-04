import * as NATIVE_RTC from '@iris/native-rtc';
import { IMicrophoneAudioTrack } from 'agora-rtc-sdk-ng';
import { CallApiReturnType } from 'iris-web-core';

import { IrisAudioSourceType } from '../base/BaseType';

import { IrisRtcEngine } from '../engine/IrisRtcEngine';
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
}
