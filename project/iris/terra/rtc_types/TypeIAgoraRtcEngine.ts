import { AUDIENCE_LATENCY_LEVEL_TYPE, AUDIO_SAMPLE_RATE_TYPE, AUDIO_SCENARIO_TYPE, CAPTURE_BRIGHTNESS_LEVEL_TYPE, CHANNEL_PROFILE_TYPE, CLIENT_ROLE_TYPE, QUALITY_ADAPT_INDICATION, Rectangle, ScreenCaptureParameters, THREAD_PRIORITY_TYPE, VideoFormat, VIDEO_CODEC_TYPE, VIDEO_STREAM_TYPE } from "./TypeAgoraBase";
import { RENDER_MODE_TYPE } from "./TypeAgoraMediaBase";
import { uid_t, video_track_id_t, view_t } from "./TypeBase";
import { LogConfig } from "./TypeIAgoraLog";



//c++ enum MEDIA_DEVICE_TYPE
export enum MEDIA_DEVICE_TYPE {
    UNKNOWN_AUDIO_DEVICE = -1,
    AUDIO_PLAYOUT_DEVICE = 0,
    AUDIO_RECORDING_DEVICE = 1,
    VIDEO_RENDER_DEVICE = 2,
    VIDEO_CAPTURE_DEVICE = 3,
    AUDIO_APPLICATION_PLAYOUT_DEVICE = 4,
}

//c++ enum AUDIO_MIXING_STATE_TYPE
export enum AUDIO_MIXING_STATE_TYPE {
    AUDIO_MIXING_STATE_PLAYING = 710,
    AUDIO_MIXING_STATE_PAUSED = 711,
    AUDIO_MIXING_STATE_STOPPED = 713,
    AUDIO_MIXING_STATE_FAILED = 714,
}

//c++ enum AUDIO_MIXING_REASON_TYPE
export enum AUDIO_MIXING_REASON_TYPE {
    AUDIO_MIXING_REASON_CAN_NOT_OPEN = 701,
    AUDIO_MIXING_REASON_TOO_FREQUENT_CALL = 702,
    AUDIO_MIXING_REASON_INTERRUPTED_EOF = 703,
    AUDIO_MIXING_REASON_ONE_LOOP_COMPLETED = 721,
    AUDIO_MIXING_REASON_ALL_LOOPS_COMPLETED = 723,
    AUDIO_MIXING_REASON_STOPPED_BY_USER = 724,
    AUDIO_MIXING_REASON_OK = 0,
}

//c++ enum INJECT_STREAM_STATUS
export enum INJECT_STREAM_STATUS {
    INJECT_STREAM_STATUS_START_SUCCESS = 0,
    INJECT_STREAM_STATUS_START_ALREADY_EXISTS = 1,
    INJECT_STREAM_STATUS_START_UNAUTHORIZED = 2,
    INJECT_STREAM_STATUS_START_TIMEDOUT = 3,
    INJECT_STREAM_STATUS_START_FAILED = 4,
    INJECT_STREAM_STATUS_STOP_SUCCESS = 5,
    INJECT_STREAM_STATUS_STOP_NOT_FOUND = 6,
    INJECT_STREAM_STATUS_STOP_UNAUTHORIZED = 7,
    INJECT_STREAM_STATUS_STOP_TIMEDOUT = 8,
    INJECT_STREAM_STATUS_STOP_FAILED = 9,
    INJECT_STREAM_STATUS_BROKEN = 10,
}

//c++ enum AUDIO_EQUALIZATION_BAND_FREQUENCY
export enum AUDIO_EQUALIZATION_BAND_FREQUENCY {
    AUDIO_EQUALIZATION_BAND_31 = 0,
    AUDIO_EQUALIZATION_BAND_62 = 1,
    AUDIO_EQUALIZATION_BAND_125 = 2,
    AUDIO_EQUALIZATION_BAND_250 = 3,
    AUDIO_EQUALIZATION_BAND_500 = 4,
    AUDIO_EQUALIZATION_BAND_1K = 5,
    AUDIO_EQUALIZATION_BAND_2K = 6,
    AUDIO_EQUALIZATION_BAND_4K = 7,
    AUDIO_EQUALIZATION_BAND_8K = 8,
    AUDIO_EQUALIZATION_BAND_16K = 9,
}

//c++ enum AUDIO_REVERB_TYPE
export enum AUDIO_REVERB_TYPE {
    AUDIO_REVERB_DRY_LEVEL = 0,
    AUDIO_REVERB_WET_LEVEL = 1,
    AUDIO_REVERB_ROOM_SIZE = 2,
    AUDIO_REVERB_WET_DELAY = 3,
    AUDIO_REVERB_STRENGTH = 4,
}

//c++ enum STREAM_FALLBACK_OPTIONS
export enum STREAM_FALLBACK_OPTIONS {
    STREAM_FALLBACK_OPTION_DISABLED = 0,
    STREAM_FALLBACK_OPTION_VIDEO_STREAM_LOW = 1,
    STREAM_FALLBACK_OPTION_AUDIO_ONLY = 2,
}

//c++ enum PRIORITY_TYPE
export enum PRIORITY_TYPE {
    PRIORITY_HIGH = 50,
    PRIORITY_NORMAL = 100,
}

//c++ Struct LocalVideoStats
export interface LocalVideoStats {
    uid: uid_t;
    sentBitrate: number;
    sentFrameRate: number;
    captureFrameRate: number;
    captureFrameWidth: number;
    captureFrameHeight: number;
    regulatedCaptureFrameRate: number;
    regulatedCaptureFrameWidth: number;
    regulatedCaptureFrameHeight: number;
    encoderOutputFrameRate: number;
    encodedFrameWidth: number;
    encodedFrameHeight: number;
    rendererOutputFrameRate: number;
    targetBitrate: number;
    targetFrameRate: number;
    qualityAdaptIndication: QUALITY_ADAPT_INDICATION;
    encodedBitrate: number;
    encodedFrameCount: number;
    codecType: VIDEO_CODEC_TYPE;
    txPacketLossRate: number;
    captureBrightnessLevel: CAPTURE_BRIGHTNESS_LEVEL_TYPE;
    dualStreamEnabled: boolean;
};

//c++ Struct RemoteVideoStats
export interface RemoteVideoStats {
    uid: uid_t;
    delay: number;
    width: number;
    height: number;
    receivedBitrate: number;
    decoderOutputFrameRate: number;
    rendererOutputFrameRate: number;
    frameLossRate: number;
    packetLossRate: number;
    rxStreamType: VIDEO_STREAM_TYPE;
    totalFrozenTime: number;
    frozenRate: number;
    avSyncTimeMs: number;
    totalActiveTime: number;
    publishDuration: number;
    superResolutionType: number;
};

//c++ Struct VideoCompositingLayout
export interface VideoCompositingLayout {
    canvasWidth: number;
    canvasHeight: number;
    backgroundColor: string;
    regions: Region[];
    regionCount: number;
    appData: string;
    appDataLength: number;
};

//c++ Struct Region
export interface Region {
    uid: uid_t;
    x: number;
    y: number;
    width: number;
    height: number;
    zOrder: number;
    alpha: number;
    renderMode: RENDER_MODE_TYPE;
};

//c++ Struct InjectStreamConfig
export interface InjectStreamConfig {
    width: number;
    height: number;
    videoGop: number;
    videoFramerate: number;
    videoBitrate: number;
    audioSampleRate: AUDIO_SAMPLE_RATE_TYPE;
    audioBitrate: number;
    audioChannels: number;
};

//c++ enum RTMP_STREAM_LIFE_CYCLE_TYPE
export enum RTMP_STREAM_LIFE_CYCLE_TYPE {
    RTMP_STREAM_LIFE_CYCLE_BIND2CHANNEL = 1,
    RTMP_STREAM_LIFE_CYCLE_BIND2OWNER = 2,
}

//c++ Struct PublisherConfiguration
export interface PublisherConfiguration {
    width: number;
    height: number;
    framerate: number;
    bitrate: number;
    defaultLayout: number;
    lifecycle: number;
    owner: boolean;
    injectStreamWidth: number;
    injectStreamHeight: number;
    injectStreamUrl: string;
    publishUrl: string;
    rawStreamUrl: string;
    extraInfo: string;
};

//c++ Struct AudioTrackConfig
export interface AudioTrackConfig {
    enableLocalPlayback: boolean;
};

//c++ enum CAMERA_DIRECTION
export enum CAMERA_DIRECTION {
    CAMERA_REAR = 0,
    CAMERA_FRONT = 1,
}

//c++ enum CLOUD_PROXY_TYPE
export enum CLOUD_PROXY_TYPE {
    NONE_PROXY = 0,
    UDP_PROXY = 1,
    TCP_PROXY = 2,
}

//c++ Struct CameraCapturerConfiguration
export interface CameraCapturerConfiguration {
    cameraDirection: CAMERA_DIRECTION;
    format: VideoFormat;
    followEncodeDimensionRatio: boolean;
};

//c++ Struct ScreenCaptureConfiguration
export interface ScreenCaptureConfiguration {
    isCaptureWindow: boolean;
    displayId: number;
    screenRect: Rectangle;
    windowId: view_t;
    params: ScreenCaptureParameters;
    regionRect: Rectangle;
};

//c++ Struct ThumbImageBuffer
export interface ThumbImageBuffer {
    buffer: Uint8ClampedArray;
    length: number;
    width: number;
    height: number;
};

//c++ enum ScreenCaptureSourceType
export enum ScreenCaptureSourceType {
    ScreenCaptureSourceType_Unknown = -1,
    ScreenCaptureSourceType_Window = 0,
    ScreenCaptureSourceType_Screen = 1,
    ScreenCaptureSourceType_Custom = 2,
}

//c++ Struct ScreenCaptureSourceInfo
export interface ScreenCaptureSourceInfo {
    type: ScreenCaptureSourceType;
    sourceId: view_t;
    sourceName: string;
    thumbImage: ThumbImageBuffer;
    iconImage: ThumbImageBuffer;
    processPath: string;
    sourceTitle: string;
    primaryMonitor: boolean;
    isOccluded: boolean;
};

//c++ Struct AdvancedAudioOptions
export interface AdvancedAudioOptions {
    audioProcessingChannels?: number;
};

//c++ Struct ImageTrackOptions
export interface ImageTrackOptions {
    imageUrl: string;
    fps: number;
};

//c++ Struct ChannelMediaOptions
export interface ChannelMediaOptions {
    publishCameraTrack?: boolean;
    publishSecondaryCameraTrack?: boolean;
    publishMicrophoneTrack?: boolean;
    publishScreenCaptureVideo?: boolean;
    publishScreenCaptureAudio?: boolean;
    publishCustomAudioTrack?: boolean;
    publishCustomAudioSourceId?: number;
    publishCustomAudioTrackEnableAec?: boolean;
    publishDirectCustomAudioTrack?: boolean;
    publishCustomAudioTrackAec?: boolean;
    publishCustomVideoTrack?: boolean;
    publishEncodedVideoTrack?: boolean;
    publishMediaPlayerAudioTrack?: boolean;
    publishMediaPlayerVideoTrack?: boolean;
    publishTrancodedVideoTrack?: boolean;
    autoSubscribeAudio?: boolean;
    autoSubscribeVideo?: boolean;
    enableAudioRecordingOrPlayout?: boolean;
    publishMediaPlayerId?: number;
    clientRoleType?: CLIENT_ROLE_TYPE;
    audienceLatencyLevel?: AUDIENCE_LATENCY_LEVEL_TYPE;
    defaultVideoStreamType?: VIDEO_STREAM_TYPE;
    channelProfile?: CHANNEL_PROFILE_TYPE;
    audioDelayMs?: number;
    mediaPlayerAudioDelayMs?: number;
    token?: string;
    enableBuiltInMediaEncryption?: boolean;
    publishRhythmPlayerTrack?: boolean;
    isInteractiveAudience?: boolean;
    customVideoTrackId?: video_track_id_t;
    isAudioFilterable?: boolean;
};

//c++ enum LOCAL_PROXY_MODE
export enum LOCAL_PROXY_MODE {
    ConnectivityFirst = 0,
    LocalOnly = 1,
}

//c++ enum PROXY_TYPE
export enum PROXY_TYPE {
    NONE_PROXY_TYPE = 0,
    UDP_PROXY_TYPE = 1,
    TCP_PROXY_TYPE = 2,
    LOCAL_PROXY_TYPE = 3,
    TCP_PROXY_AUTO_FALLBACK_TYPE = 4,
}

//c++ Struct LocalAccessPointConfiguration
export interface LocalAccessPointConfiguration {
    ipList: string[];
    ipListSize: number;
    domainList: string[];
    domainListSize: number;
    verifyDomainName: string;
    mode: LOCAL_PROXY_MODE;
};

//c++ Struct LeaveChannelOptions
export interface LeaveChannelOptions {
    stopAudioMixing: boolean;
    stopAllEffect: boolean;
    stopMicrophoneRecording: boolean;
};

//c++ Struct RtcEngineContext
export interface RtcEngineContext {
    // eventHandler: IRtcEngineEventHandler[];
    appId: string;
    context: any;
    enableAudioDevice: boolean;
    channelProfile: CHANNEL_PROFILE_TYPE;
    audioScenario: AUDIO_SCENARIO_TYPE;
    areaCode: number;
    logConfig: LogConfig;
    threadPriority?: THREAD_PRIORITY_TYPE;
    useExternalEglContext: boolean;
};

//c++ enum METADATA_TYPE
export enum METADATA_TYPE {
    UNKNOWN_METADATA = -1,
    VIDEO_METADATA = 0,
}

//c++ enum MAX_METADATA_SIZE_TYPE
export enum MAX_METADATA_SIZE_TYPE {
    INVALID_METADATA_SIZE_IN_BYTE = -1,
    DEFAULT_METADATA_SIZE_IN_BYTE = 512,
    MAX_METADATA_SIZE_IN_BYTE = 1024,
}

//c++ Struct Metadata
export interface Metadata {
    uid: number;
    size: number;
    buffer: Uint8ClampedArray;
    timeStampMs: number;
};

//c++ enum DIRECT_CDN_STREAMING_ERROR
export enum DIRECT_CDN_STREAMING_ERROR {
    DIRECT_CDN_STREAMING_ERROR_OK = 0,
    DIRECT_CDN_STREAMING_ERROR_FAILED = 1,
    DIRECT_CDN_STREAMING_ERROR_AUDIO_PUBLICATION = 2,
    DIRECT_CDN_STREAMING_ERROR_VIDEO_PUBLICATION = 3,
    DIRECT_CDN_STREAMING_ERROR_NET_CONNECT = 4,
    DIRECT_CDN_STREAMING_ERROR_BAD_NAME = 5,
}

//c++ enum DIRECT_CDN_STREAMING_STATE
export enum DIRECT_CDN_STREAMING_STATE {
    DIRECT_CDN_STREAMING_STATE_IDLE = 0,
    DIRECT_CDN_STREAMING_STATE_RUNNING = 1,
    DIRECT_CDN_STREAMING_STATE_STOPPED = 2,
    DIRECT_CDN_STREAMING_STATE_FAILED = 3,
    DIRECT_CDN_STREAMING_STATE_RECOVERING = 4,
}

//c++ Struct DirectCdnStreamingStats
export interface DirectCdnStreamingStats {
    videoWidth: number;
    videoHeight: number;
    fps: number;
    videoBitrate: number;
    audioBitrate: number;
};

//c++ Struct DirectCdnStreamingMediaOptions
export interface DirectCdnStreamingMediaOptions {
    publishCameraTrack?: boolean;
    publishMicrophoneTrack?: boolean;
    publishCustomAudioTrack?: boolean;
    publishCustomVideoTrack?: boolean;
    publishMediaPlayerAudioTrack?: boolean;
    publishMediaPlayerId?: number;
    customVideoTrackId?: video_track_id_t;
};

//c++ enum QUALITY_REPORT_FORMAT_TYPE
export enum QUALITY_REPORT_FORMAT_TYPE {
    QUALITY_REPORT_JSON = 0,
    QUALITY_REPORT_HTML = 1,
}

//c++ enum MEDIA_DEVICE_STATE_TYPE
export enum MEDIA_DEVICE_STATE_TYPE {
    MEDIA_DEVICE_STATE_IDLE = 0,
    MEDIA_DEVICE_STATE_ACTIVE = 1,
    MEDIA_DEVICE_STATE_DISABLED = 2,
    MEDIA_DEVICE_STATE_NOT_PRESENT = 4,
    MEDIA_DEVICE_STATE_UNPLUGGED = 8,
}

//c++ enum VIDEO_PROFILE_TYPE
export enum VIDEO_PROFILE_TYPE {
    VIDEO_PROFILE_LANDSCAPE_120P = 0,
    VIDEO_PROFILE_LANDSCAPE_120P_3 = 2,
    VIDEO_PROFILE_LANDSCAPE_180P = 10,
    VIDEO_PROFILE_LANDSCAPE_180P_3 = 12,
    VIDEO_PROFILE_LANDSCAPE_180P_4 = 13,
    VIDEO_PROFILE_LANDSCAPE_240P = 20,
    VIDEO_PROFILE_LANDSCAPE_240P_3 = 22,
    VIDEO_PROFILE_LANDSCAPE_240P_4 = 23,
    VIDEO_PROFILE_LANDSCAPE_360P = 30,
    VIDEO_PROFILE_LANDSCAPE_360P_3 = 32,
    VIDEO_PROFILE_LANDSCAPE_360P_4 = 33,
    VIDEO_PROFILE_LANDSCAPE_360P_6 = 35,
    VIDEO_PROFILE_LANDSCAPE_360P_7 = 36,
    VIDEO_PROFILE_LANDSCAPE_360P_8 = 37,
    VIDEO_PROFILE_LANDSCAPE_360P_9 = 38,
    VIDEO_PROFILE_LANDSCAPE_360P_10 = 39,
    VIDEO_PROFILE_LANDSCAPE_360P_11 = 100,
    VIDEO_PROFILE_LANDSCAPE_480P = 40,
    VIDEO_PROFILE_LANDSCAPE_480P_3 = 42,
    VIDEO_PROFILE_LANDSCAPE_480P_4 = 43,
    VIDEO_PROFILE_LANDSCAPE_480P_6 = 45,
    VIDEO_PROFILE_LANDSCAPE_480P_8 = 47,
    VIDEO_PROFILE_LANDSCAPE_480P_9 = 48,
    VIDEO_PROFILE_LANDSCAPE_480P_10 = 49,
    VIDEO_PROFILE_LANDSCAPE_720P = 50,
    VIDEO_PROFILE_LANDSCAPE_720P_3 = 52,
    VIDEO_PROFILE_LANDSCAPE_720P_5 = 54,
    VIDEO_PROFILE_LANDSCAPE_720P_6 = 55,
    VIDEO_PROFILE_LANDSCAPE_1080P = 60,
    VIDEO_PROFILE_LANDSCAPE_1080P_3 = 62,
    VIDEO_PROFILE_LANDSCAPE_1080P_5 = 64,
    VIDEO_PROFILE_LANDSCAPE_1440P = 66,
    VIDEO_PROFILE_LANDSCAPE_1440P_2 = 67,
    VIDEO_PROFILE_LANDSCAPE_4K = 70,
    VIDEO_PROFILE_LANDSCAPE_4K_3 = 72,
    VIDEO_PROFILE_PORTRAIT_120P = 1000,
    VIDEO_PROFILE_PORTRAIT_120P_3 = 1002,
    VIDEO_PROFILE_PORTRAIT_180P = 1010,
    VIDEO_PROFILE_PORTRAIT_180P_3 = 1012,
    VIDEO_PROFILE_PORTRAIT_180P_4 = 1013,
    VIDEO_PROFILE_PORTRAIT_240P = 1020,
    VIDEO_PROFILE_PORTRAIT_240P_3 = 1022,
    VIDEO_PROFILE_PORTRAIT_240P_4 = 1023,
    VIDEO_PROFILE_PORTRAIT_360P = 1030,
    VIDEO_PROFILE_PORTRAIT_360P_3 = 1032,
    VIDEO_PROFILE_PORTRAIT_360P_4 = 1033,
    VIDEO_PROFILE_PORTRAIT_360P_6 = 1035,
    VIDEO_PROFILE_PORTRAIT_360P_7 = 1036,
    VIDEO_PROFILE_PORTRAIT_360P_8 = 1037,
    VIDEO_PROFILE_PORTRAIT_360P_9 = 1038,
    VIDEO_PROFILE_PORTRAIT_360P_10 = 1039,
    VIDEO_PROFILE_PORTRAIT_360P_11 = 1100,
    VIDEO_PROFILE_PORTRAIT_480P = 1040,
    VIDEO_PROFILE_PORTRAIT_480P_3 = 1042,
    VIDEO_PROFILE_PORTRAIT_480P_4 = 1043,
    VIDEO_PROFILE_PORTRAIT_480P_6 = 1045,
    VIDEO_PROFILE_PORTRAIT_480P_8 = 1047,
    VIDEO_PROFILE_PORTRAIT_480P_9 = 1048,
    VIDEO_PROFILE_PORTRAIT_480P_10 = 1049,
    VIDEO_PROFILE_PORTRAIT_720P = 1050,
    VIDEO_PROFILE_PORTRAIT_720P_3 = 1052,
    VIDEO_PROFILE_PORTRAIT_720P_5 = 1054,
    VIDEO_PROFILE_PORTRAIT_720P_6 = 1055,
    VIDEO_PROFILE_PORTRAIT_1080P = 1060,
    VIDEO_PROFILE_PORTRAIT_1080P_3 = 1062,
    VIDEO_PROFILE_PORTRAIT_1080P_5 = 1064,
    VIDEO_PROFILE_PORTRAIT_1440P = 1066,
    VIDEO_PROFILE_PORTRAIT_1440P_2 = 1067,
    VIDEO_PROFILE_PORTRAIT_4K = 1070,
    VIDEO_PROFILE_PORTRAIT_4K_3 = 1072,
    VIDEO_PROFILE_DEFAULT = VIDEO_PROFILE_LANDSCAPE_360P,
}


export class IScreenCaptureSourceList {
};

export class IVideoDeviceCollection {

}

export class IMetadataObserver {

}

export class IRtcEngineEventHandler {

}

export interface IDirectCdnStreamingEventHandler {
    onDirectCdnStreamingStateChanged(state: DIRECT_CDN_STREAMING_STATE, error: DIRECT_CDN_STREAMING_ERROR, message: string): void;
    onDirectCdnStreamingStats(stats: DirectCdnStreamingStats): void;
};
