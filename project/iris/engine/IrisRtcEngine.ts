import { IAgoraRTCClient, IAgoraRTCRemoteUser, ILocalAudioTrack, ILocalVideoTrack, UID } from "agora-rtc-sdk-ng";
import { AudioTrackPackage, IrisEventHandler, IrisVideoFrameBufferConfig, IrisVideoSourceType, IRIS_VIDEO_PROCESS_ERR, VideoParams, VideoTrackPackage } from "../base/BaseType";
import { IrisEntitiesContaniner } from "./IrisEntitiesContainer";

import { IrisGlobalVariables } from "../variable/IrisGlobalVariables";
import { IrisMainClientVariables } from "../variable/IrisMainClientVariables";
import { IrisSubClientVariables } from "../variable/IrisSubClientVariables";
import { RtcEngineEventHandler } from "../terra/RtcEngineEventHandler";
import { IrisAgoraEventHandler } from "../event_handler/IrisAgoraEventHandler";
import { AgoraActionQueue } from "../tool/AgoraActionQueue";
import { IMediaEngineDispatch } from "../terra/event_dispatch/IMediaEngineDispatch";
import { IVideoDeviceManagerDispatch } from "../terra/event_dispatch/IVideoDeviceManagerDispatch";
import { IRtcEngineDispatch } from "../terra/event_dispatch/IRtcEngineDispatch";
import { IRtcEngineExDispatch } from "../terra/event_dispatch/IRtcEngineExDispatch";
import { ILocalSpatialAudioEngineDispatch } from "../terra/event_dispatch/ILocalSpatialAudioEngineDispatch";
import { IAudioDeviceManagerDispatch } from "../terra/event_dispatch/IAudioDeviceManagerDispatch";
import { IMediaPlayerDispatch } from "../terra/event_dispatch/IMediaPlayerDispatch";
import { AgoraConsole } from "../tool/AgoraConsole";
import * as agorartc from "../terra/rtc_types/Index";
import { ApiParam } from "./IrisApiEngine";
import { CallApiExecutor, CallIrisApiResult, isPromise } from "../base/call_api_executor";

export type CallApiType = (params: string, paramLength: number, buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any) => number;
export type CallApiAsyncType = (params: string, paramLength: number, buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any) => Promise<CallIrisApiResult>;
export type GenerateVideoTrackLabelOrHtmlElementCb = (channelName: string, uid: number, type: IrisVideoSourceType) => string | HTMLElement;

export class IrisRtcEngine {

    //EventHandler
    private _eventHandler: IrisEventHandler = null;

    private _generateVideoTrackLabelOrHtmlElementCb: GenerateVideoTrackLabelOrHtmlElementCb = null;

    private _implDispatchsMap: Map<string, any> = null;
    public entitiesContainer: IrisEntitiesContaniner = null;
    public rtcEngineEventHandler: RtcEngineEventHandler = null;
    public globalVariables: IrisGlobalVariables = null;
    public mainClientVariables: IrisMainClientVariables = null;
    public subClientVariables: IrisSubClientVariables = null;
    public agoraEventHandler: IrisAgoraEventHandler = null;
    public actionQueue: AgoraActionQueue = null;
    public executor: CallApiExecutor = null;

    constructor() {
        this._implDispatchsMap = new Map();
        this._implDispatchsMap.set("MediaPlayer", new IMediaPlayerDispatch(this));
        this._implDispatchsMap.set("MediaEngine", new IMediaEngineDispatch(this));
        this._implDispatchsMap.set("AudioDeviceManager", new IAudioDeviceManagerDispatch(this));
        this._implDispatchsMap.set("VideoDeviceManager", new IVideoDeviceManagerDispatch(this));
        this._implDispatchsMap.set("RtcEngine", new IRtcEngineDispatch(this));
        this._implDispatchsMap.set("RtcEngineEx", new IRtcEngineExDispatch(this));
        this._implDispatchsMap.set("LocalSpatialAudioEngine", new ILocalSpatialAudioEngineDispatch(this));

        this.actionQueue = new AgoraActionQueue();
        this.rtcEngineEventHandler = new RtcEngineEventHandler(this);
        this.entitiesContainer = new IrisEntitiesContaniner(this);
        this.globalVariables = new IrisGlobalVariables();
        this.mainClientVariables = new IrisMainClientVariables();
        this.subClientVariables = new IrisSubClientVariables();
        this.agoraEventHandler = new IrisAgoraEventHandler(this);

        this.executor = new CallApiExecutor(true);
    };

    public callIrisApi(apiParam: ApiParam): number {
        let func_name = apiParam.event;
        let params: string = apiParam.data;
        let paramLength: number = apiParam.data_size;
        let buffer: Array<any> = apiParam.buffer;
        let bufferLength: Array<any> = apiParam.length;
        let buffer_count = apiParam.buffer_count;
        let result: any = apiParam.result;
        let resultObj: any = {};

        let array = func_name.split('_');
        let className = array[0];
        let funName = array[1];

        console.log(`[iris_web] callIrisApi apiParam: ${JSON.stringify(apiParam)}`);

        let obj = this._implDispatchsMap.get(className);
        if (obj) {
            let callApiFun: CallApiType = obj[funName];
            if (callApiFun) {
                let ret = callApiFun.call(obj, params, paramLength, buffer, bufferLength, resultObj);
                AgoraConsole.log(`[callIrisApi] ${func_name} ret ${ret}`);
                return ret;
            }
            else {
                AgoraConsole.error(`${func_name} not found in ${className}Dispatch`);
                return -agorartc.ERROR_CODE_TYPE.ERR_FAILED;
            }
        }
        else {
            AgoraConsole.error(`${className} not found in DispatchsMap`);
            return -agorartc.ERROR_CODE_TYPE.ERR_FAILED;
        }

        

        return 0;
    }

    public async callIrisApiAsync(apiParam: ApiParam): Promise<CallIrisApiResult> {
        let func_name = apiParam.event;
        let params: string = apiParam.data;
        let paramLength: number = apiParam.data_size;
        let buffer: Array<any> = apiParam.buffer;
        let bufferLength: Array<any> = apiParam.length;
        let buffer_count = apiParam.buffer_count;
        let result: any = apiParam.result;
        let resultObj: any = {};

        let array = func_name.split('_');
        let className = array[0];
        let funName = array[1];

        console.log(`[iris_web] callIrisApiAsync apiParam: ${JSON.stringify(apiParam)}`);

        let obj = this._implDispatchsMap.get(className);
        if (obj) {
            let callApiFun: CallApiAsyncType = obj[funName];
            if (callApiFun) {
                let ret = await callApiFun.call(obj, params, paramLength, buffer, bufferLength, resultObj);
                console.assert(function () {
                    if (ret === undefined || ret.code === undefined ||  ret.data === undefined)  {
                        throw `[callIrisApiAsync] ${func_name} ret ${ret} not CallIrisApiResult`;
                    }
                }());
                AgoraConsole.log(`[callIrisApiAsync] ${func_name} ret ${ret.code}`);
                return ret;
            }
            else {
                AgoraConsole.error(`[callIrisApiAsync] ${func_name} not found in ${className}Dispatch`);
                return new CallIrisApiResult(-agorartc.ERROR_CODE_TYPE.ERR_FAILED, "");
            }
        }
        else {
            AgoraConsole.error(`[callIrisApiAsync] ${className} not found in DispatchsMap`);
            return new CallIrisApiResult( -agorartc.ERROR_CODE_TYPE.ERR_FAILED, "");
        }
    }

    public setEventHandler(event_handler: IrisEventHandler) {
        console.log(`IrisRtcEngine setEventHandler ${event_handler}`);
        console.log(`IrisRtcEngine setEventHandler 3333 ${event_handler}`);
        this._eventHandler = event_handler;
    }

    public setGenerateVideoTrackLabelOrHtmlElementCb(cb: GenerateVideoTrackLabelOrHtmlElementCb) {
        this._generateVideoTrackLabelOrHtmlElementCb = cb;
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

        this.actionQueue.putAction({
            fun: (next) => {
                let process = async () => {
                    await this.entitiesContainer.destruction();
                    this.rtcEngineEventHandler.onEngineDestroy();
                    next();
                }
                setTimeout(process, 0);
            },
            args: []
        })
    }


    public generateVideoTrackLabelOrHtmlElement(channelName: string, uid: number, type: IrisVideoSourceType): string | HTMLElement {
        if (this._generateVideoTrackLabelOrHtmlElementCb) {
            return this._generateVideoTrackLabelOrHtmlElementCb(channelName, uid, type);
        }

        return channelName + "_" + uid + "_" + type;
    }
}