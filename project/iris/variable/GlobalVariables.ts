
import * as agorartc from '../terra/rtc_types/Index';

export class GlobalVariables {

    public enabledAudio: boolean = true;
    public pausedAudio: boolean = false;

    //开启或禁用本地audio功能，audio流
    public enabledLocalAudio: boolean = true;
    public mutedLocalAudioStream: boolean = false;

    //开启或者禁用video功能
    enabledLocalVideo: boolean = false;
    mutedLocalVideoStream: boolean = false;


    public enabledVideo: boolean = false;
    public pausedVideo: boolean = false;

    //C++ SetAudioProfile()
    public audioProfile: agorartc.AUDIO_PROFILE_TYPE;
    public audioScenario: agorartc.AUDIO_SCENARIO_TYPE;

    //playback signal volume
    playbackSignalVolume: number = 100;

    //设置默认 mute 选项
    defaultMutedAllRemoteAudioStreams: boolean = false;
    defaultMutedAllRemoteVideoStreams: boolean = false;

    //SetLocalVideoMirrorMode
    mirrorMode: agorartc.VIDEO_MIRROR_MODE_TYPE = agorartc.VIDEO_MIRROR_MODE_TYPE.VIDEO_MIRROR_MODE_ENABLED;

    //SetAdvancedAudioOptions
    audioProcessingChannels?: number;
}