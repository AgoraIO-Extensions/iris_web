import * as NATIVE_RTC from '@iris/native-rtc';
import {
  BufferSourceAudioTrackInitConfig,
  CameraVideoTrackInitConfig,
  IBufferSourceAudioTrack,
  ICameraVideoTrack,
  ILocalAudioTrack,
  ILocalVideoTrack,
  IMicrophoneAudioTrack,
  ScreenVideoTrackInitConfig,
  UID,
} from 'agora-rtc-sdk-ng';

import { IrisAudioSourceType } from '../base/BaseType';
import { IrisClient } from '../engine/IrisClient';

import {
  AudioTrackPackage,
  BufferSourceAudioTrackPackage,
  VideoTrackPackage,
} from '../engine/IrisClientManager';
import { NotifyType } from '../engine/IrisClientObserver';

import { IrisRtcEngine } from '../engine/IrisRtcEngine';
import { IrisTrackEventHandler } from '../event_handler/IrisTrackEventHandler';
import { IRtcEngineImpl } from '../impl/IAgoraRtcEngineImpl';

import { IrisGlobalState } from '../state/IrisGlobalState';
import { AgoraConsole, AgoraTranslate, isDefined } from '../util';

export class ImplHelper {
  _engine: IrisRtcEngine;
  constructor(engine: IrisRtcEngine) {
    this._engine = engine;
  }

  public async createBufferSourceAudioTrack(
    soundId: number,
    bufferSourceAudioTrackInitConfig: BufferSourceAudioTrackInitConfig
  ): Promise<BufferSourceAudioTrackPackage> {
    let bufferSourceAudioTrack: IBufferSourceAudioTrack | undefined = undefined;

    try {
      bufferSourceAudioTrack = await this._engine.globalState.AgoraRTC.createBufferSourceAudioTrack(
        bufferSourceAudioTrackInitConfig
      );
    } catch (e) {
      AgoraConsole.error('createBufferSourceAudioTrack failed');
      throw e;
    }
    if (bufferSourceAudioTrack) {
      await this.processAudioTrack(bufferSourceAudioTrack);
    }
    let bufferSourceAudioTrackPackage = new BufferSourceAudioTrackPackage(
      IrisAudioSourceType.kAudioSourceTypeBufferSourceAudio,
      bufferSourceAudioTrack!,
      soundId
    );
    this._engine.irisClientManager.addLocalAudioTrackPackage(
      bufferSourceAudioTrackPackage
    );

    let trackEventHandler: IrisTrackEventHandler = new IrisTrackEventHandler(
      {
        track: bufferSourceAudioTrack!,
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
    let videoTrack: ILocalVideoTrack;
    let config = {
      mediaStreamTrack,
    };

    //如果已经有track了，就不需要再创建了
    if (videoTrackPackage?.track) {
      return videoTrackPackage;
    }
    //如果没有track，但是有package，就需要创建track
    try {
      videoTrack = this._engine.globalState.AgoraRTC.createCustomVideoTrack(
        config
      );
    } catch (e) {
      AgoraConsole.error('createCustomVideoTrack failed');
      throw e;
    }
    await this.processVideoTrack(videoTrack);

    if (!videoTrackPackage) {
      videoTrackPackage = new VideoTrackPackage(
        undefined,
        undefined,
        videoType,
        videoTrack
      );
      this._engine.irisClientManager.addLocalVideoTrackPackage(
        videoTrackPackage
      );
    } else {
      videoTrackPackage.track = videoTrack;
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
    let audioTrack: ILocalAudioTrack;
    let videoTrack: ILocalVideoTrack;
    let screenTrack = new Array(2);
    try {
      let conf: ScreenVideoTrackInitConfig = this.generateScreenVideoTrackInitConfig();
      let result = await this._engine.globalState.AgoraRTC.createScreenVideoTrack(
        conf,
        captureParams.captureAudio ? 'auto' : 'disable'
      );
      if (Array.isArray(result)) {
        screenTrack = result;
      } else {
        screenTrack = [result, undefined];
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
              undefined,
              undefined,
              videoType,
              videoTrack
            );
            this._engine.irisClientManager.addLocalVideoTrackPackage(
              videoTrackPackage
            );
          } else {
            videoTrackPackage.track = videoTrack;
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

  public async createMicrophoneAudioTrack(
    irisClient?: IrisClient
  ): Promise<IMicrophoneAudioTrack> {
    let audioTrack: IMicrophoneAudioTrack;

    let config = {
      AEC: this._engine.globalState.enableAEC,
      ANS: this._engine.globalState.enableANS,
      AGC: this._engine.globalState.enableAGC,
      encoderConfig: {
        stereo: false,
        bitrate: 32,
      },
    };

    if (irisClient) {
      config.encoderConfig.stereo = irisClient.irisClientState.isStereo;
      config.encoderConfig.bitrate = irisClient.irisClientState.bitrate;
    }

    try {
      audioTrack = await this._engine.globalState.AgoraRTC.createMicrophoneAudioTrack(
        config
      );
      await this._engine.trackHelper.setEnabled(audioTrack, false);
    } catch (e) {
      AgoraConsole.error('createMicrophoneAudioTrack failed');
      throw e;
    }

    await this.processAudioTrack(audioTrack);
    return audioTrack;
  }

  public async reGenMicrophoneAudioTrack(irisClient: IrisClient) {
    try {
      let audioTrackPackage = this._engine.irisClientManager.getLocalAudioTrackPackageByConnection(
        irisClient.connection
      )[0];

      if (
        audioTrackPackage &&
        audioTrackPackage.type ===
          IrisAudioSourceType.kAudioSourceTypeMicrophonePrimary
      ) {
        await this._engine.irisClientManager.irisClientObserver.notifyLocal(
          NotifyType.UNPUBLISH_TRACK,
          [audioTrackPackage]
        );
        let audioTrack: IMicrophoneAudioTrack;
        audioTrack = await this.createMicrophoneAudioTrack(irisClient);
        await this._engine.trackHelper.setEnabled(
          audioTrack as ILocalAudioTrack,
          true
        );
        audioTrackPackage.track = audioTrack;
        if (
          irisClient.irisClientState.clientRoleType ===
            NATIVE_RTC.CLIENT_ROLE_TYPE.CLIENT_ROLE_BROADCASTER &&
          irisClient.irisClientState.publishMicrophoneTrack &&
          irisClient.agoraRTCClient?.channelName
        ) {
          await this._engine.irisClientManager.irisClientObserver.notifyLocal(
            NotifyType.PUBLISH_TRACK,
            [audioTrackPackage]
          );
        }
      }
    } catch (e) {
      AgoraConsole.error('reGenMicrophoneAudioTrack failed');
      throw e;
    }
  }

  public async createVideoCameraTrack(): Promise<ICameraVideoTrack> {
    let videoTrack: ICameraVideoTrack;
    try {
      videoTrack = await this._engine.globalState.AgoraRTC.createCameraVideoTrack();
      await this._engine.trackHelper.setEnabled(videoTrack, false);
    } catch (e) {
      AgoraConsole.error('createCameraVideoTrack failed');
      throw e;
    }

    await this.processVideoTrack(videoTrack);
    return videoTrack;
  }

  //当一个audioTrack被创建的时候，要拆解这些参数
  public async processScreenShareAudioTrack(audioTrack: ILocalAudioTrack) {
    let globalState = this._engine.globalState;

    if (globalState.pausedAudio) {
      await this._engine.trackHelper.setEnabled(audioTrack, false);
    }

    if (globalState.mutedLocalAudioStream) {
      await this._engine.trackHelper.setMuted(audioTrack, true);
    }
  }

  public async processScreenShareVideoTrack(videoTrack: ILocalVideoTrack) {
    let globalState = this._engine.globalState;

    if (globalState.pausedVideo) {
      await this._engine.trackHelper.setEnabled(videoTrack, false);
    }
    if (globalState.mutedLocalVideoStream) {
      await this._engine.trackHelper.setMuted(videoTrack, true);
    }
  }

  public async processAudioTrack(
    audioTrack: IMicrophoneAudioTrack | IBufferSourceAudioTrack
  ) {
    let globalState = this._engine.globalState;
    if (globalState.pausedAudio) {
      await this._engine.trackHelper.setEnabled(audioTrack, false);
    }
    if (globalState.mutedLocalAudioStream) {
      await this._engine.trackHelper.setMuted(audioTrack, true);
    }
  }

  public async processVideoTrack(
    videoTrack: ICameraVideoTrack | ILocalVideoTrack
  ) {
    let globalState = this._engine.globalState;

    if (globalState.pausedVideo) {
      await this._engine.trackHelper.setEnabled(videoTrack, false);
    }
    if (globalState.mutedLocalVideoStream) {
      await this._engine.trackHelper.setMuted(videoTrack, true);
    }
  }

  public generateScreenVideoTrackInitConfig(): ScreenVideoTrackInitConfig {
    let videoConfig: CameraVideoTrackInitConfig = {};
    let conf: ScreenVideoTrackInitConfig = {};
    let globalState: IrisGlobalState = this._engine.globalState;
    if (
      globalState.screenCaptureContentHint != null &&
      globalState.screenCaptureContentHint !=
        NATIVE_RTC.VIDEO_CONTENT_HINT.CONTENT_HINT_NONE
    ) {
      conf.optimizationMode = AgoraTranslate.NATIVE_RTCVIDEO_CONTENT_HINT2string(
        globalState.screenCaptureContentHint
      );
    }

    if (globalState.screenCaptureParameters2 != null) {
      conf.encoderConfig = AgoraTranslate.NATIVE_RTCScreenCaptureParameters2VideoEncoderConfiguration(
        globalState.screenCaptureParameters2
      );
    }
    return conf;
  }

  public async enumerateDevices(): Promise<{
    playbackDevices: MediaDeviceInfo[];
    recordingDevices: MediaDeviceInfo[];
    videoDevices: MediaDeviceInfo[];
  }> {
    let info = await this._engine.globalState.AgoraRTC.getDevices();
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

    this._engine.globalState.playbackDevices = playbackDevices;
    this._engine.globalState.recordingDevices = recordingDevices;
    this._engine.globalState.videoDevices = videoDevices;
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
    let irisClient: IrisClient;
    if (connection) {
      irisClient = irisClientManager.getIrisClientByConnection(connection);
    } else {
      irisClient = irisClientManager.getIrisClient();
    }
    if (!irisClient) {
      return;
    }
    let irisClientState = irisClient.irisClientState;
    let agoraRTCClient = irisClient.agoraRTCClient;
    let irisClientObserver = irisClientManager.irisClientObserver;

    if (options.parameters) {
      this.handleChannelMediaOptionsParameters(options.parameters, irisClient);
      this.reGenMicrophoneAudioTrack(irisClient);
    }
    let localAudioTrackPackages = irisClientManager.localAudioTrackPackages;
    let localVideoTrackPackages = irisClientManager.localVideoTrackPackages;
    if (connection) {
      localAudioTrackPackages = irisClientManager.getLocalAudioTrackPackageByConnection(
        connection
      );
      localVideoTrackPackages = irisClientManager.getLocalVideoTrackPackageByConnection(
        connection
      );
    }
    //clientRole update
    if (isDefined(options.clientRoleType)) {
      if (
        options.clientRoleType ===
          NATIVE_RTC.CLIENT_ROLE_TYPE.CLIENT_ROLE_AUDIENCE &&
        irisClientState.clientRoleType !== options.clientRoleType
      ) {
        (this._engine.getImplInstance(
          'RtcEngine'
        ) as IRtcEngineImpl).muteLocalAudioStream(true);
        (this._engine.getImplInstance(
          'RtcEngine'
        ) as IRtcEngineImpl).muteLocalVideoStream(true);
        this._engine.rtcEngineEventHandler.onClientRoleChangedEx(
          irisClient.connection!,
          irisClientState.clientRoleType!,
          options.clientRoleType!,
          options
        );
      }
      if (agoraRTCClient) {
        await this._engine.clientHelper.setClientRole(
          agoraRTCClient,
          options.clientRoleType!,
          irisClientState.audienceLatencyLevel
        );
      }
      irisClientState.clientRoleType = options.clientRoleType;
    }

    //token update
    if (isDefined(options.token)) {
      try {
        await agoraRTCClient!.renewToken(options.token);
      } catch (e) {
        return this._engine.returnResult(false);
      }
    }

    let needPublishVideoTrackPackages: VideoTrackPackage[] = [];
    let needUnPublishVideoTrackPackages: VideoTrackPackage[] = [];
    let needPublishAudioTrackPackages: AudioTrackPackage[] = [];
    let needUnPublishAudioTrackPackages: AudioTrackPackage[] = [];
    if (
      irisClientState.clientRoleType ===
      NATIVE_RTC.CLIENT_ROLE_TYPE.CLIENT_ROLE_BROADCASTER
    ) {
      if (options.publishCameraTrack === false) {
        needUnPublishVideoTrackPackages = [
          ...needUnPublishVideoTrackPackages,
          ...localVideoTrackPackages.filter(
            (e) =>
              e.type ===
              NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA_PRIMARY
          ),
        ];
      }
      if (options.publishCameraTrack === true) {
        needPublishVideoTrackPackages = [
          ...needPublishVideoTrackPackages,
          ...localVideoTrackPackages.filter(
            (e) =>
              e.type ===
              NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA_PRIMARY
          ),
        ];
      }

      if (options.publishMicrophoneTrack === false) {
        needUnPublishAudioTrackPackages = [
          ...needUnPublishAudioTrackPackages,
          ...localAudioTrackPackages.filter(
            (e) =>
              e.type === IrisAudioSourceType.kAudioSourceTypeMicrophonePrimary
          ),
        ];
      }

      if (options.publishMicrophoneTrack === true) {
        needPublishAudioTrackPackages = [
          ...needPublishAudioTrackPackages,
          ...localAudioTrackPackages.filter(
            (e) =>
              e.type === IrisAudioSourceType.kAudioSourceTypeMicrophonePrimary
          ),
        ];
      }

      if (options.publishScreenTrack === false) {
        needUnPublishAudioTrackPackages = [
          ...needUnPublishAudioTrackPackages,
          ...localAudioTrackPackages.filter(
            (e) => e.type === IrisAudioSourceType.kAudioSourceTypeScreenCapture
          ),
        ];
        needUnPublishVideoTrackPackages = [
          ...needUnPublishVideoTrackPackages,
          ...localVideoTrackPackages.filter(
            (e) =>
              e.type ===
              NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_SCREEN_PRIMARY
          ),
        ];
      }

      if (options.publishScreenTrack === true) {
        needPublishAudioTrackPackages = [
          ...needPublishAudioTrackPackages,
          ...irisClientManager.localAudioTrackPackages.filter(
            (e) => e.type === IrisAudioSourceType.kAudioSourceTypeScreenCapture
          ),
        ];
        needPublishVideoTrackPackages = [
          ...needPublishVideoTrackPackages,
          ...irisClientManager.localVideoTrackPackages.filter(
            (e) =>
              e.type ===
              NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_SCREEN_PRIMARY
          ),
        ];
      }

      irisClientState.mergeChannelMediaOptions(options);
      await irisClientObserver.notifyLocal(
        NotifyType.UNPUBLISH_TRACK,
        [
          ...needUnPublishAudioTrackPackages,
          ...needUnPublishVideoTrackPackages,
        ],
        [irisClient]
      );

      await irisClientObserver.notifyLocal(
        NotifyType.PUBLISH_TRACK,
        [...needPublishVideoTrackPackages, ...needPublishAudioTrackPackages],
        [irisClient]
      );
    }
  }

  public async joinChannel(
    token: string,
    channelId: string,
    uid: UID,
    options: NATIVE_RTC.ChannelMediaOptions
  ) {
    let globalState = this._engine.globalState;
    let irisClient = this._engine.irisClientManager.getIrisClient();

    irisClient.createClient(options);
    options = irisClient.irisClientState;
    irisClient.irisClientState.token = token;

    if (options.parameters) {
      this.handleChannelMediaOptionsParameters(options.parameters, irisClient);
    }

    if (!irisClient.agoraRTCClient) {
      return this._engine.returnResult(false);
    }

    let agoraRTCClient = irisClient.agoraRTCClient;
    try {
      await agoraRTCClient.join(
        globalState.rtcEngineContext.appId!,
        channelId,
        token ? token : null,
        uid
      );
    } catch (reason) {
      AgoraConsole.error(reason);
      this._engine.rtcEngineEventHandler.onError(
        NATIVE_RTC.ERROR_CODE_TYPE.ERR_JOIN_CHANNEL_REJECTED,
        ''
      );
      irisClient.release();
      return this._engine.returnResult(false);
    }
    let con: NATIVE_RTC.RtcConnection = {
      channelId: channelId,
      localUid: agoraRTCClient.uid as number,
    };
    //@ts-ignore websdk的私有属性
    //如果是string uid 登录
    if (agoraRTCClient.isStringUID) {
      //@ts-ignore
      con.localUid = agoraRTCClient._joinInfo?.uid;
      this._engine.irisClientManager.addUserInfo({
        uid: con.localUid,
        userAccount: uid as string,
      });
    }
    irisClient.connection = con;
    this._engine.rtcEngineEventHandler.onJoinChannelSuccessEx(con, 0);

    if (
      irisClient.irisClientState.clientRoleType ===
        NATIVE_RTC.CLIENT_ROLE_TYPE.CLIENT_ROLE_BROADCASTER &&
      this._engine.globalState.enabledAudio &&
      options.publishMicrophoneTrack
    ) {
      if (
        !this._engine.irisClientManager.getLocalAudioTrackPackageBySourceType(
          IrisAudioSourceType.kAudioSourceTypeMicrophonePrimary
        )[0]
      ) {
        let audioTrack = await this._engine.implHelper.createMicrophoneAudioTrack(
          irisClient
        );
        this._engine.irisClientManager.addLocalAudioTrackPackage(
          new AudioTrackPackage(
            IrisAudioSourceType.kAudioSourceTypeMicrophonePrimary,
            audioTrack
          )
        );
        await this._engine.trackHelper.setEnabled(
          audioTrack as ILocalAudioTrack,
          true
        );
      }
    }

    await this._engine.irisClientManager.irisClientObserver.notifyLocal(
      NotifyType.PUBLISH_TRACK,
      [
        ...this._engine.irisClientManager.localAudioTrackPackages,
        ...this._engine.irisClientManager.localVideoTrackPackages,
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

  public handleChannelMediaOptionsParameters(
    parameters: string,
    irisClient: IrisClient
  ) {
    let json = JSON.parse(parameters);
    let keyList = Object.keys(json);
    for (let i = 0; i < keyList.length; i++) {
      switch (keyList[i]) {
        case 'che.audio.custom_channel_num':
          irisClient.irisClientState.isStereo = json[keyList[i]] === 1;
          break;
        case 'che.audio.custom_bitrate':
          irisClient.irisClientState.bitrate = json[keyList[i]];
          break;
        default:
      }
    }
  }
}
