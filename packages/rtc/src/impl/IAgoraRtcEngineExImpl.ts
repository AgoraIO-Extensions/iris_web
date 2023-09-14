import { VideoEncoderConfiguration } from 'agora-rtc-sdk-ng';

import { AsyncTaskType, CallApiReturnType } from 'iris-web-core';
import * as NATIVE_RTC from 'iris-web-rtc';

import { IrisRtcEngine } from '../engine/IrisRtcEngine';
import { Action } from '../util/AgoraActionQueue';
import { AgoraConsole } from '../util/AgoraConsole';

export class IRtcEngineExImpl implements NATIVE_RTC.IRtcEngineEx {
  private _engine: IrisRtcEngine;

  public constructor(engine: IrisRtcEngine) {
    this._engine = engine;
  }

  putAction(action: Action) {
    this._engine.actionQueue.putAction(action);
  }

  joinChannelEx(
    token: string,
    connection: NATIVE_RTC.RtcConnection,
    options: NATIVE_RTC.ChannelMediaOptions
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  leaveChannelEx(connection: NATIVE_RTC.RtcConnection): CallApiReturnType;
  leaveChannelEx(
    connection: NATIVE_RTC.RtcConnection,
    options: NATIVE_RTC.LeaveChannelOptions
  ): CallApiReturnType;
  leaveChannelEx(connection: unknown, options?: unknown): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  updateChannelMediaOptionsEx(
    options: NATIVE_RTC.ChannelMediaOptions,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setVideoEncoderConfigurationEx(
    config: VideoEncoderConfiguration,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setupRemoteVideoEx(
    canvas: NATIVE_RTC.VideoCanvas,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  muteRemoteAudioStreamEx(
    uid: number,
    mute: boolean,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  muteRemoteVideoStreamEx(
    uid: number,
    mute: boolean,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setRemoteVideoStreamTypeEx(
    uid: number,
    streamType: NATIVE_RTC.VIDEO_STREAM_TYPE,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  muteLocalAudioStreamEx(
    mute: boolean,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  muteLocalVideoStreamEx(
    mute: boolean,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  muteAllRemoteAudioStreamsEx(
    mute: boolean,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  muteAllRemoteVideoStreamsEx(
    mute: boolean,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setSubscribeAudioBlocklistEx(
    uidList: number,
    uidNumber: number,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setSubscribeAudioAllowlistEx(
    uidList: number,
    uidNumber: number,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setSubscribeVideoBlocklistEx(
    uidList: number,
    uidNumber: number,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setSubscribeVideoAllowlistEx(
    uidList: number,
    uidNumber: number,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setRemoteVideoSubscriptionOptionsEx(
    uid: number,
    options: NATIVE_RTC.VideoSubscriptionOptions,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
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
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setRemoteUserSpatialAudioParamsEx(
    uid: number,
    params: NATIVE_RTC.SpatialAudioParams,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setRemoteRenderModeEx(
    uid: number,
    renderMode: NATIVE_RTC.RENDER_MODE_TYPE,
    mirrorMode: NATIVE_RTC.VIDEO_MIRROR_MODE_TYPE,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  enableLoopbackRecordingEx(
    connection: NATIVE_RTC.RtcConnection,
    enabled: boolean,
    deviceName: string
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  adjustRecordingSignalVolumeEx(
    volume: number,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  muteRecordingSignalEx(
    mute: boolean,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  adjustUserPlaybackSignalVolumeEx(
    uid: number,
    volume: number,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getConnectionStateEx(
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  enableEncryptionEx(
    connection: NATIVE_RTC.RtcConnection,
    enabled: boolean,
    config: NATIVE_RTC.EncryptionConfig
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  createDataStreamEx(
    streamId: number,
    reliable: boolean,
    ordered: boolean,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType;
  createDataStreamEx(
    streamId: number,
    config: NATIVE_RTC.DataStreamConfig,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType;
  createDataStreamEx(
    streamId: unknown,
    reliable: unknown,
    ordered: unknown,
    connection?: unknown
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  sendStreamMessageEx(
    streamId: number,
    data: string,
    length: number,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  addVideoWatermarkEx(
    watermarkUrl: string,
    options: NATIVE_RTC.WatermarkOptions,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  clearVideoWatermarkEx(
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
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
      'registerAudioFrameObserver not supported in this platfrom!'
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
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  startRtmpStreamWithoutTranscodingEx(
    url: string,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  startRtmpStreamWithTranscodingEx(
    url: string,
    transcoding: NATIVE_RTC.LiveTranscoding,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  updateRtmpTranscodingEx(
    transcoding: NATIVE_RTC.LiveTranscoding,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  stopRtmpStreamEx(
    url: string,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  startOrUpdateChannelMediaRelayEx(
    configuration: NATIVE_RTC.ChannelMediaRelayConfiguration,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  startChannelMediaRelayEx(
    configuration: NATIVE_RTC.ChannelMediaRelayConfiguration,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  updateChannelMediaRelayEx(
    configuration: NATIVE_RTC.ChannelMediaRelayConfiguration,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  stopChannelMediaRelayEx(
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  pauseAllChannelMediaRelayEx(
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  resumeAllChannelMediaRelayEx(
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getUserInfoByUserAccountEx(
    userAccount: string,
    userInfo: NATIVE_RTC.UserInfo,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getUserInfoByUidEx(
    uid: number,
    userInfo: NATIVE_RTC.UserInfo,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  enableDualStreamModeEx(
    enabled: boolean,
    streamConfig: NATIVE_RTC.SimulcastStreamConfig,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setDualStreamModeEx(
    mode: NATIVE_RTC.SIMULCAST_STREAM_MODE,
    streamConfig: NATIVE_RTC.SimulcastStreamConfig,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setHighPriorityUserListEx(
    uidList: number,
    uidNum: number,
    option: NATIVE_RTC.STREAM_FALLBACK_OPTIONS,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  takeSnapshotEx(
    connection: NATIVE_RTC.RtcConnection,
    uid: number,
    filePath: string
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  startMediaRenderingTracingEx(
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }

  private execute(task: AsyncTaskType): CallApiReturnType {
    return this._engine.executor.execute(task);
  }
}
