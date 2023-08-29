import { IrisRtcEngine } from '../../engine/IrisRtcEngine';
import { MediaEngineImpl } from '../../impl/MediaEngineImpl';
import { Action } from '../../util/AgoraActionQueue';
import { IMediaEngine } from '../interface/IMediaEngine';
import * as agorartc from '../rtc_types/Index';

export class IMediaEngineDispatch {


    private _impl: IMediaEngine;

    constructor(engine: IrisRtcEngine) {
        this._impl = new MediaEngineImpl(engine);
    }

    //IMediaEngine
    registerAudioFrameObserver(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let observer = obj.observer;
        if (observer === undefined) throw "observer is undefined";
        result.result = this._impl.registerAudioFrameObserver(observer);
        return 0;
    }

    registerVideoFrameObserver(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let observer = obj.observer;
        if (observer === undefined) throw "observer is undefined";
        result.result = this._impl.registerVideoFrameObserver(observer);
        return 0;
    }

    registerVideoEncodedImageReceiver(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let receiver = obj.receiver;
        if (receiver === undefined) throw "receiver is undefined";
        result.result = this._impl.registerVideoEncodedImageReceiver(receiver);
        return 0;
    }

    pushAudioFrame(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let type = obj.type;
        if (type === undefined) throw "type is undefined";
        let frame = obj.frame;
        if (frame === undefined) throw "frame is undefined";
        let wrap = obj.wrap;
        if (wrap === undefined) throw "wrap is undefined";
        let sourceId = obj.sourceId;
        if (sourceId === undefined) throw "sourceId is undefined";
        result.result = this._impl.pushAudioFrame(type, frame, wrap, sourceId);
        return 0;
    }

    pushCaptureAudioFrame(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let frame = obj.frame;
        if (frame === undefined) throw "frame is undefined";
        result.result = this._impl.pushCaptureAudioFrame(frame);
        return 0;
    }

    pushReverseAudioFrame(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let frame = obj.frame;
        if (frame === undefined) throw "frame is undefined";
        result.result = this._impl.pushReverseAudioFrame(frame);
        return 0;
    }

    pushDirectAudioFrame(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let frame = obj.frame;
        if (frame === undefined) throw "frame is undefined";
        result.result = this._impl.pushDirectAudioFrame(frame);
        return 0;
    }

    pullAudioFrame(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let frame = obj.frame;
        if (frame === undefined) throw "frame is undefined";
        result.result = this._impl.pullAudioFrame(frame);
        return 0;
    }

    setExternalVideoSource(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let enabled = obj.enabled;
        if (enabled === undefined) throw "enabled is undefined";
        let useTexture = obj.useTexture;
        if (useTexture === undefined) throw "useTexture is undefined";
        let sourceType = obj.sourceType;
        if (sourceType === undefined) throw "sourceType is undefined";
        result.result = this._impl.setExternalVideoSource(enabled, useTexture, sourceType);
        return 0;
    }

    setExternalAudioSource(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let enabled = obj.enabled;
        if (enabled === undefined) throw "enabled is undefined";
        let sampleRate = obj.sampleRate;
        if (sampleRate === undefined) throw "sampleRate is undefined";
        let channels = obj.channels;
        if (channels === undefined) throw "channels is undefined";
        let sourceNumber = obj.sourceNumber;
        if (sourceNumber === undefined) throw "sourceNumber is undefined";
        let localPlayback = obj.localPlayback;
        if (localPlayback === undefined) throw "localPlayback is undefined";
        let publish = obj.publish;
        if (publish === undefined) throw "publish is undefined";
        result.result = this._impl.setExternalAudioSource(enabled, sampleRate, channels, sourceNumber, localPlayback, publish);
        return 0;
    }

    setExternalAudioSink(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let sampleRate = obj.sampleRate;
        if (sampleRate === undefined) throw "sampleRate is undefined";
        let channels = obj.channels;
        if (channels === undefined) throw "channels is undefined";
        result.result = this._impl.setExternalAudioSink(sampleRate, channels);
        return 0;
    }

    setDirectExternalAudioSource(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let enable = obj.enable;
        if (enable === undefined) throw "enable is undefined";
        let localPlayback = obj.localPlayback;
        if (localPlayback === undefined) throw "localPlayback is undefined";
        result.result = this._impl.setDirectExternalAudioSource(enable, localPlayback);
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

    pushVideoFrame(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let frame = obj.frame;
        if (frame === undefined) throw "frame is undefined";
        result.result = this._impl.pushVideoFrame(frame);
        return 0;
    }

    pushVideoFrame2(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let frame = obj.frame;
        if (frame === undefined) throw "frame is undefined";
        let connection = obj.connection;
        if (connection === undefined) throw "connection is undefined";
        result.result = this._impl.pushVideoFrame2(frame, connection);
        return 0;
    }

    pushEncodedVideoImage(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let imageBuffer = obj.imageBuffer;
        if (imageBuffer === undefined) throw "imageBuffer is undefined";
        let length = obj.length;
        if (length === undefined) throw "length is undefined";
        let videoEncodedFrameInfo = obj.videoEncodedFrameInfo;
        if (videoEncodedFrameInfo === undefined) throw "videoEncodedFrameInfo is undefined";
        result.result = this._impl.pushEncodedVideoImage(imageBuffer, length, videoEncodedFrameInfo);
        return 0;
    }
}