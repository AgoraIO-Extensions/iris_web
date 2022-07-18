import { ILocalAudioTrack, ILocalVideoTrack, IRemoteAudioTrack, IRemoteVideoTrack, UID } from "agora-rtc-sdk-ng";

export interface IrisCEventHandler {
    OnEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number);
};

export type IrisEventHandlerHandle = IrisCEventHandler;
export type IrisEventHandler = IrisCEventHandler;

export enum IRIS_VIDEO_PROCESS_ERR {
    ERR_OK = 0,
    ERR_NULL_POINTER = 1,
    ERR_SIZE_NOT_MATCHING = 2,
    ERR_BUFFER_EMPTY = 5,
};

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
    kVideoSourceTypePreEncode,
    kVideoSourceTypePreEncodeSecondaryCamera,
    kVideoSourceTypePreEncodeScreen,
    kVideoSourceTypePreEncodeSecondaryScreen,
    kVideoSourceTypeUnknown,
} IrisVideoSourceType;


export type IrisAudioSourceType = IrisVideoSourceType;


export enum IrisVideoFrameType {
    kVideoFrameTypeYUV420,
    kVideoFrameTypeYUV422,
    kVideoFrameTypeRGBA,
    kVideoFrameTypeBGRA,
};

export class IrisVideoFrameBufferConfig {
    type: IrisVideoSourceType;
    id: UID;
    key: string;
    equals(config: IrisVideoFrameBufferConfig): boolean {
        return this.type == config.type && this.id == config.id && this.key == config.key;
    }
};

export type IrisVideoFrameBufferDelegateHandle = IrisVideoFrameBufferConfig;


export interface IrisCVideoFrameBuffer {
    type: IrisVideoFrameType;
    OnVideoFrameReceived(video_track: ILocalVideoTrack | IRemoteVideoTrack, video_frame: ImageData, config: IrisVideoFrameBufferConfig, resize: boolean);
    bytes_per_row_alignment: number;
};

export interface VideoParams {
    video_track: ILocalVideoTrack | IRemoteVideoTrack,
    video_frame: ImageData,
    is_new_frame: boolean,
    process_err: IRIS_VIDEO_PROCESS_ERR
};

export interface Size {
    width: number,
    height: number;
};

export interface VideoTrackPackage {
    type: IrisVideoSourceType,
    track: ILocalVideoTrack | IRemoteVideoTrack
};

export interface AudioTrackPackage {
    type: IrisAudioSourceType,
    track: ILocalAudioTrack | IRemoteAudioTrack
};

export interface EncryptionConfigPackage {

}
