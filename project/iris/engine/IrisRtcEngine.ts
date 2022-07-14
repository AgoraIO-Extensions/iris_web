import { IAgoraRTCClient, IAgoraRTCRemoteUser, ILocalAudioTrack, ILocalVideoTrack, UID } from "agora-rtc-sdk-ng";
import { IrisClientEventHandler } from "../event_handler/IrisClientEventHandler";
import { Contaniner } from "../tool/Contanier";
import { AudioTrackPackage, IrisEventHandler, IrisVideoFrameBufferConfig, IRIS_VIDEO_PROCESS_ERR, VideoParams, VideoTrackPackage } from "../base/BaseType";
import { IrisRtcEnginePrepare } from "../terra/IrisRtcEnginePrepare";
import { IrisTrackEventHandler } from "../event_handler/IrisTrackEventHandler";
import { IrisEntitiesContaniner } from "./IrisEntitiesContainer";
import { RtcEngine } from "./RtcEngine";

export type CallApiType = (params: string, paramLength: number, buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any) => number;

export class IrisRtcEngine extends IrisRtcEnginePrepare {

    //EventHandler
    private _eventHandler: IrisEventHandler = null;
    private _entitiesContainer: IrisEntitiesContaniner = null;

    constructor() {
        super();
        this._rtcEngine = new RtcEngine(this);
        this._entitiesContainer = new IrisEntitiesContaniner(this);
    };

    public setEventHandler(event_handler: IrisEventHandler) {
        this._eventHandler = event_handler;
    }

    public getEventHandler(): IrisEventHandler {
        return this._eventHandler;
    }

    public getEntitiesContainer(): IrisEntitiesContaniner {
        return this._entitiesContainer;
    }

    public getVideoFrame(uid: UID, channel_id: string): VideoParams {
        return this._entitiesContainer.getVideoFrame(uid, channel_id);

    }

    public getVideoFrameByConfig(config: IrisVideoFrameBufferConfig): VideoParams {
        return this._entitiesContainer.getVideoFrameByConfig(config);
    }

    public release() {

        this._entitiesContainer.release();

    }





}