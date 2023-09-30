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
import { TrackHelper } from '../helper/TrackHelper';
import { IrisGlobalVariables } from '../states/IrisGlobalVariables';
import { AgoraConsole } from '../util/AgoraConsole';
import { AgoraTranslate } from '../util/AgoraTranslate';

export class ImplHelper {
  public static async createBufferSourceAudioTrack(
    engine: IrisRtcEngine,
    soundId: number,
    bufferSourceAudioTrackInitConfig: BufferSourceAudioTrackInitConfig,
    connection?: NATIVE_RTC.RtcConnection
  ): Promise<BufferSourceAudioTrackPackage> {
    let bufferSourceAudioTrack: IBufferSourceAudioTrack = null;
    let irisClient = engine.irisClientManager.getIrisClient(connection);

    try {
      bufferSourceAudioTrack = await engine.globalVariables.AgoraRTC.createBufferSourceAudioTrack(
        bufferSourceAudioTrackInitConfig
      );
    } catch (e) {
      AgoraConsole.error('createBufferSourceAudioTrack failed');
      AgoraConsole.error(e);
    }
    await this.processAudioTrack(engine, bufferSourceAudioTrack);
    let bufferSourceAudioTrackPackage = new BufferSourceAudioTrackPackage(
      IrisAudioSourceType.kAudioSourceTypeBufferSourceAudio,
      bufferSourceAudioTrack,
      soundId
    );
    engine.irisClientManager.addLocalAudioTrackPackage(
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

  public static async getOrCreateCustomAudioAndVideoTrack(
    engine: IrisRtcEngine,
    audioType: IrisAudioSourceType,
    videoType: NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CUSTOM,
    mediaStreamTrack: MediaStreamTrack,
    connection: NATIVE_RTC.RtcConnection
  ): Promise<[ILocalAudioTrack, ILocalVideoTrack]> {
    let irisClient = engine.irisClientManager.getIrisClient(connection);
    let retAudioTrack: ILocalAudioTrack = null;
    let retVideoTrack: ILocalVideoTrack = engine.irisClientManager.getLocalVideoTrack(
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
        await this.processVideoTrack(engine, videoTrack, connection);
        irisClient.localVideoTrack.update(videoType, videoTrack);
      }
      retVideoTrack = videoTrack;
    }

    //audio 暂时不实现

    return [retAudioTrack, retVideoTrack];
  }

  public static async createScreenTrack(
    engine: IrisRtcEngine,
    captureParams: NATIVE_RTC.ScreenCaptureParameters2,
    videoType: NATIVE_RTC.VIDEO_SOURCE_TYPE,
    connection?: NATIVE_RTC.RtcConnection
  ) {
    let irisClient = engine.irisClientManager.getIrisClient(connection);
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
          await this.processScreenShareAudioTrack(engine, audioTrack);
          let audioTrackPackage = new AudioTrackPackage(
            IrisAudioSourceType.kAudioSourceTypeScreenCapture,
            audioTrack
          );
          engine.irisClientManager.addLocalAudioTrackPackage(audioTrackPackage);
        }
        videoTrack = screenTrack[0];
        if (videoTrack) {
          await this.processScreenShareVideoTrack(
            engine,
            videoTrack,
            videoType
          );
          //设置屏幕共享特殊的事件
          let trackEventHandler: IrisTrackEventHandler = new IrisTrackEventHandler(
            {
              track: videoTrack,
              videoSourceType: videoType,
              trackType: 'ILocalTrack',
            },
            engine
          );
          irisClient.addTrackEventHandler(trackEventHandler);
          let videoTrackPackage = new VideoTrackPackage(
            null,
            videoType,
            videoTrack
          );
          engine.irisClientManager.addLocalVideoTrackPackage(videoTrackPackage);
        }
      }
    } catch (e) {
      throw e;
    }
  }

  public static async createAudioTrack(
    engine: IrisRtcEngine,
    connection?: NATIVE_RTC.RtcConnection
  ) {
    let audioTrackPackage: AudioTrackPackage;
    let audioTrack: IMicrophoneAudioTrack = null;
    let irisClient = engine.irisClientManager.getIrisClient(connection);
    try {
      let audioConfig: MicrophoneAudioTrackInitConfig = this.generateMicrophoneAudioTrackInitConfig(
        engine,
        connection
      );
      audioTrack = await engine.globalVariables.AgoraRTC.createMicrophoneAudioTrack(
        audioConfig
      );
      //受全局enabledAudio控制
      await TrackHelper.setEnabled(audioTrack, false);
    } catch (e) {
      AgoraConsole.error('createMicrophoneAudioTrack failed');
      throw e;
    }

    await this.processAudioTrack(engine, audioTrack);
    audioTrackPackage = new AudioTrackPackage(
      IrisAudioSourceType.kAudioSourceTypeMicrophonePrimary,
      audioTrack
    );
    engine.irisClientManager.addLocalAudioTrackPackage(audioTrackPackage);
    return audioTrackPackage;
  }

  public static async createVideoTrack(
    engine: IrisRtcEngine,
    videoType: NATIVE_RTC.VIDEO_SOURCE_TYPE,
    connection?: NATIVE_RTC.RtcConnection
  ) {
    let videoTrack: ICameraVideoTrack = null;
    let videoTrackPackage: VideoTrackPackage;
    let irisClient = engine.irisClientManager.getIrisClient(connection);
    console.log('start create');
    try {
      let videoConfig: CameraVideoTrackInitConfig = this.generateCameraVideoTrackInitConfig(
        engine,
        connection
      );
      videoTrack = await engine.globalVariables.AgoraRTC.createCameraVideoTrack(
        videoConfig
      );
      //受全局enabledVideo控制
      await TrackHelper.setEnabled(videoTrack, false);
    } catch (e) {
      AgoraConsole.error('createCameraVideoTrack failed');
      AgoraConsole.error(e);
    }

    videoTrackPackage = new VideoTrackPackage(null, videoType, videoTrack);
    await this.processVideoTrack(engine, videoTrack, connection);
    engine.irisClientManager.addLocalVideoTrackPackage(videoTrackPackage);
    return videoTrackPackage;
  }

  //当一个audioTrack被创建的时候，要拆解这些参数
  public static async processScreenShareAudioTrack(
    engine: IrisRtcEngine,
    audioTrack: ILocalAudioTrack
  ) {
    let globalVariables = engine.globalVariables;
    let irisClient = engine.irisClientManager.getIrisClient();

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
      await TrackHelper.setEnabled(audioTrack, false);
    }

    if (globalVariables.mutedLocalAudioStream) {
      await TrackHelper.setMuted(audioTrack, true);
    }
  }

  public static async processScreenShareVideoTrack(
    engine: IrisRtcEngine,
    videoTrack: ILocalVideoTrack,
    videoSource: NATIVE_RTC.VIDEO_SOURCE_TYPE
  ) {
    let globalVariables = engine.globalVariables;

    if (globalVariables.pausedVideo) {
      await TrackHelper.setEnabled(videoTrack, false);
    }
    if (globalVariables.mutedLocalVideoStream) {
      await TrackHelper.setMuted(videoTrack, true);
    }
  }

  public static async processAudioTrack(
    engine: IrisRtcEngine,
    audioTrack: IMicrophoneAudioTrack | IBufferSourceAudioTrack
  ) {
    let globalVariables = engine.globalVariables;
    if (globalVariables.pausedAudio) {
      await TrackHelper.setEnabled(audioTrack, false);
    }
    if (globalVariables.mutedLocalAudioStream) {
      await TrackHelper.setMuted(audioTrack, true);
    }
  }

  public static async processVideoTrack(
    engine: IrisRtcEngine,
    videoTrack: ICameraVideoTrack | ILocalVideoTrack,
    connection: NATIVE_RTC.RtcConnection
  ) {
    let globalVariables = engine.globalVariables;
    if (globalVariables.enabledVideo) {
      let config: VideoPlayerConfig = {};

      let irisClient = engine.irisClientManager.getIrisClient(connection);
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
      await TrackHelper.setEnabled(videoTrack, false);
    }
    if (globalVariables.mutedLocalVideoStream) {
      await TrackHelper.setMuted(videoTrack, true);
    }
  }

  public static generateMicrophoneAudioTrackInitConfig(
    engine: IrisRtcEngine,
    connection: NATIVE_RTC.RtcConnection
  ): MicrophoneAudioTrackInitConfig {
    let audioConfig: MicrophoneAudioTrackInitConfig = {};
    let irisClient = engine.irisClientManager.getIrisClient(connection);

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
    let irisClient = engine.irisClientManager.getIrisClient(connection);
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
    let irisClient = engine.irisClientManager.getIrisClient(connection);
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

  public static isScreenCapture(
    sourceType:
      | NATIVE_RTC.VIDEO_SOURCE_TYPE
      | NATIVE_RTC.EXTERNAL_VIDEO_SOURCE_TYPE
      | IrisAudioSourceType
  ) {
    return (
      sourceType == NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_SCREEN_PRIMARY ||
      sourceType ==
        NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_SCREEN_SECONDARY ||
      sourceType == NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_SCREEN_THIRD ||
      sourceType == NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_SCREEN_FOURTH
    );
  }

  public static isVideoCamera(
    sourceType:
      | NATIVE_RTC.VIDEO_SOURCE_TYPE
      | NATIVE_RTC.EXTERNAL_VIDEO_SOURCE_TYPE
      | IrisAudioSourceType
  ) {
    return (
      sourceType == NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA_PRIMARY ||
      sourceType ==
        NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA_SECONDARY ||
      sourceType == NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA_THIRD ||
      sourceType == NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA_FOURTH
    );
  }

  public static isAudio(
    sourceType:
      | NATIVE_RTC.VIDEO_SOURCE_TYPE
      | NATIVE_RTC.EXTERNAL_VIDEO_SOURCE_TYPE
      | IrisAudioSourceType
  ) {
    return (
      sourceType === IrisAudioSourceType.kAudioSourceTypeMicrophonePrimary ||
      sourceType === IrisAudioSourceType.kAudioSourceTypeMicrophoneSecondary ||
      sourceType === IrisAudioSourceType.kAudioSourceTypeScreenCapture ||
      sourceType === IrisAudioSourceType.kAudioSourceTypeCustom ||
      sourceType === IrisAudioSourceType.kAudioSourceTypeUnknown
    );
  }
}
