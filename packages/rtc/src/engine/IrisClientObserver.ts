import * as NATIVE_RTC from '@iris/native-rtc';
import { ILocalTrack, IMicrophoneAudioTrack, ITrack } from 'agora-rtc-sdk-ng';

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

  //根据每个irisClient的options,分配对应的轨道,如果irisClient的agoraRTCClient已经加入频道,则发布轨道
  async publishTrack(trackPackage: TrackPackage, irisClientList: IrisClient[]) {
    const globalState = this._engine.globalState;
    if (!trackPackage.track) return;

    let publishTrack: ILocalTrack | undefined = undefined;

    for (const irisClient of irisClientList) {
      const options = irisClient.irisClientState;

      if (globalState.enabledAudio && globalState.enabledLocalAudio) {
        switch (trackPackage.type) {
          case IrisAudioSourceType.kAudioSourceTypeMicrophonePrimary:
          case IrisAudioSourceType.kAudioSourceTypeMicrophoneSecondary:
            if (options.publishMicrophoneTrack) {
              this._engine.trackHelper.setMuted(
                trackPackage.track as IMicrophoneAudioTrack,
                false
              );
              publishTrack = trackPackage.track as ILocalTrack;
              irisClient.addLocalAudioTrack(trackPackage);
            }
            break;
          case IrisAudioSourceType.kAudioSourceTypeScreenCapture:
            if (options.publishScreenCaptureAudio) {
              publishTrack = trackPackage.track as ILocalTrack;
              irisClient.addLocalAudioTrack(trackPackage);
            }
            break;
          case IrisAudioSourceType.kAudioSourceTypeBufferSourceAudio:
            const bufferTrackPackage = trackPackage as BufferSourceAudioTrackPackage;
            if (
              bufferTrackPackage.needPublish &&
              !bufferTrackPackage.isPublished
            ) {
              publishTrack = trackPackage.track as ILocalTrack;
              irisClient.addLocalAudioTrack(trackPackage);
            }
            break;
        }
      }

      if (globalState.enabledVideo && globalState.enabledLocalVideo) {
        switch (trackPackage.type) {
          case NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_SCREEN_PRIMARY:
            if (options.publishScreenTrack) {
              publishTrack = trackPackage.track as ILocalTrack;
              irisClient.setLocalVideoTrack(trackPackage);
            }
            break;
          case NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_SCREEN_SECONDARY:
            if (options.publishSecondaryScreenTrack) {
              publishTrack = trackPackage.track as ILocalTrack;
              irisClient.setLocalVideoTrack(trackPackage);
            }
            break;
          case NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_SCREEN_THIRD:
            if (options.publishThirdScreenTrack) {
              publishTrack = trackPackage.track as ILocalTrack;
              irisClient.setLocalVideoTrack(trackPackage);
            }
            break;
          case NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_SCREEN_FOURTH:
            if (options.publishFourthScreenTrack) {
              publishTrack = trackPackage.track as ILocalTrack;
              irisClient.setLocalVideoTrack(trackPackage);
            }
            break;
          case NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA_PRIMARY:
            if (options.publishCameraTrack) {
              publishTrack = trackPackage.track as ILocalTrack;
              irisClient.setLocalVideoTrack(trackPackage);
            }
            break;
          case NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA_SECONDARY:
            if (options.publishSecondaryCameraTrack) {
              publishTrack = trackPackage.track as ILocalTrack;
              irisClient.setLocalVideoTrack(trackPackage);
            }
            break;
          case NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA_THIRD:
            if (options.publishThirdCameraTrack) {
              publishTrack = trackPackage.track as ILocalTrack;
              irisClient.setLocalVideoTrack(trackPackage);
            }
            break;
          case NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA_FOURTH:
            if (options.publishFourthCameraTrack) {
              publishTrack = trackPackage.track as ILocalTrack;
              irisClient.setLocalVideoTrack(trackPackage);
            }
            break;
          case NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CUSTOM:
            if (options.publishCustomVideoTrack) {
              publishTrack = trackPackage.track as ILocalTrack;
              irisClient.setLocalVideoTrack(trackPackage);
            }
            break;
        }
      }

      if (
        publishTrack &&
        irisClient.agoraRTCClient?.channelName &&
        !irisClient.agoraRTCClient.localTracks?.includes(publishTrack)
      ) {
        if (!publishTrack.enabled) {
          await this._engine.trackHelper.setEnabled(publishTrack, true);
        }

        try {
          AgoraConsole.debug(`publishTrack ${publishTrack}`);
          await irisClient.agoraRTCClient!.publish(publishTrack);
          if (
            trackPackage.type ===
            IrisAudioSourceType.kAudioSourceTypeBufferSourceAudio
          ) {
            (trackPackage as BufferSourceAudioTrackPackage).setIsPublished(
              true
            );
          }
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
    if (!irisClient) {
      return;
    }
    let agoraRTCClient = irisClient.agoraRTCClient;
    let track = trackPackage.track as ILocalTrack;
    if (agoraRTCClient?.localTracks?.indexOf(track) != -1) {
      AgoraConsole.debug(`unpublishTrack ${track}`);
      if (!track?.enabled) {
        await this._engine.clientHelper.unpublish(agoraRTCClient!, track);
      }
    }
  }

  async enableTrack(trackPackage: TrackPackage) {
    let track = trackPackage.track as ILocalTrack;
    AgoraConsole.debug(`enableTrack ${track}`);
    if (!track?.enabled) {
      await this._engine.trackHelper.setEnabled(
        trackPackage.track as ILocalTrack,
        true
      );
    }
  }

  async unableTrack(trackPackage: TrackPackage) {
    let track = trackPackage.track as ILocalTrack;
    AgoraConsole.debug(`unableTrack ${track}`);
    if (track?.enabled) {
      await this._engine.trackHelper.setEnabled(
        trackPackage.track as ILocalTrack,
        false
      );
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
        if (
          trackPackage.type ===
          IrisAudioSourceType.kAudioSourceTypeScreenCapture
        ) {
          this._engine.rtcEngineEventHandler.onLocalAudioStateChanged_f33d789(
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
            await this.publishTrack(scopePackage, irisClientList ?? []);
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
        case NotifyType.UPDATE_TRACK:
          if (scopePackage) {
            await this.updateTrack(scopePackage);
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

  subscribeVideoTrack(userPackage: RemoteUserPackage, force: boolean = false) {
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
      irisClient.agoraRTCClient.subscribe(user, 'video').then(() => {
        AgoraConsole.debug('onEventUserPublished subscribe video success');
        if (userPackage.element) {
          this._engine.trackHelper.play(
            user!.videoTrack as ITrack,
            userPackage.element
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
  subscribeAudioTrack(userPackage: RemoteUserPackage, force: boolean = false) {
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
      irisClient.agoraRTCClient.subscribe(user, 'audio').then(() => {
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

  unsubscribeVideoTrack(
    userPackage: RemoteUserPackage,
    force: boolean = false
  ) {
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
          user!,
          'video'
        );
      });
    }
  }

  unsubscribeAudioTrack(
    userPackage: RemoteUserPackage,
    force: boolean = false
  ) {
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
      irisClient.agoraRTCClient.unsubscribe(user, 'audio').then(() => {
        AgoraConsole.debug('onEventUserPublished unsubscribe audio success');
        this._engine.irisClientManager.removetrackEventHandlerByRemoteUser(
          user!,
          'audio'
        );
      });
    }
  }

  notifyRemote(
    type: NotifyRemoteType,
    scopePackages: RemoteUserPackage[],
    force: boolean = false
  ) {
    for (let scopePackage of scopePackages) {
      switch (type) {
        case NotifyRemoteType.SUBSCRIBE_VIDEO_TRACK:
          if (scopePackage) {
            this.subscribeVideoTrack(scopePackage, force);
          }
          break;
        case NotifyRemoteType.SUBSCRIBE_AUDIO_TRACK:
          if (scopePackage) {
            this.subscribeAudioTrack(scopePackage, force);
          }
          break;
        case NotifyRemoteType.UNSUBSCRIBE_AUDIO_TRACK:
          if (scopePackage) {
            this.unsubscribeAudioTrack(scopePackage, force);
          }
          break;
        case NotifyRemoteType.UNSUBSCRIBE_VIDEO_TRACK:
          if (scopePackage) {
            this.unsubscribeVideoTrack(scopePackage, force);
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
