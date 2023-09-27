import * as NATIVE_RTC from '@iris/native-rtc-binding';
import {
  ClientConfig,
  EncryptionMode,
  IAgoraRTCClient,
  IAgoraRTCRemoteUser,
  IBufferSourceAudioTrack,
  ILocalAudioTrack,
  ILocalVideoTrack,
  ITrack,
} from 'agora-rtc-sdk-ng';

import { CallIrisApiResult } from 'iris-web-core';
import {
  AudioTrackPackage,
  BufferSourceAudioTrackPackage,
  VideoTrackPackage,
} from 'src/base/BaseType';

import { IrisTrackEventHandler } from 'src/event_handler/IrisTrackEventHandler';

import { IrisClientEventHandler } from '../event_handler/IrisClientEventHandler';

import { IrisClientVariables } from '../states/IrisClientVariables';
import { AgoraConsole, AgoraTranslate } from '../util';

import { IrisRtcEngine } from './IrisRtcEngine';

export enum IrisClientType {
  MAIN,
  SUB,
}

export class IrisClient {
  clientType: IrisClientType;
  agoraRTCClient: IAgoraRTCClient;
  _engine: IrisRtcEngine;
  irisClientVariables: IrisClientVariables;
  clientEventHandler: IrisClientEventHandler;

  localAudioTracks: Array<AudioTrackPackage> = new Array<AudioTrackPackage>();
  localBufferSourceAudioTracks: Array<
    BufferSourceAudioTrackPackage
  > = new Array<BufferSourceAudioTrackPackage>();
  localVideoTrack: VideoTrackPackage = null;
  trackEventHandlers: Array<IrisTrackEventHandler> = new Array<
    IrisTrackEventHandler
  >();

  //connection
  connection: NATIVE_RTC.RtcConnection;

  constructor(
    engine: IrisRtcEngine,
    clientType = IrisClientType.SUB,
    connection?: NATIVE_RTC.RtcConnection
  ) {
    this.clientType = clientType;
    this._engine = engine;
    this.irisClientVariables = new IrisClientVariables();
    if (this.clientType === IrisClientType.MAIN) {
      this._engine.entitiesContainer.setMainIrisClient(this);
    } else {
      this.connection = connection;
    }

    this._engine.entitiesContainer.irisClientList.push(this);
  }

  setClientConfig(): ClientConfig {
    let irisClientVariables = this.irisClientVariables;
    let config: ClientConfig = {
      codec:
        irisClientVariables.videoEncoderConfiguration != null
          ? AgoraTranslate.NATIVE_RTCVIDEO_CODEC_TYPE2SDK_CODEC(
              irisClientVariables.videoEncoderConfiguration.codecType
            )
          : 'vp8',
      mode: irisClientVariables.channelProfile
        ? AgoraTranslate.NATIVE_RTC_CHANNEL_PROFILE_TYPE2SDK_MODE(
            irisClientVariables.channelProfile
          )
        : 'live',
    };
    if (irisClientVariables.clientRoleType != null) {
      config.role = AgoraTranslate.NATIVE_RTC_CLIENT_ROLE_TYPE2ClientRole(
        irisClientVariables.clientRoleType
      );
    }
    if (irisClientVariables.clientRoleOptions != null) {
      config.clientRoleOptions = AgoraTranslate.NATIVE_RTCClientRoleOptions2ClientRoleOptions(
        irisClientVariables.clientRoleOptions
      );
    }
    return config;
  }

  createClient(options: NATIVE_RTC.ChannelMediaOptions) {
    if (this._engine.entitiesContainer.mainIrisClient.agoraRTCClient) {
      let errorMsg =
        'already has main agoraRTCClient client, please use joinChannelEx';
      throw errorMsg;
    }

    if (options) {
      this.irisClientVariables.mergeChannelMediaOptions(options);
    }

    let irisClientVariables = this.irisClientVariables;
    let globalVariables = this._engine.globalVariables;

    let config = this.setClientConfig();
    this.agoraRTCClient = this._engine.globalVariables.AgoraRTC.createClient(
      config
    );

    //设置远端默认是 大流还是小流
    if (irisClientVariables.remoteDefaultVideoStreamType != null) {
      this.agoraRTCClient
        .setRemoteDefaultVideoStreamType(
          AgoraTranslate.NATIVE_RTCVIDEO_STREAM_TYPE2RemoteStreamType(
            irisClientVariables.remoteDefaultVideoStreamType
          )
        )
        .then(() => {})
        .catch(() => {})
        .finally(() => {});
    }
    //设置指定的远端uid具体是大流还是小流
    for (let e of irisClientVariables.remoteVideoStreamTypes) {
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
    if (irisClientVariables.publishCameraTrack == true) {
      videoSourceType =
        NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA_PRIMARY;
    } else if (irisClientVariables.publishSecondaryCameraTrack == true) {
      videoSourceType =
        NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA_SECONDARY;
    } else if (irisClientVariables.publishScreenCaptureVideo == true) {
      videoSourceType =
        NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_SCREEN_PRIMARY;
    }

    //如果当前轨道被特别指定了，那么就设置一下
    if (irisClientVariables.enabledDualStreamModes.has(videoSourceType)) {
      let steamMode = irisClientVariables.enabledDualStreamModes.get(
        videoSourceType
      );
      if (steamMode.enabled) {
        this.agoraRTCClient
          .enableDualStream()
          .then(() => {})
          .catch(() => {})
          .finally(() => {});

        if (steamMode.streamConfig != null) {
          this.agoraRTCClient.setLowStreamParameter(
            AgoraTranslate.NATIVE_RTCSimulcastStreamConfig2LowStreamParameter(
              steamMode.streamConfig
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
      if (irisClientVariables.enabledDualStreamMode) {
        this.agoraRTCClient
          .enableDualStream()
          .then(() => {})
          .catch(() => {})
          .finally(() => {});
      }
    }

    //设置是否报告说话的人
    if (irisClientVariables.enabledAudioVolumeIndication) {
      this.agoraRTCClient.enableAudioVolumeIndicator();
      irisClientVariables.enabledAudioVolumeIndication = null;
    }

    //是否开启了加密
    if (irisClientVariables.encryptionConfig?.enabled) {
      let encryptionConfig: NATIVE_RTC.EncryptionConfig =
        irisClientVariables.encryptionConfig.config;
      let encryptionMode: EncryptionMode = AgoraTranslate.NATIVE_RTCENCRYPTION_MODE2EncryptionMode(
        encryptionConfig.encryptionMode
      );
      let salt: Uint8Array = new Uint8Array(encryptionConfig.encryptionKdfSalt);
      this.agoraRTCClient.setEncryptionConfig(
        encryptionMode,
        encryptionConfig.encryptionKey,
        salt
      );
      //加密只有一次生效
      irisClientVariables.encryptionConfig.enabled = false;
    }

    //是否开启了鉴黄
    if (irisClientVariables.contentInspect != null) {
      this.agoraRTCClient
        .enableContentInspect(
          AgoraTranslate.NATIVE_RTCContentInspectConfig2InspectConfiguration(
            irisClientVariables.contentInspect
          )
        )
        .then(() => {})
        .catch(() => {})
        .finally(() => {});
    }

    //是否开启了cloudProxy
    if (globalVariables.cloudProxy != null) {
      let proxyType = globalVariables.cloudProxy;
      if (proxyType == NATIVE_RTC.CLOUD_PROXY_TYPE.UDP_PROXY) {
        this.agoraRTCClient.startProxyServer(3);
      } else if (proxyType == NATIVE_RTC.CLOUD_PROXY_TYPE.TCP_PROXY) {
        this.agoraRTCClient.startProxyServer(5);
      }
    }

    this.clientEventHandler = new IrisClientEventHandler(this, this._engine);
  }

  addLocalAudioTrack(trackPackage: AudioTrackPackage) {
    this.localAudioTracks.push(trackPackage);
  }

  removeLocalAudioTrack(track: ILocalAudioTrack) {
    for (let i = 0; i < this.localAudioTracks.length; i++) {
      let trackPackage = this.localAudioTracks[i];
      if (trackPackage.track == track) {
        this.localAudioTracks.splice(i, 1);
        break;
      }
    }
  }

  addLocalBufferSourceAudioTrack(trackPackage: BufferSourceAudioTrackPackage) {
    this.localBufferSourceAudioTracks.push(trackPackage);
  }

  removeLocalBufferSourceAudioTrack(track: IBufferSourceAudioTrack) {
    for (let i = 0; i < this.localBufferSourceAudioTracks.length; i++) {
      let trackPackage = this.localBufferSourceAudioTracks[i];
      if (trackPackage.track == track) {
        this.localBufferSourceAudioTracks.splice(i, 1);
        break;
      }
    }
  }

  setLocalVideoTrack(trackPack: VideoTrackPackage) {
    if (!this.localVideoTrack) {
      this.localVideoTrack = trackPack;
    } else {
      if (trackPack.element) {
        this.localVideoTrack.element = trackPack.element;
      }
      if (trackPack.track) {
        this.localVideoTrack.track = trackPack.track;
      }
      if (trackPack.type) {
        this.localVideoTrack.type = trackPack.type;
      }
    }
  }

  clearLocalVideoTrack() {
    this.localVideoTrack = null;
  }

  addTrackEventHandler(trackEventHandler: IrisTrackEventHandler) {
    this.trackEventHandlers.push(trackEventHandler);
  }

  removeTrackEventHandlerByTrack(track: ITrack) {
    for (let i = 0; i < this.trackEventHandlers.length; i++) {
      let trackEventHandler = this.trackEventHandlers[i];
      if (trackEventHandler.getTrack() == track) {
        trackEventHandler.release();
        this.trackEventHandlers.splice(i, 1);
        break;
      }
    }
  }

  removetrackEventHandlerByRemoteUser(
    user: IAgoraRTCRemoteUser,
    mediaType: 'audio' | 'video' | 'all'
  ) {
    this.trackEventHandlers = this.trackEventHandlers.filter(
      (trackEventHandler: IrisTrackEventHandler) => {
        if (trackEventHandler.getRemoteUser() != user) return true;

        if (mediaType == 'all') {
          trackEventHandler.release();
          return false;
        }

        if (
          mediaType == 'audio' &&
          trackEventHandler.getTrackType() == 'IRemoteTrack'
        ) {
          trackEventHandler.release();
          return false;
        }

        if (
          mediaType == 'video' &&
          trackEventHandler.getTrackType() == 'IRemoteVideoTrack'
        ) {
          trackEventHandler.release();
          return false;
        }

        return true;
      }
    );
  }

  getLocalBufferSourceAudioTrackBySoundId(
    soundId: number
  ): BufferSourceAudioTrackPackage {
    for (let trackPack of this.localBufferSourceAudioTracks) {
      if (trackPack.soundId == soundId) {
        return trackPack;
      }
    }
    return null;
  }

  getLocalBufferSourceAudioTrackSoundIdByTrack(
    track: IBufferSourceAudioTrack
  ): number {
    for (let trackPack of this.localBufferSourceAudioTracks) {
      if (trackPack.track == track) {
        return trackPack.soundId;
      }
    }
    return null;
  }

  removeLocalBufferSourceAudioTrackBySoundId(soundId: number) {
    for (let i = 0; i < this.localBufferSourceAudioTracks.length; i++) {
      let trackPack = this.localBufferSourceAudioTracks[i];
      if (trackPack.soundId == soundId) {
        this.localBufferSourceAudioTracks.splice(i, 1);
        break;
      }
    }
  }

  removeLocalBufferSourceAudioTrackByTrack(track: IBufferSourceAudioTrack) {
    for (let i = 0; i < this.localBufferSourceAudioTracks.length; i++) {
      let trackPack = this.localBufferSourceAudioTracks[i];
      if (trackPack.track == track) {
        this.localBufferSourceAudioTracks.splice(i, 1);
        break;
      }
    }
  }

  async processBufferSourceAudioTrackClose(track: IBufferSourceAudioTrack) {
    //local
    this.removeLocalBufferSourceAudioTrackByTrack(track);

    this.removeLocalBufferSourceAudioTrack(track);
    this.removeTrackEventHandlerByTrack(track);
    if (
      this.agoraRTCClient &&
      this.agoraRTCClient.localTracks.indexOf(track) != -1
    ) {
      try {
        await this.agoraRTCClient.unpublish(track);
        AgoraConsole.log('unpublish success');
      } catch (e) {
        this._engine.returnResult(false);
        throw e;
      }
    }

    //删除完毕后进行stop,close
    track.stopProcessAudioBuffer();
    track.close();
  }

  //  当一个轨道将被close的时候。会去所有保存这个track， 以及trackEvent 的容器里去删除这个track. 并且停止发流 记住是所有哦
  async processAudioTrackClose(audioTrack: ILocalAudioTrack) {
    //main
    this.removeLocalAudioTrack(audioTrack);
    this.removeTrackEventHandlerByTrack(audioTrack);
    if (
      this.agoraRTCClient &&
      this.agoraRTCClient.localTracks.indexOf(audioTrack) != -1
    ) {
      try {
        await this.agoraRTCClient.unpublish(audioTrack);
        AgoraConsole.log('unpublish success');
      } catch (e) {
        AgoraConsole.error(e);
        Promise.resolve(
          new CallIrisApiResult(-NATIVE_RTC.ERROR_CODE_TYPE.ERR_FAILED, e)
        );
        throw e;
      }
    }

    //删除完毕后进行stop,close
    if (audioTrack.isPlaying) {
      audioTrack.stop();
    }
    audioTrack.close();
  }

  // 当一个轨道将被close的时候。会去所有保存这个track， 以及trackEvent 的容器里去删除这个track. 记住是所有哦
  async processVideoTrackClose(videoTrack: ILocalVideoTrack) {
    //main
    if (this.localVideoTrack?.track == videoTrack) {
      this.localVideoTrack = null;
    }
    this.removeTrackEventHandlerByTrack(videoTrack);
    if (
      this.agoraRTCClient &&
      this.agoraRTCClient.localTracks.indexOf(videoTrack) != -1
    ) {
      try {
        await this.agoraRTCClient.unpublish(videoTrack);
        AgoraConsole.log('unpublish success');
      } catch (e) {
        AgoraConsole.error(e);
        Promise.resolve(
          new CallIrisApiResult(-NATIVE_RTC.ERROR_CODE_TYPE.ERR_FAILED, e)
        );
        throw e;
      }
    }

    //删除完毕后进行stop,close
    if (videoTrack.isPlaying) {
      videoTrack.stop();
    }
    videoTrack.close();
  }

  async release() {
    //client event
    if (this.clientEventHandler) {
      this.clientEventHandler.release();
    }

    //trackEvent
    this.trackEventHandlers.forEach((element) => {
      element.release();
    });

    if (this.agoraRTCClient?.channelName) {
      try {
        await this.agoraRTCClient.leave();
        AgoraConsole.debug('client leave success');
      } catch (e) {
        throw e;
      }
    }

    this.agoraRTCClient = null;
  }
}
