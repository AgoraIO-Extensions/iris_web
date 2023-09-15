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

  open(url: string, startPos: number): CallApiReturnType;

  openWithMediaSource(source: MediaSource): CallApiReturnType;

  play(): CallApiReturnType;

  pause(): CallApiReturnType;

  stop(): CallApiReturnType;

  resume(): CallApiReturnType;

  seek(newPos: number): CallApiReturnType;

  setAudioPitch(pitch: number): CallApiReturnType;

  getDuration(duration: number): CallApiReturnType;

  getPlayPosition(pos: number): CallApiReturnType;

  getStreamCount(count: number): CallApiReturnType;

  getStreamInfo(index: number, info: PlayerStreamInfo[]): CallApiReturnType;

  setLoopCount(loopCount: number): CallApiReturnType;

  setPlaybackSpeed(speed: number): CallApiReturnType;

  selectAudioTrack(index: number): CallApiReturnType;

  setPlayerOption(key: string, value: number): CallApiReturnType;

  setPlayerOption2(key: string, value: string): CallApiReturnType;

  takeScreenshot(filename: string): CallApiReturnType;

  selectInternalSubtitle(index: number): CallApiReturnType;

  setExternalSubtitle(url: string): CallApiReturnType;

  getState(): CallApiReturnType;

  mute(muted: boolean): CallApiReturnType;

  getMute(muted: boolean): CallApiReturnType;

  adjustPlayoutVolume(volume: number): CallApiReturnType;

  getPlayoutVolume(volume: number): CallApiReturnType;

  adjustPublishSignalVolume(volume: number): CallApiReturnType;

  getPublishSignalVolume(volume: number): CallApiReturnType;

  setView(view: any): CallApiReturnType;

  setRenderMode(renderMode: RENDER_MODE_TYPE): CallApiReturnType;

  registerPlayerSourceObserver(
    observer: IMediaPlayerSourceObserver[]
  ): CallApiReturnType;

  unregisterPlayerSourceObserver(
    observer: IMediaPlayerSourceObserver[]
  ): CallApiReturnType;

  registerAudioFrameObserver(observer: IAudioPcmFrameSink[]): CallApiReturnType;

  registerAudioFrameObserver2(
    observer: IAudioPcmFrameSink[],
    mode: RAW_AUDIO_FRAME_OP_MODE_TYPE
  ): CallApiReturnType;

  unregisterAudioFrameObserver(
    observer: IAudioPcmFrameSink[]
  ): CallApiReturnType;

  registerVideoFrameObserver(
    observer: IVideoFrameObserver[]
  ): CallApiReturnType;

  unregisterVideoFrameObserver(
    observer: IVideoFrameObserver[]
  ): CallApiReturnType;

  registerMediaPlayerAudioSpectrumObserver(
    observer: IAudioSpectrumObserver[],
    intervalInMS: number
  ): CallApiReturnType;

  unregisterMediaPlayerAudioSpectrumObserver(
    observer: IAudioSpectrumObserver[]
  ): CallApiReturnType;

  setAudioDualMonoMode(mode: AUDIO_DUAL_MONO_MODE): CallApiReturnType;

  getPlayerSdkVersion(): CallApiReturnType;

  getPlaySrc(): CallApiReturnType;

  openWithAgoraCDNSrc(src: string, startPos: number): CallApiReturnType;

  getAgoraCDNLineCount(): CallApiReturnType;

  switchAgoraCDNLineByIndex(index: number): CallApiReturnType;

  getCurrentAgoraCDNIndex(): CallApiReturnType;

  enableAutoSwitchAgoraCDN(enable: boolean): CallApiReturnType;

  renewAgoraCDNSrcToken(token: string, ts: number): CallApiReturnType;

  switchAgoraCDNSrc(src: string, syncPts: boolean): CallApiReturnType;

  switchSrc(src: string, syncPts: boolean): CallApiReturnType;

  preloadSrc(src: string, startPos: number): CallApiReturnType;

  playPreloadedSrc(src: string): CallApiReturnType;

  unloadSrc(src: string): CallApiReturnType;

  setSpatialAudioParams(params: SpatialAudioParams): CallApiReturnType;

  setSoundPositionParams(pan: number, gain: number): CallApiReturnType;
}

export interface IMediaPlayerCacheManager {
  removeAllCaches(): CallApiReturnType;

  removeOldCache(): CallApiReturnType;

  removeCacheByUri(uri: string): CallApiReturnType;

  setCacheDir(path: string): CallApiReturnType;

  setMaxCacheFileCount(count: number): CallApiReturnType;

  setMaxCacheFileSize(cacheSize: number): CallApiReturnType;

  enableAutoRemoveCache(enable: boolean): CallApiReturnType;

  getCacheDir(path: string, length: number): CallApiReturnType;

  getMaxCacheFileCount(): CallApiReturnType;

  getMaxCacheFileSize(): CallApiReturnType;

  getCacheFileCount(): CallApiReturnType;
}
