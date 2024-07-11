import * as NATIVE_RTC from '@iris/native-rtc';

import { IrisGlobalState } from './IrisGlobalState';

//Record the intermediate status of the client
export class IrisClientState {
  _globalState: IrisGlobalState;

  //LeaveChannelOptions
  stopAudioMixing?: boolean = true;
  stopAllEffect?: boolean = true;
  stopMicrophoneRecording?: boolean = true;

  //ChannelMediaOptions
  publishCameraTrack?: boolean = true;

  publishSecondaryCameraTrack?: boolean = false;

  publishThirdCameraTrack?: boolean;

  publishFourthCameraTrack?: boolean;

  publishMicrophoneTrack?: boolean = true;

  publishScreenCaptureVideo?: boolean;

  publishScreenCaptureAudio: boolean = false;

  publishScreenTrack: boolean = false;

  publishSecondaryScreenTrack: boolean = false;

  publishThirdScreenTrack: boolean = false;

  publishFourthScreenTrack: boolean = false;

  publishCustomAudioTrack: boolean = false;

  publishCustomAudioTrackId?: number;

  publishCustomVideoTrack: boolean = false;

  publishEncodedVideoTrack: boolean = false;

  publishMediaPlayerAudioTrack: boolean = false;

  publishMediaPlayerVideoTrack: boolean = false;

  publishTranscodedVideoTrack: boolean = false;

  autoSubscribeAudio: boolean = true;

  autoSubscribeVideo: boolean = false;

  enableAudioRecordingOrPlayout: boolean = false;

  publishMediaPlayerId?: number;

  clientRoleType?: NATIVE_RTC.CLIENT_ROLE_TYPE =
    NATIVE_RTC.CLIENT_ROLE_TYPE.CLIENT_ROLE_BROADCASTER;

  audienceLatencyLevel?: NATIVE_RTC.AUDIENCE_LATENCY_LEVEL_TYPE;

  defaultVideoStreamType?: NATIVE_RTC.VIDEO_STREAM_TYPE =
    NATIVE_RTC.VIDEO_STREAM_TYPE.VIDEO_STREAM_HIGH;

  channelProfile?: NATIVE_RTC.CHANNEL_PROFILE_TYPE =
    NATIVE_RTC.CHANNEL_PROFILE_TYPE.CHANNEL_PROFILE_COMMUNICATION;

  audioDelayMs?: number;

  mediaPlayerAudioDelayMs?: number;

  token?: string;

  enableBuiltInMediaEncryption?: boolean;

  publishRhythmPlayerTrack?: boolean;

  isInteractiveAudience?: boolean;

  customVideoTrackId?: number;

  isAudioFilterable?: boolean;

  //dataStream
  dataStreamConfig: {
    syncWithAudio?: boolean;
    ordered?: boolean;
  } = {
    syncWithAudio: false,
    ordered: false,
  };

  //setClientOptions()
  public clientRoleOptions: NATIVE_RTC.ClientRoleOptions;

  //mute 远端的用户流
  mutedRemoteAudioStreams: Map<number, boolean> = new Map<number, boolean>();
  mutedRemoteVideoStreams: Map<number, boolean> = new Map<number, boolean>();

  videoSourceType: NATIVE_RTC.VIDEO_SOURCE_TYPE =
    NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA;

  //SetVideoEncoderConfiguration
  videoEncoderConfiguration: NATIVE_RTC.VideoEncoderConfiguration;

  //是否开启大小流
  enabledDualStreamMode: boolean = false;
  enabledDualStreamModes: Map<
    NATIVE_RTC.VIDEO_SOURCE_TYPE,
    { enabled: boolean; streamConfig?: NATIVE_RTC.SimulcastStreamConfig }
  > = new Map<
    NATIVE_RTC.VIDEO_SOURCE_TYPE,
    { enabled: boolean; streamConfig?: NATIVE_RTC.SimulcastStreamConfig }
  >();

  //远端的大小流
  remoteVideoStreamTypes: Map<number, NATIVE_RTC.VIDEO_STREAM_TYPE> = new Map<
    number,
    NATIVE_RTC.VIDEO_STREAM_TYPE
  >();

  //远端默认流
  remoteDefaultVideoStreamType: NATIVE_RTC.VIDEO_STREAM_TYPE =
    NATIVE_RTC.VIDEO_STREAM_TYPE.VIDEO_STREAM_HIGH;

  encryptionConfig: {
    enabled: boolean;
    config: NATIVE_RTC.EncryptionConfig;
  } = {
    enabled: false,
    config: new NATIVE_RTC.EncryptionConfig(),
  };

  //C++ enabledAudioVolumeIndication()
  enabledAudioVolumeIndication: {
    interval: number;
    smooth: number;
    reportVad: boolean;
  };

  //setPlaybackDevice: audiDevice
  playbackDeviceId: string = '';
  //setRecordingDevice: recordingDevice
  recordingDeviceId: string = '';

  //SetContentInspect
  contentInspect?: NATIVE_RTC.ContentInspectConfig;

  // startPreviewed 似乎没有用处
  // startPreviewed: boolean = false;

  //用来记录暂停或者恢复的
  currChannelMediaRelayConfiguration: NATIVE_RTC.ChannelMediaRelayConfiguration = new NATIVE_RTC.ChannelMediaRelayConfiguration();

  constructor(globalState: IrisGlobalState) {
    this._globalState = globalState;
    if (globalState.rtcEngineContext?.channelProfile) {
      this.channelProfile = globalState.rtcEngineContext.channelProfile;
    }
    if (globalState.autoSubscribeVideo) {
      this.autoSubscribeVideo = globalState.autoSubscribeVideo;
    }
  }

  mergeChannelMediaOptions(
    options: NATIVE_RTC.ChannelMediaOptions | NATIVE_RTC.LeaveChannelOptions
  ) {
    for (let key in options) {
      this[key] = options[key];
    }
    if (
      this.publishCustomVideoTrack &&
      this._globalState.pushVideoFrameEnabled
    ) {
      this.publishCameraTrack = false;
      this.publishEncodedVideoTrack = false;
      this.publishSecondaryCameraTrack = false;
      this.publishThirdCameraTrack = false;
      this.publishFourthCameraTrack = false;
      this.publishScreenTrack = false;
      this.publishSecondaryScreenTrack = false;
      this.publishThirdScreenTrack = false;
      this.publishFourthScreenTrack = false;
      this.publishMediaPlayerVideoTrack = false;
    }
  }
}
