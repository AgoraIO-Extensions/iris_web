/// Generated by terra, DO NOT MODIFY BY HAND.

import { CallApiReturnType } from 'iris-web-core';

import { SpatialAudioParams } from './AgoraBase';
import {
  AUDIO_DUAL_MONO_MODE,
  IAudioPcmFrameSink,
  IAudioSpectrumObserver,
  IVideoFrameObserver,
  RAW_AUDIO_FRAME_OP_MODE_TYPE,
  RENDER_MODE_TYPE,
} from './AgoraMediaBase';
import { MediaSource, PlayerStreamInfo } from './AgoraMediaPlayerTypes';
import { IMediaPlayerSourceObserver } from './IAgoraMediaPlayerSource';

export interface IMediaPlayer {
  getMediaPlayerId(): CallApiReturnType;

  open_e43f201(url: string, startPos: number): CallApiReturnType;

  openWithMediaSource_3c11499(source: MediaSource): CallApiReturnType;

  play(): CallApiReturnType;

  pause(): CallApiReturnType;

  stop(): CallApiReturnType;

  resume(): CallApiReturnType;

  seek_f631116(newPos: number): CallApiReturnType;

  setAudioPitch_46f8ab7(pitch: number): CallApiReturnType;

  getDuration_b12f121(duration: number): CallApiReturnType;

  getPlayPosition_b12f121(pos: number): CallApiReturnType;

  getStreamCount_b12f121(count: number): CallApiReturnType;

  getStreamInfo_0fa63fa(
    index: number,
    info: PlayerStreamInfo
  ): CallApiReturnType;

  setLoopCount_46f8ab7(loopCount: number): CallApiReturnType;

  setPlaybackSpeed_46f8ab7(speed: number): CallApiReturnType;

  selectAudioTrack_46f8ab7(index: number): CallApiReturnType;

  setPlayerOption_4d05d29(key: string, value: number): CallApiReturnType;

  setPlayerOption_ccad422(key: string, value: string): CallApiReturnType;

  takeScreenshot_3a2037f(filename: string): CallApiReturnType;

  selectInternalSubtitle_46f8ab7(index: number): CallApiReturnType;

  setExternalSubtitle_3a2037f(url: string): CallApiReturnType;

  getState(): CallApiReturnType;

  mute_5039d15(muted: boolean): CallApiReturnType;

  getMute_c93e9d4(muted: boolean): CallApiReturnType;

  adjustPlayoutVolume_46f8ab7(volume: number): CallApiReturnType;

  getPlayoutVolume_9cfaa7e(volume: number): CallApiReturnType;

  adjustPublishSignalVolume_46f8ab7(volume: number): CallApiReturnType;

  getPublishSignalVolume_9cfaa7e(volume: number): CallApiReturnType;

  setView_cb1a81f(view: any): CallApiReturnType;

  setRenderMode_bedb5ae(renderMode: RENDER_MODE_TYPE): CallApiReturnType;

  registerPlayerSourceObserver_15621d7(
    observer: IMediaPlayerSourceObserver
  ): CallApiReturnType;

  unregisterPlayerSourceObserver_15621d7(
    observer: IMediaPlayerSourceObserver
  ): CallApiReturnType;

  registerAudioFrameObserver_89ab9b5(
    observer: IAudioPcmFrameSink
  ): CallApiReturnType;

  registerAudioFrameObserver_a5b510b(
    observer: IAudioPcmFrameSink,
    mode: RAW_AUDIO_FRAME_OP_MODE_TYPE
  ): CallApiReturnType;

  unregisterAudioFrameObserver_89ab9b5(
    observer: IAudioPcmFrameSink
  ): CallApiReturnType;

  registerVideoFrameObserver_833bd8d(
    observer: IVideoFrameObserver
  ): CallApiReturnType;

  unregisterVideoFrameObserver_5165d4c(
    observer: IVideoFrameObserver
  ): CallApiReturnType;

  registerMediaPlayerAudioSpectrumObserver_226bb48(
    observer: IAudioSpectrumObserver,
    intervalInMS: number
  ): CallApiReturnType;

  unregisterMediaPlayerAudioSpectrumObserver_09064ce(
    observer: IAudioSpectrumObserver
  ): CallApiReturnType;

  setAudioDualMonoMode_30c9672(mode: AUDIO_DUAL_MONO_MODE): CallApiReturnType;

  getPlayerSdkVersion(): CallApiReturnType;

  getPlaySrc(): CallApiReturnType;

  openWithAgoraCDNSrc_e43f201(src: string, startPos: number): CallApiReturnType;

  getAgoraCDNLineCount(): CallApiReturnType;

  switchAgoraCDNLineByIndex_46f8ab7(index: number): CallApiReturnType;

  getCurrentAgoraCDNIndex(): CallApiReturnType;

  enableAutoSwitchAgoraCDN_5039d15(enable: boolean): CallApiReturnType;

  renewAgoraCDNSrcToken_e43f201(token: string, ts: number): CallApiReturnType;

  switchAgoraCDNSrc_7a174df(src: string, syncPts: boolean): CallApiReturnType;

  switchSrc_7a174df(src: string, syncPts: boolean): CallApiReturnType;

  preloadSrc_e43f201(src: string, startPos: number): CallApiReturnType;

  playPreloadedSrc_3a2037f(src: string): CallApiReturnType;

  unloadSrc_3a2037f(src: string): CallApiReturnType;

  setSpatialAudioParams_5035667(params: SpatialAudioParams): CallApiReturnType;

  setSoundPositionParams_f282d50(pan: number, gain: number): CallApiReturnType;
}

export interface IMediaPlayerCacheManager {
  removeAllCaches(): CallApiReturnType;

  removeOldCache(): CallApiReturnType;

  removeCacheByUri_3a2037f(uri: string): CallApiReturnType;

  setCacheDir_3a2037f(path: string): CallApiReturnType;

  setMaxCacheFileCount_46f8ab7(count: number): CallApiReturnType;

  setMaxCacheFileSize_f631116(cacheSize: number): CallApiReturnType;

  enableAutoRemoveCache_5039d15(enable: boolean): CallApiReturnType;

  getCacheDir_c9551e8(path: string, length: number): CallApiReturnType;

  getMaxCacheFileCount(): CallApiReturnType;

  getMaxCacheFileSize(): CallApiReturnType;

  getCacheFileCount(): CallApiReturnType;
}
