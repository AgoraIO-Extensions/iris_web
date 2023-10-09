import * as NATIVE_RTC from '@iris/native-rtc-binding';
import { UID } from 'agora-rtc-sdk-ng';

import { IrisGlobalVariables } from './IrisGlobalVariables';

//Record the intermediate status of the client
export class IrisClientVariables {
  //public role: NATIVE_RTC.CLIENT_ROLE_TYPE = NATIVE_RTC.CLIENT_ROLE_TYPE.CLIENT_ROLE_AUDIENCE;

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

  publishScreenCaptureAudio?: boolean;

  publishScreenTrack?: boolean;

  publishSecondaryScreenTrack?: boolean;

  publishThirdScreenTrack?: boolean;

  publishFourthScreenTrack?: boolean;

  publishCustomAudioTrack?: boolean;

  publishCustomAudioTrackId?: number;

  publishCustomVideoTrack?: boolean;

  publishEncodedVideoTrack?: boolean;

  publishMediaPlayerAudioTrack?: boolean;

  publishMediaPlayerVideoTrack?: boolean;

  publishTranscodedVideoTrack?: boolean;

  autoSubscribeAudio?: boolean;

  autoSubscribeVideo?: boolean;

  enableAudioRecordingOrPlayout?: boolean;

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

  //setClientOptions()
  public clientRoleOptions?: NATIVE_RTC.ClientRoleOptions = null;

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

  //setPlaybackDevice: audiDevice
  playbackDeviceId: string = null;
  //setRecordingDevice: recordingDevice
  recordingDeviceId: string = null;

  //SetContentInspect
  contentInspect: NATIVE_RTC.ContentInspectConfig = null;

  // startPreviewed 似乎没有用处
  // startPreviewed: boolean = false;

  //用来记录暂停或者恢复的
  currChannelMediaRelayconfiguration: NATIVE_RTC.ChannelMediaRelayConfiguration = null;

  constructor(globalVariables: IrisGlobalVariables) {
    if (globalVariables.rtcEngineContext?.channelProfile) {
      this.channelProfile = globalVariables.rtcEngineContext.channelProfile;
    }
  }

  mergeChannelMediaOptions(
    options: NATIVE_RTC.ChannelMediaOptions | NATIVE_RTC.LeaveChannelOptions
  ) {
    for (let key in options) {
      this[key] = options[key];
    }
  }
}
