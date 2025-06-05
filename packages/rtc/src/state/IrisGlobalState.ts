import * as NATIVE_RTC from '@iris/native-rtc';
import AgoraRTC, { IAgoraRTC } from 'agora-rtc-sdk-ng';

export interface DeviceInfo {
  deviceName: string;
  deviceId: string;
}

export class IrisGlobalState {
  public rtcEngineContext: NATIVE_RTC.RtcEngineContext;

  public streamMessageStreamId: number = 1;
  public networkQualityInterval: number = 2000;

  //C++ SetAudioProfile() initialize()
  public audioProfile: NATIVE_RTC.AUDIO_PROFILE_TYPE;

  public enabledAudio: boolean = true;
  public pausedAudio: boolean = false;

  pushVideoFrameEnabled: boolean = false;
  pushVideoFrameUseTexture: boolean = false;
  pushVideoFrameSourceType: NATIVE_RTC.EXTERNAL_VIDEO_SOURCE_TYPE =
    NATIVE_RTC.EXTERNAL_VIDEO_SOURCE_TYPE.ENCODED_VIDEO_FRAME;
  pushVideoFrameEncodedVideoOption: NATIVE_RTC.SenderOptions;

  //开启或禁用本地audio功能，audio流
  public enabledLocalAudio: boolean = true;
  public mutedLocalAudioStream: boolean = false;

  //开启或者禁用video功能
  enabledLocalVideo: boolean = true;
  mutedLocalVideoStream: boolean = false;

  public enabledVideo: boolean = false;
  public pausedVideo: boolean = false;

  // recording Signal Volume
  recordingSignalVolume: number = 100;

  //
  mutedRecordingSignal: boolean = false;

  //设置默认 mute 选项
  defaultMutedAllRemoteAudioStreams: boolean = false;
  defaultMutedAllRemoteVideoStreams: boolean = false;

  //SetLocalVideoMirrorMode
  mirrorMode: NATIVE_RTC.VIDEO_MIRROR_MODE_TYPE =
    NATIVE_RTC.VIDEO_MIRROR_MODE_TYPE.VIDEO_MIRROR_MODE_ENABLED;

  //SetAdvancedAudioOptions
  audioProcessingChannels?: number;

  //setVideoEncoderConfiguration
  videoEncoderConfiguration: NATIVE_RTC.VideoEncoderConfiguration;

  fallbackOption: NATIVE_RTC.STREAM_FALLBACK_OPTIONS;

  screenCaptureContentHint: NATIVE_RTC.VIDEO_CONTENT_HINT;

  // screenCaptureParameters: NATIVE_RTC.ScreenCaptureParameters = null;
  screenCaptureParameters2: NATIVE_RTC.ScreenCaptureParameters2;

  cloudProxy: NATIVE_RTC.CLOUD_PROXY_TYPE;

  //devicesInfo
  playbackDevices: DeviceInfo[] = new Array();
  recordingDevices: DeviceInfo[] = new Array();
  videoDevices: DeviceInfo[] = new Array();

  //setDevice()
  videoDeviceId: string;

  //setPlaybackDevice()
  playbackDeviceId: string;

  //setRecordingDevice()
  recordingDeviceId: string;

  channelProfile: NATIVE_RTC.CHANNEL_PROFILE_TYPE =
    NATIVE_RTC.CHANNEL_PROFILE_TYPE.CHANNEL_PROFILE_LIVE_BROADCASTING;

  isAudioFrameParametersSet: boolean = false;
  audioFrameParameters: {
    sampleRate: number;
    channel: number;
    mode: NATIVE_RTC.RAW_AUDIO_FRAME_OP_MODE_TYPE;
    samplesPerCall: number;
  } = {
    sampleRate: 32000,
    channel: 1,
    mode:
      NATIVE_RTC.RAW_AUDIO_FRAME_OP_MODE_TYPE.RAW_AUDIO_FRAME_OP_MODE_READ_ONLY,
    samplesPerCall: 1024,
  };

  enableAEC: boolean = false;
  enableANS: boolean = false;
  enableAGC: boolean = false;
  enableAINS: boolean = false;
  AINSprocessor: any;
  AINSWasmPath: string;

  reset() {
    this.enabledAudio = true;
    this.pausedAudio = false;
    this.enabledLocalAudio = true;
    this.mutedLocalAudioStream = false;
  }

  //fake
  AgoraRTC: IAgoraRTC = AgoraRTC;
}
