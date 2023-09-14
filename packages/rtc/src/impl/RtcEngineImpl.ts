import { CallApiReturnType } from 'iris-web-core';
import * as NATIVE_RTC from 'iris-web-rtc';
import { IRtcEngine } from 'iris-web-rtc';

import { IrisRtcEngine } from '../engine/IrisRtcEngine';
import { Action } from '../util/AgoraActionQueue';

export const RTCENGINE_KEY = 'RtcEngine';

export class RtcEngineImpl implements IRtcEngine {
  private _engine: IrisRtcEngine = null;

  constructor(engine: IrisRtcEngine) {
    this._engine = engine;
  }
  release(sync: boolean): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  initialize(context: NATIVE_RTC.RtcEngineContext): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  getVersion(): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  getErrorDescription(code: number): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  queryCodecCapability(
    codecInfo: NATIVE_RTC.CodecCapInfo,
    size: number
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
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
    throw new Error('Method not implemented.');
  }
  updatePreloadChannelToken(token: string): CallApiReturnType {
    throw new Error('Method not implemented.');
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
    throw new Error('Method not implemented.');
  }
  updateChannelMediaOptions(
    options: NATIVE_RTC.ChannelMediaOptions
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  leaveChannel(): CallApiReturnType;
  leaveChannel(options: NATIVE_RTC.LeaveChannelOptions): CallApiReturnType;
  leaveChannel(options?: unknown): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  renewToken(token: string): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setChannelProfile(
    profile: NATIVE_RTC.CHANNEL_PROFILE_TYPE
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setClientRole(role: NATIVE_RTC.CLIENT_ROLE_TYPE): CallApiReturnType;
  setClientRole(
    role: NATIVE_RTC.CLIENT_ROLE_TYPE,
    options: NATIVE_RTC.ClientRoleOptions
  ): CallApiReturnType;
  setClientRole(role: unknown, options?: unknown): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  startEchoTest(): CallApiReturnType;
  startEchoTest(intervalInSeconds: number): CallApiReturnType;
  startEchoTest(config: NATIVE_RTC.EchoTestConfiguration): CallApiReturnType;
  startEchoTest(config?: unknown): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  stopEchoTest(): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  enableMultiCamera(
    enabled: boolean,
    config: NATIVE_RTC.CameraCapturerConfiguration
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  enableVideo(): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  disableVideo(): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  startPreview(): CallApiReturnType;
  startPreview(sourceType: NATIVE_RTC.VIDEO_SOURCE_TYPE): CallApiReturnType;
  startPreview(sourceType?: unknown): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  stopPreview(): CallApiReturnType;
  stopPreview(sourceType: NATIVE_RTC.VIDEO_SOURCE_TYPE): CallApiReturnType;
  stopPreview(sourceType?: unknown): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  startLastmileProbeTest(
    config: NATIVE_RTC.LastmileProbeConfig
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  stopLastmileProbeTest(): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setVideoEncoderConfiguration(
    config: NATIVE_RTC.VideoEncoderConfiguration
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setBeautyEffectOptions(
    enabled: boolean,
    options: NATIVE_RTC.BeautyOptions,
    type: NATIVE_RTC.MEDIA_SOURCE_TYPE
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setLowlightEnhanceOptions(
    enabled: boolean,
    options: NATIVE_RTC.LowlightEnhanceOptions,
    type: NATIVE_RTC.MEDIA_SOURCE_TYPE
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setVideoDenoiserOptions(
    enabled: boolean,
    options: NATIVE_RTC.VideoDenoiserOptions,
    type: NATIVE_RTC.MEDIA_SOURCE_TYPE
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setColorEnhanceOptions(
    enabled: boolean,
    options: NATIVE_RTC.ColorEnhanceOptions,
    type: NATIVE_RTC.MEDIA_SOURCE_TYPE
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  enableVirtualBackground(
    enabled: boolean,
    backgroundSource: NATIVE_RTC.VirtualBackgroundSource,
    segproperty: NATIVE_RTC.SegmentationProperty,
    type: NATIVE_RTC.MEDIA_SOURCE_TYPE
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setupRemoteVideo(canvas: NATIVE_RTC.VideoCanvas): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setupLocalVideo(canvas: NATIVE_RTC.VideoCanvas): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setVideoScenario(
    scenarioType: NATIVE_RTC.VIDEO_APPLICATION_SCENARIO_TYPE
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  enableAudio(): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  disableAudio(): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setAudioProfile(
    profile: NATIVE_RTC.AUDIO_PROFILE_TYPE,
    scenario: NATIVE_RTC.AUDIO_SCENARIO_TYPE
  ): CallApiReturnType;
  setAudioProfile(profile: NATIVE_RTC.AUDIO_PROFILE_TYPE): CallApiReturnType;
  setAudioProfile(profile: unknown, scenario?: unknown): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setAudioScenario(
    scenario: NATIVE_RTC.AUDIO_SCENARIO_TYPE
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  enableLocalAudio(enabled: boolean): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  muteLocalAudioStream(mute: boolean): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  muteAllRemoteAudioStreams(mute: boolean): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setDefaultMuteAllRemoteAudioStreams(mute: boolean): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  muteRemoteAudioStream(uid: number, mute: boolean): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  muteLocalVideoStream(mute: boolean): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  enableLocalVideo(enabled: boolean): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  muteAllRemoteVideoStreams(mute: boolean): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setDefaultMuteAllRemoteVideoStreams(mute: boolean): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  muteRemoteVideoStream(uid: number, mute: boolean): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setRemoteVideoStreamType(
    uid: number,
    streamType: NATIVE_RTC.VIDEO_STREAM_TYPE
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setRemoteVideoSubscriptionOptions(
    uid: number,
    options: NATIVE_RTC.VideoSubscriptionOptions
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setRemoteDefaultVideoStreamType(
    streamType: NATIVE_RTC.VIDEO_STREAM_TYPE
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setSubscribeAudioBlocklist(
    uidList: number,
    uidNumber: number
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setSubscribeAudioAllowlist(
    uidList: number,
    uidNumber: number
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setSubscribeVideoBlocklist(
    uidList: number,
    uidNumber: number
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setSubscribeVideoAllowlist(
    uidList: number,
    uidNumber: number
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  enableAudioVolumeIndication(
    interval: number,
    smooth: number,
    reportVad: boolean
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
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
    throw new Error('Method not implemented.');
  }
  registerAudioEncodedFrameObserver(
    config: NATIVE_RTC.AudioEncodedFrameObserverConfig,
    observer: NATIVE_RTC.IAudioEncodedFrameObserver
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  stopAudioRecording(): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  createMediaPlayer(): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  destroyMediaPlayer(media_player: NATIVE_RTC.IMediaPlayer): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  createMediaRecorder(info: NATIVE_RTC.RecorderStreamInfo): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  destroyMediaRecorder(
    mediaRecorder: NATIVE_RTC.IMediaRecorder
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
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
    throw new Error('Method not implemented.');
  }
  stopAudioMixing(): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  pauseAudioMixing(): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  resumeAudioMixing(): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  selectAudioTrack(index: number): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  getAudioTrackCount(): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  adjustAudioMixingVolume(volume: number): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  adjustAudioMixingPublishVolume(volume: number): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  getAudioMixingPublishVolume(): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  adjustAudioMixingPlayoutVolume(volume: number): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  getAudioMixingPlayoutVolume(): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  getAudioMixingDuration(): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  getAudioMixingCurrentPosition(): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setAudioMixingPosition(pos: number): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setAudioMixingDualMonoMode(
    mode: NATIVE_RTC.AUDIO_MIXING_DUAL_MONO_MODE
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setAudioMixingPitch(pitch: number): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  getEffectsVolume(): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setEffectsVolume(volume: number): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  preloadEffect(
    soundId: number,
    filePath: string,
    startPos: number
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
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
    throw new Error('Method not implemented.');
  }
  playAllEffects(
    loopCount: number,
    pitch: number,
    pan: number,
    gain: number,
    publish: boolean
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  getVolumeOfEffect(soundId: number): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setVolumeOfEffect(soundId: number, volume: number): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  pauseEffect(soundId: number): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  pauseAllEffects(): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  resumeEffect(soundId: number): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  resumeAllEffects(): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  stopEffect(soundId: number): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  stopAllEffects(): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  unloadEffect(soundId: number): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  unloadAllEffects(): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  getEffectDuration(filePath: string): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setEffectPosition(soundId: number, pos: number): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  getEffectCurrentPosition(soundId: number): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  enableSoundPositionIndication(enabled: boolean): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setRemoteVoicePosition(
    uid: number,
    pan: number,
    gain: number
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  enableSpatialAudio(enabled: boolean): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setRemoteUserSpatialAudioParams(
    uid: number,
    params: NATIVE_RTC.SpatialAudioParams
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setVoiceBeautifierPreset(
    preset: NATIVE_RTC.VOICE_BEAUTIFIER_PRESET
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setAudioEffectPreset(
    preset: NATIVE_RTC.AUDIO_EFFECT_PRESET
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setVoiceConversionPreset(
    preset: NATIVE_RTC.VOICE_CONVERSION_PRESET
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setAudioEffectParameters(
    preset: NATIVE_RTC.AUDIO_EFFECT_PRESET,
    param1: number,
    param2: number
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setVoiceBeautifierParameters(
    preset: NATIVE_RTC.VOICE_BEAUTIFIER_PRESET,
    param1: number,
    param2: number
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setVoiceConversionParameters(
    preset: NATIVE_RTC.VOICE_CONVERSION_PRESET,
    param1: number,
    param2: number
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setLocalVoicePitch(pitch: number): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setLocalVoiceFormant(formantRatio: number): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setLocalVoiceEqualization(
    bandFrequency: NATIVE_RTC.AUDIO_EQUALIZATION_BAND_FREQUENCY,
    bandGain: number
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setLocalVoiceReverb(
    reverbKey: NATIVE_RTC.AUDIO_REVERB_TYPE,
    value: number
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setHeadphoneEQPreset(
    preset: NATIVE_RTC.HEADPHONE_EQUALIZER_PRESET
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setHeadphoneEQParameters(
    lowGain: number,
    highGain: number
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setLogFile(filePath: string): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setLogFilter(filter: number): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setLogLevel(level: NATIVE_RTC.LOG_LEVEL): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setLogFileSize(fileSizeInKBytes: number): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  uploadLogFile(requestId: string): CallApiReturnType {
    throw new Error('Method not implemented.');
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
    throw new Error('Method not implemented.');
  }
  setRemoteRenderMode(
    uid: number,
    renderMode: NATIVE_RTC.RENDER_MODE_TYPE,
    mirrorMode: NATIVE_RTC.VIDEO_MIRROR_MODE_TYPE
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setLocalVideoMirrorMode(
    mirrorMode: NATIVE_RTC.VIDEO_MIRROR_MODE_TYPE
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
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
    throw new Error('Method not implemented.');
  }
  setDualStreamMode(mode: NATIVE_RTC.SIMULCAST_STREAM_MODE): CallApiReturnType;
  setDualStreamMode(
    mode: NATIVE_RTC.SIMULCAST_STREAM_MODE,
    streamConfig: NATIVE_RTC.SimulcastStreamConfig
  ): CallApiReturnType;
  setDualStreamMode(mode: unknown, streamConfig?: unknown): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  enableCustomAudioLocalPlayback(
    trackId: number,
    enabled: boolean
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setRecordingAudioFrameParameters(
    sampleRate: number,
    channel: number,
    mode: NATIVE_RTC.RAW_AUDIO_FRAME_OP_MODE_TYPE,
    samplesPerCall: number
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setPlaybackAudioFrameParameters(
    sampleRate: number,
    channel: number,
    mode: NATIVE_RTC.RAW_AUDIO_FRAME_OP_MODE_TYPE,
    samplesPerCall: number
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setMixedAudioFrameParameters(
    sampleRate: number,
    channel: number,
    samplesPerCall: number
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setEarMonitoringAudioFrameParameters(
    sampleRate: number,
    channel: number,
    mode: NATIVE_RTC.RAW_AUDIO_FRAME_OP_MODE_TYPE,
    samplesPerCall: number
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setPlaybackAudioFrameBeforeMixingParameters(
    sampleRate: number,
    channel: number
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  enableAudioSpectrumMonitor(intervalInMS: number): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  disableAudioSpectrumMonitor(): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  registerAudioSpectrumObserver(
    observer: NATIVE_RTC.IAudioSpectrumObserver
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  unregisterAudioSpectrumObserver(
    observer: NATIVE_RTC.IAudioSpectrumObserver
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  adjustRecordingSignalVolume(volume: number): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  muteRecordingSignal(mute: boolean): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  adjustPlaybackSignalVolume(volume: number): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  adjustUserPlaybackSignalVolume(
    uid: number,
    volume: number
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setLocalPublishFallbackOption(
    option: NATIVE_RTC.STREAM_FALLBACK_OPTIONS
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setRemoteSubscribeFallbackOption(
    option: NATIVE_RTC.STREAM_FALLBACK_OPTIONS
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setHighPriorityUserList(
    uidList: number,
    uidNum: number,
    option: NATIVE_RTC.STREAM_FALLBACK_OPTIONS
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  enableLoopbackRecording(
    enabled: boolean,
    deviceName: string
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  adjustLoopbackSignalVolume(volume: number): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  getLoopbackRecordingVolume(): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  enableInEarMonitoring(
    enabled: boolean,
    includeAudioFilters: number
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setInEarMonitoringVolume(volume: number): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  loadExtensionProvider(
    path: string,
    unload_after_use: boolean
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setExtensionProviderProperty(
    provider: string,
    key: string,
    value: string
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  registerExtension(
    provider: string,
    extension: string,
    type: NATIVE_RTC.MEDIA_SOURCE_TYPE
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
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
    throw new Error('Method not implemented.');
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
    throw new Error('Method not implemented.');
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
    throw new Error('Method not implemented.');
  }
  setCameraCapturerConfiguration(
    config: NATIVE_RTC.CameraCapturerConfiguration
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  createCustomVideoTrack(): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  createCustomEncodedVideoTrack(
    sender_option: NATIVE_RTC.SenderOptions
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  destroyCustomVideoTrack(video_track_id: number): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  destroyCustomEncodedVideoTrack(video_track_id: number): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  switchCamera(): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  isCameraZoomSupported(): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  isCameraFaceDetectSupported(): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  isCameraTorchSupported(): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  isCameraFocusSupported(): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  isCameraAutoFocusFaceModeSupported(): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setCameraZoomFactor(factor: number): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  enableFaceDetection(enabled: boolean): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  getCameraMaxZoomFactor(): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setCameraFocusPositionInPreview(
    positionX: number,
    positionY: number
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setCameraTorchOn(isOn: boolean): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setCameraAutoFocusFaceModeEnabled(enabled: boolean): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  isCameraExposurePositionSupported(): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setCameraExposurePosition(
    positionXinView: number,
    positionYinView: number
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  isCameraExposureSupported(): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setCameraExposureFactor(factor: number): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  isCameraAutoExposureFaceModeSupported(): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setCameraAutoExposureFaceModeEnabled(enabled: boolean): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setDefaultAudioRouteToSpeakerphone(
    defaultToSpeaker: boolean
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setEnableSpeakerphone(speakerOn: boolean): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  isSpeakerphoneEnabled(): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setRouteInCommunicationMode(route: number): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  getScreenCaptureSources(
    thumbSize: NATIVE_RTC.SIZE,
    iconSize: NATIVE_RTC.SIZE,
    includeScreen: boolean
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setAudioSessionOperationRestriction(
    restriction: NATIVE_RTC.AUDIO_SESSION_OPERATION_RESTRICTION
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  startScreenCaptureByDisplayId(
    displayId: number,
    regionRect: NATIVE_RTC.Rectangle,
    captureParams: NATIVE_RTC.ScreenCaptureParameters
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  startScreenCaptureByScreenRect(
    screenRect: NATIVE_RTC.Rectangle,
    regionRect: NATIVE_RTC.Rectangle,
    captureParams: NATIVE_RTC.ScreenCaptureParameters
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  getAudioDeviceInfo(deviceInfo: NATIVE_RTC.DeviceInfo): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  startScreenCaptureByWindowId(
    windowId: number,
    regionRect: NATIVE_RTC.Rectangle,
    captureParams: NATIVE_RTC.ScreenCaptureParameters
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setScreenCaptureContentHint(
    contentHint: NATIVE_RTC.VIDEO_CONTENT_HINT
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  updateScreenCaptureRegion(
    regionRect: NATIVE_RTC.Rectangle
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  updateScreenCaptureParameters(
    captureParams: NATIVE_RTC.ScreenCaptureParameters
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  startScreenCapture(
    captureParams: NATIVE_RTC.ScreenCaptureParameters2
  ): CallApiReturnType;
  startScreenCapture(
    sourceType: NATIVE_RTC.VIDEO_SOURCE_TYPE,
    config: NATIVE_RTC.ScreenCaptureConfiguration
  ): CallApiReturnType;
  startScreenCapture(sourceType: unknown, config?: unknown): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  updateScreenCapture(
    captureParams: NATIVE_RTC.ScreenCaptureParameters2
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  queryScreenCaptureCapability(): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setScreenCaptureScenario(
    screenScenario: NATIVE_RTC.SCREEN_SCENARIO_TYPE
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  stopScreenCapture(): CallApiReturnType;
  stopScreenCapture(
    sourceType: NATIVE_RTC.VIDEO_SOURCE_TYPE
  ): CallApiReturnType;
  stopScreenCapture(sourceType?: unknown): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  getCallId(callId: string): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  rate(callId: string, rating: number, description: string): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  complain(callId: string, description: string): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  startRtmpStreamWithoutTranscoding(url: string): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  startRtmpStreamWithTranscoding(
    url: string,
    transcoding: NATIVE_RTC.LiveTranscoding
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  updateRtmpTranscoding(
    transcoding: NATIVE_RTC.LiveTranscoding
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  stopRtmpStream(url: string): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  startLocalVideoTranscoder(
    config: NATIVE_RTC.LocalTranscoderConfiguration
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  updateLocalTranscoderConfiguration(
    config: NATIVE_RTC.LocalTranscoderConfiguration
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  stopLocalVideoTranscoder(): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  startCameraCapture(
    sourceType: NATIVE_RTC.VIDEO_SOURCE_TYPE,
    config: NATIVE_RTC.CameraCapturerConfiguration
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  stopCameraCapture(
    sourceType: NATIVE_RTC.VIDEO_SOURCE_TYPE
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setCameraDeviceOrientation(
    type: NATIVE_RTC.VIDEO_SOURCE_TYPE,
    orientation: NATIVE_RTC.VIDEO_ORIENTATION
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setScreenCaptureOrientation(
    type: NATIVE_RTC.VIDEO_SOURCE_TYPE,
    orientation: NATIVE_RTC.VIDEO_ORIENTATION
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  getConnectionState(): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  registerEventHandler(
    eventHandler: NATIVE_RTC.IRtcEngineEventHandler
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  unregisterEventHandler(
    eventHandler: NATIVE_RTC.IRtcEngineEventHandler
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setRemoteUserPriority(
    uid: number,
    userPriority: NATIVE_RTC.PRIORITY_TYPE
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setEncryptionMode(encryptionMode: string): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setEncryptionSecret(secret: string): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  enableEncryption(
    enabled: boolean,
    config: NATIVE_RTC.EncryptionConfig
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
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
    throw new Error('Method not implemented.');
  }
  sendStreamMessage(
    streamId: number,
    data: string,
    length: number
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
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
    throw new Error('Method not implemented.');
  }
  clearVideoWatermarks(): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  pauseAudio(): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  resumeAudio(): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  enableWebSdkInteroperability(enabled: boolean): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  sendCustomReportMessage(
    id: string,
    category: string,
    event: string,
    label: string,
    value: number
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  registerMediaMetadataObserver(
    observer: NATIVE_RTC.IMetadataObserver,
    type: NATIVE_RTC.METADATA_TYPE
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  unregisterMediaMetadataObserver(
    observer: NATIVE_RTC.IMetadataObserver,
    type: NATIVE_RTC.METADATA_TYPE
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
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
    throw new Error('Method not implemented.');
  }
  stopAudioFrameDump(
    channel_id: string,
    user_id: number,
    location: string
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setAINSMode(
    enabled: boolean,
    mode: NATIVE_RTC.AUDIO_AINS_MODE
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  registerLocalUserAccount(
    appId: string,
    userAccount: string
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
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
    throw new Error('Method not implemented.');
  }
  joinChannelWithUserAccountEx(
    token: string,
    channelId: string,
    userAccount: string,
    options: NATIVE_RTC.ChannelMediaOptions
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  getUserInfoByUserAccount(
    userAccount: string,
    userInfo: NATIVE_RTC.UserInfo
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  getUserInfoByUid(
    uid: number,
    userInfo: NATIVE_RTC.UserInfo
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  startOrUpdateChannelMediaRelay(
    configuration: NATIVE_RTC.ChannelMediaRelayConfiguration
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  startChannelMediaRelay(
    configuration: NATIVE_RTC.ChannelMediaRelayConfiguration
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  updateChannelMediaRelay(
    configuration: NATIVE_RTC.ChannelMediaRelayConfiguration
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  stopChannelMediaRelay(): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  pauseAllChannelMediaRelay(): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  resumeAllChannelMediaRelay(): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setDirectCdnStreamingAudioConfiguration(
    profile: NATIVE_RTC.AUDIO_PROFILE_TYPE
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setDirectCdnStreamingVideoConfiguration(
    config: NATIVE_RTC.VideoEncoderConfiguration
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  startDirectCdnStreaming(
    eventHandler: NATIVE_RTC.IDirectCdnStreamingEventHandler,
    publishUrl: string,
    options: NATIVE_RTC.DirectCdnStreamingMediaOptions
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  stopDirectCdnStreaming(): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  updateDirectCdnStreamingMediaOptions(
    options: NATIVE_RTC.DirectCdnStreamingMediaOptions
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  startRhythmPlayer(
    sound1: string,
    sound2: string,
    config: NATIVE_RTC.AgoraRhythmPlayerConfig
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  stopRhythmPlayer(): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  configRhythmPlayer(
    config: NATIVE_RTC.AgoraRhythmPlayerConfig
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  takeSnapshot(uid: number, filePath: string): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  enableContentInspect(
    enabled: boolean,
    config: NATIVE_RTC.ContentInspectConfig
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  adjustCustomAudioPublishVolume(
    trackId: number,
    volume: number
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  adjustCustomAudioPlayoutVolume(
    trackId: number,
    volume: number
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setCloudProxy(proxyType: NATIVE_RTC.CLOUD_PROXY_TYPE): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setLocalAccessPoint(
    config: NATIVE_RTC.LocalAccessPointConfiguration
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setAdvancedAudioOptions(
    options: NATIVE_RTC.AdvancedAudioOptions,
    sourceType: number
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setAVSyncSource(channelId: string, uid: number): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  enableVideoImageSource(
    enable: boolean,
    options: NATIVE_RTC.ImageTrackOptions
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  getCurrentMonotonicTimeInMs(): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  enableWirelessAccelerate(enabled: boolean): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  getNetworkType(): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setParameters(parameters: string): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  startMediaRenderingTracing(): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  enableInstantMediaRendering(): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  getNtpWallTimeInMs(): CallApiReturnType {
    throw new Error('Method not implemented.');
  }

  public putAction(action: Action) {
    this._engine.actionQueue.putAction(action);
  }
}
