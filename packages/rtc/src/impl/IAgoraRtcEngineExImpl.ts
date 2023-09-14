import { CallApiReturnType } from 'iris-web-core';
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
    AgoraConsole.warn('joinChannelEx not supported in this platfrom!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  leaveChannelEx(connection: NATIVE_RTC.RtcConnection): CallApiReturnType {
    AgoraConsole.warn('leaveChannelEx not supported in this platfrom!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  leaveChannelEx2(
    connection: NATIVE_RTC.RtcConnection,
    options: NATIVE_RTC.LeaveChannelOptions
  ): CallApiReturnType {
    AgoraConsole.warn('leaveChannelEx2 not supported in this platfrom!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  updateChannelMediaOptionsEx(
    options: NATIVE_RTC.ChannelMediaOptions,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'updateChannelMediaOptionsEx not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setVideoEncoderConfigurationEx(
    config: NATIVE_RTC.VideoEncoderConfiguration,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setVideoEncoderConfigurationEx not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setupRemoteVideoEx(
    canvas: NATIVE_RTC.VideoCanvas,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn('setupRemoteVideoEx not supported in this platfrom!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  muteRemoteAudioStreamEx(
    uid: number,
    mute: boolean,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'muteRemoteAudioStreamEx not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  muteRemoteVideoStreamEx(
    uid: number,
    mute: boolean,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'muteRemoteVideoStreamEx not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setRemoteVideoStreamTypeEx(
    uid: number,
    streamType: NATIVE_RTC.VIDEO_STREAM_TYPE,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setRemoteVideoStreamTypeEx not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  muteLocalAudioStreamEx(
    mute: boolean,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn('muteLocalAudioStreamEx not supported in this platfrom!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  muteLocalVideoStreamEx(
    mute: boolean,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn('muteLocalVideoStreamEx not supported in this platfrom!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  muteAllRemoteAudioStreamsEx(
    mute: boolean,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'muteAllRemoteAudioStreamsEx not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  muteAllRemoteVideoStreamsEx(
    mute: boolean,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'muteAllRemoteVideoStreamsEx not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setSubscribeAudioBlocklistEx(
    uidList: number,
    uidNumber: number,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setSubscribeAudioBlocklistEx not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setSubscribeAudioAllowlistEx(
    uidList: number,
    uidNumber: number,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setSubscribeAudioAllowlistEx not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setSubscribeVideoBlocklistEx(
    uidList: number,
    uidNumber: number,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setSubscribeVideoBlocklistEx not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setSubscribeVideoAllowlistEx(
    uidList: number,
    uidNumber: number,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setSubscribeVideoAllowlistEx not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setRemoteVideoSubscriptionOptionsEx(
    uid: number,
    options: NATIVE_RTC.VideoSubscriptionOptions,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setRemoteVideoSubscriptionOptionsEx not supported in this platfrom!'
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
      'setRemoteVoicePositionEx not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setRemoteUserSpatialAudioParamsEx(
    uid: number,
    params: NATIVE_RTC.SpatialAudioParams,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setRemoteUserSpatialAudioParamsEx not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setRemoteRenderModeEx(
    uid: number,
    renderMode: NATIVE_RTC.RENDER_MODE_TYPE,
    mirrorMode: NATIVE_RTC.VIDEO_MIRROR_MODE_TYPE,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn('setRemoteRenderModeEx not supported in this platfrom!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  enableLoopbackRecordingEx(
    connection: NATIVE_RTC.RtcConnection,
    enabled: boolean,
    deviceName: string
  ): CallApiReturnType {
    AgoraConsole.warn(
      'enableLoopbackRecordingEx not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  adjustRecordingSignalVolumeEx(
    volume: number,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'adjustRecordingSignalVolumeEx not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  muteRecordingSignalEx(
    mute: boolean,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn('muteRecordingSignalEx not supported in this platfrom!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  adjustUserPlaybackSignalVolumeEx(
    uid: number,
    volume: number,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'adjustUserPlaybackSignalVolumeEx not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getConnectionStateEx(
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn('getConnectionStateEx not supported in this platfrom!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  enableEncryptionEx(
    connection: NATIVE_RTC.RtcConnection,
    enabled: boolean,
    config: NATIVE_RTC.EncryptionConfig
  ): CallApiReturnType {
    AgoraConsole.warn('enableEncryptionEx not supported in this platfrom!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  createDataStreamEx(
    streamId: number,
    reliable: boolean,
    ordered: boolean,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn('createDataStreamEx not supported in this platfrom!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  createDataStreamEx2(
    streamId: number,
    config: NATIVE_RTC.DataStreamConfig,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn('createDataStreamEx2 not supported in this platfrom!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  sendStreamMessageEx(
    streamId: number,
    data: string,
    length: number,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn('sendStreamMessageEx not supported in this platfrom!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  addVideoWatermarkEx(
    watermarkUrl: string,
    options: NATIVE_RTC.WatermarkOptions,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn('addVideoWatermarkEx not supported in this platfrom!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  clearVideoWatermarkEx(
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn('clearVideoWatermarkEx not supported in this platfrom!');
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
      'sendCustomReportMessageEx not supported in this platfrom!'
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
      'enableAudioVolumeIndicationEx not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  startRtmpStreamWithoutTranscodingEx(
    url: string,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'startRtmpStreamWithoutTranscodingEx not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  startRtmpStreamWithTranscodingEx(
    url: string,
    transcoding: NATIVE_RTC.LiveTranscoding,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'startRtmpStreamWithTranscodingEx not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  updateRtmpTranscodingEx(
    transcoding: NATIVE_RTC.LiveTranscoding,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'updateRtmpTranscodingEx not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  stopRtmpStreamEx(
    url: string,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn('stopRtmpStreamEx not supported in this platfrom!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  startOrUpdateChannelMediaRelayEx(
    configuration: NATIVE_RTC.ChannelMediaRelayConfiguration,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'startOrUpdateChannelMediaRelayEx not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  startChannelMediaRelayEx(
    configuration: NATIVE_RTC.ChannelMediaRelayConfiguration,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'startChannelMediaRelayEx not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  updateChannelMediaRelayEx(
    configuration: NATIVE_RTC.ChannelMediaRelayConfiguration,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'updateChannelMediaRelayEx not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  stopChannelMediaRelayEx(
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'stopChannelMediaRelayEx not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  pauseAllChannelMediaRelayEx(
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'pauseAllChannelMediaRelayEx not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  resumeAllChannelMediaRelayEx(
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'resumeAllChannelMediaRelayEx not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getUserInfoByUserAccountEx(
    userAccount: string,
    userInfo: NATIVE_RTC.UserInfo,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'getUserInfoByUserAccountEx not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getUserInfoByUidEx(
    uid: number,
    userInfo: NATIVE_RTC.UserInfo,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn('getUserInfoByUidEx not supported in this platfrom!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  enableDualStreamModeEx(
    enabled: boolean,
    streamConfig: NATIVE_RTC.SimulcastStreamConfig,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn('enableDualStreamModeEx not supported in this platfrom!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setDualStreamModeEx(
    mode: NATIVE_RTC.SIMULCAST_STREAM_MODE,
    streamConfig: NATIVE_RTC.SimulcastStreamConfig,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn('setDualStreamModeEx not supported in this platfrom!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setHighPriorityUserListEx(
    uidList: number,
    uidNum: number,
    option: NATIVE_RTC.STREAM_FALLBACK_OPTIONS,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setHighPriorityUserListEx not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  takeSnapshotEx(
    connection: NATIVE_RTC.RtcConnection,
    uid: number,
    filePath: string
  ): CallApiReturnType {
    AgoraConsole.warn('takeSnapshotEx not supported in this platfrom!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  startMediaRenderingTracingEx(
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'startMediaRenderingTracingEx not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
}
