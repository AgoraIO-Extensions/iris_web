import * as NATIVE_RTC from '@iris/native-rtc-binding';
import { ILocalTrack, IMicrophoneAudioTrack } from 'agora-rtc-sdk-ng';

import { IrisAudioSourceType } from '../base/BaseType';

import { AgoraConsole } from '../util';

import { IrisClient } from './IrisClient';
import {
  AudioTrackPackage,
  BufferSourceAudioTrackPackage,
  TrackPackage,
  VideoTrackPackage,
} from './IrisClientManager';
import { IrisRtcEngine } from './IrisRtcEngine';

export enum NotifyType {
  'START_TRACK',
  'STOP_TRACK',
  'UPDATE_TRACK',
}

export class IrisClientObserver {
  audioTrackPackageObservers: AudioTrackPackage[];
  videoTrackPackageObservers: VideoTrackPackage[];
  _engine: IrisRtcEngine;

  constructor(engine: IrisRtcEngine) {
    this.audioTrackPackageObservers = [];
    this.videoTrackPackageObservers = [];
    this._engine = engine;
  }
  addAudioTrackPackageObserver(observer: AudioTrackPackage) {
    this.audioTrackPackageObservers.push(observer);
  }
  addVideoTrackPackageObserver(observer: VideoTrackPackage) {
    this.videoTrackPackageObservers.push(observer);
  }
  removeAudioTrackPackageObserver(observer: AudioTrackPackage) {
    this.audioTrackPackageObservers = this.audioTrackPackageObservers.filter(
      (item) => item !== observer
    );
  }
  removeVideoTrackPackageObserver(observer: VideoTrackPackage) {
    this.videoTrackPackageObservers = this.videoTrackPackageObservers.filter(
      (item) => item !== observer
    );
  }

  async publishTrack(trackPackage: TrackPackage, irisClientList: IrisClient[]) {
    let publishTrack: ILocalTrack;
    let globalVariables = this._engine.globalVariables;
    for (let irisClient of irisClientList) {
      let options = irisClient.irisClientVariables;
      if (globalVariables.enabledAudio && globalVariables.enabledLocalAudio) {
        if (options.publishMicrophoneTrack) {
          if (
            trackPackage.track &&
            (trackPackage.type ===
              IrisAudioSourceType.kAudioSourceTypeMicrophonePrimary ||
              trackPackage.type ===
                IrisAudioSourceType.kAudioSourceTypeMicrophoneSecondary)
          ) {
            console.log(this._engine.irisClientManager.localAudioTrackPackages);
            this._engine.trackHelper.setMuted(
              trackPackage.track as IMicrophoneAudioTrack,
              false
            );
            publishTrack = trackPackage.track as ILocalTrack;
            irisClient.addLocalAudioTrack(trackPackage);
          }
        }
        if (options.publishScreenCaptureAudio) {
          if (
            trackPackage.track &&
            trackPackage.type ===
              IrisAudioSourceType.kAudioSourceTypeScreenCapture
          ) {
            publishTrack = trackPackage.track as ILocalTrack;
            irisClient.addLocalAudioTrack(trackPackage);
          }
        }
      }
      if (globalVariables.enabledVideo && globalVariables.enabledLocalVideo) {
        if (options.publishScreenCaptureVideo) {
          if (options.publishScreenTrack) {
            if (
              trackPackage.track &&
              trackPackage.type ===
                NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_SCREEN_PRIMARY
            ) {
              publishTrack = trackPackage.track as ILocalTrack;
              irisClient.setLocalVideoTrack(trackPackage);
            }
          }
          if (options.publishSecondaryScreenTrack) {
            if (
              trackPackage.track &&
              trackPackage.type ===
                NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_SCREEN_SECONDARY
            ) {
              publishTrack = trackPackage.track as ILocalTrack;
              irisClient.setLocalVideoTrack(trackPackage);
            }
          }
          if (options.publishThirdScreenTrack) {
            if (
              trackPackage.track &&
              trackPackage.type ===
                NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_SCREEN_THIRD
            ) {
              publishTrack = trackPackage.track as ILocalTrack;
              irisClient.setLocalVideoTrack(trackPackage);
            }
          }
          if (options.publishFourthScreenTrack) {
            if (
              trackPackage.track &&
              trackPackage.type ===
                NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_SCREEN_FOURTH
            ) {
              publishTrack = trackPackage.track as ILocalTrack;
              irisClient.setLocalVideoTrack(trackPackage);
            }
          }
        }
        if (options.publishCameraTrack) {
          if (
            trackPackage.track &&
            trackPackage.type ===
              NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA_PRIMARY
          ) {
            publishTrack = trackPackage.track as ILocalTrack;
            irisClient.setLocalVideoTrack(trackPackage);
          }
        }
        if (options.publishSecondaryCameraTrack) {
          if (
            trackPackage.track &&
            trackPackage.type ===
              NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA_SECONDARY
          ) {
            publishTrack = trackPackage.track as ILocalTrack;
            irisClient.setLocalVideoTrack(trackPackage);
          }
        }
        if (options.publishThirdCameraTrack) {
          if (
            trackPackage.track &&
            trackPackage.type ===
              NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA_THIRD
          ) {
            publishTrack = trackPackage.track as ILocalTrack;
            irisClient.setLocalVideoTrack(trackPackage);
          }
        }
        if (options.publishFourthCameraTrack) {
          if (
            trackPackage.track &&
            trackPackage.type ===
              NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA_FOURTH
          ) {
            publishTrack = trackPackage.track as ILocalTrack;
            irisClient.setLocalVideoTrack(trackPackage);
          }
        }
      }

      //发布轨道必须保证该client的options满足条件,并且client已经加入频道,并且该轨道没有被发布过
      if (irisClient.agoraRTCClient?.channelName) {
        for (let i = 0; i < irisClient.agoraRTCClient.localTracks.length; i++) {
          let localTrack = irisClient.agoraRTCClient.localTracks[i];
          if (localTrack === publishTrack) {
            publishTrack = null;
          }
        }
      } else {
        publishTrack = null;
      }
      // debugger;
      if (publishTrack) {
        if (!publishTrack.enabled) {
          await this._engine.trackHelper.setEnabled(publishTrack, true);
        }
        try {
          AgoraConsole.debug(`publishTrack ${publishTrack}`);
          await irisClient.agoraRTCClient.publish(publishTrack);
        } catch (reason) {
          AgoraConsole.error(reason);
        }
        console.log(this._engine.irisClientManager);
      }
    }
  }

  async stopTrack(trackPackage: TrackPackage) {
    try {
      if (!trackPackage.track) {
        return;
      }

      AgoraConsole.debug(`stopTrack ${trackPackage.track}`);
      //还没有分配给对应的irisClient时,track会放到mainClient,所以用mainClient处理
      let irisClient = trackPackage.irisClient;
      if (!trackPackage.irisClient) {
        irisClient = this._engine.irisClientManager.mainIrisClient;
      }
      if (this._engine.implHelper.isAudio(trackPackage.type)) {
        await irisClient.processAudioTrackClose(
          trackPackage as AudioTrackPackage
        );
        if (
          trackPackage.type ===
          IrisAudioSourceType.kAudioSourceTypeScreenCapture
        ) {
          this._engine.rtcEngineEventHandler.onLocalAudioStateChanged(
            NATIVE_RTC.LOCAL_AUDIO_STREAM_STATE
              .LOCAL_AUDIO_STREAM_STATE_STOPPED,
            0
          );
          this._engine.irisClientManager.removeLocalAudioTrackPackage(
            trackPackage
          );
          irisClient.removeLocalAudioTrack(trackPackage);
        }
      } else if (
        IrisAudioSourceType.kAudioSourceTypeBufferSourceAudio ===
        trackPackage.type
      ) {
        await irisClient.processBufferSourceAudioTrackClose(
          trackPackage as BufferSourceAudioTrackPackage
        );
        irisClient.removeLocalAudioTrack(trackPackage);
        this._engine.irisClientManager.removeLocalAudioTrackPackage(
          trackPackage
        );
      } else if (this._engine.implHelper.isVideoCamera(trackPackage.type)) {
        await irisClient.processVideoTrackClose(
          trackPackage as VideoTrackPackage
        );
      } else if (this._engine.implHelper.isScreenCapture(trackPackage.type)) {
        await irisClient.processVideoTrackClose(
          trackPackage as VideoTrackPackage
        );
        this._engine.rtcEngineEventHandler.onLocalVideoStateChanged(
          trackPackage.type as NATIVE_RTC.VIDEO_SOURCE_TYPE,
          NATIVE_RTC.LOCAL_VIDEO_STREAM_STATE.LOCAL_VIDEO_STREAM_STATE_STOPPED,
          0
        );
        this._engine.irisClientManager.removeLocalVideoTrackPackage(
          trackPackage as VideoTrackPackage
        );
        irisClient.clearLocalVideoTrack();
      } else {
      }
    } catch (reason) {
      AgoraConsole.error(reason);
      throw reason;
    }
  }

  async updateTrack(trackPackage: TrackPackage) {}

  async notify(
    type: NotifyType,
    scopePackages: TrackPackage[],
    irisClientList?: IrisClient[]
  ) {
    for (let scopePackage of scopePackages) {
      switch (type) {
        case NotifyType.START_TRACK:
          if (scopePackage) {
            await this.publishTrack(scopePackage, irisClientList);
          }
          break;
        case NotifyType.STOP_TRACK:
          if (scopePackage) {
            await this.stopTrack(scopePackage);
          }
          break;
        case NotifyType.UPDATE_TRACK:
          if (scopePackage) {
            await this.updateTrack(scopePackage);
          }
          break;
      }
    }
  }

  release() {
    this.audioTrackPackageObservers = [];
    this.videoTrackPackageObservers = [];
  }
}
