import * as NATIVE_RTC from '@iris/native-rtc';
import {
  AREAS,
  AudienceLatencyLevelType,
  ChannelMediaRelayError,
  ChannelMediaRelayInfo,
  ClientRole,
  ClientRoleOptions,
  ConnectionDisconnectedReason,
  ConnectionState,
  DeviceState,
  EncryptionMode,
  IChannelMediaRelayConfiguration,
  InjectStreamConfig,
  InspectConfiguration,
  LiveStreamingTranscodingConfig,
  LiveStreamingTranscodingImage,
  LiveStreamingTranscodingUser,
  LowStreamParameter,
  RemoteStreamFallbackType,
  RemoteStreamType,
  SDK_CODEC,
  SDK_MODE,
  UID,
  VideoEncoderConfiguration,
} from 'agora-rtc-sdk-ng';

import { IrisRtcEngine } from '../engine/IrisRtcEngine';

import { AgoraConsole } from './AgoraConsole';

export class AgoraTranslate {
  public static NATIVE_RTCLOG_LEVEL2Number(
    logLevel: NATIVE_RTC.LOG_LEVEL
  ): number {
    switch (logLevel) {
      case NATIVE_RTC.LOG_LEVEL.LOG_LEVEL_NONE:
        return 4;
      case NATIVE_RTC.LOG_LEVEL.LOG_LEVEL_INFO:
        return 1;
      case NATIVE_RTC.LOG_LEVEL.LOG_LEVEL_WARN:
        return 2;
      case NATIVE_RTC.LOG_LEVEL.LOG_LEVEL_ERROR:
        return 3;
      case NATIVE_RTC.LOG_LEVEL.LOG_LEVEL_FATAL:
        return 3;
      case NATIVE_RTC.LOG_LEVEL.LOG_LEVEL_API_CALL:
        return 0;
      default:
        AgoraConsole.log(
          'SDK logLevel is not specified, will output webSDK log.'
        );
        return 0;
    }
  }

  public static NATIVE_RTCAREA_CODE2AREAS(
    areaCode: NATIVE_RTC.AREA_CODE | NATIVE_RTC.AREA_CODE_EX
  ): AREAS {
    switch (areaCode) {
      case NATIVE_RTC.AREA_CODE.AREA_CODE_CN:
        return AREAS.CHINA;
      case NATIVE_RTC.AREA_CODE.AREA_CODE_NA:
        return AREAS.NORTH_AMERICA;
      case NATIVE_RTC.AREA_CODE.AREA_CODE_EU:
        return AREAS.EUROPE;
      case NATIVE_RTC.AREA_CODE.AREA_CODE_AS:
        return AREAS.ASIA;
      case NATIVE_RTC.AREA_CODE.AREA_CODE_JP:
        return AREAS.JAPAN;
      case NATIVE_RTC.AREA_CODE.AREA_CODE_IN:
        return AREAS.INDIA;
      case NATIVE_RTC.AREA_CODE.AREA_CODE_GLOB:
        return AREAS.GLOBAL;
      case NATIVE_RTC.AREA_CODE_EX.AREA_CODE_SA:
        return AREAS.SOUTH_AMERICA;
      case NATIVE_RTC.AREA_CODE_EX.AREA_CODE_AF:
        return AREAS.AFRICA;
      case NATIVE_RTC.AREA_CODE_EX.AREA_CODE_KR:
        return AREAS.KOREA;
      case NATIVE_RTC.AREA_CODE_EX.AREA_CODE_OC:
        return AREAS.OCEANIA;
      case NATIVE_RTC.AREA_CODE_EX.AREA_CODE_HKMC:
        return AREAS.HKMC;
      case NATIVE_RTC.AREA_CODE_EX.AREA_CODE_US:
        return AREAS.US;
      case NATIVE_RTC.AREA_CODE_EX.AREA_CODE_OVS:
        return AREAS.OVERSEA;
      default:
        AgoraConsole.warn('input Unknown areaCode');
        return AREAS.GLOBAL;
    }
  }

  public static NATIVE_RTC_CLIENT_ROLE_TYPE2ClientRole(
    clientRole: NATIVE_RTC.CLIENT_ROLE_TYPE
  ): ClientRole {
    switch (clientRole) {
      case NATIVE_RTC.CLIENT_ROLE_TYPE.CLIENT_ROLE_BROADCASTER:
        return 'host';
      case NATIVE_RTC.CLIENT_ROLE_TYPE.CLIENT_ROLE_AUDIENCE:
        return 'audience';
    }
  }

  public static NATIVE_RTC_CHANNEL_PROFILE_TYPE2SDK_MODE(
    channelProfile: NATIVE_RTC.CHANNEL_PROFILE_TYPE
  ): SDK_MODE {
    switch (channelProfile) {
      case NATIVE_RTC.CHANNEL_PROFILE_TYPE.CHANNEL_PROFILE_LIVE_BROADCASTING:
        return 'live';
      default:
        return 'rtc';
    }
  }

  public static NATIVE_RTCClientRoleOptions2ClientRoleOptions(
    options: NATIVE_RTC.ClientRoleOptions
  ): ClientRoleOptions {
    switch (options.audienceLatencyLevel) {
      case NATIVE_RTC.AUDIENCE_LATENCY_LEVEL_TYPE
        .AUDIENCE_LATENCY_LEVEL_LOW_LATENCY:
        return { level: AudienceLatencyLevelType.AUDIENCE_LEVEL_LOW_LATENCY };
      case NATIVE_RTC.AUDIENCE_LATENCY_LEVEL_TYPE
        .AUDIENCE_LATENCY_LEVEL_ULTRA_LOW_LATENCY:
        return {
          level: AudienceLatencyLevelType.AUDIENCE_LEVEL_ULTRA_LOW_LATENCY,
        };
    }
  }

  public static NATIVE_RTC_AUDIENCE_LATENCY_LEVEL_TYPE2ClientRoleOptions(
    level: NATIVE_RTC.AUDIENCE_LATENCY_LEVEL_TYPE
  ): ClientRoleOptions {
    switch (level) {
      case NATIVE_RTC.AUDIENCE_LATENCY_LEVEL_TYPE
        .AUDIENCE_LATENCY_LEVEL_LOW_LATENCY:
        return { level: AudienceLatencyLevelType.AUDIENCE_LEVEL_LOW_LATENCY };
      case NATIVE_RTC.AUDIENCE_LATENCY_LEVEL_TYPE
        .AUDIENCE_LATENCY_LEVEL_ULTRA_LOW_LATENCY:
        return {
          level: AudienceLatencyLevelType.AUDIENCE_LEVEL_ULTRA_LOW_LATENCY,
        };
    }
  }

  public static NATIVE_RTCVideoEncoderConfiguration2VideoEncoderConfiguration(
    conf: NATIVE_RTC.VideoEncoderConfiguration
  ): VideoEncoderConfiguration {
    return {
      width: conf.dimensions.width,
      height: conf.dimensions.height,
      frameRate: conf.frameRate,
      bitrateMax: conf.bitrate,
      bitrateMin: conf.minBitrate,
    };
  }

  public static NATIVE_RTCVideoFormat2VideoEncoderConfiguration(
    videoFormat: NATIVE_RTC.VideoFormat
  ): VideoEncoderConfiguration {
    let ret: VideoEncoderConfiguration = {
      width: videoFormat.width,
      height: videoFormat.height,
      frameRate: videoFormat.fps,
    };
    return ret;
  }

  public static NATIVE_RTCScreenCaptureParameters2VideoEncoderConfiguration(
    conf: NATIVE_RTC.ScreenCaptureParameters2
  ): VideoEncoderConfiguration {
    let ret: VideoEncoderConfiguration = {
      frameRate: conf.videoParams?.frameRate,
      bitrateMax: conf.videoParams?.bitrate,
    };
    return ret;
  }

  public static NATIVE_RTCSimulcastStreamConfig2LowStreamParameter(
    config: NATIVE_RTC.SimulcastStreamConfig
  ): LowStreamParameter {
    let ret: LowStreamParameter = {
      width: config.dimensions.width,
      height: config.dimensions.height,
      framerate: {
        ideal: config.framerate,
      },
      bitrate: config.framerate,
    };
    return ret;
  }

  public static NATIVE_RTCCONNECTION_STATE_TYPE2ConnectionState(
    state: NATIVE_RTC.CONNECTION_STATE_TYPE
  ): ConnectionState {
    switch (state) {
      case NATIVE_RTC.CONNECTION_STATE_TYPE.CONNECTION_STATE_DISCONNECTED:
        return 'DISCONNECTED';
      case NATIVE_RTC.CONNECTION_STATE_TYPE.CONNECTION_STATE_CONNECTING:
        return 'CONNECTING';
      case NATIVE_RTC.CONNECTION_STATE_TYPE.CONNECTION_STATE_CONNECTED:
        return 'CONNECTED';
      case NATIVE_RTC.CONNECTION_STATE_TYPE.CONNECTION_STATE_RECONNECTING:
        return 'RECONNECTING';
      case NATIVE_RTC.CONNECTION_STATE_TYPE.CONNECTION_STATE_FAILED:
        return 'DISCONNECTED';
    }
  }

  public static NATIVE_RTCENCRYPTION_MODE2EncryptionMode(
    mode: NATIVE_RTC.ENCRYPTION_MODE
  ): EncryptionMode {
    switch (mode) {
      case NATIVE_RTC.ENCRYPTION_MODE.AES_128_XTS:
        return 'aes-128-xts';
      case NATIVE_RTC.ENCRYPTION_MODE.AES_128_ECB:
        return 'aes-128-ecb';
      case NATIVE_RTC.ENCRYPTION_MODE.AES_256_XTS:
        return 'aes-256-xts';
      case NATIVE_RTC.ENCRYPTION_MODE.SM4_128_ECB:
        return 'sm4-128-ecb';
      case NATIVE_RTC.ENCRYPTION_MODE.AES_128_GCM:
        return 'aes-128-gcm';
      case NATIVE_RTC.ENCRYPTION_MODE.AES_256_GCM:
        return 'aes-256-gcm';
      case NATIVE_RTC.ENCRYPTION_MODE.AES_128_GCM2:
        return 'aes-128-gcm2';
      case NATIVE_RTC.ENCRYPTION_MODE.AES_256_GCM2:
        return 'aes-256-gcm2';
    }
  }

  public static NATIVE_RTCInjectStreamConfig2InjectStreamConfig(
    config: NATIVE_RTC.InjectStreamConfig
  ): InjectStreamConfig {
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

  public static NATIVE_RTCChannelMediaRelayConfiguration2IChannelMediaRelayConfiguration(
    config: NATIVE_RTC.ChannelMediaRelayConfiguration,
    engine: IrisRtcEngine
  ): IChannelMediaRelayConfiguration {
    let ret: IChannelMediaRelayConfiguration = engine.globalState.AgoraRTC.createChannelMediaRelayConfiguration();
    ret.addDestChannelInfo(
      AgoraTranslate.NATIVE_RTCChannelMediaInfo2ChannelMediaRelayInfo(
        config.srcInfo
      )
    );
    for (let i = 0; i < config.destInfos.length; i++) {
      ret.addDestChannelInfo(
        AgoraTranslate.NATIVE_RTCChannelMediaInfo2ChannelMediaRelayInfo(
          config.destInfos[i]
        )
      );
    }
    return ret;
  }

  public static NATIVE_RTCChannelMediaInfo2ChannelMediaRelayInfo(
    info: NATIVE_RTC.ChannelMediaInfo
  ): ChannelMediaRelayInfo {
    let ret: ChannelMediaRelayInfo = {
      channelName: info.channelName,
      token: info.token,
      uid: info.uid,
    };
    return ret;
  }

  public static NATIVE_RTCContentInspectConfig2InspectConfiguration(
    config: NATIVE_RTC.ContentInspectConfig
  ): InspectConfiguration {
    let ret: InspectConfiguration = {
      interval: 1,
      extraInfo: config.extraInfo,
      inspectType: [],
    };

    let module: NATIVE_RTC.ContentInspectModule = config.modules[0];
    ret.interval = module.interval;
    switch (module.type) {
      case NATIVE_RTC.CONTENT_INSPECT_TYPE.CONTENT_INSPECT_INVALID:
        break;
      case NATIVE_RTC.CONTENT_INSPECT_TYPE.CONTENT_INSPECT_MODERATION:
        ret.inspectType.push('moderation');
        break;
      case NATIVE_RTC.CONTENT_INSPECT_TYPE.CONTENT_INSPECT_SUPERVISION:
        ret.inspectType.push('supervise');
        break;
    }
    //web这里的单位是毫秒， 而native传入的间隔是秒
    ret.interval = module.interval * 1000;

    return ret;
  }

  public static NATIVE_RTCVIDEO_CONTENT_HINT2string(
    hint: NATIVE_RTC.VIDEO_CONTENT_HINT
  ): 'motion' | 'detail' {
    switch (hint) {
      case NATIVE_RTC.VIDEO_CONTENT_HINT.CONTENT_HINT_MOTION:
        return 'motion';
      case NATIVE_RTC.VIDEO_CONTENT_HINT.CONTENT_HINT_DETAILS:
        return 'detail';
      default:
        return 'detail';
    }
  }

  public static NATIVE_RTCCAMERA_DIRECTION2string(
    direction: NATIVE_RTC.CAMERA_DIRECTION
  ): 'user' | 'environment' {
    switch (direction) {
      case NATIVE_RTC.CAMERA_DIRECTION.CAMERA_FRONT:
        return 'user';
      case NATIVE_RTC.CAMERA_DIRECTION.CAMERA_REAR:
        return 'environment';
    }
  }

  public static NATIVE_RTCVIDEO_MIRROR_MODE_TYPE2boolean(
    mode: NATIVE_RTC.VIDEO_MIRROR_MODE_TYPE
  ): boolean {
    switch (mode) {
      case NATIVE_RTC.VIDEO_MIRROR_MODE_TYPE.VIDEO_MIRROR_MODE_AUTO:
        return true;
      case NATIVE_RTC.VIDEO_MIRROR_MODE_TYPE.VIDEO_MIRROR_MODE_DISABLED:
        return false;
      case NATIVE_RTC.VIDEO_MIRROR_MODE_TYPE.VIDEO_MIRROR_MODE_ENABLED:
        return true;
    }
  }

  public static NATIVE_RTCVIDEO_CODEC_TYPE2SDK_CODEC(
    code: NATIVE_RTC.VIDEO_CODEC_TYPE
  ): SDK_CODEC {
    switch (code) {
      case NATIVE_RTC.VIDEO_CODEC_TYPE.VIDEO_CODEC_H264:
        return 'h264';
      case NATIVE_RTC.VIDEO_CODEC_TYPE.VIDEO_CODEC_AV1:
        return 'av1';
      case NATIVE_RTC.VIDEO_CODEC_TYPE.VIDEO_CODEC_VP8:
        return 'vp8';
      case NATIVE_RTC.VIDEO_CODEC_TYPE.VIDEO_CODEC_VP9:
        return 'vp9';
      default:
        return 'vp8';
    }
  }

  public static NATIVE_RTCVIDEO_STREAM_TYPE2RemoteStreamType(
    type: NATIVE_RTC.VIDEO_STREAM_TYPE
  ): RemoteStreamType {
    switch (type) {
      case NATIVE_RTC.VIDEO_STREAM_TYPE.VIDEO_STREAM_HIGH:
        return RemoteStreamType.HIGH_STREAM;
      case NATIVE_RTC.VIDEO_STREAM_TYPE.VIDEO_STREAM_LOW:
        return RemoteStreamType.LOW_STREAM;
    }
  }

  public static NATIVE_RTCSTREAM_FALLBACK_OPTIONS2RemoteStreamFallbackType(
    fallback: NATIVE_RTC.STREAM_FALLBACK_OPTIONS
  ): RemoteStreamFallbackType {
    switch (fallback) {
      case NATIVE_RTC.STREAM_FALLBACK_OPTIONS.STREAM_FALLBACK_OPTION_DISABLED:
        return RemoteStreamFallbackType.DISABLE;
      case NATIVE_RTC.STREAM_FALLBACK_OPTIONS
        .STREAM_FALLBACK_OPTION_VIDEO_STREAM_LOW:
        return RemoteStreamFallbackType.LOW_STREAM;
      case NATIVE_RTC.STREAM_FALLBACK_OPTIONS.STREAM_FALLBACK_OPTION_AUDIO_ONLY:
        return RemoteStreamFallbackType.AUDIO_ONLY;
    }
  }

  public static NATIVE_RTCRtcImage2LiveStreamingTranscodingImage(
    image: NATIVE_RTC.RtcImage
  ): LiveStreamingTranscodingImage {
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

  public static NATIVE_RTCTranscodingUser2LiveStreamingTranscodingUser(
    user: NATIVE_RTC.TranscodingUser
  ): LiveStreamingTranscodingUser {
    let ret: LiveStreamingTranscodingUser = {
      alpha: user.alpha,
      height: user.height,
      uid: user.uid as UID,
      width: user.width,
      x: user.x,
      y: user.y,
      zOrder: user.zOrder,
      audioChannel: user.audioChannel,
    };
    return ret;
  }

  public static NATIVE_RTCLiveTranscoding2LiveStreamingTranscodingConfig(
    config: NATIVE_RTC.LiveTranscoding
  ): LiveStreamingTranscodingConfig {
    let ret: LiveStreamingTranscodingConfig = {
      audioBitrate: config.audioBitrate,
      audioChannels: config.audioChannels as 1 | 2 | 3 | 4 | 5,
      audioSampleRate: config.audioSampleRate as 32000 | 44100 | 48000,
      backgroundColor: config.backgroundColor,
      height: config.height,
      width: config.width,
      lowLatency: config.lowLatency,
      videoBitrate: config.videoBitrate,
      videoCodecProfile: config.videoCodecProfile as 66 | 77 | 100,
      videoFrameRate: config.videoFramerate,
      videoGop: config.videoGop,
      userConfigExtraInfo: config.transcodingExtraInfo,
    };

    if (config.watermarkCount >= 1) {
      ret.watermark = AgoraTranslate.NATIVE_RTCRtcImage2LiveStreamingTranscodingImage(
        config.watermark[0]
      );
    }
    if (config.backgroundImageCount >= 1) {
      ret.backgroundImage = AgoraTranslate.NATIVE_RTCRtcImage2LiveStreamingTranscodingImage(
        config.backgroundImage[0]
      );
    }

    ret.transcodingUsers = [];
    if (config.userCount > 0) {
      for (let i = 0; i < config.userCount; i++) {
        ret.transcodingUsers.push(
          AgoraTranslate.NATIVE_RTCTranscodingUser2LiveStreamingTranscodingUser(
            config.transcodingUsers[i]
          )
        );
      }
    }

    return ret;
  }

  /*************************/
  public static DeviceState2NATIVE_RTCMEDIA_DEVICE_STATE_TYPE(
    state: DeviceState
  ): NATIVE_RTC.MEDIA_DEVICE_STATE_TYPE {
    switch (state) {
      case 'ACTIVE':
        return NATIVE_RTC.MEDIA_DEVICE_STATE_TYPE.MEDIA_DEVICE_STATE_ACTIVE;
      case 'INACTIVE':
        return NATIVE_RTC.MEDIA_DEVICE_STATE_TYPE.MEDIA_DEVICE_STATE_DISABLED;
    }
  }

  public static ConnectionState2NATIVE_RTCCONNECTION_STATE_TYPE(
    state: ConnectionState
  ): NATIVE_RTC.CONNECTION_STATE_TYPE {
    switch (state) {
      case 'DISCONNECTED':
        return NATIVE_RTC.CONNECTION_STATE_TYPE.CONNECTION_STATE_DISCONNECTED;
      case 'CONNECTING':
        return NATIVE_RTC.CONNECTION_STATE_TYPE.CONNECTION_STATE_CONNECTING;
      case 'CONNECTED':
        return NATIVE_RTC.CONNECTION_STATE_TYPE.CONNECTION_STATE_CONNECTED;
      case 'RECONNECTING':
        return NATIVE_RTC.CONNECTION_STATE_TYPE.CONNECTION_STATE_RECONNECTING;
      case 'DISCONNECTING':
        return NATIVE_RTC.CONNECTION_STATE_TYPE.CONNECTION_STATE_DISCONNECTED;
    }
  }

  public static string2NATIVE_RTCENCRYPTION_MODE(
    mode: string
  ): NATIVE_RTC.ENCRYPTION_MODE {
    switch (mode) {
      case 'aes-128-xts':
        return NATIVE_RTC.ENCRYPTION_MODE.AES_128_XTS;
      case 'aes-128-ecb':
        return NATIVE_RTC.ENCRYPTION_MODE.AES_128_ECB;
      case 'aes-256-xts':
        return NATIVE_RTC.ENCRYPTION_MODE.AES_256_XTS;
      case 'sm4-128-ecb':
        return NATIVE_RTC.ENCRYPTION_MODE.SM4_128_ECB;
      case 'aes-128-gcm':
        return NATIVE_RTC.ENCRYPTION_MODE.AES_128_GCM;
      case 'aes-256-gcm':
        return NATIVE_RTC.ENCRYPTION_MODE.AES_256_GCM;
      case 'aes-128-gcm2':
        return NATIVE_RTC.ENCRYPTION_MODE.AES_128_GCM2;
      case 'aes-256-gcm2':
        return NATIVE_RTC.ENCRYPTION_MODE.AES_256_GCM2;
      default:
        AgoraConsole.warn('invalid mode: ' + mode);
        return NATIVE_RTC.ENCRYPTION_MODE.AES_128_GCM;
    }
  }

  public static ConnectionDisconnectedReason2NATIVE_RTCCONNECTION_CHANGED_REASON_TYPE(
    reason: ConnectionDisconnectedReason
  ): NATIVE_RTC.CONNECTION_CHANGED_REASON_TYPE {
    switch (reason) {
      case ConnectionDisconnectedReason.LEAVE:
        return NATIVE_RTC.CONNECTION_CHANGED_REASON_TYPE
          .CONNECTION_CHANGED_LEAVE_CHANNEL;
      case ConnectionDisconnectedReason.NETWORK_ERROR:
        return NATIVE_RTC.CONNECTION_CHANGED_REASON_TYPE
          .CONNECTION_CHANGED_INTERRUPTED;
      case ConnectionDisconnectedReason.SERVER_ERROR:
        return NATIVE_RTC.CONNECTION_CHANGED_REASON_TYPE
          .CONNECTION_CHANGED_INTERRUPTED;
      case ConnectionDisconnectedReason.UID_BANNED:
        return NATIVE_RTC.CONNECTION_CHANGED_REASON_TYPE
          .CONNECTION_CHANGED_BANNED_BY_SERVER;
      case ConnectionDisconnectedReason.IP_BANNED:
        return NATIVE_RTC.CONNECTION_CHANGED_REASON_TYPE
          .CONNECTION_CHANGED_BANNED_BY_SERVER;
      case ConnectionDisconnectedReason.CHANNEL_BANNED:
        return NATIVE_RTC.CONNECTION_CHANGED_REASON_TYPE
          .CONNECTION_CHANGED_INVALID_CHANNEL_NAME;
      case ConnectionDisconnectedReason.FALLBACK:
        return NATIVE_RTC.CONNECTION_CHANGED_REASON_TYPE
          .CONNECTION_CHANGED_INTERRUPTED;
    }
  }

  public static string2NATIVE_RTCUSER_OFFLINE_REASON_TYPE(
    reason: string
  ): NATIVE_RTC.USER_OFFLINE_REASON_TYPE {
    switch (reason) {
      case 'Quit':
        return NATIVE_RTC.USER_OFFLINE_REASON_TYPE.USER_OFFLINE_QUIT;
      case 'ServerTimeOut':
        return NATIVE_RTC.USER_OFFLINE_REASON_TYPE.USER_OFFLINE_DROPPED;
      case 'BecomeAudience':
        return NATIVE_RTC.USER_OFFLINE_REASON_TYPE.USER_OFFLINE_BECOME_AUDIENCE;
      default:
        return NATIVE_RTC.USER_OFFLINE_REASON_TYPE.USER_OFFLINE_QUIT;
    }
  }

  public static ChannelMediaRelayError2NATIVE_RTCCHANNEL_MEDIA_RELAY_ERROR(
    err: ChannelMediaRelayError
  ): NATIVE_RTC.CHANNEL_MEDIA_RELAY_ERROR {
    switch (err) {
      case ChannelMediaRelayError.RELAY_OK:
        return NATIVE_RTC.CHANNEL_MEDIA_RELAY_ERROR.RELAY_OK;
      case ChannelMediaRelayError.SERVER_CONNECTION_LOST:
        return NATIVE_RTC.CHANNEL_MEDIA_RELAY_ERROR
          .RELAY_ERROR_SERVER_CONNECTION_LOST;
      case ChannelMediaRelayError.SRC_TOKEN_EXPIRED:
        return NATIVE_RTC.CHANNEL_MEDIA_RELAY_ERROR
          .RELAY_ERROR_SRC_TOKEN_EXPIRED;
      case ChannelMediaRelayError.DEST_TOKEN_EXPIRED:
        return NATIVE_RTC.CHANNEL_MEDIA_RELAY_ERROR
          .RELAY_ERROR_DEST_TOKEN_EXPIRED;
    }
  }

  public static volumeIndicatorResult2NATIVE_RTCAudioVolumeInfo(result: {
    level: number;
    uid: UID;
  }): NATIVE_RTC.AudioVolumeInfo {
    //level范围是[0,100], volume范围是 0 - 255， 要做一下转换
    let audioVolumInfo: NATIVE_RTC.AudioVolumeInfo = {
      uid: result.uid as number,
      volume: Math.floor(result.level * 2.55),
      vad: 0,
      voicePitch: 0,
    };
    return audioVolumInfo;
  }

  //webQuality
  //webQuality:    6,5,4,3,2,1   poor=>better
  //agortcQuality: 0,1,2,3,4,5,  poor=>better
  public static webQuality2NATIVE_RTCQuality(webQuality: number): number {
    return 6 - webQuality;
  }

  public static data2NATIVE_RTC_CONNECT_INSPECT_RESULT(
    data: 'porn' | 'sexy' | 'neutral'
  ): NATIVE_RTC.CONTENT_INSPECT_RESULT {
    switch (data) {
      case 'porn':
        return NATIVE_RTC.CONTENT_INSPECT_RESULT.CONTENT_INSPECT_PORN;
      case 'sexy':
        return NATIVE_RTC.CONTENT_INSPECT_RESULT.CONTENT_INSPECT_SEXY;
      case 'neutral':
        return NATIVE_RTC.CONTENT_INSPECT_RESULT.CONTENT_INSPECT_NEUTRAL;
    }
  }
}
