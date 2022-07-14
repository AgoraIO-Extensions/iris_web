import { IAgoraRTCClient, UID, IAgoraRTCRemoteUser } from "agora-rtc-sdk-ng";
import { AudioTrackPackage, IrisVideoFrameBufferConfig, IRIS_VIDEO_PROCESS_ERR, VideoParams, VideoTrackPackage } from "../base/BaseType";
import { IrisClientEventHandler } from "../event_handler/IrisClientEventHandler";
import { IrisTrackEventHandler } from "../event_handler/IrisTrackEventHandler";
import { Contaniner } from "../tool/Contanier";
import { IrisRtcEngine } from "./IrisRtcEngine";

//存放一堆东西的
export class IrisEntitiesContaniner {

    private _engine: IrisRtcEngine = null;

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


    constructor(engine: IrisRtcEngine) {
        this._engine = engine;
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

    release() {
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

    }

}