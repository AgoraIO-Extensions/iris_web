import { IAgoraRTCClient, UID, IAgoraRTCRemoteUser, ILocalVideoTrack, ILocalAudioTrack, ITrack } from "agora-rtc-sdk-ng";
import { AudioTrackPackage, IrisAudioSourceType, IrisVideoFrameBufferConfig, IrisVideoSourceType, IRIS_VIDEO_PROCESS_ERR, VideoParams, VideoTrackPackage } from "../base/BaseType";
import { IrisClientEventHandler } from "../event_handler/IrisClientEventHandler";
import { IrisTrackEventHandler } from "../event_handler/IrisTrackEventHandler";
import { Contaniner } from "../tool/Contanier";
import { IrisRtcEngine } from "./IrisRtcEngine";
import * as agorartc from '../terra/rtc_types/Index';
import { RtcConnection } from "../terra/rtc_types/Index";

export type WalkILocalVideoPackageTrackFun = (track: VideoTrackPackage) => void;

//存放一堆东西的
export class IrisEntitiesContaniner {

    private _engine: IrisRtcEngine = null;

    //mainClient
    private _mainClient: IAgoraRTCClient = null;
    private _mainClientEventHandler: IrisClientEventHandler = null;
    private _mainClientLocalAudioTracks: Array<AudioTrackPackage> = new Array<AudioTrackPackage>();
    private _mainClientLocalVideoTrack: VideoTrackPackage = null;
    private _mainClientTrackEventHandlers: Array<IrisTrackEventHandler> = new Array<IrisTrackEventHandler>();

    //all local tracks
    private _localAudioTracks: Array<AudioTrackPackage> = new Array<AudioTrackPackage>();
    private _localVideoTracks: Array<VideoTrackPackage> = new Array<VideoTrackPackage>();

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

    getRemoteUsers(): Contaniner<IAgoraRTCRemoteUser> {
        return this._remoteUsers;
    }

    getRemoteUserByUid(uid: UID): IAgoraRTCRemoteUser {
        let remoteUsers = this._remoteUsers;
        let container = remoteUsers.getContaniner();
        for (let v of container) {
            let map = v[1];
            for (let e of map) {
                if (e[0] == uid) {
                    return e[1];
                }
            }
        }

        return null;
    }

    getRemoteUserByChannelName(channelName: string): Map<UID, IAgoraRTCRemoteUser   {
        return this._remoteUsers.getTs(channelName);
    }



    addLocalVideoTrack(trackPackage: VideoTrackPackage) {
        this._localVideoTracks.push(trackPackage);
    }

    getLocalVideoTrackByType(type: IrisVideoSourceType): VideoTrackPackage {
        for (let trackPack of this._localVideoTracks) {
            if (trackPack.type == type) {
                return trackPack;
            }
        }
        return null;
    }

    removeLocalVideoTrack(trackPackage: VideoTrackPackage, closeTrack: boolean) {
        for (let i = 0; i < this._localVideoTracks.length; i++) {
            let trackPack = this._localVideoTracks[i];
            if (trackPack == trackPackage) {
                let track: ILocalVideoTrack = trackPack.track as ILocalVideoTrack;
                closeTrack && track.close();
                this._localVideoTracks.splice(i, 1);
                break;
            }
        }
    }

    removeLocalVideoTrackByType(type: IrisVideoSourceType, closeTrack: boolean) {
        for (let i = 0; i < this._localVideoTracks.length; i++) {
            let trackPack = this._localVideoTracks[i];
            if (trackPack.type == type) {
                let track: ILocalVideoTrack = trackPack.track as ILocalVideoTrack;
                closeTrack && track.close();
                this._localVideoTracks.splice(i, 1);
                break;
            }
        }
    }

    clearLocalVideoTracks(closeTrack: boolean) {
        for (let i = 0; i < this._localVideoTracks.length; i++) {
            let trackPack = this._localVideoTracks[i];
            let track = trackPack.track as ILocalVideoTrack;
            closeTrack && track.close();
        }
        this._localVideoTracks = [];
    }


    addLocalAudioTrack(trackPackage: AudioTrackPackage) {
        this._localAudioTracks.push(trackPackage);
    }

    getLocalAudioTrackByType(type: IrisAudioSourceType): AudioTrackPackage {
        for (let trackPack of this._localAudioTracks) {
            if (trackPack.type == type) {
                return trackPack;
            }
        }
        return null;
    }

    removeLocalAudioTrack(trackPackage: AudioTrackPackage, closeTrack: boolean) {
        for (let i = 0; i < this._localAudioTracks.length; i++) {
            let trackPack = this._localAudioTracks[i];
            if (trackPack == trackPackage) {
                let track: ILocalAudioTrack = trackPack.track as ILocalAudioTrack;
                closeTrack && track.close();
                this._localAudioTracks.splice(i, 1);
                break;
            }
        }
    }

    removeLocalAudioTrackByType(type: IrisAudioSourceType, closeTrack: boolean) {
        for (let i = 0; i < this._localAudioTracks.length; i++) {
            let trackPack = this._localAudioTracks[i];
            if (trackPack.type == type) {
                let track: ILocalAudioTrack = trackPack.track as ILocalAudioTrack;
                closeTrack && track.close();
                this._localAudioTracks.splice(i, 1);
                break;
            }
        }
    }

    getLocalVideoTracks(): Array<VideoTrackPackage> {
        return this._localVideoTracks;
    }


    getLocalAudioTracks(): Array<AudioTrackPackage> {
        return this._localAudioTracks;
    }

    clearLocalAudioTracks(closeTrack: boolean) {
        for (let i = 0; i < this._localAudioTracks.length; i++) {
            let trackPack = this._localAudioTracks[i];
            let track = trackPack.track as ILocalAudioTrack;
            closeTrack && track.close();
        }
        this._localAudioTracks = [];
    }



    addMainClientLocalAudioTrack(trackPackage: AudioTrackPackage) {
        this._mainClientLocalAudioTracks.push(trackPackage);
    }

    removeMainClientLocalAudioTrack(track: ILocalAudioTrack, closeTrack: boolean) {
        for (let i = 0; i < this._mainClientLocalAudioTracks.length; i++) {
            let trackPackage = this._mainClientLocalAudioTracks[i];
            if (trackPackage.track == track) {
                closeTrack && trackPackage.track.close();
                this._mainClientLocalAudioTracks.splice(i, 1);
            }
        }
    }

    setMainClientLocalVideoTrack(trackPack: VideoTrackPackage) {
        this._mainClientLocalVideoTrack = trackPack;
    }

    clearMainClientLocalVideoTrack(closeTrack: boolean) {
        if (closeTrack) {
            let localTrack = this._mainClientLocalVideoTrack.track as ILocalVideoTrack;
            localTrack.close();
        }
        this._mainClientLocalVideoTrack = null;
    }

    walkAllILocalVideoTrack(fun: WalkILocalVideoPackageTrackFun) {
        if (this._mainClientLocalVideoTrack)
            fun(this._mainClientLocalVideoTrack);

        this._subClientVideoTracks.walkT((channelId: string, uid: UID, trackPack: VideoTrackPackage) => {
            fun(trackPack);
        })

        for (let trackPack of this._localVideoTracks) {
            fun(trackPack);
        }
    }

    //todo 
    addSubClientLocalAudioTrack(connection: RtcConnection, trackPackage: AudioTrackPackage) { }
    //todo 
    removeSubClientLocalAudioTrack(connection: RtcConnection, track: ILocalAudioTrack, closeTrack: boolean) { }
    //todo 
    setSubClientLocalVideoTrack(connection: RtcConnection, trackPack: VideoTrackPackage) { }
    //todo
    clearSubClientLocalVideoTrack(connection: RtcConnection, closeTrack: boolean) { }





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
            if (this._localVideoTracks.length > 0) {
                return {
                    video_track: this._localVideoTracks[0].track,
                    video_frame: this._localVideoTracks[0].track.getCurrentFrameData(),
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
            else if (this._localVideoTracks.length > 0) {
                for (let trackPackage of this._localVideoTracks) {
                    if (trackPackage.type == type) {
                        return {
                            video_track: trackPackage.track,
                            video_frame: trackPackage.track.getCurrentFrameData(),
                            is_new_frame: true, //todo  how to know is a new frame
                            process_err: IRIS_VIDEO_PROCESS_ERR.ERR_OK
                        };
                    }
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

    setMainClient(mainClient: IAgoraRTCClient) {
        this._mainClient = mainClient;
    }

    getMainClient(): IAgoraRTCClient {
        return this._mainClient;
    }

    setMainClientEventHandler(eventHandler: IrisClientEventHandler) {
        this._mainClientEventHandler = eventHandler;
    }

    addMainClientTrackEventHandler(trackEventHandler: IrisTrackEventHandler) {
        this._mainClientTrackEventHandlers.push(trackEventHandler);
    }

    removeMainClientTrackEventHandler(track: ITrack) {
        for (let i = 0; i < this._mainClientTrackEventHandlers.length; i++) {
            let trackEventHander = this._mainClientTrackEventHandlers[i];
            if (trackEventHander.getTrack() == track) {
                trackEventHander.destruction();
                this._mainClientTrackEventHandlers.splice(i, 1);
            }
        }
    }

    //todo
    addSubClientTrackEventHandler(connection: RtcConnection, eventHandler: IrisTrackEventHandler) { }
    //todo
    removeSubClientTrackEventHandler(connection: RtcConnection, track: ITrack) { }


    clearMainClientAll() {
        if (this._mainClient) {

            // this._mainClient.unsubscribe
            //todo destroy client如何 destroy呢
            this._mainClient = null;
        }

        if (this._mainClientEventHandler) {
            this._mainClientEventHandler.destruction();
            this._mainClientEventHandler = null;
        }

        this._mainClientLocalAudioTracks.forEach(element => {
            let track = element.track as ILocalAudioTrack;
            track.close();
        });
        this._mainClientLocalAudioTracks = new Array<AudioTrackPackage>();

        if (this._mainClientLocalVideoTrack) {
            let track = this._mainClientLocalVideoTrack.track as ILocalVideoTrack;
            track.close();
        }
        this._mainClientLocalVideoTrack = null;

        this._mainClientTrackEventHandlers.forEach(element => {
            element.destruction();
        })
        this._mainClientTrackEventHandlers = new Array<IrisTrackEventHandler>();

    }


    addSubClient(connection: agorartc.RtcConnection, client: IAgoraRTCClient) {
        this._subClients.addT(connection.channelId, connection.localUid, client);
    }

    //todo 
    clearSubClientAll(connection: agorartc.RtcConnection) {

    }


    //注意自己的mainClient可能也满足要求哦
    getClient(connection: agorartc.RtcConnection): IAgoraRTCClient {
        if (this._mainClient?.channelName == connection.channelId)
            return this._mainClient;

        return this._subClients.getT(connection.channelId, connection.localUid); 
    }

    getClientsByChannelName(channelName: string): Map<UID, IAgoraRTCClient> {
        return this._subClients.getTs(channelName);
    }

    getSubClient(connection: agorartc.RtcConnection): IAgoraRTCClient {
        return this._subClients.getT(connection.channelId, connection.localUid);
    }

    getSubClients(): Contaniner<IAgoraRTCClient> {
        return this._subClients;
    }

    getSubClientVideoTrack(connection: agorartc.RtcConnection): VideoTrackPackage {
        return this._subClientVideoTracks.getT(connection.channelId, connection.localUid);
    }

    destruction() {
        this._mainClientEventHandler.destruction();
        this._mainClientTrackEventHandlers.forEach((trackEventHandler: IrisTrackEventHandler) => {
            trackEventHandler.destruction();
        })

        //subClient
        this._subClientEventHandlers.walkT((channelId: string, uid: UID, t: IrisClientEventHandler) => {
            t.destruction();
        });
        this._subClientTrackEventHandlers.walkT((channelId: string, uid: UID, t: Array<IrisTrackEventHandler>) => {
            t.forEach((trackEventHandler: IrisTrackEventHandler) => {
                trackEventHandler.destruction();
            })
        })
        this.clearLocalAudioTracks(true);
        this.clearLocalVideoTracks(true);
    }

    //todo  当一个轨道将被close的时候。会去所有保存这个track， 以及trackEvent 的容器里去删除这个track. 记住是所有哦
    //
    audioTrackWillClose(audioTrack: ILocalAudioTrack) {

    }
  //todo
    videoTrackWillClose(videoTrack: ILocalVideoTrack) {

    }

    getLocalAudioTrackType(track: ILocalAudioTrack): IrisAudioSourceType {
        for (let e of this._localAudioTracks) {
            if (e.track == track) {
                return e.type;
            }
        }
        return IrisAudioSourceType.kAudioSourceTypeUnknow;
    }

    getLocalVideoTrackType(track: ILocalVideoTrack): IrisVideoSourceType {
        for (let e of this._localVideoTracks) {
            if (e.track == track) {
                return e.type;
            }
        }
        return IrisVideoSourceType.kVideoSourceTypeUnknown;
    }






}