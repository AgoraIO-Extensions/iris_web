import * as NATIVE_RTC from '@iris/native-rtc';
import {
  ClientConfig,
  EncryptionMode,
  IAgoraRTCClient,
} from 'agora-rtc-sdk-ng';

import { IrisClientEventHandler } from '../event_handler/IrisClientEventHandler';

import { IrisClientState } from '../state/IrisClientState';
import { AgoraConsole, AgoraTranslate } from '../util';

import { AudioTrackPackage, VideoTrackPackage } from './IrisClientManager';
import { IrisRtcEngine } from './IrisRtcEngine';

/**
 * 通过engine.initialize创建的client将会是默认的一个client
 * 默认固定在this._engine.irisClientManager.irisClientList[0]
 * engineEx.joinChannelEx不会使用,只有engine.joinChannel才会使用
 * 轨道发布在哪个channel不受此逻辑影响,轨道是否发布只看client的irisClientState配置来
 */

export class IrisClient {
  id: string;
  //agoraRTCClient only exist after joinChannel
  agoraRTCClient?: IAgoraRTCClient;
  _engine: IrisRtcEngine;
  irisClientState: IrisClientState;
  clientEventHandler: IrisClientEventHandler;

  audioTrackPackages: Array<AudioTrackPackage> = new Array<AudioTrackPackage>();
  videoTrackPackage?: VideoTrackPackage;

  connection: NATIVE_RTC.RtcConnection;

  constructor(engine: IrisRtcEngine, connection?: NATIVE_RTC.RtcConnection) {
    this._engine = engine;
    this.irisClientState = new IrisClientState(this._engine.globalState);
    if (connection) {
      this.connection = connection;
    } else {
      this.connection = {
        channelId: '',
        localUid: 0,
      };
    }
    this.id = `irisClient_${Math.floor(Math.random() * new Date().getTime())}`;
    this._engine.irisClientManager.irisClientList.push(this);
  }

  setClientConfig(): ClientConfig {
    let irisClientState = this.irisClientState;
    let config: ClientConfig = {
      codec: irisClientState.videoEncoderConfiguration?.codecType
        ? AgoraTranslate.NATIVE_RTCVIDEO_CODEC_TYPE2SDK_CODEC(
            irisClientState.videoEncoderConfiguration.codecType
          )
        : 'vp8',
      mode: irisClientState.channelProfile
        ? AgoraTranslate.NATIVE_RTC_CHANNEL_PROFILE_TYPE2SDK_MODE(
            irisClientState.channelProfile
          )
        : 'live',
    };
    if (irisClientState.clientRoleType != null) {
      config.role = AgoraTranslate.NATIVE_RTC_CLIENT_ROLE_TYPE2ClientRole(
        irisClientState.clientRoleType
      );
    }
    if (irisClientState.clientRoleOptions != null) {
      config.clientRoleOptions = AgoraTranslate.NATIVE_RTCClientRoleOptions2ClientRoleOptions(
        irisClientState.clientRoleOptions
      );
    }
    //如果调用过engine.setChannelProfile,整个频道的mode都将被这个值覆盖
    if (this._engine.globalState.channelProfile != null) {
      config.mode = AgoraTranslate.NATIVE_RTC_CHANNEL_PROFILE_TYPE2SDK_MODE(
        this._engine.globalState.channelProfile
      );
    }
    return config;
  }

  createClient(options: NATIVE_RTC.ChannelMediaOptions) {
    if (options) {
      this.irisClientState.mergeChannelMediaOptions(options);
    }

    let irisClientState = this.irisClientState;
    let globalState = this._engine.globalState;

    let config = this.setClientConfig();
    this.agoraRTCClient = this._engine.globalState.AgoraRTC.createClient(
      config
    );

    //设置远端默认是 大流还是小流
    if (irisClientState.remoteDefaultVideoStreamType !== 0) {
      this.agoraRTCClient
        .setRemoteDefaultVideoStreamType(
          AgoraTranslate.NATIVE_RTCVIDEO_STREAM_TYPE2RemoteStreamType(
            irisClientState.remoteDefaultVideoStreamType
          )
        )
        .then(() => {})
        .catch(() => {})
        .finally(() => {});
    }
    //设置指定的远端uid具体是大流还是小流
    for (let e of irisClientState.remoteVideoStreamTypes) {
      this.agoraRTCClient
        .setRemoteVideoStreamType(
          e[0],
          AgoraTranslate.NATIVE_RTCVIDEO_STREAM_TYPE2RemoteStreamType(e[1])
        )
        .then(() => {})
        .catch(() => {})
        .finally(() => {});
    }

    //
    let videoSourceType: NATIVE_RTC.VIDEO_SOURCE_TYPE;
    if (irisClientState.publishCameraTrack == true) {
      videoSourceType =
        NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA_PRIMARY;
    } else if (irisClientState.publishSecondaryCameraTrack == true) {
      videoSourceType =
        NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA_SECONDARY;
    } else if (irisClientState.publishScreenCaptureVideo == true) {
      videoSourceType =
        NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_SCREEN_PRIMARY;
    }

    //如果当前轨道被特别指定了，那么就设置一下
    if (irisClientState.enabledDualStreamModes.has(videoSourceType!)) {
      let streamMode = irisClientState.enabledDualStreamModes.get(
        videoSourceType!
      );
      if (streamMode?.enabled) {
        this.agoraRTCClient
          .enableDualStream()
          .then(() => {})
          .catch(() => {})
          .finally(() => {});

        if (streamMode.streamConfig != null) {
          this.agoraRTCClient.setLowStreamParameter(
            AgoraTranslate.NATIVE_RTCSimulcastStreamConfig2LowStreamParameter(
              streamMode.streamConfig
            )
          );
        }
      } else {
        this.agoraRTCClient
          .disableDualStream()
          .then(() => {})
          .catch(() => {})
          .finally(() => {});
      }
    } else {
      if (irisClientState.enabledDualStreamMode) {
        this.agoraRTCClient
          .enableDualStream()
          .then(() => {})
          .catch(() => {})
          .finally(() => {});
      }
    }

    //设置是否报告说话的人
    if (irisClientState.enabledAudioVolumeIndication) {
      this.agoraRTCClient.enableAudioVolumeIndicator();
    }

    //是否开启了加密
    if (irisClientState.encryptionConfig?.enabled) {
      let encryptionConfig: NATIVE_RTC.EncryptionConfig =
        irisClientState.encryptionConfig.config;
      let encryptionMode: EncryptionMode = AgoraTranslate.NATIVE_RTCENCRYPTION_MODE2EncryptionMode(
        encryptionConfig.encryptionMode!
      );
      let salt: Uint8Array = new Uint8Array(
        encryptionConfig.encryptionKdfSalt!
      );
      this.agoraRTCClient.setEncryptionConfig(
        encryptionMode,
        encryptionConfig.encryptionKey!,
        salt
      );
      //加密只有一次生效
      irisClientState.encryptionConfig.enabled = false;
    }

    //是否开启了鉴黄
    if (irisClientState.contentInspect != null) {
      this.agoraRTCClient
        .enableContentInspect(
          AgoraTranslate.NATIVE_RTCContentInspectConfig2InspectConfiguration(
            irisClientState.contentInspect
          )
        )
        .then(() => {})
        .catch(() => {})
        .finally(() => {});
    }

    //是否开启了cloudProxy
    if (globalState.cloudProxy != null) {
      let proxyType = globalState.cloudProxy;
      if (proxyType == NATIVE_RTC.CLOUD_PROXY_TYPE.UDP_PROXY) {
        this.agoraRTCClient.startProxyServer(3);
      } else if (proxyType == NATIVE_RTC.CLOUD_PROXY_TYPE.TCP_PROXY) {
        this.agoraRTCClient.startProxyServer(5);
      }
    }

    this.clientEventHandler = new IrisClientEventHandler(this, this._engine);
  }

  addLocalAudioTrack(trackPackage: AudioTrackPackage) {
    this.audioTrackPackages.push(trackPackage);
    trackPackage.irisClient = this;
  }

  removeLocalAudioTrack(trackPackage: AudioTrackPackage) {
    for (let i = 0; i < this.audioTrackPackages.length; i++) {
      let _trackPackage = this.audioTrackPackages[i];
      if (_trackPackage.track == trackPackage.track) {
        this.audioTrackPackages.splice(i, 1);
        i--;
        break;
      }
    }
  }

  setLocalVideoTrack(trackPackage: VideoTrackPackage) {
    this.videoTrackPackage = trackPackage;
    trackPackage.irisClient = this;
  }

  clearLocalVideoTrack() {
    this.videoTrackPackage?.dispose();
    this.videoTrackPackage = undefined;
  }

  async release() {
    //client event
    if (this.clientEventHandler) {
      this.clientEventHandler.release();
    }

    if (this.agoraRTCClient?.channelName) {
      try {
        await this._engine.clientHelper.leave(this.agoraRTCClient);
        AgoraConsole.debug('client leave success');
      } catch (e) {
        throw e;
      }
    }

    for (
      let i = 0;
      i < this._engine.irisClientManager.remoteUserPackages.length;
      i++
    ) {
      let remoteUserPackage = this._engine.irisClientManager.remoteUserPackages[
        i
      ];
      if (
        remoteUserPackage.connection?.channelId == this.connection?.channelId &&
        remoteUserPackage.connection?.localUid == this.connection?.localUid
      ) {
        this._engine.irisClientManager.removeRemoteUserPackage(
          remoteUserPackage.uid
        );
        i--;
      }
    }
    //不删除通过engine.initialize创建的client
    if (this._engine.irisClientManager.irisClientList[0]?.id !== this.id) {
      this._engine.irisClientManager.irisClientList = this._engine.irisClientManager.irisClientList.filter(
        (item) => item.id != this.id
      );
    }
    this.audioTrackPackages = [];
    this.connection = {
      channelId: '',
      localUid: 0,
    };
    this.videoTrackPackage = undefined;
    this.agoraRTCClient = undefined;
  }
}
