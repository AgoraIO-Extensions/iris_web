import { MEDIA_SOURCE_TYPE, RENDER_MODE_TYPE } from "./TypeAgoraMediaBase";
import { track_id_t, uid_t, view_t } from "./TypeBase";



//c++ enum CHANNEL_PROFILE_TYPE
export enum CHANNEL_PROFILE_TYPE {
    CHANNEL_PROFILE_COMMUNICATION = 0,
    CHANNEL_PROFILE_LIVE_BROADCASTING = 1,
    CHANNEL_PROFILE_GAME = 2,
    // CHANNEL_PROFILE_CLOUD_GAMING = 3,
    // CHANNEL_PROFILE_COMMUNICATION_1v1 = 4,
}

//c++ enum WARN_CODE_TYPE
export enum WARN_CODE_TYPE {
    WARN_INVALID_VIEW = 8,
    WARN_INIT_VIDEO = 16,
    WARN_PENDING = 20,
    WARN_NO_AVAILABLE_CHANNEL = 103,
    WARN_LOOKUP_CHANNEL_TIMEOUT = 104,
    WARN_LOOKUP_CHANNEL_REJECTED = 105,
    WARN_OPEN_CHANNEL_TIMEOUT = 106,
    WARN_OPEN_CHANNEL_REJECTED = 107,
    WARN_SWITCH_LIVE_VIDEO_TIMEOUT = 111,
    WARN_SET_CLIENT_ROLE_TIMEOUT = 118,
    WARN_OPEN_CHANNEL_INVALID_TICKET = 121,
    WARN_OPEN_CHANNEL_TRY_NEXT_VOS = 122,
    WARN_CHANNEL_CONNECTION_UNRECOVERABLE = 131,
    WARN_CHANNEL_CONNECTION_IP_CHANGED = 132,
    WARN_CHANNEL_CONNECTION_PORT_CHANGED = 133,
    WARN_CHANNEL_SOCKET_ERROR = 134,
    WARN_AUDIO_MIXING_OPEN_ERROR = 701,
    WARN_ADM_RUNTIME_PLAYOUT_WARNING = 1014,
    WARN_ADM_RUNTIME_RECORDING_WARNING = 1016,
    WARN_ADM_RECORD_AUDIO_SILENCE = 1019,
    WARN_ADM_PLAYOUT_MALFUNCTION = 1020,
    WARN_ADM_RECORD_MALFUNCTION = 1021,
    WARN_ADM_RECORD_AUDIO_LOWLEVEL = 1031,
    WARN_ADM_PLAYOUT_AUDIO_LOWLEVEL = 1032,
    WARN_ADM_WINDOWS_NO_DATA_READY_EVENT = 1040,
    WARN_APM_HOWLING = 1051,
    WARN_ADM_GLITCH_STATE = 1052,
    WARN_ADM_IMPROPER_SETTINGS = 1053,
    WARN_ADM_WIN_CORE_NO_RECORDING_DEVICE = 1322,
    WARN_ADM_WIN_CORE_NO_PLAYOUT_DEVICE = 1323,
    WARN_ADM_WIN_CORE_IMPROPER_CAPTURE_RELEASE = 1324,
}

//c++ enum ERROR_CODE_TYPE
export enum ERROR_CODE_TYPE {
    ERR_OK = 0,
    ERR_FAILED = 1,
    ERR_INVALID_ARGUMENT = 2,
    ERR_NOT_READY = 3,
    ERR_NOT_SUPPORTED = 4,
    ERR_REFUSED = 5,
    ERR_BUFFER_TOO_SMALL = 6,
    ERR_NOT_INITIALIZED = 7,
    ERR_INVALID_STATE = 8,
    ERR_NO_PERMISSION = 9,
    ERR_TIMEDOUT = 10,
    ERR_CANCELED = 11,
    ERR_TOO_OFTEN = 12,
    ERR_BIND_SOCKET = 13,
    ERR_NET_DOWN = 14,
    ERR_JOIN_CHANNEL_REJECTED = 17,
    ERR_LEAVE_CHANNEL_REJECTED = 18,
    ERR_ALREADY_IN_USE = 19,
    ERR_ABORTED = 20,
    ERR_INIT_NET_ENGINE = 21,
    ERR_RESOURCE_LIMITED = 22,
    ERR_INVALID_APP_ID = 101,
    ERR_INVALID_CHANNEL_NAME = 102,
    ERR_NO_SERVER_RESOURCES = 103,
    ERR_TOKEN_EXPIRED = 109,
    ERR_INVALID_TOKEN = 110,
    ERR_CONNECTION_INTERRUPTED = 111,
    ERR_CONNECTION_LOST = 112,
    ERR_NOT_IN_CHANNEL = 113,
    ERR_SIZE_TOO_LARGE = 114,
    ERR_BITRATE_LIMIT = 115,
    ERR_TOO_MANY_DATA_STREAMS = 116,
    ERR_STREAM_MESSAGE_TIMEOUT = 117,
    ERR_SET_CLIENT_ROLE_NOT_AUTHORIZED = 119,
    ERR_DECRYPTION_FAILED = 120,
    ERR_INVALID_USER_ID = 121,
    ERR_CLIENT_IS_BANNED_BY_SERVER = 123,
    ERR_ENCRYPTED_STREAM_NOT_ALLOWED_PUBLISH = 130,
    ERR_LICENSE_CREDENTIAL_INVALID = 131,
    ERR_INVALID_USER_ACCOUNT = 134,
    ERR_MODULE_NOT_FOUND = 157,
    ERR_CERT_RAW = 157,
    ERR_CERT_JSON_PART = 158,
    ERR_CERT_JSON_INVAL = 159,
    ERR_CERT_JSON_NOMEM = 160,
    ERR_CERT_CUSTOM = 161,
    ERR_CERT_CREDENTIAL = 162,
    ERR_CERT_SIGN = 163,
    ERR_CERT_FAIL = 164,
    ERR_CERT_BUF = 165,
    ERR_CERT_NULL = 166,
    ERR_CERT_DUEDATE = 167,
    ERR_CERT_REQUEST = 168,
    ERR_PCMSEND_FORMAT = 200,
    ERR_PCMSEND_BUFFEROVERFLOW = 201,
    ERR_LOGIN_ALREADY_LOGIN = 428,
    ERR_LOAD_MEDIA_ENGINE = 1001,
    ERR_ADM_GENERAL_ERROR = 1005,
    ERR_ADM_INIT_PLAYOUT = 1008,
    ERR_ADM_START_PLAYOUT = 1009,
    ERR_ADM_STOP_PLAYOUT = 1010,
    ERR_ADM_INIT_RECORDING = 1011,
    ERR_ADM_START_RECORDING = 1012,
    ERR_ADM_STOP_RECORDING = 1013,
    ERR_VDM_CAMERA_NOT_AUTHORIZED = 1501,
}

//c++ enum AUDIO_SESSION_OPERATION_RESTRICTION
export enum AUDIO_SESSION_OPERATION_RESTRICTION {
    AUDIO_SESSION_OPERATION_RESTRICTION_NONE = 0,
    AUDIO_SESSION_OPERATION_RESTRICTION_SET_CATEGORY = 1,
    AUDIO_SESSION_OPERATION_RESTRICTION_CONFIGURE_SESSION = 1 << 1,
    AUDIO_SESSION_OPERATION_RESTRICTION_DEACTIVATE_SESSION = 1 << 2,
    AUDIO_SESSION_OPERATION_RESTRICTION_ALL = 1 << 7,
}

//c++ Struct UserInfo
export interface UserInfo2 {
    userId: string;
    hasAudio: boolean;
    hasVideo: boolean;
};

//c++ enum USER_OFFLINE_REASON_TYPE
export enum USER_OFFLINE_REASON_TYPE {
    USER_OFFLINE_QUIT = 0,
    USER_OFFLINE_DROPPED = 1,
    USER_OFFLINE_BECOME_AUDIENCE = 2,
}

//c++ enum INTERFACE_ID_TYPE
export enum INTERFACE_ID_TYPE {
    AGORA_IID_AUDIO_DEVICE_MANAGER = 1,
    AGORA_IID_VIDEO_DEVICE_MANAGER = 2,
    AGORA_IID_PARAMETER_ENGINE = 3,
    AGORA_IID_MEDIA_ENGINE = 4,
    AGORA_IID_AUDIO_ENGINE = 5,
    AGORA_IID_VIDEO_ENGINE = 6,
    AGORA_IID_RTC_CONNECTION = 7,
    AGORA_IID_SIGNALING_ENGINE = 8,
    AGORA_IID_MEDIA_ENGINE_REGULATOR = 9,
    AGORA_IID_CLOUD_SPATIAL_AUDIO = 10,
    AGORA_IID_LOCAL_SPATIAL_AUDIO = 11,
    AGORA_IID_MEDIA_RECORDER = 12,
}

//c++ enum QUALITY_TYPE
export enum QUALITY_TYPE {
    QUALITY_UNKNOWN = 0,
    QUALITY_EXCELLENT = 1,
    QUALITY_GOOD = 2,
    QUALITY_POOR = 3,
    QUALITY_BAD = 4,
    QUALITY_VBAD = 5,
    QUALITY_DOWN = 6,
    QUALITY_UNSUPPORTED = 7,
    QUALITY_DETECTING = 8,
}

//c++ enum FIT_MODE_TYPE
export enum FIT_MODE_TYPE {
    MODE_COVER = 1,
    MODE_CONTAIN = 2,
}

//c++ enum VIDEO_ORIENTATION
export enum VIDEO_ORIENTATION {
    VIDEO_ORIENTATION_0 = 0,
    VIDEO_ORIENTATION_90 = 90,
    VIDEO_ORIENTATION_180 = 180,
    VIDEO_ORIENTATION_270 = 270,
}

//c++ enum FRAME_RATE
export enum FRAME_RATE {
    FRAME_RATE_FPS_1 = 1,
    FRAME_RATE_FPS_7 = 7,
    FRAME_RATE_FPS_10 = 10,
    FRAME_RATE_FPS_15 = 15,
    FRAME_RATE_FPS_24 = 24,
    FRAME_RATE_FPS_30 = 30,
    FRAME_RATE_FPS_60 = 60,
}

//c++ enum FRAME_WIDTH
export enum FRAME_WIDTH {
    FRAME_WIDTH_640 = 640,
}

//c++ enum FRAME_HEIGHT
export enum FRAME_HEIGHT {
    FRAME_HEIGHT_360 = 360,
}

//c++ enum VIDEO_FRAME_TYPE
export enum VIDEO_FRAME_TYPE {
    VIDEO_FRAME_TYPE_BLANK_FRAME = 0,
    VIDEO_FRAME_TYPE_KEY_FRAME = 3,
    VIDEO_FRAME_TYPE_DELTA_FRAME = 4,
    VIDEO_FRAME_TYPE_B_FRAME = 5,
    VIDEO_FRAME_TYPE_DROPPABLE_FRAME = 6,
    VIDEO_FRAME_TYPE_UNKNOW,
}

//c++ enum ORIENTATION_MODE
export enum ORIENTATION_MODE {
    ORIENTATION_MODE_ADAPTIVE = 0,
    ORIENTATION_MODE_FIXED_LANDSCAPE = 1,
    ORIENTATION_MODE_FIXED_PORTRAIT = 2,
}

//c++ enum DEGRADATION_PREFERENCE
export enum DEGRADATION_PREFERENCE {
    MAINTAIN_QUALITY = 0,
    MAINTAIN_FRAMERATE = 1,
    MAINTAIN_BALANCED = 2,
    MAINTAIN_RESOLUTION = 3,
    DISABLED = 100,
}

//c++ Struct VideoDimensions
export interface VideoDimensions {
    width: number;
    height: number;
};

//c++ enum VIDEO_CODEC_TYPE
export enum VIDEO_CODEC_TYPE {
    VIDEO_CODEC_NONE = 0,
    VIDEO_CODEC_VP8 = 1,
    VIDEO_CODEC_H264 = 2,
    VIDEO_CODEC_H265 = 3,
    VIDEO_CODEC_GENERIC = 6,
    VIDEO_CODEC_GENERIC_H264 = 7,
    VIDEO_CODEC_AV1 = 12,
    VIDEO_CODEC_VP9 = 13,
    VIDEO_CODEC_GENERIC_JPEG = 20,
}

//c++ enum TCcMode
export enum TCcMode {
    CC_ENABLED,
    CC_DISABLED,
}

//c++ Struct SenderOptions
export interface SenderOptions {
    ccMode: TCcMode;
    codecType: VIDEO_CODEC_TYPE;
    targetBitrate: number;
};

//c++ enum AUDIO_CODEC_TYPE
export enum AUDIO_CODEC_TYPE {
    AUDIO_CODEC_OPUS = 1,
    AUDIO_CODEC_PCMA = 3,
    AUDIO_CODEC_PCMU = 4,
    AUDIO_CODEC_G722 = 5,
    AUDIO_CODEC_AACLC = 8,
    AUDIO_CODEC_HEAAC = 9,
    AUDIO_CODEC_JC1 = 10,
    AUDIO_CODEC_HEAAC2 = 11,
    AUDIO_CODEC_LPCNET = 12,
}

//c++ enum AUDIO_ENCODING_TYPE
export enum AUDIO_ENCODING_TYPE {
    AUDIO_ENCODING_TYPE_AAC_16000_LOW = 0x010101,
    AUDIO_ENCODING_TYPE_AAC_16000_MEDIUM = 0x010102,
    AUDIO_ENCODING_TYPE_AAC_32000_LOW = 0x010201,
    AUDIO_ENCODING_TYPE_AAC_32000_MEDIUM = 0x010202,
    AUDIO_ENCODING_TYPE_AAC_32000_HIGH = 0x010203,
    AUDIO_ENCODING_TYPE_AAC_48000_MEDIUM = 0x010302,
    AUDIO_ENCODING_TYPE_AAC_48000_HIGH = 0x010303,
    AUDIO_ENCODING_TYPE_OPUS_16000_LOW = 0x020101,
    AUDIO_ENCODING_TYPE_OPUS_16000_MEDIUM = 0x020102,
    AUDIO_ENCODING_TYPE_OPUS_48000_MEDIUM = 0x020302,
    AUDIO_ENCODING_TYPE_OPUS_48000_HIGH = 0x020303,
}

//c++ enum WATERMARK_FIT_MODE
export enum WATERMARK_FIT_MODE {
    FIT_MODE_COVER_POSITION,
    FIT_MODE_USE_IMAGE_RATIO,
}

//c++ Struct EncodedAudioFrameAdvancedSettings
export interface EncodedAudioFrameAdvancedSettings {
    speech: boolean;
    sendEvenIfEmpty: boolean;
};

//c++ Struct EncodedAudioFrameInfo
export interface EncodedAudioFrameInfo {
    codec: AUDIO_CODEC_TYPE;
    sampleRateHz: number;
    samplesPerChannel: number;
    numberOfChannels: number;
    advancedSettings: EncodedAudioFrameAdvancedSettings;
    captureTimeMs: number;
};

//c++ Struct AudioPcmDataInfo
export interface AudioPcmDataInfo {
    samplesPerChannel: number;
    channelNum: number;
    samplesOut: number;
    elapsedTimeMs: number;
    ntpTimeMs: number;
};

//c++ enum H264PacketizeMode
export enum H264PacketizeMode {
    NonInterleaved = 0,
    SingleNalUnit,
}

//c++ enum VIDEO_STREAM_TYPE
export enum VIDEO_STREAM_TYPE {
    VIDEO_STREAM_HIGH = 0,
    VIDEO_STREAM_LOW = 1,
}

//c++ Struct VideoSubscriptionOptions
export interface VideoSubscriptionOptions {
    type?: VIDEO_STREAM_TYPE;
    encodedFrameOnly?: boolean;
};

//c++ Struct EncodedVideoFrameInfo
export interface EncodedVideoFrameInfo {
    codecType: VIDEO_CODEC_TYPE;
    width: number;
    height: number;
    framesPerSecond: number;
    frameType: VIDEO_FRAME_TYPE;
    rotation: VIDEO_ORIENTATION;
    trackId: number;
    captureTimeMs: number;
    uid: uid_t;
    streamType: VIDEO_STREAM_TYPE;
};

//c++ enum VIDEO_MIRROR_MODE_TYPE
export enum VIDEO_MIRROR_MODE_TYPE {
    VIDEO_MIRROR_MODE_AUTO = 0,
    VIDEO_MIRROR_MODE_ENABLED = 1,
    VIDEO_MIRROR_MODE_DISABLED = 2,
}

export let STANDARD_BITRATE = 0;
export let COMPATIBLE_BITRATE = -1;
export let DEFAULT_MIN_BITRATE = -1;
export let DEFAULT_MIN_BITRATE_EQUAL_TO_TARGET_BITRATE = -2;

//c++ Struct VideoEncoderConfiguration
export class VideoEncoderConfiguration {
    codecType: VIDEO_CODEC_TYPE = VIDEO_CODEC_TYPE.VIDEO_CODEC_H264;
    dimensions: VideoDimensions = { width: 640, height: 360 };
    frameRate: number = 15;
    minFrameRate: number = 0;
    bitrate: number = STANDARD_BITRATE;
    minBitrate: number = DEFAULT_MIN_BITRATE;
    orientationMode: ORIENTATION_MODE = ORIENTATION_MODE.ORIENTATION_MODE_ADAPTIVE;
    degradationPreference: DEGRADATION_PREFERENCE = DEGRADATION_PREFERENCE.MAINTAIN_QUALITY;
    mirrorMode: VIDEO_MIRROR_MODE_TYPE = VIDEO_MIRROR_MODE_TYPE.VIDEO_MIRROR_MODE_DISABLED;
};

//c++ Struct DataStreamConfig
export interface DataStreamConfig {
    syncWithAudio: boolean;
    ordered: boolean;
};

//c++ enum SIMULCAST_STREAM_MODE
export enum SIMULCAST_STREAM_MODE {
    AUTO_SIMULCAST_STREAM = -1,
    DISABLE_SIMULCAST_STREM = 0,
    ENABLE_SIMULCAST_STREAM = 1,
}

//c++ Struct SimulcastStreamConfig
export interface SimulcastStreamConfig {
    dimensions: VideoDimensions;
    bitrate: number;
    framerate: number;
};

//c++ Struct Rectangle
export interface Rectangle {
    x: number;
    y: number;
    width: number;
    height: number;
};

//c++ Struct WatermarkRatio
export interface WatermarkRatio {
    xRatio: number;
    yRatio: number;
    widthRatio: number;
};

//c++ Struct WatermarkOptions
export interface WatermarkOptions {
    visibleInPreview: boolean;
    positionInLandscapeMode: Rectangle;
    positionInPortraitMode: Rectangle;
    watermarkRatio: WatermarkRatio;
    mode: WATERMARK_FIT_MODE;
};

//c++ Struct RtcStats
export class RtcStats {
    duration: number = 0;
    txBytes: number = 0;
    rxBytes: number = 0;
    txAudioBytes: number = 0;
    txVideoBytes: number = 0;
    rxAudioBytes: number = 0;
    rxVideoBytes: number = 0;
    txKBitRate: number = 0;
    rxKBitRate: number = 0;
    rxAudioKBitRate: number = 0;
    txAudioKBitRate: number = 0;
    rxVideoKBitRate: number = 0;
    txVideoKBitRate: number = 0;
    lastmileDelay: number = 0;
    userCount: number = 0;
    cpuAppUsage: number = 0;
    cpuTotalUsage: number = 0;
    gatewayRtt: number = 0;
    memoryAppUsageRatio: number = 0;
    memoryTotalUsageRatio: number = 0;
    memoryAppUsageInKbytes: number = 0;
    connectTimeMs: number = 0;
    firstAudioPacketDuration: number = 0;
    firstVideoPacketDuration: number = 0;
    firstVideoKeyFramePacketDuration: number = 0;
    packetsBeforeFirstKeyFramePacket: number = 0;
    firstAudioPacketDurationAfterUnmute: number = 0;
    firstVideoPacketDurationAfterUnmute: number = 0;
    firstVideoKeyFramePacketDurationAfterUnmute: number = 0;
    firstVideoKeyFrameDecodedDurationAfterUnmute: number = 0;
    firstVideoKeyFrameRenderedDurationAfterUnmute: number = 0;
    txPacketLossRate: number = 0;
    rxPacketLossRate: number = 0;
};

//c++ enum VIDEO_SOURCE_TYPE
export enum VIDEO_SOURCE_TYPE {
    VIDEO_SOURCE_CAMERA_PRIMARY,
    VIDEO_SOURCE_CAMERA = VIDEO_SOURCE_CAMERA_PRIMARY,
    VIDEO_SOURCE_CAMERA_SECONDARY,
    VIDEO_SOURCE_SCREEN_PRIMARY,
    VIDEO_SOURCE_SCREEN = VIDEO_SOURCE_SCREEN_PRIMARY,
    VIDEO_SOURCE_SCREEN_SECONDARY,
    VIDEO_SOURCE_CUSTOM,
    VIDEO_SOURCE_MEDIA_PLAYER,
    VIDEO_SOURCE_RTC_IMAGE_PNG,
    VIDEO_SOURCE_RTC_IMAGE_JPEG,
    VIDEO_SOURCE_RTC_IMAGE_GIF,
    VIDEO_SOURCE_REMOTE,
    VIDEO_SOURCE_TRANSCODED,
    VIDEO_SOURCE_UNKNOWN = 100,
}



//c++ enum CLIENT_ROLE_TYPE
export enum CLIENT_ROLE_TYPE {
    CLIENT_ROLE_BROADCASTER = 1,
    CLIENT_ROLE_AUDIENCE = 2,
}

//c++ enum QUALITY_ADAPT_INDICATION
export enum QUALITY_ADAPT_INDICATION {
    ADAPT_NONE = 0,
    ADAPT_UP_BANDWIDTH = 1,
    ADAPT_DOWN_BANDWIDTH = 2,
}

//c++ enum AUDIENCE_LATENCY_LEVEL_TYPE
export enum AUDIENCE_LATENCY_LEVEL_TYPE {
    AUDIENCE_LATENCY_LEVEL_LOW_LATENCY = 1,
    AUDIENCE_LATENCY_LEVEL_ULTRA_LOW_LATENCY = 2,
}

//c++ Struct ClientRoleOptions
export interface ClientRoleOptions {
    audienceLatencyLevel: AUDIENCE_LATENCY_LEVEL_TYPE;
    stopMicrophoneRecording: boolean;
    stopPreview: boolean;
};

//c++ enum EXPERIENCE_QUALITY_TYPE
export enum EXPERIENCE_QUALITY_TYPE {
    EXPERIENCE_QUALITY_GOOD = 0,
    EXPERIENCE_QUALITY_BAD = 1,
}

//c++ enum EXPERIENCE_POOR_REASON
export enum EXPERIENCE_POOR_REASON {
    EXPERIENCE_REASON_NONE = 0,
    REMOTE_NETWORK_QUALITY_POOR = 1,
    LOCAL_NETWORK_QUALITY_POOR = 2,
    WIRELESS_SIGNAL_POOR = 4,
    WIFI_BLUETOOTH_COEXIST = 8,
}

//c++ Struct RemoteAudioStats
export interface RemoteAudioStats {
    uid: uid_t;
    quality: number;
    networkTransportDelay: number;
    jitterBufferDelay: number;
    audioLossRate: number;
    numChannels: number;
    receivedSampleRate: number;
    receivedBitrate: number;
    totalFrozenTime: number;
    frozenRate: number;
    mosValue: number;
    totalActiveTime: number;
    publishDuration: number;
    qoeQuality: number;
    qualityChangedReason: number;
};

//c++ enum AUDIO_PROFILE_TYPE
export enum AUDIO_PROFILE_TYPE {
    AUDIO_PROFILE_DEFAULT = 0,
    AUDIO_PROFILE_SPEECH_STANDARD = 1,
    AUDIO_PROFILE_MUSIC_STANDARD = 2,
    AUDIO_PROFILE_MUSIC_STANDARD_STEREO = 3,
    AUDIO_PROFILE_MUSIC_HIGH_QUALITY = 4,
    AUDIO_PROFILE_MUSIC_HIGH_QUALITY_STEREO = 5,
    AUDIO_PROFILE_IOT = 6,
    AUDIO_PROFILE_NUM = 7,
}

//c++ enum AUDIO_SCENARIO_TYPE
export enum AUDIO_SCENARIO_TYPE {
    AUDIO_SCENARIO_DEFAULT = 0,
    AUDIO_SCENARIO_GAME_STREAMING = 3,
    AUDIO_SCENARIO_CHATROOM = 5,
    AUDIO_SCENARIO_CHORUS = 7,
    AUDIO_SCENARIO_MEETING = 8,
    AUDIO_SCENARIO_NUM = 9,
}

//c++ Struct VideoFormat
export interface VideoFormat {
    width: number;
    height: number;
    fps: number;
};

//c++ enum 
export enum OPTIONAL_ENUM_SIZE_T {
    kMaxWidthInPixels = 3840,
    kMaxHeightInPixels = 2160,
    kMaxFps = 60,
}

//c++ enum VIDEO_CONTENT_HINT
export enum VIDEO_CONTENT_HINT {
    CONTENT_HINT_NONE,
    CONTENT_HINT_MOTION,
    CONTENT_HINT_DETAILS,
}

//c++ enum SCREEN_SCENARIO_TYPE
export enum SCREEN_SCENARIO_TYPE {
    SCREEN_SCENARIO_DOCUMENT = 1,
    SCREEN_SCENARIO_GAMING = 2,
    SCREEN_SCENARIO_VIDEO = 3,
    SCREEN_SCENARIO_RDC = 4,
}

//c++ enum CAPTURE_BRIGHTNESS_LEVEL_TYPE
export enum CAPTURE_BRIGHTNESS_LEVEL_TYPE {
    CAPTURE_BRIGHTNESS_LEVEL_INVALID = -1,
    CAPTURE_BRIGHTNESS_LEVEL_NORMAL = 0,
    CAPTURE_BRIGHTNESS_LEVEL_BRIGHT = 1,
    CAPTURE_BRIGHTNESS_LEVEL_DARK = 2,
}

//c++ enum LOCAL_AUDIO_STREAM_STATE
export enum LOCAL_AUDIO_STREAM_STATE {
    LOCAL_AUDIO_STREAM_STATE_STOPPED = 0,
    LOCAL_AUDIO_STREAM_STATE_RECORDING = 1,
    LOCAL_AUDIO_STREAM_STATE_ENCODING = 2,
    LOCAL_AUDIO_STREAM_STATE_FAILED = 3,
}

//c++ enum LOCAL_AUDIO_STREAM_ERROR
export enum LOCAL_AUDIO_STREAM_ERROR {
    LOCAL_AUDIO_STREAM_ERROR_OK = 0,
    LOCAL_AUDIO_STREAM_ERROR_FAILURE = 1,
    LOCAL_AUDIO_STREAM_ERROR_DEVICE_NO_PERMISSION = 2,
    LOCAL_AUDIO_STREAM_ERROR_DEVICE_BUSY = 3,
    LOCAL_AUDIO_STREAM_ERROR_RECORD_FAILURE = 4,
    LOCAL_AUDIO_STREAM_ERROR_ENCODE_FAILURE = 5,
    LOCAL_AUDIO_STREAM_ERROR_NO_RECORDING_DEVICE = 6,
    LOCAL_AUDIO_STREAM_ERROR_NO_PLAYOUT_DEVICE = 7,
    LOCAL_AUDIO_STREAM_ERROR_INTERRUPTED = 8,
    LOCAL_AUDIO_STREAM_ERROR_RECORD_INVALID_ID = 9,
    LOCAL_AUDIO_STREAM_ERROR_PLAYOUT_INVALID_ID = 10,
}

//c++ enum LOCAL_VIDEO_STREAM_STATE
export enum LOCAL_VIDEO_STREAM_STATE {
    LOCAL_VIDEO_STREAM_STATE_STOPPED = 0,
    LOCAL_VIDEO_STREAM_STATE_CAPTURING = 1,
    LOCAL_VIDEO_STREAM_STATE_ENCODING = 2,
    LOCAL_VIDEO_STREAM_STATE_FAILED = 3,
}

//c++ enum LOCAL_VIDEO_STREAM_ERROR
export enum LOCAL_VIDEO_STREAM_ERROR {
    LOCAL_VIDEO_STREAM_ERROR_OK = 0,
    LOCAL_VIDEO_STREAM_ERROR_FAILURE = 1,
    LOCAL_VIDEO_STREAM_ERROR_DEVICE_NO_PERMISSION = 2,
    LOCAL_VIDEO_STREAM_ERROR_DEVICE_BUSY = 3,
    LOCAL_VIDEO_STREAM_ERROR_CAPTURE_FAILURE = 4,
    LOCAL_VIDEO_STREAM_ERROR_ENCODE_FAILURE = 5,
    LOCAL_VIDEO_STREAM_ERROR_CAPTURE_INBACKGROUND = 6,
    LOCAL_VIDEO_STREAM_ERROR_CAPTURE_MULTIPLE_FOREGROUND_APPS = 7,
    LOCAL_VIDEO_STREAM_ERROR_DEVICE_NOT_FOUND = 8,
    LOCAL_VIDEO_STREAM_ERROR_DEVICE_DISCONNECTED = 9,
    LOCAL_VIDEO_STREAM_ERROR_DEVICE_INVALID_ID = 10,
    LOCAL_VIDEO_STREAM_ERROR_DEVICE_SYSTEM_PRESSURE = 101,
    LOCAL_VIDEO_STREAM_ERROR_SCREEN_CAPTURE_WINDOW_MINIMIZED = 11,
    LOCAL_VIDEO_STREAM_ERROR_SCREEN_CAPTURE_WINDOW_CLOSED = 12,
    LOCAL_VIDEO_STREAM_ERROR_SCREEN_CAPTURE_WINDOW_OCCLUDED = 13,
    LOCAL_VIDEO_STREAM_ERROR_SCREEN_CAPTURE_WINDOW_NOT_SUPPORTED = 20,
}

//c++ enum REMOTE_AUDIO_STATE
export enum REMOTE_AUDIO_STATE {
    REMOTE_AUDIO_STATE_STOPPED = 0,
    REMOTE_AUDIO_STATE_STARTING = 1,
    REMOTE_AUDIO_STATE_DECODING = 2,
    REMOTE_AUDIO_STATE_FROZEN = 3,
    REMOTE_AUDIO_STATE_FAILED = 4,
}

//c++ enum REMOTE_AUDIO_STATE_REASON
export enum REMOTE_AUDIO_STATE_REASON {
    REMOTE_AUDIO_REASON_INTERNAL = 0,
    REMOTE_AUDIO_REASON_NETWORK_CONGESTION = 1,
    REMOTE_AUDIO_REASON_NETWORK_RECOVERY = 2,
    REMOTE_AUDIO_REASON_LOCAL_MUTED = 3,
    REMOTE_AUDIO_REASON_LOCAL_UNMUTED = 4,
    REMOTE_AUDIO_REASON_REMOTE_MUTED = 5,
    REMOTE_AUDIO_REASON_REMOTE_UNMUTED = 6,
    REMOTE_AUDIO_REASON_REMOTE_OFFLINE = 7,
}

//c++ enum REMOTE_VIDEO_STATE
export enum REMOTE_VIDEO_STATE {
    REMOTE_VIDEO_STATE_STOPPED = 0,
    REMOTE_VIDEO_STATE_STARTING = 1,
    REMOTE_VIDEO_STATE_DECODING = 2,
    REMOTE_VIDEO_STATE_FROZEN = 3,
    REMOTE_VIDEO_STATE_FAILED = 4,
}

//c++ enum REMOTE_VIDEO_STATE_REASON
export enum REMOTE_VIDEO_STATE_REASON {
    REMOTE_VIDEO_STATE_REASON_INTERNAL = 0,
    REMOTE_VIDEO_STATE_REASON_NETWORK_CONGESTION = 1,
    REMOTE_VIDEO_STATE_REASON_NETWORK_RECOVERY = 2,
    REMOTE_VIDEO_STATE_REASON_LOCAL_MUTED = 3,
    REMOTE_VIDEO_STATE_REASON_LOCAL_UNMUTED = 4,
    REMOTE_VIDEO_STATE_REASON_REMOTE_MUTED = 5,
    REMOTE_VIDEO_STATE_REASON_REMOTE_UNMUTED = 6,
    REMOTE_VIDEO_STATE_REASON_REMOTE_OFFLINE = 7,
    REMOTE_VIDEO_STATE_REASON_AUDIO_FALLBACK = 8,
    REMOTE_VIDEO_STATE_REASON_AUDIO_FALLBACK_RECOVERY = 9,
    REMOTE_VIDEO_STATE_REASON_VIDEO_STREAM_TYPE_CHANGE_TO_LOW = 10,
    REMOTE_VIDEO_STATE_REASON_VIDEO_STREAM_TYPE_CHANGE_TO_HIGH = 11,
    REMOTE_VIDEO_STATE_REASON_SDK_IN_BACKGROUND = 12,
}

//c++ enum REMOTE_USER_STATE
export enum REMOTE_USER_STATE {
    USER_STATE_MUTE_AUDIO = (1 << 0),
    USER_STATE_MUTE_VIDEO = (1 << 1),
    USER_STATE_ENABLE_VIDEO = (1 << 4),
    USER_STATE_ENABLE_LOCAL_VIDEO = (1 << 8),
}

//c++ Struct VideoTrackInfo
export interface VideoTrackInfo {
    isLocal: boolean;
    ownerUid: uid_t;
    trackId: track_id_t;
    channelId: string;
    streamType: VIDEO_STREAM_TYPE;
    codecType: VIDEO_CODEC_TYPE;
    encodedFrameOnly: boolean;
    sourceType: VIDEO_SOURCE_TYPE;
    observationPosition: number;
};

//c++ enum REMOTE_VIDEO_DOWNSCALE_LEVEL
export enum REMOTE_VIDEO_DOWNSCALE_LEVEL {
    REMOTE_VIDEO_DOWNSCALE_LEVEL_NONE,
    REMOTE_VIDEO_DOWNSCALE_LEVEL_1,
    REMOTE_VIDEO_DOWNSCALE_LEVEL_2,
    REMOTE_VIDEO_DOWNSCALE_LEVEL_3,
    REMOTE_VIDEO_DOWNSCALE_LEVEL_4,
}

//c++ Struct AudioVolumeInfo
export interface AudioVolumeInfo {
    uid: uid_t;
    volume: number;
    vad: number;
    voicePitch: number;
};

//c++ Struct DeviceInfo
// export interface DeviceInfo {
//     isLowLatencyAudioSupported: boolean;
// };

//c++ Struct Packet
export interface Packet {
    buffer: Uint8ClampedArray;
    size: number;
};

//c++ enum AUDIO_SAMPLE_RATE_TYPE
export enum AUDIO_SAMPLE_RATE_TYPE {
    AUDIO_SAMPLE_RATE_32000 = 32000,
    AUDIO_SAMPLE_RATE_44100 = 44100,
    AUDIO_SAMPLE_RATE_48000 = 48000,
}

//c++ enum VIDEO_CODEC_TYPE_FOR_STREAM
export enum VIDEO_CODEC_TYPE_FOR_STREAM {
    VIDEO_CODEC_H264_FOR_STREAM = 1,
    VIDEO_CODEC_H265_FOR_STREAM = 2,
}

//c++ enum VIDEO_CODEC_PROFILE_TYPE
export enum VIDEO_CODEC_PROFILE_TYPE {
    VIDEO_CODEC_PROFILE_BASELINE = 66,
    VIDEO_CODEC_PROFILE_MAIN = 77,
    VIDEO_CODEC_PROFILE_HIGH = 100,
}

//c++ enum AUDIO_CODEC_PROFILE_TYPE
export enum AUDIO_CODEC_PROFILE_TYPE {
    AUDIO_CODEC_PROFILE_LC_AAC = 0,
    AUDIO_CODEC_PROFILE_HE_AAC = 1,
    AUDIO_CODEC_PROFILE_HE_AAC_V2 = 2,
}

//c++ Struct LocalAudioStats
export interface LocalAudioStats {
    numChannels: number;
    sentSampleRate: number;
    sentBitrate: number;
    internalCodec: number;
    txPacketLossRate: number;
    audioDeviceDelay: number;
};

//c++ enum RTMP_STREAM_PUBLISH_STATE
export enum RTMP_STREAM_PUBLISH_STATE {
    RTMP_STREAM_PUBLISH_STATE_IDLE = 0,
    RTMP_STREAM_PUBLISH_STATE_CONNECTING = 1,
    RTMP_STREAM_PUBLISH_STATE_RUNNING = 2,
    RTMP_STREAM_PUBLISH_STATE_RECOVERING = 3,
    RTMP_STREAM_PUBLISH_STATE_FAILURE = 4,
    RTMP_STREAM_PUBLISH_STATE_DISCONNECTING = 5,
}

//c++ enum RTMP_STREAM_PUBLISH_ERROR_TYPE
export enum RTMP_STREAM_PUBLISH_ERROR_TYPE {
    RTMP_STREAM_PUBLISH_ERROR_OK = 0,
    RTMP_STREAM_PUBLISH_ERROR_INVALID_ARGUMENT = 1,
    RTMP_STREAM_PUBLISH_ERROR_ENCRYPTED_STREAM_NOT_ALLOWED = 2,
    RTMP_STREAM_PUBLISH_ERROR_CONNECTION_TIMEOUT = 3,
    RTMP_STREAM_PUBLISH_ERROR_INTERNAL_SERVER_ERROR = 4,
    RTMP_STREAM_PUBLISH_ERROR_RTMP_SERVER_ERROR = 5,
    RTMP_STREAM_PUBLISH_ERROR_TOO_OFTEN = 6,
    RTMP_STREAM_PUBLISH_ERROR_REACH_LIMIT = 7,
    RTMP_STREAM_PUBLISH_ERROR_NOT_AUTHORIZED = 8,
    RTMP_STREAM_PUBLISH_ERROR_STREAM_NOT_FOUND = 9,
    RTMP_STREAM_PUBLISH_ERROR_FORMAT_NOT_SUPPORTED = 10,
    RTMP_STREAM_PUBLISH_ERROR_NOT_BROADCASTER = 11,
    RTMP_STREAM_PUBLISH_ERROR_TRANSCODING_NO_MIX_STREAM = 13,
    RTMP_STREAM_PUBLISH_ERROR_NET_DOWN = 14,
    RTMP_STREAM_PUBLISH_ERROR_INVALID_APPID = 15,
    RTMP_STREAM_PUBLISH_ERROR_INVALID_PRIVILEGE = 16,
    RTMP_STREAM_UNPUBLISH_ERROR_OK = 100,
}

//c++ enum RTMP_STREAMING_EVENT
export enum RTMP_STREAMING_EVENT {
    RTMP_STREAMING_EVENT_FAILED_LOAD_IMAGE = 1,
    RTMP_STREAMING_EVENT_URL_ALREADY_IN_USE = 2,
    RTMP_STREAMING_EVENT_ADVANCED_FEATURE_NOT_SUPPORT = 3,
    RTMP_STREAMING_EVENT_REQUEST_TOO_OFTEN = 4,
}

//c++ Struct RtcImage
export interface RtcImage {
    url: string;
    x: number;
    y: number;
    width: number;
    height: number;
    zOrder: number;
    alpha: number;
};

//c++ Struct LiveStreamAdvancedFeature
export interface LiveStreamAdvancedFeature {
    featureName: string;
    opened: boolean;
};

//c++ enum CONNECTION_STATE_TYPE
export enum CONNECTION_STATE_TYPE {
    CONNECTION_STATE_DISCONNECTED = 1,
    CONNECTION_STATE_CONNECTING = 2,
    CONNECTION_STATE_CONNECTED = 3,
    CONNECTION_STATE_RECONNECTING = 4,
    CONNECTION_STATE_FAILED = 5,
}

//c++ Struct TranscodingUser
export interface TranscodingUser {
    uid: uid_t;
    x: number;
    y: number;
    width: number;
    height: number;
    zOrder: number;
    alpha: number;
    audioChannel: number;
};

//c++ Struct LiveTranscoding
export interface LiveTranscoding {
    width: number;
    height: number;
    videoBitrate: number;
    videoFramerate: number;
    lowLatency: boolean;
    videoGop: number;
    videoCodecProfile: VIDEO_CODEC_PROFILE_TYPE;
    backgroundColor: number;
    videoCodecType: VIDEO_CODEC_TYPE_FOR_STREAM;
    userCount: number;
    transcodingUsers: TranscodingUser[];
    transcodingExtraInfo: string;
    metadata: string;
    watermark: RtcImage[];
    watermarkCount: number;
    backgroundImage: RtcImage[];
    backgroundImageCount: number;
    audioSampleRate: AUDIO_SAMPLE_RATE_TYPE;
    audioBitrate: number;
    audioChannels: number;
    audioCodecProfile: AUDIO_CODEC_PROFILE_TYPE;
    advancedFeatures: LiveStreamAdvancedFeature[];
    advancedFeatureCount: number;
};

//c++ Struct TranscodingVideoStream
export interface TranscodingVideoStream {
    sourceType: MEDIA_SOURCE_TYPE;
    remoteUserUid: uid_t;
    imageUrl: string;
    x: number;
    y: number;
    width: number;
    height: number;
    zOrder: number;
    alpha: number;
    mirror: boolean;
};

//c++ Struct LocalTranscoderConfiguration
export interface LocalTranscoderConfiguration {
    streamCount: number;
    VideoInputStreams: TranscodingVideoStream[];
    videoOutputConfiguration: VideoEncoderConfiguration;
};

//c++ Struct LastmileProbeConfig
export interface LastmileProbeConfig {
    probeUplink: boolean;
    probeDownlink: boolean;
    expectedUplinkBitrate: number;
    expectedDownlinkBitrate: number;
};

//c++ enum LASTMILE_PROBE_RESULT_STATE
export enum LASTMILE_PROBE_RESULT_STATE {
    LASTMILE_PROBE_RESULT_COMPLETE = 1,
    LASTMILE_PROBE_RESULT_INCOMPLETE_NO_BWE = 2,
    LASTMILE_PROBE_RESULT_UNAVAILABLE = 3,
}

//c++ Struct LastmileProbeOneWayResult
export interface LastmileProbeOneWayResult {
    packetLossRate: number;
    jitter: number;
    availableBandwidth: number;
};

//c++ Struct LastmileProbeResult
export interface LastmileProbeResult {
    state: LASTMILE_PROBE_RESULT_STATE;
    uplinkReport: LastmileProbeOneWayResult;
    downlinkReport: LastmileProbeOneWayResult;
    rtt: number;
};

//c++ enum CONNECTION_CHANGED_REASON_TYPE
export enum CONNECTION_CHANGED_REASON_TYPE {
    CONNECTION_CHANGED_CONNECTING = 0,
    CONNECTION_CHANGED_JOIN_SUCCESS = 1,
    CONNECTION_CHANGED_INTERRUPTED = 2,
    CONNECTION_CHANGED_BANNED_BY_SERVER = 3,
    CONNECTION_CHANGED_JOIN_FAILED = 4,
    CONNECTION_CHANGED_LEAVE_CHANNEL = 5,
    CONNECTION_CHANGED_INVALID_APP_ID = 6,
    CONNECTION_CHANGED_INVALID_CHANNEL_NAME = 7,
    CONNECTION_CHANGED_INVALID_TOKEN = 8,
    CONNECTION_CHANGED_TOKEN_EXPIRED = 9,
    CONNECTION_CHANGED_REJECTED_BY_SERVER = 10,
    CONNECTION_CHANGED_SETTING_PROXY_SERVER = 11,
    CONNECTION_CHANGED_RENEW_TOKEN = 12,
    CONNECTION_CHANGED_CLIENT_IP_ADDRESS_CHANGED = 13,
    CONNECTION_CHANGED_KEEP_ALIVE_TIMEOUT = 14,
    CONNECTION_CHANGED_REJOIN_SUCCESS = 15,
    CONNECTION_CHANGED_LOST = 16,
    CONNECTION_CHANGED_ECHO_TEST = 17,
    CONNECTION_CHANGED_CLIENT_IP_ADDRESS_CHANGED_BY_USER = 18,
    CONNECTION_CHANGED_SAME_UID_LOGIN = 19,
    CONNECTION_CHANGED_TOO_MANY_BROADCASTERS = 20,
}

//c++ enum CLIENT_ROLE_CHANGE_FAILED_REASON
export enum CLIENT_ROLE_CHANGE_FAILED_REASON {
    CLIENT_ROLE_CHANGE_FAILED_TOO_MANY_BROADCASTERS = 1,
    CLIENT_ROLE_CHANGE_FAILED_NOT_AUTHORIZED = 2,
    CLIENT_ROLE_CHANGE_FAILED_REQUEST_TIME_OUT = 3,
    CLIENT_ROLE_CHANGE_FAILED_CONNECTION_FAILED = 4,
}

//c++ enum WLACC_MESSAGE_REASON
export enum WLACC_MESSAGE_REASON {
    WLACC_MESSAGE_REASON_WEAK_SIGNAL = 0,
    WLACC_MESSAGE_REASON_CHANNEL_CONGESTION = 1,
}

//c++ enum WLACC_SUGGEST_ACTION
export enum WLACC_SUGGEST_ACTION {
    WLACC_SUGGEST_ACTION_CLOSE_TO_WIFI = 0,
    WLACC_SUGGEST_ACTION_CONNECT_SSID = 1,
    WLACC_SUGGEST_ACTION_CHECK_5G = 2,
    WLACC_SUGGEST_ACTION_MODIFY_SSID = 3,
}

//c++ Struct WlAccStats
export interface WlAccStats {
    e2eDelayPercent: number;
    frozenRatioPercent: number;
    lossRatePercent: number;
};

//c++ enum NETWORK_TYPE
export enum NETWORK_TYPE {
    NETWORK_TYPE_UNKNOWN = -1,
    NETWORK_TYPE_DISCONNECTED = 0,
    NETWORK_TYPE_LAN = 1,
    NETWORK_TYPE_WIFI = 2,
    NETWORK_TYPE_MOBILE_2G = 3,
    NETWORK_TYPE_MOBILE_3G = 4,
    NETWORK_TYPE_MOBILE_4G = 5,
}

//c++ enum VIDEO_VIEW_SETUP_MODE
export enum VIDEO_VIEW_SETUP_MODE {
    VIDEO_VIEW_SETUP_REPLACE = 0,
    VIDEO_VIEW_SETUP_ADD = 1,
    VIDEO_VIEW_SETUP_REMOVE = 2,
}

//c++ Struct VideoCanvas
export interface VideoCanvas {
    view: view_t;
    renderMode: RENDER_MODE_TYPE;
    mirrorMode: VIDEO_MIRROR_MODE_TYPE;
    uid: uid_t;
    isScreenView: boolean;
    priv: void;
    priv_size: number;
    sourceType: VIDEO_SOURCE_TYPE;
    cropArea: Rectangle;
    setupMode: VIDEO_VIEW_SETUP_MODE;
};

//c++ Struct BeautyOptions
export interface BeautyOptions {
    lighteningContrastLevel: LIGHTENING_CONTRAST_LEVEL;
    lighteningLevel: number;
    smoothnessLevel: number;
    rednessLevel: number;
    sharpnessLevel: number;
};

//c++ enum LIGHTENING_CONTRAST_LEVEL
export enum LIGHTENING_CONTRAST_LEVEL {
    LIGHTENING_CONTRAST_LOW = 0,
    LIGHTENING_CONTRAST_NORMAL = 1,
    LIGHTENING_CONTRAST_HIGH = 2,
}

//c++ Struct LowlightEnhanceOptions
export interface LowlightEnhanceOptions {
    mode: LOW_LIGHT_ENHANCE_MODE;
    level: LOW_LIGHT_ENHANCE_LEVEL;
};

//c++ enum LOW_LIGHT_ENHANCE_MODE
export enum LOW_LIGHT_ENHANCE_MODE {
    LOW_LIGHT_ENHANCE_AUTO = 0,
    LOW_LIGHT_ENHANCE_MANUAL = 1,
}

//c++ enum LOW_LIGHT_ENHANCE_LEVEL
export enum LOW_LIGHT_ENHANCE_LEVEL {
    LOW_LIGHT_ENHANCE_LEVEL_HIGH_QUALITY = 0,
    LOW_LIGHT_ENHANCE_LEVEL_FAST = 1,
}

//c++ Struct VideoDenoiserOptions
export interface VideoDenoiserOptions {
    mode: VIDEO_DENOISER_MODE;
    level: VIDEO_DENOISER_LEVEL;
};

//c++ enum VIDEO_DENOISER_MODE
export enum VIDEO_DENOISER_MODE {
    VIDEO_DENOISER_AUTO = 0,
    VIDEO_DENOISER_MANUAL = 1,
}

//c++ enum VIDEO_DENOISER_LEVEL
export enum VIDEO_DENOISER_LEVEL {
    VIDEO_DENOISER_LEVEL_HIGH_QUALITY = 0,
    VIDEO_DENOISER_LEVEL_FAST = 1,
    VIDEO_DENOISER_LEVEL_STRENGTH = 2,
}

//c++ Struct ColorEnhanceOptions
export interface ColorEnhanceOptions {
    strengthLevel: number;
    skinProtectLevel: number;
};

//c++ Struct VirtualBackgroundSource
export interface VirtualBackgroundSource {
    background_source_type: BACKGROUND_SOURCE_TYPE;
    color: number;
    source: string;
    blur_degree: BACKGROUND_BLUR_DEGREE;
};

//c++ enum BACKGROUND_SOURCE_TYPE
export enum BACKGROUND_SOURCE_TYPE {
    BACKGROUND_COLOR = 1,
    BACKGROUND_IMG = 2,
    BACKGROUND_BLUR = 3,
}

//c++ enum BACKGROUND_BLUR_DEGREE
export enum BACKGROUND_BLUR_DEGREE {
    BLUR_DEGREE_LOW = 1,
    BLUR_DEGREE_MEDIUM = 2,
    BLUR_DEGREE_HIGH = 3,
}

//c++ Struct FishEyeCorrectionParams
export interface FishEyeCorrectionParams {
    xCenter: number;
    yCenter: number;
    scaleFactor: number;
    focalLength: number;
    polFocalLength: number;
    splitHeight: number;
    ss: number;
    mirror: boolean;
    rotation: VIDEO_ORIENTATION;
};

//c++ Struct SegmentationProperty
export interface SegmentationProperty {
    modelType: SEG_MODEL_TYPE;
    greenCapacity: number;
};

//c++ enum SEG_MODEL_TYPE
export enum SEG_MODEL_TYPE {
    SEG_MODEL_AI = 1,
    SEG_MODEL_GREEN = 2,
}

//c++ enum VOICE_BEAUTIFIER_PRESET
export enum VOICE_BEAUTIFIER_PRESET {
    VOICE_BEAUTIFIER_OFF = 0x00000000,
    CHAT_BEAUTIFIER_MAGNETIC = 0x01010100,
    CHAT_BEAUTIFIER_FRESH = 0x01010200,
    CHAT_BEAUTIFIER_VITALITY = 0x01010300,
    SINGING_BEAUTIFIER = 0x01020100,
    TIMBRE_TRANSFORMATION_VIGOROUS = 0x01030100,
    TIMBRE_TRANSFORMATION_DEEP = 0x01030200,
    TIMBRE_TRANSFORMATION_MELLOW = 0x01030300,
    TIMBRE_TRANSFORMATION_FALSETTO = 0x01030400,
    TIMBRE_TRANSFORMATION_FULL = 0x01030500,
    TIMBRE_TRANSFORMATION_CLEAR = 0x01030600,
    TIMBRE_TRANSFORMATION_RESOUNDING = 0x01030700,
    TIMBRE_TRANSFORMATION_RINGING = 0x01030800,
    ULTRA_HIGH_QUALITY_VOICE = 0x01040100,
}

//c++ enum AUDIO_EFFECT_PRESET
export enum AUDIO_EFFECT_PRESET {
    AUDIO_EFFECT_OFF = 0x00000000,
    ROOM_ACOUSTICS_KTV = 0x02010100,
    ROOM_ACOUSTICS_VOCAL_CONCERT = 0x02010200,
    ROOM_ACOUSTICS_STUDIO = 0x02010300,
    ROOM_ACOUSTICS_PHONOGRAPH = 0x02010400,
    ROOM_ACOUSTICS_VIRTUAL_STEREO = 0x02010500,
    ROOM_ACOUSTICS_SPACIAL = 0x02010600,
    ROOM_ACOUSTICS_ETHEREAL = 0x02010700,
    ROOM_ACOUSTICS_3D_VOICE = 0x02010800,
    ROOM_ACOUSTICS_VIRTUAL_SURROUND_SOUND = 0x02010900,
    VOICE_CHANGER_EFFECT_UNCLE = 0x02020100,
    VOICE_CHANGER_EFFECT_OLDMAN = 0x02020200,
    VOICE_CHANGER_EFFECT_BOY = 0x02020300,
    VOICE_CHANGER_EFFECT_SISTER = 0x02020400,
    VOICE_CHANGER_EFFECT_GIRL = 0x02020500,
    VOICE_CHANGER_EFFECT_PIGKING = 0x02020600,
    VOICE_CHANGER_EFFECT_HULK = 0x02020700,
    STYLE_TRANSFORMATION_RNB = 0x02030100,
    STYLE_TRANSFORMATION_POPULAR = 0x02030200,
    PITCH_CORRECTION = 0x02040100,
}

//c++ enum VOICE_CONVERSION_PRESET
export enum VOICE_CONVERSION_PRESET {
    VOICE_CONVERSION_OFF = 0x00000000,
    VOICE_CHANGER_NEUTRAL = 0x03010100,
    VOICE_CHANGER_SWEET = 0x03010200,
    VOICE_CHANGER_SOLID = 0x03010300,
    VOICE_CHANGER_BASS = 0x03010400,
}

//c++ Struct ScreenCaptureParameters
export interface ScreenCaptureParameters {
    dimensions: VideoDimensions;
    frameRate: number;
    bitrate: number;
    captureMouseCursor: boolean;
    windowFocus: boolean;
    excludeWindowList: view_t[];
    excludeWindowCount: number;
    // highLightWidth: number;
    // highLightColor: number;
    // enableHighLight: boolean;
};

//c++ enum AUDIO_RECORDING_QUALITY_TYPE
export enum AUDIO_RECORDING_QUALITY_TYPE {
    AUDIO_RECORDING_QUALITY_LOW = 0,
    AUDIO_RECORDING_QUALITY_MEDIUM = 1,
    AUDIO_RECORDING_QUALITY_HIGH = 2,
    AUDIO_RECORDING_QUALITY_ULTRA_HIGH = 3,
}

//c++ enum AUDIO_FILE_RECORDING_TYPE
export enum AUDIO_FILE_RECORDING_TYPE {
    AUDIO_FILE_RECORDING_MIC = 1,
    AUDIO_FILE_RECORDING_PLAYBACK = 2,
    AUDIO_FILE_RECORDING_MIXED = 3,
}

//c++ enum AUDIO_ENCODED_FRAME_OBSERVER_POSITION
export enum AUDIO_ENCODED_FRAME_OBSERVER_POSITION {
    AUDIO_ENCODED_FRAME_OBSERVER_POSITION_RECORD = 1,
    AUDIO_ENCODED_FRAME_OBSERVER_POSITION_PLAYBACK = 2,
    AUDIO_ENCODED_FRAME_OBSERVER_POSITION_MIXED = 3,
}

//c++ Struct AudioRecordingConfiguration
export interface AudioRecordingConfiguration {
    filePath: string;
    encode: boolean;
    sampleRate: number;
    fileRecordingType: AUDIO_FILE_RECORDING_TYPE;
    quality: AUDIO_RECORDING_QUALITY_TYPE;
    recordingChannel: number;
};

//c++ Struct AudioEncodedFrameObserverConfig
export interface AudioEncodedFrameObserverConfig {
    postionType: AUDIO_ENCODED_FRAME_OBSERVER_POSITION;
    encodingType: AUDIO_ENCODING_TYPE;
};

//c++ enum AREA_CODE
export enum AREA_CODE {
    AREA_CODE_CN = 0x00000001,
    AREA_CODE_NA = 0x00000002,
    AREA_CODE_EU = 0x00000004,
    AREA_CODE_AS = 0x00000008,
    AREA_CODE_JP = 0x00000010,
    AREA_CODE_IN = 0x00000020,
    AREA_CODE_GLOB = (0xFFFFFFFF),
}

//c++ enum AREA_CODE_EX
export enum AREA_CODE_EX {
    AREA_CODE_OC = 0x00000040,
    AREA_CODE_SA = 0x00000080,
    AREA_CODE_AF = 0x00000100,
    AREA_CODE_KR = 0x00000200,
    AREA_CODE_HKMC = 0x00000400,
    AREA_CODE_US = 0x00000800,
    AREA_CODE_OVS = 0xFFFFFFFE,
}

//c++ enum CHANNEL_MEDIA_RELAY_ERROR
export enum CHANNEL_MEDIA_RELAY_ERROR {
    RELAY_OK = 0,
    RELAY_ERROR_SERVER_ERROR_RESPONSE = 1,
    RELAY_ERROR_SERVER_NO_RESPONSE = 2,
    RELAY_ERROR_NO_RESOURCE_AVAILABLE = 3,
    RELAY_ERROR_FAILED_JOIN_SRC = 4,
    RELAY_ERROR_FAILED_JOIN_DEST = 5,
    RELAY_ERROR_FAILED_PACKET_RECEIVED_FROM_SRC = 6,
    RELAY_ERROR_FAILED_PACKET_SENT_TO_DEST = 7,
    RELAY_ERROR_SERVER_CONNECTION_LOST = 8,
    RELAY_ERROR_INTERNAL_ERROR = 9,
    RELAY_ERROR_SRC_TOKEN_EXPIRED = 10,
    RELAY_ERROR_DEST_TOKEN_EXPIRED = 11,
}

//c++ enum CHANNEL_MEDIA_RELAY_EVENT
export enum CHANNEL_MEDIA_RELAY_EVENT {
    RELAY_EVENT_NETWORK_DISCONNECTED = 0,
    RELAY_EVENT_NETWORK_CONNECTED = 1,
    RELAY_EVENT_PACKET_JOINED_SRC_CHANNEL = 2,
    RELAY_EVENT_PACKET_JOINED_DEST_CHANNEL = 3,
    RELAY_EVENT_PACKET_SENT_TO_DEST_CHANNEL = 4,
    RELAY_EVENT_PACKET_RECEIVED_VIDEO_FROM_SRC = 5,
    RELAY_EVENT_PACKET_RECEIVED_AUDIO_FROM_SRC = 6,
    RELAY_EVENT_PACKET_UPDATE_DEST_CHANNEL = 7,
    RELAY_EVENT_PACKET_UPDATE_DEST_CHANNEL_REFUSED = 8,
    RELAY_EVENT_PACKET_UPDATE_DEST_CHANNEL_NOT_CHANGE = 9,
    RELAY_EVENT_PACKET_UPDATE_DEST_CHANNEL_IS_NULL = 10,
    RELAY_EVENT_VIDEO_PROFILE_UPDATE = 11,
    RELAY_EVENT_PAUSE_SEND_PACKET_TO_DEST_CHANNEL_SUCCESS = 12,
    RELAY_EVENT_PAUSE_SEND_PACKET_TO_DEST_CHANNEL_FAILED = 13,
    RELAY_EVENT_RESUME_SEND_PACKET_TO_DEST_CHANNEL_SUCCESS = 14,
    RELAY_EVENT_RESUME_SEND_PACKET_TO_DEST_CHANNEL_FAILED = 15,
}

//c++ enum CHANNEL_MEDIA_RELAY_STATE
export enum CHANNEL_MEDIA_RELAY_STATE {
    RELAY_STATE_IDLE = 0,
    RELAY_STATE_CONNECTING = 1,
    RELAY_STATE_RUNNING = 2,
    RELAY_STATE_FAILURE = 3,
}

//c++ Struct ChannelMediaInfo
export interface ChannelMediaInfo {
    channelName: string;
    token: string;
    uid: uid_t;
};

//c++ Struct ChannelMediaRelayConfiguration
export interface ChannelMediaRelayConfiguration {
    srcInfo: ChannelMediaInfo;
    destInfos: ChannelMediaInfo[];
    destCount: number;
};

//c++ Struct UplinkNetworkInfo
export interface UplinkNetworkInfo {
    video_encoder_target_bitrate_bps: number;
};

//c++ Struct DownlinkNetworkInfo
export interface DownlinkNetworkInfo {
    lastmile_buffer_delay_time_ms: number;
    bandwidth_estimation_bps: number;
    total_downscale_level_count: number;
    peer_downlink_info: PeerDownlinkInfo[];
    total_received_video_count: number;
};

//c++ Struct PeerDownlinkInfo
export interface PeerDownlinkInfo {
    uid: string;
    stream_type: VIDEO_STREAM_TYPE;
    current_downscale_level: REMOTE_VIDEO_DOWNSCALE_LEVEL;
    expected_bitrate_bps: number;
};

//c++ enum ENCRYPTION_MODE
export enum ENCRYPTION_MODE {
    AES_128_XTS = 1,
    AES_128_ECB = 2,
    AES_256_XTS = 3,
    SM4_128_ECB = 4,
    AES_128_GCM = 5,
    AES_256_GCM = 6,
    AES_128_GCM2 = 7,
    AES_256_GCM2 = 8,
    MODE_END,
}

//c++ Struct EncryptionConfig
export class EncryptionConfig {
    encryptionMode: ENCRYPTION_MODE;
    encryptionKey: string;
    encryptionKdfSalt: number[];

    constructor() {
        this.encryptionMode = ENCRYPTION_MODE.AES_128_GCM2;
        this.encryptionKey = null;
        this.encryptionKdfSalt = null;
    }
};

//c++ enum ENCRYPTION_ERROR_TYPE
export enum ENCRYPTION_ERROR_TYPE {
    ENCRYPTION_ERROR_INTERNAL_FAILURE = 0,
    ENCRYPTION_ERROR_DECRYPTION_FAILURE = 1,
    ENCRYPTION_ERROR_ENCRYPTION_FAILURE = 2,
}

//c++ enum UPLOAD_ERROR_REASON
export enum UPLOAD_ERROR_REASON {
    UPLOAD_SUCCESS = 0,
    UPLOAD_NET_ERROR = 1,
    UPLOAD_SERVER_ERROR = 2,
}

//c++ enum PERMISSION_TYPE
export enum PERMISSION_TYPE {
    RECORD_AUDIO = 0,
    CAMERA = 1,
    SCREEN_CAPTURE = 2,
}

//c++ enum MAX_USER_ACCOUNT_LENGTH_TYPE
export enum MAX_USER_ACCOUNT_LENGTH_TYPE {
    MAX_USER_ACCOUNT_LENGTH = 256,
}

//c++ enum STREAM_SUBSCRIBE_STATE
export enum STREAM_SUBSCRIBE_STATE {
    SUB_STATE_IDLE = 0,
    SUB_STATE_NO_SUBSCRIBED = 1,
    SUB_STATE_SUBSCRIBING = 2,
    SUB_STATE_SUBSCRIBED = 3,
}

//c++ enum STREAM_PUBLISH_STATE
export enum STREAM_PUBLISH_STATE {
    PUB_STATE_IDLE = 0,
    PUB_STATE_NO_PUBLISHED = 1,
    PUB_STATE_PUBLISHING = 2,
    PUB_STATE_PUBLISHED = 3,
}

//c++ Struct EchoTestConfiguration
export interface EchoTestConfiguration {
    view: view_t;
    enableAudio: boolean;
    enableVideo: boolean;
    token: string;
    channelId: string;
};

//c++ Struct UserInfo
export interface UserInfo {
    uid: uid_t;
    userAccount: string;
};

//c++ enum EAR_MONITORING_FILTER_TYPE
export enum EAR_MONITORING_FILTER_TYPE {
    EAR_MONITORING_FILTER_NONE = (1 << 0),
    EAR_MONITORING_FILTER_BUILT_IN_AUDIO_FILTERS = (1 << 1),
    EAR_MONITORING_FILTER_NOISE_SUPPRESSION = (1 << 2),
}

//c++ enum THREAD_PRIORITY_TYPE
export enum THREAD_PRIORITY_TYPE {
    LOWEST = 0,
    LOW = 1,
    NORMAL = 2,
    HIGH = 3,
    HIGHEST = 4,
    CRITICAL = 5,
}

//c++ Struct ScreenVideoParameters
export interface ScreenVideoParameters {
    dimensions: VideoDimensions;
    frameRate: number;
    bitrate: number;
    contentHint: VIDEO_CONTENT_HINT;
};

//c++ Struct ScreenAudioParameters
export interface ScreenAudioParameters {
    sampleRate: number;
    channels: number;
    captureSignalVolume: number;
};

//c++ Struct ScreenCaptureParameters2
export interface ScreenCaptureParameters2 {
    captureAudio: boolean;
    audioParams: ScreenAudioParameters;
    captureVideo: boolean;
    videoParams: ScreenVideoParameters;
};

//c++ Struct SpatialAudioParams
export interface SpatialAudioParams {
    speaker_azimuth?: number;
    speaker_elevation?: number;
    speaker_distance?: number;
    speaker_orientation?: number;
    enable_blur?: boolean;
    enable_air_absorb?: boolean;
    speaker_attenuation?: number;
};

export class IAudioEncodedFrameObserver {

}

export class IPacketObserver {

}

export class FishCorrectionParams {

}


