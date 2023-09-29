import * as NATIVE_RTC from '@iris/native-rtc-binding';
import {
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
import {
  AudioTrackPackage,
  BufferSourceAudioTrackPackage,
  VideoTrackPackage,
} from '../engine/IrisClientManager';

import { IrisRtcEngine } from '../engine/IrisRtcEngine';
import { IrisTrackEventHandler } from '../event_handler/IrisTrackEventHandler';
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
  ): Promise<BufferSourceAudioTrackPackage> {
    let bufferSourceAudioTrack: IBufferSourceAudioTrack = null;
    let irisClient = engine.entitiesContainer.getIrisClient(connection);

    try {
      bufferSourceAudioTrack = await engine.globalVariables.AgoraRTC.createBufferSourceAudioTrack(
        bufferSourceAudioTrackInitConfig
      );
    } catch (e) {
      AgoraConsole.error('createBufferSourceAudioTrack failed');
      AgoraConsole.error(e);
    }
    this.processAudioTrack(engine, bufferSourceAudioTrack);
    let bufferSourceAudioTrackPackage = new BufferSourceAudioTrackPackage(
      IrisAudioSourceType.kAudioSourceTypeBufferSourceAudio,
      bufferSourceAudioTrack,
      soundId
    );
    engine.entitiesContainer.addLocalAudioTrackPackage(
      bufferSourceAudioTrackPackage
    );

    let trackEventHandler: IrisTrackEventHandler = new IrisTrackEventHandler(
      {
        track: bufferSourceAudioTrack,
        trackType: 'IBufferSourceAudioTrack',
      },
      engine
    );
    irisClient.addTrackEventHandler(trackEventHandler);

    return bufferSourceAudioTrackPackage;
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
        irisClient.localVideoTrack.update(videoType, videoTrack);
      }
      retVideoTrack = videoTrack;
    }

    //audio 暂时不实现

    return [retAudioTrack, retVideoTrack];
  }

  public static async createScreenTrackAsync(
    engine: IrisRtcEngine,
    captureParams: NATIVE_RTC.ScreenCaptureParameters2,
    videoType: NATIVE_RTC.VIDEO_SOURCE_TYPE,
    connection?: NATIVE_RTC.RtcConnection
  ) {
    let irisClient = engine.entitiesContainer.getIrisClient(connection);
    let audioTrack: ILocalAudioTrack = null;
    let videoTrack: ILocalVideoTrack = null;
    let screenTrack = [null, null];
    try {
      let conf: ScreenVideoTrackInitConfig = this.generateScreenVideoTrackInitConfig(
        engine,
        connection
      );
      let result = await engine.globalVariables.AgoraRTC.createScreenVideoTrack(
        conf,
        captureParams.captureAudio ? 'disable' : 'auto'
      );
      if (Array.isArray(result)) {
        screenTrack = result;
      } else {
        screenTrack = [result, null];
      }
      if (screenTrack) {
        //每一个track都可能是null
        audioTrack = screenTrack[1];
        if (audioTrack) {
          this.processScreenShareAudioTrack(engine, audioTrack);
        }
        videoTrack = screenTrack[0];
        if (videoTrack) {
          this.processScreenShareVideoTrack(engine, videoTrack, videoType);
        }
      }
    } catch (e) {
      throw e;
    }
    engine.entitiesContainer.addLocalAudioTrackPackage(
      new AudioTrackPackage(
        IrisAudioSourceType.kAudioSourceTypeScreenCapture,
        audioTrack
      )
    );
    engine.entitiesContainer.addLocalVideoTrackPackage(
      new VideoTrackPackage(null, videoType, videoTrack)
    );
  }

  public static async getOrCreateAudioTrack(
    engine: IrisRtcEngine,
    connection?: NATIVE_RTC.RtcConnection
  ) {
    let audioTrackPackage: AudioTrackPackage;
    let audioTrack: IMicrophoneAudioTrack = null;
    audioTrackPackage = engine.entitiesContainer.getLocalAudioTrackPackageBySourceType(
      IrisAudioSourceType.kAudioSourceTypeMicrophonePrimary
    )[0];
    if (audioTrackPackage) {
      return audioTrackPackage;
    } else {
      try {
        let audioConfig: MicrophoneAudioTrackInitConfig = this.generateMicrophoneAudioTrackInitConfig(
          engine,
          connection
        );
        audioTrack = await engine.globalVariables.AgoraRTC.createMicrophoneAudioTrack(
          audioConfig
        );
        //受全局enabledAudio控制
        audioTrack.setEnabled(false);
      } catch (e) {
        AgoraConsole.error('createMicrophoneAudioTrack failed');
        throw e;
      }

      if (audioTrack) {
        this.processAudioTrack(engine, audioTrack);
        audioTrackPackage = new AudioTrackPackage(
          IrisAudioSourceType.kAudioSourceTypeMicrophonePrimary,
          audioTrack
        );
        engine.entitiesContainer.addLocalAudioTrackPackage(audioTrackPackage);
      }
      return audioTrackPackage;
    }
  }

  public static async getOrCreateVideoTrack(
    engine: IrisRtcEngine,
    videoType: NATIVE_RTC.VIDEO_SOURCE_TYPE,
    connection?: NATIVE_RTC.RtcConnection
  ) {
    let irisClient = engine.entitiesContainer.getIrisClient(connection);
    let videoTrack: ICameraVideoTrack = null;
    let videoTrackPackage = engine.entitiesContainer.getLocalVideoTrackPackageBySourceType(
      videoType
    )[0];

    if (videoTrackPackage?.track) {
      return videoTrackPackage;
    }
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

    if (videoTrackPackage) {
      videoTrackPackage.update(null, videoTrack, null);
      return videoTrackPackage;
    } else {
      videoTrackPackage = new VideoTrackPackage(null, videoType, videoTrack);
    }
    this.processVideoTrack(engine, videoTrack, connection);
    engine.entitiesContainer.addLocalVideoTrackPackage(videoTrackPackage);
    return videoTrackPackage;
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
    //由于自己会听到自己的声音,所以mute
    // if (globalVariables.enabledAudio) {
    // audioTrack.setMuted(true);
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
    if (irisClient?.irisClientVariables.videoEncoderConfiguration) {
      videoConfig.encoderConfig = AgoraTranslate.NATIVE_RTCVideoEncoderConfiguration2VideoEncoderConfiguration(
        irisClient?.irisClientVariables.videoEncoderConfiguration
      );
    }

    return videoConfig;
  }

  public static generateScreenVideoTrackInitConfig(
    engine: IrisRtcEngine,
    connection: NATIVE_RTC.RtcConnection
  ): ScreenVideoTrackInitConfig {
    let videoConfig: CameraVideoTrackInitConfig = {};
    let irisClient = engine.entitiesContainer.getIrisClient(connection);
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
    } else if (
      irisClient?.irisClientVariables.videoEncoderConfiguration != null
    ) {
      conf.encoderConfig = AgoraTranslate.NATIVE_RTCVideoEncoderConfiguration2VideoEncoderConfiguration(
        irisClient?.irisClientVariables.videoEncoderConfiguration
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

  public static isScreenCapture(sourceType: NATIVE_RTC.VIDEO_SOURCE_TYPE) {
    return (
      sourceType == NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_SCREEN_PRIMARY ||
      sourceType ==
        NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_SCREEN_SECONDARY ||
      sourceType == NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_SCREEN_THIRD ||
      sourceType == NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_SCREEN_FOURTH
    );
  }

  public static isVideoCamera(sourceType: NATIVE_RTC.VIDEO_SOURCE_TYPE) {
    return (
      sourceType == NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA_PRIMARY ||
      sourceType ==
        NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA_SECONDARY ||
      sourceType == NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA_THIRD ||
      sourceType == NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA_FOURTH
    );
  }

  public static isAudio(sourceType: IrisAudioSourceType) {
    return (
      sourceType === IrisAudioSourceType.kAudioSourceTypeMicrophonePrimary ||
      sourceType === IrisAudioSourceType.kAudioSourceTypeMicrophoneSecondary ||
      sourceType === IrisAudioSourceType.kAudioSourceTypeScreenCapture ||
      sourceType === IrisAudioSourceType.kAudioSourceTypeCustom ||
      sourceType === IrisAudioSourceType.kAudioSourceTypeUnknown
    );
  }
}
