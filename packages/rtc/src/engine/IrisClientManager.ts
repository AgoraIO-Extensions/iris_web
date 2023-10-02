import * as NATIVE_RTC from '@iris/native-rtc-binding';
import {
  IAgoraRTCClient,
  IAgoraRTCRemoteUser,
  IBufferSourceAudioTrack,
  ILocalAudioTrack,
  ILocalTrack,
  ILocalVideoTrack,
  IMicrophoneAudioTrack,
  IRemoteAudioTrack,
  IRemoteVideoTrack,
  ITrack,
  UID,
} from 'agora-rtc-sdk-ng';

import {
  IRIS_VIDEO_PROCESS_ERR,
  IrisAudioSourceType,
  IrisVideoFrameBufferConfig,
  VideoParams,
  VideoViewHolder,
} from '../base/BaseType';
import { IrisTrackEventHandler } from '../event_handler/IrisTrackEventHandler';

import { AgoraConsole } from '../util';

import { IrisClient } from './IrisClient';
import { IrisClientObserver } from './IrisClientObserver';
import { IrisRtcEngine } from './IrisRtcEngine';

export type WalkILocalVideoPackageTrackFun = (track: VideoTrackPackage) => void;

export class VideoTrackPackage {
  element?: string;
  type?: NATIVE_RTC.VIDEO_SOURCE_TYPE | NATIVE_RTC.EXTERNAL_VIDEO_SOURCE_TYPE;
  track?: ILocalVideoTrack | IRemoteVideoTrack;
  isPreview: boolean = false;
  irisClient: IrisClient;

  constructor(
    element?: string,
    type?: NATIVE_RTC.VIDEO_SOURCE_TYPE | NATIVE_RTC.EXTERNAL_VIDEO_SOURCE_TYPE,
    track?: ILocalVideoTrack | IRemoteVideoTrack
  ) {
    this.element = element;
    this.type = type;
    this.track = track;
  }

  setPreview(isPreview: boolean) {
    this.isPreview = isPreview;
  }

  setIrisClient(irisClient: IrisClient) {
    this.irisClient = irisClient;
  }

  update({
    type = this.type,
    track = this.track,
    element = this.element,
  }: {
    type?: NATIVE_RTC.VIDEO_SOURCE_TYPE | NATIVE_RTC.EXTERNAL_VIDEO_SOURCE_TYPE;
    track?: ILocalVideoTrack | IRemoteVideoTrack;
    element?: string;
  }) {
    this.element = element;
    this.type = type;
    this.track = track;
  }

  dispose() {
    this.element = null;
    this.type = null;
    this.isPreview = false;
    try {
      if (this.track) {
        if (this.track.isPlaying) {
          this.track.stop();
        }
        if ((this.track as ILocalTrack).enabled) {
          (this.track as ILocalTrack).close();
        }
      }
    } catch {}
    this.track = null;
    this.irisClient = null;
  }
}

export class AudioTrackPackage {
  type: IrisAudioSourceType;
  track:
    | ILocalAudioTrack
    | IRemoteAudioTrack
    | IMicrophoneAudioTrack
    | ILocalTrack;
  irisClient: IrisClient;

  constructor(
    type?: IrisAudioSourceType,
    track?: ILocalAudioTrack | IRemoteAudioTrack
  ) {
    this.type = type;
    this.track = track;
  }

  setIrisClient(irisClient: IrisClient) {
    this.irisClient = irisClient;
  }

  update({
    type = this.type,
    track = this.track,
  }: {
    type?: IrisAudioSourceType;
    track?:
      | ILocalAudioTrack
      | IRemoteAudioTrack
      | IMicrophoneAudioTrack
      | ILocalTrack;
  }) {
    this.type = type;
    this.track = track;
  }

  dispose() {
    this.type = null;
    try {
      if (this.track) {
        if (this.track.isPlaying) {
          this.track.stop();
        }
        (this.track as ILocalTrack).close();
      }
    } catch {}
    this.irisClient = null;
    this.track = null;
  }
}

export class BufferSourceAudioTrackPackage extends AudioTrackPackage {
  soundId: number;
  type: IrisAudioSourceType;
  track: IBufferSourceAudioTrack;

  constructor(
    type?: IrisAudioSourceType,
    track?: IBufferSourceAudioTrack,
    soundId?: number
  ) {
    super();
    this.type = type;
    this.track = track;
    this.soundId = soundId;
  }
}

export type MultiAudioTrackPackage =
  | AudioTrackPackage
  | BufferSourceAudioTrackPackage;

export type TrackPackage =
  | AudioTrackPackage
  | BufferSourceAudioTrackPackage
  | VideoTrackPackage;

// 存放一堆东西的
export class IrisClientManager {
  private _engine: IrisRtcEngine = null;

  irisClientList: IrisClient[] = [];
  localVideoTrackPackages: VideoTrackPackage[] = [];
  localAudioTrackPackages: MultiAudioTrackPackage[] = [];
  irisClientObserver: IrisClientObserver;
  trackEventHandlers: Array<IrisTrackEventHandler> = new Array<
    IrisTrackEventHandler
  >();

  //all local tracks
  private _remoteVideoViewHolders: Array<VideoViewHolder> = new Array<
    VideoViewHolder
  >();

  constructor(engine: IrisRtcEngine) {
    this._engine = engine;
    this.irisClientObserver = new IrisClientObserver(engine);
  }

  addLocalVideoTrackPackage(videoTrackPackage: VideoTrackPackage) {
    this.localVideoTrackPackages.push(videoTrackPackage);
    this.irisClientObserver.addVideoTrackPackageObserver(videoTrackPackage);
  }

  removeLocalVideoTrackPackage(videoTrackPackage: VideoTrackPackage) {
    for (let i = 0; i < this.localVideoTrackPackages.length; i++) {
      let trackPackage = this.localVideoTrackPackages[i];
      if (
        trackPackage.track == videoTrackPackage.track &&
        trackPackage.type == trackPackage.type
      ) {
        this.localVideoTrackPackages.splice(i, 1);
        i--;
        this.irisClientObserver.removeVideoTrackPackageObserver(
          videoTrackPackage
        );
        videoTrackPackage.dispose();
        break;
      }
    }
  }

  getLocalVideoTrackPackageBySourceType(
    sourceType: NATIVE_RTC.VIDEO_SOURCE_TYPE | NATIVE_RTC.VIDEO_SOURCE_TYPE[]
  ): VideoTrackPackage[] {
    return this.localVideoTrackPackages.filter((trackPackage) => {
      if (Array.isArray(sourceType)) {
        for (let type of sourceType) {
          if (trackPackage.type == type) {
            return true;
          }
        }
      } else {
        return trackPackage.type == sourceType;
      }
    });
  }

  addLocalAudioTrackPackage(audioTrackPackage: MultiAudioTrackPackage) {
    this.localAudioTrackPackages.push(audioTrackPackage);
    this.irisClientObserver.addAudioTrackPackageObserver(audioTrackPackage);
  }

  getLocalAudioTrackPackageBySourceType(
    sourceType: IrisAudioSourceType | IrisAudioSourceType[]
  ): MultiAudioTrackPackage[] {
    return this.localAudioTrackPackages.filter((trackPackage) => {
      if (Array.isArray(sourceType)) {
        for (let type of sourceType) {
          if (trackPackage.type == type) {
            return true;
          }
        }
      } else {
        return trackPackage.type == sourceType;
      }
    });
  }

  removeLocalAudioTrackPackage(audioTrackPackage: MultiAudioTrackPackage) {
    for (let i = 0; i < this.localAudioTrackPackages.length; i++) {
      let trackPackage = this.localAudioTrackPackages[i];
      if (
        trackPackage.track == audioTrackPackage.track &&
        trackPackage.type == trackPackage.type
      ) {
        this.localAudioTrackPackages.splice(i, 1);
        i--;
        this.irisClientObserver.removeAudioTrackPackageObserver(
          audioTrackPackage
        );
        audioTrackPackage.dispose();

        break;
      }
    }
  }

  getRemoteVideoViewHolders(): Array<VideoViewHolder> {
    return this._remoteVideoViewHolders;
  }

  addOrUpdateRemoteVideoViewHolder(viewHolder: VideoViewHolder) {
    let item = this._remoteVideoViewHolders.find((value) => {
      return (
        value.uid == viewHolder.uid &&
        value.channelId == viewHolder.channelId &&
        value.type == viewHolder.type
      );
    });

    // Update the exist one
    if (item) {
      Object.assign(item, viewHolder);
      return;
    }

    this._remoteVideoViewHolders.push(viewHolder);
  }

  public getVideoFrame(uid: UID, channel_id: string): VideoParams {
    this._engine.irisClientManager.irisClientList.map((irisClient) => {
      //当存在于本地
      if (
        irisClient.agoraRTCClient.channelName == channel_id &&
        irisClient.agoraRTCClient.uid == uid
      ) {
        return {
          video_track: irisClient.videoTrackPackage.track,
          is_new_frame: true, //todo  how to know is a new frame
          process_err: IRIS_VIDEO_PROCESS_ERR.ERR_OK,
        };
      } else {
        if (irisClient.agoraRTCClient?.channelName == channel_id) {
          irisClient.agoraRTCClient.remoteUsers.map((remoteUser) => {
            if (
              remoteUser.uid == uid &&
              remoteUser.hasVideo &&
              remoteUser.videoTrack
            ) {
              return {
                video_track: remoteUser.videoTrack,
                is_new_frame: true, //todo  how to know is a new frame
                process_err: IRIS_VIDEO_PROCESS_ERR.ERR_OK,
              };
            }
          });
        }
      }
    });

    return null;
  }

  public getVideoFrameByConfig(
    config: IrisVideoFrameBufferConfig
  ): VideoParams {
    let uid = config.id;
    let channel_id = config.key;
    let type = config.type;

    this._engine.irisClientManager.irisClientList.map((irisClient) => {
      //当存在于本地
      if (irisClient.videoTrackPackage?.type == type) {
        return {
          video_track: irisClient.videoTrackPackage.track,
          is_new_frame: true, //todo  how to know is a new frame
          process_err: IRIS_VIDEO_PROCESS_ERR.ERR_OK,
        };
      } else {
        if (irisClient.agoraRTCClient?.channelName == channel_id) {
          irisClient.agoraRTCClient.remoteUsers.map((remoteUser) => {
            if (
              remoteUser.uid == uid &&
              remoteUser.hasVideo &&
              remoteUser.videoTrack
            ) {
              return {
                video_track: remoteUser.videoTrack,
                is_new_frame: true, //todo  how to know is a new frame
                process_err: IRIS_VIDEO_PROCESS_ERR.ERR_OK,
              };
            }
          });
        }
      }
    });

    return null;
  }

  getIrisClient() {
    if (this.irisClientList.length == 0) {
      this._engine.irisRtcErrorHandler.notInitialized();
    } else {
      return this.irisClientList[0];
    }
  }

  getIrisClientByConnection(
    connection: NATIVE_RTC.RtcConnection
  ): IrisClient | null {
    if (connection) {
      return this.irisClientList.filter((irisClient: IrisClient) => {
        if (
          irisClient.connection?.channelId == connection.channelId &&
          irisClient.connection?.localUid == connection.localUid
        ) {
          return irisClient;
        }
      })[0];
    } else {
      return this.getIrisClient();
    }
  }

  getScreenCaptureStatus(): boolean {
    let result = false;
    let videoTrackPackages = this.getLocalVideoTrackPackageBySourceType([
      NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_SCREEN_PRIMARY,
      NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_SCREEN_SECONDARY,
      NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_SCREEN_THIRD,
      NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_SCREEN_FOURTH,
    ]);
    videoTrackPackages.map((videoTrackPackage) => {
      if (videoTrackPackage.track) {
        result = true;
        return;
      }
    });
    return result;
  }

  addTrackEventHandler(trackEventHandler: IrisTrackEventHandler) {}

  removeTrackEventHandlerByTrack(track: ITrack) {
    for (let i = 0; i < this.trackEventHandlers.length; i++) {
      let trackEventHandler = this.trackEventHandlers[i];
      if (trackEventHandler.getTrack() == track) {
        trackEventHandler.release();
        this.trackEventHandlers.splice(i, 1);
        i--;
        break;
      }
    }
  }

  removetrackEventHandlerByRemoteUser(
    user: IAgoraRTCRemoteUser,
    mediaType: 'audio' | 'video' | 'all'
  ) {
    this.trackEventHandlers = this.trackEventHandlers.filter(
      (trackEventHandler: IrisTrackEventHandler) => {
        if (trackEventHandler.getRemoteUser() != user) return true;

        if (mediaType == 'all') {
          trackEventHandler.release();
          return false;
        }

        if (
          mediaType == 'audio' &&
          trackEventHandler.getTrackType() == 'IRemoteTrack'
        ) {
          trackEventHandler.release();
          return false;
        }

        if (
          mediaType == 'video' &&
          trackEventHandler.getTrackType() == 'IRemoteVideoTrack'
        ) {
          trackEventHandler.release();
          return false;
        }

        return true;
      }
    );
  }

  async processBufferSourceAudioTrackClose(
    bufferSourceAudioTrackPackage: BufferSourceAudioTrackPackage,
    agoraRTCClient: IAgoraRTCClient
  ) {
    let track = bufferSourceAudioTrackPackage.track;
    if (agoraRTCClient && agoraRTCClient.localTracks.indexOf(track) != -1) {
      try {
        await agoraRTCClient.unpublish(track);
        AgoraConsole.log('unpublish success');
      } catch (e) {
        this._engine.returnResult(false);
        throw e;
      }
    }

    //删除完毕后进行stop,close
    track.stopProcessAudioBuffer();
    track.close();

    this.removeTrackEventHandlerByTrack(track);
  }

  async processAudioTrackClose(
    audioTrackPackage: AudioTrackPackage,
    agoraRTCClient: IAgoraRTCClient
  ) {
    let audioTrack = audioTrackPackage.track as ILocalAudioTrack;
    if (
      agoraRTCClient &&
      agoraRTCClient.localTracks.indexOf(audioTrack) != -1
    ) {
      try {
        await agoraRTCClient.unpublish(audioTrack);
        AgoraConsole.log('unpublish success');
      } catch (e) {
        this._engine.returnResult(false);
        throw e;
      }
    }
    //删除完毕后进行stop
    if (audioTrack.isPlaying) {
      this._engine.trackHelper.stop(audioTrack);
    }
    if (!audioTrack.muted) {
      await this._engine.trackHelper.setEnabled(audioTrack, false);
    }
    this.removeTrackEventHandlerByTrack(audioTrack);
  }

  async processVideoTrackClose(
    videoTrackPackage: VideoTrackPackage,
    agoraRTCClient: IAgoraRTCClient
  ) {
    let videoTrack = videoTrackPackage.track as ILocalVideoTrack;
    if (
      agoraRTCClient &&
      agoraRTCClient.localTracks.indexOf(videoTrack) != -1
    ) {
      try {
        await agoraRTCClient.unpublish(videoTrack);
        AgoraConsole.log('unpublish success');
      } catch (e) {
        this._engine.returnResult(false);
        throw e;
      }
    }

    //如果isPreview是false则停止播放以及设置为不可用
    if (!videoTrackPackage.isPreview) {
      if (videoTrack.isPlaying) {
        this._engine.trackHelper.stop(videoTrack);
      }
      if (!videoTrack.muted) {
        await this._engine.trackHelper.setEnabled(videoTrack, false);
      }
    }
    this.removeTrackEventHandlerByTrack(videoTrack);
  }

  async release() {
    this._engine.clearIrisInterval();
    //销毁iris html element
    this._engine.irisElement.release();
    //释放所有

    this.localVideoTrackPackages.map((trackPackage) => {
      trackPackage.dispose();
    });
    this.localAudioTrackPackages.map((trackPackage) => {
      trackPackage.dispose();
    });

    for (let irisClient of this.irisClientList) {
      await irisClient.release();
    }

    //trackEvent
    this.trackEventHandlers.forEach((element) => {
      element.release();
    });

    //重置IrisClientManager状态
    this.irisClientList = [];
    this.localAudioTrackPackages = [];
    this.localVideoTrackPackages = [];
    this.trackEventHandlers = [];
    this.irisClientObserver.release();
  }
}
