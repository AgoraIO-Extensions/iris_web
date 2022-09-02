
import AgoraRTC, { AREAS, AudienceLatencyLevelType, ChannelMediaRelayError, ChannelMediaRelayEvent, ChannelMediaRelayInfo, ChannelMediaRelayState, ClientRole, ClientRoleOptions, ConnectionDisconnectedReason, ConnectionState, DeviceState, EncryptionMode, IChannelMediaRelayConfiguration, InjectStreamConfig, InspectConfiguration, LiveStreamingTranscodingConfig, LiveStreamingTranscodingImage, LiveStreamingTranscodingUser, LowStreamParameter, NetworkQuality, RemoteStreamFallbackType, RemoteStreamType, SDK_CODEC, SDK_MODE, UID, VideoEncoderConfiguration } from "agora-rtc-sdk-ng";
import { Argument } from "webpack";
import * as agorartc from "../terra/rtc_types/Index";
import { AgoraConsole } from "./AgoraConsole";

export class AgoraTranslate {
    public static agorartcLOG_LEVEL2Number(logLevel: agorartc.LOG_LEVEL): number {
        switch (logLevel) {
            case agorartc.LOG_LEVEL.LOG_LEVEL_NONE:
                return 4;
            case agorartc.LOG_LEVEL.LOG_LEVEL_INFO:
                return 1;
            case agorartc.LOG_LEVEL.LOG_LEVEL_WARN:
                return 2;
            case agorartc.LOG_LEVEL.LOG_LEVEL_ERROR:
                return 3;
            case agorartc.LOG_LEVEL.LOG_LEVEL_FATAL:
                return 3;
            case agorartc.LOG_LEVEL.LOG_LEVEL_API_CALL:
                return 0;
        }
    };

    public static agorartcAREA_CODE2AREAS(areaCode: agorartc.AREA_CODE | agorartc.AREA_CODE_EX): AREAS {
        switch (areaCode) {
            case agorartc.AREA_CODE.AREA_CODE_CN:
                return AREAS.CHINA;
            case agorartc.AREA_CODE.AREA_CODE_NA:
                return AREAS.NORTH_AMERICA;
            case agorartc.AREA_CODE.AREA_CODE_EU:
                return AREAS.EUROPE;
            case agorartc.AREA_CODE.AREA_CODE_AS:
                return AREAS.ASIA;
            case agorartc.AREA_CODE.AREA_CODE_JP:
                return AREAS.JAPAN;
            case agorartc.AREA_CODE.AREA_CODE_IN:
                return AREAS.INDIA;
            case agorartc.AREA_CODE.AREA_CODE_GLOB:
                return AREAS.GLOBAL;
            case agorartc.AREA_CODE_EX.AREA_CODE_OC:
                return AREAS.OCEANIA;
            case agorartc.AREA_CODE_EX.AREA_CODE_SA:
                return AREAS.SOUTH_AMERICA;
            case agorartc.AREA_CODE_EX.AREA_CODE_AF:
                return AREAS.AFRICA;
            case agorartc.AREA_CODE_EX.AREA_CODE_KR:
                return AREAS.KOREA;
            case agorartc.AREA_CODE_EX.AREA_CODE_OC:
                return AREAS.OCEANIA;
            case agorartc.AREA_CODE_EX.AREA_CODE_HKMC:
                return AREAS.HKMC;
            case agorartc.AREA_CODE_EX.AREA_CODE_US:
                return AREAS.US;
            case agorartc.AREA_CODE_EX.AREA_CODE_OVS:
                return AREAS.OVERSEA;
            default:
                AgoraConsole.warn("inpput unkonw areaCode");
                return AREAS.GLOBAL;
        }

    };

    public static agorartcCLIENT_ROLE_TYPE2ClientRole(clientRole: agorartc.CLIENT_ROLE_TYPE): ClientRole {
        switch (clientRole) {
            case agorartc.CLIENT_ROLE_TYPE.CLIENT_ROLE_BROADCASTER:
                return 'host';
            case agorartc.CLIENT_ROLE_TYPE.CLIENT_ROLE_AUDIENCE:
                return 'audience';
        };
    };

    public static agorartcCHANNEL_PROFILE_TYPE2SDK_MODE(channelProfile: agorartc.CHANNEL_PROFILE_TYPE): SDK_MODE {
        switch (channelProfile) {
            case agorartc.CHANNEL_PROFILE_TYPE.CHANNEL_PROFILE_COMMUNICATION:
                return "rtc";
            case agorartc.CHANNEL_PROFILE_TYPE.CHANNEL_PROFILE_LIVE_BROADCASTING:
                return "live";
            case agorartc.CHANNEL_PROFILE_TYPE.CHANNEL_PROFILE_GAME:
                return 'rtc';
        };
    };

    public static agorartcClientRoleOptions2ClientRoleOptions(options: agorartc.ClientRoleOptions): ClientRoleOptions {
        switch (options.audienceLatencyLevel) {
            case agorartc.AUDIENCE_LATENCY_LEVEL_TYPE.AUDIENCE_LATENCY_LEVEL_LOW_LATENCY:
                return { level: AudienceLatencyLevelType.AUDIENCE_LEVEL_LOW_LATENCY };
            case agorartc.AUDIENCE_LATENCY_LEVEL_TYPE.AUDIENCE_LATENCY_LEVEL_ULTRA_LOW_LATENCY:
                return { level: AudienceLatencyLevelType.AUDIENCE_LEVEL_ULTRA_LOW_LATENCY };
        }
    }

    public static agorartcAUDIENCE_LATENCY_LEVEL_TYPE2ClientRoleOptions(level: agorartc.AUDIENCE_LATENCY_LEVEL_TYPE): ClientRoleOptions {
        switch (level) {
            case agorartc.AUDIENCE_LATENCY_LEVEL_TYPE.AUDIENCE_LATENCY_LEVEL_LOW_LATENCY:
                return { level: AudienceLatencyLevelType.AUDIENCE_LEVEL_LOW_LATENCY };
            case agorartc.AUDIENCE_LATENCY_LEVEL_TYPE.AUDIENCE_LATENCY_LEVEL_ULTRA_LOW_LATENCY:
                return { level: AudienceLatencyLevelType.AUDIENCE_LEVEL_ULTRA_LOW_LATENCY };
        }
    }


    public static agorartcVideoEncoderConfiguration2VideoEncoderConfiguration(conf: agorartc.VideoEncoderConfiguration): VideoEncoderConfiguration {
        let ret: VideoEncoderConfiguration = {
            width: conf.dimensions.width,
            height: conf.dimensions.height,
            frameRate: {
                ideal: conf.frameRate,
                min: conf.minFrameRate,
            },
            bitrateMax: conf.bitrate,
            bitrateMin: conf.minBitrate,
        };
        return ret;
    }

    public static agorartcVideoFormat2VideoEncoderConfiguration(videoFormat: agorartc.VideoFormat): VideoEncoderConfiguration {
        let ret: VideoEncoderConfiguration = {
            width: videoFormat.width,
            height: videoFormat.height,
            frameRate: videoFormat.fps,
        };
        return ret;
    }

    public static agorartcScreenCaptureParameters2VideoEncoderConfiguration(conf: agorartc.ScreenCaptureParameters): VideoEncoderConfiguration {
        let ret: VideoEncoderConfiguration = {
            width: conf.dimensions.width,
            height: conf.dimensions.height,
            frameRate: conf.frameRate,
            bitrateMax: conf.bitrate,
        };
        return ret;
    }

    public static agorartcSimulcastStreamConfig2LowStreamParameter(config: agorartc.SimulcastStreamConfig): LowStreamParameter {
        let ret: LowStreamParameter = {
            width: config.dimensions.width,
            height: config.dimensions.height,
            framerate: {
                ideal: config.framerate,
            },
            bitrate: config.bitrate,
        }
        return ret;
    }

    public static agorartcCONNECTION_STATE_TYPE2ConnectionState(state: agorartc.CONNECTION_STATE_TYPE): ConnectionState {
        switch (state) {
            case agorartc.CONNECTION_STATE_TYPE.CONNECTION_STATE_DISCONNECTED:
                return "DISCONNECTED";
            case agorartc.CONNECTION_STATE_TYPE.CONNECTION_STATE_CONNECTING:
                return "CONNECTING";
            case agorartc.CONNECTION_STATE_TYPE.CONNECTION_STATE_CONNECTED:
                return "CONNECTED";
            case agorartc.CONNECTION_STATE_TYPE.CONNECTION_STATE_RECONNECTING:
                return "RECONNECTING";
            case agorartc.CONNECTION_STATE_TYPE.CONNECTION_STATE_FAILED:
                return "DISCONNECTED";
        }
    }



    public static agorartcENCRYPTION_MODE2EncryptionMode(mode: agorartc.ENCRYPTION_MODE): EncryptionMode {
        switch (mode) {
            case agorartc.ENCRYPTION_MODE.AES_128_XTS:
                return "aes-128-xts";
            case agorartc.ENCRYPTION_MODE.AES_128_ECB:
                return "aes-128-ecb";
            case agorartc.ENCRYPTION_MODE.AES_256_XTS:
                return "aes-256-xts";
            case agorartc.ENCRYPTION_MODE.SM4_128_ECB:
                return "sm4-128-ecb";
            case agorartc.ENCRYPTION_MODE.AES_128_GCM:
                return "aes-128-gcm";
            case agorartc.ENCRYPTION_MODE.AES_256_GCM:
                return "aes-256-gcm";
            case agorartc.ENCRYPTION_MODE.AES_128_GCM2:
                return "aes-128-gcm2";
            case agorartc.ENCRYPTION_MODE.AES_256_GCM2:
                return "aes-256-gcm2";
        }
    }

    public static agorartcInjectStreamConfig2InjectStreamConfig(config: agorartc.InjectStreamConfig): InjectStreamConfig {
        let ret: InjectStreamConfig = {
            audioBitrate: config.audioBitrate,
            audioChannels: config.audioChannels,
            audioSampleRate: config.audioSampleRate,
            height: config.width,
            width: config.height,
            videoBitrate: config.videoBitrate,
            videoFramerate: config.videoFramerate,
            videoGop: config.videoGop,
        };
        return ret;
    }


    public static agorartcChannelMediaRelayConfiguration2IChannelMediaRelayConfiguration(config: agorartc.ChannelMediaRelayConfiguration): IChannelMediaRelayConfiguration {
        let ret: IChannelMediaRelayConfiguration = AgoraRTC.createChannelMediaRelayConfiguration();
        ret.setSrcChannelInfo(AgoraTranslate.agorartcChannelMediaInfo2ChannelMediaRelayInfo(config.srcInfo));
        for (let i = 0; i < config.destInfos.length; i++) {
            ret.addDestChannelInfo(AgoraTranslate.agorartcChannelMediaInfo2ChannelMediaRelayInfo(config.destInfos[i]));
        }
        return ret;
    }


    public static agorartcChannelMediaInfo2ChannelMediaRelayInfo(info: agorartc.ChannelMediaInfo): ChannelMediaRelayInfo {
        let ret: ChannelMediaRelayInfo = {
            channelName: info.channelName,
            token: info.token,
            uid: info.uid
        };
        return ret;
    }

    public static agorartcContentInspectConfig2InspectConfiguration(config: agorartc.ContentInspectConfig): InspectConfiguration {
        let ret: InspectConfiguration = {
            interval: 1,
            extraInfo: config.extraInfo,
            inspectType: [],
        };

        if (config.modules.length > 0) {
            let module: agorartc.ContentInspectModule = config.modules[0];
            ret.interval = module.frequency;
            switch (module.type) {
                case agorartc.CONTENT_INSPECT_TYPE.CONTENT_INSPECT_INVALID:
                    break;
                case agorartc.CONTENT_INSPECT_TYPE.CONTENT_INSPECT_MODERATION:
                    ret.inspectType.push("moderation");
                    break;
                case agorartc.CONTENT_INSPECT_TYPE.CONTENT_INSPECT_SUPERVISION:
                    ret.inspectType.push("supervise");
                    break;
            }
            //web这里的单位是毫秒， 而native传入的间隔是秒
            ret.interval = module.frequency * 1000;
        }

        return ret;
    }

    public static agorartcVIDEO_CONTENT_HINT2string(hint: agorartc.VIDEO_CONTENT_HINT): "motion" | "detail" {
        switch (hint) {
            case agorartc.VIDEO_CONTENT_HINT.CONTENT_HINT_MOTION:
                return "motion";
            case agorartc.VIDEO_CONTENT_HINT.CONTENT_HINT_DETAILS:
                return "detail";
            default:
                return "detail";
        }
    }

    public static agorartcCAMERA_DIRECTION2string(direction: agorartc.CAMERA_DIRECTION): "user" | "environment" {
        switch (direction) {
            case agorartc.CAMERA_DIRECTION.CAMERA_FRONT:
                return "user";
            case agorartc.CAMERA_DIRECTION.CAMERA_REAR:
                return "environment";
        }
    }

    public static agorartcVIDEO_MIRROR_MODE_TYPE2boolean(mode: agorartc.VIDEO_MIRROR_MODE_TYPE): boolean {
        switch (mode) {
            case agorartc.VIDEO_MIRROR_MODE_TYPE.VIDEO_MIRROR_MODE_AUTO:
                return true;
            case agorartc.VIDEO_MIRROR_MODE_TYPE.VIDEO_MIRROR_MODE_DISABLED:
                return false;
            case agorartc.VIDEO_MIRROR_MODE_TYPE.VIDEO_MIRROR_MODE_ENABLED:
                return true;
        }
    }

    public static agorartcVIDEO_CODEC_TYPE2SDK_CODEC(code: agorartc.VIDEO_CODEC_TYPE): SDK_CODEC {
        switch (code) {
            case agorartc.VIDEO_CODEC_TYPE.VIDEO_CODEC_H264:
                return "h264";
            case agorartc.VIDEO_CODEC_TYPE.VIDEO_CODEC_AV1:
                return "av1";
            case agorartc.VIDEO_CODEC_TYPE.VIDEO_CODEC_VP8:
                return "vp8";
            case agorartc.VIDEO_CODEC_TYPE.VIDEO_CODEC_VP9:
                return "vp9";
            default:
                return "vp8";
        }
    }

    public static agorartcVIDEO_STREAM_TYPE2RemoteStreamType(type: agorartc.VIDEO_STREAM_TYPE): RemoteStreamType {
        switch (type) {
            case agorartc.VIDEO_STREAM_TYPE.VIDEO_STREAM_HIGH:
                return RemoteStreamType.HIGH_STREAM;
            case agorartc.VIDEO_STREAM_TYPE.VIDEO_STREAM_LOW:
                return RemoteStreamType.LOW_STREAM;
        }

    }

    public static agorartcSTREAM_FALLBACK_OPTIONS2RemoteStreamFallbackType(fallback: agorartc.STREAM_FALLBACK_OPTIONS): RemoteStreamFallbackType {

        switch (fallback) {
            case agorartc.STREAM_FALLBACK_OPTIONS.STREAM_FALLBACK_OPTION_DISABLED:
                return RemoteStreamFallbackType.DISABLE;
            case agorartc.STREAM_FALLBACK_OPTIONS.STREAM_FALLBACK_OPTION_VIDEO_STREAM_LOW:
                return RemoteStreamFallbackType.LOW_STREAM;
            case agorartc.STREAM_FALLBACK_OPTIONS.STREAM_FALLBACK_OPTION_AUDIO_ONLY:
                return RemoteStreamFallbackType.AUDIO_ONLY;
        }
    }

    public static agorartcRtcImage2LiveStreamingTranscodingImage(image: agorartc.RtcImage): LiveStreamingTranscodingImage {
        let ret: LiveStreamingTranscodingImage = {
            url: image.url,
            x: image.x,
            y: image.y,
            width: image.width,
            height: image.height,
            alpha: image.alpha,
        };
        return ret;
    }

    public static agorartcTranscodingUser2LiveStreamingTranscodingUser(user: agorartc.TranscodingUser): LiveStreamingTranscodingUser {
        let ret: LiveStreamingTranscodingUser = {
            alpha: user.alpha,
            height: user.height,
            uid: user.uid as UID,
            width: user.width,
            x: user.x,
            y: user.y,
            zOrder: user.zOrder,
            audioChannel: user.audioChannel,
        }
        return ret;
    }


    public static agorartcLiveTranscoding2LiveStreamingTranscodingConfig(config: agorartc.LiveTranscoding): LiveStreamingTranscodingConfig {


        let ret: LiveStreamingTranscodingConfig = {
            audioBitrate: config.audioBitrate,
            audioChannels: config.audioChannels as (1 | 2 | 3 | 4 | 5),
            audioSampleRate: config.audioSampleRate as (32000 | 44100 | 48000),
            backgroundColor: config.backgroundColor,
            height: config.height,
            width: config.width,
            lowLatency: config.lowLatency,
            videoBitrate: config.videoBitrate,
            videoCodecProfile: config.videoCodecProfile as (66 | 77 | 100),
            videoFrameRate: config.videoFramerate,
            videoGop: config.videoGop,
            userConfigExtraInfo: config.transcodingExtraInfo,
        }

        if (config.watermarkCount >= 1) {
            ret.watermark = AgoraTranslate.agorartcRtcImage2LiveStreamingTranscodingImage(config.watermark[0]);
        }
        if (config.backgroundImageCount >= 1) {
            ret.backgroundImage = AgoraTranslate.agorartcRtcImage2LiveStreamingTranscodingImage(config.backgroundImage[0]);
        }

        ret.transcodingUsers = [];
        if (config.userCount > 0) {
            for (let i = 0; i < config.userCount; i++) {
                ret.transcodingUsers.push(AgoraTranslate.agorartcTranscodingUser2LiveStreamingTranscodingUser(config.transcodingUsers[i]));
            }
        }

        return ret;
    }



    /*************************/
    public static DeviceState2agorartcMEDIA_DEVICE_STATE_TYPE(state: DeviceState): agorartc.MEDIA_DEVICE_STATE_TYPE {
        switch (state) {
            case 'ACTIVE':
                return agorartc.MEDIA_DEVICE_STATE_TYPE.MEDIA_DEVICE_STATE_ACTIVE;
            case 'INACTIVE':
                return agorartc.MEDIA_DEVICE_STATE_TYPE.MEDIA_DEVICE_STATE_DISABLED;
        }
    }

    public static ConnectionState2agorartcCONNECTION_STATE_TYPE(state: ConnectionState): agorartc.CONNECTION_STATE_TYPE {
        switch (state) {
            case "DISCONNECTED":
                return agorartc.CONNECTION_STATE_TYPE.CONNECTION_STATE_DISCONNECTED;
            case "CONNECTING":
                return agorartc.CONNECTION_STATE_TYPE.CONNECTION_STATE_CONNECTING;
            case "CONNECTED":
                return agorartc.CONNECTION_STATE_TYPE.CONNECTION_STATE_CONNECTED;
            case "RECONNECTING":
                return agorartc.CONNECTION_STATE_TYPE.CONNECTION_STATE_RECONNECTING;
            case "DISCONNECTING":  
                return agorartc.CONNECTION_STATE_TYPE.CONNECTION_STATE_DISCONNECTED;
        }
    }

    public static string2agorartcENCRYPTION_MODE(mode: string): agorartc.ENCRYPTION_MODE {
        switch (mode) {
            case "aes-128-xts":
                return agorartc.ENCRYPTION_MODE.AES_128_XTS;
            case "aes-128-ecb":
                return agorartc.ENCRYPTION_MODE.AES_128_ECB;
            case "aes-256-xts":
                return agorartc.ENCRYPTION_MODE.AES_256_XTS;
            case "sm4-128-ecb":
                return agorartc.ENCRYPTION_MODE.SM4_128_ECB;
            case "aes-128-gcm":
                return agorartc.ENCRYPTION_MODE.AES_128_GCM;
            case "aes-256-gcm":
                return agorartc.ENCRYPTION_MODE.AES_256_GCM;
            case "aes-128-gcm2":
                return agorartc.ENCRYPTION_MODE.AES_128_GCM2;
            case "aes-256-gcm2":
                return agorartc.ENCRYPTION_MODE.AES_256_GCM2;
            default:
                AgoraConsole.warn("invalid mode: " + mode);
                return agorartc.ENCRYPTION_MODE.AES_128_GCM;
        }
    }

    public static ConnectionDisconnectedReason2agorartcCONNECTION_CHANGED_REASON_TYPE(reason: ConnectionDisconnectedReason): agorartc.CONNECTION_CHANGED_REASON_TYPE {
        switch (reason) {
            case ConnectionDisconnectedReason.LEAVE:
                return agorartc.CONNECTION_CHANGED_REASON_TYPE.CONNECTION_CHANGED_LEAVE_CHANNEL;
            case ConnectionDisconnectedReason.NETWORK_ERROR:
                return agorartc.CONNECTION_CHANGED_REASON_TYPE.CONNECTION_CHANGED_INTERRUPTED;
            case ConnectionDisconnectedReason.SERVER_ERROR:
                return agorartc.CONNECTION_CHANGED_REASON_TYPE.CONNECTION_CHANGED_INTERRUPTED;
            case ConnectionDisconnectedReason.UID_BANNED:
                return agorartc.CONNECTION_CHANGED_REASON_TYPE.CONNECTION_CHANGED_BANNED_BY_SERVER;
            case ConnectionDisconnectedReason.IP_BANNED:
                return agorartc.CONNECTION_CHANGED_REASON_TYPE.CONNECTION_CHANGED_BANNED_BY_SERVER;
            case ConnectionDisconnectedReason.CHANNEL_BANNED:
                return agorartc.CONNECTION_CHANGED_REASON_TYPE.CONNECTION_CHANGED_INVALID_CHANNEL_NAME;
            case ConnectionDisconnectedReason.FALLBACK:
                return agorartc.CONNECTION_CHANGED_REASON_TYPE.CONNECTION_CHANGED_INTERRUPTED;
        }
    }

    public static string2agorartcUSER_OFFLINE_REASON_TYPE(reason: string): agorartc.USER_OFFLINE_REASON_TYPE {
        switch (reason) {
            case "Quit":
                return agorartc.USER_OFFLINE_REASON_TYPE.USER_OFFLINE_QUIT;
            case "ServerTimeOut":
                return agorartc.USER_OFFLINE_REASON_TYPE.USER_OFFLINE_DROPPED;
            case "BecomeAudience":
                return agorartc.USER_OFFLINE_REASON_TYPE.USER_OFFLINE_BECOME_AUDIENCE;
            default:
                return agorartc.USER_OFFLINE_REASON_TYPE.USER_OFFLINE_QUIT;
        }
    }

    public static ChannelMediaRelayState2agorartcCHANNEL_MEDIA_RELAY_STATE(state: ChannelMediaRelayState): agorartc.CHANNEL_MEDIA_RELAY_STATE {
        switch (state) {
            case ChannelMediaRelayState.RELAY_STATE_IDLE:
                return agorartc.CHANNEL_MEDIA_RELAY_STATE.RELAY_STATE_IDLE;
            case ChannelMediaRelayState.RELAY_STATE_CONNECTING:
                return agorartc.CHANNEL_MEDIA_RELAY_STATE.RELAY_STATE_CONNECTING;
            case ChannelMediaRelayState.RELAY_STATE_RUNNING:
                return agorartc.CHANNEL_MEDIA_RELAY_STATE.RELAY_STATE_RUNNING;
            case ChannelMediaRelayState.RELAY_STATE_FAILURE:
                return agorartc.CHANNEL_MEDIA_RELAY_STATE.RELAY_STATE_FAILURE;
        }
    }

    public static ChannelMediaRelayError2agorartcCHANNEL_MEDIA_RELAY_ERROR(err: ChannelMediaRelayError): agorartc.CHANNEL_MEDIA_RELAY_ERROR {
        switch (err) {
            case ChannelMediaRelayError.RELAY_OK:
                return agorartc.CHANNEL_MEDIA_RELAY_ERROR.RELAY_OK;
            case ChannelMediaRelayError.SERVER_CONNECTION_LOST:
                return agorartc.CHANNEL_MEDIA_RELAY_ERROR.RELAY_ERROR_SERVER_CONNECTION_LOST;
            case ChannelMediaRelayError.SRC_TOKEN_EXPIRED:
                return agorartc.CHANNEL_MEDIA_RELAY_ERROR.RELAY_ERROR_SRC_TOKEN_EXPIRED;
            case ChannelMediaRelayError.DEST_TOKEN_EXPIRED:
                return agorartc.CHANNEL_MEDIA_RELAY_ERROR.RELAY_ERROR_DEST_TOKEN_EXPIRED;
        }
    }

    public static ChannelMediaRelayEvent2agorartcCHANNEL_MEDIA_RELAY_EVENT(event: ChannelMediaRelayEvent): agorartc.CHANNEL_MEDIA_RELAY_EVENT {
        switch (event) {
            case ChannelMediaRelayEvent.NETWORK_DISCONNECTED:
                return agorartc.CHANNEL_MEDIA_RELAY_EVENT.RELAY_EVENT_NETWORK_DISCONNECTED;
            case ChannelMediaRelayEvent.NETWORK_CONNECTED:
                return agorartc.CHANNEL_MEDIA_RELAY_EVENT.RELAY_EVENT_NETWORK_CONNECTED;
            case ChannelMediaRelayEvent.PACKET_JOINED_SRC_CHANNEL:
                return agorartc.CHANNEL_MEDIA_RELAY_EVENT.RELAY_EVENT_PACKET_JOINED_SRC_CHANNEL;
            case ChannelMediaRelayEvent.PACKET_JOINED_DEST_CHANNEL:
                return agorartc.CHANNEL_MEDIA_RELAY_EVENT.RELAY_EVENT_PACKET_JOINED_DEST_CHANNEL;
            case ChannelMediaRelayEvent.PACKET_SENT_TO_DEST_CHANNEL:
                return agorartc.CHANNEL_MEDIA_RELAY_EVENT.RELAY_EVENT_PACKET_SENT_TO_DEST_CHANNEL;
            case ChannelMediaRelayEvent.PACKET_RECEIVED_VIDEO_FROM_SRC:
                return agorartc.CHANNEL_MEDIA_RELAY_EVENT.RELAY_EVENT_PACKET_RECEIVED_VIDEO_FROM_SRC;
            case ChannelMediaRelayEvent.PACKET_RECEIVED_AUDIO_FROM_SRC:
                return agorartc.CHANNEL_MEDIA_RELAY_EVENT.RELAY_EVENT_PACKET_RECEIVED_AUDIO_FROM_SRC;
            case ChannelMediaRelayEvent.PACKET_UPDATE_DEST_CHANNEL:
                return agorartc.CHANNEL_MEDIA_RELAY_EVENT.RELAY_EVENT_PACKET_UPDATE_DEST_CHANNEL;
            case ChannelMediaRelayEvent.PACKET_UPDATE_DEST_CHANNEL_REFUSED:
                return agorartc.CHANNEL_MEDIA_RELAY_EVENT.RELAY_EVENT_PACKET_UPDATE_DEST_CHANNEL_REFUSED;
            case ChannelMediaRelayEvent.PACKET_UPDATE_DEST_CHANNEL_NOT_CHANGE:
                return agorartc.CHANNEL_MEDIA_RELAY_EVENT.RELAY_EVENT_PACKET_UPDATE_DEST_CHANNEL_NOT_CHANGE;
        }
    }

    public static volumeIndicatorResult2agorartcAudioVolumeInfo(result: { level: number; uid: UID; }): agorartc.AudioVolumeInfo {
        //level范围是[0,100], volume范围是 0 - 255， 要做一下转换
        let audioVolumInfo: agorartc.AudioVolumeInfo = {
            uid: result.uid as number,
            volume: Math.floor(result.level * 2.55),
            vad: 0,
            voicePitch: 0
        };
        return audioVolumInfo;
    }

    //webQuality
    //webQuality:    6,5,4,3,2,1   poor=>better
    //agortcQuality: 0,1,2,3,4,5,  poor=>better
    public static webQuality2agorartcQuality(webQuality: number): number {
        return 6 - webQuality;
    }

    public static data2agorartcCONTENT_INSPECT_RESULT(data: "porn" | "sexy" | "neutral"): agorartc.CONTENT_INSPECT_RESULT {
        switch (data) {
            case "porn":
                return agorartc.CONTENT_INSPECT_RESULT.CONTENT_INSPECT_PORN;
            case "sexy":
                return agorartc.CONTENT_INSPECT_RESULT.CONTENT_INSPECT_SEXY;
            case "neutral":
                return agorartc.CONTENT_INSPECT_RESULT.CONTENT_INSPECT_NEUTRAL;
        }
    }

}