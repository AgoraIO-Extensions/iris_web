import * as NATIVE_RTC from '@iris/native-rtc-binding';
import { CallApiReturnType, CallIrisApiResult } from 'iris-web-core';

import { IrisRtcEngine } from '../engine/IrisRtcEngine';
import { AgoraConsole } from '../util/AgoraConsole';

export class IMediaPlayerImpl implements NATIVE_RTC.IMediaPlayer {
  private _engine: IrisRtcEngine;

  public constructor(engine: IrisRtcEngine) {
    this._engine = engine;
  }

  private returnResult(
    isSuccess: boolean = true,
    code: number = NATIVE_RTC.ERROR_CODE_TYPE.ERR_OK,
    data: string = '{"result": 0}'
  ): Promise<CallIrisApiResult> {
    if (!isSuccess) {
      code = -NATIVE_RTC.ERROR_CODE_TYPE.ERR_FAILED;
    }
    return Promise.resolve(new CallIrisApiResult(code, data));
  }

  setPlayerOption2(key: string, value: string): CallApiReturnType {
    AgoraConsole.warn('setPlayerOption2 not supported in this platform!');
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }

  registerAudioFrameObserver2(
    observer: NATIVE_RTC.IAudioPcmFrameSink,
    mode: NATIVE_RTC.RAW_AUDIO_FRAME_OP_MODE_TYPE
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver2 not supported in this platform!'
    );
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }

  unregisterMediaPlayerAudioSpectrumObserver(
    observer: NATIVE_RTC.IAudioSpectrumObserver
  ): CallApiReturnType {
    AgoraConsole.warn(
      'unregisterMediaPlayerAudioSpectrumObserver not supported in this platform!'
    );
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }

  getMediaPlayerId(): CallApiReturnType {
    AgoraConsole.warn('getMediaPlayerId not supported in this platform!');
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }

  open(url: string, startPos: number): CallApiReturnType {
    AgoraConsole.warn('open not supported in this platform!');
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  openWithMediaSource(source: NATIVE_RTC.MediaSource): CallApiReturnType {
    AgoraConsole.warn('openWithMediaSource not supported in this platform!');
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  play(): CallApiReturnType {
    AgoraConsole.warn('play not supported in this platform!');
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  pause(): CallApiReturnType {
    AgoraConsole.warn('pause not supported in this platform!');
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  stop(): CallApiReturnType {
    AgoraConsole.warn('stop not supported in this platform!');
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  resume(): CallApiReturnType {
    AgoraConsole.warn('resume not supported in this platform!');
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  seek(newPos: number): CallApiReturnType {
    AgoraConsole.warn('seek not supported in this platform!');
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setAudioPitch(pitch: number): CallApiReturnType {
    AgoraConsole.warn('setAudioPitch not supported in this platform!');
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  getDuration(duration: number): CallApiReturnType {
    AgoraConsole.warn('getDuration not supported in this platform!');
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  getPlayPosition(pos: number): CallApiReturnType {
    AgoraConsole.warn('getPlayPosition not supported in this platform!');
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  getStreamCount(count: number): CallApiReturnType {
    AgoraConsole.warn('getStreamCount not supported in this platform!');
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  getStreamInfo(
    index: number,
    info: NATIVE_RTC.PlayerStreamInfo[]
  ): CallApiReturnType {
    AgoraConsole.warn('getStreamInfo not supported in this platform!');
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setLoopCount(loopCount: number): CallApiReturnType {
    AgoraConsole.warn('setLoopCount not supported in this platform!');
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setPlaybackSpeed(speed: number): CallApiReturnType {
    AgoraConsole.warn('setPlaybackSpeed not supported in this platform!');
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  selectAudioTrack(index: number): CallApiReturnType {
    AgoraConsole.warn('selectAudioTrack not supported in this platform!');
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setPlayerOption(key: string, value: number): CallApiReturnType {
    AgoraConsole.warn('setPlayerOption not supported in this platform!');
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  takeScreenshot(filename: string): CallApiReturnType {
    AgoraConsole.warn('takeScreenshot not supported in this platform!');
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  selectInternalSubtitle(index: number): CallApiReturnType {
    AgoraConsole.warn('selectInternalSubtitle not supported in this platform!');
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setExternalSubtitle(url: string): CallApiReturnType {
    AgoraConsole.warn('setExternalSubtitle not supported in this platform!');
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  getState(): CallApiReturnType {
    AgoraConsole.warn('getState not supported in this platform!');
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  mute(muted: boolean): CallApiReturnType {
    AgoraConsole.warn('mute not supported in this platform!');
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  getMute(muted: boolean): CallApiReturnType {
    AgoraConsole.warn('getMute not supported in this platform!');
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  adjustPlayoutVolume(volume: number): CallApiReturnType {
    AgoraConsole.warn('adjustPlayoutVolume not supported in this platform!');
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  getPlayoutVolume(volume: number): CallApiReturnType {
    AgoraConsole.warn('getPlayoutVolume not supported in this platform!');
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  adjustPublishSignalVolume(volume: number): CallApiReturnType {
    AgoraConsole.warn(
      'adjustPublishSignalVolume not supported in this platform!'
    );
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  getPublishSignalVolume(volume: number): CallApiReturnType {
    AgoraConsole.warn('getPublishSignalVolume not supported in this platform!');
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setView(view: number): CallApiReturnType {
    AgoraConsole.warn('setView not supported in this platform!');
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setRenderMode(renderMode: NATIVE_RTC.RENDER_MODE_TYPE): CallApiReturnType {
    AgoraConsole.warn('setRenderMode not supported in this platform!');
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  registerPlayerSourceObserver(
    observer: NATIVE_RTC.IMediaPlayerSourceObserver
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerPlayerSourceObserver not supported in this platform!'
    );
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  unregisterPlayerSourceObserver(
    observer: NATIVE_RTC.IMediaPlayerSourceObserver
  ): CallApiReturnType {
    AgoraConsole.warn(
      'unregisterPlayerSourceObserver not supported in this platform!'
    );
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  registerAudioFrameObserver(
    observer: NATIVE_RTC.IAudioPcmFrameSink
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platform!'
    );
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  unregisterAudioFrameObserver(
    observer: NATIVE_RTC.IAudioPcmFrameSink
  ): CallApiReturnType {
    AgoraConsole.warn(
      'unregisterAudioFrameObserver not supported in this platform!'
    );
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  registerVideoFrameObserver(
    observer: NATIVE_RTC.IVideoFrameObserver
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerVideoFrameObserver not supported in this platform!'
    );
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  unregisterVideoFrameObserver(
    observer: NATIVE_RTC.IVideoFrameObserver
  ): CallApiReturnType {
    AgoraConsole.warn(
      'unregisterVideoFrameObserver not supported in this platform!'
    );
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  registerMediaPlayerAudioSpectrumObserver(
    observer: NATIVE_RTC.IAudioSpectrumObserver,
    intervalInMS: number
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerMediaPlayerAudioSpectrumObserver not supported in this platform!'
    );
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setAudioDualMonoMode(
    mode: NATIVE_RTC.AUDIO_DUAL_MONO_MODE
  ): CallApiReturnType {
    AgoraConsole.warn('setAudioDualMonoMode not supported in this platform!');
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  getPlayerSdkVersion(): CallApiReturnType {
    AgoraConsole.warn('getPlayerSdkVersion not supported in this platform!');
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  getPlaySrc(): CallApiReturnType {
    AgoraConsole.warn('getPlaySrc not supported in this platform!');
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  openWithAgoraCDNSrc(src: string, startPos: number): CallApiReturnType {
    AgoraConsole.warn('openWithAgoraCDNSrc not supported in this platform!');
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  getAgoraCDNLineCount(): CallApiReturnType {
    AgoraConsole.warn('getAgoraCDNLineCount not supported in this platform!');
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  switchAgoraCDNLineByIndex(index: number): CallApiReturnType {
    AgoraConsole.warn(
      'switchAgoraCDNLineByIndex not supported in this platform!'
    );
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  getCurrentAgoraCDNIndex(): CallApiReturnType {
    AgoraConsole.warn(
      'getCurrentAgoraCDNIndex not supported in this platform!'
    );
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  enableAutoSwitchAgoraCDN(enable: boolean): CallApiReturnType {
    AgoraConsole.warn(
      'enableAutoSwitchAgoraCDN not supported in this platform!'
    );
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  renewAgoraCDNSrcToken(token: string, ts: number): CallApiReturnType {
    AgoraConsole.warn('renewAgoraCDNSrcToken not supported in this platform!');
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  switchAgoraCDNSrc(src: string, syncPts: boolean): CallApiReturnType {
    AgoraConsole.warn('switchAgoraCDNSrc not supported in this platform!');
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  switchSrc(src: string, syncPts: boolean): CallApiReturnType {
    AgoraConsole.warn('switchSrc not supported in this platform!');
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  preloadSrc(src: string, startPos: number): CallApiReturnType {
    AgoraConsole.warn('preloadSrc not supported in this platform!');
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  playPreloadedSrc(src: string): CallApiReturnType {
    AgoraConsole.warn('playPreloadedSrc not supported in this platform!');
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  unloadSrc(src: string): CallApiReturnType {
    AgoraConsole.warn('unloadSrc not supported in this platform!');
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setSpatialAudioParams(
    params: NATIVE_RTC.SpatialAudioParams
  ): CallApiReturnType {
    AgoraConsole.warn('setSpatialAudioParams not supported in this platform!');
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setSoundPositionParams(pan: number, gain: number): CallApiReturnType {
    AgoraConsole.warn('setSoundPositionParams not supported in this platform!');
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
}

export class IMediaPlayerCacheManagerImpl
  implements NATIVE_RTC.IMediaPlayerCacheManager {
  private _engine: IrisRtcEngine;

  public constructor(engine: IrisRtcEngine) {
    this._engine = engine;
  }

  private returnResult(
    isSuccess: boolean = true,
    code: number = NATIVE_RTC.ERROR_CODE_TYPE.ERR_OK,
    data: string = '{"result": 0}'
  ): Promise<CallIrisApiResult> {
    if (!isSuccess) {
      code = -NATIVE_RTC.ERROR_CODE_TYPE.ERR_FAILED;
    }
    return Promise.resolve(new CallIrisApiResult(code, data));
  }

  removeAllCaches(): CallApiReturnType {
    AgoraConsole.warn('removeAllCaches not supported in this platform!');
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  removeOldCache(): CallApiReturnType {
    AgoraConsole.warn('removeOldCache not supported in this platform!');
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  removeCacheByUri(uri: string): CallApiReturnType {
    AgoraConsole.warn('removeCacheByUri not supported in this platform!');
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setCacheDir(path: string): CallApiReturnType {
    AgoraConsole.warn('setCacheDir not supported in this platform!');
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setMaxCacheFileCount(count: number): CallApiReturnType {
    AgoraConsole.warn('setMaxCacheFileCount not supported in this platform!');
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setMaxCacheFileSize(cacheSize: number): CallApiReturnType {
    AgoraConsole.warn('setMaxCacheFileSize not supported in this platform!');
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  enableAutoRemoveCache(enable: boolean): CallApiReturnType {
    AgoraConsole.warn('enableAutoRemoveCache not supported in this platform!');
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  getCacheDir(path: string, length: number): CallApiReturnType {
    AgoraConsole.warn('getCacheDir not supported in this platform!');
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  getMaxCacheFileCount(): CallApiReturnType {
    AgoraConsole.warn('getMaxCacheFileCount not supported in this platform!');
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  getMaxCacheFileSize(): CallApiReturnType {
    AgoraConsole.warn('getMaxCacheFileSize not supported in this platform!');
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  getCacheFileCount(): CallApiReturnType {
    AgoraConsole.warn('getCacheFileCount not supported in this platform!');
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
}
