import { CallApiExecutor, CallIrisApiResult } from 'iris-web-core';
export * from 'iris-web-core';
import * as NATIVE_RTC from '@iris/web-rtc';
import { LOG_LEVEL } from '@iris/web-rtc';
import AgoraRTC2, { AREAS, AudienceLatencyLevelType, RemoteStreamType, RemoteStreamFallbackType, ConnectionDisconnectedReason, ChannelMediaRelayState, ChannelMediaRelayError, ChannelMediaRelayEvent } from 'agora-rtc-sdk-ng';

/**
 * @license iris-web-rtc
 * @version 1.0.0
 *
 * Copyright (c) Agora, Inc.
 *
 * This source code is licensed under the MIT license.
 */

var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/util/AgoraActionQueue.ts
var AgoraActionQueue = class {
  constructor() {
    this._queue = new Array();
    this._next = null;
    this._next = this.next.bind(this);
  }
  putAction(action) {
    this._queue.push(action);
    if (this._queue.length == 1) {
      let action2 = this._queue[0];
      action2.args.push(this._next);
      action2.fun.apply(null, action2.args);
    }
  }
  next() {
    this._queue.shift();
    if (this._queue.length > 0) {
      let action = this._queue[0];
      action.args.push(this._next);
      action.fun.apply(null, action.args);
    }
  }
};
var _AgoraConsole = class _AgoraConsole {
  static log(msg) {
    if (_AgoraConsole.logLevel >= LOG_LEVEL.LOG_LEVEL_INFO) {
      console.log("[Iris]:" + msg);
    }
  }
  static warn(msg) {
    if (_AgoraConsole.logLevel >= LOG_LEVEL.LOG_LEVEL_WARN) {
      console.warn("[Iris]:" + msg);
    }
  }
  static error(msg) {
    if (_AgoraConsole.logLevel >= LOG_LEVEL.LOG_LEVEL_ERROR) {
      console.log("[Iris error]:" + msg);
      let stack = new Error().stack;
      console.log(stack);
    }
  }
};
_AgoraConsole.logLevel = LOG_LEVEL.LOG_LEVEL_ERROR;
var AgoraConsole = _AgoraConsole;

// src/util/AgoraTool.ts
var AgoraTool = class {
  //merge src to dest
  static mergeArray(dest, src) {
    for (let i = 0; i < src.length; i++) {
      dest.push(src[i]);
    }
  }
  //get file name from a file path
  static spliceFileName(filePath) {
    let lastIndex = 0;
    lastIndex = filePath.lastIndexOf("/");
    if (lastIndex == -1) {
      lastIndex = filePath.lastIndexOf("\\");
    }
    let fileName = null;
    if (lastIndex == -1) {
      fileName = filePath;
    } else {
      fileName = filePath.substring(lastIndex + 1);
    }
    return fileName;
  }
  //
  static downloadCanvasAsImage(canvas, fileName) {
    let dataUrl = canvas.toDataURL("image/jpeg", 1);
    let a = document.createElement("a");
    a.href = dataUrl;
    a.download = fileName;
    a.click();
  }
};
var AgoraTranslate = class _AgoraTranslate {
  static NATIVE_RTCLOG_LEVEL2Number(logLevel) {
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
    }
  }
  static NATIVE_RTCAREA_CODE2AREAS(areaCode) {
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
      case NATIVE_RTC.AREA_CODE_EX.AREA_CODE_OC:
        return AREAS.OCEANIA;
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
        AgoraConsole.warn("inpput unkonw areaCode");
        return AREAS.GLOBAL;
    }
  }
  static NATIVE_RTCCLIENT_ROLE_TYPE2ClientRole(clientRole) {
    switch (clientRole) {
      case NATIVE_RTC.CLIENT_ROLE_TYPE.CLIENT_ROLE_BROADCASTER:
        return "host";
      case NATIVE_RTC.CLIENT_ROLE_TYPE.CLIENT_ROLE_AUDIENCE:
        return "audience";
    }
  }
  static NATIVE_RTCCHANNEL_PROFILE_TYPE2SDK_MODE(channelProfile) {
    switch (channelProfile) {
      case NATIVE_RTC.CHANNEL_PROFILE_TYPE.CHANNEL_PROFILE_LIVE_BROADCASTING:
        return "live";
      default:
        return "rtc";
    }
  }
  static NATIVE_RTCClientRoleOptions2ClientRoleOptions(options) {
    switch (options.audienceLatencyLevel) {
      case NATIVE_RTC.AUDIENCE_LATENCY_LEVEL_TYPE.AUDIENCE_LATENCY_LEVEL_LOW_LATENCY:
        return { level: AudienceLatencyLevelType.AUDIENCE_LEVEL_LOW_LATENCY };
      case NATIVE_RTC.AUDIENCE_LATENCY_LEVEL_TYPE.AUDIENCE_LATENCY_LEVEL_ULTRA_LOW_LATENCY:
        return {
          level: AudienceLatencyLevelType.AUDIENCE_LEVEL_ULTRA_LOW_LATENCY
        };
    }
  }
  static NATIVE_RTCAUDIENCE_LATENCY_LEVEL_TYPE2ClientRoleOptions(level) {
    switch (level) {
      case NATIVE_RTC.AUDIENCE_LATENCY_LEVEL_TYPE.AUDIENCE_LATENCY_LEVEL_LOW_LATENCY:
        return { level: AudienceLatencyLevelType.AUDIENCE_LEVEL_LOW_LATENCY };
      case NATIVE_RTC.AUDIENCE_LATENCY_LEVEL_TYPE.AUDIENCE_LATENCY_LEVEL_ULTRA_LOW_LATENCY:
        return {
          level: AudienceLatencyLevelType.AUDIENCE_LEVEL_ULTRA_LOW_LATENCY
        };
    }
  }
  static NATIVE_RTCVideoEncoderConfiguration2VideoEncoderConfiguration(conf) {
    let ret = {
      width: conf.dimensions.width,
      height: conf.dimensions.height,
      frameRate: {
        ideal: conf.frameRate,
        min: conf.frameRate
      },
      bitrateMax: conf.bitrate,
      bitrateMin: conf.minBitrate
    };
    return ret;
  }
  static NATIVE_RTCVideoFormat2VideoEncoderConfiguration(videoFormat) {
    let ret = {
      width: videoFormat.width,
      height: videoFormat.height,
      frameRate: videoFormat.fps
    };
    return ret;
  }
  static NATIVE_RTCScreenCaptureParameters2VideoEncoderConfiguration(conf) {
    let ret = {
      width: conf.dimensions.width,
      height: conf.dimensions.height,
      frameRate: conf.frameRate,
      bitrateMax: conf.bitrate
    };
    return ret;
  }
  static NATIVE_RTCSimulcastStreamConfig2LowStreamParameter(config) {
    let ret = {
      width: config.dimensions.width,
      height: config.dimensions.height,
      framerate: {
        ideal: config.framerate
      },
      bitrate: config.framerate
    };
    return ret;
  }
  static NATIVE_RTCCONNECTION_STATE_TYPE2ConnectionState(state) {
    switch (state) {
      case NATIVE_RTC.CONNECTION_STATE_TYPE.CONNECTION_STATE_DISCONNECTED:
        return "DISCONNECTED";
      case NATIVE_RTC.CONNECTION_STATE_TYPE.CONNECTION_STATE_CONNECTING:
        return "CONNECTING";
      case NATIVE_RTC.CONNECTION_STATE_TYPE.CONNECTION_STATE_CONNECTED:
        return "CONNECTED";
      case NATIVE_RTC.CONNECTION_STATE_TYPE.CONNECTION_STATE_RECONNECTING:
        return "RECONNECTING";
      case NATIVE_RTC.CONNECTION_STATE_TYPE.CONNECTION_STATE_FAILED:
        return "DISCONNECTED";
    }
  }
  static NATIVE_RTCENCRYPTION_MODE2EncryptionMode(mode) {
    switch (mode) {
      case NATIVE_RTC.ENCRYPTION_MODE.AES_128_XTS:
        return "aes-128-xts";
      case NATIVE_RTC.ENCRYPTION_MODE.AES_128_ECB:
        return "aes-128-ecb";
      case NATIVE_RTC.ENCRYPTION_MODE.AES_256_XTS:
        return "aes-256-xts";
      case NATIVE_RTC.ENCRYPTION_MODE.SM4_128_ECB:
        return "sm4-128-ecb";
      case NATIVE_RTC.ENCRYPTION_MODE.AES_128_GCM:
        return "aes-128-gcm";
      case NATIVE_RTC.ENCRYPTION_MODE.AES_256_GCM:
        return "aes-256-gcm";
      case NATIVE_RTC.ENCRYPTION_MODE.AES_128_GCM2:
        return "aes-128-gcm2";
      case NATIVE_RTC.ENCRYPTION_MODE.AES_256_GCM2:
        return "aes-256-gcm2";
    }
  }
  static NATIVE_RTCInjectStreamConfig2InjectStreamConfig(config) {
    let ret = {
      audioBitrate: config.audioBitrate,
      audioChannels: config.audioChannels,
      audioSampleRate: config.audioSampleRate,
      height: config.width,
      width: config.height,
      videoBitrate: config.videoBitrate,
      videoFramerate: config.videoFramerate,
      videoGop: config.videoGop
    };
    return ret;
  }
  static NATIVE_RTCChannelMediaRelayConfiguration2IChannelMediaRelayConfiguration(config) {
    let ret = AgoraRTC2.createChannelMediaRelayConfiguration();
    for (let i = 0; i < config.srcInfo.length; i++) {
      ret.addDestChannelInfo(
        _AgoraTranslate.NATIVE_RTCChannelMediaInfo2ChannelMediaRelayInfo(
          config.srcInfo[i]
        )
      );
    }
    for (let i = 0; i < config.destInfos.length; i++) {
      ret.addDestChannelInfo(
        _AgoraTranslate.NATIVE_RTCChannelMediaInfo2ChannelMediaRelayInfo(
          config.destInfos[i]
        )
      );
    }
    return ret;
  }
  static NATIVE_RTCChannelMediaInfo2ChannelMediaRelayInfo(info) {
    let ret = {
      channelName: info.channelName,
      token: info.token,
      uid: info.uid
    };
    return ret;
  }
  static NATIVE_RTCContentInspectConfig2InspectConfiguration(config) {
    let ret = {
      interval: 1,
      extraInfo: config.extraInfo,
      inspectType: []
    };
    if (config.modules.length > 0) {
      let module = config.modules[0];
      ret.interval = module.interval;
      switch (module.type) {
        case NATIVE_RTC.CONTENT_INSPECT_TYPE.CONTENT_INSPECT_INVALID:
          break;
        case NATIVE_RTC.CONTENT_INSPECT_TYPE.CONTENT_INSPECT_MODERATION:
          ret.inspectType.push("moderation");
          break;
        case NATIVE_RTC.CONTENT_INSPECT_TYPE.CONTENT_INSPECT_SUPERVISION:
          ret.inspectType.push("supervise");
          break;
      }
      ret.interval = module.interval * 1e3;
    }
    return ret;
  }
  static NATIVE_RTCVIDEO_CONTENT_HINT2string(hint) {
    switch (hint) {
      case NATIVE_RTC.VIDEO_CONTENT_HINT.CONTENT_HINT_MOTION:
        return "motion";
      case NATIVE_RTC.VIDEO_CONTENT_HINT.CONTENT_HINT_DETAILS:
        return "detail";
      default:
        return "detail";
    }
  }
  static NATIVE_RTCCAMERA_DIRECTION2string(direction) {
    switch (direction) {
      case NATIVE_RTC.CAMERA_DIRECTION.CAMERA_FRONT:
        return "user";
      case NATIVE_RTC.CAMERA_DIRECTION.CAMERA_REAR:
        return "environment";
    }
  }
  static NATIVE_RTCVIDEO_MIRROR_MODE_TYPE2boolean(mode) {
    switch (mode) {
      case NATIVE_RTC.VIDEO_MIRROR_MODE_TYPE.VIDEO_MIRROR_MODE_AUTO:
        return true;
      case NATIVE_RTC.VIDEO_MIRROR_MODE_TYPE.VIDEO_MIRROR_MODE_DISABLED:
        return false;
      case NATIVE_RTC.VIDEO_MIRROR_MODE_TYPE.VIDEO_MIRROR_MODE_ENABLED:
        return true;
    }
  }
  static NATIVE_RTCVIDEO_CODEC_TYPE2SDK_CODEC(code) {
    switch (code) {
      case NATIVE_RTC.VIDEO_CODEC_TYPE.VIDEO_CODEC_H264:
        return "h264";
      case NATIVE_RTC.VIDEO_CODEC_TYPE.VIDEO_CODEC_AV1:
        return "av1";
      case NATIVE_RTC.VIDEO_CODEC_TYPE.VIDEO_CODEC_VP8:
        return "vp8";
      case NATIVE_RTC.VIDEO_CODEC_TYPE.VIDEO_CODEC_VP9:
        return "vp9";
      default:
        return "vp8";
    }
  }
  static NATIVE_RTCVIDEO_STREAM_TYPE2RemoteStreamType(type) {
    switch (type) {
      case NATIVE_RTC.VIDEO_STREAM_TYPE.VIDEO_STREAM_HIGH:
        return RemoteStreamType.HIGH_STREAM;
      case NATIVE_RTC.VIDEO_STREAM_TYPE.VIDEO_STREAM_LOW:
        return RemoteStreamType.LOW_STREAM;
    }
  }
  static NATIVE_RTCSTREAM_FALLBACK_OPTIONS2RemoteStreamFallbackType(fallback) {
    switch (fallback) {
      case NATIVE_RTC.STREAM_FALLBACK_OPTIONS.STREAM_FALLBACK_OPTION_DISABLED:
        return RemoteStreamFallbackType.DISABLE;
      case NATIVE_RTC.STREAM_FALLBACK_OPTIONS.STREAM_FALLBACK_OPTION_VIDEO_STREAM_LOW:
        return RemoteStreamFallbackType.LOW_STREAM;
      case NATIVE_RTC.STREAM_FALLBACK_OPTIONS.STREAM_FALLBACK_OPTION_AUDIO_ONLY:
        return RemoteStreamFallbackType.AUDIO_ONLY;
    }
  }
  static NATIVE_RTCRtcImage2LiveStreamingTranscodingImage(image) {
    let ret = {
      url: image.url,
      x: image.x,
      y: image.y,
      width: image.width,
      height: image.height,
      alpha: image.alpha
    };
    return ret;
  }
  static NATIVE_RTCTranscodingUser2LiveStreamingTranscodingUser(user) {
    let ret = {
      alpha: user.alpha,
      height: user.height,
      uid: user.uid,
      width: user.width,
      x: user.x,
      y: user.y,
      zOrder: user.zOrder,
      audioChannel: user.audioChannel
    };
    return ret;
  }
  static NATIVE_RTCLiveTranscoding2LiveStreamingTranscodingConfig(config) {
    let ret = {
      audioBitrate: config.audioBitrate,
      audioChannels: config.audioChannels,
      audioSampleRate: config.audioSampleRate,
      backgroundColor: config.backgroundColor,
      height: config.height,
      width: config.width,
      lowLatency: config.lowLatency,
      videoBitrate: config.videoBitrate,
      videoCodecProfile: config.videoCodecProfile,
      videoFrameRate: config.videoFramerate,
      videoGop: config.videoGop,
      userConfigExtraInfo: config.transcodingExtraInfo
    };
    if (config.watermarkCount >= 1) {
      ret.watermark = _AgoraTranslate.NATIVE_RTCRtcImage2LiveStreamingTranscodingImage(
        config.watermark[0]
      );
    }
    if (config.backgroundImageCount >= 1) {
      ret.backgroundImage = _AgoraTranslate.NATIVE_RTCRtcImage2LiveStreamingTranscodingImage(
        config.backgroundImage[0]
      );
    }
    ret.transcodingUsers = [];
    if (config.userCount > 0) {
      for (let i = 0; i < config.userCount; i++) {
        ret.transcodingUsers.push(
          _AgoraTranslate.NATIVE_RTCTranscodingUser2LiveStreamingTranscodingUser(
            config.transcodingUsers[i]
          )
        );
      }
    }
    return ret;
  }
  /*************************/
  static DeviceState2NATIVE_RTCMEDIA_DEVICE_STATE_TYPE(state) {
    switch (state) {
      case "ACTIVE":
        return NATIVE_RTC.MEDIA_DEVICE_STATE_TYPE.MEDIA_DEVICE_STATE_ACTIVE;
      case "INACTIVE":
        return NATIVE_RTC.MEDIA_DEVICE_STATE_TYPE.MEDIA_DEVICE_STATE_DISABLED;
    }
  }
  static ConnectionState2NATIVE_RTCCONNECTION_STATE_TYPE(state) {
    switch (state) {
      case "DISCONNECTED":
        return NATIVE_RTC.CONNECTION_STATE_TYPE.CONNECTION_STATE_DISCONNECTED;
      case "CONNECTING":
        return NATIVE_RTC.CONNECTION_STATE_TYPE.CONNECTION_STATE_CONNECTING;
      case "CONNECTED":
        return NATIVE_RTC.CONNECTION_STATE_TYPE.CONNECTION_STATE_CONNECTED;
      case "RECONNECTING":
        return NATIVE_RTC.CONNECTION_STATE_TYPE.CONNECTION_STATE_RECONNECTING;
      case "DISCONNECTING":
        return NATIVE_RTC.CONNECTION_STATE_TYPE.CONNECTION_STATE_DISCONNECTED;
    }
  }
  static string2NATIVE_RTCENCRYPTION_MODE(mode) {
    switch (mode) {
      case "aes-128-xts":
        return NATIVE_RTC.ENCRYPTION_MODE.AES_128_XTS;
      case "aes-128-ecb":
        return NATIVE_RTC.ENCRYPTION_MODE.AES_128_ECB;
      case "aes-256-xts":
        return NATIVE_RTC.ENCRYPTION_MODE.AES_256_XTS;
      case "sm4-128-ecb":
        return NATIVE_RTC.ENCRYPTION_MODE.SM4_128_ECB;
      case "aes-128-gcm":
        return NATIVE_RTC.ENCRYPTION_MODE.AES_128_GCM;
      case "aes-256-gcm":
        return NATIVE_RTC.ENCRYPTION_MODE.AES_256_GCM;
      case "aes-128-gcm2":
        return NATIVE_RTC.ENCRYPTION_MODE.AES_128_GCM2;
      case "aes-256-gcm2":
        return NATIVE_RTC.ENCRYPTION_MODE.AES_256_GCM2;
      default:
        AgoraConsole.warn("invalid mode: " + mode);
        return NATIVE_RTC.ENCRYPTION_MODE.AES_128_GCM;
    }
  }
  static ConnectionDisconnectedReason2NATIVE_RTCCONNECTION_CHANGED_REASON_TYPE(reason) {
    switch (reason) {
      case ConnectionDisconnectedReason.LEAVE:
        return NATIVE_RTC.CONNECTION_CHANGED_REASON_TYPE.CONNECTION_CHANGED_LEAVE_CHANNEL;
      case ConnectionDisconnectedReason.NETWORK_ERROR:
        return NATIVE_RTC.CONNECTION_CHANGED_REASON_TYPE.CONNECTION_CHANGED_INTERRUPTED;
      case ConnectionDisconnectedReason.SERVER_ERROR:
        return NATIVE_RTC.CONNECTION_CHANGED_REASON_TYPE.CONNECTION_CHANGED_INTERRUPTED;
      case ConnectionDisconnectedReason.UID_BANNED:
        return NATIVE_RTC.CONNECTION_CHANGED_REASON_TYPE.CONNECTION_CHANGED_BANNED_BY_SERVER;
      case ConnectionDisconnectedReason.IP_BANNED:
        return NATIVE_RTC.CONNECTION_CHANGED_REASON_TYPE.CONNECTION_CHANGED_BANNED_BY_SERVER;
      case ConnectionDisconnectedReason.CHANNEL_BANNED:
        return NATIVE_RTC.CONNECTION_CHANGED_REASON_TYPE.CONNECTION_CHANGED_INVALID_CHANNEL_NAME;
      case ConnectionDisconnectedReason.FALLBACK:
        return NATIVE_RTC.CONNECTION_CHANGED_REASON_TYPE.CONNECTION_CHANGED_INTERRUPTED;
    }
  }
  static string2NATIVE_RTCUSER_OFFLINE_REASON_TYPE(reason) {
    switch (reason) {
      case "Quit":
        return NATIVE_RTC.USER_OFFLINE_REASON_TYPE.USER_OFFLINE_QUIT;
      case "ServerTimeOut":
        return NATIVE_RTC.USER_OFFLINE_REASON_TYPE.USER_OFFLINE_DROPPED;
      case "BecomeAudience":
        return NATIVE_RTC.USER_OFFLINE_REASON_TYPE.USER_OFFLINE_BECOME_AUDIENCE;
      default:
        return NATIVE_RTC.USER_OFFLINE_REASON_TYPE.USER_OFFLINE_QUIT;
    }
  }
  static ChannelMediaRelayState2NATIVE_RTCCHANNEL_MEDIA_RELAY_STATE(state) {
    switch (state) {
      case ChannelMediaRelayState.RELAY_STATE_IDLE:
        return NATIVE_RTC.CHANNEL_MEDIA_RELAY_STATE.RELAY_STATE_IDLE;
      case ChannelMediaRelayState.RELAY_STATE_CONNECTING:
        return NATIVE_RTC.CHANNEL_MEDIA_RELAY_STATE.RELAY_STATE_CONNECTING;
      case ChannelMediaRelayState.RELAY_STATE_RUNNING:
        return NATIVE_RTC.CHANNEL_MEDIA_RELAY_STATE.RELAY_STATE_RUNNING;
      case ChannelMediaRelayState.RELAY_STATE_FAILURE:
        return NATIVE_RTC.CHANNEL_MEDIA_RELAY_STATE.RELAY_STATE_FAILURE;
    }
  }
  static ChannelMediaRelayError2NATIVE_RTCCHANNEL_MEDIA_RELAY_ERROR(err) {
    switch (err) {
      case ChannelMediaRelayError.RELAY_OK:
        return NATIVE_RTC.CHANNEL_MEDIA_RELAY_ERROR.RELAY_OK;
      case ChannelMediaRelayError.SERVER_CONNECTION_LOST:
        return NATIVE_RTC.CHANNEL_MEDIA_RELAY_ERROR.RELAY_ERROR_SERVER_CONNECTION_LOST;
      case ChannelMediaRelayError.SRC_TOKEN_EXPIRED:
        return NATIVE_RTC.CHANNEL_MEDIA_RELAY_ERROR.RELAY_ERROR_SRC_TOKEN_EXPIRED;
      case ChannelMediaRelayError.DEST_TOKEN_EXPIRED:
        return NATIVE_RTC.CHANNEL_MEDIA_RELAY_ERROR.RELAY_ERROR_DEST_TOKEN_EXPIRED;
    }
  }
  static ChannelMediaRelayEvent2NATIVE_RTCCHANNEL_MEDIA_RELAY_EVENT(event) {
    switch (event) {
      case ChannelMediaRelayEvent.NETWORK_DISCONNECTED:
        return NATIVE_RTC.CHANNEL_MEDIA_RELAY_EVENT.RELAY_EVENT_NETWORK_DISCONNECTED;
      case ChannelMediaRelayEvent.NETWORK_CONNECTED:
        return NATIVE_RTC.CHANNEL_MEDIA_RELAY_EVENT.RELAY_EVENT_NETWORK_CONNECTED;
      case ChannelMediaRelayEvent.PACKET_JOINED_SRC_CHANNEL:
        return NATIVE_RTC.CHANNEL_MEDIA_RELAY_EVENT.RELAY_EVENT_PACKET_JOINED_SRC_CHANNEL;
      case ChannelMediaRelayEvent.PACKET_JOINED_DEST_CHANNEL:
        return NATIVE_RTC.CHANNEL_MEDIA_RELAY_EVENT.RELAY_EVENT_PACKET_JOINED_DEST_CHANNEL;
      case ChannelMediaRelayEvent.PACKET_SENT_TO_DEST_CHANNEL:
        return NATIVE_RTC.CHANNEL_MEDIA_RELAY_EVENT.RELAY_EVENT_PACKET_SENT_TO_DEST_CHANNEL;
      case ChannelMediaRelayEvent.PACKET_RECEIVED_VIDEO_FROM_SRC:
        return NATIVE_RTC.CHANNEL_MEDIA_RELAY_EVENT.RELAY_EVENT_PACKET_RECEIVED_VIDEO_FROM_SRC;
      case ChannelMediaRelayEvent.PACKET_RECEIVED_AUDIO_FROM_SRC:
        return NATIVE_RTC.CHANNEL_MEDIA_RELAY_EVENT.RELAY_EVENT_PACKET_RECEIVED_AUDIO_FROM_SRC;
      case ChannelMediaRelayEvent.PACKET_UPDATE_DEST_CHANNEL:
        return NATIVE_RTC.CHANNEL_MEDIA_RELAY_EVENT.RELAY_EVENT_PACKET_UPDATE_DEST_CHANNEL;
      case ChannelMediaRelayEvent.PACKET_UPDATE_DEST_CHANNEL_REFUSED:
        return NATIVE_RTC.CHANNEL_MEDIA_RELAY_EVENT.RELAY_EVENT_PACKET_UPDATE_DEST_CHANNEL_REFUSED;
      case ChannelMediaRelayEvent.PACKET_UPDATE_DEST_CHANNEL_NOT_CHANGE:
        return NATIVE_RTC.CHANNEL_MEDIA_RELAY_EVENT.RELAY_EVENT_PACKET_UPDATE_DEST_CHANNEL_NOT_CHANGE;
    }
  }
  static volumeIndicatorResult2NATIVE_RTCAudioVolumeInfo(result) {
    let audioVolumInfo = {
      uid: result.uid,
      volume: Math.floor(result.level * 2.55),
      vad: 0,
      voicePitch: 0
    };
    return audioVolumInfo;
  }
  //webQuality
  //webQuality:    6,5,4,3,2,1   poor=>better
  //agortcQuality: 0,1,2,3,4,5,  poor=>better
  static webQuality2NATIVE_RTCQuality(webQuality) {
    return 6 - webQuality;
  }
  static data2NATIVE_RTCCONTENT_INSPECT_RESULT(data) {
    switch (data) {
      case "porn":
        return NATIVE_RTC.CONTENT_INSPECT_RESULT.CONTENT_INSPECT_PORN;
      case "sexy":
        return NATIVE_RTC.CONTENT_INSPECT_RESULT.CONTENT_INSPECT_SEXY;
      case "neutral":
        return NATIVE_RTC.CONTENT_INSPECT_RESULT.CONTENT_INSPECT_NEUTRAL;
    }
  }
};

// src/util/Container.ts
var Container = class {
  constructor() {
    this._container = /* @__PURE__ */ new Map();
  }
  addT(channelId, uid, t) {
    if (!this._container.has(channelId)) {
      this._container.set(channelId, /* @__PURE__ */ new Map());
    }
    if (this._container.get(channelId).has(uid)) {
      console.debug("t already added!");
      console.debug("channelId: " + channelId + " uid: " + uid);
    } else {
      this._container.get(channelId).set(uid, t);
    }
  }
  removeT(channelId, uid) {
    if (this._container.has(channelId)) {
      if (this._container.get(channelId).has(uid)) {
        this._container.get(channelId).delete(uid);
      }
    }
  }
  removeTs(channelId) {
    if (this._container.has(channelId)) {
      this._container.delete(channelId);
    }
  }
  getT(channelId, uid) {
    var _a;
    return (_a = this._container.get(channelId)) == null ? void 0 : _a.get(uid);
  }
  getTs(channelId) {
    return this._container.get(channelId);
  }
  walkT(cb) {
    for (let c of this._container) {
      let channelId = c[0];
      let map = c[1];
      for (let m of map) {
        let uid = m[0];
        let t = m[1];
        cb(channelId, uid, t);
      }
    }
  }
  walkTAsync(cb) {
    return __async(this, null, function* () {
      for (let c of this._container) {
        let channelId = c[0];
        let map = c[1];
        for (let m of map) {
          let uid = m[0];
          let t = m[1];
          yield cb(channelId, uid, t);
        }
      }
    });
  }
  getContainer() {
    return this._container;
  }
};
var IMediaEngineImpl = class {
  constructor(engine) {
    this._engine = engine;
  }
  putAction(action) {
    this._engine.actionQueue.putAction(action);
  }
  registerVideoEncodedFrameObserver(observer) {
    AgoraConsole.warn(
      "registerVideoEncodedFrameObserver not supported in this platform!"
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  pushAudioFrame(frame, trackId) {
    AgoraConsole.warn("pushAudioFrame not supported in this platform!");
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setExternalAudioSource(enabled, sampleRate, channels, localPlayback, publish) {
    AgoraConsole.warn("setExternalAudioSource not supported in this platform!");
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  createCustomAudioTrack(trackType, config) {
    AgoraConsole.warn("createCustomAudioTrack not supported in this platform!");
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  destroyCustomAudioTrack(trackId) {
    AgoraConsole.warn(
      "destroyCustomAudioTrack not supported in this platform!"
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setExternalAudioSink(enabled, sampleRate, channels) {
    AgoraConsole.warn("setExternalAudioSink not supported in this platform!");
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  enableCustomAudioLocalPlayback(trackId, enabled) {
    AgoraConsole.warn(
      "enableCustomAudioLocalPlayback not supported in this platform!"
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  pushEncodedVideoImage(imageBuffer, length, videoEncodedFrameInfo, videoTrackId) {
    AgoraConsole.warn("pushEncodedVideoImage not supported in this platform!");
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  release() {
    AgoraConsole.warn("release not supported in this platform!");
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  registerAudioFrameObserver(observer) {
    AgoraConsole.warn(
      "registerAudioFrameObserver not supported in this platform!"
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  registerVideoFrameObserver(observer) {
    AgoraConsole.warn(
      "registerVideoFrameObserver not supported in this platform!"
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  pushCaptureAudioFrame(frame) {
    AgoraConsole.warn("pushCaptureAudioFrame not supported in this platform!");
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  pushReverseAudioFrame(frame) {
    AgoraConsole.warn("pushReverseAudioFrame not supported in this platform!");
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  pushDirectAudioFrame(frame) {
    AgoraConsole.warn("pushDirectAudioFrame not supported in this platform!");
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  pullAudioFrame(frame) {
    AgoraConsole.warn("pullAudioFrame not supported in this platform!");
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setExternalVideoSource(enabled, useTexture, sourceType) {
    AgoraConsole.warn("setExternalVideoSource not supported in this platform!");
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setDirectExternalAudioSource(enable, localPlayback) {
    AgoraConsole.warn(
      "setDirectExternalAudioSource not supported in this platform!"
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  pushVideoFrame(frame) {
    AgoraConsole.warn("pushVideoFrame not supported in this platform!");
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
};

// src/binding/IAgoraMediaEngineDispatch.ts
var IMediaEngineDispatch = class {
  constructor(engine) {
    this._impl = new IMediaEngineImpl(engine);
  }
  registerAudioFrameObserver(apiParam) {
    let obj = JSON.parse(apiParam.data);
    let observer = obj.observer;
    if (observer === void 0)
      throw "observer is undefined";
    return this._impl.registerAudioFrameObserver(observer);
  }
  registerVideoFrameObserver(apiParam) {
    let obj = JSON.parse(apiParam.data);
    let observer = obj.observer;
    if (observer === void 0)
      throw "observer is undefined";
    return this._impl.registerVideoFrameObserver(observer);
  }
  registerVideoEncodedFrameObserver(apiParam) {
    let obj = JSON.parse(apiParam.data);
    let observer = obj.observer;
    if (observer === void 0)
      throw "observer is undefined";
    return this._impl.registerVideoEncodedFrameObserver(observer);
  }
  pushAudioFrame(apiParam) {
    let obj = JSON.parse(apiParam.data);
    let frame = obj.frame;
    if (frame === void 0)
      throw "frame is undefined";
    let trackId = obj.trackId;
    if (trackId === void 0)
      throw "trackId is undefined";
    return this._impl.pushAudioFrame(frame, trackId);
  }
  pullAudioFrame(apiParam) {
    let obj = JSON.parse(apiParam.data);
    let frame = obj.frame;
    if (frame === void 0)
      throw "frame is undefined";
    return this._impl.pullAudioFrame(frame);
  }
  setExternalVideoSource(apiParam) {
    let obj = JSON.parse(apiParam.data);
    let enabled = obj.enabled;
    if (enabled === void 0)
      throw "enabled is undefined";
    let useTexture = obj.useTexture;
    if (useTexture === void 0)
      throw "useTexture is undefined";
    let sourceType = obj.sourceType;
    if (sourceType === void 0)
      throw "sourceType is undefined";
    let encodedVideoOption = obj.encodedVideoOption;
    if (encodedVideoOption === void 0)
      throw "encodedVideoOption is undefined";
    return this._impl.setExternalVideoSource(
      enabled,
      useTexture,
      sourceType,
      encodedVideoOption
    );
  }
  setExternalAudioSource(apiParam) {
    let obj = JSON.parse(apiParam.data);
    let enabled = obj.enabled;
    if (enabled === void 0)
      throw "enabled is undefined";
    let sampleRate = obj.sampleRate;
    if (sampleRate === void 0)
      throw "sampleRate is undefined";
    let channels = obj.channels;
    if (channels === void 0)
      throw "channels is undefined";
    let localPlayback = obj.localPlayback;
    if (localPlayback === void 0)
      throw "localPlayback is undefined";
    let publish = obj.publish;
    if (publish === void 0)
      throw "publish is undefined";
    return this._impl.setExternalAudioSource(
      enabled,
      sampleRate,
      channels,
      localPlayback,
      publish
    );
  }
  createCustomAudioTrack(apiParam) {
    let obj = JSON.parse(apiParam.data);
    let trackType = obj.trackType;
    if (trackType === void 0)
      throw "trackType is undefined";
    let config = obj.config;
    if (config === void 0)
      throw "config is undefined";
    return this._impl.createCustomAudioTrack(trackType, config);
  }
  destroyCustomAudioTrack(apiParam) {
    let obj = JSON.parse(apiParam.data);
    let trackId = obj.trackId;
    if (trackId === void 0)
      throw "trackId is undefined";
    return this._impl.destroyCustomAudioTrack(trackId);
  }
  setExternalAudioSink(apiParam) {
    let obj = JSON.parse(apiParam.data);
    let enabled = obj.enabled;
    if (enabled === void 0)
      throw "enabled is undefined";
    let sampleRate = obj.sampleRate;
    if (sampleRate === void 0)
      throw "sampleRate is undefined";
    let channels = obj.channels;
    if (channels === void 0)
      throw "channels is undefined";
    return this._impl.setExternalAudioSink(enabled, sampleRate, channels);
  }
  enableCustomAudioLocalPlayback(apiParam) {
    let obj = JSON.parse(apiParam.data);
    let trackId = obj.trackId;
    if (trackId === void 0)
      throw "trackId is undefined";
    let enabled = obj.enabled;
    if (enabled === void 0)
      throw "enabled is undefined";
    return this._impl.enableCustomAudioLocalPlayback(trackId, enabled);
  }
  pushVideoFrame(apiParam) {
    let obj = JSON.parse(apiParam.data);
    let frame = obj.frame;
    if (frame === void 0)
      throw "frame is undefined";
    let videoTrackId = obj.videoTrackId;
    if (videoTrackId === void 0)
      throw "videoTrackId is undefined";
    return this._impl.pushVideoFrame(frame, videoTrackId);
  }
  pushEncodedVideoImage(apiParam) {
    let obj = JSON.parse(apiParam.data);
    let imageBuffer = obj.imageBuffer;
    if (imageBuffer === void 0)
      throw "imageBuffer is undefined";
    let length = obj.length;
    if (length === void 0)
      throw "length is undefined";
    let videoEncodedFrameInfo = obj.videoEncodedFrameInfo;
    if (videoEncodedFrameInfo === void 0)
      throw "videoEncodedFrameInfo is undefined";
    let videoTrackId = obj.videoTrackId;
    if (videoTrackId === void 0)
      throw "videoTrackId is undefined";
    return this._impl.pushEncodedVideoImage(
      imageBuffer,
      length,
      videoEncodedFrameInfo,
      videoTrackId
    );
  }
  release() {
    return this._impl.release();
  }
};
var IMediaPlayerImpl = class {
  constructor(engine) {
    this._engine = engine;
  }
  putAction(action) {
    this._engine.actionQueue.putAction(action);
  }
  setPlayerOption2(key, value) {
    AgoraConsole.warn("setPlayerOption2 not supported in this platform!");
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  registerAudioFrameObserver2(observer, mode) {
    AgoraConsole.warn(
      "registerAudioFrameObserver2 not supported in this platform!"
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  unregisterMediaPlayerAudioSpectrumObserver(observer) {
    AgoraConsole.warn(
      "unregisterMediaPlayerAudioSpectrumObserver not supported in this platform!"
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getMediaPlayerId() {
    AgoraConsole.warn("getMediaPlayerId not supported in this platform!");
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  open(url, startPos) {
    AgoraConsole.warn("open not supported in this platform!");
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  openWithMediaSource(source) {
    AgoraConsole.warn("openWithMediaSource not supported in this platform!");
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  play() {
    AgoraConsole.warn("play not supported in this platform!");
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  pause() {
    AgoraConsole.warn("pause not supported in this platform!");
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  stop() {
    AgoraConsole.warn("stop not supported in this platform!");
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  resume() {
    AgoraConsole.warn("resume not supported in this platform!");
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  seek(newPos) {
    AgoraConsole.warn("seek not supported in this platform!");
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setAudioPitch(pitch) {
    AgoraConsole.warn("setAudioPitch not supported in this platform!");
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getDuration(duration) {
    AgoraConsole.warn("getDuration not supported in this platform!");
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getPlayPosition(pos) {
    AgoraConsole.warn("getPlayPosition not supported in this platform!");
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getStreamCount(count) {
    AgoraConsole.warn("getStreamCount not supported in this platform!");
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getStreamInfo(index, info) {
    AgoraConsole.warn("getStreamInfo not supported in this platform!");
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setLoopCount(loopCount) {
    AgoraConsole.warn("setLoopCount not supported in this platform!");
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setPlaybackSpeed(speed) {
    AgoraConsole.warn("setPlaybackSpeed not supported in this platform!");
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  selectAudioTrack(index) {
    AgoraConsole.warn("selectAudioTrack not supported in this platform!");
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setPlayerOption(key, value) {
    AgoraConsole.warn("setPlayerOption not supported in this platform!");
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  takeScreenshot(filename) {
    AgoraConsole.warn("takeScreenshot not supported in this platform!");
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  selectInternalSubtitle(index) {
    AgoraConsole.warn("selectInternalSubtitle not supported in this platform!");
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setExternalSubtitle(url) {
    AgoraConsole.warn("setExternalSubtitle not supported in this platform!");
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getState() {
    AgoraConsole.warn("getState not supported in this platform!");
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  mute(muted) {
    AgoraConsole.warn("mute not supported in this platform!");
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getMute(muted) {
    AgoraConsole.warn("getMute not supported in this platform!");
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  adjustPlayoutVolume(volume) {
    AgoraConsole.warn("adjustPlayoutVolume not supported in this platform!");
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getPlayoutVolume(volume) {
    AgoraConsole.warn("getPlayoutVolume not supported in this platform!");
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  adjustPublishSignalVolume(volume) {
    AgoraConsole.warn(
      "adjustPublishSignalVolume not supported in this platform!"
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getPublishSignalVolume(volume) {
    AgoraConsole.warn("getPublishSignalVolume not supported in this platform!");
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setView(view) {
    AgoraConsole.warn("setView not supported in this platform!");
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setRenderMode(renderMode) {
    AgoraConsole.warn("setRenderMode not supported in this platform!");
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  registerPlayerSourceObserver(observer) {
    AgoraConsole.warn(
      "registerPlayerSourceObserver not supported in this platform!"
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  unregisterPlayerSourceObserver(observer) {
    AgoraConsole.warn(
      "unregisterPlayerSourceObserver not supported in this platform!"
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  registerAudioFrameObserver(observer) {
    AgoraConsole.warn(
      "registerAudioFrameObserver not supported in this platform!"
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  unregisterAudioFrameObserver(observer) {
    AgoraConsole.warn(
      "unregisterAudioFrameObserver not supported in this platform!"
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  registerVideoFrameObserver(observer) {
    AgoraConsole.warn(
      "registerVideoFrameObserver not supported in this platform!"
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  unregisterVideoFrameObserver(observer) {
    AgoraConsole.warn(
      "unregisterVideoFrameObserver not supported in this platform!"
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  registerMediaPlayerAudioSpectrumObserver(observer, intervalInMS) {
    AgoraConsole.warn(
      "registerMediaPlayerAudioSpectrumObserver not supported in this platform!"
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setAudioDualMonoMode(mode) {
    AgoraConsole.warn("setAudioDualMonoMode not supported in this platform!");
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getPlayerSdkVersion() {
    AgoraConsole.warn("getPlayerSdkVersion not supported in this platform!");
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getPlaySrc() {
    AgoraConsole.warn("getPlaySrc not supported in this platform!");
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  openWithAgoraCDNSrc(src, startPos) {
    AgoraConsole.warn("openWithAgoraCDNSrc not supported in this platform!");
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getAgoraCDNLineCount() {
    AgoraConsole.warn("getAgoraCDNLineCount not supported in this platform!");
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  switchAgoraCDNLineByIndex(index) {
    AgoraConsole.warn(
      "switchAgoraCDNLineByIndex not supported in this platform!"
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getCurrentAgoraCDNIndex() {
    AgoraConsole.warn(
      "getCurrentAgoraCDNIndex not supported in this platform!"
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  enableAutoSwitchAgoraCDN(enable) {
    AgoraConsole.warn(
      "enableAutoSwitchAgoraCDN not supported in this platform!"
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  renewAgoraCDNSrcToken(token, ts) {
    AgoraConsole.warn("renewAgoraCDNSrcToken not supported in this platform!");
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  switchAgoraCDNSrc(src, syncPts) {
    AgoraConsole.warn("switchAgoraCDNSrc not supported in this platform!");
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  switchSrc(src, syncPts) {
    AgoraConsole.warn("switchSrc not supported in this platform!");
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  preloadSrc(src, startPos) {
    AgoraConsole.warn("preloadSrc not supported in this platform!");
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  playPreloadedSrc(src) {
    AgoraConsole.warn("playPreloadedSrc not supported in this platform!");
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  unloadSrc(src) {
    AgoraConsole.warn("unloadSrc not supported in this platform!");
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setSpatialAudioParams(params) {
    AgoraConsole.warn("setSpatialAudioParams not supported in this platform!");
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setSoundPositionParams(pan, gain) {
    AgoraConsole.warn("setSoundPositionParams not supported in this platform!");
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
};
var IMediaPlayerCacheManagerImpl = class {
  constructor(engine) {
    this._engine = engine;
  }
  putAction(action) {
    this._engine.actionQueue.putAction(action);
  }
  removeAllCaches() {
    AgoraConsole.warn("removeAllCaches not supported in this platform!");
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  removeOldCache() {
    AgoraConsole.warn("removeOldCache not supported in this platform!");
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  removeCacheByUri(uri) {
    AgoraConsole.warn("removeCacheByUri not supported in this platform!");
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setCacheDir(path) {
    AgoraConsole.warn("setCacheDir not supported in this platform!");
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setMaxCacheFileCount(count) {
    AgoraConsole.warn("setMaxCacheFileCount not supported in this platform!");
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setMaxCacheFileSize(cacheSize) {
    AgoraConsole.warn("setMaxCacheFileSize not supported in this platform!");
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  enableAutoRemoveCache(enable) {
    AgoraConsole.warn("enableAutoRemoveCache not supported in this platform!");
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getCacheDir(path, length) {
    AgoraConsole.warn("getCacheDir not supported in this platform!");
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getMaxCacheFileCount() {
    AgoraConsole.warn("getMaxCacheFileCount not supported in this platform!");
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getMaxCacheFileSize() {
    AgoraConsole.warn("getMaxCacheFileSize not supported in this platform!");
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getCacheFileCount() {
    AgoraConsole.warn("getCacheFileCount not supported in this platform!");
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
};

// src/binding/IAgoraMediaPlayerDispatch.ts
var IMediaPlayerDispatch = class {
  constructor(engine) {
    this._impl = new IMediaPlayerImpl(engine);
  }
  getMediaPlayerId() {
    return this._impl.getMediaPlayerId();
  }
  open(apiParam) {
    let obj = JSON.parse(apiParam.data);
    let url = obj.url;
    if (url === void 0)
      throw "url is undefined";
    let startPos = obj.startPos;
    if (startPos === void 0)
      throw "startPos is undefined";
    return this._impl.open(url, startPos);
  }
  openWithMediaSource(apiParam) {
    let obj = JSON.parse(apiParam.data);
    let source = obj.source;
    if (source === void 0)
      throw "source is undefined";
    return this._impl.openWithMediaSource(source);
  }
  play() {
    return this._impl.play();
  }
  pause() {
    return this._impl.pause();
  }
  stop() {
    return this._impl.stop();
  }
  resume() {
    return this._impl.resume();
  }
  seek(apiParam) {
    let obj = JSON.parse(apiParam.data);
    let newPos = obj.newPos;
    if (newPos === void 0)
      throw "newPos is undefined";
    return this._impl.seek(newPos);
  }
  setAudioPitch(apiParam) {
    let obj = JSON.parse(apiParam.data);
    let pitch = obj.pitch;
    if (pitch === void 0)
      throw "pitch is undefined";
    return this._impl.setAudioPitch(pitch);
  }
  getDuration(apiParam) {
    let obj = JSON.parse(apiParam.data);
    let duration = obj.duration;
    if (duration === void 0)
      throw "duration is undefined";
    return this._impl.getDuration(duration);
  }
  getPlayPosition(apiParam) {
    let obj = JSON.parse(apiParam.data);
    let pos = obj.pos;
    if (pos === void 0)
      throw "pos is undefined";
    return this._impl.getPlayPosition(pos);
  }
  getStreamCount(apiParam) {
    let obj = JSON.parse(apiParam.data);
    let count = obj.count;
    if (count === void 0)
      throw "count is undefined";
    return this._impl.getStreamCount(count);
  }
  getStreamInfo(apiParam) {
    let obj = JSON.parse(apiParam.data);
    let index = obj.index;
    if (index === void 0)
      throw "index is undefined";
    let info = obj.info;
    if (info === void 0)
      throw "info is undefined";
    return this._impl.getStreamInfo(index, info);
  }
  setLoopCount(apiParam) {
    let obj = JSON.parse(apiParam.data);
    let loopCount = obj.loopCount;
    if (loopCount === void 0)
      throw "loopCount is undefined";
    return this._impl.setLoopCount(loopCount);
  }
  setPlaybackSpeed(apiParam) {
    let obj = JSON.parse(apiParam.data);
    let speed = obj.speed;
    if (speed === void 0)
      throw "speed is undefined";
    return this._impl.setPlaybackSpeed(speed);
  }
  selectAudioTrack(apiParam) {
    let obj = JSON.parse(apiParam.data);
    let index = obj.index;
    if (index === void 0)
      throw "index is undefined";
    return this._impl.selectAudioTrack(index);
  }
  setPlayerOption(apiParam) {
    let obj = JSON.parse(apiParam.data);
    let key = obj.key;
    if (key === void 0)
      throw "key is undefined";
    let value = obj.value;
    if (value === void 0)
      throw "value is undefined";
    return this._impl.setPlayerOption(key, value);
  }
  setPlayerOption2(apiParam) {
    let obj = JSON.parse(apiParam.data);
    let key = obj.key;
    if (key === void 0)
      throw "key is undefined";
    let value = obj.value;
    if (value === void 0)
      throw "value is undefined";
    return this._impl.setPlayerOption2(key, value);
  }
  takeScreenshot(apiParam) {
    let obj = JSON.parse(apiParam.data);
    let filename = obj.filename;
    if (filename === void 0)
      throw "filename is undefined";
    return this._impl.takeScreenshot(filename);
  }
  selectInternalSubtitle(apiParam) {
    let obj = JSON.parse(apiParam.data);
    let index = obj.index;
    if (index === void 0)
      throw "index is undefined";
    return this._impl.selectInternalSubtitle(index);
  }
  setExternalSubtitle(apiParam) {
    let obj = JSON.parse(apiParam.data);
    let url = obj.url;
    if (url === void 0)
      throw "url is undefined";
    return this._impl.setExternalSubtitle(url);
  }
  getState() {
    return this._impl.getState();
  }
  mute(apiParam) {
    let obj = JSON.parse(apiParam.data);
    let muted = obj.muted;
    if (muted === void 0)
      throw "muted is undefined";
    return this._impl.mute(muted);
  }
  getMute(apiParam) {
    let obj = JSON.parse(apiParam.data);
    let muted = obj.muted;
    if (muted === void 0)
      throw "muted is undefined";
    return this._impl.getMute(muted);
  }
  adjustPlayoutVolume(apiParam) {
    let obj = JSON.parse(apiParam.data);
    let volume = obj.volume;
    if (volume === void 0)
      throw "volume is undefined";
    return this._impl.adjustPlayoutVolume(volume);
  }
  getPlayoutVolume(apiParam) {
    let obj = JSON.parse(apiParam.data);
    let volume = obj.volume;
    if (volume === void 0)
      throw "volume is undefined";
    return this._impl.getPlayoutVolume(volume);
  }
  adjustPublishSignalVolume(apiParam) {
    let obj = JSON.parse(apiParam.data);
    let volume = obj.volume;
    if (volume === void 0)
      throw "volume is undefined";
    return this._impl.adjustPublishSignalVolume(volume);
  }
  getPublishSignalVolume(apiParam) {
    let obj = JSON.parse(apiParam.data);
    let volume = obj.volume;
    if (volume === void 0)
      throw "volume is undefined";
    return this._impl.getPublishSignalVolume(volume);
  }
  setView(apiParam) {
    let obj = JSON.parse(apiParam.data);
    let view = obj.view;
    if (view === void 0)
      throw "view is undefined";
    return this._impl.setView(view);
  }
  setRenderMode(apiParam) {
    let obj = JSON.parse(apiParam.data);
    let renderMode = obj.renderMode;
    if (renderMode === void 0)
      throw "renderMode is undefined";
    return this._impl.setRenderMode(renderMode);
  }
  registerPlayerSourceObserver(apiParam) {
    let obj = JSON.parse(apiParam.data);
    let observer = obj.observer;
    if (observer === void 0)
      throw "observer is undefined";
    return this._impl.registerPlayerSourceObserver(observer);
  }
  unregisterPlayerSourceObserver(apiParam) {
    let obj = JSON.parse(apiParam.data);
    let observer = obj.observer;
    if (observer === void 0)
      throw "observer is undefined";
    return this._impl.unregisterPlayerSourceObserver(observer);
  }
  registerAudioFrameObserver(apiParam) {
    let obj = JSON.parse(apiParam.data);
    let observer = obj.observer;
    if (observer === void 0)
      throw "observer is undefined";
    return this._impl.registerAudioFrameObserver(observer);
  }
  registerAudioFrameObserver2(apiParam) {
    let obj = JSON.parse(apiParam.data);
    let observer = obj.observer;
    if (observer === void 0)
      throw "observer is undefined";
    let mode = obj.mode;
    if (mode === void 0)
      throw "mode is undefined";
    return this._impl.registerAudioFrameObserver2(observer, mode);
  }
  unregisterAudioFrameObserver(apiParam) {
    let obj = JSON.parse(apiParam.data);
    let observer = obj.observer;
    if (observer === void 0)
      throw "observer is undefined";
    return this._impl.unregisterAudioFrameObserver(observer);
  }
  registerVideoFrameObserver(apiParam) {
    let obj = JSON.parse(apiParam.data);
    let observer = obj.observer;
    if (observer === void 0)
      throw "observer is undefined";
    return this._impl.registerVideoFrameObserver(observer);
  }
  unregisterVideoFrameObserver(apiParam) {
    let obj = JSON.parse(apiParam.data);
    let observer = obj.observer;
    if (observer === void 0)
      throw "observer is undefined";
    return this._impl.unregisterVideoFrameObserver(observer);
  }
  registerMediaPlayerAudioSpectrumObserver(apiParam) {
    let obj = JSON.parse(apiParam.data);
    let observer = obj.observer;
    if (observer === void 0)
      throw "observer is undefined";
    let intervalInMS = obj.intervalInMS;
    if (intervalInMS === void 0)
      throw "intervalInMS is undefined";
    return this._impl.registerMediaPlayerAudioSpectrumObserver(
      observer,
      intervalInMS
    );
  }
  unregisterMediaPlayerAudioSpectrumObserver(apiParam) {
    let obj = JSON.parse(apiParam.data);
    let observer = obj.observer;
    if (observer === void 0)
      throw "observer is undefined";
    return this._impl.unregisterMediaPlayerAudioSpectrumObserver(observer);
  }
  setAudioDualMonoMode(apiParam) {
    let obj = JSON.parse(apiParam.data);
    let mode = obj.mode;
    if (mode === void 0)
      throw "mode is undefined";
    return this._impl.setAudioDualMonoMode(mode);
  }
  getPlayerSdkVersion() {
    return this._impl.getPlayerSdkVersion();
  }
  getPlaySrc() {
    return this._impl.getPlaySrc();
  }
  openWithAgoraCDNSrc(apiParam) {
    let obj = JSON.parse(apiParam.data);
    let src = obj.src;
    if (src === void 0)
      throw "src is undefined";
    let startPos = obj.startPos;
    if (startPos === void 0)
      throw "startPos is undefined";
    return this._impl.openWithAgoraCDNSrc(src, startPos);
  }
  getAgoraCDNLineCount() {
    return this._impl.getAgoraCDNLineCount();
  }
  switchAgoraCDNLineByIndex(apiParam) {
    let obj = JSON.parse(apiParam.data);
    let index = obj.index;
    if (index === void 0)
      throw "index is undefined";
    return this._impl.switchAgoraCDNLineByIndex(index);
  }
  getCurrentAgoraCDNIndex() {
    return this._impl.getCurrentAgoraCDNIndex();
  }
  enableAutoSwitchAgoraCDN(apiParam) {
    let obj = JSON.parse(apiParam.data);
    let enable = obj.enable;
    if (enable === void 0)
      throw "enable is undefined";
    return this._impl.enableAutoSwitchAgoraCDN(enable);
  }
  renewAgoraCDNSrcToken(apiParam) {
    let obj = JSON.parse(apiParam.data);
    let token = obj.token;
    if (token === void 0)
      throw "token is undefined";
    let ts = obj.ts;
    if (ts === void 0)
      throw "ts is undefined";
    return this._impl.renewAgoraCDNSrcToken(token, ts);
  }
  switchAgoraCDNSrc(apiParam) {
    let obj = JSON.parse(apiParam.data);
    let src = obj.src;
    if (src === void 0)
      throw "src is undefined";
    let syncPts = obj.syncPts;
    if (syncPts === void 0)
      throw "syncPts is undefined";
    return this._impl.switchAgoraCDNSrc(src, syncPts);
  }
  switchSrc(apiParam) {
    let obj = JSON.parse(apiParam.data);
    let src = obj.src;
    if (src === void 0)
      throw "src is undefined";
    let syncPts = obj.syncPts;
    if (syncPts === void 0)
      throw "syncPts is undefined";
    return this._impl.switchSrc(src, syncPts);
  }
  preloadSrc(apiParam) {
    let obj = JSON.parse(apiParam.data);
    let src = obj.src;
    if (src === void 0)
      throw "src is undefined";
    let startPos = obj.startPos;
    if (startPos === void 0)
      throw "startPos is undefined";
    return this._impl.preloadSrc(src, startPos);
  }
  playPreloadedSrc(apiParam) {
    let obj = JSON.parse(apiParam.data);
    let src = obj.src;
    if (src === void 0)
      throw "src is undefined";
    return this._impl.playPreloadedSrc(src);
  }
  unloadSrc(apiParam) {
    let obj = JSON.parse(apiParam.data);
    let src = obj.src;
    if (src === void 0)
      throw "src is undefined";
    return this._impl.unloadSrc(src);
  }
  setSpatialAudioParams(apiParam) {
    let obj = JSON.parse(apiParam.data);
    let params = obj.params;
    if (params === void 0)
      throw "params is undefined";
    return this._impl.setSpatialAudioParams(params);
  }
  setSoundPositionParams(apiParam) {
    let obj = JSON.parse(apiParam.data);
    let pan = obj.pan;
    if (pan === void 0)
      throw "pan is undefined";
    let gain = obj.gain;
    if (gain === void 0)
      throw "gain is undefined";
    return this._impl.setSoundPositionParams(pan, gain);
  }
};
var IMediaPlayerCacheManagerDispatch = class {
  constructor(engine) {
    this._impl = new IMediaPlayerCacheManagerImpl(engine);
  }
  removeAllCaches() {
    return this._impl.removeAllCaches();
  }
  removeOldCache() {
    return this._impl.removeOldCache();
  }
  removeCacheByUri(apiParam) {
    let obj = JSON.parse(apiParam.data);
    let uri = obj.uri;
    if (uri === void 0)
      throw "uri is undefined";
    return this._impl.removeCacheByUri(uri);
  }
  setCacheDir(apiParam) {
    let obj = JSON.parse(apiParam.data);
    let path = obj.path;
    if (path === void 0)
      throw "path is undefined";
    return this._impl.setCacheDir(path);
  }
  setMaxCacheFileCount(apiParam) {
    let obj = JSON.parse(apiParam.data);
    let count = obj.count;
    if (count === void 0)
      throw "count is undefined";
    return this._impl.setMaxCacheFileCount(count);
  }
  setMaxCacheFileSize(apiParam) {
    let obj = JSON.parse(apiParam.data);
    let cacheSize = obj.cacheSize;
    if (cacheSize === void 0)
      throw "cacheSize is undefined";
    return this._impl.setMaxCacheFileSize(cacheSize);
  }
  enableAutoRemoveCache(apiParam) {
    let obj = JSON.parse(apiParam.data);
    let enable = obj.enable;
    if (enable === void 0)
      throw "enable is undefined";
    return this._impl.enableAutoRemoveCache(enable);
  }
  getCacheDir(apiParam) {
    let obj = JSON.parse(apiParam.data);
    let path = obj.path;
    if (path === void 0)
      throw "path is undefined";
    let length = obj.length;
    if (length === void 0)
      throw "length is undefined";
    return this._impl.getCacheDir(path, length);
  }
  getMaxCacheFileCount() {
    return this._impl.getMaxCacheFileCount();
  }
  getMaxCacheFileSize() {
    return this._impl.getMaxCacheFileSize();
  }
  getCacheFileCount() {
    return this._impl.getCacheFileCount();
  }
};
var IMediaRecorderImpl = class {
  constructor(engine) {
    this._engine = engine;
  }
  putAction(action) {
    this._engine.actionQueue.putAction(action);
  }
  setMediaRecorderObserver(callback) {
    AgoraConsole.warn(
      "setMediaRecorderObserver not supported in this platform!"
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  startRecording(config) {
    AgoraConsole.warn("startRecording not supported in this platform!");
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  stopRecording() {
    AgoraConsole.warn("stopRecording not supported in this platform!");
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
};

// src/binding/IAgoraMediaRecorderDispatch.ts
var IMediaRecorderDispatch = class {
  constructor(engine) {
    this._impl = new IMediaRecorderImpl(engine);
  }
  setMediaRecorderObserver(apiParam) {
    let obj = JSON.parse(apiParam.data);
    let callback = obj.callback;
    if (callback === void 0)
      throw "callback is undefined";
    return this._impl.setMediaRecorderObserver(callback);
  }
  startRecording(apiParam) {
    let obj = JSON.parse(apiParam.data);
    let config = obj.config;
    if (config === void 0)
      throw "config is undefined";
    return this._impl.startRecording(config);
  }
  stopRecording() {
    return this._impl.stopRecording();
  }
};
var IrisAgoraEventHandler = class {
  constructor(engine) {
    this._engine = engine;
    AgoraRTC2.onAutoplayFailed = this.onAutoplayFailed.bind(this);
    AgoraRTC2.onCameraChanged = this.onCameraChanged.bind(this);
    AgoraRTC2.onMicrophoneChanged = this.onMicrophoneChanged.bind(this);
    AgoraRTC2.onPlaybackDeviceChanged = this.onMicrophoneChanged.bind(this);
  }
  onAutoplayFailed() {
    this._engine.rtcEngineEventHandler.onError(
      NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_READY,
      "auto play failed"
    );
  }
  onCameraChanged(info) {
    let deviceId = info.device.deviceId;
    let deviceType = NATIVE_RTC.MEDIA_DEVICE_TYPE.VIDEO_CAPTURE_DEVICE;
    let deviceState = AgoraTranslate.DeviceState2NATIVE_RTCMEDIA_DEVICE_STATE_TYPE(
      info.state
    );
    this._engine.rtcEngineEventHandler.onVideoDeviceStateChanged(
      deviceId,
      deviceType,
      deviceState
    );
  }
  onMicrophoneChanged(info) {
    let deviceId = info.device.deviceId;
    let deviceType = NATIVE_RTC.MEDIA_DEVICE_TYPE.AUDIO_RECORDING_DEVICE;
    let deviceState = AgoraTranslate.DeviceState2NATIVE_RTCMEDIA_DEVICE_STATE_TYPE(
      info.state
    );
    this._engine.rtcEngineEventHandler.onAudioDeviceStateChanged(
      deviceId,
      deviceType,
      deviceState
    );
  }
  onPlaybackDeviceChanged(info) {
    let deviceId = info.device.deviceId;
    let deviceType = NATIVE_RTC.MEDIA_DEVICE_TYPE.AUDIO_PLAYOUT_DEVICE;
    let deviceState = AgoraTranslate.DeviceState2NATIVE_RTCMEDIA_DEVICE_STATE_TYPE(
      info.state
    );
    this._engine.rtcEngineEventHandler.onAudioDeviceStateChanged(
      deviceId,
      deviceType,
      deviceState
    );
  }
  destruction() {
    AgoraRTC2.onAutoplayFailed = void 0;
    AgoraRTC2.onCameraChanged = void 0;
    AgoraRTC2.onMicrophoneChanged = void 0;
    AgoraRTC2.onPlaybackDeviceChanged = void 0;
  }
};
var IrisGlobalVariables = class {
  constructor() {
    this.appId = null;
    //initialize()
    this.areaCode = NATIVE_RTC.AREA_CODE.AREA_CODE_CN;
    this.enabledAudio = true;
    this.pausedAudio = false;
    //开启或禁用本地audio功能，audio流
    this.enabledLocalAudio = true;
    this.mutedLocalAudioStream = false;
    //开启或者禁用video功能
    this.enabledLocalVideo = true;
    this.mutedLocalVideoStream = false;
    this.enabledVideo = false;
    this.pausedVideo = false;
    //远端用户的 playback signal volume， 总设置
    this.playbackSignalVolume = 100;
    //每个远端用户的 playback signal volume 对应uid
    this.playbackSignalVolumes = /* @__PURE__ */ new Map();
    // recording Signal Volume
    this.recordingSignalVolume = 100;
    //
    this.mutedRecordingSignal = false;
    //设置默认 mute 选项
    this.defaultMutedAllRemoteAudioStreams = false;
    this.defaultMutedAllRemoteVideoStreams = false;
    //SetLocalVideoMirrorMode
    this.mirrorMode = NATIVE_RTC.VIDEO_MIRROR_MODE_TYPE.VIDEO_MIRROR_MODE_ENABLED;
    //setVideoEncoderConfiguration
    this.videoEncoderConfiguration = null;
    this.cameraDirection = null;
    this.fallbackOption = null;
    this.screenCaptureContentHint = null;
    this.screenCaptureParameters = null;
    this.cloudProxy = null;
    //devicesInfo
    this.deviceEnumerated = false;
    this.playbackDevices = new Array();
    this.recordingDevices = new Array();
    this.videoDevices = new Array();
  }
};
var IrisMainClientVariables = class {
  constructor() {
    //ChannelMediaOptions
    this.publishCameraTrack = true;
    this.publishAudioTrack = true;
    this.autoSubscribeAudio = true;
    this.autoSubscribeVideo = true;
    //setClientOptions()
    this.clientRoleOptions = null;
    //LeaveChannelOptions
    this.stopAudioMixing = true;
    this.stopAllEffect = true;
    this.stopMicrophoneRecording = true;
    //mute 远端的用户流
    this.mutedRemoteAudioStreams = /* @__PURE__ */ new Map();
    this.mutedRemoteVideoStreams = /* @__PURE__ */ new Map();
    this.videoSourceType = NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA;
    //SetVideoEncoderConfiguration
    this.videoEncoderConfiguration = null;
    //是否开启大小流
    this.enabledDualStreamMode = false;
    this.enabledDualStreamModes = /* @__PURE__ */ new Map();
    //远端的大小流
    this.remoteVideoStreamTypes = /* @__PURE__ */ new Map();
    //远端默认流
    this.remoteDefaultVideoStreamType = null;
    this.encryptionConfig = {
      enabled: false,
      config: new NATIVE_RTC.EncryptionConfig()
    };
    //C++ enabledAudioVolumeIndication()
    this.enabledAudioVolumeIndication = null;
    //setDevice() : videoDevice
    this.videoDeviceId = null;
    //setPlaybackDevice: audiDevice
    this.playbackDeviceId = null;
    //setRecordingDevice: recordingDevice
    this.recordingDeviceId = null;
    //SetContentInspect
    this.contentInspect = null;
    // startPreviewed 似乎没有用处
    // startPreviewed: boolean = false;
    this.joinChanneled = false;
    //用来记录暂停或者恢复的
    this.currChannelMediaRelayconfiguration = null;
  }
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
  mergeChannelMediaOptions(options) {
    for (let key in options) {
      this[key] = options[key];
    }
  }
};

// src/states/IrisSubClientVariables.ts
var IrisSubClientVariables = class {
  constructor() {
    //ChannelMediaOptions
    this.channelMediaOptions = new Container();
    this.enabledAudioVolumeIndications = new Container();
    //C++ AdjustUserPlaybackSignalVolume
    //each user playback signal volume
    this.playbackSignalVolumes = /* @__PURE__ */ new Map();
    //mute 远端用户流
    this.mutedRemoteAudioStreams = new Container();
    this.mutedRemoteVideoStreams = new Container();
    //SetVideoEncoderConfigurationEx
    this.videoEncoderConfigurations = new Container();
    //子账户设置开启大小流
    this.enabledDualStreamModes = new Container();
    //子账户设置接收大小流
    this.remoteVideoStreamTypes = new Container();
    //加密
    this.encryptionConfigs = new Container();
  }
  //返回值为合并后万好着呢个版本的ChannelMediaOptions
  mergeChannelMediaOptions(connection, options) {
    let channelMediaOptions = this.channelMediaOptions.getT(
      connection.channelId,
      connection.localUid
    );
    if (channelMediaOptions == null) {
      channelMediaOptions = {};
      this.channelMediaOptions.addT(
        connection.channelId,
        connection.localUid,
        channelMediaOptions
      );
    }
    for (let key in options) {
      channelMediaOptions[key] = options[key];
    }
    return channelMediaOptions;
  }
};

// src/engine/IrisEntitiesContainer.ts
var IrisEntitiesContainer = class {
  //remoteUser 这个地方有问题，不同client的remoterUser要分开存，不然会出现
  //A, B  先后加入频道1。然后频道中C,D,E加入。此时B离开频道了。导致A应该观察到的C,D,E被删除了。
  //算了，自己不处理了，自己去IAgoraRTCClient里找吧
  // _remoteUsers: Container<IAgoraRTCRemoteUser> = new Container<IAgoraRTCRemoteUser>();
  constructor(engine) {
    this._engine = null;
    //mainClient
    this._mainClient = null;
    this._mainClientEventHandler = null;
    this._mainClientLocalAudioTracks = new Array();
    this._mainClientLocalVideoTrack = null;
    this._mainClientTrackEventHandlers = new Array();
    //all local tracks
    this._localAudioTracks = new Array();
    this._localVideoTracks = new Array();
    this._remoteVideoViewHolders = new Array();
    //subClient
    this._subClients = new Container();
    this._subClientEventHandlers = new Container();
    this._subClientAudioTracks = new Container();
    this._subClientVideoTracks = new Container();
    this._subClientTrackEventHandlers = new Container();
    this._engine = engine;
  }
  // getRemoteUser(connection: NATIVE_RTC.RtcConnection): IAgoraRTCRemoteUser {
  //     return this._remoteUsers.getT(connection.channelId, connection.localUid);
  // }
  // addRemoteUser(connection: NATIVE_RTC.RtcConnection, remoteUser: IAgoraRTCRemoteUser) {
  //     this._remoteUsers.addT(connection.channelId, connection.localUid, remoteUser);
  // }
  getAllRemoteUsers() {
    let ret = [];
    if (this._mainClient && this._mainClient.channelName) {
      AgoraTool.mergeArray(ret, this._mainClient.remoteUsers);
    }
    this._subClients.walkT((channel_id, uid, client) => {
      AgoraTool.mergeArray(ret, client.remoteUsers);
    });
    return ret;
  }
  //这里返回一个数组，是可能我方用A,B,C 同时加入频道1，然后D,E加入。会有三个相同Uid的 remoteUser
  getMainClientRemoteUserByUid(uid) {
    if (this._mainClient && this._mainClient.channelName) {
      let remoteUsers = this._mainClient.remoteUsers;
      for (let i = 0; i < remoteUsers.length; i++) {
        if (remoteUsers[i].uid == uid) {
          return remoteUsers[i];
        }
      }
    }
    return null;
  }
  getSubClientRemoteUserByUid(uid, connection) {
    let subClient = this._subClients.getT(
      connection.channelId,
      connection.localUid
    );
    if (subClient) {
      let remoteUsers = subClient.remoteUsers;
      for (let i = 0; i < remoteUsers.length; i++) {
        if (remoteUsers[i].uid == uid) {
          return remoteUsers[i];
        }
      }
    }
    return null;
  }
  getAllRemoteUserByUid(uid) {
    let ret = [];
    if (this._mainClient && this._mainClient.channelName) {
      let remoteUsers = this._mainClient.remoteUsers;
      for (let remoteUser of remoteUsers) {
        if (remoteUser.uid == uid) {
          ret.push(remoteUser);
        }
      }
    }
    this._subClients.walkT((channel_id, unuseUid, subClient) => {
      let remoteUsers = subClient.remoteUsers;
      for (let remoteUser of remoteUsers) {
        if (remoteUser.uid == uid) {
          ret.push(remoteUser);
        }
      }
    });
    return ret;
  }
  // getRemoteUserByChannelName(channelName: string): Map<UID, IAgoraRTCRemoteUser> {
  //     return this._remoteUsers.getTs(channelName);
  // }
  //从数组中移除远端用户，并且如果当前轨道监听中有属于这个远端用户的轨道，也一起移除掉。
  removeRemoteUserAndClearTrackEvent(connection, user) {
    this._mainClientTrackEventHandlers.filter(
      (trackEvent) => {
        if (trackEvent.getRemoteUser() == user) {
          trackEvent.destruction();
          return false;
        }
        return true;
      }
    );
    let subClientTrackEventHandlers = this._subClientTrackEventHandlers.getT(
      connection.channelId,
      connection.localUid
    );
    subClientTrackEventHandlers && subClientTrackEventHandlers.filter(
      (trackEvent) => {
        if (trackEvent.getRemoteUser() == user) {
          trackEvent.destruction();
          return false;
        }
        return true;
      }
    );
  }
  addLocalVideoTrack(trackPackage) {
    let item = this._localVideoTracks.find((value) => {
      return value.type == trackPackage.type;
    });
    if (item) {
      console.log(`addLocalVideoTrack add to item: ${JSON.stringify(item)}`);
      if (trackPackage.element) {
        item.element = trackPackage.element;
      }
      if (trackPackage.track) {
        item.track = trackPackage.track;
      }
      if (trackPackage.type) {
        item.type = trackPackage.type;
      }
      return;
    }
    console.log(`addLocalVideoTrack add new: ${JSON.stringify(trackPackage)}`);
    this._localVideoTracks.push(trackPackage);
  }
  getLocalVideoTrackByType(type) {
    for (let trackPack of this._localVideoTracks) {
      if (trackPack.type == type && trackPack.track) {
        return trackPack;
      }
    }
    return null;
  }
  removeLocalVideoTrack(trackPackage) {
    for (let i = 0; i < this._localVideoTracks.length; i++) {
      let trackPack = this._localVideoTracks[i];
      if (trackPack == trackPackage) {
        this._localVideoTracks.splice(i, 1);
        break;
      }
    }
  }
  removeLocalVideoTrackByTrack(track) {
    for (let i = 0; i < this._localVideoTracks.length; i++) {
      let trackPack = this._localVideoTracks[i];
      if (trackPack.track == track) {
        this._localVideoTracks.splice(i, 1);
        break;
      }
    }
  }
  removeLocalVideoTrackByType(type) {
    for (let i = 0; i < this._localVideoTracks.length; i++) {
      let trackPack = this._localVideoTracks[i];
      if (trackPack.type == type) {
        trackPack.track;
        this._localVideoTracks.splice(i, 1);
        break;
      }
    }
  }
  clearLocalVideoTracks(closeTrack) {
    return __async(this, null, function* () {
      if (closeTrack) {
        for (let i = 0; i < this._localVideoTracks.length; i++) {
          let trackPack = this._localVideoTracks[i];
          let track = trackPack.track;
          console.log(
            "clearLocalVideoTracks clearLocalVideoTracks clearLocalVideoTracks"
          );
          track.stop();
          yield track.setEnabled(false);
          track.close();
        }
      }
      this._localVideoTracks = [];
    });
  }
  addLocalAudioTrack(trackPackage) {
    this._localAudioTracks.push(trackPackage);
  }
  getLocalAudioTrackByType(type) {
    for (let trackPack of this._localAudioTracks) {
      if (trackPack.type == type) {
        return trackPack;
      }
    }
    return null;
  }
  removeLocalAudioTrack(trackPackage) {
    for (let i = 0; i < this._localAudioTracks.length; i++) {
      let trackPack = this._localAudioTracks[i];
      if (trackPack == trackPackage) {
        this._localAudioTracks.splice(i, 1);
        break;
      }
    }
  }
  removeLocalAudioTrackByTrack(track) {
    for (let i = 0; i < this._localAudioTracks.length; i++) {
      let trackPack = this._localAudioTracks[i];
      if (trackPack.track == track) {
        this._localAudioTracks.splice(i, 1);
        break;
      }
    }
  }
  removeLocalAudioTrackByType(type) {
    for (let i = 0; i < this._localAudioTracks.length; i++) {
      let trackPack = this._localAudioTracks[i];
      if (trackPack.type == type) {
        this._localAudioTracks.splice(i, 1);
        break;
      }
    }
  }
  getLocalVideoTracks() {
    return this._localVideoTracks;
  }
  getRemoteVideoViewHolders() {
    return this._remoteVideoViewHolders;
  }
  addOrUpdateRemoteVideoViewHolder(viewHolder) {
    let item = this._remoteVideoViewHolders.find((value) => {
      return value.uid == viewHolder.uid && value.channelId == viewHolder.channelId && value.type == viewHolder.type;
    });
    if (item) {
      console.log(
        `addOrUpdateRemoteVideoViewHolder add to item: ${JSON.stringify(item)}`
      );
      if (viewHolder.element) {
        item.element = viewHolder.element;
      }
      if (viewHolder.type) {
        item.type = viewHolder.type;
      }
      if (viewHolder.channelId) {
        item.channelId = viewHolder.channelId;
      }
      if (viewHolder.uid) {
        item.uid = viewHolder.uid;
      }
      return;
    }
    console.log(
      `addOrUpdateRemoteVideoViewHolder add to item new: ${JSON.stringify(
        viewHolder
      )}`
    );
    this._remoteVideoViewHolders.push(viewHolder);
  }
  getLocalAudioTracks() {
    return this._localAudioTracks;
  }
  clearLocalAudioTracks(closeTrack) {
    return __async(this, null, function* () {
      for (let i = 0; i < this._localAudioTracks.length; i++) {
        let trackPack = this._localAudioTracks[i];
        let track = trackPack.track;
        yield track.setEnabled(false);
        track.close();
      }
      this._localAudioTracks = [];
    });
  }
  addMainClientLocalAudioTrack(trackPackage) {
    this._mainClientLocalAudioTracks.push(trackPackage);
  }
  removeMainClientLocalAudioTrack(track) {
    for (let i = 0; i < this._mainClientLocalAudioTracks.length; i++) {
      let trackPackage = this._mainClientLocalAudioTracks[i];
      if (trackPackage.track == track) {
        this._mainClientLocalAudioTracks.splice(i, 1);
        break;
      }
    }
  }
  setMainClientLocalVideoTrack(trackPack) {
    this._mainClientLocalVideoTrack = trackPack;
  }
  clearMainClientLocalVideoTrack() {
    this._mainClientLocalVideoTrack = null;
  }
  walkAllILocalVideoTrack(fun) {
    if (this._mainClientLocalVideoTrack)
      fun(this._mainClientLocalVideoTrack);
    this._subClientVideoTracks.walkT(
      (channelId, uid, trackPack) => {
        fun(trackPack);
      }
    );
    for (let trackPack of this._localVideoTracks) {
      fun(trackPack);
    }
  }
  addSubClientLocalAudioTrack(connection, trackPackage) {
    let array = this._subClientAudioTracks.getT(
      connection.channelId,
      connection.localUid
    );
    if (array == null) {
      array = [];
      this._subClientAudioTracks.addT(
        connection.channelId,
        connection.localUid,
        array
      );
    }
    array.push(trackPackage);
  }
  removeSubClientLocalAudioTrack(connection, track) {
    let array = this._subClientAudioTracks.getT(
      connection.channelId,
      connection.localUid
    );
    if (array == null)
      return;
    for (let i = 0; i < array.length; i++) {
      let trackPackage = array[i];
      if (trackPackage.track == track) {
        array.splice(i, 1);
        break;
      }
    }
  }
  setSubClientLocalVideoTrack(connection, trackPack) {
    this._subClientVideoTracks.addT(
      connection.channelId,
      connection.localUid,
      trackPack
    );
  }
  clearSubClientLocalVideoTrack(connection) {
    this._subClientVideoTracks.removeT(
      connection.channelId,
      connection.localUid
    );
  }
  getVideoFrame(uid, channel_id) {
    if (uid == 0) {
      if (this._mainClientLocalVideoTrack) {
        return {
          video_track: this._mainClientLocalVideoTrack.track,
          is_new_frame: true,
          //todo  how to know is a new frame
          process_err: 0 /* ERR_OK */
        };
      }
      if (this._localVideoTracks.length > 0) {
        this._localVideoTracks[0].track.getCurrentFrameData();
        return {
          video_track: this._localVideoTracks[0].track,
          is_new_frame: true,
          //todo  how to know is a new frame
          process_err: 0 /* ERR_OK */
        };
      }
      return null;
    } else {
      let subVideoTrack = this._subClientVideoTracks.getT(channel_id, uid);
      if (subVideoTrack) {
        return {
          video_track: subVideoTrack.track,
          is_new_frame: true,
          //todo  how to know is a new frame
          process_err: 0 /* ERR_OK */
        };
      }
      if (this._mainClient && this._mainClient.channelName == channel_id) {
        for (let remoteUser of this._mainClient.remoteUsers) {
          if (remoteUser.uid == uid && remoteUser.hasVideo && remoteUser.videoTrack) {
            return {
              video_track: remoteUser.videoTrack,
              is_new_frame: true,
              //todo  how to know is a new frame
              process_err: 0 /* ERR_OK */
            };
          }
        }
      }
      let subClients = this._subClients.getTs(channel_id);
      if (subClients) {
        for (let e of subClients) {
          let subClient = e[1];
          for (let remoteUser of subClient.remoteUsers) {
            if (remoteUser.uid == uid && remoteUser.hasVideo && remoteUser.videoTrack) {
              return {
                video_track: remoteUser.videoTrack,
                is_new_frame: true,
                //todo  how to know is a new frame
                process_err: 0 /* ERR_OK */
              };
            }
          }
        }
      }
      return null;
    }
  }
  getVideoFrameByConfig(config) {
    let uid = config.id;
    let channel_id = config.key;
    let type = config.type;
    if (uid == 0) {
      if (this._mainClientLocalVideoTrack && this._mainClientLocalVideoTrack.type == type) {
        return {
          video_track: this._mainClientLocalVideoTrack.track,
          is_new_frame: true,
          //todo  how to know is a new frame
          process_err: 0 /* ERR_OK */
        };
      } else if (this._localVideoTracks.length > 0) {
        for (let trackPackage of this._localVideoTracks) {
          if (trackPackage.type == type) {
            return {
              video_track: trackPackage.track,
              is_new_frame: true,
              //todo  how to know is a new frame
              process_err: 0 /* ERR_OK */
            };
          }
        }
      } else {
        return null;
      }
    } else {
      let subVideoTrack = this._subClientVideoTracks.getT(channel_id, uid);
      if (subVideoTrack && subVideoTrack.type == type) {
        return {
          video_track: subVideoTrack.track,
          is_new_frame: true,
          //todo  how to know is a new frame
          process_err: 0 /* ERR_OK */
        };
      }
      if (this._mainClient && this._mainClient.channelName == channel_id) {
        for (let remoteUser of this._mainClient.remoteUsers) {
          if (remoteUser.uid == uid && remoteUser.hasVideo && remoteUser.videoTrack) {
            return {
              video_track: remoteUser.videoTrack,
              is_new_frame: true,
              //todo  how to know is a new frame
              process_err: 0 /* ERR_OK */
            };
          }
        }
      }
      let subClients = this._subClients.getTs(channel_id);
      if (subClients) {
        for (let e of subClients) {
          let subClient = e[1];
          for (let remoteUser of subClient.remoteUsers) {
            if (remoteUser.uid == uid && remoteUser.hasVideo && remoteUser.videoTrack) {
              return {
                video_track: remoteUser.videoTrack,
                is_new_frame: true,
                //todo  how to know is a new frame
                process_err: 0 /* ERR_OK */
              };
            }
          }
        }
      }
      return null;
    }
  }
  setMainClient(mainClient) {
    this._mainClient = mainClient;
  }
  getMainClient() {
    return this._mainClient;
  }
  setMainClientEventHandler(eventHandler) {
    this._mainClientEventHandler = eventHandler;
  }
  getMainClientEventHandler() {
    return this._mainClientEventHandler;
  }
  addMainClientTrackEventHandler(trackEventHandler) {
    this._mainClientTrackEventHandlers.push(trackEventHandler);
  }
  removeMainClientTrackEventHandlerByTrack(track) {
    for (let i = 0; i < this._mainClientTrackEventHandlers.length; i++) {
      let trackEventHander = this._mainClientTrackEventHandlers[i];
      if (trackEventHander.getTrack() == track) {
        trackEventHander.destruction();
        this._mainClientTrackEventHandlers.splice(i, 1);
        break;
      }
    }
  }
  removeMainClientTrackEventHandlerByRemoteUser(user, mediaType) {
    this._mainClientTrackEventHandlers = this._mainClientTrackEventHandlers.filter(
      (trackEventHander) => {
        if (trackEventHander.getRemoteUser() != user)
          return true;
        if (mediaType == "all") {
          trackEventHander.destruction();
          return false;
        }
        if (mediaType == "audio" && trackEventHander.getTrackType() == "IRemoteTrack") {
          trackEventHander.destruction();
          return false;
        }
        if (mediaType == "video" && trackEventHander.getTrackType() == "IRemoteVideoTrack") {
          trackEventHander.destruction();
          return false;
        }
        return true;
      }
    );
  }
  isMainClientPublishedVideoTrack() {
    if (this._mainClient) {
      for (let track of this._mainClient.localTracks) {
        if (track.trackMediaType == "video") {
          return true;
        }
      }
    }
    return false;
  }
  addSubClientTrackEventHandler(connection, eventHandler) {
    let array = this._subClientTrackEventHandlers.getT(
      connection.channelId,
      connection.localUid
    );
    if (array == null) {
      array = [];
      this._subClientTrackEventHandlers.addT(
        connection.channelId,
        connection.localUid,
        array
      );
    }
    array.push(eventHandler);
  }
  removeSubClientTrackEventHandlerByTrack(connection, track) {
    let array = this._subClientTrackEventHandlers.getT(
      connection.channelId,
      connection.localUid
    );
    if (array == null)
      return;
    for (let i = 0; i < array.length; i++) {
      let event = array[i];
      if (event.getTrack() == track) {
        array[i].destruction();
        array.splice(i, 1);
        break;
      }
    }
  }
  removeSubClientTrackEventHandlerByRemoteUser(connection, user, mediaType) {
    let array = this._subClientTrackEventHandlers.getT(
      connection.channelId,
      connection.localUid
    );
    if (array == null)
      return;
    array = array.filter((trackEventHander) => {
      if (trackEventHander.getRemoteUser() != user)
        return true;
      if (mediaType == "all") {
        trackEventHander.destruction();
        return false;
      }
      if (mediaType == "audio" && trackEventHander.getTrackType() == "IRemoteTrack") {
        trackEventHander.destruction();
        return false;
      }
      if (mediaType == "video" && trackEventHander.getTrackType() == "IRemoteVideoTrack") {
        trackEventHander.destruction();
        return false;
      }
      return true;
    });
    this._subClientTrackEventHandlers.removeT(
      connection.channelId,
      connection.localUid
    );
    this._subClientTrackEventHandlers.addT(
      connection.channelId,
      connection.localUid,
      array
    );
  }
  clearMainClientAll(channelId) {
    if (this._mainClient) {
      this._mainClient = null;
    }
    if (this._mainClientEventHandler) {
      this._mainClientEventHandler.destruction();
      this._mainClientEventHandler = null;
    }
    this._mainClientLocalAudioTracks = [];
    this._mainClientLocalVideoTrack = null;
    this._mainClientTrackEventHandlers.forEach((element) => {
      element.destruction();
    });
    this._mainClientTrackEventHandlers = [];
  }
  addSubClient(connection, client) {
    this._subClients.addT(connection.channelId, connection.localUid, client);
  }
  addSubClientEventHandler(connection, clientEventHandler) {
    this._subClientEventHandlers.addT(
      connection.channelId,
      connection.localUid,
      clientEventHandler
    );
  }
  getSubClientEventHandler(connection) {
    return this._subClientEventHandlers.getT(
      connection.channelId,
      connection.localUid
    );
  }
  clearSubClientAll(connection) {
    let channelId = connection.channelId;
    let uid = connection.localUid;
    this._subClients.removeT(channelId, uid);
    let clientEventHander = this._subClientEventHandlers.getT(channelId, uid);
    clientEventHander && clientEventHander.destruction();
    this._subClientEventHandlers.removeT(channelId, uid);
    this._subClientAudioTracks.removeT(channelId, uid);
    this._subClientVideoTracks.removeT(channelId, uid);
    let trackEventHandlers = this._subClientTrackEventHandlers.getT(
      channelId,
      uid
    );
    if (trackEventHandlers) {
      for (let event of trackEventHandlers) {
        event.destruction();
      }
    }
    this._subClientTrackEventHandlers.removeT(channelId, uid);
  }
  //注意自己的mainClient可能也满足要求哦
  // getAllClient(connection: NATIVE_RTC.RtcConnection): IAgoraRTCClient {
  //     if (this._mainClient?.channelName == connection.channelId)
  //         return this._mainClient;
  //     return this._subClients.getT(connection.channelId, connection.localUid);
  // }
  getClientsByChannelName(channelName) {
    return this._subClients.getTs(channelName);
  }
  getSubClient(connection) {
    return this._subClients.getT(connection.channelId, connection.localUid);
  }
  getSubClients() {
    return this._subClients;
  }
  getSubClientVideoTrack(connection) {
    return this._subClientVideoTracks.getT(
      connection.channelId,
      connection.localUid
    );
  }
  //  当一个轨道将被close的时候。会去所有保存这个track， 以及trackEvent 的容器里去删除这个track. 并且停止发流 记住是所有哦
  audioTrackWillClose(audioTrack) {
    return __async(this, null, function* () {
      this.removeLocalAudioTrackByTrack(audioTrack);
      this.removeMainClientLocalAudioTrack(audioTrack);
      this.removeMainClientTrackEventHandlerByTrack(audioTrack);
      if (this._mainClient && this._mainClient.localTracks.indexOf(audioTrack) != -1) {
        try {
          yield this._mainClient.unpublish(audioTrack);
          AgoraConsole.log("unpublish success");
        } catch (e) {
          AgoraConsole.error("unpublish error");
        }
      }
      this._subClientAudioTracks.walkT(
        (channelId, uid, packages) => {
          for (let i = 0; i < packages.length; i++) {
            let pack = packages[i];
            if (pack.track == audioTrack) {
              packages.splice(i, 1);
              break;
            }
          }
        }
      );
      this._subClientTrackEventHandlers.walkT(
        (channelId, uid, events) => {
          for (let i = 0; i < events.length; i++) {
            let event = events[i];
            if (event.getTrack() == audioTrack) {
              event.destruction();
              events.splice(i, 1);
            }
          }
        }
      );
      let container = this._subClients.getContainer();
      for (let e of container) {
        e[0];
        let clients = e[1];
        for (let c of clients) {
          c[0];
          let client = c[1];
          if (client.localTracks.indexOf(audioTrack) != -1) {
            try {
              yield client.unpublish(audioTrack);
              AgoraConsole.log("unpublish success");
            } catch (e2) {
              AgoraConsole.error("unpublish failed");
            }
          }
        }
      }
    });
  }
  // 当一个轨道将被close的时候。会去所有保存这个track， 以及trackEvent 的容器里去删除这个track. 记住是所有哦
  videoTrackWillClose(videoTrack) {
    return __async(this, null, function* () {
      var _a;
      this.removeLocalVideoTrackByTrack(videoTrack);
      if (((_a = this._mainClientLocalVideoTrack) == null ? void 0 : _a.track) == videoTrack) {
        this._mainClientLocalVideoTrack = null;
      }
      this.removeMainClientTrackEventHandlerByTrack(videoTrack);
      if (this._mainClient && this._mainClient.localTracks.indexOf(videoTrack) != -1) {
        try {
          yield this._mainClient.unpublish(videoTrack);
          AgoraConsole.log("unpublish success");
        } catch (e) {
          AgoraConsole.error("unpublish error");
        }
      }
      let deleteChannelIds = [];
      let deleteUids = [];
      this._subClientVideoTracks.walkT(
        (channelId, uid, pack) => {
          if (pack.track == videoTrack) {
            deleteChannelIds.push(channelId);
            deleteUids.push(uid);
          }
        }
      );
      for (let i = 0; i < deleteChannelIds.length; i++) {
        let deleteChannelId = deleteChannelIds[i];
        let deleteUid = deleteUids[i];
        this._subClientAudioTracks.removeT(deleteChannelId, deleteUid);
      }
      this._subClientTrackEventHandlers.walkT(
        (channelId, uid, events) => {
          for (let i = 0; i < events.length; i++) {
            let event = events[i];
            if (event.getTrack() == videoTrack) {
              event.destruction();
              events.splice(i, 1);
            }
          }
        }
      );
      let container = this._subClients.getContainer();
      for (let e of container) {
        e[0];
        let clients = e[1];
        for (let c of clients) {
          c[0];
          let client = c[1];
          if (client.localTracks.indexOf(videoTrack) != -1) {
            try {
              yield client.unpublish(videoTrack);
              AgoraConsole.log("unpublish success");
            } catch (e2) {
              AgoraConsole.error("unpublish failed");
            }
          }
        }
      }
    });
  }
  getLocalAudioTrackType(track) {
    for (let e of this._localAudioTracks) {
      if (e.track == track) {
        return e.type;
      }
    }
    return 5 /* kAudioSourceTypeUnknow */;
  }
  getLocalVideoTrackType(track) {
    for (let e of this._localVideoTracks) {
      if (e.track == track) {
        return e.type;
      }
    }
    return 100 /* kVideoSourceTypeUnknown */;
  }
  isMainClientOrSubClient(connection) {
    if (this._mainClient && this._mainClient.channelName == connection.channelId && this._mainClient.uid == connection.localUid) {
      return true;
    }
    if (this.getSubClient(connection) != null) {
      return true;
    }
    return false;
  }
  //
  destruction() {
    return __async(this, null, function* () {
      yield this.clearLocalAudioTracks(true);
      yield this.clearLocalVideoTracks(true);
      console.log("main client leave 1111111");
      if (this._mainClient && this._mainClient.channelName) {
        console.log("main client leave 22222");
        try {
          yield this._mainClient.leave();
          AgoraConsole.log("main client leave success");
        } catch (e) {
          AgoraConsole.error("mainClient leave failed");
          e && AgoraConsole.error(e);
        }
      }
      this._mainClient = null;
      if (this._mainClientEventHandler) {
        this._mainClientEventHandler.destruction();
        this._mainClientEventHandler = null;
      }
      this._mainClientTrackEventHandlers.forEach(
        (trackEventHandler) => {
          trackEventHandler.destruction();
        }
      );
      this._mainClientTrackEventHandlers = [];
      let subClients = this._subClients.getContainer();
      for (let e of subClients) {
        let map = e[1];
        for (let m of map) {
          let subClient = m[1];
          if (subClient.channelName) {
            try {
              yield subClient.leave();
              AgoraConsole.log("sub client leave success");
            } catch (e2) {
              AgoraConsole.error("subClient leave faield");
              e2 && AgoraConsole.error(e2);
            }
          }
        }
      }
      this._subClients = new Container();
      this._subClientEventHandlers.walkT(
        (channelId, uid, t) => {
          t.destruction();
        }
      );
      this._subClientEventHandlers = new Container();
      this._subClientTrackEventHandlers.walkT(
        (channelId, uid, t) => {
          t.forEach((trackEventHandler) => {
            trackEventHandler.destruction();
          });
        }
      );
      this._subClientTrackEventHandlers = new Container();
    });
  }
};

// src/engine/IrisRtcEngine.ts
var IrisRtcEngine = class {
  constructor(irisEventHandlerManager) {
    //EventHandler
    this._eventHandler = null;
    this._generateVideoTrackLabelOrHtmlElementCb = null;
    this._implDispatchsMap = null;
    this.entitiesContainer = null;
    this.rtcEngineEventHandler = null;
    this.globalVariables = null;
    this.mainClientVariables = null;
    this.subClientVariables = null;
    this.agoraEventHandler = null;
    this.actionQueue = null;
    this.executor = null;
    this.irisEventHandlerManager = null;
    this._implDispatchsMap = /* @__PURE__ */ new Map();
    this._implDispatchsMap.set("MediaPlayer", new IMediaPlayerDispatch(this));
    this._implDispatchsMap.set(
      "MediaPlayerCacheManager",
      new IMediaPlayerCacheManagerDispatch(this)
    );
    this._implDispatchsMap.set("MediaEngine", new IMediaEngineDispatch(this));
    this._implDispatchsMap.set(
      "MediaRecorder",
      new IMediaRecorderDispatch(this)
    );
    this.actionQueue = new AgoraActionQueue();
    this.entitiesContainer = new IrisEntitiesContainer(this);
    this.globalVariables = new IrisGlobalVariables();
    this.mainClientVariables = new IrisMainClientVariables();
    this.subClientVariables = new IrisSubClientVariables();
    this.agoraEventHandler = new IrisAgoraEventHandler(this);
    this.executor = new CallApiExecutor(true);
    this.irisEventHandlerManager = irisEventHandlerManager;
  }
  intercept(apiParam) {
    return this.callIrisApiAsync(apiParam);
  }
  callIrisApi(apiParam) {
    let func_name = apiParam.event;
    let params = apiParam.data;
    let paramLength = apiParam.data_size;
    let buffer = apiParam.buffer;
    let bufferLength = apiParam.length;
    apiParam.buffer_count;
    apiParam.result;
    let resultObj = {};
    let array = func_name.split("_");
    let className = array[0];
    let funName = array[1];
    console.log(`[iris_web] callIrisApi apiParam: ${JSON.stringify(apiParam)}`);
    let obj = this._implDispatchsMap.get(className);
    if (obj) {
      let callApiFun = obj[funName];
      if (callApiFun) {
        let ret = callApiFun.call(
          obj,
          params,
          paramLength,
          buffer,
          bufferLength,
          resultObj
        );
        AgoraConsole.log(`[callIrisApi] ${func_name} ret ${ret}`);
        return ret;
      } else {
        AgoraConsole.error(`${func_name} not found in ${className}Dispatch`);
        return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_FAILED;
      }
    } else {
      AgoraConsole.error(`${className} not found in DispatchsMap`);
      return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_FAILED;
    }
  }
  callIrisApiAsync(apiParam) {
    return __async(this, null, function* () {
      let func_name = apiParam.event;
      let array = func_name.split("_");
      let className = array[0];
      let funName = array[1];
      console.log(
        `[iris_web] callIrisApiAsync apiParam: ${JSON.stringify(apiParam)}`
      );
      let obj = this._implDispatchsMap.get(className);
      if (obj) {
        let callApiFun = obj[funName];
        if (callApiFun) {
          let ret = yield callApiFun.call(obj, apiParam);
          console.assert(
            function() {
              if (ret === void 0 || ret.code === void 0 || ret.data === void 0) {
                throw `[callIrisApiAsync] ${func_name} ret ${ret} not CallIrisApiResult`;
              }
              return true;
            }()
          );
          AgoraConsole.log(`[callIrisApiAsync] ${func_name} ret ${ret.code}`);
          return ret;
        } else {
          AgoraConsole.error(
            `[callIrisApiAsync] ${func_name} not found in ${className}Dispatch`
          );
          return new CallIrisApiResult(
            -NATIVE_RTC.ERROR_CODE_TYPE.ERR_FAILED,
            ""
          );
        }
      }
      return void 0;
    });
  }
  setEventHandler(event_handler) {
    console.log(`IrisRtcEngine setEventHandler ${event_handler}`);
    console.log(`IrisRtcEngine setEventHandler 3333 ${event_handler}`);
    this._eventHandler = event_handler;
  }
  setGenerateVideoTrackLabelOrHtmlElementCb(cb) {
    this._generateVideoTrackLabelOrHtmlElementCb = cb;
  }
  getEventHandler() {
    return this._eventHandler;
  }
  getVideoFrame(uid, channel_id) {
    return this.entitiesContainer.getVideoFrame(uid, channel_id);
  }
  getVideoFrameByConfig(config) {
    return this.entitiesContainer.getVideoFrameByConfig(config);
  }
  destruction() {
    this.agoraEventHandler.destruction();
    this.actionQueue.putAction({
      fun: (next) => {
        let process = () => __async(this, null, function* () {
          yield this.entitiesContainer.destruction();
          next();
        });
        setTimeout(process, 0);
      },
      args: []
    });
  }
  generateVideoTrackLabelOrHtmlElement(channelName, uid, type) {
    if (this._generateVideoTrackLabelOrHtmlElementCb) {
      return this._generateVideoTrackLabelOrHtmlElementCb(
        channelName,
        uid,
        type
      );
    }
    return channelName + "_" + uid + "_" + type;
  }
  dispose() {
    this.destruction();
    return Promise.resolve();
  }
};

// src/IrisRtcApi.ts
function initIrisRtc(irisApiEngine) {
  irisApiEngine.addApiInterceptor(
    new IrisRtcEngine(irisApiEngine.getIrisEventHandlerManager())
  );
}
var AgoraWrapper = {
  initIrisRtc
};

export { AgoraActionQueue, AgoraConsole, AgoraTool, AgoraTranslate, AgoraWrapper, Container, initIrisRtc };
