import { CallApiReturnType } from 'iris-web-core';
import {
  AUDIO_DUAL_MONO_MODE,
  IAudioPcmFrameSink,
  IAudioSpectrumObserver,
  IMediaPlayer,
  IMediaPlayerSourceObserver,
  IVideoFrameObserver,
  MediaSource,
  PlayerStreamInfo,
  RAW_AUDIO_FRAME_OP_MODE_TYPE,
  RENDER_MODE_TYPE,
  SpatialAudioParams,
} from 'iris-web-rtc';

import { IrisRtcEngine } from '../engine/IrisRtcEngine';
import { Action } from '../util/AgoraActionQueue';

export class MediaPlayerImpl implements IMediaPlayer {
  private _engine: IrisRtcEngine;

  public constructor(engine: IrisRtcEngine) {
    this._engine = engine;
  }
  getMediaPlayerId(): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  open(url: string, startPos: number): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  openWithMediaSource(source: MediaSource): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  play(): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  pause(): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  stop(): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  resume(): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  seek(newPos: number): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setAudioPitch(pitch: number): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  getDuration(duration: number): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  getPlayPosition(pos: number): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  getStreamCount(count: number): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  getStreamInfo(index: number, info: PlayerStreamInfo): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setLoopCount(loopCount: number): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setPlaybackSpeed(speed: number): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  selectAudioTrack(index: number): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setPlayerOption(key: string, value: number): CallApiReturnType;
  setPlayerOption(key: string, value: string): CallApiReturnType;
  setPlayerOption(
    key: unknown,
    value: unknown
  ): import('iris-web-core').CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  takeScreenshot(filename: string): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  selectInternalSubtitle(index: number): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setExternalSubtitle(url: string): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  getState(): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  mute(muted: boolean): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  getMute(muted: boolean): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  adjustPlayoutVolume(volume: number): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  getPlayoutVolume(volume: number): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  adjustPublishSignalVolume(volume: number): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  getPublishSignalVolume(volume: number): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setView(view: number): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setRenderMode(renderMode: RENDER_MODE_TYPE): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  registerPlayerSourceObserver(
    observer: IMediaPlayerSourceObserver
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  unregisterPlayerSourceObserver(
    observer: IMediaPlayerSourceObserver
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  registerAudioFrameObserver(observer: IAudioPcmFrameSink): CallApiReturnType;
  registerAudioFrameObserver(
    observer: IAudioPcmFrameSink,
    mode: RAW_AUDIO_FRAME_OP_MODE_TYPE
  ): CallApiReturnType;
  registerAudioFrameObserver(
    observer: unknown,
    mode?: unknown
  ): import('iris-web-core').CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  unregisterAudioFrameObserver(
    observer: IAudioPcmFrameSink
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  registerVideoFrameObserver(observer: IVideoFrameObserver): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  unregisterVideoFrameObserver(
    observer: IVideoFrameObserver
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  registerMediaPlayerAudioSpectrumObserver(
    observer: IAudioSpectrumObserver,
    intervalInMS: number
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  unregisterMediaPlayerAudioSpectrumObserver(
    observer: IAudioSpectrumObserver
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setAudioDualMonoMode(mode: AUDIO_DUAL_MONO_MODE): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  getPlayerSdkVersion(): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  getPlaySrc(): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  openWithAgoraCDNSrc(src: string, startPos: number): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  getAgoraCDNLineCount(): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  switchAgoraCDNLineByIndex(index: number): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  getCurrentAgoraCDNIndex(): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  enableAutoSwitchAgoraCDN(enable: boolean): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  renewAgoraCDNSrcToken(token: string, ts: number): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  switchAgoraCDNSrc(src: string, syncPts: boolean): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  switchSrc(src: string, syncPts: boolean): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  preloadSrc(src: string, startPos: number): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  playPreloadedSrc(src: string): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  unloadSrc(src: string): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setSpatialAudioParams(params: SpatialAudioParams): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setSoundPositionParams(pan: number, gain: number): CallApiReturnType {
    throw new Error('Method not implemented.');
  }

  putAction(action: Action) {
    this._engine.actionQueue.putAction(action);
  }

  //IMediaPlayer
}
