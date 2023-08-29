import * as agorartc from '../terra/rtc_types/Index';
import { IRtcEngine } from '../terra/interface/IRtcEngine';
import { IrisApiEngine } from '../engine/IrisApiEngine';
import { IrisRtcEngine } from '../engine/IrisRtcEngine';
import { Action, AgoraActionQueue } from '../util/AgoraActionQueue';
import { AgoraConsole } from '../util/AgoraConsole';
import AgoraRTC, { CameraVideoTrackInitConfig, ClientConfig, ClientRole, ClientRoleOptions, DeviceInfo, EncryptionMode, IAgoraRTCClient, IAgoraRTCRemoteUser, ICameraVideoTrack, IChannelMediaRelayConfiguration, ILocalAudioTrack, ILocalTrack, ILocalVideoTrack, IMicrophoneAudioTrack, InjectStreamConfig, IRemoteAudioTrack, MicrophoneAudioTrackInitConfig, ScreenVideoTrackInitConfig, UID, VideoPlayerConfig } from 'agora-rtc-sdk-ng';
import { AgoraTranslate } from '../util/AgoraTranslate';
import { IrisGlobalVariables } from '../variable/IrisGlobalVariables';
import { AudioTrackPackage, IrisAudioSourceType, IrisClientType, IrisVideoSourceType, VideoParams, VideoTrackPackage } from '../base/BaseType';
import { RtcConnection, THREAD_PRIORITY_TYPE, VideoTrackInfo } from '../terra/rtc_types/Index';
import { IrisMainClientVariables } from '../variable/IrisMainClientVariables';
import { Argument } from 'webpack';
import { IrisClientEventHandler } from '../event_handler/IrisClientEventHandler';
import { IrisTrackEventHandler } from '../event_handler/IrisTrackEventHandler';
import { IrisSubClientVariables } from '../variable/IrisSubClientVariables';
import html2canvas from 'html2canvas';
import { AgoraTool } from '../util/AgoraTool';
import { ImplHelper } from './ImplHelper';
import { AsyncTaskType, CallApiReturnType, CallIrisApiResult } from '../base/call_api_executor';

export class RtcEngineImpl implements IRtcEngine {

    private _engine: IrisRtcEngine = null;


    constructor(engine: IrisRtcEngine) {
        this._engine = engine;

    }


    public putAction(action: Action) {
        this._engine.actionQueue.putAction(action);
    }

    private execute(task: AsyncTaskType): CallApiReturnType {
        return this._engine.executor.execute(task);
    }

    private returnResult(code: number = 0,
        data: string = '{"result": 0}',): Promise<CallIrisApiResult> {
        return Promise.resolve(new CallIrisApiResult(code, data));
    }

    initialize(context: agorartc.RtcEngineContext): CallApiReturnType {

        let processFunc = async (): Promise<CallIrisApiResult> => {
            console.log('RtcEngineImpl initialize');
            this._engine.globalVariables.appId = context.appId;
            this._engine.mainClientVariables.channelProfile = context.channelProfile;
            this._engine.globalVariables.audioScenario = context.audioScenario;
            this._engine.globalVariables.areaCode = context.areaCode;
            this._engine.globalVariables.enabledLocalVideo = context.enableAudioDevice;

            AgoraRTC.setArea([AgoraTranslate.agorartcAREA_CODE2AREAS(context.areaCode)]);

            if (context.logConfig && context.logConfig.level) {
                AgoraConsole.logLevel = context.logConfig.level;
                let numberLevel: number = AgoraTranslate.agorartcLOG_LEVEL2Number(context.logConfig.level);
                AgoraRTC.setLogLevel(numberLevel);
            }

            let result = AgoraRTC.checkSystemRequirements();
            if (result) {
                AgoraConsole.log("AgoraRTC.checkSystemRequirements return true");
            }
            else {
                AgoraConsole.warn("AgoraRTC.checkSystemRequirements reutrn false");
            }

            //enumerate divice
            // TODO(littlegnal): This is a WebGL specific requirement
            // ImplHelper.enumerateDevices(this._engine)
            //     .then(() => { })
            //     .catch(() => { })
            //     .finally(() => {
            //         this._engine.rtcEngineEventHandler.onDevicesEnumerated();
            //     });

            console.log('RtcEngineImpl initialize 22222');
            return Promise.resolve(new CallIrisApiResult(0, '{"result": 0, "other": 111}'));
        }


        return this.execute(processFunc);
    }

    setAppType(appType: number): CallApiReturnType {


        let processFunc = async (): Promise<CallIrisApiResult> => {
            AgoraRTC.setAppType(appType);
            return Promise.resolve(new CallIrisApiResult(0, '{"result": 0}'));
        }


        return this.execute(processFunc);
    }

    //这个接口在400被删除了
    addPublishStreamUrl(url: string, transcodingEnabled: boolean): number {
        AgoraConsole.warn("This method is deprecated. Use StartRtmpStreamWithoutTranscoding or StartRtmpStreamWithTranscoding instead according to your needs");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    removePublishStreamUrl(url: string): number {
        AgoraConsole.warn("TThis method is deprecated. This method is deprecated. Use StopRtmpStream instead");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    switchChannel(token: string, channel: string): number {
        AgoraConsole.warn("switchChannel not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    pushDirectCdnStreamingCustomVideoFrame(frame: agorartc.ExternalVideoFrame): number {
        AgoraConsole.warn("pushDirectCdnStreamingCustomVideoFrame not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    enableFishCorrection(enabled: boolean, params: agorartc.FishCorrectionParams): number {
        AgoraConsole.warn("enableFishCorrection not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    setLiveTranscoding(transcoding: agorartc.LiveTranscoding) {
        AgoraConsole.warn("This method is deprecated. Use StartRtmpStreamWithoutTranscoding or StartRtmpStreamWithTranscoding instead according to your needs");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }



    release(sync: boolean): CallApiReturnType {
        // this.putAction({
        //     fun: (sync: boolean, next) => {
        //         //client , track, eventHandler 已经在IrisRtcEngine里被释放了。，这里不需要释放
        //         next();
        //     },
        //     args: [sync]
        // })
        // return

        console.log('RtcEngineImpl release');

        let processFunc = async (): Promise<CallIrisApiResult> => {
            await this._engine.entitiesContainer.destruction();

            return CallIrisApiResult.success();
        }

        return this.execute(processFunc);
    }

    queryInterface(iid: agorartc.INTERFACE_ID_TYPE, inter: void): number {
        AgoraConsole.warn("queryInterface not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    releaseScreenCaptureSources(): number {
        AgoraConsole.warn("releaseScreenCaptureSources not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    getVersion(): string {
        return AgoraRTC.VERSION;
    }

    getErrorDescription(code: number): string {
        AgoraConsole.warn("getErrorDescription not supported in this platfrom!");
        return "getErrorDescription not supported in this platfrom!";
    }

    override
    joinChannel(token: string, channelId: string, info: string, uid: number): CallApiReturnType {

        let mvs = this._engine.mainClientVariables;
        let options: agorartc.ChannelMediaOptions = {
            publishCameraTrack: mvs.publishCameraTrack != null ? mvs.publishCameraTrack : true,
            publishSecondaryCameraTrack: mvs.publishSecondaryCameraTrack != null ? mvs.publishSecondaryCameraTrack : false,
            publishAudioTrack: mvs.publishAudioTrack != null ? mvs.publishAudioTrack : true,
            autoSubscribeAudio: mvs.autoSubscribeAudio != null ? mvs.autoSubscribeAudio : true,
            autoSubscribeVideo: mvs.autoSubscribeVideo != null ? mvs.autoSubscribeVideo : true,
            clientRoleType: mvs.clientRoleType != null ? mvs.clientRoleType : agorartc.CLIENT_ROLE_TYPE.CLIENT_ROLE_BROADCASTER,
            defaultVideoStreamType: mvs.defaultVideoStreamType != null ? mvs.defaultVideoStreamType : agorartc.VIDEO_STREAM_TYPE.VIDEO_STREAM_HIGH,
            channelProfile: mvs.channelProfile != null ? mvs.channelProfile : agorartc.CHANNEL_PROFILE_TYPE.CHANNEL_PROFILE_COMMUNICATION,
        };
        return this.joinChannel2(token, channelId, uid, options);
    }

    joinChannel2(token: string, channelId: string, uid: number, options: agorartc.ChannelMediaOptions): CallApiReturnType {
        if (this._engine.mainClientVariables.joinChanneled == true) {
            AgoraConsole.error("already call joinChannel");
            return -agorartc.ERROR_CODE_TYPE.ERR_JOIN_CHANNEL_REJECTED;
        }

        this._engine.mainClientVariables.joinChanneled = true;
        // this.putAction({
        //     fun: (token: string, channelId: string, uid: number, options: agorartc.ChannelMediaOptions, next) => {



        //         setTimeout(processJoinChannel, 0);
        //     },
        //     args: [token, channelId, uid, options]
        // })

        // return 0;

        let processJoinChannel = async (): Promise<CallIrisApiResult> => {
            // this._engine.mainClientVariables.startPreviewed = false;
            let mainClientVariables: IrisMainClientVariables = this._engine.mainClientVariables;
            let globalVariables = this._engine.globalVariables;
            mainClientVariables.mergeChannelMediaOptions(options);
            let mainClient: IAgoraRTCClient = ImplHelper.createMainClient(this._engine);

            //在JoinChannel之前就必须监听client的event，不然在Join过程中触发的回调会丢失呢
            let entitiesContainer = this._engine.entitiesContainer;
            entitiesContainer.setMainClient(mainClient);
            let clientEventHandler = new IrisClientEventHandler(mainClient, IrisClientType.kClientMian, this._engine);
            entitiesContainer.setMainClientEventHandler(clientEventHandler);
            try {
                uid = await mainClient.join(globalVariables.appId, channelId, token ? token : null, uid) as number;
            }
            catch (reason) {
                AgoraConsole.error("join channel failed: join failed");
                reason && AgoraConsole.error(reason);
                this._engine.rtcEngineEventHandler.onError(agorartc.ERROR_CODE_TYPE.ERR_JOIN_CHANNEL_REJECTED, "");
                this._engine.mainClientVariables.joinChanneled = false;
                this._engine.entitiesContainer.clearMainClientAll(null);
                // next();
                return;
            }


            this._engine.mainClientVariables.token = token;

            let audioSource: IrisAudioSourceType = IrisAudioSourceType.kAudioSourceTypeUnknow;
            if (globalVariables.enabledAudio && globalVariables.enabledLocalAudio) {
                if (mainClientVariables.publishAudioTrack) {
                    audioSource = IrisAudioSourceType.kAudioSourceTypeMicrophonePrimary;
                }
            }

            let videoSource: IrisVideoSourceType = IrisVideoSourceType.kVideoSourceTypeUnknown;
            if (globalVariables.enabledVideo && globalVariables.enabledLocalVideo) {
                if (mainClientVariables.publishCameraTrack) {
                    videoSource = IrisVideoSourceType.kVideoSourceTypeCameraPrimary;
                }
                else if (mainClientVariables.publishSecondaryCameraTrack) {
                    videoSource = IrisVideoSourceType.kVideoSourceTypeCameraSecondary;
                }
                else if (mainClientVariables.publishScreenTrack) {
                    videoSource = IrisVideoSourceType.kVideoSourceTypeScreenPrimary;
                }
                else if (mainClientVariables.publishSecondaryScreenTrack) {
                    videoSource = IrisVideoSourceType.kVideoSourceTypeScreenSecondary;
                }
            }

            let clientType = IrisClientType.kClientMian;
            let trackArray: [ILocalAudioTrack, ILocalVideoTrack] = [null, null];
            try {
                trackArray = await ImplHelper.getOrCreateAudioAndVideoTrackAsync(this._engine, audioSource, videoSource, clientType, null);
            }
            catch (e) {
                AgoraConsole.error("create audio And videoTrack failed");
                AgoraConsole.error(e);
                // next();
                return;
            }

            let con: agorartc.RtcConnection = {
                channelId: channelId,
                localUid: mainClient.uid as number
            };
            //joinChannel success咯
            this._engine.rtcEngineEventHandler.onJoinChannelSuccessEx(con, 0);
            //推送麦克风audio
            let audioTrack: IMicrophoneAudioTrack = trackArray[0] as IMicrophoneAudioTrack;
            if (audioTrack) {
                if (mainClientVariables.publishAudioTrack) {
                    entitiesContainer.addMainClientLocalAudioTrack({ type: IrisAudioSourceType.kAudioSourceTypeMicrophonePrimary, track: audioTrack });
                    let trackEventHandler: IrisTrackEventHandler = new IrisTrackEventHandler({
                        channelName: channelId,
                        client: mainClient,
                        track: audioTrack,
                        trackType: 'ILocalTrack',
                    }, this._engine);
                    entitiesContainer.addMainClientTrackEventHandler(trackEventHandler);

                    try {
                        await mainClient.publish(audioTrack)
                    }
                    catch (reason) {
                        AgoraConsole.error("audio track publish failed");
                        AgoraConsole.error(reason);
                        entitiesContainer.removeMainClientTrackEventHandlerByTrack(audioTrack);
                        entitiesContainer.removeMainClientLocalAudioTrack(audioTrack);
                    }
                }

                //推送屏幕共享audio
                if (mainClientVariables.publishScreenCaptureAudio) {
                    let audioTrackPackage = this._engine.entitiesContainer.getLocalAudioTrackByType(IrisAudioSourceType.kAudioSourceTypeScreenPrimary);
                    if (audioTrackPackage) {
                        let audioTrack = audioTrackPackage.track as ILocalAudioTrack;

                        entitiesContainer.addMainClientLocalAudioTrack({ type: IrisAudioSourceType.kAudioSourceTypeScreenPrimary, track: audioTrack });
                        let trackEventHandler: IrisTrackEventHandler = new IrisTrackEventHandler({
                            channelName: channelId,
                            client: mainClient,
                            track: audioTrack,
                            trackType: 'ILocalTrack',
                        }, this._engine);
                        entitiesContainer.addMainClientTrackEventHandler(trackEventHandler);

                        try {
                            await mainClient.publish(audioTrack)
                        }

                        catch (reason) {
                            AgoraConsole.error("screen share audio track publish failed");
                            AgoraConsole.error(reason);
                            entitiesContainer.removeMainClientTrackEventHandlerByTrack(audioTrack);
                            entitiesContainer.removeMainClientLocalAudioTrack(audioTrack);
                        }
                    }
                }
            }

            //推送video
            let videoTrack: ILocalVideoTrack = trackArray[1] as ILocalVideoTrack;
            if (videoTrack) {
                entitiesContainer.setMainClientLocalVideoTrack({ type: videoSource, track: videoTrack });
                let trackEventHandler: IrisTrackEventHandler = new IrisTrackEventHandler({
                    channelName: channelId,
                    client: mainClient,
                    track: videoTrack,
                    trackType: 'ILocalVideoTrack',
                }, this._engine);
                entitiesContainer.addMainClientTrackEventHandler(trackEventHandler);

                try {
                    await mainClient.publish(videoTrack)
                }
                catch (reason) {
                    AgoraConsole.error("video track publish failed");
                    AgoraConsole.error(reason);
                    entitiesContainer.removeMainClientTrackEventHandlerByTrack(videoTrack);
                    entitiesContainer.clearMainClientLocalVideoTrack();
                }
            }

            return this.returnResult();

            // next();
        }

        return this.execute(processJoinChannel);


    }

    updateChannelMediaOptions(options: agorartc.ChannelMediaOptions): number {
        //这个地方有大坑，要小心处理
        this.putAction({
            fun: (options: agorartc.ChannelMediaOptions, next) => {

                this._engine.mainClientVariables.mergeChannelMediaOptions(options);

                //必须先依次 unpublish, 完毕之后，再依次去publish
                let entitiesContainer = this._engine.entitiesContainer;
                let mainClient = entitiesContainer.getMainClient();
                if (mainClient == null) {
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
                                if (mainClient.localTracks.indexOf(track) != -1) {
                                    try {
                                        await mainClient.unpublish(track)
                                        AgoraConsole.log(optionName + "(false) changed success");
                                        entitiesContainer.removeMainClientTrackEventHandlerByTrack(track);
                                        entitiesContainer.removeMainClientLocalAudioTrack(track);
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
                                if (mainClient.localTracks.indexOf(track) != -1) {
                                    try {
                                        await mainClient.unpublish(track)
                                        AgoraConsole.log(optionName + "(false) changed success");
                                        entitiesContainer.removeMainClientTrackEventHandlerByTrack(track);
                                        entitiesContainer.setMainClientLocalVideoTrack(null);
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
                                if (mainClient.localTracks.indexOf(track) == -1) {
                                    try {
                                        await mainClient.publish(track);
                                        AgoraConsole.log(optionName + "(true) changed success");
                                        let trackEventHandler: IrisTrackEventHandler = new IrisTrackEventHandler({
                                            channelName: mainClient.channelName,
                                            client: mainClient,
                                            track: track,
                                            trackType: 'ILocalTrack',
                                        }, this._engine);

                                        entitiesContainer.addMainClientTrackEventHandler(trackEventHandler);
                                        entitiesContainer.addMainClientLocalAudioTrack({ type: audioOrVideoType as IrisAudioSourceType, track: track });
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
                                if (mainClient.localTracks.indexOf(track) == -1) {
                                    try {
                                        await mainClient.publish(track);
                                        AgoraConsole.log(optionName + "(true) changed success");
                                        let trackEventHandler: IrisTrackEventHandler = new IrisTrackEventHandler({
                                            channelName: mainClient.channelName,
                                            client: mainClient,
                                            track: track,
                                            trackType: 'ILocalVideoTrack',
                                        }, this._engine);

                                        entitiesContainer.addMainClientTrackEventHandler(trackEventHandler);
                                        entitiesContainer.setMainClientLocalVideoTrack({ type: audioOrVideoType as IrisVideoSourceType, track: track });
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
                            await mainClient.setClientRole(
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
                            await mainClient.renewToken(options.token);
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

    leaveChannel(): CallApiReturnType {
        let options: agorartc.LeaveChannelOptions = {
            stopAudioMixing: true,
            stopAllEffect: true,
            stopMicrophoneRecording: true
        };
        return this.leaveChannel2(options);
    }

    leaveChannel2(options: agorartc.LeaveChannelOptions): CallApiReturnType {

        // this.putAction({
        //     fun: (options: agorartc.LeaveChannelOptions, next) => {
        //         let mainClient: IAgoraRTCClient = this._engine.entitiesContainer.getMainClient();
        //         if (mainClient) {
        //             //todo 读取 options

        //             //为了防止离开频道后丢失了channelName和uid，所以需要先保存一下
        //             let con: agorartc.RtcConnection = {
        //                 channelId: mainClient.channelName,
        //                 localUid: mainClient.uid as number
        //             };
        //             let channelId = mainClient.channelName;
        //             mainClient.leave()
        //                 .then(() => {
        //                     this._engine.rtcEngineEventHandler.onLeaveChannelEx(con, new agorartc.RtcStats());
        //                     this._engine.entitiesContainer.clearMainClientAll(channelId);
        //                 })
        //                 .catch((reason) => {
        //                     AgoraConsole.error('leaveChannel failed');
        //                     reason && AgoraConsole.error(reason);
        //                     this._engine.rtcEngineEventHandler.onError(agorartc.ERROR_CODE_TYPE.ERR_LEAVE_CHANNEL_REJECTED, "");
        //                 })
        //                 .finally(() => {
        //                     next();
        //                 })
        //         }
        //         else {
        //             next();
        //         }
        //     },
        //     args: [options]
        // })
        // return 0;

        let processFunc: AsyncTaskType = async (): Promise<CallIrisApiResult> => {
            //离开频道啦 稍后处理
            if (this._engine.mainClientVariables.joinChanneled == false) {
                // AgoraConsole.error("you must join channel before you call this method");
                // return CallIrisApiResult.failed(0, -agorartc.ERROR_CODE_TYPE.ERR_FAILED);
                return CallIrisApiResult.success();
            }

            this._engine.mainClientVariables.joinChanneled = false;

            let mainClient: IAgoraRTCClient = this._engine.entitiesContainer.getMainClient();
            if (mainClient) {
                //todo 读取 options

                //为了防止离开频道后丢失了channelName和uid，所以需要先保存一下
                let con: agorartc.RtcConnection = {
                    channelId: mainClient.channelName,
                    localUid: mainClient.uid as number
                };
                let channelId = mainClient.channelName;
                mainClient.leave()
                    .then(() => {
                        this._engine.rtcEngineEventHandler.onLeaveChannelEx(con, new agorartc.RtcStats());
                        this._engine.entitiesContainer.clearMainClientAll(channelId);
                    })
                    .catch((reason) => {
                        AgoraConsole.error('leaveChannel failed');
                        reason && AgoraConsole.error(reason);
                        this._engine.rtcEngineEventHandler.onError(agorartc.ERROR_CODE_TYPE.ERR_LEAVE_CHANNEL_REJECTED, "");
                    })
                    .finally(() => {
                        // next();
                    })
            }
            else {
                // next();
            }

            return CallIrisApiResult.success();
        }

        return this.execute(processFunc);

    }

    renewToken(token: string): number {
        this.putAction({
            fun: (token: string, next) => {
                let mainClient = this._engine.entitiesContainer.getMainClient();
                if (mainClient) {
                    mainClient.renewToken(token)
                        .then(() => {
                            AgoraConsole.log("mainClient renewToken sucess");
                            this._engine.mainClientVariables.token = token;
                        })
                        .catch((reason) => {
                            AgoraConsole.error("mainClient renewToken failed");
                            reason && AgoraConsole.error(reason);
                        })
                }

                this._engine.entitiesContainer.getSubClients().walkT((channelId: string, uid: UID, t: IAgoraRTCClient) => {
                    t.renewToken(token)
                        .then(() => {
                            AgoraConsole.log("subClient renewToken sucess");
                            let connection: RtcConnection = {
                                channelId: channelId,
                                localUid: uid as number
                            };
                            let channelMediaOptions: agorartc.ChannelMediaOptions = {
                                token: token
                            };
                            this._engine.subClientVariables.mergeChannelMediaOptions(connection, channelMediaOptions);
                        })
                        .catch((reason) => {
                            AgoraConsole.error("subClient renewToken failed");
                            reason && AgoraConsole.error(reason);
                        })
                })
                next();
            },
            args: [token]
        });
        return 0;
    }

    //必须在加入频道前前调用这个函数才有效果
    //因为加入频道后()时会创建client
    //加入频道后client已经被创建了，它的 ChannelProfile（SDK_MODE）就无法改变了
    setChannelProfile(profile: agorartc.CHANNEL_PROFILE_TYPE): number {
        this.putAction({
            fun: (profile: agorartc.CHANNEL_PROFILE_TYPE, next) => {
                this._engine.mainClientVariables.channelProfile = profile;
                next();
            },
            args: [profile]
        })
        return 0;
    }

    //可以在加入频道前后调用
    setClientRole(role: agorartc.CLIENT_ROLE_TYPE): CallApiReturnType {
        let options: agorartc.ClientRoleOptions = {
            audienceLatencyLevel: agorartc.AUDIENCE_LATENCY_LEVEL_TYPE.AUDIENCE_LATENCY_LEVEL_ULTRA_LOW_LATENCY,
            stopMicrophoneRecording: false,
            stopPreview: false
        };
        return this.setClientRole2(role, options);
    }

    setClientRole2(role: agorartc.CLIENT_ROLE_TYPE, options: agorartc.ClientRoleOptions): CallApiReturnType {


        // this.putAction({
        //     fun: (role: agorartc.CLIENT_ROLE_TYPE, options: agorartc.ClientRoleOptions, next) => {

        //     },
        //     args: [role, options]
        // })
        // return 0;

        let processFunc = async (): Promise<CallIrisApiResult> => {
            this._engine.mainClientVariables.clientRoleType = role;

            let webRole: ClientRole = AgoraTranslate.agorartcCLIENT_ROLE_TYPE2ClientRole(role);
            let webRoleOptions: ClientRoleOptions = AgoraTranslate.agorartcClientRoleOptions2ClientRoleOptions(options);
            //只有观众才能设置 第二个参数。主播不能设置第二个参数
            this._engine.entitiesContainer.getMainClient()?.setClientRole(
                webRole,
                webRole == "audience" ? webRoleOptions : null
            );

            let audioTrack = this._engine.entitiesContainer.getLocalAudioTrackByType(IrisAudioSourceType.kAudioSourceTypeMicrophonePrimary);
            if (audioTrack) {
                let track = audioTrack.track as IMicrophoneAudioTrack;
                if (options.stopMicrophoneRecording == true && track.muted == false) {
                    track.setMuted(true)
                        .then(() => { })
                        .catch(() => {
                            AgoraConsole.error(" track.setMuted(true) failed");
                        })
                }
                else if (options.stopMicrophoneRecording == false && track.muted == true) {
                    track.setMuted(false)
                        .then(() => { })
                        .catch(() => {
                            AgoraConsole.error(" track.setMuted(false) failed");
                        })
                }
            }

            if (options.stopPreview) {
                //todo 停止预览 暂时不支持
            }

            // next();

            return this.returnResult();
        }

        return this.execute(processFunc);
    }


    startEchoTest(): number {
        AgoraConsole.warn("startEchoTest not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    startEchoTest2(intervalInSeconds: number): number {
        AgoraConsole.warn("startEchoTest with intervalInSeconds not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    startEchoTest3(config: agorartc.EchoTestConfiguration): number {
        AgoraConsole.warn("startEchoTest with config not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    stopEchoTest(): number {
        AgoraConsole.warn("stopEchoTest not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    startPreview(): CallApiReturnType {
        return this.startPreview2(agorartc.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA);
    }

    startPreview2(sourceType: agorartc.VIDEO_SOURCE_TYPE): CallApiReturnType {
        // this.putAction({

        //     fun: (sourceType: agorartc.VIDEO_SOURCE_TYPE, next) => {



        //         setTimeout(process, 0);


        //         // this.getOrCreateAudioAndVideoTrack(
        //         //     audioSource,
        //         //     videoSource,
        //         //     IrisClientType.kClientMian,
        //         //     (err: any, trackArray: [ILocalAudioTrack, ILocalVideoTrack]) => {
        //         //         if (err) {
        //         //             AgoraConsole.error("Start preview failed: create video and audio track failed");
        //         //             AgoraConsole.error(err);
        //         //             this._engine.mainClientVariables.startPreviewed = false;
        //         //         }
        //         //         else {
        //         //             let audioTrack = trackArray[0];
        //         //             let videoTrack = trackArray[1];
        //         //             AgoraConsole.log("start preview createCameraVideoTrack success");
        //         //         }
        //         //         next();
        //         //     }
        //         // )
        //     },
        //     args: [sourceType]
        // })
        // return 0;





        let process = async (): Promise<CallIrisApiResult> => {
            if (this._engine.globalVariables.enabledVideo == false) {
                AgoraConsole.error("call enableVideo(true) before startPreview");
                // next();
                return;
            }

            // if (this._engine.mainClientVariables.startPreviewed == true) {
            //     AgoraConsole.error("you already call startPreview");
            //     next();
            //     return;
            // }

            if (sourceType >= 4) {
                AgoraConsole.error("Invalid source type");
                // next();
                return;
            }

            // this._engine.mainClientVariables.startPreviewed = true;

            let audioSource: IrisAudioSourceType = IrisAudioSourceType.kAudioSourceTypeUnknow;
            let videoSource: IrisVideoSourceType = sourceType as number;

            console.log(`startPreview2 videoSource: ${videoSource}`);

            try {
                await ImplHelper.getOrCreateAudioAndVideoTrackAsync(this._engine, audioSource, videoSource, IrisClientType.kClientMian, null);

                let trackPackages = this._engine.entitiesContainer.getLocalVideoTracks();
                for (let trackPackage of trackPackages) {
                    let track = trackPackage.track as ILocalVideoTrack;
                    if (!track) {
                        continue;
                    }

                    if (track.enabled == false) {
                        try {
                            await track.setEnabled(true);
                        }
                        catch (e) {
                            AgoraConsole.error('ILocalVideoTrack setEnable(true) failed');
                            AgoraConsole.error(e);
                        }
                    }

                    if (track.isPlaying) {
                        track.stop();
                    }

                    if (trackPackage.element) {
                        track.play(trackPackage.element);
                    }
                }

                AgoraConsole.log("start preview createCameraVideoTrack success");
            }
            catch (err) {
                AgoraConsole.error("Start preview failed: create video and audio track failed");
                err && AgoraConsole.error(err);
                // this._engine.mainClientVariables.startPreviewed = false;
            }
            // next();

            return this.returnResult();
        }

        return this.execute(process);
    }



    stopPreview(): number {
        return this.stopPreview2(agorartc.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA);
    }

    stopPreview2(sourceType: agorartc.VIDEO_SOURCE_TYPE): number {
        // if (this._engine.mainClientVariables.startPreviewed == false) {
        //     AgoraConsole.error("not call startPreview yet!");
        //     return -agorartc.ERROR_CODE_TYPE.ERR_FAILED;
        // }
        // else {
        // this._engine.mainClientVariables.startPreviewed = false;
        this.putAction({
            fun: (sourceType: agorartc.VIDEO_SOURCE_TYPE, next) => {
                //让音视频轨道暂停即可
                let audioSource: IrisAudioSourceType = IrisAudioSourceType.kAudioSourceTypeUnknow;
                let videoSource: IrisVideoSourceType = IrisVideoSourceType.kVideoSourceTypeUnknown;
                if (sourceType == agorartc.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA_PRIMARY) {
                    audioSource = IrisAudioSourceType.kAudioSourceTypeMicrophonePrimary;
                    videoSource = IrisVideoSourceType.kVideoSourceTypeCameraPrimary;
                }
                else if (sourceType == agorartc.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_SCREEN_PRIMARY) {
                    audioSource = IrisAudioSourceType.kAudioSourceTypeScreenPrimary;
                    videoSource = IrisVideoSourceType.kVideoSourceTypeScreenPrimary;
                }

                let audioTrackPackage = this._engine.entitiesContainer.getLocalAudioTrackByType(audioSource);
                if (audioTrackPackage) {
                    let audioTrack = audioTrackPackage.track as ILocalAudioTrack;
                    if (audioTrack.enabled) {
                        audioTrack.setEnabled(false)
                            .then(() => { }).catch(() => { })
                    }
                }

                let videoTrackPackage = this._engine.entitiesContainer.getLocalVideoTrackByType(videoSource);
                if (videoTrackPackage) {
                    let videoTrack = videoTrackPackage.track as ILocalVideoTrack;
                    if (videoTrack.enabled) {
                        videoTrack.setEnabled(false)
                            .then(() => { }).catch(() => { })
                    }
                }

                next();
            },
            args: [sourceType]
        })
        // }
        return 0;
    }

    startLastmileProbeTest(config: agorartc.LastmileProbeConfig): number {
        AgoraConsole.warn("startLastmileProbeTest with config not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    stopLastmileProbeTest(): number {
        AgoraConsole.warn("stopLastmileProbeTest not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    setVideoEncoderConfiguration(config: agorartc.VideoEncoderConfiguration): number {
        this.putAction({
            fun: (config: agorartc.VideoEncoderConfiguration, next) => {
                this._engine.globalVariables.videoEncoderConfiguration = config;
                this._engine.mainClientVariables.videoEncoderConfiguration = config;
                //todo 找到所有mainClient 的 ICameraTrack。如果存在则 setEncoderConfiguration（） 一下
                let videoTrack = this._engine.entitiesContainer.getLocalVideoTrackByType(IrisVideoSourceType.kVideoSourceTypeCameraPrimary);
                if (videoTrack) {
                    let track = videoTrack.track as ICameraVideoTrack;
                    track.setEncoderConfiguration(AgoraTranslate.agorartcVideoEncoderConfiguration2VideoEncoderConfiguration(config))
                        .then(() => {
                            AgoraConsole.log("setEncoderConfiguration success");
                        })
                        .catch((reason) => {
                            AgoraConsole.error("setEncoderConfiguration failed");
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
            args: [config],
        })

        return 0;
    }


    //美颜其实是支持的，这个版本先不做
    setBeautyEffectOptions(enabled: boolean, options: agorartc.BeautyOptions, type: agorartc.MEDIA_SOURCE_TYPE): number {
        AgoraConsole.warn("setBeautyEffectOptions not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    setLowlightEnhanceOptions(enabled: boolean, options: agorartc.LowlightEnhanceOptions, type: agorartc.MEDIA_SOURCE_TYPE): number {
        AgoraConsole.warn("setLowlightEnhanceOptions not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    setVideoDenoiserOptions(enabled: boolean, options: agorartc.VideoDenoiserOptions, type: agorartc.MEDIA_SOURCE_TYPE): number {
        AgoraConsole.warn("setVideoDenoiserOptions not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    setColorEnhanceOptions(enabled: boolean, options: agorartc.ColorEnhanceOptions, type: agorartc.MEDIA_SOURCE_TYPE): number {
        AgoraConsole.warn("setColorEnhanceOptions not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    enableVirtualBackground(enabled: boolean, backgroundSource: agorartc.VirtualBackgroundSource): number {
        AgoraConsole.warn("setColorEnhanceOptions not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    enableRemoteSuperResolution(userId: number, enable: boolean): number {
        AgoraConsole.warn("enableRemoteSuperResolution not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    setupRemoteVideo(canvas: agorartc.VideoCanvas): number {
        AgoraConsole.warn("setupRemoteVideo not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    setupLocalVideo(canvas: agorartc.VideoCanvas): CallApiReturnType {
        // AgoraConsole.warn("setupLocalVideo not supported in this platfrom!");
        // return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;

        let processVideoTrack = async (): Promise<CallIrisApiResult> => {
            //找到本端video
            // if (this._engine.globalVariables.enabledVideo) {



            // }

            this._engine.entitiesContainer.addLocalVideoTrack({ element: canvas.view, type: IrisVideoSourceType.kVideoSourceTypeCameraPrimary });

            let trackPackages = this._engine.entitiesContainer.getLocalVideoTracks();
            for (let trackPackage of trackPackages) {
                let track = trackPackage.track as ILocalVideoTrack;
                if (!track) {
                    continue;
                }

                if (track.enabled == false) {
                    try {
                        await track.setEnabled(true);
                    }
                    catch (e) {
                        AgoraConsole.error('ILocalVideoTrack setEnable(true) failed');
                        AgoraConsole.error(e);
                    }
                }

                if (track.isPlaying) {
                    track.stop();
                }

                track.play(trackPackage.element);

            }

            return this.returnResult();
        };

        return this.execute(processVideoTrack);

    }

    enableAudio(): CallApiReturnType {
        // this.putAction({
        //     fun: (next) => {



        //         setTimeout(processAudioTracks, 0);

        //     },
        //     args: []
        // })

        // return 0;

        let processAudioTracks = async (): Promise<CallIrisApiResult> => {
            this._engine.globalVariables.enabledAudio = true;
            //找到本地audio
            let trackPackages = this._engine.entitiesContainer.getLocalAudioTracks();
            for (let trackPackage of trackPackages) {
                let track = trackPackage.track as ILocalAudioTrack;
                if (track.enabled == false) {
                    try {
                        await track.setEnabled(true);
                    }
                    catch (e) {
                        AgoraConsole.error('track setEnable(true) failed');
                        AgoraConsole.error(e);
                    }
                }
            }

            //找到远端audio
            let remoteUsers = this._engine.entitiesContainer.getAllRemoteUsers();
            for (let remoteUser of remoteUsers) {
                if (remoteUser.audioTrack && remoteUser.audioTrack.isPlaying == false) {
                    remoteUser.audioTrack.play();
                }
            }

            return this.returnResult();

            // next();
        }

        return this.execute(processAudioTracks);
    }

    disableAudio(): number {

        this.putAction({
            fun: (next) => {

                let processAudioTracks = async () => {
                    this._engine.globalVariables.enabledAudio = false;
                    //找到本地audio
                    let trackPackages = this._engine.entitiesContainer.getLocalAudioTracks();
                    for (let trackPackage of trackPackages) {
                        let track = trackPackage.track as ILocalAudioTrack;
                        if (track.enabled == true) {
                            try {
                                await track.setEnabled(false);
                            }
                            catch (e) {
                                AgoraConsole.error('track setEnable(true) failed');
                                AgoraConsole.error(e);
                            }
                        }
                    }

                    //找到远端audio
                    let remoteUsers = this._engine.entitiesContainer.getAllRemoteUsers();
                    for (let remoteUser of remoteUsers) {
                        if (remoteUser.audioTrack && remoteUser.audioTrack.isPlaying) {
                            remoteUser.audioTrack.stop();
                        }
                    }

                    next();
                }

                setTimeout(processAudioTracks, 0);

            },
            args: [],
        });
        return 0;
    }

    setAudioProfile(profile: agorartc.AUDIO_PROFILE_TYPE, scenario: agorartc.AUDIO_SCENARIO_TYPE): CallApiReturnType {

        // this.putAction({

        //     fun: (profile: agorartc.AUDIO_PROFILE_TYPE, scenario: agorartc.AUDIO_SCENARIO_TYPE, next) => {
        //         this._engine.globalVariables.audioProfile = profile;
        //         this._engine.globalVariables.audioScenario = scenario;
        //         //todo 是否需要去设置当前所有音频属性
        //         next();
        //     },
        //     args: [profile, scenario]
        // })
        // return 0;

        let processFunc = async (): Promise<CallIrisApiResult> => {
            this._engine.globalVariables.audioProfile = profile;
            this._engine.globalVariables.audioScenario = scenario;

            return this.returnResult();
        };

        return this.execute(processFunc);
    }

    setAudioProfile2(profile: agorartc.AUDIO_PROFILE_TYPE): CallApiReturnType {
        // this.putAction({
        //     fun: (profile: agorartc.AUDIO_PROFILE_TYPE, next) => {
        //         this._engine.globalVariables.audioProfile = profile;
        //         //todo  是否需要去设置当前所有音频属性 目前找不到这个设置

        //         next();
        //     },
        //     args: [profile]
        // });
        // return 0;

        let processFunc = async (): Promise<CallIrisApiResult> => {
            this._engine.globalVariables.audioProfile = profile;
            //todo  是否需要去设置当前所有音频属性 目前找不到这个设置

            return this.returnResult();
        };

        return this.execute(processFunc);
    }

    setAudioScenario(scenario: agorartc.AUDIO_SCENARIO_TYPE): number {
        this.putAction({
            fun: (scenario: agorartc.AUDIO_SCENARIO_TYPE, next) => {
                this._engine.globalVariables.audioScenario = scenario;

                //todo  是否需要实时的改变音频属性 如果需要，这个操作要丢到丢列里）目前找不到这个设置
                next();
            },
            args: [scenario]
        })
        return 0;
    }

    enableLocalAudio(enabled: boolean): number {
        this.putAction({
            fun: (enabled: boolean, next) => {
                let processAudioTracks = async () => {
                    this._engine.globalVariables.enabledLocalAudio = enabled;
                    //找到本地audio
                    let trackPackages = this._engine.entitiesContainer.getLocalAudioTracks();
                    for (let trackPackage of trackPackages) {
                        let track = trackPackage.track as ILocalAudioTrack;
                        if (track.enabled != enabled) {
                            try {
                                await track.setEnabled(enabled);
                            }
                            catch (e) {
                                AgoraConsole.error('ILocalAudioTrack setEnable{' + enabled + '} failed');
                                AgoraConsole.error(e);
                            }
                        }
                    }
                    next();
                }

                setTimeout(processAudioTracks, 0);
            },
            args: [enabled]
        });


        return 0;
    }

    muteLocalAudioStream(mute: boolean): number {
        this.putAction({
            fun: (mute: boolean, next) => {

                let processAudioTracks = async () => {
                    this._engine.globalVariables.mutedLocalAudioStream = mute;
                    //找到本地audio
                    let trackPackages = this._engine.entitiesContainer.getLocalAudioTracks();
                    for (let trackPackage of trackPackages) {
                        let track = trackPackage.track as ILocalAudioTrack;
                        if (track.muted == false && mute == true) {
                            try {
                                await track.setMuted(true);
                            }
                            catch (e) {
                                AgoraConsole.error('track setMuted(true) failed');
                                AgoraConsole.error(e);
                            }
                        }
                        else if (track.muted == true && mute == false) {
                            try {
                                await track.setMuted(false);
                            }
                            catch (e) {
                                AgoraConsole.error('track setMuted(false) failed');
                                AgoraConsole.error(e);
                            }
                        }
                    }
                    next();
                }

                setTimeout(processAudioTracks, 0);
            },
            args: [mute]
        });


        return 0;
    }

    muteAllRemoteAudioStreams(mute: boolean): number {
        this.putAction({
            fun: (mute: boolean, next) => {

                //找到远端audio 
                let remoteUsers = this._engine.entitiesContainer.getAllRemoteUsers();
                for (let remoteUser of remoteUsers) {
                    if (remoteUser.audioTrack) {
                        if (remoteUser.audioTrack.isPlaying == true && mute == true) {
                            remoteUser.audioTrack.stop();
                        }
                        else if (remoteUser.audioTrack.isPlaying == false && mute == false) {
                            remoteUser.audioTrack.play();
                        }
                    }
                }
                next();

            },
            args: [mute]
        });


        return 0;
    }

    setDefaultMuteAllRemoteAudioStreams(mute: boolean): number {
        this.putAction({
            fun: (mute: boolean, next) => {

                this._engine.globalVariables.defaultMutedAllRemoteAudioStreams = mute;
                this._engine.mainClientVariables.mutedRemoteAudioStreams.clear();
                //应该不需要实时的去改变订阅状态
                next();
            },
            args: [mute]
        });
        return 0;
    }

    muteRemoteAudioStream(uid: number, mute: boolean): number {
        this.putAction({
            fun: (uid: number, mute: boolean, next) => {

                this._engine.mainClientVariables.mutedRemoteAudioStreams.set(uid, mute);
                let channelName = this._engine.entitiesContainer.getMainClient()?.channelName;
                if (channelName) {
                    let remoteUser: IAgoraRTCRemoteUser = this._engine.entitiesContainer.getMainClientRemoteUserByUid(uid);
                    if (remoteUser && remoteUser.audioTrack) {
                        if (remoteUser.audioTrack.isPlaying == true && mute == true) {
                            remoteUser.audioTrack.stop();
                        }
                        else if (remoteUser.audioTrack.isPlaying == false && mute == false) {
                            remoteUser.audioTrack.play();
                        }
                    }
                }
                next();
            },
            args: [uid, mute]
        });
        return 0;
    }

    enableVideo(): CallApiReturnType {
        // this.putAction({
        //     fun: (next) => {


        //         setTimeout(processVideoTrack, 0);
        //     },
        //     args: []
        // })

        // return 0;

        let processVideoTrack = async (): Promise<CallIrisApiResult> => {
            this._engine.globalVariables.enabledVideo = true;

            //找到本端video
            if (this._engine.globalVariables.enabledLocalVideo) {
                let trackPackages = this._engine.entitiesContainer.getLocalVideoTracks();
                for (let trackPackage of trackPackages) {

                    if (!trackPackage.track) {
                        continue;
                    }

                    let track = trackPackage.track as ILocalVideoTrack;
                    if (track.isPlaying == false) {
                        try {
                            // TODO(littlegnal): This is a WebGL specific requirement
                            // await track.play(this._engine.generateVideoTrackLabelOrHtmlElement("", 0, trackPackage.type));
                        }
                        catch (e) {
                            AgoraConsole.error('ILocalVideoTrack play(true) failed');
                            AgoraConsole.error(e);
                        }
                    }
                    if (track.enabled == false) {
                        try {
                            await track.setEnabled(true);
                        }
                        catch (e) {
                            AgoraConsole.error('ILocalVideoTrack setEnable(true) failed');
                            AgoraConsole.error(e);
                        }
                    }
                }
            }

            //找到远端video
            //mainClient的远端用户
            let entitiesContainer = this._engine.entitiesContainer;
            let mainClient = entitiesContainer.getMainClient();
            if (mainClient && mainClient.channelName) {
                let remoteUsers = mainClient.remoteUsers;
                for (let remoteUser of remoteUsers) {
                    //todo 远端用户发流的时候。我不订阅，那么他的hasVideo为true， 但是他们的videoTrack是null
                    if (remoteUser.hasVideo && remoteUser.videoTrack && remoteUser.videoTrack.isPlaying == false) {
                        // TODO(littlegnal): This is a WebGL specific requirement
                        // remoteUser.videoTrack.play(this._engine.generateVideoTrackLabelOrHtmlElement(mainClient.channelName, remoteUser.uid as number, IrisVideoSourceType.kVideoSourceTypeRemote))
                    }
                }
            }

            //subClient的远端用户
            entitiesContainer.getSubClients().walkT((channel_id, uid, subClient) => {
                let remoteUsers = subClient.remoteUsers;
                for (let remoteUser of remoteUsers) {
                    if (remoteUser.hasVideo && remoteUser.videoTrack && remoteUser.videoTrack.isPlaying == false) {
                        // TODO(littlegnal): This is a WebGL specific requirement
                        // remoteUser.videoTrack.play(this._engine.generateVideoTrackLabelOrHtmlElement(mainClient.channelName, remoteUser.uid as number, IrisVideoSourceType.kVideoSourceTypeRemote))
                    }
                }
            })

            // next();

            return this.returnResult();
        };

        return this.execute(processVideoTrack);
    }

    disableVideo(): number {
        this.putAction({
            fun: (next) => {

                let processVideoTrack = async () => {
                    this._engine.globalVariables.enabledVideo = false;

                    //todo 一股脑的全部enable或者disable是否合理?
                    //找到本端video
                    let trackPackages = this._engine.entitiesContainer.getLocalVideoTracks();
                    for (let trackPackage of trackPackages) {
                        let track = trackPackage.track as ILocalVideoTrack;
                        if (track.enabled == true) {
                            try {
                                await track.setEnabled(false);
                            }
                            catch (e) {
                                AgoraConsole.error('ILocalVideoTrack setEnable(false) failed');
                                AgoraConsole.error(e);
                            }
                        }
                    }


                    //mainClient的远端用户
                    let entitiesContainer = this._engine.entitiesContainer;
                    let mainClient = entitiesContainer.getMainClient();
                    if (mainClient && mainClient.channelName) {
                        let remoteUsers = mainClient.remoteUsers;
                        for (let remoteUser of remoteUsers) {
                            //todo 远端用户发流的时候。我不订阅，那么他的hasVideo为true， 但是他们的videoTrack是null
                            if (remoteUser.hasVideo && remoteUser.videoTrack && remoteUser.videoTrack.isPlaying) {
                                remoteUser.videoTrack.stop()
                            }
                        }
                    }

                    //subClient的远端用户
                    entitiesContainer.getSubClients().walkT((channel_id, uid, subClient) => {
                        let remoteUsers = subClient.remoteUsers;
                        for (let remoteUser of remoteUsers) {
                            if (remoteUser.hasVideo && remoteUser.videoTrack && remoteUser.videoTrack.isPlaying) {
                                remoteUser.videoTrack.stop();
                            }
                        }
                    })

                    next();
                };
                setTimeout(processVideoTrack, 0);
            },
            args: []
        })
        return 0;
    }

    muteLocalVideoStream(mute: boolean): number {
        this.putAction({
            fun: (mute: boolean, next) => {


                let processVideoTracks = async () => {
                    this._engine.globalVariables.mutedLocalVideoStream = mute;

                    //找到本地video
                    let trackPackages = this._engine.entitiesContainer.getLocalVideoTracks();
                    for (let trackPackage of trackPackages) {
                        let track = trackPackage.track as ILocalVideoTrack;
                        if (track.muted == false && mute == true) {
                            try {
                                await track.setMuted(true);
                            }
                            catch (e) {
                                AgoraConsole.error('ILocalVideoTrack setMuted(true) failed');
                                AgoraConsole.error(e);
                            }
                        }
                        else if (track.muted == true && mute == false) {
                            try {
                                await track.setMuted(false);
                            }
                            catch (e) {
                                AgoraConsole.error('ILocalVideoTrack setMuted(false) failed');
                                AgoraConsole.error(e);
                            }
                        }
                    }
                    next();
                }

                setTimeout(processVideoTracks, 0);
            },
            args: [mute]
        });
        return 0;
    }

    enableLocalVideo(enabled: boolean): number {
        this.putAction({
            fun: (enabled: boolean, next) => {

                let processAudioTracks = async () => {
                    this._engine.globalVariables.enabledLocalVideo = enabled;
                    //找到本地video

                    let trackPackages = this._engine.entitiesContainer.getLocalVideoTracks();
                    for (let trackPackage of trackPackages) {
                        let track = trackPackage.track as ILocalVideoTrack;
                        if (track.enabled != enabled) {
                            try {
                                await track.setEnabled(enabled);
                            }
                            catch (e) {
                                AgoraConsole.error('ILocalVideoTrack setEnable{' + enabled + '} failed');
                                AgoraConsole.error(e);
                            }
                        }
                    }
                    next();
                }

                setTimeout(processAudioTracks, 0);
            },
            args: [enabled]
        })
        return 0;
    }

    muteAllRemoteVideoStreams(mute: boolean): number {
        this.putAction({
            fun: (mute: boolean, next) => {
                //目前是找到MainClient和SubClient的远端
                //找到远端video
                //mainClient的远端用户
                let entitiesContainer = this._engine.entitiesContainer;
                let mainClient = entitiesContainer.getMainClient();
                if (mainClient && mainClient.channelName) {
                    let remoteUsers = mainClient.remoteUsers;
                    for (let remoteUser of remoteUsers) {
                        //todo 远端用户发流的时候。我不订阅，那么他的hasVideo为true， 但是他们的videoTrack是null
                        if (remoteUser.hasVideo && remoteUser.videoTrack && remoteUser.videoTrack.isPlaying) {
                            remoteUser.videoTrack.stop()
                        }
                    }
                }

                //subClient的远端用户
                entitiesContainer.getSubClients().walkT((channel_id, uid, subClient) => {
                    let remoteUsers = subClient.remoteUsers;
                    for (let remoteUser of remoteUsers) {
                        if (remoteUser.hasVideo && remoteUser.videoTrack && remoteUser.videoTrack.isPlaying) {
                            remoteUser.videoTrack.stop();
                        }
                    }
                })

                next();
            },
            args: [mute]
        });
        return 0;
    }

    setDefaultMuteAllRemoteVideoStreams(mute: boolean): number {
        this.putAction({
            fun: (mute: boolean, next) => {
                this._engine.globalVariables.defaultMutedAllRemoteVideoStreams = mute;
                this._engine.mainClientVariables.mutedRemoteVideoStreams.clear();
                next();
            },
            args: [mute]
        });

        return 0;
    }

    muteRemoteVideoStream(uid: number, mute: boolean): number {
        this.putAction({
            fun: (uid: number, mute: boolean, next) => {

                this._engine.mainClientVariables.mutedRemoteAudioStreams.set(uid, mute);
                let mainClient = this._engine.entitiesContainer.getMainClient();

                if (mainClient && mainClient.channelName) {
                    let remoteUser: IAgoraRTCRemoteUser = this._engine.entitiesContainer.getMainClientRemoteUserByUid(uid);
                    if (remoteUser && remoteUser.videoTrack) {
                        if (remoteUser.videoTrack.isPlaying == true && mute == true) {
                            remoteUser.videoTrack.stop();
                        }
                        else if (remoteUser.videoTrack.isPlaying == false && mute == false) {
                            let channelName = mainClient.channelName;
                            remoteUser.videoTrack.play(this._engine.generateVideoTrackLabelOrHtmlElement(channelName, uid, IrisVideoSourceType.kVideoSourceTypeRemote));
                        }
                    }
                }
                next();
            },
            args: [uid, mute]
        });
        return 0;
    }

    setRemoteVideoStreamType(uid: number, streamType: agorartc.VIDEO_STREAM_TYPE): number {
        this.putAction({
            fun: (uid: number, streamType: agorartc.VIDEO_STREAM_TYPE, next) => {
                this._engine.mainClientVariables.remoteVideoStreamTypes.set(uid, streamType);
                let mainClient: IAgoraRTCClient = this._engine.entitiesContainer.getMainClient();
                if (mainClient) {
                    mainClient.setRemoteVideoStreamType(uid, AgoraTranslate.agorartcVIDEO_STREAM_TYPE2RemoteStreamType(streamType))
                        .then(() => {
                            AgoraConsole.log("setRemoteVideoStreamType sucess");
                        })
                        .catch((reason) => {
                            AgoraConsole.log("setRemoteVideoStreamType failed");
                            AgoraConsole.log(reason);
                        })
                        .finally(() => {
                            next();
                        })
                }
                else {
                    next();
                }

            },
            args: [uid, streamType]
        });
        return 0;
    }

    setRemoteDefaultVideoStreamType(streamType: agorartc.VIDEO_STREAM_TYPE): number {
        this.putAction({
            fun: (streamType: agorartc.VIDEO_STREAM_TYPE, next) => {

                this._engine.mainClientVariables.remoteDefaultVideoStreamType = streamType;
                this._engine.mainClientVariables.remoteVideoStreamTypes.clear();

                let mainClient: IAgoraRTCClient = this._engine.entitiesContainer.getMainClient();
                if (mainClient) {
                    mainClient.setRemoteDefaultVideoStreamType(AgoraTranslate.agorartcVIDEO_STREAM_TYPE2RemoteStreamType(streamType))
                        .then(() => {
                            AgoraConsole.log("setRemoteDefaultVideoStreamType sucess");
                        })
                        .catch((reason) => {
                            AgoraConsole.log("setRemoteDefaultVideoStreamType failed");
                            AgoraConsole.log(reason);
                        })
                        .finally(() => {
                            next();
                        })
                }
                else {
                    next();
                }

                next();
            },
            args: [streamType]
        });

        return 0;
    }

    setRemoteVideoSubscriptionOptions(uid: number, options: agorartc.VideoSubscriptionOptions): number {
        if (options.type != null)
            return this.setRemoteVideoStreamType(uid, options.type);

        return 0;
    }

    setSubscribeAudioBlacklist(uidList: number[], uidNumber: number): number {
        AgoraConsole.warn("setSubscribeAudioBlacklist not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    setSubscribeAudioWhitelist(uidList: number[], uidNumber: number): number {
        AgoraConsole.warn("setSubscribeAudioWhitelist not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    setSubscribeVideoBlacklist(uidList: number[], uidNumber: number): number {
        AgoraConsole.warn("setSubscribeVideoBlacklist not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }


    setSubscribeVideoWhitelist(uidList: number[], uidNumber: number): number {
        AgoraConsole.warn("setSubscribeVideoBlacklist not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    enableAudioVolumeIndication(interval: number, smooth: number, reportVad: boolean): number {
        this.putAction({
            fun: (interval: number, smooth: number, reportVad: boolean, next) => {
                //如果当前有client, 那么就client.enableAudioVolumeIndicator()函数设置一下，但是不保存临时变量
                let mainClient = this._engine.entitiesContainer.getMainClient();
                if (mainClient) {
                    mainClient.enableAudioVolumeIndicator();
                }
                else {
                    //如果没有就保存到这个变量，并且在Client被创建的时候去读取一下这个值
                    this._engine.mainClientVariables.enabledAudioVolumeIndication = {
                        interval,
                        smooth,
                        reportVad
                    };
                }

                next();
            },
            args: [interval, smooth, reportVad]
        })

        return 0;
    }

    startAudioRecording(filePath: string, quality: agorartc.AUDIO_RECORDING_QUALITY_TYPE): number {
        AgoraConsole.warn("startAudioRecording not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    startAudioRecording2(filePath: string, sampleRate: number, quality: agorartc.AUDIO_RECORDING_QUALITY_TYPE): number {
        AgoraConsole.warn("startAudioRecording2 not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    startAudioRecording3(config: agorartc.AudioRecordingConfiguration): number {
        AgoraConsole.warn("startAudioRecording2 not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    registerAudioEncodedFrameObserver(config: agorartc.AudioEncodedFrameObserverConfig, observer: agorartc.IAudioEncodedFrameObserver): number {
        AgoraConsole.warn("registerAudioEncodedFrameObserver not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    stopAudioRecording(): number {
        AgoraConsole.warn("stopAudioRecording not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    createMediaPlayer(): agorartc.IMediaPlayer {
        AgoraConsole.warn("stopAudioRecording not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    destroyMediaPlayer(media_player: agorartc.IMediaPlayer): number {
        AgoraConsole.warn("stopAudioRecording not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    startAudioMixing(filePath: string, loopback: boolean, replace: boolean, cycle: number): number {
        AgoraConsole.warn("stopAudioRecording not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    startAudioMixing2(filePath: string, loopback: boolean, replace: boolean, cycle: number, startPos: number): number {
        AgoraConsole.warn("startAudioMixing2 not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    stopAudioMixing(): number {
        AgoraConsole.warn("stopAudioMixing not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    pauseAudioMixing(): number {
        AgoraConsole.warn("pauseAudioMixing not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    resumeAudioMixing(): number {
        AgoraConsole.warn("pauseAudioMixing not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    getAudioTrackCount(): number {
        AgoraConsole.warn("getAudioTrackCount not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    adjustAudioMixingVolume(volume: number): number {
        AgoraConsole.warn("adjustAudioMixingVolume not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    adjustAudioMixingPublishVolume(volume: number): number {
        AgoraConsole.warn("adjustAudioMixingPublishVolume not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    getAudioMixingPublishVolume(): number {
        AgoraConsole.warn("getAudioMixingPublishVolume not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    adjustAudioMixingPlayoutVolume(volume: number): number {
        AgoraConsole.warn("adjustAudioMixingPlayoutVolume not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    getAudioMixingPlayoutVolume(): number {
        AgoraConsole.warn("getAudioMixingPlayoutVolume not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    getAudioMixingDuration(): number {
        AgoraConsole.warn("getAudioMixingDuration not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    getAudioMixingCurrentPosition(): number {
        AgoraConsole.warn("getAudioMixingCurrentPosition not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    setAudioMixingPosition(pos: number): number {
        AgoraConsole.warn("setAudioMixingPosition not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    setAudioMixingDualMonoMode(mode: agorartc.AUDIO_MIXING_DUAL_MONO_MODE): number {
        AgoraConsole.warn("setAudioMixingDualMonoMode not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    setAudioMixingPitch(pitch: number): number {
        AgoraConsole.warn("setAudioMixingPitch not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    getEffectsVolume(): number {
        AgoraConsole.warn("getEffectsVolume not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    setEffectsVolume(volume: number): number {
        AgoraConsole.warn("setEffectsVolume not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    preloadEffect(soundId: number, filePath: string, startPos: number): number {
        AgoraConsole.warn("preloadEffect not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    playEffect(soundId: number, filePath: string, loopCount: number, pitch: number, pan: number, gain: number, publish: boolean, startPos: number): number {
        AgoraConsole.warn("playEffect not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    playAllEffects(loopCount: number, pitch: number, pan: number, gain: number, publish: boolean): number {
        AgoraConsole.warn("playAllEffects not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    getVolumeOfEffect(soundId: number): number {
        AgoraConsole.warn("getVolumeOfEffect not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    setVolumeOfEffect(soundId: number, volume: number): number {
        AgoraConsole.warn("setVolumeOfEffect not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    pauseEffect(soundId: number): number {
        AgoraConsole.warn("pauseEffect not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    pauseAllEffects(): number {
        AgoraConsole.warn("pauseAllEffects not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    resumeEffect(soundId: number): number {
        AgoraConsole.warn("resumeEffect not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    resumeAllEffects(): number {
        AgoraConsole.warn("resumeAllEffects not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    stopEffect(soundId: number): number {
        AgoraConsole.warn("stopEffect not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    stopAllEffects(): number {
        AgoraConsole.warn("stopAllEffects not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    unloadEffect(soundId: number): number {
        AgoraConsole.warn("unloadEffect not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    unloadAllEffects(): number {
        AgoraConsole.warn("unloadAllEffects not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    getEffectDuration(filePath: string): number {
        AgoraConsole.warn("getEffectDuration not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    setEffectPosition(soundId: number, pos: number): number {
        AgoraConsole.warn("setEffectPosition not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    getEffectCurrentPosition(soundId: number): number {
        AgoraConsole.warn("getEffectCurrentPosition not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    enableSoundPositionIndication(enabled: boolean): number {
        AgoraConsole.warn("getEffectCurrentPosition not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    setRemoteVoicePosition(uid: number, pan: number, gain: number): number {
        AgoraConsole.warn("getEffectCurrentPosition not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    enableSpatialAudio(enabled: boolean): number {
        AgoraConsole.warn("enableSpatialAudio not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    setRemoteUserSpatialAudioParams(uid: number, params: agorartc.SpatialAudioParams): number {
        AgoraConsole.warn("setRemoteUserSpatialAudioParams not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    setVoiceBeautifierPreset(preset: agorartc.VOICE_BEAUTIFIER_PRESET): number {
        AgoraConsole.warn("setVoiceBeautifierPreset not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    setAudioEffectPreset(preset: agorartc.AUDIO_EFFECT_PRESET): number {
        AgoraConsole.warn("setAudioEffectPreset not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    setVoiceConversionPreset(preset: agorartc.VOICE_CONVERSION_PRESET): number {
        AgoraConsole.warn("setVoiceConversionPreset not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    setAudioEffectParameters(preset: agorartc.AUDIO_EFFECT_PRESET, param1: number, param2: number): number {
        AgoraConsole.warn("setAudioEffectParameters not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    setVoiceBeautifierParameters(preset: agorartc.VOICE_BEAUTIFIER_PRESET, param1: number, param2: number): number {
        AgoraConsole.warn("setVoiceBeautifierParameters not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    setVoiceConversionParameters(preset: agorartc.VOICE_CONVERSION_PRESET, param1: number, param2: number): number {
        AgoraConsole.warn("setVoiceConversionParameters not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    setLocalVoicePitch(pitch: number): number {
        AgoraConsole.warn("setLocalVoicePitch not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    setLocalVoiceEqualization(bandFrequency: agorartc.AUDIO_EQUALIZATION_BAND_FREQUENCY, bandGain: number): number {
        AgoraConsole.warn("setLocalVoiceEqualization not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    setLocalVoiceReverb(reverbKey: agorartc.AUDIO_REVERB_TYPE, value: number): number {
        AgoraConsole.warn("setLocalVoiceReverb not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    setLogFile(filePath: string): number {
        AgoraConsole.warn("setLogFile not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    setLogFilter(filter: number): number {
        AgoraConsole.warn("setLogFilter not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    setLogLevel(level: agorartc.LOG_LEVEL): number {
        AgoraConsole.logLevel = level;
        let numberLevel: number = AgoraTranslate.agorartcLOG_LEVEL2Number(level);
        AgoraRTC.setLogLevel(numberLevel);
        return 0;
    }

    setLogFileSize(fileSizeInKBytes: number): number {
        AgoraConsole.warn("setLogFileSize not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    uploadLogFile(result: any): number {
        AgoraRTC.enableLogUpload();
        result.requestId = "";
        return 0;
    }

    setLocalRenderMode(renderMode: agorartc.RENDER_MODE_TYPE, mirrorMode: agorartc.VIDEO_MIRROR_MODE_TYPE): number {
        AgoraConsole.warn("setLocalRenderMode not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    setRemoteRenderMode(uid: number, renderMode: agorartc.RENDER_MODE_TYPE, mirrorMode: agorartc.VIDEO_MIRROR_MODE_TYPE): number {
        AgoraConsole.warn("setRemoteRenderMode not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    setLocalRenderMode2(renderMode: agorartc.RENDER_MODE_TYPE): number {
        AgoraConsole.warn("setLocalRenderMode2 not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    setLocalVideoMirrorMode(mirrorMode: agorartc.VIDEO_MIRROR_MODE_TYPE): number {
        //todo 先看看有没有远端的镜像
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    enableDualStreamMode(enabled: boolean): number {
        this.putAction({
            fun: (enabled: boolean, next) => {
                this._engine.mainClientVariables.enabledDualStreamMode = enabled;
                this._engine.mainClientVariables.enabledDualStreamModes.clear();
                let mainClient: IAgoraRTCClient = this._engine.entitiesContainer.getMainClient();
                if (mainClient) {
                    if (enabled) {
                        mainClient.enableDualStream()
                            .then(() => {
                                AgoraConsole.log("enableDualStreamMode successed");
                            })
                            .catch(() => {
                                AgoraConsole.error("enableDualStreamMode failed");
                                this._engine.rtcEngineEventHandler.onError(0, "enableDualStreamMode failed");
                            })
                            .finally(() => {
                                next();
                            })
                    }
                    else {
                        mainClient.disableDualStream()
                            .then(() => {
                                AgoraConsole.log("disableDualStream successed");
                            })
                            .catch(() => {
                                AgoraConsole.error("disableDualStream failed");
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
            args: [enabled]
        })

        return 0;
    }

    enableDualStreamMode2(sourceType: agorartc.VIDEO_SOURCE_TYPE, enabled: boolean): number {
        return this.enableDualStreamMode3(sourceType, enabled, null);
    }

    enableDualStreamMode3(sourceType: agorartc.VIDEO_SOURCE_TYPE, enabled: boolean, streamConfig: agorartc.SimulcastStreamConfig): number {

        this.putAction({
            fun: (sourceType: agorartc.VIDEO_SOURCE_TYPE, enabled: boolean, streamConfig: agorartc.SimulcastStreamConfig, next) => {

                this._engine.mainClientVariables.enabledDualStreamModes.set(sourceType, { enabled: enabled, streamConfig: streamConfig });

                /*当前的videoTrack正好是这个sourceType */
                let matched = false;
                let mainClient: IAgoraRTCClient = this._engine.entitiesContainer.getMainClient();
                if (mainClient) {
                    let trackPackage = this._engine.entitiesContainer.getLocalVideoTrackByType(sourceType as number);
                    if (trackPackage) {
                        let track = trackPackage.track as ILocalVideoTrack;
                        if (mainClient.localTracks.indexOf(track) != -1) {
                            matched = true;
                        }
                    }
                }

                if (matched) {
                    if (enabled) {
                        streamConfig && mainClient.setLowStreamParameter(AgoraTranslate.agorartcSimulcastStreamConfig2LowStreamParameter(streamConfig));
                        mainClient.enableDualStream()
                            .then(() => {
                                AgoraConsole.log("enableDualStreamMode successed");
                            })
                            .catch(() => {
                                AgoraConsole.error("enableDualStreamMode failed");
                                this._engine.rtcEngineEventHandler.onError(0, "enableDualStreamMode failed");
                            })
                            .finally(() => {
                                next();
                            })
                    }
                    else {
                        mainClient.disableDualStream()
                            .then(() => {
                                AgoraConsole.log("disableDualStream successed");
                            })
                            .catch(() => {
                                AgoraConsole.error("disableDualStream failed");
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
            args: [sourceType, enabled, streamConfig]
        });
        return 0;
    }

    setDualStreamMode(mode: agorartc.SIMULCAST_STREAM_MODE): number {
        switch (mode) {
            case agorartc.SIMULCAST_STREAM_MODE.DISABLE_SIMULCAST_STREM:
                this.enableDualStreamMode(false);
                break;
            case agorartc.SIMULCAST_STREAM_MODE.ENABLE_SIMULCAST_STREAM:
                this.enableDualStreamMode(true);
                break;
        }
        return 0;
    }

    setDualStreamMode2(sourceType: agorartc.VIDEO_SOURCE_TYPE, mode: agorartc.SIMULCAST_STREAM_MODE): number {
        switch (mode) {
            case agorartc.SIMULCAST_STREAM_MODE.DISABLE_SIMULCAST_STREM:
                this.enableDualStreamMode2(sourceType, false);
                break;
            case agorartc.SIMULCAST_STREAM_MODE.ENABLE_SIMULCAST_STREAM:
                this.enableDualStreamMode2(sourceType, true);
                break;
        }
        return 0;
    }

    setDualStreamMode3(sourceType: agorartc.VIDEO_SOURCE_TYPE, mode: agorartc.SIMULCAST_STREAM_MODE, streamConfig: agorartc.SimulcastStreamConfig): number {
        switch (mode) {
            case agorartc.SIMULCAST_STREAM_MODE.DISABLE_SIMULCAST_STREM:
                this.enableDualStreamMode3(sourceType, false, streamConfig);
                break;
            case agorartc.SIMULCAST_STREAM_MODE.ENABLE_SIMULCAST_STREAM:
                this.enableDualStreamMode3(sourceType, true, streamConfig);
                break;
        }
        return 0;
    }

    enableEchoCancellationExternal(enabled: boolean, audioSourceDelay: number): number {
        AgoraConsole.warn("enableEchoCancellationExternal not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    enableCustomAudioLocalPlayback(sourceId: number, enabled: boolean): number {
        AgoraConsole.warn("enableCustomAudioLocalPlayback not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    startPrimaryCustomAudioTrack(config: agorartc.AudioTrackConfig): number {
        AgoraConsole.warn("startPrimaryCustomAudioTrack not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    stopPrimaryCustomAudioTrack(): number {
        AgoraConsole.warn("startPrimaryCustomAudioTrack not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    startSecondaryCustomAudioTrack(config: agorartc.AudioTrackConfig): number {
        AgoraConsole.warn("startSecondaryCustomAudioTrack not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    stopSecondaryCustomAudioTrack(): number {
        AgoraConsole.warn("stopSecondaryCustomAudioTrack not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    setRecordingAudioFrameParameters(sampleRate: number, channel: number, mode: agorartc.RAW_AUDIO_FRAME_OP_MODE_TYPE, samplesPerCall: number): number {
        AgoraConsole.warn("setRecordingAudioFrameParameters not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    setPlaybackAudioFrameParameters(sampleRate: number, channel: number, mode: agorartc.RAW_AUDIO_FRAME_OP_MODE_TYPE, samplesPerCall: number): number {
        AgoraConsole.warn("setPlaybackAudioFrameParameters not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    setMixedAudioFrameParameters(sampleRate: number, channel: number, samplesPerCall: number): number {
        AgoraConsole.warn("setMixedAudioFrameParameters not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    setPlaybackAudioFrameBeforeMixingParameters(sampleRate: number, channel: number): number {
        AgoraConsole.warn("setPlaybackAudioFrameBeforeMixingParameters not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    enableAudioSpectrumMonitor(intervalInMS: number): number {
        AgoraConsole.warn("enableAudioSpectrumMonitor not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    disableAudioSpectrumMonitor(): number {
        AgoraConsole.warn("disableAudioSpectrumMonitor not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    registerAudioSpectrumObserver(observer: agorartc.IAudioSpectrumObserver): number {
        AgoraConsole.warn("registerAudioSpectrumObserver not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    unregisterAudioSpectrumObserver(observer: agorartc.IAudioSpectrumObserver): number {
        AgoraConsole.warn("unregisterAudioSpectrumObserver not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    //native 传入的值为[0, 400], 100: The original volume.
    adjustRecordingSignalVolume(volume: number): number {
        if (volume < 0 || volume > 100) {
            AgoraConsole.error("volume must be [0,100] in web platform");
            return -agorartc.ERROR_CODE_TYPE.ERR_INVALID_ARGUMENT;
        }

        this.putAction({
            fun: (volume: number, next) => {

                this._engine.globalVariables.recordingSignalVolume = volume;
                let trackPackage = this._engine.entitiesContainer.getLocalAudioTrackByType(IrisAudioSourceType.kAudioSourceTypeMicrophonePrimary);
                if (trackPackage) {
                    let track = trackPackage.track;
                    //web 传入的值为 [0,1000], 100: The original volume. 似乎不需要转换
                    track.setVolume(volume);
                }
                next();
            },
            args: [volume]
        })

        return 0;
    }

    muteRecordingSignal(mute: boolean): number {
        this.putAction({
            fun: (mute: boolean, next) => {
                this._engine.globalVariables.mutedLocalAudioStream = mute;
                let trackPackage = this._engine.entitiesContainer.getLocalAudioTrackByType(IrisAudioSourceType.kAudioSourceTypeMicrophonePrimary);
                if (trackPackage) {
                    let track = trackPackage.track as IMicrophoneAudioTrack;
                    if (track.muted != mute) {
                        track.setMuted(mute)
                            .then(() => {
                                AgoraConsole.log("muteRecordingSignal sucess");
                            })
                            .catch((reason) => {
                                AgoraConsole.error("muteRecordingSignal failed");
                                AgoraConsole.error(reason);
                            })
                            .finally(() => {
                                next();
                            })
                    }
                    else {
                        next();
                    }

                }
                else {
                    next();
                }
            },
            args: [mute]
        })
        return 0;
    }

    //native传入的值为[0,400] 100:The original volume.
    adjustPlaybackSignalVolume(volume: number): number {
        if (volume < 0 || volume > 100) {
            AgoraConsole.warn("the volume must be in [0,100] on web");
            return -agorartc.ERROR_CODE_TYPE.ERR_INVALID_ARGUMENT;
        }

        this.putAction({

            fun: (volume: number, next) => {

                this._engine.globalVariables.playbackSignalVolume = volume;
                this._engine.globalVariables.playbackSignalVolumes.clear();

                //找到远端audio
                let remoteUsers = this._engine.entitiesContainer.getAllRemoteUsers();
                for (let remoteUser of remoteUsers) {
                    if (remoteUser.audioTrack) {
                        //web端传入值为[0,100], 100:表示原始音量
                        remoteUser.audioTrack.setVolume(volume);
                    }
                }

                next();
            },
            args: [volume]
        })
        return 0;
    }

    //native 值为[0,100],  The default value is 100
    adjustUserPlaybackSignalVolume(uid: number, volume: number): number {
        if (volume < 0 || volume > 100) {
            AgoraConsole.warn("the volume must be in [0,100] on web");
            return -agorartc.ERROR_CODE_TYPE.ERR_INVALID_ARGUMENT;
        }

        this.putAction({
            fun: (volume: number, next) => {

                this._engine.globalVariables.playbackSignalVolumes.set(uid, volume);
                let remoteUsers = this._engine.entitiesContainer.getAllRemoteUserByUid(uid);
                for (let remoteUser of remoteUsers) {
                    if (remoteUser.hasAudio && remoteUser.audioTrack) {
                        //web 值为[0,100], The default value is 100 不需要转换
                        remoteUser.audioTrack.setVolume(volume);
                    }
                }

                next();
            },
            args: [volume]
        })

        return 0;
    }

    setLocalPublishFallbackOption(option: agorartc.STREAM_FALLBACK_OPTIONS): number {
        AgoraConsole.warn("setLocalPublishFallbackOption not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    setRemoteSubscribeFallbackOption(option: agorartc.STREAM_FALLBACK_OPTIONS): number {
        this.putAction({
            fun: (option: agorartc.STREAM_FALLBACK_OPTIONS, next) => {

                let processAction = async () => {

                    this._engine.globalVariables.fallbackOption = option;

                    let fallback = AgoraTranslate.agorartcSTREAM_FALLBACK_OPTIONS2RemoteStreamFallbackType(option);

                    let entitiesContainer = this._engine.entitiesContainer;
                    let mainClient = entitiesContainer.getMainClient();
                    if (mainClient && mainClient.channelName) {
                        let remoteUsers = mainClient.remoteUsers;
                        for (let remoteUser of remoteUsers) {
                            let remoteUid = remoteUser.uid;
                            try {
                                await mainClient.setStreamFallbackOption(remoteUid, fallback);
                            }
                            catch (e) {
                                AgoraConsole.error("setRemoteSubscribeFallbackOption failed");
                                AgoraConsole.error(e);
                            }
                        }
                    }

                    let contaniner = entitiesContainer.getSubClients().getContaniner();
                    for (let c of contaniner) {
                        // let channelId = c[0];
                        let map = c[1];
                        for (let m of map) {
                            // let uid = m[0];
                            let client = m[1];
                            let remoteUsers = client.remoteUsers;
                            for (let remoteUser of remoteUsers) {
                                let remoteUid = remoteUser.uid;
                                try {
                                    await mainClient.setStreamFallbackOption(remoteUid, fallback);
                                }
                                catch (e) {
                                    AgoraConsole.error("setRemoteSubscribeFallbackOption failed");
                                    AgoraConsole.error(e);
                                }
                            }
                        }
                    }

                    next();
                }

                setTimeout(processAction, 0);

            },
            args: [option]
        })
        return 0;
    }

    enableLoopbackRecording(enabled: boolean, deviceName: string): number {
        AgoraConsole.warn("enableLoopbackRecording not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    adjustLoopbackRecordingVolume(volume: number): number {
        AgoraConsole.warn("adjustLoopbackSignalVolume not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    getLoopbackRecordingVolume(): number {
        AgoraConsole.warn("getLoopbackRecordingVolume not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    enableInEarMonitoring(enabled: boolean, includeAudioFilters: number): number {
        AgoraConsole.warn("enableInEarMonitoring not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    setInEarMonitoringVolume(volume: number): number {
        AgoraConsole.warn("setInEarMonitoringVolume not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    loadExtensionProvider(path: string): number {
        AgoraConsole.warn("setInEarMonitoringVolume not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    setExtensionProviderProperty(provider: string, key: string, value: string): number {
        AgoraConsole.warn("setInEarMonitoringVolume not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    enableExtension(provider: string, extension: string, enable: boolean, type: agorartc.MEDIA_SOURCE_TYPE): number {
        AgoraConsole.warn("setInEarMonitoringVolume not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    setExtensionProperty(provider: string, extension: string, key: string, value: string, type: agorartc.MEDIA_SOURCE_TYPE): number {
        AgoraConsole.warn("setInEarMonitoringVolume not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    getExtensionProperty(provider: string, extension: string, key: string, value: string, buf_len: number, type: agorartc.MEDIA_SOURCE_TYPE): number {
        AgoraConsole.warn("setInEarMonitoringVolume not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    //如果videoTrack当前已经被创建了的话，那么 config.cameraDirection 是无法生效的，但是视频宽高可以改变
    setCameraCapturerConfiguration(config: agorartc.CameraCapturerConfiguration): number {
        this.putAction({
            fun: (config: agorartc.CameraCapturerConfiguration, next) => {

                this._engine.globalVariables.cameraDirection = config.cameraDirection;

                let videoEncoderConfiguration: agorartc.VideoEncoderConfiguration = this._engine.globalVariables.videoEncoderConfiguration;
                if (!videoEncoderConfiguration) {
                    videoEncoderConfiguration = new agorartc.VideoEncoderConfiguration();
                    this._engine.globalVariables.videoEncoderConfiguration = videoEncoderConfiguration;
                }
                videoEncoderConfiguration.dimensions.width = config.format.width;
                videoEncoderConfiguration.dimensions.height = config.format.height;
                videoEncoderConfiguration.frameRate = config.format.fps;
                if (videoEncoderConfiguration.minFrameRate > config.format.fps) {
                    videoEncoderConfiguration.minFrameRate = config.format.fps;
                }
                // 找到videoTrack并且调用一下 setEncoderConfiguration
                let trackPackage = this._engine.entitiesContainer.getLocalVideoTrackByType(IrisVideoSourceType.kVideoSourceTypeCameraPrimary);
                if (trackPackage) {
                    let track = trackPackage.track as ICameraVideoTrack;
                    track.setEncoderConfiguration(AgoraTranslate.agorartcVideoEncoderConfiguration2VideoEncoderConfiguration(videoEncoderConfiguration))
                        .then(() => {
                            AgoraConsole.log("setCameraCapturerConfiguration success");
                        })
                        .catch((reason) => {
                            AgoraConsole.error("setCameraCapturerConfiguration failed");
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
            args: [config]
        })
        return 0;
    }

    createCustomVideoTrack(): number {
        AgoraConsole.warn("createCustomVideoTrack not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    createCustomEncodedVideoTrack(sender_option: agorartc.SenderOptions): number {
        AgoraConsole.warn("createCustomEncodedVideoTrack not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    destroyCustomVideoTrack(video_track_id: number): number {
        AgoraConsole.warn("createCustomEncodedVideoTrack not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    destroyCustomEncodedVideoTrack(video_track_id: number): number {
        AgoraConsole.warn("createCustomEncodedVideoTrack not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    switchCamera(): number {
        this.putAction({
            fun: (next) => {
                let trackPack = this._engine.entitiesContainer.getLocalVideoTrackByType(IrisVideoSourceType.kVideoSourceTypeCameraPrimary);
                if (trackPack) {
                    let process = async () => {
                        let videoTrack: ICameraVideoTrack = trackPack.track as ICameraVideoTrack;
                        let curDeviceName: string = (videoTrack as any)._deviceName;

                        try {
                            let allDevices = (await ImplHelper.enumerateDevices(this._engine)).videoDevices;
                            let curIndex = -1;
                            for (let i = 0; i < allDevices.length; i++) {
                                if (allDevices[i].deviceName == curDeviceName) {
                                    curIndex = i;
                                    break;
                                }
                            }
                            curIndex++;
                            let nextDevice = allDevices[curIndex % allDevices.length];
                            try {
                                await videoTrack.setDevice(nextDevice.deviceId)
                            }
                            catch (e) {
                                AgoraConsole.error("switchCamera setDevice failed");
                                AgoraConsole.log(e);
                            }
                        }
                        catch (e) {
                            AgoraConsole.error("switchCamera enumerateDevices failed");
                            AgoraConsole.log(e);
                        }
                        next();
                    }
                    setTimeout(process, 0);
                }
                else {
                    next();
                }
            },
            args: []
        })


        return 0;
    }

    isCameraZoomSupported(): boolean {
        AgoraConsole.warn("isCameraZoomSupported not supported in this platfrom!");
        return false;
    }

    isCameraFaceDetectSupported(): boolean {
        AgoraConsole.warn("isCameraFaceDetectSupported not supported in this platfrom!");
        return false;
    }

    isCameraTorchSupported(): boolean {
        AgoraConsole.warn("isCameraTorchSupported not supported in this platfrom!");
        return false;
    }

    isCameraFocusSupported(): boolean {
        AgoraConsole.warn("isCameraFocusSupported not supported in this platfrom!");
        return false;
    }

    isCameraAutoFocusFaceModeSupported(): boolean {
        AgoraConsole.warn("isCameraAutoFocusFaceModeSupported not supported in this platfrom!");
        return false;
    }

    setCameraZoomFactor(factor: number): number {
        AgoraConsole.warn("setCameraZoomFactor not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    enableFaceDetection(enabled: boolean): number {
        AgoraConsole.warn("enableFaceDetection not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    getCameraMaxZoomFactor(): number {
        AgoraConsole.warn("getCameraMaxZoomFactor not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    setCameraFocusPositionInPreview(positionX: number, positionY: number): number {
        AgoraConsole.warn("setCameraFocusPositionInPreview not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    setCameraTorchOn(isOn: boolean): number {
        AgoraConsole.warn("setCameraTorchOn not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    setCameraAutoFocusFaceModeEnabled(enabled: boolean): number {
        AgoraConsole.warn("setCameraAutoFocusFaceModeEnabled not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    isCameraExposurePositionSupported(): boolean {
        AgoraConsole.warn("setCameraAutoFocusFaceModeEnabled not supported in this platfrom!");
        return false;
    }

    setCameraExposurePosition(positionXinView: number, positionYinView: number): number {
        AgoraConsole.warn("setCameraExposurePosition not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    isCameraAutoExposureFaceModeSupported(): boolean {
        AgoraConsole.warn("isCameraAutoExposureFaceModeSupported not supported in this platfrom!");
        return false;
    }

    setCameraAutoExposureFaceModeEnabled(enabled: boolean): number {
        AgoraConsole.warn("setCameraAutoExposureFaceModeEnabled not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    setDefaultAudioRouteToSpeakerphone(defaultToSpeaker: boolean): number {
        AgoraConsole.warn("setDefaultAudioRouteToSpeakerphone not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    setEnableSpeakerphone(speakerOn: boolean): number {
        AgoraConsole.warn("setEnableSpeakerphone not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    isSpeakerphoneEnabled(): boolean {
        AgoraConsole.warn("isSpeakerphoneEnabled not supported in this platfrom!");
        return true;
    }

    getScreenCaptureSources(thumbSize: agorartc.VideoDimensions, iconSize: agorartc.VideoDimensions, includeScreen: boolean): agorartc.ScreenCaptureSourceInfoInternal[] {
        AgoraConsole.warn("getScreenCaptureSources not supported in this platfrom!");
        return [];
    }

    setAudioSessionOperationRestriction(restriction: agorartc.AUDIO_SESSION_OPERATION_RESTRICTION): number {
        AgoraConsole.warn("setAudioSessionOperationRestriction not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    startScreenCaptureByDisplayId(displayId: number, regionRect: agorartc.Rectangle, captureParams: agorartc.ScreenCaptureParameters, videoSourceType: IrisVideoSourceType = IrisVideoSourceType.kVideoSourceTypeScreenPrimary): number {
        //todo 直接创建屏幕共享的窗口
        this.putAction({
            fun: (displayId: number, regionRect: agorartc.Rectangle, captureParams: agorartc.ScreenCaptureParameters, videoSourceType: IrisVideoSourceType, next) => {
                this._engine.globalVariables.screenCaptureParameters = captureParams;

                let process = async () => {
                    let audioType = IrisAudioSourceType.kAudioSourceTypeUnknow;
                    let videoType = videoSourceType;
                    let clientType = IrisClientType.kClientMian;
                    try {
                        let trackArray = await ImplHelper.getOrCreateAudioAndVideoTrackAsync(this._engine, audioType, videoType, clientType, null);
                        AgoraConsole.log("ScreenShare track create success");
                        let mainClient = this._engine.entitiesContainer.getMainClient();
                        let publishScreenTrack = this._engine.mainClientVariables.publishScreenTrack || this._engine.mainClientVariables.publishScreenCaptureVideo;

                        if (mainClient && mainClient.channelName && publishScreenTrack) {
                            let screenShareTrack = trackArray[1] as ILocalVideoTrack;
                            let entitiesContainer = this._engine.entitiesContainer;

                            if (!entitiesContainer.isMainClientPublishedVideoTrack()) {
                                //当前还主客户端还没有发流
                                let videoSource = IrisVideoSourceType.kVideoSourceTypeScreenPrimary
                                entitiesContainer.setMainClientLocalVideoTrack({ type: videoSource, track: screenShareTrack });
                                let trackEventHandler: IrisTrackEventHandler = new IrisTrackEventHandler({
                                    channelName: mainClient.channelName,
                                    client: mainClient,
                                    track: screenShareTrack,
                                    trackType: 'ILocalVideoTrack',
                                }, this._engine);
                                entitiesContainer.addMainClientTrackEventHandler(trackEventHandler);

                                try {
                                    await mainClient.publish(screenShareTrack)
                                }
                                catch (reason) {
                                    AgoraConsole.error("screen video track publish failed");
                                    AgoraConsole.error(reason);
                                    entitiesContainer.removeMainClientTrackEventHandlerByTrack(screenShareTrack);
                                    entitiesContainer.clearMainClientLocalVideoTrack();
                                }
                            }
                            else {
                                AgoraConsole.warn("main client already publish a video track. cant publish screen share video track again");
                            }
                        }
                    }
                    catch (err) {
                        AgoraConsole.error("ScreenShare failed");
                        err && AgoraConsole.error(err);
                    }

                    next();
                }
                setTimeout(process, 0);

            },
            args: [displayId, regionRect, captureParams, videoSourceType]
        })

        return 0;
    }

    startScreenCaptureByScreenRect(screenRect: agorartc.Rectangle, regionRect: agorartc.Rectangle, captureParams: agorartc.ScreenCaptureParameters): number {
        return this.startScreenCaptureByDisplayId(0, regionRect, captureParams);
    }

    getAudioDeviceInfo(deviceInfo: agorartc.DeviceInfo): number {
        // if (!this._engine.globalVariables.deviceEnumerated) {
        //     AgoraConsole.warn("Please call this method:getAudioDeviceInfo after onDeviceEnumerated triggered")
        //     return -agorartc.ERROR_CODE_TYPE.ERR_FAILED;
        // }
        // else {
        //     deviceInfo.deviceId = this._engine.globalVariables.videoDevices
        //     return 0;
        // }

        AgoraConsole.warn("getAudioDeviceInfo not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    startScreenCaptureByWindowId(windowId: any, regionRect: agorartc.Rectangle, captureParams: agorartc.ScreenCaptureParameters): number {
        return this.startScreenCaptureByDisplayId(windowId, regionRect, captureParams);
    }

    setScreenCaptureContentHint(contentHint: agorartc.VIDEO_CONTENT_HINT): number {

        this.putAction({
            fun: (contentHint: agorartc.VIDEO_CONTENT_HINT, next) => {
                this._engine.globalVariables.screenCaptureContentHint = contentHint;

                //todo 找到当前的屏幕共享的track。设置一下setOptimizationModes属性
                let trackPackage = this._engine.entitiesContainer.getLocalVideoTrackByType(IrisVideoSourceType.kVideoSourceTypeScreenPrimary);
                if (trackPackage) {
                    let track = trackPackage.track as ILocalVideoTrack;
                    track.setOptimizationMode(AgoraTranslate.agorartcVIDEO_CONTENT_HINT2string(contentHint))
                        .then(() => {
                            AgoraConsole.log("setScreenCaptureContentHint success");
                        })
                        .catch((reason) => {
                            AgoraConsole.error("setScreenCaptureContentHint failed");
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
            args: [contentHint]
        })

        return 0;
    }

    setScreenCaptureScenario(screenScenario: agorartc.SCREEN_SCENARIO_TYPE): number {
        AgoraConsole.warn("setScreenCaptureScenario not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    updateScreenCaptureRegion(regionRect: agorartc.Rectangle): number {
        AgoraConsole.warn("updateScreenCaptureRegion not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    //或许我应该返回不支持
    updateScreenCaptureParameters(captureParams: agorartc.ScreenCaptureParameters): number {
        // this.putAction({
        //     fun: (captureParams: agorartc.ScreenCaptureParameters, next) => {
        //         this._engine.globalVariables.screenCaptureParameters = captureParams;
        //         next();
        //     },
        //     args: [captureParams]
        // })

        // return 0;
        AgoraConsole.warn("updateScreenCaptureParameters not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    startScreenCapture(mediaProjectionPermissionResultData: Uint8ClampedArray, captureParams: agorartc.ScreenCaptureParameters): number {
        return this.startScreenCaptureByDisplayId(0, null, captureParams);
    }

    updateScreenCapture(captureParams: agorartc.ScreenCaptureParameters): number {
        AgoraConsole.warn("updateScreenCapture not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    stopScreenCapture(videoType: IrisVideoSourceType = IrisVideoSourceType.kVideoSourceTypeCameraPrimary): number {

        this.putAction({
            fun: (videoType: IrisVideoSourceType, next) => {

                let processStop = async () => {

                    let entitiesContainer = this._engine.entitiesContainer;
                    let audioTrackPackage = entitiesContainer.getLocalAudioTrackByType(IrisAudioSourceType.kAudioSourceTypeScreenPrimary);
                    if (audioTrackPackage) {
                        let track = audioTrackPackage.track as ILocalAudioTrack;
                        await entitiesContainer.audioTrackWillClose(track);
                        track.close();
                    }

                    let videoTrackPackage = entitiesContainer.getLocalVideoTrackByType(videoType);
                    if (videoTrackPackage) {
                        let track = videoTrackPackage.track as ILocalVideoTrack;
                        await entitiesContainer.videoTrackWillClose(track);
                        track.close();
                    }
                    next();

                }

                setTimeout(processStop, 0);
            },
            args: [videoType]
        });

        return 0;
    }

    getCallId(result: any): number {
        AgoraConsole.warn("updateScreenCaptureRegion not supported in this platfrom!");
        result.callId = "";
        return - agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    rate(callId: string, rating: number, description: string): number {
        AgoraConsole.warn("rate not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    complain(callId: string, description: string): number {
        AgoraConsole.warn("complain not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    //todo 记得要触发回调啊
    startRtmpStreamWithoutTranscoding(url: string): number {
        //todo 可以实现，但是我先不实现
        this.putAction({
            fun: (url: string, next) => {
                let mainClient = this._engine.entitiesContainer.getMainClient();
                if (mainClient) {
                    mainClient.startLiveStreaming(url, false)
                        .then(() => {
                            AgoraConsole.log("startRtmpStreamWithoutTranscoding success");
                        })
                        .catch((e) => {
                            AgoraConsole.error("startRtmpStreamWithoutTranscoding failed");
                            AgoraConsole.error(e);
                        })
                        .finally(() => {
                            next();
                        })
                }
                else {
                    next();
                }
            },

            args: [url]
        })
        return 0;
    }

    //todo 记得要触发回调啊
    startRtmpStreamWithTranscoding(url: string, transcoding: agorartc.LiveTranscoding): number {
        this.putAction({
            fun: (url: string, transcoding: agorartc.LiveTranscoding, next) => {

                let process = async () => {
                    let mainClient = this._engine.entitiesContainer.getMainClient();
                    if (mainClient) {
                        try {
                            await mainClient.setLiveTranscoding(AgoraTranslate.agorartcLiveTranscoding2LiveStreamingTranscodingConfig(transcoding));
                            try {
                                await mainClient.startLiveStreaming(url, true);
                            }
                            catch (e) {
                                AgoraConsole.error("startRtmpStreamWithTranscoding startLiveStreaming failed");
                            }
                        }
                        catch (e) {
                            AgoraConsole.error("startRtmpStreamWithTranscoding setLiveTranscoding failed");
                        }
                    }

                    next();
                };
                setTimeout(process, 0);

            },
            args: [url, transcoding]
        })
        return 0;
    }

    updateRtmpTranscoding(transcoding: agorartc.LiveTranscoding): number {
        this.putAction({
            fun: (transcoding: agorartc.LiveTranscoding, next) => {
                let mainClient = this._engine.entitiesContainer.getMainClient();
                if (mainClient) {
                    mainClient.setLiveTranscoding(AgoraTranslate.agorartcLiveTranscoding2LiveStreamingTranscodingConfig(transcoding))
                        .then(() => {
                            AgoraConsole.log("updateRtmpTranscoding sucess");
                        })
                        .catch(() => {
                            AgoraConsole.error("updateRtmpTranscoding failed");
                        })
                        .finally(() => {
                            next();
                        })
                }
                else {
                    next();
                }
            },
            args: [transcoding]
        });

        return 0;
    }

    stopRtmpStream(url: string): number {
        this.putAction({

            fun: (url: string, next) => {
                let mainClient = this._engine.entitiesContainer.getMainClient();
                if (mainClient) {
                    mainClient.stopLiveStreaming(url)
                        .then(() => {
                            AgoraConsole.log("stopRtmpStream sucess");
                        })
                        .catch(() => {
                            AgoraConsole.error("stopRtmpStream failed");
                        })
                        .finally(() => {
                            next();
                        })
                }
                else {
                    next();
                }
            },
            args: [url]
        });

        return 0;
    }

    startLocalVideoTranscoder(config: agorartc.LocalTranscoderConfiguration): number {
        AgoraConsole.warn("startLocalVideoTranscoder not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    updateLocalTranscoderConfiguration(config: agorartc.LocalTranscoderConfiguration): number {
        AgoraConsole.warn("updateLocalTranscoderConfiguration not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    stopLocalVideoTranscoder(): number {
        AgoraConsole.warn("stopLocalVideoTranscoder not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    startPrimaryCameraCapture(config: agorartc.CameraCapturerConfiguration): number {
        return this._startCameraCapture(IrisVideoSourceType.kVideoSourceTypeCameraPrimary, config);
    }

    startSecondaryCameraCapture(config: agorartc.CameraCapturerConfiguration): number {
        return this._startCameraCapture(IrisVideoSourceType.kVideoSourceTypeCameraSecondary, config);
    }

    _startCameraCapture(videoSourceType: IrisVideoSourceType, config: agorartc.CameraCapturerConfiguration): number {
        this.putAction({
            fun: (videoSourceType: IrisVideoSourceType, config: agorartc.CameraCapturerConfiguration, next) => {
                if (this._engine.globalVariables.enabledVideo == false) {
                    AgoraConsole.error("please make enableVideo true before you start camera capture");
                    next();
                }
                else {

                    let process = async () => {
                        let trackPackage = this._engine.entitiesContainer.getLocalVideoTrackByType(videoSourceType);
                        if (trackPackage) {
                            AgoraConsole.warn("a camera track already created!!");
                            next();
                            return;
                        }
                        let videoConfig: CameraVideoTrackInitConfig = {};
                        if (config.deviceId != "") {
                            videoConfig.cameraId = config.deviceId;
                        }
                        else {
                            try {
                                let videoDevices = await ImplHelper.enumerateDevices(this._engine);
                                if (videoSourceType == IrisVideoSourceType.kVideoSourceTypeCameraPrimary) {
                                    videoConfig.cameraId = videoDevices[0]?.deviceId;
                                }
                                else if (videoSourceType == IrisVideoSourceType.kVideoSourceTypeCameraSecondary) {
                                    videoConfig.cameraId = videoDevices[1]?.deviceId;
                                }
                            }
                            catch (e) {
                                AgoraConsole.error("startCameraCapture enumerateDevices failed");
                                AgoraConsole.log(e);
                            }
                        }
                        videoConfig.facingMode = AgoraTranslate.agorartcCAMERA_DIRECTION2string(config.cameraDirection);
                        videoConfig.encoderConfig = AgoraTranslate.agorartcVideoFormat2VideoEncoderConfiguration(config.format);
                        try {
                            let videoTrack = await AgoraRTC.createCameraVideoTrack(videoConfig);
                            let globalVariables = this._engine.globalVariables;
                            globalVariables.enabledVideo && videoTrack.play(this._engine.generateVideoTrackLabelOrHtmlElement("0", 0, videoSourceType));

                            if (globalVariables.pausedVideo) {
                                try {
                                    await videoTrack.setEnabled(false)
                                }
                                catch (reason) {
                                    AgoraConsole.error("audioTrack setMuted failed");
                                    reason && AgoraConsole.error(reason);
                                }
                            }
                            if (globalVariables.mutedLocalVideoStream) {
                                try {
                                    videoTrack.setMuted(true)
                                }
                                catch (reason) {
                                    AgoraConsole.error("audioTrack setMuted failed");
                                    reason && AgoraConsole.error(reason);
                                }
                            }
                            this._engine.entitiesContainer.addLocalVideoTrack({ type: videoSourceType, track: videoTrack });
                        }
                        catch (e) {
                            AgoraConsole.error("createCameraVideoTrack failed");
                            e && AgoraConsole.error(e);
                        }

                        next();
                    };

                    setTimeout(process, 0);
                }

            },
            args: [videoSourceType, config]
        });

        return 0;
    }

    stopPrimaryCameraCapture(): number {
        return this._stopCameraCapture(IrisVideoSourceType.kVideoSourceTypeCameraPrimary);
    }

    stopSecondaryCameraCapture(): number {
        return this._stopCameraCapture(IrisVideoSourceType.kVideoSourceTypeCameraSecondary);
    }

    _stopCameraCapture(videoSourceType: IrisVideoSourceType): number {
        this.putAction({
            fun: (videoSourceType: IrisVideoSourceType, next) => {
                let process = async () => {
                    let entitiesContainer = this._engine.entitiesContainer;
                    let trackPackage = entitiesContainer.getLocalVideoTrackByType(videoSourceType);
                    if (trackPackage) {
                        let track: ICameraVideoTrack = trackPackage.track as ICameraVideoTrack;
                        await entitiesContainer.videoTrackWillClose(track);
                        track.close();
                    }
                    next();
                }
                setTimeout(process, 0);
            },
            args: [videoSourceType]
        });
        return 0;
    }

    setCameraDeviceOrientation(type: agorartc.VIDEO_SOURCE_TYPE, orientation: agorartc.VIDEO_ORIENTATION): number {
        AgoraConsole.warn("setCameraDeviceOrientation not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    setScreenCaptureOrientation(type: agorartc.VIDEO_SOURCE_TYPE, orientation: agorartc.VIDEO_ORIENTATION): number {
        AgoraConsole.warn("setScreenCaptureOrientation not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    startPrimaryScreenCapture(config: agorartc.ScreenCaptureConfiguration): number {
        return this.startScreenCaptureByDisplayId(0, null, config.params, IrisVideoSourceType.kVideoSourceTypeCameraPrimary);
    }

    startSecondaryScreenCapture(config: agorartc.ScreenCaptureConfiguration): number {
        return this.startScreenCaptureByDisplayId(0, null, config.params, IrisVideoSourceType.kVideoSourceTypeCameraSecondary);
    }

    stopPrimaryScreenCapture(): number {
        this._stopScreenCapture(IrisVideoSourceType.kVideoSourceTypeScreenPrimary);
        return 0;
    }

    stopSecondaryScreenCapture(): number {
        this._stopScreenCapture(IrisVideoSourceType.kVideoSourceTypeCameraSecondary);
        return 0;
    }

    _stopScreenCapture(videoSource: IrisVideoSourceType) {
        this.putAction({
            fun: (videoSource: IrisVideoSourceType, next) => {
                let videoTrackPackage = this._engine.entitiesContainer.getLocalVideoTrackByType(videoSource);
                if (videoTrackPackage) {
                    let videoTrack = videoTrackPackage.track as ILocalVideoTrack;
                    this._engine.entitiesContainer.videoTrackWillClose(videoTrack)
                        .then(() => {

                        })
                        .catch(() => {

                        })
                        .finally(() => {
                            videoTrack.close();
                            next();
                        })

                }
                else {
                    next();
                }
            },
            args: [videoSource]
        })
    }

    getConnectionState(): agorartc.CONNECTION_STATE_TYPE {
        let mainClient: IAgoraRTCClient = this._engine.entitiesContainer.getMainClient();
        if (mainClient) {
            return AgoraTranslate.ConnectionState2agorartcCONNECTION_STATE_TYPE(mainClient.connectionState);
        }
        else {
            return agorartc.CONNECTION_STATE_TYPE.CONNECTION_STATE_DISCONNECTED;
        }
    }

    setRemoteUserPriority(uid: number, userPriority: agorartc.PRIORITY_TYPE): number {
        AgoraConsole.warn("setRemoteUserPriority not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    registerPacketObserver(observer: agorartc.IPacketObserver): number {
        AgoraConsole.warn("setRemoteUserPriority not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    setEncryptionMode(encryptionMode: string): number {
        this.putAction({
            fun: (encryptionMode: string, next) => {
                this._engine.mainClientVariables.encryptionConfig.config.encryptionMode = AgoraTranslate.string2agorartcENCRYPTION_MODE(encryptionMode);
                next();
            },
            args: [encryptionMode]
        })
        return 0;
    }

    setEncryptionSecret(secret: string): number {
        this.putAction({
            fun: (secret: string, next) => {
                this._engine.mainClientVariables.encryptionConfig.config.encryptionKey = secret;
                next();
            },
            args: [secret]
        })
        return 0;
    }

    enableEncryption(enabled: boolean, config: agorartc.EncryptionConfig): number {
        this.putAction({
            fun: (enabled: boolean, config: agorartc.EncryptionConfig, next) => {

                let encryptionConfig = this._engine.mainClientVariables.encryptionConfig;
                encryptionConfig.enabled = enabled;
                encryptionConfig.config = config;

                //在mainClient joinChannel的时候，再去读取这个值决定要不要设置加密，而不是现在设置
                next();
            },
            args: [enabled, config]
        })

        return 0;
    }

    createDataStream(streamId: number, reliable: boolean, ordered: boolean): number {
        AgoraConsole.warn("createDataStream not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    createDataStream2(streamId: number, config: agorartc.DataStreamConfig): number {
        AgoraConsole.warn("createDataStream with config not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    sendStreamMessage(streamId: number, data: string, length: number): number {
        AgoraConsole.warn("sendStreamMessage not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    addVideoWatermark(watermark: agorartc.RtcImage): number {
        AgoraConsole.warn("addVideoWatermark not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    addVideoWatermark2(watermarkUrl: string, options: agorartc.WatermarkOptions): number {
        AgoraConsole.warn("addVideoWatermark with options not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    clearVideoWatermark(): number {
        AgoraConsole.warn("clearVideoWatermark not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    clearVideoWatermarks(): number {
        AgoraConsole.warn("clearVideoWatermarks not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    addInjectStreamUrl(url: string, config: agorartc.InjectStreamConfig): number {
        this.putAction({
            fun: (url: string, config: agorartc.InjectStreamConfig, next) => {
                let conf: InjectStreamConfig = AgoraTranslate.agorartcInjectStreamConfig2InjectStreamConfig(config);
                let mainClient: IAgoraRTCClient = this._engine.entitiesContainer.getMainClient();
                if (mainClient) {
                    mainClient.addInjectStreamUrl(url, conf)
                        .then(() => {
                            AgoraConsole.log("addInjectStreamUrl success");
                        })
                        .catch(() => {
                            AgoraConsole.error("addInjectStreamUrl failed");
                        })
                        .finally(() => {
                            next();
                        })
                }
                else {
                    AgoraConsole.error("ensure call this methond after join channel");
                    next();
                }
                next();
            },
            args: [url, config]
        })
        return 0;
    }

    removeInjectStreamUrl(url: string): number {
        this.putAction({
            fun: (url: string, next) => {
                let mainClient: IAgoraRTCClient = this._engine.entitiesContainer.getMainClient();
                if (mainClient) {
                    mainClient.removeInjectStreamUrl()
                        .then(() => {
                            AgoraConsole.log("removeInjectStreamUrl success");
                        })
                        .catch((e) => {
                            AgoraConsole.error("removeInjectStreamUrl failed");
                            AgoraConsole.error(e);
                        }).
                        finally(() => {
                            next();
                        })
                }
                else {
                    next();
                }
            },
            args: [url]
        });
        return 0;
    }

    pauseAudio(): number {

        this.putAction({
            fun: (next) => {

                let processAudioTracks = async () => {
                    this._engine.globalVariables.pausedAudio = true;
                    //找到本地audio
                    let trackPackages = this._engine.entitiesContainer.getLocalAudioTracks();
                    for (let trackPackage of trackPackages) {
                        let track = trackPackage.track as ILocalAudioTrack;
                        if (track.enabled == true) {
                            try {
                                await track.setEnabled(false);
                            }
                            catch (e) {
                                AgoraConsole.error('track setEnable(true) failed');
                                AgoraConsole.error(e);
                            }
                        }
                    }

                    //找到远端audio
                    let remoteUsers = this._engine.entitiesContainer.getAllRemoteUsers();
                    for (let remoteUser of remoteUsers) {
                        if (remoteUser.audioTrack && remoteUser.audioTrack.isPlaying) {
                            remoteUser.audioTrack.stop();
                        }
                    }

                    next();
                }

                setTimeout(processAudioTracks, 0);
            },
            args: []
        })
        return 0;
    }

    resumeAudio(): number {
        this.putAction({
            fun: (next) => {

                let processAudioTracks = async () => {

                    this._engine.globalVariables.pausedAudio = false;
                    //找到本地audio
                    let trackPackages = this._engine.entitiesContainer.getLocalAudioTracks();
                    for (let trackPackage of trackPackages) {
                        let track = trackPackage.track as ILocalAudioTrack;
                        if (track.enabled == false) {
                            try {
                                await track.setEnabled(true);
                            }
                            catch (e) {
                                AgoraConsole.error('track setEnable(true) failed');
                                AgoraConsole.error(e);
                            }
                        }
                    }

                    //找到远端audio
                    let remoteUsers = this._engine.entitiesContainer.getAllRemoteUsers();
                    for (let remoteUser of remoteUsers) {

                        if (remoteUser.audioTrack && remoteUser.audioTrack.isPlaying == false) {
                            remoteUser.audioTrack.play();
                        }
                    }

                    next();
                }

                setTimeout(processAudioTracks, 0);
            },
            args: []
        })
        return 0;
    }

    enableWebSdkInteroperability(enabled: boolean): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    sendCustomReportMessage(id: string, category: string, event: string, label: string, value: number): number {
        this.putAction({
            fun: (id: string, category: string, event: string, label: string, value: number, next) => {
                let mainClinet: IAgoraRTCClient = this._engine.entitiesContainer.getMainClient();

                if (mainClinet) {
                    mainClinet.sendCustomReportMessage({
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
                    AgoraConsole.error("sendCustomReportMessage failed, make sure you already join channel");
                    next();
                }
            },
            args: [id, category, event, label, value]
        })
        return 0;
    }

    registerMediaMetadataObserver(observer: agorartc.IMetadataObserver, type: agorartc.METADATA_TYPE): number {
        AgoraConsole.warn("registerMediaMetadataObserver not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    unregisterMediaMetadataObserver(observer: agorartc.IMetadataObserver, type: agorartc.METADATA_TYPE): number {
        AgoraConsole.warn("unregisterMediaMetadataObserver not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    startAudioFrameDump(channel_id: string, user_id: number, location: string, uuid: string, passwd: string, duration_ms: number, auto_upload: boolean): number {
        AgoraConsole.warn("startAudioFrameDump not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    stopAudioFrameDump(channel_id: string, user_id: number, location: string): number {
        AgoraConsole.warn("stopAudioFrameDump not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    registerLocalUserAccount(appId: string, userAccount: string): number {
        AgoraConsole.warn("registerLocalUserAccount not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    joinChannelWithUserAccount(token: string, channelId: string, userAccount: string): number {
        AgoraConsole.warn("joinChannelWithUserAccount not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    joinChannelWithUserAccount2(token: string, channelId: string, userAccount: string, options: agorartc.ChannelMediaOptions): number {
        AgoraConsole.warn("joinChannelWithUserAccount2 not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    joinChannelWithUserAccountEx(token: string, channelId: string, userAccount: string, options: agorartc.ChannelMediaOptions): number {
        AgoraConsole.warn("joinChannelWithUserAccountEx not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    getUserInfoByUserAccount(userAccount: string, userInfo: agorartc.UserInfo): number {
        AgoraConsole.warn("getUserInfoByUserAccount not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    getUserInfoByUid(uid: number, userInfo: agorartc.UserInfo): number {
        AgoraConsole.warn("getUserInfoByUserAccount not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    startChannelMediaRelay(configuration: agorartc.ChannelMediaRelayConfiguration): number {
        this.putAction({
            fun: (configuration: agorartc.ChannelMediaRelayConfiguration, next) => {
                let mainClient = this._engine.entitiesContainer.getMainClient();
                if (mainClient) {
                    this._engine.mainClientVariables.currChannelMediaRelayconfiguration = configuration;
                    ImplHelper.pretreatmentChannelMediaRelayConfiguration(this._engine, configuration);
                    let conf: IChannelMediaRelayConfiguration = AgoraTranslate.agorartcChannelMediaRelayConfiguration2IChannelMediaRelayConfiguration(configuration);
                    console.log(conf);
                    mainClient.startChannelMediaRelay(conf)
                        .then(() => {
                            AgoraConsole.log("startChannelMediaRelay success");
                        })
                        .catch((reason) => {
                            AgoraConsole.error("startChannelMediaRelay failed");
                            AgoraConsole.error(reason);
                        })
                        .finally(() => {
                            next();
                        })
                }
                else {
                    AgoraConsole.error("startChannelMediaRelay failed, Please make sure call this method after join channel!");
                    next();
                }
            },
            args: [configuration]
        })

        return 0;
    }

    updateChannelMediaRelay(configuration: agorartc.ChannelMediaRelayConfiguration): number {
        this.putAction({
            fun: (configuration: agorartc.ChannelMediaRelayConfiguration, next) => {
                let mainClient = this._engine.entitiesContainer.getMainClient();
                if (mainClient) {
                    this._engine.mainClientVariables.currChannelMediaRelayconfiguration = configuration;
                    ImplHelper.pretreatmentChannelMediaRelayConfiguration(this._engine, configuration);
                    let conf: IChannelMediaRelayConfiguration = AgoraTranslate.agorartcChannelMediaRelayConfiguration2IChannelMediaRelayConfiguration(configuration);
                    mainClient.updateChannelMediaRelay(conf)
                        .then(() => {
                            AgoraConsole.log("updateChannelMediaRelay success");
                        })
                        .catch((reason) => {
                            AgoraConsole.error("updateChannelMediaRelay failed");
                            AgoraConsole.error(reason);
                        })
                        .finally(() => {
                            next();
                        })
                }
                else {
                    AgoraConsole.error("updateChannelMediaRelay failed, Please make sure call this method after join channel!");
                    next();
                }
            },
            args: [configuration]
        })
        return 0;
    }

    stopChannelMediaRelay(): number {
        this.putAction({
            fun: (next) => {
                this._engine.mainClientVariables.currChannelMediaRelayconfiguration = null;
                let mainClient = this._engine.entitiesContainer.getMainClient();
                if (mainClient) {
                    mainClient.stopChannelMediaRelay()
                        .then(() => {
                            AgoraConsole.log("stopChannelMediaRelay success");
                        })
                        .catch((reason) => {
                            AgoraConsole.error("stopChannelMediaRelay failed");
                            AgoraConsole.error(reason);
                        })
                        .finally(() => {
                            next();

                        })
                }
                else {
                    AgoraConsole.error("stopChannelMediaRelay failed, Please make sure call this method after join channel!");
                    next();
                }
            },
            args: []
        })
        return 0;
    }

    pauseAllChannelMediaRelay(): number {
        this.putAction({
            fun: (next) => {
                let mainClient = this._engine.entitiesContainer.getMainClient();
                if (mainClient) {
                    mainClient.stopChannelMediaRelay()
                        .then(() => {
                            AgoraConsole.log("pauseAllChannelMediaRelay success");
                        })
                        .catch((reason) => {
                            AgoraConsole.error("pauseAllChannelMediaRelay failed");
                            AgoraConsole.error(reason);
                        })
                        .finally(() => {
                            next();

                        })
                }
                else {
                    AgoraConsole.error("pauseAllChannelMediaRelay failed, Please make sure call this method after join channel!");
                    next();
                }
            },
            args: []
        })
        return 0;
    }
    resumeAllChannelMediaRelay(): number {
        this.putAction({
            fun: (next) => {
                let mainClient = this._engine.entitiesContainer.getMainClient();
                let configuration = this._engine.mainClientVariables.currChannelMediaRelayconfiguration;
                if (mainClient && configuration) {
                    ImplHelper.pretreatmentChannelMediaRelayConfiguration(this._engine, configuration);
                    let conf: IChannelMediaRelayConfiguration = AgoraTranslate.agorartcChannelMediaRelayConfiguration2IChannelMediaRelayConfiguration(configuration);
                    mainClient.startChannelMediaRelay(conf)
                        .then(() => {
                            AgoraConsole.log("resumeAllChannelMediaRelay success");
                        })
                        .catch((reason) => {
                            AgoraConsole.error("resumeAllChannelMediaRelay failed");
                            AgoraConsole.error(reason);
                        })
                        .finally(() => {
                            next();
                        })
                }
                else {
                    AgoraConsole.error("resumeAllChannelMediaRelay failed, Please make sure call this method after join channel or call startChannelMediaRelay");
                    next();
                }
            },
            args: []
        })
        return 0;
    }

    //DirectCdnStreaming 稍后再加上
    setDirectCdnStreamingAudioConfiguration(profile: agorartc.AUDIO_PROFILE_TYPE): number {
        //等后边再加上这个功能
        AgoraConsole.warn("setDirectCdnStreamingAudioConfiguration not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    setDirectCdnStreamingVideoConfiguration(config: agorartc.VideoEncoderConfiguration): number {
        AgoraConsole.warn("setDirectCdnStreamingVideoConfiguration not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    startDirectCdnStreaming(eventHandler: agorartc.IDirectCdnStreamingEventHandler, publishUrl: string, options: agorartc.DirectCdnStreamingMediaOptions): number {
        AgoraConsole.warn("startDirectCdnStreaming not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    stopDirectCdnStreaming(): number {
        AgoraConsole.warn("stopDirectCdnStreaming not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    updateDirectCdnStreamingMediaOptions(options: agorartc.DirectCdnStreamingMediaOptions): number {
        AgoraConsole.warn("updateDirectCdnStreamingMediaOptions not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    //是否可以使用2个音频轨道，来回播放来实现这个功能
    startRhythmPlayer(sound1: string, sound2: string, config: agorartc.AgoraRhythmPlayerConfig): number {
        AgoraConsole.warn("startRhythmPlayer not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    stopRhythmPlayer(): number {
        AgoraConsole.warn("stopRhythmPlayer not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    configRhythmPlayer(config: agorartc.AgoraRhythmPlayerConfig): number {
        AgoraConsole.warn("configRhythmPlayer not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    //要不，直接用ImageData渲染个jpg，然后浏览器自动下载。
    takeSnapshot(config: agorartc.SnapShotConfig): number {
        let videoParams = this._engine.entitiesContainer.getVideoFrame(config.uid, config.channel);
        if (videoParams) {
            let videoTrack = videoParams.video_track;
            if (videoTrack.isPlaying) {
                let track = videoTrack as any;
                if (track._player && track._player.videoElement) {
                    let videoElement = track._player.videoElement;
                    let fileName = AgoraTool.spliceFileName(config.filePath);

                    html2canvas(videoElement)
                        .then((canvas) => {
                            AgoraTool.downloadCanvasAsImage(canvas, fileName);
                            let channelId = this._engine.entitiesContainer.getMainClient()?.channelName || "";
                            let uid = 0;
                            let connection: agorartc.RtcConnection = {
                                channelId: channelId,
                                localUid: uid
                            };
                            this._engine.rtcEngineEventHandler.onSnapshotTakenEx(connection, fileName, canvas.width, canvas.height, 0);
                        })
                        .catch(() => {
                            let channelId = this._engine.entitiesContainer.getMainClient()?.channelName || "";
                            let uid = 0;
                            let connection: agorartc.RtcConnection = {
                                channelId: channelId,
                                localUid: uid
                            };
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

    setContentInspect(config: agorartc.ContentInspectConfig): number {
        this.putAction({
            fun: (config: agorartc.ContentInspectConfig, next) => {

                if (config.enable)
                    this._engine.mainClientVariables.contentInspect = config;
                else
                    this._engine.mainClientVariables.contentInspect = null;

                let mainClient: IAgoraRTCClient = this._engine.entitiesContainer.getMainClient();
                if (mainClient) {
                    if (config.enable) {
                        mainClient.enableContentInspect(AgoraTranslate.agorartcContentInspectConfig2InspectConfiguration(config))
                            .then(() => {
                                AgoraConsole.log("setContentInspect enable success");
                            })
                            .catch((reason) => {
                                AgoraConsole.log("setContentInspect enable failed");
                                AgoraConsole.log(reason);
                            })
                            .finally(() => {
                                next();
                            })
                    }
                    else {
                        mainClient.disableContentInspect()
                            .then(() => {
                                AgoraConsole.log("setContentInspect diable success");
                            })
                            .catch((reason) => {
                                AgoraConsole.log("setContentInspect diable failed");
                                AgoraConsole.log(reason);
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
            args: [config]
        })

        return 0;
    }

    adjustCustomAudioPublishVolume(sourceId: number, volume: number): number {
        AgoraConsole.warn("adjustCustomAudioPublishVolume not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    adjustCustomAudioPlayoutVolume(sourceId: number, volume: number): number {
        AgoraConsole.warn("adjustCustomAudioPlayoutVolume not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    setCloudProxy(proxyType: agorartc.CLOUD_PROXY_TYPE): number {
        this.putAction({
            fun: (proxyType: agorartc.CLOUD_PROXY_TYPE, next) => {

                this._engine.globalVariables.cloudProxy = proxyType;
                let mainClient = this._engine.entitiesContainer.getMainClient();
                if (mainClient) {
                    if (proxyType == agorartc.CLOUD_PROXY_TYPE.NONE_PROXY) {
                        mainClient.stopProxyServer();
                    }
                    else if (proxyType == agorartc.CLOUD_PROXY_TYPE.UDP_PROXY) {
                        mainClient.startProxyServer(3);
                    }
                    else if (proxyType == agorartc.CLOUD_PROXY_TYPE.TCP_PROXY) {
                        mainClient.startProxyServer(5);
                    }
                }

                let subClients = this._engine.entitiesContainer.getSubClients();
                subClients.walkT((channelId: string, uid: UID, client: IAgoraRTCClient) => {
                    if (proxyType == agorartc.CLOUD_PROXY_TYPE.NONE_PROXY) {
                        client.stopProxyServer();
                    }
                    else if (proxyType == agorartc.CLOUD_PROXY_TYPE.UDP_PROXY) {
                        client.startProxyServer(3);
                    }
                    else if (proxyType == agorartc.CLOUD_PROXY_TYPE.TCP_PROXY) {
                        client.startProxyServer(5);
                    }
                })

                next();
            },
            args: [proxyType]
        })

        return 0;
    }

    setLocalAccessPoint(config: agorartc.LocalAccessPointConfiguration): number {
        AgoraConsole.warn("setLocalAccessPoint not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    enableFishEyeCorrection(enabled: boolean, params: agorartc.FishEyeCorrectionParams): number {
        AgoraConsole.warn("enableFishEyeCorrection not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    setAdvancedAudioOptions(options: agorartc.AdvancedAudioOptions): number {
        this.putAction({
            fun: (options: agorartc.AdvancedAudioOptions, next) => {
                this._engine.globalVariables.audioProcessingChannels = options.audioProcessingChannels;
                //todo 会有地方用到这个东西的嘛
                next();
            },
            args: [options]
        })
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    setAVSyncSource(channelId: string, uid: number): number {
        AgoraConsole.warn("setAVSyncSource not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    enableVideoImageSource(enable: boolean, options: agorartc.ImageTrackOptions): number {
        AgoraConsole.warn("setAVSyncSource not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    enableWirelessAccelerate(enabled: boolean): number {
        AgoraConsole.warn("enableWirelessAccelerate not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
}