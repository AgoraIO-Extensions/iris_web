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
    public publishCameraTrack?: boolean;
    public publishSecondaryCameraTrack?: boolean;
    public publishMicrophoneTrack?: boolean;
    public publishScreenCaptureVideo?: boolean;
    public publishScreenCaptureAudio?: boolean;
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
    public autoSubscribeAudio?: boolean;
    public autoSubscribeVideo?: boolean;
    public enableAudioRecordingOrPlayout?: boolean;
    public publishMediaPlayerId?: number;
    public clientRoleType?: agorartc.CLIENT_ROLE_TYPE;
    public audienceLatencyLevel: agorartc.AUDIENCE_LATENCY_LEVEL_TYPE = agorartc.AUDIENCE_LATENCY_LEVEL_TYPE.AUDIENCE_LATENCY_LEVEL_ULTRA_LOW_LATENCY;
    public defaultVideoStreamType: agorartc.VIDEO_STREAM_TYPE = agorartc.VIDEO_STREAM_TYPE.VIDEO_STREAM_HIGH;
    public channelProfile: agorartc.CHANNEL_PROFILE_TYPE = agorartc.CHANNEL_PROFILE_TYPE.CHANNEL_PROFILE_GAME;
    public audioDelayMs?: number;
    public mediaPlayerAudioDelayMs?: number;
    public token?: string;
    public enableBuiltInMediaEncryption?: boolean;
    public publishRhythmPlayerTrack?: boolean;
    public isInteractiveAudience?: boolean;
    public customVideoTrackId?: agorartc.video_track_id_t;
    public isAudioFilterable?: boolean;

    mergeChannelMediaOptions(options: agorartc.ChannelMediaOptions) {
        for (let key in options) {
            this[key] = options[key];
        }
    }

    //根据保存的中间状态，生成ClientConfig
    generateClientConfig(): ClientConfig {
        let config: ClientConfig = {
            codec: this.videoEncoderConfiguration != null ? AgoraTranslate.agorartcVIDEO_CODEC_TYPE2SDK_CODEC(this.videoEncoderConfiguration.codecType) : "vp8",
            mode: this.channelProfile != null ? AgoraTranslate.agorartcCHANNEL_PROFILE_TYPE2SDK_MODE(this.channelProfile) : "live"
        };
        if (this.clientRoleType != null) {
            config.role = AgoraTranslate.agorartcCLIENT_ROLE_TYPE2ClientRole(this.clientRoleType);
        }
        if (this.clientRoleOptions != null) {
            config.clientRoleOptions = AgoraTranslate.agorartcClientRoleOptions2ClientRoleOptions(this.clientRoleOptions);
        }
        return config;
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



}