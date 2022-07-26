import * as agorartc from '../terra/rtc_types/Index';
import { IRtcEngine } from '../terra/IRtcEngine';
import { IrisApiEngine } from './IrisApiEngine';
import { IrisRtcEngine } from './IrisRtcEngine';
import { AgoraActionQueue } from '../tool/AgoraActionQueue';
import { AgoraConsole } from '../tool/AgoraConsole';
import AgoraRTC, { CameraVideoTrackInitConfig, ClientConfig, DeviceInfo, EncryptionMode, IAgoraRTCClient, ICameraVideoTrack, IChannelMediaRelayConfiguration, ILocalAudioTrack, ILocalTrack, ILocalVideoTrack, IMicrophoneAudioTrack, InjectStreamConfig, MicrophoneAudioTrackInitConfig, ScreenVideoTrackInitConfig, UID, VideoPlayerConfig } from 'agora-rtc-sdk-ng';
import { AgoraTranslate } from '../tool/AgoraTranslate';
import { IrisGlobalVariables } from '../variable/IrisGlobalVariables';
import { AudioTrackPackage, IrisAudioSourceType, IrisVideoSourceType, VideoParams, VideoTrackPackage } from '../base/BaseType';
import { VideoTrackInfo } from '../terra/rtc_types/Index';
import { IrisMainClientVariables } from '../variable/IrisMainClientVariables';
import { Argument } from 'webpack';
import { IrisClientEventHandler } from '../event_handler/IrisClientEventHandler';
import { IrisTrackEventHandler } from '../event_handler/IrisTrackEventHandler';

export class RtcEngine implements IRtcEngine {

    private _engine: IrisRtcEngine = null;
    private _actonQueue: AgoraActionQueue;

    constructor(engine: IrisRtcEngine) {
        this._engine = engine;
        this._actonQueue = new AgoraActionQueue(this);
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
        this._actonQueue.putAction({
            fun: (next) => {
                AgoraRTC.getDevices()
                    .then((info: MediaDeviceInfo[]) => {
                        AgoraConsole.log("enumerate devices success!");
                        this._engine.globalVariables.initDevicesInfo(info);
                    })
                    .catch((reason) => {
                        AgoraConsole.error("enumerate devices failed!");
                        AgoraConsole.error(reason);
                        this._engine.globalVariables.initDevicesInfo([]);
                    })
                    .finally(() => {
                        this._engine.rtcEngineEventHandler.onDeviceEnumerated();
                        next();
                    })
            },
            args: []
        })

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

    setExternalVideoSource(enabled: boolean, useTexture: boolean, sourceType: agorartc.EXTERNAL_VIDEO_SOURCE_TYPE, encodedVideoOption: agorartc.SenderOptions): number {
        AgoraConsole.warn("setExternalVideoSource not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    setExternalAudioSource(enabled: boolean, sampleRate: number, channels: number, sourceNumber: number, localPlayback: boolean, publish: boolean): number {
        AgoraConsole.warn("setExternalAudioSource not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    setExternalAudioSink(enabled: boolean, sampleRate: number, channels: number): number {
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
    pushVideoFrame(frame: agorartc.ExternalVideoFrame, videoTrackId: number): number {
        AgoraConsole.warn("pushVideoFrame not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    pushEncodedVideoImage(imageBuffer: number, length: number, videoEncodedFrameInfo: agorartc.EncodedVideoFrameInfo, videoTrackId: number): number {
        AgoraConsole.warn("pushEncodedVideoImage not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    //todo IVideoDeviceManager
    enumerateVideoDevices(): agorartc.DeviceInfo[] {
        if (this._engine.globalVariables.deviceEnumerated) {
            AgoraConsole.warn("Please call this method:enumerateVideoDevices after onDeviceEnumerated triggered")
            return [];
        }
        else {
            return this._engine.globalVariables.videoDevices;
        }
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
            publishMicrophoneTrack: true,
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
        else {
            this._engine.mainClientVariables.joinChanneled = true;
            this._actonQueue.putAction({
                fun: (token: string, channelId: string, uid: number, options: agorartc.ChannelMediaOptions, next) => {

                    this._engine.mainClientVariables.startPreviewed = false;
                    this._engine.entitiesContainer.clearFreeLocalAudioTrack();
                    this._engine.entitiesContainer.clearFreeLocalVideoTrack();

                    let mainClientVariables: IrisMainClientVariables = this._engine.mainClientVariables;
                    let globalVariables = this._engine.globalVariables;
                    mainClientVariables.mergeChannelMediaOptions(options);

                    let mainClient: IAgoraRTCClient = this._createMainClient();

                    mainClient.join(globalVariables.appId, channelId, token == "" ? null : token, uid)
                        .then((uid: UID) => {

                            this.createAudioAndVideoTrack(
                                IrisAudioSourceType.kAudioSourceTypeMicrophone,
                                IrisVideoSourceType.kVideoSourceTypeCameraPrimary,
                                (err: any, trackArray: [IMicrophoneAudioTrack, ICameraVideoTrack]) => {
                                    if (err) {
                                        AgoraConsole.error("join channel failed. create audio And videoTrack failed");
                                        AgoraConsole.error(err);
                                        mainClient.leave().then(() => { }).catch(() => { }).finally(() => {
                                            this._engine.entitiesContainer.clearMainClientAll();
                                            next();
                                        });
                                    }
                                    else {
                                        let entitiesContainer = this._engine.entitiesContainer;
                                        entitiesContainer.setMainClient(mainClient);
                                        let mainClientVariables = this._engine.mainClientVariables;

                                        let audioTrack: IMicrophoneAudioTrack = trackArray[0];
                                        if (mainClientVariables.publishMicrophoneTrack) {

                                            entitiesContainer.addMainClientLocalAudioTrack({ type: IrisAudioSourceType.kAudioSourceTypeMicrophone, track: audioTrack });
                                            let trackEventHandler: IrisTrackEventHandler = new IrisTrackEventHandler({
                                                channelName: channelId,
                                                client: mainClient,
                                                track: audioTrack,
                                                trackType: 'ILocalTrack',
                                            }, this._engine);
                                            entitiesContainer.addMainClientTrackEventHandler(trackEventHandler);

                                            mainClient.publish(audioTrack)
                                                .then(() => {
                                                    AgoraConsole.log("audio track publish sucess");
                                                })
                                                .catch((reason) => {
                                                    AgoraConsole.error("audio track publish failed");
                                                    AgoraConsole.error(reason);
                                                    entitiesContainer.removeMainClientTrackEventHandler(audioTrack);
                                                    entitiesContainer.removeMainClientLocalAudioTrack(audioTrack, true);
                                                })
                                        }
                                        else {
                                            entitiesContainer.addFreeLocalAudioTrack({ type: IrisAudioSourceType.kAudioSourceTypeMicrophone, track: audioTrack });
                                        }

                                        let videoTrack: ICameraVideoTrack = trackArray[1];
                                        if (mainClientVariables.publishCameraTrack) {

                                            entitiesContainer.setMainClientLocalVideoTrack({ type: IrisVideoSourceType.kVideoSourceTypeCameraPrimary, track: videoTrack });
                                            let trackEventHandler: IrisTrackEventHandler = new IrisTrackEventHandler({
                                                channelName: channelId,
                                                client: mainClient,
                                                track: videoTrack,
                                                trackType: 'ILocalVideoTrack',
                                            }, this._engine);
                                            entitiesContainer.addMainClientTrackEventHandler(trackEventHandler);

                                            mainClient.publish(audioTrack)
                                                .then(() => {
                                                    AgoraConsole.log("video track publish sucess");
                                                })
                                                .catch((reason) => {
                                                    AgoraConsole.error("video track publish failed");
                                                    AgoraConsole.error(reason);
                                                    entitiesContainer.removeMainClientTrackEventHandler(videoTrack);
                                                    entitiesContainer.clearMainClientLocalVideoTrack(true);
                                                })
                                        }
                                        else {
                                            entitiesContainer.addFreeLocalVideoTrack({ type: IrisVideoSourceType.kVideoSourceTypeCameraPrimary, track: videoTrack });
                                        }

                                        next();
                                    }
                                },
                            )
                        })
                        .catch((reason: any) => {
                            AgoraConsole.error("join channel failed: join failed");
                            AgoraConsole.error(reason);
                            this._engine.mainClientVariables.joinChanneled = false;
                            this._engine.entitiesContainer.clearMainClientAll();
                            next();
                        })
                },
                args: [token, channelId, uid, options]
            })

            return 0;
        }
    }

    updateChannelMediaOptions(options: agorartc.ChannelMediaOptions): number {
        //todo 这个地方有大坑，要小心处理

        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
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
                    mainClient.leave()
                        .then(() => {
                            this._engine.entitiesContainer.clearMainClientAll();
                        })
                        .catch((reason) => {
                            AgoraConsole.error('leaveChannel failed');
                            AgoraConsole.error(reason);
                            this._engine.mainClientVariables.joinChanneled = true;
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
                this._engine.entitiesContainer.getMainClient()?.renewToken(token);
                this._engine.entitiesContainer.getSubClinets().walkT((channelId: string, uid: UID, t: IAgoraRTCClient) => {
                    t.renewToken(token);
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

                if (options.stopMicrophoneRecording) {
                    //todo 停止麦克风录音
                }

                if (options.stopPreview) {
                    //todo 停止预览
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
        //todo 需要
        if (this._engine.globalVariables.enabledVideo == false) {
            AgoraConsole.error("call enableVideo(true) before startPreview");
            return -agorartc.ERROR_CODE_TYPE.ERR_FAILED;
        }
        else {
            if (this._engine.mainClientVariables.startPreviewed == true) {
                AgoraConsole.error("you already call startPreview");
                return -agorartc.ERROR_CODE_TYPE.ERR_FAILED;
            }
            else if (sourceType >= 4) {
                AgoraConsole.error("Invalid source type");
                return -agorartc.ERROR_CODE_TYPE.ERR_INVALID_ARGUMENT;
            }
            else {
                this._engine.mainClientVariables.startPreviewed = true;
                this._actonQueue.putAction({

                    fun: (sourceType: agorartc.VIDEO_SOURCE_TYPE, next) => {
                        let audioSource: IrisAudioSourceType;
                        let videoSource: IrisVideoSourceType;
                        if (sourceType == agorartc.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA_PRIMARY || sourceType == agorartc.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA_SECONDARY) {
                            audioSource = IrisAudioSourceType.kAudioSourceTypeMicrophone;
                            videoSource = IrisVideoSourceType.kVideoSourceTypeCameraPrimary;
                        }
                        else {
                            audioSource = IrisAudioSourceType.kAudioSourceTypeScreenShare;
                            videoSource = IrisVideoSourceType.kVideoSourceTypeScreenPrimary;
                        }

                        this.createAudioAndVideoTrack(
                            audioSource,
                            videoSource,
                            (err: any, trackArray: [ILocalAudioTrack, ILocalVideoTrack]) => {
                                if (err) {
                                    AgoraConsole.error("Start preview failed: create video and audio track failed");
                                    AgoraConsole.error(err);
                                }
                                else {
                                    let audioTrack = trackArray[0];
                                    let videoTrack = trackArray[1];
                                    AgoraConsole.log("start preview createCameraVideoTrack success");
                                    this._engine.entitiesContainer.addFreeLocalAudioTrack({ type: audioSource, track: audioTrack });
                                    this._engine.entitiesContainer.addFreeLocalVideoTrack({ type: videoSource, track: videoTrack });
                                }
                                next();
                            }
                        )
                    },
                    args: [sourceType]
                })
                return 0;
            }
        }
    }

    stopPreview(): number {
        return this.stopPreview2(agorartc.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA);
    }

    stopPreview2(sourceType: agorartc.VIDEO_SOURCE_TYPE): number {
        if (this._engine.mainClientVariables.startPreviewed == false) {
            AgoraConsole.error("not call startPreview yet!");
            return -agorartc.ERROR_CODE_TYPE.ERR_FAILED;
        }
        else {
            this._engine.mainClientVariables.startPreviewed = false;
            this._actonQueue.putAction({
                fun: (sourceType: agorartc.VIDEO_SOURCE_TYPE, next) => {
                    this._engine.entitiesContainer.clearFreeLocalAudioTrack();
                    this._engine.entitiesContainer.clearFreeLocalVideoTrack();
                    next();
                },
                args: [sourceType]
            })
        }
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


                //todo 找到所有mainClient 的 ICameraTrack。如果存在则 setEncoderConfiguration（） 一下
                //todo 找到所有的mainClient ILocalVideoTrack。如果已经play过了，则无法设置 VideoEncoderConfiguration.mirrorMode

                next();
            },
            args: [config],
        })

        return 0;
    }


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

    enableVirtualBackground(enabled: boolean, backgroundSource: agorartc.VirtualBackgroundSource, segproperty: agorartc.SegmentationProperty, type: agorartc.MEDIA_SOURCE_TYPE): number {
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
        this._engine.globalVariables.enabledAudio = true;
        //todo 将当前已经被停用的audio都开启 如果需要，这个操作要丢到丢列里）

        return 0;
    }

    disableAudio(): number {

        this._actonQueue.putAction({
            fun: (next) => {
                this._engine.globalVariables.enabledAudio = false;
                //todo 将当前已经正在播放的的audio关闭 如果需要，这个操作要丢到丢列里）

                next();
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
                //todo  是否需要去设置当前所有音频属性

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

                //todo  是否需要实时的改变音频属性 如果需要，这个操作要丢到丢列里）
                next();
            },
            args: [scenario]
        })
        return 0;
    }

    enableLocalAudio(enabled: boolean): number {
        this._actonQueue.putAction({
            fun: (enabled: boolean, next) => {
                this._engine.globalVariables.enabledLocalAudio = enabled;

                //todo  是否需要实时的改变音频属性 如果需要，这个操作要丢到丢列里）
                next();
            },
            args: [enabled]
        });


        return 0;
    }

    muteLocalAudioStream(mute: boolean): number {
        this._actonQueue.putAction({
            fun: (mute: boolean, next) => {
                this._engine.globalVariables.mutedLocalAudioStream = mute;

                //todo 是否需要实时的改变音频属性 （如果需要，这个操作要丢到丢列里）
                next();
            },
            args: [mute]
        });


        return 0;
    }
    muteAllRemoteAudioStreams(mute: boolean): number {
        this._actonQueue.putAction({
            fun: (mute: boolean, next) => {
                //todo, 在这里找到所有的audioStreams，并且去mute或者 un-mute


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

                //1.todo 去寻找到这个audio，并且设置一下
                //2.因为因为可能没有触发 远端的pushish回到问题，可能此时还没有这个audio。
                //3.那么需要在其发布的时候。使用通知去找到它

                next();
            },
            args: [uid, mute]
        });
        return 0;
    }

    enableVideo(): number {
        this._actonQueue.putAction({
            fun: (next) => {
                this._engine.globalVariables.enabledVideo = true;
                //todo 是否需要找到所有的videoTrack去恢复它

                next();
            },
            args: []
        })

        return 0;
    }

    disableVideo(): number {
        this._actonQueue.putAction({
            fun: (next) => {
                this._engine.globalVariables.enabledVideo = false;
                //todo 是否需要找到所有的videoTrack去禁它

                next();
            },
            args: []
        })
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    muteLocalVideoStream(mute: boolean): number {
        this._actonQueue.putAction({
            fun: (mute: boolean, next) => {
                this._engine.globalVariables.mutedLocalVideoStream = mute;

                //todo 需要实时的的去找VideoStream，并且设置一下 (这个操作要丢到丢列里）

                next();
            },
            args: [mute]
        });
        return 0;
    }

    enableLocalVideo(enabled: boolean): number {
        this._actonQueue.putAction({
            fun: (enabled: boolean, next) => {
                this._engine.globalVariables.enabledLocalVideo = enabled;
                //todo 找到自己的video并且去释放

                next();
            },
            args: [enabled]
        })
        return 0;
    }

    muteAllRemoteVideoStreams(mute: boolean): number {
        this._actonQueue.putAction({
            fun: (mute: boolean, next) => {
                //todo, 在这里找到所有的AudioStreams，并且去mute或者 un-mute

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

                //todo 立刻停止订阅当前的所有的远端视频流
                //将 muteRemoteVideoStream 里的所有特殊数据给清空，否则会出bug
                //在未来将会订阅到的不管
                next();
            },
            args: [mute]
        });

        return 0;
    }

    muteRemoteVideoStream(uid: number, mute: boolean): number {
        this._actonQueue.putAction({
            fun: (uid: number, mute: boolean, next) => {
                this._engine.mainClientVariables.mutedRemoteVideoStreams.set(uid, mute);

                //寻找到这个流，如果找到就设置一下


                //在未来将会订阅到的不管
                next();
            },
            args: [mute]
        });
        return 0;
    }

    setRemoteVideoStreamType(uid: number, streamType: agorartc.VIDEO_STREAM_TYPE): number {
        this._actonQueue.putAction({
            fun: (uid: number, streamType: agorartc.VIDEO_STREAM_TYPE, next) => {
                this._engine.mainClientVariables.remoteVideoStreamTypes.set(uid, streamType);

                //找到这个video的流并且设置一下

                next();
            },
            args: [uid, streamType]
        });
        return 0;
    }

    setRemoteDefaultVideoStreamType(streamType: agorartc.VIDEO_STREAM_TYPE): number {
        this._actonQueue.putAction({
            fun: (streamType: agorartc.VIDEO_STREAM_TYPE, next) => {
                this._engine.mainClientVariables.remoteDefaultVideoStreamType = streamType;
                //must clear special value after set default value;
                this._engine.mainClientVariables.remoteVideoStreamTypes.clear();

                //todo 如果当前mainClient已经被创建了，那么设置一下 mainClient.setRemoteDefaultVideoStreamType
                //如果没有创建，那么需要在client被创建的时候设置一下

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

                //如果没有就保存到这个变量，并且在Client被创建的时候去读取一下这个值
                this._engine.mainClientVariables.enabledAudioVolumeIndication = {
                    interval,
                    smooth,
                    reportVad
                };
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

    selectAudioTrack(index: number): number {
        AgoraConsole.warn("selectAudioTrack not supported in this platfrom!");
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

    uploadLogFile(requestId: string): number {
        AgoraRTC.enableLogUpload();
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
                let mainClient: IAgoraRTCClient = this._engine.entitiesContainer.getMainClient();
                if (/*当前的videoTrack正好是这个sourceType &&  mainClinet!= null*/false) {
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

    adjustRecordingSignalVolume(volume: number): number {
        this._actonQueue.putAction({
            fun: (volume: number, next) => {
                this._engine.globalVariables.recordingSignalVolume = volume;

                //找到所有的录音的音轨， MainClinet 和 subClinet的，。设置setVolume

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
                //找到所有的录音的音轨， MainClinet 和 subClinet的，。设置 是否静音

                next();
            },
            args: [mute]
        })
        return 0;
    }

    adjustPlaybackSignalVolume(volume: number): number {
        this._actonQueue.putAction({
            fun: (volume: number, next) => {
                this._engine.globalVariables.playbackSignalVolume = volume;
                this._engine.globalVariables.playbackSignalVolumes.clear();
                //找到所有的Remote的的音轨， MainClinet 和 subClinet的，。设置其音量

                next();
            },
            args: [volume]
        })
        return 0;
    }

    adjustUserPlaybackSignalVolume(uid: number, volume: number): number {
        this._actonQueue.putAction({
            fun: (volume: number, next) => {
                this._engine.globalVariables.playbackSignalVolumes.set(uid, volume);
                //找到当前制定的音轨，并且设置一下 其音量

                next();
            },
            args: [volume]
        })

        return 0;
    }

    setLocalPublishFallbackOption(option: agorartc.STREAM_FALLBACK_OPTIONS): number {
        this.setRemoteSubscribeFallbackOption(option);
        return 0;
    }

    setRemoteSubscribeFallbackOption(option: agorartc.STREAM_FALLBACK_OPTIONS): number {
        this._actonQueue.putAction({
            fun: (option: agorartc.STREAM_FALLBACK_OPTIONS, next) => {
                this._engine.globalVariables.fallbackOption = option;
                //找到所有的Client 去  setStreamFallbackOption 一下

                next();
            },
            args: [option]
        })
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    enableLoopbackRecording(enabled: boolean, deviceName: string): number {
        AgoraConsole.warn("enableLoopbackRecording not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    adjustLoopbackSignalVolume(volume: number): number {
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

                //todo 找到videoTrack并且调用一下 setEncoderConfiguration

                next();
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
        //可以通过销毁旧的视频轨道，创建新的视频轨道来做这个事情？
        AgoraConsole.warn("switchCamera not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
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

    getScreenCaptureSources(thumbSize: agorartc.VideoDimensions, iconSize: agorartc.VideoDimensions, includeScreen: boolean): agorartc.IScreenCaptureSourceList[] {
        AgoraConsole.warn("getScreenCaptureSources not supported in this platfrom!");
        return [];
    }

    setAudioSessionOperationRestriction(restriction: agorartc.AUDIO_SESSION_OPERATION_RESTRICTION): number {
        AgoraConsole.warn("setAudioSessionOperationRestriction not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    startScreenCaptureByDisplayId(displayId: number, regionRect: agorartc.Rectangle, captureParams: agorartc.ScreenCaptureParameters): number {
        //todo 直接创建屏幕共享的窗口
        return 0;
    }

    startScreenCaptureByScreenRect(screenRect: agorartc.Rectangle, regionRect: agorartc.Rectangle, captureParams: agorartc.ScreenCaptureParameters): number {
        return this.startScreenCaptureByDisplayId(0, null, null);
    }

    getAudioDeviceInfo(deviceInfo: agorartc.DeviceInfo): number {
        AgoraConsole.warn("getAudioDeviceInfo not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    startScreenCaptureByWindowId(windowId: any, regionRect: agorartc.Rectangle, captureParams: agorartc.ScreenCaptureParameters): number {
        return this.startScreenCaptureByDisplayId(0, null, null);
    }

    setScreenCaptureContentHint(contentHint: agorartc.VIDEO_CONTENT_HINT): number {
        //todo 可以做
        this._actonQueue.putAction({
            fun: (contentHint: agorartc.VIDEO_CONTENT_HINT, next) => {
                this._engine.globalVariables.screenCaptureContentHint = contentHint;

                //todo 找到当前的屏幕共享的track。设置一下setOptimizationModes属性

                next();
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

    updateScreenCaptureParameters(captureParams: agorartc.ScreenCaptureParameters): number {
        this._actonQueue.putAction({
            fun: (captureParams: agorartc.ScreenCaptureParameters, next) => {
                this._engine.globalVariables.screenCaptureParameters = captureParams;

                //todo 找到当前的视频轨道并且设置一下

                next();
            },
            args: [captureParams]
        })

        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    startScreenCapture(captureParams: agorartc.ScreenCaptureParameters2): number {
        return this.startScreenCaptureByDisplayId(0, null, null);
    }

    updateScreenCapture(captureParams: agorartc.ScreenCaptureParameters2): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    stopScreenCapture(): number {
        this._actonQueue.putAction({
            fun: (next) => {


                //todo 找到当前的屏幕共享轨道并且销毁一下

                next();
            },
            args: []
        })

        return 0; 
    }

    getCallId(callId: string): number {
        AgoraConsole.warn("updateScreenCaptureRegion not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    rate(callId: string, rating: number, description: string): number {
        AgoraConsole.warn("rate not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    complain(callId: string, description: string): number {
        AgoraConsole.warn("complain not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    startRtmpStreamWithoutTranscoding(url: string): number {
        //todo 可以实现，但是我先不实现
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    startRtmpStreamWithTranscoding(url: string, transcoding: agorartc.LiveTranscoding): number {
         //todo 可以实现，但是我先不实现
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    updateRtmpTranscoding(transcoding: agorartc.LiveTranscoding): number {
         //todo 可以实现，但是我先不实现
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    stopRtmpStream(url: string): number {
         //todo 可以实现，但是我先不实现
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
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
        //todo 可以先销毁，当前的轨道，重新创建新轨道。
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    startSecondaryCameraCapture(config: agorartc.CameraCapturerConfiguration): number {
        //todo 可以先销毁，当前的轨道，重新创建新轨道。
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    stopPrimaryCameraCapture(): number {
        //todo 销毁视频轨道
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    stopSecondaryCameraCapture(): number {
        //todo 销毁视频轨道
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
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
        AgoraConsole.warn("startPrimaryScreenCapture not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    startSecondaryScreenCapture(config: agorartc.ScreenCaptureConfiguration): number {
        AgoraConsole.warn("startSecondaryScreenCapture not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
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
            return agorartc.CONNECTION_STATE_TYPE.CONNECTION_STATE_CONNECTING;
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
                this._engine.mainClientVariables.encryptionConfig.enabled = enabled;
                this._engine.mainClientVariables.encryptionConfig.config = config;

                let mainClient: IAgoraRTCClient = this._engine.entitiesContainer.getMainClient();
                if (mainClient) {
                    if (enabled) {
                        mainClient.setEncryptionConfig(
                            AgoraTranslate.agorartcENCRYPTION_MODE2EncryptionMode(this._engine.mainClientVariables.encryptionConfig.config.encryptionMode),
                            this._engine.mainClientVariables.encryptionConfig.config.encryptionKey,
                            this._engine.mainClientVariables.encryptionConfig.config.encryptionKdfSalt,
                        );
                    }
                    else {
                        //todo 怎么取消加密呢？
                    }
                }

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
                        .catch(() => {
                            AgoraConsole.error("removeInjectStreamUrl failed");
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
                this._engine.globalVariables.pausedAudio = true;
                //todo 找到所有的audio并且设置为pasue

                next();
            },
            args: []
        })
        return 0;
    }
    resumeAudio(): number {
        this._actonQueue.putAction({
            fun: (next) => {
                this._engine.globalVariables.pausedAudio = false;
                //todo 找到所有的audio并且设置为unpased

                next();
            },
            args: []
        })
        return 0;
    }

    enableWebSdkInteroperability(enabled: boolean): number {
        return 0;
    }

    sendCustomReportMessage(id: string, category: string, event: string, label: string, value: number): number {
        this._actonQueue.putAction({
            fun: (id: string, category: string, event: string, label: string, value: number, next) => {
                let mainClinet: IAgoraRTCClient = this._engine.entitiesContainer.getMainClient();
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

    joinChannelWithUserAccountEx(token: string, channelId: string, userAccount: string, options: agorartc.ChannelMediaOptions, eventHandler: agorartc.IRtcEngineEventHandler): number {
        AgoraConsole.warn("joinChannelWithUserAccountEx not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    getUserInfoByUserAccount(userAccount: string, userInfo: agorartc.UserInfo[]): number {
        AgoraConsole.warn("getUserInfoByUserAccount not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    getUserInfoByUid(uid: number, userInfo: agorartc.UserInfo[]): number {
        AgoraConsole.warn("getUserInfoByUserAccount not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    startChannelMediaRelay(configuration: agorartc.ChannelMediaRelayConfiguration): number {
        this._actonQueue.putAction({
            fun: (configuration: agorartc.ChannelMediaRelayConfiguration, next) => {
                let mainClient = this._engine.entitiesContainer.getMainClient();
                if (mainClient) {
                    let conf: IChannelMediaRelayConfiguration = AgoraTranslate.agorartcChannelMediaRelayConfiguration2IChannelMediaRelayConfiguration(configuration);
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
        //todo 要不直接stop吧。保存start,update的参数，然后resume的时候，再start一次好了。
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    resumeAllChannelMediaRelay(): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
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
        AgoraConsole.warn("configRhythmPlayer not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    setContentInspect(conf: agorartc.ContentInspectConfig): number {
        this._actonQueue.putAction({
            fun: (conf: agorartc.ContentInspectConfig, next) => {
                this._engine.mainClientVariables.contentInspect = conf;
                let mainClient: IAgoraRTCClient = this._engine.entitiesContainer.getMainClient();
                if (mainClient) {
                    if (conf.enable) {
                        mainClient.enableContentInspect(AgoraTranslate.agorartcContentInspectConfig2InspectConfiguration(conf))
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
            args: [conf]
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
                    next();
                }
                else {
                    next();
                }
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

    joinChannelEx(token: string, connection: agorartc.RtcConnection, options: agorartc.ChannelMediaOptions, eventHandler: agorartc.IRtcEngineEventHandler[]): number {
        //todo 。等joinChannel来处理
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    leaveChannelEx(connection: agorartc.RtcConnection): number {
        //todo 等leaveChannel 来处理
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    updateChannelMediaOptionsEx(options: agorartc.ChannelMediaOptions, connection: agorartc.RtcConnection): number {
        //todo 等updateChannelMediaOptions 来处理
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    setVideoEncoderConfigurationEx(config: agorartc.VideoEncoderConfiguration, connection: agorartc.RtcConnection): number {
        this._actonQueue.putAction({
            fun: (config: agorartc.VideoEncoderConfiguration, connection: agorartc.RtcConnection, next) => {

                this._engine.subClientVariables.videoEncoderConfigurations.addT(connection.channelId, connection.localUid, config);
                //todo 找到所有subClient 的 ICameraTrack。如果存在则 setEncoderConfiguration（） 一下
                //todo 找到所有subClient ILocalVideoTrack。如果已经play过了，则无法设置 VideoEncoderConfiguration.mirrorMode

                next();
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

                //1.todo 去寻找到这个audio，并且设置一下
                //2.因为因为可能没有触发 远端的pushish回到问题，可能此时还没有这个audio。
                //3.那么需要在其发布的时候。使用通知去找到它

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

                //1.todo 去寻找到这个vudio，并且设置一下
                //2.因为因为可能没有触发 远端的pushish回到问题，可能此时还没有这个audio。
                //3.那么需要在其发布的时候。使用通知去找到它

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
                //todo 找到这个远端的video流，然后

                next();
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
        let client: IAgoraRTCClient = this._engine.entitiesContainer.getClient(connection);
        if (client) {
            return AgoraTranslate.ConnectionState2agorartcCONNECTION_STATE_TYPE(client.connectionState);
        }
        else {
            return agorartc.CONNECTION_STATE_TYPE.CONNECTION_STATE_CONNECTING;
        }
    }

    enableEncryptionEx(connection: agorartc.RtcConnection, enabled: boolean, config: agorartc.EncryptionConfig): number {
        this._actonQueue.putAction({
            fun: (connection: agorartc.RtcConnection, enabled: boolean, config: agorartc.EncryptionConfig, next) => {
                let encryptionConfig = {
                    enabled: enabled,
                    config: config
                };
                this._engine.subClientVariables.encryptionConfigs.addT(connection.channelId, connection.localUid, encryptionConfig);

                let client: IAgoraRTCClient = this._engine.entitiesContainer.getClient(connection);
                if (client) {
                    if (enabled) {
                        client.setEncryptionConfig(
                            AgoraTranslate.agorartcENCRYPTION_MODE2EncryptionMode(config.encryptionMode),
                            config.encryptionKey,
                            config.encryptionKdfSalt,
                        );
                    }
                    else {
                        //todo 怎么取消加密呢？
                    }
                }
                next();
            },
            args: [connection, enabled, config]

        })

        return 0;
    }

    createDataStreamEx(streamId: number, reliable: boolean, ordered: boolean, connection: agorartc.RtcConnection): number {
        AgoraConsole.warn("createDataStreamEx not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    createDataStreamEx2(streamId: number, config: agorartc.DataStreamConfig, connection: agorartc.RtcConnection): number {
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
        AgoraConsole.warn("sendCustomReportMessageEx not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    enableAudioVolumeIndicationEx(interval: number, smooth: number, reportVad: boolean, connection: agorartc.RtcConnection): number {
        AgoraConsole.warn("enableAudioVolumeIndicationEx not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    getUserInfoByUserAccountEx(userAccount: string, userInfo: agorartc.UserInfo[], connection: agorartc.RtcConnection): number {
        AgoraConsole.warn("getUserInfoByUserAccountEx not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    getUserInfoByUidEx(uid: number, userInfo: agorartc.UserInfo[], connection: agorartc.RtcConnection): number {
        AgoraConsole.warn("getUserInfoByUserAccountEx not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    setVideoProfileEx(width: number, height: number, frameRate: number, bitrate: number): number {
        AgoraConsole.warn("getUserInfoByUserAccountEx not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    enableDualStreamModeEx(sourceType: agorartc.VIDEO_SOURCE_TYPE, enabled: boolean, streamConfig: agorartc.SimulcastStreamConfig, connection: agorartc.RtcConnection): number {

        this._actonQueue.putAction({
            fun: (sourceType: agorartc.VIDEO_SOURCE_TYPE, enabled: boolean, streamConfig: agorartc.SimulcastStreamConfig, connection: agorartc.RtcConnection, next) => {
                let map: Map<agorartc.VIDEO_SOURCE_TYPE, boolean> = this._engine.subClientVariables.enabledDualStreamModes.getT(connection.channelId, connection.localUid);
                if (map == null) {
                    map = new Map<agorartc.VIDEO_SOURCE_TYPE, boolean>();
                    this._engine.subClientVariables.enabledDualStreamModes.addT(connection.channelId, connection.localUid, map);
                }

                let client: IAgoraRTCClient = this._engine.entitiesContainer.getClient(connection);
                if (/*当前的videoTrack正好是这个sourceType &&  mainClinet!= null*/false) {
                    if (enabled) {
                        client.setLowStreamParameter(AgoraTranslate.agorartcSimulcastStreamConfig2LowStreamParameter(streamConfig));
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
                                AgoraConsole.error("reason");
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
        AgoraConsole.warn("takeSnapshotEx not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
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
        if (this._engine.globalVariables.deviceEnumerated) {
            AgoraConsole.warn("Please call this method:enumeratePlaybackDevices after onDeviceEnumerated triggered")
            return [];
        }
        else {
            return this._engine.globalVariables.playbackDevices;
        }
    }

    enumerateRecordingDevices(): agorartc.DeviceInfo[] {
        if (this._engine.globalVariables.deviceEnumerated) {
            AgoraConsole.warn("Please call this method:enumerateRecordingDevices after onDeviceEnumerated triggered")
            return [];
        }
        else {
            return this._engine.globalVariables.recordingDevices;
        }
    }

    //底下的api。稍后再说
    setPlaybackDevice(deviceId: string): number {
        this._actonQueue.putAction({
            fun: (deviceId: string, next) => {
                this._engine.mainClientVariables.playbackDeviceId = deviceId;
                //todo 找到所有的audio流去设置一下deviceID咯
                next();
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
                //todo 找到所有的麦克风 audio流去设置一下deviceID咯
                next();
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




    private _createAudioTrack(type: IrisAudioSourceType, fun: any) {


    }


    //private
    private _createVideoTrack(type: IrisVideoSourceType, fun: any) {



    }

    private createNormalAudioAndVideoTrack(fun: (any, [IMicrophoneAudioTrack, ICameraVideoTrack]) => void) {
        // let videoPackage: VideoTrackPackage = this._engine.entitiesContainer.getFreeLocalVideoTrackByType(IrisVideoSourceType.kVideoSourceTypeCameraPrimary);
        // if (videoPackage) {
        //     let audioPackage: AudioTrackPackage = this._engine.entitiesContainer.getFreeLocalAudioTrackByType(IrisAudioSourceType.kAudioSourceTypeMicrophone);
        //     let array: [IMicrophoneAudioTrack, ICameraVideoTrack] = [audioPackage.track as IMicrophoneAudioTrack, videoPackage.track as ICameraVideoTrack];
        //     fun(null, array);
        //     return;
        // }

        let audioConfig: MicrophoneAudioTrackInitConfig = this._generateMicrophoneAudioTrackInitConfig();
        let videoConfig: CameraVideoTrackInitConfig = this._generateCameraVideoTrackInitConfig();

        AgoraRTC.createMicrophoneAndCameraTracks(audioConfig, videoConfig)
            .then((trackArray: [IMicrophoneAudioTrack, ICameraVideoTrack]) => {

                let audioTrack = trackArray[0];
                let videoTrack = trackArray[1];

                this._processMainClientAudioTrack(audioTrack);
                this._processMainClientVideoTrack(videoTrack);

                fun(null, trackArray);
            })
            .catch((reason) => {
                fun(reason, null);
            })
    }


    private createAudioAndVideoTrack(audioType: IrisAudioSourceType, videoType: IrisVideoSourceType, fun: (any, [ILocalAudioTrack, ILocalVideoTrack]) => void) {
        if (audioType == IrisAudioSourceType.kAudioSourceTypeUnknow && videoType == IrisVideoSourceType.kVideoSourceTypeUnknown) {
            AgoraConsole.error("want do you want ???");
            fun("you cant set both audio and video unknow", [null, null]);
            return;
        }

        var trackArray: Array<any> = [null, null];

        if (videoType == IrisVideoSourceType.kVideoSourceTypeScreenPrimary) {
            //screen video
            if (audioType == IrisAudioSourceType.kAudioSourceTypeScreenShare) {

                // let audioTrackPackage: AudioTrackPackage = this._engine.entitiesContainer.getFreeLocalAudioTrackByType(IrisAudioSourceType.kAudioSourceTypeScreenShare);
                // let videoTrackPackage: VideoTrackPackage = this._engine.entitiesContainer.getFreeLocalVideoTrackByType(IrisVideoSourceType.kVideoSourceTypeScreenPrimary);

                // if (audioTrackPackage && videoTrackPackage) {
                //     fun(null, [videoTrackPackage.track, audioTrackPackage.track]);
                //     return;
                // }
                // else {
                //     this._engine.entitiesContainer.removeFreeLocalAudioTrack(audioTrackPackage, true);
                //     this._engine.entitiesContainer.removeFreeLocalVideoTrack(videoTrackPackage, true);
                // }

                let conf: ScreenVideoTrackInitConfig = this._generateScreenVideoTrackInitConfig();
                AgoraRTC.createScreenVideoTrack(conf, 'enable')
                    .then((trackArray: [ILocalVideoTrack, ILocalAudioTrack]) => {
                        let videoTrack: ILocalVideoTrack = trackArray[0];
                        let audioTrack: ILocalAudioTrack = trackArray[1];
                        this._processSceneAuidoTrack(audioTrack);
                        this._processSceneVideoTrack(videoTrack);
                        fun(null, [trackArray[1], trackArray[0]]);
                    })
                    .catch((reason) => {
                        fun(reason, null);
                    })
            }
            else if (audioType == IrisAudioSourceType.kAudioSourceTypeMicrophone) {
                //麦克风音频
                let onGetVideoTrack = (err: any, videoTrack: ILocalVideoTrack) => {
                    if (err) {
                        fun(err, null);
                    }
                    AgoraRTC.createMicrophoneAudioTrack()
                        .then((audoTrack: IMicrophoneAudioTrack) => {
                            this._processMainClientAudioTrack(audoTrack);
                            fun(null, [audoTrack, videoTrack]);
                        })
                        .catch((reason) => {
                            videoTrack.close();
                            fun(err, null);
                        })
                }

                // let videoTrackPackage: VideoTrackPackage = this._engine.entitiesContainer.popFreeLocalVideoTrackByType(IrisVideoSourceType.kVideoSourceTypeScreenPrimary);
                // if (videoTrackPackage) {
                //     onGetVideoTrack(null, videoTrackPackage.track as ILocalVideoTrack);
                // }
                // else {
                let conf: ScreenVideoTrackInitConfig = this._generateScreenVideoTrackInitConfig();
                AgoraRTC.createScreenVideoTrack(conf, 'disable')
                    .then((videoTrack: ILocalVideoTrack) => {
                        this._processSceneVideoTrack(videoTrack);
                        onGetVideoTrack(null, videoTrack);
                    })
                    .catch((reason) => {
                        onGetVideoTrack(reason, null);
                    })
                // }
            }
            else {
                let conf: ScreenVideoTrackInitConfig = this._generateScreenVideoTrackInitConfig();
                AgoraRTC.createScreenVideoTrack(conf, 'disable')
                    .then((videoTrack: ILocalVideoTrack) => {
                        this._processSceneVideoTrack(videoTrack);
                        fun(null, [null, videoTrack]);
                    })
                    .catch((reason) => {
                        fun(reason, null);
                    })
            }
        }
        else {
            //camera video
            if (audioType == IrisAudioSourceType.kAudioSourceTypeMicrophone) {
                let audioConfig: MicrophoneAudioTrackInitConfig = this._generateMicrophoneAudioTrackInitConfig();
                let videoConfig: CameraVideoTrackInitConfig = this._generateCameraVideoTrackInitConfig();
                AgoraRTC.createMicrophoneAndCameraTracks(audioConfig, videoConfig)
                    .then((trackArray: [IMicrophoneAudioTrack, ICameraVideoTrack]) => {

                        let audioTrack = trackArray[0];
                        let videoTrack = trackArray[1];

                        this._processMainClientAudioTrack(audioTrack);
                        this._processMainClientVideoTrack(videoTrack);

                        fun(null, trackArray);
                    })
                    .catch((reason) => {
                        fun(reason, null);
                    })
            }
            else if (audioType == IrisAudioSourceType.kAudioSourceTypeUnknow) {
                let videoConfig: CameraVideoTrackInitConfig = this._generateCameraVideoTrackInitConfig();
                AgoraRTC.createCameraVideoTrack(videoConfig)
                    .then((videoTrack: ICameraVideoTrack) => {
                        this._processMainClientVideoTrack(videoTrack);
                        fun(null, [null, videoTrack]);
                    })
                    .catch((reason) => {
                        fun(reason, null);
                    });
            }
        }
    }


    // private _getOrCreateScreenAudioAndVideoTrack(fun: (any, [ILocalAudioTrack, ILocalVideoTrack]) => void) {

    //     let audioTrackPackage: AudioTrackPackage = this._engine.entitiesContainer.getFreeLocalAudioTrackByType(IrisAudioSourceType.kAudioSourceTypeScreenShare);
    //     let videoTrackPackage: VideoTrackPackage = this._engine.entitiesContainer.getFreeLocalVideoTrackByType(IrisVideoSourceType.kVideoSourceTypeScreenPrimary);

    //     if (videoTrackPackage && audioTrackPackage) {
    //         fun(null, [videoTrackPackage.track, audioTrackPackage.track]);
    //         return;
    //     }
    //     else {
    //         this._engine.entitiesContainer.removeFreeLocalAudioTrack(audioTrackPackage, true);
    //         this._engine.entitiesContainer.removeFreeLocalVideoTrack(videoTrackPackage, true);
    //     }

    //     let conf: ScreenVideoTrackInitConfig = {};
    //     let globalVariables: IrisGlobalVariables = this._engine.globalVariables;
    //     if (globalVariables.screenCaptureContentHint != null && globalVariables.screenCaptureContentHint != agorartc.VIDEO_CONTENT_HINT.CONTENT_HINT_NONE) {
    //         conf.optimizationMode = AgoraTranslate.agorartcVIDEO_CONTENT_HINT2string(globalVariables.screenCaptureContentHint);
    //     }
    //     AgoraRTC.createScreenVideoTrack(conf, 'enable')
    //         .then((trackArray: [ILocalVideoTrack, ILocalAudioTrack]) => {
    //             let videoTrack: ILocalVideoTrack = trackArray[0];
    //             let audioTrack: ILocalAudioTrack = trackArray[1];
    //             this._processSceneAuidoTrack(audioTrack);
    //             this._processSceneVideoTrack(videoTrack);

    //             fun(null, [trackArray[1], trackArray[0]]);
    //         })
    //         .catch((reason) => {
    //             fun(reason, null);
    //         })
    // }

    //当一个audioTrack被创建的时候，要拆解这些参数
    private _processSceneAuidoTrack(audioTrack: ILocalAudioTrack) {
        let globalVariables = this._engine.globalVariables;
        let mainClientVariables = this._engine.mainClientVariables;

        //audio
        if (mainClientVariables.playbackDeviceId) {
            audioTrack.setPlaybackDevice(mainClientVariables.playbackDeviceId);
        }
        if (globalVariables.enabledAudio) {
            audioTrack.play();
        }
        if (globalVariables.pausedAudio) {
            audioTrack.setEnabled(false);
        }

        if (globalVariables.mutedLocalAudioStream) {
            audioTrack.setMuted(true);
        }
    }

    private _processSceneVideoTrack(videoTrack: ILocalVideoTrack) {

        let globalVariables = this._engine.globalVariables;
        let mainClientVariables = this._engine.mainClientVariables;

        if (mainClientVariables.videoDeviceId) {
            //videoTrack 没有deviceId
            // videoTrack.set
        }


        if (globalVariables.enabledVideo) {
            videoTrack.play("screen-video");
        }
        if (globalVariables.pausedVideo) {
            videoTrack.setEnabled(false);
        }
        if (globalVariables.mutedLocalVideoStream) {
            videoTrack.setMuted(true);
        }
    }

    private _processMainClientAudioTrack(audioTrack: IMicrophoneAudioTrack) {
        let globalVariables = this._engine.globalVariables;
        if (globalVariables.enabledAudio) {
            audioTrack.play();
        }
        if (globalVariables.pausedAudio) {
            audioTrack.setEnabled(false);
        }
        if (globalVariables.mutedLocalAudioStream) {
            audioTrack.setMuted(true);
        }
    }

    private _processMainClientVideoTrack(videoTrack: ICameraVideoTrack) {
        let globalVariables = this._engine.globalVariables;
        if (globalVariables.enabledVideo) {
            let config: VideoPlayerConfig = {};
            if (this._engine.globalVariables.videoEncoderConfiguration) {
                config.mirror = AgoraTranslate.agorartcVIDEO_MIRROR_MODE_TYPE2boolean(this._engine.globalVariables.videoEncoderConfiguration.mirrorMode)
            }
            videoTrack.play("normalVideo", config);
        }
        if (globalVariables.pausedVideo) {
            videoTrack.setEnabled(false);
        }
        if (globalVariables.mutedLocalVideoStream) {
            videoTrack.setMuted(true);
        }
    }



    private _createMainClient(): IAgoraRTCClient {

        let mainClientVariables = this._engine.mainClientVariables;
        let config: ClientConfig = mainClientVariables.generateClientConfig();
        let mainClient: IAgoraRTCClient = AgoraRTC.createClient(config);

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
            mainClient.setEncryptionConfig(encryptionMode, config.encryptionKey, config.encryptionKdfSalt);
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
        return conf;
    }




}