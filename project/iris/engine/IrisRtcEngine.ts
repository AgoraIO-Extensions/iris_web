import { IAgoraRTCClient, IAgoraRTCRemoteUser, ILocalAudioTrack, ILocalVideoTrack, UID } from "agora-rtc-sdk-ng";
import { IrisClientEventHandler } from "../event_handler/IrisClientEventHandler";
import { Contaniner } from "../tool/Contanier";
import { AudioTrackPackage, IrisEventHandler, IrisVideoFrameBufferConfig, IrisVideoSourceType, IRIS_VIDEO_PROCESS_ERR, VideoParams, VideoTrackPackage } from "../base/BaseType";
import { IrisRtcEnginePrepare } from "../terra/IrisRtcEnginePrepare";
import { IrisTrackEventHandler } from "../event_handler/IrisTrackEventHandler";
import { IrisEntitiesContaniner } from "./IrisEntitiesContainer";
import { RtcEngine } from "./RtcEngine";
import { IrisGlobalVariables } from "../variable/IrisGlobalVariables";
import { IrisMainClientVariables } from "../variable/IrisMainClientVariables";
import { IrisSubClientVariables } from "../variable/IrisSubClientVariables";
import { RtcEngineEventHandler } from "../terra/RtcEngineEventHandler";
import { IrisAgoraEventHandler } from "../event_handler/IrisAgoraEventHandler";

export type CallApiType = (params: string, paramLength: number, buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any) => number;

export class IrisRtcEngine extends IrisRtcEnginePrepare {

    //EventHandler
    private _eventHandler: IrisEventHandler = null;

    public entitiesContainer: IrisEntitiesContaniner = null;
    public rtcEngineEventHandler: RtcEngineEventHandler = null;
    public globalVariables: IrisGlobalVariables = null;
    public mainClientVariables: IrisMainClientVariables = null;
    public subClientVariables: IrisSubClientVariables = null;
    public agoraEventHandler: IrisAgoraEventHandler = null;

    constructor() {
        super();
        this._rtcEngine = new RtcEngine(this);
        this.rtcEngineEventHandler = new RtcEngineEventHandler(this);
        this.entitiesContainer = new IrisEntitiesContaniner(this);
        this.globalVariables = new IrisGlobalVariables();
        this.mainClientVariables = new IrisMainClientVariables();
        this.subClientVariables = new IrisSubClientVariables();
        this.agoraEventHandler = new IrisAgoraEventHandler(this);
    };

    public setEventHandler(event_handler: IrisEventHandler) {
        this._eventHandler = event_handler;
    }

    public getEventHandler(): IrisEventHandler {
        return this._eventHandler;
    }

    public getVideoFrame(uid: UID, channel_id: string): VideoParams {
        return this.entitiesContainer.getVideoFrame(uid, channel_id);

    }

    public getVideoFrameByConfig(config: IrisVideoFrameBufferConfig): VideoParams {
        return this.entitiesContainer.getVideoFrameByConfig(config);
    }

    public destruction() {
        this.agoraEventHandler.destruction();

        this._rtcEngine.putAction({
            fun: (next) => {
                let process = async () => {
                    await this.entitiesContainer.destruction();
                    next();
                }
                setTimeout(process, 0);
            },
            args: []
        })
    }


    public generateVideoTrackLabel(channelName: string, uid: number, type: IrisVideoSourceType): string {
        return channelName + "_" + uid + "_" + type;
    }
}