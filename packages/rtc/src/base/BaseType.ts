import * as NATIVE_RTC from '@iris/native-rtc-binding';
import {
  IBufferSourceAudioTrack,
  ILocalAudioTrack,
  ILocalVideoTrack,
  IRemoteAudioTrack,
  IRemoteVideoTrack,
  UID,
} from 'agora-rtc-sdk-ng';

export enum IRIS_VIDEO_PROCESS_ERR {
  ERR_OK = 0,
  ERR_NULL_POINTER = 1,
  ERR_SIZE_NOT_MATCHING = 2,
  ERR_BUFFER_EMPTY = 5,
}

export enum IrisAudioSourceType {
  kAudioSourceTypeMicrophonePrimary,
  kAudioSourceTypeMicrophoneSecondary,
  kAudioSourceTypeScreenPrimary,
  kAudioSourceTypeScreenSecondary,
  kAudioSourceTypeCustom,
  kAudioSourceTypeUnknown,
}

export interface IrisVideoFrameBufferConfig {
  type: NATIVE_RTC.VIDEO_SOURCE_TYPE;
  id: UID;
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

export interface VideoTrackPackage {
  element?: string;
  type?: NATIVE_RTC.VIDEO_SOURCE_TYPE | NATIVE_RTC.EXTERNAL_VIDEO_SOURCE_TYPE;
  track?: ILocalVideoTrack | IRemoteVideoTrack;
}

export interface VideoViewHolder {
  element?: string;
  channelId?: string;
  uid?: UID;
  type?: NATIVE_RTC.VIDEO_SOURCE_TYPE;
}

export interface AudioTrackPackage {
  type: IrisAudioSourceType;
  track: ILocalAudioTrack | IRemoteAudioTrack;
}

export interface BufferSourceAudioTrackPackage {
  soundId: number;
  track: IBufferSourceAudioTrack;
}
