
import { RtcEngine } from "../engine/RtcEngine";
import { IRtcEngine } from "./IRtcEngine";
import * as agorartc from "./rtc_types/Index";

export class IrisRtcEnginePrepare {

    protected _rtcEngine: IRtcEngine;

    //IMediaEngine
    registerAudioFrameObserver(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let observer = obj.observer;
        if (observer == null) throw "observer is null";
        result.result = this._rtcEngine.registerAudioFrameObserver(observer);
        return 0;
    }

    registerVideoFrameObserver(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let observer = obj.observer;
        if (observer == null) throw "observer is null";
        result.result = this._rtcEngine.registerVideoFrameObserver(observer);
        return 0;
    }

    registerVideoEncodedFrameObserver(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let observer = obj.observer;
        if (observer == null) throw "observer is null";
        result.result = this._rtcEngine.registerVideoEncodedFrameObserver(observer);
        return 0;
    }

    pushAudioFrame(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let type = obj.type;
        if (type == null) throw "type is null";
        let frame = obj.frame;
        if (frame == null) throw "frame is null";
        let wrap = obj.wrap;
        if (wrap == null) throw "wrap is null";
        let sourceId = obj.sourceId;
        if (sourceId == null) throw "sourceId is null";
        result.result = this._rtcEngine.pushAudioFrame(type, frame, wrap, sourceId);
        return 0;
    }

    pushCaptureAudioFrame(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let frame = obj.frame;
        if (frame == null) throw "frame is null";
        result.result = this._rtcEngine.pushCaptureAudioFrame(frame);
        return 0;
    }

    pushReverseAudioFrame(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let frame = obj.frame;
        if (frame == null) throw "frame is null";
        result.result = this._rtcEngine.pushReverseAudioFrame(frame);
        return 0;
    }

    pushDirectAudioFrame(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let frame = obj.frame;
        if (frame == null) throw "frame is null";
        result.result = this._rtcEngine.pushDirectAudioFrame(frame);
        return 0;
    }

    pullAudioFrame(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let frame = obj.frame;
        if (frame == null) throw "frame is null";
        result.result = this._rtcEngine.pullAudioFrame(frame);
        return 0;
    }

    setExternalVideoSource(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let enabled = obj.enabled;
        if (enabled == null) throw "enabled is null";
        let useTexture = obj.useTexture;
        if (useTexture == null) throw "useTexture is null";
        let sourceType = obj.sourceType;
        if (sourceType == null) throw "sourceType is null";
        result.result = this._rtcEngine.setExternalVideoSource(enabled, useTexture, sourceType);
        return 0;
    }

    setExternalAudioSource(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let enabled = obj.enabled;
        if (enabled == null) throw "enabled is null";
        let sampleRate = obj.sampleRate;
        if (sampleRate == null) throw "sampleRate is null";
        let channels = obj.channels;
        if (channels == null) throw "channels is null";
        let sourceNumber = obj.sourceNumber;
        if (sourceNumber == null) throw "sourceNumber is null";
        let localPlayback = obj.localPlayback;
        if (localPlayback == null) throw "localPlayback is null";
        let publish = obj.publish;
        if (publish == null) throw "publish is null";
        result.result = this._rtcEngine.setExternalAudioSource(enabled, sampleRate, channels, sourceNumber, localPlayback, publish);
        return 0;
    }

    setExternalAudioSink(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let enabled = obj.enabled;
        if (enabled == null) throw "enabled is null";
        let sampleRate = obj.sampleRate;
        if (sampleRate == null) throw "sampleRate is null";
        let channels = obj.channels;
        if (channels == null) throw "channels is null";
        result.result = this._rtcEngine.setExternalAudioSink(enabled, sampleRate, channels);
        return 0;
    }

    enableCustomAudioLocalPlayback(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let sourceId = obj.sourceId;
        if (sourceId == null) throw "sourceId is null";
        let enabled = obj.enabled;
        if (enabled == null) throw "enabled is null";
        result.result = this._rtcEngine.enableCustomAudioLocalPlayback(sourceId, enabled);
        return 0;
    }

    setDirectExternalAudioSource(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let enable = obj.enable;
        if (enable == null) throw "enable is null";
        let localPlayback = obj.localPlayback;
        if (localPlayback == null) throw "localPlayback is null";
        result.result = this._rtcEngine.setDirectExternalAudioSource(enable, localPlayback);
        return 0;
    }

    pushVideoFrame(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let frame = obj.frame;
        if (frame == null) throw "frame is null";
        let videoTrackId = obj.videoTrackId;
        if (videoTrackId == null) throw "videoTrackId is null";
        result.result = this._rtcEngine.pushVideoFrame(frame, videoTrackId);
        return 0;
    }

    pushEncodedVideoImage(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let imageBuffer = obj.imageBuffer;
        if (imageBuffer == null) throw "imageBuffer is null";
        let length = obj.length;
        if (length == null) throw "length is null";
        let videoEncodedFrameInfo = obj.videoEncodedFrameInfo;
        if (videoEncodedFrameInfo == null) throw "videoEncodedFrameInfo is null";
        let videoTrackId = obj.videoTrackId;
        if (videoTrackId == null) throw "videoTrackId is null";
        result.result = this._rtcEngine.pushEncodedVideoImage(imageBuffer, length, videoEncodedFrameInfo, videoTrackId);
        return 0;
    }

    //IVideoDeviceManager
    enumerateVideoDevices(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        // let obj = JSON.parse(params) as any;
        result.result = this._rtcEngine.enumerateVideoDevices();
        return 0;
    }

    setDevice(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let deviceIdUTF8 = obj.deviceIdUTF8;
        if (deviceIdUTF8 == null) throw "deviceIdUTF8 is null";
        result.result = this._rtcEngine.setDevice(deviceIdUTF8);
        return 0;
    }

    getDevice(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        // let obj = JSON.parse(params) as any;
        // let deviceIdUTF8 = obj.deviceIdUTF8;
        // if (deviceIdUTF8 == null) throw "deviceIdUTF8 is null";
        result.result = this._rtcEngine.getDevice();
        return 0;
    }

    numberOfCapabilities(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let deviceIdUTF8 = obj.deviceIdUTF8;
        if (deviceIdUTF8 == null) throw "deviceIdUTF8 is null";
        result.result = this._rtcEngine.numberOfCapabilities(deviceIdUTF8);
        return 0;
    }

    getCapability(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let deviceIdUTF8 = obj.deviceIdUTF8;
        if (deviceIdUTF8 == null) throw "deviceIdUTF8 is null";
        let deviceCapabilityNumber = obj.deviceCapabilityNumber;
        if (deviceCapabilityNumber == null) throw "deviceCapabilityNumber is null";
        let capability = obj.capability;
        if (capability == null) throw "capability is null";
        result.result = this._rtcEngine.getCapability(deviceIdUTF8, deviceCapabilityNumber, capability);
        return 0;
    }

    startDeviceTest(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let hwnd = obj.hwnd;
        if (hwnd == null) throw "hwnd is null";
        result.result = this._rtcEngine.startDeviceTest(hwnd);
        return 0;
    }

    stopDeviceTest(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._rtcEngine.stopDeviceTest();
        return 0;
    }


    //IRtcEngine
    release(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let sync = obj.sync;
        if (sync == null) throw "sync is null";
        result.result = this._rtcEngine.release(sync);
        return 0;
    }

    initialize(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let context = obj.context;
        if (context == null) throw "context is null";
        result.result = this._rtcEngine.initialize(context);
        return 0;
    }

    setAppType(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let appType = obj.appType;
        if (appType == null) throw "appType is null";
        result.result = this._rtcEngine.setAppType(appType);
        return 0;
    }

    queryInterface(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let iid = obj.iid;
        if (iid == null) throw "iid is null";
        let inter = obj.inter;
        if (inter == null) throw "inter is null";
        result.result = this._rtcEngine.queryInterface(iid, inter);
        return 0;
    }

    getVersion(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        // let build = obj.build;
        // if (build == null) throw "build is null";
        result.result = this._rtcEngine.getVersion();
        return 0;
    }

    getErrorDescription(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let code = obj.code;
        if (code == null) throw "code is null";
        result.result = this._rtcEngine.getErrorDescription(code);
        return 0;
    }

    joinChannel(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let token = obj.token;
        if (token == null) throw "token is null";
        let channelId = obj.channelId;
        if (channelId == null) throw "channelId is null";
        let info = obj.info;
        if (info == null) throw "info is null";
        let uid = obj.uid;
        if (uid == null) throw "uid is null";
        result.result = this._rtcEngine.joinChannel(token, channelId, info, uid);
        return 0;
    }

    joinChannel2(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let token = obj.token;
        if (token == null) throw "token is null";
        let channelId = obj.channelId;
        if (channelId == null) throw "channelId is null";
        let uid = obj.uid;
        if (uid == null) throw "uid is null";
        let options = obj.options;
        if (options == null) throw "options is null";
        result.result = this._rtcEngine.joinChannel2(token, channelId, uid, options);
        return 0;
    }

    updateChannelMediaOptions(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let options = obj.options;
        if (options == null) throw "options is null";
        result.result = this._rtcEngine.updateChannelMediaOptions(options);
        return 0;
    }

    leaveChannel(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._rtcEngine.leaveChannel();
        return 0;
    }

    leaveChannel2(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let options = obj.options;
        if (options == null) throw "options is null";
        result.result = this._rtcEngine.leaveChannel2(options);
        return 0;
    }

    renewToken(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let token = obj.token;
        if (token == null) throw "token is null";
        result.result = this._rtcEngine.renewToken(token);
        return 0;
    }

    setChannelProfile(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let profile = obj.profile;
        if (profile == null) throw "profile is null";
        result.result = this._rtcEngine.setChannelProfile(profile);
        return 0;
    }

    setClientRole(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let role = obj.role;
        if (role == null) throw "role is null";
        result.result = this._rtcEngine.setClientRole(role);
        return 0;
    }

    setClientRole2(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let role = obj.role;
        if (role == null) throw "role is null";
        let options = obj.options;
        if (options == null) throw "options is null";
        result.result = this._rtcEngine.setClientRole2(role, options);
        return 0;
    }

    startEchoTest(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._rtcEngine.startEchoTest();
        return 0;
    }

    startEchoTest2(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let intervalInSeconds = obj.intervalInSeconds;
        if (intervalInSeconds == null) throw "intervalInSeconds is null";
        result.result = this._rtcEngine.startEchoTest2(intervalInSeconds);
        return 0;
    }

    startEchoTest3(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let config = obj.config;
        if (config == null) throw "config is null";
        result.result = this._rtcEngine.startEchoTest3(config);
        return 0;
    }

    stopEchoTest(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._rtcEngine.stopEchoTest();
        return 0;
    }

    enableVideo(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._rtcEngine.enableVideo();
        return 0;
    }

    disableVideo(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._rtcEngine.disableVideo();
        return 0;
    }

    startPreview(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._rtcEngine.startPreview();
        return 0;
    }

    startPreview2(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let sourceType = obj.sourceType;
        if (sourceType == null) throw "sourceType is null";
        result.result = this._rtcEngine.startPreview2(sourceType);
        return 0;
    }

    stopPreview(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._rtcEngine.stopPreview();
        return 0;
    }

    stopPreview2(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let sourceType = obj.sourceType;
        if (sourceType == null) throw "sourceType is null";
        result.result = this._rtcEngine.stopPreview2(sourceType);
        return 0;
    }

    startLastmileProbeTest(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let config = obj.config;
        if (config == null) throw "config is null";
        result.result = this._rtcEngine.startLastmileProbeTest(config);
        return 0;
    }

    stopLastmileProbeTest(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._rtcEngine.stopLastmileProbeTest();
        return 0;
    }

    setVideoEncoderConfiguration(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let config = obj.config;
        if (config == null) throw "config is null";
        result.result = this._rtcEngine.setVideoEncoderConfiguration(config);
        return 0;
    }

    setBeautyEffectOptions(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let enabled = obj.enabled;
        if (enabled == null) throw "enabled is null";
        let options = obj.options;
        if (options == null) throw "options is null";
        let type = obj.type;
        if (type == null) throw "type is null";
        result.result = this._rtcEngine.setBeautyEffectOptions(enabled, options, type);
        return 0;
    }

    setLowlightEnhanceOptions(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let enabled = obj.enabled;
        if (enabled == null) throw "enabled is null";
        let options = obj.options;
        if (options == null) throw "options is null";
        let type = obj.type;
        if (type == null) throw "type is null";
        result.result = this._rtcEngine.setLowlightEnhanceOptions(enabled, options, type);
        return 0;
    }

    setVideoDenoiserOptions(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let enabled = obj.enabled;
        if (enabled == null) throw "enabled is null";
        let options = obj.options;
        if (options == null) throw "options is null";
        let type = obj.type;
        if (type == null) throw "type is null";
        result.result = this._rtcEngine.setVideoDenoiserOptions(enabled, options, type);
        return 0;
    }

    setColorEnhanceOptions(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let enabled = obj.enabled;
        if (enabled == null) throw "enabled is null";
        let options = obj.options;
        if (options == null) throw "options is null";
        let type = obj.type;
        if (type == null) throw "type is null";
        result.result = this._rtcEngine.setColorEnhanceOptions(enabled, options, type);
        return 0;
    }

    enableVirtualBackground(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let enabled = obj.enabled;
        if (enabled == null) throw "enabled is null";
        let backgroundSource = obj.backgroundSource;
        if (backgroundSource == null) throw "backgroundSource is null";
        let segproperty = obj.segproperty;
        if (segproperty == null) throw "segproperty is null";
        let type = obj.type;
        if (type == null) throw "type is null";
        result.result = this._rtcEngine.enableVirtualBackground(enabled, backgroundSource, segproperty, type);
        return 0;
    }

    enableRemoteSuperResolution(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let userId = obj.userId;
        if (userId == null) throw "userId is null";
        let enable = obj.enable;
        if (enable == null) throw "enable is null";
        result.result = this._rtcEngine.enableRemoteSuperResolution(userId, enable);
        return 0;
    }

    setupRemoteVideo(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let canvas = obj.canvas;
        if (canvas == null) throw "canvas is null";
        result.result = this._rtcEngine.setupRemoteVideo(canvas);
        return 0;
    }

    setupLocalVideo(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let canvas = obj.canvas;
        if (canvas == null) throw "canvas is null";
        result.result = this._rtcEngine.setupLocalVideo(canvas);
        return 0;
    }

    enableAudio(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._rtcEngine.enableAudio();
        return 0;
    }

    disableAudio(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._rtcEngine.disableAudio();
        return 0;
    }

    setAudioProfile(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let profile = obj.profile;
        if (profile == null) throw "profile is null";
        let scenario = obj.scenario;
        if (scenario == null) throw "scenario is null";
        result.result = this._rtcEngine.setAudioProfile(profile, scenario);
        return 0;
    }

    setAudioProfile2(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let profile = obj.profile;
        if (profile == null) throw "profile is null";
        result.result = this._rtcEngine.setAudioProfile2(profile);
        return 0;
    }

    setAudioScenario(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let scenario = obj.scenario;
        if (scenario == null) throw "scenario is null";
        result.result = this._rtcEngine.setAudioScenario(scenario);
        return 0;
    }

    enableLocalAudio(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let enabled = obj.enabled;
        if (enabled == null) throw "enabled is null";
        result.result = this._rtcEngine.enableLocalAudio(enabled);
        return 0;
    }

    muteLocalAudioStream(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let mute = obj.mute;
        if (mute == null) throw "mute is null";
        result.result = this._rtcEngine.muteLocalAudioStream(mute);
        return 0;
    }

    muteAllRemoteAudioStreams(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let mute = obj.mute;
        if (mute == null) throw "mute is null";
        result.result = this._rtcEngine.muteAllRemoteAudioStreams(mute);
        return 0;
    }

    setDefaultMuteAllRemoteAudioStreams(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let mute = obj.mute;
        if (mute == null) throw "mute is null";
        result.result = this._rtcEngine.setDefaultMuteAllRemoteAudioStreams(mute);
        return 0;
    }

    muteRemoteAudioStream(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let uid = obj.uid;
        if (uid == null) throw "uid is null";
        let mute = obj.mute;
        if (mute == null) throw "mute is null";
        result.result = this._rtcEngine.muteRemoteAudioStream(uid, mute);
        return 0;
    }

    muteLocalVideoStream(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let mute = obj.mute;
        if (mute == null) throw "mute is null";
        result.result = this._rtcEngine.muteLocalVideoStream(mute);
        return 0;
    }

    enableLocalVideo(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let enabled = obj.enabled;
        if (enabled == null) throw "enabled is null";
        result.result = this._rtcEngine.enableLocalVideo(enabled);
        return 0;
    }

    muteAllRemoteVideoStreams(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let mute = obj.mute;
        if (mute == null) throw "mute is null";
        result.result = this._rtcEngine.muteAllRemoteVideoStreams(mute);
        return 0;
    }

    setDefaultMuteAllRemoteVideoStreams(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let mute = obj.mute;
        if (mute == null) throw "mute is null";
        result.result = this._rtcEngine.setDefaultMuteAllRemoteVideoStreams(mute);
        return 0;
    }

    muteRemoteVideoStream(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let uid = obj.uid;
        if (uid == null) throw "uid is null";
        let mute = obj.mute;
        if (mute == null) throw "mute is null";
        result.result = this._rtcEngine.muteRemoteVideoStream(uid, mute);
        return 0;
    }

    setRemoteVideoStreamType(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let uid = obj.uid;
        if (uid == null) throw "uid is null";
        let streamType = obj.streamType;
        if (streamType == null) throw "streamType is null";
        result.result = this._rtcEngine.setRemoteVideoStreamType(uid, streamType);
        return 0;
    }

    setRemoteVideoSubscriptionOptions(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let uid = obj.uid;
        if (uid == null) throw "uid is null";
        let options = obj.options;
        if (options == null) throw "options is null";
        result.result = this._rtcEngine.setRemoteVideoSubscriptionOptions(uid, options);
        return 0;
    }

    setRemoteDefaultVideoStreamType(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let streamType = obj.streamType;
        if (streamType == null) throw "streamType is null";
        result.result = this._rtcEngine.setRemoteDefaultVideoStreamType(streamType);
        return 0;
    }

    setSubscribeAudioBlacklist(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let uidList = obj.uidList;
        if (uidList == null) throw "uidList is null";
        let uidNumber = obj.uidNumber;
        if (uidNumber == null) throw "uidNumber is null";
        result.result = this._rtcEngine.setSubscribeAudioBlacklist(uidList, uidNumber);
        return 0;
    }

    setSubscribeAudioWhitelist(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let uidList = obj.uidList;
        if (uidList == null) throw "uidList is null";
        let uidNumber = obj.uidNumber;
        if (uidNumber == null) throw "uidNumber is null";
        result.result = this._rtcEngine.setSubscribeAudioWhitelist(uidList, uidNumber);
        return 0;
    }

    setSubscribeVideoBlacklist(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let uidList = obj.uidList;
        if (uidList == null) throw "uidList is null";
        let uidNumber = obj.uidNumber;
        if (uidNumber == null) throw "uidNumber is null";
        result.result = this._rtcEngine.setSubscribeVideoBlacklist(uidList, uidNumber);
        return 0;
    }

    setSubscribeVideoWhitelist(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let uidList = obj.uidList;
        if (uidList == null) throw "uidList is null";
        let uidNumber = obj.uidNumber;
        if (uidNumber == null) throw "uidNumber is null";
        result.result = this._rtcEngine.setSubscribeVideoWhitelist(uidList, uidNumber);
        return 0;
    }

    enableAudioVolumeIndication(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let interval = obj.interval;
        if (interval == null) throw "interval is null";
        let smooth = obj.smooth;
        if (smooth == null) throw "smooth is null";
        let reportVad = obj.reportVad;
        if (reportVad == null) throw "reportVad is null";
        result.result = this._rtcEngine.enableAudioVolumeIndication(interval, smooth, reportVad);
        return 0;
    }

    startAudioRecording(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let filePath = obj.filePath;
        if (filePath == null) throw "filePath is null";
        let quality = obj.quality;
        if (quality == null) throw "quality is null";
        result.result = this._rtcEngine.startAudioRecording(filePath, quality);
        return 0;
    }

    startAudioRecording2(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let filePath = obj.filePath;
        if (filePath == null) throw "filePath is null";
        let sampleRate = obj.sampleRate;
        if (sampleRate == null) throw "sampleRate is null";
        let quality = obj.quality;
        if (quality == null) throw "quality is null";
        result.result = this._rtcEngine.startAudioRecording2(filePath, sampleRate, quality);
        return 0;
    }

    startAudioRecording3(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let config = obj.config;
        if (config == null) throw "config is null";
        result.result = this._rtcEngine.startAudioRecording3(config);
        return 0;
    }

    registerAudioEncodedFrameObserver(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let config = obj.config;
        if (config == null) throw "config is null";
        let observer = obj.observer;
        if (observer == null) throw "observer is null";
        result.result = this._rtcEngine.registerAudioEncodedFrameObserver(config, observer);
        return 0;
    }

    stopAudioRecording(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._rtcEngine.stopAudioRecording();
        return 0;
    }

    createMediaPlayer(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._rtcEngine.createMediaPlayer();
        return 0;
    }

    destroyMediaPlayer(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let media_player = obj.media_player;
        if (media_player == null) throw "media_player is null";
        result.result = this._rtcEngine.destroyMediaPlayer(media_player);
        return 0;
    }

    startAudioMixing(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let filePath = obj.filePath;
        if (filePath == null) throw "filePath is null";
        let loopback = obj.loopback;
        if (loopback == null) throw "loopback is null";
        let replace = obj.replace;
        if (replace == null) throw "replace is null";
        let cycle = obj.cycle;
        if (cycle == null) throw "cycle is null";
        result.result = this._rtcEngine.startAudioMixing(filePath, loopback, replace, cycle);
        return 0;
    }

    startAudioMixing2(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let filePath = obj.filePath;
        if (filePath == null) throw "filePath is null";
        let loopback = obj.loopback;
        if (loopback == null) throw "loopback is null";
        let replace = obj.replace;
        if (replace == null) throw "replace is null";
        let cycle = obj.cycle;
        if (cycle == null) throw "cycle is null";
        let startPos = obj.startPos;
        if (startPos == null) throw "startPos is null";
        result.result = this._rtcEngine.startAudioMixing2(filePath, loopback, replace, cycle, startPos);
        return 0;
    }

    stopAudioMixing(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._rtcEngine.stopAudioMixing();
        return 0;
    }

    pauseAudioMixing(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._rtcEngine.pauseAudioMixing();
        return 0;
    }

    resumeAudioMixing(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._rtcEngine.resumeAudioMixing();
        return 0;
    }

    getAudioTrackCount(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._rtcEngine.getAudioTrackCount();
        return 0;
    }

    adjustAudioMixingVolume(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let volume = obj.volume;
        if (volume == null) throw "volume is null";
        result.result = this._rtcEngine.adjustAudioMixingVolume(volume);
        return 0;
    }

    adjustAudioMixingPublishVolume(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let volume = obj.volume;
        if (volume == null) throw "volume is null";
        result.result = this._rtcEngine.adjustAudioMixingPublishVolume(volume);
        return 0;
    }

    getAudioMixingPublishVolume(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._rtcEngine.getAudioMixingPublishVolume();
        return 0;
    }

    adjustAudioMixingPlayoutVolume(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let volume = obj.volume;
        if (volume == null) throw "volume is null";
        result.result = this._rtcEngine.adjustAudioMixingPlayoutVolume(volume);
        return 0;
    }

    getAudioMixingPlayoutVolume(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._rtcEngine.getAudioMixingPlayoutVolume();
        return 0;
    }

    getAudioMixingDuration(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._rtcEngine.getAudioMixingDuration();
        return 0;
    }

    getAudioMixingCurrentPosition(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._rtcEngine.getAudioMixingCurrentPosition();
        return 0;
    }

    setAudioMixingPosition(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let pos = obj.pos;
        if (pos == null) throw "pos is null";
        result.result = this._rtcEngine.setAudioMixingPosition(pos);
        return 0;
    }

    setAudioMixingDualMonoMode(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let mode = obj.mode;
        if (mode == null) throw "mode is null";
        result.result = this._rtcEngine.setAudioMixingDualMonoMode(mode);
        return 0;
    }

    setAudioMixingPitch(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let pitch = obj.pitch;
        if (pitch == null) throw "pitch is null";
        result.result = this._rtcEngine.setAudioMixingPitch(pitch);
        return 0;
    }

    getEffectsVolume(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._rtcEngine.getEffectsVolume();
        return 0;
    }

    setEffectsVolume(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let volume = obj.volume;
        if (volume == null) throw "volume is null";
        result.result = this._rtcEngine.setEffectsVolume(volume);
        return 0;
    }

    preloadEffect(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let soundId = obj.soundId;
        if (soundId == null) throw "soundId is null";
        let filePath = obj.filePath;
        if (filePath == null) throw "filePath is null";
        let startPos = obj.startPos;
        if (startPos == null) throw "startPos is null";
        result.result = this._rtcEngine.preloadEffect(soundId, filePath, startPos);
        return 0;
    }

    playEffect(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let soundId = obj.soundId;
        if (soundId == null) throw "soundId is null";
        let filePath = obj.filePath;
        if (filePath == null) throw "filePath is null";
        let loopCount = obj.loopCount;
        if (loopCount == null) throw "loopCount is null";
        let pitch = obj.pitch;
        if (pitch == null) throw "pitch is null";
        let pan = obj.pan;
        if (pan == null) throw "pan is null";
        let gain = obj.gain;
        if (gain == null) throw "gain is null";
        let publish = obj.publish;
        if (publish == null) throw "publish is null";
        let startPos = obj.startPos;
        if (startPos == null) throw "startPos is null";
        result.result = this._rtcEngine.playEffect(soundId, filePath, loopCount, pitch, pan, gain, publish, startPos);
        return 0;
    }

    playAllEffects(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let loopCount = obj.loopCount;
        if (loopCount == null) throw "loopCount is null";
        let pitch = obj.pitch;
        if (pitch == null) throw "pitch is null";
        let pan = obj.pan;
        if (pan == null) throw "pan is null";
        let gain = obj.gain;
        if (gain == null) throw "gain is null";
        let publish = obj.publish;
        if (publish == null) throw "publish is null";
        result.result = this._rtcEngine.playAllEffects(loopCount, pitch, pan, gain, publish);
        return 0;
    }

    getVolumeOfEffect(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let soundId = obj.soundId;
        if (soundId == null) throw "soundId is null";
        result.result = this._rtcEngine.getVolumeOfEffect(soundId);
        return 0;
    }

    setVolumeOfEffect(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let soundId = obj.soundId;
        if (soundId == null) throw "soundId is null";
        let volume = obj.volume;
        if (volume == null) throw "volume is null";
        result.result = this._rtcEngine.setVolumeOfEffect(soundId, volume);
        return 0;
    }

    pauseEffect(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let soundId = obj.soundId;
        if (soundId == null) throw "soundId is null";
        result.result = this._rtcEngine.pauseEffect(soundId);
        return 0;
    }

    pauseAllEffects(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._rtcEngine.pauseAllEffects();
        return 0;
    }

    resumeEffect(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let soundId = obj.soundId;
        if (soundId == null) throw "soundId is null";
        result.result = this._rtcEngine.resumeEffect(soundId);
        return 0;
    }

    resumeAllEffects(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._rtcEngine.resumeAllEffects();
        return 0;
    }

    stopEffect(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let soundId = obj.soundId;
        if (soundId == null) throw "soundId is null";
        result.result = this._rtcEngine.stopEffect(soundId);
        return 0;
    }

    stopAllEffects(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._rtcEngine.stopAllEffects();
        return 0;
    }

    unloadEffect(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let soundId = obj.soundId;
        if (soundId == null) throw "soundId is null";
        result.result = this._rtcEngine.unloadEffect(soundId);
        return 0;
    }

    unloadAllEffects(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._rtcEngine.unloadAllEffects();
        return 0;
    }

    getEffectDuration(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let filePath = obj.filePath;
        if (filePath == null) throw "filePath is null";
        result.result = this._rtcEngine.getEffectDuration(filePath);
        return 0;
    }

    setEffectPosition(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let soundId = obj.soundId;
        if (soundId == null) throw "soundId is null";
        let pos = obj.pos;
        if (pos == null) throw "pos is null";
        result.result = this._rtcEngine.setEffectPosition(soundId, pos);
        return 0;
    }

    getEffectCurrentPosition(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let soundId = obj.soundId;
        if (soundId == null) throw "soundId is null";
        result.result = this._rtcEngine.getEffectCurrentPosition(soundId);
        return 0;
    }

    enableSoundPositionIndication(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let enabled = obj.enabled;
        if (enabled == null) throw "enabled is null";
        result.result = this._rtcEngine.enableSoundPositionIndication(enabled);
        return 0;
    }

    setRemoteVoicePosition(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let uid = obj.uid;
        if (uid == null) throw "uid is null";
        let pan = obj.pan;
        if (pan == null) throw "pan is null";
        let gain = obj.gain;
        if (gain == null) throw "gain is null";
        result.result = this._rtcEngine.setRemoteVoicePosition(uid, pan, gain);
        return 0;
    }

    enableSpatialAudio(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let enabled = obj.enabled;
        if (enabled == null) throw "enabled is null";
        result.result = this._rtcEngine.enableSpatialAudio(enabled);
        return 0;
    }

    setRemoteUserSpatialAudioParams(
        params1: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params1) as any;
        let uid = obj.uid;
        if (uid == null) throw "uid is null";
        let params = obj.params;
        if (params == null) throw "params is null";
        result.result = this._rtcEngine.setRemoteUserSpatialAudioParams(uid, params);
        return 0;
    }

    setVoiceBeautifierPreset(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let preset = obj.preset;
        if (preset == null) throw "preset is null";
        result.result = this._rtcEngine.setVoiceBeautifierPreset(preset);
        return 0;
    }

    setAudioEffectPreset(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let preset = obj.preset;
        if (preset == null) throw "preset is null";
        result.result = this._rtcEngine.setAudioEffectPreset(preset);
        return 0;
    }

    setVoiceConversionPreset(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let preset = obj.preset;
        if (preset == null) throw "preset is null";
        result.result = this._rtcEngine.setVoiceConversionPreset(preset);
        return 0;
    }

    setAudioEffectParameters(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let preset = obj.preset;
        if (preset == null) throw "preset is null";
        let param1 = obj.param1;
        if (param1 == null) throw "param1 is null";
        let param2 = obj.param2;
        if (param2 == null) throw "param2 is null";
        result.result = this._rtcEngine.setAudioEffectParameters(preset, param1, param2);
        return 0;
    }

    setVoiceBeautifierParameters(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let preset = obj.preset;
        if (preset == null) throw "preset is null";
        let param1 = obj.param1;
        if (param1 == null) throw "param1 is null";
        let param2 = obj.param2;
        if (param2 == null) throw "param2 is null";
        result.result = this._rtcEngine.setVoiceBeautifierParameters(preset, param1, param2);
        return 0;
    }

    setVoiceConversionParameters(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let preset = obj.preset;
        if (preset == null) throw "preset is null";
        let param1 = obj.param1;
        if (param1 == null) throw "param1 is null";
        let param2 = obj.param2;
        if (param2 == null) throw "param2 is null";
        result.result = this._rtcEngine.setVoiceConversionParameters(preset, param1, param2);
        return 0;
    }

    setLocalVoicePitch(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let pitch = obj.pitch;
        if (pitch == null) throw "pitch is null";
        result.result = this._rtcEngine.setLocalVoicePitch(pitch);
        return 0;
    }

    setLocalVoiceEqualization(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let bandFrequency = obj.bandFrequency;
        if (bandFrequency == null) throw "bandFrequency is null";
        let bandGain = obj.bandGain;
        if (bandGain == null) throw "bandGain is null";
        result.result = this._rtcEngine.setLocalVoiceEqualization(bandFrequency, bandGain);
        return 0;
    }

    setLocalVoiceReverb(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let reverbKey = obj.reverbKey;
        if (reverbKey == null) throw "reverbKey is null";
        let value = obj.value;
        if (value == null) throw "value is null";
        result.result = this._rtcEngine.setLocalVoiceReverb(reverbKey, value);
        return 0;
    }

    setLogFile(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let filePath = obj.filePath;
        if (filePath == null) throw "filePath is null";
        result.result = this._rtcEngine.setLogFile(filePath);
        return 0;
    }

    setLogFilter(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let filter = obj.filter;
        if (filter == null) throw "filter is null";
        result.result = this._rtcEngine.setLogFilter(filter);
        return 0;
    }

    setLogLevel(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let level = obj.level;
        if (level == null) throw "level is null";
        result.result = this._rtcEngine.setLogLevel(level);
        return 0;
    }

    setLogFileSize(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let fileSizeInKBytes = obj.fileSizeInKBytes;
        if (fileSizeInKBytes == null) throw "fileSizeInKBytes is null";
        result.result = this._rtcEngine.setLogFileSize(fileSizeInKBytes);
        return 0;
    }

    uploadLogFile(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let requestId = "";
        result.result = this._rtcEngine.uploadLogFile(requestId);
        result.requestId = requestId;
        return 0;
    }

    setLocalRenderMode(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let renderMode = obj.renderMode;
        if (renderMode == null) throw "renderMode is null";
        let mirrorMode = obj.mirrorMode;
        if (mirrorMode == null) throw "mirrorMode is null";
        result.result = this._rtcEngine.setLocalRenderMode(renderMode, mirrorMode);
        return 0;
    }

    setRemoteRenderMode(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let uid = obj.uid;
        if (uid == null) throw "uid is null";
        let renderMode = obj.renderMode;
        if (renderMode == null) throw "renderMode is null";
        let mirrorMode = obj.mirrorMode;
        if (mirrorMode == null) throw "mirrorMode is null";
        result.result = this._rtcEngine.setRemoteRenderMode(uid, renderMode, mirrorMode);
        return 0;
    }

    setLocalRenderMode2(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let renderMode = obj.renderMode;
        if (renderMode == null) throw "renderMode is null";
        result.result = this._rtcEngine.setLocalRenderMode2(renderMode);
        return 0;
    }

    setLocalVideoMirrorMode(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let mirrorMode = obj.mirrorMode;
        if (mirrorMode == null) throw "mirrorMode is null";
        result.result = this._rtcEngine.setLocalVideoMirrorMode(mirrorMode);
        return 0;
    }

    enableDualStreamMode(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let enabled = obj.enabled;
        if (enabled == null) throw "enabled is null";
        result.result = this._rtcEngine.enableDualStreamMode(enabled);
        return 0;
    }

    enableDualStreamMode2(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let sourceType = obj.sourceType;
        if (sourceType == null) throw "sourceType is null";
        let enabled = obj.enabled;
        if (enabled == null) throw "enabled is null";
        result.result = this._rtcEngine.enableDualStreamMode2(sourceType, enabled);
        return 0;
    }

    enableDualStreamMode3(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let sourceType = obj.sourceType;
        if (sourceType == null) throw "sourceType is null";
        let enabled = obj.enabled;
        if (enabled == null) throw "enabled is null";
        let streamConfig = obj.streamConfig;
        if (streamConfig == null) throw "streamConfig is null";
        result.result = this._rtcEngine.enableDualStreamMode3(sourceType, enabled, streamConfig);
        return 0;
    }

    setDualStreamMode(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let mode = obj.mode;
        if (mode == null) throw "mode is null";
        result.result = this._rtcEngine.setDualStreamMode(mode);
        return 0;
    }

    setDualStreamMode2(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let sourceType = obj.sourceType;
        if (sourceType == null) throw "sourceType is null";
        let mode = obj.mode;
        if (mode == null) throw "mode is null";
        result.result = this._rtcEngine.setDualStreamMode2(sourceType, mode);
        return 0;
    }

    setDualStreamMode3(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let sourceType = obj.sourceType;
        if (sourceType == null) throw "sourceType is null";
        let mode = obj.mode;
        if (mode == null) throw "mode is null";
        let streamConfig = obj.streamConfig;
        if (streamConfig == null) throw "streamConfig is null";
        result.result = this._rtcEngine.setDualStreamMode3(sourceType, mode, streamConfig);
        return 0;
    }

    enableEchoCancellationExternal(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let enabled = obj.enabled;
        if (enabled == null) throw "enabled is null";
        let audioSourceDelay = obj.audioSourceDelay;
        if (audioSourceDelay == null) throw "audioSourceDelay is null";
        result.result = this._rtcEngine.enableEchoCancellationExternal(enabled, audioSourceDelay);
        return 0;
    }

    //mediaPlay的东西
    // enableCustomAudioLocalPlayback(
    // 	params: string, paramLength: number,
    // 	buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
    // 	let obj = JSON.parse(params) as any;
    // 	let sourceId = obj.sourceId;
    // 	if (sourceId == null) throw "sourceId is null";
    // 	let enabled = obj.enabled;
    // 	if (enabled == null) throw "enabled is null";
    // 	result.result = this._rtcEngine.enableCustomAudioLocalPlayback(sourceId, enabled);
    // 	return 0;
    // }

    startPrimaryCustomAudioTrack(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let config = obj.config;
        if (config == null) throw "config is null";
        result.result = this._rtcEngine.startPrimaryCustomAudioTrack(config);
        return 0;
    }

    stopPrimaryCustomAudioTrack(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._rtcEngine.stopPrimaryCustomAudioTrack();
        return 0;
    }

    startSecondaryCustomAudioTrack(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let config = obj.config;
        if (config == null) throw "config is null";
        result.result = this._rtcEngine.startSecondaryCustomAudioTrack(config);
        return 0;
    }

    stopSecondaryCustomAudioTrack(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._rtcEngine.stopSecondaryCustomAudioTrack();
        return 0;
    }

    setRecordingAudioFrameParameters(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let sampleRate = obj.sampleRate;
        if (sampleRate == null) throw "sampleRate is null";
        let channel = obj.channel;
        if (channel == null) throw "channel is null";
        let mode = obj.mode;
        if (mode == null) throw "mode is null";
        let samplesPerCall = obj.samplesPerCall;
        if (samplesPerCall == null) throw "samplesPerCall is null";
        result.result = this._rtcEngine.setRecordingAudioFrameParameters(sampleRate, channel, mode, samplesPerCall);
        return 0;
    }

    setPlaybackAudioFrameParameters(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let sampleRate = obj.sampleRate;
        if (sampleRate == null) throw "sampleRate is null";
        let channel = obj.channel;
        if (channel == null) throw "channel is null";
        let mode = obj.mode;
        if (mode == null) throw "mode is null";
        let samplesPerCall = obj.samplesPerCall;
        if (samplesPerCall == null) throw "samplesPerCall is null";
        result.result = this._rtcEngine.setPlaybackAudioFrameParameters(sampleRate, channel, mode, samplesPerCall);
        return 0;
    }

    setMixedAudioFrameParameters(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let sampleRate = obj.sampleRate;
        if (sampleRate == null) throw "sampleRate is null";
        let channel = obj.channel;
        if (channel == null) throw "channel is null";
        let samplesPerCall = obj.samplesPerCall;
        if (samplesPerCall == null) throw "samplesPerCall is null";
        result.result = this._rtcEngine.setMixedAudioFrameParameters(sampleRate, channel, samplesPerCall);
        return 0;
    }

    setPlaybackAudioFrameBeforeMixingParameters(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let sampleRate = obj.sampleRate;
        if (sampleRate == null) throw "sampleRate is null";
        let channel = obj.channel;
        if (channel == null) throw "channel is null";
        result.result = this._rtcEngine.setPlaybackAudioFrameBeforeMixingParameters(sampleRate, channel);
        return 0;
    }

    enableAudioSpectrumMonitor(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let intervalInMS = obj.intervalInMS;
        if (intervalInMS == null) throw "intervalInMS is null";
        result.result = this._rtcEngine.enableAudioSpectrumMonitor(intervalInMS);
        return 0;
    }

    disableAudioSpectrumMonitor(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._rtcEngine.disableAudioSpectrumMonitor();
        return 0;
    }

    registerAudioSpectrumObserver(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let observer = obj.observer;
        if (observer == null) throw "observer is null";
        result.result = this._rtcEngine.registerAudioSpectrumObserver(observer);
        return 0;
    }

    unregisterAudioSpectrumObserver(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let observer = obj.observer;
        if (observer == null) throw "observer is null";
        result.result = this._rtcEngine.unregisterAudioSpectrumObserver(observer);
        return 0;
    }

    adjustRecordingSignalVolume(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let volume = obj.volume;
        if (volume == null) throw "volume is null";
        result.result = this._rtcEngine.adjustRecordingSignalVolume(volume);
        return 0;
    }

    muteRecordingSignal(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let mute = obj.mute;
        if (mute == null) throw "mute is null";
        result.result = this._rtcEngine.muteRecordingSignal(mute);
        return 0;
    }

    adjustPlaybackSignalVolume(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let volume = obj.volume;
        if (volume == null) throw "volume is null";
        result.result = this._rtcEngine.adjustPlaybackSignalVolume(volume);
        return 0;
    }

    adjustUserPlaybackSignalVolume(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let uid = obj.uid;
        if (uid == null) throw "uid is null";
        let volume = obj.volume;
        if (volume == null) throw "volume is null";
        result.result = this._rtcEngine.adjustUserPlaybackSignalVolume(uid, volume);
        return 0;
    }

    setLocalPublishFallbackOption(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let option = obj.option;
        if (option == null) throw "option is null";
        result.result = this._rtcEngine.setLocalPublishFallbackOption(option);
        return 0;
    }

    setRemoteSubscribeFallbackOption(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let option = obj.option;
        if (option == null) throw "option is null";
        result.result = this._rtcEngine.setRemoteSubscribeFallbackOption(option);
        return 0;
    }

    enableLoopbackRecording(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let enabled = obj.enabled;
        if (enabled == null) throw "enabled is null";
        let deviceName = obj.deviceName;
        if (deviceName == null) throw "deviceName is null";
        result.result = this._rtcEngine.enableLoopbackRecording(enabled, deviceName);
        return 0;
    }

    adjustLoopbackSignalVolume(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let volume = obj.volume;
        if (volume == null) throw "volume is null";
        result.result = this._rtcEngine.adjustLoopbackSignalVolume(volume);
        return 0;
    }

    getLoopbackRecordingVolume(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._rtcEngine.getLoopbackRecordingVolume();
        return 0;
    }

    enableInEarMonitoring(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let enabled = obj.enabled;
        if (enabled == null) throw "enabled is null";
        let includeAudioFilters = obj.includeAudioFilters;
        if (includeAudioFilters == null) throw "includeAudioFilters is null";
        result.result = this._rtcEngine.enableInEarMonitoring(enabled, includeAudioFilters);
        return 0;
    }

    setInEarMonitoringVolume(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let volume = obj.volume;
        if (volume == null) throw "volume is null";
        result.result = this._rtcEngine.setInEarMonitoringVolume(volume);
        return 0;
    }

    loadExtensionProvider(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let path = obj.path;
        if (path == null) throw "path is null";
        result.result = this._rtcEngine.loadExtensionProvider(path);
        return 0;
    }

    setExtensionProviderProperty(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let provider = obj.provider;
        if (provider == null) throw "provider is null";
        let key = obj.key;
        if (key == null) throw "key is null";
        let value = obj.value;
        if (value == null) throw "value is null";
        result.result = this._rtcEngine.setExtensionProviderProperty(provider, key, value);
        return 0;
    }

    enableExtension(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let provider = obj.provider;
        if (provider == null) throw "provider is null";
        let extension = obj.extension;
        if (extension == null) throw "extension is null";
        let enable = obj.enable;
        if (enable == null) throw "enable is null";
        let type = obj.type;
        if (type == null) throw "type is null";
        result.result = this._rtcEngine.enableExtension(provider, extension, enable, type);
        return 0;
    }

    setExtensionProperty(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let provider = obj.provider;
        if (provider == null) throw "provider is null";
        let extension = obj.extension;
        if (extension == null) throw "extension is null";
        let key = obj.key;
        if (key == null) throw "key is null";
        let value = obj.value;
        if (value == null) throw "value is null";
        let type = obj.type;
        if (type == null) throw "type is null";
        result.result = this._rtcEngine.setExtensionProperty(provider, extension, key, value, type);
        return 0;
    }

    getExtensionProperty(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let provider = obj.provider;
        if (provider == null) throw "provider is null";
        let extension = obj.extension;
        if (extension == null) throw "extension is null";
        let key = obj.key;
        if (key == null) throw "key is null";
        let value = "";
        let buf_len = obj.buf_len;
        if (buf_len == null) throw "buf_len is null";
        let type = obj.type;
        if (type == null) throw "type is null";
        result.result = this._rtcEngine.getExtensionProperty(provider, extension, key, value, buf_len, type);
        return 0;
    }

    setCameraCapturerConfiguration(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let config = obj.config;
        if (config == null) throw "config is null";
        result.result = this._rtcEngine.setCameraCapturerConfiguration(config);
        return 0;
    }

    createCustomVideoTrack(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._rtcEngine.createCustomVideoTrack();
        return 0;
    }

    createCustomEncodedVideoTrack(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let sender_option = obj.sender_option;
        if (sender_option == null) throw "sender_option is null";
        result.result = this._rtcEngine.createCustomEncodedVideoTrack(sender_option);
        return 0;
    }

    destroyCustomVideoTrack(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let video_track_id = obj.video_track_id;
        if (video_track_id == null) throw "video_track_id is null";
        result.result = this._rtcEngine.destroyCustomVideoTrack(video_track_id);
        return 0;
    }

    destroyCustomEncodedVideoTrack(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let video_track_id = obj.video_track_id;
        if (video_track_id == null) throw "video_track_id is null";
        result.result = this._rtcEngine.destroyCustomEncodedVideoTrack(video_track_id);
        return 0;
    }

    switchCamera(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._rtcEngine.switchCamera();
        return 0;
    }

    isCameraZoomSupported(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._rtcEngine.isCameraZoomSupported();
        return 0;
    }

    isCameraFaceDetectSupported(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._rtcEngine.isCameraFaceDetectSupported();
        return 0;
    }

    isCameraTorchSupported(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._rtcEngine.isCameraTorchSupported();
        return 0;
    }

    isCameraFocusSupported(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._rtcEngine.isCameraFocusSupported();
        return 0;
    }

    isCameraAutoFocusFaceModeSupported(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._rtcEngine.isCameraAutoFocusFaceModeSupported();
        return 0;
    }

    setCameraZoomFactor(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let factor = obj.factor;
        if (factor == null) throw "factor is null";
        result.result = this._rtcEngine.setCameraZoomFactor(factor);
        return 0;
    }

    enableFaceDetection(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let enabled = obj.enabled;
        if (enabled == null) throw "enabled is null";
        result.result = this._rtcEngine.enableFaceDetection(enabled);
        return 0;
    }

    getCameraMaxZoomFactor(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._rtcEngine.getCameraMaxZoomFactor();
        return 0;
    }

    setCameraFocusPositionInPreview(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let positionX = obj.positionX;
        if (positionX == null) throw "positionX is null";
        let positionY = obj.positionY;
        if (positionY == null) throw "positionY is null";
        result.result = this._rtcEngine.setCameraFocusPositionInPreview(positionX, positionY);
        return 0;
    }

    setCameraTorchOn(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let isOn = obj.isOn;
        if (isOn == null) throw "isOn is null";
        result.result = this._rtcEngine.setCameraTorchOn(isOn);
        return 0;
    }

    setCameraAutoFocusFaceModeEnabled(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let enabled = obj.enabled;
        if (enabled == null) throw "enabled is null";
        result.result = this._rtcEngine.setCameraAutoFocusFaceModeEnabled(enabled);
        return 0;
    }

    isCameraExposurePositionSupported(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._rtcEngine.isCameraExposurePositionSupported();
        return 0;
    }

    setCameraExposurePosition(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let positionXinView = obj.positionXinView;
        if (positionXinView == null) throw "positionXinView is null";
        let positionYinView = obj.positionYinView;
        if (positionYinView == null) throw "positionYinView is null";
        result.result = this._rtcEngine.setCameraExposurePosition(positionXinView, positionYinView);
        return 0;
    }

    isCameraAutoExposureFaceModeSupported(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._rtcEngine.isCameraAutoExposureFaceModeSupported();
        return 0;
    }

    setCameraAutoExposureFaceModeEnabled(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let enabled = obj.enabled;
        if (enabled == null) throw "enabled is null";
        result.result = this._rtcEngine.setCameraAutoExposureFaceModeEnabled(enabled);
        return 0;
    }

    setDefaultAudioRouteToSpeakerphone(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let defaultToSpeaker = obj.defaultToSpeaker;
        if (defaultToSpeaker == null) throw "defaultToSpeaker is null";
        result.result = this._rtcEngine.setDefaultAudioRouteToSpeakerphone(defaultToSpeaker);
        return 0;
    }

    setEnableSpeakerphone(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let speakerOn = obj.speakerOn;
        if (speakerOn == null) throw "speakerOn is null";
        result.result = this._rtcEngine.setEnableSpeakerphone(speakerOn);
        return 0;
    }

    isSpeakerphoneEnabled(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._rtcEngine.isSpeakerphoneEnabled();
        return 0;
    }

    getScreenCaptureSources(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let thumbSize = obj.thumbSize;
        if (thumbSize == null) throw "thumbSize is null";
        let iconSize = obj.iconSize;
        if (iconSize == null) throw "iconSize is null";
        let includeScreen = obj.includeScreen;
        if (includeScreen == null) throw "includeScreen is null";
        result.result = this._rtcEngine.getScreenCaptureSources(thumbSize, iconSize, includeScreen);
        return 0;
    }

    setAudioSessionOperationRestriction(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let restriction = obj.restriction;
        if (restriction == null) throw "restriction is null";
        result.result = this._rtcEngine.setAudioSessionOperationRestriction(restriction);
        return 0;
    }

    startScreenCaptureByDisplayId(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let displayId = obj.displayId;
        if (displayId == null) throw "displayId is null";
        let regionRect = obj.regionRect;
        if (regionRect == null) throw "regionRect is null";
        let captureParams = obj.captureParams;
        if (captureParams == null) throw "captureParams is null";
        result.result = this._rtcEngine.startScreenCaptureByDisplayId(displayId, regionRect, captureParams);
        return 0;
    }

    startScreenCaptureByScreenRect(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let screenRect = obj.screenRect;
        if (screenRect == null) throw "screenRect is null";
        let regionRect = obj.regionRect;
        if (regionRect == null) throw "regionRect is null";
        let captureParams = obj.captureParams;
        if (captureParams == null) throw "captureParams is null";
        result.result = this._rtcEngine.startScreenCaptureByScreenRect(screenRect, regionRect, captureParams);
        return 0;
    }

    getAudioDeviceInfo(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let deviceInfo: agorartc.DeviceInfo = { deviceId: "", deviceName: "" }
        result.result = this._rtcEngine.getAudioDeviceInfo(deviceInfo);
        result.deviceInfo = deviceInfo;
        return 0;
    }

    startScreenCaptureByWindowId(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let windowId = obj.windowId;
        if (windowId == null) throw "windowId is null";
        let regionRect = obj.regionRect;
        if (regionRect == null) throw "regionRect is null";
        let captureParams = obj.captureParams;
        if (captureParams == null) throw "captureParams is null";
        result.result = this._rtcEngine.startScreenCaptureByWindowId(windowId, regionRect, captureParams);
        return 0;
    }

    setScreenCaptureContentHint(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let contentHint = obj.contentHint;
        if (contentHint == null) throw "contentHint is null";
        result.result = this._rtcEngine.setScreenCaptureContentHint(contentHint);
        return 0;
    }

    setScreenCaptureScenario(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let screenScenario = obj.screenScenario;
        if (screenScenario == null) throw "screenScenario is null";
        result.result = this._rtcEngine.setScreenCaptureScenario(screenScenario);
        return 0;
    }

    updateScreenCaptureRegion(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let regionRect = obj.regionRect;
        if (regionRect == null) throw "regionRect is null";
        result.result = this._rtcEngine.updateScreenCaptureRegion(regionRect);
        return 0;
    }

    updateScreenCaptureParameters(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let captureParams = obj.captureParams;
        if (captureParams == null) throw "captureParams is null";
        result.result = this._rtcEngine.updateScreenCaptureParameters(captureParams);
        return 0;
    }

    startScreenCapture(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let captureParams = obj.captureParams;
        if (captureParams == null) throw "captureParams is null";
        result.result = this._rtcEngine.startScreenCapture(captureParams);
        return 0;
    }

    updateScreenCapture(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let captureParams = obj.captureParams;
        if (captureParams == null) throw "captureParams is null";
        result.result = this._rtcEngine.updateScreenCapture(captureParams);
        return 0;
    }

    stopScreenCapture(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._rtcEngine.stopScreenCapture();
        return 0;
    }

    getCallId(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._rtcEngine.getCallId();
        return 0;
    }

    rate(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let callId = obj.callId;
        if (callId == null) throw "callId is null";
        let rating = obj.rating;
        if (rating == null) throw "rating is null";
        let description = obj.description;
        if (description == null) throw "description is null";
        result.result = this._rtcEngine.rate(callId, rating, description);
        return 0;
    }

    complain(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let callId = obj.callId;
        if (callId == null) throw "callId is null";
        let description = obj.description;
        if (description == null) throw "description is null";
        result.result = this._rtcEngine.complain(callId, description);
        return 0;
    }

    startRtmpStreamWithoutTranscoding(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let url = obj.url;
        if (url == null) throw "url is null";
        result.result = this._rtcEngine.startRtmpStreamWithoutTranscoding(url);
        return 0;
    }

    startRtmpStreamWithTranscoding(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let url = obj.url;
        if (url == null) throw "url is null";
        let transcoding = obj.transcoding;
        if (transcoding == null) throw "transcoding is null";
        result.result = this._rtcEngine.startRtmpStreamWithTranscoding(url, transcoding);
        return 0;
    }

    updateRtmpTranscoding(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let transcoding = obj.transcoding;
        if (transcoding == null) throw "transcoding is null";
        result.result = this._rtcEngine.updateRtmpTranscoding(transcoding);
        return 0;
    }

    stopRtmpStream(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let url = obj.url;
        if (url == null) throw "url is null";
        result.result = this._rtcEngine.stopRtmpStream(url);
        return 0;
    }

    startLocalVideoTranscoder(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let config = obj.config;
        if (config == null) throw "config is null";
        result.result = this._rtcEngine.startLocalVideoTranscoder(config);
        return 0;
    }

    updateLocalTranscoderConfiguration(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let config = obj.config;
        if (config == null) throw "config is null";
        result.result = this._rtcEngine.updateLocalTranscoderConfiguration(config);
        return 0;
    }

    stopLocalVideoTranscoder(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._rtcEngine.stopLocalVideoTranscoder();
        return 0;
    }

    startPrimaryCameraCapture(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let config = obj.config;
        if (config == null) throw "config is null";
        result.result = this._rtcEngine.startPrimaryCameraCapture(config);
        return 0;
    }

    startSecondaryCameraCapture(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let config = obj.config;
        if (config == null) throw "config is null";
        result.result = this._rtcEngine.startSecondaryCameraCapture(config);
        return 0;
    }

    stopPrimaryCameraCapture(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._rtcEngine.stopPrimaryCameraCapture();
        return 0;
    }

    stopSecondaryCameraCapture(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._rtcEngine.stopSecondaryCameraCapture();
        return 0;
    }

    setCameraDeviceOrientation(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let type = obj.type;
        if (type == null) throw "type is null";
        let orientation = obj.orientation;
        if (orientation == null) throw "orientation is null";
        result.result = this._rtcEngine.setCameraDeviceOrientation(type, orientation);
        return 0;
    }

    setScreenCaptureOrientation(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let type = obj.type;
        if (type == null) throw "type is null";
        let orientation = obj.orientation;
        if (orientation == null) throw "orientation is null";
        result.result = this._rtcEngine.setScreenCaptureOrientation(type, orientation);
        return 0;
    }

    startPrimaryScreenCapture(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let config = obj.config;
        if (config == null) throw "config is null";
        result.result = this._rtcEngine.startPrimaryScreenCapture(config);
        return 0;
    }

    startSecondaryScreenCapture(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let config = obj.config;
        if (config == null) throw "config is null";
        result.result = this._rtcEngine.startSecondaryScreenCapture(config);
        return 0;
    }

    stopPrimaryScreenCapture(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._rtcEngine.stopPrimaryScreenCapture();
        return 0;
    }

    stopSecondaryScreenCapture(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._rtcEngine.stopSecondaryScreenCapture();
        return 0;
    }

    getConnectionState(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._rtcEngine.getConnectionState();
        return 0;
    }

    // registerEventHandler(
    // 	params: string, paramLength: number,
    // 	buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
    // 	let obj = JSON.parse(params) as any;
    // 	let eventHandler = obj.eventHandler;
    // 	if (eventHandler == null) throw "eventHandler is null";
    // 	result.result = this._rtcEngine.registerEventHandler(eventHandler);
    // 	return 0;
    // }

    // unregisterEventHandler(
    // 	params: string, paramLength: number,
    // 	buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
    // 	let obj = JSON.parse(params) as any;
    // 	let eventHandler = obj.eventHandler;
    // 	if (eventHandler == null) throw "eventHandler is null";
    // 	result.result = this._rtcEngine.unregisterEventHandler(eventHandler);
    // 	return 0;
    // }

    setRemoteUserPriority(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let uid = obj.uid;
        if (uid == null) throw "uid is null";
        let userPriority = obj.userPriority;
        if (userPriority == null) throw "userPriority is null";
        result.result = this._rtcEngine.setRemoteUserPriority(uid, userPriority);
        return 0;
    }

    registerPacketObserver(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let observer = obj.observer;
        if (observer == null) throw "observer is null";
        result.result = this._rtcEngine.registerPacketObserver(observer);
        return 0;
    }

    setEncryptionMode(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let encryptionMode = obj.encryptionMode;
        if (encryptionMode == null) throw "encryptionMode is null";
        result.result = this._rtcEngine.setEncryptionMode(encryptionMode);
        return 0;
    }

    setEncryptionSecret(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let secret = obj.secret;
        if (secret == null) throw "secret is null";
        result.result = this._rtcEngine.setEncryptionSecret(secret);
        return 0;
    }

    enableEncryption(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let enabled = obj.enabled;
        if (enabled == null) throw "enabled is null";
        let config = obj.config;
        if (config == null) throw "config is null";
        result.result = this._rtcEngine.enableEncryption(enabled, config);
        return 0;
    }

    createDataStream(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let streamId = obj.streamId;
        if (streamId == null) throw "streamId is null";
        let reliable = obj.reliable;
        if (reliable == null) throw "reliable is null";
        let ordered = obj.ordered;
        if (ordered == null) throw "ordered is null";
        result.result = this._rtcEngine.createDataStream(streamId, reliable, ordered);
        return 0;
    }

    createDataStream2(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let streamId = obj.streamId;
        if (streamId == null) throw "streamId is null";
        let config = obj.config;
        if (config == null) throw "config is null";
        result.result = this._rtcEngine.createDataStream2(streamId, config);
        return 0;
    }

    sendStreamMessage(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let streamId = obj.streamId;
        if (streamId == null) throw "streamId is null";
        let data = obj.data;
        if (data == null) throw "data is null";
        let length = obj.length;
        if (length == null) throw "length is null";
        result.result = this._rtcEngine.sendStreamMessage(streamId, data, length);
        return 0;
    }

    addVideoWatermark(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let watermark = obj.watermark;
        if (watermark == null) throw "watermark is null";
        result.result = this._rtcEngine.addVideoWatermark(watermark);
        return 0;
    }

    addVideoWatermark2(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let watermarkUrl = obj.watermarkUrl;
        if (watermarkUrl == null) throw "watermarkUrl is null";
        let options = obj.options;
        if (options == null) throw "options is null";
        result.result = this._rtcEngine.addVideoWatermark2(watermarkUrl, options);
        return 0;
    }

    clearVideoWatermark(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._rtcEngine.clearVideoWatermark();
        return 0;
    }

    clearVideoWatermarks(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._rtcEngine.clearVideoWatermarks();
        return 0;
    }

    addInjectStreamUrl(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let url = obj.url;
        if (url == null) throw "url is null";
        let config = obj.config;
        if (config == null) throw "config is null";
        result.result = this._rtcEngine.addInjectStreamUrl(url, config);
        return 0;
    }

    removeInjectStreamUrl(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let url = obj.url;
        if (url == null) throw "url is null";
        result.result = this._rtcEngine.removeInjectStreamUrl(url);
        return 0;
    }

    pauseAudio(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._rtcEngine.pauseAudio();
        return 0;
    }

    resumeAudio(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._rtcEngine.resumeAudio();
        return 0;
    }

    enableWebSdkInteroperability(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let enabled = obj.enabled;
        if (enabled == null) throw "enabled is null";
        result.result = this._rtcEngine.enableWebSdkInteroperability(enabled);
        return 0;
    }

    sendCustomReportMessage(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let id = obj.id;
        if (id == null) throw "id is null";
        let category = obj.category;
        if (category == null) throw "category is null";
        let event = obj.event;
        if (event == null) throw "event is null";
        let label = obj.label;
        if (label == null) throw "label is null";
        let value = obj.value;
        if (value == null) throw "value is null";
        result.result = this._rtcEngine.sendCustomReportMessage(id, category, event, label, value);
        return 0;
    }

    registerMediaMetadataObserver(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let observer = obj.observer;
        if (observer == null) throw "observer is null";
        let type = obj.type;
        if (type == null) throw "type is null";
        result.result = this._rtcEngine.registerMediaMetadataObserver(observer, type);
        return 0;
    }

    unregisterMediaMetadataObserver(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let observer = obj.observer;
        if (observer == null) throw "observer is null";
        let type = obj.type;
        if (type == null) throw "type is null";
        result.result = this._rtcEngine.unregisterMediaMetadataObserver(observer, type);
        return 0;
    }

    startAudioFrameDump(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let channel_id = obj.channel_id;
        if (channel_id == null) throw "channel_id is null";
        let user_id = obj.user_id;
        if (user_id == null) throw "user_id is null";
        let location = obj.location;
        if (location == null) throw "location is null";
        let uuid = obj.uuid;
        if (uuid == null) throw "uuid is null";
        let passwd = obj.passwd;
        if (passwd == null) throw "passwd is null";
        let duration_ms = obj.duration_ms;
        if (duration_ms == null) throw "duration_ms is null";
        let auto_upload = obj.auto_upload;
        if (auto_upload == null) throw "auto_upload is null";
        result.result = this._rtcEngine.startAudioFrameDump(channel_id, user_id, location, uuid, passwd, duration_ms, auto_upload);
        return 0;
    }

    stopAudioFrameDump(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let channel_id = obj.channel_id;
        if (channel_id == null) throw "channel_id is null";
        let user_id = obj.user_id;
        if (user_id == null) throw "user_id is null";
        let location = obj.location;
        if (location == null) throw "location is null";
        result.result = this._rtcEngine.stopAudioFrameDump(channel_id, user_id, location);
        return 0;
    }

    registerLocalUserAccount(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let appId = obj.appId;
        if (appId == null) throw "appId is null";
        let userAccount = obj.userAccount;
        if (userAccount == null) throw "userAccount is null";
        result.result = this._rtcEngine.registerLocalUserAccount(appId, userAccount);
        return 0;
    }

    joinChannelWithUserAccount(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let token = obj.token;
        if (token == null) throw "token is null";
        let channelId = obj.channelId;
        if (channelId == null) throw "channelId is null";
        let userAccount = obj.userAccount;
        if (userAccount == null) throw "userAccount is null";
        result.result = this._rtcEngine.joinChannelWithUserAccount(token, channelId, userAccount);
        return 0;
    }

    joinChannelWithUserAccount2(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let token = obj.token;
        if (token == null) throw "token is null";
        let channelId = obj.channelId;
        if (channelId == null) throw "channelId is null";
        let userAccount = obj.userAccount;
        if (userAccount == null) throw "userAccount is null";
        let options = obj.options;
        if (options == null) throw "options is null";
        result.result = this._rtcEngine.joinChannelWithUserAccount2(token, channelId, userAccount, options);
        return 0;
    }

    joinChannelWithUserAccountEx(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let token = obj.token;
        if (token == null) throw "token is null";
        let channelId = obj.channelId;
        if (channelId == null) throw "channelId is null";
        let userAccount = obj.userAccount;
        if (userAccount == null) throw "userAccount is null";
        let options = obj.options;
        if (options == null) throw "options is null";
        let eventHandler = obj.eventHandler;
        if (eventHandler == null) throw "eventHandler is null";
        result.result = this._rtcEngine.joinChannelWithUserAccountEx(token, channelId, userAccount, options, eventHandler);
        return 0;
    }

    getUserInfoByUserAccount(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let userAccount = obj.userAccount;
        if (userAccount == null) throw "userAccount is null";
        let userInfo: agorartc.UserInfo = { uid: 0, userAccount: "" };
        result.result = this._rtcEngine.getUserInfoByUserAccount(userAccount, userInfo);
        result.userInfo = userInfo;
        return 0;
    }

    getUserInfoByUid(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let uid = obj.uid;
        if (uid == null) throw "uid is null";
        let userInfo: agorartc.UserInfo = { uid: 0, userAccount: "" }
        result.result = this._rtcEngine.getUserInfoByUid(uid, userInfo);
        result.userInfo = userInfo;
        return 0;
    }

    startChannelMediaRelay(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let configuration = obj.configuration;
        if (configuration == null) throw "configuration is null";
        result.result = this._rtcEngine.startChannelMediaRelay(configuration);
        return 0;
    }

    updateChannelMediaRelay(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let configuration = obj.configuration;
        if (configuration == null) throw "configuration is null";
        result.result = this._rtcEngine.updateChannelMediaRelay(configuration);
        return 0;
    }

    stopChannelMediaRelay(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._rtcEngine.stopChannelMediaRelay();
        return 0;
    }

    pauseAllChannelMediaRelay(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._rtcEngine.pauseAllChannelMediaRelay();
        return 0;
    }

    resumeAllChannelMediaRelay(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._rtcEngine.resumeAllChannelMediaRelay();
        return 0;
    }

    setDirectCdnStreamingAudioConfiguration(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let profile = obj.profile;
        if (profile == null) throw "profile is null";
        result.result = this._rtcEngine.setDirectCdnStreamingAudioConfiguration(profile);
        return 0;
    }

    setDirectCdnStreamingVideoConfiguration(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let config = obj.config;
        if (config == null) throw "config is null";
        result.result = this._rtcEngine.setDirectCdnStreamingVideoConfiguration(config);
        return 0;
    }

    startDirectCdnStreaming(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let eventHandler = obj.eventHandler;
        if (eventHandler == null) throw "eventHandler is null";
        let publishUrl = obj.publishUrl;
        if (publishUrl == null) throw "publishUrl is null";
        let options = obj.options;
        if (options == null) throw "options is null";
        result.result = this._rtcEngine.startDirectCdnStreaming(eventHandler, publishUrl, options);
        return 0;
    }

    stopDirectCdnStreaming(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._rtcEngine.stopDirectCdnStreaming();
        return 0;
    }

    updateDirectCdnStreamingMediaOptions(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let options = obj.options;
        if (options == null) throw "options is null";
        result.result = this._rtcEngine.updateDirectCdnStreamingMediaOptions(options);
        return 0;
    }

    startRhythmPlayer(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let sound1 = obj.sound1;
        if (sound1 == null) throw "sound1 is null";
        let sound2 = obj.sound2;
        if (sound2 == null) throw "sound2 is null";
        let config = obj.config;
        if (config == null) throw "config is null";
        result.result = this._rtcEngine.startRhythmPlayer(sound1, sound2, config);
        return 0;
    }

    stopRhythmPlayer(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._rtcEngine.stopRhythmPlayer();
        return 0;
    }

    configRhythmPlayer(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let config = obj.config;
        if (config == null) throw "config is null";
        result.result = this._rtcEngine.configRhythmPlayer(config);
        return 0;
    }

    takeSnapshot(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let config = obj.config;
        if (config == null) throw "config is null";
        result.result = this._rtcEngine.takeSnapshot(config);
        return 0;
    }

    setContentInspect(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let config = obj.config;
        if (config == null) throw "config is null";
        result.result = this._rtcEngine.setContentInspect(config);
        return 0;
    }

    adjustCustomAudioPublishVolume(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let sourceId = obj.sourceId;
        if (sourceId == null) throw "sourceId is null";
        let volume = obj.volume;
        if (volume == null) throw "volume is null";
        result.result = this._rtcEngine.adjustCustomAudioPublishVolume(sourceId, volume);
        return 0;
    }

    adjustCustomAudioPlayoutVolume(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let sourceId = obj.sourceId;
        if (sourceId == null) throw "sourceId is null";
        let volume = obj.volume;
        if (volume == null) throw "volume is null";
        result.result = this._rtcEngine.adjustCustomAudioPlayoutVolume(sourceId, volume);
        return 0;
    }

    setCloudProxy(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let proxyType = obj.proxyType;
        if (proxyType == null) throw "proxyType is null";
        result.result = this._rtcEngine.setCloudProxy(proxyType);
        return 0;
    }

    setLocalAccessPoint(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let config = obj.config;
        if (config == null) throw "config is null";
        result.result = this._rtcEngine.setLocalAccessPoint(config);
        return 0;
    }

    enableFishEyeCorrection(
        params1: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params1) as any;
        let enabled = obj.enabled;
        if (enabled == null) throw "enabled is null";
        let params = obj.params;
        if (params == null) throw "params is null";
        result.result = this._rtcEngine.enableFishEyeCorrection(enabled, params);
        return 0;
    }

    setAdvancedAudioOptions(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let options = obj.options;
        if (options == null) throw "options is null";
        result.result = this._rtcEngine.setAdvancedAudioOptions(options);
        return 0;
    }

    setAVSyncSource(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let channelId = obj.channelId;
        if (channelId == null) throw "channelId is null";
        let uid = obj.uid;
        if (uid == null) throw "uid is null";
        result.result = this._rtcEngine.setAVSyncSource(channelId, uid);
        return 0;
    }

    enableVideoImageSource(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let enable = obj.enable;
        if (enable == null) throw "enable is null";
        let options = obj.options;
        if (options == null) throw "options is null";
        result.result = this._rtcEngine.enableVideoImageSource(enable, options);
        return 0;
    }

    enableWirelessAccelerate(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let enabled = obj.enabled;
        if (enabled == null) throw "enabled is null";
        result.result = this._rtcEngine.enableWirelessAccelerate(enabled);
        return 0;
    }


    //IRtcEngineEx
    joinChannelEx(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let token = obj.token;
        if (token == null) throw "token is null";
        let connection = obj.connection;
        if (connection == null) throw "connection is null";
        let options = obj.options;
        if (options == null) throw "options is null";
        result.result = this._rtcEngine.joinChannelEx(token, connection, options);
        return 0;
    }

    leaveChannelEx(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let connection = obj.connection;
        if (connection == null) throw "connection is null";
        result.result = this._rtcEngine.leaveChannelEx(connection);
        return 0;
    }

    updateChannelMediaOptionsEx(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let options = obj.options;
        if (options == null) throw "options is null";
        let connection = obj.connection;
        if (connection == null) throw "connection is null";
        result.result = this._rtcEngine.updateChannelMediaOptionsEx(options, connection);
        return 0;
    }

    setVideoEncoderConfigurationEx(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let config = obj.config;
        if (config == null) throw "config is null";
        let connection = obj.connection;
        if (connection == null) throw "connection is null";
        result.result = this._rtcEngine.setVideoEncoderConfigurationEx(config, connection);
        return 0;
    }

    setupRemoteVideoEx(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let canvas = obj.canvas;
        if (canvas == null) throw "canvas is null";
        let connection = obj.connection;
        if (connection == null) throw "connection is null";
        result.result = this._rtcEngine.setupRemoteVideoEx(canvas, connection);
        return 0;
    }

    muteRemoteAudioStreamEx(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let uid = obj.uid;
        if (uid == null) throw "uid is null";
        let mute = obj.mute;
        if (mute == null) throw "mute is null";
        let connection = obj.connection;
        if (connection == null) throw "connection is null";
        result.result = this._rtcEngine.muteRemoteAudioStreamEx(uid, mute, connection);
        return 0;
    }

    muteRemoteVideoStreamEx(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let uid = obj.uid;
        if (uid == null) throw "uid is null";
        let mute = obj.mute;
        if (mute == null) throw "mute is null";
        let connection = obj.connection;
        if (connection == null) throw "connection is null";
        result.result = this._rtcEngine.muteRemoteVideoStreamEx(uid, mute, connection);
        return 0;
    }

    setRemoteVideoStreamTypeEx(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let uid = obj.uid;
        if (uid == null) throw "uid is null";
        let streamType = obj.streamType;
        if (streamType == null) throw "streamType is null";
        let connection = obj.connection;
        if (connection == null) throw "connection is null";
        result.result = this._rtcEngine.setRemoteVideoStreamTypeEx(uid, streamType, connection);
        return 0;
    }

    setSubscribeAudioBlacklistEx(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let uidList = obj.uidList;
        if (uidList == null) throw "uidList is null";
        let uidNumber = obj.uidNumber;
        if (uidNumber == null) throw "uidNumber is null";
        let connection = obj.connection;
        if (connection == null) throw "connection is null";
        result.result = this._rtcEngine.setSubscribeAudioBlacklistEx(uidList, uidNumber, connection);
        return 0;
    }

    setSubscribeAudioWhitelistEx(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let uidList = obj.uidList;
        if (uidList == null) throw "uidList is null";
        let uidNumber = obj.uidNumber;
        if (uidNumber == null) throw "uidNumber is null";
        let connection = obj.connection;
        if (connection == null) throw "connection is null";
        result.result = this._rtcEngine.setSubscribeAudioWhitelistEx(uidList, uidNumber, connection);
        return 0;
    }

    setSubscribeVideoBlacklistEx(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let uidList = obj.uidList;
        if (uidList == null) throw "uidList is null";
        let uidNumber = obj.uidNumber;
        if (uidNumber == null) throw "uidNumber is null";
        let connection = obj.connection;
        if (connection == null) throw "connection is null";
        result.result = this._rtcEngine.setSubscribeVideoBlacklistEx(uidList, uidNumber, connection);
        return 0;
    }

    setSubscribeVideoWhitelistEx(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let uidList = obj.uidList;
        if (uidList == null) throw "uidList is null";
        let uidNumber = obj.uidNumber;
        if (uidNumber == null) throw "uidNumber is null";
        let connection = obj.connection;
        if (connection == null) throw "connection is null";
        result.result = this._rtcEngine.setSubscribeVideoWhitelistEx(uidList, uidNumber, connection);
        return 0;
    }

    setRemoteVideoSubscriptionOptionsEx(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let uid = obj.uid;
        if (uid == null) throw "uid is null";
        let options = obj.options;
        if (options == null) throw "options is null";
        let connection = obj.connection;
        if (connection == null) throw "connection is null";
        result.result = this._rtcEngine.setRemoteVideoSubscriptionOptionsEx(uid, options, connection);
        return 0;
    }

    setRemoteVoicePositionEx(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let uid = obj.uid;
        if (uid == null) throw "uid is null";
        let pan = obj.pan;
        if (pan == null) throw "pan is null";
        let gain = obj.gain;
        if (gain == null) throw "gain is null";
        let connection = obj.connection;
        if (connection == null) throw "connection is null";
        result.result = this._rtcEngine.setRemoteVoicePositionEx(uid, pan, gain, connection);
        return 0;
    }

    setRemoteUserSpatialAudioParamsEx(
        params1: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params1) as any;
        let uid = obj.uid;
        if (uid == null) throw "uid is null";
        let params = obj.params;
        if (params == null) throw "params is null";
        let connection = obj.connection;
        if (connection == null) throw "connection is null";
        result.result = this._rtcEngine.setRemoteUserSpatialAudioParamsEx(uid, params, connection);
        return 0;
    }

    setRemoteRenderModeEx(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let uid = obj.uid;
        if (uid == null) throw "uid is null";
        let renderMode = obj.renderMode;
        if (renderMode == null) throw "renderMode is null";
        let mirrorMode = obj.mirrorMode;
        if (mirrorMode == null) throw "mirrorMode is null";
        let connection = obj.connection;
        if (connection == null) throw "connection is null";
        result.result = this._rtcEngine.setRemoteRenderModeEx(uid, renderMode, mirrorMode, connection);
        return 0;
    }

    enableLoopbackRecordingEx(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let connection = obj.connection;
        if (connection == null) throw "connection is null";
        let enabled = obj.enabled;
        if (enabled == null) throw "enabled is null";
        let deviceName = obj.deviceName;
        if (deviceName == null) throw "deviceName is null";
        result.result = this._rtcEngine.enableLoopbackRecordingEx(connection, enabled, deviceName);
        return 0;
    }

    getConnectionStateEx(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let connection = obj.connection;
        if (connection == null) throw "connection is null";
        result.result = this._rtcEngine.getConnectionStateEx(connection);
        return 0;
    }

    enableEncryptionEx(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let connection = obj.connection;
        if (connection == null) throw "connection is null";
        let enabled = obj.enabled;
        if (enabled == null) throw "enabled is null";
        let config = obj.config;
        if (config == null) throw "config is null";
        result.result = this._rtcEngine.enableEncryptionEx(connection, enabled, config);
        return 0;
    }

    createDataStreamEx(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let reliable = obj.reliable;
        if (reliable == null) throw "reliable is null";
        let ordered = obj.ordered;
        if (ordered == null) throw "ordered is null";
        let connection = obj.connection;
        if (connection == null) throw "connection is null";
        result.result = this._rtcEngine.createDataStreamEx(reliable, ordered, connection);
        result.streamId = 0;
        return 0;
    }

    createDataStreamEx2(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let config = obj.config;
        if (config == null) throw "config is null";
        let connection = obj.connection;
        if (connection == null) throw "connection is null";
        result.result = this._rtcEngine.createDataStreamEx2(config, connection);
        result.streamId = 0;
        return 0;
    }

    sendStreamMessageEx(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let streamId = obj.streamId;
        if (streamId == null) throw "streamId is null";
        let data = obj.data;
        if (data == null) throw "data is null";
        let length = obj.length;
        if (length == null) throw "length is null";
        let connection = obj.connection;
        if (connection == null) throw "connection is null";
        result.result = this._rtcEngine.sendStreamMessageEx(streamId, data, length, connection);
        return 0;
    }

    addVideoWatermarkEx(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let watermarkUrl = obj.watermarkUrl;
        if (watermarkUrl == null) throw "watermarkUrl is null";
        let options = obj.options;
        if (options == null) throw "options is null";
        let connection = obj.connection;
        if (connection == null) throw "connection is null";
        result.result = this._rtcEngine.addVideoWatermarkEx(watermarkUrl, options, connection);
        return 0;
    }

    clearVideoWatermarkEx(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let connection = obj.connection;
        if (connection == null) throw "connection is null";
        result.result = this._rtcEngine.clearVideoWatermarkEx(connection);
        return 0;
    }

    sendCustomReportMessageEx(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let id = obj.id;
        if (id == null) throw "id is null";
        let category = obj.category;
        if (category == null) throw "category is null";
        let event = obj.event;
        if (event == null) throw "event is null";
        let label = obj.label;
        if (label == null) throw "label is null";
        let value = obj.value;
        if (value == null) throw "value is null";
        let connection = obj.connection;
        if (connection == null) throw "connection is null";
        result.result = this._rtcEngine.sendCustomReportMessageEx(id, category, event, label, value, connection);
        return 0;
    }

    enableAudioVolumeIndicationEx(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let interval = obj.interval;
        if (interval == null) throw "interval is null";
        let smooth = obj.smooth;
        if (smooth == null) throw "smooth is null";
        let reportVad = obj.reportVad;
        if (reportVad == null) throw "reportVad is null";
        let connection = obj.connection;
        if (connection == null) throw "connection is null";
        result.result = this._rtcEngine.enableAudioVolumeIndicationEx(interval, smooth, reportVad, connection);
        return 0;
    }

    getUserInfoByUserAccountEx(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let userAccount = obj.userAccount;
        if (userAccount == null) throw "userAccount is null";
        let userInfo: agorartc.UserInfo = { userAccount: "", uid: 0 };
        let connection = obj.connection;
        if (connection == null) throw "connection is null";
        result.result = this._rtcEngine.getUserInfoByUserAccountEx(userAccount, userInfo, connection);
        result.userInfo = userInfo;
        return 0;
    }

    getUserInfoByUidEx(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let uid = obj.uid;
        if (uid == null) throw "uid is null";
        let userInfo: agorartc.UserInfo = { userAccount: "", uid: 0 };
        let connection = obj.connection;
        if (connection == null) throw "connection is null";
        result.result = this._rtcEngine.getUserInfoByUidEx(uid, userInfo, connection);
        result.userInfo = userInfo;
        return 0;
    }

    setVideoProfileEx(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let width = obj.width;
        if (width == null) throw "width is null";
        let height = obj.height;
        if (height == null) throw "height is null";
        let frameRate = obj.frameRate;
        if (frameRate == null) throw "frameRate is null";
        let bitrate = obj.bitrate;
        if (bitrate == null) throw "bitrate is null";
        result.result = this._rtcEngine.setVideoProfileEx(width, height, frameRate, bitrate);
        return 0;
    }

    enableDualStreamModeEx(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let sourceType = obj.sourceType;
        if (sourceType == null) throw "sourceType is null";
        let enabled = obj.enabled;
        if (enabled == null) throw "enabled is null";
        let streamConfig = obj.streamConfig;
        if (streamConfig == null) throw "streamConfig is null";
        let connection = obj.connection;
        if (connection == null) throw "connection is null";
        result.result = this._rtcEngine.enableDualStreamModeEx(sourceType, enabled, streamConfig, connection);
        return 0;
    }

    setDualStreamModeEx(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let sourceType = obj.sourceType;
        if (sourceType == null) throw "sourceType is null";
        let mode = obj.mode;
        if (mode == null) throw "mode is null";
        let streamConfig = obj.streamConfig;
        if (streamConfig == null) throw "streamConfig is null";
        let connection = obj.connection;
        if (connection == null) throw "connection is null";
        result.result = this._rtcEngine.setDualStreamModeEx(sourceType, mode, streamConfig, connection);
        return 0;
    }

    // enableWirelessAccelerate(
    // 	params: string, paramLength: number,
    // 	buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
    // 	let obj = JSON.parse(params) as any;
    // 	let enabled = obj.enabled;
    // 	if (enabled == null) throw "enabled is null";
    // 	result.result = this._rtcEngine.enableWirelessAccelerate(enabled);
    // 	return 0;
    // }

    takeSnapshotEx(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let connection = obj.connection;
        if (connection == null) throw "connection is null";
        let uid = obj.uid;
        if (uid == null) throw "uid is null";
        let filePath = obj.filePath;
        if (filePath == null) throw "filePath is null";
        result.result = this._rtcEngine.takeSnapshotEx(connection, uid, filePath);
        return 0;
    }


    //ILocalSpatialAudioEngine
    // initialize(
    // 	params: string, paramLength: number,
    // 	buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
    // 	let obj = JSON.parse(params) as any;
    // 	let config = obj.config;
    // 	if (config == null) throw "config is null";
    // 	result.result = this._rtcEngine.initialize(config);
    // 	return 0;
    // }

    updateRemotePosition(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let uid = obj.uid;
        if (uid == null) throw "uid is null";
        let posInfo = obj.posInfo;
        if (posInfo == null) throw "posInfo is null";
        result.result = this._rtcEngine.updateRemotePosition(uid, posInfo);
        return 0;
    }

    updateRemotePositionEx(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let uid = obj.uid;
        if (uid == null) throw "uid is null";
        let posInfo = obj.posInfo;
        if (posInfo == null) throw "posInfo is null";
        let connection = obj.connection;
        if (connection == null) throw "connection is null";
        result.result = this._rtcEngine.updateRemotePositionEx(uid, posInfo, connection);
        return 0;
    }

    removeRemotePosition(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let uid = obj.uid;
        if (uid == null) throw "uid is null";
        result.result = this._rtcEngine.removeRemotePosition(uid);
        return 0;
    }

    removeRemotePositionEx(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let uid = obj.uid;
        if (uid == null) throw "uid is null";
        let connection = obj.connection;
        if (connection == null) throw "connection is null";
        result.result = this._rtcEngine.removeRemotePositionEx(uid, connection);
        return 0;
    }

    clearRemotePositions(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._rtcEngine.clearRemotePositions();
        return 0;
    }

    clearRemotePositionsEx(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let connection = obj.connection;
        if (connection == null) throw "connection is null";
        result.result = this._rtcEngine.clearRemotePositionsEx(connection);
        return 0;
    }


    //IAudioDeviceManager
    enumeratePlaybackDevices(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        // let obj = JSON.parse(params) as any;
        result.result = this._rtcEngine.enumeratePlaybackDevices();
        return 0;
    }

    enumerateRecordingDevices(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        // let obj = JSON.parse(params) as any;
        result.result = this._rtcEngine.enumerateRecordingDevices();
        return 0;
    }

    setPlaybackDevice(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let deviceId = obj.deviceId;
        if (deviceId == null) throw "deviceId is null";
        result.result = this._rtcEngine.setPlaybackDevice(deviceId);
        return 0;
    }

    getPlaybackDevice(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        // let deviceId = obj.deviceId;
        // if (deviceId == null) throw "deviceId is null";
        result.result = this._rtcEngine.getPlaybackDevice();
        return 0;
    }

    getPlaybackDeviceInfo(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        // let obj = JSON.parse(params) as any;
        // let deviceId = obj.deviceId;
        // if (deviceId == null) throw "deviceId is null";
        // let deviceName = obj.deviceName;
        // if (deviceName == null) throw "deviceName is null";
        result.result = this._rtcEngine.getPlaybackDeviceInfo();
        return 0;
    }

    setPlaybackDeviceVolume(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let volume = obj.volume;
        if (volume == null) throw "volume is null";
        result.result = this._rtcEngine.setPlaybackDeviceVolume(volume);
        return 0;
    }

    getPlaybackDeviceVolume(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        // let volume = obj.volume;
        // if (volume == null) throw "volume is null";
        result.result = this._rtcEngine.getPlaybackDeviceVolume();
        return 0;
    }

    setRecordingDevice(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let deviceId = obj.deviceId;
        if (deviceId == null) throw "deviceId is null";
        result.result = this._rtcEngine.setRecordingDevice(deviceId);
        return 0;
    }

    getRecordingDevice(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        // let deviceId = obj.deviceId;
        // if (deviceId == null) throw "deviceId is null";
        result.result = this._rtcEngine.getRecordingDevice();
        return 0;
    }

    getRecordingDeviceInfo(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        // let deviceId = obj.deviceId;
        // if (deviceId == null) throw "deviceId is null";
        // let deviceName = obj.deviceName;
        // if (deviceName == null) throw "deviceName is null";
        result.result = this._rtcEngine.getRecordingDeviceInfo();
        return 0;
    }

    setRecordingDeviceVolume(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let volume = obj.volume;
        if (volume == null) throw "volume is null";
        result.result = this._rtcEngine.setRecordingDeviceVolume(volume);
        return 0;
    }

    getRecordingDeviceVolume(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        // let volume = obj.volume;
        // if (volume == null) throw "volume is null";
        result.result = this._rtcEngine.getRecordingDeviceVolume();
        return 0;
    }

    setPlaybackDeviceMute(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let mute = obj.mute;
        if (mute == null) throw "mute is null";
        result.result = this._rtcEngine.setPlaybackDeviceMute(mute);
        return 0;
    }

    getPlaybackDeviceMute(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let mute = obj.mute;
        if (mute == null) throw "mute is null";
        result.result = this._rtcEngine.getPlaybackDeviceMute(mute);
        return 0;
    }

    setRecordingDeviceMute(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let mute = obj.mute;
        if (mute == null) throw "mute is null";
        result.result = this._rtcEngine.setRecordingDeviceMute(mute);
        return 0;
    }

    getRecordingDeviceMute(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let mute = obj.mute;
        if (mute == null) throw "mute is null";
        result.result = this._rtcEngine.getRecordingDeviceMute(mute);
        return 0;
    }

    startPlaybackDeviceTest(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let testAudioFilePath = obj.testAudioFilePath;
        if (testAudioFilePath == null) throw "testAudioFilePath is null";
        result.result = this._rtcEngine.startPlaybackDeviceTest(testAudioFilePath);
        return 0;
    }

    stopPlaybackDeviceTest(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._rtcEngine.stopPlaybackDeviceTest();
        return 0;
    }

    startRecordingDeviceTest(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let indicationInterval = obj.indicationInterval;
        if (indicationInterval == null) throw "indicationInterval is null";
        result.result = this._rtcEngine.startRecordingDeviceTest(indicationInterval);
        return 0;
    }

    stopRecordingDeviceTest(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._rtcEngine.stopRecordingDeviceTest();
        return 0;
    }

    startAudioDeviceLoopbackTest(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let indicationInterval = obj.indicationInterval;
        if (indicationInterval == null) throw "indicationInterval is null";
        result.result = this._rtcEngine.startAudioDeviceLoopbackTest(indicationInterval);
        return 0;
    }

    stopAudioDeviceLoopbackTest(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._rtcEngine.stopAudioDeviceLoopbackTest();
        return 0;
    }

    followSystemPlaybackDevice(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let enable = obj.enable;
        if (enable == null) throw "enable is null";
        result.result = this._rtcEngine.followSystemPlaybackDevice(enable);
        return 0;
    }

    followSystemRecordingDevice(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let enable = obj.enable;
        if (enable == null) throw "enable is null";
        result.result = this._rtcEngine.followSystemRecordingDevice(enable);
        return 0;
    }

    //IMediaPlayer
    open(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId == null) throw "playerId is null";
        let url = obj.url;
        if (url == null) throw "url is null";
        let startPos = obj.startPos;
        if (startPos == null) throw "startPos is null";
        result.result = this._rtcEngine.open(playerId, url, startPos);
        return 0;
    }

    openWithCustomSource(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId == null) throw "playerId is null";
        let startPos = obj.startPos;
        if (startPos == null) throw "startPos is null";
        let provider = obj.provider;
        if (provider == null) throw "provider is null";
        result.result = this._rtcEngine.openWithCustomSource(playerId, startPos, provider);
        return 0;
    }

    openWithMediaSource(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId == null) throw "playerId is null";
        let source = obj.source;
        if (source == null) throw "source is null";
        result.result = this._rtcEngine.openWithMediaSource(playerId, source);
        return 0;
    }

    play(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId == null) throw "playerId is null";
        result.result = this._rtcEngine.play(playerId);
        return 0;
    }

    pause(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId == null) throw "playerId is null";
        result.result = this._rtcEngine.pause(playerId);
        return 0;
    }

    stop(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId == null) throw "playerId is null";
        result.result = this._rtcEngine.stop(playerId);
        return 0;
    }

    resume(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId == null) throw "playerId is null";
        result.result = this._rtcEngine.resume(playerId);
        return 0;
    }

    seek(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId == null) throw "playerId is null";
        let newPos = obj.newPos;
        if (newPos == null) throw "newPos is null";
        result.result = this._rtcEngine.seek(playerId, newPos);
        return 0;
    }

    setAudioPitch(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId == null) throw "playerId is null";
        let pitch = obj.pitch;
        if (pitch == null) throw "pitch is null";
        result.result = this._rtcEngine.setAudioPitch(playerId, pitch);
        return 0;
    }

    getDuration(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId == null) throw "playerId is null";
        let duration = obj.duration;
        if (duration == null) throw "duration is null";
        result.result = this._rtcEngine.getDuration(playerId, duration);
        return 0;
    }

    getPlayPosition(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId == null) throw "playerId is null";
        let pos = obj.pos;
        if (pos == null) throw "pos is null";
        result.result = this._rtcEngine.getPlayPosition(playerId, pos);
        return 0;
    }

    getStreamCount(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId == null) throw "playerId is null";
        let count = obj.count;
        if (count == null) throw "count is null";
        result.result = this._rtcEngine.getStreamCount(playerId, count);
        return 0;
    }

    getStreamInfo(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId == null) throw "playerId is null";
        let index = obj.index;
        if (index == null) throw "index is null";
        let info = obj.info;
        if (info == null) throw "info is null";
        result.result = this._rtcEngine.getStreamInfo(playerId, index, info);
        return 0;
    }

    setLoopCount(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId == null) throw "playerId is null";
        let loopCount = obj.loopCount;
        if (loopCount == null) throw "loopCount is null";
        result.result = this._rtcEngine.setLoopCount(playerId, loopCount);
        return 0;
    }

    muteAudio(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId == null) throw "playerId is null";
        let audio_mute = obj.audio_mute;
        if (audio_mute == null) throw "audio_mute is null";
        result.result = this._rtcEngine.muteAudio(playerId, audio_mute);
        return 0;
    }

    isAudioMuted(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId == null) throw "playerId is null";
        result.result = this._rtcEngine.isAudioMuted(playerId);
        return 0;
    }

    muteVideo(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId == null) throw "playerId is null";
        let video_mute = obj.video_mute;
        if (video_mute == null) throw "video_mute is null";
        result.result = this._rtcEngine.muteVideo(playerId, video_mute);
        return 0;
    }

    isVideoMuted(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId == null) throw "playerId is null";
        result.result = this._rtcEngine.isVideoMuted(playerId);
        return 0;
    }

    setPlaybackSpeed(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId == null) throw "playerId is null";
        let speed = obj.speed;
        if (speed == null) throw "speed is null";
        result.result = this._rtcEngine.setPlaybackSpeed(playerId, speed);
        return 0;
    }

    selectAudioTrack(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId == null) throw "playerId is null";
        let index = obj.index;
        if (index == null) throw "index is null";
        result.result = this._rtcEngine.selectAudioTrack(playerId, index);
        return 0;
    }

    setPlayerOption(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId == null) throw "playerId is null";
        let key = obj.key;
        if (key == null) throw "key is null";
        let value = obj.value;
        if (value == null) throw "value is null";
        result.result = this._rtcEngine.setPlayerOption(playerId, key, value);
        return 0;
    }

    setPlayerOption2(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId == null) throw "playerId is null";
        let key = obj.key;
        if (key == null) throw "key is null";
        let value = obj.value;
        if (value == null) throw "value is null";
        result.result = this._rtcEngine.setPlayerOption2(playerId, key, value);
        return 0;
    }

    takeScreenshot(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId == null) throw "playerId is null";
        let filename = obj.filename;
        if (filename == null) throw "filename is null";
        result.result = this._rtcEngine.takeScreenshot(playerId, filename);
        return 0;
    }

    selectInternalSubtitle(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId == null) throw "playerId is null";
        let index = obj.index;
        if (index == null) throw "index is null";
        result.result = this._rtcEngine.selectInternalSubtitle(playerId, index);
        return 0;
    }

    setExternalSubtitle(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId == null) throw "playerId is null";
        let url = obj.url;
        if (url == null) throw "url is null";
        result.result = this._rtcEngine.setExternalSubtitle(playerId, url);
        return 0;
    }

    getState(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId == null) throw "playerId is null";
        result.result = this._rtcEngine.getState(playerId);
        return 0;
    }

    mute(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId == null) throw "playerId is null";
        let mute = obj.mute;
        if (mute == null) throw "mute is null";
        result.result = this._rtcEngine.mute(playerId, mute);
        return 0;
    }

    getMute(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId == null) throw "playerId is null";
        result.result = this._rtcEngine.getMute(playerId, result);
        return 0;
    }

    adjustPlayoutVolume(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId == null) throw "playerId is null";
        let volume = obj.volume;
        if (volume == null) throw "volume is null";
        result.result = this._rtcEngine.adjustPlayoutVolume(playerId, volume);
        return 0;
    }

    getPlayoutVolume(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId == null) throw "playerId is null";
        let volume = obj.volume;
        if (volume == null) throw "volume is null";
        result.result = this._rtcEngine.getPlayoutVolume(playerId, volume);
        return 0;
    }

    adjustPublishSignalVolume(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId == null) throw "playerId is null";
        let volume = obj.volume;
        if (volume == null) throw "volume is null";
        result.result = this._rtcEngine.adjustPublishSignalVolume(playerId, volume);
        return 0;
    }

    getPublishSignalVolume(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId == null) throw "playerId is null";
        let volume = obj.volume;
        if (volume == null) throw "volume is null";
        result.result = this._rtcEngine.getPublishSignalVolume(playerId, volume);
        return 0;
    }

    setView(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId == null) throw "playerId is null";
        let view = obj.view;
        if (view == null) throw "view is null";
        result.result = this._rtcEngine.setView(playerId, view);
        return 0;
    }

    setRenderMode(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId == null) throw "playerId is null";
        let renderMode = obj.renderMode;
        if (renderMode == null) throw "renderMode is null";
        result.result = this._rtcEngine.setRenderMode(playerId, renderMode);
        return 0;
    }

    registerPlayerSourceObserver(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId == null) throw "playerId is null";
        let observer = obj.observer;
        if (observer == null) throw "observer is null";
        result.result = this._rtcEngine.registerPlayerSourceObserver(playerId, observer);
        return 0;
    }

    unregisterPlayerSourceObserver(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId == null) throw "playerId is null";
        let observer = obj.observer;
        if (observer == null) throw "observer is null";
        result.result = this._rtcEngine.unregisterPlayerSourceObserver(playerId, observer);
        return 0;
    }

    MediaPlayer_registerAudioFrameObserver(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId == null) throw "playerId is null";
        let observer = obj.observer;
        if (observer == null) throw "observer is null";
        result.result = this._rtcEngine.MediaPlayer_registerAudioFrameObserver(playerId, observer);
        return 0;
    }

    MediaPlayer_registerAudioFrameObserver2(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId == null) throw "playerId is null";
        let observer = obj.observer;
        if (observer == null) throw "observer is null";
        let mode = obj.mode;
        if (mode == null) throw "mode is null";
        result.result = this._rtcEngine.MediaPlayer_registerAudioFrameObserver2(playerId, observer, mode);
        return 0;
    }

    MediaPlayer_unregisterAudioFrameObserver(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId == null) throw "playerId is null";
        let observer = obj.observer;
        if (observer == null) throw "observer is null";
        result.result = this._rtcEngine.MediaPlayer_unregisterAudioFrameObserver(playerId, observer);
        return 0;
    }

    MediaPlayer_registerVideoFrameObserver(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId == null) throw "playerId is null";
        let observer = obj.observer;
        if (observer == null) throw "observer is null";
        result.result = this._rtcEngine.MediaPlayer_registerVideoFrameObserver(playerId, observer);
        return 0;
    }

    registerVideoEncodedImageReceiver(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let receiver = obj.receiver;
        if (receiver == null) throw "receiver is null";
        result.result = this._rtcEngine.registerVideoEncodedImageReceiver(receiver);
        return 0;
    }

    MediaPlayer_unregisterVideoFrameObserver(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId == null) throw "playerId is null";
        let observer = obj.observer;
        if (observer == null) throw "observer is null";
        result.result = this._rtcEngine.MediaPlayer_unregisterVideoFrameObserver(playerId, observer);
        return 0;
    }

    registerMediaPlayerAudioSpectrumObserver(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId == null) throw "playerId is null";
        let observer = obj.observer;
        if (observer == null) throw "observer is null";
        let intervalInMS = obj.intervalInMS;
        if (intervalInMS == null) throw "intervalInMS is null";
        result.result = this._rtcEngine.registerMediaPlayerAudioSpectrumObserver(observer, intervalInMS);
        return 0;
    }

    unregisterMediaPlayerAudioSpectrumObserver(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId == null) throw "playerId is null";
        let observer = obj.observer;
        if (observer == null) throw "observer is null";
        result.result = this._rtcEngine.unregisterMediaPlayerAudioSpectrumObserver(playerId, observer);
        return 0;
    }

    setAudioDualMonoMode(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId == null) throw "playerId is null";
        let mode = obj.mode;
        if (mode == null) throw "mode is null";
        result.result = this._rtcEngine.setAudioDualMonoMode(playerId, mode);
        return 0;
    }

    getPlayerSdkVersion(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId == null) throw "playerId is null";
        result.result = this._rtcEngine.getPlayerSdkVersion(playerId);
        return 0;
    }

    getPlaySrc(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId == null) throw "playerId is null";
        result.result = this._rtcEngine.getPlaySrc(playerId);
        return 0;
    }

    openWithAgoraCDNSrc(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId == null) throw "playerId is null";
        let src = obj.src;
        if (src == null) throw "src is null";
        let startPos = obj.startPos;
        if (startPos == null) throw "startPos is null";
        result.result = this._rtcEngine.openWithAgoraCDNSrc(playerId, src, startPos);
        return 0;
    }

    getAgoraCDNLineCount(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId == null) throw "playerId is null";
        result.result = this._rtcEngine.getAgoraCDNLineCount(playerId);
        return 0;
    }

    switchAgoraCDNLineByIndex(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId == null) throw "playerId is null";
        let index = obj.index;
        if (index == null) throw "index is null";
        result.result = this._rtcEngine.switchAgoraCDNLineByIndex(playerId, index);
        return 0;
    }

    getCurrentAgoraCDNIndex(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId == null) throw "playerId is null";
        result.result = this._rtcEngine.getCurrentAgoraCDNIndex(playerId);
        return 0;
    }

    enableAutoSwitchAgoraCDN(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId == null) throw "playerId is null";
        let enable = obj.enable;
        if (enable == null) throw "enable is null";
        result.result = this._rtcEngine.enableAutoSwitchAgoraCDN(playerId, enable);
        return 0;
    }

    renewAgoraCDNSrcToken(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId == null) throw "playerId is null";
        let token = obj.token;
        if (token == null) throw "token is null";
        let ts = obj.ts;
        if (ts == null) throw "ts is null";
        result.result = this._rtcEngine.renewAgoraCDNSrcToken(playerId, token, ts);
        return 0;
    }

    switchAgoraCDNSrc(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId == null) throw "playerId is null";
        let src = obj.src;
        if (src == null) throw "src is null";
        let syncPts = obj.syncPts;
        if (syncPts == null) throw "syncPts is null";
        result.result = this._rtcEngine.switchAgoraCDNSrc(playerId, src, syncPts);
        return 0;
    }

    switchSrc(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId == null) throw "playerId is null";
        let src = obj.src;
        if (src == null) throw "src is null";
        let syncPts = obj.syncPts;
        if (syncPts == null) throw "syncPts is null";
        result.result = this._rtcEngine.switchSrc(playerId, src, syncPts);
        return 0;
    }

    preloadSrc(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId == null) throw "playerId is null";
        let src = obj.src;
        if (src == null) throw "src is null";
        let startPos = obj.startPos;
        if (startPos == null) throw "startPos is null";
        result.result = this._rtcEngine.preloadSrc(playerId, src, startPos);
        return 0;
    }

    playPreloadedSrc(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId == null) throw "playerId is null";
        let src = obj.src;
        if (src == null) throw "src is null";
        result.result = this._rtcEngine.playPreloadedSrc(playerId, src);
        return 0;
    }

    unloadSrc(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId == null) throw "playerId is null";
        let src = obj.src;
        if (src == null) throw "src is null";
        result.result = this._rtcEngine.unloadSrc(playerId, src);
        return 0;
    }

    setSpatialAudioParams(
        params1: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params1) as any;
        let playerId = obj.playerId;
        if (playerId == null) throw "playerId is null";
        let params = obj.params;
        if (params == null) throw "params is null";
        result.result = this._rtcEngine.setSpatialAudioParams(playerId, params);
        return 0;
    }

    setSoundPositionParams(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId == null) throw "playerId is null";
        let pan = obj.pan;
        if (pan == null) throw "pan is null";
        let gain = obj.gain;
        if (gain == null) throw "gain is null";
        result.result = this._rtcEngine.setSoundPositionParams(playerId, pan, gain);
        return 0;
    }
}