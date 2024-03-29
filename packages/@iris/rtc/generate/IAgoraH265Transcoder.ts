/// Generated by terra, DO NOT MODIFY BY HAND.

import { CallApiReturnType } from 'iris-web-core';

export enum H265_TRANSCODE_RESULT {
  H265_TRANSCODE_RESULT_UNKNOWN = -1,
  H265_TRANSCODE_RESULT_SUCCESS = 0,
  H265_TRANSCODE_RESULT_REQUEST_INVALID = 1,
  H265_TRANSCODE_RESULT_UNAUTHORIZED = 2,
  H265_TRANSCODE_RESULT_TOKEN_EXPIRED = 3,
  H265_TRANSCODE_RESULT_FORBIDDEN = 4,
  H265_TRANSCODE_RESULT_NOT_FOUND = 5,
  H265_TRANSCODE_RESULT_CONFLICTED = 6,
  H265_TRANSCODE_RESULT_NOT_SUPPORTED = 7,
  H265_TRANSCODE_RESULT_TOO_OFTEN = 8,
  H265_TRANSCODE_RESULT_SERVER_INTERNAL_ERROR = 9,
  H265_TRANSCODE_RESULT_SERVICE_UNAVAILABLE = 10,
}

export interface IH265TranscoderObserver {
  onEnableTranscode_6ba6646(result: H265_TRANSCODE_RESULT): void;

  onQueryChannel_31ba3df(
    result: H265_TRANSCODE_RESULT,
    originChannel: string,
    transcodeChannel: string
  ): void;

  onTriggerTranscode_6ba6646(result: H265_TRANSCODE_RESULT): void;
}

export interface IH265Transcoder {
  enableTranscode_a0779eb(
    token: string,
    channel: string,
    uid: number
  ): CallApiReturnType;

  queryChannel_a0779eb(
    token: string,
    channel: string,
    uid: number
  ): CallApiReturnType;

  triggerTranscode_a0779eb(
    token: string,
    channel: string,
    uid: number
  ): CallApiReturnType;

  registerTranscoderObserver_e1ee996(
    observer: IH265TranscoderObserver
  ): CallApiReturnType;

  unregisterTranscoderObserver_e1ee996(
    observer: IH265TranscoderObserver
  ): CallApiReturnType;
}
