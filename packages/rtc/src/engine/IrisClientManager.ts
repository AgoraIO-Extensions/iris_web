import * as NATIVE_RTC from '@iris/native-rtc-binding';
import { UID } from 'agora-rtc-sdk-ng';

import {
  AudioTrackPackage,
  IRIS_VIDEO_PROCESS_ERR,
  IrisAudioSourceType,
  IrisVideoFrameBufferConfig,
  VideoParams,
  VideoTrackPackage,
  VideoViewHolder,
} from '../base/BaseType';

import { IrisClient, IrisClientType } from './IrisClient';
import { IrisRtcEngine } from './IrisRtcEngine';

export type WalkILocalVideoPackageTrackFun = (track: VideoTrackPackage) => void;

// 存放一堆东西的
export class IrisClientManager {
  private _engine: IrisRtcEngine = null;

  irisClientList: IrisClient[] = [];
  mainIrisClient: IrisClient = null;

  //all local tracks
  private _remoteVideoViewHolders: Array<VideoViewHolder> = new Array<
    VideoViewHolder
  >();

  constructor(engine: IrisRtcEngine) {
    this._engine = engine;
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

  getLocalVideoTracks(): Array<VideoTrackPackage> {
    let localVideoTracks: Array<VideoTrackPackage> = [];
    this.irisClientList.map((irisClient: IrisClient) => {
      localVideoTracks.push(irisClient.localVideoTrack);
    });
    return localVideoTracks;
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

  getLocalAudioTracks(): Array<AudioTrackPackage> {
    let localAudioTracks: Array<AudioTrackPackage> = [];
    this.irisClientList.map((irisClient: IrisClient) => {
      localAudioTracks = localAudioTracks.concat(irisClient.localAudioTracks);
    });
    return localAudioTracks;
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

  async release() {
    this._engine.clearIrisInterval();
    //销毁iris html element
    this._engine.irisElement.release();
    //释放所有
    for (let irisClient of this.irisClientList) {
      await irisClient.release();
    }
    //重置IrisClientManager状态
    this.irisClientList = [];
    this.mainIrisClient = null;
  }
}
