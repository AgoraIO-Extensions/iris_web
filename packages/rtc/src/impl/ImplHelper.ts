import * as NATIVE_RTC from '@iris/web-rtc';
import AgoraRTC, {
  CameraVideoTrackInitConfig,
  ClientConfig,
  EncryptionMode,
  IAgoraRTCClient,
  ICameraVideoTrack,
  ILocalAudioTrack,
  ILocalVideoTrack,
  IMicrophoneAudioTrack,
  MicrophoneAudioTrackInitConfig,
  ScreenVideoTrackInitConfig,
  VideoPlayerConfig,
} from 'agora-rtc-sdk-ng';

import {
  IrisAudioSourceType,
  IrisClientType,
  IrisVideoSourceType,
} from '../base/BaseType';
import { IrisRtcEngine } from '../engine/IrisRtcEngine';
import { IrisGlobalVariables } from '../states/IrisGlobalVariables';
import { AgoraConsole } from '../util/AgoraConsole';
import { AgoraTranslate } from '../util/AgoraTranslate';

export class ImplHelper {
  public static async getOrCreateAudioAndVideoTrackAsync(
    engine: IrisRtcEngine,
    audioType: IrisAudioSourceType,
    videoType: IrisVideoSourceType,
    clientType: IrisClientType,
    connection: NATIVE_RTC.RtcConnection
  ): Promise<[ILocalAudioTrack, ILocalVideoTrack]> {
    if (
      audioType == IrisAudioSourceType.kAudioSourceTypeUnknow &&
      videoType == IrisVideoSourceType.kVideoSourceTypeUnknown
    ) {
      AgoraConsole.warn(
        'getOrCreateAudioAndVideoTrack  audio and video both unknow '
      );
      return [null, null];
    }

    if (
      videoType == IrisVideoSourceType.kVideoSourceTypeScreenPrimary &&
      audioType == IrisAudioSourceType.kAudioSourceTypeScreenPrimary
    ) {
      let audioPackage = engine.entitiesContainer.getLocalAudioTrackByType(
        audioType
      );
      let videoPackage = engine.entitiesContainer.getLocalVideoTrackByType(
        videoType
      );
      if (audioPackage && videoPackage) {
        return [
          audioPackage.track as ILocalAudioTrack,
          videoPackage.track as ILocalVideoTrack,
        ];
      } else {
        //屏幕共享 audio 和 video 应该要同步创建和同步销毁
        if (audioPackage) {
          await engine.entitiesContainer.audioTrackWillClose(
            audioPackage.track as ILocalAudioTrack
          );
          (audioPackage.track as ILocalAudioTrack).close();
        }
        if (videoPackage) {
          await engine.entitiesContainer.videoTrackWillClose(
            videoPackage.track as ILocalVideoTrack
          );
          (videoPackage.track as ILocalVideoTrack).close();
        }

        let trackArray: [ILocalVideoTrack, ILocalAudioTrack] = null;
        let audioTrack: ILocalAudioTrack = null;
        let videoTrack: ILocalVideoTrack = null;
        try {
          let conf: ScreenVideoTrackInitConfig = this.generateScreenVideoTrackInitConfig(
            engine
          );
          trackArray = await AgoraRTC.createScreenVideoTrack(conf, 'enable');
        } catch (e) {
          AgoraConsole.error('createScreenVideoTrack with audio failed');
          e && AgoraConsole.log(e);
        }
        if (trackArray) {
          //每一个track都可能是null
          audioTrack = trackArray[1];
          if (audioTrack) {
            this.processSceneShareAuidoTrack(engine, audioTrack, clientType);
            engine.entitiesContainer.addLocalAudioTrack({
              type: audioType,
              track: audioTrack,
            });
          }

          videoTrack = trackArray[0];
          if (videoTrack) {
            this.processSceneShareVideoTrack(
              engine,
              videoTrack,
              clientType,
              videoType
            );
            engine.entitiesContainer.addLocalVideoTrack({
              type: videoType,
              track: videoTrack,
            });
          }
        }
        return [audioTrack, videoTrack];
      }
    }

    let retAudioTrack: ILocalAudioTrack = null;
    let retVideoTrack: ILocalVideoTrack = null;
    //video
    if (engine.entitiesContainer.getLocalVideoTrackByType(videoType)) {
      retVideoTrack = engine.entitiesContainer.getLocalVideoTrackByType(
        videoType
      ).track as ILocalVideoTrack;
    } else if (
      videoType == IrisVideoSourceType.kVideoSourceTypeScreenPrimary ||
      videoType == IrisVideoSourceType.kVideoSourceTypeScreenSecondary
    ) {
      let videoTrack: ILocalVideoTrack = null;
      try {
        let conf: ScreenVideoTrackInitConfig = this.generateScreenVideoTrackInitConfig(
          engine
        );
        videoTrack = await AgoraRTC.createScreenVideoTrack(conf, 'disable');
      } catch (e) {
        AgoraConsole.error('createScreenVideoTrack failed');
        e && AgoraConsole.log(e);
      }
      if (videoTrack) {
        //这里的videoTrack有可能是null, 如果promise创建失败的话
        this.processSceneShareVideoTrack(
          engine,
          videoTrack,
          clientType,
          videoType
        );
        engine.entitiesContainer.addLocalVideoTrack({
          type: videoType,
          track: videoTrack,
        });
      }
      retVideoTrack = videoTrack;
    } else if (
      videoType == IrisVideoSourceType.kVideoSourceTypeCameraPrimary ||
      videoType == IrisVideoSourceType.kVideoSourceTypeCameraSecondary
    ) {
      let videoTrack: ICameraVideoTrack = null;
      try {
        let videoConfig: CameraVideoTrackInitConfig = this.generateCameraVideoTrackInitConfig(
          engine
        );
        videoTrack = await AgoraRTC.createCameraVideoTrack(videoConfig);

        console.log(`createCameraVideoTrack 11111111 ${videoType}`);
      } catch (e) {
        AgoraConsole.error('createCameraVideoTrack failed');
        e && AgoraConsole.log(e);
      }
      if (videoTrack) {
        console.log(`createCameraVideoTrack 2222222 ${videoType}`);
        //video 可能为null
        this.processVideoTrack(
          engine,
          videoTrack,
          clientType,
          videoType,
          connection
        );
        engine.entitiesContainer.addLocalVideoTrack({
          type: videoType,
          track: videoTrack,
        });
      }
      retVideoTrack = videoTrack;
    }

    //audio
    if (engine.entitiesContainer.getLocalAudioTrackByType(audioType)) {
      retAudioTrack = engine.entitiesContainer.getLocalAudioTrackByType(
        audioType
      ).track as ILocalAudioTrack;
    } else if (
      audioType == IrisAudioSourceType.kAudioSourceTypeMicrophonePrimary
    ) {
      let audioTrack: IMicrophoneAudioTrack = null;
      try {
        let audioConfig: MicrophoneAudioTrackInitConfig = this.generateMicrophoneAudioTrackInitConfig(
          engine
        );
        let audioTrack = await AgoraRTC.createMicrophoneAudioTrack(audioConfig);
      } catch (e) {
        AgoraConsole.error('createMicrophoneAudioTrack failed');
        e && AgoraConsole.log(e);
      }
      if (audioTrack) {
        this.processAudioTrack(engine, audioTrack, clientType);
        engine.entitiesContainer.addLocalAudioTrack({
          type: audioType,
          track: audioTrack,
        });
      }
      retAudioTrack = audioTrack;
    }

    return [retAudioTrack, retVideoTrack];
  }

  //当一个audioTrack被创建的时候，要拆解这些参数
  public static processSceneShareAuidoTrack(
    engine: IrisRtcEngine,
    audioTrack: ILocalAudioTrack,
    type: IrisClientType
  ) {
    let globalVariables = engine.globalVariables;
    let mainClientVariables = engine.mainClientVariables;

    //audio
    if (mainClientVariables.playbackDeviceId) {
      audioTrack
        .setPlaybackDevice(mainClientVariables.playbackDeviceId)
        .then(() => {})
        .catch((reason) => {
          AgoraConsole.error('audiotrack setPlaybackDevice failed');
          reason && AgoraConsole.error(reason);
        })
        .finally(() => {});
    }
    if (globalVariables.enabledAudio) {
      audioTrack.play();
    }
    if (globalVariables.pausedAudio) {
      audioTrack
        .setEnabled(false)
        .then(() => {})
        .catch((reason) => {
          AgoraConsole.error('audio track setEnabled failed');
          reason && AgoraConsole.error(reason);
        })
        .finally(() => {});
    }

    if (globalVariables.mutedLocalAudioStream) {
      audioTrack
        .setMuted(true)
        .then(() => {})
        .catch((reason) => {
          AgoraConsole.error('audio track setMuted failed');
          reason && AgoraConsole.error(reason);
        })
        .finally(() => {});
    }
  }

  public static processSceneShareVideoTrack(
    engine: IrisRtcEngine,
    videoTrack: ILocalVideoTrack,
    type: IrisClientType,
    videoSource: IrisVideoSourceType
  ) {
    let globalVariables = engine.globalVariables;
    let mainClientVariables = engine.mainClientVariables;

    if (mainClientVariables.videoDeviceId) {
      //屏幕共享视频没有设备id咯
    }

    if (globalVariables.enabledVideo) {
      videoTrack.play(
        engine.generateVideoTrackLabelOrHtmlElement('0', 0, videoSource)
      );
    }

    if (globalVariables.pausedVideo) {
      videoTrack
        .setEnabled(false)
        .then(() => {})
        .catch((reason) => {
          AgoraConsole.error('video track setEnabled failed');
          reason && AgoraConsole.error(reason);
        })
        .finally(() => {});
    }
    if (globalVariables.mutedLocalVideoStream) {
      videoTrack
        .setMuted(true)
        .then(() => {})
        .catch((reason) => {
          AgoraConsole.error('video track setMuted failed');
          reason && AgoraConsole.error(reason);
        })
        .finally(() => {});
    }
  }

  public static processAudioTrack(
    engine: IrisRtcEngine,
    audioTrack: IMicrophoneAudioTrack,
    type: IrisClientType
  ) {
    let globalVariables = engine.globalVariables;
    //这里play的话，自己会听到自己的声音,
    // if (globalVariables.enabledAudio) {
    //     // audioTrack.play();
    // }
    if (globalVariables.pausedAudio) {
      audioTrack
        .setEnabled(false)
        .then(() => {})
        .catch((reason) => {
          AgoraConsole.error('audioTrack setEnable failed');
          reason && AgoraConsole.error(reason);
        });
    }
    if (globalVariables.mutedLocalAudioStream) {
      audioTrack
        .setMuted(true)
        .then(() => {})
        .catch((reason) => {
          AgoraConsole.error('audioTrack setMuted failed');
          reason && AgoraConsole.error(reason);
        });
    }
  }

  public static processVideoTrack(
    engine: IrisRtcEngine,
    videoTrack: ICameraVideoTrack,
    type: IrisClientType,
    videoSource: IrisVideoSourceType,
    connection: NATIVE_RTC.RtcConnection
  ) {
    let globalVariables = engine.globalVariables;
    if (globalVariables.enabledVideo) {
      let config: VideoPlayerConfig = {};

      let videoEncoderConfiguration: NATIVE_RTC.VideoEncoderConfiguration = null;
      if (type == IrisClientType.kClientMian) {
        videoEncoderConfiguration =
          engine.mainClientVariables.videoEncoderConfiguration;
      } else {
        videoEncoderConfiguration = engine.subClientVariables.videoEncoderConfigurations.getT(
          connection.channelId,
          connection.localUid
        );
      }

      if (videoEncoderConfiguration) {
        config.mirror = AgoraTranslate.NATIVE_RTCVIDEO_MIRROR_MODE_TYPE2boolean(
          videoEncoderConfiguration.mirrorMode
        );
      }

      // videoTrack.play(engine.generateVideoTrackLabelOrHtmlElement("0", 0, videoSource), config);
    }

    if (globalVariables.pausedVideo) {
      videoTrack
        .setEnabled(false)
        .then(() => {})
        .catch((reason) => {
          AgoraConsole.error('audioTrack setMuted failed');
          reason && AgoraConsole.error(reason);
        });
    }
    if (globalVariables.mutedLocalVideoStream) {
      videoTrack
        .setMuted(true)
        .then(() => {})
        .catch((reason) => {
          AgoraConsole.error('audioTrack setMuted failed');
          reason && AgoraConsole.error(reason);
        });
    }
  }

  public static createMainClient(engine: IrisRtcEngine): IAgoraRTCClient {
    let config: ClientConfig = this.generateMainClientConfig(engine);
    let mainClient: IAgoraRTCClient = AgoraRTC.createClient(config);

    let mainClientVariables = engine.mainClientVariables;
    //设置远端默认是 大流还是小流
    if (mainClientVariables.remoteDefaultVideoStreamType != null) {
      mainClient
        .setRemoteDefaultVideoStreamType(
          AgoraTranslate.NATIVE_RTCVIDEO_STREAM_TYPE2RemoteStreamType(
            mainClientVariables.remoteDefaultVideoStreamType
          )
        )
        .then(() => {})
        .catch(() => {})
        .finally(() => {});
    }
    //设置指定的远端uid具体是大流还是小流
    for (let e of mainClientVariables.remoteVideoStreamTypes) {
      mainClient
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
    if (mainClientVariables.publishCameraTrack == true) {
      videoSourceType =
        NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA_PRIMARY;
    } else if (mainClientVariables.publishSecondaryCameraTrack == true) {
      videoSourceType =
        NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA_SECONDARY;
    } else if (mainClientVariables.publishScreenCaptureVideo == true) {
      videoSourceType =
        NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_SCREEN_PRIMARY;
    }

    //如果当前轨道被特别指定了，那么就设置一下
    if (mainClientVariables.enabledDualStreamModes.has(videoSourceType)) {
      let steamMode = mainClientVariables.enabledDualStreamModes.get(
        videoSourceType
      );
      if (steamMode.enabled) {
        mainClient
          .enableDualStream()
          .then(() => {})
          .catch(() => {})
          .finally(() => {});

        if (steamMode.streamConfig != null) {
          mainClient.setLowStreamParameter(
            AgoraTranslate.NATIVE_RTCSimulcastStreamConfig2LowStreamParameter(
              steamMode.streamConfig
            )
          );
        }
      } else {
        mainClient
          .disableDualStream()
          .then(() => {})
          .catch(() => {})
          .finally(() => {});
      }
    } else {
      if (mainClientVariables.enabledDualStreamMode) {
        mainClient
          .enableDualStream()
          .then(() => {})
          .catch(() => {})
          .finally(() => {});
      }
    }

    //设置是否报告说话的人
    if (mainClientVariables.enabledAudioVolumeIndication) {
      mainClient.enableAudioVolumeIndicator();
      mainClientVariables.enabledAudioVolumeIndication = null;
    }

    //是否开启了加密
    if (mainClientVariables.encryptionConfig?.enabled) {
      let config: NATIVE_RTC.EncryptionConfig =
        mainClientVariables.encryptionConfig.config;
      let encryptionMode: EncryptionMode = AgoraTranslate.NATIVE_RTCENCRYPTION_MODE2EncryptionMode(
        config.encryptionMode
      );
      let salt: Uint8Array = new Uint8Array(config.encryptionKdfSalt);
      mainClient.setEncryptionConfig(
        encryptionMode,
        config.encryptionKey,
        salt
      );
      //加密只有一次生效
      mainClientVariables.encryptionConfig.enabled = false;
    }

    //是否开启了鉴黄
    if (mainClientVariables.contentInspect != null) {
      mainClient
        .enableContentInspect(
          AgoraTranslate.NATIVE_RTCContentInspectConfig2InspectConfiguration(
            mainClientVariables.contentInspect
          )
        )
        .then(() => {})
        .catch(() => {})
        .finally(() => {});
    }

    let globalVariables: IrisGlobalVariables = engine.globalVariables;

    //是否开启了cloudProxy
    if (globalVariables.cloudProxy != null) {
      let proxyType = globalVariables.cloudProxy;
      if (proxyType == NATIVE_RTC.CLOUD_PROXY_TYPE.UDP_PROXY) {
        mainClient.startProxyServer(3);
      } else if (proxyType == NATIVE_RTC.CLOUD_PROXY_TYPE.TCP_PROXY) {
        mainClient.startProxyServer(5);
      }
    }
    return mainClient;
  }

  public static createSubClient(
    engine: IrisRtcEngine,
    connection: NATIVE_RTC.RtcConnection
  ): IAgoraRTCClient {
    let config: ClientConfig = this.generateSubClientConfig(engine, connection);
    let subClient: IAgoraRTCClient = AgoraRTC.createClient(config);
    let subClientVariables = engine.subClientVariables;

    //设置远端默认是 大流还是小流
    // if (subClientVariables.remoteDefaultVideoStreamType != null) {
    //     subClient.setRemoteDefaultVideoStreamType(AgoraTranslate.NATIVE_RTCVIDEO_STREAM_TYPE2RemoteStreamType(mainClientVariables.remoteDefaultVideoStreamType))
    //         .then(() => {

    //         })
    //         .catch(() => {

    //         })
    //         .finally(() => {

    //         })
    // }
    //设置指定的远端uid具体是大流还是小流
    let remoteVideoStreamTypes = subClientVariables.remoteVideoStreamTypes.getT(
      connection.channelId,
      connection.localUid
    );
    if (remoteVideoStreamTypes)
      for (let e of remoteVideoStreamTypes) {
        subClient
          .setRemoteVideoStreamType(
            e[0],
            AgoraTranslate.NATIVE_RTCVIDEO_STREAM_TYPE2RemoteStreamType(e[1])
          )
          .then(() => {})
          .catch(() => {})
          .finally(() => {});
      }

    //
    let options = subClientVariables.channelMediaOptions.getT(
      connection.channelId,
      connection.localUid
    );
    let videoSourceType: NATIVE_RTC.VIDEO_SOURCE_TYPE =
      NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_UNKNOWN;
    if (options) {
      if (options.publishCameraTrack == true) {
        videoSourceType =
          NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA_PRIMARY;
      } else if (options.publishSecondaryCameraTrack == true) {
        videoSourceType =
          NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA_SECONDARY;
      } else if (options.publishScreenCaptureVideo == true) {
        videoSourceType =
          NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_SCREEN_PRIMARY;
      }
    }

    //如果当前轨道被特别指定了，那么就设置一下
    let enabledDualStreamModes = subClientVariables.enabledDualStreamModes.getT(
      connection.channelId,
      connection.localUid
    );
    if (enabledDualStreamModes && enabledDualStreamModes.has(videoSourceType)) {
      let steamMode = enabledDualStreamModes.get(videoSourceType);
      if (steamMode.enabled) {
        subClient
          .enableDualStream()
          .then(() => {})
          .catch(() => {})
          .finally(() => {});

        if (steamMode.streamConfig != null) {
          subClient.setLowStreamParameter(
            AgoraTranslate.NATIVE_RTCSimulcastStreamConfig2LowStreamParameter(
              steamMode.streamConfig
            )
          );
        }
      } else {
        subClient
          .disableDualStream()
          .then(() => {})
          .catch(() => {})
          .finally(() => {});
      }
    }

    //设置是否报告说话的人
    let enabledAudioVolumeIndication = subClientVariables.enabledAudioVolumeIndications.getT(
      connection.channelId,
      connection.localUid
    );
    if (enabledAudioVolumeIndication) {
      subClient.enableAudioVolumeIndicator();
      subClientVariables.enabledAudioVolumeIndications.removeT(
        connection.channelId,
        connection.localUid
      );
    }

    //是否开启了加密
    let encryptionConfig = subClientVariables.encryptionConfigs.getT(
      connection.channelId,
      connection.localUid
    );
    if (encryptionConfig?.enabled) {
      let config: NATIVE_RTC.EncryptionConfig = encryptionConfig.config;
      let encryptionMode: EncryptionMode = AgoraTranslate.NATIVE_RTCENCRYPTION_MODE2EncryptionMode(
        config.encryptionMode
      );
      let salt: Uint8Array = new Uint8Array(config.encryptionKdfSalt);
      subClient.setEncryptionConfig(encryptionMode, config.encryptionKey, salt);
      //加密只有一次生效
      subClientVariables.encryptionConfigs.removeT(
        connection.channelId,
        connection.localUid
      );
    }

    //是否开启了鉴黄
    // if (mainClientVariables.contentInspect != null) {
    //     subClient.enableContentInspect(AgoraTranslate.NATIVE_RTCContentInspectConfig2InspectConfiguration(mainClientVariables.contentInspect))
    //         .then(() => {

    //         })
    //         .catch(() => {

    //         })
    //         .finally(() => {

    //         })
    // }

    // let globalVariables: IrisGlobalVariables = engine.globalVariables;

    //是否开启了cloudProxy
    // if (globalVariables.cloudProxy != null) {
    //     let proxyType = globalVariables.cloudProxy;
    //     if (proxyType == NATIVE_RTC.CLOUD_PROXY_TYPE.UDP_PROXY) {
    //         subClient.startProxyServer(3);
    //     }
    //     else if (proxyType == NATIVE_RTC.CLOUD_PROXY_TYPE.TCP_PROXY) {
    //         subClient.startProxyServer(5);
    //     }
    // }
    return subClient;
  }

  public static generateMicrophoneAudioTrackInitConfig(
    engine: IrisRtcEngine
  ): MicrophoneAudioTrackInitConfig {
    let audioConfig: MicrophoneAudioTrackInitConfig = {};
    if (engine.mainClientVariables.recordingDeviceId) {
      audioConfig.microphoneId = engine.mainClientVariables.recordingDeviceId;
    }
    return audioConfig;
  }

  public static generateCameraVideoTrackInitConfig(
    engine: IrisRtcEngine
  ): CameraVideoTrackInitConfig {
    let videoConfig: CameraVideoTrackInitConfig = {};
    if (engine.mainClientVariables.videoDeviceId) {
      videoConfig.cameraId = engine.mainClientVariables.videoDeviceId;
    }
    if (engine.globalVariables.videoEncoderConfiguration) {
      videoConfig.encoderConfig = AgoraTranslate.NATIVE_RTCVideoEncoderConfiguration2VideoEncoderConfiguration(
        engine.globalVariables.videoEncoderConfiguration
      );
    }
    if (engine.globalVariables.cameraDirection) {
      videoConfig.facingMode = AgoraTranslate.NATIVE_RTCCAMERA_DIRECTION2string(
        engine.globalVariables.cameraDirection
      );
    }

    return videoConfig;
  }

  public static generateScreenVideoTrackInitConfig(
    engine: IrisRtcEngine
  ): ScreenVideoTrackInitConfig {
    let conf: ScreenVideoTrackInitConfig = {};
    let globalVariables: IrisGlobalVariables = engine.globalVariables;
    if (
      globalVariables.screenCaptureContentHint != null &&
      globalVariables.screenCaptureContentHint !=
        NATIVE_RTC.VIDEO_CONTENT_HINT.CONTENT_HINT_NONE
    ) {
      conf.optimizationMode = AgoraTranslate.NATIVE_RTCVIDEO_CONTENT_HINT2string(
        globalVariables.screenCaptureContentHint
      );
    }

    if (globalVariables.screenCaptureParameters != null) {
      conf.encoderConfig = AgoraTranslate.NATIVE_RTCScreenCaptureParameters2VideoEncoderConfiguration(
        globalVariables.screenCaptureParameters
      );
    } else if (globalVariables.videoEncoderConfiguration != null) {
      conf.encoderConfig = AgoraTranslate.NATIVE_RTCVideoEncoderConfiguration2VideoEncoderConfiguration(
        globalVariables.videoEncoderConfiguration
      );
    }
    return conf;
  }

  //根据保存的中间状态，生成ClientConfig
  public static generateMainClientConfig(engine: IrisRtcEngine): ClientConfig {
    let mainClientVariables = engine.mainClientVariables;
    let config: ClientConfig = {
      codec:
        mainClientVariables.videoEncoderConfiguration != null
          ? AgoraTranslate.NATIVE_RTCVIDEO_CODEC_TYPE2SDK_CODEC(
              mainClientVariables.videoEncoderConfiguration.codecType
            )
          : 'vp8',
      mode:
        mainClientVariables.channelProfile != null
          ? AgoraTranslate.NATIVE_RTCCHANNEL_PROFILE_TYPE2SDK_MODE(
              mainClientVariables.channelProfile
            )
          : 'rtc',
    };
    if (mainClientVariables.clientRoleType != null) {
      config.role = AgoraTranslate.NATIVE_RTCCLIENT_ROLE_TYPE2ClientRole(
        mainClientVariables.clientRoleType
      );
    }
    if (mainClientVariables.clientRoleOptions != null) {
      config.clientRoleOptions = AgoraTranslate.NATIVE_RTCClientRoleOptions2ClientRoleOptions(
        mainClientVariables.clientRoleOptions
      );
    }
    return config;
  }

  public static generateSubClientConfig(
    engine: IrisRtcEngine,
    connection: NATIVE_RTC.RtcConnection
  ): ClientConfig {
    let subClientVariables = engine.subClientVariables;
    let videoEncoderConfiguration = subClientVariables.videoEncoderConfigurations.getT(
      connection.channelId,
      connection.localUid
    );
    let options = subClientVariables.channelMediaOptions.getT(
      connection.channelId,
      connection.localUid
    );
    let channelProfile = options?.channelProfile;
    let clientRoleType = options?.clientRoleType;
    let config: ClientConfig = {
      codec:
        videoEncoderConfiguration != null
          ? AgoraTranslate.NATIVE_RTCVIDEO_CODEC_TYPE2SDK_CODEC(
              videoEncoderConfiguration.codecType
            )
          : 'vp8',
      mode:
        channelProfile != null
          ? AgoraTranslate.NATIVE_RTCCHANNEL_PROFILE_TYPE2SDK_MODE(
              channelProfile
            )
          : 'rtc',
    };
    if (clientRoleType != null) {
      config.role = AgoraTranslate.NATIVE_RTCCLIENT_ROLE_TYPE2ClientRole(
        clientRoleType
      );
    }
    // if (mainClientVariables.clientRoleOptions != null) {
    //     config.clientRoleOptions = AgoraTranslate.NATIVE_RTCClientRoleOptions2ClientRoleOptions(mainClientVariables.clientRoleOptions);
    // }
    return config;
  }

  public static pretreatmentChannelMediaRelayConfiguration(
    engine: IrisRtcEngine,
    conf: NATIVE_RTC.ChannelMediaRelayConfiguration
  ) {
    //在这里0表示自己
    let mainClientUid = engine.entitiesContainer.getMainClient()?.uid || 0;

    for (let e of conf.srcInfo) {
      if (e.uid == 0) {
        e.uid = mainClientUid as number;
      }
    }

    for (let e of conf.destInfos) {
      if (e.uid == 0) {
        e.uid = mainClientUid as number;
      }
    }
  }

  public static async enumerateDevices(
    engine: IrisRtcEngine
  ): Promise<{
    playbackDevices: NATIVE_RTC.DeviceInfo[];
    recordingDevices: NATIVE_RTC.DeviceInfo[];
    videoDevices: NATIVE_RTC.DeviceInfo[];
  }> {
    let info = await AgoraRTC.getDevices();
    let playbackDevices: any[] = [];
    let recordingDevices: any[] = [];
    let videoDevices: any[] = [];
    for (let e of info) {
      if (e.kind == 'audiooutput') {
        playbackDevices.push({
          deviceId: e.deviceId,
          deviceName: e.label,
        });
      } else if (e.kind == 'audioinput') {
        recordingDevices.push({
          deviceId: e.deviceId,
          deviceName: e.label,
        });
      } else if (e.kind == 'videoinput') {
        videoDevices.push({
          deviceId: e.deviceId,
          deviceName: e.label,
        });
      }
    }

    engine.globalVariables.playbackDevices = playbackDevices;
    engine.globalVariables.recordingDevices = recordingDevices;
    engine.globalVariables.videoDevices = videoDevices;
    engine.globalVariables.deviceEnumerated = true;
    return {
      playbackDevices: playbackDevices,
      recordingDevices: recordingDevices,
      videoDevices: videoDevices,
    };
  }
}
