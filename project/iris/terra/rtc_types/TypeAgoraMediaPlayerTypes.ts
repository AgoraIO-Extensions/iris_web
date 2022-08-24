


//c++ enum MEDIA_PLAYER_STATE
export enum MEDIA_PLAYER_STATE {
    PLAYER_STATE_IDLE = 0,
    PLAYER_STATE_OPENING,
    PLAYER_STATE_OPEN_COMPLETED,
    PLAYER_STATE_PLAYING,
    PLAYER_STATE_PAUSED,
    PLAYER_STATE_PLAYBACK_COMPLETED,
    PLAYER_STATE_PLAYBACK_ALL_LOOPS_COMPLETED,
    PLAYER_STATE_STOPPED,
    PLAYER_STATE_PAUSING_INTERNAL = 50,
    PLAYER_STATE_STOPPING_INTERNAL,
    PLAYER_STATE_SEEKING_INTERNAL,
    PLAYER_STATE_GETTING_INTERNAL,
    PLAYER_STATE_NONE_INTERNAL,
    PLAYER_STATE_DO_NOTHING_INTERNAL,
    PLAYER_STATE_SET_TRACK_INTERNAL,
    PLAYER_STATE_FAILED = 100,
}

//c++ enum MEDIA_PLAYER_ERROR
export enum MEDIA_PLAYER_ERROR {
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
    PLAYER_ERROR_UNKNOWN = -17,
}

//c++ enum MEDIA_STREAM_TYPE
export enum MEDIA_STREAM_TYPE {
    STREAM_TYPE_UNKNOWN = 0,
    STREAM_TYPE_VIDEO = 1,
    STREAM_TYPE_AUDIO = 2,
    STREAM_TYPE_SUBTITLE = 3,
}

//c++ enum MEDIA_PLAYER_EVENT
export enum MEDIA_PLAYER_EVENT {
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
    PLAYER_EVENT_TRY_OPEN_FAILED = 18,
}

//c++ enum PLAYER_PRELOAD_EVENT
export enum PLAYER_PRELOAD_EVENT {
    PLAYER_PRELOAD_EVENT_BEGIN = 0,
    PLAYER_PRELOAD_EVENT_COMPLETE = 1,
    PLAYER_PRELOAD_EVENT_ERROR = 2,
}

//c++ Struct PlayerStreamInfo
export interface PlayerStreamInfo {
    streamIndex: number;
    streamType: MEDIA_STREAM_TYPE;
    codecName: string;
    language: string;
    videoFrameRate: number;
    videoBitRate: number;
    videoWidth: number;
    videoHeight: number;
    videoRotation: number;
    audioSampleRate: number;
    audioChannels: number;
    audioBitsPerSample: number;
    duration: number;
};

//c++ Struct SrcInfo
export interface SrcInfo {
    bitrateInKbps: number;
    name: string;
};

//c++ enum MEDIA_PLAYER_METADATA_TYPE
export enum MEDIA_PLAYER_METADATA_TYPE {
    PLAYER_METADATA_TYPE_UNKNOWN = 0,
    PLAYER_METADATA_TYPE_SEI = 1,
}

//c++ Struct CacheStatistics
export interface CacheStatistics {
    fileSize: number;
    cacheSize: number;
    downloadSize: number;
};

//c++ Struct PlayerUpdatedInfo
export interface PlayerUpdatedInfo {
    playerId?: string;
    deviceId?: string;
    cacheStatistics?: CacheStatistics;
};

//c++ Struct MediaSource
export interface MediaSource {
    url: string;
    uri: string;
    startPos: number;
    autoPlay: boolean;
    enableCache: boolean;
    isAgoraSource?: boolean;
    isLiveSource?: boolean;
    provider: IMediaPlayerCustomDataProvider[];
};

export class IMediaPlayerCustomDataProvider {

};

export class IMediaPlayer {

}

export class IMediaPlayerSourceObserver {

}



