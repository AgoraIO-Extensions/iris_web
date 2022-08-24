import { ClientConfig, UID } from 'agora-rtc-sdk-ng';
import * as agorartc from '../terra/rtc_types/Index';
import { AgoraTranslate } from '../tool/AgoraTranslate';

//Record the intermediate status of the Main client
export class IrisMainClientVariables {

    //public channelProfile: agorartc.CHANNEL_PROFILE_TYPE = agorartc.CHANNEL_PROFILE_TYPE.CHANNEL_PROFILE_LIVE_BROADCASTING;
    //public role: agorartc.CLIENT_ROLE_TYPE = agorartc.CLIENT_ROLE_TYPE.CLIENT_ROLE_AUDIENCE;

    //ClientRoleOptions
    // audienceLatencyLevel?: agorartc.AUDIENCE_LATENCY_LEVEL_TYPE;
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
    public clientRoleType?: agorartc.CLIENT_ROLE_TYPE;
    public audienceLatencyLevel?: agorartc.AUDIENCE_LATENCY_LEVEL_TYPE;
    public defaultVideoStreamType?: agorartc.VIDEO_STREAM_TYPE;
    public channelProfile?: agorartc.CHANNEL_PROFILE_TYPE;
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

    mergeChannelMediaOptions(options: agorartc.ChannelMediaOptions) {
        for (let key in options) {
            this[key] = options[key];
        }
    }


    //setClientOptions()
    public clientRoleOptions?: agorartc.ClientRoleOptions = null;

    //LeaveChannelOptions
    public stopAudioMixing: boolean = true;
    public stopAllEffect: boolean = true;
    public stopMicrophoneRecording: boolean = true;

    //mute 远端的用户流
    mutedRemoteAudioStreams: Map<UID, boolean> = new Map<UID, boolean>();
    mutedRemoteVideoStreams: Map<UID, boolean> = new Map<UID, boolean>();

    videoSourceType: agorartc.VIDEO_SOURCE_TYPE = agorartc.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA;

    //SetVideoEncoderConfiguration
    videoEncoderConfiguration: agorartc.VideoEncoderConfiguration = null;

    //是否开启大小流
    enabledDualStreamMode: boolean = false;
    enabledDualStreamModes: Map<agorartc.VIDEO_SOURCE_TYPE, { enabled: boolean, streamConfig?: agorartc.SimulcastStreamConfig }> = new Map<agorartc.VIDEO_SOURCE_TYPE, { enabled: boolean, streamConfig?: agorartc.SimulcastStreamConfig }>();

    //远端的大小流
    remoteVideoStreamTypes: Map<UID, agorartc.VIDEO_STREAM_TYPE> = new Map<UID, agorartc.VIDEO_STREAM_TYPE>();

    //远端默认流
    remoteDefaultVideoStreamType: agorartc.VIDEO_STREAM_TYPE = null;


    encryptionConfig: { enabled: boolean; config: agorartc.EncryptionConfig } = {
        enabled: false,
        config: new agorartc.EncryptionConfig
    };


    //C++ enabledAudioVolumeIndication()
    enabledAudioVolumeIndication: { interval: number, smooth: number, reportVad: boolean } = null;

    //setDevice() : videoDevice
    videoDeviceId: string = null;

    //setPlaybackDevice: audiDevice
    playbackDeviceId: string = null;
    //setRecordingDevice: recordingDevice
    recordingDeviceId: string = null;

    //SetContentInspect
    contentInspect: agorartc.ContentInspectConfig = null;

    startPreviewed: boolean = false;
    joinChanneled: boolean = false;

    //用来记录暂停或者恢复的
    currChannelMediaRelayconfiguration: agorartc.ChannelMediaRelayConfiguration = null;


}