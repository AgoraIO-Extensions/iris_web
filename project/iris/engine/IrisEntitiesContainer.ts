import { IAgoraRTCClient, UID, IAgoraRTCRemoteUser, ILocalVideoTrack, ILocalAudioTrack, ITrack } from "agora-rtc-sdk-ng";
import { AudioTrackPackage, IrisAudioSourceType, IrisVideoFrameBufferConfig, IrisVideoSourceType, IRIS_VIDEO_PROCESS_ERR, VideoParams, VideoTrackPackage, VideoViewHolder } from "../base/BaseType";
import { IrisClientEventHandler } from "../event_handler/IrisClientEventHandler";
import { IrisTrackEventHandler } from "../event_handler/IrisTrackEventHandler";
import { Contaniner } from "../tool/Contanier";
import { IrisRtcEngine } from "./IrisRtcEngine";
import * as agorartc from '../terra/rtc_types/Index';
import { AgoraTranslate } from "../tool/AgoraTranslate";
import { AgoraConsole } from "../tool/AgoraConsole";
import { AgoraTool } from "../tool/AgoraTool";

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
    private _remoteVideoViewHolders: Array<VideoViewHolder> = new Array<VideoViewHolder>();

    //subClient
    private _subClients: Contaniner<IAgoraRTCClient> = new Contaniner<IAgoraRTCClient>();
    private _subClientEventHandlers: Contaniner<IrisClientEventHandler> = new Contaniner<IrisClientEventHandler>();
    private _subClientAudioTracks: Contaniner<Array<AudioTrackPackage>> = new Contaniner<Array<AudioTrackPackage>>();
    private _subClientVideoTracks: Contaniner<VideoTrackPackage> = new Contaniner<VideoTrackPackage>();
    private _subClientTrackEventHandlers: Contaniner<Array<IrisTrackEventHandler>> = new Contaniner<Array<IrisTrackEventHandler>>();

    //remoteUser 这个地方有问题，不同client的remoterUser要分开存，不然会出现 
    //A, B  先后加入频道1。然后频道中C,D,E加入。此时B离开频道了。导致A应该观察到的C,D,E被删除了。
    //算了，自己不处理了，自己去IAgoraRTCClient里找吧
    // _remoteUsers: Contaniner<IAgoraRTCRemoteUser> = new Contaniner<IAgoraRTCRemoteUser>();


    constructor(engine: IrisRtcEngine) {
        this._engine = engine;
    }

    // getRemoteUser(connection: agorartc.RtcConnection): IAgoraRTCRemoteUser {
    //     return this._remoteUsers.getT(connection.channelId, connection.localUid);
    // }

    // addRemoteUser(connection: agorartc.RtcConnection, remoteUser: IAgoraRTCRemoteUser) {
    //     this._remoteUsers.addT(connection.channelId, connection.localUid, remoteUser);
    // }

    getAllRemoteUsers(): Array<IAgoraRTCRemoteUser> {
        let ret: Array<IAgoraRTCRemoteUser> = [];
        if (this._mainClient && this._mainClient.channelName) {
            AgoraTool.mergeArray(ret, this._mainClient.remoteUsers);
        }

        this._subClients.walkT((channel_id, uid, client) => {
            AgoraTool.mergeArray(ret, client.remoteUsers);
        });

        return ret;
    }

    //这里返回一个数组，是可能我方用A,B,C 同时加入频道1，然后D,E加入。会有三个相同Uid的 remoteUser
    getMainClientRemoteUserByUid(uid: UID): IAgoraRTCRemoteUser {
        if (this._mainClient && this._mainClient.channelName) {
            let remoteUsers = this._mainClient.remoteUsers;
            for (let i = 0; i < remoteUsers.length; i++) {
                if (remoteUsers[i].uid == uid) {
                    return remoteUsers[i];
                }
            }
        }
        return null;
    }

    getSubClientRemoteUserByUid(uid: UID, connection: agorartc.RtcConnection) {
        let subClient = this._subClients.getT(connection.channelId, connection.localUid);
        if (subClient) {
            let remoteUsers = subClient.remoteUsers;
            for (let i = 0; i < remoteUsers.length; i++) {
                if (remoteUsers[i].uid == uid) {
                    return remoteUsers[i];
                }
            }
        }
        return null;
    }

    getAllRemoteUserByUid(uid: UID): Array<IAgoraRTCRemoteUser> {
        let ret: Array<IAgoraRTCRemoteUser> = [];

        if (this._mainClient && this._mainClient.channelName) {
            let remoteUsers = this._mainClient.remoteUsers;
            for (let remoteUser of remoteUsers) {
                if (remoteUser.uid == uid) {
                    ret.push(remoteUser);
                }
            }
        }

        this._subClients.walkT((channel_id, unuseUid, subClient) => {
            let remoteUsers = subClient.remoteUsers;
            for (let remoteUser of remoteUsers) {
                if (remoteUser.uid == uid) {
                    ret.push(remoteUser);
                }
            }
        })

        return ret;
    }

    // getRemoteUserByChannelName(channelName: string): Map<UID, IAgoraRTCRemoteUser> {
    //     return this._remoteUsers.getTs(channelName);
    // }

    //从数组中移除远端用户，并且如果当前轨道监听中有属于这个远端用户的轨道，也一起移除掉。
    removeRemoteUserAndClearTrackEvent(connection: agorartc.RtcConnection, user: IAgoraRTCRemoteUser) {

        // let userInContainer = this._remoteUsers.getT(connection.channelId, connection.localUid);
        // if (userInContainer == user) {
        //     this._remoteUsers.removeT(connection.channelId, connection.localUid);
        // }

        this._mainClientTrackEventHandlers.filter((trackEvent: IrisTrackEventHandler) => {
            if (trackEvent.getRemoteUser() == user) {
                trackEvent.destruction();
                return false;
            }
            return true;
        })

        let subClientTrackEventHandlers = this._subClientTrackEventHandlers.getT(connection.channelId, connection.localUid);
        subClientTrackEventHandlers && subClientTrackEventHandlers.filter((trackEvent: IrisTrackEventHandler) => {
            if (trackEvent.getRemoteUser() == user) {
                trackEvent.destruction();
                return false;
            }
            return true;
        })
    }


    addLocalVideoTrack(trackPackage: VideoTrackPackage) {
        let item = this._localVideoTracks.find((value) => {
            return value.type == trackPackage.type;
        });

        // Update the exist one
        if (item) {
            console.log(`addLocalVideoTrack add to item: ${JSON.stringify(item)}`);
            if (trackPackage.element) {
                item.element = trackPackage.element;
            }
            if (trackPackage.track) {
                item.track = trackPackage.track;
            }
            if (trackPackage.type) {
                item.type = trackPackage.type;
            }

            return;
        }

        console.log(`addLocalVideoTrack add new: ${JSON.stringify(trackPackage)}`);


        this._localVideoTracks.push(trackPackage);
    }

    getLocalVideoTrackByType(type: IrisVideoSourceType): VideoTrackPackage {
        for (let trackPack of this._localVideoTracks) {
            if (trackPack.type == type && trackPack.track) {
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

    getRemoteVideoViewHolders(): Array<VideoViewHolder> {
        return this._remoteVideoViewHolders;
    }

    addOrUpdateRemoteVideoViewHolder(viewHolder: VideoViewHolder) {
        let item = this._remoteVideoViewHolders.find((value) => {
            return value.uid == viewHolder.uid && value.channelId == viewHolder.channelId && value.type == viewHolder.type;
        });

        // Update the exist one
        if (item) {
            console.log(`addOrUpdateRemoteVideoViewHolder add to item: ${JSON.stringify(item)}`);
            if (viewHolder.element) {
                item.element = viewHolder.element;
            }

            if (viewHolder.type) {
                item.type = viewHolder.type;
            }

            if (viewHolder.channelId) {
                item.channelId = viewHolder.channelId;
            }

            if (viewHolder.uid) {
                item.uid = viewHolder.uid;
            }

            return;
        }

        console.log(`addOrUpdateRemoteVideoViewHolder add to item new: ${JSON.stringify(viewHolder)}`);

        this._remoteVideoViewHolders.push(viewHolder);
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

    addSubClientLocalAudioTrack(connection: agorartc.RtcConnection, trackPackage: AudioTrackPackage) {
        let array = this._subClientAudioTracks.getT(connection.channelId, connection.localUid);
        if (array == null) {
            array = [];
            this._subClientAudioTracks.addT(connection.channelId, connection.localUid, array);
        }

        array.push(trackPackage);
    }

    removeSubClientLocalAudioTrack(connection: agorartc.RtcConnection, track: ILocalAudioTrack) {
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


    setSubClientLocalVideoTrack(connection: agorartc.RtcConnection, trackPack: VideoTrackPackage) {
        this._subClientVideoTracks.addT(connection.channelId, connection.localUid, trackPack);

    }

    clearSubClientLocalVideoTrack(connection: agorartc.RtcConnection) {
        this._subClientVideoTracks.removeT(connection.channelId, connection.localUid);
    }

    public getVideoFrame(uid: UID, channel_id: string): VideoParams {
        if (uid == 0) {
            if (this._mainClientLocalVideoTrack) {
                return {
                    video_track: this._mainClientLocalVideoTrack.track,
                    is_new_frame: true, //todo  how to know is a new frame
                    process_err: IRIS_VIDEO_PROCESS_ERR.ERR_OK
                }
            }

            if (this._localVideoTracks.length > 0) {
                let frameData = this._localVideoTracks[0].track.getCurrentFrameData();
                return {
                    video_track: this._localVideoTracks[0].track,
                    is_new_frame: true, //todo  how to know is a new frame
                    process_err: IRIS_VIDEO_PROCESS_ERR.ERR_OK
                }
            }

            return null;

        }
        else {
            //是否是子账户的video
            let subVideoTrack = this._subClientVideoTracks.getT(channel_id, uid);
            if (subVideoTrack) {
                return {
                    video_track: subVideoTrack.track,
                    is_new_frame: true, //todo  how to know is a new frame
                    process_err: IRIS_VIDEO_PROCESS_ERR.ERR_OK
                }
            }

            //是否是主账户的远端用户
            if (this._mainClient && this._mainClient.channelName == channel_id) {
                for (let remoteUser of this._mainClient.remoteUsers) {
                    if (remoteUser.uid == uid && remoteUser.hasVideo && remoteUser.videoTrack) {
                        return {
                            video_track: remoteUser.videoTrack,
                            is_new_frame: true, //todo  how to know is a new frame
                            process_err: IRIS_VIDEO_PROCESS_ERR.ERR_OK
                        }
                    }
                }
            }

            //是否是子账户的远端用户
            let subClients = this._subClients.getTs(channel_id);
            if (subClients) {
                for (let e of subClients) {
                    let subClient = e[1];
                    for (let remoteUser of subClient.remoteUsers) {
                        if (remoteUser.uid == uid && remoteUser.hasVideo && remoteUser.videoTrack) {
                            return {
                                video_track: remoteUser.videoTrack,
                                is_new_frame: true, //todo  how to know is a new frame
                                process_err: IRIS_VIDEO_PROCESS_ERR.ERR_OK
                            }
                        }
                    }
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
                    is_new_frame: true, //todo  how to know is a new frame
                    process_err: IRIS_VIDEO_PROCESS_ERR.ERR_OK
                }
            }
            else if (this._localVideoTracks.length > 0) {
                for (let trackPackage of this._localVideoTracks) {
                    if (trackPackage.type == type) {
                        return {
                            video_track: trackPackage.track,
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
            //是否是子账号的视频流
            let subVideoTrack = this._subClientVideoTracks.getT(channel_id, uid);
            if (subVideoTrack && subVideoTrack.type == type) {
                return {
                    video_track: subVideoTrack.track,
                    is_new_frame: true, //todo  how to know is a new frame
                    process_err: IRIS_VIDEO_PROCESS_ERR.ERR_OK
                }
            }

            //是否是主账户的远端用户
            if (this._mainClient && this._mainClient.channelName == channel_id) {
                for (let remoteUser of this._mainClient.remoteUsers) {
                    if (remoteUser.uid == uid && remoteUser.hasVideo && remoteUser.videoTrack) {
                        return {
                            video_track: remoteUser.videoTrack,
                            is_new_frame: true, //todo  how to know is a new frame
                            process_err: IRIS_VIDEO_PROCESS_ERR.ERR_OK
                        }
                    }
                }
            }

            //是否是子账户的远端用户
            let subClients = this._subClients.getTs(channel_id);
            if (subClients) {
                for (let e of subClients) {
                    let subClient = e[1];
                    for (let remoteUser of subClient.remoteUsers) {
                        if (remoteUser.uid == uid && remoteUser.hasVideo && remoteUser.videoTrack) {
                            return {
                                video_track: remoteUser.videoTrack,
                                is_new_frame: true, //todo  how to know is a new frame
                                process_err: IRIS_VIDEO_PROCESS_ERR.ERR_OK
                            }
                        }
                    }
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

    getMainClientEventHandler(): IrisClientEventHandler {
        return this._mainClientEventHandler;
    }


    addMainClientTrackEventHandler(trackEventHandler: IrisTrackEventHandler) {
        this._mainClientTrackEventHandlers.push(trackEventHandler);
    }

    removeMainClientTrackEventHandlerByTrack(track: ITrack) {
        for (let i = 0; i < this._mainClientTrackEventHandlers.length; i++) {
            let trackEventHander = this._mainClientTrackEventHandlers[i];
            if (trackEventHander.getTrack() == track) {
                trackEventHander.destruction();
                this._mainClientTrackEventHandlers.splice(i, 1);
                break;
            }
        }
    }

    removeMainClientTrackEventHandlerByRemoteUser(user: IAgoraRTCRemoteUser, mediaType: "audio" | "video" | "all") {

        this._mainClientTrackEventHandlers = this._mainClientTrackEventHandlers.filter((trackEventHander: IrisTrackEventHandler) => {
            if (trackEventHander.getRemoteUser() != user)
                return true;

            if (mediaType == "all") {
                trackEventHander.destruction();
                return false;
            }

            if (mediaType == 'audio' && trackEventHander.getTrackType() == "IRemoteTrack") {
                trackEventHander.destruction();
                return false;
            }

            if (mediaType == "video" && trackEventHander.getTrackType() == "IRemoteVideoTrack") {
                trackEventHander.destruction();
                return false;
            }

            return true;
        })
    }

    isMainClientPublishedVideoTrack(): boolean {
        if (this._mainClient) {
            for (let track of this._mainClient.localTracks) {
                if (track.trackMediaType == 'video') {
                    return true;
                }
            }
        }
        return false;
    }


    addSubClientTrackEventHandler(connection: agorartc.RtcConnection, eventHandler: IrisTrackEventHandler) {
        let array = this._subClientTrackEventHandlers.getT(connection.channelId, connection.localUid);
        if (array == null) {
            array = [];
            this._subClientTrackEventHandlers.addT(connection.channelId, connection.localUid, array);
        }
        array.push(eventHandler);
    }



    removeSubClientTrackEventHandlerByTrack(connection: agorartc.RtcConnection, track: ITrack) {
        let array = this._subClientTrackEventHandlers.getT(connection.channelId, connection.localUid);
        if (array == null)
            return;

        for (let i = 0; i < array.length; i++) {
            let event = array[i];
            if (event.getTrack() == track) {
                array[i].destruction();
                array.splice(i, 1);
                break;
            }
        }
    }

    removeSubClientTrackEventHandlerByRemoteUser(connection: agorartc.RtcConnection, user: IAgoraRTCRemoteUser, mediaType: "audio" | "video" | "all") {
        let array = this._subClientTrackEventHandlers.getT(connection.channelId, connection.localUid);
        if (array == null)
            return;

        array = array.filter((trackEventHander: IrisTrackEventHandler) => {
            if (trackEventHander.getRemoteUser() != user)
                return true;

            if (mediaType == "all") {
                trackEventHander.destruction();
                return false;
            }

            if (mediaType == 'audio' && trackEventHander.getTrackType() == "IRemoteTrack") {
                trackEventHander.destruction();
                return false;
            }

            if (mediaType == "video" && trackEventHander.getTrackType() == "IRemoteVideoTrack") {
                trackEventHander.destruction();
                return false;
            }

            return true;
        })

        this._subClientTrackEventHandlers.removeT(connection.channelId, connection.localUid);
        this._subClientTrackEventHandlers.addT(connection.channelId, connection.localUid, array);
    }


    clearMainClientAll(channelId: string) {

        //client
        if (this._mainClient) {
            this._mainClient = null;
        }

        //client event
        if (this._mainClientEventHandler) {
            this._mainClientEventHandler.destruction();
            this._mainClientEventHandler = null;
        }

        //audio,video track
        this._mainClientLocalAudioTracks = [];
        this._mainClientLocalVideoTrack = null;

        //trackEvent
        this._mainClientTrackEventHandlers.forEach(element => {
            element.destruction();
        })
        this._mainClientTrackEventHandlers = [];

        //remoteUser
        // if (channelId != '' && channelId != null) {
        //     this._remoteUsers.removeTs(channelId);
        // }

    }


    addSubClient(connection: agorartc.RtcConnection, client: IAgoraRTCClient) {
        this._subClients.addT(connection.channelId, connection.localUid, client);
    }

    addSubClientEventHandler(connection: agorartc.RtcConnection, clientEventHandler: IrisClientEventHandler) {
        this._subClientEventHandlers.addT(connection.channelId, connection.localUid, clientEventHandler);
    }

    getSubClientEventHandler(connection: agorartc.RtcConnection): IrisClientEventHandler {
        return this._subClientEventHandlers.getT(connection.channelId, connection.localUid);
    }

    clearSubClientAll(connection: agorartc.RtcConnection) {
        let channelId = connection.channelId;
        let uid = connection.localUid;

        //client
        this._subClients.removeT(channelId, uid);

        //client event
        let clientEventHander = this._subClientEventHandlers.getT(channelId, uid);
        clientEventHander && clientEventHander.destruction();
        this._subClientEventHandlers.removeT(channelId, uid);

        //client audio, video track
        this._subClientAudioTracks.removeT(channelId, uid);
        this._subClientVideoTracks.removeT(channelId, uid);


        //client track event
        let trackEventHandlers = this._subClientTrackEventHandlers.getT(channelId, uid);
        if (trackEventHandlers) {
            for (let event of trackEventHandlers) {
                event.destruction();
            }
        }
        this._subClientTrackEventHandlers.removeT(channelId, uid);

        //remoteUser
        // this._remoteUsers.removeTs(connection.channelId);
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


    //  当一个轨道将被close的时候。会去所有保存这个track， 以及trackEvent 的容器里去删除这个track. 并且停止发流 记住是所有哦
    async audioTrackWillClose(audioTrack: ILocalAudioTrack) {
        //local
        this.removeLocalAudioTrackByTrack(audioTrack);

        //main
        this.removeMainClientLocalAudioTrack(audioTrack);
        this.removeMainClientTrackEventHandlerByTrack(audioTrack);
        if (this._mainClient && this._mainClient.localTracks.indexOf(audioTrack) != -1) {
            try {
                await this._mainClient.unpublish(audioTrack)
                AgoraConsole.log("unpublish success");
            }
            catch (e) {
                AgoraConsole.error("unpublish error");
            }
        }

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


        let contaniner = this._subClients.getContaniner();
        for (let e of contaniner) {
            let channelId = e[0];
            let clients = e[1];
            for (let c of clients) {
                let uid = c[0];
                let client = c[1];
                if (client.localTracks.indexOf(audioTrack) != -1) {
                    try {
                        await client.unpublish(audioTrack);
                        AgoraConsole.log("unpublish success");
                    }
                    catch (e) {
                        AgoraConsole.error("unpublish failed");
                    }
                }
            }
        }


    }

    // 当一个轨道将被close的时候。会去所有保存这个track， 以及trackEvent 的容器里去删除这个track. 记住是所有哦
    async videoTrackWillClose(videoTrack: ILocalVideoTrack) {
        //local
        this.removeLocalVideoTrackByTrack(videoTrack);

        //main
        if (this._mainClientLocalVideoTrack?.track == videoTrack) {
            this._mainClientLocalVideoTrack = null;
        }
        this.removeMainClientTrackEventHandlerByTrack(videoTrack);
        if (this._mainClient && this._mainClient.localTracks.indexOf(videoTrack) != -1) {
            try {
                await this._mainClient.unpublish(videoTrack)
                AgoraConsole.log("unpublish success");
            }
            catch (e) {
                AgoraConsole.error("unpublish error");
            }
        }


        //sub 
        let deleteChannelIds: Array<string> = [];
        let deleteUids: Array<UID> = [];
        this._subClientVideoTracks.walkT((channelId: string, uid: UID, pack: VideoTrackPackage) => {
            if (pack.track == videoTrack) {
                deleteChannelIds.push(channelId);
                deleteUids.push(uid);
            }
        });

        for (let i = 0; i < deleteChannelIds.length; i++) {
            let deleteChannelId = deleteChannelIds[i];
            let deleteUid = deleteUids[i];
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

        let contaniner = this._subClients.getContaniner();
        for (let e of contaniner) {
            let channelId = e[0];
            let clients = e[1];
            for (let c of clients) {
                let uid = c[0];
                let client = c[1];
                if (client.localTracks.indexOf(videoTrack) != -1) {
                    try {
                        await client.unpublish(videoTrack);
                        AgoraConsole.log("unpublish success");
                    }
                    catch (e) {
                        AgoraConsole.error("unpublish failed");
                    }
                }
            }
        }

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

    isMainClientOrSubClient(connection: agorartc.RtcConnection): boolean {
        if (this._mainClient
            && this._mainClient.channelName == connection.channelId
            && this._mainClient.uid == connection.localUid) {
            return true;
        }

        if (this.getSubClient(connection) != null) {
            return true;
        }

        return false;
    }

    //
    async destruction() {

        //mainClient 
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
        this._mainClient = null;

        //mainEvent, mainTrackEvent
        if (this._mainClientEventHandler) {
            this._mainClientEventHandler.destruction();
            this._mainClientEventHandler = null;
        }

        this._mainClientTrackEventHandlers.forEach((trackEventHandler: IrisTrackEventHandler) => {
            trackEventHandler.destruction();
        })
        this._mainClientTrackEventHandlers = [];

        //subClient
        let subClients = this._subClients.getContaniner();
        for (let e of subClients) {
            let map = e[1];
            for (let m of map) {
                let subClient = m[1];
                if (subClient.channelName) {
                    try {
                        await subClient.leave();
                        AgoraConsole.log("sub client leave success");
                    }
                    catch (e) {
                        AgoraConsole.error("subClient leave faield");
                        e && AgoraConsole.error(e);
                    }
                }
            }
        }
        this._subClients = new Contaniner();

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

        // this._remoteUsers = new Contaniner();


        this.clearLocalAudioTracks(true);
        this.clearLocalVideoTracks(true);

    }


}