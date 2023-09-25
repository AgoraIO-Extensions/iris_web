import { CallApiReturnType } from 'iris-web-core';

declare enum VIDEO_SOURCE_TYPE {
    VIDEO_SOURCE_CAMERA_PRIMARY = 0,
    VIDEO_SOURCE_CAMERA = 0,
    VIDEO_SOURCE_CAMERA_SECONDARY = 1,
    VIDEO_SOURCE_SCREEN_PRIMARY = 2,
    VIDEO_SOURCE_SCREEN = 2,
    VIDEO_SOURCE_SCREEN_SECONDARY = 3,
    VIDEO_SOURCE_CUSTOM = 4,
    VIDEO_SOURCE_MEDIA_PLAYER = 5,
    VIDEO_SOURCE_RTC_IMAGE_PNG = 6,
    VIDEO_SOURCE_RTC_IMAGE_JPEG = 7,
    VIDEO_SOURCE_RTC_IMAGE_GIF = 8,
    VIDEO_SOURCE_REMOTE = 9,
    VIDEO_SOURCE_TRANSCODED = 10,
    VIDEO_SOURCE_CAMERA_THIRD = 11,
    VIDEO_SOURCE_CAMERA_FOURTH = 12,
    VIDEO_SOURCE_SCREEN_THIRD = 13,
    VIDEO_SOURCE_SCREEN_FOURTH = 14,
    VIDEO_SOURCE_UNKNOWN = 100
}
declare enum AudioRoute {
    ROUTE_DEFAULT = -1,
    ROUTE_HEADSET = 0,
    ROUTE_EARPIECE = 1,
    ROUTE_HEADSETNOMIC = 2,
    ROUTE_SPEAKERPHONE = 3,
    ROUTE_LOUDSPEAKER = 4,
    ROUTE_HEADSETBLUETOOTH = 5,
    ROUTE_USB = 6,
    ROUTE_HDMI = 7,
    ROUTE_DISPLAYPORT = 8,
    ROUTE_AIRPLAY = 9
}
declare enum BYTES_PER_SAMPLE {
    TWO_BYTES_PER_SAMPLE = 2
}
declare class AudioParameters {
    sample_rate?: number;
    channels?: number;
    frames_per_buffer?: number;
}
declare enum RAW_AUDIO_FRAME_OP_MODE_TYPE {
    RAW_AUDIO_FRAME_OP_MODE_READ_ONLY = 0,
    RAW_AUDIO_FRAME_OP_MODE_READ_WRITE = 2
}
declare enum MEDIA_SOURCE_TYPE {
    AUDIO_PLAYOUT_SOURCE = 0,
    AUDIO_RECORDING_SOURCE = 1,
    PRIMARY_CAMERA_SOURCE = 2,
    SECONDARY_CAMERA_SOURCE = 3,
    PRIMARY_SCREEN_SOURCE = 4,
    SECONDARY_SCREEN_SOURCE = 5,
    CUSTOM_VIDEO_SOURCE = 6,
    MEDIA_PLAYER_SOURCE = 7,
    RTC_IMAGE_PNG_SOURCE = 8,
    RTC_IMAGE_JPEG_SOURCE = 9,
    RTC_IMAGE_GIF_SOURCE = 10,
    REMOTE_VIDEO_SOURCE = 11,
    TRANSCODED_VIDEO_SOURCE = 12,
    UNKNOWN_MEDIA_SOURCE = 100
}
declare enum CONTENT_INSPECT_RESULT {
    CONTENT_INSPECT_NEUTRAL = 1,
    CONTENT_INSPECT_SEXY = 2,
    CONTENT_INSPECT_PORN = 3
}
declare enum CONTENT_INSPECT_TYPE {
    CONTENT_INSPECT_INVALID = 0,
    CONTENT_INSPECT_MODERATION = 1,
    CONTENT_INSPECT_SUPERVISION = 2,
    CONTENT_INSPECT_IMAGE_MODERATION = 3
}
declare class ContentInspectModule {
    type?: CONTENT_INSPECT_TYPE;
    interval?: number;
}
declare class ContentInspectConfig {
    extraInfo?: string;
    serverConfig?: string;
    modules?: ContentInspectModule;
    moduleCount?: number;
}
declare class PacketOptions {
    timestamp?: number;
    audioLevelIndication?: number;
}
declare class AudioEncodedFrameInfo {
    sendTs?: number;
    codec?: number;
}
declare class AudioPcmFrame {
    capture_timestamp?: number;
    samples_per_channel_?: number;
    sample_rate_hz_?: number;
    num_channels_?: number;
    bytes_per_sample?: BYTES_PER_SAMPLE;
    data_?: number;
}
declare enum AUDIO_DUAL_MONO_MODE {
    AUDIO_DUAL_MONO_STEREO = 0,
    AUDIO_DUAL_MONO_L = 1,
    AUDIO_DUAL_MONO_R = 2,
    AUDIO_DUAL_MONO_MIX = 3
}
declare enum VIDEO_PIXEL_FORMAT {
    VIDEO_PIXEL_DEFAULT = 0,
    VIDEO_PIXEL_I420 = 1,
    VIDEO_PIXEL_BGRA = 2,
    VIDEO_PIXEL_NV21 = 3,
    VIDEO_PIXEL_RGBA = 4,
    VIDEO_PIXEL_NV12 = 8,
    VIDEO_TEXTURE_2D = 10,
    VIDEO_TEXTURE_OES = 11,
    VIDEO_CVPIXEL_NV12 = 12,
    VIDEO_CVPIXEL_I420 = 13,
    VIDEO_CVPIXEL_BGRA = 14,
    VIDEO_PIXEL_I422 = 16,
    VIDEO_TEXTURE_ID3D11TEXTURE2D = 17
}
declare enum RENDER_MODE_TYPE {
    RENDER_MODE_HIDDEN = 1,
    RENDER_MODE_FIT = 2,
    RENDER_MODE_ADAPTIVE = 3
}
declare enum CAMERA_VIDEO_SOURCE_TYPE {
    CAMERA_SOURCE_FRONT = 0,
    CAMERA_SOURCE_BACK = 1,
    VIDEO_SOURCE_UNSPECIFIED = 2
}
declare enum EGL_CONTEXT_TYPE {
    EGL_CONTEXT10 = 0,
    EGL_CONTEXT14 = 1
}
declare enum VIDEO_BUFFER_TYPE {
    VIDEO_BUFFER_RAW_DATA = 1,
    VIDEO_BUFFER_ARRAY = 2,
    VIDEO_BUFFER_TEXTURE = 3
}
declare class ExternalVideoFrame {
    type?: VIDEO_BUFFER_TYPE;
    format?: VIDEO_PIXEL_FORMAT;
    buffer?: void[];
    stride?: number;
    height?: number;
    cropLeft?: number;
    cropTop?: number;
    cropRight?: number;
    cropBottom?: number;
    rotation?: number;
    timestamp?: number;
    eglType?: EGL_CONTEXT_TYPE;
    textureId?: number;
    matrix?: number;
    metadata_buffer?: Uint8Array;
    metadata_size?: number;
    alphaBuffer?: Uint8Array;
    texture_slice_index?: number;
}
declare class VideoFrame {
    type?: VIDEO_PIXEL_FORMAT;
    width?: number;
    height?: number;
    yStride?: number;
    uStride?: number;
    vStride?: number;
    yBuffer?: Uint8Array;
    uBuffer?: Uint8Array;
    vBuffer?: Uint8Array;
    rotation?: number;
    renderTimeMs?: number;
    avsync_type?: number;
    metadata_buffer?: Uint8Array;
    metadata_size?: number;
    textureId?: number;
    matrix?: number;
    alphaBuffer?: Uint8Array;
    pixelBuffer?: void[];
}
declare enum MEDIA_PLAYER_SOURCE_TYPE {
    MEDIA_PLAYER_SOURCE_DEFAULT = 0,
    MEDIA_PLAYER_SOURCE_FULL_FEATURED = 1,
    MEDIA_PLAYER_SOURCE_SIMPLE = 2
}
declare enum VIDEO_MODULE_POSITION {
    POSITION_POST_CAPTURER = 1,
    POSITION_PRE_RENDERER = 1,
    POSITION_PRE_ENCODER = 1
}
interface IAudioPcmFrameSink {
    onFrame(frame: AudioPcmFrame[]): void;
}
declare enum AUDIO_FRAME_TYPE {
    FRAME_TYPE_PCM16 = 0
}
declare class AudioFrame {
    type?: AUDIO_FRAME_TYPE;
    samplesPerChannel?: number;
    bytesPerSample?: BYTES_PER_SAMPLE;
    channels?: number;
    samplesPerSec?: number;
    buffer?: void[];
    renderTimeMs?: number;
    avsync_type?: number;
    presentationMs?: number;
}
declare enum AUDIO_FRAME_POSITION {
    AUDIO_FRAME_POSITION_NONE = 0,
    AUDIO_FRAME_POSITION_PLAYBACK = 1,
    AUDIO_FRAME_POSITION_RECORD = 2,
    AUDIO_FRAME_POSITION_MIXED = 4,
    AUDIO_FRAME_POSITION_BEFORE_MIXING = 8,
    AUDIO_FRAME_POSITION_EAR_MONITORING = 16
}
declare class AudioParams {
    sample_rate?: number;
    channels?: number;
    mode?: RAW_AUDIO_FRAME_OP_MODE_TYPE;
    samples_per_call?: number;
}
interface IAudioFrameObserverBase {
    onRecordAudioFrame(channelId: string, audioFrame: AudioFrame): boolean;
    onPlaybackAudioFrame(channelId: string, audioFrame: AudioFrame): boolean;
    onMixedAudioFrame(channelId: string, audioFrame: AudioFrame): boolean;
    onEarMonitoringAudioFrame(audioFrame: AudioFrame): boolean;
}
interface IAudioFrameObserver extends IAudioFrameObserverBase {
    onPlaybackAudioFrameBeforeMixing(channelId: string, uid: number, audioFrame: AudioFrame): boolean;
}
declare class AudioSpectrumData {
    audioSpectrumData?: number[];
    dataLength?: number;
}
declare class UserAudioSpectrumInfo {
    uid?: number;
    spectrumData?: AudioSpectrumData;
}
interface IAudioSpectrumObserver {
    onLocalAudioSpectrum(data: AudioSpectrumData): boolean;
    onRemoteAudioSpectrum(spectrums: UserAudioSpectrumInfo[], spectrumNumber: number): boolean;
}
interface IVideoEncodedFrameObserver {
    onEncodedVideoFrameReceived(uid: number, imageBuffer: Uint8Array, length: number, videoEncodedFrameInfo: EncodedVideoFrameInfo): boolean;
}
declare enum VIDEO_FRAME_PROCESS_MODE {
    PROCESS_MODE_READ_ONLY = 0,
    PROCESS_MODE_READ_WRITE = 1
}
interface IVideoFrameObserver {
    onCaptureVideoFrame(sourceType: VIDEO_SOURCE_TYPE, videoFrame: VideoFrame): boolean;
    onPreEncodeVideoFrame(sourceType: VIDEO_SOURCE_TYPE, videoFrame: VideoFrame): boolean;
    onMediaPlayerVideoFrame(videoFrame: VideoFrame, mediaPlayerId: number): boolean;
    onRenderVideoFrame(channelId: string, remoteUid: number, videoFrame: VideoFrame): boolean;
    onTranscodedVideoFrame(videoFrame: VideoFrame): boolean;
}
declare enum EXTERNAL_VIDEO_SOURCE_TYPE {
    VIDEO_FRAME = 0,
    ENCODED_VIDEO_FRAME = 1
}
declare enum MediaRecorderContainerFormat {
    FORMAT_MP4 = 1
}
declare enum MediaRecorderStreamType {
    STREAM_TYPE_AUDIO = 1,
    STREAM_TYPE_VIDEO = 2,
    STREAM_TYPE_BOTH = 3
}
declare enum RecorderState {
    RECORDER_STATE_ERROR = -1,
    RECORDER_STATE_START = 2,
    RECORDER_STATE_STOP = 3
}
declare enum RecorderErrorCode {
    RECORDER_ERROR_NONE = 0,
    RECORDER_ERROR_WRITE_FAILED = 1,
    RECORDER_ERROR_NO_STREAM = 2,
    RECORDER_ERROR_OVER_MAX_DURATION = 3,
    RECORDER_ERROR_CONFIG_CHANGED = 4
}
declare class MediaRecorderConfiguration {
    storagePath?: string;
    containerFormat?: MediaRecorderContainerFormat;
    streamType?: MediaRecorderStreamType;
    maxDurationMs?: number;
    recorderInfoUpdateInterval?: number;
}
declare class RecorderInfo {
    fileName?: string;
    durationMs?: number;
    fileSize?: number;
}
interface IMediaRecorderObserver {
    onRecorderStateChanged(channelId: string, uid: number, state: RecorderState, error: RecorderErrorCode): void;
    onRecorderInfoUpdated(channelId: string, uid: number, info: RecorderInfo): void;
}

declare enum CHANNEL_PROFILE_TYPE {
    CHANNEL_PROFILE_COMMUNICATION = 0,
    CHANNEL_PROFILE_LIVE_BROADCASTING = 1,
    CHANNEL_PROFILE_GAME = 2,
    CHANNEL_PROFILE_CLOUD_GAMING = 3,
    CHANNEL_PROFILE_COMMUNICATION_1v1 = 4
}
declare enum WARN_CODE_TYPE {
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
    WARN_ADM_WIN_CORE_IMPROPER_CAPTURE_RELEASE = 1324
}
declare enum ERROR_CODE_TYPE {
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
    ERR_ADM_APPLICATION_LOOPBACK = 2007
}
declare enum LICENSE_ERROR_TYPE {
    LICENSE_ERR_INVALID = 1,
    LICENSE_ERR_EXPIRE = 2,
    LICENSE_ERR_MINUTES_EXCEED = 3,
    LICENSE_ERR_LIMITED_PERIOD = 4,
    LICENSE_ERR_DIFF_DEVICES = 5,
    LICENSE_ERR_INTERNAL = 99
}
declare enum AUDIO_SESSION_OPERATION_RESTRICTION {
    AUDIO_SESSION_OPERATION_RESTRICTION_NONE = 0,
    AUDIO_SESSION_OPERATION_RESTRICTION_SET_CATEGORY = 1,
    AUDIO_SESSION_OPERATION_RESTRICTION_CONFIGURE_SESSION = 1,
    AUDIO_SESSION_OPERATION_RESTRICTION_DEACTIVATE_SESSION = 1,
    AUDIO_SESSION_OPERATION_RESTRICTION_ALL = 1
}
declare enum USER_OFFLINE_REASON_TYPE {
    USER_OFFLINE_QUIT = 0,
    USER_OFFLINE_DROPPED = 1,
    USER_OFFLINE_BECOME_AUDIENCE = 2
}
declare enum INTERFACE_ID_TYPE {
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
    AGORA_IID_STATE_SYNC = 13,
    AGORA_IID_METACHAT_SERVICE = 14,
    AGORA_IID_MUSIC_CONTENT_CENTER = 15,
    AGORA_IID_H265_TRANSCODER = 16
}
declare enum QUALITY_TYPE {
    QUALITY_UNKNOWN = 0,
    QUALITY_EXCELLENT = 1,
    QUALITY_GOOD = 2,
    QUALITY_POOR = 3,
    QUALITY_BAD = 4,
    QUALITY_VBAD = 5,
    QUALITY_DOWN = 6,
    QUALITY_UNSUPPORTED = 7,
    QUALITY_DETECTING = 8
}
declare enum FIT_MODE_TYPE {
    MODE_COVER = 1,
    MODE_CONTAIN = 2
}
declare enum VIDEO_ORIENTATION {
    VIDEO_ORIENTATION_0 = 0,
    VIDEO_ORIENTATION_90 = 90,
    VIDEO_ORIENTATION_180 = 180,
    VIDEO_ORIENTATION_270 = 270
}
declare enum FRAME_RATE {
    FRAME_RATE_FPS_1 = 1,
    FRAME_RATE_FPS_7 = 7,
    FRAME_RATE_FPS_10 = 10,
    FRAME_RATE_FPS_15 = 15,
    FRAME_RATE_FPS_24 = 24,
    FRAME_RATE_FPS_30 = 30,
    FRAME_RATE_FPS_60 = 60
}
declare enum FRAME_WIDTH {
    FRAME_WIDTH_960 = 960
}
declare enum FRAME_HEIGHT {
    FRAME_HEIGHT_540 = 540
}
declare enum VIDEO_FRAME_TYPE {
    VIDEO_FRAME_TYPE_BLANK_FRAME = 0,
    VIDEO_FRAME_TYPE_KEY_FRAME = 3,
    VIDEO_FRAME_TYPE_DELTA_FRAME = 4,
    VIDEO_FRAME_TYPE_B_FRAME = 5,
    VIDEO_FRAME_TYPE_DROPPABLE_FRAME = 6,
    VIDEO_FRAME_TYPE_UNKNOW = 7
}
declare enum ORIENTATION_MODE {
    ORIENTATION_MODE_ADAPTIVE = 0,
    ORIENTATION_MODE_FIXED_LANDSCAPE = 1,
    ORIENTATION_MODE_FIXED_PORTRAIT = 2
}
declare enum DEGRADATION_PREFERENCE {
    MAINTAIN_QUALITY = 0,
    MAINTAIN_FRAMERATE = 1,
    MAINTAIN_BALANCED = 2,
    MAINTAIN_RESOLUTION = 3,
    DISABLED = 100
}
declare class VideoDimensions {
    width?: number;
    height?: number;
}
declare enum SCREEN_CAPTURE_FRAMERATE_CAPABILITY {
    SCREEN_CAPTURE_FRAMERATE_CAPABILITY_15_FPS = 0,
    SCREEN_CAPTURE_FRAMERATE_CAPABILITY_30_FPS = 1,
    SCREEN_CAPTURE_FRAMERATE_CAPABILITY_60_FPS = 2
}
declare enum VIDEO_CODEC_CAPABILITY_LEVEL {
    CODEC_CAPABILITY_LEVEL_UNSPECIFIED = -1,
    CODEC_CAPABILITY_LEVEL_BASIC_SUPPORT = 5,
    CODEC_CAPABILITY_LEVEL_1080P30FPS = 10,
    CODEC_CAPABILITY_LEVEL_1080P60FPS = 20,
    CODEC_CAPABILITY_LEVEL_4K60FPS = 30
}
declare enum VIDEO_CODEC_TYPE {
    VIDEO_CODEC_NONE = 0,
    VIDEO_CODEC_VP8 = 1,
    VIDEO_CODEC_H264 = 2,
    VIDEO_CODEC_H265 = 3,
    VIDEO_CODEC_GENERIC = 6,
    VIDEO_CODEC_GENERIC_H264 = 7,
    VIDEO_CODEC_AV1 = 12,
    VIDEO_CODEC_VP9 = 13,
    VIDEO_CODEC_GENERIC_JPEG = 20
}
declare enum TCcMode {
    CC_ENABLED = 0,
    CC_DISABLED = 1
}
declare class SenderOptions {
    ccMode?: TCcMode;
    codecType?: VIDEO_CODEC_TYPE;
    targetBitrate?: number;
}
declare enum AUDIO_CODEC_TYPE {
    AUDIO_CODEC_OPUS = 1,
    AUDIO_CODEC_PCMA = 3,
    AUDIO_CODEC_PCMU = 4,
    AUDIO_CODEC_G722 = 5,
    AUDIO_CODEC_AACLC = 8,
    AUDIO_CODEC_HEAAC = 9,
    AUDIO_CODEC_JC1 = 10,
    AUDIO_CODEC_HEAAC2 = 11,
    AUDIO_CODEC_LPCNET = 12
}
declare enum AUDIO_ENCODING_TYPE {
    AUDIO_ENCODING_TYPE_AAC_16000_LOW = 65793,
    AUDIO_ENCODING_TYPE_AAC_16000_MEDIUM = 65794,
    AUDIO_ENCODING_TYPE_AAC_32000_LOW = 66049,
    AUDIO_ENCODING_TYPE_AAC_32000_MEDIUM = 66050,
    AUDIO_ENCODING_TYPE_AAC_32000_HIGH = 66051,
    AUDIO_ENCODING_TYPE_AAC_48000_MEDIUM = 66306,
    AUDIO_ENCODING_TYPE_AAC_48000_HIGH = 66307,
    AUDIO_ENCODING_TYPE_OPUS_16000_LOW = 131329,
    AUDIO_ENCODING_TYPE_OPUS_16000_MEDIUM = 131330,
    AUDIO_ENCODING_TYPE_OPUS_48000_MEDIUM = 131842,
    AUDIO_ENCODING_TYPE_OPUS_48000_HIGH = 131843
}
declare enum WATERMARK_FIT_MODE {
    FIT_MODE_COVER_POSITION = 0,
    FIT_MODE_USE_IMAGE_RATIO = 1
}
declare class EncodedAudioFrameAdvancedSettings {
    speech?: boolean;
    sendEvenIfEmpty?: boolean;
}
declare class EncodedAudioFrameInfo {
    codec?: AUDIO_CODEC_TYPE;
    sampleRateHz?: number;
    samplesPerChannel?: number;
    numberOfChannels?: number;
    advancedSettings?: EncodedAudioFrameAdvancedSettings;
    captureTimeMs?: number;
}
declare class AudioPcmDataInfo {
    samplesPerChannel?: number;
    channelNum?: number;
    samplesOut?: number;
    elapsedTimeMs?: number;
    ntpTimeMs?: number;
}
declare enum H264PacketizeMode {
    NonInterleaved = 0,
    SingleNalUnit = 1
}
declare enum VIDEO_STREAM_TYPE {
    VIDEO_STREAM_HIGH = 0,
    VIDEO_STREAM_LOW = 1
}
declare class VideoSubscriptionOptions {
    type?: VIDEO_STREAM_TYPE;
    encodedFrameOnly?: boolean;
}
declare class EncodedVideoFrameInfo {
    codecType?: VIDEO_CODEC_TYPE;
    width?: number;
    height?: number;
    framesPerSecond?: number;
    frameType?: VIDEO_FRAME_TYPE;
    rotation?: VIDEO_ORIENTATION;
    trackId?: number;
    captureTimeMs?: number;
    decodeTimeMs?: number;
    uid?: number;
    streamType?: VIDEO_STREAM_TYPE;
}
declare enum COMPRESSION_PREFERENCE {
    PREFER_LOW_LATENCY = 0,
    PREFER_QUALITY = 1
}
declare enum ENCODING_PREFERENCE {
    PREFER_AUTO = -1,
    PREFER_SOFTWARE = 0,
    PREFER_HARDWARE = 1
}
declare class AdvanceOptions {
    encodingPreference?: ENCODING_PREFERENCE;
    compressionPreference?: COMPRESSION_PREFERENCE;
}
declare enum VIDEO_MIRROR_MODE_TYPE {
    VIDEO_MIRROR_MODE_AUTO = 0,
    VIDEO_MIRROR_MODE_ENABLED = 1,
    VIDEO_MIRROR_MODE_DISABLED = 2
}
declare enum CODEC_CAP_MASK {
    CODEC_CAP_MASK_NONE = 0,
    CODEC_CAP_MASK_HW_DEC = 1,
    CODEC_CAP_MASK_HW_ENC = 1,
    CODEC_CAP_MASK_SW_DEC = 1,
    CODEC_CAP_MASK_SW_ENC = 1
}
declare class CodecCapLevels {
    hwDecodingLevel?: VIDEO_CODEC_CAPABILITY_LEVEL;
    swDecodingLevel?: VIDEO_CODEC_CAPABILITY_LEVEL;
}
declare class CodecCapInfo {
    codecType?: VIDEO_CODEC_TYPE;
    codecCapMask?: number;
    codecLevels?: CodecCapLevels;
}
declare class VideoEncoderConfiguration {
    codecType?: VIDEO_CODEC_TYPE;
    dimensions?: VideoDimensions;
    frameRate?: number;
    bitrate?: number;
    minBitrate?: number;
    orientationMode?: ORIENTATION_MODE;
    degradationPreference?: DEGRADATION_PREFERENCE;
    mirrorMode?: VIDEO_MIRROR_MODE_TYPE;
    advanceOptions?: AdvanceOptions;
}
declare class DataStreamConfig {
    syncWithAudio?: boolean;
    ordered?: boolean;
}
declare enum SIMULCAST_STREAM_MODE {
    AUTO_SIMULCAST_STREAM = -1,
    DISABLE_SIMULCAST_STREAM = 0,
    ENABLE_SIMULCAST_STREAM = 1
}
declare class SimulcastStreamConfig {
    dimensions?: VideoDimensions;
    kBitrate?: number;
    framerate?: number;
}
declare class Rectangle {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
}
declare class WatermarkRatio {
    xRatio?: number;
    yRatio?: number;
    widthRatio?: number;
}
declare class WatermarkOptions {
    visibleInPreview?: boolean;
    positionInLandscapeMode?: Rectangle;
    positionInPortraitMode?: Rectangle;
    watermarkRatio?: WatermarkRatio;
    mode?: WATERMARK_FIT_MODE;
}
declare class RtcStats {
    duration?: number;
    txBytes?: number;
    rxBytes?: number;
    txAudioBytes?: number;
    txVideoBytes?: number;
    rxAudioBytes?: number;
    rxVideoBytes?: number;
    txKBitRate?: number;
    rxKBitRate?: number;
    rxAudioKBitRate?: number;
    txAudioKBitRate?: number;
    rxVideoKBitRate?: number;
    txVideoKBitRate?: number;
    lastmileDelay?: number;
    userCount?: number;
    cpuAppUsage?: number;
    cpuTotalUsage?: number;
    gatewayRtt?: number;
    memoryAppUsageRatio?: number;
    memoryTotalUsageRatio?: number;
    memoryAppUsageInKbytes?: number;
    connectTimeMs?: number;
    firstAudioPacketDuration?: number;
    firstVideoPacketDuration?: number;
    firstVideoKeyFramePacketDuration?: number;
    packetsBeforeFirstKeyFramePacket?: number;
    firstAudioPacketDurationAfterUnmute?: number;
    firstVideoPacketDurationAfterUnmute?: number;
    firstVideoKeyFramePacketDurationAfterUnmute?: number;
    firstVideoKeyFrameDecodedDurationAfterUnmute?: number;
    firstVideoKeyFrameRenderedDurationAfterUnmute?: number;
    txPacketLossRate?: number;
    rxPacketLossRate?: number;
}
declare enum CLIENT_ROLE_TYPE {
    CLIENT_ROLE_BROADCASTER = 1,
    CLIENT_ROLE_AUDIENCE = 2
}
declare enum QUALITY_ADAPT_INDICATION {
    ADAPT_NONE = 0,
    ADAPT_UP_BANDWIDTH = 1,
    ADAPT_DOWN_BANDWIDTH = 2
}
declare enum AUDIENCE_LATENCY_LEVEL_TYPE {
    AUDIENCE_LATENCY_LEVEL_LOW_LATENCY = 1,
    AUDIENCE_LATENCY_LEVEL_ULTRA_LOW_LATENCY = 2
}
declare class ClientRoleOptions {
    audienceLatencyLevel?: AUDIENCE_LATENCY_LEVEL_TYPE;
}
declare enum EXPERIENCE_QUALITY_TYPE {
    EXPERIENCE_QUALITY_GOOD = 0,
    EXPERIENCE_QUALITY_BAD = 1
}
declare enum EXPERIENCE_POOR_REASON {
    EXPERIENCE_REASON_NONE = 0,
    REMOTE_NETWORK_QUALITY_POOR = 1,
    LOCAL_NETWORK_QUALITY_POOR = 2,
    WIRELESS_SIGNAL_POOR = 4,
    WIFI_BLUETOOTH_COEXIST = 8
}
declare enum AUDIO_AINS_MODE {
    AINS_MODE_BALANCED = 0,
    AINS_MODE_AGGRESSIVE = 1,
    AINS_MODE_ULTRALOWLATENCY = 2
}
declare enum AUDIO_PROFILE_TYPE {
    AUDIO_PROFILE_DEFAULT = 0,
    AUDIO_PROFILE_SPEECH_STANDARD = 1,
    AUDIO_PROFILE_MUSIC_STANDARD = 2,
    AUDIO_PROFILE_MUSIC_STANDARD_STEREO = 3,
    AUDIO_PROFILE_MUSIC_HIGH_QUALITY = 4,
    AUDIO_PROFILE_MUSIC_HIGH_QUALITY_STEREO = 5,
    AUDIO_PROFILE_IOT = 6,
    AUDIO_PROFILE_NUM = 7
}
declare enum AUDIO_SCENARIO_TYPE {
    AUDIO_SCENARIO_DEFAULT = 0,
    AUDIO_SCENARIO_GAME_STREAMING = 3,
    AUDIO_SCENARIO_CHATROOM = 5,
    AUDIO_SCENARIO_CHORUS = 7,
    AUDIO_SCENARIO_MEETING = 8,
    AUDIO_SCENARIO_NUM = 9
}
declare class VideoFormat {
    width?: number;
    height?: number;
    fps?: number;
}
declare enum VIDEO_CONTENT_HINT {
    CONTENT_HINT_NONE = 0,
    CONTENT_HINT_MOTION = 1,
    CONTENT_HINT_DETAILS = 2
}
declare enum SCREEN_SCENARIO_TYPE {
    SCREEN_SCENARIO_DOCUMENT = 1,
    SCREEN_SCENARIO_GAMING = 2,
    SCREEN_SCENARIO_VIDEO = 3,
    SCREEN_SCENARIO_RDC = 4
}
declare enum VIDEO_APPLICATION_SCENARIO_TYPE {
    APPLICATION_SCENARIO_GENERAL = 0,
    APPLICATION_SCENARIO_MEETING = 1
}
declare enum CAPTURE_BRIGHTNESS_LEVEL_TYPE {
    CAPTURE_BRIGHTNESS_LEVEL_INVALID = -1,
    CAPTURE_BRIGHTNESS_LEVEL_NORMAL = 0,
    CAPTURE_BRIGHTNESS_LEVEL_BRIGHT = 1,
    CAPTURE_BRIGHTNESS_LEVEL_DARK = 2
}
declare enum LOCAL_AUDIO_STREAM_STATE {
    LOCAL_AUDIO_STREAM_STATE_STOPPED = 0,
    LOCAL_AUDIO_STREAM_STATE_RECORDING = 1,
    LOCAL_AUDIO_STREAM_STATE_ENCODING = 2,
    LOCAL_AUDIO_STREAM_STATE_FAILED = 3
}
declare enum LOCAL_AUDIO_STREAM_ERROR {
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
    LOCAL_AUDIO_STREAM_ERROR_PLAYOUT_INVALID_ID = 10
}
declare enum LOCAL_VIDEO_STREAM_STATE {
    LOCAL_VIDEO_STREAM_STATE_STOPPED = 0,
    LOCAL_VIDEO_STREAM_STATE_CAPTURING = 1,
    LOCAL_VIDEO_STREAM_STATE_ENCODING = 2,
    LOCAL_VIDEO_STREAM_STATE_FAILED = 3
}
declare enum LOCAL_VIDEO_STREAM_ERROR {
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
    LOCAL_VIDEO_STREAM_ERROR_SCREEN_CAPTURE_FAILURE = 21,
    LOCAL_VIDEO_STREAM_ERROR_SCREEN_CAPTURE_NO_PERMISSION = 22,
    LOCAL_VIDEO_STREAM_ERROR_SCREEN_CAPTURE_PAUSED = 23,
    LOCAL_VIDEO_STREAM_ERROR_SCREEN_CAPTURE_RESUMED = 24,
    LOCAL_VIDEO_STREAM_ERROR_SCREEN_CAPTURE_WINDOW_HIDDEN = 25,
    LOCAL_VIDEO_STREAM_ERROR_SCREEN_CAPTURE_WINDOW_RECOVER_FROM_HIDDEN = 26,
    LOCAL_VIDEO_STREAM_ERROR_SCREEN_CAPTURE_WINDOW_RECOVER_FROM_MINIMIZED = 27
}
declare enum REMOTE_AUDIO_STATE {
    REMOTE_AUDIO_STATE_STOPPED = 0,
    REMOTE_AUDIO_STATE_STARTING = 1,
    REMOTE_AUDIO_STATE_DECODING = 2,
    REMOTE_AUDIO_STATE_FROZEN = 3,
    REMOTE_AUDIO_STATE_FAILED = 4
}
declare enum REMOTE_AUDIO_STATE_REASON {
    REMOTE_AUDIO_REASON_INTERNAL = 0,
    REMOTE_AUDIO_REASON_NETWORK_CONGESTION = 1,
    REMOTE_AUDIO_REASON_NETWORK_RECOVERY = 2,
    REMOTE_AUDIO_REASON_LOCAL_MUTED = 3,
    REMOTE_AUDIO_REASON_LOCAL_UNMUTED = 4,
    REMOTE_AUDIO_REASON_REMOTE_MUTED = 5,
    REMOTE_AUDIO_REASON_REMOTE_UNMUTED = 6,
    REMOTE_AUDIO_REASON_REMOTE_OFFLINE = 7
}
declare enum REMOTE_VIDEO_STATE {
    REMOTE_VIDEO_STATE_STOPPED = 0,
    REMOTE_VIDEO_STATE_STARTING = 1,
    REMOTE_VIDEO_STATE_DECODING = 2,
    REMOTE_VIDEO_STATE_FROZEN = 3,
    REMOTE_VIDEO_STATE_FAILED = 4
}
declare enum REMOTE_VIDEO_STATE_REASON {
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
    REMOTE_VIDEO_STATE_REASON_CODEC_NOT_SUPPORT = 13
}
declare enum REMOTE_USER_STATE {
    USER_STATE_MUTE_AUDIO = 1,
    USER_STATE_MUTE_VIDEO = 2,
    USER_STATE_ENABLE_VIDEO = 16,
    USER_STATE_ENABLE_LOCAL_VIDEO = 256
}
declare class VideoTrackInfo {
    isLocal?: boolean;
    ownerUid?: number;
    trackId?: number;
    channelId?: string;
    streamType?: VIDEO_STREAM_TYPE;
    codecType?: VIDEO_CODEC_TYPE;
    encodedFrameOnly?: boolean;
    sourceType?: VIDEO_SOURCE_TYPE;
    observationPosition?: number;
}
declare enum REMOTE_VIDEO_DOWNSCALE_LEVEL {
    REMOTE_VIDEO_DOWNSCALE_LEVEL_NONE = 0,
    REMOTE_VIDEO_DOWNSCALE_LEVEL_1 = 1,
    REMOTE_VIDEO_DOWNSCALE_LEVEL_2 = 2,
    REMOTE_VIDEO_DOWNSCALE_LEVEL_3 = 3,
    REMOTE_VIDEO_DOWNSCALE_LEVEL_4 = 4
}
declare class AudioVolumeInfo {
    uid?: number;
    volume?: number;
    vad?: number;
    voicePitch?: number;
}
declare class DeviceInfo {
    isLowLatencyAudioSupported?: boolean;
}
declare class Packet {
    buffer?: Uint8Array;
    size?: number;
}
declare enum AUDIO_SAMPLE_RATE_TYPE {
    AUDIO_SAMPLE_RATE_32000 = 32000,
    AUDIO_SAMPLE_RATE_44100 = 44100,
    AUDIO_SAMPLE_RATE_48000 = 48000
}
declare enum VIDEO_CODEC_TYPE_FOR_STREAM {
    VIDEO_CODEC_H264_FOR_STREAM = 1,
    VIDEO_CODEC_H265_FOR_STREAM = 2
}
declare enum VIDEO_CODEC_PROFILE_TYPE {
    VIDEO_CODEC_PROFILE_BASELINE = 66,
    VIDEO_CODEC_PROFILE_MAIN = 77,
    VIDEO_CODEC_PROFILE_HIGH = 100
}
declare enum AUDIO_CODEC_PROFILE_TYPE {
    AUDIO_CODEC_PROFILE_LC_AAC = 0,
    AUDIO_CODEC_PROFILE_HE_AAC = 1,
    AUDIO_CODEC_PROFILE_HE_AAC_V2 = 2
}
declare class LocalAudioStats {
    numChannels?: number;
    sentSampleRate?: number;
    sentBitrate?: number;
    internalCodec?: number;
    txPacketLossRate?: number;
    audioDeviceDelay?: number;
}
declare enum RTMP_STREAM_PUBLISH_STATE {
    RTMP_STREAM_PUBLISH_STATE_IDLE = 0,
    RTMP_STREAM_PUBLISH_STATE_CONNECTING = 1,
    RTMP_STREAM_PUBLISH_STATE_RUNNING = 2,
    RTMP_STREAM_PUBLISH_STATE_RECOVERING = 3,
    RTMP_STREAM_PUBLISH_STATE_FAILURE = 4,
    RTMP_STREAM_PUBLISH_STATE_DISCONNECTING = 5
}
declare enum RTMP_STREAM_PUBLISH_ERROR_TYPE {
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
    RTMP_STREAM_UNPUBLISH_ERROR_OK = 100
}
declare enum RTMP_STREAMING_EVENT {
    RTMP_STREAMING_EVENT_FAILED_LOAD_IMAGE = 1,
    RTMP_STREAMING_EVENT_URL_ALREADY_IN_USE = 2,
    RTMP_STREAMING_EVENT_ADVANCED_FEATURE_NOT_SUPPORT = 3,
    RTMP_STREAMING_EVENT_REQUEST_TOO_OFTEN = 4
}
declare class RtcImage {
    url?: string;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    zOrder?: number;
    alpha?: number;
}
declare class LiveStreamAdvancedFeature {
    featureName?: string;
    opened?: boolean;
}
declare enum CONNECTION_STATE_TYPE {
    CONNECTION_STATE_DISCONNECTED = 1,
    CONNECTION_STATE_CONNECTING = 2,
    CONNECTION_STATE_CONNECTED = 3,
    CONNECTION_STATE_RECONNECTING = 4,
    CONNECTION_STATE_FAILED = 5
}
declare class TranscodingUser {
    uid?: number;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    zOrder?: number;
    alpha?: number;
    audioChannel?: number;
}
declare class LiveTranscoding {
    width?: number;
    height?: number;
    videoBitrate?: number;
    videoFramerate?: number;
    lowLatency?: boolean;
    videoGop?: number;
    videoCodecProfile?: VIDEO_CODEC_PROFILE_TYPE;
    backgroundColor?: number;
    videoCodecType?: VIDEO_CODEC_TYPE_FOR_STREAM;
    userCount?: number;
    transcodingUsers?: TranscodingUser[];
    transcodingExtraInfo?: string;
    metadata?: string;
    watermark?: RtcImage[];
    watermarkCount?: number;
    backgroundImage?: RtcImage[];
    backgroundImageCount?: number;
    audioSampleRate?: AUDIO_SAMPLE_RATE_TYPE;
    audioBitrate?: number;
    audioChannels?: number;
    audioCodecProfile?: AUDIO_CODEC_PROFILE_TYPE;
    advancedFeatures?: LiveStreamAdvancedFeature[];
    advancedFeatureCount?: number;
}
declare class TranscodingVideoStream {
    sourceType?: VIDEO_SOURCE_TYPE;
    remoteUserUid?: number;
    imageUrl?: string;
    mediaPlayerId?: number;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    zOrder?: number;
    alpha?: number;
    mirror?: boolean;
}
declare class LocalTranscoderConfiguration {
    streamCount?: number;
    videoInputStreams?: TranscodingVideoStream[];
    videoOutputConfiguration?: VideoEncoderConfiguration;
    syncWithPrimaryCamera?: boolean;
}
declare enum VIDEO_TRANSCODER_ERROR {
    VT_ERR_OK = 0,
    VT_ERR_VIDEO_SOURCE_NOT_READY = 1,
    VT_ERR_INVALID_VIDEO_SOURCE_TYPE = 2,
    VT_ERR_INVALID_IMAGE_PATH = 3,
    VT_ERR_UNSUPPORT_IMAGE_FORMAT = 4,
    VT_ERR_INVALID_LAYOUT = 5,
    VT_ERR_INTERNAL = 20
}
declare class LastmileProbeConfig {
    probeUplink?: boolean;
    probeDownlink?: boolean;
    expectedUplinkBitrate?: number;
    expectedDownlinkBitrate?: number;
}
declare enum LASTMILE_PROBE_RESULT_STATE {
    LASTMILE_PROBE_RESULT_COMPLETE = 1,
    LASTMILE_PROBE_RESULT_INCOMPLETE_NO_BWE = 2,
    LASTMILE_PROBE_RESULT_UNAVAILABLE = 3
}
declare class LastmileProbeOneWayResult {
    packetLossRate?: number;
    jitter?: number;
    availableBandwidth?: number;
}
declare class LastmileProbeResult {
    state?: LASTMILE_PROBE_RESULT_STATE;
    uplinkReport?: LastmileProbeOneWayResult;
    downlinkReport?: LastmileProbeOneWayResult;
    rtt?: number;
}
declare enum CONNECTION_CHANGED_REASON_TYPE {
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
    CONNECTION_CHANGED_LICENSE_VALIDATION_FAILURE = 21,
    CONNECTION_CHANGED_CERTIFICATION_VERYFY_FAILURE = 22
}
declare enum CLIENT_ROLE_CHANGE_FAILED_REASON {
    CLIENT_ROLE_CHANGE_FAILED_TOO_MANY_BROADCASTERS = 1,
    CLIENT_ROLE_CHANGE_FAILED_NOT_AUTHORIZED = 2,
    CLIENT_ROLE_CHANGE_FAILED_REQUEST_TIME_OUT = 3,
    CLIENT_ROLE_CHANGE_FAILED_CONNECTION_FAILED = 4
}
declare enum WLACC_MESSAGE_REASON {
    WLACC_MESSAGE_REASON_WEAK_SIGNAL = 0,
    WLACC_MESSAGE_REASON_CHANNEL_CONGESTION = 1
}
declare enum WLACC_SUGGEST_ACTION {
    WLACC_SUGGEST_ACTION_CLOSE_TO_WIFI = 0,
    WLACC_SUGGEST_ACTION_CONNECT_SSID = 1,
    WLACC_SUGGEST_ACTION_CHECK_5G = 2,
    WLACC_SUGGEST_ACTION_MODIFY_SSID = 3
}
declare class WlAccStats {
    e2eDelayPercent?: number;
    frozenRatioPercent?: number;
    lossRatePercent?: number;
}
declare enum NETWORK_TYPE {
    NETWORK_TYPE_UNKNOWN = -1,
    NETWORK_TYPE_DISCONNECTED = 0,
    NETWORK_TYPE_LAN = 1,
    NETWORK_TYPE_WIFI = 2,
    NETWORK_TYPE_MOBILE_2G = 3,
    NETWORK_TYPE_MOBILE_3G = 4,
    NETWORK_TYPE_MOBILE_4G = 5,
    NETWORK_TYPE_MOBILE_5G = 6
}
declare enum VIDEO_VIEW_SETUP_MODE {
    VIDEO_VIEW_SETUP_REPLACE = 0,
    VIDEO_VIEW_SETUP_ADD = 1,
    VIDEO_VIEW_SETUP_REMOVE = 2
}
declare class VideoCanvas {
    view?: any;
    uid?: number;
    backgroundColor?: number;
    renderMode?: RENDER_MODE_TYPE;
    mirrorMode?: VIDEO_MIRROR_MODE_TYPE;
    setupMode?: VIDEO_VIEW_SETUP_MODE;
    sourceType?: VIDEO_SOURCE_TYPE;
    mediaPlayerId?: number;
    cropArea?: Rectangle;
    enableAlphaMask?: boolean;
}
declare enum LIGHTENING_CONTRAST_LEVEL {
    LIGHTENING_CONTRAST_LOW = 0,
    LIGHTENING_CONTRAST_NORMAL = 1,
    LIGHTENING_CONTRAST_HIGH = 2
}
declare class BeautyOptions {
    lighteningContrastLevel?: LIGHTENING_CONTRAST_LEVEL;
    lighteningLevel?: number;
    smoothnessLevel?: number;
    rednessLevel?: number;
    sharpnessLevel?: number;
}
declare enum LOW_LIGHT_ENHANCE_MODE {
    LOW_LIGHT_ENHANCE_AUTO = 0,
    LOW_LIGHT_ENHANCE_MANUAL = 1
}
declare enum LOW_LIGHT_ENHANCE_LEVEL {
    LOW_LIGHT_ENHANCE_LEVEL_HIGH_QUALITY = 0,
    LOW_LIGHT_ENHANCE_LEVEL_FAST = 1
}
declare class LowlightEnhanceOptions {
    mode?: LOW_LIGHT_ENHANCE_MODE;
    level?: LOW_LIGHT_ENHANCE_LEVEL;
}
declare enum VIDEO_DENOISER_MODE {
    VIDEO_DENOISER_AUTO = 0,
    VIDEO_DENOISER_MANUAL = 1
}
declare enum VIDEO_DENOISER_LEVEL {
    VIDEO_DENOISER_LEVEL_HIGH_QUALITY = 0,
    VIDEO_DENOISER_LEVEL_FAST = 1,
    VIDEO_DENOISER_LEVEL_STRENGTH = 2
}
declare class VideoDenoiserOptions {
    mode?: VIDEO_DENOISER_MODE;
    level?: VIDEO_DENOISER_LEVEL;
}
declare class ColorEnhanceOptions {
    strengthLevel?: number;
    skinProtectLevel?: number;
}
declare enum BACKGROUND_SOURCE_TYPE {
    BACKGROUND_NONE = 0,
    BACKGROUND_COLOR = 1,
    BACKGROUND_IMG = 2,
    BACKGROUND_BLUR = 3,
    BACKGROUND_VIDEO = 4
}
declare enum BACKGROUND_BLUR_DEGREE {
    BLUR_DEGREE_LOW = 1,
    BLUR_DEGREE_MEDIUM = 2,
    BLUR_DEGREE_HIGH = 3
}
declare class VirtualBackgroundSource {
    background_source_type?: BACKGROUND_SOURCE_TYPE;
    color?: number;
    source?: string;
    blur_degree?: BACKGROUND_BLUR_DEGREE;
}
declare enum SEG_MODEL_TYPE {
    SEG_MODEL_AI = 1,
    SEG_MODEL_GREEN = 2
}
declare class SegmentationProperty {
    modelType?: SEG_MODEL_TYPE;
    greenCapacity?: number;
}
declare enum AUDIO_TRACK_TYPE {
    AUDIO_TRACK_INVALID = -1,
    AUDIO_TRACK_MIXABLE = 0,
    AUDIO_TRACK_DIRECT = 1
}
declare class AudioTrackConfig {
    enableLocalPlayback?: boolean;
}
declare enum VOICE_BEAUTIFIER_PRESET {
    VOICE_BEAUTIFIER_OFF = 0,
    CHAT_BEAUTIFIER_MAGNETIC = 16843008,
    CHAT_BEAUTIFIER_FRESH = 16843264,
    CHAT_BEAUTIFIER_VITALITY = 16843520,
    SINGING_BEAUTIFIER = 16908544,
    TIMBRE_TRANSFORMATION_VIGOROUS = 16974080,
    TIMBRE_TRANSFORMATION_DEEP = 16974336,
    TIMBRE_TRANSFORMATION_MELLOW = 16974592,
    TIMBRE_TRANSFORMATION_FALSETTO = 16974848,
    TIMBRE_TRANSFORMATION_FULL = 16975104,
    TIMBRE_TRANSFORMATION_CLEAR = 16975360,
    TIMBRE_TRANSFORMATION_RESOUNDING = 16975616,
    TIMBRE_TRANSFORMATION_RINGING = 16975872,
    ULTRA_HIGH_QUALITY_VOICE = 17039616
}
declare enum AUDIO_EFFECT_PRESET {
    AUDIO_EFFECT_OFF = 0,
    ROOM_ACOUSTICS_KTV = 33620224,
    ROOM_ACOUSTICS_VOCAL_CONCERT = 33620480,
    ROOM_ACOUSTICS_STUDIO = 33620736,
    ROOM_ACOUSTICS_PHONOGRAPH = 33620992,
    ROOM_ACOUSTICS_VIRTUAL_STEREO = 33621248,
    ROOM_ACOUSTICS_SPACIAL = 33621504,
    ROOM_ACOUSTICS_ETHEREAL = 33621760,
    ROOM_ACOUSTICS_3D_VOICE = 33622016,
    ROOM_ACOUSTICS_VIRTUAL_SURROUND_SOUND = 33622272,
    VOICE_CHANGER_EFFECT_UNCLE = 33685760,
    VOICE_CHANGER_EFFECT_OLDMAN = 33686016,
    VOICE_CHANGER_EFFECT_BOY = 33686272,
    VOICE_CHANGER_EFFECT_SISTER = 33686528,
    VOICE_CHANGER_EFFECT_GIRL = 33686784,
    VOICE_CHANGER_EFFECT_PIGKING = 33687040,
    VOICE_CHANGER_EFFECT_HULK = 33687296,
    STYLE_TRANSFORMATION_RNB = 33751296,
    STYLE_TRANSFORMATION_POPULAR = 33751552,
    PITCH_CORRECTION = 33816832
}
declare enum VOICE_CONVERSION_PRESET {
    VOICE_CONVERSION_OFF = 0,
    VOICE_CHANGER_NEUTRAL = 50397440,
    VOICE_CHANGER_SWEET = 50397696,
    VOICE_CHANGER_SOLID = 50397952,
    VOICE_CHANGER_BASS = 50398208,
    VOICE_CHANGER_CARTOON = 50398464,
    VOICE_CHANGER_CHILDLIKE = 50398720,
    VOICE_CHANGER_PHONE_OPERATOR = 50398976,
    VOICE_CHANGER_MONSTER = 50399232,
    VOICE_CHANGER_TRANSFORMERS = 50399488,
    VOICE_CHANGER_GROOT = 50399744,
    VOICE_CHANGER_DARTH_VADER = 50400000,
    VOICE_CHANGER_IRON_LADY = 50400256,
    VOICE_CHANGER_SHIN_CHAN = 50400512,
    VOICE_CHANGER_GIRLISH_MAN = 50400768,
    VOICE_CHANGER_CHIPMUNK = 50401024
}
declare enum HEADPHONE_EQUALIZER_PRESET {
    HEADPHONE_EQUALIZER_OFF = 0,
    HEADPHONE_EQUALIZER_OVEREAR = 67108865,
    HEADPHONE_EQUALIZER_INEAR = 67108866
}
declare class ScreenCaptureParameters {
    dimensions?: VideoDimensions;
    frameRate?: number;
    bitrate?: number;
    captureMouseCursor?: boolean;
    windowFocus?: boolean;
    excludeWindowList?: any[];
    excludeWindowCount?: number;
    highLightWidth?: number;
    highLightColor?: number;
    enableHighLight?: boolean;
}
declare enum AUDIO_RECORDING_QUALITY_TYPE {
    AUDIO_RECORDING_QUALITY_LOW = 0,
    AUDIO_RECORDING_QUALITY_MEDIUM = 1,
    AUDIO_RECORDING_QUALITY_HIGH = 2,
    AUDIO_RECORDING_QUALITY_ULTRA_HIGH = 3
}
declare enum AUDIO_FILE_RECORDING_TYPE {
    AUDIO_FILE_RECORDING_MIC = 1,
    AUDIO_FILE_RECORDING_PLAYBACK = 2,
    AUDIO_FILE_RECORDING_MIXED = 3
}
declare enum AUDIO_ENCODED_FRAME_OBSERVER_POSITION {
    AUDIO_ENCODED_FRAME_OBSERVER_POSITION_RECORD = 1,
    AUDIO_ENCODED_FRAME_OBSERVER_POSITION_PLAYBACK = 2,
    AUDIO_ENCODED_FRAME_OBSERVER_POSITION_MIXED = 3
}
declare class AudioRecordingConfiguration {
    filePath?: string;
    encode?: boolean;
    sampleRate?: number;
    fileRecordingType?: AUDIO_FILE_RECORDING_TYPE;
    quality?: AUDIO_RECORDING_QUALITY_TYPE;
    recordingChannel?: number;
}
declare class AudioEncodedFrameObserverConfig {
    postionType?: AUDIO_ENCODED_FRAME_OBSERVER_POSITION;
    encodingType?: AUDIO_ENCODING_TYPE;
}
interface IAudioEncodedFrameObserver {
    onRecordAudioEncodedFrame(frameBuffer: Uint8Array, length: number, audioEncodedFrameInfo: EncodedAudioFrameInfo): void;
    onPlaybackAudioEncodedFrame(frameBuffer: Uint8Array, length: number, audioEncodedFrameInfo: EncodedAudioFrameInfo): void;
    onMixedAudioEncodedFrame(frameBuffer: Uint8Array, length: number, audioEncodedFrameInfo: EncodedAudioFrameInfo): void;
}
declare enum AREA_CODE {
    AREA_CODE_CN = 1,
    AREA_CODE_NA = 2,
    AREA_CODE_EU = 4,
    AREA_CODE_AS = 8,
    AREA_CODE_JP = 16,
    AREA_CODE_IN = 32,
    AREA_CODE_GLOB = 4294967295
}
declare enum AREA_CODE_EX {
    AREA_CODE_OC = 64,
    AREA_CODE_SA = 128,
    AREA_CODE_AF = 256,
    AREA_CODE_KR = 512,
    AREA_CODE_HKMC = 1024,
    AREA_CODE_US = 2048,
    AREA_CODE_OVS = 4294967294
}
declare enum CHANNEL_MEDIA_RELAY_ERROR {
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
    RELAY_ERROR_DEST_TOKEN_EXPIRED = 11
}
declare enum CHANNEL_MEDIA_RELAY_EVENT {
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
    RELAY_EVENT_RESUME_SEND_PACKET_TO_DEST_CHANNEL_FAILED = 15
}
declare enum CHANNEL_MEDIA_RELAY_STATE {
    RELAY_STATE_IDLE = 0,
    RELAY_STATE_CONNECTING = 1,
    RELAY_STATE_RUNNING = 2,
    RELAY_STATE_FAILURE = 3
}
declare class ChannelMediaInfo {
    channelName?: string;
    token?: string;
    uid?: number;
}
declare class ChannelMediaRelayConfiguration {
    srcInfo?: ChannelMediaInfo[];
    destInfos?: ChannelMediaInfo[];
    destCount?: number;
}
declare class UplinkNetworkInfo {
    video_encoder_target_bitrate_bps?: number;
}
declare class PeerDownlinkInfo {
    uid?: string;
    stream_type?: VIDEO_STREAM_TYPE;
    current_downscale_level?: REMOTE_VIDEO_DOWNSCALE_LEVEL;
    expected_bitrate_bps?: number;
}
declare class DownlinkNetworkInfo {
    lastmile_buffer_delay_time_ms?: number;
    bandwidth_estimation_bps?: number;
    total_downscale_level_count?: number;
    peer_downlink_info?: PeerDownlinkInfo[];
    total_received_video_count?: number;
}
declare enum ENCRYPTION_MODE {
    AES_128_XTS = 1,
    AES_128_ECB = 2,
    AES_256_XTS = 3,
    SM4_128_ECB = 4,
    AES_128_GCM = 5,
    AES_256_GCM = 6,
    AES_128_GCM2 = 7,
    AES_256_GCM2 = 8,
    MODE_END = 9
}
declare class EncryptionConfig {
    encryptionMode?: ENCRYPTION_MODE;
    encryptionKey?: string;
    encryptionKdfSalt?: number;
}
declare enum ENCRYPTION_ERROR_TYPE {
    ENCRYPTION_ERROR_INTERNAL_FAILURE = 0,
    ENCRYPTION_ERROR_DECRYPTION_FAILURE = 1,
    ENCRYPTION_ERROR_ENCRYPTION_FAILURE = 2
}
declare enum UPLOAD_ERROR_REASON {
    UPLOAD_SUCCESS = 0,
    UPLOAD_NET_ERROR = 1,
    UPLOAD_SERVER_ERROR = 2
}
declare enum PERMISSION_TYPE {
    RECORD_AUDIO = 0,
    CAMERA = 1,
    SCREEN_CAPTURE = 2
}
declare enum MAX_USER_ACCOUNT_LENGTH_TYPE {
    MAX_USER_ACCOUNT_LENGTH = 256
}
declare enum STREAM_SUBSCRIBE_STATE {
    SUB_STATE_IDLE = 0,
    SUB_STATE_NO_SUBSCRIBED = 1,
    SUB_STATE_SUBSCRIBING = 2,
    SUB_STATE_SUBSCRIBED = 3
}
declare enum STREAM_PUBLISH_STATE {
    PUB_STATE_IDLE = 0,
    PUB_STATE_NO_PUBLISHED = 1,
    PUB_STATE_PUBLISHING = 2,
    PUB_STATE_PUBLISHED = 3
}
declare class EchoTestConfiguration {
    view?: any;
    enableAudio?: boolean;
    enableVideo?: boolean;
    token?: string;
    channelId?: string;
    intervalInSeconds?: number;
}
declare class UserInfo {
    uid?: number;
    userAccount?: string;
}
declare enum EAR_MONITORING_FILTER_TYPE {
    EAR_MONITORING_FILTER_NONE = 1,
    EAR_MONITORING_FILTER_BUILT_IN_AUDIO_FILTERS = 2,
    EAR_MONITORING_FILTER_NOISE_SUPPRESSION = 4
}
declare enum THREAD_PRIORITY_TYPE {
    LOWEST = 0,
    LOW = 1,
    NORMAL = 2,
    HIGH = 3,
    HIGHEST = 4,
    CRITICAL = 5
}
declare class ScreenVideoParameters {
    dimensions?: VideoDimensions;
    frameRate?: number;
    bitrate?: number;
    contentHint?: VIDEO_CONTENT_HINT;
}
declare class ScreenAudioParameters {
    sampleRate?: number;
    channels?: number;
    captureSignalVolume?: number;
}
declare class ScreenCaptureParameters2 {
    captureAudio?: boolean;
    audioParams?: ScreenAudioParameters;
    captureVideo?: boolean;
    videoParams?: ScreenVideoParameters;
}
declare enum MEDIA_TRACE_EVENT {
    MEDIA_TRACE_EVENT_VIDEO_RENDERED = 0,
    MEDIA_TRACE_EVENT_VIDEO_DECODED = 1
}
declare class VideoRenderingTracingInfo {
    elapsedTime?: number;
    start2JoinChannel?: number;
    join2JoinSuccess?: number;
    joinSuccess2RemoteJoined?: number;
    remoteJoined2SetView?: number;
    remoteJoined2UnmuteVideo?: number;
    remoteJoined2PacketReceived?: number;
}
declare enum CONFIG_FETCH_TYPE {
    CONFIG_FETCH_TYPE_INITIALIZE = 1,
    CONFIG_FETCH_TYPE_JOIN_CHANNEL = 2
}
declare class RecorderStreamInfo {
    channelId?: string;
    uid?: number;
}
declare enum LOCAL_PROXY_MODE {
    ConnectivityFirst = 0,
    LocalOnly = 1
}
declare class LogUploadServerInfo {
    serverDomain?: string;
    serverPath?: string;
    serverPort?: number;
    serverHttps?: boolean;
}
declare class AdvancedConfigInfo {
    logUploadServer?: LogUploadServerInfo;
}
declare class LocalAccessPointConfiguration {
    ipList?: string[];
    ipListSize?: number;
    domainList?: string[];
    domainListSize?: number;
    verifyDomainName?: string;
    mode?: LOCAL_PROXY_MODE;
    advancedConfig?: AdvancedConfigInfo;
}
declare class SpatialAudioParams {
    speaker_azimuth?: number;
    speaker_elevation?: number;
    speaker_distance?: number;
    speaker_orientation?: number;
    enable_blur?: boolean;
    enable_air_absorb?: boolean;
    speaker_attenuation?: number;
    enable_doppler?: boolean;
}

declare enum MEDIA_PLAYER_STATE {
    PLAYER_STATE_IDLE = 0,
    PLAYER_STATE_OPENING = 1,
    PLAYER_STATE_OPEN_COMPLETED = 2,
    PLAYER_STATE_PLAYING = 3,
    PLAYER_STATE_PAUSED = 4,
    PLAYER_STATE_PLAYBACK_COMPLETED = 5,
    PLAYER_STATE_PLAYBACK_ALL_LOOPS_COMPLETED = 6,
    PLAYER_STATE_STOPPED = 7,
    PLAYER_STATE_PAUSING_INTERNAL = 50,
    PLAYER_STATE_STOPPING_INTERNAL = 51,
    PLAYER_STATE_SEEKING_INTERNAL = 52,
    PLAYER_STATE_GETTING_INTERNAL = 53,
    PLAYER_STATE_NONE_INTERNAL = 54,
    PLAYER_STATE_DO_NOTHING_INTERNAL = 55,
    PLAYER_STATE_SET_TRACK_INTERNAL = 56,
    PLAYER_STATE_FAILED = 100
}
declare enum MEDIA_PLAYER_ERROR {
    PLAYER_ERROR_NONE = 0,
    PLAYER_ERROR_INVALID_ARGUMENTS = -1,
    PLAYER_ERROR_INTERNAL = -2,
    PLAYER_ERROR_NO_RESOURCE = -3,
    PLAYER_ERROR_INVALID_MEDIA_SOURCE = -4,
    PLAYER_ERROR_UNKNOWN_STREAM_TYPE = -5,
    PLAYER_ERROR_OBJ_NOT_INITIALIZED = -6,
    PLAYER_ERROR_CODEC_NOT_SUPPORTED = -7,
    PLAYER_ERROR_VIDEO_RENDER_FAILED = -8,
    PLAYER_ERROR_INVALID_STATE = -9,
    PLAYER_ERROR_URL_NOT_FOUND = -10,
    PLAYER_ERROR_INVALID_CONNECTION_STATE = -11,
    PLAYER_ERROR_SRC_BUFFER_UNDERFLOW = -12,
    PLAYER_ERROR_INTERRUPTED = -13,
    PLAYER_ERROR_NOT_SUPPORTED = -14,
    PLAYER_ERROR_TOKEN_EXPIRED = -15,
    PLAYER_ERROR_IP_EXPIRED = -16,
    PLAYER_ERROR_UNKNOWN = -17
}
declare enum MEDIA_STREAM_TYPE {
    STREAM_TYPE_UNKNOWN = 0,
    STREAM_TYPE_VIDEO = 1,
    STREAM_TYPE_AUDIO = 2,
    STREAM_TYPE_SUBTITLE = 3
}
declare enum MEDIA_PLAYER_EVENT {
    PLAYER_EVENT_SEEK_BEGIN = 0,
    PLAYER_EVENT_SEEK_COMPLETE = 1,
    PLAYER_EVENT_SEEK_ERROR = 2,
    PLAYER_EVENT_AUDIO_TRACK_CHANGED = 5,
    PLAYER_EVENT_BUFFER_LOW = 6,
    PLAYER_EVENT_BUFFER_RECOVER = 7,
    PLAYER_EVENT_FREEZE_START = 8,
    PLAYER_EVENT_FREEZE_STOP = 9,
    PLAYER_EVENT_SWITCH_BEGIN = 10,
    PLAYER_EVENT_SWITCH_COMPLETE = 11,
    PLAYER_EVENT_SWITCH_ERROR = 12,
    PLAYER_EVENT_FIRST_DISPLAYED = 13,
    PLAYER_EVENT_REACH_CACHE_FILE_MAX_COUNT = 14,
    PLAYER_EVENT_REACH_CACHE_FILE_MAX_SIZE = 15,
    PLAYER_EVENT_TRY_OPEN_START = 16,
    PLAYER_EVENT_TRY_OPEN_SUCCEED = 17,
    PLAYER_EVENT_TRY_OPEN_FAILED = 18
}
declare enum PLAYER_PRELOAD_EVENT {
    PLAYER_PRELOAD_EVENT_BEGIN = 0,
    PLAYER_PRELOAD_EVENT_COMPLETE = 1,
    PLAYER_PRELOAD_EVENT_ERROR = 2
}
declare class PlayerStreamInfo {
    streamIndex?: number;
    streamType?: MEDIA_STREAM_TYPE;
    codecName?: string;
    language?: string;
    videoFrameRate?: number;
    videoBitRate?: number;
    videoWidth?: number;
    videoHeight?: number;
    videoRotation?: number;
    audioSampleRate?: number;
    audioChannels?: number;
    audioBitsPerSample?: number;
    duration?: number;
}
declare class SrcInfo {
    bitrateInKbps?: number;
    name?: string;
}
declare enum MEDIA_PLAYER_METADATA_TYPE {
    PLAYER_METADATA_TYPE_UNKNOWN = 0,
    PLAYER_METADATA_TYPE_SEI = 1
}
declare class CacheStatistics {
    fileSize?: number;
    cacheSize?: number;
    downloadSize?: number;
}
declare class PlayerUpdatedInfo {
    playerId?: string;
    deviceId?: string;
    cacheStatistics?: CacheStatistics;
}
declare class MediaSource {
    url?: string;
    uri?: string;
    startPos?: number;
    autoPlay?: boolean;
    enableCache?: boolean;
    isAgoraSource?: boolean;
    isLiveSource?: boolean;
}

declare enum LOG_LEVEL {
    LOG_LEVEL_NONE = 0,
    LOG_LEVEL_INFO = 1,
    LOG_LEVEL_WARN = 2,
    LOG_LEVEL_ERROR = 4,
    LOG_LEVEL_FATAL = 8,
    LOG_LEVEL_API_CALL = 16
}
declare enum LOG_FILTER_TYPE {
    LOG_FILTER_OFF = 0,
    LOG_FILTER_DEBUG = 2063,
    LOG_FILTER_INFO = 15,
    LOG_FILTER_WARN = 14,
    LOG_FILTER_ERROR = 12,
    LOG_FILTER_CRITICAL = 8,
    LOG_FILTER_MASK = 2063
}
declare class LogConfig {
    filePath?: string;
    fileSizeInKB?: number;
    level?: LOG_LEVEL;
}

declare enum AUDIO_MIXING_DUAL_MONO_MODE {
    AUDIO_MIXING_DUAL_MONO_AUTO = 0,
    AUDIO_MIXING_DUAL_MONO_L = 1,
    AUDIO_MIXING_DUAL_MONO_R = 2,
    AUDIO_MIXING_DUAL_MONO_MIX = 3
}
interface IMediaEngine {
    registerAudioFrameObserver(observer: IAudioFrameObserver): CallApiReturnType;
    registerVideoFrameObserver(observer: IVideoFrameObserver): CallApiReturnType;
    registerVideoEncodedFrameObserver(observer: IVideoEncodedFrameObserver): CallApiReturnType;
    pushAudioFrame(frame: AudioFrame, trackId: number): CallApiReturnType;
    pullAudioFrame(frame: AudioFrame): CallApiReturnType;
    setExternalVideoSource(enabled: boolean, useTexture: boolean, sourceType: EXTERNAL_VIDEO_SOURCE_TYPE, encodedVideoOption: SenderOptions): CallApiReturnType;
    setExternalAudioSource(enabled: boolean, sampleRate: number, channels: number, localPlayback: boolean, publish: boolean): CallApiReturnType;
    createCustomAudioTrack(trackType: AUDIO_TRACK_TYPE, config: AudioTrackConfig): CallApiReturnType;
    destroyCustomAudioTrack(trackId: number): CallApiReturnType;
    setExternalAudioSink(enabled: boolean, sampleRate: number, channels: number): CallApiReturnType;
    enableCustomAudioLocalPlayback(trackId: number, enabled: boolean): CallApiReturnType;
    pushVideoFrame(frame: ExternalVideoFrame, videoTrackId: number): CallApiReturnType;
    pushEncodedVideoImage(imageBuffer: Uint8Array, length: number, videoEncodedFrameInfo: EncodedVideoFrameInfo, videoTrackId: number): CallApiReturnType;
    release(): CallApiReturnType;
}

interface IMediaPlayerSourceObserver {
    onPlayerSourceStateChanged(state: MEDIA_PLAYER_STATE, ec: MEDIA_PLAYER_ERROR): void;
    onPositionChanged(position_ms: number): void;
    onPlayerEvent(eventCode: MEDIA_PLAYER_EVENT, elapsedTime: number, message: string): void;
    onMetaData(data: void[], length: number): void;
    onPlayBufferUpdated(playCachedBuffer: number): void;
    onPreloadEvent(src: string, event: PLAYER_PRELOAD_EVENT): void;
    onCompleted(): void;
    onAgoraCDNTokenWillExpire(): void;
    onPlayerSrcInfoChanged(from: SrcInfo, to: SrcInfo): void;
    onPlayerInfoUpdated(info: PlayerUpdatedInfo): void;
    onAudioVolumeIndication(volume: number): void;
}

interface IMediaPlayer {
    getMediaPlayerId(): CallApiReturnType;
    open(url: string, startPos: number): CallApiReturnType;
    openWithMediaSource(source: MediaSource): CallApiReturnType;
    play(): CallApiReturnType;
    pause(): CallApiReturnType;
    stop(): CallApiReturnType;
    resume(): CallApiReturnType;
    seek(newPos: number): CallApiReturnType;
    setAudioPitch(pitch: number): CallApiReturnType;
    getDuration(duration: number): CallApiReturnType;
    getPlayPosition(pos: number): CallApiReturnType;
    getStreamCount(count: number): CallApiReturnType;
    getStreamInfo(index: number, info: PlayerStreamInfo[]): CallApiReturnType;
    setLoopCount(loopCount: number): CallApiReturnType;
    setPlaybackSpeed(speed: number): CallApiReturnType;
    selectAudioTrack(index: number): CallApiReturnType;
    setPlayerOption(key: string, value: number): CallApiReturnType;
    setPlayerOption2(key: string, value: string): CallApiReturnType;
    takeScreenshot(filename: string): CallApiReturnType;
    selectInternalSubtitle(index: number): CallApiReturnType;
    setExternalSubtitle(url: string): CallApiReturnType;
    getState(): CallApiReturnType;
    mute(muted: boolean): CallApiReturnType;
    getMute(muted: boolean): CallApiReturnType;
    adjustPlayoutVolume(volume: number): CallApiReturnType;
    getPlayoutVolume(volume: number): CallApiReturnType;
    adjustPublishSignalVolume(volume: number): CallApiReturnType;
    getPublishSignalVolume(volume: number): CallApiReturnType;
    setView(view: any): CallApiReturnType;
    setRenderMode(renderMode: RENDER_MODE_TYPE): CallApiReturnType;
    registerPlayerSourceObserver(observer: IMediaPlayerSourceObserver): CallApiReturnType;
    unregisterPlayerSourceObserver(observer: IMediaPlayerSourceObserver): CallApiReturnType;
    registerAudioFrameObserver(observer: IAudioPcmFrameSink): CallApiReturnType;
    registerAudioFrameObserver2(observer: IAudioPcmFrameSink, mode: RAW_AUDIO_FRAME_OP_MODE_TYPE): CallApiReturnType;
    unregisterAudioFrameObserver(observer: IAudioPcmFrameSink): CallApiReturnType;
    registerVideoFrameObserver(observer: IVideoFrameObserver): CallApiReturnType;
    unregisterVideoFrameObserver(observer: IVideoFrameObserver): CallApiReturnType;
    registerMediaPlayerAudioSpectrumObserver(observer: IAudioSpectrumObserver, intervalInMS: number): CallApiReturnType;
    unregisterMediaPlayerAudioSpectrumObserver(observer: IAudioSpectrumObserver): CallApiReturnType;
    setAudioDualMonoMode(mode: AUDIO_DUAL_MONO_MODE): CallApiReturnType;
    getPlayerSdkVersion(): CallApiReturnType;
    getPlaySrc(): CallApiReturnType;
    openWithAgoraCDNSrc(src: string, startPos: number): CallApiReturnType;
    getAgoraCDNLineCount(): CallApiReturnType;
    switchAgoraCDNLineByIndex(index: number): CallApiReturnType;
    getCurrentAgoraCDNIndex(): CallApiReturnType;
    enableAutoSwitchAgoraCDN(enable: boolean): CallApiReturnType;
    renewAgoraCDNSrcToken(token: string, ts: number): CallApiReturnType;
    switchAgoraCDNSrc(src: string, syncPts: boolean): CallApiReturnType;
    switchSrc(src: string, syncPts: boolean): CallApiReturnType;
    preloadSrc(src: string, startPos: number): CallApiReturnType;
    playPreloadedSrc(src: string): CallApiReturnType;
    unloadSrc(src: string): CallApiReturnType;
    setSpatialAudioParams(params: SpatialAudioParams): CallApiReturnType;
    setSoundPositionParams(pan: number, gain: number): CallApiReturnType;
}
interface IMediaPlayerCacheManager {
    removeAllCaches(): CallApiReturnType;
    removeOldCache(): CallApiReturnType;
    removeCacheByUri(uri: string): CallApiReturnType;
    setCacheDir(path: string): CallApiReturnType;
    setMaxCacheFileCount(count: number): CallApiReturnType;
    setMaxCacheFileSize(cacheSize: number): CallApiReturnType;
    enableAutoRemoveCache(enable: boolean): CallApiReturnType;
    getCacheDir(path: string, length: number): CallApiReturnType;
    getMaxCacheFileCount(): CallApiReturnType;
    getMaxCacheFileSize(): CallApiReturnType;
    getCacheFileCount(): CallApiReturnType;
}

interface IMediaRecorder {
    setMediaRecorderObserver(callback: IMediaRecorderObserver): CallApiReturnType;
    startRecording(config: MediaRecorderConfiguration): CallApiReturnType;
    stopRecording(): CallApiReturnType;
}

declare enum STREAMING_SRC_ERR {
    STREAMING_SRC_ERR_NONE = 0,
    STREAMING_SRC_ERR_UNKNOWN = 1,
    STREAMING_SRC_ERR_INVALID_PARAM = 2,
    STREAMING_SRC_ERR_BAD_STATE = 3,
    STREAMING_SRC_ERR_NO_MEM = 4,
    STREAMING_SRC_ERR_BUFFER_OVERFLOW = 5,
    STREAMING_SRC_ERR_BUFFER_UNDERFLOW = 6,
    STREAMING_SRC_ERR_NOT_FOUND = 7,
    STREAMING_SRC_ERR_TIMEOUT = 8,
    STREAMING_SRC_ERR_EXPIRED = 9,
    STREAMING_SRC_ERR_UNSUPPORTED = 10,
    STREAMING_SRC_ERR_NOT_EXIST = 11,
    STREAMING_SRC_ERR_EXIST = 12,
    STREAMING_SRC_ERR_OPEN = 13,
    STREAMING_SRC_ERR_CLOSE = 14,
    STREAMING_SRC_ERR_READ = 15,
    STREAMING_SRC_ERR_WRITE = 16,
    STREAMING_SRC_ERR_SEEK = 17,
    STREAMING_SRC_ERR_EOF = 18,
    STREAMING_SRC_ERR_CODECOPEN = 19,
    STREAMING_SRC_ERR_CODECCLOSE = 20,
    STREAMING_SRC_ERR_CODECPROC = 21
}
declare enum STREAMING_SRC_STATE {
    STREAMING_SRC_STATE_CLOSED = 0,
    STREAMING_SRC_STATE_OPENING = 1,
    STREAMING_SRC_STATE_IDLE = 2,
    STREAMING_SRC_STATE_PLAYING = 3,
    STREAMING_SRC_STATE_SEEKING = 4,
    STREAMING_SRC_STATE_EOF = 5,
    STREAMING_SRC_STATE_ERROR = 6
}
declare class InputSeiData {
    type?: number;
    timestamp?: number;
    frame_index?: number;
    private_data?: Uint8Array;
    data_size?: number;
}

declare enum PreloadStatusCode {
    kPreloadStatusCompleted = 0,
    kPreloadStatusFailed = 1,
    kPreloadStatusPreloading = 2,
    kPreloadStatusRemoved = 3
}
declare enum MusicContentCenterStatusCode {
    kMusicContentCenterStatusOk = 0,
    kMusicContentCenterStatusErr = 1,
    kMusicContentCenterStatusErrGateway = 2,
    kMusicContentCenterStatusErrPermissionAndResource = 3,
    kMusicContentCenterStatusErrInternalDataParse = 4,
    kMusicContentCenterStatusErrMusicLoading = 5,
    kMusicContentCenterStatusErrMusicDecryption = 6,
    kMusicContentCenterStatusErrHttpInternalError = 7
}
declare class MusicChartInfo {
    chartName?: string;
    id?: number;
}
declare enum MUSIC_CACHE_STATUS_TYPE {
    MUSIC_CACHE_STATUS_TYPE_CACHED = 0,
    MUSIC_CACHE_STATUS_TYPE_CACHING = 1
}
declare class MusicCacheInfo {
    songCode?: number;
    status?: MUSIC_CACHE_STATUS_TYPE;
}
interface MusicChartCollection {
    getCount(): CallApiReturnType;
    get(index: number): CallApiReturnType;
}
declare class MvProperty {
    resolution?: string;
    bandwidth?: string;
}
declare class ClimaxSegment {
    startTimeMs?: number;
    endTimeMs?: number;
}
declare class Music {
    songCode?: number;
    name?: string;
    singer?: string;
    poster?: string;
    releaseTime?: string;
    durationS?: number;
    type?: number;
    pitchType?: number;
    lyricCount?: number;
    lyricList?: number[];
    climaxSegmentCount?: number;
    climaxSegmentList?: ClimaxSegment[];
    mvPropertyCount?: number;
    mvPropertyList?: MvProperty[];
}
interface MusicCollection {
    getCount(): CallApiReturnType;
    getTotal(): CallApiReturnType;
    getPage(): CallApiReturnType;
    getPageSize(): CallApiReturnType;
    getMusic(index: number): CallApiReturnType;
}
interface IMusicContentCenterEventHandler {
    onMusicChartsResult(requestId: string, result: MusicChartCollection, errorCode: MusicContentCenterStatusCode): void;
    onMusicCollectionResult(requestId: string, result: MusicCollection, errorCode: MusicContentCenterStatusCode): void;
    onLyricResult(requestId: string, songCode: number, lyricUrl: string, errorCode: MusicContentCenterStatusCode): void;
    onSongSimpleInfoResult(requestId: string, songCode: number, simpleInfo: string, errorCode: MusicContentCenterStatusCode): void;
    onPreLoadEvent(requestId: string, songCode: number, percent: number, lyricUrl: string, status: PreloadStatusCode, errorCode: MusicContentCenterStatusCode): void;
}
declare class MusicContentCenterConfiguration {
    appId?: string;
    token?: string;
    mccUid?: number;
    maxCacheSize?: number;
    mccDomain?: string;
}
interface IMusicPlayer {
}
interface IMusicContentCenter {
    initialize(configuration: MusicContentCenterConfiguration): CallApiReturnType;
    renewToken(token: string): CallApiReturnType;
    release(): CallApiReturnType;
    registerEventHandler(eventHandler: IMusicContentCenterEventHandler): CallApiReturnType;
    unregisterEventHandler(): CallApiReturnType;
    createMusicPlayer(): CallApiReturnType;
    getMusicCharts(requestId: string): CallApiReturnType;
    getMusicCollectionByMusicChartId(requestId: string, musicChartId: number, page: number, pageSize: number, jsonOption: string): CallApiReturnType;
    searchMusic(requestId: string, keyWord: string, page: number, pageSize: number, jsonOption: string): CallApiReturnType;
    preload(songCode: number, jsonOption: string): CallApiReturnType;
    preload2(requestId: string, songCode: number): CallApiReturnType;
    removeCache(songCode: number): CallApiReturnType;
    getCaches(cacheInfo: MusicCacheInfo[], cacheInfoSize: number[]): CallApiReturnType;
    isPreloaded(songCode: number): CallApiReturnType;
    getLyric(requestId: string, songCode: number, LyricType: number): CallApiReturnType;
    getSongSimpleInfo(requestId: string, songCode: number): CallApiReturnType;
    getInternalSongCode(songCode: number, jsonOption: string, internalSongCode: number): CallApiReturnType;
}

declare enum RHYTHM_PLAYER_STATE_TYPE {
    RHYTHM_PLAYER_STATE_IDLE = 810,
    RHYTHM_PLAYER_STATE_OPENING = 811,
    RHYTHM_PLAYER_STATE_DECODING = 812,
    RHYTHM_PLAYER_STATE_PLAYING = 813,
    RHYTHM_PLAYER_STATE_FAILED = 814
}
declare enum RHYTHM_PLAYER_ERROR_TYPE {
    RHYTHM_PLAYER_ERROR_OK = 0,
    RHYTHM_PLAYER_ERROR_FAILED = 1,
    RHYTHM_PLAYER_ERROR_CAN_NOT_OPEN = 801,
    RHYTHM_PLAYER_ERROR_CAN_NOT_PLAY = 802,
    RHYTHM_PLAYER_ERROR_FILE_OVER_DURATION_LIMIT = 803
}
declare class AgoraRhythmPlayerConfig {
    beatsPerMeasure?: number;
    beatsPerMinute?: number;
}

declare enum MEDIA_DEVICE_TYPE {
    UNKNOWN_AUDIO_DEVICE = -1,
    AUDIO_PLAYOUT_DEVICE = 0,
    AUDIO_RECORDING_DEVICE = 1,
    VIDEO_RENDER_DEVICE = 2,
    VIDEO_CAPTURE_DEVICE = 3,
    AUDIO_APPLICATION_PLAYOUT_DEVICE = 4,
    AUDIO_VIRTUAL_PLAYOUT_DEVICE = 5,
    AUDIO_VIRTUAL_RECORDING_DEVICE = 6
}
declare enum AUDIO_MIXING_STATE_TYPE {
    AUDIO_MIXING_STATE_PLAYING = 710,
    AUDIO_MIXING_STATE_PAUSED = 711,
    AUDIO_MIXING_STATE_STOPPED = 713,
    AUDIO_MIXING_STATE_FAILED = 714
}
declare enum AUDIO_MIXING_REASON_TYPE {
    AUDIO_MIXING_REASON_CAN_NOT_OPEN = 701,
    AUDIO_MIXING_REASON_TOO_FREQUENT_CALL = 702,
    AUDIO_MIXING_REASON_INTERRUPTED_EOF = 703,
    AUDIO_MIXING_REASON_ONE_LOOP_COMPLETED = 721,
    AUDIO_MIXING_REASON_ALL_LOOPS_COMPLETED = 723,
    AUDIO_MIXING_REASON_STOPPED_BY_USER = 724,
    AUDIO_MIXING_REASON_OK = 0
}
declare enum INJECT_STREAM_STATUS {
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
    INJECT_STREAM_STATUS_BROKEN = 10
}
declare enum AUDIO_EQUALIZATION_BAND_FREQUENCY {
    AUDIO_EQUALIZATION_BAND_31 = 0,
    AUDIO_EQUALIZATION_BAND_62 = 1,
    AUDIO_EQUALIZATION_BAND_125 = 2,
    AUDIO_EQUALIZATION_BAND_250 = 3,
    AUDIO_EQUALIZATION_BAND_500 = 4,
    AUDIO_EQUALIZATION_BAND_1K = 5,
    AUDIO_EQUALIZATION_BAND_2K = 6,
    AUDIO_EQUALIZATION_BAND_4K = 7,
    AUDIO_EQUALIZATION_BAND_8K = 8,
    AUDIO_EQUALIZATION_BAND_16K = 9
}
declare enum AUDIO_REVERB_TYPE {
    AUDIO_REVERB_DRY_LEVEL = 0,
    AUDIO_REVERB_WET_LEVEL = 1,
    AUDIO_REVERB_ROOM_SIZE = 2,
    AUDIO_REVERB_WET_DELAY = 3,
    AUDIO_REVERB_STRENGTH = 4
}
declare enum STREAM_FALLBACK_OPTIONS {
    STREAM_FALLBACK_OPTION_DISABLED = 0,
    STREAM_FALLBACK_OPTION_VIDEO_STREAM_LOW = 1,
    STREAM_FALLBACK_OPTION_AUDIO_ONLY = 2
}
declare enum PRIORITY_TYPE {
    PRIORITY_HIGH = 50,
    PRIORITY_NORMAL = 100
}
declare class LocalVideoStats {
    uid?: number;
    sentBitrate?: number;
    sentFrameRate?: number;
    captureFrameRate?: number;
    captureFrameWidth?: number;
    captureFrameHeight?: number;
    regulatedCaptureFrameRate?: number;
    regulatedCaptureFrameWidth?: number;
    regulatedCaptureFrameHeight?: number;
    encoderOutputFrameRate?: number;
    encodedFrameWidth?: number;
    encodedFrameHeight?: number;
    rendererOutputFrameRate?: number;
    targetBitrate?: number;
    targetFrameRate?: number;
    qualityAdaptIndication?: QUALITY_ADAPT_INDICATION;
    encodedBitrate?: number;
    encodedFrameCount?: number;
    codecType?: VIDEO_CODEC_TYPE;
    txPacketLossRate?: number;
    captureBrightnessLevel?: CAPTURE_BRIGHTNESS_LEVEL_TYPE;
    dualStreamEnabled?: boolean;
    hwEncoderAccelerating?: number;
}
declare class RemoteAudioStats {
    uid?: number;
    quality?: number;
    networkTransportDelay?: number;
    jitterBufferDelay?: number;
    audioLossRate?: number;
    numChannels?: number;
    receivedSampleRate?: number;
    receivedBitrate?: number;
    totalFrozenTime?: number;
    frozenRate?: number;
    mosValue?: number;
    frozenRateByCustomPlcCount?: number;
    plcCount?: number;
    totalActiveTime?: number;
    publishDuration?: number;
    qoeQuality?: number;
    qualityChangedReason?: number;
    rxAudioBytes?: number;
}
declare class RemoteVideoStats {
    uid?: number;
    delay?: number;
    e2eDelay?: number;
    width?: number;
    height?: number;
    receivedBitrate?: number;
    decoderOutputFrameRate?: number;
    rendererOutputFrameRate?: number;
    frameLossRate?: number;
    packetLossRate?: number;
    rxStreamType?: VIDEO_STREAM_TYPE;
    totalFrozenTime?: number;
    frozenRate?: number;
    avSyncTimeMs?: number;
    totalActiveTime?: number;
    publishDuration?: number;
    mosValue?: number;
    rxVideoBytes?: number;
}
declare class Region {
    uid?: number;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    zOrder?: number;
    alpha?: number;
    renderMode?: RENDER_MODE_TYPE;
}
declare class VideoCompositingLayout {
    canvasWidth?: number;
    canvasHeight?: number;
    backgroundColor?: string;
    regions?: Region[];
    regionCount?: number;
    appData?: string;
    appDataLength?: number;
}
declare class InjectStreamConfig {
    width?: number;
    height?: number;
    videoGop?: number;
    videoFramerate?: number;
    videoBitrate?: number;
    audioSampleRate?: AUDIO_SAMPLE_RATE_TYPE;
    audioBitrate?: number;
    audioChannels?: number;
}
declare enum RTMP_STREAM_LIFE_CYCLE_TYPE {
    RTMP_STREAM_LIFE_CYCLE_BIND2CHANNEL = 1,
    RTMP_STREAM_LIFE_CYCLE_BIND2OWNER = 2
}
declare class PublisherConfiguration {
    width?: number;
    height?: number;
    framerate?: number;
    bitrate?: number;
    defaultLayout?: number;
    lifecycle?: number;
    owner?: boolean;
    injectStreamWidth?: number;
    injectStreamHeight?: number;
    injectStreamUrl?: string;
    publishUrl?: string;
    rawStreamUrl?: string;
    extraInfo?: string;
}
declare enum CAMERA_DIRECTION {
    CAMERA_REAR = 0,
    CAMERA_FRONT = 1
}
declare enum CLOUD_PROXY_TYPE {
    NONE_PROXY = 0,
    UDP_PROXY = 1,
    TCP_PROXY = 2
}
declare class CameraCapturerConfiguration {
    cameraDirection?: CAMERA_DIRECTION;
    deviceId?: string;
    format?: VideoFormat;
    followEncodeDimensionRatio?: boolean;
}
declare class ScreenCaptureConfiguration {
    isCaptureWindow?: boolean;
    displayId?: number;
    screenRect?: Rectangle;
    windowId?: any;
    params?: ScreenCaptureParameters;
    regionRect?: Rectangle;
}
declare class SIZE {
    width?: number;
    height?: number;
}
declare class ThumbImageBuffer {
    buffer?: string;
    length?: number;
    width?: number;
    height?: number;
}
declare enum ScreenCaptureSourceType {
    ScreenCaptureSourceType_Unknown = -1,
    ScreenCaptureSourceType_Window = 0,
    ScreenCaptureSourceType_Screen = 1,
    ScreenCaptureSourceType_Custom = 2
}
declare class ScreenCaptureSourceInfo {
    type?: ScreenCaptureSourceType;
    sourceId?: any;
    sourceName?: string;
    thumbImage?: ThumbImageBuffer;
    iconImage?: ThumbImageBuffer;
    processPath?: string;
    sourceTitle?: string;
    primaryMonitor?: boolean;
    isOccluded?: boolean;
    position?: Rectangle;
    minimizeWindow?: boolean;
    sourceDisplayId?: any;
}
declare class AdvancedAudioOptions {
    audioProcessingChannels?: number;
}
declare class ImageTrackOptions {
    imageUrl?: string;
    fps?: number;
    mirrorMode?: VIDEO_MIRROR_MODE_TYPE;
}
declare class ChannelMediaOptions {
    publishCameraTrack?: boolean;
    publishSecondaryCameraTrack?: boolean;
    publishThirdCameraTrack?: boolean;
    publishFourthCameraTrack?: boolean;
    publishMicrophoneTrack?: boolean;
    publishScreenCaptureVideo?: boolean;
    publishScreenCaptureAudio?: boolean;
    publishScreenTrack?: boolean;
    publishSecondaryScreenTrack?: boolean;
    publishThirdScreenTrack?: boolean;
    publishFourthScreenTrack?: boolean;
    publishCustomAudioTrack?: boolean;
    publishCustomAudioTrackId?: number;
    publishCustomVideoTrack?: boolean;
    publishEncodedVideoTrack?: boolean;
    publishMediaPlayerAudioTrack?: boolean;
    publishMediaPlayerVideoTrack?: boolean;
    publishTranscodedVideoTrack?: boolean;
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
    customVideoTrackId?: number;
    isAudioFilterable?: boolean;
}
declare enum PROXY_TYPE {
    NONE_PROXY_TYPE = 0,
    UDP_PROXY_TYPE = 1,
    TCP_PROXY_TYPE = 2,
    LOCAL_PROXY_TYPE = 3,
    TCP_PROXY_AUTO_FALLBACK_TYPE = 4,
    HTTP_PROXY_TYPE = 5,
    HTTPS_PROXY_TYPE = 6
}
declare enum FeatureType {
    VIDEO_VIRTUAL_BACKGROUND = 1,
    VIDEO_BEAUTY_EFFECT = 2
}
declare class LeaveChannelOptions {
    stopAudioMixing?: boolean;
    stopAllEffect?: boolean;
    stopMicrophoneRecording?: boolean;
}
interface IRtcEngineEventHandler {
    onJoinChannelSuccess(channel: string, uid: number, elapsed: number): void;
    onRejoinChannelSuccess(channel: string, uid: number, elapsed: number): void;
    onProxyConnected(channel: string, uid: number, proxyType: PROXY_TYPE, localProxyIp: string, elapsed: number): void;
    onError(err: ERROR_CODE_TYPE, msg: string): void;
    onAudioQuality(uid: number, quality: number, delay: number, lost: number): void;
    onLastmileProbeResult(result: LastmileProbeResult): void;
    onAudioVolumeIndication(speakers: AudioVolumeInfo[], speakerNumber: number, totalVolume: number): void;
    onLeaveChannel(stats: RtcStats): void;
    onRtcStats(stats: RtcStats): void;
    onAudioDeviceStateChanged(deviceId: string, deviceType: number, deviceState: number): void;
    onAudioMixingPositionChanged(position: number): void;
    onAudioMixingFinished(): void;
    onAudioEffectFinished(soundId: number): void;
    onVideoDeviceStateChanged(deviceId: string, deviceType: number, deviceState: number): void;
    onNetworkQuality(uid: number, txQuality: number, rxQuality: number): void;
    onIntraRequestReceived(): void;
    onUplinkNetworkInfoUpdated(info: UplinkNetworkInfo): void;
    onDownlinkNetworkInfoUpdated(info: DownlinkNetworkInfo): void;
    onLastmileQuality(quality: number): void;
    onFirstLocalVideoFrame(source: VIDEO_SOURCE_TYPE, width: number, height: number, elapsed: number): void;
    onFirstLocalVideoFramePublished(source: VIDEO_SOURCE_TYPE, elapsed: number): void;
    onFirstRemoteVideoDecoded(uid: number, width: number, height: number, elapsed: number): void;
    onVideoSizeChanged(sourceType: VIDEO_SOURCE_TYPE, uid: number, width: number, height: number, rotation: number): void;
    onLocalVideoStateChanged(source: VIDEO_SOURCE_TYPE, state: LOCAL_VIDEO_STREAM_STATE, error: LOCAL_VIDEO_STREAM_ERROR): void;
    onRemoteVideoStateChanged(uid: number, state: REMOTE_VIDEO_STATE, reason: REMOTE_VIDEO_STATE_REASON, elapsed: number): void;
    onFirstRemoteVideoFrame(userId: number, width: number, height: number, elapsed: number): void;
    onUserJoined(uid: number, elapsed: number): void;
    onUserOffline(uid: number, reason: USER_OFFLINE_REASON_TYPE): void;
    onUserMuteAudio(uid: number, muted: boolean): void;
    onUserMuteVideo(userId: number, muted: boolean): void;
    onUserEnableVideo(uid: number, enabled: boolean): void;
    onUserStateChanged(uid: number, state: number): void;
    onUserEnableLocalVideo(uid: number, enabled: boolean): void;
    onLocalAudioStats(stats: LocalAudioStats): void;
    onRemoteAudioStats(stats: RemoteAudioStats): void;
    onLocalVideoStats(source: VIDEO_SOURCE_TYPE, stats: LocalVideoStats): void;
    onRemoteVideoStats(stats: RemoteVideoStats): void;
    onCameraReady(): void;
    onCameraFocusAreaChanged(x: number, y: number, width: number, height: number): void;
    onCameraExposureAreaChanged(x: number, y: number, width: number, height: number): void;
    onFacePositionChanged(imageWidth: number, imageHeight: number, vecRectangle: Rectangle[], vecDistance: number[], numFaces: number): void;
    onVideoStopped(): void;
    onAudioMixingStateChanged(state: AUDIO_MIXING_STATE_TYPE, reason: AUDIO_MIXING_REASON_TYPE): void;
    onRhythmPlayerStateChanged(state: RHYTHM_PLAYER_STATE_TYPE, errorCode: RHYTHM_PLAYER_ERROR_TYPE): void;
    onConnectionLost(): void;
    onConnectionInterrupted(): void;
    onConnectionBanned(): void;
    onStreamMessage(userId: number, streamId: number, data: string, length: number, sentTs: number): void;
    onStreamMessageError(userId: number, streamId: number, code: number, missed: number, cached: number): void;
    onRequestToken(): void;
    onTokenPrivilegeWillExpire(token: string): void;
    onLicenseValidationFailure(error: LICENSE_ERROR_TYPE): void;
    onFirstLocalAudioFramePublished(elapsed: number): void;
    onFirstRemoteAudioFrame(uid: number, elapsed: number): void;
    onFirstRemoteAudioDecoded(uid: number, elapsed: number): void;
    onLocalAudioStateChanged(state: LOCAL_AUDIO_STREAM_STATE, error: LOCAL_AUDIO_STREAM_ERROR): void;
    onRemoteAudioStateChanged(uid: number, state: REMOTE_AUDIO_STATE, reason: REMOTE_AUDIO_STATE_REASON, elapsed: number): void;
    onActiveSpeaker(userId: number): void;
    onContentInspectResult(result: CONTENT_INSPECT_RESULT): void;
    onSnapshotTaken(uid: number, filePath: string, width: number, height: number, errCode: number): void;
    onClientRoleChanged(oldRole: CLIENT_ROLE_TYPE, newRole: CLIENT_ROLE_TYPE, newRoleOptions: ClientRoleOptions): void;
    onClientRoleChangeFailed(reason: CLIENT_ROLE_CHANGE_FAILED_REASON, currentRole: CLIENT_ROLE_TYPE): void;
    onAudioDeviceVolumeChanged(deviceType: MEDIA_DEVICE_TYPE, volume: number, muted: boolean): void;
    onRtmpStreamingStateChanged(url: string, state: RTMP_STREAM_PUBLISH_STATE, errCode: RTMP_STREAM_PUBLISH_ERROR_TYPE): void;
    onRtmpStreamingEvent(url: string, eventCode: RTMP_STREAMING_EVENT): void;
    onTranscodingUpdated(): void;
    onAudioRoutingChanged(routing: number): void;
    onChannelMediaRelayStateChanged(state: number, code: number): void;
    onChannelMediaRelayEvent(code: number): void;
    onLocalPublishFallbackToAudioOnly(isFallbackOrRecover: boolean): void;
    onRemoteSubscribeFallbackToAudioOnly(uid: number, isFallbackOrRecover: boolean): void;
    onRemoteAudioTransportStats(uid: number, delay: number, lost: number, rxKBitRate: number): void;
    onRemoteVideoTransportStats(uid: number, delay: number, lost: number, rxKBitRate: number): void;
    onConnectionStateChanged(state: CONNECTION_STATE_TYPE, reason: CONNECTION_CHANGED_REASON_TYPE): void;
    onWlAccMessage(reason: WLACC_MESSAGE_REASON, action: WLACC_SUGGEST_ACTION, wlAccMsg: string): void;
    onWlAccStats(currentStats: WlAccStats, averageStats: WlAccStats): void;
    onNetworkTypeChanged(type: NETWORK_TYPE): void;
    onEncryptionError(errorType: ENCRYPTION_ERROR_TYPE): void;
    onPermissionError(permissionType: PERMISSION_TYPE): void;
    onLocalUserRegistered(uid: number, userAccount: string): void;
    onUserInfoUpdated(uid: number, info: UserInfo): void;
    onUploadLogResult(requestId: string, success: boolean, reason: UPLOAD_ERROR_REASON): void;
    onAudioSubscribeStateChanged(channel: string, uid: number, oldState: STREAM_SUBSCRIBE_STATE, newState: STREAM_SUBSCRIBE_STATE, elapseSinceLastState: number): void;
    onVideoSubscribeStateChanged(channel: string, uid: number, oldState: STREAM_SUBSCRIBE_STATE, newState: STREAM_SUBSCRIBE_STATE, elapseSinceLastState: number): void;
    onAudioPublishStateChanged(channel: string, oldState: STREAM_PUBLISH_STATE, newState: STREAM_PUBLISH_STATE, elapseSinceLastState: number): void;
    onVideoPublishStateChanged(source: VIDEO_SOURCE_TYPE, channel: string, oldState: STREAM_PUBLISH_STATE, newState: STREAM_PUBLISH_STATE, elapseSinceLastState: number): void;
    onExtensionEvent(provider: string, extension: string, key: string, value: string): void;
    onExtensionStarted(provider: string, extension: string): void;
    onExtensionStopped(provider: string, extension: string): void;
    onExtensionError(provider: string, extension: string, error: number, message: string): void;
    onUserAccountUpdated(uid: number, userAccount: string): void;
    onLocalVideoTranscoderError(stream: TranscodingVideoStream, error: VIDEO_TRANSCODER_ERROR): void;
    onVideoRenderingTracingResult(uid: number, currentEvent: MEDIA_TRACE_EVENT, tracingInfo: VideoRenderingTracingInfo): void;
}
interface IVideoDeviceManager {
    enumerateVideoDevices(): CallApiReturnType;
    setDevice(deviceIdUTF8: string): CallApiReturnType;
    getDevice(): CallApiReturnType;
    numberOfCapabilities(deviceIdUTF8: string): CallApiReturnType;
    getCapability(deviceIdUTF8: string, deviceCapabilityNumber: number, capability: VideoFormat): CallApiReturnType;
    startDeviceTest(hwnd: any): CallApiReturnType;
    stopDeviceTest(): CallApiReturnType;
    release(): CallApiReturnType;
}
declare class RtcEngineContext {
    appId?: string;
    channelProfile?: CHANNEL_PROFILE_TYPE;
    license?: string;
    audioScenario?: AUDIO_SCENARIO_TYPE;
    areaCode?: number;
    logConfig?: LogConfig;
    threadPriority?: THREAD_PRIORITY_TYPE;
    useExternalEglContext?: boolean;
    domainLimit?: boolean;
    autoRegisterAgoraExtensions?: boolean;
}
declare enum METADATA_TYPE {
    UNKNOWN_METADATA = -1,
    VIDEO_METADATA = 0
}
declare enum MAX_METADATA_SIZE_TYPE {
    INVALID_METADATA_SIZE_IN_BYTE = -1,
    DEFAULT_METADATA_SIZE_IN_BYTE = 512,
    MAX_METADATA_SIZE_IN_BYTE = 1024
}
declare class Metadata {
    uid?: number;
    size?: number;
    buffer?: Uint8Array;
    timeStampMs?: number;
}
interface IMetadataObserver {
    onMetadataReceived(metadata: Metadata): void;
}
declare enum DIRECT_CDN_STREAMING_ERROR {
    DIRECT_CDN_STREAMING_ERROR_OK = 0,
    DIRECT_CDN_STREAMING_ERROR_FAILED = 1,
    DIRECT_CDN_STREAMING_ERROR_AUDIO_PUBLICATION = 2,
    DIRECT_CDN_STREAMING_ERROR_VIDEO_PUBLICATION = 3,
    DIRECT_CDN_STREAMING_ERROR_NET_CONNECT = 4,
    DIRECT_CDN_STREAMING_ERROR_BAD_NAME = 5
}
declare enum DIRECT_CDN_STREAMING_STATE {
    DIRECT_CDN_STREAMING_STATE_IDLE = 0,
    DIRECT_CDN_STREAMING_STATE_RUNNING = 1,
    DIRECT_CDN_STREAMING_STATE_STOPPED = 2,
    DIRECT_CDN_STREAMING_STATE_FAILED = 3,
    DIRECT_CDN_STREAMING_STATE_RECOVERING = 4
}
declare class DirectCdnStreamingStats {
    videoWidth?: number;
    videoHeight?: number;
    fps?: number;
    videoBitrate?: number;
    audioBitrate?: number;
}
interface IDirectCdnStreamingEventHandler {
    onDirectCdnStreamingStateChanged(state: DIRECT_CDN_STREAMING_STATE, error: DIRECT_CDN_STREAMING_ERROR, message: string): void;
    onDirectCdnStreamingStats(stats: DirectCdnStreamingStats): void;
}
declare class DirectCdnStreamingMediaOptions {
    publishCameraTrack?: boolean;
    publishMicrophoneTrack?: boolean;
    publishCustomAudioTrack?: boolean;
    publishCustomVideoTrack?: boolean;
    publishMediaPlayerAudioTrack?: boolean;
    publishMediaPlayerId?: number;
    customVideoTrackId?: number;
}
declare class ExtensionInfo {
    mediaSourceType?: MEDIA_SOURCE_TYPE;
    remoteUid?: number;
    channelId?: string;
    localUid?: number;
}
interface IRtcEngine {
    release(sync: boolean): CallApiReturnType;
    initialize(context: RtcEngineContext): CallApiReturnType;
    getVersion(): CallApiReturnType;
    getErrorDescription(code: number): CallApiReturnType;
    queryCodecCapability(codecInfo: CodecCapInfo[], size: number): CallApiReturnType;
    preloadChannel(token: string, channelId: string, uid: number): CallApiReturnType;
    preloadChannel2(token: string, channelId: string, userAccount: string): CallApiReturnType;
    updatePreloadChannelToken(token: string): CallApiReturnType;
    joinChannel(token: string, channelId: string, info: string, uid: number): CallApiReturnType;
    joinChannel2(token: string, channelId: string, uid: number, options: ChannelMediaOptions): CallApiReturnType;
    updateChannelMediaOptions(options: ChannelMediaOptions): CallApiReturnType;
    leaveChannel(): CallApiReturnType;
    leaveChannel2(options: LeaveChannelOptions): CallApiReturnType;
    renewToken(token: string): CallApiReturnType;
    setChannelProfile(profile: CHANNEL_PROFILE_TYPE): CallApiReturnType;
    setClientRole(role: CLIENT_ROLE_TYPE): CallApiReturnType;
    setClientRole2(role: CLIENT_ROLE_TYPE, options: ClientRoleOptions): CallApiReturnType;
    startEchoTest(): CallApiReturnType;
    startEchoTest2(intervalInSeconds: number): CallApiReturnType;
    startEchoTest3(config: EchoTestConfiguration): CallApiReturnType;
    stopEchoTest(): CallApiReturnType;
    enableMultiCamera(enabled: boolean, config: CameraCapturerConfiguration): CallApiReturnType;
    enableVideo(): CallApiReturnType;
    disableVideo(): CallApiReturnType;
    startPreview(): CallApiReturnType;
    startPreview2(sourceType: VIDEO_SOURCE_TYPE): CallApiReturnType;
    stopPreview(): CallApiReturnType;
    stopPreview2(sourceType: VIDEO_SOURCE_TYPE): CallApiReturnType;
    startLastmileProbeTest(config: LastmileProbeConfig): CallApiReturnType;
    stopLastmileProbeTest(): CallApiReturnType;
    setVideoEncoderConfiguration(config: VideoEncoderConfiguration): CallApiReturnType;
    setBeautyEffectOptions(enabled: boolean, options: BeautyOptions, type: MEDIA_SOURCE_TYPE): CallApiReturnType;
    setLowlightEnhanceOptions(enabled: boolean, options: LowlightEnhanceOptions, type: MEDIA_SOURCE_TYPE): CallApiReturnType;
    setVideoDenoiserOptions(enabled: boolean, options: VideoDenoiserOptions, type: MEDIA_SOURCE_TYPE): CallApiReturnType;
    setColorEnhanceOptions(enabled: boolean, options: ColorEnhanceOptions, type: MEDIA_SOURCE_TYPE): CallApiReturnType;
    enableVirtualBackground(enabled: boolean, backgroundSource: VirtualBackgroundSource, segproperty: SegmentationProperty, type: MEDIA_SOURCE_TYPE): CallApiReturnType;
    setupRemoteVideo(canvas: VideoCanvas): CallApiReturnType;
    setupLocalVideo(canvas: VideoCanvas): CallApiReturnType;
    setVideoScenario(scenarioType: VIDEO_APPLICATION_SCENARIO_TYPE): CallApiReturnType;
    enableAudio(): CallApiReturnType;
    disableAudio(): CallApiReturnType;
    setAudioProfile(profile: AUDIO_PROFILE_TYPE, scenario: AUDIO_SCENARIO_TYPE): CallApiReturnType;
    setAudioProfile2(profile: AUDIO_PROFILE_TYPE): CallApiReturnType;
    setAudioScenario(scenario: AUDIO_SCENARIO_TYPE): CallApiReturnType;
    enableLocalAudio(enabled: boolean): CallApiReturnType;
    muteLocalAudioStream(mute: boolean): CallApiReturnType;
    muteAllRemoteAudioStreams(mute: boolean): CallApiReturnType;
    setDefaultMuteAllRemoteAudioStreams(mute: boolean): CallApiReturnType;
    muteRemoteAudioStream(uid: number, mute: boolean): CallApiReturnType;
    muteLocalVideoStream(mute: boolean): CallApiReturnType;
    enableLocalVideo(enabled: boolean): CallApiReturnType;
    muteAllRemoteVideoStreams(mute: boolean): CallApiReturnType;
    setDefaultMuteAllRemoteVideoStreams(mute: boolean): CallApiReturnType;
    muteRemoteVideoStream(uid: number, mute: boolean): CallApiReturnType;
    setRemoteVideoStreamType(uid: number, streamType: VIDEO_STREAM_TYPE): CallApiReturnType;
    setRemoteVideoSubscriptionOptions(uid: number, options: VideoSubscriptionOptions): CallApiReturnType;
    setRemoteDefaultVideoStreamType(streamType: VIDEO_STREAM_TYPE): CallApiReturnType;
    setSubscribeAudioBlocklist(uidList: number, uidNumber: number): CallApiReturnType;
    setSubscribeAudioAllowlist(uidList: number, uidNumber: number): CallApiReturnType;
    setSubscribeVideoBlocklist(uidList: number, uidNumber: number): CallApiReturnType;
    setSubscribeVideoAllowlist(uidList: number, uidNumber: number): CallApiReturnType;
    enableAudioVolumeIndication(interval: number, smooth: number, reportVad: boolean): CallApiReturnType;
    startAudioRecording(filePath: string, quality: AUDIO_RECORDING_QUALITY_TYPE): CallApiReturnType;
    startAudioRecording2(filePath: string, sampleRate: number, quality: AUDIO_RECORDING_QUALITY_TYPE): CallApiReturnType;
    startAudioRecording3(config: AudioRecordingConfiguration): CallApiReturnType;
    registerAudioEncodedFrameObserver(config: AudioEncodedFrameObserverConfig, observer: IAudioEncodedFrameObserver): CallApiReturnType;
    stopAudioRecording(): CallApiReturnType;
    createMediaPlayer(): CallApiReturnType;
    destroyMediaPlayer(media_player: IMediaPlayer): CallApiReturnType;
    createMediaRecorder(info: RecorderStreamInfo): CallApiReturnType;
    destroyMediaRecorder(mediaRecorder: IMediaRecorder): CallApiReturnType;
    startAudioMixing(filePath: string, loopback: boolean, cycle: number): CallApiReturnType;
    startAudioMixing2(filePath: string, loopback: boolean, cycle: number, startPos: number): CallApiReturnType;
    stopAudioMixing(): CallApiReturnType;
    pauseAudioMixing(): CallApiReturnType;
    resumeAudioMixing(): CallApiReturnType;
    selectAudioTrack(index: number): CallApiReturnType;
    getAudioTrackCount(): CallApiReturnType;
    adjustAudioMixingVolume(volume: number): CallApiReturnType;
    adjustAudioMixingPublishVolume(volume: number): CallApiReturnType;
    getAudioMixingPublishVolume(): CallApiReturnType;
    adjustAudioMixingPlayoutVolume(volume: number): CallApiReturnType;
    getAudioMixingPlayoutVolume(): CallApiReturnType;
    getAudioMixingDuration(): CallApiReturnType;
    getAudioMixingCurrentPosition(): CallApiReturnType;
    setAudioMixingPosition(pos: number): CallApiReturnType;
    setAudioMixingDualMonoMode(mode: AUDIO_MIXING_DUAL_MONO_MODE): CallApiReturnType;
    setAudioMixingPitch(pitch: number): CallApiReturnType;
    getEffectsVolume(): CallApiReturnType;
    setEffectsVolume(volume: number): CallApiReturnType;
    preloadEffect(soundId: number, filePath: string, startPos: number): CallApiReturnType;
    playEffect(soundId: number, filePath: string, loopCount: number, pitch: number, pan: number, gain: number, publish: boolean, startPos: number): CallApiReturnType;
    playAllEffects(loopCount: number, pitch: number, pan: number, gain: number, publish: boolean): CallApiReturnType;
    getVolumeOfEffect(soundId: number): CallApiReturnType;
    setVolumeOfEffect(soundId: number, volume: number): CallApiReturnType;
    pauseEffect(soundId: number): CallApiReturnType;
    pauseAllEffects(): CallApiReturnType;
    resumeEffect(soundId: number): CallApiReturnType;
    resumeAllEffects(): CallApiReturnType;
    stopEffect(soundId: number): CallApiReturnType;
    stopAllEffects(): CallApiReturnType;
    unloadEffect(soundId: number): CallApiReturnType;
    unloadAllEffects(): CallApiReturnType;
    getEffectDuration(filePath: string): CallApiReturnType;
    setEffectPosition(soundId: number, pos: number): CallApiReturnType;
    getEffectCurrentPosition(soundId: number): CallApiReturnType;
    enableSoundPositionIndication(enabled: boolean): CallApiReturnType;
    setRemoteVoicePosition(uid: number, pan: number, gain: number): CallApiReturnType;
    enableSpatialAudio(enabled: boolean): CallApiReturnType;
    setRemoteUserSpatialAudioParams(uid: number, params: SpatialAudioParams): CallApiReturnType;
    setVoiceBeautifierPreset(preset: VOICE_BEAUTIFIER_PRESET): CallApiReturnType;
    setAudioEffectPreset(preset: AUDIO_EFFECT_PRESET): CallApiReturnType;
    setVoiceConversionPreset(preset: VOICE_CONVERSION_PRESET): CallApiReturnType;
    setAudioEffectParameters(preset: AUDIO_EFFECT_PRESET, param1: number, param2: number): CallApiReturnType;
    setVoiceBeautifierParameters(preset: VOICE_BEAUTIFIER_PRESET, param1: number, param2: number): CallApiReturnType;
    setVoiceConversionParameters(preset: VOICE_CONVERSION_PRESET, param1: number, param2: number): CallApiReturnType;
    setLocalVoicePitch(pitch: number): CallApiReturnType;
    setLocalVoiceFormant(formantRatio: number): CallApiReturnType;
    setLocalVoiceEqualization(bandFrequency: AUDIO_EQUALIZATION_BAND_FREQUENCY, bandGain: number): CallApiReturnType;
    setLocalVoiceReverb(reverbKey: AUDIO_REVERB_TYPE, value: number): CallApiReturnType;
    setHeadphoneEQPreset(preset: HEADPHONE_EQUALIZER_PRESET): CallApiReturnType;
    setHeadphoneEQParameters(lowGain: number, highGain: number): CallApiReturnType;
    setLogFile(filePath: string): CallApiReturnType;
    setLogFilter(filter: number): CallApiReturnType;
    setLogLevel(level: LOG_LEVEL): CallApiReturnType;
    setLogFileSize(fileSizeInKBytes: number): CallApiReturnType;
    uploadLogFile(requestId: string): CallApiReturnType;
    setLocalRenderMode(renderMode: RENDER_MODE_TYPE, mirrorMode: VIDEO_MIRROR_MODE_TYPE): CallApiReturnType;
    setRemoteRenderMode(uid: number, renderMode: RENDER_MODE_TYPE, mirrorMode: VIDEO_MIRROR_MODE_TYPE): CallApiReturnType;
    setLocalRenderMode2(renderMode: RENDER_MODE_TYPE): CallApiReturnType;
    setLocalVideoMirrorMode(mirrorMode: VIDEO_MIRROR_MODE_TYPE): CallApiReturnType;
    enableDualStreamMode(enabled: boolean): CallApiReturnType;
    enableDualStreamMode2(enabled: boolean, streamConfig: SimulcastStreamConfig): CallApiReturnType;
    setDualStreamMode(mode: SIMULCAST_STREAM_MODE): CallApiReturnType;
    setDualStreamMode2(mode: SIMULCAST_STREAM_MODE, streamConfig: SimulcastStreamConfig): CallApiReturnType;
    enableCustomAudioLocalPlayback(trackId: number, enabled: boolean): CallApiReturnType;
    setRecordingAudioFrameParameters(sampleRate: number, channel: number, mode: RAW_AUDIO_FRAME_OP_MODE_TYPE, samplesPerCall: number): CallApiReturnType;
    setPlaybackAudioFrameParameters(sampleRate: number, channel: number, mode: RAW_AUDIO_FRAME_OP_MODE_TYPE, samplesPerCall: number): CallApiReturnType;
    setMixedAudioFrameParameters(sampleRate: number, channel: number, samplesPerCall: number): CallApiReturnType;
    setEarMonitoringAudioFrameParameters(sampleRate: number, channel: number, mode: RAW_AUDIO_FRAME_OP_MODE_TYPE, samplesPerCall: number): CallApiReturnType;
    setPlaybackAudioFrameBeforeMixingParameters(sampleRate: number, channel: number): CallApiReturnType;
    enableAudioSpectrumMonitor(intervalInMS: number): CallApiReturnType;
    disableAudioSpectrumMonitor(): CallApiReturnType;
    registerAudioSpectrumObserver(observer: IAudioSpectrumObserver): CallApiReturnType;
    unregisterAudioSpectrumObserver(observer: IAudioSpectrumObserver): CallApiReturnType;
    adjustRecordingSignalVolume(volume: number): CallApiReturnType;
    muteRecordingSignal(mute: boolean): CallApiReturnType;
    adjustPlaybackSignalVolume(volume: number): CallApiReturnType;
    adjustUserPlaybackSignalVolume(uid: number, volume: number): CallApiReturnType;
    setLocalPublishFallbackOption(option: STREAM_FALLBACK_OPTIONS): CallApiReturnType;
    setRemoteSubscribeFallbackOption(option: STREAM_FALLBACK_OPTIONS): CallApiReturnType;
    setHighPriorityUserList(uidList: number, uidNum: number, option: STREAM_FALLBACK_OPTIONS): CallApiReturnType;
    enableLoopbackRecording(enabled: boolean, deviceName: string): CallApiReturnType;
    adjustLoopbackSignalVolume(volume: number): CallApiReturnType;
    getLoopbackRecordingVolume(): CallApiReturnType;
    enableInEarMonitoring(enabled: boolean, includeAudioFilters: number): CallApiReturnType;
    setInEarMonitoringVolume(volume: number): CallApiReturnType;
    loadExtensionProvider(path: string, unload_after_use: boolean): CallApiReturnType;
    setExtensionProviderProperty(provider: string, key: string, value: string): CallApiReturnType;
    registerExtension(provider: string, extension: string, type: MEDIA_SOURCE_TYPE): CallApiReturnType;
    enableExtension(provider: string, extension: string, enable: boolean, type: MEDIA_SOURCE_TYPE): CallApiReturnType;
    enableExtension2(provider: string, extension: string, extensionInfo: ExtensionInfo, enable: boolean): CallApiReturnType;
    setExtensionProperty(provider: string, extension: string, key: string, value: string, type: MEDIA_SOURCE_TYPE): CallApiReturnType;
    getExtensionProperty(provider: string, extension: string, key: string, value: string, buf_len: number, type: MEDIA_SOURCE_TYPE): CallApiReturnType;
    setExtensionProperty2(provider: string, extension: string, extensionInfo: ExtensionInfo, key: string, value: string): CallApiReturnType;
    getExtensionProperty2(provider: string, extension: string, extensionInfo: ExtensionInfo, key: string, value: string, buf_len: number): CallApiReturnType;
    setCameraCapturerConfiguration(config: CameraCapturerConfiguration): CallApiReturnType;
    createCustomVideoTrack(): CallApiReturnType;
    createCustomEncodedVideoTrack(sender_option: SenderOptions): CallApiReturnType;
    destroyCustomVideoTrack(video_track_id: number): CallApiReturnType;
    destroyCustomEncodedVideoTrack(video_track_id: number): CallApiReturnType;
    switchCamera(): CallApiReturnType;
    isCameraZoomSupported(): CallApiReturnType;
    isCameraFaceDetectSupported(): CallApiReturnType;
    isCameraTorchSupported(): CallApiReturnType;
    isCameraFocusSupported(): CallApiReturnType;
    isCameraAutoFocusFaceModeSupported(): CallApiReturnType;
    setCameraZoomFactor(factor: number): CallApiReturnType;
    enableFaceDetection(enabled: boolean): CallApiReturnType;
    getCameraMaxZoomFactor(): CallApiReturnType;
    setCameraFocusPositionInPreview(positionX: number, positionY: number): CallApiReturnType;
    setCameraTorchOn(isOn: boolean): CallApiReturnType;
    setCameraAutoFocusFaceModeEnabled(enabled: boolean): CallApiReturnType;
    isCameraExposurePositionSupported(): CallApiReturnType;
    setCameraExposurePosition(positionXinView: number, positionYinView: number): CallApiReturnType;
    isCameraExposureSupported(): CallApiReturnType;
    setCameraExposureFactor(factor: number): CallApiReturnType;
    isCameraAutoExposureFaceModeSupported(): CallApiReturnType;
    setCameraAutoExposureFaceModeEnabled(enabled: boolean): CallApiReturnType;
    setDefaultAudioRouteToSpeakerphone(defaultToSpeaker: boolean): CallApiReturnType;
    setEnableSpeakerphone(speakerOn: boolean): CallApiReturnType;
    isSpeakerphoneEnabled(): CallApiReturnType;
    setRouteInCommunicationMode(route: number): CallApiReturnType;
    getScreenCaptureSources(thumbSize: SIZE, iconSize: SIZE, includeScreen: boolean): CallApiReturnType;
    setAudioSessionOperationRestriction(restriction: AUDIO_SESSION_OPERATION_RESTRICTION): CallApiReturnType;
    startScreenCaptureByDisplayId(displayId: number, regionRect: Rectangle, captureParams: ScreenCaptureParameters): CallApiReturnType;
    startScreenCaptureByScreenRect(screenRect: Rectangle, regionRect: Rectangle, captureParams: ScreenCaptureParameters): CallApiReturnType;
    getAudioDeviceInfo(deviceInfo: DeviceInfo): CallApiReturnType;
    startScreenCaptureByWindowId(windowId: any, regionRect: Rectangle, captureParams: ScreenCaptureParameters): CallApiReturnType;
    setScreenCaptureContentHint(contentHint: VIDEO_CONTENT_HINT): CallApiReturnType;
    updateScreenCaptureRegion(regionRect: Rectangle): CallApiReturnType;
    updateScreenCaptureParameters(captureParams: ScreenCaptureParameters): CallApiReturnType;
    startScreenCapture(captureParams: ScreenCaptureParameters2): CallApiReturnType;
    updateScreenCapture(captureParams: ScreenCaptureParameters2): CallApiReturnType;
    queryScreenCaptureCapability(): CallApiReturnType;
    setScreenCaptureScenario(screenScenario: SCREEN_SCENARIO_TYPE): CallApiReturnType;
    stopScreenCapture(): CallApiReturnType;
    getCallId(callId: string): CallApiReturnType;
    rate(callId: string, rating: number, description: string): CallApiReturnType;
    complain(callId: string, description: string): CallApiReturnType;
    startRtmpStreamWithoutTranscoding(url: string): CallApiReturnType;
    startRtmpStreamWithTranscoding(url: string, transcoding: LiveTranscoding): CallApiReturnType;
    updateRtmpTranscoding(transcoding: LiveTranscoding): CallApiReturnType;
    stopRtmpStream(url: string): CallApiReturnType;
    startLocalVideoTranscoder(config: LocalTranscoderConfiguration): CallApiReturnType;
    updateLocalTranscoderConfiguration(config: LocalTranscoderConfiguration): CallApiReturnType;
    stopLocalVideoTranscoder(): CallApiReturnType;
    startCameraCapture(sourceType: VIDEO_SOURCE_TYPE, config: CameraCapturerConfiguration): CallApiReturnType;
    stopCameraCapture(sourceType: VIDEO_SOURCE_TYPE): CallApiReturnType;
    setCameraDeviceOrientation(type: VIDEO_SOURCE_TYPE, orientation: VIDEO_ORIENTATION): CallApiReturnType;
    setScreenCaptureOrientation(type: VIDEO_SOURCE_TYPE, orientation: VIDEO_ORIENTATION): CallApiReturnType;
    startScreenCapture2(sourceType: VIDEO_SOURCE_TYPE, config: ScreenCaptureConfiguration): CallApiReturnType;
    stopScreenCapture2(sourceType: VIDEO_SOURCE_TYPE): CallApiReturnType;
    getConnectionState(): CallApiReturnType;
    registerEventHandler(eventHandler: IRtcEngineEventHandler): CallApiReturnType;
    unregisterEventHandler(eventHandler: IRtcEngineEventHandler): CallApiReturnType;
    setRemoteUserPriority(uid: number, userPriority: PRIORITY_TYPE): CallApiReturnType;
    setEncryptionMode(encryptionMode: string): CallApiReturnType;
    setEncryptionSecret(secret: string): CallApiReturnType;
    enableEncryption(enabled: boolean, config: EncryptionConfig): CallApiReturnType;
    createDataStream(streamId: number[], reliable: boolean, ordered: boolean): CallApiReturnType;
    createDataStream2(streamId: number[], config: DataStreamConfig): CallApiReturnType;
    sendStreamMessage(streamId: number, data: string, length: number): CallApiReturnType;
    addVideoWatermark(watermark: RtcImage): CallApiReturnType;
    addVideoWatermark2(watermarkUrl: string, options: WatermarkOptions): CallApiReturnType;
    clearVideoWatermarks(): CallApiReturnType;
    pauseAudio(): CallApiReturnType;
    resumeAudio(): CallApiReturnType;
    enableWebSdkInteroperability(enabled: boolean): CallApiReturnType;
    sendCustomReportMessage(id: string, category: string, event: string, label: string, value: number): CallApiReturnType;
    registerMediaMetadataObserver(observer: IMetadataObserver, type: METADATA_TYPE): CallApiReturnType;
    unregisterMediaMetadataObserver(observer: IMetadataObserver, type: METADATA_TYPE): CallApiReturnType;
    startAudioFrameDump(channel_id: string, user_id: number, location: string, uuid: string, passwd: string, duration_ms: number, auto_upload: boolean): CallApiReturnType;
    stopAudioFrameDump(channel_id: string, user_id: number, location: string): CallApiReturnType;
    setAINSMode(enabled: boolean, mode: AUDIO_AINS_MODE): CallApiReturnType;
    registerLocalUserAccount(appId: string, userAccount: string): CallApiReturnType;
    joinChannelWithUserAccount(token: string, channelId: string, userAccount: string): CallApiReturnType;
    joinChannelWithUserAccount2(token: string, channelId: string, userAccount: string, options: ChannelMediaOptions): CallApiReturnType;
    joinChannelWithUserAccountEx(token: string, channelId: string, userAccount: string, options: ChannelMediaOptions): CallApiReturnType;
    getUserInfoByUserAccount(userAccount: string, userInfo: UserInfo[]): CallApiReturnType;
    getUserInfoByUid(uid: number, userInfo: UserInfo[]): CallApiReturnType;
    startOrUpdateChannelMediaRelay(configuration: ChannelMediaRelayConfiguration): CallApiReturnType;
    startChannelMediaRelay(configuration: ChannelMediaRelayConfiguration): CallApiReturnType;
    updateChannelMediaRelay(configuration: ChannelMediaRelayConfiguration): CallApiReturnType;
    stopChannelMediaRelay(): CallApiReturnType;
    pauseAllChannelMediaRelay(): CallApiReturnType;
    resumeAllChannelMediaRelay(): CallApiReturnType;
    setDirectCdnStreamingAudioConfiguration(profile: AUDIO_PROFILE_TYPE): CallApiReturnType;
    setDirectCdnStreamingVideoConfiguration(config: VideoEncoderConfiguration): CallApiReturnType;
    startDirectCdnStreaming(eventHandler: IDirectCdnStreamingEventHandler, publishUrl: string, options: DirectCdnStreamingMediaOptions): CallApiReturnType;
    stopDirectCdnStreaming(): CallApiReturnType;
    updateDirectCdnStreamingMediaOptions(options: DirectCdnStreamingMediaOptions): CallApiReturnType;
    startRhythmPlayer(sound1: string, sound2: string, config: AgoraRhythmPlayerConfig): CallApiReturnType;
    stopRhythmPlayer(): CallApiReturnType;
    configRhythmPlayer(config: AgoraRhythmPlayerConfig): CallApiReturnType;
    takeSnapshot(uid: number, filePath: string): CallApiReturnType;
    enableContentInspect(enabled: boolean, config: ContentInspectConfig): CallApiReturnType;
    adjustCustomAudioPublishVolume(trackId: number, volume: number): CallApiReturnType;
    adjustCustomAudioPlayoutVolume(trackId: number, volume: number): CallApiReturnType;
    setCloudProxy(proxyType: CLOUD_PROXY_TYPE): CallApiReturnType;
    setLocalAccessPoint(config: LocalAccessPointConfiguration): CallApiReturnType;
    setAdvancedAudioOptions(options: AdvancedAudioOptions, sourceType: number): CallApiReturnType;
    setAVSyncSource(channelId: string, uid: number): CallApiReturnType;
    enableVideoImageSource(enable: boolean, options: ImageTrackOptions): CallApiReturnType;
    getCurrentMonotonicTimeInMs(): CallApiReturnType;
    enableWirelessAccelerate(enabled: boolean): CallApiReturnType;
    getNetworkType(): CallApiReturnType;
    setParameters(parameters: string): CallApiReturnType;
    startMediaRenderingTracing(): CallApiReturnType;
    enableInstantMediaRendering(): CallApiReturnType;
    getNtpWallTimeInMs(): CallApiReturnType;
    isFeatureAvailableOnDevice(type: FeatureType): CallApiReturnType;
}
declare enum QUALITY_REPORT_FORMAT_TYPE {
    QUALITY_REPORT_JSON = 0,
    QUALITY_REPORT_HTML = 1
}
declare enum MEDIA_DEVICE_STATE_TYPE {
    MEDIA_DEVICE_STATE_IDLE = 0,
    MEDIA_DEVICE_STATE_ACTIVE = 1,
    MEDIA_DEVICE_STATE_DISABLED = 2,
    MEDIA_DEVICE_STATE_NOT_PRESENT = 4,
    MEDIA_DEVICE_STATE_UNPLUGGED = 8
}
declare enum VIDEO_PROFILE_TYPE {
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
    VIDEO_PROFILE_DEFAULT = 30
}

declare class RtcConnection {
    channelId?: string;
    localUid?: number;
}
interface IRtcEngineEventHandlerEx extends IRtcEngineEventHandler {
    onJoinChannelSuccessEx(connection: RtcConnection, elapsed: number): void;
    onRejoinChannelSuccessEx(connection: RtcConnection, elapsed: number): void;
    onAudioQualityEx(connection: RtcConnection, remoteUid: number, quality: number, delay: number, lost: number): void;
    onAudioVolumeIndicationEx(connection: RtcConnection, speakers: AudioVolumeInfo[], speakerNumber: number, totalVolume: number): void;
    onLeaveChannelEx(connection: RtcConnection, stats: RtcStats): void;
    onRtcStatsEx(connection: RtcConnection, stats: RtcStats): void;
    onNetworkQualityEx(connection: RtcConnection, remoteUid: number, txQuality: number, rxQuality: number): void;
    onIntraRequestReceivedEx(connection: RtcConnection): void;
    onFirstRemoteVideoDecodedEx(connection: RtcConnection, remoteUid: number, width: number, height: number, elapsed: number): void;
    onVideoSizeChangedEx(connection: RtcConnection, sourceType: VIDEO_SOURCE_TYPE, uid: number, width: number, height: number, rotation: number): void;
    onRemoteVideoStateChangedEx(connection: RtcConnection, remoteUid: number, state: REMOTE_VIDEO_STATE, reason: REMOTE_VIDEO_STATE_REASON, elapsed: number): void;
    onFirstRemoteVideoFrameEx(connection: RtcConnection, remoteUid: number, width: number, height: number, elapsed: number): void;
    onUserJoinedEx(connection: RtcConnection, remoteUid: number, elapsed: number): void;
    onUserOfflineEx(connection: RtcConnection, remoteUid: number, reason: USER_OFFLINE_REASON_TYPE): void;
    onUserMuteAudioEx(connection: RtcConnection, remoteUid: number, muted: boolean): void;
    onUserMuteVideoEx(connection: RtcConnection, remoteUid: number, muted: boolean): void;
    onUserEnableVideoEx(connection: RtcConnection, remoteUid: number, enabled: boolean): void;
    onUserEnableLocalVideoEx(connection: RtcConnection, remoteUid: number, enabled: boolean): void;
    onUserStateChangedEx(connection: RtcConnection, remoteUid: number, state: number): void;
    onLocalAudioStatsEx(connection: RtcConnection, stats: LocalAudioStats): void;
    onRemoteAudioStatsEx(connection: RtcConnection, stats: RemoteAudioStats): void;
    onRemoteVideoStatsEx(connection: RtcConnection, stats: RemoteVideoStats): void;
    onConnectionLostEx(connection: RtcConnection): void;
    onConnectionInterruptedEx(connection: RtcConnection): void;
    onConnectionBannedEx(connection: RtcConnection): void;
    onStreamMessageEx(connection: RtcConnection, remoteUid: number, streamId: number, data: string, length: number, sentTs: number): void;
    onStreamMessageErrorEx(connection: RtcConnection, remoteUid: number, streamId: number, code: number, missed: number, cached: number): void;
    onRequestTokenEx(connection: RtcConnection): void;
    onLicenseValidationFailureEx(connection: RtcConnection, reason: LICENSE_ERROR_TYPE): void;
    onTokenPrivilegeWillExpireEx(connection: RtcConnection, token: string): void;
    onFirstLocalAudioFramePublishedEx(connection: RtcConnection, elapsed: number): void;
    onFirstRemoteAudioFrameEx(connection: RtcConnection, userId: number, elapsed: number): void;
    onFirstRemoteAudioDecodedEx(connection: RtcConnection, uid: number, elapsed: number): void;
    onLocalAudioStateChangedEx(connection: RtcConnection, state: LOCAL_AUDIO_STREAM_STATE, error: LOCAL_AUDIO_STREAM_ERROR): void;
    onRemoteAudioStateChangedEx(connection: RtcConnection, remoteUid: number, state: REMOTE_AUDIO_STATE, reason: REMOTE_AUDIO_STATE_REASON, elapsed: number): void;
    onActiveSpeakerEx(connection: RtcConnection, uid: number): void;
    onClientRoleChangedEx(connection: RtcConnection, oldRole: CLIENT_ROLE_TYPE, newRole: CLIENT_ROLE_TYPE, newRoleOptions: ClientRoleOptions): void;
    onClientRoleChangeFailedEx(connection: RtcConnection, reason: CLIENT_ROLE_CHANGE_FAILED_REASON, currentRole: CLIENT_ROLE_TYPE): void;
    onRemoteAudioTransportStatsEx(connection: RtcConnection, remoteUid: number, delay: number, lost: number, rxKBitRate: number): void;
    onRemoteVideoTransportStatsEx(connection: RtcConnection, remoteUid: number, delay: number, lost: number, rxKBitRate: number): void;
    onConnectionStateChangedEx(connection: RtcConnection, state: CONNECTION_STATE_TYPE, reason: CONNECTION_CHANGED_REASON_TYPE): void;
    onWlAccMessageEx(connection: RtcConnection, reason: WLACC_MESSAGE_REASON, action: WLACC_SUGGEST_ACTION, wlAccMsg: string): void;
    onWlAccStatsEx(connection: RtcConnection, currentStats: WlAccStats, averageStats: WlAccStats): void;
    onNetworkTypeChangedEx(connection: RtcConnection, type: NETWORK_TYPE): void;
    onEncryptionErrorEx(connection: RtcConnection, errorType: ENCRYPTION_ERROR_TYPE): void;
    onUploadLogResultEx(connection: RtcConnection, requestId: string, success: boolean, reason: UPLOAD_ERROR_REASON): void;
    onUserAccountUpdatedEx(connection: RtcConnection, remoteUid: number, userAccount: string): void;
    onSnapshotTakenEx(connection: RtcConnection, uid: number, filePath: string, width: number, height: number, errCode: number): void;
    onVideoRenderingTracingResultEx(connection: RtcConnection, uid: number, currentEvent: MEDIA_TRACE_EVENT, tracingInfo: VideoRenderingTracingInfo): void;
}
interface IRtcEngineEx {
    joinChannelEx(token: string, connection: RtcConnection, options: ChannelMediaOptions): CallApiReturnType;
    leaveChannelEx(connection: RtcConnection): CallApiReturnType;
    leaveChannelEx2(connection: RtcConnection, options: LeaveChannelOptions): CallApiReturnType;
    updateChannelMediaOptionsEx(options: ChannelMediaOptions, connection: RtcConnection): CallApiReturnType;
    setVideoEncoderConfigurationEx(config: VideoEncoderConfiguration, connection: RtcConnection): CallApiReturnType;
    setupRemoteVideoEx(canvas: VideoCanvas, connection: RtcConnection): CallApiReturnType;
    muteRemoteAudioStreamEx(uid: number, mute: boolean, connection: RtcConnection): CallApiReturnType;
    muteRemoteVideoStreamEx(uid: number, mute: boolean, connection: RtcConnection): CallApiReturnType;
    setRemoteVideoStreamTypeEx(uid: number, streamType: VIDEO_STREAM_TYPE, connection: RtcConnection): CallApiReturnType;
    muteLocalAudioStreamEx(mute: boolean, connection: RtcConnection): CallApiReturnType;
    muteLocalVideoStreamEx(mute: boolean, connection: RtcConnection): CallApiReturnType;
    muteAllRemoteAudioStreamsEx(mute: boolean, connection: RtcConnection): CallApiReturnType;
    muteAllRemoteVideoStreamsEx(mute: boolean, connection: RtcConnection): CallApiReturnType;
    setSubscribeAudioBlocklistEx(uidList: number, uidNumber: number, connection: RtcConnection): CallApiReturnType;
    setSubscribeAudioAllowlistEx(uidList: number, uidNumber: number, connection: RtcConnection): CallApiReturnType;
    setSubscribeVideoBlocklistEx(uidList: number, uidNumber: number, connection: RtcConnection): CallApiReturnType;
    setSubscribeVideoAllowlistEx(uidList: number, uidNumber: number, connection: RtcConnection): CallApiReturnType;
    setRemoteVideoSubscriptionOptionsEx(uid: number, options: VideoSubscriptionOptions, connection: RtcConnection): CallApiReturnType;
    setRemoteVoicePositionEx(uid: number, pan: number, gain: number, connection: RtcConnection): CallApiReturnType;
    setRemoteUserSpatialAudioParamsEx(uid: number, params: SpatialAudioParams, connection: RtcConnection): CallApiReturnType;
    setRemoteRenderModeEx(uid: number, renderMode: RENDER_MODE_TYPE, mirrorMode: VIDEO_MIRROR_MODE_TYPE, connection: RtcConnection): CallApiReturnType;
    enableLoopbackRecordingEx(connection: RtcConnection, enabled: boolean, deviceName: string): CallApiReturnType;
    adjustRecordingSignalVolumeEx(volume: number, connection: RtcConnection): CallApiReturnType;
    muteRecordingSignalEx(mute: boolean, connection: RtcConnection): CallApiReturnType;
    adjustUserPlaybackSignalVolumeEx(uid: number, volume: number, connection: RtcConnection): CallApiReturnType;
    getConnectionStateEx(connection: RtcConnection): CallApiReturnType;
    enableEncryptionEx(connection: RtcConnection, enabled: boolean, config: EncryptionConfig): CallApiReturnType;
    createDataStreamEx(streamId: number[], reliable: boolean, ordered: boolean, connection: RtcConnection): CallApiReturnType;
    createDataStreamEx2(streamId: number[], config: DataStreamConfig, connection: RtcConnection): CallApiReturnType;
    sendStreamMessageEx(streamId: number, data: string, length: number, connection: RtcConnection): CallApiReturnType;
    addVideoWatermarkEx(watermarkUrl: string, options: WatermarkOptions, connection: RtcConnection): CallApiReturnType;
    clearVideoWatermarkEx(connection: RtcConnection): CallApiReturnType;
    sendCustomReportMessageEx(id: string, category: string, event: string, label: string, value: number, connection: RtcConnection): CallApiReturnType;
    enableAudioVolumeIndicationEx(interval: number, smooth: number, reportVad: boolean, connection: RtcConnection): CallApiReturnType;
    startRtmpStreamWithoutTranscodingEx(url: string, connection: RtcConnection): CallApiReturnType;
    startRtmpStreamWithTranscodingEx(url: string, transcoding: LiveTranscoding, connection: RtcConnection): CallApiReturnType;
    updateRtmpTranscodingEx(transcoding: LiveTranscoding, connection: RtcConnection): CallApiReturnType;
    stopRtmpStreamEx(url: string, connection: RtcConnection): CallApiReturnType;
    startOrUpdateChannelMediaRelayEx(configuration: ChannelMediaRelayConfiguration, connection: RtcConnection): CallApiReturnType;
    startChannelMediaRelayEx(configuration: ChannelMediaRelayConfiguration, connection: RtcConnection): CallApiReturnType;
    updateChannelMediaRelayEx(configuration: ChannelMediaRelayConfiguration, connection: RtcConnection): CallApiReturnType;
    stopChannelMediaRelayEx(connection: RtcConnection): CallApiReturnType;
    pauseAllChannelMediaRelayEx(connection: RtcConnection): CallApiReturnType;
    resumeAllChannelMediaRelayEx(connection: RtcConnection): CallApiReturnType;
    getUserInfoByUserAccountEx(userAccount: string, userInfo: UserInfo[], connection: RtcConnection): CallApiReturnType;
    getUserInfoByUidEx(uid: number, userInfo: UserInfo[], connection: RtcConnection): CallApiReturnType;
    enableDualStreamModeEx(enabled: boolean, streamConfig: SimulcastStreamConfig, connection: RtcConnection): CallApiReturnType;
    setDualStreamModeEx(mode: SIMULCAST_STREAM_MODE, streamConfig: SimulcastStreamConfig, connection: RtcConnection): CallApiReturnType;
    setHighPriorityUserListEx(uidList: number, uidNum: number, option: STREAM_FALLBACK_OPTIONS, connection: RtcConnection): CallApiReturnType;
    takeSnapshotEx(connection: RtcConnection, uid: number, filePath: string): CallApiReturnType;
    enableContentInspectEx(enabled: boolean, config: ContentInspectConfig, connection: RtcConnection): CallApiReturnType;
    startMediaRenderingTracingEx(connection: RtcConnection): CallApiReturnType;
}

declare class RemoteVoicePositionInfo {
    position?: number;
    forward?: number;
}
declare class SpatialAudioZone {
    zoneSetId?: number;
    position?: number;
    forward?: number;
    right?: number;
    up?: number;
    forwardLength?: number;
    rightLength?: number;
    upLength?: number;
    audioAttenuation?: number;
}
interface IBaseSpatialAudioEngine {
    release(): CallApiReturnType;
    setMaxAudioRecvCount(maxCount: number): CallApiReturnType;
    setAudioRecvRange(range: number): CallApiReturnType;
    setDistanceUnit(unit: number): CallApiReturnType;
    updateSelfPosition(position: number, axisForward: number, axisRight: number, axisUp: number): CallApiReturnType;
    updateSelfPositionEx(position: number, axisForward: number, axisRight: number, axisUp: number, connection: RtcConnection): CallApiReturnType;
    updatePlayerPositionInfo(playerId: number, positionInfo: RemoteVoicePositionInfo): CallApiReturnType;
    setParameters(params: string): CallApiReturnType;
    muteLocalAudioStream(mute: boolean): CallApiReturnType;
    muteAllRemoteAudioStreams(mute: boolean): CallApiReturnType;
    setZones(zones: SpatialAudioZone[], zoneCount: number): CallApiReturnType;
    setPlayerAttenuation(playerId: number, attenuation: number, forceSet: boolean): CallApiReturnType;
    muteRemoteAudioStream(uid: number, mute: boolean): CallApiReturnType;
}
interface ILocalSpatialAudioEngine {
    initialize(): CallApiReturnType;
    updateRemotePosition(uid: number, posInfo: RemoteVoicePositionInfo): CallApiReturnType;
    updateRemotePositionEx(uid: number, posInfo: RemoteVoicePositionInfo, connection: RtcConnection): CallApiReturnType;
    removeRemotePosition(uid: number): CallApiReturnType;
    removeRemotePositionEx(uid: number, connection: RtcConnection): CallApiReturnType;
    clearRemotePositions(): CallApiReturnType;
    clearRemotePositionsEx(connection: RtcConnection): CallApiReturnType;
    setRemoteAudioAttenuation(uid: number, attenuation: number, forceSet: boolean): CallApiReturnType;
}

declare enum MAX_DEVICE_ID_LENGTH_TYPE {
    MAX_DEVICE_ID_LENGTH = 512
}
interface IAudioDeviceManager {
    enumeratePlaybackDevices(): CallApiReturnType;
    enumerateRecordingDevices(): CallApiReturnType;
    setPlaybackDevice(deviceId: string[]): CallApiReturnType;
    getPlaybackDevice(deviceId: string): CallApiReturnType;
    getPlaybackDeviceInfo(): CallApiReturnType;
    setPlaybackDeviceVolume(volume: number): CallApiReturnType;
    getPlaybackDeviceVolume(volume: number[]): CallApiReturnType;
    setRecordingDevice(deviceId: string[]): CallApiReturnType;
    getRecordingDevice(deviceId: string): CallApiReturnType;
    getRecordingDeviceInfo(): CallApiReturnType;
    setRecordingDeviceVolume(volume: number): CallApiReturnType;
    getRecordingDeviceVolume(volume: number[]): CallApiReturnType;
    setLoopbackDevice(deviceId: string[]): CallApiReturnType;
    getLoopbackDevice(deviceId: string): CallApiReturnType;
    setPlaybackDeviceMute(mute: boolean): CallApiReturnType;
    getPlaybackDeviceMute(mute: boolean): CallApiReturnType;
    setRecordingDeviceMute(mute: boolean): CallApiReturnType;
    getRecordingDeviceMute(mute: boolean): CallApiReturnType;
    startPlaybackDeviceTest(testAudioFilePath: string): CallApiReturnType;
    stopPlaybackDeviceTest(): CallApiReturnType;
    startRecordingDeviceTest(indicationInterval: number): CallApiReturnType;
    stopRecordingDeviceTest(): CallApiReturnType;
    startAudioDeviceLoopbackTest(indicationInterval: number): CallApiReturnType;
    stopAudioDeviceLoopbackTest(): CallApiReturnType;
    followSystemPlaybackDevice(enable: boolean): CallApiReturnType;
    followSystemRecordingDevice(enable: boolean): CallApiReturnType;
    followSystemLoopbackDevice(enable: boolean): CallApiReturnType;
    release(): CallApiReturnType;
}

export { AREA_CODE, AREA_CODE_EX, AUDIENCE_LATENCY_LEVEL_TYPE, AUDIO_AINS_MODE, AUDIO_CODEC_PROFILE_TYPE, AUDIO_CODEC_TYPE, AUDIO_DUAL_MONO_MODE, AUDIO_EFFECT_PRESET, AUDIO_ENCODED_FRAME_OBSERVER_POSITION, AUDIO_ENCODING_TYPE, AUDIO_EQUALIZATION_BAND_FREQUENCY, AUDIO_FILE_RECORDING_TYPE, AUDIO_FRAME_POSITION, AUDIO_FRAME_TYPE, AUDIO_MIXING_DUAL_MONO_MODE, AUDIO_MIXING_REASON_TYPE, AUDIO_MIXING_STATE_TYPE, AUDIO_PROFILE_TYPE, AUDIO_RECORDING_QUALITY_TYPE, AUDIO_REVERB_TYPE, AUDIO_SAMPLE_RATE_TYPE, AUDIO_SCENARIO_TYPE, AUDIO_SESSION_OPERATION_RESTRICTION, AUDIO_TRACK_TYPE, AdvanceOptions, AdvancedAudioOptions, AdvancedConfigInfo, AgoraRhythmPlayerConfig, AudioEncodedFrameInfo, AudioEncodedFrameObserverConfig, AudioFrame, AudioParameters, AudioParams, AudioPcmDataInfo, AudioPcmFrame, AudioRecordingConfiguration, AudioRoute, AudioSpectrumData, AudioTrackConfig, AudioVolumeInfo, BACKGROUND_BLUR_DEGREE, BACKGROUND_SOURCE_TYPE, BYTES_PER_SAMPLE, BeautyOptions, CAMERA_DIRECTION, CAMERA_VIDEO_SOURCE_TYPE, CAPTURE_BRIGHTNESS_LEVEL_TYPE, CHANNEL_MEDIA_RELAY_ERROR, CHANNEL_MEDIA_RELAY_EVENT, CHANNEL_MEDIA_RELAY_STATE, CHANNEL_PROFILE_TYPE, CLIENT_ROLE_CHANGE_FAILED_REASON, CLIENT_ROLE_TYPE, CLOUD_PROXY_TYPE, CODEC_CAP_MASK, COMPRESSION_PREFERENCE, CONFIG_FETCH_TYPE, CONNECTION_CHANGED_REASON_TYPE, CONNECTION_STATE_TYPE, CONTENT_INSPECT_RESULT, CONTENT_INSPECT_TYPE, CacheStatistics, CameraCapturerConfiguration, ChannelMediaInfo, ChannelMediaOptions, ChannelMediaRelayConfiguration, ClientRoleOptions, ClimaxSegment, CodecCapInfo, CodecCapLevels, ColorEnhanceOptions, ContentInspectConfig, ContentInspectModule, DEGRADATION_PREFERENCE, DIRECT_CDN_STREAMING_ERROR, DIRECT_CDN_STREAMING_STATE, DataStreamConfig, DeviceInfo, DirectCdnStreamingMediaOptions, DirectCdnStreamingStats, DownlinkNetworkInfo, EAR_MONITORING_FILTER_TYPE, EGL_CONTEXT_TYPE, ENCODING_PREFERENCE, ENCRYPTION_ERROR_TYPE, ENCRYPTION_MODE, ERROR_CODE_TYPE, EXPERIENCE_POOR_REASON, EXPERIENCE_QUALITY_TYPE, EXTERNAL_VIDEO_SOURCE_TYPE, EchoTestConfiguration, EncodedAudioFrameAdvancedSettings, EncodedAudioFrameInfo, EncodedVideoFrameInfo, EncryptionConfig, ExtensionInfo, ExternalVideoFrame, FIT_MODE_TYPE, FRAME_HEIGHT, FRAME_RATE, FRAME_WIDTH, FeatureType, H264PacketizeMode, HEADPHONE_EQUALIZER_PRESET, IAudioDeviceManager, IAudioEncodedFrameObserver, IAudioFrameObserver, IAudioFrameObserverBase, IAudioPcmFrameSink, IAudioSpectrumObserver, IBaseSpatialAudioEngine, IDirectCdnStreamingEventHandler, ILocalSpatialAudioEngine, IMediaEngine, IMediaPlayer, IMediaPlayerCacheManager, IMediaPlayerSourceObserver, IMediaRecorder, IMediaRecorderObserver, IMetadataObserver, IMusicContentCenter, IMusicContentCenterEventHandler, IMusicPlayer, INJECT_STREAM_STATUS, INTERFACE_ID_TYPE, IRtcEngine, IRtcEngineEventHandler, IRtcEngineEventHandlerEx, IRtcEngineEx, IVideoDeviceManager, IVideoEncodedFrameObserver, IVideoFrameObserver, ImageTrackOptions, InjectStreamConfig, InputSeiData, LASTMILE_PROBE_RESULT_STATE, LICENSE_ERROR_TYPE, LIGHTENING_CONTRAST_LEVEL, LOCAL_AUDIO_STREAM_ERROR, LOCAL_AUDIO_STREAM_STATE, LOCAL_PROXY_MODE, LOCAL_VIDEO_STREAM_ERROR, LOCAL_VIDEO_STREAM_STATE, LOG_FILTER_TYPE, LOG_LEVEL, LOW_LIGHT_ENHANCE_LEVEL, LOW_LIGHT_ENHANCE_MODE, LastmileProbeConfig, LastmileProbeOneWayResult, LastmileProbeResult, LeaveChannelOptions, LiveStreamAdvancedFeature, LiveTranscoding, LocalAccessPointConfiguration, LocalAudioStats, LocalTranscoderConfiguration, LocalVideoStats, LogConfig, LogUploadServerInfo, LowlightEnhanceOptions, MAX_DEVICE_ID_LENGTH_TYPE, MAX_METADATA_SIZE_TYPE, MAX_USER_ACCOUNT_LENGTH_TYPE, MEDIA_DEVICE_STATE_TYPE, MEDIA_DEVICE_TYPE, MEDIA_PLAYER_ERROR, MEDIA_PLAYER_EVENT, MEDIA_PLAYER_METADATA_TYPE, MEDIA_PLAYER_SOURCE_TYPE, MEDIA_PLAYER_STATE, MEDIA_SOURCE_TYPE, MEDIA_STREAM_TYPE, MEDIA_TRACE_EVENT, METADATA_TYPE, MUSIC_CACHE_STATUS_TYPE, MediaRecorderConfiguration, MediaRecorderContainerFormat, MediaRecorderStreamType, MediaSource, Metadata, Music, MusicCacheInfo, MusicChartCollection, MusicChartInfo, MusicCollection, MusicContentCenterConfiguration, MusicContentCenterStatusCode, MvProperty, NETWORK_TYPE, ORIENTATION_MODE, PERMISSION_TYPE, PLAYER_PRELOAD_EVENT, PRIORITY_TYPE, PROXY_TYPE, Packet, PacketOptions, PeerDownlinkInfo, PlayerStreamInfo, PlayerUpdatedInfo, PreloadStatusCode, PublisherConfiguration, QUALITY_ADAPT_INDICATION, QUALITY_REPORT_FORMAT_TYPE, QUALITY_TYPE, RAW_AUDIO_FRAME_OP_MODE_TYPE, REMOTE_AUDIO_STATE, REMOTE_AUDIO_STATE_REASON, REMOTE_USER_STATE, REMOTE_VIDEO_DOWNSCALE_LEVEL, REMOTE_VIDEO_STATE, REMOTE_VIDEO_STATE_REASON, RENDER_MODE_TYPE, RHYTHM_PLAYER_ERROR_TYPE, RHYTHM_PLAYER_STATE_TYPE, RTMP_STREAMING_EVENT, RTMP_STREAM_LIFE_CYCLE_TYPE, RTMP_STREAM_PUBLISH_ERROR_TYPE, RTMP_STREAM_PUBLISH_STATE, RecorderErrorCode, RecorderInfo, RecorderState, RecorderStreamInfo, Rectangle, Region, RemoteAudioStats, RemoteVideoStats, RemoteVoicePositionInfo, RtcConnection, RtcEngineContext, RtcImage, RtcStats, SCREEN_CAPTURE_FRAMERATE_CAPABILITY, SCREEN_SCENARIO_TYPE, SEG_MODEL_TYPE, SIMULCAST_STREAM_MODE, SIZE, STREAMING_SRC_ERR, STREAMING_SRC_STATE, STREAM_FALLBACK_OPTIONS, STREAM_PUBLISH_STATE, STREAM_SUBSCRIBE_STATE, ScreenAudioParameters, ScreenCaptureConfiguration, ScreenCaptureParameters, ScreenCaptureParameters2, ScreenCaptureSourceInfo, ScreenCaptureSourceType, ScreenVideoParameters, SegmentationProperty, SenderOptions, SimulcastStreamConfig, SpatialAudioParams, SpatialAudioZone, SrcInfo, TCcMode, THREAD_PRIORITY_TYPE, ThumbImageBuffer, TranscodingUser, TranscodingVideoStream, UPLOAD_ERROR_REASON, USER_OFFLINE_REASON_TYPE, UplinkNetworkInfo, UserAudioSpectrumInfo, UserInfo, VIDEO_APPLICATION_SCENARIO_TYPE, VIDEO_BUFFER_TYPE, VIDEO_CODEC_CAPABILITY_LEVEL, VIDEO_CODEC_PROFILE_TYPE, VIDEO_CODEC_TYPE, VIDEO_CODEC_TYPE_FOR_STREAM, VIDEO_CONTENT_HINT, VIDEO_DENOISER_LEVEL, VIDEO_DENOISER_MODE, VIDEO_FRAME_PROCESS_MODE, VIDEO_FRAME_TYPE, VIDEO_MIRROR_MODE_TYPE, VIDEO_MODULE_POSITION, VIDEO_ORIENTATION, VIDEO_PIXEL_FORMAT, VIDEO_PROFILE_TYPE, VIDEO_SOURCE_TYPE, VIDEO_STREAM_TYPE, VIDEO_TRANSCODER_ERROR, VIDEO_VIEW_SETUP_MODE, VOICE_BEAUTIFIER_PRESET, VOICE_CONVERSION_PRESET, VideoCanvas, VideoCompositingLayout, VideoDenoiserOptions, VideoDimensions, VideoEncoderConfiguration, VideoFormat, VideoFrame, VideoRenderingTracingInfo, VideoSubscriptionOptions, VideoTrackInfo, VirtualBackgroundSource, WARN_CODE_TYPE, WATERMARK_FIT_MODE, WLACC_MESSAGE_REASON, WLACC_SUGGEST_ACTION, WatermarkOptions, WatermarkRatio, WlAccStats };
