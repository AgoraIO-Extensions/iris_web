import * as NATIVE_RTC from '@iris/native-rtc-binding';
import {
  AgoraRTCErrorCode,
  BufferSourceAudioTrackInitConfig,
  CameraVideoTrackInitConfig,
  IBufferSourceAudioTrack,
  ICameraVideoTrack,
  ILocalAudioTrack,
  ILocalVideoTrack,
  IMicrophoneAudioTrack,
  MicrophoneAudioTrackInitConfig,
  ScreenVideoTrackInitConfig,
  VideoPlayerConfig,
} from 'agora-rtc-sdk-ng';

import { IrisAudioSourceType } from '../base/BaseType';

import { IrisRtcEngine } from '../engine/IrisRtcEngine';
import { IrisGlobalVariables } from '../states/IrisGlobalVariables';
import { AgoraConsole } from '../util/AgoraConsole';
import { AgoraTranslate } from '../util/AgoraTranslate';

export class ImplHelper {
  public static getAudioAndVideoTrack(
    engine: IrisRtcEngine,
    audioType: IrisAudioSourceType,
    videoType: NATIVE_RTC.VIDEO_SOURCE_TYPE,
    connection: NATIVE_RTC.RtcConnection
  ): [ILocalAudioTrack, ILocalVideoTrack] {
    let trackArray: [ILocalAudioTrack, ILocalVideoTrack] = [null, null];
    if (
      audioType == IrisAudioSourceType.kAudioSourceTypeUnknown &&
      videoType == NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_UNKNOWN
    ) {
      AgoraConsole.warn('getAudioAndVideoTrack  audio and video both unknown');
    }

    trackArray = [
      engine.entitiesContainer.getLocalAudioTrack(audioType, connection)
        ?.track as ILocalAudioTrack,
      engine.entitiesContainer.getLocalVideoTrack(videoType, connection)
        ?.track as ILocalVideoTrack,
    ];
    return trackArray;
  }

  public static async createBufferSourceAudioTrackAsync(
    engine: IrisRtcEngine,
    soundId: number,
    bufferSourceAudioTrackInitConfig: BufferSourceAudioTrackInitConfig,
    connection?: NATIVE_RTC.RtcConnection
  ): Promise<IBufferSourceAudioTrack> {
    let bufferSourceAudioTrack: IBufferSourceAudioTrack = null;
    let irisClient = engine.entitiesContainer.getIrisClient(connection);

    let bufferSourceAudioTrackPackage = irisClient.getLocalBufferSourceAudioTrackBySoundId(
      soundId
    );
    if (bufferSourceAudioTrackPackage) {
      throw `soundId:${bufferSourceAudioTrackPackage.soundId} already create`;
    }
    try {
      bufferSourceAudioTrack = await engine.globalVariables.AgoraRTC.createBufferSourceAudioTrack(
        bufferSourceAudioTrackInitConfig
      );
    } catch (e) {
      AgoraConsole.error('createBufferSourceAudioTrack failed');
      AgoraConsole.error(e);
    }
    if (bufferSourceAudioTrack) {
      //audio 可能为null
      // this.processAudioTrack(engine, bufferSourceAudioTrack, clientType);
      irisClient.addLocalBufferSourceAudioTrack({
        soundId: soundId,
        track: bufferSourceAudioTrack,
      });
    }

    return bufferSourceAudioTrack;
  }

  public static async getOrCreateCustomAudioAndVideoTrackAsync(
    engine: IrisRtcEngine,
    audioType: IrisAudioSourceType,
    videoType: NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CUSTOM,
    mediaStreamTrack: MediaStreamTrack,
    connection: NATIVE_RTC.RtcConnection
  ): Promise<[ILocalAudioTrack, ILocalVideoTrack]> {
    let irisClient = engine.entitiesContainer.getIrisClient(connection);
    let retAudioTrack: ILocalAudioTrack = null;
    let retVideoTrack: ILocalVideoTrack = engine.entitiesContainer.getLocalVideoTrack(
      videoType,
      connection
    )?.track as ILocalVideoTrack;
    //video
    if (!retVideoTrack) {
      let videoTrack: ILocalVideoTrack = null;
      try {
        videoTrack = engine.globalVariables.AgoraRTC.createCustomVideoTrack({
          mediaStreamTrack,
        });
      } catch (e) {
        AgoraConsole.error('createCustomVideoTrack failed');
        AgoraConsole.error(e);
      }
      if (videoTrack) {
        //video 可能为null
        this.processVideoTrack(engine, videoTrack, connection);
        irisClient.setLocalVideoTrack({
          type: videoType,
          track: videoTrack,
        });
      }
      retVideoTrack = videoTrack;
    }

    //audio 暂时不实现

    return [retAudioTrack, retVideoTrack];
  }

  public static async getOrCreateAudioAndVideoTrackAsync(
    engine: IrisRtcEngine,
    audioType: IrisAudioSourceType,
    videoType: NATIVE_RTC.VIDEO_SOURCE_TYPE,
    connection: NATIVE_RTC.RtcConnection
  ): Promise<[ILocalAudioTrack, ILocalVideoTrack]> {
    let irisClient = engine.entitiesContainer.getIrisClient(connection);

    if (
      audioType == IrisAudioSourceType.kAudioSourceTypeUnknown &&
      videoType == NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_UNKNOWN
    ) {
      AgoraConsole.warn(
        'getOrCreateAudioAndVideoTrack  audio and video both unknown '
      );
      return [null, null];
    }
    if (
      videoType == NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_SCREEN_PRIMARY &&
      audioType == IrisAudioSourceType.kAudioSourceTypeScreenPrimary
    ) {
      //如果没有进行屏幕共享,则不create也不get
      if (!engine.globalVariables.isScreenSharing) {
        return [null, null];
      }

      let audioPackage = engine.entitiesContainer.getLocalAudioTrack(
        audioType,
        connection
      );
      let videoPackage = engine.entitiesContainer.getLocalVideoTrack(
        videoType,
        connection
      );
      if (audioPackage && videoPackage) {
        return [
          audioPackage.track as ILocalAudioTrack,
          videoPackage.track as ILocalVideoTrack,
        ];
      } else {
        //屏幕共享 audio 和 video 应该要同步创建和同步销毁
        if (audioPackage) {
          await irisClient.processAudioTrackClose(
            audioPackage.track as ILocalAudioTrack
          );
          (audioPackage.track as ILocalAudioTrack).close();
        }
        if (videoPackage) {
          await irisClient.processVideoTrackClose(
            videoPackage.track as ILocalVideoTrack
          );
          (videoPackage.track as ILocalVideoTrack).close();
        }

        let trackArray:
          | [ILocalVideoTrack, ILocalAudioTrack]
          | ILocalVideoTrack
          | null = null;
        let audioTrack: ILocalAudioTrack = null;
        let videoTrack: ILocalVideoTrack = null;
        try {
          let conf: ScreenVideoTrackInitConfig = this.generateScreenVideoTrackInitConfig(
            engine
          );
          //由于平台差异,有可能无法返回音频track,故做兼容
          let screenTrack = await engine.globalVariables.AgoraRTC.createScreenVideoTrack(
            conf,
            'auto'
          );
          if (Array.isArray(screenTrack)) {
            trackArray = screenTrack;
          } else {
            trackArray = [screenTrack, null];
          }
        } catch (e) {
          if (e.code === AgoraRTCErrorCode.PERMISSION_DENIED) {
            engine.rtcEngineEventHandler.onLocalVideoStateChanged(
              videoType,
              NATIVE_RTC.LOCAL_VIDEO_STREAM_STATE
                .LOCAL_VIDEO_STREAM_STATE_FAILED,
              NATIVE_RTC.LOCAL_VIDEO_STREAM_ERROR
                .LOCAL_VIDEO_STREAM_ERROR_DEVICE_NO_PERMISSION
            );
          }
          throw e;
        }
        if (trackArray) {
          //每一个track都可能是null
          audioTrack = trackArray[1];
          if (audioTrack) {
            this.processScreenShareAudioTrack(engine, audioTrack);
            irisClient.addLocalAudioTrack({
              type: audioType,
              track: audioTrack,
            });
          }

          videoTrack = trackArray[0];
          if (videoTrack) {
            this.processScreenShareVideoTrack(engine, videoTrack, videoType);
            irisClient.setLocalVideoTrack({
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
    if (engine.entitiesContainer.getLocalVideoTrack(videoType, connection)) {
      retVideoTrack = engine.entitiesContainer.getLocalVideoTrack(
        videoType,
        connection
      ).track as ILocalVideoTrack;
    } else if (
      videoType == NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_SCREEN_PRIMARY ||
      videoType == NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_SCREEN_SECONDARY
    ) {
      let videoTrack: ILocalVideoTrack = null;
      try {
        let conf: ScreenVideoTrackInitConfig = this.generateScreenVideoTrackInitConfig(
          engine
        );
        videoTrack = await engine.globalVariables.AgoraRTC.createScreenVideoTrack(
          conf,
          'disable'
        );
      } catch (e) {
        throw e;
      }
      if (videoTrack) {
        //这里的videoTrack有可能是null, 如果promise创建失败的话
        this.processScreenShareVideoTrack(engine, videoTrack, videoType);
        irisClient.setLocalVideoTrack({
          type: videoType,
          track: videoTrack,
        });
      }
      retVideoTrack = videoTrack;
    } else if (
      videoType == NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA_PRIMARY ||
      videoType == NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA_SECONDARY
    ) {
      let videoTrack: ICameraVideoTrack = null;
      try {
        let videoConfig: CameraVideoTrackInitConfig = this.generateCameraVideoTrackInitConfig(
          engine,
          connection
        );
        videoTrack = await engine.globalVariables.AgoraRTC.createCameraVideoTrack(
          videoConfig
        );
      } catch (e) {
        AgoraConsole.error('createCameraVideoTrack failed');
        AgoraConsole.error(e);
      }
      if (videoTrack) {
        //video 可能为null
        this.processVideoTrack(engine, videoTrack, connection);
        irisClient.setLocalVideoTrack({
          type: videoType,
          track: videoTrack,
        });
      }
      retVideoTrack = videoTrack;
    }

    //audio
    if (engine.entitiesContainer.getLocalAudioTrack(audioType, connection)) {
      retAudioTrack = engine.entitiesContainer.getLocalAudioTrack(
        audioType,
        connection
      ).track as ILocalAudioTrack;
    } else if (
      audioType == IrisAudioSourceType.kAudioSourceTypeMicrophonePrimary
    ) {
      let audioTrack: IMicrophoneAudioTrack = null;
      try {
        let audioConfig: MicrophoneAudioTrackInitConfig = this.generateMicrophoneAudioTrackInitConfig(
          engine,
          connection
        );
        audioTrack = await engine.globalVariables.AgoraRTC.createMicrophoneAudioTrack(
          audioConfig
        );
      } catch (e) {
        AgoraConsole.error('createMicrophoneAudioTrack failed');
        throw e;
      }
      if (audioTrack) {
        this.processAudioTrack(engine, audioTrack);
        irisClient.addLocalAudioTrack({
          type: audioType,
          track: audioTrack,
        });
      }
      retAudioTrack = audioTrack;
    }

    return [retAudioTrack, retVideoTrack];
  }

  //当一个audioTrack被创建的时候，要拆解这些参数
  public static processScreenShareAudioTrack(
    engine: IrisRtcEngine,
    audioTrack: ILocalAudioTrack
  ) {
    let globalVariables = engine.globalVariables;
    let irisClient = engine.entitiesContainer.getIrisClient();

    //audio
    if (irisClient.irisClientVariables.playbackDeviceId) {
      audioTrack
        .setPlaybackDevice(irisClient.irisClientVariables.playbackDeviceId)
        .then(() => {})
        .catch((reason) => {
          AgoraConsole.error('audio track setPlaybackDevice failed');
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

  public static processScreenShareVideoTrack(
    engine: IrisRtcEngine,
    videoTrack: ILocalVideoTrack,
    videoSource: NATIVE_RTC.VIDEO_SOURCE_TYPE
  ) {
    let globalVariables = engine.globalVariables;

    // if (globalVariables.enabledVideo && videoTrack.enabled) {
    //   videoTrack.play(
    //     engine.generateVideoTrackLabelOrHtmlElement('0', 0, videoSource)
    //   );
    // }

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
    audioTrack: IMicrophoneAudioTrack | IBufferSourceAudioTrack
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
    videoTrack: ICameraVideoTrack | ILocalVideoTrack,
    connection: NATIVE_RTC.RtcConnection
  ) {
    let globalVariables = engine.globalVariables;
    if (globalVariables.enabledVideo) {
      let config: VideoPlayerConfig = {};

      let irisClient = engine.entitiesContainer.getIrisClient(connection);
      let videoEncoderConfiguration: NATIVE_RTC.VideoEncoderConfiguration = null;
      videoEncoderConfiguration =
        irisClient.irisClientVariables.videoEncoderConfiguration;

      if (videoEncoderConfiguration) {
        config.mirror = AgoraTranslate.NATIVE_RTCVIDEO_MIRROR_MODE_TYPE2boolean(
          videoEncoderConfiguration.mirrorMode
        );
      }
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

  public static generateMicrophoneAudioTrackInitConfig(
    engine: IrisRtcEngine,
    connection: NATIVE_RTC.RtcConnection
  ): MicrophoneAudioTrackInitConfig {
    let audioConfig: MicrophoneAudioTrackInitConfig = {};
    let irisClient = engine.entitiesContainer.getIrisClient(connection);

    if (irisClient?.irisClientVariables.recordingDeviceId) {
      audioConfig.microphoneId =
        irisClient.irisClientVariables.recordingDeviceId;
    }
    return audioConfig;
  }

  public static generateCameraVideoTrackInitConfig(
    engine: IrisRtcEngine,
    connection: NATIVE_RTC.RtcConnection
  ): CameraVideoTrackInitConfig {
    let videoConfig: CameraVideoTrackInitConfig = {};
    let irisClient = engine.entitiesContainer.getIrisClient(connection);
    if (irisClient?.irisClientVariables.videoDeviceId) {
      videoConfig.cameraId = irisClient.irisClientVariables.videoDeviceId;
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

    if (globalVariables.screenCaptureParameters2 != null) {
      conf.encoderConfig = AgoraTranslate.NATIVE_RTCScreenCaptureParameters2VideoEncoderConfiguration(
        globalVariables.screenCaptureParameters2
      );
    } else if (globalVariables.videoEncoderConfiguration != null) {
      conf.encoderConfig = AgoraTranslate.NATIVE_RTCVideoEncoderConfiguration2VideoEncoderConfiguration(
        globalVariables.videoEncoderConfiguration
      );
    }
    return conf;
  }

  public static async enumerateDevices(
    engine: IrisRtcEngine
  ): Promise<{
    playbackDevices: NATIVE_RTC.DeviceInfo[];
    recordingDevices: NATIVE_RTC.DeviceInfo[];
    videoDevices: NATIVE_RTC.DeviceInfo[];
  }> {
    let info = await engine.globalVariables.AgoraRTC.getDevices();
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
