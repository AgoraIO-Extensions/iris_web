import { IAgoraRTCClient, IAgoraRTCRemoteUser, ILocalAudioTrack, ILocalVideoTrack } from "agora-rtc-sdk-ng";
import { IrisContaniner } from "./IrisContanier";
import { IrisAgoraCallerHandler } from "./IrisAgoraCallerHandler";
import { IrisClientCallerHandler } from "./IrisClientCallerHandler";


export class IrisRtcEngine {

    private _audioTracks: IrisContaniner<{ types: AudiSourceType, ILocalAudioTrack }> = new IrisContaniner<ILocalAudioTrack>();
    private _videoTracks: IrisContaniner<{ types: VideSourceType, track: ILocalVideoTrack }> = new IrisContaniner<ILocalVideoTrack>();
    private _clients: IrisContaniner<{ type: VideoSourceType, client: IAgoraRTCClient }> = new IrisContaniner<IAgoraRTCClient>();
    private _remoteUser: IrisContaniner<IAgoraRTCRemoteUser> = new IrisContaniner<IAgoraRTCRemoteUser>();
    private _clientCallerHandlers: IrisContaniner<IrisClientCallerHandler> = new IrisContaniner<IrisClientCallerHandler>();

    private _baseClient: IAgoraRTCClient;
    private _baseClientCallerHandler: IrisClientCallerHandler;
    private _agoraCallerHandler: IrisAgoraCallerHandler;

    public setEventHandler(event_handler: IrisEventHandler) {

    }

    public getEventHandler(): IrisEventHandler {

    }

    public callApi(engine_ptr: IrisApiEngine, func_name: string,
        params: string, paramLength: number,
        buffer: any, bufferLength: number,): string {

    }

    public release() {
        this._agoraCallerHandler.release();
        //_clientCallerHandlers.release();

    }



}