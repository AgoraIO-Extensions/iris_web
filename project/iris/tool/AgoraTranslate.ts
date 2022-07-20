
import AgoraRTC, { AREAS, AudienceLatencyLevelType, ChannelMediaRelayInfo, ClientRole, ClientRoleOptions, ConnectionState, EncryptionMode, IChannelMediaRelayConfiguration, InjectStreamConfig, InspectConfiguration, LowStreamParameter, RemoteStreamType, SDK_CODEC, SDK_MODE, VideoEncoderConfiguration } from "agora-rtc-sdk-ng";
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
            inspectType: "all",
        };

        if (config.modules.length > 0) {
            let module: agorartc.ContentInspectModule = config.modules[0];
            ret.interval = module.frequency;
            switch (module.type) {
                case agorartc.CONTENT_INSPECT_TYPE.CONTENT_INSPECT_INVALID:
                    ret.inspectType = "all";
                    break;
                case agorartc.CONTENT_INSPECT_TYPE.CONTENT_INSPECT_MODERATION:
                    ret.inspectType = "moderation";
                    break;
                case agorartc.CONTENT_INSPECT_TYPE.CONTENT_INSPECT_SUPERVISION:
                    ret.inspectType = "supervise";
                    break;
            }
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
}