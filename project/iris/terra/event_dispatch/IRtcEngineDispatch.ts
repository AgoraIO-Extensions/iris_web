import { CallApiReturnType } from '../../base/call_api_executor';
import { IrisRtcEngine } from '../../engine/IrisRtcEngine';
import { RtcEngineExImpl } from '../../impl/RtcEngineExImpl';
import { RtcEngineImpl } from '../../impl/RtcEngineImpl';
import { Action } from '../../tool/AgoraActionQueue';
import { IRtcEngine } from '../interface/IRtcEngine';
import * as agorartc from '../rtc_types/Index';


export class IRtcEngineDispatch {

    private _impl: IRtcEngine;

    constructor(engine: IrisRtcEngine) {
        this._impl = new RtcEngineImpl(engine);
    }

    //IRtcEngine
    release(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let sync = obj.sync;
        if (sync === undefined) throw "sync is undefined";
        result.result = this._impl.release(sync);
        return 0;
    }

    releaseScreenCaptureSources(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        result.result = this._impl.releaseScreenCaptureSources();
        return 0;
    }

    initialize(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): CallApiReturnType {
        let obj = JSON.parse(params) as any;
        let context = obj.context;
        if (context === undefined) throw "context is undefined";
        // result.result = this._impl.initialize(context);
        // return 0;

        return this._impl.initialize(context);
    }

    setAppType(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): CallApiReturnType {
        let obj = JSON.parse(params) as any;
        let appType = obj.appType;
        if (appType === undefined) throw "appType is undefined";
        // result.result = this._impl.setAppType(appType);
        // return 0;

        return this._impl.setAppType(appType);
    }

    queryInterface(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let iid = obj.iid;
        if (iid === undefined) throw "iid is undefined";
        let inter = obj.inter;
        if (inter === undefined) throw "inter is undefined";
        result.result = this._impl.queryInterface(iid, inter);
        return 0;
    }

    getVersion(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        // let build = obj.build;
        // if (build === undefined) throw "build is undefined";
        result.result = this._impl.getVersion();
        return 0;
    }

    getErrorDescription(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let code = obj.code;
        if (code === undefined) throw "code is undefined";
        result.result = this._impl.getErrorDescription(code);
        return 0;
    }

    joinChannel(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): CallApiReturnType {
        let obj = JSON.parse(params) as any;
        let token = obj.token;
        if (token === undefined) throw "token is undefined";
        let channelId = obj.channelId;
        if (channelId === undefined) throw "channelId is undefined";
        let info = obj.info;
        if (info === undefined) throw "info is undefined";
        let uid = obj.uid;
        if (uid === undefined) throw "uid is undefined";
        // result.result = this._impl.joinChannel(token, channelId, info, uid);
        // return 0;

        return this._impl.joinChannel(token, channelId, info, uid);
    }

    joinChannel2(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): CallApiReturnType {
        let obj = JSON.parse(params) as any;
        let token = obj.token;
        if (token === undefined) throw "token is undefined";
        let channelId = obj.channelId;
        if (channelId === undefined) throw "channelId is undefined";
        let uid = obj.uid;
        if (uid === undefined) throw "uid is undefined";
        let options = obj.options;
        if (options === undefined) throw "options is undefined";
        // result.result = this._impl.joinChannel2(token, channelId, uid, options);
        // return 0;

        return this._impl.joinChannel2(token, channelId, uid, options);
    }

    updateChannelMediaOptions(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let options = obj.options;
        if (options === undefined) throw "options is undefined";
        result.result = this._impl.updateChannelMediaOptions(options);
        return 0;
    }

    leaveChannel(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._impl.leaveChannel();
        return 0;
    }

    leaveChannel2(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let options = obj.options;
        if (options === undefined) throw "options is undefined";
        result.result = this._impl.leaveChannel2(options);
        return 0;
    }

    renewToken(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let token = obj.token;
        if (token === undefined) throw "token is undefined";
        result.result = this._impl.renewToken(token);
        return 0;
    }

    setChannelProfile(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let profile = obj.profile;
        if (profile === undefined) throw "profile is undefined";
        result.result = this._impl.setChannelProfile(profile);
        return 0;
    }

    setClientRole(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): CallApiReturnType {
        let obj = JSON.parse(params) as any;
        let role = obj.role;
        if (role === undefined) throw "role is undefined";
        // result.result = this._impl.setClientRole(role);
        // return 0;

        return this._impl.setClientRole(role);
    }

    setClientRole2(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): CallApiReturnType {
        let obj = JSON.parse(params) as any;
        let role = obj.role;
        if (role === undefined) throw "role is undefined";
        let options = obj.options;
        if (options === undefined) throw "options is undefined";
        // result.result = this._impl.setClientRole2(role, options);
        // return 0;

        return this._impl.setClientRole2(role, options);
    }

    startEchoTest(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._impl.startEchoTest();
        return 0;
    }

    startEchoTest2(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let intervalInSeconds = obj.intervalInSeconds;
        if (intervalInSeconds === undefined) throw "intervalInSeconds is undefined";
        result.result = this._impl.startEchoTest2(intervalInSeconds);
        return 0;
    }

    startEchoTest3(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let config = obj.config;
        if (config === undefined) throw "config is undefined";
        result.result = this._impl.startEchoTest3(config);
        return 0;
    }

    stopEchoTest(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._impl.stopEchoTest();
        return 0;
    }

    enableVideo(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): CallApiReturnType {
        let obj = JSON.parse(params) as any;
        // result.result = this._impl.enableVideo();
        // return 0;

        return this._impl.enableVideo();
    }

    disableVideo(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._impl.disableVideo();
        return 0;
    }

    startPreview(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): CallApiReturnType {
        let obj = JSON.parse(params) as any;
        // result.result = this._impl.startPreview();
        // return 0;

        return this._impl.startPreview();
    }

    startPreview2(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): CallApiReturnType {
        let obj = JSON.parse(params) as any;
        let sourceType = obj.sourceType;
        if (sourceType === undefined) throw "sourceType is undefined";
        // result.result = this._impl.startPreview2(sourceType);
        // return 0;

        return this._impl.startPreview2(sourceType);
    }

    stopPreview(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._impl.stopPreview();
        return 0;
    }

    stopPreview2(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let sourceType = obj.sourceType;
        if (sourceType === undefined) throw "sourceType is undefined";
        result.result = this._impl.stopPreview2(sourceType);
        return 0;
    }

    startLastmileProbeTest(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let config = obj.config;
        if (config === undefined) throw "config is undefined";
        result.result = this._impl.startLastmileProbeTest(config);
        return 0;
    }

    stopLastmileProbeTest(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._impl.stopLastmileProbeTest();
        return 0;
    }

    setVideoEncoderConfiguration(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let config = obj.config;
        if (config === undefined) throw "config is undefined";
        result.result = this._impl.setVideoEncoderConfiguration(config);
        return 0;
    }

    setBeautyEffectOptions(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let enabled = obj.enabled;
        if (enabled === undefined) throw "enabled is undefined";
        let options = obj.options;
        if (options === undefined) throw "options is undefined";
        let type = obj.type;
        if (type === undefined) throw "type is undefined";
        result.result = this._impl.setBeautyEffectOptions(enabled, options, type);
        return 0;
    }

    setLowlightEnhanceOptions(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let enabled = obj.enabled;
        if (enabled === undefined) throw "enabled is undefined";
        let options = obj.options;
        if (options === undefined) throw "options is undefined";
        let type = obj.type;
        if (type === undefined) throw "type is undefined";
        result.result = this._impl.setLowlightEnhanceOptions(enabled, options, type);
        return 0;
    }

    setVideoDenoiserOptions(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let enabled = obj.enabled;
        if (enabled === undefined) throw "enabled is undefined";
        let options = obj.options;
        if (options === undefined) throw "options is undefined";
        let type = obj.type;
        if (type === undefined) throw "type is undefined";
        result.result = this._impl.setVideoDenoiserOptions(enabled, options, type);
        return 0;
    }

    setColorEnhanceOptions(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let enabled = obj.enabled;
        if (enabled === undefined) throw "enabled is undefined";
        let options = obj.options;
        if (options === undefined) throw "options is undefined";
        let type = obj.type;
        if (type === undefined) throw "type is undefined";
        result.result = this._impl.setColorEnhanceOptions(enabled, options, type);
        return 0;
    }

    enableVirtualBackground(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let enabled = obj.enabled;
        if (enabled === undefined) throw "enabled is undefined";
        let backgroundSource = obj.backgroundSource;
        if (backgroundSource === undefined) throw "backgroundSource is undefined";
        result.result = this._impl.enableVirtualBackground(enabled, backgroundSource);
        return 0;
    }

    enableRemoteSuperResolution(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let userId = obj.userId;
        if (userId === undefined) throw "userId is undefined";
        let enable = obj.enable;
        if (enable === undefined) throw "enable is undefined";
        result.result = this._impl.enableRemoteSuperResolution(userId, enable);
        return 0;
    }

    setupRemoteVideo(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let canvas = obj.canvas;
        if (canvas === undefined) throw "canvas is undefined";
        result.result = this._impl.setupRemoteVideo(canvas);
        return 0;
    }

    setupLocalVideo(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): CallApiReturnType {
        let obj = JSON.parse(params) as any;
        let canvas = obj.canvas;
        if (canvas === undefined) throw "canvas is undefined";
        // result.result = this._impl.setupLocalVideo(canvas);
        // return 0;

        return this._impl.setupLocalVideo(canvas);
    }

    enableAudio(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): CallApiReturnType {
        let obj = JSON.parse(params) as any;
        // result.result = this._impl.enableAudio();
        // return 0;

        return this._impl.enableAudio();
    }

    disableAudio(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._impl.disableAudio();
        return 0;
    }

    setAudioProfile(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): CallApiReturnType {
        let obj = JSON.parse(params) as any;
        let profile = obj.profile;
        if (profile === undefined) throw "profile is undefined";
        let scenario = obj.scenario;
        if (scenario === undefined) throw "scenario is undefined";
        // result.result = this._impl.setAudioProfile(profile, scenario);
        // return 0;

        return this._impl.setAudioProfile(profile, scenario);
    }

    setAudioProfile2(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): CallApiReturnType {
        let obj = JSON.parse(params) as any;
        let profile = obj.profile;
        if (profile === undefined) throw "profile is undefined";
        // result.result = this._impl.setAudioProfile2(profile);
        // return 0;

        return this._impl.setAudioProfile2(profile);
    }

    setAudioScenario(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let scenario = obj.scenario;
        if (scenario === undefined) throw "scenario is undefined";
        result.result = this._impl.setAudioScenario(scenario);
        return 0;
    }

    enableLocalAudio(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let enabled = obj.enabled;
        if (enabled === undefined) throw "enabled is undefined";
        result.result = this._impl.enableLocalAudio(enabled);
        return 0;
    }

    muteLocalAudioStream(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let mute = obj.mute;
        if (mute === undefined) throw "mute is undefined";
        result.result = this._impl.muteLocalAudioStream(mute);
        return 0;
    }

    muteAllRemoteAudioStreams(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let mute = obj.mute;
        if (mute === undefined) throw "mute is undefined";
        result.result = this._impl.muteAllRemoteAudioStreams(mute);
        return 0;
    }

    setDefaultMuteAllRemoteAudioStreams(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let mute = obj.mute;
        if (mute === undefined) throw "mute is undefined";
        result.result = this._impl.setDefaultMuteAllRemoteAudioStreams(mute);
        return 0;
    }

    muteRemoteAudioStream(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let uid = obj.uid;
        if (uid === undefined) throw "uid is undefined";
        let mute = obj.mute;
        if (mute === undefined) throw "mute is undefined";
        result.result = this._impl.muteRemoteAudioStream(uid, mute);
        return 0;
    }

    muteLocalVideoStream(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let mute = obj.mute;
        if (mute === undefined) throw "mute is undefined";
        result.result = this._impl.muteLocalVideoStream(mute);
        return 0;
    }

    enableLocalVideo(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let enabled = obj.enabled;
        if (enabled === undefined) throw "enabled is undefined";
        result.result = this._impl.enableLocalVideo(enabled);
        return 0;
    }

    muteAllRemoteVideoStreams(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let mute = obj.mute;
        if (mute === undefined) throw "mute is undefined";
        result.result = this._impl.muteAllRemoteVideoStreams(mute);
        return 0;
    }

    setDefaultMuteAllRemoteVideoStreams(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let mute = obj.mute;
        if (mute === undefined) throw "mute is undefined";
        result.result = this._impl.setDefaultMuteAllRemoteVideoStreams(mute);
        return 0;
    }

    muteRemoteVideoStream(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let uid = obj.uid;
        if (uid === undefined) throw "uid is undefined";
        let mute = obj.mute;
        if (mute === undefined) throw "mute is undefined";
        result.result = this._impl.muteRemoteVideoStream(uid, mute);
        return 0;
    }

    setRemoteVideoStreamType(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let uid = obj.uid;
        if (uid === undefined) throw "uid is undefined";
        let streamType = obj.streamType;
        if (streamType === undefined) throw "streamType is undefined";
        result.result = this._impl.setRemoteVideoStreamType(uid, streamType);
        return 0;
    }

    setRemoteVideoSubscriptionOptions(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let uid = obj.uid;
        if (uid === undefined) throw "uid is undefined";
        let options = obj.options;
        if (options === undefined) throw "options is undefined";
        result.result = this._impl.setRemoteVideoSubscriptionOptions(uid, options);
        return 0;
    }

    setRemoteDefaultVideoStreamType(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let streamType = obj.streamType;
        if (streamType === undefined) throw "streamType is undefined";
        result.result = this._impl.setRemoteDefaultVideoStreamType(streamType);
        return 0;
    }

    setSubscribeAudioBlacklist(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let uidList = obj.uidList;
        if (uidList === undefined) throw "uidList is undefined";
        let uidNumber = obj.uidNumber;
        if (uidNumber === undefined) throw "uidNumber is undefined";
        result.result = this._impl.setSubscribeAudioBlacklist(uidList, uidNumber);
        return 0;
    }

    setSubscribeAudioWhitelist(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let uidList = obj.uidList;
        if (uidList === undefined) throw "uidList is undefined";
        let uidNumber = obj.uidNumber;
        if (uidNumber === undefined) throw "uidNumber is undefined";
        result.result = this._impl.setSubscribeAudioWhitelist(uidList, uidNumber);
        return 0;
    }

    setSubscribeVideoBlacklist(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let uidList = obj.uidList;
        if (uidList === undefined) throw "uidList is undefined";
        let uidNumber = obj.uidNumber;
        if (uidNumber === undefined) throw "uidNumber is undefined";
        result.result = this._impl.setSubscribeVideoBlacklist(uidList, uidNumber);
        return 0;
    }

    setSubscribeVideoWhitelist(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let uidList = obj.uidList;
        if (uidList === undefined) throw "uidList is undefined";
        let uidNumber = obj.uidNumber;
        if (uidNumber === undefined) throw "uidNumber is undefined";
        result.result = this._impl.setSubscribeVideoWhitelist(uidList, uidNumber);
        return 0;
    }

    enableAudioVolumeIndication(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let interval = obj.interval;
        if (interval === undefined) throw "interval is undefined";
        let smooth = obj.smooth;
        if (smooth === undefined) throw "smooth is undefined";
        let reportVad = obj.reportVad;
        if (reportVad === undefined) throw "reportVad is undefined";
        result.result = this._impl.enableAudioVolumeIndication(interval, smooth, reportVad);
        return 0;
    }

    startAudioRecording(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let filePath = obj.filePath;
        if (filePath === undefined) throw "filePath is undefined";
        let quality = obj.quality;
        if (quality === undefined) throw "quality is undefined";
        result.result = this._impl.startAudioRecording(filePath, quality);
        return 0;
    }

    startAudioRecording2(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let filePath = obj.filePath;
        if (filePath === undefined) throw "filePath is undefined";
        let sampleRate = obj.sampleRate;
        if (sampleRate === undefined) throw "sampleRate is undefined";
        let quality = obj.quality;
        if (quality === undefined) throw "quality is undefined";
        result.result = this._impl.startAudioRecording2(filePath, sampleRate, quality);
        return 0;
    }

    startAudioRecording3(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let config = obj.config;
        if (config === undefined) throw "config is undefined";
        result.result = this._impl.startAudioRecording3(config);
        return 0;
    }

    registerAudioEncodedFrameObserver(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let config = obj.config;
        if (config === undefined) throw "config is undefined";
        let observer = obj.observer;
        if (observer === undefined) throw "observer is undefined";
        result.result = this._impl.registerAudioEncodedFrameObserver(config, observer);
        return 0;
    }

    stopAudioRecording(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._impl.stopAudioRecording();
        return 0;
    }

    createMediaPlayer(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._impl.createMediaPlayer();
        return 0;
    }

    destroyMediaPlayer(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let media_player = obj.media_player;
        if (media_player === undefined) throw "media_player is undefined";
        result.result = this._impl.destroyMediaPlayer(media_player);
        return 0;
    }

    startAudioMixing(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let filePath = obj.filePath;
        if (filePath === undefined) throw "filePath is undefined";
        let loopback = obj.loopback;
        if (loopback === undefined) throw "loopback is undefined";
        let replace = obj.replace;
        if (replace === undefined) throw "replace is undefined";
        let cycle = obj.cycle;
        if (cycle === undefined) throw "cycle is undefined";
        result.result = this._impl.startAudioMixing(filePath, loopback, replace, cycle);
        return 0;
    }

    startAudioMixing2(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let filePath = obj.filePath;
        if (filePath === undefined) throw "filePath is undefined";
        let loopback = obj.loopback;
        if (loopback === undefined) throw "loopback is undefined";
        let replace = obj.replace;
        if (replace === undefined) throw "replace is undefined";
        let cycle = obj.cycle;
        if (cycle === undefined) throw "cycle is undefined";
        let startPos = obj.startPos;
        if (startPos === undefined) throw "startPos is undefined";
        result.result = this._impl.startAudioMixing2(filePath, loopback, replace, cycle, startPos);
        return 0;
    }

    stopAudioMixing(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._impl.stopAudioMixing();
        return 0;
    }

    pauseAudioMixing(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._impl.pauseAudioMixing();
        return 0;
    }

    resumeAudioMixing(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._impl.resumeAudioMixing();
        return 0;
    }

    getAudioTrackCount(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._impl.getAudioTrackCount();
        return 0;
    }

    adjustAudioMixingVolume(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let volume = obj.volume;
        if (volume === undefined) throw "volume is undefined";
        result.result = this._impl.adjustAudioMixingVolume(volume);
        return 0;
    }

    adjustAudioMixingPublishVolume(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let volume = obj.volume;
        if (volume === undefined) throw "volume is undefined";
        result.result = this._impl.adjustAudioMixingPublishVolume(volume);
        return 0;
    }

    getAudioMixingPublishVolume(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._impl.getAudioMixingPublishVolume();
        return 0;
    }

    adjustAudioMixingPlayoutVolume(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let volume = obj.volume;
        if (volume === undefined) throw "volume is undefined";
        result.result = this._impl.adjustAudioMixingPlayoutVolume(volume);
        return 0;
    }

    getAudioMixingPlayoutVolume(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._impl.getAudioMixingPlayoutVolume();
        return 0;
    }

    getAudioMixingDuration(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._impl.getAudioMixingDuration();
        return 0;
    }

    getAudioMixingCurrentPosition(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._impl.getAudioMixingCurrentPosition();
        return 0;
    }

    setAudioMixingPosition(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let pos = obj.pos;
        if (pos === undefined) throw "pos is undefined";
        result.result = this._impl.setAudioMixingPosition(pos);
        return 0;
    }

    setAudioMixingDualMonoMode(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let mode = obj.mode;
        if (mode === undefined) throw "mode is undefined";
        result.result = this._impl.setAudioMixingDualMonoMode(mode);
        return 0;
    }

    setAudioMixingPitch(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let pitch = obj.pitch;
        if (pitch === undefined) throw "pitch is undefined";
        result.result = this._impl.setAudioMixingPitch(pitch);
        return 0;
    }

    getEffectsVolume(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._impl.getEffectsVolume();
        return 0;
    }

    setEffectsVolume(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let volume = obj.volume;
        if (volume === undefined) throw "volume is undefined";
        result.result = this._impl.setEffectsVolume(volume);
        return 0;
    }

    preloadEffect(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let soundId = obj.soundId;
        if (soundId === undefined) throw "soundId is undefined";
        let filePath = obj.filePath;
        if (filePath === undefined) throw "filePath is undefined";
        let startPos = obj.startPos;
        if (startPos === undefined) throw "startPos is undefined";
        result.result = this._impl.preloadEffect(soundId, filePath, startPos);
        return 0;
    }

    playEffect(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let soundId = obj.soundId;
        if (soundId === undefined) throw "soundId is undefined";
        let filePath = obj.filePath;
        if (filePath === undefined) throw "filePath is undefined";
        let loopCount = obj.loopCount;
        if (loopCount === undefined) throw "loopCount is undefined";
        let pitch = obj.pitch;
        if (pitch === undefined) throw "pitch is undefined";
        let pan = obj.pan;
        if (pan === undefined) throw "pan is undefined";
        let gain = obj.gain;
        if (gain === undefined) throw "gain is undefined";
        let publish = obj.publish;
        if (publish === undefined) throw "publish is undefined";
        let startPos = obj.startPos;
        if (startPos === undefined) throw "startPos is undefined";
        result.result = this._impl.playEffect(soundId, filePath, loopCount, pitch, pan, gain, publish, startPos);
        return 0;
    }

    playAllEffects(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let loopCount = obj.loopCount;
        if (loopCount === undefined) throw "loopCount is undefined";
        let pitch = obj.pitch;
        if (pitch === undefined) throw "pitch is undefined";
        let pan = obj.pan;
        if (pan === undefined) throw "pan is undefined";
        let gain = obj.gain;
        if (gain === undefined) throw "gain is undefined";
        let publish = obj.publish;
        if (publish === undefined) throw "publish is undefined";
        result.result = this._impl.playAllEffects(loopCount, pitch, pan, gain, publish);
        return 0;
    }

    getVolumeOfEffect(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let soundId = obj.soundId;
        if (soundId === undefined) throw "soundId is undefined";
        result.result = this._impl.getVolumeOfEffect(soundId);
        return 0;
    }

    setVolumeOfEffect(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let soundId = obj.soundId;
        if (soundId === undefined) throw "soundId is undefined";
        let volume = obj.volume;
        if (volume === undefined) throw "volume is undefined";
        result.result = this._impl.setVolumeOfEffect(soundId, volume);
        return 0;
    }

    pauseEffect(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let soundId = obj.soundId;
        if (soundId === undefined) throw "soundId is undefined";
        result.result = this._impl.pauseEffect(soundId);
        return 0;
    }

    pauseAllEffects(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._impl.pauseAllEffects();
        return 0;
    }

    resumeEffect(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let soundId = obj.soundId;
        if (soundId === undefined) throw "soundId is undefined";
        result.result = this._impl.resumeEffect(soundId);
        return 0;
    }

    resumeAllEffects(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._impl.resumeAllEffects();
        return 0;
    }

    stopEffect(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let soundId = obj.soundId;
        if (soundId === undefined) throw "soundId is undefined";
        result.result = this._impl.stopEffect(soundId);
        return 0;
    }

    stopAllEffects(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._impl.stopAllEffects();
        return 0;
    }

    unloadEffect(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let soundId = obj.soundId;
        if (soundId === undefined) throw "soundId is undefined";
        result.result = this._impl.unloadEffect(soundId);
        return 0;
    }

    unloadAllEffects(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._impl.unloadAllEffects();
        return 0;
    }

    getEffectDuration(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let filePath = obj.filePath;
        if (filePath === undefined) throw "filePath is undefined";
        result.result = this._impl.getEffectDuration(filePath);
        return 0;
    }

    setEffectPosition(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let soundId = obj.soundId;
        if (soundId === undefined) throw "soundId is undefined";
        let pos = obj.pos;
        if (pos === undefined) throw "pos is undefined";
        result.result = this._impl.setEffectPosition(soundId, pos);
        return 0;
    }

    getEffectCurrentPosition(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let soundId = obj.soundId;
        if (soundId === undefined) throw "soundId is undefined";
        result.result = this._impl.getEffectCurrentPosition(soundId);
        return 0;
    }

    enableSoundPositionIndication(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let enabled = obj.enabled;
        if (enabled === undefined) throw "enabled is undefined";
        result.result = this._impl.enableSoundPositionIndication(enabled);
        return 0;
    }

    setRemoteVoicePosition(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let uid = obj.uid;
        if (uid === undefined) throw "uid is undefined";
        let pan = obj.pan;
        if (pan === undefined) throw "pan is undefined";
        let gain = obj.gain;
        if (gain === undefined) throw "gain is undefined";
        result.result = this._impl.setRemoteVoicePosition(uid, pan, gain);
        return 0;
    }

    enableSpatialAudio(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let enabled = obj.enabled;
        if (enabled === undefined) throw "enabled is undefined";
        result.result = this._impl.enableSpatialAudio(enabled);
        return 0;
    }

    setRemoteUserSpatialAudioParams(
        params1: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params1) as any;
        let uid = obj.uid;
        if (uid === undefined) throw "uid is undefined";
        let params = obj.params;
        if (params === undefined) throw "params is undefined";
        result.result = this._impl.setRemoteUserSpatialAudioParams(uid, params);
        return 0;
    }

    setVoiceBeautifierPreset(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let preset = obj.preset;
        if (preset === undefined) throw "preset is undefined";
        result.result = this._impl.setVoiceBeautifierPreset(preset);
        return 0;
    }

    setAudioEffectPreset(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let preset = obj.preset;
        if (preset === undefined) throw "preset is undefined";
        result.result = this._impl.setAudioEffectPreset(preset);
        return 0;
    }

    setVoiceConversionPreset(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let preset = obj.preset;
        if (preset === undefined) throw "preset is undefined";
        result.result = this._impl.setVoiceConversionPreset(preset);
        return 0;
    }

    setAudioEffectParameters(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let preset = obj.preset;
        if (preset === undefined) throw "preset is undefined";
        let param1 = obj.param1;
        if (param1 === undefined) throw "param1 is undefined";
        let param2 = obj.param2;
        if (param2 === undefined) throw "param2 is undefined";
        result.result = this._impl.setAudioEffectParameters(preset, param1, param2);
        return 0;
    }

    setVoiceBeautifierParameters(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let preset = obj.preset;
        if (preset === undefined) throw "preset is undefined";
        let param1 = obj.param1;
        if (param1 === undefined) throw "param1 is undefined";
        let param2 = obj.param2;
        if (param2 === undefined) throw "param2 is undefined";
        result.result = this._impl.setVoiceBeautifierParameters(preset, param1, param2);
        return 0;
    }

    setVoiceConversionParameters(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let preset = obj.preset;
        if (preset === undefined) throw "preset is undefined";
        let param1 = obj.param1;
        if (param1 === undefined) throw "param1 is undefined";
        let param2 = obj.param2;
        if (param2 === undefined) throw "param2 is undefined";
        result.result = this._impl.setVoiceConversionParameters(preset, param1, param2);
        return 0;
    }

    setLocalVoicePitch(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let pitch = obj.pitch;
        if (pitch === undefined) throw "pitch is undefined";
        result.result = this._impl.setLocalVoicePitch(pitch);
        return 0;
    }

    setLocalVoiceEqualization(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let bandFrequency = obj.bandFrequency;
        if (bandFrequency === undefined) throw "bandFrequency is undefined";
        let bandGain = obj.bandGain;
        if (bandGain === undefined) throw "bandGain is undefined";
        result.result = this._impl.setLocalVoiceEqualization(bandFrequency, bandGain);
        return 0;
    }

    setLocalVoiceReverb(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let reverbKey = obj.reverbKey;
        if (reverbKey === undefined) throw "reverbKey is undefined";
        let value = obj.value;
        if (value === undefined) throw "value is undefined";
        result.result = this._impl.setLocalVoiceReverb(reverbKey, value);
        return 0;
    }

    setLogFile(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let filePath = obj.filePath;
        if (filePath === undefined) throw "filePath is undefined";
        result.result = this._impl.setLogFile(filePath);
        return 0;
    }

    setLogFilter(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let filter = obj.filter;
        if (filter === undefined) throw "filter is undefined";
        result.result = this._impl.setLogFilter(filter);
        return 0;
    }

    setLogLevel(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let level = obj.level;
        if (level === undefined) throw "level is undefined";
        result.result = this._impl.setLogLevel(level);
        return 0;
    }

    setLogFileSize(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let fileSizeInKBytes = obj.fileSizeInKBytes;
        if (fileSizeInKBytes === undefined) throw "fileSizeInKBytes is undefined";
        result.result = this._impl.setLogFileSize(fileSizeInKBytes);
        return 0;
    }

    uploadLogFile(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        result.result = this._impl.uploadLogFile(result);
        return 0;
    }

    setLocalRenderMode(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let renderMode = obj.renderMode;
        if (renderMode === undefined) throw "renderMode is undefined";
        let mirrorMode = obj.mirrorMode;
        if (mirrorMode === undefined) throw "mirrorMode is undefined";
        result.result = this._impl.setLocalRenderMode(renderMode, mirrorMode);
        return 0;
    }

    setRemoteRenderMode(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let uid = obj.uid;
        if (uid === undefined) throw "uid is undefined";
        let renderMode = obj.renderMode;
        if (renderMode === undefined) throw "renderMode is undefined";
        let mirrorMode = obj.mirrorMode;
        if (mirrorMode === undefined) throw "mirrorMode is undefined";
        result.result = this._impl.setRemoteRenderMode(uid, renderMode, mirrorMode);
        return 0;
    }

    setLocalRenderMode2(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let renderMode = obj.renderMode;
        if (renderMode === undefined) throw "renderMode is undefined";
        result.result = this._impl.setLocalRenderMode2(renderMode);
        return 0;
    }

    setLocalVideoMirrorMode(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let mirrorMode = obj.mirrorMode;
        if (mirrorMode === undefined) throw "mirrorMode is undefined";
        result.result = this._impl.setLocalVideoMirrorMode(mirrorMode);
        return 0;
    }

    enableDualStreamMode(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let enabled = obj.enabled;
        if (enabled === undefined) throw "enabled is undefined";
        result.result = this._impl.enableDualStreamMode(enabled);
        return 0;
    }

    enableDualStreamMode2(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let sourceType = obj.sourceType;
        if (sourceType === undefined) throw "sourceType is undefined";
        let enabled = obj.enabled;
        if (enabled === undefined) throw "enabled is undefined";
        result.result = this._impl.enableDualStreamMode2(sourceType, enabled);
        return 0;
    }

    enableDualStreamMode3(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let sourceType = obj.sourceType;
        if (sourceType === undefined) throw "sourceType is undefined";
        let enabled = obj.enabled;
        if (enabled === undefined) throw "enabled is undefined";
        let streamConfig = obj.streamConfig;
        if (streamConfig === undefined) throw "streamConfig is undefined";
        result.result = this._impl.enableDualStreamMode3(sourceType, enabled, streamConfig);
        return 0;
    }

    setDualStreamMode(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let mode = obj.mode;
        if (mode === undefined) throw "mode is undefined";
        result.result = this._impl.setDualStreamMode(mode);
        return 0;
    }

    setDualStreamMode2(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let sourceType = obj.sourceType;
        if (sourceType === undefined) throw "sourceType is undefined";
        let mode = obj.mode;
        if (mode === undefined) throw "mode is undefined";
        result.result = this._impl.setDualStreamMode2(sourceType, mode);
        return 0;
    }

    setDualStreamMode3(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let sourceType = obj.sourceType;
        if (sourceType === undefined) throw "sourceType is undefined";
        let mode = obj.mode;
        if (mode === undefined) throw "mode is undefined";
        let streamConfig = obj.streamConfig;
        if (streamConfig === undefined) throw "streamConfig is undefined";
        result.result = this._impl.setDualStreamMode3(sourceType, mode, streamConfig);
        return 0;
    }

    enableEchoCancellationExternal(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let enabled = obj.enabled;
        if (enabled === undefined) throw "enabled is undefined";
        let audioSourceDelay = obj.audioSourceDelay;
        if (audioSourceDelay === undefined) throw "audioSourceDelay is undefined";
        result.result = this._impl.enableEchoCancellationExternal(enabled, audioSourceDelay);
        return 0;
    }

    enableCustomAudioLocalPlayback(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let sourceId = obj.sourceId;
        if (sourceId === undefined) throw "sourceId is undefined";
        let enabled = obj.enabled;
        if (enabled === undefined) throw "enabled is undefined";
        result.result = this._impl.enableCustomAudioLocalPlayback(sourceId, enabled);
        return 0;
    }

    //mediaPlay的东西
    // enableCustomAudioLocalPlayback(
    // 	params: string, paramLength: number,
    // 	buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
    // 	let obj = JSON.parse(params) as any;
    // 	let sourceId = obj.sourceId;
    // 	if (sourceId === undefined) throw "sourceId is undefined";
    // 	let enabled = obj.enabled;
    // 	if (enabled === undefined) throw "enabled is undefined";
    // 	result.result = this._rtcEngine.enableCustomAudioLocalPlayback(sourceId, enabled);
    // 	return 0;
    // }

    startPrimaryCustomAudioTrack(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let config = obj.config;
        if (config === undefined) throw "config is undefined";
        result.result = this._impl.startPrimaryCustomAudioTrack(config);
        return 0;
    }

    stopPrimaryCustomAudioTrack(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._impl.stopPrimaryCustomAudioTrack();
        return 0;
    }

    startSecondaryCustomAudioTrack(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let config = obj.config;
        if (config === undefined) throw "config is undefined";
        result.result = this._impl.startSecondaryCustomAudioTrack(config);
        return 0;
    }

    stopSecondaryCustomAudioTrack(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._impl.stopSecondaryCustomAudioTrack();
        return 0;
    }

    setRecordingAudioFrameParameters(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let sampleRate = obj.sampleRate;
        if (sampleRate === undefined) throw "sampleRate is undefined";
        let channel = obj.channel;
        if (channel === undefined) throw "channel is undefined";
        let mode = obj.mode;
        if (mode === undefined) throw "mode is undefined";
        let samplesPerCall = obj.samplesPerCall;
        if (samplesPerCall === undefined) throw "samplesPerCall is undefined";
        result.result = this._impl.setRecordingAudioFrameParameters(sampleRate, channel, mode, samplesPerCall);
        return 0;
    }

    setPlaybackAudioFrameParameters(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let sampleRate = obj.sampleRate;
        if (sampleRate === undefined) throw "sampleRate is undefined";
        let channel = obj.channel;
        if (channel === undefined) throw "channel is undefined";
        let mode = obj.mode;
        if (mode === undefined) throw "mode is undefined";
        let samplesPerCall = obj.samplesPerCall;
        if (samplesPerCall === undefined) throw "samplesPerCall is undefined";
        result.result = this._impl.setPlaybackAudioFrameParameters(sampleRate, channel, mode, samplesPerCall);
        return 0;
    }

    setMixedAudioFrameParameters(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let sampleRate = obj.sampleRate;
        if (sampleRate === undefined) throw "sampleRate is undefined";
        let channel = obj.channel;
        if (channel === undefined) throw "channel is undefined";
        let samplesPerCall = obj.samplesPerCall;
        if (samplesPerCall === undefined) throw "samplesPerCall is undefined";
        result.result = this._impl.setMixedAudioFrameParameters(sampleRate, channel, samplesPerCall);
        return 0;
    }

    setPlaybackAudioFrameBeforeMixingParameters(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let sampleRate = obj.sampleRate;
        if (sampleRate === undefined) throw "sampleRate is undefined";
        let channel = obj.channel;
        if (channel === undefined) throw "channel is undefined";
        result.result = this._impl.setPlaybackAudioFrameBeforeMixingParameters(sampleRate, channel);
        return 0;
    }

    enableAudioSpectrumMonitor(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let intervalInMS = obj.intervalInMS;
        if (intervalInMS === undefined) throw "intervalInMS is undefined";
        result.result = this._impl.enableAudioSpectrumMonitor(intervalInMS);
        return 0;
    }

    disableAudioSpectrumMonitor(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._impl.disableAudioSpectrumMonitor();
        return 0;
    }

    registerAudioSpectrumObserver(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let observer = obj.observer;
        if (observer === undefined) throw "observer is undefined";
        result.result = this._impl.registerAudioSpectrumObserver(observer);
        return 0;
    }

    unregisterAudioSpectrumObserver(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let observer = obj.observer;
        if (observer === undefined) throw "observer is undefined";
        result.result = this._impl.unregisterAudioSpectrumObserver(observer);
        return 0;
    }

    adjustRecordingSignalVolume(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let volume = obj.volume;
        if (volume === undefined) throw "volume is undefined";
        result.result = this._impl.adjustRecordingSignalVolume(volume);
        return 0;
    }

    muteRecordingSignal(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let mute = obj.mute;
        if (mute === undefined) throw "mute is undefined";
        result.result = this._impl.muteRecordingSignal(mute);
        return 0;
    }

    adjustPlaybackSignalVolume(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let volume = obj.volume;
        if (volume === undefined) throw "volume is undefined";
        result.result = this._impl.adjustPlaybackSignalVolume(volume);
        return 0;
    }

    adjustUserPlaybackSignalVolume(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let uid = obj.uid;
        if (uid === undefined) throw "uid is undefined";
        let volume = obj.volume;
        if (volume === undefined) throw "volume is undefined";
        result.result = this._impl.adjustUserPlaybackSignalVolume(uid, volume);
        return 0;
    }

    setLocalPublishFallbackOption(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let option = obj.option;
        if (option === undefined) throw "option is undefined";
        result.result = this._impl.setLocalPublishFallbackOption(option);
        return 0;
    }

    setRemoteSubscribeFallbackOption(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let option = obj.option;
        if (option === undefined) throw "option is undefined";
        result.result = this._impl.setRemoteSubscribeFallbackOption(option);
        return 0;
    }

    enableLoopbackRecording(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let enabled = obj.enabled;
        if (enabled === undefined) throw "enabled is undefined";
        let deviceName = obj.deviceName;
        if (deviceName === undefined) throw "deviceName is undefined";
        result.result = this._impl.enableLoopbackRecording(enabled, deviceName);
        return 0;
    }

    adjustLoopbackRecordingVolume(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let volume = obj.volume;
        if (volume === undefined) throw "volume is undefined";
        result.result = this._impl.adjustLoopbackRecordingVolume(volume);
        return 0;
    }

    getLoopbackRecordingVolume(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._impl.getLoopbackRecordingVolume();
        return 0;
    }

    enableInEarMonitoring(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let enabled = obj.enabled;
        if (enabled === undefined) throw "enabled is undefined";
        let includeAudioFilters = obj.includeAudioFilters;
        if (includeAudioFilters === undefined) throw "includeAudioFilters is undefined";
        result.result = this._impl.enableInEarMonitoring(enabled, includeAudioFilters);
        return 0;
    }

    setInEarMonitoringVolume(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let volume = obj.volume;
        if (volume === undefined) throw "volume is undefined";
        result.result = this._impl.setInEarMonitoringVolume(volume);
        return 0;
    }

    loadExtensionProvider(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let path = obj.path;
        if (path === undefined) throw "path is undefined";
        result.result = this._impl.loadExtensionProvider(path);
        return 0;
    }

    setExtensionProviderProperty(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let provider = obj.provider;
        if (provider === undefined) throw "provider is undefined";
        let key = obj.key;
        if (key === undefined) throw "key is undefined";
        let value = obj.value;
        if (value === undefined) throw "value is undefined";
        result.result = this._impl.setExtensionProviderProperty(provider, key, value);
        return 0;
    }

    enableExtension(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let provider = obj.provider;
        if (provider === undefined) throw "provider is undefined";
        let extension = obj.extension;
        if (extension === undefined) throw "extension is undefined";
        let enable = obj.enable;
        if (enable === undefined) throw "enable is undefined";
        let type = obj.type;
        if (type === undefined) throw "type is undefined";
        result.result = this._impl.enableExtension(provider, extension, enable, type);
        return 0;
    }

    setExtensionProperty(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let provider = obj.provider;
        if (provider === undefined) throw "provider is undefined";
        let extension = obj.extension;
        if (extension === undefined) throw "extension is undefined";
        let key = obj.key;
        if (key === undefined) throw "key is undefined";
        let value = obj.value;
        if (value === undefined) throw "value is undefined";
        let type = obj.type;
        if (type === undefined) throw "type is undefined";
        result.result = this._impl.setExtensionProperty(provider, extension, key, value, type);
        return 0;
    }

    getExtensionProperty(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let provider = obj.provider;
        if (provider === undefined) throw "provider is undefined";
        let extension = obj.extension;
        if (extension === undefined) throw "extension is undefined";
        let key = obj.key;
        if (key === undefined) throw "key is undefined";
        let value = "";
        let buf_len = obj.buf_len;
        if (buf_len === undefined) throw "buf_len is undefined";
        let type = obj.type;
        if (type === undefined) throw "type is undefined";
        result.result = this._impl.getExtensionProperty(provider, extension, key, value, buf_len, type);
        return 0;
    }

    setCameraCapturerConfiguration(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let config = obj.config;
        if (config === undefined) throw "config is undefined";
        result.result = this._impl.setCameraCapturerConfiguration(config);
        return 0;
    }

    createCustomVideoTrack(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._impl.createCustomVideoTrack();
        return 0;
    }

    createCustomEncodedVideoTrack(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let sender_option = obj.sender_option;
        if (sender_option === undefined) throw "sender_option is undefined";
        result.result = this._impl.createCustomEncodedVideoTrack(sender_option);
        return 0;
    }

    destroyCustomVideoTrack(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let video_track_id = obj.video_track_id;
        if (video_track_id === undefined) throw "video_track_id is undefined";
        result.result = this._impl.destroyCustomVideoTrack(video_track_id);
        return 0;
    }

    destroyCustomEncodedVideoTrack(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let video_track_id = obj.video_track_id;
        if (video_track_id === undefined) throw "video_track_id is undefined";
        result.result = this._impl.destroyCustomEncodedVideoTrack(video_track_id);
        return 0;
    }

    switchCamera(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._impl.switchCamera();
        return 0;
    }

    isCameraZoomSupported(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._impl.isCameraZoomSupported();
        return 0;
    }

    isCameraFaceDetectSupported(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._impl.isCameraFaceDetectSupported();
        return 0;
    }

    isCameraTorchSupported(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._impl.isCameraTorchSupported();
        return 0;
    }

    isCameraFocusSupported(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._impl.isCameraFocusSupported();
        return 0;
    }

    isCameraAutoFocusFaceModeSupported(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._impl.isCameraAutoFocusFaceModeSupported();
        return 0;
    }

    setCameraZoomFactor(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let factor = obj.factor;
        if (factor === undefined) throw "factor is undefined";
        result.result = this._impl.setCameraZoomFactor(factor);
        return 0;
    }

    enableFaceDetection(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let enabled = obj.enabled;
        if (enabled === undefined) throw "enabled is undefined";
        result.result = this._impl.enableFaceDetection(enabled);
        return 0;
    }

    getCameraMaxZoomFactor(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._impl.getCameraMaxZoomFactor();
        return 0;
    }

    setCameraFocusPositionInPreview(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let positionX = obj.positionX;
        if (positionX === undefined) throw "positionX is undefined";
        let positionY = obj.positionY;
        if (positionY === undefined) throw "positionY is undefined";
        result.result = this._impl.setCameraFocusPositionInPreview(positionX, positionY);
        return 0;
    }

    setCameraTorchOn(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let isOn = obj.isOn;
        if (isOn === undefined) throw "isOn is undefined";
        result.result = this._impl.setCameraTorchOn(isOn);
        return 0;
    }

    setCameraAutoFocusFaceModeEnabled(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let enabled = obj.enabled;
        if (enabled === undefined) throw "enabled is undefined";
        result.result = this._impl.setCameraAutoFocusFaceModeEnabled(enabled);
        return 0;
    }

    isCameraExposurePositionSupported(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._impl.isCameraExposurePositionSupported();
        return 0;
    }

    setCameraExposurePosition(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let positionXinView = obj.positionXinView;
        if (positionXinView === undefined) throw "positionXinView is undefined";
        let positionYinView = obj.positionYinView;
        if (positionYinView === undefined) throw "positionYinView is undefined";
        result.result = this._impl.setCameraExposurePosition(positionXinView, positionYinView);
        return 0;
    }

    isCameraAutoExposureFaceModeSupported(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._impl.isCameraAutoExposureFaceModeSupported();
        return 0;
    }

    setCameraAutoExposureFaceModeEnabled(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let enabled = obj.enabled;
        if (enabled === undefined) throw "enabled is undefined";
        result.result = this._impl.setCameraAutoExposureFaceModeEnabled(enabled);
        return 0;
    }

    setDefaultAudioRouteToSpeakerphone(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let defaultToSpeaker = obj.defaultToSpeaker;
        if (defaultToSpeaker === undefined) throw "defaultToSpeaker is undefined";
        result.result = this._impl.setDefaultAudioRouteToSpeakerphone(defaultToSpeaker);
        return 0;
    }

    setEnableSpeakerphone(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let speakerOn = obj.speakerOn;
        if (speakerOn === undefined) throw "speakerOn is undefined";
        result.result = this._impl.setEnableSpeakerphone(speakerOn);
        return 0;
    }

    isSpeakerphoneEnabled(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._impl.isSpeakerphoneEnabled();
        return 0;
    }

    getScreenCaptureSources(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let thumbSize = obj.thumbSize;
        if (thumbSize === undefined) throw "thumbSize is undefined";
        let iconSize = obj.iconSize;
        if (iconSize === undefined) throw "iconSize is undefined";
        let includeScreen = obj.includeScreen;
        if (includeScreen === undefined) throw "includeScreen is undefined";
        result.result = this._impl.getScreenCaptureSources(thumbSize, iconSize, includeScreen);
        return 0;
    }

    setAudioSessionOperationRestriction(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let restriction = obj.restriction;
        if (restriction === undefined) throw "restriction is undefined";
        result.result = this._impl.setAudioSessionOperationRestriction(restriction);
        return 0;
    }

    startScreenCaptureByDisplayId(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let displayId = obj.displayId;
        if (displayId === undefined) throw "displayId is undefined";
        let regionRect = obj.regionRect;
        if (regionRect === undefined) throw "regionRect is undefined";
        let captureParams = obj.captureParams;
        if (captureParams === undefined) throw "captureParams is undefined";
        result.result = this._impl.startScreenCaptureByDisplayId(displayId, regionRect, captureParams);
        return 0;
    }

    startScreenCaptureByScreenRect(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let screenRect = obj.screenRect;
        if (screenRect === undefined) throw "screenRect is undefined";
        let regionRect = obj.regionRect;
        if (regionRect === undefined) throw "regionRect is undefined";
        let captureParams = obj.captureParams;
        if (captureParams === undefined) throw "captureParams is undefined";
        result.result = this._impl.startScreenCaptureByScreenRect(screenRect, regionRect, captureParams);
        return 0;
    }

    getAudioDeviceInfo(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let deviceInfo: agorartc.DeviceInfo = { deviceId: "", deviceName: "" }
        result.result = this._impl.getAudioDeviceInfo(deviceInfo);
        result.deviceInfo = deviceInfo;
        return 0;
    }

    startScreenCaptureByWindowId(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let windowId = obj.windowId;
        if (windowId === undefined) throw "windowId is undefined";
        let regionRect = obj.regionRect;
        if (regionRect === undefined) throw "regionRect is undefined";
        let captureParams = obj.captureParams;
        if (captureParams === undefined) throw "captureParams is undefined";
        result.result = this._impl.startScreenCaptureByWindowId(windowId, regionRect, captureParams);
        return 0;
    }

    setScreenCaptureContentHint(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let contentHint = obj.contentHint;
        if (contentHint === undefined) throw "contentHint is undefined";
        result.result = this._impl.setScreenCaptureContentHint(contentHint);
        return 0;
    }

    setScreenCaptureScenario(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let screenScenario = obj.screenScenario;
        if (screenScenario === undefined) throw "screenScenario is undefined";
        result.result = this._impl.setScreenCaptureScenario(screenScenario);
        return 0;
    }

    updateScreenCaptureRegion(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let regionRect = obj.regionRect;
        if (regionRect === undefined) throw "regionRect is undefined";
        result.result = this._impl.updateScreenCaptureRegion(regionRect);
        return 0;
    }

    updateScreenCaptureParameters(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let captureParams = obj.captureParams;
        if (captureParams === undefined) throw "captureParams is undefined";
        result.result = this._impl.updateScreenCaptureParameters(captureParams);
        return 0;
    }

    startScreenCapture(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let mediaProjectionPermissionResultData = obj.mediaProjectionPermissionResultData;
        if (mediaProjectionPermissionResultData === undefined) throw "mediaProjectionPermissionResultData is undfined";
        let captureParams = obj.captureParams;
        if (captureParams === undefined) throw "captureParams is undefined";
        result.result = this._impl.startScreenCapture(mediaProjectionPermissionResultData, captureParams);
        return 0;
    }

    updateScreenCapture(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let captureParams = obj.captureParams;
        if (captureParams === undefined) throw "captureParams is undefined";
        result.result = this._impl.updateScreenCapture(captureParams);
        return 0;
    }

    stopScreenCapture(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._impl.stopScreenCapture();
        return 0;
    }

    getCallId(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._impl.getCallId(result);
        return 0;
    }

    rate(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let callId = obj.callId;
        if (callId === undefined) throw "callId is undefined";
        let rating = obj.rating;
        if (rating === undefined) throw "rating is undefined";
        let description = obj.description;
        if (description === undefined) throw "description is undefined";
        result.result = this._impl.rate(callId, rating, description);
        return 0;
    }

    complain(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let callId = obj.callId;
        if (callId === undefined) throw "callId is undefined";
        let description = obj.description;
        if (description === undefined) throw "description is undefined";
        result.result = this._impl.complain(callId, description);
        return 0;
    }

    startRtmpStreamWithoutTranscoding(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let url = obj.url;
        if (url === undefined) throw "url is undefined";
        result.result = this._impl.startRtmpStreamWithoutTranscoding(url);
        return 0;
    }

    startRtmpStreamWithTranscoding(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let url = obj.url;
        if (url === undefined) throw "url is undefined";
        let transcoding = obj.transcoding;
        if (transcoding === undefined) throw "transcoding is undefined";
        result.result = this._impl.startRtmpStreamWithTranscoding(url, transcoding);
        return 0;
    }

    updateRtmpTranscoding(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let transcoding = obj.transcoding;
        if (transcoding === undefined) throw "transcoding is undefined";
        result.result = this._impl.updateRtmpTranscoding(transcoding);
        return 0;
    }

    stopRtmpStream(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let url = obj.url;
        if (url === undefined) throw "url is undefined";
        result.result = this._impl.stopRtmpStream(url);
        return 0;
    }

    startLocalVideoTranscoder(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let config = obj.config;
        if (config === undefined) throw "config is undefined";
        result.result = this._impl.startLocalVideoTranscoder(config);
        return 0;
    }

    updateLocalTranscoderConfiguration(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let config = obj.config;
        if (config === undefined) throw "config is undefined";
        result.result = this._impl.updateLocalTranscoderConfiguration(config);
        return 0;
    }

    stopLocalVideoTranscoder(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._impl.stopLocalVideoTranscoder();
        return 0;
    }

    startPrimaryCameraCapture(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let config = obj.config;
        if (config === undefined) throw "config is undefined";
        result.result = this._impl.startPrimaryCameraCapture(config);
        return 0;
    }

    startSecondaryCameraCapture(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let config = obj.config;
        if (config === undefined) throw "config is undefined";
        result.result = this._impl.startSecondaryCameraCapture(config);
        return 0;
    }

    stopPrimaryCameraCapture(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._impl.stopPrimaryCameraCapture();
        return 0;
    }

    stopSecondaryCameraCapture(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._impl.stopSecondaryCameraCapture();
        return 0;
    }

    setCameraDeviceOrientation(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let type = obj.type;
        if (type === undefined) throw "type is undefined";
        let orientation = obj.orientation;
        if (orientation === undefined) throw "orientation is undefined";
        result.result = this._impl.setCameraDeviceOrientation(type, orientation);
        return 0;
    }

    setScreenCaptureOrientation(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let type = obj.type;
        if (type === undefined) throw "type is undefined";
        let orientation = obj.orientation;
        if (orientation === undefined) throw "orientation is undefined";
        result.result = this._impl.setScreenCaptureOrientation(type, orientation);
        return 0;
    }

    startPrimaryScreenCapture(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let config = obj.config;
        if (config === undefined) throw "config is undefined";
        result.result = this._impl.startPrimaryScreenCapture(config);
        return 0;
    }

    startSecondaryScreenCapture(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let config = obj.config;
        if (config === undefined) throw "config is undefined";
        result.result = this._impl.startSecondaryScreenCapture(config);
        return 0;
    }

    stopPrimaryScreenCapture(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._impl.stopPrimaryScreenCapture();
        return 0;
    }

    stopSecondaryScreenCapture(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._impl.stopSecondaryScreenCapture();
        return 0;
    }

    getConnectionState(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._impl.getConnectionState();
        return 0;
    }

    // registerEventHandler(
    // 	params: string, paramLength: number,
    // 	buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
    // 	let obj = JSON.parse(params) as any;
    // 	let eventHandler = obj.eventHandler;
    // 	if (eventHandler === undefined) throw "eventHandler is undefined";
    // 	result.result = this._rtcEngine.registerEventHandler(eventHandler);
    // 	return 0;
    // }

    // unregisterEventHandler(
    // 	params: string, paramLength: number,
    // 	buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
    // 	let obj = JSON.parse(params) as any;
    // 	let eventHandler = obj.eventHandler;
    // 	if (eventHandler === undefined) throw "eventHandler is undefined";
    // 	result.result = this._rtcEngine.unregisterEventHandler(eventHandler);
    // 	return 0;
    // }

    setRemoteUserPriority(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let uid = obj.uid;
        if (uid === undefined) throw "uid is undefined";
        let userPriority = obj.userPriority;
        if (userPriority === undefined) throw "userPriority is undefined";
        result.result = this._impl.setRemoteUserPriority(uid, userPriority);
        return 0;
    }

    registerPacketObserver(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let observer = obj.observer;
        if (observer === undefined) throw "observer is undefined";
        result.result = this._impl.registerPacketObserver(observer);
        return 0;
    }

    setEncryptionMode(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let encryptionMode = obj.encryptionMode;
        if (encryptionMode === undefined) throw "encryptionMode is undefined";
        result.result = this._impl.setEncryptionMode(encryptionMode);
        return 0;
    }

    setEncryptionSecret(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let secret = obj.secret;
        if (secret === undefined) throw "secret is undefined";
        result.result = this._impl.setEncryptionSecret(secret);
        return 0;
    }

    enableEncryption(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let enabled = obj.enabled;
        if (enabled === undefined) throw "enabled is undefined";
        let config = obj.config;
        if (config === undefined) throw "config is undefined";
        result.result = this._impl.enableEncryption(enabled, config);
        return 0;
    }

    createDataStream(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let streamId = obj.streamId;
        if (streamId === undefined) throw "streamId is undefined";
        let reliable = obj.reliable;
        if (reliable === undefined) throw "reliable is undefined";
        let ordered = obj.ordered;
        if (ordered === undefined) throw "ordered is undefined";
        result.result = this._impl.createDataStream(streamId, reliable, ordered);
        return 0;
    }

    createDataStream2(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let streamId = obj.streamId;
        if (streamId === undefined) throw "streamId is undefined";
        let config = obj.config;
        if (config === undefined) throw "config is undefined";
        result.result = this._impl.createDataStream2(streamId, config);
        return 0;
    }

    sendStreamMessage(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let streamId = obj.streamId;
        if (streamId === undefined) throw "streamId is undefined";
        let data = obj.data;
        if (data === undefined) throw "data is undefined";
        let length = obj.length;
        if (length === undefined) throw "length is undefined";
        result.result = this._impl.sendStreamMessage(streamId, data, length);
        return 0;
    }

    addVideoWatermark(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let watermark = obj.watermark;
        if (watermark === undefined) throw "watermark is undefined";
        result.result = this._impl.addVideoWatermark(watermark);
        return 0;
    }

    addVideoWatermark2(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let watermarkUrl = obj.watermarkUrl;
        if (watermarkUrl === undefined) throw "watermarkUrl is undefined";
        let options = obj.options;
        if (options === undefined) throw "options is undefined";
        result.result = this._impl.addVideoWatermark2(watermarkUrl, options);
        return 0;
    }

    clearVideoWatermark(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._impl.clearVideoWatermark();
        return 0;
    }

    clearVideoWatermarks(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._impl.clearVideoWatermarks();
        return 0;
    }

    addInjectStreamUrl(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let url = obj.url;
        if (url === undefined) throw "url is undefined";
        let config = obj.config;
        if (config === undefined) throw "config is undefined";
        result.result = this._impl.addInjectStreamUrl(url, config);
        return 0;
    }

    removeInjectStreamUrl(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let url = obj.url;
        if (url === undefined) throw "url is undefined";
        result.result = this._impl.removeInjectStreamUrl(url);
        return 0;
    }

    pauseAudio(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._impl.pauseAudio();
        return 0;
    }

    resumeAudio(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._impl.resumeAudio();
        return 0;
    }

    enableWebSdkInteroperability(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let enabled = obj.enabled;
        if (enabled === undefined) throw "enabled is undefined";
        result.result = this._impl.enableWebSdkInteroperability(enabled);
        return 0;
    }

    sendCustomReportMessage(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let id = obj.id;
        if (id === undefined) throw "id is undefined";
        let category = obj.category;
        if (category === undefined) throw "category is undefined";
        let event = obj.event;
        if (event === undefined) throw "event is undefined";
        let label = obj.label;
        if (label === undefined) throw "label is undefined";
        let value = obj.value;
        if (value === undefined) throw "value is undefined";
        result.result = this._impl.sendCustomReportMessage(id, category, event, label, value);
        return 0;
    }

    registerMediaMetadataObserver(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let observer = obj.observer;
        if (observer === undefined) throw "observer is undefined";
        let type = obj.type;
        if (type === undefined) throw "type is undefined";
        result.result = this._impl.registerMediaMetadataObserver(observer, type);
        return 0;
    }

    unregisterMediaMetadataObserver(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let observer = obj.observer;
        if (observer === undefined) throw "observer is undefined";
        let type = obj.type;
        if (type === undefined) throw "type is undefined";
        result.result = this._impl.unregisterMediaMetadataObserver(observer, type);
        return 0;
    }

    startAudioFrameDump(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let channel_id = obj.channel_id;
        if (channel_id === undefined) throw "channel_id is undefined";
        let user_id = obj.user_id;
        if (user_id === undefined) throw "user_id is undefined";
        let location = obj.location;
        if (location === undefined) throw "location is undefined";
        let uuid = obj.uuid;
        if (uuid === undefined) throw "uuid is undefined";
        let passwd = obj.passwd;
        if (passwd === undefined) throw "passwd is undefined";
        let duration_ms = obj.duration_ms;
        if (duration_ms === undefined) throw "duration_ms is undefined";
        let auto_upload = obj.auto_upload;
        if (auto_upload === undefined) throw "auto_upload is undefined";
        result.result = this._impl.startAudioFrameDump(channel_id, user_id, location, uuid, passwd, duration_ms, auto_upload);
        return 0;
    }

    stopAudioFrameDump(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let channel_id = obj.channel_id;
        if (channel_id === undefined) throw "channel_id is undefined";
        let user_id = obj.user_id;
        if (user_id === undefined) throw "user_id is undefined";
        let location = obj.location;
        if (location === undefined) throw "location is undefined";
        result.result = this._impl.stopAudioFrameDump(channel_id, user_id, location);
        return 0;
    }

    registerLocalUserAccount(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let appId = obj.appId;
        if (appId === undefined) throw "appId is undefined";
        let userAccount = obj.userAccount;
        if (userAccount === undefined) throw "userAccount is undefined";
        result.result = this._impl.registerLocalUserAccount(appId, userAccount);
        return 0;
    }

    joinChannelWithUserAccount(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let token = obj.token;
        if (token === undefined) throw "token is undefined";
        let channelId = obj.channelId;
        if (channelId === undefined) throw "channelId is undefined";
        let userAccount = obj.userAccount;
        if (userAccount === undefined) throw "userAccount is undefined";
        result.result = this._impl.joinChannelWithUserAccount(token, channelId, userAccount);
        return 0;
    }

    joinChannelWithUserAccount2(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let token = obj.token;
        if (token === undefined) throw "token is undefined";
        let channelId = obj.channelId;
        if (channelId === undefined) throw "channelId is undefined";
        let userAccount = obj.userAccount;
        if (userAccount === undefined) throw "userAccount is undefined";
        let options = obj.options;
        if (options === undefined) throw "options is undefined";
        result.result = this._impl.joinChannelWithUserAccount2(token, channelId, userAccount, options);
        return 0;
    }

    joinChannelWithUserAccountEx(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let token = obj.token;
        if (token === undefined) throw "token is undefined";
        let channelId = obj.channelId;
        if (channelId === undefined) throw "channelId is undefined";
        let userAccount = obj.userAccount;
        if (userAccount === undefined) throw "userAccount is undefined";
        let options = obj.options;
        if (options === undefined) throw "options is undefined";
        result.result = this._impl.joinChannelWithUserAccountEx(token, channelId, userAccount, options);
        return 0;
    }

    getUserInfoByUserAccount(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let userAccount = obj.userAccount;
        if (userAccount === undefined) throw "userAccount is undefined";
        let userInfo: agorartc.UserInfo = { uid: 0, userAccount: "" };
        result.result = this._impl.getUserInfoByUserAccount(userAccount, userInfo);
        result.userInfo = userInfo;
        return 0;
    }

    getUserInfoByUid(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let uid = obj.uid;
        if (uid === undefined) throw "uid is undefined";
        let userInfo: agorartc.UserInfo = { uid: 0, userAccount: "" }
        result.result = this._impl.getUserInfoByUid(uid, userInfo);
        result.userInfo = userInfo;
        return 0;
    }

    startChannelMediaRelay(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let configuration = obj.configuration;
        if (configuration === undefined) throw "configuration is undefined";
        result.result = this._impl.startChannelMediaRelay(configuration);
        return 0;
    }

    updateChannelMediaRelay(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let configuration = obj.configuration;
        if (configuration === undefined) throw "configuration is undefined";
        result.result = this._impl.updateChannelMediaRelay(configuration);
        return 0;
    }

    stopChannelMediaRelay(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._impl.stopChannelMediaRelay();
        return 0;
    }

    pauseAllChannelMediaRelay(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._impl.pauseAllChannelMediaRelay();
        return 0;
    }

    resumeAllChannelMediaRelay(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._impl.resumeAllChannelMediaRelay();
        return 0;
    }

    setDirectCdnStreamingAudioConfiguration(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let profile = obj.profile;
        if (profile === undefined) throw "profile is undefined";
        result.result = this._impl.setDirectCdnStreamingAudioConfiguration(profile);
        return 0;
    }

    setDirectCdnStreamingVideoConfiguration(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let config = obj.config;
        if (config === undefined) throw "config is undefined";
        result.result = this._impl.setDirectCdnStreamingVideoConfiguration(config);
        return 0;
    }

    startDirectCdnStreaming(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let eventHandler = obj.eventHandler;
        if (eventHandler === undefined) throw "eventHandler is undefined";
        let publishUrl = obj.publishUrl;
        if (publishUrl === undefined) throw "publishUrl is undefined";
        let options = obj.options;
        if (options === undefined) throw "options is undefined";
        result.result = this._impl.startDirectCdnStreaming(eventHandler, publishUrl, options);
        return 0;
    }

    stopDirectCdnStreaming(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._impl.stopDirectCdnStreaming();
        return 0;
    }

    updateDirectCdnStreamingMediaOptions(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let options = obj.options;
        if (options === undefined) throw "options is undefined";
        result.result = this._impl.updateDirectCdnStreamingMediaOptions(options);
        return 0;
    }

    startRhythmPlayer(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let sound1 = obj.sound1;
        if (sound1 === undefined) throw "sound1 is undefined";
        let sound2 = obj.sound2;
        if (sound2 === undefined) throw "sound2 is undefined";
        let config = obj.config;
        if (config === undefined) throw "config is undefined";
        result.result = this._impl.startRhythmPlayer(sound1, sound2, config);
        return 0;
    }

    stopRhythmPlayer(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._impl.stopRhythmPlayer();
        return 0;
    }

    configRhythmPlayer(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let config = obj.config;
        if (config === undefined) throw "config is undefined";
        result.result = this._impl.configRhythmPlayer(config);
        return 0;
    }

    takeSnapshot(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let config = obj.config;
        if (config === undefined) throw "config is undefined";
        result.result = this._impl.takeSnapshot(config);
        return 0;
    }

    SetContentInspect(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let config = obj.config;
        if (config === undefined) throw "config is undefined";
        result.result = this._impl.setContentInspect(config);
        return 0;
    }

    enableFishCorrection(
        params1: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params1) as any;
        let enabled = obj.enabled;
        if (enabled === undefined) throw "enabled is undefined";
        let params = obj.params;
        if (params === undefined) throw "params is undefined";
        result.result = this._impl.enableFishCorrection(enabled, params);
        return 0;
    }

    adjustCustomAudioPlayoutVolume(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let sourceId = obj.sourceId;
        if (sourceId === undefined) throw "sourceId is undefined";
        let volume = obj.volume;
        if (volume === undefined) throw "volume is undefined";
        result.result = this._impl.adjustCustomAudioPlayoutVolume(sourceId, volume);
        return 0;
    }

    adjustCustomAudioPublishVolume(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let sourceId = obj.sourceId;
        if (sourceId === undefined) throw "sourceId is undefined";
        let volume = obj.volume;
        if (volume === undefined) throw "volume is undefined";
        result.result = this._impl.adjustCustomAudioPlayoutVolume(sourceId, volume);
        return 0;
    }

    setCloudProxy(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let proxyType = obj.proxyType;
        if (proxyType === undefined) throw "proxyType is undefined";
        result.result = this._impl.setCloudProxy(proxyType);
        return 0;
    }

    setLocalAccessPoint(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let config = obj.config;
        if (config === undefined) throw "config is undefined";
        result.result = this._impl.setLocalAccessPoint(config);
        return 0;
    }

    enableFishEyeCorrection(
        params1: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params1) as any;
        let enabled = obj.enabled;
        if (enabled === undefined) throw "enabled is undefined";
        let params = obj.params;
        if (params === undefined) throw "params is undefined";
        result.result = this._impl.enableFishEyeCorrection(enabled, params);
        return 0;
    }

    setAdvancedAudioOptions(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let options = obj.options;
        if (options === undefined) throw "options is undefined";
        result.result = this._impl.setAdvancedAudioOptions(options);
        return 0;
    }

    setAVSyncSource(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let channelId = obj.channelId;
        if (channelId === undefined) throw "channelId is undefined";
        let uid = obj.uid;
        if (uid === undefined) throw "uid is undefined";
        result.result = this._impl.setAVSyncSource(channelId, uid);
        return 0;
    }

    enableVideoImageSource(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let enable = obj.enable;
        if (enable === undefined) throw "enable is undefined";
        let options = obj.options;
        if (options === undefined) throw "options is undefined";
        result.result = this._impl.enableVideoImageSource(enable, options);
        return 0;
    }

    enableWirelessAccelerate(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let enabled = obj.enabled;
        if (enabled === undefined) throw "enabled is undefined";
        result.result = this._impl.enableWirelessAccelerate(enabled);
        return 0;
    }

    addPublishStreamUrl(params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let url = obj.url;
        if (url === undefined) throw "url is undefined";
        let transcodingEnabled = obj.transcodingEnabled;
        if (transcodingEnabled === undefined) throw "transcodingEnabled is undefined";
        result.result = this._impl.addPublishStreamUrl(url, transcodingEnabled);
        return 0;

    }

    removePublishStreamUrl(params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let url = obj.url;
        if (url === undefined) throw "url is undefined";
        result.result = this._impl.removePublishStreamUrl(url);
        return 0;

    }

    switchChannel(params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let token = obj.token;
        if (token === undefined) throw "token is undefined";
        let channel = obj.channel;
        if (channel === undefined) throw "channel is undefined";
        result.result = this._impl.switchChannel(token, channel);
        return 0;
    }

    pushDirectCdnStreamingCustomVideoFrame(params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let frame = obj.frame;
        if (frame === undefined) throw "frame is undefined";
        result.result = this._impl.pushDirectCdnStreamingCustomVideoFrame(frame);
        return 0;
    }

    setLiveTranscoding(params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let transcoding = obj.transcoding;
        if (transcoding === undefined) throw "transcoding is undefined";
        result.result = this._impl.setLiveTranscoding(transcoding);
        return 0;
    }

}
