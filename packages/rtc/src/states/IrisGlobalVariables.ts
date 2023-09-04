
import { UID } from 'agora-rtc-sdk-ng';
import * as agorartc from '../binding/rtc_types/Index';

export class IrisGlobalVariables {

    public appId: string = null;

    //C++ SetAudioProfile() initialize()
    public audioProfile: agorartc.AUDIO_PROFILE_TYPE;
    public audioScenario: agorartc.AUDIO_SCENARIO_TYPE;

    //initialize()
    public areaCode: agorartc.AREA_CODE | agorartc.AREA_CODE_EX = agorartc.AREA_CODE.AREA_CODE_CN;

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
    mirrorMode: agorartc.VIDEO_MIRROR_MODE_TYPE = agorartc.VIDEO_MIRROR_MODE_TYPE.VIDEO_MIRROR_MODE_ENABLED;

    //SetAdvancedAudioOptions
    audioProcessingChannels?: number;

    //setVideoEncoderConfiguration
    videoEncoderConfiguration: agorartc.VideoEncoderConfiguration = null;

    cameraDirection: agorartc.CAMERA_DIRECTION = null;

    fallbackOption: agorartc.STREAM_FALLBACK_OPTIONS = null;

    screenCaptureContentHint: agorartc.VIDEO_CONTENT_HINT = null;

    screenCaptureParameters: agorartc.ScreenCaptureParameters = null;

    cloudProxy: agorartc.CLOUD_PROXY_TYPE = null;

    //devicesInfo
    deviceEnumerated: boolean = false;
    playbackDevices: agorartc.DeviceInfo[] = new Array();
    recordingDevices: agorartc.DeviceInfo[] = new Array();
    videoDevices: agorartc.DeviceInfo[] = new Array();
}