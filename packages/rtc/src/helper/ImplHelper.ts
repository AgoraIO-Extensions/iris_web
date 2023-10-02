import * as NATIVE_RTC from '@iris/native-rtc-binding';
import {
  BufferSourceAudioTrackInitConfig,
  CameraVideoTrackInitConfig,
  IBufferSourceAudioTrack,
  ICameraVideoTrack,
  ILocalAudioTrack,
  ILocalVideoTrack,
  IMicrophoneAudioTrack,
  ScreenVideoTrackInitConfig,
} from 'agora-rtc-sdk-ng';

import { IrisAudioSourceType } from '../base/BaseType';
import {
  AudioTrackPackage,
  BufferSourceAudioTrackPackage,
  VideoTrackPackage,
} from '../engine/IrisClientManager';
import { NotifyType } from '../engine/IrisClientObserver';

import { IrisRtcEngine } from '../engine/IrisRtcEngine';
import { IrisTrackEventHandler } from '../event_handler/IrisTrackEventHandler';

import { IrisGlobalVariables } from '../states/IrisGlobalVariables';
import { AgoraConsole } from '../util/AgoraConsole';
import { AgoraTranslate } from '../util/AgoraTranslate';

export class ImplHelper {
  _engine: IrisRtcEngine;
  constructor(engine: IrisRtcEngine) {
    this._engine = engine;
  }

  public async createBufferSourceAudioTrack(
    soundId: number,
    bufferSourceAudioTrackInitConfig: BufferSourceAudioTrackInitConfig
  ): Promise<BufferSourceAudioTrackPackage> {
    let bufferSourceAudioTrack: IBufferSourceAudioTrack = null;

    try {
      bufferSourceAudioTrack = await this._engine.globalVariables.AgoraRTC.createBufferSourceAudioTrack(
        bufferSourceAudioTrackInitConfig
      );
    } catch (e) {
      AgoraConsole.error('createBufferSourceAudioTrack failed');
      AgoraConsole.error(e);
    }
    await this.processAudioTrack(bufferSourceAudioTrack);
    let bufferSourceAudioTrackPackage = new BufferSourceAudioTrackPackage(
      IrisAudioSourceType.kAudioSourceTypeBufferSourceAudio,
      bufferSourceAudioTrack,
      soundId
    );
    this._engine.irisClientManager.addLocalAudioTrackPackage(
      bufferSourceAudioTrackPackage
    );

    let trackEventHandler: IrisTrackEventHandler = new IrisTrackEventHandler(
      {
        track: bufferSourceAudioTrack,
        trackType: 'IBufferSourceAudioTrack',
      },
      this._engine
    );
    this._engine.irisClientManager.addTrackEventHandler(trackEventHandler);

    return bufferSourceAudioTrackPackage;
  }

  public async createCustomVideoTrack(
    videoType: NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CUSTOM,
    mediaStreamTrack: MediaStreamTrack
  ): Promise<VideoTrackPackage> {
    let videoTrackPackage: VideoTrackPackage = this._engine.irisClientManager.getLocalVideoTrackPackageBySourceType(
      videoType
    )[0];
    let videoTrack: ILocalVideoTrack = null;
    let config = {
      mediaStreamTrack,
    };

    //如果已经有track了，就不需要再创建了
    if (videoTrackPackage?.track) {
      return videoTrackPackage;
    }
    //如果没有track，但是有package，就需要创建track
    try {
      videoTrack = this._engine.globalVariables.AgoraRTC.createCustomVideoTrack(
        config
      );
    } catch (e) {
      AgoraConsole.error('createCustomVideoTrack failed');
      AgoraConsole.error(e);
    }
    await this.processVideoTrack(videoTrack);

    if (!videoTrackPackage) {
      videoTrackPackage = new VideoTrackPackage(null, videoType, videoTrack);
      this._engine.irisClientManager.addLocalVideoTrackPackage(
        videoTrackPackage
      );
    } else {
      videoTrackPackage.update({ track: videoTrack });
    }
    let trackEventHandler: IrisTrackEventHandler = new IrisTrackEventHandler(
      {
        track: videoTrack,
        trackType: 'ILocalVideoTrack',
      },
      this._engine
    );
    this._engine.irisClientManager.addTrackEventHandler(trackEventHandler);

    return videoTrackPackage;
  }

  public async createScreenTrack(
    captureParams: NATIVE_RTC.ScreenCaptureParameters2,
    videoType: NATIVE_RTC.VIDEO_SOURCE_TYPE
  ) {
    let videoTrackPackage: VideoTrackPackage = this._engine.irisClientManager.getLocalVideoTrackPackageBySourceType(
      videoType
    )[0];

    //如果已经有track了，就不需要再创建了
    if (videoTrackPackage?.track) {
      return;
    }
    //如果没有track，但是有package，就需要创建track
    let audioTrack: ILocalAudioTrack = null;
    let videoTrack: ILocalVideoTrack = null;
    let screenTrack = [null, null];
    try {
      let conf: ScreenVideoTrackInitConfig = this.generateScreenVideoTrackInitConfig();
      let result = await this._engine.globalVariables.AgoraRTC.createScreenVideoTrack(
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
          await this.processScreenShareAudioTrack(audioTrack);
          let audioTrackPackage = new AudioTrackPackage(
            IrisAudioSourceType.kAudioSourceTypeScreenCapture,
            audioTrack
          );
          this._engine.irisClientManager.addLocalAudioTrackPackage(
            audioTrackPackage
          );
        }
        videoTrack = screenTrack[0];
        if (videoTrack) {
          await this.processScreenShareVideoTrack(videoTrack);

          if (!videoTrackPackage) {
            videoTrackPackage = new VideoTrackPackage(
              null,
              videoType,
              videoTrack
            );
            this._engine.irisClientManager.addLocalVideoTrackPackage(
              videoTrackPackage
            );
          } else {
            videoTrackPackage.update({ track: videoTrack });
          }

          //设置屏幕共享特殊的事件
          let trackEventHandler: IrisTrackEventHandler = new IrisTrackEventHandler(
            {
              track: videoTrack,
              videoSourceType: videoType,
              trackType: 'ILocalTrack',
            },
            this._engine
          );
          this._engine.irisClientManager.addTrackEventHandler(
            trackEventHandler
          );
        }
      }
    } catch (e) {
      throw e;
    }
  }

  public async createAudioTrack(audioType: IrisAudioSourceType) {
    let audioTrackPackage: AudioTrackPackage;
    let audioTrack: IMicrophoneAudioTrack = null;
    try {
      audioTrack = await this._engine.globalVariables.AgoraRTC.createMicrophoneAudioTrack();
      //受全局enabledAudio控制
      await this._engine.trackHelper.setEnabled(audioTrack, false);
    } catch (e) {
      AgoraConsole.error('createMicrophoneAudioTrack failed');
      throw e;
    }

    await this.processAudioTrack(audioTrack);
    audioTrackPackage = new AudioTrackPackage(audioType, audioTrack);
    this._engine.irisClientManager.addLocalAudioTrackPackage(audioTrackPackage);
    return audioTrackPackage;
  }

  public async createVideoTrack(videoType: NATIVE_RTC.VIDEO_SOURCE_TYPE) {
    let videoTrack: ICameraVideoTrack = null;
    let videoTrackPackage: VideoTrackPackage;
    try {
      videoTrack = await this._engine.globalVariables.AgoraRTC.createCameraVideoTrack();
      //受全局enabledVideo控制
      await this._engine.trackHelper.setEnabled(videoTrack, false);
    } catch (e) {
      AgoraConsole.error('createCameraVideoTrack failed');
      AgoraConsole.error(e);
    }

    videoTrackPackage = new VideoTrackPackage(null, videoType, videoTrack);
    await this.processVideoTrack(videoTrack);
    this._engine.irisClientManager.addLocalVideoTrackPackage(videoTrackPackage);
    return videoTrackPackage;
  }

  //当一个audioTrack被创建的时候，要拆解这些参数
  public async processScreenShareAudioTrack(audioTrack: ILocalAudioTrack) {
    let globalVariables = this._engine.globalVariables;

    if (globalVariables.enabledAudio) {
      this._engine.trackHelper.play(audioTrack);
    }
    if (globalVariables.pausedAudio) {
      await this._engine.trackHelper.setEnabled(audioTrack, false);
    }

    if (globalVariables.mutedLocalAudioStream) {
      await this._engine.trackHelper.setMuted(audioTrack, true);
    }
  }

  public async processScreenShareVideoTrack(videoTrack: ILocalVideoTrack) {
    let globalVariables = this._engine.globalVariables;

    if (globalVariables.pausedVideo) {
      await this._engine.trackHelper.setEnabled(videoTrack, false);
    }
    if (globalVariables.mutedLocalVideoStream) {
      await this._engine.trackHelper.setMuted(videoTrack, true);
    }
  }

  public async processAudioTrack(
    audioTrack: IMicrophoneAudioTrack | IBufferSourceAudioTrack
  ) {
    let globalVariables = this._engine.globalVariables;
    if (globalVariables.pausedAudio) {
      await this._engine.trackHelper.setEnabled(audioTrack, false);
    }
    if (globalVariables.mutedLocalAudioStream) {
      await this._engine.trackHelper.setMuted(audioTrack, true);
    }
  }

  public async processVideoTrack(
    videoTrack: ICameraVideoTrack | ILocalVideoTrack
  ) {
    let globalVariables = this._engine.globalVariables;

    if (globalVariables.pausedVideo) {
      await this._engine.trackHelper.setEnabled(videoTrack, false);
    }
    if (globalVariables.mutedLocalVideoStream) {
      await this._engine.trackHelper.setMuted(videoTrack, true);
    }
  }

  public generateScreenVideoTrackInitConfig(): ScreenVideoTrackInitConfig {
    let videoConfig: CameraVideoTrackInitConfig = {};
    let conf: ScreenVideoTrackInitConfig = {};
    let globalVariables: IrisGlobalVariables = this._engine.globalVariables;
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
    }
    return conf;
  }

  public async enumerateDevices(): Promise<{
    playbackDevices: NATIVE_RTC.DeviceInfo[];
    recordingDevices: NATIVE_RTC.DeviceInfo[];
    videoDevices: NATIVE_RTC.DeviceInfo[];
  }> {
    let info = await this._engine.globalVariables.AgoraRTC.getDevices();
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

    this._engine.globalVariables.playbackDevices = playbackDevices;
    this._engine.globalVariables.recordingDevices = recordingDevices;
    this._engine.globalVariables.videoDevices = videoDevices;
    return {
      playbackDevices: playbackDevices,
      recordingDevices: recordingDevices,
      videoDevices: videoDevices,
    };
  }

  public async updateChannelMediaOptions(
    options: NATIVE_RTC.ChannelMediaOptions,
    connection?: NATIVE_RTC.RtcConnection
  ) {
    const irisClientManager = this._engine.irisClientManager;
    const irisClient = irisClientManager.getIrisClientByConnection(connection);

    let agoraRTCClient = irisClient?.agoraRTCClient;
    if (!agoraRTCClient) {
      return this._engine.returnResult(
        false,
        -NATIVE_RTC.ERROR_CODE_TYPE.ERR_FAILED
      );
    }

    let audioTrackPackages = irisClient.audioTrackPackages;
    let videoTrackPackage = irisClient.videoTrackPackage;
    let irisClientObserver = irisClientManager.irisClientObserver;
    irisClientObserver.notify(NotifyType.STOP_TRACK, [
      ...audioTrackPackages,
      videoTrackPackage,
    ]);

    let irisClientVariables = irisClient.irisClientVariables;
    irisClientVariables.mergeChannelMediaOptions(options);
    if (irisClientVariables.clientRoleType) {
      await this._engine.clientHelper.setClientRole(
        agoraRTCClient,
        irisClientVariables.clientRoleType,
        irisClientVariables.audienceLatencyLevel
      );
    }
    if (irisClientVariables.token) {
      try {
        await agoraRTCClient.renewToken(irisClientVariables.token);
      } catch (e) {
        return this._engine.returnResult(false);
      }
    }
    irisClientObserver.notify(
      NotifyType.START_TRACK,
      [
        ...irisClientManager.localAudioTrackPackages,
        ...irisClientManager.localVideoTrackPackages,
      ],
      [irisClient]
    );
  }

  public isScreenCapture(
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

  public isVideoCamera(
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

  public isAudio(
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
