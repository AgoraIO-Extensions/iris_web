import * as NATIVE_RTC from '@iris/native-rtc-binding';
import {
  IBufferSourceAudioTrack,
  ILocalAudioTrack,
  ILocalTrack,
  ILocalVideoTrack,
  IMicrophoneAudioTrack,
  IRemoteAudioTrack,
  IRemoteVideoTrack,
  UID,
} from 'agora-rtc-sdk-ng';

import {
  IRIS_VIDEO_PROCESS_ERR,
  IrisAudioSourceType,
  IrisVideoFrameBufferConfig,
  VideoParams,
  VideoViewHolder,
} from '../base/BaseType';

import { IrisClient, IrisClientType } from './IrisClient';
import { IrisClientObserver } from './IrisClientObserver';
import { IrisRtcEngine } from './IrisRtcEngine';

export type WalkILocalVideoPackageTrackFun = (track: VideoTrackPackage) => void;

export class ScreenTrack {
  videoTrack: VideoTrackPackage = new VideoTrackPackage();
  audioTrack: AudioTrackPackage = new AudioTrackPackage();

  dispose() {
    this.audioTrack.dispose();
    this.videoTrack.dispose();
  }
}

export class VideoTrackPackage {
  element?: string;
  type?: NATIVE_RTC.VIDEO_SOURCE_TYPE | NATIVE_RTC.EXTERNAL_VIDEO_SOURCE_TYPE;
  track?: ILocalVideoTrack | IRemoteVideoTrack;
  isPreview: boolean = false;

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

  update(
    type?: NATIVE_RTC.VIDEO_SOURCE_TYPE | NATIVE_RTC.EXTERNAL_VIDEO_SOURCE_TYPE,
    track?: ILocalVideoTrack | IRemoteVideoTrack,
    element?: string
  ) {
    if (element) {
      this.element = element;
    }
    if (type) {
      this.type = type;
    }
    if (track) {
      this.track = track;
    }
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
  }
}

export class AudioTrackPackage {
  type: IrisAudioSourceType;
  track: ILocalAudioTrack | IRemoteAudioTrack | IMicrophoneAudioTrack;

  constructor(
    type?: IrisAudioSourceType,
    track?: ILocalAudioTrack | IRemoteAudioTrack
  ) {
    this.type = type;
    this.track = track;
  }

  update(
    type?: IrisAudioSourceType,
    track?: ILocalAudioTrack | IRemoteAudioTrack
  ) {
    if (type) {
      this.type = type;
    }
    if (track) {
      this.track = track;
    }
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

// 存放一堆东西的
export class IrisClientManager {
  private _engine: IrisRtcEngine = null;

  irisClientList: IrisClient[] = [];
  mainIrisClient: IrisClient = null;
  localVideoTrackPackages: VideoTrackPackage[] = [];
  localAudioTrackPackages: MultiAudioTrackPackage[] = [];
  irisClientObserver: IrisClientObserver;

  //all local tracks
  private _remoteVideoViewHolders: Array<VideoViewHolder> = new Array<
    VideoViewHolder
  >();

  screenTrack: ScreenTrack = new ScreenTrack();

  constructor(engine: IrisRtcEngine) {
    this._engine = engine;
    this.irisClientObserver = new IrisClientObserver(engine);
  }

  getLocalVideoTrack(
    type: NATIVE_RTC.VIDEO_SOURCE_TYPE | NATIVE_RTC.EXTERNAL_VIDEO_SOURCE_TYPE,
    connection: NATIVE_RTC.RtcConnection
  ): VideoTrackPackage {
    this._engine.entitiesContainer.irisClientList.map((irisClient) => {
      if (
        irisClient.connection?.channelId == connection.channelId &&
        irisClient.connection?.localUid == connection.localUid
      ) {
        if (type == irisClient.localVideoTrack.type) {
          return irisClient.localVideoTrack;
        }
      }
    });
    return null;
  }

  getLocalAudioTrack(
    type: IrisAudioSourceType,
    connection: NATIVE_RTC.RtcConnection
  ): AudioTrackPackage {
    this._engine.entitiesContainer.irisClientList.map((irisClient) => {
      if (
        irisClient.connection?.channelId == connection.channelId &&
        irisClient.connection?.localUid == connection.localUid
      ) {
        for (let trackPack of irisClient.localAudioTracks) {
          if (trackPack.type == type) {
            return trackPack;
          }
        }
      }
    });
    return null;
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
      console.log(
        `addOrUpdateRemoteVideoViewHolder add to item: ${JSON.stringify(item)}`
      );
      if (viewHolder.element) {
        item.element = viewHolder.element;
      }

      if (viewHolder.type) {
        item.type = viewHolder.type;
      }

      if (viewHolder.channelId) {
        item.channelId = viewHolder.channelId;
      }

      if (viewHolder.uid) {
        item.uid = viewHolder.uid;
      }

      return;
    }

    console.log(
      `addOrUpdateRemoteVideoViewHolder add to item new: ${JSON.stringify(
        viewHolder
      )}`
    );

    this._remoteVideoViewHolders.push(viewHolder);
  }

  public getVideoFrame(uid: UID, channel_id: string): VideoParams {
    this._engine.entitiesContainer.irisClientList.map((irisClient) => {
      //当存在于本地
      if (
        irisClient.agoraRTCClient.channelName == channel_id &&
        irisClient.agoraRTCClient.uid == uid
      ) {
        return {
          video_track: irisClient.localVideoTrack.track,
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

    this._engine.entitiesContainer.irisClientList.map((irisClient) => {
      //当存在于本地
      if (irisClient.localVideoTrack?.type == type) {
        return {
          video_track: irisClient.localVideoTrack.track,
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

  setMainIrisClient(mainIrisClient: IrisClient) {
    this.mainIrisClient = mainIrisClient;
  }

  getIrisClient(connection?: NATIVE_RTC.RtcConnection): IrisClient | null {
    if (!connection) {
      return this.irisClientList.filter(
        (irisClient: IrisClient) =>
          irisClient.clientType === IrisClientType.MAIN
      )[0];
    } else {
      return this.irisClientList.filter((irisClient: IrisClient) => {
        if (
          irisClient.connection?.channelId == connection.channelId &&
          irisClient.connection?.localUid == connection.localUid
        ) {
          return irisClient;
        }
      })[0];
    }
  }

  getScreenCaptureStatus(): boolean {
    return (
      this.getLocalVideoTrackPackageBySourceType([
        NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_SCREEN_PRIMARY,
        NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_SCREEN_SECONDARY,
        NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_SCREEN_THIRD,
        NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_SCREEN_FOURTH,
      ]).length > 0
    );
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

    //重置IrisClientManager状态
    this.irisClientList = [];
    this.localAudioTrackPackages = [];
    this.localVideoTrackPackages = [];
    this.irisClientObserver.release();
    this.mainIrisClient = null;
  }
}
