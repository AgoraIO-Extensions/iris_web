import * as agorartc from '../terra/rtc_types/Index';
import { IRtcEngine } from '../terra/interface/IRtcEngine';
import { IrisApiEngine } from '../engine/IrisApiEngine';
import { IrisRtcEngine } from '../engine/IrisRtcEngine';
import { Action, AgoraActionQueue } from '../util/AgoraActionQueue';
import { AgoraConsole } from '../util/AgoraConsole';
import AgoraRTC, { CameraVideoTrackInitConfig, ClientConfig, ClientRoleOptions, DeviceInfo, EncryptionMode, IAgoraRTCClient, IAgoraRTCRemoteUser, ICameraVideoTrack, IChannelMediaRelayConfiguration, ILocalAudioTrack, ILocalTrack, ILocalVideoTrack, IMicrophoneAudioTrack, InjectStreamConfig, IRemoteAudioTrack, MicrophoneAudioTrackInitConfig, ScreenVideoTrackInitConfig, UID, VideoPlayerConfig } from 'agora-rtc-sdk-ng';
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
import { IMediaPlayer } from '../terra/interface/IMediaPlayer';

export class MediaPlayerImpl implements IMediaPlayer {

    private _engine: IrisRtcEngine;

    public constructor(engine: IrisRtcEngine) {
        this._engine = engine;
    }

    putAction(action: Action) {
        this._engine.actionQueue.putAction(action);
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
    registerAudioFrameObserver(playerId: number, observer: agorartc.IAudioFrameObserver): number {
        AgoraConsole.warn("mediaPlayer_registerAudioFrameObserver not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    registerAudioFrameObserver2(playerId: number, observer: agorartc.IAudioFrameObserver, mode: agorartc.RAW_AUDIO_FRAME_OP_MODE_TYPE): number {
        AgoraConsole.warn("mediaPlayer_registerAudioFrameObserver2 not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    unregisterAudioFrameObserver(playerId: number, observer: agorartc.IAudioFrameObserver): number {
        AgoraConsole.warn("mediaPlayer_unregisterAudioFrameObserver not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    registerVideoFrameObserver(playerId: number, observer: agorartc.IVideoFrameObserver): number {
        AgoraConsole.warn("mediaPlayer_registerVideoFrameObserver not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    registerVideoEncodedImageReceiver(receiver: agorartc.IVideoEncodedImageReceiver): number {
        AgoraConsole.warn("registerVideoEncodedImageReceiver not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    unregisterVideoFrameObserver(playerId: number, observer: agorartc.IVideoFrameObserver): number {
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


}