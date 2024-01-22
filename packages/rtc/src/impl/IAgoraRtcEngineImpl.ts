import * as NATIVE_RTC from '@iris/native-rtc';
import {
  AudioSourceOptions,
  BufferSourceAudioTrackInitConfig,
  IAgoraRTCClient,
  ICameraVideoTrack,
  ILocalVideoTrack,
  IMicrophoneAudioTrack,
} from 'agora-rtc-sdk-ng';
import {
  AsyncTaskType,
  CallApiReturnType,
  CallIrisApiResult,
} from 'iris-web-core';

import { IrisAudioSourceType } from '../base/BaseType';
import { IrisClient } from '../engine/IrisClient';
import {
  BufferSourceAudioTrackPackage,
  VideoTrackPackage,
} from '../engine/IrisClientManager';
import { NotifyRemoteType, NotifyType } from '../engine/IrisClientObserver';
import { IrisIntervalType, IrisRtcEngine } from '../engine/IrisRtcEngine';

import { IRtcEngineExtensions } from '../extensions/IAgoraRtcEngineExtensions';
import { AgoraConsole } from '../util/AgoraConsole';
import { AgoraTranslate } from '../util/AgoraTranslate';

export const RTCENGINE_KEY = 'RtcEngine';

//@ts-ignore
export class IRtcEngineImpl implements IRtcEngineExtensions {
  private _engine: IrisRtcEngine = null;

  constructor(engine: IrisRtcEngine) {
    this._engine = engine;
  }

  release(sync: boolean): CallApiReturnType {
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

  initialize(context: NATIVE_RTC.RtcEngineContext): CallApiReturnType {
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

      this._engine.globalState.AgoraRTC.setArea([
        AgoraTranslate.NATIVE_RTCAREA_CODE2AREAS(context.areaCode),
      ]);

      if (context?.logConfig?.level) {
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
  joinChannel_2edb6aea(
    token: string,
    channelId: string,
    info: string,
    uid: number
  ): CallApiReturnType {
    let irisClient = this._engine.irisClientManager.getIrisClient();
    return this.joinChannel_ab58eb4(
      token,
      channelId,
      uid,
      irisClient.irisClientState
    );
  }
  joinChannel_ab58eb4(
    token: string,
    channelId: string,
    uid: number,
    options: NATIVE_RTC.ChannelMediaOptions
  ): CallApiReturnType {
    let globalState = this._engine.globalState;
    let processJoinChannel = async (): Promise<CallIrisApiResult> => {
      let irisClient = this._engine.irisClientManager.getIrisClient();

      irisClient.createClient(options);
      options = irisClient.irisClientState;
      irisClient.irisClientState.token = token;

      let agoraRTCClient = irisClient.agoraRTCClient;
      try {
        await agoraRTCClient.join(
          globalState.rtcEngineContext.appId,
          channelId,
          token ? token : null,
          uid
        );
      } catch (reason) {
        AgoraConsole.error(reason);
        this._engine.rtcEngineEventHandler.onError_d26c0fd(
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
      irisClient.setConnection(con);
      this._engine.rtcEngineEventHandler.onJoinChannelSuccess_263e4cd(con, 0);
      await this._engine.irisClientManager.irisClientObserver.notifyLocal(
        NotifyType.PUBLISH_TRACK,
        [
          ...this._engine.irisClientManager.localAudioTrackPackages,
          ...this._engine.irisClientManager.localVideoTrackPackages,
        ],
        [irisClient]
      );

      return this._engine.returnResult();
    };

    return this._engine.execute(processJoinChannel);
  }
  updateChannelMediaOptions(
    options: NATIVE_RTC.ChannelMediaOptions
  ): CallApiReturnType {
    let processFunc: AsyncTaskType = async (): Promise<CallIrisApiResult> => {
      await this._engine.implHelper.updateChannelMediaOptions(options);

      return this._engine.returnResult();
    };
    return this._engine.execute(processFunc);
  }
  leaveChannel_6ee2c8c6(): CallApiReturnType {
    let options: NATIVE_RTC.LeaveChannelOptions = {
      stopAudioMixing: true,
      stopAllEffect: true,
      stopMicrophoneRecording: true,
    };
    return this.leaveChannel_16d487a0(options);
  }
  leaveChannel_16d487a0(
    options: NATIVE_RTC.LeaveChannelOptions
  ): CallApiReturnType {
    let processFunc: AsyncTaskType = async (): Promise<CallIrisApiResult> => {
      //离开频道后重置参数
      // this._engine.globalState.reset();
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
        irisClient.irisClientState.mergeChannelMediaOptions(options);
        let agoraRTCClient = irisClient.agoraRTCClient;
        options = irisClient.irisClientState;

        if (agoraRTCClient) {
          //读取 options
          for (let trackPackage of irisClient.audioTrackPackages) {
            if (trackPackage.track) {
              let track = trackPackage.track as IMicrophoneAudioTrack;
              if (options.stopMicrophoneRecording) {
                await this._engine.trackHelper.setMuted(track, true);
              }
              if (options.stopAllEffect) {
                this.stopAllEffects();
                //todo effect
              }
              if (options.stopAudioMixing) {
                //todo audio Mixing
              }
            }
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
            await agoraRTCClient.leave();
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
  setChannelProfile(
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
  setClientRole_551dc441(role: NATIVE_RTC.CLIENT_ROLE_TYPE): CallApiReturnType {
    let options: NATIVE_RTC.ClientRoleOptions = {
      audienceLatencyLevel:
        NATIVE_RTC.AUDIENCE_LATENCY_LEVEL_TYPE
          .AUDIENCE_LATENCY_LEVEL_ULTRA_LOW_LATENCY,
    };
    return this.setClientRole_291220d0(role, options);
  }

  setClientRole_291220d0(
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
      //todo2 需要追加调用 muteLocalVideoStream 修改发布状态。 这个api都还没做
      if (role === NATIVE_RTC.CLIENT_ROLE_TYPE.CLIENT_ROLE_AUDIENCE) {
        this.muteLocalAudioStream(true);
        // this.muteLocalVideoStream(true);
      }
      //如果已经加入频道
      if (client?.channelName) {
        this._engine.rtcEngineEventHandler.onClientRoleChanged_2acaf10(
          irisClient.connection,
          oldRole,
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
      this._engine.irisClientManager.irisClientObserver.notifyRemote(
        NotifyRemoteType.SUBSCRIBE_VIDEO_TRACK,
        this._engine.irisClientManager.remoteUserPackages
      );

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
          NotifyType.UNPUBLISH_TRACK,
          [...this._engine.irisClientManager.localVideoTrackPackages],
          [irisClient]
        );
      }

      //remote
      this._engine.irisClientManager.irisClientObserver.notifyRemote(
        NotifyRemoteType.UNSUBSCRIBE_VIDEO_TRACK,
        this._engine.irisClientManager.remoteUserPackages
      );

      return this._engine.returnResult();
    };
    return this._engine.execute(processVideoTrack);
  }
  startPreview_99a4d00(): CallApiReturnType {
    return this.startPreview_69ae92f1(
      NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA
    );
  }
  startPreview_69ae92f1(
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
        videoTrackPackage = new VideoTrackPackage(null, sourceType, null);
        this._engine.irisClientManager.addLocalVideoTrackPackage(
          videoTrackPackage
        );
        if (this._engine.implHelper.isVideoCamera(sourceType)) {
          let cTrack = null;
          cTrack = await this._engine.implHelper.createVideoCameraTrack();
          videoTrackPackage.update({ track: cTrack });
        }
      }
      videoTrackPackage.setPreview(true);
      try {
        let track = videoTrackPackage?.track as ILocalVideoTrack;
        if (track) {
          await this._engine.irisClientManager.irisClientObserver.notifyLocal(
            NotifyType.ENABLE_TRACK,
            [videoTrackPackage]
          );
          if (videoTrackPackage.element) {
            this._engine.trackHelper.play(track, videoTrackPackage.element);
          }
        }
      } catch (err) {
        AgoraConsole.error(err);
        return this._engine.returnResult(false);
      }
      this._engine.rtcEngineEventHandler.onLocalVideoStateChanged_9e9b3c6(
        sourceType,
        NATIVE_RTC.LOCAL_VIDEO_STREAM_STATE.LOCAL_VIDEO_STREAM_STATE_ENCODING,
        0
      );
      return this._engine.returnResult();
    };

    return this._engine.execute(process);
  }
  stopPreview_7da70914(): CallApiReturnType {
    return this.stopPreview_11d53f7b(
      NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA
    );
  }
  stopPreview_11d53f7b(
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
      videoTrackPackage?.setPreview(false);
      try {
        let track = videoTrackPackage?.track as ILocalVideoTrack;

        if (track) {
          await this._engine.irisClientManager.irisClientObserver.notifyLocal(
            NotifyType.UNABLE_TRACK,
            [videoTrackPackage]
          );
          if (videoTrackPackage.element) {
            this._engine.trackHelper.play(
              videoTrackPackage.track,
              videoTrackPackage.element
            );
          }
        }
      } catch (err) {
        AgoraConsole.error(err);
        return this._engine.returnResult(false);
      }
      this._engine.rtcEngineEventHandler.onLocalVideoStateChanged_9e9b3c6(
        sourceType,
        NATIVE_RTC.LOCAL_VIDEO_STREAM_STATE.LOCAL_VIDEO_STREAM_STATE_STOPPED,
        0
      );
      return this._engine.returnResult();
    };
    return this._engine.execute(process);
  }
  setVideoEncoderConfiguration(
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
  setupLocalVideo(canvas: NATIVE_RTC.VideoCanvas): CallApiReturnType {
    let processVideoTrack = async (): Promise<CallIrisApiResult> => {
      let sourceType =
        canvas.sourceType ||
        NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA_PRIMARY;
      let trackPackage = this._engine.irisClientManager.getLocalVideoTrackPackageBySourceType(
        sourceType
      )[0];
      if (!trackPackage) {
        trackPackage = new VideoTrackPackage(canvas.view, sourceType, null);
        this._engine.irisClientManager.addLocalVideoTrackPackage(trackPackage);
        if (this._engine.implHelper.isVideoCamera(sourceType)) {
          let cTrack = null;
          cTrack = await this._engine.implHelper.createVideoCameraTrack();
          trackPackage.update({ track: cTrack });
        }
      }
      trackPackage.update({ type: sourceType, element: canvas.view });

      let track = trackPackage.track as ILocalVideoTrack;
      if (track) {
        await this._engine.irisClientManager.irisClientObserver.notifyLocal(
          NotifyType.ENABLE_TRACK,
          [trackPackage]
        );

        if (trackPackage.element && trackPackage.isPreview) {
          this._engine.trackHelper.play(track, trackPackage.element);
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
      this.muteAllRemoteAudioStreams(false);

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
          NotifyType.UNPUBLISH_TRACK,
          [...this._engine.irisClientManager.localAudioTrackPackages],
          [irisClient]
        );
      }

      //remote
      this.muteAllRemoteAudioStreams(true);

      return this._engine.returnResult();
    };

    return this._engine.execute(processAudioTracks);
  }
  setAudioProfile_38ea7f46(
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

  setAudioProfile_565157fd(
    profile: NATIVE_RTC.AUDIO_PROFILE_TYPE
  ): CallApiReturnType {
    let processFunc = async (): Promise<CallIrisApiResult> => {
      this._engine.globalState.audioProfile = profile;

      return this._engine.returnResult();
    };

    return this._engine.execute(processFunc);
  }
  enableLocalAudio(enabled: boolean): CallApiReturnType {
    let processFunc = async (): Promise<CallIrisApiResult> => {
      this._engine.globalState.enabledLocalAudio = enabled;

      //找到本地audio
      await this._engine.irisClientManager.irisClientObserver.notifyLocal(
        enabled ? NotifyType.ENABLE_TRACK : NotifyType.UNABLE_TRACK,
        this._engine.irisClientManager.localAudioTrackPackages
      );

      this.muteLocalAudioStream(!enabled);
      return this._engine.returnResult();
    };

    return this._engine.execute(processFunc);
  }
  muteLocalAudioStream(mute: boolean): CallApiReturnType {
    let processFunc = async (): Promise<CallIrisApiResult> => {
      await this._engine.irisClientManager.irisClientObserver.notifyLocal(
        mute ? NotifyType.MUTE_TRACK : NotifyType.UNMUTE_TRACK,
        this._engine.irisClientManager.localAudioTrackPackages
      );

      return this._engine.returnResult();
    };

    return this._engine.execute(processFunc);
  }
  muteAllRemoteAudioStreams(mute: boolean): CallApiReturnType {
    let processFunc = async (): Promise<CallIrisApiResult> => {
      this._engine.irisClientManager.irisClientObserver.notifyRemote(
        mute
          ? NotifyRemoteType.UNSUBSCRIBE_AUDIO_TRACK
          : NotifyRemoteType.SUBSCRIBE_AUDIO_TRACK,
        this._engine.irisClientManager.remoteUserPackages
      );

      return this._engine.returnResult();
    };

    return this._engine.execute(processFunc);
  }
  muteRemoteAudioStream(uid: number, mute: boolean): CallApiReturnType {
    let processFunc = async (): Promise<CallIrisApiResult> => {
      let remoteUserPackage = this._engine.irisClientManager.getRemoteUserPackageByUid(
        uid
      );
      this._engine.irisClientManager.irisClientObserver.notifyRemote(
        mute
          ? NotifyRemoteType.UNSUBSCRIBE_AUDIO_TRACK
          : NotifyRemoteType.SUBSCRIBE_AUDIO_TRACK,
        [remoteUserPackage]
      );

      return this._engine.returnResult();
    };

    return this._engine.execute(processFunc);
  }
  enableAudioVolumeIndication(
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
      let agoraRTCClient: IAgoraRTCClient = this._engine.irisClientManager.getIrisClient()
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
            let remoteSpeakers = [];
            for (let uid in remoteStats) {
              remoteSpeakers.push({
                uid: uid,
                volume: remoteStats[uid].receiveLevel,
                vad: 1,
                // voicePitch: number,  web没有
              });
            }
            let biggestVolumeRemoteSpeaker =
              remoteSpeakers.length > 0 ??
              remoteSpeakers.reduce((prev, curr) => {
                return curr.receiveLevel > prev.receiveLevel ? curr : prev;
              });
            this._engine.rtcEngineEventHandler.onAudioVolumeIndication_781482a(
              connection,
              remoteSpeakers,
              remoteSpeakers.length,
              biggestVolumeRemoteSpeaker
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
  playEffect(
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

      let bufferSourceAudioTrackPackage: BufferSourceAudioTrackPackage = null;
      let bufferSourceAudioTrackInitConfig: BufferSourceAudioTrackInitConfig = {
        source: null,
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
          bufferSourceAudioTrackPackage.track.play();
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
  stopEffect(soundId: number): CallApiReturnType {
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
        NotifyType.UNPUBLISH_TRACK,
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
          this.stopEffect(bufferSourceAudioTrackPackage.soundId);
        }
      });
      return this._engine.returnResult();
    };

    return this._engine.execute(processFunc);
  }
  setLogLevel(level: NATIVE_RTC.LOG_LEVEL): CallApiReturnType {
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
  startScreenCapture_d5e38fa(
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
  stopScreenCapture_11b608de(): CallApiReturnType {
    return this.stopScreenCapture_328d8bd3(
      NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_SCREEN_PRIMARY
    );
  }

  stopScreenCapture_328d8bd3(
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
        NotifyType.UNPUBLISH_TRACK,
        [...videoPackages, ...audioPackages]
      );

      return this._engine.returnResult();
    };

    return this._engine.execute(processFunc);
  }

  registerEventHandler(eventHandler: any): CallApiReturnType {
    let processFunc = async (): Promise<CallIrisApiResult> => {
      this._engine.irisEventHandlerManager.addEventHandler(
        RTCENGINE_KEY,
        eventHandler
      );
      return this._engine.returnResult();
    };

    return this._engine.execute(processFunc);
  }
  unregisterEventHandler(eventHandler: any): CallApiReturnType {
    let processFunc = async (): Promise<CallIrisApiResult> => {
      this._engine.irisEventHandlerManager.removeEventHandler(
        RTCENGINE_KEY,
        eventHandler
      );

      return this._engine.returnResult();
    };

    return this._engine.execute(processFunc);
  }
  setParameters(parameters: string): CallApiReturnType {
    let fun = async () => {
      try {
        let json = JSON.parse(parameters);
        let keyList = Object.keys(json);
        for (let i = 0; i < keyList.length; i++) {
          (this._engine.globalState.AgoraRTC as any).setParameter(
            keyList[i],
            json[keyList[i]]
          );
        }
      } catch (e) {
        AgoraConsole.log(e);
        return this._engine.returnResult(false);
      }
      return this._engine.returnResult();
    };
    return this._engine.execute(fun);
  }
}

//@ts-ignore
export class IVideoDeviceManagerImpl implements NATIVE_RTC.IVideoDeviceManager {
  private _engine: IrisRtcEngine;

  public constructor(engine: IrisRtcEngine) {
    this._engine = engine;
  }

  enumerateVideoDevices(): CallApiReturnType {
    let deviceList = [];
    let process = async () => {
      try {
        deviceList = (await this._engine.implHelper.enumerateDevices())
          ?.videoDevices;
      } catch (e) {
        AgoraConsole.log(e);
        return this._engine.returnResult(false);
      }
      return this._engine.returnResult(
        true,
        0,
        JSON.stringify({ result: deviceList })
      );
    };
    return this._engine.execute(process);
  }
  setDevice(deviceIdUTF8: string): CallApiReturnType {
    let process = async () => {
      this._engine.globalState.videoDeviceId = deviceIdUTF8;

      for (let videoTrackPackage of this._engine.irisClientManager
        .localVideoTrackPackages) {
        if (videoTrackPackage.track) {
          if (
            videoTrackPackage.type ==
              NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA_PRIMARY ||
            videoTrackPackage.type ==
              NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA_SECONDARY ||
            videoTrackPackage.type ==
              NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA_THIRD ||
            videoTrackPackage.type ==
              NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA_FOURTH
          ) {
            await this._engine.trackHelper.setDevice(
              videoTrackPackage.track as ICameraVideoTrack,
              deviceIdUTF8
            );
          }
        }
      }

      return this._engine.returnResult();
    };
    return this._engine.execute(process);
  }
  getDevice(deviceIdUTF8: string): CallApiReturnType {
    let process = async () => {
      let list: MediaDeviceInfo[] = [];
      let deviceId = '';
      if (this._engine.globalState.videoDeviceId) {
        deviceId = this._engine.globalState.videoDeviceId;
      } else {
        try {
          list = await this._engine.globalState.AgoraRTC.getCameras();
        } catch (e) {
          return this._engine.returnResult(false);
        }
        if (list && list.length > 0) {
          deviceId = list[0].deviceId;
        }
      }
      return this._engine.returnResult(
        true,
        0,
        JSON.stringify({
          result: NATIVE_RTC.ERROR_CODE_TYPE.ERR_OK,
          deviceIdUTF8: deviceId,
        })
      );
    };
    return this._engine.execute(process);
  }

  release(): CallApiReturnType {
    let process = async () => {
      let engine = this._engine;
      engine.globalState.playbackDevices = new Array();
      engine.globalState.recordingDevices = new Array();
      engine.globalState.videoDevices = new Array();
      return this._engine.returnResult();
    };
    return this._engine.execute(process);
  }
}
