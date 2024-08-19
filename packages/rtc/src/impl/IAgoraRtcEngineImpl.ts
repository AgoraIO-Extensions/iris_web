import * as NATIVE_RTC from '@iris/native-rtc';
import {
  AudioSourceOptions,
  BufferSourceAudioTrackInitConfig,
  ICameraVideoTrack,
  ILocalVideoTrack,
  IMicrophoneAudioTrack,
  VideoPlayerConfig,
} from 'agora-rtc-sdk-ng';
import {
  AsyncTaskType,
  CallApiReturnType,
  CallIrisApiResult,
} from 'iris-web-core';

import { IrisAudioSourceType } from '../base/BaseType';
import { defaultLeaveChannelOptions } from '../base/DefaultValue';
import { IrisClient } from '../engine/IrisClient';
import {
  BufferSourceAudioTrackPackage,
  VideoTrackPackage,
} from '../engine/IrisClientManager';
import { NotifyRemoteType, NotifyType } from '../engine/IrisClientObserver';
import { IrisIntervalType, IrisRtcEngine } from '../engine/IrisRtcEngine';

import { IRtcEngineExtensions } from '../extensions/IAgoraRtcEngineExtensions';
import { SendDataStreamMessage } from '../helper/ClientHelper';
import { AgoraConsole } from '../util/AgoraConsole';
import { AgoraTranslate } from '../util/AgoraTranslate';

export const RTCENGINE_KEY = 'RtcEngine';

//@ts-ignore
export class IRtcEngineImpl implements IRtcEngineExtensions {
  private _engine: IrisRtcEngine;

  constructor(engine: IrisRtcEngine) {
    this._engine = engine;
  }

  release(): CallApiReturnType {
    let processFunc = async (): Promise<CallIrisApiResult> => {
      await this._engine.irisClientManager.release();
      return this._engine.returnResult();
    };

    return this._engine.execute(processFunc);
  }

  setAppType(appType: number): CallApiReturnType {
    let processFunc = async (): Promise<CallIrisApiResult> => {
      this._engine.globalState.AgoraRTC.setAppType(appType);
      return this._engine.returnResult();
    };

    return this._engine.execute(processFunc);
  }

  initialize_0320339(context: NATIVE_RTC.RtcEngineContext): CallApiReturnType {
    let processFunc = async () => {
      // Return OK if already initialized.
      if (this._engine.irisClientManager.irisClientList.length > 0) {
        return this._engine.returnResult(
          true,
          NATIVE_RTC.ERROR_CODE_TYPE.ERR_OK
        );
      }

      new IrisClient(this._engine);

      this._engine.globalState.rtcEngineContext = context;

      if (context.areaCode) {
        this._engine.globalState.AgoraRTC.setArea([
          AgoraTranslate.NATIVE_RTCAREA_CODE2AREAS(context.areaCode),
        ]);
      }

      if (
        typeof context?.logConfig?.level === 'number' &&
        context?.logConfig?.level >= 0
      ) {
        this._engine.globalState.AgoraRTC.setLogLevel(
          AgoraTranslate.NATIVE_RTCLOG_LEVEL2Number(context?.logConfig?.level)
        );
      }
      //音频模块默认是开启的,所以默认创建音频轨道
      try {
        await this._engine.implHelper.createAudioTrack(
          IrisAudioSourceType.kAudioSourceTypeMicrophonePrimary
        );
      } catch (e) {
        AgoraConsole.warn(`createAudioTrack error: ${e}`);
      }

      let result = this._engine.globalState.AgoraRTC.checkSystemRequirements();
      return this._engine.returnResult(result);
    };

    return this._engine.execute(processFunc);
  }
  joinChannel_f097389(
    token: string,
    channelId: string,
    info: string,
    uid: number
  ): CallApiReturnType {
    let irisClient = this._engine.irisClientManager.getIrisClient();
    return this.joinChannel_cdbb747(
      token,
      channelId,
      uid,
      irisClient!.irisClientState
    );
  }
  joinChannel_cdbb747(
    token: string,
    channelId: string,
    uid: number,
    options: NATIVE_RTC.ChannelMediaOptions
  ): CallApiReturnType {
    let processJoinChannel = async (): Promise<CallIrisApiResult> => {
      await this._engine.implHelper.joinChannel(token, channelId, uid, options);
      return this._engine.returnResult();
    };

    return this._engine.execute(processJoinChannel);
  }
  updateChannelMediaOptions_7bfc1d7(
    options: NATIVE_RTC.ChannelMediaOptions
  ): CallApiReturnType {
    let processFunc: AsyncTaskType = async (): Promise<CallIrisApiResult> => {
      await this._engine.implHelper.updateChannelMediaOptions(options);

      return this._engine.returnResult();
    };
    return this._engine.execute(processFunc);
  }
  leaveChannel(): CallApiReturnType {
    return this.leaveChannel_2c0e3aa(defaultLeaveChannelOptions);
  }
  leaveChannel_2c0e3aa(
    options: NATIVE_RTC.LeaveChannelOptions
  ): CallApiReturnType {
    let processFunc: AsyncTaskType = async (): Promise<CallIrisApiResult> => {
      if (this._engine.irisClientManager.irisClientList.length === 0) {
        return this._engine.returnResult();
      }

      await this._engine.irisClientManager.irisClientObserver.notifyLocal(
        NotifyType.UNPUBLISH_TRACK,
        [
          ...this._engine.irisClientManager.localAudioTrackPackages,
          ...this._engine.irisClientManager.localVideoTrackPackages,
        ]
      );

      for (let irisClient of this._engine.irisClientManager.irisClientList) {
        let agoraRTCClient = irisClient.agoraRTCClient;

        if (agoraRTCClient) {
          //读取 options
          for (let trackPackage of irisClient.audioTrackPackages) {
            if (trackPackage.track) {
              let track = trackPackage.track as IMicrophoneAudioTrack;
              if (options.stopMicrophoneRecording) {
                await this._engine.trackHelper.setMuted(track, true);
              }
            }
          }
          if (options.stopAllEffect) {
            this.stopAllEffects();
            //todo effect
          }
          if (options.stopAudioMixing) {
            //todo audio Mixing
          }

          //为了防止离开频道后丢失了channelName和uid，所以需要先保存一下
          let con: NATIVE_RTC.RtcConnection = {
            channelId: agoraRTCClient.channelName,
            localUid: agoraRTCClient.uid as number,
          };

          agoraRTCClient.remoteUsers.map((remoteUser) => {
            this._engine.rtcEngineEventHandler.onUserOffline_0a32aac(
              irisClient.connection ?? con,
              remoteUser.uid as number,
              NATIVE_RTC.USER_OFFLINE_REASON_TYPE.USER_OFFLINE_DROPPED
            );
          });

          try {
            // webSDK在leave的时候会直接reset client 没有release方法
            await this._engine.clientHelper.leave(agoraRTCClient);
            AgoraConsole.log(`leaveChannel success`);
          } catch (e) {
            AgoraConsole.error(`leaveChannel failed:${e}`);
            this._engine.rtcEngineEventHandler.onError_d26c0fd(
              NATIVE_RTC.ERROR_CODE_TYPE.ERR_LEAVE_CHANNEL_REJECTED,
              ''
            );
          }
          this._engine.rtcEngineEventHandler.onLeaveChannel_c8e730d(
            irisClient.connection ?? con,
            new NATIVE_RTC.RtcStats()
          );
          irisClient.release();
        }
      }
      return this._engine.returnResult();
    };

    return this._engine.execute(processFunc);
  }
  setChannelProfile_a78fa4f(
    profile: NATIVE_RTC.CHANNEL_PROFILE_TYPE
  ): CallApiReturnType {
    let processFunc = async () => {
      // Return OK if already initialized.
      if (profile == null || profile == undefined) {
        return this._engine.returnResult(
          false,
          -NATIVE_RTC.ERROR_CODE_TYPE.ERR_INVALID_ARGUMENT
        );
      }
      this._engine.globalState.channelProfile = profile;
      return this._engine.returnResult();
    };

    return this._engine.execute(processFunc);
  }

  //可以在加入频道前后调用
  setClientRole_3426fa6(role: NATIVE_RTC.CLIENT_ROLE_TYPE): CallApiReturnType {
    let options: NATIVE_RTC.ClientRoleOptions = {
      audienceLatencyLevel:
        NATIVE_RTC.AUDIENCE_LATENCY_LEVEL_TYPE
          .AUDIENCE_LATENCY_LEVEL_ULTRA_LOW_LATENCY,
    };
    return this.setClientRole_b46cc48(role, options);
  }

  setClientRole_b46cc48(
    role: NATIVE_RTC.CLIENT_ROLE_TYPE,
    options: NATIVE_RTC.ClientRoleOptions
  ): CallApiReturnType {
    let processFunc = async (): Promise<CallIrisApiResult> => {
      let irisClient = this._engine.irisClientManager.getIrisClient();
      let oldRole = irisClient.irisClientState.clientRoleType;
      irisClient.irisClientState.clientRoleType = role;

      let client = irisClient?.agoraRTCClient;
      client &&
        (await this._engine.clientHelper.setClientRole(
          client,
          role,
          options.audienceLatencyLevel
        ));

      //todo1 需要确认这个api是不是会改变所有connection的role,目前只改变了irisClientList[0]的
      if (role === NATIVE_RTC.CLIENT_ROLE_TYPE.CLIENT_ROLE_AUDIENCE) {
        this.muteLocalAudioStream_5039d15(true);
        this.muteLocalVideoStream_5039d15(true);
      }
      //如果已经加入频道
      if (client?.channelName) {
        this._engine.rtcEngineEventHandler.onClientRoleChanged_2acaf10(
          irisClient.connection!,
          oldRole!,
          role,
          options
        );
      }

      return this._engine.returnResult();
    };

    return this._engine.execute(processFunc);
  }

  enableVideo(): CallApiReturnType {
    let processVideoTrack = async (): Promise<CallIrisApiResult> => {
      this._engine.globalState.enabledVideo = true;
      this._engine.globalState.autoSubscribeVideo = true;

      //local
      await this._engine.irisClientManager.irisClientObserver.notifyLocal(
        NotifyType.ENABLE_TRACK,
        [...this._engine.irisClientManager.localVideoTrackPackages]
      );
      for (let irisClient of this._engine.irisClientManager.irisClientList) {
        irisClient.irisClientState.autoSubscribeVideo = true;
        await this._engine.irisClientManager.irisClientObserver.notifyLocal(
          NotifyType.PUBLISH_TRACK,
          [...this._engine.irisClientManager.localVideoTrackPackages],
          [irisClient]
        );
      }

      //remote
      this.muteAllRemoteVideoStreams_5039d15(false);

      return this._engine.returnResult();
    };

    return this._engine.execute(processVideoTrack);
  }
  disableVideo(): CallApiReturnType {
    let processVideoTrack = async (): Promise<CallIrisApiResult> => {
      this._engine.globalState.enabledVideo = false;
      this._engine.globalState.autoSubscribeVideo = false;

      //local
      await this._engine.irisClientManager.irisClientObserver.notifyLocal(
        NotifyType.UNABLE_TRACK,
        [...this._engine.irisClientManager.localVideoTrackPackages]
      );
      for (let irisClient of this._engine.irisClientManager.irisClientList) {
        irisClient.irisClientState.autoSubscribeVideo = false;
        await this._engine.irisClientManager.irisClientObserver.notifyLocal(
          NotifyType.REMOVE_TRACK,
          [...this._engine.irisClientManager.localVideoTrackPackages],
          [irisClient]
        );
      }

      //remote
      this.muteAllRemoteVideoStreams_5039d15(true);

      return this._engine.returnResult();
    };
    return this._engine.execute(processVideoTrack);
  }
  startPreview(): CallApiReturnType {
    return this.startPreview_4fd718e(
      NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA
    );
  }
  startPreview_4fd718e(
    sourceType: NATIVE_RTC.VIDEO_SOURCE_TYPE
  ): CallApiReturnType {
    let process = async (): Promise<CallIrisApiResult> => {
      if (this._engine.globalState.enabledVideo == false) {
        AgoraConsole.error('call enableVideo(true) before startPreview');
        return this._engine.returnResult();
      }

      if (sourceType >= 5) {
        AgoraConsole.error('Invalid source type');
        return this._engine.returnResult(false);
      }

      AgoraConsole.debug(`startPreview_69ae92f1 videoSource: ${sourceType}`);

      if (sourceType == null) {
        sourceType == NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA_PRIMARY;
      }

      let videoTrackPackage: VideoTrackPackage;
      videoTrackPackage = this._engine.irisClientManager.getLocalVideoTrackPackageBySourceType(
        sourceType
      )[0];
      if (!videoTrackPackage) {
        videoTrackPackage = new VideoTrackPackage(
          undefined,
          undefined,
          sourceType,
          undefined
        );
        this._engine.irisClientManager.addLocalVideoTrackPackage(
          videoTrackPackage
        );
        if (this._engine.implHelper.isVideoCamera(sourceType)) {
          let cTrack: ICameraVideoTrack;
          cTrack = await this._engine.implHelper.createVideoCameraTrack();
          videoTrackPackage.track = cTrack;
        }
      }
      videoTrackPackage.isPreview = true;
      try {
        let track = videoTrackPackage?.track as ILocalVideoTrack;
        if (track) {
          await this._engine.irisClientManager.irisClientObserver.notifyLocal(
            NotifyType.ENABLE_TRACK,
            [videoTrackPackage]
          );
          if (videoTrackPackage.element) {
            this._engine.trackHelper.play(
              track,
              videoTrackPackage.element,
              videoTrackPackage.videoPlayerConfig
            );
          }
        }
      } catch (err) {
        AgoraConsole.error(err);
        return this._engine.returnResult(false);
      }
      this._engine.rtcEngineEventHandler.onLocalVideoStateChanged_a44228a(
        sourceType,
        NATIVE_RTC.LOCAL_VIDEO_STREAM_STATE.LOCAL_VIDEO_STREAM_STATE_ENCODING,
        0
      );
      return this._engine.returnResult();
    };

    return this._engine.execute(process);
  }
  stopPreview(): CallApiReturnType {
    return this.stopPreview_4fd718e(
      NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA
    );
  }
  stopPreview_4fd718e(
    sourceType: NATIVE_RTC.VIDEO_SOURCE_TYPE
  ): CallApiReturnType {
    let process = async (): Promise<CallIrisApiResult> => {
      if (sourceType >= 5) {
        AgoraConsole.error('Invalid source type');
        return this._engine.returnResult(false);
      }

      AgoraConsole.debug(`stopPreview_11d53f7b videoSource: ${sourceType}`);

      if (sourceType == null) {
        sourceType == NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA_PRIMARY;
      }

      let videoTrackPackage: VideoTrackPackage;
      videoTrackPackage = this._engine.irisClientManager.getLocalVideoTrackPackageBySourceType(
        sourceType
      )[0];
      videoTrackPackage.isPreview = false;
      try {
        let track = videoTrackPackage.track as ILocalVideoTrack;

        if (track) {
          await this._engine.irisClientManager.irisClientObserver.notifyLocal(
            NotifyType.UNABLE_TRACK,
            [videoTrackPackage]
          );
          if (videoTrackPackage.element && videoTrackPackage.track) {
            this._engine.trackHelper.stop(videoTrackPackage.track);
          }
        }
      } catch (err) {
        AgoraConsole.error(err);
        return this._engine.returnResult(false);
      }
      this._engine.rtcEngineEventHandler.onLocalVideoStateChanged_a44228a(
        sourceType,
        NATIVE_RTC.LOCAL_VIDEO_STREAM_STATE.LOCAL_VIDEO_STREAM_STATE_STOPPED,
        0
      );
      return this._engine.returnResult();
    };
    return this._engine.execute(process);
  }
  setVideoEncoderConfiguration_89677d8(
    config: NATIVE_RTC.VideoEncoderConfiguration
  ): CallApiReturnType {
    let processFunc = async (): Promise<CallIrisApiResult> => {
      this._engine.globalState.videoEncoderConfiguration = config;

      for (let videoTrackPackage of this._engine.irisClientManager
        .localVideoTrackPackages) {
        if (videoTrackPackage.track) {
          let track = videoTrackPackage.track as ICameraVideoTrack;
          await track.setEncoderConfiguration(
            AgoraTranslate.NATIVE_RTCVideoEncoderConfiguration2VideoEncoderConfiguration(
              config
            )
          );
        }
      }

      return this._engine.returnResult();
    };
    return this._engine.execute(processFunc);
  }
  setupLocalVideo_acc9c38(canvas: NATIVE_RTC.VideoCanvas): CallApiReturnType {
    let processVideoTrack = async (): Promise<CallIrisApiResult> => {
      let sourceType =
        canvas.sourceType ||
        NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA_PRIMARY;
      let trackPackage = this._engine.irisClientManager.getLocalVideoTrackPackageBySourceType(
        sourceType
      )[0];
      if (!trackPackage) {
        let config: VideoPlayerConfig = {
          fit: AgoraTranslate.NATIVE_RTC_RENDER_MODE_TYPE2Fit(
            canvas.renderMode
              ? canvas.renderMode
              : NATIVE_RTC.RENDER_MODE_TYPE.RENDER_MODE_FIT
          ),
          mirror:
            canvas.mirrorMode ===
              NATIVE_RTC.VIDEO_MIRROR_MODE_TYPE.VIDEO_MIRROR_MODE_AUTO ||
            canvas.mirrorMode ===
              NATIVE_RTC.VIDEO_MIRROR_MODE_TYPE.VIDEO_MIRROR_MODE_ENABLED,
        };
        trackPackage = new VideoTrackPackage(canvas.view, config, sourceType);
        this._engine.irisClientManager.addLocalVideoTrackPackage(trackPackage);
        if (this._engine.implHelper.isVideoCamera(sourceType)) {
          let cTrack: ICameraVideoTrack;
          cTrack = await this._engine.implHelper.createVideoCameraTrack();
          trackPackage.track = cTrack;
        }
      }
      trackPackage.type = sourceType;
      trackPackage.element = canvas.view;

      let track = trackPackage.track as ILocalVideoTrack;
      if (track) {
        await this._engine.irisClientManager.irisClientObserver.notifyLocal(
          NotifyType.ENABLE_TRACK,
          [trackPackage]
        );

        if (trackPackage.element && trackPackage.isPreview) {
          this._engine.trackHelper.play(
            track,
            trackPackage.element,
            trackPackage.videoPlayerConfig
          );
        }
      }
      return this._engine.returnResult();
    };

    return this._engine.execute(processVideoTrack);
  }
  enableAudio(): CallApiReturnType {
    let processAudioTracks = async (): Promise<CallIrisApiResult> => {
      this._engine.globalState.enabledAudio = true;

      //local
      await this._engine.irisClientManager.irisClientObserver.notifyLocal(
        NotifyType.ENABLE_TRACK,
        this._engine.irisClientManager.localAudioTrackPackages
      );
      for (let irisClient of this._engine.irisClientManager.irisClientList) {
        irisClient.irisClientState.autoSubscribeAudio = true;
        await this._engine.irisClientManager.irisClientObserver.notifyLocal(
          NotifyType.PUBLISH_TRACK,
          [...this._engine.irisClientManager.localAudioTrackPackages],
          [irisClient]
        );
      }

      //remote
      this.muteAllRemoteAudioStreams_5039d15(false);

      return this._engine.returnResult();
    };

    return this._engine.execute(processAudioTracks);
  }
  disableAudio(): CallApiReturnType {
    let processAudioTracks = async (): Promise<CallIrisApiResult> => {
      this._engine.globalState.enabledAudio = false;

      //local
      await this._engine.irisClientManager.irisClientObserver.notifyLocal(
        NotifyType.UNABLE_TRACK,
        this._engine.irisClientManager.localAudioTrackPackages
      );
      for (let irisClient of this._engine.irisClientManager.irisClientList) {
        irisClient.irisClientState.autoSubscribeAudio = false;
        await this._engine.irisClientManager.irisClientObserver.notifyLocal(
          NotifyType.REMOVE_TRACK,
          [...this._engine.irisClientManager.localAudioTrackPackages],
          [irisClient]
        );
      }

      //remote
      this.muteAllRemoteAudioStreams_5039d15(true);

      return this._engine.returnResult();
    };

    return this._engine.execute(processAudioTracks);
  }
  setAudioProfile_d944543(
    profile: NATIVE_RTC.AUDIO_PROFILE_TYPE,
    scenario: NATIVE_RTC.AUDIO_SCENARIO_TYPE
  ): CallApiReturnType {
    let processFunc = async (): Promise<CallIrisApiResult> => {
      this._engine.globalState.audioProfile = profile;
      this._engine.globalState.rtcEngineContext.audioScenario = scenario;

      return this._engine.returnResult();
    };

    return this._engine.execute(processFunc);
  }

  setAudioProfile_ac39c15(
    profile: NATIVE_RTC.AUDIO_PROFILE_TYPE
  ): CallApiReturnType {
    let processFunc = async (): Promise<CallIrisApiResult> => {
      this._engine.globalState.audioProfile = profile;

      return this._engine.returnResult();
    };

    return this._engine.execute(processFunc);
  }
  enableLocalAudio_5039d15(enabled: boolean): CallApiReturnType {
    let processFunc = async (): Promise<CallIrisApiResult> => {
      this._engine.globalState.enabledLocalAudio = enabled;

      //找到本地audio
      await this._engine.irisClientManager.irisClientObserver.notifyLocal(
        enabled ? NotifyType.ENABLE_TRACK : NotifyType.UNABLE_TRACK,
        this._engine.irisClientManager.localAudioTrackPackages
      );

      this.muteLocalAudioStream_5039d15(!enabled);
      return this._engine.returnResult();
    };

    return this._engine.execute(processFunc);
  }

  enableLocalVideo_5039d15(enabled: boolean): CallApiReturnType {
    let processFunc = async (): Promise<CallIrisApiResult> => {
      this._engine.globalState.enabledLocalVideo = enabled;

      //找到本地video
      await this._engine.irisClientManager.irisClientObserver.notifyLocal(
        enabled ? NotifyType.ENABLE_TRACK : NotifyType.UNABLE_TRACK,
        this._engine.irisClientManager.localVideoTrackPackages
      );

      this.muteLocalVideoStream_5039d15(!enabled);
      return this._engine.returnResult();
    };

    return this._engine.execute(processFunc);
  }
  muteLocalAudioStream_5039d15(mute: boolean): CallApiReturnType {
    let processFunc = async (): Promise<CallIrisApiResult> => {
      await this._engine.irisClientManager.irisClientObserver.notifyLocal(
        mute ? NotifyType.MUTE_TRACK : NotifyType.UNMUTE_TRACK,
        this._engine.irisClientManager.localAudioTrackPackages
      );

      return this._engine.returnResult();
    };

    return this._engine.execute(processFunc);
  }

  muteLocalVideoStream_5039d15(mute: boolean): CallApiReturnType {
    let process = async () => {
      await this._engine.irisClientManager.irisClientObserver.notifyLocal(
        mute ? NotifyType.MUTE_TRACK : NotifyType.UNMUTE_TRACK,
        this._engine.irisClientManager.localVideoTrackPackages
      );

      return this._engine.returnResult();
    };
    return this._engine.execute(process);
  }

  createDataStream_5862815(
    config: NATIVE_RTC.DataStreamConfig
  ): CallApiReturnType {
    let process = async () => {
      for (let irisClient of this._engine.irisClientManager.irisClientList) {
        irisClient.irisClientState.dataStreamConfig = config;
      }
      return this._engine.returnResult(
        true,
        0,
        JSON.stringify({
          result: 0,
          streamId: 0,
        })
      );
    };
    return this._engine.execute(process);
  }

  sendStreamMessage_8715a45(
    streamId: number,
    data: Uint8Array,
    length: number
  ): CallApiReturnType {
    let process = async () => {
      let irisClient = this._engine.irisClientManager.getIrisClient();
      let agoraRTCClient = irisClient?.agoraRTCClient;
      if (!agoraRTCClient?.channelName) {
        return this._engine.irisRtcErrorHandler.notInChannel();
      } else {
        await this._engine.clientHelper.sendStreamMessage(agoraRTCClient, {
          payload: data,
          syncWithAudio:
            irisClient.irisClientState.dataStreamConfig.syncWithAudio,
        } as SendDataStreamMessage);
      }

      return this._engine.returnResult();
    };
    return this._engine.execute(process);
  }

  muteAllRemoteVideoStreams_5039d15(mute: boolean): CallApiReturnType {
    let processFunc = async (): Promise<CallIrisApiResult> => {
      await this._engine.irisClientManager.irisClientObserver.notifyRemote(
        mute
          ? NotifyRemoteType.UNSUBSCRIBE_VIDEO_TRACK
          : NotifyRemoteType.SUBSCRIBE_VIDEO_TRACK,
        this._engine.irisClientManager.remoteUserPackages
      );

      return this._engine.returnResult();
    };

    return this._engine.execute(processFunc);
  }
  muteRemoteVideoStream_dbdc15a(uid: number, mute: boolean): CallApiReturnType {
    let processFunc = async (): Promise<CallIrisApiResult> => {
      let remoteUserPackage = this._engine.irisClientManager.getRemoteUserPackageByUid(
        uid
      );
      await this._engine.irisClientManager.irisClientObserver.notifyRemote(
        mute
          ? NotifyRemoteType.UNSUBSCRIBE_VIDEO_TRACK
          : NotifyRemoteType.SUBSCRIBE_VIDEO_TRACK,
        [remoteUserPackage]
      );

      return this._engine.returnResult();
    };

    return this._engine.execute(processFunc);
  }

  muteAllRemoteAudioStreams_5039d15(mute: boolean): CallApiReturnType {
    let processFunc = async (): Promise<CallIrisApiResult> => {
      await this._engine.irisClientManager.irisClientObserver.notifyRemote(
        mute
          ? NotifyRemoteType.UNSUBSCRIBE_AUDIO_TRACK
          : NotifyRemoteType.SUBSCRIBE_AUDIO_TRACK,
        this._engine.irisClientManager.remoteUserPackages
      );

      return this._engine.returnResult();
    };

    return this._engine.execute(processFunc);
  }
  muteRemoteAudioStream_dbdc15a(uid: number, mute: boolean): CallApiReturnType {
    let processFunc = async (): Promise<CallIrisApiResult> => {
      let remoteUserPackage = this._engine.irisClientManager.getRemoteUserPackageByUid(
        uid
      );
      await this._engine.irisClientManager.irisClientObserver.notifyRemote(
        mute
          ? NotifyRemoteType.UNSUBSCRIBE_AUDIO_TRACK
          : NotifyRemoteType.SUBSCRIBE_AUDIO_TRACK,
        [remoteUserPackage]
      );

      return this._engine.returnResult();
    };

    return this._engine.execute(processFunc);
  }
  enableAudioVolumeIndication_39794a0(
    interval: number,
    smooth: number,
    reportVad: boolean
  ): CallApiReturnType {
    let processFunc = async (): Promise<CallIrisApiResult> => {
      this._engine.globalState.enableAudioVolumeIndicationConfig = {
        ...this._engine.globalState.enableAudioVolumeIndicationConfig,
        ...(interval && { interval }),
        ...(smooth && { smooth }),
        ...(reportVad && { reportVad }),
      };
      //只有在初次的时候才注册onAudioVolumeIndication事件
      let agoraRTCClient = this._engine.irisClientManager.getIrisClient()
        ?.agoraRTCClient;

      if (!this._engine.globalState.enableAudioVolumeIndication) {
        let intervalFunction = setInterval(() => {
          if (agoraRTCClient) {
            const localStats = agoraRTCClient.getLocalAudioStats();
            let connection: NATIVE_RTC.RtcConnection = {
              channelId: agoraRTCClient.channelName,
              localUid: agoraRTCClient.uid as number,
            };
            if (reportVad) {
              this._engine.rtcEngineEventHandler.onAudioVolumeIndication_781482a(
                connection,
                [
                  {
                    uid: agoraRTCClient.uid as number,
                    volume: localStats?.sendVolumeLevel,
                    vad: localStats?.sendVolumeLevel > 0 ? 1 : 0,
                    // voicePitch: number,  web没有
                  },
                ],
                1,
                localStats?.sendVolumeLevel
              );
            }
            const remoteStats = agoraRTCClient.getRemoteAudioStats();
            let remoteSpeakers: {
              uid: number;
              volume: number;
              vad: number;
              voicePitch: number;
            }[] = [];
            for (let uid in remoteStats) {
              remoteSpeakers.push({
                uid: parseInt(uid),
                volume: remoteStats[uid].receiveLevel,
                vad: 1,
                voicePitch: 1.0,
              });
            }
            let totalVolume: number = 0;
            remoteSpeakers.forEach((speaker) => {
              totalVolume += speaker.volume;
            });
            this._engine.rtcEngineEventHandler.onAudioVolumeIndication_781482a(
              connection,
              remoteSpeakers,
              remoteSpeakers.length,
              totalVolume
            );
          }
        }, interval);
        this._engine.addIrisInterval(
          IrisIntervalType.enableAudioVolumeIndication,
          intervalFunction,
          0
        );
      }
      this._engine.globalState.enableAudioVolumeIndication = true;
      return this._engine.returnResult();
    };
    return this._engine.execute(processFunc);
  }
  playEffect_531a783(
    soundId: number,
    filePath: string,
    loopCount: number,
    pitch: number, //web没有
    pan: number, //web没有
    gain: number,
    publish: boolean,
    startPos: number
  ): CallApiReturnType {
    let processFunc = async (): Promise<CallIrisApiResult> => {
      if (
        !this._engine.globalState.enabledAudio ||
        !this._engine.globalState.enabledLocalAudio
      ) {
        AgoraConsole.error('please enableAudio first');
        return this._engine.returnResult(false);
      }

      let irisClient = this._engine.irisClientManager.getIrisClient();

      let bufferSourceAudioTrackPackage: BufferSourceAudioTrackPackage;
      let bufferSourceAudioTrackInitConfig: BufferSourceAudioTrackInitConfig = {
        source: '',
      };
      //如果是带有http或者https的则不拼接,否则拼接origin
      if (filePath.startsWith('https://') || filePath.startsWith('http://')) {
        bufferSourceAudioTrackInitConfig.source = filePath;
      } else {
        bufferSourceAudioTrackInitConfig.source = `${location.origin}/${filePath}`;
      }

      try {
        bufferSourceAudioTrackPackage = await this._engine.implHelper.createBufferSourceAudioTrack(
          soundId,
          publish,
          bufferSourceAudioTrackInitConfig
        );
        AgoraConsole.log('createBufferSourceAudioTrack success');
      } catch (err) {
        err && AgoraConsole.error(err);
        return this._engine.returnResult(false);
      }
      if (bufferSourceAudioTrackPackage.track) {
        //设置音效
        if (gain) {
          bufferSourceAudioTrackPackage.track.setVolume(gain);
        }
        try {
          //https://docportal.shengwang.cn/cn/video-call-4.x/audio_effect_mixing_web_ng?platform=Web#发布多个音频轨道以实现混音
          let config: AudioSourceOptions = {
            loop: false,
          };
          if (typeof loopCount === 'number' && loopCount >= 0) {
            config.cycle = loopCount;
            if (loopCount === -1) {
              config.loop = true;
            }
          }
          //native是毫秒 web是秒
          if (startPos) {
            config.startPlayTime = Math.floor(startPos / 1000);
          }
          bufferSourceAudioTrackPackage.track.startProcessAudioBuffer(config);
          this._engine.trackHelper.play(bufferSourceAudioTrackPackage.track);
        } catch (reason) {
          AgoraConsole.error(reason);
        }
      }
      if (publish) {
        await this._engine.irisClientManager.irisClientObserver.notifyLocal(
          NotifyType.PUBLISH_TRACK,
          [bufferSourceAudioTrackPackage],
          [irisClient]
        );
      }

      return this._engine.returnResult();
    };
    return this._engine.execute(processFunc);
  }
  stopEffect_46f8ab7(soundId: number): CallApiReturnType {
    let processFunc = async (): Promise<CallIrisApiResult> => {
      let bufferSourceAudioTrackPackage: BufferSourceAudioTrackPackage = this._engine.irisClientManager.getLocalAudioTrackPackageBySourceType(
        IrisAudioSourceType.kAudioSourceTypeBufferSourceAudio
      )[0] as BufferSourceAudioTrackPackage;
      if (!bufferSourceAudioTrackPackage?.track) {
        AgoraConsole.error(`soundId:${soundId} not found`);
        this._engine.rtcEngineEventHandler.onError_d26c0fd(
          NATIVE_RTC.ERROR_CODE_TYPE.ERR_FAILED,
          `soundId:${soundId} not found`
        );
        return this._engine.returnResult();
      }
      await this._engine.irisClientManager.irisClientObserver.notifyLocal(
        NotifyType.REMOVE_TRACK,
        [bufferSourceAudioTrackPackage]
      );

      return this._engine.returnResult();
    };

    return this._engine.execute(processFunc);
  }
  stopAllEffects(): CallApiReturnType {
    let processFunc = async (): Promise<CallIrisApiResult> => {
      let bufferSourceAudioTrackPackages: BufferSourceAudioTrackPackage[] = this._engine.irisClientManager.getLocalAudioTrackPackageBySourceType(
        IrisAudioSourceType.kAudioSourceTypeBufferSourceAudio
      ) as BufferSourceAudioTrackPackage[];
      bufferSourceAudioTrackPackages.map((bufferSourceAudioTrackPackage) => {
        if (
          bufferSourceAudioTrackPackage.track &&
          bufferSourceAudioTrackPackage.soundId
        ) {
          this.stopEffect_46f8ab7(bufferSourceAudioTrackPackage.soundId);
        }
      });
      return this._engine.returnResult();
    };

    return this._engine.execute(processFunc);
  }
  setLogLevel_f125d83(level: NATIVE_RTC.LOG_LEVEL): CallApiReturnType {
    let processFunc = async (): Promise<CallIrisApiResult> => {
      AgoraConsole.logLevel = level;
      let numberLevel: number = AgoraTranslate.NATIVE_RTCLOG_LEVEL2Number(
        level
      );
      this._engine.globalState.AgoraRTC.setLogLevel(numberLevel);
      return this._engine.returnResult();
    };

    return this._engine.execute(processFunc);
  }
  startScreenCapture_270da41(
    captureParams: NATIVE_RTC.ScreenCaptureParameters2
  ): CallApiReturnType {
    let process = async () => {
      if (this._engine.irisClientManager.getScreenCaptureStatus()) {
        AgoraConsole.error('you have already startScreenCapture');
        return this._engine.returnResult(false);
      }

      if (!captureParams.captureVideo) {
        AgoraConsole.log('captureVideo is false, do nothing');
        return this._engine.returnResult();
      }

      let videoType = NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_SCREEN_PRIMARY;

      try {
        await this._engine.implHelper.createScreenTrack(
          captureParams,
          videoType
        );
        AgoraConsole.log('ScreenShare track create success');
      } catch (err) {
        err && AgoraConsole.error(err);
        return this._engine.returnResult(false);
      }
      return this._engine.returnResult();
    };
    return this._engine.execute(process);
  }
  stopScreenCapture(): CallApiReturnType {
    return this.stopScreenCapture_4fd718e(
      NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_SCREEN_PRIMARY
    );
  }

  stopScreenCapture_4fd718e(
    sourceType: NATIVE_RTC.VIDEO_SOURCE_TYPE
  ): CallApiReturnType {
    //需要处理
    let processFunc = async (): Promise<CallIrisApiResult> => {
      let irisClientManager = this._engine.irisClientManager;
      if (!this._engine.irisClientManager.getScreenCaptureStatus()) {
        AgoraConsole.warn('screenCapture is not start');
        return this._engine.returnResult();
      }
      let videoPackages = irisClientManager.getLocalVideoTrackPackageBySourceType(
        sourceType
      );
      let audioPackages = irisClientManager.getLocalAudioTrackPackageBySourceType(
        IrisAudioSourceType.kAudioSourceTypeScreenCapture
      );
      if (videoPackages.length == 0) {
        AgoraConsole.error(`sourceType:${sourceType} is not start`);
        return this._engine.returnResult(false);
      }

      await this._engine.irisClientManager.irisClientObserver.notifyLocal(
        NotifyType.REMOVE_TRACK,
        [...videoPackages, ...audioPackages]
      );

      return this._engine.returnResult();
    };

    return this._engine.execute(processFunc);
  }

  registerEventHandler_5fc0465(eventHandler: any): CallApiReturnType {
    let processFunc = async (): Promise<CallIrisApiResult> => {
      this._engine.irisEventHandlerManager.addEventHandler(
        RTCENGINE_KEY,
        eventHandler
      );
      return this._engine.returnResult();
    };

    return this._engine.execute(processFunc);
  }
  unregisterEventHandler_5fc0465(eventHandler: any): CallApiReturnType {
    let processFunc = async (): Promise<CallIrisApiResult> => {
      this._engine.irisEventHandlerManager.removeEventHandler(
        RTCENGINE_KEY,
        eventHandler
      );

      return this._engine.returnResult();
    };

    return this._engine.execute(processFunc);
  }
  setParameters_3a2037f(parameters: string): CallApiReturnType {
    let fun = async () => {
      try {
        if (typeof parameters === 'string') {
          (this._engine.globalState.AgoraRTC as any).setParameter(
            undefined,
            parameters
          );
        } else {
          let json = JSON.parse(parameters);
          let keyList = Object.keys(json);
          for (let i = 0; i < keyList.length; i++) {
            (this._engine.globalState.AgoraRTC as any).setParameter(
              keyList[i],
              json[keyList[i]]
            );
          }
        }
      } catch (e) {
        AgoraConsole.log(e);
        return this._engine.returnResult(false);
      }
      return this._engine.returnResult();
    };
    return this._engine.execute(fun);
  }

  joinChannelWithUserAccount_0e4f59e(
    token: string,
    channelId: string,
    userAccount: string
  ): CallApiReturnType {
    let irisClient = this._engine.irisClientManager.getIrisClient();
    return this.joinChannelWithUserAccount_4685af9(
      token,
      channelId,
      userAccount,
      irisClient.irisClientState
    );
  }

  joinChannelWithUserAccount_4685af9(
    token: string,
    channelId: string,
    userAccount: string,
    options: NATIVE_RTC.ChannelMediaOptions
  ): CallApiReturnType {
    let processJoinChannel = async (): Promise<CallIrisApiResult> => {
      this._engine.implHelper.joinChannel(
        token,
        channelId,
        userAccount,
        options
      );
      return this._engine.returnResult();
    };

    return this._engine.execute(processJoinChannel);
  }

  getUserInfoByUserAccount_c6a8f08(userAccount: string): CallApiReturnType {
    let user = this._engine.irisClientManager.getUserInfoByUserAccount(
      userAccount
    );
    return this._engine.returnResult(
      true,
      0,
      JSON.stringify({
        result: 0,
        userInfo: user ?? { uid: null, userAccount: null },
      })
    );
  }

  getUserInfoByUid_6b7aee8(uid: number): CallApiReturnType {
    let user = this._engine.irisClientManager.getUserInfoByUid(uid);
    return this._engine.returnResult(
      true,
      0,
      JSON.stringify({
        result: 0,
        userInfo: user ?? { uid: null, userAccount: null },
      })
    );
  }

  setLocalRenderMode_cfb201b(
    renderMode: NATIVE_RTC.RENDER_MODE_TYPE,
    mirrorMode: NATIVE_RTC.VIDEO_MIRROR_MODE_TYPE
  ): CallApiReturnType {
    let config: VideoPlayerConfig = {
      fit: AgoraTranslate.NATIVE_RTC_RENDER_MODE_TYPE2Fit(
        renderMode ? renderMode : NATIVE_RTC.RENDER_MODE_TYPE.RENDER_MODE_FIT
      ),
      mirror:
        mirrorMode ===
          NATIVE_RTC.VIDEO_MIRROR_MODE_TYPE.VIDEO_MIRROR_MODE_AUTO ||
        mirrorMode ===
          NATIVE_RTC.VIDEO_MIRROR_MODE_TYPE.VIDEO_MIRROR_MODE_ENABLED,
    };
    this._engine.irisClientManager.localVideoTrackPackages.map(
      (videoTrackPackage) => {
        let track = videoTrackPackage.track as ILocalVideoTrack;
        videoTrackPackage.videoPlayerConfig = config;
        if (track) {
          this._engine.trackHelper.play(
            track,
            videoTrackPackage.element,
            videoTrackPackage.videoPlayerConfig
          );
        }
      }
    );
    return this._engine.returnResult();
  }

  setRemoteRenderMode_6771ce0(
    uid: number,
    renderMode: NATIVE_RTC.RENDER_MODE_TYPE,
    mirrorMode: NATIVE_RTC.VIDEO_MIRROR_MODE_TYPE
  ): CallApiReturnType {
    let config: VideoPlayerConfig = {
      fit: AgoraTranslate.NATIVE_RTC_RENDER_MODE_TYPE2Fit(
        renderMode ? renderMode : NATIVE_RTC.RENDER_MODE_TYPE.RENDER_MODE_FIT
      ),
      mirror:
        mirrorMode ===
          NATIVE_RTC.VIDEO_MIRROR_MODE_TYPE.VIDEO_MIRROR_MODE_AUTO ||
        mirrorMode ===
          NATIVE_RTC.VIDEO_MIRROR_MODE_TYPE.VIDEO_MIRROR_MODE_ENABLED,
    };
    let remoteUserPackage = this._engine.irisClientManager.remoteUserPackages.find(
      (user) => {
        return user.uid === uid;
      }
    );
    if (remoteUserPackage) {
      let irisClient = this._engine.irisClientManager.getIrisClientByConnection(
        remoteUserPackage.connection
      );
      if (irisClient) {
        let user = irisClient.agoraRTCClient?.remoteUsers.find(
          (item) => item.uid === remoteUserPackage!.uid
        );
        if (user && user.hasVideo) {
          remoteUserPackage.videoPlayerConfig = config;
          if (user.videoTrack) {
            this._engine.trackHelper.play(
              user.videoTrack,
              remoteUserPackage.element,
              remoteUserPackage.videoPlayerConfig
            );
          }
        }
      }
    }
    return this._engine.returnResult();
  }

  setLocalRenderMode_bedb5ae(
    renderMode: NATIVE_RTC.RENDER_MODE_TYPE
  ): CallApiReturnType {
    let fit = AgoraTranslate.NATIVE_RTC_RENDER_MODE_TYPE2Fit(
      renderMode ? renderMode : NATIVE_RTC.RENDER_MODE_TYPE.RENDER_MODE_FIT
    );
    this._engine.irisClientManager.localVideoTrackPackages.map(
      (videoTrackPackage) => {
        let track = videoTrackPackage.track as ILocalVideoTrack;
        videoTrackPackage.videoPlayerConfig.fit = fit;
        if (track) {
          this._engine.trackHelper.play(
            track,
            videoTrackPackage.element,
            videoTrackPackage.videoPlayerConfig
          );
        }
      }
    );
    return this._engine.returnResult();
  }

  setLocalVideoMirrorMode_b8a6c69(
    mirrorMode: NATIVE_RTC.VIDEO_MIRROR_MODE_TYPE
  ): CallApiReturnType {
    let mirror =
      mirrorMode === NATIVE_RTC.VIDEO_MIRROR_MODE_TYPE.VIDEO_MIRROR_MODE_AUTO ||
      mirrorMode ===
        NATIVE_RTC.VIDEO_MIRROR_MODE_TYPE.VIDEO_MIRROR_MODE_ENABLED;
    this._engine.irisClientManager.localVideoTrackPackages.map(
      (videoTrackPackage) => {
        let track = videoTrackPackage.track as ILocalVideoTrack;
        videoTrackPackage.videoPlayerConfig.mirror = mirror;
        if (track) {
          this._engine.trackHelper.play(
            track,
            videoTrackPackage.element,
            videoTrackPackage.videoPlayerConfig
          );
        }
      }
    );
    return this._engine.returnResult();
  }
}
