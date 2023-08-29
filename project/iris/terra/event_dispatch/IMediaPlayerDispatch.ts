import { IrisRtcEngine } from "../../engine/IrisRtcEngine";
import { MediaPlayerImpl } from "../../impl/MediaPlayerImpl";
import { Action } from "../../util/AgoraActionQueue";
import { IMediaPlayer } from "../interface/IMediaPlayer";
import * as agorartc from '../rtc_types/Index';


export class IMediaPlayerDispatch {

    private _impl: IMediaPlayer;

    constructor(engine: IrisRtcEngine) {
        this._impl = new MediaPlayerImpl(engine);
    }

    open(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId === undefined) throw "playerId is undefined";
        let url = obj.url;
        if (url === undefined) throw "url is undefined";
        let startPos = obj.startPos;
        if (startPos === undefined) throw "startPos is undefined";
        result.result = this._impl.open(playerId, url, startPos);
        return 0;
    }

    openWithCustomSource(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId === undefined) throw "playerId is undefined";
        let startPos = obj.startPos;
        if (startPos === undefined) throw "startPos is undefined";
        let provider = obj.provider;
        if (provider === undefined) throw "provider is undefined";
        result.result = this._impl.openWithCustomSource(playerId, startPos, provider);
        return 0;
    }

    openWithMediaSource(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId === undefined) throw "playerId is undefined";
        let source = obj.source;
        if (source === undefined) throw "source is undefined";
        result.result = this._impl.openWithMediaSource(playerId, source);
        return 0;
    }

    play(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId === undefined) throw "playerId is undefined";
        result.result = this._impl.play(playerId);
        return 0;
    }

    pause(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId === undefined) throw "playerId is undefined";
        result.result = this._impl.pause(playerId);
        return 0;
    }

    stop(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId === undefined) throw "playerId is undefined";
        result.result = this._impl.stop(playerId);
        return 0;
    }

    resume(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId === undefined) throw "playerId is undefined";
        result.result = this._impl.resume(playerId);
        return 0;
    }

    seek(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId === undefined) throw "playerId is undefined";
        let newPos = obj.newPos;
        if (newPos === undefined) throw "newPos is undefined";
        result.result = this._impl.seek(playerId, newPos);
        return 0;
    }

    setAudioPitch(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId === undefined) throw "playerId is undefined";
        let pitch = obj.pitch;
        if (pitch === undefined) throw "pitch is undefined";
        result.result = this._impl.setAudioPitch(playerId, pitch);
        return 0;
    }

    getDuration(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId === undefined) throw "playerId is undefined";
        let duration = obj.duration;
        if (duration === undefined) throw "duration is undefined";
        result.result = this._impl.getDuration(playerId, duration);
        return 0;
    }

    getPlayPosition(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId === undefined) throw "playerId is undefined";
        let pos = obj.pos;
        if (pos === undefined) throw "pos is undefined";
        result.result = this._impl.getPlayPosition(playerId, pos);
        return 0;
    }

    getStreamCount(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId === undefined) throw "playerId is undefined";
        let count = obj.count;
        if (count === undefined) throw "count is undefined";
        result.result = this._impl.getStreamCount(playerId, count);
        return 0;
    }

    getStreamInfo(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId === undefined) throw "playerId is undefined";
        let index = obj.index;
        if (index === undefined) throw "index is undefined";
        let info = obj.info;
        if (info === undefined) throw "info is undefined";
        result.result = this._impl.getStreamInfo(playerId, index, info);
        return 0;
    }

    setLoopCount(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId === undefined) throw "playerId is undefined";
        let loopCount = obj.loopCount;
        if (loopCount === undefined) throw "loopCount is undefined";
        result.result = this._impl.setLoopCount(playerId, loopCount);
        return 0;
    }

    muteAudio(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId === undefined) throw "playerId is undefined";
        let audio_mute = obj.audio_mute;
        if (audio_mute === undefined) throw "audio_mute is undefined";
        result.result = this._impl.muteAudio(playerId, audio_mute);
        return 0;
    }

    isAudioMuted(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId === undefined) throw "playerId is undefined";
        result.result = this._impl.isAudioMuted(playerId);
        return 0;
    }

    muteVideo(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId === undefined) throw "playerId is undefined";
        let video_mute = obj.video_mute;
        if (video_mute === undefined) throw "video_mute is undefined";
        result.result = this._impl.muteVideo(playerId, video_mute);
        return 0;
    }

    isVideoMuted(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId === undefined) throw "playerId is undefined";
        result.result = this._impl.isVideoMuted(playerId);
        return 0;
    }

    setPlaybackSpeed(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId === undefined) throw "playerId is undefined";
        let speed = obj.speed;
        if (speed === undefined) throw "speed is undefined";
        result.result = this._impl.setPlaybackSpeed(playerId, speed);
        return 0;
    }

    selectAudioTrack(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId === undefined) throw "playerId is undefined";
        let index = obj.index;
        if (index === undefined) throw "index is undefined";
        result.result = this._impl.selectAudioTrack(playerId, index);
        return 0;
    }

    setPlayerOption(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId === undefined) throw "playerId is undefined";
        let key = obj.key;
        if (key === undefined) throw "key is undefined";
        let value = obj.value;
        if (value === undefined) throw "value is undefined";
        result.result = this._impl.setPlayerOption(playerId, key, value);
        return 0;
    }

    setPlayerOption2(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId === undefined) throw "playerId is undefined";
        let key = obj.key;
        if (key === undefined) throw "key is undefined";
        let value = obj.value;
        if (value === undefined) throw "value is undefined";
        result.result = this._impl.setPlayerOption2(playerId, key, value);
        return 0;
    }

    takeScreenshot(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId === undefined) throw "playerId is undefined";
        let filename = obj.filename;
        if (filename === undefined) throw "filename is undefined";
        result.result = this._impl.takeScreenshot(playerId, filename);
        return 0;
    }

    selectInternalSubtitle(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId === undefined) throw "playerId is undefined";
        let index = obj.index;
        if (index === undefined) throw "index is undefined";
        result.result = this._impl.selectInternalSubtitle(playerId, index);
        return 0;
    }

    setExternalSubtitle(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId === undefined) throw "playerId is undefined";
        let url = obj.url;
        if (url === undefined) throw "url is undefined";
        result.result = this._impl.setExternalSubtitle(playerId, url);
        return 0;
    }

    getState(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId === undefined) throw "playerId is undefined";
        result.result = this._impl.getState(playerId);
        return 0;
    }

    mute(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId === undefined) throw "playerId is undefined";
        let mute = obj.mute;
        if (mute === undefined) throw "mute is undefined";
        result.result = this._impl.mute(playerId, mute);
        return 0;
    }

    getMute(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId === undefined) throw "playerId is undefined";
        result.result = this._impl.getMute(playerId, result);
        return 0;
    }

    adjustPlayoutVolume(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId === undefined) throw "playerId is undefined";
        let volume = obj.volume;
        if (volume === undefined) throw "volume is undefined";
        result.result = this._impl.adjustPlayoutVolume(playerId, volume);
        return 0;
    }

    getPlayoutVolume(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId === undefined) throw "playerId is undefined";
        let volume = obj.volume;
        if (volume === undefined) throw "volume is undefined";
        result.result = this._impl.getPlayoutVolume(playerId, volume);
        return 0;
    }

    adjustPublishSignalVolume(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId === undefined) throw "playerId is undefined";
        let volume = obj.volume;
        if (volume === undefined) throw "volume is undefined";
        result.result = this._impl.adjustPublishSignalVolume(playerId, volume);
        return 0;
    }

    getPublishSignalVolume(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId === undefined) throw "playerId is undefined";
        let volume = obj.volume;
        if (volume === undefined) throw "volume is undefined";
        result.result = this._impl.getPublishSignalVolume(playerId, volume);
        return 0;
    }

    setView(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId === undefined) throw "playerId is undefined";
        let view = obj.view;
        if (view === undefined) throw "view is undefined";
        result.result = this._impl.setView(playerId, view);
        return 0;
    }

    setRenderMode(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId === undefined) throw "playerId is undefined";
        let renderMode = obj.renderMode;
        if (renderMode === undefined) throw "renderMode is undefined";
        result.result = this._impl.setRenderMode(playerId, renderMode);
        return 0;
    }

    registerPlayerSourceObserver(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId === undefined) throw "playerId is undefined";
        let observer = obj.observer;
        if (observer === undefined) throw "observer is undefined";
        result.result = this._impl.registerPlayerSourceObserver(playerId, observer);
        return 0;
    }

    unregisterPlayerSourceObserver(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId === undefined) throw "playerId is undefined";
        let observer = obj.observer;
        if (observer === undefined) throw "observer is undefined";
        result.result = this._impl.unregisterPlayerSourceObserver(playerId, observer);
        return 0;
    }

    registerAudioFrameObserver(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId === undefined) throw "playerId is undefined";
        let observer = obj.observer;
        if (observer === undefined) throw "observer is undefined";
        result.result = this._impl.registerAudioFrameObserver(playerId, observer);
        return 0;
    }

    registerAudioFrameObserver2(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId === undefined) throw "playerId is undefined";
        let observer = obj.observer;
        if (observer === undefined) throw "observer is undefined";
        let mode = obj.mode;
        if (mode === undefined) throw "mode is undefined";
        result.result = this._impl.registerAudioFrameObserver2(playerId, observer, mode);
        return 0;
    }

    unregisterAudioFrameObserver(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId === undefined) throw "playerId is undefined";
        let observer = obj.observer;
        if (observer === undefined) throw "observer is undefined";
        result.result = this._impl.unregisterAudioFrameObserver(playerId, observer);
        return 0;
    }

    registerVideoFrameObserver(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId === undefined) throw "playerId is undefined";
        let observer = obj.observer;
        if (observer === undefined) throw "observer is undefined";
        result.result = this._impl.registerVideoFrameObserver(playerId, observer);
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

    unregisterVideoFrameObserver(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId === undefined) throw "playerId is undefined";
        let observer = obj.observer;
        if (observer === undefined) throw "observer is undefined";
        result.result = this._impl.unregisterVideoFrameObserver(playerId, observer);
        return 0;
    }

    registerMediaPlayerAudioSpectrumObserver(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId === undefined) throw "playerId is undefined";
        let observer = obj.observer;
        if (observer === undefined) throw "observer is undefined";
        let intervalInMS = obj.intervalInMS;
        if (intervalInMS === undefined) throw "intervalInMS is undefined";
        result.result = this._impl.registerMediaPlayerAudioSpectrumObserver(observer, intervalInMS);
        return 0;
    }

    unregisterMediaPlayerAudioSpectrumObserver(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId === undefined) throw "playerId is undefined";
        let observer = obj.observer;
        if (observer === undefined) throw "observer is undefined";
        result.result = this._impl.unregisterMediaPlayerAudioSpectrumObserver(playerId, observer);
        return 0;
    }

    setAudioDualMonoMode(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId === undefined) throw "playerId is undefined";
        let mode = obj.mode;
        if (mode === undefined) throw "mode is undefined";
        result.result = this._impl.setAudioDualMonoMode(playerId, mode);
        return 0;
    }

    getPlayerSdkVersion(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId === undefined) throw "playerId is undefined";
        result.result = this._impl.getPlayerSdkVersion(playerId);
        return 0;
    }

    getPlaySrc(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId === undefined) throw "playerId is undefined";
        result.result = this._impl.getPlaySrc(playerId);
        return 0;
    }

    openWithAgoraCDNSrc(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId === undefined) throw "playerId is undefined";
        let src = obj.src;
        if (src === undefined) throw "src is undefined";
        let startPos = obj.startPos;
        if (startPos === undefined) throw "startPos is undefined";
        result.result = this._impl.openWithAgoraCDNSrc(playerId, src, startPos);
        return 0;
    }

    getAgoraCDNLineCount(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId === undefined) throw "playerId is undefined";
        result.result = this._impl.getAgoraCDNLineCount(playerId);
        return 0;
    }

    switchAgoraCDNLineByIndex(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId === undefined) throw "playerId is undefined";
        let index = obj.index;
        if (index === undefined) throw "index is undefined";
        result.result = this._impl.switchAgoraCDNLineByIndex(playerId, index);
        return 0;
    }

    getCurrentAgoraCDNIndex(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId === undefined) throw "playerId is undefined";
        result.result = this._impl.getCurrentAgoraCDNIndex(playerId);
        return 0;
    }

    enableAutoSwitchAgoraCDN(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId === undefined) throw "playerId is undefined";
        let enable = obj.enable;
        if (enable === undefined) throw "enable is undefined";
        result.result = this._impl.enableAutoSwitchAgoraCDN(playerId, enable);
        return 0;
    }

    renewAgoraCDNSrcToken(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId === undefined) throw "playerId is undefined";
        let token = obj.token;
        if (token === undefined) throw "token is undefined";
        let ts = obj.ts;
        if (ts === undefined) throw "ts is undefined";
        result.result = this._impl.renewAgoraCDNSrcToken(playerId, token, ts);
        return 0;
    }

    switchAgoraCDNSrc(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId === undefined) throw "playerId is undefined";
        let src = obj.src;
        if (src === undefined) throw "src is undefined";
        let syncPts = obj.syncPts;
        if (syncPts === undefined) throw "syncPts is undefined";
        result.result = this._impl.switchAgoraCDNSrc(playerId, src, syncPts);
        return 0;
    }

    switchSrc(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId === undefined) throw "playerId is undefined";
        let src = obj.src;
        if (src === undefined) throw "src is undefined";
        let syncPts = obj.syncPts;
        if (syncPts === undefined) throw "syncPts is undefined";
        result.result = this._impl.switchSrc(playerId, src, syncPts);
        return 0;
    }

    preloadSrc(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId === undefined) throw "playerId is undefined";
        let src = obj.src;
        if (src === undefined) throw "src is undefined";
        let startPos = obj.startPos;
        if (startPos === undefined) throw "startPos is undefined";
        result.result = this._impl.preloadSrc(playerId, src, startPos);
        return 0;
    }

    playPreloadedSrc(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId === undefined) throw "playerId is undefined";
        let src = obj.src;
        if (src === undefined) throw "src is undefined";
        result.result = this._impl.playPreloadedSrc(playerId, src);
        return 0;
    }

    unloadSrc(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId === undefined) throw "playerId is undefined";
        let src = obj.src;
        if (src === undefined) throw "src is undefined";
        result.result = this._impl.unloadSrc(playerId, src);
        return 0;
    }

    setSpatialAudioParams(
        params1: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params1) as any;
        let playerId = obj.playerId;
        if (playerId === undefined) throw "playerId is undefined";
        let params = obj.params;
        if (params === undefined) throw "params is undefined";
        result.result = this._impl.setSpatialAudioParams(playerId, params);
        return 0;
    }

    setSoundPositionParams(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId === undefined) throw "playerId is undefined";
        let pan = obj.pan;
        if (pan === undefined) throw "pan is undefined";
        let gain = obj.gain;
        if (gain === undefined) throw "gain is undefined";
        result.result = this._impl.setSoundPositionParams(playerId, pan, gain);
        return 0;
    }
}