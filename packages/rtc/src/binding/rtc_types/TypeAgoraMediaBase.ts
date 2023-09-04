import { UID } from "agora-rtc-sdk-ng";
import { uid_t } from "./TypeBase";



//c++ enum AudioRoute
export enum AudioRoute {
    ROUTE_DEFAULT = -1,
    ROUTE_HEADSET,
    ROUTE_EARPIECE,
    ROUTE_HEADSETNOMIC,
    ROUTE_SPEAKERPHONE,
    ROUTE_LOUDSPEAKER,
    ROUTE_HEADSETBLUETOOTH,
    ROUTE_HDMI,
    ROUTE_USB,
    ROUTE_DISPLAYPORT,
    ROUTE_AIRPLAY,
}

//c++ enum BYTES_PER_SAMPLE
export enum BYTES_PER_SAMPLE {
    TWO_BYTES_PER_SAMPLE = 2,
}

//c++ Struct AudioParameters
export interface AudioParameters {
    sample_rate: number;
    channels: number;
    frames_per_buffer: number;
};

//c++ enum RAW_AUDIO_FRAME_OP_MODE_TYPE
export enum RAW_AUDIO_FRAME_OP_MODE_TYPE {
    RAW_AUDIO_FRAME_OP_MODE_READ_ONLY = 0,
    RAW_AUDIO_FRAME_OP_MODE_READ_WRITE = 2,
}

//c++ enum MEDIA_SOURCE_TYPE
export enum MEDIA_SOURCE_TYPE {
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
    UNKNOWN_MEDIA_SOURCE = 100,
}

//c++ enum CONTENT_INSPECT_RESULT
export enum CONTENT_INSPECT_RESULT {
    CONTENT_INSPECT_NEUTRAL = 1,
    CONTENT_INSPECT_SEXY = 2,
    CONTENT_INSPECT_PORN = 3,
}

//c++ enum CONTENT_INSPECT_TYPE
export enum CONTENT_INSPECT_TYPE {
    CONTENT_INSPECT_INVALID = 0,
    CONTENT_INSPECT_MODERATION = 1,
    CONTENT_INSPECT_SUPERVISION = 2,
}

//c++ Struct ContentInspectModule
export interface ContentInspectModule {
    type: CONTENT_INSPECT_TYPE;
    frequency: number;
};

export enum CONTENT_INSPECT_DEVICE_TYPE {
    CONTENT_INSPECT_DEVICE_INVALID = 0,
    CONTENT_INSPECT_DEVICE_AGORA = 1,
    CONTENT_INSPECT_DEVICE_HIVE = 2,
    CONTENT_INSPECT_DEVICE_TUPU = 3
};


//c++ Struct ContentInspectConfig
export interface ContentInspectConfig {
    enable: boolean;
    DeviceWork: boolean;
    CloudWork: boolean;
    extraInfo: string;
    modules: ContentInspectModule[];
    moduleCount: number;
};

//c++ enum MAX_METADATA_SIZE_TYPE
// export enum MAX_METADATA_SIZE_TYPE {
//     MAX_METADATA_SIZE_IN_BYTE = 1024,
// }

//c++ Struct PacketOptions
export interface PacketOptions {
    timestamp: number;
    audioLevelIndication: number;
};

//c++ Struct AudioEncodedFrameInfo
export interface AudioEncodedFrameInfo {
    sendTs: number;
    codec: number;
};

//c++ Struct AudioPcmFrame
export interface AudioPcmFrame {
    capture_timestamp: number;
    samples_per_channel_: number;
    sample_rate_hz_: number;
    num_channels_: number;
    bytes_per_sample: BYTES_PER_SAMPLE;
    data_: number;
};

//c++ enum 
export enum OPTIONAL_ENUM_SIZE_T2 {
    kMaxDataSizeSamples = 3840,
    kMaxDataSizeBytes,
}

//c++ enum AUDIO_DUAL_MONO_MODE
export enum AUDIO_DUAL_MONO_MODE {
    AUDIO_DUAL_MONO_STEREO = 0,
    AUDIO_DUAL_MONO_L = 1,
    AUDIO_DUAL_MONO_R = 2,
    AUDIO_DUAL_MONO_MIX = 3,
}

//c++ enum VIDEO_PIXEL_FORMAT
export enum VIDEO_PIXEL_FORMAT {
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
}

//c++ enum RENDER_MODE_TYPE
export enum RENDER_MODE_TYPE {
    RENDER_MODE_HIDDEN = 1,
    RENDER_MODE_FIT = 2,
}

//c++ enum VIDEO_SOURCE_TYPE
// export enum VIDEO_SOURCE_TYPE {
//     CAMERA_SOURCE_FRONT = 0,
//     CAMERA_SOURCE_BACK = 1,
//     VIDEO_SOURCE_UNSPECIFIED = 2,
// }

//c++ Struct ExternalVideoFrame
export interface ExternalVideoFrame {
    type: VIDEO_BUFFER_TYPE;
    format: VIDEO_PIXEL_FORMAT;
    buffer: Uint8ClampedArray;
    stride: number;
    height: number;
    cropLeft: number;
    cropTop: number;
    cropRight: number;
    cropBottom: number;
    rotation: number;
    timestamp: number;
    eglContext: any;
    eglType: EGL_CONTEXT_TYPE;
    textureId: number;
    matrix: number;
    metadata_buffer: number;
    metadata_size: number;
};

//c++ enum EGL_CONTEXT_TYPE
export enum EGL_CONTEXT_TYPE {
    EGL_CONTEXT10 = 0,
    EGL_CONTEXT14 = 1,
}

//c++ enum VIDEO_BUFFER_TYPE
export enum VIDEO_BUFFER_TYPE {
    VIDEO_BUFFER_RAW_DATA = 1,
    VIDEO_BUFFER_ARRAY = 2,
    VIDEO_BUFFER_TEXTURE = 3,
}

//c++ Struct VideoFrame
export interface VideoFrame {
    type: VIDEO_PIXEL_FORMAT;
    width: number;
    height: number;
    yStride: number;
    uStride: number;
    vStride: number;
    yBuffer: Uint8ClampedArray;
    uBuffer: Uint8ClampedArray;
    vBuffer: Uint8ClampedArray;
    rotation: number;
    renderTimeMs: number;
    avsync_type: number;
    metadata_buffer: Uint8ClampedArray;
    metadata_size: number;
    sharedContext: any;
    textureId: number;
    matrix: number[];
    alphaBuffer: Uint8ClampedArray;
};

//c++ enum MEDIA_PLAYER_SOURCE_TYPE
export enum MEDIA_PLAYER_SOURCE_TYPE {
    MEDIA_PLAYER_SOURCE_DEFAULT,
    MEDIA_PLAYER_SOURCE_FULL_FEATURED,
    MEDIA_PLAYER_SOURCE_SIMPLE,
}

//c++ enum VIDEO_MODULE_POSITION
export enum VIDEO_MODULE_POSITION {
    POSITION_POST_CAPTURER = 1 << 0,
    POSITION_PRE_RENDERER = 1 << 1,
    POSITION_PRE_ENCODER = 1 << 2,
    POSITION_POST_FILTERS = 1 << 3,
}

//c++ enum AUDIO_FRAME_TYPE
export enum AUDIO_FRAME_TYPE {
    FRAME_TYPE_PCM16 = 0,
}

//c++ enum 
export enum MAX_HANDLE_TIME_CNT {
    MAX_HANDLE_TIME_CNT = 10,
}

//c++ Struct AudioFrame
export interface AudioFrame {
    type: AUDIO_FRAME_TYPE;
    samplesPerChannel: number;
    bytesPerSample: BYTES_PER_SAMPLE;
    channels: number;
    samplesPerSec: number;
    buffer: Uint8ClampedArray;
    renderTimeMs: number;
    avsync_type: number;
};

//c++ enum AUDIO_FRAME_POSITION
export enum AUDIO_FRAME_POSITION {
    AUDIO_FRAME_POSITION_NONE = 0x0000,
    AUDIO_FRAME_POSITION_PLAYBACK = 0x0001,
    AUDIO_FRAME_POSITION_RECORD = 0x0002,
    AUDIO_FRAME_POSITION_MIXED = 0x0004,
    AUDIO_FRAME_POSITION_BEFORE_MIXING = 0x0008,
}

//c++ Struct AudioParams
export interface AudioParams {
    sample_rate: number;
    channels: number;
    mode: RAW_AUDIO_FRAME_OP_MODE_TYPE;
    samples_per_call: number;
};

//c++ Struct AudioSpectrumData
export interface AudioSpectrumData {
    audioSpectrumData: number[];
    dataLength: number;
};

//c++ Struct UserAudioSpectrumInfo
export interface UserAudioSpectrumInfo {
    uid: uid_t;
    spectrumData: AudioSpectrumData;
};

//c++ enum VIDEO_FRAME_PROCESS_MODE
export enum VIDEO_FRAME_PROCESS_MODE {
    PROCESS_MODE_READ_ONLY,
    PROCESS_MODE_READ_WRITE,
}

//c++ enum EXTERNAL_VIDEO_SOURCE_TYPE
export enum EXTERNAL_VIDEO_SOURCE_TYPE {
    VIDEO_FRAME = 0,
    ENCODED_VIDEO_FRAME,
}

//c++ enum MediaRecorderContainerFormat
export enum MediaRecorderContainerFormat {
    FORMAT_MP4 = 1,
}

//c++ enum MediaRecorderStreamType
export enum MediaRecorderStreamType {
    STREAM_TYPE_AUDIO = 0x01,
    STREAM_TYPE_VIDEO = 0x02,
    STREAM_TYPE_BOTH = STREAM_TYPE_AUDIO | STREAM_TYPE_VIDEO,
}

//c++ enum RecorderState
export enum RecorderState {
    RECORDER_STATE_ERROR = -1,
    RECORDER_STATE_START = 2,
    RECORDER_STATE_STOP = 3,
}

//c++ enum RecorderErrorCode
export enum RecorderErrorCode {
    RECORDER_ERROR_NONE = 0,
    RECORDER_ERROR_WRITE_FAILED = 1,
    RECORDER_ERROR_NO_STREAM = 2,
    RECORDER_ERROR_OVER_MAX_DURATION = 3,
    RECORDER_ERROR_CONFIG_CHANGED = 4,
}

//c++ Struct MediaRecorderConfiguration
export interface MediaRecorderConfiguration {
    storagePath: string;
    containerFormat: MediaRecorderContainerFormat;
    streamType: MediaRecorderStreamType;
    maxDurationMs: number;
    recorderInfoUpdateInterval: number;
};

//c++ Struct RecorderInfo
export interface RecorderInfo {
    fileName: string;
    durationMs: number;
    fileSize: number;
};

export class IAudioFrameObserver {

};

export class IVideoFrameObserver {

};

export class IVideoEncodedImageReceiver {

};

export class IAudioSpectrumObserver {

};

export class ISnapshotCallback {

}

export interface SnapShotConfig {
    channel: string;
    uid: UID;
    filePath: string;
}
