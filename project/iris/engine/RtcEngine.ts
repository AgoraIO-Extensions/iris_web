import * as agorartc from '../terra/rtc_types/Index';
import { IRtcEngine } from '../terra/IRtcEngine';
import { IrisApiEngine } from './IrisApiEngine';
import { IrisRtcEngine } from './IrisRtcEngine';
import { AgoraActionQueue } from '../tool/AgoraActionQueue';
import { AgoraConsole } from '../tool/AgoraConsole';
import AgoraRTC, { IAgoraRTCClient } from 'agora-rtc-sdk-ng';
import { AgoraTranslate } from '../tool/AgoraTranslate';

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

        AgoraRTC.setArea([AgoraTranslate.AREA_CODE2AREAS(context.areaCode)]);

        AgoraConsole.logLevel = context.logConfig.level;
        let numberLevel: number = AgoraTranslate.logLevel2Number(context.logConfig.level);
        AgoraRTC.setLogLevel(numberLevel);

        let client: IAgoraRTCClient = AgoraRTC.createClient({
            codec: 'h264',
            mode: "rtc",
            role: "host",
        });
        this._engine.entitiesContainer.setMainClient(client);

        let result = AgoraRTC.checkSystemRequirements();
        if (result) {
            AgoraConsole.log("AgoraRTC.checkSystemRequirements return true");
        }
        else {
            AgoraConsole.warn("AgoraRTC.checkSystemRequirements reutrn false");
        }
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
    enumerateVideoDevices(): number {
        AgoraRTC.getCameras()
            .then((info: MediaDeviceInfo[]) => {
                let deviceInfos: Array<agorartc.DeviceInfo> = new Array<agorartc.DeviceInfo>();
                for (let i = 0; i < info.length; i++) {
                    deviceInfos.push({
                        deviceId: info[i].deviceId,
                        deviceName: info[i].label
                    });
                }
                this._engine.rtcEngineEventHandler.onEnumeratedVideoDevices(deviceInfos);
            })
            .catch((reson: any) => {
                AgoraConsole.warn("enumerated video devices failed");
                this._engine.rtcEngineEventHandler.onWarning(0, "enumerated video devices failed");
                this._engine.rtcEngineEventHandler.onEnumeratedVideoDevices([]);
            });
        return 0;
    }

    setDevice(deviceIdUTF8: string): number {
        this._actonQueue.putAction({
            fun: (deviceIdUTF8: string, next) => {
                //todo 如果当前有LocalVideoTrack， 那么调用LocalVideoTrack.setDevice 

                //否则 在localVideoTrack被创建的时候，要读取下边这个电量，并且设置一下，不需要
                this._engine.mainClientVariables.deviceId = deviceIdUTF8;

                next();
            },
            args: [deviceIdUTF8]
        })
        return 0;
    }

    //todo may can supported
    getDevice(deviceIdUTF8: string): number {
        AgoraConsole.warn("getDevice not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
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
        //do nothing
    }

    queryInterface(iid: agorartc.INTERFACE_ID_TYPE, inter: void): number {
        AgoraConsole.warn("queryInterface not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    getVersion(build: number): string {
        return AgoraRTC.VERSION;
    }

    getErrorDescription(code: number): string {
        AgoraConsole.warn("getErrorDescription not supported in this platfrom!");
        return "getErrorDescription not supported in this platfrom!";
    }

    joinChannel(token: string, channelId: string, info: string, uid: number): number {

        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;

    }
    joinChannel2(token: string, channelId: string, uid: number, options: agorartc.ChannelMediaOptions): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    updateChannelMediaOptions(options: agorartc.ChannelMediaOptions): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    leaveChannel(): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    leaveChannel2(options: agorartc.LeaveChannelOptions): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    renewToken(token: string): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    setChannelProfile(profile: agorartc.CHANNEL_PROFILE_TYPE): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    setClientRole(role: agorartc.CLIENT_ROLE_TYPE): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    setClientRole2(role: agorartc.CLIENT_ROLE_TYPE, options: agorartc.ClientRoleOptions): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    startEchoTest(): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    startEchoTest2(intervalInSeconds: number): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    startEchoTest3(config: agorartc.EchoTestConfiguration): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    stopEchoTest(): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    enableVideo(): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    disableVideo(): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    startPreview(): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    startPreview2(sourceType: agorartc.VIDEO_SOURCE_TYPE): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    stopPreview(): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    stopPreview2(sourceType: agorartc.VIDEO_SOURCE_TYPE): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    startLastmileProbeTest(config: agorartc.LastmileProbeConfig): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    stopLastmileProbeTest(): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    setVideoEncoderConfiguration(config: agorartc.VideoEncoderConfiguration): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    setBeautyEffectOptions(enabled: boolean, options: agorartc.BeautyOptions, type: agorartc.MEDIA_SOURCE_TYPE): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    setLowlightEnhanceOptions(enabled: boolean, options: agorartc.LowlightEnhanceOptions, type: agorartc.MEDIA_SOURCE_TYPE): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    setVideoDenoiserOptions(enabled: boolean, options: agorartc.VideoDenoiserOptions, type: agorartc.MEDIA_SOURCE_TYPE): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    setColorEnhanceOptions(enabled: boolean, options: agorartc.ColorEnhanceOptions, type: agorartc.MEDIA_SOURCE_TYPE): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    enableVirtualBackground(enabled: boolean, backgroundSource: agorartc.VirtualBackgroundSource, segproperty: agorartc.SegmentationProperty, type: agorartc.MEDIA_SOURCE_TYPE): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    enableRemoteSuperResolution(userId: number, enable: boolean): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    setupRemoteVideo(canvas: agorartc.VideoCanvas): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    setupLocalVideo(canvas: agorartc.VideoCanvas): number {
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

    //done
    setSubscribeAudioBlacklist(uidList: number[], uidNumber: number): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    //done
    setSubscribeAudioWhitelist(uidList: number[], uidNumber: number): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    //done
    setSubscribeVideoBlacklist(uidList: number[], uidNumber: number): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    //done
    setSubscribeVideoWhitelist(uidList: number[], uidNumber: number): number {
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

    //done
    startAudioRecording(filePath: string, quality: agorartc.AUDIO_RECORDING_QUALITY_TYPE): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    //done
    startAudioRecording2(filePath: string, sampleRate: number, quality: agorartc.AUDIO_RECORDING_QUALITY_TYPE): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    //done
    startAudioRecording3(config: agorartc.AudioRecordingConfiguration): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    //done
    registerAudioEncodedFrameObserver(config: agorartc.AudioEncodedFrameObserverConfig, observer: agorartc.IAudioEncodedFrameObserver): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    //done
    stopAudioRecording(): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    //done
    createMediaPlayer(): agorartc.IMediaPlayer {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    //done
    destroyMediaPlayer(media_player: agorartc.IMediaPlayer): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    //todo 
    startAudioMixing(filePath: string, loopback: boolean, replace: boolean, cycle: number): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    //todo 
    startAudioMixing2(filePath: string, loopback: boolean, replace: boolean, cycle: number, startPos: number): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    //todo
    stopAudioMixing(): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    //todo
    pauseAudioMixing(): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    //todo
    resumeAudioMixing(): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    //done
    selectAudioTrack(index: number): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    //done
    getAudioTrackCount(): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    //done
    adjustAudioMixingVolume(volume: number): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    //done
    adjustAudioMixingPublishVolume(volume: number): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    //done
    getAudioMixingPublishVolume(): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    //done
    adjustAudioMixingPlayoutVolume(volume: number): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    //done
    getAudioMixingPlayoutVolume(): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    //done
    getAudioMixingDuration(): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    //done
    getAudioMixingCurrentPosition(): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    //done
    setAudioMixingPosition(pos: number): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    //done
    setAudioMixingDualMonoMode(mode: agorartc.AUDIO_MIXING_DUAL_MONO_MODE): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    //done
    setAudioMixingPitch(pitch: number): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    //done
    getEffectsVolume(): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    //done
    setEffectsVolume(volume: number): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    //done
    preloadEffect(soundId: number, filePath: string, startPos: number): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    //done
    playEffect(soundId: number, filePath: string, loopCount: number, pitch: number, pan: number, gain: number, publish: boolean, startPos: number): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    //done
    playAllEffects(loopCount: number, pitch: number, pan: number, gain: number, publish: boolean): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    //done
    getVolumeOfEffect(soundId: number): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    //done
    setVolumeOfEffect(soundId: number, volume: number): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    //done
    pauseEffect(soundId: number): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    //done
    pauseAllEffects(): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    //done
    resumeEffect(soundId: number): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    //done
    resumeAllEffects(): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    //done
    stopEffect(soundId: number): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    //done
    stopAllEffects(): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    //done
    unloadEffect(soundId: number): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    //done
    unloadAllEffects(): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    //done
    getEffectDuration(filePath: string): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    //done
    setEffectPosition(soundId: number, pos: number): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    //done
    getEffectCurrentPosition(soundId: number): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    //done
    enableSoundPositionIndication(enabled: boolean): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    //done
    setRemoteVoicePosition(uid: number, pan: number, gain: number): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    //todo 
    enableSpatialAudio(enabled: boolean): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    //todo
    setRemoteUserSpatialAudioParams(uid: number, params: agorartc.SpatialAudioParams): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    //done
    setVoiceBeautifierPreset(preset: agorartc.VOICE_BEAUTIFIER_PRESET): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    //done
    setAudioEffectPreset(preset: agorartc.AUDIO_EFFECT_PRESET): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

   //done
    setVoiceConversionPreset(preset: agorartc.VOICE_CONVERSION_PRESET): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    //done
    setAudioEffectParameters(preset: agorartc.AUDIO_EFFECT_PRESET, param1: number, param2: number): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    //done
    setVoiceBeautifierParameters(preset: agorartc.VOICE_BEAUTIFIER_PRESET, param1: number, param2: number): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    //done
    setVoiceConversionParameters(preset: agorartc.VOICE_CONVERSION_PRESET, param1: number, param2: number): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    //done
    setLocalVoicePitch(pitch: number): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    //done
    setLocalVoiceEqualization(bandFrequency: agorartc.AUDIO_EQUALIZATION_BAND_FREQUENCY, bandGain: number): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    //done
    setLocalVoiceReverb(reverbKey: agorartc.AUDIO_REVERB_TYPE, value: number): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    //done
    setLogFile(filePath: string): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    //done
    setLogFilter(filter: number): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    //done
    setLogLevel(level: agorartc.LOG_LEVEL): number {
        AgoraConsole.logLevel = level;
        let numberLevel: number = AgoraTranslate.logLevel2Number(level);
        AgoraRTC.setLogLevel(numberLevel);
        return 0;
    }

    //done
    setLogFileSize(fileSizeInKBytes: number): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    uploadLogFile(requestId: string): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    setLocalRenderMode(renderMode: agorartc.RENDER_MODE_TYPE, mirrorMode: agorartc.VIDEO_MIRROR_MODE_TYPE): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    setRemoteRenderMode(uid: number, renderMode: agorartc.RENDER_MODE_TYPE, mirrorMode: agorartc.VIDEO_MIRROR_MODE_TYPE): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    setLocalRenderMode2(renderMode: agorartc.RENDER_MODE_TYPE): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    setLocalVideoMirrorMode(mirrorMode: agorartc.VIDEO_MIRROR_MODE_TYPE): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    enableDualStreamMode(enabled: boolean): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    enableDualStreamMode2(sourceType: agorartc.VIDEO_SOURCE_TYPE, enabled: boolean): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    enableDualStreamMode3(sourceType: agorartc.VIDEO_SOURCE_TYPE, enabled: boolean, streamConfig: agorartc.SimulcastStreamConfig): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    setDualStreamMode(mode: agorartc.SIMULCAST_STREAM_MODE): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    setDualStreamMode2(sourceType: agorartc.VIDEO_SOURCE_TYPE, mode: agorartc.SIMULCAST_STREAM_MODE): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    setDualStreamMode3(sourceType: agorartc.VIDEO_SOURCE_TYPE, mode: agorartc.SIMULCAST_STREAM_MODE, streamConfig: agorartc.SimulcastStreamConfig): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    enableEchoCancellationExternal(enabled: boolean, audioSourceDelay: number): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    startPrimaryCustomAudioTrack(config: agorartc.AudioTrackConfig): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    stopPrimaryCustomAudioTrack(): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    startSecondaryCustomAudioTrack(config: agorartc.AudioTrackConfig): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    stopSecondaryCustomAudioTrack(): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    setRecordingAudioFrameParameters(sampleRate: number, channel: number, mode: agorartc.RAW_AUDIO_FRAME_OP_MODE_TYPE, samplesPerCall: number): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    setPlaybackAudioFrameParameters(sampleRate: number, channel: number, mode: agorartc.RAW_AUDIO_FRAME_OP_MODE_TYPE, samplesPerCall: number): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    setMixedAudioFrameParameters(sampleRate: number, channel: number, samplesPerCall: number): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    setPlaybackAudioFrameBeforeMixingParameters(sampleRate: number, channel: number): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    enableAudioSpectrumMonitor(intervalInMS: number): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    disableAudioSpectrumMonitor(): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    registerAudioSpectrumObserver(observer: agorartc.IAudioSpectrumObserver): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    unregisterAudioSpectrumObserver(observer: agorartc.IAudioSpectrumObserver): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    adjustRecordingSignalVolume(volume: number): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    muteRecordingSignal(mute: boolean): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    adjustPlaybackSignalVolume(volume: number): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    adjustUserPlaybackSignalVolume(uid: number, volume: number): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    setLocalPublishFallbackOption(option: agorartc.STREAM_FALLBACK_OPTIONS): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    setRemoteSubscribeFallbackOption(option: agorartc.STREAM_FALLBACK_OPTIONS): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    enableLoopbackRecording(enabled: boolean, deviceName: string): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    adjustLoopbackSignalVolume(volume: number): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    getLoopbackRecordingVolume(): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    enableInEarMonitoring(enabled: boolean, includeAudioFilters: number): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    setInEarMonitoringVolume(volume: number): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    loadExtensionProvider(path: string): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    setExtensionProviderProperty(provider: string, key: string, value: string): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    enableExtension(provider: string, extension: string, enable: boolean, type: agorartc.MEDIA_SOURCE_TYPE): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    setExtensionProperty(provider: string, extension: string, key: string, value: string, type: agorartc.MEDIA_SOURCE_TYPE): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    getExtensionProperty(provider: string, extension: string, key: string, value: string, buf_len: number, type: agorartc.MEDIA_SOURCE_TYPE): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    setCameraCapturerConfiguration(config: agorartc.CameraCapturerConfiguration): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    createCustomVideoTrack(): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    createCustomEncodedVideoTrack(sender_option: agorartc.SenderOptions): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    destroyCustomVideoTrack(video_track_id: number): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    destroyCustomEncodedVideoTrack(video_track_id: number): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    switchCamera(): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    isCameraZoomSupported(): boolean {
        return false;
    }
    isCameraFaceDetectSupported(): boolean {
        return false;
    }
    isCameraTorchSupported(): boolean {
        return false;
    }
    isCameraFocusSupported(): boolean {
        return false;
    }
    isCameraAutoFocusFaceModeSupported(): boolean {
        return false;
    }
    setCameraZoomFactor(factor: number): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    enableFaceDetection(enabled: boolean): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    getCameraMaxZoomFactor(): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    setCameraFocusPositionInPreview(positionX: number, positionY: number): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    setCameraTorchOn(isOn: boolean): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    setCameraAutoFocusFaceModeEnabled(enabled: boolean): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    isCameraExposurePositionSupported(): boolean {
        return false;
    }
    setCameraExposurePosition(positionXinView: number, positionYinView: number): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    isCameraAutoExposureFaceModeSupported(): boolean {
        return false;
    }
    setCameraAutoExposureFaceModeEnabled(enabled: boolean): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    setDefaultAudioRouteToSpeakerphone(defaultToSpeaker: boolean): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    setEnableSpeakerphone(speakerOn: boolean): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    isSpeakerphoneEnabled(): boolean {
        return false;
    }
    getScreenCaptureSources(thumbSize: number, iconSize: number, includeScreen: boolean): agorartc.IScreenCaptureSourceList[] {
        return [];
    }
    setAudioSessionOperationRestriction(restriction: agorartc.AUDIO_SESSION_OPERATION_RESTRICTION): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    startScreenCaptureByDisplayId(displayId: number, regionRect: agorartc.Rectangle, captureParams: agorartc.ScreenCaptureParameters): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    startScreenCaptureByScreenRect(screenRect: agorartc.Rectangle, regionRect: agorartc.Rectangle, captureParams: agorartc.ScreenCaptureParameters): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    getAudioDeviceInfo(deviceInfo: agorartc.DeviceInfo): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    startScreenCaptureByWindowId(windowId: any, regionRect: agorartc.Rectangle, captureParams: agorartc.ScreenCaptureParameters): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    setScreenCaptureContentHint(contentHint: agorartc.VIDEO_CONTENT_HINT): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    setScreenCaptureScenario(screenScenario: agorartc.SCREEN_SCENARIO_TYPE): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    updateScreenCaptureRegion(regionRect: agorartc.Rectangle): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    updateScreenCaptureParameters(captureParams: agorartc.ScreenCaptureParameters): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    startScreenCapture(captureParams: agorartc.ScreenCaptureParameters2): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    updateScreenCapture(captureParams: agorartc.ScreenCaptureParameters2): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    stopScreenCapture(): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    getCallId(callId: string): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    rate(callId: string, rating: number, description: string): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    complain(callId: string, description: string): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    startRtmpStreamWithoutTranscoding(url: string): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    startRtmpStreamWithTranscoding(url: string, transcoding: agorartc.LiveTranscoding): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    updateRtmpTranscoding(transcoding: agorartc.LiveTranscoding): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    stopRtmpStream(url: string): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    startLocalVideoTranscoder(config: agorartc.LocalTranscoderConfiguration): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    updateLocalTranscoderConfiguration(config: agorartc.LocalTranscoderConfiguration): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    stopLocalVideoTranscoder(): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    startPrimaryCameraCapture(config: agorartc.CameraCapturerConfiguration): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    startSecondaryCameraCapture(config: agorartc.CameraCapturerConfiguration): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    stopPrimaryCameraCapture(): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    stopSecondaryCameraCapture(): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    setCameraDeviceOrientation(type: agorartc.VIDEO_SOURCE_TYPE, orientation: agorartc.VIDEO_ORIENTATION): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    setScreenCaptureOrientation(type: agorartc.VIDEO_SOURCE_TYPE, orientation: agorartc.VIDEO_ORIENTATION): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    startPrimaryScreenCapture(config: agorartc.ScreenCaptureConfiguration): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    startSecondaryScreenCapture(config: agorartc.ScreenCaptureConfiguration): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    stopPrimaryScreenCapture(): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    stopSecondaryScreenCapture(): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    getConnectionState(): agorartc.CONNECTION_STATE_TYPE {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    setRemoteUserPriority(uid: number, userPriority: agorartc.PRIORITY_TYPE): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    registerPacketObserver(observer: agorartc.IPacketObserver): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    setEncryptionMode(encryptionMode: string): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    setEncryptionSecret(secret: string): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    enableEncryption(enabled: boolean, config: agorartc.EncryptionConfig): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    createDataStream(streamId: number, reliable: boolean, ordered: boolean): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    createDataStream2(streamId: number, config: agorartc.DataStreamConfig): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    sendStreamMessage(streamId: number, data: string, length: number): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    addVideoWatermark(watermark: agorartc.RtcImage): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    addVideoWatermark2(watermarkUrl: string, options: agorartc.WatermarkOptions): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    clearVideoWatermark(): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    clearVideoWatermarks(): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    addInjectStreamUrl(url: string, config: agorartc.InjectStreamConfig): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    removeInjectStreamUrl(url: string): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    pauseAudio(): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    resumeAudio(): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    enableWebSdkInteroperability(enabled: boolean): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    sendCustomReportMessage(id: string, category: string, event: string, label: string, value: number): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    registerMediaMetadataObserver(observer: agorartc.IMetadataObserver, type: agorartc.METADATA_TYPE): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    unregisterMediaMetadataObserver(observer: agorartc.IMetadataObserver, type: agorartc.METADATA_TYPE): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    startAudioFrameDump(channel_id: string, user_id: number, location: string, uuid: string, passwd: string, duration_ms: number, auto_upload: boolean): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    stopAudioFrameDump(channel_id: string, user_id: number, location: string): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    registerLocalUserAccount(appId: string, userAccount: string): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    joinChannelWithUserAccount(token: string, channelId: string, userAccount: string): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    joinChannelWithUserAccount2(token: string, channelId: string, userAccount: string, options: agorartc.ChannelMediaOptions): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    joinChannelWithUserAccountEx(token: string, channelId: string, userAccount: string, options: agorartc.ChannelMediaOptions, eventHandler: agorartc.IRtcEngineEventHandler): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    getUserInfoByUserAccount(userAccount: string, userInfo: agorartc.UserInfo[]): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    getUserInfoByUid(uid: number, userInfo: agorartc.UserInfo[]): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    startChannelMediaRelay(configuration: agorartc.ChannelMediaRelayConfiguration): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    updateChannelMediaRelay(configuration: agorartc.ChannelMediaRelayConfiguration): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    stopChannelMediaRelay(): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    pauseAllChannelMediaRelay(): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    resumeAllChannelMediaRelay(): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    setDirectCdnStreamingAudioConfiguration(profile: agorartc.AUDIO_PROFILE_TYPE): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    setDirectCdnStreamingVideoConfiguration(config: agorartc.VideoEncoderConfiguration): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    startDirectCdnStreaming(eventHandler: agorartc.IDirectCdnStreamingEventHandler, publishUrl: string, options: agorartc.DirectCdnStreamingMediaOptions): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    stopDirectCdnStreaming(): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    updateDirectCdnStreamingMediaOptions(options: agorartc.DirectCdnStreamingMediaOptions): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    startRhythmPlayer(sound1: string, sound2: string, config: agorartc.AgoraRhythmPlayerConfig): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    stopRhythmPlayer(): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    configRhythmPlayer(config: agorartc.AgoraRhythmPlayerConfig): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    takeSnapshot(uid: number, filePath: string): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    enableContentInspect(enabled: boolean, config: agorartc.ContentInspectConfig): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    adjustCustomAudioPublishVolume(sourceId: number, volume: number): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    adjustCustomAudioPlayoutVolume(sourceId: number, volume: number): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    setCloudProxy(proxyType: agorartc.CLOUD_PROXY_TYPE): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    setLocalAccessPoint(config: agorartc.LocalAccessPointConfiguration): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    enableFishEyeCorrection(enabled: boolean, params: agorartc.FishEyeCorrectionParams): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    setAdvancedAudioOptions(options: agorartc.AdvancedAudioOptions): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    setAVSyncSource(channelId: string, uid: number): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    enableVideoImageSource(enable: boolean, options: agorartc.ImageTrackOptions): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    enableWirelessAccelerate(enabled: boolean): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    joinChannelEx(token: string, connection: agorartc.RtcConnection, options: agorartc.ChannelMediaOptions, eventHandler: agorartc.IRtcEngineEventHandler[]): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    leaveChannelEx(connection: agorartc.RtcConnection): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    updateChannelMediaOptionsEx(options: agorartc.ChannelMediaOptions, connection: agorartc.RtcConnection): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    setVideoEncoderConfigurationEx(config: agorartc.VideoEncoderConfiguration, connection: agorartc.RtcConnection): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    setupRemoteVideoEx(canvas: agorartc.VideoCanvas, connection: agorartc.RtcConnection): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    muteRemoteAudioStreamEx(uid: number, mute: boolean, connection: agorartc.RtcConnection): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    muteRemoteVideoStreamEx(uid: number, mute: boolean, connection: agorartc.RtcConnection): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    setRemoteVideoStreamTypeEx(uid: number, streamType: agorartc.VIDEO_STREAM_TYPE, connection: agorartc.RtcConnection): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    setSubscribeAudioBlacklistEx(uidList: number[], uidNumber: number, connection: agorartc.RtcConnection): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    setSubscribeAudioWhitelistEx(uidList: number[], uidNumber: number, connection: agorartc.RtcConnection): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    setSubscribeVideoBlacklistEx(uidList: number[], uidNumber: number, connection: agorartc.RtcConnection): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    setSubscribeVideoWhitelistEx(uidList: number[], uidNumber: number, connection: agorartc.RtcConnection): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    setRemoteVideoSubscriptionOptionsEx(uid: number, options: agorartc.VideoSubscriptionOptions, connection: agorartc.RtcConnection): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    setRemoteVoicePositionEx(uid: number, pan: number, gain: number, connection: agorartc.RtcConnection): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    setRemoteUserSpatialAudioParamsEx(uid: number, params: agorartc.SpatialAudioParams, connection: agorartc.RtcConnection): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    setRemoteRenderModeEx(uid: number, renderMode: agorartc.RENDER_MODE_TYPE, mirrorMode: agorartc.VIDEO_MIRROR_MODE_TYPE, connection: agorartc.RtcConnection): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    enableLoopbackRecordingEx(connection: agorartc.RtcConnection, enabled: boolean, deviceName: string): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    getConnectionStateEx(connection: agorartc.RtcConnection): agorartc.CONNECTION_STATE_TYPE {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    enableEncryptionEx(connection: agorartc.RtcConnection, enabled: boolean, config: agorartc.EncryptionConfig): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    createDataStreamEx(streamId: number, reliable: boolean, ordered: boolean, connection: agorartc.RtcConnection): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    createDataStreamEx2(streamId: number, config: agorartc.DataStreamConfig, connection: agorartc.RtcConnection): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    sendStreamMessageEx(streamId: number, data: string, length: number, connection: agorartc.RtcConnection): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    addVideoWatermarkEx(watermarkUrl: string, options: agorartc.WatermarkOptions, connection: agorartc.RtcConnection): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    clearVideoWatermarkEx(connection: agorartc.RtcConnection): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    sendCustomReportMessageEx(id: string, category: string, event: string, label: string, value: number, connection: agorartc.RtcConnection): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    enableAudioVolumeIndicationEx(interval: number, smooth: number, reportVad: boolean, connection: agorartc.RtcConnection): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    getUserInfoByUserAccountEx(userAccount: string, userInfo: agorartc.UserInfo[], connection: agorartc.RtcConnection): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    getUserInfoByUidEx(uid: number, userInfo: agorartc.UserInfo[], connection: agorartc.RtcConnection): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    setVideoProfileEx(width: number, height: number, frameRate: number, bitrate: number): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    enableDualStreamModeEx(sourceType: agorartc.VIDEO_SOURCE_TYPE, enabled: boolean, streamConfig: agorartc.SimulcastStreamConfig, connection: agorartc.RtcConnection): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    setDualStreamModeEx(sourceType: agorartc.VIDEO_SOURCE_TYPE, mode: agorartc.SIMULCAST_STREAM_MODE, streamConfig: agorartc.SimulcastStreamConfig, connection: agorartc.RtcConnection): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    takeSnapshotEx(connection: agorartc.RtcConnection, uid: number, filePath: string): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    updateRemotePosition(uid: number, posInfo: agorartc.RemoteVoicePositionInfo): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    updateRemotePositionEx(uid: number, posInfo: agorartc.RemoteVoicePositionInfo, connection: agorartc.RtcConnection): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    removeRemotePosition(uid: number): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    removeRemotePositionEx(uid: number, connection: agorartc.RtcConnection): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    clearRemotePositions(): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    clearRemotePositionsEx(connection: agorartc.RtcConnection): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    enumeratePlaybackDevices(): agorartc.IAudioDeviceCollection {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    enumerateRecordingDevices(): agorartc.IAudioDeviceCollection {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    setPlaybackDevice(deviceId: string): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    getPlaybackDevice(deviceId: string): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    getPlaybackDeviceInfo(deviceId: string, deviceName: string): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    setPlaybackDeviceVolume(volume: number): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    getPlaybackDeviceVolume(volume: number): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    setRecordingDevice(deviceId: string): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    getRecordingDevice(deviceId: string): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    getRecordingDeviceInfo(deviceId: string, deviceName: string): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    setRecordingDeviceVolume(volume: number): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    getRecordingDeviceVolume(volume: number): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    setPlaybackDeviceMute(mute: boolean): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    getPlaybackDeviceMute(mute: boolean): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    setRecordingDeviceMute(mute: boolean): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    getRecordingDeviceMute(mute: boolean): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    startPlaybackDeviceTest(testAudioFilePath: string): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    stopPlaybackDeviceTest(): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    startRecordingDeviceTest(indicationInterval: number): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    stopRecordingDeviceTest(): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    startAudioDeviceLoopbackTest(indicationInterval: number): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    stopAudioDeviceLoopbackTest(): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    followSystemPlaybackDevice(enable: boolean): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    followSystemRecordingDevice(enable: boolean): number {
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }


}