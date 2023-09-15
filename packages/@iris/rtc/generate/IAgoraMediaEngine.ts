/// Generated by terra, DO NOT MODIFY BY HAND.

import { CallApiReturnType } from 'iris-web-core';

import {
  AUDIO_TRACK_TYPE,
  AudioTrackConfig,
  EncodedVideoFrameInfo,
  SenderOptions,
} from './AgoraBase';
import {
  AudioFrame,
  EXTERNAL_VIDEO_SOURCE_TYPE,
  ExternalVideoFrame,
  IAudioFrameObserver,
  IVideoEncodedFrameObserver,
  IVideoFrameObserver,
} from './AgoraMediaBase';

export enum AUDIO_MIXING_DUAL_MONO_MODE {
  AUDIO_MIXING_DUAL_MONO_AUTO = 0,
  AUDIO_MIXING_DUAL_MONO_L = 1,
  AUDIO_MIXING_DUAL_MONO_R = 2,
  AUDIO_MIXING_DUAL_MONO_MIX = 3,
}

export interface IMediaEngine {
  registerAudioFrameObserver(
    observer: IAudioFrameObserver[]
  ): CallApiReturnType;

  registerVideoFrameObserver(
    observer: IVideoFrameObserver[]
  ): CallApiReturnType;

  registerVideoEncodedFrameObserver(
    observer: IVideoEncodedFrameObserver[]
  ): CallApiReturnType;

  pushAudioFrame(frame: AudioFrame[], trackId: number): CallApiReturnType;

  pullAudioFrame(frame: AudioFrame[]): CallApiReturnType;

  setExternalVideoSource(
    enabled: boolean,
    useTexture: boolean,
    sourceType: EXTERNAL_VIDEO_SOURCE_TYPE,
    encodedVideoOption: SenderOptions
  ): CallApiReturnType;

  setExternalAudioSource(
    enabled: boolean,
    sampleRate: number,
    channels: number,
    localPlayback: boolean,
    publish: boolean
  ): CallApiReturnType;

  createCustomAudioTrack(
    trackType: AUDIO_TRACK_TYPE,
    config: AudioTrackConfig
  ): CallApiReturnType;

  destroyCustomAudioTrack(trackId: number): CallApiReturnType;

  setExternalAudioSink(
    enabled: boolean,
    sampleRate: number,
    channels: number
  ): CallApiReturnType;

  enableCustomAudioLocalPlayback(
    trackId: number,
    enabled: boolean
  ): CallApiReturnType;

  pushVideoFrame(
    frame: ExternalVideoFrame[],
    videoTrackId: number
  ): CallApiReturnType;

  pushEncodedVideoImage(
    imageBuffer: Uint8Array,
    length: number,
    videoEncodedFrameInfo: EncodedVideoFrameInfo,
    videoTrackId: number
  ): CallApiReturnType;

  release(): CallApiReturnType;
}
