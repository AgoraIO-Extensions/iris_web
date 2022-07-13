import { IAgoraRTCClient, IAgoraRTCRemoteUser, ILocalAudioTrack, ILocalVideoTrack, UID } from "agora-rtc-sdk-ng";
import { IrisClientEventHandler } from "../event_handler/IrisClientEventHandler";
import { Contaniner } from "../tool/Contanier";
import { AudioTrackPackage, IrisEventHandler, IrisVideoFrameBufferConfig, IRIS_VIDEO_PROCESS_ERR, VideoParams, VideoTrackPackage } from "../base/BaseType";
import { IrisRtcEnginePrepare } from "../terra/IrisRtcEnginePrepare";
import { IrisTrackEventHandler } from "../event_handler/IrisTrackEventHandler";

export type CallApiType = (params: string, paramLength: number, buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any) => number;

export class IrisRtcEngine extends IrisRtcEnginePrepare {

    //EventHandler
    private _eventHandler: IrisEventHandler = null;

    //mainClient
    private _mainClient: IAgoraRTCClient = null;
    private _mainClientChannelName: string = null;
    private _mainClientUid: UID = null;
    private _mainClientEventHandler: IrisClientEventHandler = null;
    private _mainClientLocalAudioTracks: Array<AudioTrackPackage> = new Array<AudioTrackPackage>();
    private _mainClientLocalVideoTrack: VideoTrackPackage = null;
    private _mainClientTrackEventHandlers: Array<IrisTrackEventHandler> = new Array<IrisTrackEventHandler>();


    //subClient
    private _subClients: Contaniner<IAgoraRTCClient> = new Contaniner<IAgoraRTCClient>();
    private _subClientEventHandlers: Contaniner<IrisClientEventHandler> = new Contaniner<IrisClientEventHandler>();
    private _subClientAudioTracks: Contaniner<Array<AudioTrackPackage>> = new Contaniner<Array<AudioTrackPackage>>();
    private _subClientVideoTracks: Contaniner<VideoTrackPackage> = new Contaniner<VideoTrackPackage>();
    private _subClientTrackEventHandlers: Contaniner<Array<IrisTrackEventHandler>> = new Contaniner<Array<IrisTrackEventHandler>>();

    //remoteUser
    _remoteUsers: Contaniner<IAgoraRTCRemoteUser> = new Contaniner<IAgoraRTCRemoteUser>();

    constructor() {
        super();
        this._rtcEngine.setEngine(this);
    };

    public setEventHandler(event_handler: IrisEventHandler) {
        this._eventHandler = event_handler;
    }

    public getEventHandler(): IrisEventHandler {
        return this._eventHandler;
    }

    public getVideoFrame(uid: UID, channel_id: string): VideoParams {
        if (uid == 0) {
            if (this._mainClientLocalVideoTrack) {
                return {
                    video_track: this._mainClientLocalVideoTrack.track,
                    video_frame: this._mainClientLocalVideoTrack.track.getCurrentFrameData(),
                    is_new_frame: true, //todo  how to know is a new frame
                    process_err: IRIS_VIDEO_PROCESS_ERR.ERR_OK
                }
            }
            else {
                return null;
            }
        }
        else {
            let subVideoTrack = this._subClientVideoTracks.getT(channel_id, uid);
            if (subVideoTrack) {
                return {
                    video_track: subVideoTrack.track,
                    video_frame: subVideoTrack.track.getCurrentFrameData(),
                    is_new_frame: true, //todo  how to know is a new frame
                    process_err: IRIS_VIDEO_PROCESS_ERR.ERR_OK
                }
            }

            let remoteUser = this._remoteUsers.getT(channel_id, uid);
            if (remoteUser && remoteUser.hasVideo && remoteUser.videoTrack) {
                let videoTrack = remoteUser.videoTrack;
                return {
                    video_track: videoTrack,
                    video_frame: videoTrack.getCurrentFrameData(),
                    is_new_frame: true, //todo  how to know is a new frame
                    process_err: IRIS_VIDEO_PROCESS_ERR.ERR_OK
                }
            }
            return null;
        }

    }

    public getVideoFrameByConfig(config: IrisVideoFrameBufferConfig): VideoParams {
        let uid = config.id;
        let channel_id = config.key;
        let type = config.type;
        if (uid == 0) {
            if (this._mainClientLocalVideoTrack && this._mainClientLocalVideoTrack.type == type) {
                return {
                    video_track: this._mainClientLocalVideoTrack.track,
                    video_frame: this._mainClientLocalVideoTrack.track.getCurrentFrameData(),
                    is_new_frame: true, //todo  how to know is a new frame
                    process_err: IRIS_VIDEO_PROCESS_ERR.ERR_OK
                }
            }
            else {
                return null;
            }
        }
        else {
            let subVideoTrack = this._subClientVideoTracks.getT(channel_id, uid);
            if (subVideoTrack && subVideoTrack.type == type) {
                return {
                    video_track: subVideoTrack.track,
                    video_frame: subVideoTrack.track.getCurrentFrameData(),
                    is_new_frame: true, //todo  how to know is a new frame
                    process_err: IRIS_VIDEO_PROCESS_ERR.ERR_OK
                }
            }

            let remoteUser = this._remoteUsers.getT(channel_id, uid);
            if (remoteUser && remoteUser.hasVideo && remoteUser.videoTrack) {
                let videoTrack = remoteUser.videoTrack;
                return {
                    video_track: videoTrack,
                    video_frame: videoTrack.getCurrentFrameData(),
                    is_new_frame: true, //todo  how to know is a new frame
                    process_err: IRIS_VIDEO_PROCESS_ERR.ERR_OK
                }
            }
            return null;
        }
    }

    //todo addClient, removeClient, addSub, removeSub ......


    public release() {
        //mainClient
        this._mainClientEventHandler.release();
        this._mainClientTrackEventHandlers.forEach((trackEventHandler: IrisTrackEventHandler){
            trackEventHandler.release();
        })

        //subClient
        this._subClientEventHandlers.walkT((channelId: string, uid: UID, t: IrisClientEventHandler) => {
            t.release();
        });
        this._subClientTrackEventHandlers.walkT((channelId: string, uid: UID, t: Array<IrisTrackEventHandler>) => {
            t.forEach((trackEventHandler: IrisTrackEventHandler) => {
                trackEventHandler.release();
            })
        })


        //todo audioTrack, videoTrack clear
    }





}