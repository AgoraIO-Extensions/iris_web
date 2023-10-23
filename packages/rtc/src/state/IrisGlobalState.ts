import * as NATIVE_RTC from '@iris/native-rtc-binding';
import AgoraRTC, { IAgoraRTC } from 'agora-rtc-sdk-ng';

export interface DeviceInfo {
  deviceName: string;
  deviceId: string;
}

export class IrisGlobalState {
  public rtcEngineContext: NATIVE_RTC.RtcEngineContext;

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
  videoEncoderConfiguration: NATIVE_RTC.VideoEncoderConfiguration = null;

  fallbackOption: NATIVE_RTC.STREAM_FALLBACK_OPTIONS = null;

  screenCaptureContentHint: NATIVE_RTC.VIDEO_CONTENT_HINT = null;

  // screenCaptureParameters: NATIVE_RTC.ScreenCaptureParameters = null;
  screenCaptureParameters2: NATIVE_RTC.ScreenCaptureParameters2 = null;

  cloudProxy: NATIVE_RTC.CLOUD_PROXY_TYPE = null;

  //devicesInfo
  playbackDevices: DeviceInfo[] = new Array();
  recordingDevices: DeviceInfo[] = new Array();
  videoDevices: DeviceInfo[] = new Array();

  //setDevice() : videoDevice
  videoDeviceId: string = null;

  //enableAudioVolumeIndication
  enableAudioVolumeIndication: boolean = false;
  enableAudioVolumeIndicationConfig = {
    interval: 50,
    smooth: 3,
    reportVad: false,
  };

  public autoSubscribeVideo: boolean = false;

  reset() {
    this.enabledAudio = true;
    this.pausedAudio = false;
    this.enabledLocalAudio = true;
    this.mutedLocalAudioStream = false;
  }

  //fake
  AgoraRTC: IAgoraRTC = AgoraRTC;
}
