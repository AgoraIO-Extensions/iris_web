import { ILocalAudioTrack, ILocalVideoTrack, IRemoteAudioTrack, IRemoteVideoTrack, UID } from "agora-rtc-sdk-ng";
import { EventParam } from "./IrisApiEngine";

export interface IrisCEventHandler {
    // onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number);
    onEvent(param: EventParam);
};

// export type IrisEventHandlerHandle = IrisCEventHandler;
// export type IrisEventHandler = IrisCEventHandler;

export class IrisEventHandler implements IrisCEventHandler {
    private _eventHandler: IrisCEventHandler;

    constructor(eventHandler: IrisCEventHandler) {
        this._eventHandler = eventHandler;
    }

    public onEvent(param: EventParam) {
        console.log(`IrisEventHandler111 ${JSON.stringify(param)}`);
        if (this._eventHandler) {
            console.log(`IrisEventHandler222 ${JSON.stringify(param)}`);
            this._eventHandler.onEvent(param);
        }
    }
}

export type IrisEventHandlerHandle = IrisEventHandler;

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
    // kVideoSourceTypePreEncode,
    // kVideoSourceTypePreEncodeSecondaryCamera,
    // kVideoSourceTypePreEncodeScreen,
    // kVideoSourceTypePreEncodeSecondaryScreen,
    kVideoSourceTypeUnknown = 100,
};

export enum IrisClientType {
    kClientMian,
    kClientSub,
}

export enum IrisAudioSourceType {
    kAudioSourceTypeMicrophonePrimary,
    kAudioSourceTypeMicrophoneSecondary,
    kAudioSourceTypeScreenPrimary,
    kAudioSourceTypeScreenSecondary,
    kAudioSourceTypeCustom,
    kAudioSourceTypeUnknow
};


