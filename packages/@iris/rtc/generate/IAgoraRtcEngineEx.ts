/// Generated by terra, DO NOT MODIFY BY HAND.

import { CallApiReturnType } from 'iris-web-core';

import {
  ChannelMediaRelayConfiguration,
  DataStreamConfig,
  EncryptionConfig,
  LiveTranscoding,
  SIMULCAST_STREAM_MODE,
  SimulcastConfig,
  SimulcastStreamConfig,
  SpatialAudioParams,
  UserInfo,
  VIDEO_MIRROR_MODE_TYPE,
  VIDEO_STREAM_TYPE,
  VideoCanvas,
  VideoEncoderConfiguration,
  VideoSubscriptionOptions,
  WatermarkOptions,
} from './AgoraBase';
import { ContentInspectConfig, RENDER_MODE_TYPE } from './AgoraMediaBase';
import {
  ChannelMediaOptions,
  LeaveChannelOptions,
  STREAM_FALLBACK_OPTIONS,
} from './IAgoraRtcEngine';

export class RtcConnection {
  channelId?: string;

  localUid?: number;
}

export interface IRtcEngineEx {
  joinChannelEx_a3cd08c(
    token: string,
    connection: RtcConnection,
    options: ChannelMediaOptions
  ): CallApiReturnType;

  leaveChannelEx_c81e1a4(connection: RtcConnection): CallApiReturnType;

  leaveChannelEx_b03ee9a(
    connection: RtcConnection,
    options: LeaveChannelOptions
  ): CallApiReturnType;

  updateChannelMediaOptionsEx_457bb35(
    options: ChannelMediaOptions,
    connection: RtcConnection
  ): CallApiReturnType;

  setVideoEncoderConfigurationEx_4670c1e(
    config: VideoEncoderConfiguration,
    connection: RtcConnection
  ): CallApiReturnType;

  setupRemoteVideoEx_522a409(
    canvas: VideoCanvas,
    connection: RtcConnection
  ): CallApiReturnType;

  muteRemoteAudioStreamEx_6d93082(
    uid: number,
    mute: boolean,
    connection: RtcConnection
  ): CallApiReturnType;

  muteRemoteVideoStreamEx_6d93082(
    uid: number,
    mute: boolean,
    connection: RtcConnection
  ): CallApiReturnType;

  setRemoteVideoStreamTypeEx_01dc428(
    uid: number,
    streamType: VIDEO_STREAM_TYPE,
    connection: RtcConnection
  ): CallApiReturnType;

  muteLocalAudioStreamEx_3cf17a4(
    mute: boolean,
    connection: RtcConnection
  ): CallApiReturnType;

  muteLocalVideoStreamEx_3cf17a4(
    mute: boolean,
    connection: RtcConnection
  ): CallApiReturnType;

  muteAllRemoteAudioStreamsEx_3cf17a4(
    mute: boolean,
    connection: RtcConnection
  ): CallApiReturnType;

  muteAllRemoteVideoStreamsEx_3cf17a4(
    mute: boolean,
    connection: RtcConnection
  ): CallApiReturnType;

  setSubscribeAudioBlocklistEx_9f1e85c(
    uidList: number[],
    uidNumber: number,
    connection: RtcConnection
  ): CallApiReturnType;

  setSubscribeAudioAllowlistEx_9f1e85c(
    uidList: number[],
    uidNumber: number,
    connection: RtcConnection
  ): CallApiReturnType;

  setSubscribeVideoBlocklistEx_9f1e85c(
    uidList: number[],
    uidNumber: number,
    connection: RtcConnection
  ): CallApiReturnType;

  setSubscribeVideoAllowlistEx_9f1e85c(
    uidList: number[],
    uidNumber: number,
    connection: RtcConnection
  ): CallApiReturnType;

  setRemoteVideoSubscriptionOptionsEx_3cd36bc(
    uid: number,
    options: VideoSubscriptionOptions,
    connection: RtcConnection
  ): CallApiReturnType;

  setRemoteVoicePositionEx_fc0471c(
    uid: number,
    pan: number,
    gain: number,
    connection: RtcConnection
  ): CallApiReturnType;

  setRemoteUserSpatialAudioParamsEx_40ca9fb(
    uid: number,
    params: SpatialAudioParams,
    connection: RtcConnection
  ): CallApiReturnType;

  setRemoteRenderModeEx_a72fe4e(
    uid: number,
    renderMode: RENDER_MODE_TYPE,
    mirrorMode: VIDEO_MIRROR_MODE_TYPE,
    connection: RtcConnection
  ): CallApiReturnType;

  enableLoopbackRecordingEx_4f41542(
    connection: RtcConnection,
    enabled: boolean,
    deviceName: string
  ): CallApiReturnType;

  adjustRecordingSignalVolumeEx_e84d10e(
    volume: number,
    connection: RtcConnection
  ): CallApiReturnType;

  muteRecordingSignalEx_3cf17a4(
    mute: boolean,
    connection: RtcConnection
  ): CallApiReturnType;

  adjustUserPlaybackSignalVolumeEx_adbd29c(
    uid: number,
    volume: number,
    connection: RtcConnection
  ): CallApiReturnType;

  getConnectionStateEx_c81e1a4(connection: RtcConnection): CallApiReturnType;

  enableEncryptionEx_10cd872(
    connection: RtcConnection,
    enabled: boolean,
    config: EncryptionConfig
  ): CallApiReturnType;

  createDataStreamEx_1767167(
    reliable: boolean,
    ordered: boolean,
    connection: RtcConnection
  ): CallApiReturnType;

  createDataStreamEx_9f641b6(
    config: DataStreamConfig,
    connection: RtcConnection
  ): CallApiReturnType;

  sendStreamMessageEx_0c34857(
    streamId: number,
    data: Uint8Array,
    length: number,
    connection: RtcConnection
  ): CallApiReturnType;

  addVideoWatermarkEx_ad7daa3(
    watermarkUrl: string,
    options: WatermarkOptions,
    connection: RtcConnection
  ): CallApiReturnType;

  clearVideoWatermarkEx_c81e1a4(connection: RtcConnection): CallApiReturnType;

  sendCustomReportMessageEx_833b8a5(
    id: string,
    category: string,
    event: string,
    label: string,
    value: number,
    connection: RtcConnection
  ): CallApiReturnType;

  enableAudioVolumeIndicationEx_ac84f2a(
    interval: number,
    smooth: number,
    reportVad: boolean,
    connection: RtcConnection
  ): CallApiReturnType;

  startRtmpStreamWithoutTranscodingEx_e405325(
    url: string,
    connection: RtcConnection
  ): CallApiReturnType;

  startRtmpStreamWithTranscodingEx_ab121b5(
    url: string,
    transcoding: LiveTranscoding,
    connection: RtcConnection
  ): CallApiReturnType;

  updateRtmpTranscodingEx_77f3ee8(
    transcoding: LiveTranscoding,
    connection: RtcConnection
  ): CallApiReturnType;

  stopRtmpStreamEx_e405325(
    url: string,
    connection: RtcConnection
  ): CallApiReturnType;

  startOrUpdateChannelMediaRelayEx_4ad39a8(
    configuration: ChannelMediaRelayConfiguration,
    connection: RtcConnection
  ): CallApiReturnType;

  stopChannelMediaRelayEx_c81e1a4(connection: RtcConnection): CallApiReturnType;

  pauseAllChannelMediaRelayEx_c81e1a4(
    connection: RtcConnection
  ): CallApiReturnType;

  resumeAllChannelMediaRelayEx_c81e1a4(
    connection: RtcConnection
  ): CallApiReturnType;

  getUserInfoByUserAccountEx_ca39cc6(
    userAccount: string,
    userInfo: UserInfo,
    connection: RtcConnection
  ): CallApiReturnType;

  getUserInfoByUidEx_1e78da1(
    uid: number,
    userInfo: UserInfo,
    connection: RtcConnection
  ): CallApiReturnType;

  enableDualStreamModeEx_4b18f41(
    enabled: boolean,
    streamConfig: SimulcastStreamConfig,
    connection: RtcConnection
  ): CallApiReturnType;

  setDualStreamModeEx_622d0f3(
    mode: SIMULCAST_STREAM_MODE,
    streamConfig: SimulcastStreamConfig,
    connection: RtcConnection
  ): CallApiReturnType;

  setSimulcastConfigEx_bd8d7d0(
    simulcastConfig: SimulcastConfig,
    connection: RtcConnection
  ): CallApiReturnType;

  setHighPriorityUserListEx_8736b5c(
    uidList: number[],
    uidNum: number,
    option: STREAM_FALLBACK_OPTIONS,
    connection: RtcConnection
  ): CallApiReturnType;

  takeSnapshotEx_de1c015(
    connection: RtcConnection,
    uid: number,
    filePath: string
  ): CallApiReturnType;

  enableContentInspectEx_c4e7f69(
    enabled: boolean,
    config: ContentInspectConfig,
    connection: RtcConnection
  ): CallApiReturnType;

  startMediaRenderingTracingEx_c81e1a4(
    connection: RtcConnection
  ): CallApiReturnType;

  setParametersEx_8225ea3(
    connection: RtcConnection,
    parameters: string
  ): CallApiReturnType;

  getCallIdEx_b13f7c4(
    callId: string,
    connection: RtcConnection
  ): CallApiReturnType;

  sendAudioMetadataEx_e2bf1c4(
    connection: RtcConnection,
    metadata: string,
    length: number
  ): CallApiReturnType;
}
