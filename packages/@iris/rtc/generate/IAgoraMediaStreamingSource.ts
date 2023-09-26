/// Generated by terra, DO NOT MODIFY BY HAND.

export enum STREAMING_SRC_ERR {
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
  STREAMING_SRC_ERR_CODECPROC = 21,
}

export enum STREAMING_SRC_STATE {
  STREAMING_SRC_STATE_CLOSED = 0,
  STREAMING_SRC_STATE_OPENING = 1,
  STREAMING_SRC_STATE_IDLE = 2,
  STREAMING_SRC_STATE_PLAYING = 3,
  STREAMING_SRC_STATE_SEEKING = 4,
  STREAMING_SRC_STATE_EOF = 5,
  STREAMING_SRC_STATE_ERROR = 6,
}

export class InputSeiData {
  type?: number;

  timestamp?: number;

  frame_index?: number;

  private_data?: Uint8Array;

  data_size?: number;
}
