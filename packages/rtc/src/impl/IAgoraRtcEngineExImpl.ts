import * as NATIVE_RTC from '@iris/web-rtc';
import {
  IAgoraRTCClient,
  ILocalAudioTrack,
  ILocalVideoTrack,
} from 'agora-rtc-sdk-ng';
import {
  AsyncTaskType,
  CallApiReturnType,
  CallIrisApiResult,
} from 'iris-web-core';

import { IrisAudioSourceType, IrisClientType } from '../base/BaseType';

import { IrisRtcEngine } from '../engine/IrisRtcEngine';
import { IrisClientEventHandler } from '../event_handler/IrisClientEventHandler';

import { IrisTrackEventHandler } from '../event_handler/IrisTrackEventHandler';

import { Action } from '../util/AgoraActionQueue';
import { AgoraConsole } from '../util/AgoraConsole';

import { Container } from '../util/Container';

import { ImplHelper } from './ImplHelper';

export class IRtcEngineExImpl implements NATIVE_RTC.IRtcEngineEx {
  private _engine: IrisRtcEngine;

  public constructor(engine: IrisRtcEngine) {
    this._engine = engine;
  }

  putAction(action: Action) {
    this._engine.actionQueue.putAction(action);
  }

  private execute(task: AsyncTaskType): CallApiReturnType {
    return this._engine.executor.execute(task);
  }

  private returnResult(
    isSuccess: boolean = true,
    code: number = NATIVE_RTC.ERROR_CODE_TYPE.ERR_OK,
    data: string = '{"result": 0}'
  ): Promise<CallIrisApiResult> {
    if (!isSuccess) {
      code = -NATIVE_RTC.ERROR_CODE_TYPE.ERR_FAILED;
    }
    return Promise.resolve(new CallIrisApiResult(code, data));
  }

  enableContentInspectEx(
    enabled: boolean,
    config: NATIVE_RTC.ContentInspectConfig,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn('enableContentInspectEx not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }

  joinChannelEx(
    token: string,
    connection: NATIVE_RTC.RtcConnection,
    options: NATIVE_RTC.ChannelMediaOptions
  ): CallApiReturnType {
    let processJoinChannel = async (): Promise<CallIrisApiResult> => {
      //设置全局已经建立过连接
      this._engine.globalVariables.isConnected = true;

      let subClientVariables = this._engine.subClientVariables;
      let fullOptions = subClientVariables.mergeChannelMediaOptions(
        connection,
        options
      );
      fullOptions.token = token;

      let subClient: IAgoraRTCClient = ImplHelper.createSubClient(
        this._engine,
        connection
      );

      let audioSource = IrisAudioSourceType.kAudioSourceTypeUnknown;
      let videoSource = NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_UNKNOWN;
      let clientType = IrisClientType.kClientSub;

      if (options.publishMicrophoneTrack) {
        audioSource = IrisAudioSourceType.kAudioSourceTypeMicrophonePrimary;
      } else if (options.publishScreenCaptureAudio) {
        audioSource = IrisAudioSourceType.kAudioSourceTypeScreenPrimary;
      }
      if (options.publishCameraTrack) {
        videoSource = NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA_PRIMARY;
      } else if (options.publishSecondaryCameraTrack) {
        videoSource =
          NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA_SECONDARY;
      } else if (
        options.publishScreenTrack ||
        options.publishScreenCaptureVideo
      ) {
        videoSource = NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_SCREEN_PRIMARY;
      }

      //检查是否已经创建了屏幕共享的video track,如果没有则跳出
      if (
        !ImplHelper.getAudioAndVideoTrack(
          this._engine,
          audioSource,
          videoSource
        )[1]
      ) {
        console.log(1);
        AgoraConsole.log('screen share track not found, skip joinChannel call');
        return this.returnResult();
      }

      let entitiesContainer = this._engine.entitiesContainer;
      entitiesContainer.addSubClient(connection, subClient);
      let subClientEventHandler = new IrisClientEventHandler(
        subClient,
        IrisClientType.kClientSub,
        this._engine
      );
      entitiesContainer.addSubClientEventHandler(
        connection,
        subClientEventHandler
      );

      try {
        await subClient.join(
          this._engine.globalVariables.rtcEngineContext.appId,
          connection.channelId,
          token ? token : null,
          connection.localUid
        );
      } catch (reason) {
        AgoraConsole.error(reason);
        this._engine.rtcEngineEventHandler.onError(
          NATIVE_RTC.ERROR_CODE_TYPE.ERR_JOIN_CHANNEL_REJECTED,
          ''
        );
        this._engine.entitiesContainer.clearSubClientAll(connection);
        return this.returnResult(false);
      }

      this._engine.rtcEngineEventHandler.onJoinChannelSuccessEx(connection, 0);
      let trackArray: [ILocalAudioTrack, ILocalVideoTrack] = [null, null];
      try {
        trackArray = await ImplHelper.getOrCreateAudioAndVideoTrackAsync(
          this._engine,
          audioSource,
          videoSource,
          clientType,
          connection
        );
      } catch (e) {
        AgoraConsole.error(e);
        return this.returnResult(false);
      }

      // 推送audioTrack
      let audioTrack: ILocalAudioTrack = trackArray[0] as ILocalAudioTrack;
      if (audioTrack) {
        try {
          await subClient.publish(audioTrack);
        } catch (reason) {
          AgoraConsole.error(reason);
        }
        entitiesContainer.addSubClientLocalAudioTrack(connection, {
          type: audioSource,
          track: audioTrack,
        });
        let trackEventHandler: IrisTrackEventHandler = new IrisTrackEventHandler(
          {
            channelName: connection.channelId,
            client: subClient,
            track: audioTrack,
            trackType: 'ILocalTrack',
          },
          this._engine
        );
        entitiesContainer.addSubClientTrackEventHandler(
          connection,
          trackEventHandler
        );
      }

      //推送videoTrack
      let videoTrack: ILocalVideoTrack = trackArray[1] as ILocalVideoTrack;
      if (videoTrack) {
        try {
          await subClient.publish(videoTrack);
        } catch (reason) {
          AgoraConsole.error(reason);
        }
        entitiesContainer.setSubClientLocalVideoTrack(connection, {
          type: videoSource,
          track: videoTrack,
        });
        let trackEventHandler: IrisTrackEventHandler = new IrisTrackEventHandler(
          {
            channelName: connection.channelId,
            client: subClient,
            track: videoTrack,
            trackType: 'ILocalTrack',
          },
          this._engine
        );
        entitiesContainer.addSubClientTrackEventHandler(
          connection,
          trackEventHandler
        );
      }
      return this.returnResult();
    };
    return this.execute(processJoinChannel);
  }
  leaveChannelEx(connection: NATIVE_RTC.RtcConnection): CallApiReturnType {
    let processFunc = async (): Promise<CallIrisApiResult> => {
      let subClient: IAgoraRTCClient = this._engine.entitiesContainer.getSubClient(
        connection
      );
      if (subClient) {
        try {
          await subClient.leave();
        } catch (e) {
          AgoraConsole.error(e);
          this.returnResult(false);
          this._engine.rtcEngineEventHandler.onError(
            NATIVE_RTC.ERROR_CODE_TYPE.ERR_LEAVE_CHANNEL_REJECTED,
            ''
          );
        }
        this._engine.rtcEngineEventHandler.onLeaveChannelEx(
          connection,
          new NATIVE_RTC.RtcStats()
        );
        this._engine.entitiesContainer.clearSubClientAll(connection);
      }

      //如果已经没有subClient, 则需要将连接状态更改
      let subClients: Container<IAgoraRTCClient> = this._engine.entitiesContainer.getSubClients();
      let container = subClients.getContainer();
      this._engine.globalVariables.isConnected = container.size > 0;
      return this.returnResult();
    };
    return this.execute(processFunc);
  }
  leaveChannelEx2(
    connection: NATIVE_RTC.RtcConnection,
    options: NATIVE_RTC.LeaveChannelOptions
  ): CallApiReturnType {
    AgoraConsole.warn('leaveChannelEx2 not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  updateChannelMediaOptionsEx(
    options: NATIVE_RTC.ChannelMediaOptions,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'updateChannelMediaOptionsEx not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setVideoEncoderConfigurationEx(
    config: NATIVE_RTC.VideoEncoderConfiguration,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setVideoEncoderConfigurationEx not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setupRemoteVideoEx(
    canvas: NATIVE_RTC.VideoCanvas,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    let processVideoTrack = async (): Promise<CallIrisApiResult> => {
      let holder = {
        element: canvas.view,
        channelId: connection.channelId,
        uid: canvas.uid,
        type: NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_REMOTE,
      };
      this._engine.entitiesContainer.addOrUpdateRemoteVideoViewHolder(holder);

      let mainClient = this._engine.entitiesContainer.getMainClient();
      if (mainClient && mainClient.channelName == holder.channelId) {
        for (let remoteUser of mainClient.remoteUsers) {
          if (remoteUser.uid == holder.uid) {
            if (remoteUser.videoTrack?.isPlaying == true) {
              remoteUser.videoTrack.stop();
            }
            if (holder.element) {
              remoteUser.videoTrack?.play(holder.element);
            }
            break;
          }
        }
      }

      let subClients = this._engine.entitiesContainer.getSubClients();
      subClients?.walkT((channel_id, unuseUid, subClient) => {
        if (
          channel_id == connection.channelId &&
          unuseUid == connection.localUid
        ) {
          let remoteUsers = subClient.remoteUsers;
          for (let remoteUser of remoteUsers) {
            if (remoteUser.uid == holder.uid) {
              if (remoteUser.videoTrack?.isPlaying == true) {
                remoteUser.videoTrack.stop();
              }
              if (holder.element) {
                remoteUser.videoTrack?.play(holder.element);
              }
            }
          }
        }
      });

      return this.returnResult();
    };

    return this.execute(processVideoTrack);
  }
  muteRemoteAudioStreamEx(
    uid: number,
    mute: boolean,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'muteRemoteAudioStreamEx not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  muteRemoteVideoStreamEx(
    uid: number,
    mute: boolean,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'muteRemoteVideoStreamEx not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setRemoteVideoStreamTypeEx(
    uid: number,
    streamType: NATIVE_RTC.VIDEO_STREAM_TYPE,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setRemoteVideoStreamTypeEx not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  muteLocalAudioStreamEx(
    mute: boolean,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn('muteLocalAudioStreamEx not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  muteLocalVideoStreamEx(
    mute: boolean,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn('muteLocalVideoStreamEx not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  muteAllRemoteAudioStreamsEx(
    mute: boolean,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'muteAllRemoteAudioStreamsEx not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  muteAllRemoteVideoStreamsEx(
    mute: boolean,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'muteAllRemoteVideoStreamsEx not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setSubscribeAudioBlocklistEx(
    uidList: number,
    uidNumber: number,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setSubscribeAudioBlocklistEx not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setSubscribeAudioAllowlistEx(
    uidList: number,
    uidNumber: number,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setSubscribeAudioAllowlistEx not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setSubscribeVideoBlocklistEx(
    uidList: number,
    uidNumber: number,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setSubscribeVideoBlocklistEx not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setSubscribeVideoAllowlistEx(
    uidList: number,
    uidNumber: number,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setSubscribeVideoAllowlistEx not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setRemoteVideoSubscriptionOptionsEx(
    uid: number,
    options: NATIVE_RTC.VideoSubscriptionOptions,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setRemoteVideoSubscriptionOptionsEx not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setRemoteVoicePositionEx(
    uid: number,
    pan: number,
    gain: number,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setRemoteVoicePositionEx not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setRemoteUserSpatialAudioParamsEx(
    uid: number,
    params: NATIVE_RTC.SpatialAudioParams,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setRemoteUserSpatialAudioParamsEx not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setRemoteRenderModeEx(
    uid: number,
    renderMode: NATIVE_RTC.RENDER_MODE_TYPE,
    mirrorMode: NATIVE_RTC.VIDEO_MIRROR_MODE_TYPE,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn('setRemoteRenderModeEx not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  enableLoopbackRecordingEx(
    connection: NATIVE_RTC.RtcConnection,
    enabled: boolean,
    deviceName: string
  ): CallApiReturnType {
    AgoraConsole.warn(
      'enableLoopbackRecordingEx not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  adjustRecordingSignalVolumeEx(
    volume: number,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'adjustRecordingSignalVolumeEx not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  muteRecordingSignalEx(
    mute: boolean,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn('muteRecordingSignalEx not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  adjustUserPlaybackSignalVolumeEx(
    uid: number,
    volume: number,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'adjustUserPlaybackSignalVolumeEx not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getConnectionStateEx(
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn('getConnectionStateEx not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  enableEncryptionEx(
    connection: NATIVE_RTC.RtcConnection,
    enabled: boolean,
    config: NATIVE_RTC.EncryptionConfig
  ): CallApiReturnType {
    AgoraConsole.warn('enableEncryptionEx not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  createDataStreamEx(
    streamId: number[],
    reliable: boolean,
    ordered: boolean,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn('createDataStreamEx not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  createDataStreamEx2(
    streamId: number[],
    config: NATIVE_RTC.DataStreamConfig,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn('createDataStreamEx2 not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  sendStreamMessageEx(
    streamId: number,
    data: string,
    length: number,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn('sendStreamMessageEx not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  addVideoWatermarkEx(
    watermarkUrl: string,
    options: NATIVE_RTC.WatermarkOptions,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn('addVideoWatermarkEx not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  clearVideoWatermarkEx(
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn('clearVideoWatermarkEx not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  sendCustomReportMessageEx(
    id: string,
    category: string,
    event: string,
    label: string,
    value: number,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'sendCustomReportMessageEx not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  enableAudioVolumeIndicationEx(
    interval: number,
    smooth: number,
    reportVad: boolean,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'enableAudioVolumeIndicationEx not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  startRtmpStreamWithoutTranscodingEx(
    url: string,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'startRtmpStreamWithoutTranscodingEx not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  startRtmpStreamWithTranscodingEx(
    url: string,
    transcoding: NATIVE_RTC.LiveTranscoding,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'startRtmpStreamWithTranscodingEx not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  updateRtmpTranscodingEx(
    transcoding: NATIVE_RTC.LiveTranscoding,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'updateRtmpTranscodingEx not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  stopRtmpStreamEx(
    url: string,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn('stopRtmpStreamEx not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  startOrUpdateChannelMediaRelayEx(
    configuration: NATIVE_RTC.ChannelMediaRelayConfiguration,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'startOrUpdateChannelMediaRelayEx not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  startChannelMediaRelayEx(
    configuration: NATIVE_RTC.ChannelMediaRelayConfiguration,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'startChannelMediaRelayEx not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  updateChannelMediaRelayEx(
    configuration: NATIVE_RTC.ChannelMediaRelayConfiguration,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'updateChannelMediaRelayEx not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  stopChannelMediaRelayEx(
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'stopChannelMediaRelayEx not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  pauseAllChannelMediaRelayEx(
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'pauseAllChannelMediaRelayEx not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  resumeAllChannelMediaRelayEx(
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'resumeAllChannelMediaRelayEx not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getUserInfoByUserAccountEx(
    userAccount: string,
    userInfo: NATIVE_RTC.UserInfo[],
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'getUserInfoByUserAccountEx not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getUserInfoByUidEx(
    uid: number,
    userInfo: NATIVE_RTC.UserInfo[],
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn('getUserInfoByUidEx not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  enableDualStreamModeEx(
    enabled: boolean,
    streamConfig: NATIVE_RTC.SimulcastStreamConfig,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn('enableDualStreamModeEx not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setDualStreamModeEx(
    mode: NATIVE_RTC.SIMULCAST_STREAM_MODE,
    streamConfig: NATIVE_RTC.SimulcastStreamConfig,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn('setDualStreamModeEx not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setHighPriorityUserListEx(
    uidList: number,
    uidNum: number,
    option: NATIVE_RTC.STREAM_FALLBACK_OPTIONS,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setHighPriorityUserListEx not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  takeSnapshotEx(
    connection: NATIVE_RTC.RtcConnection,
    uid: number,
    filePath: string
  ): CallApiReturnType {
    AgoraConsole.warn('takeSnapshotEx not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  startMediaRenderingTracingEx(
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'startMediaRenderingTracingEx not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
}
