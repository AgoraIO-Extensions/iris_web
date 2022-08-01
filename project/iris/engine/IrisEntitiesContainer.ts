import { IAgoraRTCClient, UID, IAgoraRTCRemoteUser, ILocalVideoTrack, ILocalAudioTrack, ITrack } from "agora-rtc-sdk-ng";
import { AudioTrackPackage, IrisAudioSourceType, IrisVideoFrameBufferConfig, IrisVideoSourceType, IRIS_VIDEO_PROCESS_ERR, VideoParams, VideoTrackPackage } from "../base/BaseType";
import { IrisClientEventHandler } from "../event_handler/IrisClientEventHandler";
import { IrisTrackEventHandler } from "../event_handler/IrisTrackEventHandler";
import { Contaniner } from "../tool/Contanier";
import { IrisRtcEngine } from "./IrisRtcEngine";
import * as agorartc from '../terra/rtc_types/Index';
import { RtcConnection } from "../terra/rtc_types/Index";
import { AgoraTranslate } from "../tool/AgoraTranslate";
import { AgoraConsole } from "../tool/AgoraConsole";

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

    getRemoteUserByChannelName(channelName: string): Map<UID, IAgoraRTCRemoteUser> {
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

    removeLocalVideoTrack(trackPackage: VideoTrackPackage) {
        for (let i = 0; i < this._localVideoTracks.length; i++) {
            let trackPack = this._localVideoTracks[i];
            if (trackPack == trackPackage) {
                this._localVideoTracks.splice(i, 1);
                break;
            }
        }
    }

    removeLocalVideoTrackByTrack(track: ILocalVideoTrack) {
        for (let i = 0; i < this._localVideoTracks.length; i++) {
            let trackPack = this._localVideoTracks[i];
            if (trackPack.track == track) {
                this._localVideoTracks.splice(i, 1);
                break;
            }
        }
    }

    removeLocalVideoTrackByType(type: IrisVideoSourceType) {
        for (let i = 0; i < this._localVideoTracks.length; i++) {
            let trackPack = this._localVideoTracks[i];
            if (trackPack.type == type) {
                let track: ILocalVideoTrack = trackPack.track as ILocalVideoTrack;
                this._localVideoTracks.splice(i, 1);
                break;
            }
        }
    }

    clearLocalVideoTracks(closeTrack: boolean) {
        if (closeTrack) {
            for (let i = 0; i < this._localVideoTracks.length; i++) {
                let trackPack = this._localVideoTracks[i];
                let track = trackPack.track as ILocalVideoTrack;
                closeTrack && track.close();
            }
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

    removeLocalAudioTrack(trackPackage: AudioTrackPackage) {
        for (let i = 0; i < this._localAudioTracks.length; i++) {
            let trackPack = this._localAudioTracks[i];
            if (trackPack == trackPackage) {
                this._localAudioTracks.splice(i, 1);
                break;
            }
        }
    }

    removeLocalAudioTrackByTrack(track: ILocalAudioTrack) {
        for (let i = 0; i < this._localAudioTracks.length; i++) {
            let trackPack = this._localAudioTracks[i];
            if (trackPack.track == track) {
                this._localAudioTracks.splice(i, 1);
                break;
            }
        }
    }

    removeLocalAudioTrackByType(type: IrisAudioSourceType) {
        for (let i = 0; i < this._localAudioTracks.length; i++) {
            let trackPack = this._localAudioTracks[i];
            if (trackPack.type == type) {
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

    removeMainClientLocalAudioTrack(track: ILocalAudioTrack) {
        for (let i = 0; i < this._mainClientLocalAudioTracks.length; i++) {
            let trackPackage = this._mainClientLocalAudioTracks[i];
            if (trackPackage.track == track) {
                this._mainClientLocalAudioTracks.splice(i, 1);
                break;
            }
        }
    }

    setMainClientLocalVideoTrack(trackPack: VideoTrackPackage) {
        this._mainClientLocalVideoTrack = trackPack;
    }

    clearMainClientLocalVideoTrack() {
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

    addSubClientLocalAudioTrack(connection: RtcConnection, trackPackage: AudioTrackPackage) {
        let array = this._subClientAudioTracks.getT(connection.channelId, connection.localUid);
        if (array == null) {
            array = [];
            this._subClientAudioTracks.addT(connection.channelId, connection.localUid, array);
        }

        array.push(trackPackage);
    }

    removeSubClientLocalAudioTrack(connection: RtcConnection, track: ILocalAudioTrack) {
        let array = this._subClientAudioTracks.getT(connection.channelId, connection.localUid);

        if (array == null)
            return;

        for (let i = 0; i < array.length; i++) {
            let trackPackage = array[i];
            if (trackPackage.track == track) {
                array.splice(i, 1);
                break;
            }
        }
    }


    setSubClientLocalVideoTrack(connection: RtcConnection, trackPack: VideoTrackPackage) {
        this._subClientVideoTracks.addT(connection.channelId, connection.localUid, trackPack);

    }

    clearSubClientLocalVideoTrack(connection: RtcConnection) {
        this._subClientVideoTracks.removeT(connection.channelId, connection.localUid);
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
                break;
            }
        }
    }


    addSubClientTrackEventHandler(connection: RtcConnection, eventHandler: IrisTrackEventHandler) {
        let array = this._subClientTrackEventHandlers.getT(connection.channelId, connection.localUid);
        if (array == null) {
            array = [];
            this._subClientTrackEventHandlers.addT(connection.channelId, connection.localUid, array);
        }
        array.push(eventHandler);
    }

    removeSubClientTrackEventHandler(connection: RtcConnection, track: ITrack) {
        let array = this._subClientTrackEventHandlers.getT(connection.channelId, connection.localUid);
        if (array == null)
            return;

        for (let i = 0; i < array.length; i++) {
            let event = array[i];
            if (event.getTrack() == track) {
                array.splice(i, 1);
                break;
            }
        }
    }


    clearMainClientAll() {
        if (this._mainClient) {
            this._mainClient = null;
        }

        if (this._mainClientEventHandler) {
            this._mainClientEventHandler.destruction();
            this._mainClientEventHandler = null;
        }

        this._mainClientLocalAudioTracks = [];
        this._mainClientLocalVideoTrack = null;

        this._mainClientTrackEventHandlers.forEach(element => {
            element.destruction();
        })
        this._mainClientTrackEventHandlers = [];
    }


    addSubClient(connection: agorartc.RtcConnection, client: IAgoraRTCClient) {
        this._subClients.addT(connection.channelId, connection.localUid, client);
    }


    clearSubClientAll(connection: agorartc.RtcConnection) {
        let channelId = connection.channelId;
        let uid = connection.localUid;

        this._subClients.removeT(channelId, uid);
        this._subClientAudioTracks.removeT(channelId, uid);
        this._subClientVideoTracks.removeT(channelId, uid);
        let trackEventHandlers = this._subClientTrackEventHandlers.getT(channelId, uid);
        if (trackEventHandlers) {
            for (let event of trackEventHandlers) {
                event.destruction();
            }
        }
        this._subClientTrackEventHandlers.removeT(channelId, uid);
    }


    //注意自己的mainClient可能也满足要求哦
    // getAllClient(connection: agorartc.RtcConnection): IAgoraRTCClient {
    //     if (this._mainClient?.channelName == connection.channelId)
    //         return this._mainClient;

    //     return this._subClients.getT(connection.channelId, connection.localUid);
    // }

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


    //  当一个轨道将被close的时候。会去所有保存这个track， 以及trackEvent 的容器里去删除这个track. 记住是所有哦
    audioTrackWillClose(audioTrack: ILocalAudioTrack) {
        //local
        this.removeLocalAudioTrackByTrack(audioTrack);

        //main
        this.removeMainClientLocalAudioTrack(audioTrack);
        this.removeMainClientTrackEventHandler(audioTrack);

        //sub
        this._subClientAudioTracks.walkT((channelId: string, uid: UID, packages: AudioTrackPackage[]) => {
            for (let i = 0; i < packages.length; i++) {
                let pack = packages[i];
                if (pack.track == audioTrack) {
                    packages.splice(i, 1);
                    break;
                }
            }
        });

        this._subClientTrackEventHandlers.walkT((channelId: string, uid: UID, events: IrisTrackEventHandler[]) => {
            for (let i = 0; i < events.length; i++) {
                let event = events[i];
                if (event.getTrack() == audioTrack) {
                    event.destruction();
                    events.splice(i, 1);
                }
            }
        });

    }

    // 当一个轨道将被close的时候。会去所有保存这个track， 以及trackEvent 的容器里去删除这个track. 记住是所有哦
    videoTrackWillClose(videoTrack: ILocalVideoTrack) {
        //local
        this.removeLocalVideoTrackByTrack(videoTrack);

        //main
        if (this._mainClientLocalVideoTrack.track == videoTrack) {
            this._mainClient = null;
        }
        this.removeMainClientTrackEventHandler(videoTrack);


        //sub
        let deleteChannelId: string = null;
        let deleteUid: UID = null;
        this._subClientVideoTracks.walkT((channelId: string, uid: UID, pack: VideoTrackPackage) => {
            if (pack.track == videoTrack) {
                deleteChannelId = channelId;
                deleteUid = uid;
            }
        });
        if (deleteChannelId != null && deleteUid != null) {
            this._subClientAudioTracks.removeT(deleteChannelId, deleteUid);
        }

        this._subClientTrackEventHandlers.walkT((channelId: string, uid: UID, events: IrisTrackEventHandler[]) => {
            for (let i = 0; i < events.length; i++) {
                let event = events[i];
                if (event.getTrack() == videoTrack) {
                    event.destruction();
                    events.splice(i, 1);
                }
            }
        });
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


    //
    async destruction() {

        //mainEvent, mainTrackEvent
        this._mainClientEventHandler.destruction();
        this._mainClientEventHandler = null;
        this._mainClientTrackEventHandlers.forEach((trackEventHandler: IrisTrackEventHandler) => {
            trackEventHandler.destruction();
        })
        this._mainClientTrackEventHandlers = [];

        //subEvent, subTrackEvent
        this._subClientEventHandlers.walkT((channelId: string, uid: UID, t: IrisClientEventHandler) => {
            t.destruction();
        });
        this._subClientEventHandlers = new Contaniner();
        this._subClientTrackEventHandlers.walkT((channelId: string, uid: UID, t: Array<IrisTrackEventHandler>) => {
            t.forEach((trackEventHandler: IrisTrackEventHandler) => {
                trackEventHandler.destruction();
            })
        })
        this._subClientTrackEventHandlers = new Contaniner();

        if (this._mainClient && this._mainClient.channelName) {
            try {
                await this._mainClient.leave();
                AgoraConsole.log("main client leave success");
            }
            catch (e) {
                AgoraConsole.error("mainClient leave failed");
                e && AgoraConsole.error(e);
            }
        }

        let audioTracks = this._subClients.getContaniner();
        for (let e of audioTracks) {
            let map = e[1];
            for (let m of map) {
                let subClient = m[1];
                try {
                    subClient.leave();
                }
                catch (e) {
                    AgoraConsole.error("subClient leave faield");
                    e && AgoraConsole.error(e);
                }
            }
        }

        //leave channel

        this.clearLocalAudioTracks(true);
        this.clearLocalVideoTracks(true);
    }

}