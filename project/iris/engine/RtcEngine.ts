import * as agorartc from '../terra/rtc_types/Index';
import { IRtcEngine } from '../terra/IRtcEngine';
import { IrisApiEngine } from './IrisApiEngine';
import { IrisRtcEngine } from './IrisRtcEngine';
import { Action, AgoraActionQueue } from '../tool/AgoraActionQueue';
import { AgoraConsole } from '../tool/AgoraConsole';
import AgoraRTC, { CameraVideoTrackInitConfig, ClientConfig, ClientRoleOptions, DeviceInfo, EncryptionMode, IAgoraRTCClient, IAgoraRTCRemoteUser, ICameraVideoTrack, IChannelMediaRelayConfiguration, ILocalAudioTrack, ILocalTrack, ILocalVideoTrack, IMicrophoneAudioTrack, InjectStreamConfig, IRemoteAudioTrack, MicrophoneAudioTrackInitConfig, ScreenVideoTrackInitConfig, UID, VideoPlayerConfig } from 'agora-rtc-sdk-ng';
import { AgoraTranslate } from '../tool/AgoraTranslate';
import { IrisGlobalVariables } from '../variable/IrisGlobalVariables';
import { AudioTrackPackage, IrisAudioSourceType, IrisClientType, IrisVideoSourceType, VideoParams, VideoTrackPackage } from '../base/BaseType';
import { RtcConnection, THREAD_PRIORITY_TYPE, VideoTrackInfo } from '../terra/rtc_types/Index';
import { IrisMainClientVariables } from '../variable/IrisMainClientVariables';
import { Argument } from 'webpack';
import { IrisClientEventHandler } from '../event_handler/IrisClientEventHandler';
import { IrisTrackEventHandler } from '../event_handler/IrisTrackEventHandler';
import { IrisSubClientVariables } from '../variable/IrisSubClientVariables';
import html2canvas from 'html2canvas';
import { AgoraTool } from '../tool/AgoraTool';

export class RtcEngine implements IRtcEngine {

    private _engine: IrisRtcEngine = null;
    private _actonQueue: AgoraActionQueue;

    constructor(engine: IrisRtcEngine) {
        this._engine = engine;
        this._actonQueue = new AgoraActionQueue(this);
    }

    public putAction(action: Action) {
        this._actonQueue.putAction(action);
    }

    initialize(context: agorartc.RtcEngineContext): number {
        this._engine.globalVariables.appId = context.appId;
        this._engine.mainClientVariables.channelProfile = context.channelProfile;
        this._engine.globalVariables.audioScenario = context.audioScenario;
        this._engine.globalVariables.areaCode = context.areaCode;
        this._engine.globalVariables.enabledLocalVideo = context.enableAudioDevice;

        AgoraRTC.setArea([AgoraTranslate.agorartcAREA_CODE2AREAS(context.areaCode)]);

        AgoraConsole.logLevel = context.logConfig.level;
        let numberLevel: number = AgoraTranslate.agorartcLOG_LEVEL2Number(context.logConfig.level);
        AgoraRTC.setLogLevel(numberLevel);

        let result = AgoraRTC.checkSystemRequirements();
        if (result) {
            AgoraConsole.log("AgoraRTC.checkSystemRequirements return true");
        }
        else {
            AgoraConsole.warn("AgoraRTC.checkSystemRequirements reutrn false");
        }

        //enumerate divice
        this._enumerateDevices()
            .then(() => { })
            .catch(() => { })
            .finally(() => {
                this._engine.rtcEngineEventHandler.OnDevicesEnumerated();
            });

        return 0;
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

    //这个接口在400被删除了
    addPublishStreamUrlEx(url: string, transcodingEnabled: boolean, connection: agorartc.RtcConnection): number {
        AgoraConsole.warn("This method is deprecated. Use StartRtmpStreamWithoutTranscoding or StartRtmpStreamWithTranscoding instead according to your needs");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    setLiveTranscoding(transcoding: agorartc.LiveTranscoding) {
        AgoraConsole.warn("This method is deprecated. Use StartRtmpStreamWithoutTranscoding or StartRtmpStreamWithTranscoding instead according to your needs");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    setAppType(appType: number): number {
        AgoraRTC.setAppType(appType);
        return 0;
    }

    registerAudioFrameObserver(observer: agorartc.IAudioFrameObserver): number {
        AgoraConsole.warn("registerAudioFrameObserver not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    registerVideoFrameObserver(observer: agorartc.IVideoFrameObserver): number {
        AgoraConsole.warn("registerVideoFrameObserver not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    registerVideoEncodedFrameObserver(observer: agorartc.IVideoEncodedFrameObserver): number {
        AgoraConsole.warn("registerVideoEncodedFrameObserver not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    pushAudioFrame(type: agorartc.MEDIA_SOURCE_TYPE, frame: agorartc.AudioFrame, wrap: boolean, sourceId: number): number {
        AgoraConsole.warn("pushAudioFrame not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    pushCaptureAudioFrame(frame: agorartc.AudioFrame): number {
        AgoraConsole.warn("pushCaptureAudioFrame not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    pushReverseAudioFrame(frame: agorartc.AudioFrame): number {
        AgoraConsole.warn("pushReverseAudioFrame not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    pushDirectAudioFrame(frame: agorartc.AudioFrame): number {
        AgoraConsole.warn("pushDirectAudioFrame not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    pullAudioFrame(frame: agorartc.AudioFrame): number {
        AgoraConsole.warn("pullAudioFrame not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    setExternalVideoSource(enabled: boolean, useTexture: boolean, sourceType: agorartc.EXTERNAL_VIDEO_SOURCE_TYPE): number {
        AgoraConsole.warn("setExternalVideoSource not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    setExternalAudioSource(enabled: boolean, sampleRate: number, channels: number, sourceNumber: number, localPlayback: boolean, publish: boolean): number {
        AgoraConsole.warn("setExternalAudioSource not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    setExternalAudioSink(sampleRate: number, channels: number): number {
        AgoraConsole.warn("setExternalAudioSink not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    enableCustomAudioLocalPlayback(sourceId: number, enabled: boolean): number {
        AgoraConsole.warn("enableCustomAudioLocalPlayback not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    setDirectExternalAudioSource(enable: boolean, localPlayback: boolean): number {
        AgoraConsole.warn("setDirectExternalAudioSource not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    pushVideoFrame(frame: agorartc.ExternalVideoFrame): number {
        AgoraConsole.warn("pushVideoFrame not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    pushEncodedVideoImage(imageBuffer: Uint8ClampedArray, length: number, videoEncodedFrameInfo: agorartc.EncodedVideoFrameInfo): number {
        AgoraConsole.warn("pushEncodedVideoImage not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    //todo IVideoDeviceManager
    enumerateVideoDevices(): agorartc.DeviceInfo[] {
        this._enumerateDevices()
            .then((devices) => {
                let videoDevices = devices.videoDevices;
                this._engine.rtcEngineEventHandler.OnVideoDevicesEnumerated(videoDevices);
            })
            .catch((e) => {
                AgoraConsole.error("enumerateVideoDevices failed");
                AgoraConsole.log(e);
            });

        if (this._engine.globalVariables.deviceEnumerated) {
            return this._engine.globalVariables.videoDevices;
        }

        return [];
    }

    setDevice(deviceIdUTF8: string): number {
        this._actonQueue.putAction({
            fun: (deviceIdUTF8: string, next) => {
                this._engine.mainClientVariables.videoDeviceId = deviceIdUTF8;
                //todo 如果当前有LocalVideoTrack， 那么调用LocalVideoTrack.setDevice 
                this._engine.entitiesContainer.walkAllILocalVideoTrack((trackPackage: VideoTrackPackage) => {
                    if (trackPackage.type == IrisVideoSourceType.kVideoSourceTypeCameraPrimary || trackPackage.type == IrisVideoSourceType.kVideoSourceTypeCameraSecondary) {
                        let track: ICameraVideoTrack = trackPackage.track as ICameraVideoTrack;
                        track.setDevice(deviceIdUTF8)
                            .then(() => {
                                AgoraConsole.log("setDevice success");
                            })
                            .catch((reason) => {
                                AgoraConsole.error("setDevice failed");
                                AgoraConsole.error(reason);
                            })
                            .finally(() => {

                            })
                    }
                })
                next();
            },
            args: [deviceIdUTF8]
        })
        return 0;
    }

    getDevice(): string {
        if (this._engine.mainClientVariables.videoDeviceId) {
            return this._engine.mainClientVariables.videoDeviceId;
        }
        else if (this._engine.globalVariables.deviceEnumerated) {
            return this._engine.globalVariables.videoDevices[0]?.deviceId || "";
        }
        else {
            return "";
        }
    }

    numberOfCapabilities(deviceIdUTF8: string): number {
        AgoraConsole.warn("numberOfCapabilities not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    getCapability(deviceIdUTF8: string, deviceCapabilityNumber: number, capability: agorartc.VideoFormat): number {
        AgoraConsole.warn("getCapability not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    startDeviceTest(hwnd: any): number {
        AgoraConsole.warn("startDeviceTest not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    stopDeviceTest(): number {
        AgoraConsole.warn("stopDeviceTest not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    release(sync: boolean): void {
        this._actonQueue.putAction({
            fun: (sync: boolean, next) => {
                //todo 释放client , track, eventHandler
                next();
            },
            args: [sync]
        })
        return
    }

    queryInterface(iid: agorartc.INTERFACE_ID_TYPE, inter: void): number {
        AgoraConsole.warn("queryInterface not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    getVersion(): string {
        return AgoraRTC.VERSION;
    }

    getErrorDescription(code: number): string {
        AgoraConsole.warn("getErrorDescription not supported in this platfrom!");
        return "getErrorDescription not supported in this platfrom!";
    }

    joinChannel(token: string, channelId: string, info: string, uid: number): number {
        let options: agorartc.ChannelMediaOptions = {
            publishCameraTrack: true,
            publishSecondaryCameraTrack: false,
            publishAudioTrack: true,
            autoSubscribeAudio: true,
            autoSubscribeVideo: true,
            clientRoleType: agorartc.CLIENT_ROLE_TYPE.CLIENT_ROLE_BROADCASTER,
            defaultVideoStreamType: agorartc.VIDEO_STREAM_TYPE.VIDEO_STREAM_HIGH,
            channelProfile: agorartc.CHANNEL_PROFILE_TYPE.CHANNEL_PROFILE_COMMUNICATION,
        };
        return this.joinChannel2(token, channelId, uid, options);
    }

    joinChannel2(token: string, channelId: string, uid: number, options: agorartc.ChannelMediaOptions): number {
        if (this._engine.mainClientVariables.joinChanneled == true) {
            AgoraConsole.error("already call joinChannel");
            return -agorartc.ERROR_CODE_TYPE.ERR_JOIN_CHANNEL_REJECTED;
        }

        this._engine.mainClientVariables.joinChanneled = true;
        this._actonQueue.putAction({
            fun: (token: string, channelId: string, uid: number, options: agorartc.ChannelMediaOptions, next) => {

                let processJoinChannel = async () => {
                    // this._engine.mainClientVariables.startPreviewed = false;
                    let mainClientVariables: IrisMainClientVariables = this._engine.mainClientVariables;
                    let globalVariables = this._engine.globalVariables;
                    mainClientVariables.mergeChannelMediaOptions(options);
                    let mainClient: IAgoraRTCClient = this._createMainClient();
                    try {
                        //在JoinChannel之前就必须监听client的event，不然在Join过程中触发的回调会丢失呢
                        let entitiesContainer = this._engine.entitiesContainer;
                        entitiesContainer.setMainClient(mainClient);
                        let clientEventHandler = new IrisClientEventHandler(mainClient, IrisClientType.kClientMian, this._engine);
                        entitiesContainer.setMainClientEventHandler(clientEventHandler);
                        uid = await mainClient.join(globalVariables.appId, channelId, token ? token : null, uid) as number;
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

                        try {
                            let trackArray = await this.getOrCreateAudioAndVideoTrackAsync(audioSource, videoSource, clientType, null);
                            clientEventHandler.onJoinChannedlSucess(0);

                            //joinChannel success咯
                            let mainClientVariables = this._engine.mainClientVariables;
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

                            //推送摄像头video
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

                            //创建mainClient的时候已经读取了这个值了，所以不需要再set一下呢
                            // if (options.clientRoleType != null) {
                            //     let roleOptions: ClientRoleOptions = null;
                            //     if (options.audienceLatencyLevel != null) {
                            //         roleOptions = AgoraTranslate.agorartcAUDIENCE_LATENCY_LEVEL_TYPE2ClientRoleOptions(options.audienceLatencyLevel);
                            //     }

                            //     try {
                            //         mainClient.setClientRole(
                            //             AgoraTranslate.agorartcCLIENT_ROLE_TYPE2ClientRole(options.clientRoleType),
                            //             roleOptions
                            //         )
                            //     }
                            //     catch (e) {

                            //     }
                            // }
                        }
                        catch (e) {
                            AgoraConsole.error("join channel failed. create audio And videoTrack failed");
                            AgoraConsole.error(e);
                            let channelId = mainClient.channelName;
                            mainClient.leave().then(() => { }).catch(() => { }).finally(() => {
                                this._engine.entitiesContainer.clearMainClientAll(channelId);
                            });
                            this._engine.mainClientVariables.joinChanneled = false;
                        }
                    }
                    catch (reason) {
                        AgoraConsole.error("join channel failed: join failed");
                        reason && AgoraConsole.error(reason);
                        this._engine.rtcEngineEventHandler.onError(agorartc.ERROR_CODE_TYPE.ERR_JOIN_CHANNEL_REJECTED, "");
                        this._engine.mainClientVariables.joinChanneled = false;
                        this._engine.entitiesContainer.clearMainClientAll(null);
                    }

                    next();
                }

                setTimeout(processJoinChannel, 0);

                // this._engine.mainClientVariables.startPreviewed = false;
                // let mainClientVariables: IrisMainClientVariables = this._engine.mainClientVariables;
                // let globalVariables = this._engine.globalVariables;
                // mainClientVariables.mergeChannelMediaOptions(options);

                // let mainClient: IAgoraRTCClient = this._createMainClient();

                // mainClient.join(globalVariables.appId, channelId, token ? token : null, uid)
                //     .then((uid: UID) => {
                //         this._engine.mainClientVariables.token = token;
                //         let audioSource = IrisAudioSourceType.kAudioSourceTypeMicrophonePrimary;
                //         let videoSource = IrisVideoSourceType.kVideoSourceTypeCameraPrimary;
                //         let clientType = IrisClientType.kClientMian;

                //         this.getOrCreateAudioAndVideoTrack(
                //             audioSource,
                //             videoSource,
                //             clientType,
                //             (err: any, trackArray: [ILocalAudioTrack, ILocalVideoTrack]) => {
                //                 if (err) {
                //                     AgoraConsole.error("join channel failed. create audio And videoTrack failed");
                //                     AgoraConsole.error(err);
                //                     mainClient.leave().then(() => { }).catch(() => { }).finally(() => {
                //                         this._engine.entitiesContainer.clearMainClientAll();
                //                         next();
                //                     });
                //                 }
                //                 else {
                //                     let entitiesContainer = this._engine.entitiesContainer;
                //                     entitiesContainer.setMainClient(mainClient);
                //                     entitiesContainer.setMainClientEventHandler(new IrisClientEventHandler(mainClient, IrisClientType.kClientMian, this._engine));
                //                     let mainClientVariables = this._engine.mainClientVariables;

                //                     //推送麦克风audio
                //                     let audioTrack: IMicrophoneAudioTrack = trackArray[0] as IMicrophoneAudioTrack;
                //                     if (mainClientVariables.publishMicrophoneTrack) {

                //                         entitiesContainer.addMainClientLocalAudioTrack({ type: audioSource, track: audioTrack });
                //                         let trackEventHandler: IrisTrackEventHandler = new IrisTrackEventHandler({
                //                             channelName: channelId,
                //                             client: mainClient,
                //                             track: audioTrack,
                //                             trackType: 'ILocalTrack',
                //                         }, this._engine);
                //                         entitiesContainer.addMainClientTrackEventHandler(trackEventHandler);

                //                         mainClient.publish(audioTrack)
                //                             .then(() => {
                //                                 AgoraConsole.log("audio track publish sucess");
                //                             })
                //                             .catch((reason) => {
                //                                 AgoraConsole.error("audio track publish failed");
                //                                 AgoraConsole.error(reason);
                //                                 entitiesContainer.removeMainClientTrackEventHandlerByTrack(audioTrack);
                //                                 entitiesContainer.removeMainClientLocalAudioTrack(audioTrack);
                //                             })
                //                     }

                //                     //推送屏幕共享audio
                //                     if (mainClientVariables.publishScreenCaptureAudio) {
                //                         let audioTrackPackage = this._engine.entitiesContainer.getLocalAudioTrackByType(IrisAudioSourceType.kAudioSourceTypeScreenPrimary);
                //                         if (audioTrackPackage) {
                //                             let audioTrack = audioTrackPackage.track as ILocalAudioTrack;

                //                             entitiesContainer.addMainClientLocalAudioTrack({ type: IrisAudioSourceType.kAudioSourceTypeScreenPrimary, track: audioTrack });
                //                             let trackEventHandler: IrisTrackEventHandler = new IrisTrackEventHandler({
                //                                 channelName: channelId,
                //                                 client: mainClient,
                //                                 track: audioTrack,
                //                                 trackType: 'ILocalTrack',
                //                             }, this._engine);
                //                             entitiesContainer.addMainClientTrackEventHandler(trackEventHandler);

                //                             mainClient.publish(audioTrack)
                //                                 .then(() => {
                //                                     AgoraConsole.log("screen share audio track publish sucess");
                //                                 })
                //                                 .catch((reason) => {
                //                                     AgoraConsole.error("screen share audio track publish failed");
                //                                     AgoraConsole.error(reason);
                //                                     entitiesContainer.removeMainClientTrackEventHandlerByTrack(audioTrack);
                //                                     entitiesContainer.removeMainClientLocalAudioTrack(audioTrack);
                //                                 })
                //                         }
                //                     }

                //                     //推送摄像头video
                //                     let videoTrack: ICameraVideoTrack = trackArray[1] as ICameraVideoTrack;
                //                     if (mainClientVariables.publishCameraTrack) {

                //                         entitiesContainer.setMainClientLocalVideoTrack({ type: IrisVideoSourceType.kVideoSourceTypeCameraPrimary, track: videoTrack });
                //                         let trackEventHandler: IrisTrackEventHandler = new IrisTrackEventHandler({
                //                             channelName: channelId,
                //                             client: mainClient,
                //                             track: videoTrack,
                //                             trackType: 'ILocalVideoTrack',
                //                         }, this._engine);
                //                         entitiesContainer.addMainClientTrackEventHandler(trackEventHandler);

                //                         mainClient.publish(videoTrack)
                //                             .then(() => {
                //                                 AgoraConsole.log("video track publish sucess");
                //                             })
                //                             .catch((reason) => {
                //                                 AgoraConsole.error("video track publish failed");
                //                                 AgoraConsole.error(reason);
                //                                 entitiesContainer.removeMainClientTrackEventHandlerByTrack(videoTrack);
                //                                 entitiesContainer.clearMainClientLocalVideoTrack();
                //                             })
                //                     }
                //                     else if (mainClientVariables.publishScreenTrack || mainClientVariables.publishScreenCaptureVideo) {
                //                         //推送屏幕共享流
                //                         let videoTrackPackage = this._engine.entitiesContainer.getLocalVideoTrackByType(IrisVideoSourceType.kVideoSourceTypeScreenPrimary);
                //                         if (videoTrackPackage) {
                //                             let videoTrack = videoTrackPackage.track as ILocalVideoTrack;

                //                             entitiesContainer.setMainClientLocalVideoTrack({ type: IrisVideoSourceType.kVideoSourceTypeScreenPrimary, track: videoTrack });
                //                             let trackEventHandler: IrisTrackEventHandler = new IrisTrackEventHandler({
                //                                 channelName: channelId,
                //                                 client: mainClient,
                //                                 track: audioTrack,
                //                                 trackType: "ILocalVideoTrack",
                //                             }, this._engine);
                //                             entitiesContainer.addMainClientTrackEventHandler(trackEventHandler);

                //                             mainClient.publish(videoTrack)
                //                                 .then(() => {
                //                                     AgoraConsole.log("screen share video track publish sucess");
                //                                 })
                //                                 .catch((reason) => {
                //                                     AgoraConsole.error("screen share video track publish failed");
                //                                     AgoraConsole.error(reason);
                //                                     entitiesContainer.removeMainClientTrackEventHandlerByTrack(videoTrack);
                //                                     entitiesContainer.clearMainClientLocalVideoTrack();
                //                                 })
                //                         }
                //                     }


                //                     if (options.clientRoleType != null) {
                //                         let roleOptions: ClientRoleOptions = null;
                //                         if (options.audienceLatencyLevel != null) {
                //                             roleOptions = AgoraTranslate.agorartcAUDIENCE_LATENCY_LEVEL_TYPE2ClientRoleOptions(options.audienceLatencyLevel);
                //                         }

                //                         mainClient.setClientRole(
                //                             AgoraTranslate.agorartcCLIENT_ROLE_TYPE2ClientRole(options.clientRoleType),
                //                             roleOptions
                //                         ).then(() => { }).catch(() => { }).finally(() => { })
                //                     }

                //                     next();
                //                 }
                //             },
                //         )
                //     })
                //     .catch((reason: any) => {
                //         AgoraConsole.error("join channel failed: join failed");
                //         AgoraConsole.error(reason);
                //         this._engine.mainClientVariables.joinChanneled = false;
                //         this._engine.entitiesContainer.clearMainClientAll();
                //         next();
                //     })
            },
            args: [token, channelId, uid, options]
        })

        return 0;

    }

    updateChannelMediaOptions(options: agorartc.ChannelMediaOptions): number {
        //这个地方有大坑，要小心处理
        this._actonQueue.putAction({
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

    leaveChannel(): number {
        let options: agorartc.LeaveChannelOptions = {
            stopAudioMixing: true,
            stopAllEffect: true,
            stopMicrophoneRecording: true
        };
        return this.leaveChannel2(options);
    }

    leaveChannel2(options: agorartc.LeaveChannelOptions): number {
        //离开频道啦 稍后处理
        if (this._engine.mainClientVariables.joinChanneled == false) {
            AgoraConsole.error("you must join channel before you call this method");
            return -agorartc.ERROR_CODE_TYPE.ERR_FAILED;
        }

        this._engine.mainClientVariables.joinChanneled = false;
        this._actonQueue.putAction({
            fun: (options: agorartc.LeaveChannelOptions, next) => {
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
                            this._engine.entitiesContainer.getMainClientEventHandler()?.onLeaveChannel(con, new agorartc.RtcStats());
                            this._engine.entitiesContainer.clearMainClientAll(channelId);
                        })
                        .catch((reason) => {
                            AgoraConsole.error('leaveChannel failed');
                            reason && AgoraConsole.error(reason);
                            this._engine.rtcEngineEventHandler.onError(agorartc.ERROR_CODE_TYPE.ERR_LEAVE_CHANNEL_REJECTED, "");
                        })
                        .finally(() => {
                            next();
                        })
                }
                else {
                    next();
                }
            },
            args: [options]
        })
        return 0;

    }

    renewToken(token: string): number {
        this._actonQueue.putAction({
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
        this._actonQueue.putAction({
            fun: (profile: agorartc.CHANNEL_PROFILE_TYPE, next) => {
                this._engine.mainClientVariables.channelProfile = profile;
                next();
            },
            args: [profile]
        })
        return 0;
    }

    //可以在加入频道前后调用
    setClientRole(role: agorartc.CLIENT_ROLE_TYPE): number {
        let options: agorartc.ClientRoleOptions = {
            audienceLatencyLevel: agorartc.AUDIENCE_LATENCY_LEVEL_TYPE.AUDIENCE_LATENCY_LEVEL_ULTRA_LOW_LATENCY,
            stopMicrophoneRecording: false,
            stopPreview: false
        };
        return this.setClientRole2(role, options);
    }

    setClientRole2(role: agorartc.CLIENT_ROLE_TYPE, options: agorartc.ClientRoleOptions): number {
        this._actonQueue.putAction({
            fun: (role: agorartc.CLIENT_ROLE_TYPE, options: agorartc.ClientRoleOptions, next) => {
                this._engine.mainClientVariables.clientRoleType = role;

                this._engine.entitiesContainer.getMainClient()?.setClientRole(
                    AgoraTranslate.agorartcCLIENT_ROLE_TYPE2ClientRole(role),
                    AgoraTranslate.agorartcClientRoleOptions2ClientRoleOptions(options)
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

                next();
            },
            args: [role, options]
        })
        return 0;
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

    startPreview(): number {
        return this.startPreview2(agorartc.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA);
    }

    startPreview2(sourceType: agorartc.VIDEO_SOURCE_TYPE): number {
        this._actonQueue.putAction({

            fun: (sourceType: agorartc.VIDEO_SOURCE_TYPE, next) => {

                if (this._engine.globalVariables.enabledVideo == false) {
                    AgoraConsole.error("call enableVideo(true) before startPreview");
                    next();
                    return;
                }

                // if (this._engine.mainClientVariables.startPreviewed == true) {
                //     AgoraConsole.error("you already call startPreview");
                //     next();
                //     return;
                // }

                if (sourceType >= 4) {
                    AgoraConsole.error("Invalid source type");
                    next();
                    return;
                }

                // this._engine.mainClientVariables.startPreviewed = true;

                let audioSource: IrisAudioSourceType = IrisAudioSourceType.kAudioSourceTypeUnknow;
                let videoSource: IrisVideoSourceType = sourceType as number;



                let process = async () => {
                    try {
                        await this.getOrCreateAudioAndVideoTrackAsync(audioSource, videoSource, IrisClientType.kClientMian, null);
                        AgoraConsole.log("start preview createCameraVideoTrack success");
                    }
                    catch (err) {
                        AgoraConsole.error("Start preview failed: create video and audio track failed");
                        err && AgoraConsole.error(err);
                        // this._engine.mainClientVariables.startPreviewed = false;
                    }
                    next();
                }

                setTimeout(process, 0);


                // this.getOrCreateAudioAndVideoTrack(
                //     audioSource,
                //     videoSource,
                //     IrisClientType.kClientMian,
                //     (err: any, trackArray: [ILocalAudioTrack, ILocalVideoTrack]) => {
                //         if (err) {
                //             AgoraConsole.error("Start preview failed: create video and audio track failed");
                //             AgoraConsole.error(err);
                //             this._engine.mainClientVariables.startPreviewed = false;
                //         }
                //         else {
                //             let audioTrack = trackArray[0];
                //             let videoTrack = trackArray[1];
                //             AgoraConsole.log("start preview createCameraVideoTrack success");
                //         }
                //         next();
                //     }
                // )
            },
            args: [sourceType]
        })
        return 0;
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
            this._actonQueue.putAction({
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
        this._actonQueue.putAction({
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

    setupLocalVideo(canvas: agorartc.VideoCanvas): number {
        AgoraConsole.warn("setupLocalVideo not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    enableAudio(): number {
        this._actonQueue.putAction({
            fun: (next) => {

                let processAudioTracks = async () => {
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

                    next();
                }

                setTimeout(processAudioTracks, 0);

            },
            args: []
        })

        return 0;
    }

    disableAudio(): number {

        this._actonQueue.putAction({
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

    setAudioProfile(profile: agorartc.AUDIO_PROFILE_TYPE, scenario: agorartc.AUDIO_SCENARIO_TYPE): number {

        this._actonQueue.putAction({

            fun: (profile: agorartc.AUDIO_PROFILE_TYPE, scenario: agorartc.AUDIO_SCENARIO_TYPE, next) => {
                this._engine.globalVariables.audioProfile = profile;
                this._engine.globalVariables.audioScenario = scenario;
                //todo 是否需要去设置当前所有音频属性
                next();
            },
            args: [profile, scenario]
        })
        return 0;
    }

    setAudioProfile2(profile: agorartc.AUDIO_PROFILE_TYPE): number {
        this._actonQueue.putAction({
            fun: (profile: agorartc.AUDIO_PROFILE_TYPE, next) => {
                this._engine.globalVariables.audioProfile = profile;
                //todo  是否需要去设置当前所有音频属性 目前找不到这个设置

                next();
            },
            args: [profile]
        });
        return 0;
    }

    setAudioScenario(scenario: agorartc.AUDIO_SCENARIO_TYPE): number {
        this._actonQueue.putAction({
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
        this._actonQueue.putAction({
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
        this._actonQueue.putAction({
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
        this._actonQueue.putAction({
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
        this._actonQueue.putAction({
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
        this._actonQueue.putAction({
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

    enableVideo(): number {
        this._actonQueue.putAction({
            fun: (next) => {

                let processVideoTrack = async () => {
                    this._engine.globalVariables.enabledVideo = true;

                    //找到本端video
                    if (this._engine.globalVariables.enabledLocalVideo) {
                        let trackPackages = this._engine.entitiesContainer.getLocalVideoTracks();
                        for (let trackPackage of trackPackages) {
                            let track = trackPackage.track as ILocalVideoTrack;
                            if (track.isPlaying == false) {
                                try {
                                    await track.play(this._engine.generateVideoTrackLabelOrHtmlElement("", 0, trackPackage.type));
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
                                remoteUser.videoTrack.play(this._engine.generateVideoTrackLabelOrHtmlElement(mainClient.channelName, remoteUser.uid as number, IrisVideoSourceType.kVideoSourceTypeRemote))
                            }
                        }
                    }

                    //subClient的远端用户
                    entitiesContainer.getSubClients().walkT((channel_id, uid, subClient) => {
                        let remoteUsers = subClient.remoteUsers;
                        for (let remoteUser of remoteUsers) {
                            if (remoteUser.hasVideo && remoteUser.videoTrack && remoteUser.videoTrack.isPlaying == false) {
                                remoteUser.videoTrack.play(this._engine.generateVideoTrackLabelOrHtmlElement(mainClient.channelName, remoteUser.uid as number, IrisVideoSourceType.kVideoSourceTypeRemote))
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

    disableVideo(): number {
        this._actonQueue.putAction({
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
        this._actonQueue.putAction({
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
        this._actonQueue.putAction({
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
        this._actonQueue.putAction({
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
        this._actonQueue.putAction({
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
        this._actonQueue.putAction({
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
        this._actonQueue.putAction({
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
        this._actonQueue.putAction({
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
        this._actonQueue.putAction({
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
        this._actonQueue.putAction({
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

        this._actonQueue.putAction({
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

        this._actonQueue.putAction({
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
        this._actonQueue.putAction({
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

        this._actonQueue.putAction({

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

        this._actonQueue.putAction({
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
        this._actonQueue.putAction({
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
        this._actonQueue.putAction({
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
                            AgoraConsole.error("setCameraCapturerConfiguration success");
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
        this._actonQueue.putAction({
            fun: (next) => {
                let trackPack = this._engine.entitiesContainer.getLocalVideoTrackByType(IrisVideoSourceType.kVideoSourceTypeCameraPrimary);
                if (trackPack) {
                    let process = async () => {
                        let videoTrack: ICameraVideoTrack = trackPack.track as ICameraVideoTrack;
                        let curDeviceName: string = (videoTrack as any)._deviceName;

                        try {
                            let allDevices = await (await this._enumerateDevices()).videoDevices;
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
        this._actonQueue.putAction({
            fun: (displayId: number, regionRect: agorartc.Rectangle, captureParams: agorartc.ScreenCaptureParameters, videoSourceType: IrisVideoSourceType, next) => {
                this._engine.globalVariables.screenCaptureParameters = captureParams;

                let process = async () => {
                    let audioType = IrisAudioSourceType.kAudioSourceTypeUnknow;
                    let videoType = videoSourceType;
                    let clientType = IrisClientType.kClientMian;
                    try {
                        let trackArray = await this.getOrCreateAudioAndVideoTrackAsync(audioType, videoType, clientType, null);
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

        this._actonQueue.putAction({
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
        // this._actonQueue.putAction({
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

        this._actonQueue.putAction({
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
        this._actonQueue.putAction({
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
        this._actonQueue.putAction({
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
        this._actonQueue.putAction({
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
        this._actonQueue.putAction({

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
        this._actonQueue.putAction({
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
                            let videoDevices = await this._enumerateDevices();
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
        this._actonQueue.putAction({
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
        AgoraConsole.warn("stopPrimaryScreenCapture not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    stopSecondaryScreenCapture(): number {
        AgoraConsole.warn("stopSecondaryScreenCapture not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
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
        this._actonQueue.putAction({
            fun: (encryptionMode: string, next) => {
                this._engine.mainClientVariables.encryptionConfig.config.encryptionMode = AgoraTranslate.string2agorartcENCRYPTION_MODE(encryptionMode);
                next();
            },
            args: [encryptionMode]
        })
        return 0;
    }

    setEncryptionSecret(secret: string): number {
        this._actonQueue.putAction({
            fun: (secret: string, next) => {
                this._engine.mainClientVariables.encryptionConfig.config.encryptionKey = secret;
                next();
            },
            args: [secret]
        })
        return 0;
    }

    enableEncryption(enabled: boolean, config: agorartc.EncryptionConfig): number {
        this._actonQueue.putAction({
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
        this._actonQueue.putAction({
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
        this._actonQueue.putAction({
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

        this._actonQueue.putAction({
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
        this._actonQueue.putAction({
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
        this._actonQueue.putAction({
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
        this._actonQueue.putAction({
            fun: (configuration: agorartc.ChannelMediaRelayConfiguration, next) => {
                let mainClient = this._engine.entitiesContainer.getMainClient();
                if (mainClient) {
                    this._engine.mainClientVariables.currChannelMediaRelayconfiguration = configuration;
                    this._pretreatmentChannelMediaRelayConfiguration(configuration);
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
        this._actonQueue.putAction({
            fun: (configuration: agorartc.ChannelMediaRelayConfiguration, next) => {
                let mainClient = this._engine.entitiesContainer.getMainClient();
                if (mainClient) {
                    this._engine.mainClientVariables.currChannelMediaRelayconfiguration = configuration;
                    this._pretreatmentChannelMediaRelayConfiguration(configuration);
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
        this._actonQueue.putAction({
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
        this._actonQueue.putAction({
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
        this._actonQueue.putAction({
            fun: (next) => {
                let mainClient = this._engine.entitiesContainer.getMainClient();
                let configuration = this._engine.mainClientVariables.currChannelMediaRelayconfiguration;
                if (mainClient && configuration) {
                    this._pretreatmentChannelMediaRelayConfiguration(configuration);
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
        this._actonQueue.putAction({
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
        this._actonQueue.putAction({
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
        this._actonQueue.putAction({
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

    joinChannelEx(token: string, connection: agorartc.RtcConnection, options: agorartc.ChannelMediaOptions): number {

        this._actonQueue.putAction({
            fun: (token: string, connection: agorartc.RtcConnection, options: agorartc.ChannelMediaOptions, next) => {

                let processJoinChannel = async () => {
                    let subClientVariables: IrisSubClientVariables = this._engine.subClientVariables;
                    let globalVariables = this._engine.globalVariables;
                    let fullOptions = subClientVariables.mergeChannelMediaOptions(connection, options);
                    fullOptions.token = token;

                    let subClient: IAgoraRTCClient = this._createSubClient(connection);
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

                    try {
                        let entitiesContainer = this._engine.entitiesContainer;
                        entitiesContainer.addSubClient(connection, subClient);
                        let subClientEventHandler = new IrisClientEventHandler(subClient, IrisClientType.kClientSub, this._engine);
                        entitiesContainer.addSubClientEventHandler(connection, subClientEventHandler);
                        let uid = await subClient.join(globalVariables.appId, connection.channelId, token ? token : null, connection.localUid)
                        connection.localUid = uid as number;

                        try {
                            let trackArray = await this.getOrCreateAudioAndVideoTrackAsync(audioSource, videoSource, clientType, connection);

                            subClientEventHandler.onJoinChannedlSucess(0);

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

                            // //推送屏幕共享audio
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

                        }
                        catch (err) {
                            AgoraConsole.error("join channelEx failed. create audio And videoTrack failed");
                            AgoraConsole.error(err);
                            subClient.leave().then(() => { }).catch(() => { }).finally(() => {
                                this._engine.entitiesContainer.clearSubClientAll(connection)
                            });
                        }
                    }
                    catch (reason) {
                        AgoraConsole.error("join channelEx failed: join failed");
                        AgoraConsole.error(reason);
                        this._engine.rtcEngineEventHandler.onError(agorartc.ERROR_CODE_TYPE.ERR_JOIN_CHANNEL_REJECTED, "");
                        this._engine.entitiesContainer.clearSubClientAll(connection);
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
        this._actonQueue.putAction({
            fun: (next) => {
                let subClient: IAgoraRTCClient = this._engine.entitiesContainer.getSubClient(connection);
                if (subClient) {
                    //todo 读取 options
                    subClient.leave()
                        .then(() => {
                            this._engine.entitiesContainer.getSubClientEventHandler(connection).onLeaveChannel(connection, new agorartc.RtcStats());
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
        this._actonQueue.putAction({
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
        this._actonQueue.putAction({

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

    setupRemoteVideoEx(canvas: agorartc.VideoCanvas, connection: agorartc.RtcConnection): number {
        AgoraConsole.warn("enableWirelessAccelerate not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    muteRemoteAudioStreamEx(uid: number, mute: boolean, connection: agorartc.RtcConnection): number {
        this._actonQueue.putAction({
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
        this._actonQueue.putAction({
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
        this._actonQueue.putAction({
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
        this._actonQueue.putAction({
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
        this._actonQueue.putAction({
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
        this._actonQueue.putAction({
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

        this._actonQueue.putAction({
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

    updateRemotePosition(uid: number, posInfo: agorartc.RemoteVoicePositionInfo): number {
        AgoraConsole.warn("updateRemotePosition not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    updateRemotePositionEx(uid: number, posInfo: agorartc.RemoteVoicePositionInfo, connection: agorartc.RtcConnection): number {
        AgoraConsole.warn("updateRemotePositionEx not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    removeRemotePosition(uid: number): number {
        AgoraConsole.warn("removeRemotePosition not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    removeRemotePositionEx(uid: number, connection: agorartc.RtcConnection): number {
        AgoraConsole.warn("removeRemotePositionEx not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    clearRemotePositions(): number {
        AgoraConsole.warn("clearRemotePositions not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    clearRemotePositionsEx(connection: agorartc.RtcConnection): number {
        AgoraConsole.warn("clearRemotePositionsEx not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    enumeratePlaybackDevices(): agorartc.DeviceInfo[] {
        this._enumerateDevices()
            .then((device) => {
                let playbackDevices = device.playbackDevices;
                this._engine.rtcEngineEventHandler.OnPlaybackDevicesEnumerated(playbackDevices);
            })
            .catch((e) => {
                AgoraConsole.error("enumeratePlaybackDevices failed");
                AgoraConsole.log(e);
            });

        if (this._engine.globalVariables.deviceEnumerated) {
            return this._engine.globalVariables.playbackDevices;
        }

        return [];
    }

    enumerateRecordingDevices(): agorartc.DeviceInfo[] {
        this._enumerateDevices()
            .then((device) => {
                let recordingDevices = device.recordingDevices;
                this._engine.rtcEngineEventHandler.OnRecordingDevicesEnumerated(recordingDevices);
            })
            .catch((e) => {
                AgoraConsole.error("enumerateRecordingDevices failed");
                AgoraConsole.log(e);
            });

        if (this._engine.globalVariables.deviceEnumerated) {
            return this._engine.globalVariables.recordingDevices;
        }

        return [];
    }

    setPlaybackDevice(deviceId: string): number {
        this._actonQueue.putAction({
            fun: (deviceId: string, next) => {

                let process = async () => {
                    this._engine.mainClientVariables.playbackDeviceId = deviceId;
                    let entitiesContainer = this._engine.entitiesContainer;
                    let localAudioTracks = entitiesContainer.getLocalAudioTracks();
                    for (let trackPackage of localAudioTracks) {
                        let track = trackPackage.track as ILocalAudioTrack;
                        try {
                            await track.setPlaybackDevice(deviceId)
                        }
                        catch (e) {
                            AgoraConsole.error("localAudioTrack setPlaybackDevice setFailed");
                        }
                    }

                    let remoteUsers = entitiesContainer.getAllRemoteUsers();
                    for (let remoteUser of remoteUsers) {
                        if (remoteUser.hasAudio && remoteUser.audioTrack) {
                            try {
                                await remoteUser.audioTrack.setPlaybackDevice(deviceId);
                            }
                            catch (e) {
                                AgoraConsole.error("remoteAudioTrack setPlaybackDevice setFailed");
                            }
                        }
                    }
                    next();
                };

                setTimeout(process, 0);
            },
            args: [deviceId]
        })

        return 0;
    }

    getPlaybackDevice(): string {
        if (this._engine.mainClientVariables.playbackDeviceId) {
            return this._engine.mainClientVariables.playbackDeviceId;
        }
        else if (this._engine.globalVariables.deviceEnumerated) {
            return this._engine.globalVariables.playbackDevices[0]?.deviceId || "";
        }
        else {
            return "";
        }
    }

    getPlaybackDeviceInfo(): agorartc.DeviceInfo {
        if (this._engine.mainClientVariables.playbackDeviceId) {
            for (let e of this._engine.globalVariables.playbackDevices) {
                if (e.deviceId == this._engine.mainClientVariables.playbackDeviceId)
                    return e;
            }
        }

        if (this._engine.globalVariables.deviceEnumerated) {
            return this._engine.globalVariables.playbackDevices[0] || { deviceId: "", deviceName: "" }
        }
        else {
            return { deviceId: "", deviceName: "" };
        }
    }

    setPlaybackDeviceVolume(volume: number): number {
        return this.adjustPlaybackSignalVolume(volume);
    }

    getPlaybackDeviceVolume(): number {
        return this._engine.globalVariables.playbackSignalVolume;
    }

    setRecordingDevice(deviceId: string): number {
        this._actonQueue.putAction({
            fun: (deviceId: string, next) => {
                this._engine.mainClientVariables.recordingDeviceId = deviceId;
                let trackPackage = this._engine.entitiesContainer.getLocalAudioTrackByType(IrisAudioSourceType.kAudioSourceTypeMicrophonePrimary);
                if (trackPackage) {
                    let track = trackPackage.track as IMicrophoneAudioTrack;
                    track.setDevice(deviceId)
                        .then(() => {
                            AgoraConsole.log("setRecordingDevice success");
                        })
                        .catch(() => {
                            AgoraConsole.error("setRecordingDevice failed");
                        })
                        .finally(() => {
                            next();
                        })
                }
                else {
                    next();
                }
            },
            args: [deviceId]
        })

        return 0;
    }

    getRecordingDevice(): string {
        if (this._engine.mainClientVariables.recordingDeviceId) {
            return this._engine.mainClientVariables.recordingDeviceId;
        }
        else if (this._engine.globalVariables.deviceEnumerated) {
            return this._engine.globalVariables.recordingDevices[0]?.deviceId || "";
        }
        else {
            return "";
        }
    }

    getRecordingDeviceInfo(): agorartc.DeviceInfo {
        if (this._engine.mainClientVariables.recordingDeviceId) {
            for (let e of this._engine.globalVariables.recordingDevices) {
                if (e.deviceId == this._engine.mainClientVariables.recordingDeviceId)
                    return e;
            }
        }

        if (this._engine.globalVariables.deviceEnumerated) {
            return this._engine.globalVariables.recordingDevices[0] || { deviceId: "", deviceName: "" }
        }
        else {
            return { deviceId: "", deviceName: "" };
        }
    }

    setRecordingDeviceVolume(volume: number): number {
        return this.adjustRecordingSignalVolume(volume);
    }

    getRecordingDeviceVolume(): number {
        return this._engine.globalVariables.recordingSignalVolume;
    }

    setPlaybackDeviceMute(mute: boolean): number {
        AgoraConsole.warn("setPlaybackDeviceMute not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    getPlaybackDeviceMute(mute: boolean): number {
        AgoraConsole.warn("getPlaybackDeviceMute not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    setRecordingDeviceMute(mute: boolean): number {
        AgoraConsole.warn("setRecordingDeviceMute not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    getRecordingDeviceMute(mute: boolean): number {
        AgoraConsole.warn("getRecordingDeviceMute not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    startPlaybackDeviceTest(testAudioFilePath: string): number {
        AgoraConsole.warn("startPlaybackDeviceTest not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    stopPlaybackDeviceTest(): number {
        AgoraConsole.warn("stopPlaybackDeviceTest not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    startRecordingDeviceTest(indicationInterval: number): number {
        AgoraConsole.warn("startRecordingDeviceTest not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    stopRecordingDeviceTest(): number {
        AgoraConsole.warn("stopRecordingDeviceTest not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    startAudioDeviceLoopbackTest(indicationInterval: number): number {
        AgoraConsole.warn("startAudioDeviceLoopbackTest not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    stopAudioDeviceLoopbackTest(): number {
        AgoraConsole.warn("stopAudioDeviceLoopbackTest not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    followSystemPlaybackDevice(enable: boolean): number {
        AgoraConsole.warn("followSystemPlaybackDevice not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    followSystemRecordingDevice(enable: boolean): number {
        AgoraConsole.warn("followSystemRecordingDevice not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }


    //IMediaPlayer
    open(playerId: number, url: string, startPos: number): number {
        AgoraConsole.warn("open not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    openWithCustomSource(playerId: number, startPos: number, provider: agorartc.IMediaPlayerCustomDataProvider): number {
        AgoraConsole.warn("openWithCustomSource not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    openWithMediaSource(playerId: number, source: agorartc.MediaSource): number {
        AgoraConsole.warn("openWithMediaSource not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    play(playerId: number): number {
        AgoraConsole.warn("play not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    pause(playerId: number): number {
        AgoraConsole.warn("pause not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    stop(playerId: number): number {
        AgoraConsole.warn("stop not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    resume(playerId: number): number {
        AgoraConsole.warn("resume not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    seek(playerId: number, newPos: number): number {
        AgoraConsole.warn("seek not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    setAudioPitch(playerId: number, pitch: number): number {
        AgoraConsole.warn("setAudioPitch not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    getDuration(playerId: number, duration: number): number {
        AgoraConsole.warn("getDuration not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    getPlayPosition(playerId: number, pos: number): number {
        AgoraConsole.warn("getPlayPosition not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    getStreamCount(playerId: number, count: number): number {
        AgoraConsole.warn("getStreamCount not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    getStreamInfo(playerId: number, index: number, info: agorartc.PlayerStreamInfo): number {
        AgoraConsole.warn("getStreamInfo not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    setLoopCount(playerId: number, loopCount: number): number {
        AgoraConsole.warn("setLoopCount not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    muteAudio(playerId: number, audio_mute: boolean): number {
        AgoraConsole.warn("muteAudio not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    isAudioMuted(playerId: number): boolean {
        AgoraConsole.warn("isAudioMuted not supported in this platfrom!");
        return false;
    }
    muteVideo(playerId: number, video_mute: boolean): number {
        AgoraConsole.warn("muteVideo not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    isVideoMuted(playerId: number): boolean {
        AgoraConsole.warn("isVideoMuted not supported in this platfrom!");
        return false;
    }
    setPlaybackSpeed(playerId: number, speed: number): number {
        AgoraConsole.warn("setPlaybackSpeed not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    selectAudioTrack(playerId: number, index: number): number {
        AgoraConsole.warn("selectAudioTrack not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    setPlayerOption(playerId: number, key: string, value: number): number {
        AgoraConsole.warn("setPlayerOption not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    setPlayerOption2(playerId: number, key: string, value: string): number {
        AgoraConsole.warn("setPlayerOption2 not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    takeScreenshot(playerId: number, filename: string): number {
        AgoraConsole.warn("takeScreenshot not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    selectInternalSubtitle(playerId: number, index: number): number {
        AgoraConsole.warn("selectInternalSubtitle not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    setExternalSubtitle(playerId: number, url: string): number {
        AgoraConsole.warn("setExternalSubtitle not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    getState(playerId: number): agorartc.MEDIA_PLAYER_STATE {
        AgoraConsole.warn("getState not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    mute(playerId: number, mute: boolean): number {
        AgoraConsole.warn("mute not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    getMute(playerId: number, result: any): number {
        AgoraConsole.warn("getMute not supported in this platfrom!");
        result.mute = false;
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    adjustPlayoutVolume(playerId: number, volume: number): number {
        AgoraConsole.warn("adjustPlayoutVolume not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    getPlayoutVolume(playerId: number, volume: number): number {
        AgoraConsole.warn("getPlayoutVolume not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    adjustPublishSignalVolume(playerId: number, volume: number): number {
        AgoraConsole.warn("adjustPublishSignalVolume not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    getPublishSignalVolume(playerId: number, volume: number): number {
        AgoraConsole.warn("getPublishSignalVolume not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    setView(playerId: number, view: any): number {
        AgoraConsole.warn("setView not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    setRenderMode(playerId: number, renderMode: agorartc.RENDER_MODE_TYPE): number {
        AgoraConsole.warn("setRenderMode not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    registerPlayerSourceObserver(playerId: number, observer: agorartc.IMediaPlayerSourceObserver): number {
        AgoraConsole.warn("registerPlayerSourceObserver not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    unregisterPlayerSourceObserver(playerId: number, observer: agorartc.IMediaPlayerSourceObserver): number {
        AgoraConsole.warn("unregisterPlayerSourceObserver not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    MediaPlayer_registerAudioFrameObserver(playerId: number, observer: agorartc.IAudioFrameObserver): number {
        AgoraConsole.warn("mediaPlayer_registerAudioFrameObserver not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    MediaPlayer_registerAudioFrameObserver2(playerId: number, observer: agorartc.IAudioFrameObserver, mode: agorartc.RAW_AUDIO_FRAME_OP_MODE_TYPE): number {
        AgoraConsole.warn("mediaPlayer_registerAudioFrameObserver2 not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    MediaPlayer_unregisterAudioFrameObserver(playerId: number, observer: agorartc.IAudioFrameObserver): number {
        AgoraConsole.warn("mediaPlayer_unregisterAudioFrameObserver not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    MediaPlayer_registerVideoFrameObserver(playerId: number, observer: agorartc.IVideoFrameObserver): number {
        AgoraConsole.warn("mediaPlayer_registerVideoFrameObserver not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    registerVideoEncodedImageReceiver(receiver: agorartc.IVideoEncodedImageReceiver): number {
        AgoraConsole.warn("registerVideoEncodedImageReceiver not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    MediaPlayer_unregisterVideoFrameObserver(playerId: number, observer: agorartc.IVideoFrameObserver): number {
        AgoraConsole.warn("mediaPlayer_unregisterVideoFrameObserver not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    registerMediaPlayerAudioSpectrumObserver(observer: agorartc.IAudioSpectrumObserver, intervalInMS: number): number {
        AgoraConsole.warn("registerMediaPlayerAudioSpectrumObserver not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    unregisterMediaPlayerAudioSpectrumObserver(playerId: number, observer: agorartc.IAudioSpectrumObserver): number {
        AgoraConsole.warn("unregisterMediaPlayerAudioSpectrumObserver not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    setAudioDualMonoMode(playerId: number, mode: agorartc.AUDIO_DUAL_MONO_MODE): number {
        AgoraConsole.warn("setAudioDualMonoMode not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    getPlayerSdkVersion(playerId: number): string {
        AgoraConsole.warn("getPlayerSdkVersion not supported in this platfrom!");
        return "";
    }
    getPlaySrc(playerId: number): string {
        AgoraConsole.warn("getPlaySrc not supported in this platfrom!");
        return "";
    }
    openWithAgoraCDNSrc(playerId: number, src: string, startPos: number): number {
        AgoraConsole.warn("openWithAgoraCDNSrc not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    getAgoraCDNLineCount(playerId: number): number {
        AgoraConsole.warn("getAgoraCDNLineCount not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    switchAgoraCDNLineByIndex(playerId: number, index: number): number {
        AgoraConsole.warn("switchAgoraCDNLineByIndex not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    getCurrentAgoraCDNIndex(playerId: number): number {
        AgoraConsole.warn("getCurrentAgoraCDNIndex not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    enableAutoSwitchAgoraCDN(playerId: number, enable: boolean): number {
        AgoraConsole.warn("enableAutoSwitchAgoraCDN not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    renewAgoraCDNSrcToken(playerId: number, token: string, ts: number): number {
        AgoraConsole.warn("renewAgoraCDNSrcToken not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    switchAgoraCDNSrc(playerId: number, src: string, syncPts: boolean): number {
        AgoraConsole.warn("switchAgoraCDNSrc not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    switchSrc(playerId: number, src: string, syncPts: boolean): number {
        AgoraConsole.warn("switchSrc not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    preloadSrc(playerId: number, src: string, startPos: number): number {
        AgoraConsole.warn("preloadSrc not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    playPreloadedSrc(playerId: number, src: string): number {
        AgoraConsole.warn("playPreloadedSrc not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    unloadSrc(playerId: number, src: string): number {
        AgoraConsole.warn("startRecordingDeviceTest not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    setSpatialAudioParams(playerId: number, params: agorartc.SpatialAudioParams): number {
        AgoraConsole.warn("setSpatialAudioParams not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    setSoundPositionParams(playerId: number, pan: number, gain: number): number {
        AgoraConsole.warn("setSoundPositionParams not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }


    // //TODO  先从已经创建的track里找，如果找不到，那么就去创建. 创建成功后，还要放到列表里哦
    // private getOrCreateAudioAndVideoTrack(audioType: IrisAudioSourceType, videoType: IrisVideoSourceType, clientType: IrisClientType, fun: (any, [ILocalAudioTrack, ILocalVideoTrack]) => void) {
    //     if (audioType == IrisAudioSourceType.kAudioSourceTypeUnknow && videoType == IrisVideoSourceType.kVideoSourceTypeUnknown) {
    //         AgoraConsole.error("getOrCreateAudioAndVideoTrack failed. want do you want ???");
    //         fun("you cant set both audio and video unknow", [null, null]);
    //         return;
    //     }

    //     var trackArray: Array<any> = [null, null];

    //     if (videoType == IrisVideoSourceType.kVideoSourceTypeScreenPrimary || videoType == IrisVideoSourceType.kVideoSourceTypeScreenSecondary) {
    //         //screen video
    //         if (audioType == IrisAudioSourceType.kAudioSourceTypeScreenPrimary || audioType == IrisAudioSourceType.kAudioSourceTypeScreenSecondary || audioType == IrisAudioSourceType.kAudioSourceTypeUnknow) {

    //             //屏幕视频 + 屏幕视频 or 空白
    //             let audioTrackPackage: AudioTrackPackage = this._engine.entitiesContainer.getLocalAudioTrackByType(IrisAudioSourceType.kAudioSourceTypeScreenPrimary);
    //             let videoTrackPackage: VideoTrackPackage = this._engine.entitiesContainer.getLocalVideoTrackByType(IrisVideoSourceType.kVideoSourceTypeScreenPrimary);

    //             if (audioTrackPackage && videoTrackPackage) {
    //                 fun(null, [audioTrackPackage.track as ILocalAudioTrack, videoTrackPackage.track as ILocalVideoTrack]);
    //                 return;
    //             }
    //             else {
    //                 //屏幕共享 audio 和 video 应该要同步创建和同步销毁
    //                 if (audioTrackPackage) {
    //                     this._engine.entitiesContainer.audioTrackWillClose(audioTrackPackage.track as ILocalAudioTrack);
    //                     (audioTrackPackage.track as ILocalAudioTrack).close();
    //                 }
    //                 if (videoTrackPackage) {
    //                     this._engine.entitiesContainer.videoTrackWillClose(videoTrackPackage.track as ILocalVideoTrack);
    //                     (videoTrackPackage.track as ILocalVideoTrack).close();
    //                 }
    //             }

    //             let conf: ScreenVideoTrackInitConfig = this._generateScreenVideoTrackInitConfig();
    //             AgoraRTC.createScreenVideoTrack(conf, 'enable')
    //                 .then((trackArray: [ILocalVideoTrack, ILocalAudioTrack]) => {
    //                     let videoTrack: ILocalVideoTrack = trackArray[0];
    //                     let audioTrack: ILocalAudioTrack = trackArray[1];
    //                     this._processSceneShareAuidoTrack(audioTrack, clientType);
    //                     this._processSceneShareVideoTrack(videoTrack, clientType);
    //                     this._engine.entitiesContainer.addLocalAudioTrack({ type: audioType, track: audioTrack });
    //                     this._engine.entitiesContainer.addLocalVideoTrack({ type: videoType, track: videoTrack });
    //                     fun(null, [trackArray[1], trackArray[0]]);
    //                 })
    //                 .catch((reason) => {
    //                     fun(reason, null);
    //                 })
    //         }
    //         else if (audioType == IrisAudioSourceType.kAudioSourceTypeMicrophonePrimary || audioType == IrisAudioSourceType.kAudioSourceTypeMicrophoneSecondary) {
    //             //屏幕共享视频 + 麦克风音频
    //             let onGetVideoTrack = (err: any, videoTrack: ILocalVideoTrack) => {
    //                 if (err) {
    //                     fun(err, null);
    //                 }

    //                 let audioTrackPackage = this._engine.entitiesContainer.getLocalAudioTrackByType(audioType);
    //                 if (audioTrackPackage) {
    //                     fun(null, [audioTrackPackage.track as ILocalAudioTrack, videoTrack]);
    //                     return;
    //                 }

    //                 AgoraRTC.createMicrophoneAudioTrack()
    //                     .then((audioTrack: IMicrophoneAudioTrack) => {
    //                         this._processAudioTrack(audioTrack, clientType);
    //                         this._engine.entitiesContainer.addLocalAudioTrack({ type: audioType, track: audioTrack });
    //                         fun(null, [audioTrack, videoTrack]);
    //                     })
    //                     .catch((reason) => {
    //                         fun(err, null);
    //                     })
    //             }

    //             let videoTrackPackage: VideoTrackPackage = this._engine.entitiesContainer.getLocalVideoTrackByType(videoType);
    //             if (videoTrackPackage) {
    //                 onGetVideoTrack(null, videoTrackPackage.track as ILocalVideoTrack);
    //             }
    //             else {
    //                 //屏幕共享 audio 和 video 应该要同步创建和同步销毁
    //                 let audioTrackPackage: AudioTrackPackage = this._engine.entitiesContainer.getLocalAudioTrackByType(IrisAudioSourceType.kAudioSourceTypeScreenPrimary);
    //                 if (audioTrackPackage) {
    //                     this._engine.entitiesContainer.audioTrackWillClose(audioTrackPackage.track as ILocalAudioTrack);
    //                     (audioTrackPackage.track as ILocalAudioTrack).close();
    //                 }
    //                 if (videoTrackPackage) {
    //                     this._engine.entitiesContainer.videoTrackWillClose(videoTrackPackage.track as ILocalVideoTrack);
    //                     (videoTrackPackage.track as ILocalVideoTrack).close();
    //                 }

    //                 let conf: ScreenVideoTrackInitConfig = this._generateScreenVideoTrackInitConfig();
    //                 AgoraRTC.createScreenVideoTrack(conf, 'enable')
    //                     .then((trackArray: [ILocalVideoTrack, ILocalAudioTrack]) => {
    //                         let videoTrack: ILocalVideoTrack = trackArray[0];
    //                         let audioTrack: ILocalAudioTrack = trackArray[1];
    //                         this._processSceneShareAuidoTrack(audioTrack, clientType);
    //                         this._processSceneShareVideoTrack(videoTrack, clientType);
    //                         this._engine.entitiesContainer.addLocalAudioTrack({ type: audioType, track: audioTrack });
    //                         this._engine.entitiesContainer.addLocalVideoTrack({ type: videoType, track: videoTrack });
    //                         onGetVideoTrack(null, videoTrack);
    //                     })
    //                     .catch((reason) => {
    //                         onGetVideoTrack(reason, null);
    //                     })
    //             }
    //         }
    //         else {
    //             //屏幕共享视频 + 不知道的音频
    //             fun("getOrCreateAudioAndVideoTrack failed: Invalid audio type :" + audioType, null);
    //         }
    //     }
    //     else if (videoType == IrisVideoSourceType.kVideoSourceTypeCameraPrimary || videoType == IrisVideoSourceType.kVideoSourceTypeCameraSecondary) {
    //         //camera video
    //         if (audioType == IrisAudioSourceType.kAudioSourceTypeMicrophonePrimary
    //             || audioType == IrisAudioSourceType.kAudioSourceTypeMicrophoneSecondary
    //             || audioType == IrisAudioSourceType.kAudioSourceTypeScreenPrimary
    //             || audioType == IrisAudioSourceType.kAudioSourceTypeScreenSecondary
    //         ) {
    //             //摄像头视频 + 麦克风音频 or 屏幕共享音频
    //             let onGetVideoTrack = (err: any, videoTrack: ILocalVideoTrack) => {
    //                 if (err) {
    //                     fun(err, null);
    //                 }

    //                 let audioTrackPackage = this._engine.entitiesContainer.getLocalAudioTrackByType(audioType);
    //                 if (audioTrackPackage) {
    //                     fun(err, [audioTrackPackage.track as ILocalAudioTrack, videoTrack]);
    //                     return;
    //                 }
    //                 else if (audioType == IrisAudioSourceType.kAudioSourceTypeMicrophonePrimary
    //                     || audioType == IrisAudioSourceType.kAudioSourceTypeMicrophoneSecondary) {

    //                     let audioConfig: MicrophoneAudioTrackInitConfig = this._generateMicrophoneAudioTrackInitConfig();
    //                     AgoraRTC.createMicrophoneAudioTrack(audioConfig)
    //                         .then((audioTrack: IMicrophoneAudioTrack) => {
    //                             this._processAudioTrack(audioTrack, clientType);
    //                             this._engine.entitiesContainer.addLocalAudioTrack({ type: audioType, track: audioTrack });
    //                             fun(null, [audioTrack, videoTrack]);
    //                         })
    //                         .catch((reason) => {
    //                             fun(reason, null);
    //                         });
    //                 }
    //                 else {
    //                     fun("cant find screen share audio track", null);
    //                 }
    //             };

    //             let videoTrackPackage = this._engine.entitiesContainer.getLocalVideoTrackByType(videoType);
    //             if (videoTrackPackage) {
    //                 onGetVideoTrack(null, videoTrackPackage.track as ILocalVideoTrack);
    //             }
    //             else {
    //                 let videoConfig: CameraVideoTrackInitConfig = this._generateCameraVideoTrackInitConfig();
    //                 AgoraRTC.createCameraVideoTrack(videoConfig)
    //                     .then((videoTrack: ICameraVideoTrack) => {
    //                         this._processVideoTrack(videoTrack, clientType);
    //                         this._engine.entitiesContainer.addLocalVideoTrack({ type: videoType, track: videoTrack });
    //                         onGetVideoTrack(null, videoTrack);
    //                     })
    //                     .catch((reason) => {
    //                         onGetVideoTrack(reason, null);
    //                     })
    //             }
    //         }
    //         else {
    //             //摄像头视频 + 位置音频
    //             fun("getOrCreateAudioAndVideoTrack failed: Invalid audio type :" + audioType, null);
    //         }
    //     }
    //     else if (videoType == IrisVideoSourceType.kVideoSourceTypeUnknown) {
    //         //不要视频 + 音频
    //         let audioTrackPackage = this._engine.entitiesContainer.getLocalAudioTrackByType(audioType);
    //         if (audioTrackPackage) {
    //             fun(null, [audioTrackPackage.track as ILocalAudioTrack, null]);
    //         }
    //         else if (audioType == IrisAudioSourceType.kAudioSourceTypeMicrophonePrimary || audioType == IrisAudioSourceType.kAudioSourceTypeMicrophoneSecondary) {

    //             let audioConfig: MicrophoneAudioTrackInitConfig = this._generateMicrophoneAudioTrackInitConfig();
    //             AgoraRTC.createMicrophoneAudioTrack(audioConfig)
    //                 .then((audioTrack: IMicrophoneAudioTrack) => {
    //                     this._processAudioTrack(audioTrack, clientType);
    //                     this._engine.entitiesContainer.addLocalAudioTrack({ type: audioType, track: audioTrack });
    //                     fun(null, [audioTrack, null]);
    //                 })
    //                 .catch((reason) => {
    //                     fun(reason, null);
    //                 });
    //         }
    //         else if (audioType == IrisAudioSourceType.kAudioSourceTypeScreenPrimary || audioType == IrisAudioSourceType.kAudioSourceTypeScreenSecondary) {
    //             fun("cant find screen share audio track", null);
    //         }
    //         else {
    //             fun("unkonw audio type", null);
    //         }
    //     }
    // }

    private async getOrCreateAudioAndVideoTrackAsync(audioType: IrisAudioSourceType, videoType: IrisVideoSourceType, clientType: IrisClientType, connection: agorartc.RtcConnection): Promise<[ILocalAudioTrack, ILocalVideoTrack]> {

        if (audioType == IrisAudioSourceType.kAudioSourceTypeUnknow && videoType == IrisVideoSourceType.kVideoSourceTypeUnknown) {
            AgoraConsole.warn("getOrCreateAudioAndVideoTrack  audio and video both unknow ");
            return [null, null];
        }


        if (videoType == IrisVideoSourceType.kVideoSourceTypeScreenPrimary && audioType == IrisAudioSourceType.kAudioSourceTypeScreenPrimary) {
            let audioPackage = this._engine.entitiesContainer.getLocalAudioTrackByType(audioType);
            let videoPackage = this._engine.entitiesContainer.getLocalVideoTrackByType(videoType);
            if (audioPackage && videoPackage) {
                return [audioPackage.track as ILocalAudioTrack, videoPackage.track as ILocalVideoTrack];
            }
            else {
                //屏幕共享 audio 和 video 应该要同步创建和同步销毁
                if (audioPackage) {
                    await this._engine.entitiesContainer.audioTrackWillClose(audioPackage.track as ILocalAudioTrack);
                    (audioPackage.track as ILocalAudioTrack).close();
                }
                if (videoPackage) {
                    await this._engine.entitiesContainer.videoTrackWillClose(videoPackage.track as ILocalVideoTrack);
                    (videoPackage.track as ILocalVideoTrack).close();
                }

                try {
                    let conf: ScreenVideoTrackInitConfig = this._generateScreenVideoTrackInitConfig();
                    let trackArray = await AgoraRTC.createScreenVideoTrack(conf, 'enable');

                    let videoTrack: ILocalVideoTrack = trackArray[0];
                    let audioTrack: ILocalAudioTrack = trackArray[1];
                    this._processSceneShareAuidoTrack(audioTrack, clientType);
                    this._processSceneShareVideoTrack(videoTrack, clientType, videoType);
                    this._engine.entitiesContainer.addLocalAudioTrack({ type: audioType, track: audioTrack });
                    this._engine.entitiesContainer.addLocalVideoTrack({ type: videoType, track: videoTrack });
                    return [audioTrack, videoTrack];
                }
                catch (e) {
                    throw e;
                }
            }
            return;
        }


        let retAudioTrack: ILocalAudioTrack = null;
        let retVideoTrack: ILocalVideoTrack = null;
        //video 
        if (this._engine.entitiesContainer.getLocalVideoTrackByType(videoType)) {
            retVideoTrack = this._engine.entitiesContainer.getLocalVideoTrackByType(videoType).track as ILocalVideoTrack;
        }
        else if (videoType == IrisVideoSourceType.kVideoSourceTypeScreenPrimary) {
            try {
                let conf: ScreenVideoTrackInitConfig = this._generateScreenVideoTrackInitConfig();
                let videoTrack: ILocalVideoTrack = await AgoraRTC.createScreenVideoTrack(conf, 'disable');
                this._processSceneShareVideoTrack(videoTrack, clientType, videoType);
                this._engine.entitiesContainer.addLocalVideoTrack({ type: videoType, track: videoTrack });
                retVideoTrack = videoTrack;
            }
            catch (e) {
                throw e;
            }
        }
        else if (videoType == IrisVideoSourceType.kVideoSourceTypeCameraPrimary || videoType == IrisVideoSourceType.kVideoSourceTypeCameraSecondary) {
            try {
                let videoConfig: CameraVideoTrackInitConfig = this._generateCameraVideoTrackInitConfig();
                let videoTrack = await AgoraRTC.createCameraVideoTrack(videoConfig);
                this._processVideoTrack(videoTrack, clientType, videoType, connection);
                this._engine.entitiesContainer.addLocalVideoTrack({ type: videoType, track: videoTrack });
                retVideoTrack = videoTrack;
            }
            catch (e) {
                throw e;
            }
        }

        //audio
        if (this._engine.entitiesContainer.getLocalAudioTrackByType(audioType)) {
            retAudioTrack = this._engine.entitiesContainer.getLocalAudioTrackByType(audioType).track as ILocalAudioTrack;
        }
        else if (audioType == IrisAudioSourceType.kAudioSourceTypeMicrophonePrimary) {
            try {
                let audioConfig: MicrophoneAudioTrackInitConfig = this._generateMicrophoneAudioTrackInitConfig();
                let audioTrack = await AgoraRTC.createMicrophoneAudioTrack(audioConfig);
                this._processAudioTrack(audioTrack, clientType);
                this._engine.entitiesContainer.addLocalAudioTrack({ type: audioType, track: audioTrack });
                retAudioTrack = audioTrack;
            }
            catch (e) {
                if (retVideoTrack) {
                    await this._engine.entitiesContainer.videoTrackWillClose(retVideoTrack);
                    retVideoTrack.close();
                }
                throw e;
            }
        }

        return [retAudioTrack, retVideoTrack];
    }





    //当一个audioTrack被创建的时候，要拆解这些参数
    private _processSceneShareAuidoTrack(audioTrack: ILocalAudioTrack, type: IrisClientType) {
        let globalVariables = this._engine.globalVariables;
        let mainClientVariables = this._engine.mainClientVariables;

        //audio
        if (mainClientVariables.playbackDeviceId) {
            audioTrack.setPlaybackDevice(mainClientVariables.playbackDeviceId)
                .then(() => { })
                .catch((reason) => {
                    AgoraConsole.error("audiotrack setPlaybackDevice failed");
                    reason && AgoraConsole.error(reason);
                })
                .finally(() => { })
        }
        if (globalVariables.enabledAudio) {
            audioTrack.play();
        }
        if (globalVariables.pausedAudio) {
            audioTrack.setEnabled(false)
                .then(() => { })
                .catch((reason) => {
                    AgoraConsole.error("audio track setEnabled failed");
                    reason && AgoraConsole.error(reason);
                })
                .finally(() => { })
        }

        if (globalVariables.mutedLocalAudioStream) {
            audioTrack.setMuted(true)
                .then(() => { })
                .catch((reason) => {
                    AgoraConsole.error("audio track setMuted failed");
                    reason && AgoraConsole.error(reason);
                })
                .finally(() => { })
        }
    }

    private _processSceneShareVideoTrack(videoTrack: ILocalVideoTrack, type: IrisClientType, videoSource: IrisVideoSourceType) {

        let globalVariables = this._engine.globalVariables;
        let mainClientVariables = this._engine.mainClientVariables;

        if (mainClientVariables.videoDeviceId) {
            //屏幕共享视频没有设备id咯
        }

        if (globalVariables.enabledVideo) {
            videoTrack.play(this._engine.generateVideoTrackLabelOrHtmlElement("0", 0, videoSource));
        }

        if (globalVariables.pausedVideo) {
            videoTrack.setEnabled(false)
                .then(() => { })
                .catch((reason) => {
                    AgoraConsole.error("video track setEnabled failed");
                    reason && AgoraConsole.error(reason);
                })
                .finally(() => { })
        }
        if (globalVariables.mutedLocalVideoStream) {
            videoTrack.setMuted(true)
                .then(() => { })
                .catch((reason) => {
                    AgoraConsole.error("video track setMuted failed");
                    reason && AgoraConsole.error(reason);
                })
                .finally(() => { })
        }
    }

    private _processAudioTrack(audioTrack: IMicrophoneAudioTrack, type: IrisClientType) {
        let globalVariables = this._engine.globalVariables;
        //这里play的话，自己会听到自己的声音,
        // if (globalVariables.enabledAudio) {
        //     // audioTrack.play();
        // }
        if (globalVariables.pausedAudio) {
            audioTrack.setEnabled(false)
                .then(() => {

                })
                .catch((reason) => {
                    AgoraConsole.error("audioTrack setEnable failed");
                    reason && AgoraConsole.error(reason);
                })
        }
        if (globalVariables.mutedLocalAudioStream) {
            audioTrack.setMuted(true)
                .then(() => {

                })
                .catch((reason) => {
                    AgoraConsole.error("audioTrack setMuted failed");
                    reason && AgoraConsole.error(reason);
                })
        }
    }

    private _processVideoTrack(videoTrack: ICameraVideoTrack, type: IrisClientType, videoSource: IrisVideoSourceType, connection: agorartc.RtcConnection) {
        let globalVariables = this._engine.globalVariables;
        if (globalVariables.enabledVideo) {
            let config: VideoPlayerConfig = {};

            let videoEncoderConfiguration: agorartc.VideoEncoderConfiguration = null;
            if (type == IrisClientType.kClientMian) {
                videoEncoderConfiguration = this._engine.mainClientVariables.videoEncoderConfiguration
            }
            else {
                videoEncoderConfiguration = this._engine.subClientVariables.videoEncoderConfigurations.getT(connection.channelId, connection.localUid);
            }

            if (videoEncoderConfiguration) {
                config.mirror = AgoraTranslate.agorartcVIDEO_MIRROR_MODE_TYPE2boolean(videoEncoderConfiguration.mirrorMode);
            }

            videoTrack.play(this._engine.generateVideoTrackLabelOrHtmlElement("0", 0, videoSource), config);
        }

        if (globalVariables.pausedVideo) {
            videoTrack.setEnabled(false)
                .then(() => {

                })
                .catch((reason) => {
                    AgoraConsole.error("audioTrack setMuted failed");
                    reason && AgoraConsole.error(reason);
                })
        }
        if (globalVariables.mutedLocalVideoStream) {
            videoTrack.setMuted(true)
                .then(() => {

                })
                .catch((reason) => {
                    AgoraConsole.error("audioTrack setMuted failed");
                    reason && AgoraConsole.error(reason);
                })
        }
    }



    private _createMainClient(): IAgoraRTCClient {


        let config: ClientConfig = this._generateMainClientConfig();
        let mainClient: IAgoraRTCClient = AgoraRTC.createClient(config);

        let mainClientVariables = this._engine.mainClientVariables;
        //设置远端默认是 大流还是小流
        if (mainClientVariables.remoteDefaultVideoStreamType != null) {
            mainClient.setRemoteDefaultVideoStreamType(AgoraTranslate.agorartcVIDEO_STREAM_TYPE2RemoteStreamType(mainClientVariables.remoteDefaultVideoStreamType))
                .then(() => {

                })
                .catch(() => {

                })
                .finally(() => {

                })
        }
        //设置指定的远端uid具体是大流还是小流
        for (let e of mainClientVariables.remoteVideoStreamTypes) {
            mainClient.setRemoteVideoStreamType(e[0], AgoraTranslate.agorartcVIDEO_STREAM_TYPE2RemoteStreamType(e[1]))
                .then(() => {

                })
                .catch(() => {

                })
                .finally(() => {

                })
        }

        //
        let videoSourceType: agorartc.VIDEO_SOURCE_TYPE;
        if (mainClientVariables.publishCameraTrack == true) {
            videoSourceType = agorartc.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA_PRIMARY;
        }
        else if (mainClientVariables.publishSecondaryCameraTrack == true) {
            videoSourceType = agorartc.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA_SECONDARY;
        }
        else if (mainClientVariables.publishScreenCaptureVideo == true) {
            videoSourceType = agorartc.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_SCREEN_PRIMARY;
        }

        //如果当前轨道被特别指定了，那么就设置一下
        if (mainClientVariables.enabledDualStreamModes.has(videoSourceType)) {
            let steamMode = mainClientVariables.enabledDualStreamModes.get(videoSourceType);
            if (steamMode.enabled) {
                mainClient.enableDualStream()
                    .then(() => {

                    })
                    .catch(() => {

                    })
                    .finally(() => {
                    });

                if (steamMode.streamConfig != null) {
                    mainClient.setLowStreamParameter(AgoraTranslate.agorartcSimulcastStreamConfig2LowStreamParameter(steamMode.streamConfig));
                }
            }
            else {
                mainClient.disableDualStream()
                    .then(() => {

                    })
                    .catch(() => {

                    })
                    .finally(() => {
                    });
            }
        }
        else {
            if (mainClientVariables.enabledDualStreamMode) {
                mainClient.enableDualStream()
                    .then(() => {

                    })
                    .catch(() => {

                    })
                    .finally(() => {
                    })
            }
        }

        //设置是否报告说话的人
        if (mainClientVariables.enabledAudioVolumeIndication) {
            mainClient.enableAudioVolumeIndicator();
            mainClientVariables.enabledAudioVolumeIndication = null;
        }


        //是否开启了加密
        if (mainClientVariables.encryptionConfig?.enabled) {
            let config: agorartc.EncryptionConfig = mainClientVariables.encryptionConfig.config;
            let encryptionMode: EncryptionMode = AgoraTranslate.agorartcENCRYPTION_MODE2EncryptionMode(config.encryptionMode);
            let salt: Uint8Array = new Uint8Array(config.encryptionKdfSalt);
            mainClient.setEncryptionConfig(encryptionMode, config.encryptionKey, salt);
            //加密只有一次生效
            mainClientVariables.encryptionConfig.enabled = false;
        }

        //是否开启了鉴黄
        if (mainClientVariables.contentInspect != null) {
            mainClient.enableContentInspect(AgoraTranslate.agorartcContentInspectConfig2InspectConfiguration(mainClientVariables.contentInspect))
                .then(() => {

                })
                .catch(() => {

                })
                .finally(() => {

                })
        }

        let globalVariables: IrisGlobalVariables = this._engine.globalVariables;

        //是否开启了cloudProxy
        if (globalVariables.cloudProxy != null) {
            let proxyType = globalVariables.cloudProxy;
            if (proxyType == agorartc.CLOUD_PROXY_TYPE.UDP_PROXY) {
                mainClient.startProxyServer(3);
            }
            else if (proxyType == agorartc.CLOUD_PROXY_TYPE.TCP_PROXY) {
                mainClient.startProxyServer(5);
            }
        }
        return mainClient;
    }

    private _createSubClient(connection: RtcConnection): IAgoraRTCClient {

        let config: ClientConfig = this._generateSubClientConfig(connection);
        let subClient: IAgoraRTCClient = AgoraRTC.createClient(config);
        let subClientVariables = this._engine.subClientVariables;

        //设置远端默认是 大流还是小流   
        // if (subClientVariables.remoteDefaultVideoStreamType != null) {
        //     subClient.setRemoteDefaultVideoStreamType(AgoraTranslate.agorartcVIDEO_STREAM_TYPE2RemoteStreamType(mainClientVariables.remoteDefaultVideoStreamType))
        //         .then(() => {

        //         })
        //         .catch(() => {

        //         })
        //         .finally(() => {

        //         })
        // }
        //设置指定的远端uid具体是大流还是小流
        let remoteVideoStreamTypes = subClientVariables.remoteVideoStreamTypes.getT(connection.channelId, connection.localUid);
        if (remoteVideoStreamTypes)
            for (let e of remoteVideoStreamTypes) {
                subClient.setRemoteVideoStreamType(e[0], AgoraTranslate.agorartcVIDEO_STREAM_TYPE2RemoteStreamType(e[1]))
                    .then(() => {

                    })
                    .catch(() => {

                    })
                    .finally(() => {

                    })
            }

        //
        let options = subClientVariables.channelMediaOptions.getT(connection.channelId, connection.localUid);
        let videoSourceType: agorartc.VIDEO_SOURCE_TYPE = agorartc.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_UNKNOWN;
        if (options) {
            if (options.publishCameraTrack == true) {
                videoSourceType = agorartc.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA_PRIMARY;
            }
            else if (options.publishSecondaryCameraTrack == true) {
                videoSourceType = agorartc.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA_SECONDARY;
            }
            else if (options.publishScreenCaptureVideo == true) {
                videoSourceType = agorartc.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_SCREEN_PRIMARY;
            }
        }

        //如果当前轨道被特别指定了，那么就设置一下
        let enabledDualStreamModes = subClientVariables.enabledDualStreamModes.getT(connection.channelId, connection.localUid);
        if (enabledDualStreamModes && enabledDualStreamModes.has(videoSourceType)) {
            let steamMode = enabledDualStreamModes.get(videoSourceType);
            if (steamMode.enabled) {
                subClient.enableDualStream()
                    .then(() => {

                    })
                    .catch(() => {

                    })
                    .finally(() => {
                    });

                if (steamMode.streamConfig != null) {
                    subClient.setLowStreamParameter(AgoraTranslate.agorartcSimulcastStreamConfig2LowStreamParameter(steamMode.streamConfig));
                }
            }
            else {
                subClient.disableDualStream()
                    .then(() => {

                    })
                    .catch(() => {

                    })
                    .finally(() => {
                    });
            }
        }


        //设置是否报告说话的人
        let enabledAudioVolumeIndication = subClientVariables.enabledAudioVolumeIndications.getT(connection.channelId, connection.localUid);
        if (enabledAudioVolumeIndication) {
            subClient.enableAudioVolumeIndicator();
            subClientVariables.enabledAudioVolumeIndications.removeT(connection.channelId, connection.localUid);
        }


        //是否开启了加密
        let encryptionConfig = subClientVariables.encryptionConfigs.getT(connection.channelId, connection.localUid);
        if (encryptionConfig?.enabled) {
            let config: agorartc.EncryptionConfig = encryptionConfig.config;
            let encryptionMode: EncryptionMode = AgoraTranslate.agorartcENCRYPTION_MODE2EncryptionMode(config.encryptionMode);
            let salt: Uint8Array = new Uint8Array(config.encryptionKdfSalt);
            subClient.setEncryptionConfig(encryptionMode, config.encryptionKey, salt);
            //加密只有一次生效
            subClientVariables.encryptionConfigs.removeT(connection.channelId, connection.localUid);
        }

        //是否开启了鉴黄
        // if (mainClientVariables.contentInspect != null) {
        //     subClient.enableContentInspect(AgoraTranslate.agorartcContentInspectConfig2InspectConfiguration(mainClientVariables.contentInspect))
        //         .then(() => {

        //         })
        //         .catch(() => {

        //         })
        //         .finally(() => {

        //         })
        // }

        // let globalVariables: IrisGlobalVariables = this._engine.globalVariables;

        //是否开启了cloudProxy
        // if (globalVariables.cloudProxy != null) {
        //     let proxyType = globalVariables.cloudProxy;
        //     if (proxyType == agorartc.CLOUD_PROXY_TYPE.UDP_PROXY) {
        //         subClient.startProxyServer(3);
        //     }
        //     else if (proxyType == agorartc.CLOUD_PROXY_TYPE.TCP_PROXY) {
        //         subClient.startProxyServer(5);
        //     }
        // }
        return subClient;
    }

    private _generateMicrophoneAudioTrackInitConfig(): MicrophoneAudioTrackInitConfig {

        let audioConfig: MicrophoneAudioTrackInitConfig = {};
        if (this._engine.mainClientVariables.recordingDeviceId) {
            audioConfig.microphoneId = this._engine.mainClientVariables.recordingDeviceId;
        }
        return audioConfig;
    }

    private _generateCameraVideoTrackInitConfig(): CameraVideoTrackInitConfig {
        let videoConfig: CameraVideoTrackInitConfig = {};
        if (this._engine.mainClientVariables.videoDeviceId) {
            videoConfig.cameraId = this._engine.mainClientVariables.videoDeviceId;
        }
        if (this._engine.globalVariables.videoEncoderConfiguration) {
            videoConfig.encoderConfig = AgoraTranslate.agorartcVideoEncoderConfiguration2VideoEncoderConfiguration(this._engine.globalVariables.videoEncoderConfiguration);
        }
        if (this._engine.globalVariables.cameraDirection) {
            videoConfig.facingMode = AgoraTranslate.agorartcCAMERA_DIRECTION2string(this._engine.globalVariables.cameraDirection);
        }

        return videoConfig;
    }

    private _generateScreenVideoTrackInitConfig(): ScreenVideoTrackInitConfig {
        let conf: ScreenVideoTrackInitConfig = {};
        let globalVariables: IrisGlobalVariables = this._engine.globalVariables;
        if (globalVariables.screenCaptureContentHint != null && globalVariables.screenCaptureContentHint != agorartc.VIDEO_CONTENT_HINT.CONTENT_HINT_NONE) {
            conf.optimizationMode = AgoraTranslate.agorartcVIDEO_CONTENT_HINT2string(globalVariables.screenCaptureContentHint);
        }

        if (globalVariables.screenCaptureParameters != null) {
            conf.encoderConfig = AgoraTranslate.agorartcScreenCaptureParameters2VideoEncoderConfiguration(globalVariables.screenCaptureParameters);
        }
        else if (globalVariables.videoEncoderConfiguration != null) {
            conf.encoderConfig = AgoraTranslate.agorartcVideoEncoderConfiguration2VideoEncoderConfiguration(globalVariables.videoEncoderConfiguration);
        }
        return conf;
    }

    //根据保存的中间状态，生成ClientConfig
    private _generateMainClientConfig(): ClientConfig {
        let mainClientVariables = this._engine.mainClientVariables;
        let config: ClientConfig = {
            codec: mainClientVariables.videoEncoderConfiguration != null ? AgoraTranslate.agorartcVIDEO_CODEC_TYPE2SDK_CODEC(mainClientVariables.videoEncoderConfiguration.codecType) : "vp8",
            mode: mainClientVariables.channelProfile != null ? AgoraTranslate.agorartcCHANNEL_PROFILE_TYPE2SDK_MODE(mainClientVariables.channelProfile) : "live"
        };
        if (mainClientVariables.clientRoleType != null) {
            config.role = AgoraTranslate.agorartcCLIENT_ROLE_TYPE2ClientRole(mainClientVariables.clientRoleType);
        }
        if (mainClientVariables.clientRoleOptions != null) {
            config.clientRoleOptions = AgoraTranslate.agorartcClientRoleOptions2ClientRoleOptions(mainClientVariables.clientRoleOptions);
        }
        return config;
    }

    private _generateSubClientConfig(connection: RtcConnection): ClientConfig {
        let subClientVariables = this._engine.subClientVariables;
        let videoEncoderConfiguration = subClientVariables.videoEncoderConfigurations.getT(connection.channelId, connection.localUid);
        let options = subClientVariables.channelMediaOptions.getT(connection.channelId, connection.localUid);
        let channelProfile = options?.channelProfile;
        let clientRoleType = options?.clientRoleType;
        let config: ClientConfig = {
            codec: videoEncoderConfiguration != null ? AgoraTranslate.agorartcVIDEO_CODEC_TYPE2SDK_CODEC(videoEncoderConfiguration.codecType) : "vp8",
            mode: channelProfile != null ? AgoraTranslate.agorartcCHANNEL_PROFILE_TYPE2SDK_MODE(channelProfile) : "live"
        };
        if (clientRoleType != null) {
            config.role = AgoraTranslate.agorartcCLIENT_ROLE_TYPE2ClientRole(clientRoleType);
        }
        // if (mainClientVariables.clientRoleOptions != null) {
        //     config.clientRoleOptions = AgoraTranslate.agorartcClientRoleOptions2ClientRoleOptions(mainClientVariables.clientRoleOptions);
        // }
        return config;
    }


    _pretreatmentChannelMediaRelayConfiguration(conf: agorartc.ChannelMediaRelayConfiguration) {
        //在这里0表示自己
        let mainClientUid = this._engine.entitiesContainer.getMainClient()?.uid || 0;

        if (conf.srcInfo.uid == 0) {
            conf.srcInfo.uid = mainClientUid as number;
        }

        for (let e of conf.destInfos) {
            if (e.uid == 0) {
                e.uid = mainClientUid as number;
            }
        }
    }

    async _enumerateDevices(): Promise<{ playbackDevices: agorartc.DeviceInfo[], recordingDevices: agorartc.DeviceInfo[], videoDevices: agorartc.DeviceInfo[] }> {

        let info: MediaDeviceInfo[] = await AgoraRTC.getDevices();
        let playbackDevices: agorartc.DeviceInfo[] = [];
        let recordingDevices: agorartc.DeviceInfo[] = [];
        let videoDevices: agorartc.DeviceInfo[] = [];
        for (let e of info) {
            if (e.kind == 'audiooutput') {
                playbackDevices.push({
                    deviceId: e.deviceId,
                    deviceName: e.label
                });
            }
            else if (e.kind == 'audioinput') {
                recordingDevices.push({
                    deviceId: e.deviceId,
                    deviceName: e.label
                });
            }
            else if (e.kind == 'videoinput') {
                videoDevices.push({
                    deviceId: e.deviceId,
                    deviceName: e.label
                });
            }
        }

        this._engine.globalVariables.playbackDevices = playbackDevices;
        this._engine.globalVariables.recordingDevices = recordingDevices;
        this._engine.globalVariables.videoDevices = videoDevices;
        this._engine.globalVariables.deviceEnumerated = true;
        return { playbackDevices: playbackDevices, recordingDevices: recordingDevices, videoDevices: videoDevices };
    }




}