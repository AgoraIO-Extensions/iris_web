/// Generated by terra, DO NOT MODIFY BY HAND.

export enum MEDIA_PLAYER_STATE {
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
  PLAYER_STATE_FAILED = 100,
}

export enum MEDIA_PLAYER_REASON {
  PLAYER_REASON_NONE = 0,
  PLAYER_REASON_INVALID_ARGUMENTS = -1,
  PLAYER_REASON_INTERNAL = -2,
  PLAYER_REASON_NO_RESOURCE = -3,
  PLAYER_REASON_INVALID_MEDIA_SOURCE = -4,
  PLAYER_REASON_UNKNOWN_STREAM_TYPE = -5,
  PLAYER_REASON_OBJ_NOT_INITIALIZED = -6,
  PLAYER_REASON_CODEC_NOT_SUPPORTED = -7,
  PLAYER_REASON_VIDEO_RENDER_FAILED = -8,
  PLAYER_REASON_INVALID_STATE = -9,
  PLAYER_REASON_URL_NOT_FOUND = -10,
  PLAYER_REASON_INVALID_CONNECTION_STATE = -11,
  PLAYER_REASON_SRC_BUFFER_UNDERFLOW = -12,
  PLAYER_REASON_INTERRUPTED = -13,
  PLAYER_REASON_NOT_SUPPORTED = -14,
  PLAYER_REASON_TOKEN_EXPIRED = -15,
  PLAYER_REASON_IP_EXPIRED = -16,
  PLAYER_REASON_UNKNOWN = -17,
}

export enum MEDIA_STREAM_TYPE {
  STREAM_TYPE_UNKNOWN = 0,
  STREAM_TYPE_VIDEO = 1,
  STREAM_TYPE_AUDIO = 2,
  STREAM_TYPE_SUBTITLE = 3,
}

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

export enum PLAYER_PRELOAD_EVENT {
  PLAYER_PRELOAD_EVENT_BEGIN = 0,
  PLAYER_PRELOAD_EVENT_COMPLETE = 1,
  PLAYER_PRELOAD_EVENT_ERROR = 2,
}

export class PlayerStreamInfo {
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

export class SrcInfo {
  bitrateInKbps?: number;

  name?: string;
}

export enum MEDIA_PLAYER_METADATA_TYPE {
  PLAYER_METADATA_TYPE_UNKNOWN = 0,
  PLAYER_METADATA_TYPE_SEI = 1,
}

export class CacheStatistics {
  fileSize?: number;

  cacheSize?: number;

  downloadSize?: number;
}

export class PlayerPlaybackStats {
  videoFps?: number;

  videoBitrateInKbps?: number;

  audioBitrateInKbps?: number;

  totalBitrateInKbps?: number;
}

export class PlayerUpdatedInfo {
  internalPlayerUuid?: string;

  deviceId?: string;

  videoHeight?: number;

  videoWidth?: number;

  audioSampleRate?: number;

  audioChannels?: number;

  audioBitsPerSample?: number;
}

export class MediaSource {
  url?: string;

  uri?: string;

  startPos?: number;

  autoPlay?: boolean;

  enableCache?: boolean;

  enableMultiAudioTrack?: boolean;

  isAgoraSource?: boolean;

  isLiveSource?: boolean;
}
