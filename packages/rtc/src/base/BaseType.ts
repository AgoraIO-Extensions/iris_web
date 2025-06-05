import * as NATIVE_RTC from '@iris/native-rtc';
import { ILocalVideoTrack, IRemoteVideoTrack } from 'agora-rtc-sdk-ng';

export enum IRIS_VIDEO_PROCESS_ERR {
  ERR_OK = 0,
  ERR_NULL_POINTER = 1,
  ERR_SIZE_NOT_MATCHING = 2,
  ERR_BUFFER_EMPTY = 5,
}

export enum IrisAudioSourceType {
  kAudioSourceTypeMicrophonePrimary = 2001,
  kAudioSourceTypeMicrophoneSecondary = 2002,
  kAudioSourceTypeScreenCapture = 2003,
  kAudioSourceTypeCustom = 2004,
  kAudioSourceTypeBufferSourceAudio = 2005,
  kAudioSourceTypeRemote = 2006,
  kAudioSourceTypeUnknown = 2007,
  kAudioSourceTypeMicrophoneLoopbackTest = 2008,
}

export interface IrisVideoFrameBufferConfig {
  type: NATIVE_RTC.VIDEO_SOURCE_TYPE;
  id: number;
  key: string;
}

export type IrisVideoFrameBufferDelegateHandle = IrisVideoFrameBufferConfig;

export interface IrisCVideoFrameBuffer {
  type: NATIVE_RTC.VIDEO_FRAME_TYPE;
  OnVideoFrameReceived(
    video_track: ILocalVideoTrack | IRemoteVideoTrack,
    config: IrisVideoFrameBufferConfig,
    resize: boolean
  );
  bytes_per_row_alignment: number;
}

export interface VideoParams {
  video_track: ILocalVideoTrack | IRemoteVideoTrack;
  is_new_frame: boolean;
  process_err: IRIS_VIDEO_PROCESS_ERR;
}

export interface Size {
  width: number;
  height: number;
}
