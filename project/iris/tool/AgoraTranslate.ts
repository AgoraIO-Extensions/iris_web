
import AgoraRTC, { AREAS, AudienceLatencyLevelType, ClientRole, ClientRoleOptions, LowStreamParameter, SDK_MODE, VideoEncoderConfiguration } from "agora-rtc-sdk-ng";
import { Argument } from "webpack";
import * as agorartc from "../terra/rtc_types/Index";
import { AgoraConsole } from "./AgoraConsole";

export class AgoraTranslate {

    // * - 0: DEBUG. Output all API logs.
    // * - 1: INFO. Output logs of the INFO, WARNING and ERROR level.
    // * - 2: WARNING. Output logs of the WARNING and ERROR level.
    // * - 3: ERROR. Output logs of the ERROR level.
    // * - 4: NONE. Do not output any log.

    // LOG_LEVEL {
    // LOG_LEVEL_NONE = 0x0000,
    //     LOG_LEVEL_INFO = 0x0001,
    //     LOG_LEVEL_WARN = 0x0002,
    //     LOG_LEVEL_ERROR = 0x0004,
    //     LOG_LEVEL_FATAL = 0x0008, 致命
    //     LOG_LEVEL_API_CALL = 0x0010,
    // }
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

    public static agorartcSTREAM_FALLBACK_OPTIONS2

}