import { ILocalVideoTrack, IRemoteVideoTrack, UID } from "agora-rtc-sdk-ng";
import { IrisApiEngine } from "./IrisApiEngine";

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

export enum IrisVideoFrameType {
    kVideoFrameTypeYUV420,
    kVideoFrameTypeYUV422,
    kVideoFrameTypeRGBA,
    kVideoFrameTypeBGRA,
};

interface IrisVideoFrameBufferConfig {
    type: IrisVideoSourceType;
    id: UID;
    key: string;
};

type IrisVideoFrameBufferDelegateHandle = IrisVideoFrameBufferConfig;


interface IrisCVideoFrameBuffer {
    type: IrisVideoFrameType;
    OnVideoFrameReceived(video_track: ILocalVideoTrack | IRemoteVideoTrack, video_frame: ImageData, config: IrisVideoFrameBufferConfig, resize: boolean);
    bytes_per_row_alignment: number;
};

interface VideoParams {
    video_track: ILocalVideoTrack | IRemoteVideoTrack,
    video_frame: ImageData,
    is_new_frame: boolean
}

interface IrisVideoFrameBufferManager {

}


function CreateIrisVideoFrameBufferManager(): IrisVideoFrameBufferManager {
}

function Attach(engine_ptr: IrisApiEngine,
    manager_ptr: IrisVideoFrameBufferManager) {

}

function Detach(engine_ptr: IrisApiEngine,
    manager_ptr: IrisVideoFrameBufferManager) {
}


function FreeIrisVideoFrameBufferManager(manager_ptr: IrisVideoFrameBufferManager) {
}


function EnableVideoFrameBufferByConfig(
    manager_ptr: IrisVideoFrameBufferManager,
    buffer: IrisCVideoFrameBuffer,
    config: IrisVideoFrameBufferConfig): IrisVideoFrameBufferDelegateHandle {
}


function DisableVideoFrameBufferByDelegate(
    manager_ptr: IrisVideoFrameBufferManager,
    handle: IrisVideoFrameBufferDelegateHandle) {
}


function DisableVideoFrameBufferByConfig(
    manager_ptr: IrisVideoFrameBufferManager,
    config: IrisVideoFrameBufferConfig) {
}


function DisableAllVideoFrameBuffer(
    manager_ptr: IrisVideoFrameBufferManager) {
}

function GetVideoFrame(
    manager_ptr: IrisVideoFrameBufferManager,
    uid: UID, channel_id: string): VideoParams {
}

function GetVideoFrameByConfig(
    manager_ptr: IrisVideoFrameBufferManager,
    config: IrisVideoFrameBufferConfig): VideoParams {
}

