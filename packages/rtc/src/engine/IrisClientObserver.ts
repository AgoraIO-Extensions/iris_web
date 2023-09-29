import * as NATIVE_RTC from '@iris/native-rtc-binding';
import { ILocalTrack, IMicrophoneAudioTrack } from 'agora-rtc-sdk-ng';

import { IrisAudioSourceType } from '../base/BaseType';

import { TrackHelper } from '../helper/TrackHelper';
import { ImplHelper } from '../impl/ImplHelper';

import { AgoraConsole } from '../util';

import { IrisClient } from './IrisClient';
import { AudioTrackPackage, VideoTrackPackage } from './IrisClientManager';
import { IrisRtcEngine } from './IrisRtcEngine';

export enum NotifyType {
  'PUBLISH',
  'UNPUBLISH',
}

export enum AudioTrackPackageObserverNotifyType {
  'PUBLISH',
  'UNPUBLISH',
}

export enum VideoTrackPackageObserverNotifyType {
  'PUBLISH',
  'UNPUBLISH',
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

  async publishTrack(trackPackage: any, irisClientList: IrisClient[]) {
    let publishTrack: ILocalTrack;
    let globalVariables = this._engine.globalVariables;
    irisClientList.map(async (irisClient: IrisClient) => {
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
            console.log(this._engine.entitiesContainer.localAudioTrackPackages);
            TrackHelper.setMuted(
              trackPackage.track as IMicrophoneAudioTrack,
              false
            );
            publishTrack = trackPackage.track;
            irisClient.addLocalAudioTrack(trackPackage);
          }
        }
        if (options.publishScreenCaptureAudio) {
          if (
            trackPackage.track &&
            trackPackage.type ===
              IrisAudioSourceType.kAudioSourceTypeScreenCapture
          ) {
            publishTrack = trackPackage.track;
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
              publishTrack = trackPackage.track;
              irisClient.setLocalVideoTrack(trackPackage);
            }
          }
          if (options.publishSecondaryScreenTrack) {
            if (
              trackPackage.track &&
              trackPackage.type ===
                NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_SCREEN_SECONDARY
            ) {
              publishTrack = trackPackage.track;
              irisClient.setLocalVideoTrack(trackPackage);
            }
          }
          if (options.publishThirdScreenTrack) {
            if (
              trackPackage.track &&
              trackPackage.type ===
                NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_SCREEN_THIRD
            ) {
              publishTrack = trackPackage.track;
              irisClient.setLocalVideoTrack(trackPackage);
            }
          }
          if (options.publishFourthScreenTrack) {
            if (
              trackPackage.track &&
              trackPackage.type ===
                NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_SCREEN_FOURTH
            ) {
              publishTrack = trackPackage.track;
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
            publishTrack = trackPackage.track;
            irisClient.setLocalVideoTrack(trackPackage);
          }
        }
        if (options.publishSecondaryCameraTrack) {
          if (
            trackPackage.track &&
            trackPackage.type ===
              NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA_SECONDARY
          ) {
            publishTrack = trackPackage.track;
            irisClient.setLocalVideoTrack(trackPackage);
          }
        }
        if (options.publishThirdCameraTrack) {
          if (
            trackPackage.track &&
            trackPackage.type ===
              NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA_THIRD
          ) {
            publishTrack = trackPackage.track;
            irisClient.setLocalVideoTrack(trackPackage);
          }
        }
        if (options.publishFourthCameraTrack) {
          if (
            trackPackage.track &&
            trackPackage.type ===
              NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA_FOURTH
          ) {
            publishTrack = trackPackage.track;
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

      if (publishTrack) {
        if (!publishTrack.enabled) {
          await publishTrack.setEnabled(true);
        }
        try {
          AgoraConsole.debug(`publishTrack ${publishTrack}`);
          await irisClient.agoraRTCClient.publish(publishTrack);
        } catch (reason) {
          AgoraConsole.error(reason);
        }
        // console.log(this._engine.entitiesContainer.localVideoTrackPackages);
      }
    });
  }

  async unpublishTrack(trackPackage: any, irisClientList: IrisClient[]) {
    irisClientList.map(async (irisClient: IrisClient) => {
      try {
        if (irisClient.agoraRTCClient?.channelName) {
          AgoraConsole.debug(`unpublishTrack ${trackPackage.track}`);
          if (ImplHelper.isAudio(trackPackage.type)) {
            await irisClient.processAudioTrackClose(trackPackage);
          } else if (
            IrisAudioSourceType.kAudioSourceTypeBufferSourceAudio ===
            trackPackage.type
          ) {
            await irisClient.processBufferSourceAudioTrackClose(trackPackage);
          } else if (ImplHelper.isVideoCamera(trackPackage.type)) {
            await irisClient.processVideoTrackClose(trackPackage);
          } else {
            // this._engine.entitiesContainer.removeLocalVideoTrackPackage(
            //   trackPackage
            // );
            // irisClient.clearLocalVideoTrack();
          }
        }
      } catch (reason) {
        AgoraConsole.error(reason);
        throw reason;
      }
    });
  }

  notify(type: NotifyType, scopePackage: any[], irisClientList: IrisClient[]) {
    scopePackage.forEach(async (item) => {
      switch (type) {
        case NotifyType.PUBLISH:
          await this.publishTrack(item, irisClientList);
          break;
        case NotifyType.UNPUBLISH:
          await this.unpublishTrack(item, irisClientList);
          break;
      }
    });
  }

  release() {
    this.audioTrackPackageObservers = [];
    this.videoTrackPackageObservers = [];
  }
}
