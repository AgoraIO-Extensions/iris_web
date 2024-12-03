import * as NATIVE_RTC from '@iris/native-rtc';
import { ILocalTrack } from 'agora-rtc-sdk-ng';

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
  'MUTE_TRACK',
  'UNMUTE_TRACK',
  'REMOVE_TRACK',
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

  async publishTrack(trackPackage: TrackPackage, irisClientList: IrisClient[]) {
    const globalState = this._engine.globalState;
    if (!trackPackage.track) return;

    let track = trackPackage.track as ILocalTrack;

    for (const irisClient of irisClientList) {
      let needPublish: boolean = false;
      const options = irisClient.irisClientState;
      if (globalState.enabledAudio && globalState.enabledLocalAudio) {
        switch (trackPackage.type) {
          case IrisAudioSourceType.kAudioSourceTypeMicrophonePrimary:
          case IrisAudioSourceType.kAudioSourceTypeMicrophoneSecondary:
            if (options.publishMicrophoneTrack) {
              this._engine.trackHelper.setMuted(track, false);
              needPublish = true;
            }
            break;
          case IrisAudioSourceType.kAudioSourceTypeScreenCapture:
            if (options.publishScreenCaptureAudio) {
              needPublish = true;
            }
            break;
          case IrisAudioSourceType.kAudioSourceTypeBufferSourceAudio:
            needPublish = true;
            break;
        }
        if (needPublish) {
          irisClient.addLocalAudioTrack(trackPackage as AudioTrackPackage);
        }
      }

      if (globalState.enabledVideo && globalState.enabledLocalVideo) {
        switch (trackPackage.type) {
          case NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_SCREEN_PRIMARY:
            if (options.publishScreenTrack) {
              needPublish = true;
            }
            break;
          case NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_SCREEN_SECONDARY:
            if (options.publishSecondaryScreenTrack) {
              needPublish = true;
            }
            break;
          case NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_SCREEN_THIRD:
            if (options.publishThirdScreenTrack) {
              needPublish = true;
            }
            break;
          case NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_SCREEN_FOURTH:
            if (options.publishFourthScreenTrack) {
              needPublish = true;
            }
            break;
          case NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA_PRIMARY:
            if (options.publishCameraTrack) {
              needPublish = true;
            }
            break;
          case NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA_SECONDARY:
            if (options.publishSecondaryCameraTrack) {
              needPublish = true;
            }
            break;
          case NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA_THIRD:
            if (options.publishThirdCameraTrack) {
              needPublish = true;
            }
            break;
          case NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA_FOURTH:
            if (options.publishFourthCameraTrack) {
              needPublish = true;
            }
            break;
          case NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CUSTOM:
            if (options.publishCustomVideoTrack) {
              needPublish = true;
            }
            break;
        }
        if (needPublish) {
          irisClient.setLocalVideoTrack(trackPackage as VideoTrackPackage);
        }
      }

      if (
        needPublish &&
        irisClient.agoraRTCClient?.channelName &&
        !irisClient.agoraRTCClient.localTracks?.includes(track)
      ) {
        try {
          AgoraConsole.debug(`publishTrack ${track}`);
          await irisClient.agoraRTCClient!.publish(track);
        } catch (reason) {
          AgoraConsole.error(reason);
        }
      }
    }
  }

  async unpublishTrack(trackPackage: TrackPackage) {
    if (!trackPackage.track) {
      return;
    }

    let irisClient = trackPackage.irisClient;
    let track = trackPackage.track as ILocalTrack;
    if (!irisClient) {
      return;
    }
    let agoraRTCClient = irisClient.agoraRTCClient;
    if (agoraRTCClient?.localTracks?.includes(track)) {
      AgoraConsole.debug(`unpublishTrack ${track}`);
      await this._engine.clientHelper.unpublish(agoraRTCClient!, track);
    }
  }

  async muteTrack(trackPackage: TrackPackage) {
    let track = trackPackage.track as ILocalTrack;
    AgoraConsole.debug(`muteTrack ${track}`);
    if (!track?.muted) {
      await this._engine.trackHelper.setMuted(
        trackPackage.track as ILocalTrack,
        true
      );
    }
  }

  async unmuteTrack(trackPackage: TrackPackage) {
    let track = trackPackage.track as ILocalTrack;
    AgoraConsole.debug(`unmuteTrack ${track}`);
    if (track?.muted) {
      await this._engine.trackHelper.setMuted(
        trackPackage.track as ILocalTrack,
        false
      );
    }
  }

  async removeTrack(trackPackage: TrackPackage) {
    let irisClientManager = this._engine.irisClientManager;
    try {
      if (!trackPackage.track) {
        return;
      }

      AgoraConsole.debug(`removeTrack ${trackPackage.track}`);
      let irisClient = trackPackage.irisClient;
      if (!irisClient) {
        irisClient = irisClientManager.irisClientList[0];
      }
      this.unpublishTrack(trackPackage);
      if (this._engine.implHelper.isAudio(trackPackage.type!)) {
        await irisClientManager.processAudioTrackClose(
          trackPackage as AudioTrackPackage
        );
        this._engine.rtcEngineEventHandler.onLocalAudioStateChanged_f33d789(
          NATIVE_RTC.LOCAL_AUDIO_STREAM_STATE.LOCAL_AUDIO_STREAM_STATE_STOPPED,
          0
        );
        this._engine.rtcEngineEventHandler.onLocalAudioStateChanged_13b6c02(
          {
            localUid: irisClient.agoraRTCClient?.uid as number,
            channelId: irisClient.agoraRTCClient?.channelName,
          },
          NATIVE_RTC.LOCAL_AUDIO_STREAM_STATE.LOCAL_AUDIO_STREAM_STATE_STOPPED,
          0
        );
        irisClientManager.removeLocalAudioTrackPackage(
          trackPackage as AudioTrackPackage
        );
        irisClient.removeLocalAudioTrack(trackPackage as AudioTrackPackage);
      } else if (
        IrisAudioSourceType.kAudioSourceTypeBufferSourceAudio ===
        trackPackage.type
      ) {
        await irisClientManager.processBufferSourceAudioTrackClose(
          trackPackage as BufferSourceAudioTrackPackage
        );
        irisClient.removeLocalAudioTrack(trackPackage);
        irisClientManager.removeLocalAudioTrackPackage(trackPackage);
      } else if (this._engine.implHelper.isVideoCamera(trackPackage.type!)) {
        await irisClientManager.processVideoTrackClose(
          trackPackage as VideoTrackPackage
        );
      } else if (this._engine.implHelper.isScreenCapture(trackPackage.type!)) {
        await irisClientManager.processVideoTrackClose(
          trackPackage as VideoTrackPackage
        );
        this._engine.rtcEngineEventHandler.onLocalVideoStateChanged_a44228a(
          trackPackage.type as NATIVE_RTC.VIDEO_SOURCE_TYPE,
          NATIVE_RTC.LOCAL_VIDEO_STREAM_STATE.LOCAL_VIDEO_STREAM_STATE_STOPPED,
          0
        );
        irisClientManager.removeLocalVideoTrackPackage(
          trackPackage as VideoTrackPackage
        );
        irisClient.clearLocalVideoTrack();
      }
    } catch (reason) {
      AgoraConsole.error(reason);
      throw reason;
    }
  }

  async notifyLocal(
    type: NotifyType,
    scopePackages: TrackPackage[],
    irisClientList?: IrisClient[]
  ) {
    for (let scopePackage of scopePackages) {
      switch (type) {
        case NotifyType.PUBLISH_TRACK:
          if (scopePackage) {
            await this.publishTrack(
              scopePackage,
              irisClientList ?? this._engine.irisClientManager.irisClientList
            );
          }
          break;
        case NotifyType.MUTE_TRACK:
          if (scopePackage) {
            await this.muteTrack(scopePackage);
          }
          break;
        case NotifyType.UNMUTE_TRACK:
          if (scopePackage) {
            await this.unmuteTrack(scopePackage);
          }
          break;

        case NotifyType.UNPUBLISH_TRACK:
          if (scopePackage) {
            await this.unpublishTrack(scopePackage);
          }
          break;
        case NotifyType.REMOVE_TRACK:
          if (scopePackage) {
            await this.removeTrack(scopePackage);
          }
          break;
      }
    }
  }

  async subscribeVideoTrack(userPackage: RemoteUserPackage, force: boolean) {
    let irisClient = this._engine.irisClientManager.getIrisClientByConnection(
      userPackage.connection
    );
    if (!irisClient) {
      return;
    }
    let autoSubscribeVideo: boolean =
      irisClient.irisClientState.autoSubscribeVideo;
    let needSubscribe = autoSubscribeVideo || force;
    let enableVideo: boolean = this._engine.globalState.enabledVideo;
    if (enableVideo && needSubscribe && irisClient.agoraRTCClient) {
      let user = irisClient.agoraRTCClient.remoteUsers.find(
        (item) => item.uid === userPackage.uid
      );
      if (!user || !user.hasVideo) {
        return;
      }
      await irisClient.agoraRTCClient.subscribe(user, 'video').then(() => {
        AgoraConsole.debug('onEventUserPublished subscribe video success');
        // setup video maybe called before subscribe, so we need to play video here too
        if (userPackage.element) {
          this._engine.trackHelper.play(
            user!.videoTrack!,
            userPackage.element,
            userPackage.videoPlayerConfig
          );
        }
        let param: IrisTrackEventHandlerParam = {
          client: irisClient.agoraRTCClient,
          remoteUser: user!,
          track: user!.videoTrack!,
          trackType: 'IRemoteVideoTrack',
          videoSourceType: userPackage.videoSourceType,
        };
        let trackEventHandler = new IrisTrackEventHandler(param, this._engine);
        this._engine.irisClientManager.addTrackEventHandler(trackEventHandler);
      });
    }
  }
  async subscribeAudioTrack(userPackage: RemoteUserPackage, force: boolean) {
    let irisClient = this._engine.irisClientManager.getIrisClientByConnection(
      userPackage.connection
    );
    if (!irisClient) {
      return;
    }
    let autoSubscribeAudio: boolean =
      irisClient.irisClientState.autoSubscribeAudio;
    let needSubscribe = autoSubscribeAudio || force;
    let enableAudio: boolean = this._engine.globalState.enabledAudio;
    if (enableAudio && needSubscribe && irisClient.agoraRTCClient) {
      let user = irisClient.agoraRTCClient.remoteUsers.find(
        (item) => item.uid === userPackage.uid
      );
      if (!user || !user.hasAudio) {
        return;
      }
      await irisClient.agoraRTCClient.subscribe(user, 'audio').then(() => {
        AgoraConsole.debug('onEventUserPublished subscribe audio success');
        this._engine.trackHelper.play(user!.audioTrack!);
        let param: IrisTrackEventHandlerParam = {
          client: irisClient.agoraRTCClient,
          remoteUser: user!,
          track: user!.audioTrack!,
          trackType: 'IRemoteTrack',
          videoSourceType: userPackage.videoSourceType,
        };
        let trackEventHandler = new IrisTrackEventHandler(param, this._engine);
        this._engine.irisClientManager.addTrackEventHandler(trackEventHandler);
      });
    }
  }

  async unsubscribeVideoTrack(userPackage: RemoteUserPackage, force: boolean) {
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
      await irisClient.agoraRTCClient.unsubscribe(user, 'video').then(() => {
        AgoraConsole.debug('onEventUserPublished unsubscribe video success');
        this._engine.irisClientManager.removetrackEventHandlerByRemoteUser(
          user!,
          'video'
        );
      });
    }
  }

  async unsubscribeAudioTrack(userPackage: RemoteUserPackage, force: boolean) {
    let irisClient = this._engine.irisClientManager.getIrisClientByConnection(
      userPackage.connection
    );
    if (irisClient?.agoraRTCClient) {
      let user = irisClient.agoraRTCClient.remoteUsers.find(
        (item) => item.uid === userPackage.uid
      );
      if (!user || !user.audioTrack) {
        return;
      }
      await irisClient.agoraRTCClient.unsubscribe(user, 'audio').then(() => {
        AgoraConsole.debug('onEventUserPublished unsubscribe audio success');
        this._engine.irisClientManager.removetrackEventHandlerByRemoteUser(
          user!,
          'audio'
        );
      });
    }
  }

  async notifyRemote(
    type: NotifyRemoteType,
    scopePackages: RemoteUserPackage[],
    force: boolean = true
  ) {
    for (let scopePackage of scopePackages) {
      switch (type) {
        case NotifyRemoteType.SUBSCRIBE_VIDEO_TRACK:
          if (scopePackage) {
            await this.subscribeVideoTrack(scopePackage, force);
          }
          break;
        case NotifyRemoteType.SUBSCRIBE_AUDIO_TRACK:
          if (scopePackage) {
            await this.subscribeAudioTrack(scopePackage, force);
          }
          break;
        case NotifyRemoteType.UNSUBSCRIBE_AUDIO_TRACK:
          if (scopePackage) {
            await this.unsubscribeAudioTrack(scopePackage, force);
          }
          break;
        case NotifyRemoteType.UNSUBSCRIBE_VIDEO_TRACK:
          if (scopePackage) {
            await this.unsubscribeVideoTrack(scopePackage, force);
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
