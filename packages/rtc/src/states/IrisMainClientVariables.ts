import * as NATIVE_RTC from '@iris/web-rtc';
import { UID } from 'agora-rtc-sdk-ng';

//Record the intermediate status of the Main client
export class IrisMainClientVariables {
  //public channelProfile: NATIVE_RTC.CHANNEL_PROFILE_TYPE = NATIVE_RTC.CHANNEL_PROFILE_TYPE.CHANNEL_PROFILE_LIVE_BROADCASTING;
  //public role: NATIVE_RTC.CLIENT_ROLE_TYPE = NATIVE_RTC.CLIENT_ROLE_TYPE.CLIENT_ROLE_AUDIENCE;

  //ClientRoleOptions
  // audienceLatencyLevel?: NATIVE_RTC.AUDIENCE_LATENCY_LEVEL_TYPE;
  // stopMicrophoneRecording?: boolean;
  public stopPreview?: boolean;

  //ChannelMediaOptions
  public publishCameraTrack?: boolean = true;
  public publishSecondaryCameraTrack?: boolean;
  public publishAudioTrack?: boolean = true;
  public publishScreenCaptureVideo?: boolean;
  public publishScreenCaptureAudio?: boolean;
  public publishScreenTrack: boolean;
  public publishSecondaryScreenTrack: boolean;
  public publishCustomAudioTrack?: boolean;
  public publishCustomAudioSourceId?: number;
  public publishCustomAudioTrackEnableAec?: boolean;
  public publishDirectCustomAudioTrack?: boolean;
  public publishCustomAudioTrackAec?: boolean;
  public publishCustomVideoTrack?: boolean;
  public publishEncodedVideoTrack?: boolean;
  public publishMediaPlayerAudioTrack?: boolean;
  public publishMediaPlayerVideoTrack?: boolean;
  public publishTrancodedVideoTrack?: boolean;
  public autoSubscribeAudio?: boolean = true;
  public autoSubscribeVideo?: boolean = true;
  public startPreview?: boolean;
  public enableAudioRecordingOrPlayout?: boolean;
  public publishMediaPlayerId?: number;
  public clientRoleType?: NATIVE_RTC.CLIENT_ROLE_TYPE;
  public audienceLatencyLevel?: NATIVE_RTC.AUDIENCE_LATENCY_LEVEL_TYPE;
  public defaultVideoStreamType?: NATIVE_RTC.VIDEO_STREAM_TYPE;
  public channelProfile?: NATIVE_RTC.CHANNEL_PROFILE_TYPE;
  public audioDelayMs?: number;
  public mediaPlayerAudioDelayMs?: number;
  public token?: string;
  public enableBuiltInMediaEncryption?: boolean;
  public publishRhythmPlayerTrack?: boolean;
  // public audioOptionsExternal: AudioOptionsExternal;

  clearChannelMediaOptions() {
    this.publishCameraTrack = null;
    this.publishSecondaryCameraTrack = null;
    this.publishAudioTrack = null;
    this.publishScreenCaptureVideo = null;
    this.publishScreenCaptureAudio = null;
    this.publishScreenTrack = null;
    this.publishSecondaryScreenTrack = null;
    this.publishCustomAudioTrack = null;
    this.publishCustomAudioSourceId = null;
    this.publishCustomAudioTrackEnableAec = null;
    this.publishDirectCustomAudioTrack = null;
    this.publishCustomAudioTrackAec = null;
    this.publishCustomVideoTrack = null;
    this.publishEncodedVideoTrack = null;
    this.publishMediaPlayerAudioTrack = null;
    this.publishMediaPlayerVideoTrack = null;
    this.publishTrancodedVideoTrack = null;
    this.autoSubscribeAudio = null;
    this.autoSubscribeVideo = null;
    this.startPreview = null;
    this.enableAudioRecordingOrPlayout = null;
    this.publishMediaPlayerId = null;
    this.clientRoleType = null;
    this.audienceLatencyLevel = null;
    this.defaultVideoStreamType = null;
    this.channelProfile = null;
    this.audioDelayMs = null;
    this.mediaPlayerAudioDelayMs = null;
    this.token = null;
    this.enableBuiltInMediaEncryption = null;
    this.publishRhythmPlayerTrack = null;
  }

  mergeChannelMediaOptions(options: NATIVE_RTC.ChannelMediaOptions) {
    for (let key in options) {
      this[key] = options[key];
    }
  }

  //setClientOptions()
  public clientRoleOptions?: NATIVE_RTC.ClientRoleOptions = null;

  //LeaveChannelOptions
  public stopAudioMixing: boolean = true;
  public stopAllEffect: boolean = true;
  public stopMicrophoneRecording: boolean = true;

  //mute 远端的用户流
  mutedRemoteAudioStreams: Map<UID, boolean> = new Map<UID, boolean>();
  mutedRemoteVideoStreams: Map<UID, boolean> = new Map<UID, boolean>();

  videoSourceType: NATIVE_RTC.VIDEO_SOURCE_TYPE =
    NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA;

  //SetVideoEncoderConfiguration
  videoEncoderConfiguration: NATIVE_RTC.VideoEncoderConfiguration = null;

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
  remoteVideoStreamTypes: Map<UID, NATIVE_RTC.VIDEO_STREAM_TYPE> = new Map<
    UID,
    NATIVE_RTC.VIDEO_STREAM_TYPE
  >();

  //远端默认流
  remoteDefaultVideoStreamType: NATIVE_RTC.VIDEO_STREAM_TYPE = null;

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
  } = null;

  //setDevice() : videoDevice
  videoDeviceId: string = null;

  //setPlaybackDevice: audiDevice
  playbackDeviceId: string = null;
  //setRecordingDevice: recordingDevice
  recordingDeviceId: string = null;

  //SetContentInspect
  contentInspect: NATIVE_RTC.ContentInspectConfig = null;

  // startPreviewed 似乎没有用处
  // startPreviewed: boolean = false;
  joinChanneled: boolean = false;

  //用来记录暂停或者恢复的
  currChannelMediaRelayconfiguration: NATIVE_RTC.ChannelMediaRelayConfiguration = null;
}
