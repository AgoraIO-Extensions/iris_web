import * as NATIVE_RTC from '@iris/web-rtc';
import AgoraRTC from 'agora-rtc-sdk-ng';
import {
  AsyncTaskType,
  CallApiReturnType,
  CallIrisApiResult,
} from 'iris-web-core';

import { IrisRtcEngine } from '../engine/IrisRtcEngine';
import { Action } from '../util/AgoraActionQueue';
import { AgoraConsole } from '../util/AgoraConsole';
import { AgoraTranslate } from '../util/AgoraTranslate';

export const RTCENGINE_KEY = 'RtcEngine';

export class IRtcEngineImpl implements NATIVE_RTC.IRtcEngine {
  private _engine: IrisRtcEngine = null;

  constructor(engine: IrisRtcEngine) {
    this._engine = engine;
  }

  putAction(action: Action) {
    this._engine.actionQueue.putAction(action);
  }

  private execute(task: AsyncTaskType): CallApiReturnType {
    return this._engine.executor.execute(task);
  }

  isFeatureAvailableOnDevice(type: NATIVE_RTC.FeatureType): CallApiReturnType {
    AgoraConsole.warn(
      'isFeatureAvailableOnDevice not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }

  release(sync: boolean): CallApiReturnType {
    AgoraConsole.warn('release not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  initialize(context: NATIVE_RTC.RtcEngineContext): CallApiReturnType {
    let processFunc = async (): Promise<CallIrisApiResult> => {
      console.log('RtcEngineImpl initialize');
      this._engine.globalVariables.appId = context.appId;
      this._engine.mainClientVariables.channelProfile = context.channelProfile;
      this._engine.globalVariables.audioScenario = context.audioScenario;
      this._engine.globalVariables.areaCode = context.areaCode;

      AgoraRTC.setArea([
        AgoraTranslate.NATIVE_RTCAREA_CODE2AREAS(context.areaCode),
      ]);

      if (context.logConfig && context.logConfig.level) {
        AgoraConsole.logLevel = context.logConfig.level;
        let numberLevel: number = AgoraTranslate.NATIVE_RTCLOG_LEVEL2Number(
          context.logConfig.level
        );
        AgoraRTC.setLogLevel(numberLevel);
      }

      let result = AgoraRTC.checkSystemRequirements();
      if (result) {
        AgoraConsole.log('AgoraRTC.checkSystemRequirements return true');
      } else {
        AgoraConsole.warn('AgoraRTC.checkSystemRequirements reutrn false');
      }

      console.log('RtcEngineImpl initialize 22222');
      return Promise.resolve(
        new CallIrisApiResult(0, '{"result": 0, "other": 111}')
      );
    };

    return this.execute(processFunc);
  }
  getVersion(): CallApiReturnType {
    AgoraConsole.warn('getVersion not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getErrorDescription(code: number): CallApiReturnType {
    AgoraConsole.warn('getErrorDescription not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  queryCodecCapability(
    codecInfo: NATIVE_RTC.CodecCapInfo[],
    size: number
  ): CallApiReturnType {
    AgoraConsole.warn('queryCodecCapability not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  preloadChannel(
    token: string,
    channelId: string,
    uid: number
  ): CallApiReturnType {
    AgoraConsole.warn('preloadChannel not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  preloadChannel2(
    token: string,
    channelId: string,
    userAccount: string
  ): CallApiReturnType {
    AgoraConsole.warn('preloadChannel2 not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  updatePreloadChannelToken(token: string): CallApiReturnType {
    AgoraConsole.warn(
      'updatePreloadChannelToken not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  joinChannel(
    token: string,
    channelId: string,
    info: string,
    uid: number
  ): CallApiReturnType {
    AgoraConsole.warn('joinChannel not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  joinChannel2(
    token: string,
    channelId: string,
    uid: number,
    options: NATIVE_RTC.ChannelMediaOptions
  ): CallApiReturnType {
    AgoraConsole.warn('joinChannel2 not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  updateChannelMediaOptions(
    options: NATIVE_RTC.ChannelMediaOptions
  ): CallApiReturnType {
    AgoraConsole.warn(
      'updateChannelMediaOptions not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  leaveChannel(): CallApiReturnType {
    AgoraConsole.warn('leaveChannel not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  leaveChannel2(options: NATIVE_RTC.LeaveChannelOptions): CallApiReturnType {
    AgoraConsole.warn('leaveChannel2 not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  renewToken(token: string): CallApiReturnType {
    AgoraConsole.warn('renewToken not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setChannelProfile(
    profile: NATIVE_RTC.CHANNEL_PROFILE_TYPE
  ): CallApiReturnType {
    AgoraConsole.warn('setChannelProfile not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setClientRole(role: NATIVE_RTC.CLIENT_ROLE_TYPE): CallApiReturnType {
    AgoraConsole.warn('setClientRole not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setClientRole2(
    role: NATIVE_RTC.CLIENT_ROLE_TYPE,
    options: NATIVE_RTC.ClientRoleOptions
  ): CallApiReturnType {
    AgoraConsole.warn('setClientRole2 not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  startEchoTest(): CallApiReturnType {
    AgoraConsole.warn('startEchoTest not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  startEchoTest2(intervalInSeconds: number): CallApiReturnType {
    AgoraConsole.warn('startEchoTest2 not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  startEchoTest3(config: NATIVE_RTC.EchoTestConfiguration): CallApiReturnType {
    AgoraConsole.warn('startEchoTest3 not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  stopEchoTest(): CallApiReturnType {
    AgoraConsole.warn('stopEchoTest not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  enableMultiCamera(
    enabled: boolean,
    config: NATIVE_RTC.CameraCapturerConfiguration
  ): CallApiReturnType {
    AgoraConsole.warn('enableMultiCamera not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  enableVideo(): CallApiReturnType {
    AgoraConsole.warn('enableVideo not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  disableVideo(): CallApiReturnType {
    AgoraConsole.warn('disableVideo not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  startPreview(): CallApiReturnType {
    AgoraConsole.warn('startPreview not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  startPreview2(sourceType: NATIVE_RTC.VIDEO_SOURCE_TYPE): CallApiReturnType {
    AgoraConsole.warn('startPreview2 not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  stopPreview(): CallApiReturnType {
    AgoraConsole.warn('stopPreview not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  stopPreview2(sourceType: NATIVE_RTC.VIDEO_SOURCE_TYPE): CallApiReturnType {
    AgoraConsole.warn('stopPreview2 not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  startLastmileProbeTest(
    config: NATIVE_RTC.LastmileProbeConfig
  ): CallApiReturnType {
    AgoraConsole.warn('startLastmileProbeTest not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  stopLastmileProbeTest(): CallApiReturnType {
    AgoraConsole.warn('stopLastmileProbeTest not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setVideoEncoderConfiguration(
    config: NATIVE_RTC.VideoEncoderConfiguration
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setVideoEncoderConfiguration not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setBeautyEffectOptions(
    enabled: boolean,
    options: NATIVE_RTC.BeautyOptions,
    type: NATIVE_RTC.MEDIA_SOURCE_TYPE
  ): CallApiReturnType {
    AgoraConsole.warn('setBeautyEffectOptions not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setLowlightEnhanceOptions(
    enabled: boolean,
    options: NATIVE_RTC.LowlightEnhanceOptions,
    type: NATIVE_RTC.MEDIA_SOURCE_TYPE
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setLowlightEnhanceOptions not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setVideoDenoiserOptions(
    enabled: boolean,
    options: NATIVE_RTC.VideoDenoiserOptions,
    type: NATIVE_RTC.MEDIA_SOURCE_TYPE
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setVideoDenoiserOptions not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setColorEnhanceOptions(
    enabled: boolean,
    options: NATIVE_RTC.ColorEnhanceOptions,
    type: NATIVE_RTC.MEDIA_SOURCE_TYPE
  ): CallApiReturnType {
    AgoraConsole.warn('setColorEnhanceOptions not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  enableVirtualBackground(
    enabled: boolean,
    backgroundSource: NATIVE_RTC.VirtualBackgroundSource,
    segproperty: NATIVE_RTC.SegmentationProperty,
    type: NATIVE_RTC.MEDIA_SOURCE_TYPE
  ): CallApiReturnType {
    AgoraConsole.warn(
      'enableVirtualBackground not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setupRemoteVideo(canvas: NATIVE_RTC.VideoCanvas): CallApiReturnType {
    AgoraConsole.warn('setupRemoteVideo not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setupLocalVideo(canvas: NATIVE_RTC.VideoCanvas): CallApiReturnType {
    AgoraConsole.warn('setupLocalVideo not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setVideoScenario(
    scenarioType: NATIVE_RTC.VIDEO_APPLICATION_SCENARIO_TYPE
  ): CallApiReturnType {
    AgoraConsole.warn('setVideoScenario not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  enableAudio(): CallApiReturnType {
    AgoraConsole.warn('enableAudio not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  disableAudio(): CallApiReturnType {
    AgoraConsole.warn('disableAudio not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setAudioProfile(
    profile: NATIVE_RTC.AUDIO_PROFILE_TYPE,
    scenario: NATIVE_RTC.AUDIO_SCENARIO_TYPE
  ): CallApiReturnType {
    AgoraConsole.warn('setAudioProfile not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setAudioProfile2(profile: NATIVE_RTC.AUDIO_PROFILE_TYPE): CallApiReturnType {
    AgoraConsole.warn('setAudioProfile2 not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setAudioScenario(
    scenario: NATIVE_RTC.AUDIO_SCENARIO_TYPE
  ): CallApiReturnType {
    AgoraConsole.warn('setAudioScenario not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  enableLocalAudio(enabled: boolean): CallApiReturnType {
    AgoraConsole.warn('enableLocalAudio not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  muteLocalAudioStream(mute: boolean): CallApiReturnType {
    AgoraConsole.warn('muteLocalAudioStream not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  muteAllRemoteAudioStreams(mute: boolean): CallApiReturnType {
    AgoraConsole.warn(
      'muteAllRemoteAudioStreams not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setDefaultMuteAllRemoteAudioStreams(mute: boolean): CallApiReturnType {
    AgoraConsole.warn(
      'setDefaultMuteAllRemoteAudioStreams not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  muteRemoteAudioStream(uid: number, mute: boolean): CallApiReturnType {
    AgoraConsole.warn('muteRemoteAudioStream not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  muteLocalVideoStream(mute: boolean): CallApiReturnType {
    AgoraConsole.warn('muteLocalVideoStream not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  enableLocalVideo(enabled: boolean): CallApiReturnType {
    AgoraConsole.warn('enableLocalVideo not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  muteAllRemoteVideoStreams(mute: boolean): CallApiReturnType {
    AgoraConsole.warn(
      'muteAllRemoteVideoStreams not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setDefaultMuteAllRemoteVideoStreams(mute: boolean): CallApiReturnType {
    AgoraConsole.warn(
      'setDefaultMuteAllRemoteVideoStreams not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  muteRemoteVideoStream(uid: number, mute: boolean): CallApiReturnType {
    AgoraConsole.warn('muteRemoteVideoStream not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setRemoteVideoStreamType(
    uid: number,
    streamType: NATIVE_RTC.VIDEO_STREAM_TYPE
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setRemoteVideoStreamType not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setRemoteVideoSubscriptionOptions(
    uid: number,
    options: NATIVE_RTC.VideoSubscriptionOptions
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setRemoteVideoSubscriptionOptions not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setRemoteDefaultVideoStreamType(
    streamType: NATIVE_RTC.VIDEO_STREAM_TYPE
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setRemoteDefaultVideoStreamType not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setSubscribeAudioBlocklist(
    uidList: number,
    uidNumber: number
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setSubscribeAudioBlocklist not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setSubscribeAudioAllowlist(
    uidList: number,
    uidNumber: number
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setSubscribeAudioAllowlist not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setSubscribeVideoBlocklist(
    uidList: number,
    uidNumber: number
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setSubscribeVideoBlocklist not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setSubscribeVideoAllowlist(
    uidList: number,
    uidNumber: number
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setSubscribeVideoAllowlist not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  enableAudioVolumeIndication(
    interval: number,
    smooth: number,
    reportVad: boolean
  ): CallApiReturnType {
    AgoraConsole.warn(
      'enableAudioVolumeIndication not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  startAudioRecording(
    filePath: string,
    quality: NATIVE_RTC.AUDIO_RECORDING_QUALITY_TYPE
  ): CallApiReturnType {
    AgoraConsole.warn('startAudioRecording not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  startAudioRecording2(
    filePath: string,
    sampleRate: number,
    quality: NATIVE_RTC.AUDIO_RECORDING_QUALITY_TYPE
  ): CallApiReturnType {
    AgoraConsole.warn('startAudioRecording2 not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  startAudioRecording3(
    config: NATIVE_RTC.AudioRecordingConfiguration
  ): CallApiReturnType {
    AgoraConsole.warn('startAudioRecording3 not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  registerAudioEncodedFrameObserver(
    config: NATIVE_RTC.AudioEncodedFrameObserverConfig,
    observer: NATIVE_RTC.IAudioEncodedFrameObserver
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioEncodedFrameObserver not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  stopAudioRecording(): CallApiReturnType {
    AgoraConsole.warn('stopAudioRecording not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  createMediaPlayer(): CallApiReturnType {
    AgoraConsole.warn('createMediaPlayer not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  destroyMediaPlayer(media_player: NATIVE_RTC.IMediaPlayer): CallApiReturnType {
    AgoraConsole.warn('destroyMediaPlayer not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  createMediaRecorder(info: NATIVE_RTC.RecorderStreamInfo): CallApiReturnType {
    AgoraConsole.warn('createMediaRecorder not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  destroyMediaRecorder(
    mediaRecorder: NATIVE_RTC.IMediaRecorder
  ): CallApiReturnType {
    AgoraConsole.warn('destroyMediaRecorder not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  startAudioMixing(
    filePath: string,
    loopback: boolean,
    cycle: number
  ): CallApiReturnType {
    AgoraConsole.warn('startAudioMixing not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  startAudioMixing2(
    filePath: string,
    loopback: boolean,
    cycle: number,
    startPos: number
  ): CallApiReturnType {
    AgoraConsole.warn('startAudioMixing2 not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  stopAudioMixing(): CallApiReturnType {
    AgoraConsole.warn('stopAudioMixing not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  pauseAudioMixing(): CallApiReturnType {
    AgoraConsole.warn('pauseAudioMixing not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  resumeAudioMixing(): CallApiReturnType {
    AgoraConsole.warn('resumeAudioMixing not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  selectAudioTrack(index: number): CallApiReturnType {
    AgoraConsole.warn('selectAudioTrack not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getAudioTrackCount(): CallApiReturnType {
    AgoraConsole.warn('getAudioTrackCount not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  adjustAudioMixingVolume(volume: number): CallApiReturnType {
    AgoraConsole.warn(
      'adjustAudioMixingVolume not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  adjustAudioMixingPublishVolume(volume: number): CallApiReturnType {
    AgoraConsole.warn(
      'adjustAudioMixingPublishVolume not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getAudioMixingPublishVolume(): CallApiReturnType {
    AgoraConsole.warn(
      'getAudioMixingPublishVolume not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  adjustAudioMixingPlayoutVolume(volume: number): CallApiReturnType {
    AgoraConsole.warn(
      'adjustAudioMixingPlayoutVolume not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getAudioMixingPlayoutVolume(): CallApiReturnType {
    AgoraConsole.warn(
      'getAudioMixingPlayoutVolume not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getAudioMixingDuration(): CallApiReturnType {
    AgoraConsole.warn('getAudioMixingDuration not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getAudioMixingCurrentPosition(): CallApiReturnType {
    AgoraConsole.warn(
      'getAudioMixingCurrentPosition not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setAudioMixingPosition(pos: number): CallApiReturnType {
    AgoraConsole.warn('setAudioMixingPosition not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setAudioMixingDualMonoMode(
    mode: NATIVE_RTC.AUDIO_MIXING_DUAL_MONO_MODE
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setAudioMixingDualMonoMode not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setAudioMixingPitch(pitch: number): CallApiReturnType {
    AgoraConsole.warn('setAudioMixingPitch not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getEffectsVolume(): CallApiReturnType {
    AgoraConsole.warn('getEffectsVolume not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setEffectsVolume(volume: number): CallApiReturnType {
    AgoraConsole.warn('setEffectsVolume not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  preloadEffect(
    soundId: number,
    filePath: string,
    startPos: number
  ): CallApiReturnType {
    AgoraConsole.warn('preloadEffect not supported in this platform!');
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
    AgoraConsole.warn('playEffect not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  playAllEffects(
    loopCount: number,
    pitch: number,
    pan: number,
    gain: number,
    publish: boolean
  ): CallApiReturnType {
    AgoraConsole.warn('playAllEffects not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getVolumeOfEffect(soundId: number): CallApiReturnType {
    AgoraConsole.warn('getVolumeOfEffect not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setVolumeOfEffect(soundId: number, volume: number): CallApiReturnType {
    AgoraConsole.warn('setVolumeOfEffect not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  pauseEffect(soundId: number): CallApiReturnType {
    AgoraConsole.warn('pauseEffect not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  pauseAllEffects(): CallApiReturnType {
    AgoraConsole.warn('pauseAllEffects not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  resumeEffect(soundId: number): CallApiReturnType {
    AgoraConsole.warn('resumeEffect not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  resumeAllEffects(): CallApiReturnType {
    AgoraConsole.warn('resumeAllEffects not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  stopEffect(soundId: number): CallApiReturnType {
    AgoraConsole.warn('stopEffect not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  stopAllEffects(): CallApiReturnType {
    AgoraConsole.warn('stopAllEffects not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  unloadEffect(soundId: number): CallApiReturnType {
    AgoraConsole.warn('unloadEffect not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  unloadAllEffects(): CallApiReturnType {
    AgoraConsole.warn('unloadAllEffects not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getEffectDuration(filePath: string): CallApiReturnType {
    AgoraConsole.warn('getEffectDuration not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setEffectPosition(soundId: number, pos: number): CallApiReturnType {
    AgoraConsole.warn('setEffectPosition not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getEffectCurrentPosition(soundId: number): CallApiReturnType {
    AgoraConsole.warn(
      'getEffectCurrentPosition not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  enableSoundPositionIndication(enabled: boolean): CallApiReturnType {
    AgoraConsole.warn(
      'enableSoundPositionIndication not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setRemoteVoicePosition(
    uid: number,
    pan: number,
    gain: number
  ): CallApiReturnType {
    AgoraConsole.warn('setRemoteVoicePosition not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  enableSpatialAudio(enabled: boolean): CallApiReturnType {
    AgoraConsole.warn('enableSpatialAudio not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setRemoteUserSpatialAudioParams(
    uid: number,
    params: NATIVE_RTC.SpatialAudioParams
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setRemoteUserSpatialAudioParams not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setVoiceBeautifierPreset(
    preset: NATIVE_RTC.VOICE_BEAUTIFIER_PRESET
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setVoiceBeautifierPreset not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setAudioEffectPreset(
    preset: NATIVE_RTC.AUDIO_EFFECT_PRESET
  ): CallApiReturnType {
    AgoraConsole.warn('setAudioEffectPreset not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setVoiceConversionPreset(
    preset: NATIVE_RTC.VOICE_CONVERSION_PRESET
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setVoiceConversionPreset not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setAudioEffectParameters(
    preset: NATIVE_RTC.AUDIO_EFFECT_PRESET,
    param1: number,
    param2: number
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setAudioEffectParameters not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setVoiceBeautifierParameters(
    preset: NATIVE_RTC.VOICE_BEAUTIFIER_PRESET,
    param1: number,
    param2: number
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setVoiceBeautifierParameters not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setVoiceConversionParameters(
    preset: NATIVE_RTC.VOICE_CONVERSION_PRESET,
    param1: number,
    param2: number
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setVoiceConversionParameters not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setLocalVoicePitch(pitch: number): CallApiReturnType {
    AgoraConsole.warn('setLocalVoicePitch not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setLocalVoiceFormant(formantRatio: number): CallApiReturnType {
    AgoraConsole.warn('setLocalVoiceFormant not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setLocalVoiceEqualization(
    bandFrequency: NATIVE_RTC.AUDIO_EQUALIZATION_BAND_FREQUENCY,
    bandGain: number
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setLocalVoiceEqualization not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setLocalVoiceReverb(
    reverbKey: NATIVE_RTC.AUDIO_REVERB_TYPE,
    value: number
  ): CallApiReturnType {
    AgoraConsole.warn('setLocalVoiceReverb not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setHeadphoneEQPreset(
    preset: NATIVE_RTC.HEADPHONE_EQUALIZER_PRESET
  ): CallApiReturnType {
    AgoraConsole.warn('setHeadphoneEQPreset not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setHeadphoneEQParameters(
    lowGain: number,
    highGain: number
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setHeadphoneEQParameters not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setLogFile(filePath: string): CallApiReturnType {
    AgoraConsole.warn('setLogFile not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setLogFilter(filter: number): CallApiReturnType {
    AgoraConsole.warn('setLogFilter not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setLogLevel(level: NATIVE_RTC.LOG_LEVEL): CallApiReturnType {
    AgoraConsole.warn('setLogLevel not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setLogFileSize(fileSizeInKBytes: number): CallApiReturnType {
    AgoraConsole.warn('setLogFileSize not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  uploadLogFile(requestId: string): CallApiReturnType {
    AgoraConsole.warn('uploadLogFile not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setLocalRenderMode(
    renderMode: NATIVE_RTC.RENDER_MODE_TYPE,
    mirrorMode: NATIVE_RTC.VIDEO_MIRROR_MODE_TYPE
  ): CallApiReturnType {
    AgoraConsole.warn('setLocalRenderMode not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setRemoteRenderMode(
    uid: number,
    renderMode: NATIVE_RTC.RENDER_MODE_TYPE,
    mirrorMode: NATIVE_RTC.VIDEO_MIRROR_MODE_TYPE
  ): CallApiReturnType {
    AgoraConsole.warn('setRemoteRenderMode not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setLocalRenderMode2(
    renderMode: NATIVE_RTC.RENDER_MODE_TYPE
  ): CallApiReturnType {
    AgoraConsole.warn('setLocalRenderMode2 not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setLocalVideoMirrorMode(
    mirrorMode: NATIVE_RTC.VIDEO_MIRROR_MODE_TYPE
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setLocalVideoMirrorMode not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  enableDualStreamMode(enabled: boolean): CallApiReturnType {
    AgoraConsole.warn('enableDualStreamMode not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  enableDualStreamMode2(
    enabled: boolean,
    streamConfig: NATIVE_RTC.SimulcastStreamConfig
  ): CallApiReturnType {
    AgoraConsole.warn('enableDualStreamMode2 not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setDualStreamMode(mode: NATIVE_RTC.SIMULCAST_STREAM_MODE): CallApiReturnType {
    AgoraConsole.warn('setDualStreamMode not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setDualStreamMode2(
    mode: NATIVE_RTC.SIMULCAST_STREAM_MODE,
    streamConfig: NATIVE_RTC.SimulcastStreamConfig
  ): CallApiReturnType {
    AgoraConsole.warn('setDualStreamMode2 not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  enableCustomAudioLocalPlayback(
    trackId: number,
    enabled: boolean
  ): CallApiReturnType {
    AgoraConsole.warn(
      'enableCustomAudioLocalPlayback not supported in this platform!'
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
      'setRecordingAudioFrameParameters not supported in this platform!'
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
      'setPlaybackAudioFrameParameters not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setMixedAudioFrameParameters(
    sampleRate: number,
    channel: number,
    samplesPerCall: number
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setMixedAudioFrameParameters not supported in this platform!'
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
      'setEarMonitoringAudioFrameParameters not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setPlaybackAudioFrameBeforeMixingParameters(
    sampleRate: number,
    channel: number
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setPlaybackAudioFrameBeforeMixingParameters not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  enableAudioSpectrumMonitor(intervalInMS: number): CallApiReturnType {
    AgoraConsole.warn(
      'enableAudioSpectrumMonitor not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  disableAudioSpectrumMonitor(): CallApiReturnType {
    AgoraConsole.warn(
      'disableAudioSpectrumMonitor not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  registerAudioSpectrumObserver(
    observer: NATIVE_RTC.IAudioSpectrumObserver
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioSpectrumObserver not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  unregisterAudioSpectrumObserver(
    observer: NATIVE_RTC.IAudioSpectrumObserver
  ): CallApiReturnType {
    AgoraConsole.warn(
      'unregisterAudioSpectrumObserver not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  adjustRecordingSignalVolume(volume: number): CallApiReturnType {
    AgoraConsole.warn(
      'adjustRecordingSignalVolume not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  muteRecordingSignal(mute: boolean): CallApiReturnType {
    AgoraConsole.warn('muteRecordingSignal not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  adjustPlaybackSignalVolume(volume: number): CallApiReturnType {
    AgoraConsole.warn(
      'adjustPlaybackSignalVolume not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  adjustUserPlaybackSignalVolume(
    uid: number,
    volume: number
  ): CallApiReturnType {
    AgoraConsole.warn(
      'adjustUserPlaybackSignalVolume not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setLocalPublishFallbackOption(
    option: NATIVE_RTC.STREAM_FALLBACK_OPTIONS
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setLocalPublishFallbackOption not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setRemoteSubscribeFallbackOption(
    option: NATIVE_RTC.STREAM_FALLBACK_OPTIONS
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setRemoteSubscribeFallbackOption not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setHighPriorityUserList(
    uidList: number,
    uidNum: number,
    option: NATIVE_RTC.STREAM_FALLBACK_OPTIONS
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setHighPriorityUserList not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  enableLoopbackRecording(
    enabled: boolean,
    deviceName: string
  ): CallApiReturnType {
    AgoraConsole.warn(
      'enableLoopbackRecording not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  adjustLoopbackSignalVolume(volume: number): CallApiReturnType {
    AgoraConsole.warn(
      'adjustLoopbackSignalVolume not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getLoopbackRecordingVolume(): CallApiReturnType {
    AgoraConsole.warn(
      'getLoopbackRecordingVolume not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  enableInEarMonitoring(
    enabled: boolean,
    includeAudioFilters: number
  ): CallApiReturnType {
    AgoraConsole.warn('enableInEarMonitoring not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setInEarMonitoringVolume(volume: number): CallApiReturnType {
    AgoraConsole.warn(
      'setInEarMonitoringVolume not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  loadExtensionProvider(
    path: string,
    unload_after_use: boolean
  ): CallApiReturnType {
    AgoraConsole.warn('loadExtensionProvider not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setExtensionProviderProperty(
    provider: string,
    key: string,
    value: string
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setExtensionProviderProperty not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  registerExtension(
    provider: string,
    extension: string,
    type: NATIVE_RTC.MEDIA_SOURCE_TYPE
  ): CallApiReturnType {
    AgoraConsole.warn('registerExtension not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  enableExtension(
    provider: string,
    extension: string,
    enable: boolean,
    type: NATIVE_RTC.MEDIA_SOURCE_TYPE
  ): CallApiReturnType {
    AgoraConsole.warn('enableExtension not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  enableExtension2(
    provider: string,
    extension: string,
    extensionInfo: NATIVE_RTC.ExtensionInfo,
    enable: boolean
  ): CallApiReturnType {
    AgoraConsole.warn('enableExtension2 not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setExtensionProperty(
    provider: string,
    extension: string,
    key: string,
    value: string,
    type: NATIVE_RTC.MEDIA_SOURCE_TYPE
  ): CallApiReturnType {
    AgoraConsole.warn('setExtensionProperty not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getExtensionProperty(
    provider: string,
    extension: string,
    key: string,
    value: string,
    buf_len: number,
    type: NATIVE_RTC.MEDIA_SOURCE_TYPE
  ): CallApiReturnType {
    AgoraConsole.warn('getExtensionProperty not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setExtensionProperty2(
    provider: string,
    extension: string,
    extensionInfo: NATIVE_RTC.ExtensionInfo,
    key: string,
    value: string
  ): CallApiReturnType {
    AgoraConsole.warn('setExtensionProperty2 not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getExtensionProperty2(
    provider: string,
    extension: string,
    extensionInfo: NATIVE_RTC.ExtensionInfo,
    key: string,
    value: string,
    buf_len: number
  ): CallApiReturnType {
    AgoraConsole.warn('getExtensionProperty2 not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setCameraCapturerConfiguration(
    config: NATIVE_RTC.CameraCapturerConfiguration
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setCameraCapturerConfiguration not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  createCustomVideoTrack(): CallApiReturnType {
    AgoraConsole.warn('createCustomVideoTrack not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  createCustomEncodedVideoTrack(
    sender_option: NATIVE_RTC.SenderOptions
  ): CallApiReturnType {
    AgoraConsole.warn(
      'createCustomEncodedVideoTrack not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  destroyCustomVideoTrack(video_track_id: number): CallApiReturnType {
    AgoraConsole.warn(
      'destroyCustomVideoTrack not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  destroyCustomEncodedVideoTrack(video_track_id: number): CallApiReturnType {
    AgoraConsole.warn(
      'destroyCustomEncodedVideoTrack not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  switchCamera(): CallApiReturnType {
    AgoraConsole.warn('switchCamera not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  isCameraZoomSupported(): CallApiReturnType {
    AgoraConsole.warn('isCameraZoomSupported not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  isCameraFaceDetectSupported(): CallApiReturnType {
    AgoraConsole.warn(
      'isCameraFaceDetectSupported not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  isCameraTorchSupported(): CallApiReturnType {
    AgoraConsole.warn('isCameraTorchSupported not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  isCameraFocusSupported(): CallApiReturnType {
    AgoraConsole.warn('isCameraFocusSupported not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  isCameraAutoFocusFaceModeSupported(): CallApiReturnType {
    AgoraConsole.warn(
      'isCameraAutoFocusFaceModeSupported not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setCameraZoomFactor(factor: number): CallApiReturnType {
    AgoraConsole.warn('setCameraZoomFactor not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  enableFaceDetection(enabled: boolean): CallApiReturnType {
    AgoraConsole.warn('enableFaceDetection not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getCameraMaxZoomFactor(): CallApiReturnType {
    AgoraConsole.warn('getCameraMaxZoomFactor not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setCameraFocusPositionInPreview(
    positionX: number,
    positionY: number
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setCameraFocusPositionInPreview not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setCameraTorchOn(isOn: boolean): CallApiReturnType {
    AgoraConsole.warn('setCameraTorchOn not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setCameraAutoFocusFaceModeEnabled(enabled: boolean): CallApiReturnType {
    AgoraConsole.warn(
      'setCameraAutoFocusFaceModeEnabled not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  isCameraExposurePositionSupported(): CallApiReturnType {
    AgoraConsole.warn(
      'isCameraExposurePositionSupported not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setCameraExposurePosition(
    positionXinView: number,
    positionYinView: number
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setCameraExposurePosition not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  isCameraExposureSupported(): CallApiReturnType {
    AgoraConsole.warn(
      'isCameraExposureSupported not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setCameraExposureFactor(factor: number): CallApiReturnType {
    AgoraConsole.warn(
      'setCameraExposureFactor not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  isCameraAutoExposureFaceModeSupported(): CallApiReturnType {
    AgoraConsole.warn(
      'isCameraAutoExposureFaceModeSupported not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setCameraAutoExposureFaceModeEnabled(enabled: boolean): CallApiReturnType {
    AgoraConsole.warn(
      'setCameraAutoExposureFaceModeEnabled not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setDefaultAudioRouteToSpeakerphone(
    defaultToSpeaker: boolean
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setDefaultAudioRouteToSpeakerphone not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setEnableSpeakerphone(speakerOn: boolean): CallApiReturnType {
    AgoraConsole.warn('setEnableSpeakerphone not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  isSpeakerphoneEnabled(): CallApiReturnType {
    AgoraConsole.warn('isSpeakerphoneEnabled not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setRouteInCommunicationMode(route: number): CallApiReturnType {
    AgoraConsole.warn(
      'setRouteInCommunicationMode not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getScreenCaptureSources(
    thumbSize: NATIVE_RTC.SIZE,
    iconSize: NATIVE_RTC.SIZE,
    includeScreen: boolean
  ): CallApiReturnType {
    AgoraConsole.warn(
      'getScreenCaptureSources not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setAudioSessionOperationRestriction(
    restriction: NATIVE_RTC.AUDIO_SESSION_OPERATION_RESTRICTION
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setAudioSessionOperationRestriction not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  startScreenCaptureByDisplayId(
    displayId: number,
    regionRect: NATIVE_RTC.Rectangle,
    captureParams: NATIVE_RTC.ScreenCaptureParameters
  ): CallApiReturnType {
    AgoraConsole.warn(
      'startScreenCaptureByDisplayId not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  startScreenCaptureByScreenRect(
    screenRect: NATIVE_RTC.Rectangle,
    regionRect: NATIVE_RTC.Rectangle,
    captureParams: NATIVE_RTC.ScreenCaptureParameters
  ): CallApiReturnType {
    AgoraConsole.warn(
      'startScreenCaptureByScreenRect not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getAudioDeviceInfo(deviceInfo: NATIVE_RTC.DeviceInfo): CallApiReturnType {
    AgoraConsole.warn('getAudioDeviceInfo not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  startScreenCaptureByWindowId(
    windowId: number,
    regionRect: NATIVE_RTC.Rectangle,
    captureParams: NATIVE_RTC.ScreenCaptureParameters
  ): CallApiReturnType {
    AgoraConsole.warn(
      'startScreenCaptureByWindowId not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setScreenCaptureContentHint(
    contentHint: NATIVE_RTC.VIDEO_CONTENT_HINT
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setScreenCaptureContentHint not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  updateScreenCaptureRegion(
    regionRect: NATIVE_RTC.Rectangle
  ): CallApiReturnType {
    AgoraConsole.warn(
      'updateScreenCaptureRegion not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  updateScreenCaptureParameters(
    captureParams: NATIVE_RTC.ScreenCaptureParameters
  ): CallApiReturnType {
    AgoraConsole.warn(
      'updateScreenCaptureParameters not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  startScreenCapture(
    captureParams: NATIVE_RTC.ScreenCaptureParameters2
  ): CallApiReturnType {
    AgoraConsole.warn('startScreenCapture not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  updateScreenCapture(
    captureParams: NATIVE_RTC.ScreenCaptureParameters2
  ): CallApiReturnType {
    AgoraConsole.warn('updateScreenCapture not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  queryScreenCaptureCapability(): CallApiReturnType {
    AgoraConsole.warn(
      'queryScreenCaptureCapability not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setScreenCaptureScenario(
    screenScenario: NATIVE_RTC.SCREEN_SCENARIO_TYPE
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setScreenCaptureScenario not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  stopScreenCapture(): CallApiReturnType {
    AgoraConsole.warn('stopScreenCapture not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getCallId(callId: string): CallApiReturnType {
    AgoraConsole.warn('getCallId not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  rate(callId: string, rating: number, description: string): CallApiReturnType {
    AgoraConsole.warn('rate not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  complain(callId: string, description: string): CallApiReturnType {
    AgoraConsole.warn('complain not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  startRtmpStreamWithoutTranscoding(url: string): CallApiReturnType {
    AgoraConsole.warn(
      'startRtmpStreamWithoutTranscoding not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  startRtmpStreamWithTranscoding(
    url: string,
    transcoding: NATIVE_RTC.LiveTranscoding
  ): CallApiReturnType {
    AgoraConsole.warn(
      'startRtmpStreamWithTranscoding not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  updateRtmpTranscoding(
    transcoding: NATIVE_RTC.LiveTranscoding
  ): CallApiReturnType {
    AgoraConsole.warn('updateRtmpTranscoding not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  stopRtmpStream(url: string): CallApiReturnType {
    AgoraConsole.warn('stopRtmpStream not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  startLocalVideoTranscoder(
    config: NATIVE_RTC.LocalTranscoderConfiguration
  ): CallApiReturnType {
    AgoraConsole.warn(
      'startLocalVideoTranscoder not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  updateLocalTranscoderConfiguration(
    config: NATIVE_RTC.LocalTranscoderConfiguration
  ): CallApiReturnType {
    AgoraConsole.warn(
      'updateLocalTranscoderConfiguration not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  stopLocalVideoTranscoder(): CallApiReturnType {
    AgoraConsole.warn(
      'stopLocalVideoTranscoder not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  startCameraCapture(
    sourceType: NATIVE_RTC.VIDEO_SOURCE_TYPE,
    config: NATIVE_RTC.CameraCapturerConfiguration
  ): CallApiReturnType {
    AgoraConsole.warn('startCameraCapture not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  stopCameraCapture(
    sourceType: NATIVE_RTC.VIDEO_SOURCE_TYPE
  ): CallApiReturnType {
    AgoraConsole.warn('stopCameraCapture not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setCameraDeviceOrientation(
    type: NATIVE_RTC.VIDEO_SOURCE_TYPE,
    orientation: NATIVE_RTC.VIDEO_ORIENTATION
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setCameraDeviceOrientation not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setScreenCaptureOrientation(
    type: NATIVE_RTC.VIDEO_SOURCE_TYPE,
    orientation: NATIVE_RTC.VIDEO_ORIENTATION
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setScreenCaptureOrientation not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  startScreenCapture2(
    sourceType: NATIVE_RTC.VIDEO_SOURCE_TYPE,
    config: NATIVE_RTC.ScreenCaptureConfiguration
  ): CallApiReturnType {
    AgoraConsole.warn('startScreenCapture2 not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  stopScreenCapture2(
    sourceType: NATIVE_RTC.VIDEO_SOURCE_TYPE
  ): CallApiReturnType {
    AgoraConsole.warn('stopScreenCapture2 not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getConnectionState(): CallApiReturnType {
    AgoraConsole.warn('getConnectionState not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  registerEventHandler(
    eventHandler: NATIVE_RTC.IRtcEngineEventHandler
  ): CallApiReturnType {
    AgoraConsole.warn('registerEventHandler not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  unregisterEventHandler(
    eventHandler: NATIVE_RTC.IRtcEngineEventHandler
  ): CallApiReturnType {
    AgoraConsole.warn('unregisterEventHandler not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setRemoteUserPriority(
    uid: number,
    userPriority: NATIVE_RTC.PRIORITY_TYPE
  ): CallApiReturnType {
    AgoraConsole.warn('setRemoteUserPriority not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setEncryptionMode(encryptionMode: string): CallApiReturnType {
    AgoraConsole.warn('setEncryptionMode not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setEncryptionSecret(secret: string): CallApiReturnType {
    AgoraConsole.warn('setEncryptionSecret not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  enableEncryption(
    enabled: boolean,
    config: NATIVE_RTC.EncryptionConfig
  ): CallApiReturnType {
    AgoraConsole.warn('enableEncryption not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  createDataStream(
    streamId: number[],
    reliable: boolean,
    ordered: boolean
  ): CallApiReturnType {
    AgoraConsole.warn('createDataStream not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  createDataStream2(
    streamId: number[],
    config: NATIVE_RTC.DataStreamConfig
  ): CallApiReturnType {
    AgoraConsole.warn('createDataStream2 not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  sendStreamMessage(
    streamId: number,
    data: string,
    length: number
  ): CallApiReturnType {
    AgoraConsole.warn('sendStreamMessage not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  addVideoWatermark(watermark: NATIVE_RTC.RtcImage): CallApiReturnType {
    AgoraConsole.warn('addVideoWatermark not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  addVideoWatermark2(
    watermarkUrl: string,
    options: NATIVE_RTC.WatermarkOptions
  ): CallApiReturnType {
    AgoraConsole.warn('addVideoWatermark2 not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  clearVideoWatermarks(): CallApiReturnType {
    AgoraConsole.warn('clearVideoWatermarks not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  pauseAudio(): CallApiReturnType {
    AgoraConsole.warn('pauseAudio not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  resumeAudio(): CallApiReturnType {
    AgoraConsole.warn('resumeAudio not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  enableWebSdkInteroperability(enabled: boolean): CallApiReturnType {
    AgoraConsole.warn(
      'enableWebSdkInteroperability not supported in this platform!'
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
      'sendCustomReportMessage not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  registerMediaMetadataObserver(
    observer: NATIVE_RTC.IMetadataObserver,
    type: NATIVE_RTC.METADATA_TYPE
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerMediaMetadataObserver not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  unregisterMediaMetadataObserver(
    observer: NATIVE_RTC.IMetadataObserver,
    type: NATIVE_RTC.METADATA_TYPE
  ): CallApiReturnType {
    AgoraConsole.warn(
      'unregisterMediaMetadataObserver not supported in this platform!'
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
    AgoraConsole.warn('startAudioFrameDump not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  stopAudioFrameDump(
    channel_id: string,
    user_id: number,
    location: string
  ): CallApiReturnType {
    AgoraConsole.warn('stopAudioFrameDump not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setAINSMode(
    enabled: boolean,
    mode: NATIVE_RTC.AUDIO_AINS_MODE
  ): CallApiReturnType {
    AgoraConsole.warn('setAINSMode not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  registerLocalUserAccount(
    appId: string,
    userAccount: string
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerLocalUserAccount not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  joinChannelWithUserAccount(
    token: string,
    channelId: string,
    userAccount: string
  ): CallApiReturnType {
    AgoraConsole.warn(
      'joinChannelWithUserAccount not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  joinChannelWithUserAccount2(
    token: string,
    channelId: string,
    userAccount: string,
    options: NATIVE_RTC.ChannelMediaOptions
  ): CallApiReturnType {
    AgoraConsole.warn(
      'joinChannelWithUserAccount2 not supported in this platform!'
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
      'joinChannelWithUserAccountEx not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getUserInfoByUserAccount(
    userAccount: string,
    userInfo: NATIVE_RTC.UserInfo[]
  ): CallApiReturnType {
    AgoraConsole.warn(
      'getUserInfoByUserAccount not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getUserInfoByUid(
    uid: number,
    userInfo: NATIVE_RTC.UserInfo[]
  ): CallApiReturnType {
    AgoraConsole.warn('getUserInfoByUid not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  startOrUpdateChannelMediaRelay(
    configuration: NATIVE_RTC.ChannelMediaRelayConfiguration
  ): CallApiReturnType {
    AgoraConsole.warn(
      'startOrUpdateChannelMediaRelay not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  startChannelMediaRelay(
    configuration: NATIVE_RTC.ChannelMediaRelayConfiguration
  ): CallApiReturnType {
    AgoraConsole.warn('startChannelMediaRelay not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  updateChannelMediaRelay(
    configuration: NATIVE_RTC.ChannelMediaRelayConfiguration
  ): CallApiReturnType {
    AgoraConsole.warn(
      'updateChannelMediaRelay not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  stopChannelMediaRelay(): CallApiReturnType {
    AgoraConsole.warn('stopChannelMediaRelay not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  pauseAllChannelMediaRelay(): CallApiReturnType {
    AgoraConsole.warn(
      'pauseAllChannelMediaRelay not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  resumeAllChannelMediaRelay(): CallApiReturnType {
    AgoraConsole.warn(
      'resumeAllChannelMediaRelay not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setDirectCdnStreamingAudioConfiguration(
    profile: NATIVE_RTC.AUDIO_PROFILE_TYPE
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setDirectCdnStreamingAudioConfiguration not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setDirectCdnStreamingVideoConfiguration(
    config: NATIVE_RTC.VideoEncoderConfiguration
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setDirectCdnStreamingVideoConfiguration not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  startDirectCdnStreaming(
    eventHandler: NATIVE_RTC.IDirectCdnStreamingEventHandler,
    publishUrl: string,
    options: NATIVE_RTC.DirectCdnStreamingMediaOptions
  ): CallApiReturnType {
    AgoraConsole.warn(
      'startDirectCdnStreaming not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  stopDirectCdnStreaming(): CallApiReturnType {
    AgoraConsole.warn('stopDirectCdnStreaming not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  updateDirectCdnStreamingMediaOptions(
    options: NATIVE_RTC.DirectCdnStreamingMediaOptions
  ): CallApiReturnType {
    AgoraConsole.warn(
      'updateDirectCdnStreamingMediaOptions not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  startRhythmPlayer(
    sound1: string,
    sound2: string,
    config: NATIVE_RTC.AgoraRhythmPlayerConfig
  ): CallApiReturnType {
    AgoraConsole.warn('startRhythmPlayer not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  stopRhythmPlayer(): CallApiReturnType {
    AgoraConsole.warn('stopRhythmPlayer not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  configRhythmPlayer(
    config: NATIVE_RTC.AgoraRhythmPlayerConfig
  ): CallApiReturnType {
    AgoraConsole.warn('configRhythmPlayer not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  takeSnapshot(uid: number, filePath: string): CallApiReturnType {
    AgoraConsole.warn('takeSnapshot not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  enableContentInspect(
    enabled: boolean,
    config: NATIVE_RTC.ContentInspectConfig
  ): CallApiReturnType {
    AgoraConsole.warn('enableContentInspect not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  adjustCustomAudioPublishVolume(
    trackId: number,
    volume: number
  ): CallApiReturnType {
    AgoraConsole.warn(
      'adjustCustomAudioPublishVolume not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  adjustCustomAudioPlayoutVolume(
    trackId: number,
    volume: number
  ): CallApiReturnType {
    AgoraConsole.warn(
      'adjustCustomAudioPlayoutVolume not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setCloudProxy(proxyType: NATIVE_RTC.CLOUD_PROXY_TYPE): CallApiReturnType {
    AgoraConsole.warn('setCloudProxy not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setLocalAccessPoint(
    config: NATIVE_RTC.LocalAccessPointConfiguration
  ): CallApiReturnType {
    AgoraConsole.warn('setLocalAccessPoint not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setAdvancedAudioOptions(
    options: NATIVE_RTC.AdvancedAudioOptions,
    sourceType: number
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setAdvancedAudioOptions not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setAVSyncSource(channelId: string, uid: number): CallApiReturnType {
    AgoraConsole.warn('setAVSyncSource not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  enableVideoImageSource(
    enable: boolean,
    options: NATIVE_RTC.ImageTrackOptions
  ): CallApiReturnType {
    AgoraConsole.warn('enableVideoImageSource not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getCurrentMonotonicTimeInMs(): CallApiReturnType {
    AgoraConsole.warn(
      'getCurrentMonotonicTimeInMs not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  enableWirelessAccelerate(enabled: boolean): CallApiReturnType {
    AgoraConsole.warn(
      'enableWirelessAccelerate not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getNetworkType(): CallApiReturnType {
    AgoraConsole.warn('getNetworkType not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setParameters(parameters: string): CallApiReturnType {
    AgoraConsole.warn('setParameters not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  startMediaRenderingTracing(): CallApiReturnType {
    AgoraConsole.warn(
      'startMediaRenderingTracing not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  enableInstantMediaRendering(): CallApiReturnType {
    AgoraConsole.warn(
      'enableInstantMediaRendering not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getNtpWallTimeInMs(): CallApiReturnType {
    AgoraConsole.warn('getNtpWallTimeInMs not supported in this platform!');
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
    AgoraConsole.warn('enumerateVideoDevices not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setDevice(deviceIdUTF8: string[]): CallApiReturnType {
    AgoraConsole.warn('setDevice not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getDevice(deviceIdUTF8: string): CallApiReturnType {
    AgoraConsole.warn('getDevice not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  numberOfCapabilities(deviceIdUTF8: string): CallApiReturnType {
    AgoraConsole.warn('numberOfCapabilities not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getCapability(
    deviceIdUTF8: string,
    deviceCapabilityNumber: number,
    capability: NATIVE_RTC.VideoFormat
  ): CallApiReturnType {
    AgoraConsole.warn('getCapability not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  startDeviceTest(hwnd: number): CallApiReturnType {
    AgoraConsole.warn('startDeviceTest not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  stopDeviceTest(): CallApiReturnType {
    AgoraConsole.warn('stopDeviceTest not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  release(): CallApiReturnType {
    AgoraConsole.warn('release not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
}
