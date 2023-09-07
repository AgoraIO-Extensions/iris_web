import { CallApiReturnType } from "iris-web-core";
import { Action } from "../../util/AgoraActionQueue";
import * as agorartc from '../rtc_types/Index';

export interface IRtcEngineEx {
    putAction(action: Action);

    joinChannelEx(token: string, connection: agorartc.RtcConnection, options: agorartc.ChannelMediaOptions): number;
    leaveChannelEx(connection: agorartc.RtcConnection): number;
    updateChannelMediaOptionsEx(options: agorartc.ChannelMediaOptions, connection: agorartc.RtcConnection): number;
    setVideoEncoderConfigurationEx(config: agorartc.VideoEncoderConfiguration, connection: agorartc.RtcConnection): number;
    setupRemoteVideoEx(canvas: agorartc.VideoCanvas, connection: agorartc.RtcConnection): CallApiReturnType;
    muteRemoteAudioStreamEx(uid: agorartc.uid_t, mute: boolean, connection: agorartc.RtcConnection): number;
    muteRemoteVideoStreamEx(uid: agorartc.uid_t, mute: boolean, connection: agorartc.RtcConnection): number;
    setRemoteVideoStreamTypeEx(uid: agorartc.uid_t, streamType: agorartc.VIDEO_STREAM_TYPE, connection: agorartc.RtcConnection): number;
    setSubscribeAudioBlacklistEx(uidList: agorartc.uid_t[], uidNumber: number, connection: agorartc.RtcConnection): number;
    setSubscribeAudioWhitelistEx(uidList: agorartc.uid_t[], uidNumber: number, connection: agorartc.RtcConnection): number;
    setSubscribeVideoBlacklistEx(uidList: agorartc.uid_t[], uidNumber: number, connection: agorartc.RtcConnection): number;
    setSubscribeVideoWhitelistEx(uidList: agorartc.uid_t[], uidNumber: number, connection: agorartc.RtcConnection): number;
    setRemoteVideoSubscriptionOptionsEx(uid: agorartc.uid_t, options: agorartc.VideoSubscriptionOptions, connection: agorartc.RtcConnection): number;
    setRemoteVoicePositionEx(uid: agorartc.uid_t, pan: number, gain: number, connection: agorartc.RtcConnection): number;
    setRemoteUserSpatialAudioParamsEx(uid: agorartc.uid_t, params: agorartc.SpatialAudioParams, connection: agorartc.RtcConnection): number;
    setRemoteRenderModeEx(uid: agorartc.uid_t, renderMode: agorartc.RENDER_MODE_TYPE, mirrorMode: agorartc.VIDEO_MIRROR_MODE_TYPE, connection: agorartc.RtcConnection): number;
    enableLoopbackRecordingEx(connection: agorartc.RtcConnection, enabled: boolean, deviceName: string): number;
    getConnectionStateEx(connection: agorartc.RtcConnection): agorartc.CONNECTION_STATE_TYPE;
    enableEncryptionEx(connection: agorartc.RtcConnection, enabled: boolean, config: agorartc.EncryptionConfig): number;
    createDataStreamEx(reliable: boolean, ordered: boolean, connection: agorartc.RtcConnection): number;
    createDataStreamEx2(config: agorartc.DataStreamConfig, connection: agorartc.RtcConnection): number;
    sendStreamMessageEx(streamId: number, data: string, length: number, connection: agorartc.RtcConnection): number;
    addVideoWatermarkEx(watermarkUrl: string, options: agorartc.WatermarkOptions, connection: agorartc.RtcConnection): number;
    clearVideoWatermarkEx(connection: agorartc.RtcConnection): number;
    sendCustomReportMessageEx(id: string, category: string, event: string, label: string, value: number, connection: agorartc.RtcConnection): number;
    enableAudioVolumeIndicationEx(interval: number, smooth: number, reportVad: boolean, connection: agorartc.RtcConnection): number;
    getUserInfoByUserAccountEx(userAccount: string, userInfo: agorartc.UserInfo, connection: agorartc.RtcConnection): number;
    getUserInfoByUidEx(uid: agorartc.uid_t, userInfo: agorartc.UserInfo, connection: agorartc.RtcConnection): number;
    setVideoProfileEx(width: number, height: number, frameRate: number, bitrate: number): number;
    enableDualStreamModeEx(sourceType: agorartc.VIDEO_SOURCE_TYPE, enabled: boolean, streamConfig: agorartc.SimulcastStreamConfig, connection: agorartc.RtcConnection): number;
    setDualStreamModeEx(sourceType: agorartc.VIDEO_SOURCE_TYPE, mode: agorartc.SIMULCAST_STREAM_MODE, streamConfig: agorartc.SimulcastStreamConfig, connection: agorartc.RtcConnection): number;
    // enableWirelessAccelerate(enabled: boolean): number;
    takeSnapshotEx(connection: agorartc.RtcConnection, uid: agorartc.uid_t, filePath: string): number;
    addPublishStreamUrlEx(url: string, transcodingEnabled: boolean, connection: agorartc.RtcConnection): number;


}