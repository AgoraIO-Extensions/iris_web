import { UID } from 'agora-rtc-sdk-ng';
import * as NATIVE_RTC from 'iris-web-rtc';

export class IrisGlobalVariables {
  public appId: string = null;

  //C++ SetAudioProfile() initialize()
  public audioProfile: NATIVE_RTC.AUDIO_PROFILE_TYPE;
  public audioScenario: NATIVE_RTC.AUDIO_SCENARIO_TYPE;

  //initialize()
  public areaCode: NATIVE_RTC.AREA_CODE | NATIVE_RTC.AREA_CODE_EX =
    NATIVE_RTC.AREA_CODE.AREA_CODE_CN;

  public enabledAudio: boolean = true;
  public pausedAudio: boolean = false;

  //开启或禁用本地audio功能，audio流
  public enabledLocalAudio: boolean = true;
  public mutedLocalAudioStream: boolean = false;

  //开启或者禁用video功能
  enabledLocalVideo: boolean = true;
  mutedLocalVideoStream: boolean = false;

  public enabledVideo: boolean = false;
  public pausedVideo: boolean = false;

  //远端用户的 playback signal volume， 总设置
  playbackSignalVolume: number = 100;
  //每个远端用户的 playback signal volume 对应uid
  playbackSignalVolumes: Map<UID, number> = new Map();

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

  cameraDirection: NATIVE_RTC.CAMERA_DIRECTION = null;

  fallbackOption: NATIVE_RTC.STREAM_FALLBACK_OPTIONS = null;

  screenCaptureContentHint: NATIVE_RTC.VIDEO_CONTENT_HINT = null;

  screenCaptureParameters: NATIVE_RTC.ScreenCaptureParameters = null;

  cloudProxy: NATIVE_RTC.CLOUD_PROXY_TYPE = null;

  //devicesInfo
  deviceEnumerated: boolean = false;
  playbackDevices: NATIVE_RTC.DeviceInfo[] = new Array();
  recordingDevices: NATIVE_RTC.DeviceInfo[] = new Array();
  videoDevices: NATIVE_RTC.DeviceInfo[] = new Array();
}