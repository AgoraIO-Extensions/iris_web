
import { UID } from 'agora-rtc-sdk-ng';
import * as agorartc from '../terra/rtc_types/Index';
import { Contaniner } from '../tool/Contanier';
//Record the intermediate status of the Main client
export class IrisSubClientVariables {

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

    //C++ AdjustUserPlaybackSignalVolume
    //each user playback signal volume
    playbackSignalVolumes: Map<UID, number> = new Map<UID, number>();

    //mute 远端用户流
    mutedRemoteAudioStreams: Contaniner<Map<UID, boolean>> = new Contaniner<Map<UID, boolean>>();
    mutedRemoteVideoStreams: Contaniner<Map<UID, boolean>> = new Contaniner<Map<UID, boolean>>();

    //SetVideoEncoderConfigurationEx
    videoEncoderConfigurations: Contaniner<agorartc.VideoEncoderConfiguration> = new Contaniner<agorartc.VideoEncoderConfiguration>();

    //子账户设置开启大小流
    enabledDualStreamModes: Contaniner<Map<agorartc.VIDEO_SOURCE_TYPE, boolean>> = new Contaniner<Map<agorartc.VIDEO_SOURCE_TYPE, boolean>>();
    //子账户设置接收大小流
    remoteVideoStreamTypes: Contaniner<Map<UID, agorartc.VIDEO_STREAM_TYPE>> = new Contaniner<Map<UID, agorartc.VIDEO_STREAM_TYPE>>();

    //加密
    encryptionConfigs: Contaniner<{ enabled: boolean; config: agorartc.EncryptionConfig }> = new Contaniner<{ enabled: boolean; config: agorartc.EncryptionConfig }>();
}