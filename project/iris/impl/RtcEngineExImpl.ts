import { ClientRoleOptions, IAgoraRTCClient, IAgoraRTCRemoteUser, ICameraVideoTrack, ILocalAudioTrack, ILocalVideoTrack, UID } from "agora-rtc-sdk-ng";
import html2canvas from "html2canvas";
import { IrisAudioSourceType, IrisClientType, IrisVideoSourceType } from "../base/BaseType";
import { IrisRtcEngine } from "../engine/IrisRtcEngine";
import { IrisClientEventHandler } from "../event_handler/IrisClientEventHandler";
import { IrisTrackEventHandler } from "../event_handler/IrisTrackEventHandler";
import { IRtcEngineEx } from "../terra/interface/IRtcEngineEx";
import * as agorartc from '../terra/rtc_types/Index';
import { Action } from "../util/AgoraActionQueue";
import { AgoraConsole } from "../util/AgoraConsole";
import { AgoraTool } from "../util/AgoraTool";
import { AgoraTranslate } from "../util/AgoraTranslate";
import { IrisSubClientVariables } from "../variable/IrisSubClientVariables";
import { ImplHelper } from "./ImplHelper";
import { AsyncTaskType, CallApiReturnType, CallIrisApiResult } from "../base/call_api_executor";

export class RtcEngineExImpl implements IRtcEngineEx {
    private _engine: IrisRtcEngine;

    public constructor(engine: IrisRtcEngine) {
        this._engine = engine;
    }

    putAction(action: Action) {
        this._engine.actionQueue.putAction(action);
    }

    private execute(task: AsyncTaskType): CallApiReturnType {
        return this._engine.executor.execute(task);
    }

    joinChannelEx(token: string, connection: agorartc.RtcConnection, options: agorartc.ChannelMediaOptions): number {
        if (connection.localUid == 0) {
            AgoraConsole.warn("connection.localUid cant be zero");
            return -agorartc.ERROR_CODE_TYPE.ERR_INVALID_ARGUMENT;
        }

        this.putAction({
            fun: (token: string, connection: agorartc.RtcConnection, options: agorartc.ChannelMediaOptions, next) => {

                let processJoinChannel = async () => {
                    let subClientVariables: IrisSubClientVariables = this._engine.subClientVariables;
                    let globalVariables = this._engine.globalVariables;
                    let fullOptions = subClientVariables.mergeChannelMediaOptions(connection, options);
                    fullOptions.token = token;

                    let subClient: IAgoraRTCClient = ImplHelper.createSubClient(this._engine, connection);
                    let audioSource = IrisAudioSourceType.kAudioSourceTypeUnknow;
                    let videoSource = IrisVideoSourceType.kVideoSourceTypeUnknown;
                    let clientType = IrisClientType.kClientSub;

                    if (options.publishAudioTrack) {
                        audioSource = IrisAudioSourceType.kAudioSourceTypeMicrophoneSecondary;
                    }
                    else if (options.publishScreenCaptureAudio) {
                        audioSource = IrisAudioSourceType.kAudioSourceTypeScreenPrimary;
                    }

                    if (options.publishCameraTrack) {
                        videoSource = IrisVideoSourceType.kVideoSourceTypeCameraPrimary;
                    }
                    else if (options.publishSecondaryCameraTrack) {
                        videoSource = IrisVideoSourceType.kVideoSourceTypeCameraSecondary;
                    }
                    else if (options.publishScreenTrack || options.publishScreenCaptureVideo) {
                        videoSource = IrisVideoSourceType.kVideoSourceTypeScreenPrimary;
                    }

                    let entitiesContainer = this._engine.entitiesContainer;
                    entitiesContainer.addSubClient(connection, subClient);
                    let subClientEventHandler = new IrisClientEventHandler(subClient, IrisClientType.kClientSub, this._engine);
                    entitiesContainer.addSubClientEventHandler(connection, subClientEventHandler);

                    try {
                        let uid = await subClient.join(globalVariables.appId, connection.channelId, token ? token : null, connection.localUid)
                    }
                    catch (reason) {
                        AgoraConsole.error("join channelEx failed");
                        reason && AgoraConsole.error(reason);
                        this._engine.rtcEngineEventHandler.onError(agorartc.ERROR_CODE_TYPE.ERR_JOIN_CHANNEL_REJECTED, "");
                        this._engine.entitiesContainer.clearSubClientAll(connection);
                        next();
                        return;
                    }
                    this._engine.rtcEngineEventHandler.onJoinChannelSuccessEx(connection, 0);

                    let trackArray: [ILocalAudioTrack, ILocalVideoTrack] = [null, null];
                    try {
                        trackArray = await ImplHelper.getOrCreateAudioAndVideoTrackAsync(this._engine, audioSource, videoSource, clientType, connection);
                    }
                    catch (err) {
                        AgoraConsole.error("create audio And videoTrack failed");
                        err && AgoraConsole.error(err);
                        next();
                        return;
                    }

                    // 推送麦克风audio
                    if (options.publishAudioTrack) {
                        let audioTrackPackage = this._engine.entitiesContainer.getLocalAudioTrackByType(IrisAudioSourceType.kAudioSourceTypeMicrophonePrimary);
                        if (audioTrackPackage) {
                            let audioTrack = audioTrackPackage.track as ILocalAudioTrack;
                            entitiesContainer.addSubClientLocalAudioTrack(connection, { type: audioSource, track: audioTrack });
                            let trackEventHandler: IrisTrackEventHandler = new IrisTrackEventHandler({
                                channelName: connection.channelId,
                                client: subClient,
                                track: audioTrack,
                                trackType: 'ILocalTrack',
                            }, this._engine);
                            entitiesContainer.addSubClientTrackEventHandler(connection, trackEventHandler);

                            try {
                                await subClient.publish(audioTrack)
                            }
                            catch (reason) {
                                AgoraConsole.error("audio track publish failed");
                                AgoraConsole.error(reason);
                                entitiesContainer.removeSubClientTrackEventHandlerByTrack(connection, audioTrack);
                                entitiesContainer.removeSubClientLocalAudioTrack(connection, audioTrack);
                            }
                        }
                    }

                    // 推送屏幕共享audio
                    if (options.publishScreenCaptureAudio) {
                        let audioTrackPackage = this._engine.entitiesContainer.getLocalAudioTrackByType(IrisAudioSourceType.kAudioSourceTypeScreenPrimary);
                        if (audioTrackPackage) {
                            let audioTrack = audioTrackPackage.track as ILocalAudioTrack;
                            entitiesContainer.addSubClientLocalAudioTrack(connection, { type: IrisAudioSourceType.kAudioSourceTypeScreenPrimary, track: audioTrack });
                            let trackEventHandler: IrisTrackEventHandler = new IrisTrackEventHandler({
                                channelName: connection.channelId,
                                client: subClient,
                                track: audioTrack,
                                trackType: 'ILocalTrack',
                            }, this._engine);
                            entitiesContainer.addSubClientTrackEventHandler(connection, trackEventHandler);

                            try {
                                await subClient.publish(audioTrack)
                            }
                            catch (reason) {
                                AgoraConsole.error("screen share audio track publish failed");
                                AgoraConsole.error(reason);
                                entitiesContainer.removeSubClientTrackEventHandlerByTrack(connection, audioTrack);
                                entitiesContainer.removeSubClientLocalAudioTrack(connection, audioTrack);
                            }
                        }
                    }

                    // //推送摄像头video
                    let videoTrack: ILocalVideoTrack = trackArray[1] as ILocalVideoTrack;
                    if (videoTrack) {
                        entitiesContainer.setSubClientLocalVideoTrack(connection, { type: videoSource, track: videoTrack });
                        let trackEventHandler: IrisTrackEventHandler = new IrisTrackEventHandler({
                            channelName: connection.channelId,
                            client: subClient,
                            track: videoTrack,
                            trackType: 'ILocalVideoTrack',
                        }, this._engine);
                        entitiesContainer.addSubClientTrackEventHandler(connection, trackEventHandler);

                        try {
                            await subClient.publish(videoTrack)
                        }
                        catch (reason) {
                            AgoraConsole.error("video track publish failed");
                            AgoraConsole.error(reason);
                            entitiesContainer.removeSubClientTrackEventHandlerByTrack(connection, videoTrack);
                            entitiesContainer.clearSubClientLocalVideoTrack(connection);
                        }
                    }

                    next();
                }

                setTimeout(processJoinChannel, 0);
            },
            args: [token, connection, options]
        })

        return 0;
    }

    leaveChannelEx(connection: agorartc.RtcConnection): number {
        this.putAction({
            fun: (next) => {
                let subClient: IAgoraRTCClient = this._engine.entitiesContainer.getSubClient(connection);
                if (subClient) {
                    subClient.leave()
                        .then(() => {
                            this._engine.rtcEngineEventHandler.onLeaveChannelEx(connection, new agorartc.RtcStats());
                            this._engine.entitiesContainer.clearSubClientAll(connection);
                        })
                        .catch((reason) => {
                            AgoraConsole.error('leaveChannel failed');
                            AgoraConsole.error(reason);
                        })
                        .finally(() => {
                            next();
                        })
                }
                else {
                    next();
                }
            },
            args: []
        })
        return 0;
    }

    updateChannelMediaOptionsEx(options: agorartc.ChannelMediaOptions, connection: agorartc.RtcConnection): number {
        this.putAction({
            fun: (options: agorartc.ChannelMediaOptions, next) => {

                this._engine.subClientVariables.mergeChannelMediaOptions(connection, options);

                //必须先依次 unpublish, 完毕之后，再依次去publish
                let entitiesContainer = this._engine.entitiesContainer;
                let subClient = entitiesContainer.getSubClient(connection);
                if (subClient == null) {
                    next();
                    return;
                }

                let argsUnpublish: Array<[string, IrisAudioSourceType | IrisVideoSourceType, 'audio' | 'video']> = [];
                let argsPublish: Array<[string, IrisAudioSourceType | IrisVideoSourceType, 'audio' | 'video']> = [];

                if (options.publishAudioTrack == false) {
                    argsUnpublish.push(["publishAudioTrack", IrisAudioSourceType.kAudioSourceTypeMicrophonePrimary, 'audio']);
                }
                else if (options.publishAudioTrack == true) {
                    argsPublish.push(['publishAudioTrack', IrisAudioSourceType.kAudioSourceTypeMicrophonePrimary, 'audio']);
                }

                if (options.publishCameraTrack == false) {
                    argsUnpublish.push(["publishCameraTrack", IrisVideoSourceType.kVideoSourceTypeCameraPrimary, 'video']);
                }
                else if (options.publishCameraTrack == true) {
                    argsPublish.push(["publishCameraTrack", IrisVideoSourceType.kVideoSourceTypeCameraPrimary, 'video']);
                }

                if (options.publishSecondaryCameraTrack == false) {
                    argsUnpublish.push(["publishSecondaryCameraTrack", IrisVideoSourceType.kVideoSourceTypeCameraSecondary, 'video']);
                }
                else if (options.publishSecondaryCameraTrack == true) {
                    argsPublish.push(["publishSecondaryCameraTrack", IrisVideoSourceType.kVideoSourceTypeCameraSecondary, 'video']);
                }

                if (options.publishScreenCaptureAudio == false) {
                    argsUnpublish.push(["publishScreenCaptureAudio", IrisAudioSourceType.kAudioSourceTypeScreenPrimary, 'audio']);
                }
                else if (options.publishScreenCaptureAudio == true) {
                    argsPublish.push(["publishScreenCaptureAudio", IrisAudioSourceType.kAudioSourceTypeScreenPrimary, 'audio']);
                }

                if (options.publishScreenTrack == false) {
                    argsUnpublish.push(["publishScreenTrack", IrisVideoSourceType.kVideoSourceTypeScreenPrimary, 'video']);
                }
                else if (options.publishScreenTrack == true) {
                    argsPublish.push(["publishScreenTrack", IrisVideoSourceType.kVideoSourceTypeScreenPrimary, 'video']);
                }

                if (options.publishSecondaryScreenTrack == false) {
                    argsUnpublish.push(["publishSecondaryScreenTrack", IrisVideoSourceType.kVideoSourceTypeScreenSecondary, 'video']);
                }
                else if (options.publishSecondaryScreenTrack == true) {
                    argsPublish.push(["publishSecondaryScreenTrack", IrisVideoSourceType.kVideoSourceTypeScreenSecondary, 'video']);
                }


                let processInSequence = async () => {

                    for (let UnpublishArags of argsUnpublish) {

                        let optionName = UnpublishArags[0];
                        let audioOrVideoType = UnpublishArags[1];
                        let type = UnpublishArags[2];

                        if (type == 'audio') {
                            //unpublish audio
                            let audioPackage = entitiesContainer.getLocalAudioTrackByType(audioOrVideoType as IrisAudioSourceType);
                            if (audioPackage) {
                                let track = audioPackage.track as ILocalAudioTrack;
                                if (subClient.localTracks.indexOf(track) != -1) {
                                    try {
                                        await subClient.unpublish(track)
                                        AgoraConsole.log(optionName + "(false) changed success");
                                        entitiesContainer.removeSubClientTrackEventHandlerByTrack(connection, track);
                                        entitiesContainer.removeSubClientLocalAudioTrack(connection, track);
                                    }
                                    catch (reason) {
                                        AgoraConsole.error(optionName + "(false) changed failed");
                                    }
                                }
                            }
                        }
                        else {
                            //unpublish video
                            let videoPackage = entitiesContainer.getLocalVideoTrackByType(audioOrVideoType as IrisVideoSourceType);
                            if (videoPackage) {
                                let track = videoPackage.track as ILocalVideoTrack;
                                if (subClient.localTracks.indexOf(track) != -1) {
                                    try {
                                        await subClient.unpublish(track)
                                        AgoraConsole.log(optionName + "(false) changed success");
                                        entitiesContainer.removeSubClientTrackEventHandlerByTrack(connection, track);
                                        entitiesContainer.clearSubClientLocalVideoTrack(connection);
                                    }
                                    catch (reason) {
                                        AgoraConsole.error(optionName + "(false) changed failed");
                                    }
                                }
                            }
                        }

                    }

                    for (let publishArags of argsPublish) {
                        let optionName = publishArags[0];
                        let audioOrVideoType = publishArags[1];
                        let type = publishArags[2];
                        if (type == 'audio') {
                            //publish audio 
                            let audioPackage = entitiesContainer.getLocalAudioTrackByType(audioOrVideoType as IrisAudioSourceType);
                            if (audioPackage) {
                                let track = audioPackage.track as ILocalAudioTrack;
                                if (subClient.localTracks.indexOf(track) == -1) {
                                    try {
                                        await subClient.publish(track);
                                        AgoraConsole.log(optionName + "(true) changed success");
                                        let trackEventHandler: IrisTrackEventHandler = new IrisTrackEventHandler({
                                            channelName: subClient.channelName,
                                            client: subClient,
                                            track: track,
                                            trackType: 'ILocalTrack',
                                        }, this._engine);

                                        entitiesContainer.addSubClientTrackEventHandler(connection, trackEventHandler);
                                        entitiesContainer.addSubClientLocalAudioTrack(connection, { type: audioOrVideoType as IrisAudioSourceType, track: track });
                                    }
                                    catch (reason) {
                                        AgoraConsole.error(optionName + "(true) changed failed");
                                    }
                                }
                            }

                        }
                        else {
                            //publish video
                            let videoPackage = entitiesContainer.getLocalVideoTrackByType(audioOrVideoType as IrisVideoSourceType);
                            if (videoPackage) {
                                let track = videoPackage.track as ILocalVideoTrack;
                                if (subClient.localTracks.indexOf(track) == -1) {
                                    try {
                                        await subClient.publish(track);
                                        AgoraConsole.log(optionName + "(true) changed success");
                                        let trackEventHandler: IrisTrackEventHandler = new IrisTrackEventHandler({
                                            channelName: subClient.channelName,
                                            client: subClient,
                                            track: track,
                                            trackType: 'ILocalVideoTrack',
                                        }, this._engine);

                                        entitiesContainer.addSubClientTrackEventHandler(connection, trackEventHandler);
                                        entitiesContainer.setSubClientLocalVideoTrack(connection, { type: audioOrVideoType as IrisVideoSourceType, track: track });
                                    }
                                    catch (reason) {
                                        AgoraConsole.error(optionName + "(true) changed failed");
                                    }
                                }
                            }
                        }
                    }

                    /*
                    clientRoleType?: CLIENT_ROLE_TYPE;
                    audienceLatencyLevel?: AUDIENCE_LATENCY_LEVEL_TYPE;
                    defaultVideoStreamType?: VIDEO_STREAM_TYPE;
                    channelProfile?: CHANNEL_PROFILE_TYPE; 加入频道后client已经被创建了，它的 ChannelProfile（SDK_MODE）就无法改变了
                    token?: string;
                    */
                    if (options.clientRoleType != null) {
                        let roleOptions: ClientRoleOptions = null;
                        if (options.audienceLatencyLevel != null) {
                            roleOptions = AgoraTranslate.agorartcAUDIENCE_LATENCY_LEVEL_TYPE2ClientRoleOptions(options.audienceLatencyLevel);
                        }

                        try {
                            await subClient.setClientRole(
                                AgoraTranslate.agorartcCLIENT_ROLE_TYPE2ClientRole(options.clientRoleType),
                                roleOptions
                            );
                        }
                        catch (e) {
                            AgoraConsole.error("setClientRole failed");
                        }
                    }

                    if (options.token != null) {
                        try {
                            await subClient.renewToken(options.token)
                            //这里的新token已经在 fun 的第一行被保存了
                        }
                        catch (e) {
                            AgoraConsole.error("renewToken failed");
                        }
                    }

                    next();
                }

                setTimeout(processInSequence, 0);
            },
            args: [options]
        });


        return 0;
    }

    setVideoEncoderConfigurationEx(config: agorartc.VideoEncoderConfiguration, connection: agorartc.RtcConnection): number {
        this.putAction({

            fun: (config: agorartc.VideoEncoderConfiguration, connection: agorartc.RtcConnection, next) => {
                this._engine.subClientVariables.videoEncoderConfigurations.addT(connection.channelId, connection.localUid, config);
                // 找到所有subClient 的 ICameraTrack。如果存在则 setEncoderConfiguration（） 一下
                let trackPackage = this._engine.entitiesContainer.getSubClientVideoTrack(connection);
                if (trackPackage && trackPackage.type == IrisVideoSourceType.kVideoSourceTypeCameraPrimary) {
                    let track = trackPackage.track as ICameraVideoTrack;
                    track.setEncoderConfiguration(AgoraTranslate.agorartcVideoEncoderConfiguration2VideoEncoderConfiguration(config))
                        .then(() => {
                            AgoraConsole.log("setVideoEncoderConfigurationEx Success");
                        })
                        .catch((reason) => {
                            AgoraConsole.error("setVideoEncoderConfigurationEx failed");
                            AgoraConsole.error(reason);
                        })
                        .finally(() => {
                            next();
                        });
                }
                else {
                    next();
                }

                //找到所有subClient ILocalVideoTrack。如果已经play过了，则无法设置 VideoEncoderConfiguration.mirrorMode
            },
            args: [config, connection],
        })

        return 0;
    }

    setupRemoteVideoEx(canvas: agorartc.VideoCanvas, connection: agorartc.RtcConnection): CallApiReturnType {
        let processVideoTrack = async (): Promise<CallIrisApiResult> => {
            let holder = { element: canvas.view, channelId: connection.channelId, uid: canvas.uid, type: IrisVideoSourceType.kVideoSourceTypeRemote };
            this._engine.entitiesContainer.addOrUpdateRemoteVideoViewHolder(holder);

            let mainClient = this._engine.entitiesContainer.getMainClient();
            if (mainClient && mainClient.channelName == holder.channelId) {
                for (let remoteUser of mainClient.remoteUsers) {
                    if (remoteUser.uid == holder.uid) {
                        if (remoteUser.videoTrack?.isPlaying == true) {
                            remoteUser.videoTrack.stop();
                        }
                        if (holder.element) {
                            remoteUser.videoTrack?.play(holder.element);
                        }
                        break;
                    }
                }
            }

            let subClients = this._engine.entitiesContainer.getSubClients();
            subClients?.walkT((channel_id, unuseUid, subClient) => {
                if (channel_id == connection.channelId && unuseUid == connection.localUid) {
                    let remoteUsers = subClient.remoteUsers;
                    for (let remoteUser of remoteUsers) {
                        if (remoteUser.uid == holder.uid) {
                            if (remoteUser.videoTrack?.isPlaying == true) {
                                remoteUser.videoTrack.stop();
                            }
                            if (holder.element) {
                                remoteUser.videoTrack?.play(holder.element);
                            }
                        }
                    }
                }
                
            })

            return CallIrisApiResult.success();
        };

        return this.execute(processVideoTrack);
    }

    muteRemoteAudioStreamEx(uid: number, mute: boolean, connection: agorartc.RtcConnection): number {
        this.putAction({
            fun: (uid: number, mute: boolean, connection: agorartc.RtcConnection, next) => {
                let map: Map<UID, boolean> = this._engine.subClientVariables.mutedRemoteAudioStreams.getT(connection.channelId, connection.localUid);
                if (map == null) {
                    map = new Map<UID, boolean>();
                    this._engine.subClientVariables.mutedRemoteAudioStreams.addT(connection.channelId, connection.localUid, map);
                }
                map.set(uid, mute);

                let remoteUser: IAgoraRTCRemoteUser = this._engine.entitiesContainer.getSubClientRemoteUserByUid(uid, connection);
                if (remoteUser) {
                    if (remoteUser.hasAudio && remoteUser.audioTrack) {
                        if (mute == true && remoteUser.audioTrack.isPlaying == true) {
                            remoteUser.audioTrack.stop();
                        }
                        else if (mute == false && remoteUser.audioTrack.isPlaying == false) {
                            remoteUser.audioTrack.play();
                        }
                    }
                }

                next();
            },
            args: [uid, mute, connection]
        });
        return 0;
    }

    muteRemoteVideoStreamEx(uid: number, mute: boolean, connection: agorartc.RtcConnection): number {
        this.putAction({
            fun: (uid: number, mute: boolean, connection: agorartc.RtcConnection, next) => {
                let map: Map<UID, boolean> = this._engine.subClientVariables.mutedRemoteVideoStreams.getT(connection.channelId, connection.localUid);
                if (map == null) {
                    map = new Map<UID, boolean>();
                    this._engine.subClientVariables.mutedRemoteVideoStreams.addT(connection.channelId, connection.localUid, map);
                }
                map.set(uid, mute);

                let remoteUser: IAgoraRTCRemoteUser = this._engine.entitiesContainer.getSubClientRemoteUserByUid(uid, connection);
                if (remoteUser) {
                    if (remoteUser.hasVideo && remoteUser.videoTrack) {
                        if (mute == true && remoteUser.videoTrack.isPlaying == true) {
                            remoteUser.videoTrack.stop();
                        }
                        else if (mute == false && remoteUser.videoTrack.isPlaying == false) {
                            remoteUser.videoTrack.play(this._engine.generateVideoTrackLabelOrHtmlElement(connection.channelId, connection.localUid, IrisVideoSourceType.kVideoSourceTypeRemote));
                        }
                    }
                }

                next();
            },
            args: [uid, mute, connection]
        });

        return 0;
    }

    setRemoteVideoStreamTypeEx(uid: number, streamType: agorartc.VIDEO_STREAM_TYPE, connection: agorartc.RtcConnection): number {
        this.putAction({
            fun: (uid: number, streamType: agorartc.VIDEO_STREAM_TYPE, connection: agorartc.RtcConnection, next) => {
                let map: Map<UID, agorartc.VIDEO_STREAM_TYPE> = this._engine.subClientVariables.remoteVideoStreamTypes.getT(connection.channelId, connection.localUid);
                if (map == null) {
                    map = new Map<UID, agorartc.VIDEO_STREAM_TYPE>();
                    this._engine.subClientVariables.remoteVideoStreamTypes.addT(connection.channelId, connection.localUid, map);
                }
                map.set(uid, streamType);

                let subClient = this._engine.entitiesContainer.getSubClient(connection);
                if (subClient) {
                    subClient.setRemoteVideoStreamType(uid, AgoraTranslate.agorartcVIDEO_STREAM_TYPE2RemoteStreamType(streamType))
                        .then(() => {
                            AgoraConsole.log("setRemoteVideoStreamTypeEx success");
                        })
                        .catch((reason) => {
                            AgoraConsole.error("setRemoteVideoStreamTypeEx failed");
                            AgoraConsole.error(reason);
                        })
                        .finally(() => {
                            next();
                        })

                }
                else {
                    next();
                }
            },
            args: [uid, streamType, connection]
        });
        return 0;
    }

    setSubscribeAudioBlacklistEx(uidList: number[], uidNumber: number, connection: agorartc.RtcConnection): number {
        AgoraConsole.warn("setSubscribeAudioBlacklistEx not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    setSubscribeAudioWhitelistEx(uidList: number[], uidNumber: number, connection: agorartc.RtcConnection): number {
        AgoraConsole.warn("setSubscribeAudioWhitelistEx not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    setSubscribeVideoBlacklistEx(uidList: number[], uidNumber: number, connection: agorartc.RtcConnection): number {
        AgoraConsole.warn("setSubscribeVideoBlacklistEx not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    setSubscribeVideoWhitelistEx(uidList: number[], uidNumber: number, connection: agorartc.RtcConnection): number {
        AgoraConsole.warn("setSubscribeVideoWhitelistEx not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    setRemoteVideoSubscriptionOptionsEx(uid: number, options: agorartc.VideoSubscriptionOptions, connection: agorartc.RtcConnection): number {
        if (options.type != null)
            return this.setRemoteVideoStreamTypeEx(uid, options.type, connection);

        return 0;
    }

    setRemoteVoicePositionEx(uid: number, pan: number, gain: number, connection: agorartc.RtcConnection): number {
        AgoraConsole.warn("setRemoteVoicePositionEx not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    setRemoteUserSpatialAudioParamsEx(uid: number, params: agorartc.SpatialAudioParams, connection: agorartc.RtcConnection): number {
        AgoraConsole.warn("setRemoteUserSpatialAudioParamsEx not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    setRemoteRenderModeEx(uid: number, renderMode: agorartc.RENDER_MODE_TYPE, mirrorMode: agorartc.VIDEO_MIRROR_MODE_TYPE, connection: agorartc.RtcConnection): number {
        AgoraConsole.warn("setRemoteRenderModeEx not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    enableLoopbackRecordingEx(connection: agorartc.RtcConnection, enabled: boolean, deviceName: string): number {
        AgoraConsole.warn("enableLoopbackRecordingEx not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    getConnectionStateEx(connection: agorartc.RtcConnection): agorartc.CONNECTION_STATE_TYPE {
        let client: IAgoraRTCClient = this._engine.entitiesContainer.getSubClient(connection);
        if (client) {
            return AgoraTranslate.ConnectionState2agorartcCONNECTION_STATE_TYPE(client.connectionState);
        }
        else {
            return agorartc.CONNECTION_STATE_TYPE.CONNECTION_STATE_DISCONNECTED;
        }
    }

    enableEncryptionEx(connection: agorartc.RtcConnection, enabled: boolean, config: agorartc.EncryptionConfig): number {
        this.putAction({
            fun: (connection: agorartc.RtcConnection, enabled: boolean, config: agorartc.EncryptionConfig, next) => {

                if (enabled) {
                    let encryptionConfig = {
                        enabled: enabled,
                        config: config
                    };
                    this._engine.subClientVariables.encryptionConfigs.addT(connection.channelId, connection.localUid, encryptionConfig);
                }
                else {
                    this._engine.subClientVariables.encryptionConfigs.removeT(connection.channelId, connection.localUid);
                }

                next();
            },
            args: [connection, enabled, config]
        })

        return 0;
    }

    createDataStreamEx(reliable: boolean, ordered: boolean, connection: agorartc.RtcConnection): number {
        AgoraConsole.warn("createDataStreamEx not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    createDataStreamEx2(config: agorartc.DataStreamConfig, connection: agorartc.RtcConnection): number {
        AgoraConsole.warn("createDataStreamEx2 not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    sendStreamMessageEx(streamId: number, data: string, length: number, connection: agorartc.RtcConnection): number {
        AgoraConsole.warn("sendStreamMessageEx not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    addVideoWatermarkEx(watermarkUrl: string, options: agorartc.WatermarkOptions, connection: agorartc.RtcConnection): number {
        AgoraConsole.warn("addVideoWatermarkEx not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    clearVideoWatermarkEx(connection: agorartc.RtcConnection): number {
        AgoraConsole.warn("clearVideoWatermarkEx not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    sendCustomReportMessageEx(id: string, category: string, event: string, label: string, value: number, connection: agorartc.RtcConnection): number {
        this.putAction({
            fun: (id: string, category: string, event: string, label: string, value: number, connection: agorartc.RtcConnection, next) => {
                let subClient: IAgoraRTCClient = this._engine.entitiesContainer.getSubClient(connection);
                if (subClient) {

                    subClient.sendCustomReportMessage({
                        reportId: id,
                        category: category,
                        event: event,
                        label: label,
                        value: value
                    })
                        .then(() => {
                            AgoraConsole.log("sendCustomReportMessage success");
                        })
                        .catch(() => {
                            AgoraConsole.error("sendCustomReportMessage failed");
                        })
                        .finally(() => {
                            next();
                        })
                }
                else {
                    next();
                }
            },
            args: [id, category, event, label, value, connection]
        })
        return 0;
    }

    enableAudioVolumeIndicationEx(interval: number, smooth: number, reportVad: boolean, connection: agorartc.RtcConnection): number {
        this.putAction({
            fun: (interval: number, smooth: number, reportVad: boolean, connection: agorartc.RtcConnection, next) => {
                //如果当前有client, 那么就client.enableAudioVolumeIndicator()函数设置一下，但是不保存临时变量
                let subClient = this._engine.entitiesContainer.getSubClient(connection);
                if (subClient) {
                    subClient.enableAudioVolumeIndicator();
                }
                else {
                    //如果没有就保存到这个变量，并且在Client被创建的时候去读取一下这个值,只是读取一次哦
                    this._engine.subClientVariables.enabledAudioVolumeIndications.addT(
                        connection.channelId,
                        connection.localUid,
                        {
                            interval,
                            smooth,
                            reportVad
                        });
                }
                next();
            },
            args: [interval, smooth, reportVad, connection]
        })
        return 0;
    }

    getUserInfoByUserAccountEx(userAccount: string, userInfo: agorartc.UserInfo, connection: agorartc.RtcConnection): number {
        AgoraConsole.warn("getUserInfoByUserAccountEx not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    getUserInfoByUidEx(uid: number, userInfo: agorartc.UserInfo, connection: agorartc.RtcConnection): number {
        AgoraConsole.warn("getUserInfoByUidEx not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    setVideoProfileEx(width: number, height: number, frameRate: number, bitrate: number): number {
        AgoraConsole.warn("setVideoProfileEx not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    enableDualStreamModeEx(sourceType: agorartc.VIDEO_SOURCE_TYPE, enabled: boolean, streamConfig: agorartc.SimulcastStreamConfig, connection: agorartc.RtcConnection): number {

        this.putAction({
            fun: (sourceType: agorartc.VIDEO_SOURCE_TYPE, enabled: boolean, streamConfig: agorartc.SimulcastStreamConfig, connection: agorartc.RtcConnection, next) => {

                let map: Map<agorartc.VIDEO_SOURCE_TYPE, { enabled: boolean, streamConfig?: agorartc.SimulcastStreamConfig }> = this._engine.subClientVariables.enabledDualStreamModes.getT(connection.channelId, connection.localUid);
                if (map == null) {
                    map = new Map<agorartc.VIDEO_SOURCE_TYPE, { enabled: boolean, streamConfig?: agorartc.SimulcastStreamConfig }>();
                    this._engine.subClientVariables.enabledDualStreamModes.addT(connection.channelId, connection.localUid, map);
                }
                map.set(sourceType, { enabled: enabled, streamConfig: streamConfig });

                let client: IAgoraRTCClient = this._engine.entitiesContainer.getSubClient(connection);
                let trackPackage = this._engine.entitiesContainer.getSubClientVideoTrack(connection);
                if (client && (trackPackage.type == sourceType as number)) {
                    if (enabled) {
                        streamConfig && client.setLowStreamParameter(AgoraTranslate.agorartcSimulcastStreamConfig2LowStreamParameter(streamConfig));
                        client.enableDualStream()
                            .then(() => {
                                AgoraConsole.log("enableDualStreamModeEx successed");
                            })
                            .catch((reason) => {
                                AgoraConsole.error("enableDualStreamModeEx failed");
                                AgoraConsole.error(reason);
                                this._engine.rtcEngineEventHandler.onError(0, "enableDualStreamModeEx failed");
                            })
                            .finally(() => {
                                next();
                            })
                    }
                    else {
                        client.disableDualStream()
                            .then(() => {
                                AgoraConsole.log("disableDualStreamEx successed");
                            })
                            .catch((reason) => {
                                AgoraConsole.error("disableDualStreamEx failed");
                                AgoraConsole.error(reason);
                                this._engine.rtcEngineEventHandler.onError(0, "disableDualStream failed");
                            })
                            .finally(() => {
                                next();
                            })
                    }
                }
                else {
                    next();
                }
            },
            args: [sourceType, enabled, streamConfig, connection]
        });
        return 0;
    }

    setDualStreamModeEx(sourceType: agorartc.VIDEO_SOURCE_TYPE, mode: agorartc.SIMULCAST_STREAM_MODE, streamConfig: agorartc.SimulcastStreamConfig, connection: agorartc.RtcConnection): number {
        switch (mode) {
            case agorartc.SIMULCAST_STREAM_MODE.DISABLE_SIMULCAST_STREM:
                this.enableDualStreamModeEx(sourceType, false, streamConfig, connection);
                break;
            case agorartc.SIMULCAST_STREAM_MODE.ENABLE_SIMULCAST_STREAM:
                this.enableDualStreamModeEx(sourceType, true, streamConfig, connection);
                break;
        }
        return 0;
    }

    takeSnapshotEx(connection: agorartc.RtcConnection, uid: number, filePath: string): number {

        let videoParams = this._engine.entitiesContainer.getVideoFrame(connection.localUid, connection.channelId);
        if (videoParams) {
            let videoTrack = videoParams.video_track;
            if (videoTrack.isPlaying) {
                let track = videoTrack as any;
                if (track._player && track._player.videoElement) {
                    let videoElement = track._player.videoElement;
                    let fileName = AgoraTool.spliceFileName(filePath);
                    html2canvas(videoElement)
                        .then((canvas) => {
                            AgoraTool.downloadCanvasAsImage(canvas, fileName);
                            this._engine.rtcEngineEventHandler.onSnapshotTakenEx(connection, fileName, canvas.width, canvas.height, 0);
                        })
                        .catch(() => {
                            this._engine.rtcEngineEventHandler.onSnapshotTakenEx(connection, fileName, 0, 0, -agorartc.ERROR_CODE_TYPE.ERR_FAILED);
                        });
                    return 0;
                }
                else {
                    return -agorartc.ERROR_CODE_TYPE.ERR_NOT_READY;
                }
            }
            else {
                return -agorartc.ERROR_CODE_TYPE.ERR_NOT_READY;
            }
        }
        else {
            return -agorartc.ERROR_CODE_TYPE.ERR_NOT_READY;
        }
    }

    //这个接口在400被删除了
    addPublishStreamUrlEx(url: string, transcodingEnabled: boolean, connection: agorartc.RtcConnection): number {
        AgoraConsole.warn("This method is deprecated. Use StartRtmpStreamWithoutTranscoding or StartRtmpStreamWithTranscoding instead according to your needs");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
}