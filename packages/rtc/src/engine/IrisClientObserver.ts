import * as NATIVE_RTC from '@iris/native-rtc-binding';
import { ILocalTrack, IMicrophoneAudioTrack } from 'agora-rtc-sdk-ng';

import { IrisAudioSourceType } from '../base/BaseType';
import {
  IrisTrackEventHandler,
  IrisTrackEventHandlerParam,
} from '../event_handler/IrisTrackEventHandler';

import { AgoraConsole } from '../util';

import { IrisClient } from './IrisClient';
import {
  AudioTrackPackage,
  BufferSourceAudioTrackPackage,
  RemoteUserPackage,
  TrackPackage,
  VideoTrackPackage,
} from './IrisClientManager';
import { IrisRtcEngine } from './IrisRtcEngine';

export enum NotifyType {
  'PUBLISH_TRACK',
  'UNPUBLISH_TRACK',
  'ENABLE_TRACK',
  'UNABLE_TRACK',
  'UPDATE_TRACK',
}
export enum NotifyRemoteType {
  'SUBSCRIBE_VIDEO_TRACK',
  'SUBSCRIBE_AUDIO_TRACK',
  'UNSUBSCRIBE_VIDEO_TRACK',
  'UNSUBSCRIBE_AUDIO_TRACK',
}

export class IrisClientObserver {
  audioTrackPackageObservers: AudioTrackPackage[];
  videoTrackPackageObservers: VideoTrackPackage[];
  remoteUserPackageObservers: RemoteUserPackage[];
  _engine: IrisRtcEngine;

  constructor(engine: IrisRtcEngine) {
    this.audioTrackPackageObservers = [];
    this.videoTrackPackageObservers = [];
    this.remoteUserPackageObservers = [];
    this._engine = engine;
  }
  addAudioTrackPackageObserver(observer: AudioTrackPackage) {
    this.audioTrackPackageObservers.push(observer);
  }
  addVideoTrackPackageObserver(observer: VideoTrackPackage) {
    this.videoTrackPackageObservers.push(observer);
  }
  addRemoteUserPackageObserver(observer: RemoteUserPackage) {
    this.remoteUserPackageObservers.push(observer);
  }
  removeRemoteUserPackageObserver(observer: RemoteUserPackage) {
    this.remoteUserPackageObservers = this.remoteUserPackageObservers.filter(
      (item) => item !== observer
    );
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

  //根据每个irisClient的options,分配对应的轨道,如果irisClient的agoraRTCClient已经加入频道,则发布轨道
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
        if (options.publishCustomVideoTrack) {
          if (
            trackPackage.track &&
            trackPackage.type ===
              NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CUSTOM
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
      }
    }
  }

  async enableTrack(trackPackage: TrackPackage) {
    let track = trackPackage.track as ILocalTrack;
    if (!track?.enabled) {
      await this._engine.trackHelper.setEnabled(
        trackPackage.track as ILocalTrack,
        true
      );
    }
  }

  async unableTrack(trackPackage: TrackPackage) {
    let track = trackPackage.track as ILocalTrack;
    if (track?.enabled) {
      await this._engine.trackHelper.setEnabled(
        trackPackage.track as ILocalTrack,
        false
      );
    }
  }

  async stopTrack(trackPackage: TrackPackage) {
    let irisClientManager = this._engine.irisClientManager;
    try {
      if (!trackPackage.track) {
        return;
      }

      AgoraConsole.debug(`stopTrack ${trackPackage.track}`);
      //还没有分配给对应的irisClient时,track会放到engine.initialize创建的client
      let irisClient = trackPackage.irisClient;
      if (!trackPackage.irisClient) {
        irisClient = irisClientManager.irisClientList[0];
      }
      if (this._engine.implHelper.isAudio(trackPackage.type)) {
        await irisClientManager.processAudioTrackClose(
          trackPackage as AudioTrackPackage,
          irisClient.agoraRTCClient
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
          irisClientManager.removeLocalAudioTrackPackage(trackPackage);
          irisClient.removeLocalAudioTrack(trackPackage);
        }
      } else if (
        IrisAudioSourceType.kAudioSourceTypeBufferSourceAudio ===
        trackPackage.type
      ) {
        await irisClientManager.processBufferSourceAudioTrackClose(
          trackPackage as BufferSourceAudioTrackPackage,
          irisClient.agoraRTCClient
        );
        irisClient.removeLocalAudioTrack(trackPackage);
        irisClientManager.removeLocalAudioTrackPackage(trackPackage);
      } else if (this._engine.implHelper.isVideoCamera(trackPackage.type)) {
        await irisClientManager.processVideoTrackClose(
          trackPackage as VideoTrackPackage,
          irisClient?.agoraRTCClient
        );
      } else if (this._engine.implHelper.isScreenCapture(trackPackage.type)) {
        await irisClientManager.processVideoTrackClose(
          trackPackage as VideoTrackPackage,
          irisClient?.agoraRTCClient
        );
        this._engine.rtcEngineEventHandler.onLocalVideoStateChanged(
          trackPackage.type as NATIVE_RTC.VIDEO_SOURCE_TYPE,
          NATIVE_RTC.LOCAL_VIDEO_STREAM_STATE.LOCAL_VIDEO_STREAM_STATE_STOPPED,
          0
        );
        irisClientManager.removeLocalVideoTrackPackage(
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

  async notifyLocal(
    type: NotifyType,
    scopePackages: TrackPackage[],
    irisClientList?: IrisClient[]
  ) {
    for (let scopePackage of scopePackages) {
      switch (type) {
        case NotifyType.PUBLISH_TRACK:
          if (scopePackage) {
            await this.publishTrack(scopePackage, irisClientList);
          }
          break;
        case NotifyType.ENABLE_TRACK:
          if (scopePackage) {
            await this.enableTrack(scopePackage);
          }
          break;
        case NotifyType.UNABLE_TRACK:
          if (scopePackage) {
            await this.unableTrack(scopePackage);
          }
          break;

        case NotifyType.UNPUBLISH_TRACK:
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

  subscribeVideoTrack(userPackage: RemoteUserPackage) {
    let irisClient = this._engine.irisClientManager.getIrisClientByConnection(
      userPackage.connection
    );
    if (!irisClient) {
      return;
    }
    let autoSubscribeVideo: boolean =
      irisClient.irisClientVariables.autoSubscribeVideo;
    let enableVideo: boolean = this._engine.globalVariables.enabledVideo;
    if (enableVideo && autoSubscribeVideo && irisClient.agoraRTCClient) {
      let user = irisClient.agoraRTCClient.remoteUsers.find(
        (item) => item.uid === userPackage.uid
      );
      if (!user || !user.hasVideo) {
        return;
      }
      irisClient.agoraRTCClient.subscribe(user, 'video').then(() => {
        AgoraConsole.debug('onEventUserPublished subscribe video success');
        if (userPackage.element) {
          this._engine.trackHelper.play(user.videoTrack, userPackage.element);
        }
        let param: IrisTrackEventHandlerParam = {
          channelName: irisClient.agoraRTCClient.channelName,
          client: irisClient.agoraRTCClient,
          remoteUser: user,
          track: user.videoTrack,
          trackType: 'IRemoteVideoTrack',
        };
        let trackEventHandler = new IrisTrackEventHandler(param, this._engine);
        this._engine.irisClientManager.addTrackEventHandler(trackEventHandler);
      });
    }
  }
  subscribeAudioTrack(userPackage: RemoteUserPackage) {
    let irisClient = this._engine.irisClientManager.getIrisClientByConnection(
      userPackage.connection
    );
    if (!irisClient) {
      return;
    }
    let autoSubscribeAudio: boolean =
      irisClient.irisClientVariables.autoSubscribeAudio;
    let enableAudio: boolean = this._engine.globalVariables.enabledAudio;
    if (enableAudio && autoSubscribeAudio && irisClient.agoraRTCClient) {
      let user = irisClient.agoraRTCClient.remoteUsers.find(
        (item) => item.uid === userPackage.uid
      );
      if (!user || !user.hasAudio) {
        return;
      }
      irisClient.agoraRTCClient.subscribe(user, 'audio').then(() => {
        AgoraConsole.debug('onEventUserPublished subscribe audio success');
        this._engine.trackHelper.play(user.audioTrack);
        let param: IrisTrackEventHandlerParam = {
          channelName: irisClient.agoraRTCClient.channelName,
          client: irisClient.agoraRTCClient,
          remoteUser: user,
          track: user.audioTrack,
          trackType: 'IRemoteTrack',
        };
        let trackEventHandler = new IrisTrackEventHandler(param, this._engine);
        this._engine.irisClientManager.addTrackEventHandler(trackEventHandler);
      });
    }
  }

  unsubscribeVideoTrack(userPackage: RemoteUserPackage) {
    let irisClient = this._engine.irisClientManager.getIrisClientByConnection(
      userPackage.connection
    );
    if (irisClient?.agoraRTCClient) {
      let user = irisClient.agoraRTCClient.remoteUsers.find(
        (item) => item.uid === userPackage.uid
      );
      if (!user || !user.videoTrack) {
        return;
      }
      irisClient.agoraRTCClient.unsubscribe(user, 'video').then(() => {
        AgoraConsole.debug('onEventUserPublished unsubscribe video success');
        this._engine.irisClientManager.removetrackEventHandlerByRemoteUser(
          user,
          'video'
        );
      });
    }
  }

  unsubscribeAudioTrack(userPackage: RemoteUserPackage) {
    let irisClient = this._engine.irisClientManager.getIrisClientByConnection(
      userPackage.connection
    );
    if (irisClient?.agoraRTCClient) {
      let user = irisClient.agoraRTCClient.remoteUsers.find(
        (item) => item.uid === userPackage.uid
      );
      if (!user || !user.videoTrack) {
        return;
      }
      irisClient.agoraRTCClient.unsubscribe(user, 'audio').then(() => {
        AgoraConsole.debug('onEventUserPublished unsubscribe audio success');
        this._engine.irisClientManager.removetrackEventHandlerByRemoteUser(
          user,
          'audio'
        );
      });
    }
  }

  notifyRemote(type: NotifyRemoteType, scopePackages: RemoteUserPackage[]) {
    for (let scopePackage of scopePackages) {
      switch (type) {
        case NotifyRemoteType.SUBSCRIBE_VIDEO_TRACK:
          if (scopePackage) {
            this.subscribeVideoTrack(scopePackage);
          }
          break;
        case NotifyRemoteType.SUBSCRIBE_AUDIO_TRACK:
          if (scopePackage) {
            this.subscribeAudioTrack(scopePackage);
          }
          break;
        case NotifyRemoteType.UNSUBSCRIBE_AUDIO_TRACK:
          if (scopePackage) {
            this.unsubscribeAudioTrack(scopePackage);
          }
          break;
        case NotifyRemoteType.UNSUBSCRIBE_VIDEO_TRACK:
          if (scopePackage) {
            this.unsubscribeVideoTrack(scopePackage);
          }
          break;
      }
    }
  }

  release() {
    this.audioTrackPackageObservers = [];
    this.videoTrackPackageObservers = [];
    this.remoteUserPackageObservers = [];
  }
}
