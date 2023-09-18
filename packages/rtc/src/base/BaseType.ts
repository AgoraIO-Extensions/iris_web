import {
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

export enum IrisVideoSourceType {
  kVideoSourceTypeCameraPrimary,
  kVideoSourceTypeCameraSecondary,
  kVideoSourceTypeScreenPrimary,
  kVideoSourceTypeScreenSecondary,
  kVideoSourceTypeCustom,
  kVideoSourceTypeMediaPlayer,
  kVideoSourceTypeRtcImagePng,
  kVideoSourceTypeRtcImageJpeg,
  kVideoSourceTypeRtcImageGif,
  kVideoSourceTypeRemote,
  kVideoSourceTypeTranscoded,
  // kVideoSourceTypePreEncode,
  // kVideoSourceTypePreEncodeSecondaryCamera,
  // kVideoSourceTypePreEncodeScreen,
  // kVideoSourceTypePreEncodeSecondaryScreen,
  kVideoSourceTypeUnknown = 100,
}

export enum IrisClientType {
  kClientMain,
  kClientSub,
}

export enum IrisAudioSourceType {
  kAudioSourceTypeMicrophonePrimary,
  kAudioSourceTypeMicrophoneSecondary,
  kAudioSourceTypeScreenPrimary,
  kAudioSourceTypeScreenSecondary,
  kAudioSourceTypeCustom,
  kAudioSourceTypeUnknow,
}

export enum IrisVideoFrameType {
  kVideoFrameTypeYUV420,
  kVideoFrameTypeYUV422,
  kVideoFrameTypeRGBA,
  kVideoFrameTypeBGRA,
}

export interface IrisVideoFrameBufferConfig {
  type: IrisVideoSourceType;
  id: UID;
  key: string;
}

export type IrisVideoFrameBufferDelegateHandle = IrisVideoFrameBufferConfig;

export interface IrisCVideoFrameBuffer {
  type: IrisVideoFrameType;
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
  type?: IrisVideoSourceType;
  track?: ILocalVideoTrack | IRemoteVideoTrack;
}

export interface VideoViewHolder {
  element?: string;
  channelId?: string;
  uid?: UID;
  type?: IrisVideoSourceType;
}

export interface AudioTrackPackage {
  type: IrisAudioSourceType;
  track: ILocalAudioTrack | IRemoteAudioTrack;
}

export interface EncryptionConfigPackage {}
