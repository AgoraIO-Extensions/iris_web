import { IAgoraRTCClient, UID, IAgoraRTCRemoteUser, ILocalVideoTrack, ILocalAudioTrack, ITrack } from "agora-rtc-sdk-ng";
import { AudioTrackPackage, IrisAudioSourceType, IrisVideoFrameBufferConfig, IrisVideoSourceType, IRIS_VIDEO_PROCESS_ERR, VideoParams, VideoTrackPackage } from "../base/BaseType";
import { IrisClientEventHandler } from "../event_handler/IrisClientEventHandler";
import { IrisTrackEventHandler } from "../event_handler/IrisTrackEventHandler";
import { Contaniner } from "../tool/Contanier";
import { IrisRtcEngine } from "./IrisRtcEngine";
import * as agorartc from '../terra/rtc_types/Index';
import { Packet } from "../terra/rtc_types/Index";

export type WalkILocalVideoPackageTrackFun = (track: VideoTrackPackage) => void;

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

    //free tracks means not publish
    private _freeLocalAudioTracks: Array<AudioTrackPackage> = new Array<AudioTrackPackage>();
    private _freeLocalVideoTracks: Array<VideoTrackPackage> = new Array<VideoTrackPackage>();



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

    addFreeLocalVideoTrack(trackPackage: VideoTrackPackage) {
        this._freeLocalVideoTracks.push(trackPackage);
    }

    getFreeLocalVideoTrackByType(type: IrisVideoSourceType): VideoTrackPackage {
        for (let trackPack of this._freeLocalVideoTracks) {
            if (trackPack.type == type) {
                return trackPack;
            }
        }
        return null;
    }

    popFreeLocalVideoTrackByType(type: IrisVideoSourceType): VideoTrackPackage {
        for (let i = 0; i < this._freeLocalVideoTracks.length; i++) {
            let trackPack = this._freeLocalVideoTracks[i];
            if (trackPack.type == type) {
                this._freeLocalVideoTracks.splice(i, 1);
                return trackPack;
            }
        }
    }

    removeFreeLocalVideoTrack(trackPackage: VideoTrackPackage, closeTrack: boolean) {
        for (let i = 0; i < this._freeLocalVideoTracks.length; i++) {
            let trackPack = this._freeLocalVideoTracks[i];
            if (trackPack == trackPackage) {
                let track: ILocalVideoTrack = trackPack.track as ILocalVideoTrack;
                closeTrack && track.close();
                this._freeLocalVideoTracks.splice(i, 1);
                break;
            }
        }
    }

    removeFreeLocalVideoTrackByType(type: IrisVideoSourceType, closeTrack: boolean) {
        for (let i = 0; i < this._freeLocalVideoTracks.length; i++) {
            let trackPack = this._freeLocalVideoTracks[i];
            if (trackPack.type == type) {
                let track: ILocalVideoTrack = trackPack.track as ILocalVideoTrack;
                closeTrack && track.close();
                this._freeLocalVideoTracks.splice(i, 1);
                break;
            }
        }
    }

    clearFreeLocalVideoTrack() {
        for (let i = 0; i < this._freeLocalVideoTracks.length; i++) {
            let trackPack = this._freeLocalVideoTracks[i];
            let track = trackPack.track as ILocalVideoTrack;
            track.close();
        }
        this._freeLocalVideoTracks = [];
    }


    addFreeLocalAudioTrack(trackPackage: AudioTrackPackage) {
        this._freeLocalAudioTracks.push(trackPackage);
    }

    getFreeLocalAudioTrackByType(type: IrisAudioSourceType): AudioTrackPackage {
        for (let trackPack of this._freeLocalAudioTracks) {
            if (trackPack.type == type) {
                return trackPack;
            }
        }
        return null;
    }

    removeFreeLocalAudioTrack(trackPackage: AudioTrackPackage, closeTrack: boolean) {
        for (let i = 0; i < this._freeLocalAudioTracks.length; i++) {
            let trackPack = this._freeLocalAudioTracks[i];
            if (trackPack == trackPackage) {
                let track: ILocalAudioTrack = trackPack.track as ILocalAudioTrack;
                closeTrack && track.close();
                this._freeLocalAudioTracks.splice(i, 1);
                break;
            }
        }

    }

    removeFreeLocalAudioTrackByType(type: IrisAudioSourceType, closeTrack: boolean) {
        for (let i = 0; i < this._freeLocalAudioTracks.length; i++) {
            let trackPack = this._freeLocalAudioTracks[i];
            if (trackPack.type == type) {
                let track: ILocalAudioTrack = trackPack.track as ILocalAudioTrack;
                closeTrack && track.close();
                this._freeLocalAudioTracks.splice(i, 1);
                break;
            }
        }
    }

    popFreeLocalAudioTrackByType(type: IrisAudioSourceType): AudioTrackPackage {
        for (let i = 0; i < this._freeLocalAudioTracks.length; i++) {
            let trackPack = this._freeLocalAudioTracks[i];
            if (trackPack.type == type) {
                this._freeLocalAudioTracks.splice(i, 1);
                return trackPack;
            }
        }
    }

    clearFreeLocalAudioTrack() {
        for (let i = 0; i < this._freeLocalAudioTracks.length; i++) {
            let trackPack = this._freeLocalAudioTracks[i];
            let track = trackPack.track as ILocalAudioTrack;
            track.close();
        }
        this._freeLocalAudioTracks = [];
    }

    // moveFreeLocalAudoTrackToMainClientLocalAudioTracks(track: ILocalAudioTrack) {
    //     for (let i = 0; i < this._freeLocalAudioTracks.length; i++) {
    //         let trackPack = this._freeLocalAudioTracks[i];
    //         if (trackPack.track == track) {
    //             this._freeLocalAudioTracks.splice(i, 1);
    //             this._mainClientLocalAudioTracks.push(trackPack);
    //             break;
    //         }
    //     }
    // }

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

    // moveFreeLocalVideoTrackToMainClientLocalVideoTrack(track: ILocalVideoTrack) {
    //     for (let i = 0; i < this._freeLocalVideoTracks.length; i++) {
    //         let trackPack = this._freeLocalVideoTracks[i];
    //         if (trackPack.track == track) {
    //             this._freeLocalVideoTracks.splice(i, 1);
    //             this._mainClientLocalVideoTrack = trackPack;
    //             break;
    //         }
    //     }
    // }

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

        for (let trackPack of this._freeLocalVideoTracks) {
            fun(trackPack);
        }
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
            if (this._freeLocalVideoTracks.length > 0) {
                return {
                    video_track: this._freeLocalVideoTracks[0].track,
                    video_frame: this._freeLocalVideoTracks[0].track.getCurrentFrameData(),
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
            else if (this._freeLocalVideoTracks.length > 0) {
                for (let trackPackage of this._freeLocalVideoTracks) {
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


    //todo 注意自己的mainClient可能也满足要求哦
    getClient(connection: agorartc.RtcConnection): IAgoraRTCClient {
        return null;
    }

    getSubClinets(): Contaniner<IAgoraRTCClient> {
        return this._subClients;
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

    }


}