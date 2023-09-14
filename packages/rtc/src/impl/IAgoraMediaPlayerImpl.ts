import { CallApiReturnType } from 'iris-web-core';
import * as NATIVE_RTC from 'iris-web-rtc';

import { IrisRtcEngine } from '../engine/IrisRtcEngine';
import { Action } from '../util/AgoraActionQueue';
import { AgoraConsole } from '../util/AgoraConsole';

export class IMediaPlayerImpl implements NATIVE_RTC.IMediaPlayer {
  private _engine: IrisRtcEngine;

  public constructor(engine: IrisRtcEngine) {
    this._engine = engine;
  }

  putAction(action: Action) {
    this._engine.actionQueue.putAction(action);
  }

  getMediaPlayerId(): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  open(url: string, startPos: number): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  openWithMediaSource(source: NATIVE_RTC.MediaSource): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  play(): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  pause(): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  stop(): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  resume(): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  seek(newPos: number): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setAudioPitch(pitch: number): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getDuration(duration: number): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getPlayPosition(pos: number): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getStreamCount(count: number): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getStreamInfo(
    index: number,
    info: NATIVE_RTC.PlayerStreamInfo
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setLoopCount(loopCount: number): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setPlaybackSpeed(speed: number): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  selectAudioTrack(index: number): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setPlayerOption(key: string, value: number): CallApiReturnType;
  setPlayerOption(key: string, value: string): CallApiReturnType;
  setPlayerOption(
    key: unknown,
    value: unknown
  ): import('iris-web-core').CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  takeScreenshot(filename: string): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  selectInternalSubtitle(index: number): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setExternalSubtitle(url: string): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getState(): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  mute(muted: boolean): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getMute(muted: boolean): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  adjustPlayoutVolume(volume: number): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getPlayoutVolume(volume: number): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  adjustPublishSignalVolume(volume: number): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getPublishSignalVolume(volume: number): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setView(view: number): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setRenderMode(renderMode: NATIVE_RTC.RENDER_MODE_TYPE): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  registerPlayerSourceObserver(
    observer: NATIVE_RTC.IMediaPlayerSourceObserver
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  unregisterPlayerSourceObserver(
    observer: NATIVE_RTC.IMediaPlayerSourceObserver
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  registerAudioFrameObserver(
    observer: NATIVE_RTC.IAudioPcmFrameSink
  ): CallApiReturnType;
  registerAudioFrameObserver(
    observer: NATIVE_RTC.IAudioPcmFrameSink,
    mode: NATIVE_RTC.RAW_AUDIO_FRAME_OP_MODE_TYPE
  ): CallApiReturnType;
  registerAudioFrameObserver(
    observer: unknown,
    mode?: unknown
  ): import('iris-web-core').CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  unregisterAudioFrameObserver(
    observer: NATIVE_RTC.IAudioPcmFrameSink
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  registerVideoFrameObserver(
    observer: NATIVE_RTC.IVideoFrameObserver
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  unregisterVideoFrameObserver(
    observer: NATIVE_RTC.IVideoFrameObserver
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  registerMediaPlayerAudioSpectrumObserver(
    observer: NATIVE_RTC.IAudioSpectrumObserver,
    intervalInMS: number
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  unregisterMediaPlayerAudioSpectrumObserver(
    observer: NATIVE_RTC.IAudioSpectrumObserver
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setAudioDualMonoMode(
    mode: NATIVE_RTC.AUDIO_DUAL_MONO_MODE
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getPlayerSdkVersion(): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getPlaySrc(): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  openWithAgoraCDNSrc(src: string, startPos: number): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getAgoraCDNLineCount(): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  switchAgoraCDNLineByIndex(index: number): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getCurrentAgoraCDNIndex(): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  enableAutoSwitchAgoraCDN(enable: boolean): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  renewAgoraCDNSrcToken(token: string, ts: number): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  switchAgoraCDNSrc(src: string, syncPts: boolean): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  switchSrc(src: string, syncPts: boolean): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  preloadSrc(src: string, startPos: number): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  playPreloadedSrc(src: string): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  unloadSrc(src: string): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setSpatialAudioParams(
    params: NATIVE_RTC.SpatialAudioParams
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setSoundPositionParams(pan: number, gain: number): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
}

export class IMediaPlayerCacheManagerImpl
  implements NATIVE_RTC.IMediaPlayerCacheManager {
  private _engine: IrisRtcEngine;

  public constructor(engine: IrisRtcEngine) {
    this._engine = engine;
  }

  putAction(action: Action) {
    this._engine.actionQueue.putAction(action);
  }

  removeAllCaches(): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  removeOldCache(): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  removeCacheByUri(uri: string): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setCacheDir(path: string): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setMaxCacheFileCount(count: number): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setMaxCacheFileSize(cacheSize: number): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  enableAutoRemoveCache(enable: boolean): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getCacheDir(path: string, length: number): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getMaxCacheFileCount(): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getMaxCacheFileSize(): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getCacheFileCount(): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
}
