import { IrisApiEngine } from 'iris-web-core';
export * from 'iris-web-core';
import * as NATIVE_RTC from '@iris/web-rtc';
import { LOG_LEVEL } from '@iris/web-rtc';
import { AREAS, ClientRole, SDK_MODE, ClientRoleOptions, VideoEncoderConfiguration, LowStreamParameter, ConnectionState, EncryptionMode, InjectStreamConfig, IChannelMediaRelayConfiguration, ChannelMediaRelayInfo, InspectConfiguration, SDK_CODEC, RemoteStreamType, RemoteStreamFallbackType, LiveStreamingTranscodingImage, LiveStreamingTranscodingUser, LiveStreamingTranscodingConfig, DeviceState, ConnectionDisconnectedReason, ChannelMediaRelayState, ChannelMediaRelayError, ChannelMediaRelayEvent, UID } from 'agora-rtc-sdk-ng';

interface Action {
    fun: Function;
    args: Array<any>;
}
declare class AgoraActionQueue {
    private _queue;
    private _next;
    constructor();
    putAction(action: Action): void;
    next(): void;
}

declare class AgoraConsole {
    static logLevel: LOG_LEVEL;
    static log(msg: any): void;
    static warn(msg: any): void;
    static error(msg: any): void;
}

declare class AgoraTool {
    static mergeArray(dest: Array<any>, src: Array<any>): void;
    static spliceFileName(filePath: string): string;
    static downloadCanvasAsImage(canvas: any, fileName: string): void;
}

declare class AgoraTranslate {
    static NATIVE_RTCLOG_LEVEL2Number(logLevel: NATIVE_RTC.LOG_LEVEL): number;
    static NATIVE_RTCAREA_CODE2AREAS(areaCode: NATIVE_RTC.AREA_CODE | NATIVE_RTC.AREA_CODE_EX): AREAS;
    static NATIVE_RTCCLIENT_ROLE_TYPE2ClientRole(clientRole: NATIVE_RTC.CLIENT_ROLE_TYPE): ClientRole;
    static NATIVE_RTCCHANNEL_PROFILE_TYPE2SDK_MODE(channelProfile: NATIVE_RTC.CHANNEL_PROFILE_TYPE): SDK_MODE;
    static NATIVE_RTCClientRoleOptions2ClientRoleOptions(options: NATIVE_RTC.ClientRoleOptions): ClientRoleOptions;
    static NATIVE_RTCAUDIENCE_LATENCY_LEVEL_TYPE2ClientRoleOptions(level: NATIVE_RTC.AUDIENCE_LATENCY_LEVEL_TYPE): ClientRoleOptions;
    static NATIVE_RTCVideoEncoderConfiguration2VideoEncoderConfiguration(conf: NATIVE_RTC.VideoEncoderConfiguration): VideoEncoderConfiguration;
    static NATIVE_RTCVideoFormat2VideoEncoderConfiguration(videoFormat: NATIVE_RTC.VideoFormat): VideoEncoderConfiguration;
    static NATIVE_RTCScreenCaptureParameters2VideoEncoderConfiguration(conf: NATIVE_RTC.ScreenCaptureParameters): VideoEncoderConfiguration;
    static NATIVE_RTCSimulcastStreamConfig2LowStreamParameter(config: NATIVE_RTC.SimulcastStreamConfig): LowStreamParameter;
    static NATIVE_RTCCONNECTION_STATE_TYPE2ConnectionState(state: NATIVE_RTC.CONNECTION_STATE_TYPE): ConnectionState;
    static NATIVE_RTCENCRYPTION_MODE2EncryptionMode(mode: NATIVE_RTC.ENCRYPTION_MODE): EncryptionMode;
    static NATIVE_RTCInjectStreamConfig2InjectStreamConfig(config: NATIVE_RTC.InjectStreamConfig): InjectStreamConfig;
    static NATIVE_RTCChannelMediaRelayConfiguration2IChannelMediaRelayConfiguration(config: NATIVE_RTC.ChannelMediaRelayConfiguration): IChannelMediaRelayConfiguration;
    static NATIVE_RTCChannelMediaInfo2ChannelMediaRelayInfo(info: NATIVE_RTC.ChannelMediaInfo): ChannelMediaRelayInfo;
    static NATIVE_RTCContentInspectConfig2InspectConfiguration(config: NATIVE_RTC.ContentInspectConfig): InspectConfiguration;
    static NATIVE_RTCVIDEO_CONTENT_HINT2string(hint: NATIVE_RTC.VIDEO_CONTENT_HINT): 'motion' | 'detail';
    static NATIVE_RTCCAMERA_DIRECTION2string(direction: NATIVE_RTC.CAMERA_DIRECTION): 'user' | 'environment';
    static NATIVE_RTCVIDEO_MIRROR_MODE_TYPE2boolean(mode: NATIVE_RTC.VIDEO_MIRROR_MODE_TYPE): boolean;
    static NATIVE_RTCVIDEO_CODEC_TYPE2SDK_CODEC(code: NATIVE_RTC.VIDEO_CODEC_TYPE): SDK_CODEC;
    static NATIVE_RTCVIDEO_STREAM_TYPE2RemoteStreamType(type: NATIVE_RTC.VIDEO_STREAM_TYPE): RemoteStreamType;
    static NATIVE_RTCSTREAM_FALLBACK_OPTIONS2RemoteStreamFallbackType(fallback: NATIVE_RTC.STREAM_FALLBACK_OPTIONS): RemoteStreamFallbackType;
    static NATIVE_RTCRtcImage2LiveStreamingTranscodingImage(image: NATIVE_RTC.RtcImage): LiveStreamingTranscodingImage;
    static NATIVE_RTCTranscodingUser2LiveStreamingTranscodingUser(user: NATIVE_RTC.TranscodingUser): LiveStreamingTranscodingUser;
    static NATIVE_RTCLiveTranscoding2LiveStreamingTranscodingConfig(config: NATIVE_RTC.LiveTranscoding): LiveStreamingTranscodingConfig;
    /*************************/
    static DeviceState2NATIVE_RTCMEDIA_DEVICE_STATE_TYPE(state: DeviceState): NATIVE_RTC.MEDIA_DEVICE_STATE_TYPE;
    static ConnectionState2NATIVE_RTCCONNECTION_STATE_TYPE(state: ConnectionState): NATIVE_RTC.CONNECTION_STATE_TYPE;
    static string2NATIVE_RTCENCRYPTION_MODE(mode: string): NATIVE_RTC.ENCRYPTION_MODE;
    static ConnectionDisconnectedReason2NATIVE_RTCCONNECTION_CHANGED_REASON_TYPE(reason: ConnectionDisconnectedReason): NATIVE_RTC.CONNECTION_CHANGED_REASON_TYPE;
    static string2NATIVE_RTCUSER_OFFLINE_REASON_TYPE(reason: string): NATIVE_RTC.USER_OFFLINE_REASON_TYPE;
    static ChannelMediaRelayState2NATIVE_RTCCHANNEL_MEDIA_RELAY_STATE(state: ChannelMediaRelayState): NATIVE_RTC.CHANNEL_MEDIA_RELAY_STATE;
    static ChannelMediaRelayError2NATIVE_RTCCHANNEL_MEDIA_RELAY_ERROR(err: ChannelMediaRelayError): NATIVE_RTC.CHANNEL_MEDIA_RELAY_ERROR;
    static ChannelMediaRelayEvent2NATIVE_RTCCHANNEL_MEDIA_RELAY_EVENT(event: ChannelMediaRelayEvent): NATIVE_RTC.CHANNEL_MEDIA_RELAY_EVENT;
    static volumeIndicatorResult2NATIVE_RTCAudioVolumeInfo(result: {
        level: number;
        uid: UID;
    }): NATIVE_RTC.AudioVolumeInfo;
    static webQuality2NATIVE_RTCQuality(webQuality: number): number;
    static data2NATIVE_RTCCONTENT_INSPECT_RESULT(data: 'porn' | 'sexy' | 'neutral'): NATIVE_RTC.CONTENT_INSPECT_RESULT;
}

type walkFun<T> = (channelId: string, uid: UID, t: T) => void;
declare class Container<T> {
    private _container;
    addT(channelId: string, uid: UID, t: T): void;
    removeT(channelId: string, uid: UID): void;
    removeTs(channelId: string): void;
    getT(channelId: string, uid: UID): T;
    getTs(channelId: string): Map<UID, T>;
    walkT(cb: walkFun<T>): void;
    walkTAsync(cb: walkFun<T>): Promise<void>;
    getContainer(): Map<string, Map<UID, T>>;
}

declare function initIrisRtc(irisApiEngine: IrisApiEngine): void;
declare let AgoraWrapper: {
    initIrisRtc: typeof initIrisRtc;
};

export { Action, AgoraActionQueue, AgoraConsole, AgoraTool, AgoraTranslate, AgoraWrapper, Container, initIrisRtc, walkFun };
