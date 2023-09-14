import { CallApiReturnType } from 'iris-web-core';
import * as NATIVE_RTC from 'iris-web-rtc';

import { IrisRtcEngine } from '../engine/IrisRtcEngine';
import { Action } from '../util/AgoraActionQueue';
import { AgoraConsole } from '../util/AgoraConsole';

export const RTCENGINE_KEY = 'RtcEngine';

export class IRtcEngineImpl implements NATIVE_RTC.IRtcEngine {
  private _engine: IrisRtcEngine = null;

  constructor(engine: IrisRtcEngine) {
    this._engine = engine;
  }

  putAction(action: Action) {
    this._engine.actionQueue.putAction(action);
  }

  release(sync: boolean): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  initialize(context: NATIVE_RTC.RtcEngineContext): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getVersion(): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getErrorDescription(code: number): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  queryCodecCapability(
    codecInfo: NATIVE_RTC.CodecCapInfo,
    size: number
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  preloadChannel(
    token: string,
    channelId: string,
    uid: number
  ): CallApiReturnType;
  preloadChannel(
    token: string,
    channelId: string,
    userAccount: string
  ): CallApiReturnType;
  preloadChannel(
    token: unknown,
    channelId: unknown,
    userAccount: unknown
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  updatePreloadChannelToken(token: string): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  joinChannel(
    token: string,
    channelId: string,
    info: string,
    uid: number
  ): CallApiReturnType;
  joinChannel(
    token: string,
    channelId: string,
    uid: number,
    options: NATIVE_RTC.ChannelMediaOptions
  ): CallApiReturnType;
  joinChannel(
    token: unknown,
    channelId: unknown,
    uid: unknown,
    options: unknown
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  updateChannelMediaOptions(
    options: NATIVE_RTC.ChannelMediaOptions
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  leaveChannel(): CallApiReturnType;
  leaveChannel(options: NATIVE_RTC.LeaveChannelOptions): CallApiReturnType;
  leaveChannel(options?: unknown): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  renewToken(token: string): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setChannelProfile(
    profile: NATIVE_RTC.CHANNEL_PROFILE_TYPE
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setClientRole(role: NATIVE_RTC.CLIENT_ROLE_TYPE): CallApiReturnType;
  setClientRole(
    role: NATIVE_RTC.CLIENT_ROLE_TYPE,
    options: NATIVE_RTC.ClientRoleOptions
  ): CallApiReturnType;
  setClientRole(role: unknown, options?: unknown): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  startEchoTest(): CallApiReturnType;
  startEchoTest(intervalInSeconds: number): CallApiReturnType;
  startEchoTest(config: NATIVE_RTC.EchoTestConfiguration): CallApiReturnType;
  startEchoTest(config?: unknown): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  stopEchoTest(): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  enableMultiCamera(
    enabled: boolean,
    config: NATIVE_RTC.CameraCapturerConfiguration
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  enableVideo(): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  disableVideo(): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  startPreview(): CallApiReturnType;
  startPreview(sourceType: NATIVE_RTC.VIDEO_SOURCE_TYPE): CallApiReturnType;
  startPreview(sourceType?: unknown): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  stopPreview(): CallApiReturnType;
  stopPreview(sourceType: NATIVE_RTC.VIDEO_SOURCE_TYPE): CallApiReturnType;
  stopPreview(sourceType?: unknown): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  startLastmileProbeTest(
    config: NATIVE_RTC.LastmileProbeConfig
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  stopLastmileProbeTest(): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setVideoEncoderConfiguration(
    config: NATIVE_RTC.VideoEncoderConfiguration
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setBeautyEffectOptions(
    enabled: boolean,
    options: NATIVE_RTC.BeautyOptions,
    type: NATIVE_RTC.MEDIA_SOURCE_TYPE
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setLowlightEnhanceOptions(
    enabled: boolean,
    options: NATIVE_RTC.LowlightEnhanceOptions,
    type: NATIVE_RTC.MEDIA_SOURCE_TYPE
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setVideoDenoiserOptions(
    enabled: boolean,
    options: NATIVE_RTC.VideoDenoiserOptions,
    type: NATIVE_RTC.MEDIA_SOURCE_TYPE
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setColorEnhanceOptions(
    enabled: boolean,
    options: NATIVE_RTC.ColorEnhanceOptions,
    type: NATIVE_RTC.MEDIA_SOURCE_TYPE
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  enableVirtualBackground(
    enabled: boolean,
    backgroundSource: NATIVE_RTC.VirtualBackgroundSource,
    segproperty: NATIVE_RTC.SegmentationProperty,
    type: NATIVE_RTC.MEDIA_SOURCE_TYPE
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setupRemoteVideo(canvas: NATIVE_RTC.VideoCanvas): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setupLocalVideo(canvas: NATIVE_RTC.VideoCanvas): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setVideoScenario(
    scenarioType: NATIVE_RTC.VIDEO_APPLICATION_SCENARIO_TYPE
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  enableAudio(): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  disableAudio(): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setAudioProfile(
    profile: NATIVE_RTC.AUDIO_PROFILE_TYPE,
    scenario: NATIVE_RTC.AUDIO_SCENARIO_TYPE
  ): CallApiReturnType;
  setAudioProfile(profile: NATIVE_RTC.AUDIO_PROFILE_TYPE): CallApiReturnType;
  setAudioProfile(profile: unknown, scenario?: unknown): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setAudioScenario(
    scenario: NATIVE_RTC.AUDIO_SCENARIO_TYPE
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  enableLocalAudio(enabled: boolean): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  muteLocalAudioStream(mute: boolean): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  muteAllRemoteAudioStreams(mute: boolean): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setDefaultMuteAllRemoteAudioStreams(mute: boolean): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  muteRemoteAudioStream(uid: number, mute: boolean): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  muteLocalVideoStream(mute: boolean): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  enableLocalVideo(enabled: boolean): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  muteAllRemoteVideoStreams(mute: boolean): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setDefaultMuteAllRemoteVideoStreams(mute: boolean): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  muteRemoteVideoStream(uid: number, mute: boolean): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setRemoteVideoStreamType(
    uid: number,
    streamType: NATIVE_RTC.VIDEO_STREAM_TYPE
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setRemoteVideoSubscriptionOptions(
    uid: number,
    options: NATIVE_RTC.VideoSubscriptionOptions
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setRemoteDefaultVideoStreamType(
    streamType: NATIVE_RTC.VIDEO_STREAM_TYPE
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setSubscribeAudioBlocklist(
    uidList: number,
    uidNumber: number
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setSubscribeAudioAllowlist(
    uidList: number,
    uidNumber: number
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setSubscribeVideoBlocklist(
    uidList: number,
    uidNumber: number
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setSubscribeVideoAllowlist(
    uidList: number,
    uidNumber: number
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  enableAudioVolumeIndication(
    interval: number,
    smooth: number,
    reportVad: boolean
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  startAudioRecording(
    filePath: string,
    quality: NATIVE_RTC.AUDIO_RECORDING_QUALITY_TYPE
  ): CallApiReturnType;
  startAudioRecording(
    filePath: string,
    sampleRate: number,
    quality: NATIVE_RTC.AUDIO_RECORDING_QUALITY_TYPE
  ): CallApiReturnType;
  startAudioRecording(
    config: NATIVE_RTC.AudioRecordingConfiguration
  ): CallApiReturnType;
  startAudioRecording(
    filePath: unknown,
    sampleRate?: unknown,
    quality?: unknown
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  registerAudioEncodedFrameObserver(
    config: NATIVE_RTC.AudioEncodedFrameObserverConfig,
    observer: NATIVE_RTC.IAudioEncodedFrameObserver
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  stopAudioRecording(): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  createMediaPlayer(): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  destroyMediaPlayer(media_player: NATIVE_RTC.IMediaPlayer): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  createMediaRecorder(info: NATIVE_RTC.RecorderStreamInfo): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  destroyMediaRecorder(
    mediaRecorder: NATIVE_RTC.IMediaRecorder
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  startAudioMixing(
    filePath: string,
    loopback: boolean,
    cycle: number
  ): CallApiReturnType;
  startAudioMixing(
    filePath: string,
    loopback: boolean,
    cycle: number,
    startPos: number
  ): CallApiReturnType;
  startAudioMixing(
    filePath: unknown,
    loopback: unknown,
    cycle: unknown,
    startPos?: unknown
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  stopAudioMixing(): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  pauseAudioMixing(): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  resumeAudioMixing(): CallApiReturnType {
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
  getAudioTrackCount(): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  adjustAudioMixingVolume(volume: number): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  adjustAudioMixingPublishVolume(volume: number): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getAudioMixingPublishVolume(): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  adjustAudioMixingPlayoutVolume(volume: number): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getAudioMixingPlayoutVolume(): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getAudioMixingDuration(): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getAudioMixingCurrentPosition(): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setAudioMixingPosition(pos: number): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setAudioMixingDualMonoMode(
    mode: NATIVE_RTC.AUDIO_MIXING_DUAL_MONO_MODE
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setAudioMixingPitch(pitch: number): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getEffectsVolume(): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setEffectsVolume(volume: number): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  preloadEffect(
    soundId: number,
    filePath: string,
    startPos: number
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  playEffect(
    soundId: number,
    filePath: string,
    loopCount: number,
    pitch: number,
    pan: number,
    gain: number,
    publish: boolean,
    startPos: number
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  playAllEffects(
    loopCount: number,
    pitch: number,
    pan: number,
    gain: number,
    publish: boolean
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getVolumeOfEffect(soundId: number): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setVolumeOfEffect(soundId: number, volume: number): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  pauseEffect(soundId: number): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  pauseAllEffects(): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  resumeEffect(soundId: number): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  resumeAllEffects(): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  stopEffect(soundId: number): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  stopAllEffects(): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  unloadEffect(soundId: number): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  unloadAllEffects(): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getEffectDuration(filePath: string): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setEffectPosition(soundId: number, pos: number): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getEffectCurrentPosition(soundId: number): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  enableSoundPositionIndication(enabled: boolean): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setRemoteVoicePosition(
    uid: number,
    pan: number,
    gain: number
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  enableSpatialAudio(enabled: boolean): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setRemoteUserSpatialAudioParams(
    uid: number,
    params: NATIVE_RTC.SpatialAudioParams
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setVoiceBeautifierPreset(
    preset: NATIVE_RTC.VOICE_BEAUTIFIER_PRESET
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setAudioEffectPreset(
    preset: NATIVE_RTC.AUDIO_EFFECT_PRESET
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setVoiceConversionPreset(
    preset: NATIVE_RTC.VOICE_CONVERSION_PRESET
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setAudioEffectParameters(
    preset: NATIVE_RTC.AUDIO_EFFECT_PRESET,
    param1: number,
    param2: number
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setVoiceBeautifierParameters(
    preset: NATIVE_RTC.VOICE_BEAUTIFIER_PRESET,
    param1: number,
    param2: number
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setVoiceConversionParameters(
    preset: NATIVE_RTC.VOICE_CONVERSION_PRESET,
    param1: number,
    param2: number
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setLocalVoicePitch(pitch: number): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setLocalVoiceFormant(formantRatio: number): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setLocalVoiceEqualization(
    bandFrequency: NATIVE_RTC.AUDIO_EQUALIZATION_BAND_FREQUENCY,
    bandGain: number
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setLocalVoiceReverb(
    reverbKey: NATIVE_RTC.AUDIO_REVERB_TYPE,
    value: number
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setHeadphoneEQPreset(
    preset: NATIVE_RTC.HEADPHONE_EQUALIZER_PRESET
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setHeadphoneEQParameters(
    lowGain: number,
    highGain: number
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setLogFile(filePath: string): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setLogFilter(filter: number): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setLogLevel(level: NATIVE_RTC.LOG_LEVEL): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setLogFileSize(fileSizeInKBytes: number): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  uploadLogFile(requestId: string): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setLocalRenderMode(
    renderMode: NATIVE_RTC.RENDER_MODE_TYPE,
    mirrorMode: NATIVE_RTC.VIDEO_MIRROR_MODE_TYPE
  ): CallApiReturnType;
  setLocalRenderMode(
    renderMode: NATIVE_RTC.RENDER_MODE_TYPE
  ): CallApiReturnType;
  setLocalRenderMode(
    renderMode: unknown,
    mirrorMode?: unknown
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setRemoteRenderMode(
    uid: number,
    renderMode: NATIVE_RTC.RENDER_MODE_TYPE,
    mirrorMode: NATIVE_RTC.VIDEO_MIRROR_MODE_TYPE
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setLocalVideoMirrorMode(
    mirrorMode: NATIVE_RTC.VIDEO_MIRROR_MODE_TYPE
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  enableDualStreamMode(enabled: boolean): CallApiReturnType;
  enableDualStreamMode(
    enabled: boolean,
    streamConfig: NATIVE_RTC.SimulcastStreamConfig
  ): CallApiReturnType;
  enableDualStreamMode(
    enabled: unknown,
    streamConfig?: unknown
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setDualStreamMode(mode: NATIVE_RTC.SIMULCAST_STREAM_MODE): CallApiReturnType;
  setDualStreamMode(
    mode: NATIVE_RTC.SIMULCAST_STREAM_MODE,
    streamConfig: NATIVE_RTC.SimulcastStreamConfig
  ): CallApiReturnType;
  setDualStreamMode(mode: unknown, streamConfig?: unknown): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  enableCustomAudioLocalPlayback(
    trackId: number,
    enabled: boolean
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setRecordingAudioFrameParameters(
    sampleRate: number,
    channel: number,
    mode: NATIVE_RTC.RAW_AUDIO_FRAME_OP_MODE_TYPE,
    samplesPerCall: number
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setPlaybackAudioFrameParameters(
    sampleRate: number,
    channel: number,
    mode: NATIVE_RTC.RAW_AUDIO_FRAME_OP_MODE_TYPE,
    samplesPerCall: number
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setMixedAudioFrameParameters(
    sampleRate: number,
    channel: number,
    samplesPerCall: number
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setEarMonitoringAudioFrameParameters(
    sampleRate: number,
    channel: number,
    mode: NATIVE_RTC.RAW_AUDIO_FRAME_OP_MODE_TYPE,
    samplesPerCall: number
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setPlaybackAudioFrameBeforeMixingParameters(
    sampleRate: number,
    channel: number
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  enableAudioSpectrumMonitor(intervalInMS: number): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  disableAudioSpectrumMonitor(): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  registerAudioSpectrumObserver(
    observer: NATIVE_RTC.IAudioSpectrumObserver
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  unregisterAudioSpectrumObserver(
    observer: NATIVE_RTC.IAudioSpectrumObserver
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  adjustRecordingSignalVolume(volume: number): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  muteRecordingSignal(mute: boolean): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  adjustPlaybackSignalVolume(volume: number): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  adjustUserPlaybackSignalVolume(
    uid: number,
    volume: number
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setLocalPublishFallbackOption(
    option: NATIVE_RTC.STREAM_FALLBACK_OPTIONS
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setRemoteSubscribeFallbackOption(
    option: NATIVE_RTC.STREAM_FALLBACK_OPTIONS
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setHighPriorityUserList(
    uidList: number,
    uidNum: number,
    option: NATIVE_RTC.STREAM_FALLBACK_OPTIONS
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  enableLoopbackRecording(
    enabled: boolean,
    deviceName: string
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  adjustLoopbackSignalVolume(volume: number): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getLoopbackRecordingVolume(): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  enableInEarMonitoring(
    enabled: boolean,
    includeAudioFilters: number
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setInEarMonitoringVolume(volume: number): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  loadExtensionProvider(
    path: string,
    unload_after_use: boolean
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setExtensionProviderProperty(
    provider: string,
    key: string,
    value: string
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  registerExtension(
    provider: string,
    extension: string,
    type: NATIVE_RTC.MEDIA_SOURCE_TYPE
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  enableExtension(
    provider: string,
    extension: string,
    enable: boolean,
    type: NATIVE_RTC.MEDIA_SOURCE_TYPE
  ): CallApiReturnType;
  enableExtension(
    provider: string,
    extension: string,
    extensionInfo: NATIVE_RTC.ExtensionInfo,
    enable: boolean
  ): CallApiReturnType;
  enableExtension(
    provider: unknown,
    extension: unknown,
    extensionInfo: unknown,
    enable: unknown
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setExtensionProperty(
    provider: string,
    extension: string,
    key: string,
    value: string,
    type: NATIVE_RTC.MEDIA_SOURCE_TYPE
  ): CallApiReturnType;
  setExtensionProperty(
    provider: string,
    extension: string,
    extensionInfo: NATIVE_RTC.ExtensionInfo,
    key: string,
    value: string
  ): CallApiReturnType;
  setExtensionProperty(
    provider: unknown,
    extension: unknown,
    extensionInfo: unknown,
    key: unknown,
    value: unknown
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getExtensionProperty(
    provider: string,
    extension: string,
    key: string,
    value: string,
    buf_len: number,
    type: NATIVE_RTC.MEDIA_SOURCE_TYPE
  ): CallApiReturnType;
  getExtensionProperty(
    provider: string,
    extension: string,
    extensionInfo: NATIVE_RTC.ExtensionInfo,
    key: string,
    value: string,
    buf_len: number
  ): CallApiReturnType;
  getExtensionProperty(
    provider: unknown,
    extension: unknown,
    extensionInfo: unknown,
    key: unknown,
    value: unknown,
    buf_len: unknown
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setCameraCapturerConfiguration(
    config: NATIVE_RTC.CameraCapturerConfiguration
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  createCustomVideoTrack(): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  createCustomEncodedVideoTrack(
    sender_option: NATIVE_RTC.SenderOptions
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  destroyCustomVideoTrack(video_track_id: number): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  destroyCustomEncodedVideoTrack(video_track_id: number): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  switchCamera(): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  isCameraZoomSupported(): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  isCameraFaceDetectSupported(): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  isCameraTorchSupported(): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  isCameraFocusSupported(): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  isCameraAutoFocusFaceModeSupported(): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setCameraZoomFactor(factor: number): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  enableFaceDetection(enabled: boolean): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getCameraMaxZoomFactor(): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setCameraFocusPositionInPreview(
    positionX: number,
    positionY: number
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setCameraTorchOn(isOn: boolean): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setCameraAutoFocusFaceModeEnabled(enabled: boolean): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  isCameraExposurePositionSupported(): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setCameraExposurePosition(
    positionXinView: number,
    positionYinView: number
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  isCameraExposureSupported(): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setCameraExposureFactor(factor: number): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  isCameraAutoExposureFaceModeSupported(): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setCameraAutoExposureFaceModeEnabled(enabled: boolean): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setDefaultAudioRouteToSpeakerphone(
    defaultToSpeaker: boolean
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setEnableSpeakerphone(speakerOn: boolean): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  isSpeakerphoneEnabled(): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setRouteInCommunicationMode(route: number): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getScreenCaptureSources(
    thumbSize: NATIVE_RTC.SIZE,
    iconSize: NATIVE_RTC.SIZE,
    includeScreen: boolean
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setAudioSessionOperationRestriction(
    restriction: NATIVE_RTC.AUDIO_SESSION_OPERATION_RESTRICTION
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  startScreenCaptureByDisplayId(
    displayId: number,
    regionRect: NATIVE_RTC.Rectangle,
    captureParams: NATIVE_RTC.ScreenCaptureParameters
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  startScreenCaptureByScreenRect(
    screenRect: NATIVE_RTC.Rectangle,
    regionRect: NATIVE_RTC.Rectangle,
    captureParams: NATIVE_RTC.ScreenCaptureParameters
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getAudioDeviceInfo(deviceInfo: NATIVE_RTC.DeviceInfo): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  startScreenCaptureByWindowId(
    windowId: number,
    regionRect: NATIVE_RTC.Rectangle,
    captureParams: NATIVE_RTC.ScreenCaptureParameters
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setScreenCaptureContentHint(
    contentHint: NATIVE_RTC.VIDEO_CONTENT_HINT
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  updateScreenCaptureRegion(
    regionRect: NATIVE_RTC.Rectangle
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  updateScreenCaptureParameters(
    captureParams: NATIVE_RTC.ScreenCaptureParameters
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  startScreenCapture(
    captureParams: NATIVE_RTC.ScreenCaptureParameters2
  ): CallApiReturnType;
  startScreenCapture(
    sourceType: NATIVE_RTC.VIDEO_SOURCE_TYPE,
    config: NATIVE_RTC.ScreenCaptureConfiguration
  ): CallApiReturnType;
  startScreenCapture(sourceType: unknown, config?: unknown): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  updateScreenCapture(
    captureParams: NATIVE_RTC.ScreenCaptureParameters2
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  queryScreenCaptureCapability(): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setScreenCaptureScenario(
    screenScenario: NATIVE_RTC.SCREEN_SCENARIO_TYPE
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  stopScreenCapture(): CallApiReturnType;
  stopScreenCapture(
    sourceType: NATIVE_RTC.VIDEO_SOURCE_TYPE
  ): CallApiReturnType;
  stopScreenCapture(sourceType?: unknown): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getCallId(callId: string): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  rate(callId: string, rating: number, description: string): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  complain(callId: string, description: string): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  startRtmpStreamWithoutTranscoding(url: string): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  startRtmpStreamWithTranscoding(
    url: string,
    transcoding: NATIVE_RTC.LiveTranscoding
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  updateRtmpTranscoding(
    transcoding: NATIVE_RTC.LiveTranscoding
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  stopRtmpStream(url: string): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  startLocalVideoTranscoder(
    config: NATIVE_RTC.LocalTranscoderConfiguration
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  updateLocalTranscoderConfiguration(
    config: NATIVE_RTC.LocalTranscoderConfiguration
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  stopLocalVideoTranscoder(): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  startCameraCapture(
    sourceType: NATIVE_RTC.VIDEO_SOURCE_TYPE,
    config: NATIVE_RTC.CameraCapturerConfiguration
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  stopCameraCapture(
    sourceType: NATIVE_RTC.VIDEO_SOURCE_TYPE
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setCameraDeviceOrientation(
    type: NATIVE_RTC.VIDEO_SOURCE_TYPE,
    orientation: NATIVE_RTC.VIDEO_ORIENTATION
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setScreenCaptureOrientation(
    type: NATIVE_RTC.VIDEO_SOURCE_TYPE,
    orientation: NATIVE_RTC.VIDEO_ORIENTATION
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getConnectionState(): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  registerEventHandler(
    eventHandler: NATIVE_RTC.IRtcEngineEventHandler
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  unregisterEventHandler(
    eventHandler: NATIVE_RTC.IRtcEngineEventHandler
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setRemoteUserPriority(
    uid: number,
    userPriority: NATIVE_RTC.PRIORITY_TYPE
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setEncryptionMode(encryptionMode: string): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setEncryptionSecret(secret: string): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  enableEncryption(
    enabled: boolean,
    config: NATIVE_RTC.EncryptionConfig
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  createDataStream(
    streamId: number,
    reliable: boolean,
    ordered: boolean
  ): CallApiReturnType;
  createDataStream(
    streamId: number,
    config: NATIVE_RTC.DataStreamConfig
  ): CallApiReturnType;
  createDataStream(
    streamId: unknown,
    reliable: unknown,
    ordered?: unknown
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  sendStreamMessage(
    streamId: number,
    data: string,
    length: number
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  addVideoWatermark(watermark: NATIVE_RTC.RtcImage): CallApiReturnType;
  addVideoWatermark(
    watermarkUrl: string,
    options: NATIVE_RTC.WatermarkOptions
  ): CallApiReturnType;
  addVideoWatermark(
    watermarkUrl: unknown,
    options?: unknown
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  clearVideoWatermarks(): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  pauseAudio(): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  resumeAudio(): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  enableWebSdkInteroperability(enabled: boolean): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  sendCustomReportMessage(
    id: string,
    category: string,
    event: string,
    label: string,
    value: number
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  registerMediaMetadataObserver(
    observer: NATIVE_RTC.IMetadataObserver,
    type: NATIVE_RTC.METADATA_TYPE
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  unregisterMediaMetadataObserver(
    observer: NATIVE_RTC.IMetadataObserver,
    type: NATIVE_RTC.METADATA_TYPE
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  startAudioFrameDump(
    channel_id: string,
    user_id: number,
    location: string,
    uuid: string,
    passwd: string,
    duration_ms: number,
    auto_upload: boolean
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  stopAudioFrameDump(
    channel_id: string,
    user_id: number,
    location: string
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setAINSMode(
    enabled: boolean,
    mode: NATIVE_RTC.AUDIO_AINS_MODE
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  registerLocalUserAccount(
    appId: string,
    userAccount: string
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  joinChannelWithUserAccount(
    token: string,
    channelId: string,
    userAccount: string
  ): CallApiReturnType;
  joinChannelWithUserAccount(
    token: string,
    channelId: string,
    userAccount: string,
    options: NATIVE_RTC.ChannelMediaOptions
  ): CallApiReturnType;
  joinChannelWithUserAccount(
    token: unknown,
    channelId: unknown,
    userAccount: unknown,
    options?: unknown
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  joinChannelWithUserAccountEx(
    token: string,
    channelId: string,
    userAccount: string,
    options: NATIVE_RTC.ChannelMediaOptions
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getUserInfoByUserAccount(
    userAccount: string,
    userInfo: NATIVE_RTC.UserInfo
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getUserInfoByUid(
    uid: number,
    userInfo: NATIVE_RTC.UserInfo
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  startOrUpdateChannelMediaRelay(
    configuration: NATIVE_RTC.ChannelMediaRelayConfiguration
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  startChannelMediaRelay(
    configuration: NATIVE_RTC.ChannelMediaRelayConfiguration
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  updateChannelMediaRelay(
    configuration: NATIVE_RTC.ChannelMediaRelayConfiguration
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  stopChannelMediaRelay(): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  pauseAllChannelMediaRelay(): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  resumeAllChannelMediaRelay(): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setDirectCdnStreamingAudioConfiguration(
    profile: NATIVE_RTC.AUDIO_PROFILE_TYPE
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setDirectCdnStreamingVideoConfiguration(
    config: NATIVE_RTC.VideoEncoderConfiguration
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  startDirectCdnStreaming(
    eventHandler: NATIVE_RTC.IDirectCdnStreamingEventHandler,
    publishUrl: string,
    options: NATIVE_RTC.DirectCdnStreamingMediaOptions
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  stopDirectCdnStreaming(): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  updateDirectCdnStreamingMediaOptions(
    options: NATIVE_RTC.DirectCdnStreamingMediaOptions
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  startRhythmPlayer(
    sound1: string,
    sound2: string,
    config: NATIVE_RTC.AgoraRhythmPlayerConfig
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  stopRhythmPlayer(): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  configRhythmPlayer(
    config: NATIVE_RTC.AgoraRhythmPlayerConfig
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  takeSnapshot(uid: number, filePath: string): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  enableContentInspect(
    enabled: boolean,
    config: NATIVE_RTC.ContentInspectConfig
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  adjustCustomAudioPublishVolume(
    trackId: number,
    volume: number
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  adjustCustomAudioPlayoutVolume(
    trackId: number,
    volume: number
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setCloudProxy(proxyType: NATIVE_RTC.CLOUD_PROXY_TYPE): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setLocalAccessPoint(
    config: NATIVE_RTC.LocalAccessPointConfiguration
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setAdvancedAudioOptions(
    options: NATIVE_RTC.AdvancedAudioOptions,
    sourceType: number
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setAVSyncSource(channelId: string, uid: number): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  enableVideoImageSource(
    enable: boolean,
    options: NATIVE_RTC.ImageTrackOptions
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getCurrentMonotonicTimeInMs(): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  enableWirelessAccelerate(enabled: boolean): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getNetworkType(): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setParameters(parameters: string): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  startMediaRenderingTracing(): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  enableInstantMediaRendering(): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getNtpWallTimeInMs(): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
}

export class IVideoDeviceManagerImpl implements NATIVE_RTC.IVideoDeviceManager {
  private _engine: IrisRtcEngine;

  public constructor(engine: IrisRtcEngine) {
    this._engine = engine;
  }

  putAction(action: Action) {
    this._engine.actionQueue.putAction(action);
  }

  enumerateVideoDevices(): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setDevice(deviceIdUTF8: string): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getDevice(deviceIdUTF8: string): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  numberOfCapabilities(deviceIdUTF8: string): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getCapability(
    deviceIdUTF8: string,
    deviceCapabilityNumber: number,
    capability: NATIVE_RTC.VideoFormat
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  startDeviceTest(hwnd: number): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  stopDeviceTest(): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  release(): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
}
