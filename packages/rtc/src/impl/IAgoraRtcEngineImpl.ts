import * as NATIVE_RTC from '@iris/native-rtc-binding';
import {
  AudioSourceOptions,
  BufferSourceAudioTrackInitConfig,
  IAgoraRTCClient,
  IAgoraRTCRemoteUser,
  IBufferSourceAudioTrack,
  ICameraVideoTrack,
  ILocalAudioTrack,
  ILocalVideoTrack,
  IMicrophoneAudioTrack,
} from 'agora-rtc-sdk-ng';
import {
  AsyncTaskType,
  CallApiReturnType,
  CallIrisApiResult,
} from 'iris-web-core';

import { IrisAudioSourceType } from '../base/BaseType';
import { IrisClient, IrisClientType } from '../engine/IrisClient';
import { IrisIntervalType, IrisRtcEngine } from '../engine/IrisRtcEngine';

import { IrisTrackEventHandler } from '../event_handler/IrisTrackEventHandler';

import { IRtcEngineExtensions } from '../extensions/IAgoraRtcEngineExtensions';
import { ClientHelper } from '../helper/ClientHelper';
import { TrackHelper } from '../helper/TrackHelper';
import { AgoraConsole } from '../util/AgoraConsole';
import { AgoraTranslate } from '../util/AgoraTranslate';

import { ImplHelper } from './ImplHelper';

export const RTCENGINE_KEY = 'RtcEngine';

export class IRtcEngineImpl implements IRtcEngineExtensions {
  private _engine: IrisRtcEngine = null;

  constructor(engine: IrisRtcEngine) {
    this._engine = engine;
  }

  isFeatureAvailableOnDevice(type: NATIVE_RTC.FeatureType): CallApiReturnType {
    AgoraConsole.warn(
      'isFeatureAvailableOnDevice not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }

  release(sync: boolean): CallApiReturnType {
    let processFunc = async (): Promise<CallIrisApiResult> => {
      await this._engine.entitiesContainer.release();
      return this._engine.returnResult();
    };

    return this._engine.execute(processFunc);
  }

  setAppType(appType: number): CallApiReturnType {
    let processFunc = async (): Promise<CallIrisApiResult> => {
      this._engine.globalVariables.AgoraRTC.setAppType(appType);
      return this._engine.returnResult();
    };

    return this._engine.execute(processFunc);
  }

  initialize(context: NATIVE_RTC.RtcEngineContext): CallApiReturnType {
    if (this._engine.entitiesContainer.irisClientList.length > 0) {
      AgoraConsole.error('you have already initialize');
      return this._engine.returnResult(
        false,
        -NATIVE_RTC.ERROR_CODE_TYPE.ERR_FAILED
      );
    }
    let processFunc = () => {
      //创建irisClient,由于是RtcEngine创建,所以是main类型
      let irisClient = new IrisClient(this._engine, IrisClientType.MAIN);

      this._engine.globalVariables.rtcEngineContext = context;
      irisClient.irisClientVariables.channelProfile = context.channelProfile;

      this._engine.globalVariables.AgoraRTC.setArea([
        AgoraTranslate.NATIVE_RTCAREA_CODE2AREAS(context.areaCode),
      ]);

      if (context?.logConfig?.level) {
        this._engine.globalVariables.AgoraRTC.setLogLevel(
          AgoraTranslate.NATIVE_RTCLOG_LEVEL2Number(context?.logConfig?.level)
        );
      }

      let result = this._engine.globalVariables.AgoraRTC.checkSystemRequirements();
      return this._engine.returnResult(result);
    };

    return this._engine.execute(processFunc);
  }
  getVersion(): CallApiReturnType {
    AgoraConsole.warn('getVersion not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  getErrorDescription(code: number): CallApiReturnType {
    AgoraConsole.warn('getErrorDescription not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  queryCodecCapability(
    codecInfo: NATIVE_RTC.CodecCapInfo[],
    size: number
  ): CallApiReturnType {
    AgoraConsole.warn('queryCodecCapability not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  preloadChannel(
    token: string,
    channelId: string,
    uid: number
  ): CallApiReturnType {
    AgoraConsole.warn('preloadChannel not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  preloadChannel2(
    token: string,
    channelId: string,
    userAccount: string
  ): CallApiReturnType {
    AgoraConsole.warn('preloadChannel2 not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  updatePreloadChannelToken(token: string): CallApiReturnType {
    AgoraConsole.warn(
      'updatePreloadChannelToken not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  joinChannel(
    token: string,
    channelId: string,
    info: string,
    uid: number
  ): CallApiReturnType {
    let irisClient = this._engine.entitiesContainer.getIrisClient();
    let mvs = irisClient.irisClientVariables;

    let options: NATIVE_RTC.ChannelMediaOptions = {
      publishCameraTrack:
        mvs.publishCameraTrack != null ? mvs.publishCameraTrack : true,
      publishSecondaryCameraTrack:
        mvs.publishSecondaryCameraTrack != null
          ? mvs.publishSecondaryCameraTrack
          : false,
      // publishAudioTrack:
      //   mvs.publishAudioTrack != null ? mvs.publishAudioTrack : true,
      autoSubscribeAudio:
        mvs.autoSubscribeAudio != null ? mvs.autoSubscribeAudio : true,
      autoSubscribeVideo:
        mvs.autoSubscribeVideo != null ? mvs.autoSubscribeVideo : true,
      clientRoleType:
        mvs.clientRoleType != null
          ? mvs.clientRoleType
          : NATIVE_RTC.CLIENT_ROLE_TYPE.CLIENT_ROLE_BROADCASTER,
      defaultVideoStreamType:
        mvs.defaultVideoStreamType != null
          ? mvs.defaultVideoStreamType
          : NATIVE_RTC.VIDEO_STREAM_TYPE.VIDEO_STREAM_HIGH,
      channelProfile:
        mvs.channelProfile ||
        NATIVE_RTC.CHANNEL_PROFILE_TYPE.CHANNEL_PROFILE_COMMUNICATION,
    };
    return this.joinChannel2(token, channelId, uid, options);
  }
  joinChannel2(
    token: string,
    channelId: string,
    uid: number,
    options: NATIVE_RTC.ChannelMediaOptions
  ): CallApiReturnType {
    let globalVariables = this._engine.globalVariables;
    let entitiesContainer = this._engine.entitiesContainer;
    let processJoinChannel = async (): Promise<CallIrisApiResult> => {
      let irisClient = this._engine.entitiesContainer.getIrisClient();
      //创建agoraRTCClient,如果没有main irisClient则创建
      if (!irisClient) {
        irisClient = new IrisClient(this._engine, IrisClientType.MAIN);
      }
      irisClient.createClient(options);
      irisClient.irisClientVariables.token = token;

      let irisClientVariables = irisClient.irisClientVariables;
      let agoraRTCClient = irisClient.agoraRTCClient;
      try {
        await agoraRTCClient.join(
          globalVariables.rtcEngineContext.appId,
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

      let audioSource: IrisAudioSourceType =
        IrisAudioSourceType.kAudioSourceTypeUnknown;
      if (globalVariables.enabledAudio && globalVariables.enabledLocalAudio) {
        if (irisClientVariables.publishAudioTrack) {
          audioSource = IrisAudioSourceType.kAudioSourceTypeMicrophonePrimary;
        } else if (irisClientVariables.publishScreenCaptureAudio) {
          audioSource = IrisAudioSourceType.kAudioSourceTypeScreenPrimary;
        }
      }

      let videoSource: NATIVE_RTC.VIDEO_SOURCE_TYPE =
        NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_UNKNOWN;
      if (globalVariables.enabledVideo && globalVariables.enabledLocalVideo) {
        if (irisClientVariables.publishCameraTrack) {
          videoSource =
            NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA_PRIMARY;
        } else if (irisClientVariables.publishSecondaryCameraTrack) {
          videoSource =
            NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA_SECONDARY;
        } else if (irisClientVariables.publishScreenTrack) {
          videoSource =
            NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_SCREEN_PRIMARY;
        } else if (irisClientVariables.publishSecondaryScreenTrack) {
          videoSource =
            NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_SCREEN_SECONDARY;
        }
      }
      let trackArray: [ILocalAudioTrack, ILocalVideoTrack] = [null, null];
      try {
        trackArray = await ImplHelper.getOrCreateAudioAndVideoTrackAsync(
          this._engine,
          audioSource,
          videoSource,
          null
        );
      } catch (e) {
        AgoraConsole.error(e);
        return this._engine.returnResult(false);
      }

      //推送audioTrack
      let audioTrack: ILocalAudioTrack = trackArray[0] as ILocalAudioTrack;
      if (audioTrack) {
        try {
          await agoraRTCClient.publish(audioTrack);
        } catch (reason) {
          AgoraConsole.error(reason);
        }

        irisClient.addLocalAudioTrack({
          type: audioSource,
          track: audioTrack,
        });
        let trackEventHandler: IrisTrackEventHandler = new IrisTrackEventHandler(
          {
            channelName: channelId,
            client: agoraRTCClient,
            track: audioTrack,
            trackType: 'ILocalTrack',
          },
          this._engine
        );
        irisClient.addTrackEventHandler(trackEventHandler);
      }
      //推送video
      let videoTrack: ILocalVideoTrack = trackArray[1] as ILocalVideoTrack;
      if (videoTrack) {
        try {
          await agoraRTCClient.publish(videoTrack);
        } catch (reason) {
          AgoraConsole.error(reason);
        }
        irisClient.setLocalVideoTrack({
          type: videoSource,
          track: videoTrack,
        });
        let trackEventHandler: IrisTrackEventHandler = new IrisTrackEventHandler(
          {
            channelName: channelId,
            client: agoraRTCClient,
            track: videoTrack,
            trackType: 'ILocalVideoTrack',
          },
          this._engine
        );
        irisClient.addTrackEventHandler(trackEventHandler);
      }

      let con: NATIVE_RTC.RtcConnection = {
        channelId: channelId,
        localUid: agoraRTCClient.uid as number,
      };
      this._engine.rtcEngineEventHandler.onJoinChannelSuccessEx(con, 0);

      return this._engine.returnResult();
    };

    return this._engine.execute(processJoinChannel);
  }
  updateChannelMediaOptions(
    options: NATIVE_RTC.ChannelMediaOptions
  ): CallApiReturnType {
    let processFunc: AsyncTaskType = async (): Promise<CallIrisApiResult> => {
      //必须先依次 unpublish, 完毕之后，再依次去publish
      let entitiesContainer = this._engine.entitiesContainer;
      let irisClient = entitiesContainer.getIrisClient();
      irisClient.irisClientVariables.mergeChannelMediaOptions(options);

      let agoraRTCClient = irisClient?.agoraRTCClient;
      if (!agoraRTCClient) {
        return this._engine.returnResult(
          false,
          -NATIVE_RTC.ERROR_CODE_TYPE.ERR_FAILED
        );
      }

      let argsUnpublish: Array<[
        string,
        IrisAudioSourceType | NATIVE_RTC.VIDEO_SOURCE_TYPE,
        'audio' | 'video'
      ]> = [];
      let argsPublish: Array<[
        string,
        IrisAudioSourceType | NATIVE_RTC.VIDEO_SOURCE_TYPE,
        'audio' | 'video'
      ]> = [];

      // if (options.publishAudioTrack == false) {
      //   argsUnpublish.push([
      //     'publishAudioTrack',
      //     IrisAudioSourceType.kAudioSourceTypeMicrophonePrimary,
      //     'audio',
      //   ]);
      // } else if (options.publishAudioTrack == true) {
      //   argsPublish.push([
      //     'publishAudioTrack',
      //     IrisAudioSourceType.kAudioSourceTypeMicrophonePrimary,
      //     'audio',
      //   ]);
      // }

      if (options.publishCameraTrack == false) {
        argsUnpublish.push([
          'publishCameraTrack',
          NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA_PRIMARY,
          'video',
        ]);
      } else if (options.publishCameraTrack == true) {
        argsPublish.push([
          'publishCameraTrack',
          NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA_PRIMARY,
          'video',
        ]);
      }

      if (options.publishSecondaryCameraTrack == false) {
        argsUnpublish.push([
          'publishSecondaryCameraTrack',
          NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA_SECONDARY,
          'video',
        ]);
      } else if (options.publishSecondaryCameraTrack == true) {
        argsPublish.push([
          'publishSecondaryCameraTrack',
          NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA_SECONDARY,
          'video',
        ]);
      }

      if (options.publishScreenCaptureAudio == false) {
        argsUnpublish.push([
          'publishScreenCaptureAudio',
          IrisAudioSourceType.kAudioSourceTypeScreenPrimary,
          'audio',
        ]);
      } else if (options.publishScreenCaptureAudio == true) {
        argsPublish.push([
          'publishScreenCaptureAudio',
          IrisAudioSourceType.kAudioSourceTypeScreenPrimary,
          'audio',
        ]);
      }

      if (options.publishScreenTrack == false) {
        argsUnpublish.push([
          'publishScreenTrack',
          NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_SCREEN_PRIMARY,
          'video',
        ]);
      } else if (options.publishScreenTrack == true) {
        argsPublish.push([
          'publishScreenTrack',
          NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_SCREEN_PRIMARY,
          'video',
        ]);
      }

      if (options.publishSecondaryScreenTrack == false) {
        argsUnpublish.push([
          'publishSecondaryScreenTrack',
          NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_SCREEN_SECONDARY,
          'video',
        ]);
      } else if (options.publishSecondaryScreenTrack == true) {
        argsPublish.push([
          'publishSecondaryScreenTrack',
          NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_SCREEN_SECONDARY,
          'video',
        ]);
      }

      for (let UnpublishArgs of argsUnpublish) {
        let optionName = UnpublishArgs[0];
        let audioOrVideoType = UnpublishArgs[1];
        let type = UnpublishArgs[2];

        if (type == 'audio') {
          //unpublish audio
          let audioPackage = entitiesContainer.getLocalAudioTrack(
            audioOrVideoType as IrisAudioSourceType,
            null
          );
          if (audioPackage) {
            let track = audioPackage.track as ILocalAudioTrack;
            if (agoraRTCClient.localTracks.indexOf(track) != -1) {
              try {
                await agoraRTCClient.unpublish(track);
                AgoraConsole.log(optionName + '(false) changed success');
                irisClient.removeTrackEventHandlerByTrack(track);
                irisClient.removeLocalAudioTrack(track);
              } catch (reason) {
                AgoraConsole.error(optionName + '(false) changed failed');
              }
            }
          }
        } else {
          //unpublish video
          let videoPackage = entitiesContainer.getLocalVideoTrack(
            audioOrVideoType as NATIVE_RTC.VIDEO_SOURCE_TYPE,
            null
          );
          if (videoPackage) {
            let track = videoPackage.track as ILocalVideoTrack;
            if (agoraRTCClient.localTracks.indexOf(track) != -1) {
              try {
                await agoraRTCClient.unpublish(track);
                AgoraConsole.log(optionName + '(false) changed success');
                irisClient.removeTrackEventHandlerByTrack(track);
                irisClient.clearLocalVideoTrack();
              } catch (reason) {
                AgoraConsole.error(optionName + '(false) changed failed');
              }
            }
          }
        }
      }

      for (let publishArgs of argsPublish) {
        let optionName = publishArgs[0];
        let audioOrVideoType = publishArgs[1];
        let type = publishArgs[2];
        if (type == 'audio') {
          //publish audio
          let audioPackage = entitiesContainer.getLocalAudioTrack(
            audioOrVideoType as IrisAudioSourceType,
            null
          );
          if (audioPackage) {
            let track = audioPackage.track as ILocalAudioTrack;
            if (agoraRTCClient.localTracks.indexOf(track) == -1) {
              try {
                await agoraRTCClient.publish(track);
                AgoraConsole.log(optionName + '(true) changed success');
                let trackEventHandler: IrisTrackEventHandler = new IrisTrackEventHandler(
                  {
                    channelName: agoraRTCClient.channelName,
                    client: agoraRTCClient,
                    track: track,
                    trackType: 'ILocalTrack',
                  },
                  this._engine
                );

                irisClient.addTrackEventHandler(trackEventHandler);
                irisClient.addLocalAudioTrack({
                  type: audioOrVideoType as IrisAudioSourceType,
                  track: track,
                });
              } catch (reason) {
                AgoraConsole.error(optionName + '(true) changed failed');
              }
            }
          }
        } else {
          //publish video
          let videoPackage = entitiesContainer.getLocalVideoTrack(
            audioOrVideoType as NATIVE_RTC.VIDEO_SOURCE_TYPE,
            null
          );
          if (videoPackage) {
            let track = videoPackage.track as ILocalVideoTrack;
            if (agoraRTCClient.localTracks.indexOf(track) == -1) {
              try {
                await agoraRTCClient.publish(track);
                AgoraConsole.log(optionName + '(true) changed success');
                let trackEventHandler: IrisTrackEventHandler = new IrisTrackEventHandler(
                  {
                    channelName: agoraRTCClient.channelName,
                    client: agoraRTCClient,
                    track: track,
                    trackType: 'ILocalVideoTrack',
                  },
                  this._engine
                );

                irisClient.addTrackEventHandler(trackEventHandler);
                irisClient.setLocalVideoTrack({
                  type: audioOrVideoType as NATIVE_RTC.VIDEO_SOURCE_TYPE,
                  track: track,
                });
              } catch (reason) {
                AgoraConsole.error(optionName + '(true) changed failed');
              }
            }
          }
        }
      }

      if (options.clientRoleType != null) {
        await ClientHelper.setClientRole(
          agoraRTCClient,
          options.clientRoleType,
          options.audienceLatencyLevel
        );
      }

      if (options.token != null) {
        try {
          await agoraRTCClient.renewToken(options.token);
          //这里的新token已经在 fun 的第一行被保存了
        } catch (e) {
          AgoraConsole.error('renewToken failed');
        }
      }
      return CallIrisApiResult.success();
    };
    return this._engine.execute(processFunc);
  }
  leaveChannel(): CallApiReturnType {
    let options: NATIVE_RTC.LeaveChannelOptions = {
      stopAudioMixing: true,
      stopAllEffect: true,
      stopMicrophoneRecording: true,
    };
    return this.leaveChannel2(options);
  }
  leaveChannel2(options: NATIVE_RTC.LeaveChannelOptions): CallApiReturnType {
    let processFunc: AsyncTaskType = async (): Promise<CallIrisApiResult> => {
      //离开频道啦 稍后处理
      if (this._engine.entitiesContainer.irisClientList.length === 0) {
        return this._engine.returnResult();
      }
      this._engine.entitiesContainer.irisClientList.map(async (irisClient) => {
        let agoraRTCClient = irisClient.agoraRTCClient;

        if (agoraRTCClient) {
          //读取 options
          let audioTrack = this._engine.entitiesContainer.getLocalAudioTrack(
            IrisAudioSourceType.kAudioSourceTypeMicrophonePrimary,
            null
          );
          if (audioTrack) {
            let track = audioTrack.track as IMicrophoneAudioTrack;
            if (options.stopMicrophoneRecording && !track.muted) {
              await track.setMuted(true);
            } else if (!options.stopMicrophoneRecording && track.muted) {
              await track.setMuted(false);
            }
            track.isPlaying && track.stop();
            track.close();
          }

          //为了防止离开频道后丢失了channelName和uid，所以需要先保存一下
          let con: NATIVE_RTC.RtcConnection = {
            channelId: agoraRTCClient.channelName,
            localUid: agoraRTCClient.uid as number,
          };

          try {
            // webSDK在leave的时候会直接reset client 没有release方法
            await agoraRTCClient.leave();
            AgoraConsole.log(`leaveChannel success`);
          } catch (e) {
            AgoraConsole.error(`leaveChannel failed:${e}`);
            this._engine.rtcEngineEventHandler.onError(
              NATIVE_RTC.ERROR_CODE_TYPE.ERR_LEAVE_CHANNEL_REJECTED,
              ''
            );
          }
          this._engine.rtcEngineEventHandler.onLeaveChannelEx(
            irisClient.connection ?? con,
            new NATIVE_RTC.RtcStats()
          );
          irisClient.release();
        }
      });
      return this._engine.returnResult();
    };

    return this._engine.execute(processFunc);
  }
  renewToken(token: string): CallApiReturnType {
    AgoraConsole.warn('renewToken not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setChannelProfile(
    profile: NATIVE_RTC.CHANNEL_PROFILE_TYPE
  ): CallApiReturnType {
    AgoraConsole.warn('setChannelProfile not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }

  //可以在加入频道前后调用
  setClientRole(role: NATIVE_RTC.CLIENT_ROLE_TYPE): CallApiReturnType {
    let options: NATIVE_RTC.ClientRoleOptions = {
      audienceLatencyLevel:
        NATIVE_RTC.AUDIENCE_LATENCY_LEVEL_TYPE
          .AUDIENCE_LATENCY_LEVEL_ULTRA_LOW_LATENCY,
    };
    return this.setClientRole2(role, options);
  }

  setClientRole2(
    role: NATIVE_RTC.CLIENT_ROLE_TYPE,
    options: NATIVE_RTC.ClientRoleOptions
  ): CallApiReturnType {
    let processFunc = async (): Promise<CallIrisApiResult> => {
      let irisClient = this._engine.entitiesContainer.getIrisClient();
      irisClient.irisClientVariables.clientRoleType = role;

      let client = this._engine.entitiesContainer.getIrisClient()
        ?.agoraRTCClient;
      client &&
        (await ClientHelper.setClientRole(
          client,
          role,
          options.audienceLatencyLevel
        ));

      return this._engine.returnResult();
    };

    return this._engine.execute(processFunc);
  }

  startEchoTest(): CallApiReturnType {
    AgoraConsole.warn('startEchoTest not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  startEchoTest2(intervalInSeconds: number): CallApiReturnType {
    AgoraConsole.warn('startEchoTest2 not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }

  startEchoTest3(config: NATIVE_RTC.EchoTestConfiguration): CallApiReturnType {
    AgoraConsole.warn('startEchoTest3 not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }

  stopEchoTest(): CallApiReturnType {
    AgoraConsole.warn('stopEchoTest not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }

  enableMultiCamera(
    enabled: boolean,
    config: NATIVE_RTC.CameraCapturerConfiguration
  ): CallApiReturnType {
    AgoraConsole.warn('enableMultiCamera not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }

  enableVideo(): CallApiReturnType {
    let processVideoTrack = async (): Promise<CallIrisApiResult> => {
      this._engine.globalVariables.enabledVideo = true;

      let irisClient = this._engine.entitiesContainer.getIrisClient();
      if (irisClient) {
        irisClient.irisClientVariables.publishCameraTrack = true;
      }

      //找到本端video
      if (this._engine.globalVariables.enabledLocalVideo) {
        let trackPackages = this._engine.entitiesContainer.getLocalVideoTracks();
        for (let trackPackage of trackPackages) {
          if (!trackPackage?.track) {
            continue;
          }

          let track = trackPackage.track as ILocalVideoTrack;
          if (!track.isPlaying) {
            try {
            } catch (e) {
              AgoraConsole.error('ILocalVideoTrack play(true) failed');
              AgoraConsole.error(e);
            }
          }
          if (!track.enabled) {
            await TrackHelper.setEnabled(track, true);
          }
        }
      }

      return this._engine.returnResult();
    };

    return this._engine.execute(processVideoTrack);
  }
  disableVideo(): CallApiReturnType {
    let processVideoTrack = async (): Promise<CallIrisApiResult> => {
      this._engine.globalVariables.enabledVideo = false;

      //找到本端video
      let trackPackages = this._engine.entitiesContainer.getLocalVideoTracks();
      for (let trackPackage of trackPackages) {
        let track = trackPackage.track as ILocalVideoTrack;
        if (track.enabled) {
          await TrackHelper.setEnabled(track, false);
        }
      }

      //mainClient的远端用户
      this._engine.entitiesContainer.irisClientList.map((irisClient) => {
        let agoraRTCClient = irisClient.agoraRTCClient;
        if (agoraRTCClient && agoraRTCClient.channelName) {
          let remoteUsers = agoraRTCClient.remoteUsers;
          for (let remoteUser of remoteUsers) {
            //todo 远端用户发流的时候。我不订阅，那么他的hasVideo为true， 但是他们的videoTrack是null
            if (
              remoteUser.hasVideo &&
              remoteUser.videoTrack &&
              remoteUser.videoTrack.isPlaying
            ) {
              remoteUser.videoTrack.stop();
            }
          }
        }
      });

      return this._engine.returnResult();
    };
    return this._engine.execute(processVideoTrack);
  }
  startPreview(): CallApiReturnType {
    return this.startPreview2(NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA);
  }
  startPreview2(sourceType: NATIVE_RTC.VIDEO_SOURCE_TYPE): CallApiReturnType {
    let process = async (): Promise<CallIrisApiResult> => {
      if (this._engine.globalVariables.enabledVideo == false) {
        AgoraConsole.error('call enableVideo(true) before startPreview');
        return;
      }

      if (sourceType >= 5) {
        AgoraConsole.error('Invalid source type');
        return this._engine.returnResult(false);
      }

      let audioSource: IrisAudioSourceType =
        IrisAudioSourceType.kAudioSourceTypeUnknown;
      let videoSource: NATIVE_RTC.VIDEO_SOURCE_TYPE = sourceType as number;

      AgoraConsole.log(`startPreview2 videoSource: ${videoSource}`);
      if (
        sourceType == NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CUSTOM &&
        this._engine.globalVariables.pushVideoFrameEnabled
      ) {
        //开启了pushVideoFrame,先什么都不做
      }
      try {
        //这地方有错误, 应该是preview所有client
        console.log(this._engine.entitiesContainer.irisClientList);
        debugger;
        await ImplHelper.getOrCreateAudioAndVideoTrackAsync(
          this._engine,
          audioSource,
          videoSource,
          null
        );
        let trackPackages = this._engine.entitiesContainer.getLocalVideoTracks();
        this._engine.rtcEngineEventHandler.onLocalVideoStateChanged(
          videoSource,
          NATIVE_RTC.LOCAL_VIDEO_STREAM_STATE.LOCAL_VIDEO_STREAM_STATE_ENCODING,
          0
        );
        for (let trackPackage of trackPackages) {
          let track = trackPackage.track as ILocalVideoTrack;
          if (!track) {
            continue;
          }

          if (!track.enabled) {
            await TrackHelper.setEnabled(track, true);
          }

          if (track.isPlaying) {
            track.stop();
          }

          if (trackPackage.element) {
            track.play(trackPackage.element);
            AgoraConsole.log(
              `startPreview2 videoSource: ${videoSource} success`
            );
          }
        }
      } catch (err) {
        AgoraConsole.error(err);
        return this._engine.returnResult(false);
      }

      return this._engine.returnResult();
    };

    return this._engine.execute(process);
  }
  stopPreview(): CallApiReturnType {
    return this.stopPreview2(NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA);
  }
  stopPreview2(sourceType: NATIVE_RTC.VIDEO_SOURCE_TYPE): CallApiReturnType {
    let process = async (): Promise<CallIrisApiResult> => {
      let audioSource: IrisAudioSourceType =
        IrisAudioSourceType.kAudioSourceTypeUnknown;
      let videoSource: NATIVE_RTC.VIDEO_SOURCE_TYPE =
        NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_UNKNOWN;
      if (
        sourceType == NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA_PRIMARY
      ) {
        audioSource = IrisAudioSourceType.kAudioSourceTypeMicrophonePrimary;
        videoSource = NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA_PRIMARY;
      } else if (
        sourceType == NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_SCREEN_PRIMARY
      ) {
        audioSource = IrisAudioSourceType.kAudioSourceTypeScreenPrimary;
        videoSource = NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_SCREEN_PRIMARY;
      }

      let audioTrackPackage = this._engine.entitiesContainer.getLocalAudioTrack(
        audioSource,
        null
      );
      if (audioTrackPackage) {
        let audioTrack = audioTrackPackage.track as ILocalAudioTrack;
        if (audioTrack.enabled) {
          await TrackHelper.setEnabled(audioTrack, false);
        }
      }

      let videoTrackPackage = this._engine.entitiesContainer.getLocalVideoTrack(
        videoSource,
        null
      );
      if (videoTrackPackage) {
        let videoTrack = videoTrackPackage.track as ILocalVideoTrack;
        if (videoTrack.enabled) {
          await TrackHelper.setEnabled(videoTrack, false);
        }
      }
      return this._engine.returnResult();
    };
    return this._engine.execute(process);
  }
  startLastmileProbeTest(
    config: NATIVE_RTC.LastmileProbeConfig
  ): CallApiReturnType {
    AgoraConsole.warn('startLastmileProbeTest not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  stopLastmileProbeTest(): CallApiReturnType {
    AgoraConsole.warn('stopLastmileProbeTest not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setVideoEncoderConfiguration(
    config: NATIVE_RTC.VideoEncoderConfiguration
  ): CallApiReturnType {
    let processFunc = async (): Promise<CallIrisApiResult> => {
      this._engine.globalVariables.videoEncoderConfiguration = config;

      let irisClient = this._engine.entitiesContainer.getIrisClient();
      irisClient.irisClientVariables.videoEncoderConfiguration = config;

      //todo 找到所有mainClient 的 ICameraTrack。如果存在则 setEncoderConfiguration（） 一下
      let videoTrack = this._engine.entitiesContainer.getLocalVideoTrack(
        NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA_PRIMARY,
        null
      );
      if (videoTrack) {
        let track = videoTrack.track as ICameraVideoTrack;
        await track.setEncoderConfiguration(
          AgoraTranslate.NATIVE_RTCVideoEncoderConfiguration2VideoEncoderConfiguration(
            config
          )
        );
      }
      return this._engine.returnResult();
    };
    return this._engine.execute(processFunc);
  }
  setBeautyEffectOptions(
    enabled: boolean,
    options: NATIVE_RTC.BeautyOptions,
    type: NATIVE_RTC.MEDIA_SOURCE_TYPE
  ): CallApiReturnType {
    AgoraConsole.warn('setBeautyEffectOptions not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setLowlightEnhanceOptions(
    enabled: boolean,
    options: NATIVE_RTC.LowlightEnhanceOptions,
    type: NATIVE_RTC.MEDIA_SOURCE_TYPE
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setLowlightEnhanceOptions not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setVideoDenoiserOptions(
    enabled: boolean,
    options: NATIVE_RTC.VideoDenoiserOptions,
    type: NATIVE_RTC.MEDIA_SOURCE_TYPE
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setVideoDenoiserOptions not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setColorEnhanceOptions(
    enabled: boolean,
    options: NATIVE_RTC.ColorEnhanceOptions,
    type: NATIVE_RTC.MEDIA_SOURCE_TYPE
  ): CallApiReturnType {
    AgoraConsole.warn('setColorEnhanceOptions not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  enableVirtualBackground(
    enabled: boolean,
    backgroundSource: NATIVE_RTC.VirtualBackgroundSource,
    segproperty: NATIVE_RTC.SegmentationProperty,
    type: NATIVE_RTC.MEDIA_SOURCE_TYPE
  ): CallApiReturnType {
    AgoraConsole.warn(
      'enableVirtualBackground not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setupRemoteVideo(canvas: NATIVE_RTC.VideoCanvas): CallApiReturnType {
    AgoraConsole.warn('setupRemoteVideo not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setupLocalVideo(canvas: NATIVE_RTC.VideoCanvas): CallApiReturnType {
    let processVideoTrack = async (): Promise<CallIrisApiResult> => {
      let irisClient = this._engine.entitiesContainer.getIrisClient();
      irisClient.setLocalVideoTrack({
        element: canvas.view,
        type:
          canvas.sourceType ||
          NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA_PRIMARY,
      });
      let trackPackages = this._engine.entitiesContainer.getLocalVideoTracks();
      for (let trackPackage of trackPackages) {
        let track = trackPackage.track as ILocalVideoTrack;
        if (!track) {
          continue;
        }
        if (!track.enabled) {
          await TrackHelper.setEnabled(track, true);
        }

        if (track.isPlaying) {
          track.stop();
        }

        track.play(trackPackage.element);
      }

      return this._engine.returnResult();
    };

    return this._engine.execute(processVideoTrack);
  }
  setVideoScenario(
    scenarioType: NATIVE_RTC.VIDEO_APPLICATION_SCENARIO_TYPE
  ): CallApiReturnType {
    AgoraConsole.warn('setVideoScenario not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  enableAudio(): CallApiReturnType {
    let processAudioTracks = async (): Promise<CallIrisApiResult> => {
      this._engine.globalVariables.enabledAudio = true;

      this._engine.entitiesContainer.irisClientList.map((irisClient) => {
        irisClient.irisClientVariables.publishAudioTrack = true;
        irisClient.localAudioTracks.map((trackPackage) => {
          let track = trackPackage.track as ILocalAudioTrack;
          if (!track.enabled) {
            TrackHelper.setEnabled(track, true);
          }
        });
        let remoteUsers = irisClient.agoraRTCClient.remoteUsers;
        remoteUsers.map((remoteUser: IAgoraRTCRemoteUser) => {
          if (remoteUser.audioTrack && !remoteUser.audioTrack.isPlaying) {
            remoteUser.audioTrack.play();
          }
        });
      });

      return this._engine.returnResult();
    };

    return this._engine.execute(processAudioTracks);
  }
  disableAudio(): CallApiReturnType {
    AgoraConsole.warn('disableAudio not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setAudioProfile(
    profile: NATIVE_RTC.AUDIO_PROFILE_TYPE,
    scenario: NATIVE_RTC.AUDIO_SCENARIO_TYPE
  ): CallApiReturnType {
    let processFunc = async (): Promise<CallIrisApiResult> => {
      this._engine.globalVariables.audioProfile = profile;
      this._engine.globalVariables.rtcEngineContext.audioScenario = scenario;

      return this._engine.returnResult();
    };

    return this._engine.execute(processFunc);
  }

  setAudioProfile2(profile: NATIVE_RTC.AUDIO_PROFILE_TYPE): CallApiReturnType {
    let processFunc = async (): Promise<CallIrisApiResult> => {
      this._engine.globalVariables.audioProfile = profile;

      return this._engine.returnResult();
    };

    return this._engine.execute(processFunc);
  }
  setAudioScenario(
    scenario: NATIVE_RTC.AUDIO_SCENARIO_TYPE
  ): CallApiReturnType {
    AgoraConsole.warn('setAudioScenario not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  enableLocalAudio(enabled: boolean): CallApiReturnType {
    let processFunc = async (): Promise<CallIrisApiResult> => {
      this._engine.globalVariables.enabledLocalAudio = enabled;
      //找到本地audio
      let trackPackages = this._engine.entitiesContainer.getLocalAudioTracks();
      for (let trackPackage of trackPackages) {
        let track = trackPackage.track as ILocalAudioTrack;
        await TrackHelper.setEnabled(track, enabled);
      }
      return this._engine.returnResult();
    };

    return this._engine.execute(processFunc);
  }
  muteLocalAudioStream(mute: boolean): CallApiReturnType {
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  muteAllRemoteAudioStreams(mute: boolean): CallApiReturnType {
    AgoraConsole.warn(
      'muteAllRemoteAudioStreams not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setDefaultMuteAllRemoteAudioStreams(mute: boolean): CallApiReturnType {
    AgoraConsole.warn(
      'setDefaultMuteAllRemoteAudioStreams not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  muteRemoteAudioStream(uid: number, mute: boolean): CallApiReturnType {
    AgoraConsole.warn('muteRemoteAudioStream not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  muteLocalVideoStream(mute: boolean): CallApiReturnType {
    AgoraConsole.warn('muteLocalVideoStream not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  enableLocalVideo(enabled: boolean): CallApiReturnType {
    AgoraConsole.warn('enableLocalVideo not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  muteAllRemoteVideoStreams(mute: boolean): CallApiReturnType {
    AgoraConsole.warn(
      'muteAllRemoteVideoStreams not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setDefaultMuteAllRemoteVideoStreams(mute: boolean): CallApiReturnType {
    AgoraConsole.warn(
      'setDefaultMuteAllRemoteVideoStreams not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  muteRemoteVideoStream(uid: number, mute: boolean): CallApiReturnType {
    AgoraConsole.warn('muteRemoteVideoStream not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setRemoteVideoStreamType(
    uid: number,
    streamType: NATIVE_RTC.VIDEO_STREAM_TYPE
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setRemoteVideoStreamType not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setRemoteVideoSubscriptionOptions(
    uid: number,
    options: NATIVE_RTC.VideoSubscriptionOptions
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setRemoteVideoSubscriptionOptions not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setRemoteDefaultVideoStreamType(
    streamType: NATIVE_RTC.VIDEO_STREAM_TYPE
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setRemoteDefaultVideoStreamType not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setSubscribeAudioBlocklist(
    uidList: number,
    uidNumber: number
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setSubscribeAudioBlocklist not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setSubscribeAudioAllowlist(
    uidList: number,
    uidNumber: number
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setSubscribeAudioAllowlist not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setSubscribeVideoBlocklist(
    uidList: number,
    uidNumber: number
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setSubscribeVideoBlocklist not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setSubscribeVideoAllowlist(
    uidList: number,
    uidNumber: number
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setSubscribeVideoAllowlist not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  enableAudioVolumeIndication(
    interval: number,
    smooth: number,
    reportVad: boolean
  ): CallApiReturnType {
    let processFunc = async (): Promise<CallIrisApiResult> => {
      this._engine.globalVariables.enableAudioVolumeIndicationConfig = {
        ...this._engine.globalVariables.enableAudioVolumeIndicationConfig,
        ...(interval && { interval }),
        ...(smooth && { smooth }),
        ...(reportVad && { reportVad }),
      };
      //只有在初次的时候才注册onAudioVolumeIndication事件
      let agoraRTCClient: IAgoraRTCClient = this._engine.entitiesContainer.getIrisClient()
        ?.agoraRTCClient;

      if (!this._engine.globalVariables.enableAudioVolumeIndication) {
        let intervalFunction = setInterval(() => {
          if (agoraRTCClient) {
            const localStats = agoraRTCClient.getLocalAudioStats();
            let connection: NATIVE_RTC.RtcConnection = {
              channelId: agoraRTCClient.channelName,
              localUid: agoraRTCClient.uid as number,
            };
            if (reportVad) {
              this._engine.rtcEngineEventHandler.onAudioVolumeIndicationEx(
                connection,
                [
                  {
                    uid: agoraRTCClient.uid as number,
                    volume: localStats.sendVolumeLevel,
                    vad: localStats.sendVolumeLevel > 0 ? 1 : 0,
                    // voicePitch: number,  web没有
                  },
                ],
                1,
                localStats.sendVolumeLevel
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
            let biggestVolumeRemoteSpeaker = remoteSpeakers.reduce(
              (prev, curr) => {
                return curr.receiveLevel > prev.receiveLevel ? curr : prev;
              }
            );
            this._engine.rtcEngineEventHandler.onAudioVolumeIndicationEx(
              connection,
              remoteSpeakers,
              remoteSpeakers.length,
              biggestVolumeRemoteSpeaker
            );
          }
        }, interval);
        this._engine.addIrisInterval(
          IrisIntervalType.enableAudioVolumeIndication,
          intervalFunction
        );
      }
      this._engine.globalVariables.enableAudioVolumeIndication = true;
      return this._engine.returnResult();
    };
    return this._engine.execute(processFunc);
  }
  startAudioRecording(
    filePath: string,
    quality: NATIVE_RTC.AUDIO_RECORDING_QUALITY_TYPE
  ): CallApiReturnType {
    AgoraConsole.warn('startAudioRecording not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  startAudioRecording2(
    filePath: string,
    sampleRate: number,
    quality: NATIVE_RTC.AUDIO_RECORDING_QUALITY_TYPE
  ): CallApiReturnType {
    AgoraConsole.warn('startAudioRecording2 not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  startAudioRecording3(
    config: NATIVE_RTC.AudioRecordingConfiguration
  ): CallApiReturnType {
    AgoraConsole.warn('startAudioRecording3 not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  registerAudioEncodedFrameObserver(
    config: NATIVE_RTC.AudioEncodedFrameObserverConfig,
    observer: NATIVE_RTC.IAudioEncodedFrameObserver
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioEncodedFrameObserver not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  stopAudioRecording(): CallApiReturnType {
    AgoraConsole.warn('stopAudioRecording not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  createMediaPlayer(): CallApiReturnType {
    AgoraConsole.warn('createMediaPlayer not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  destroyMediaPlayer(media_player: NATIVE_RTC.IMediaPlayer): CallApiReturnType {
    AgoraConsole.warn('destroyMediaPlayer not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  createMediaRecorder(info: NATIVE_RTC.RecorderStreamInfo): CallApiReturnType {
    AgoraConsole.warn('createMediaRecorder not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  destroyMediaRecorder(
    mediaRecorder: NATIVE_RTC.IMediaRecorder
  ): CallApiReturnType {
    AgoraConsole.warn('destroyMediaRecorder not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  startAudioMixing(
    filePath: string,
    loopback: boolean,
    cycle: number
  ): CallApiReturnType {
    AgoraConsole.warn('startAudioMixing not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  startAudioMixing2(
    filePath: string,
    loopback: boolean,
    cycle: number,
    startPos: number
  ): CallApiReturnType {
    AgoraConsole.warn('startAudioMixing2 not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  stopAudioMixing(): CallApiReturnType {
    AgoraConsole.warn('stopAudioMixing not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  pauseAudioMixing(): CallApiReturnType {
    AgoraConsole.warn('pauseAudioMixing not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  resumeAudioMixing(): CallApiReturnType {
    AgoraConsole.warn('resumeAudioMixing not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  selectAudioTrack(index: number): CallApiReturnType {
    AgoraConsole.warn('selectAudioTrack not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  getAudioTrackCount(): CallApiReturnType {
    AgoraConsole.warn('getAudioTrackCount not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  adjustAudioMixingVolume(volume: number): CallApiReturnType {
    AgoraConsole.warn(
      'adjustAudioMixingVolume not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  adjustAudioMixingPublishVolume(volume: number): CallApiReturnType {
    AgoraConsole.warn(
      'adjustAudioMixingPublishVolume not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  getAudioMixingPublishVolume(): CallApiReturnType {
    AgoraConsole.warn(
      'getAudioMixingPublishVolume not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  adjustAudioMixingPlayoutVolume(volume: number): CallApiReturnType {
    AgoraConsole.warn(
      'adjustAudioMixingPlayoutVolume not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  getAudioMixingPlayoutVolume(): CallApiReturnType {
    AgoraConsole.warn(
      'getAudioMixingPlayoutVolume not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  getAudioMixingDuration(): CallApiReturnType {
    AgoraConsole.warn('getAudioMixingDuration not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  getAudioMixingCurrentPosition(): CallApiReturnType {
    AgoraConsole.warn(
      'getAudioMixingCurrentPosition not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setAudioMixingPosition(pos: number): CallApiReturnType {
    AgoraConsole.warn('setAudioMixingPosition not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setAudioMixingDualMonoMode(
    mode: NATIVE_RTC.AUDIO_MIXING_DUAL_MONO_MODE
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setAudioMixingDualMonoMode not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setAudioMixingPitch(pitch: number): CallApiReturnType {
    AgoraConsole.warn('setAudioMixingPitch not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  getEffectsVolume(): CallApiReturnType {
    AgoraConsole.warn('getEffectsVolume not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setEffectsVolume(volume: number): CallApiReturnType {
    AgoraConsole.warn('setEffectsVolume not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  preloadEffect(
    soundId: number,
    filePath: string,
    startPos: number
  ): CallApiReturnType {
    AgoraConsole.warn('preloadEffect not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
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
        !this._engine.globalVariables.enabledAudio ||
        !this._engine.globalVariables.enabledLocalAudio
      ) {
        AgoraConsole.error('please enableAudio first');
        return this._engine.returnResult(false);
      }

      let irisClient = this._engine.entitiesContainer.getIrisClient();
      let agoraRTCClient = irisClient?.agoraRTCClient;

      let bufferSourceAudioTrack: IBufferSourceAudioTrack = null;
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
        bufferSourceAudioTrack = await ImplHelper.createBufferSourceAudioTrackAsync(
          this._engine,
          soundId,
          bufferSourceAudioTrackInitConfig
        );
        AgoraConsole.log('createBufferSourceAudioTrack success');
      } catch (err) {
        err && AgoraConsole.error(err);
        return this._engine.returnResult(false);
      }
      if (publish && bufferSourceAudioTrack) {
        //设置音效
        if (gain) {
          bufferSourceAudioTrack.setVolume(gain);
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
          bufferSourceAudioTrack.startProcessAudioBuffer(config);
          await agoraRTCClient.publish(bufferSourceAudioTrack);
        } catch (reason) {
          AgoraConsole.error(reason);
        }
        irisClient.addLocalBufferSourceAudioTrack({
          soundId: soundId,
          track: bufferSourceAudioTrack,
        });
        let trackEventHandler: IrisTrackEventHandler = new IrisTrackEventHandler(
          {
            channelName: agoraRTCClient.channelName,
            client: agoraRTCClient,
            track: bufferSourceAudioTrack,
            trackType: 'IBufferSourceAudioTrack',
          },
          this._engine
        );
        irisClient.addTrackEventHandler(trackEventHandler);
      }
      return this._engine.returnResult();
    };
    return this._engine.execute(processFunc);
  }
  playAllEffects(
    loopCount: number,
    pitch: number,
    pan: number,
    gain: number,
    publish: boolean
  ): CallApiReturnType {
    AgoraConsole.warn('playAllEffects not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  getVolumeOfEffect(soundId: number): CallApiReturnType {
    AgoraConsole.warn('getVolumeOfEffect not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setVolumeOfEffect(soundId: number, volume: number): CallApiReturnType {
    AgoraConsole.warn('setVolumeOfEffect not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  pauseEffect(soundId: number): CallApiReturnType {
    AgoraConsole.warn('pauseEffect not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  pauseAllEffects(): CallApiReturnType {
    AgoraConsole.warn('pauseAllEffects not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  resumeEffect(soundId: number): CallApiReturnType {
    AgoraConsole.warn('resumeEffect not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  resumeAllEffects(): CallApiReturnType {
    AgoraConsole.warn('resumeAllEffects not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  stopEffect(soundId: number): CallApiReturnType {
    let processFunc = async (): Promise<CallIrisApiResult> => {
      let irisClient = this._engine.entitiesContainer.getIrisClient();
      let agoraRTCClient = irisClient?.agoraRTCClient;
      let bufferSourceAudioTrack: IBufferSourceAudioTrack = irisClient.getLocalBufferSourceAudioTrackBySoundId(
        soundId
      )?.track;
      if (!bufferSourceAudioTrack) {
        AgoraConsole.error(`soundId:${soundId} not found`);
        this._engine.rtcEngineEventHandler.onError(
          NATIVE_RTC.ERROR_CODE_TYPE.ERR_FAILED,
          `soundId:${soundId} not found`
        );
        return this._engine.returnResult(false);
      }
      try {
        bufferSourceAudioTrack.stopProcessAudioBuffer();
        await agoraRTCClient?.unpublish([bufferSourceAudioTrack]);
      } catch (err) {
        err && AgoraConsole.error(err);
        this._engine.rtcEngineEventHandler.onError(
          NATIVE_RTC.ERROR_CODE_TYPE.ERR_FAILED,
          `stopEffect:${soundId} stopEffect failed`
        );
        return this._engine.returnResult(false);
      }
      irisClient.removeLocalBufferSourceAudioTrackBySoundId(soundId);
      await irisClient.processBufferSourceAudioTrackClose(
        bufferSourceAudioTrack
      );
      return this._engine.returnResult();
    };

    return this._engine.execute(processFunc);
  }
  stopAllEffects(): CallApiReturnType {
    AgoraConsole.warn('stopAllEffects not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  unloadEffect(soundId: number): CallApiReturnType {
    AgoraConsole.warn('unloadEffect not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  unloadAllEffects(): CallApiReturnType {
    AgoraConsole.warn('unloadAllEffects not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  getEffectDuration(filePath: string): CallApiReturnType {
    AgoraConsole.warn('getEffectDuration not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setEffectPosition(soundId: number, pos: number): CallApiReturnType {
    AgoraConsole.warn('setEffectPosition not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  getEffectCurrentPosition(soundId: number): CallApiReturnType {
    AgoraConsole.warn(
      'getEffectCurrentPosition not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  enableSoundPositionIndication(enabled: boolean): CallApiReturnType {
    AgoraConsole.warn(
      'enableSoundPositionIndication not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setRemoteVoicePosition(
    uid: number,
    pan: number,
    gain: number
  ): CallApiReturnType {
    AgoraConsole.warn('setRemoteVoicePosition not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  enableSpatialAudio(enabled: boolean): CallApiReturnType {
    AgoraConsole.warn('enableSpatialAudio not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setRemoteUserSpatialAudioParams(
    uid: number,
    params: NATIVE_RTC.SpatialAudioParams
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setRemoteUserSpatialAudioParams not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setVoiceBeautifierPreset(
    preset: NATIVE_RTC.VOICE_BEAUTIFIER_PRESET
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setVoiceBeautifierPreset not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setAudioEffectPreset(
    preset: NATIVE_RTC.AUDIO_EFFECT_PRESET
  ): CallApiReturnType {
    AgoraConsole.warn('setAudioEffectPreset not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setVoiceConversionPreset(
    preset: NATIVE_RTC.VOICE_CONVERSION_PRESET
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setVoiceConversionPreset not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setAudioEffectParameters(
    preset: NATIVE_RTC.AUDIO_EFFECT_PRESET,
    param1: number,
    param2: number
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setAudioEffectParameters not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setVoiceBeautifierParameters(
    preset: NATIVE_RTC.VOICE_BEAUTIFIER_PRESET,
    param1: number,
    param2: number
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setVoiceBeautifierParameters not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setVoiceConversionParameters(
    preset: NATIVE_RTC.VOICE_CONVERSION_PRESET,
    param1: number,
    param2: number
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setVoiceConversionParameters not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setLocalVoicePitch(pitch: number): CallApiReturnType {
    AgoraConsole.warn('setLocalVoicePitch not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setLocalVoiceFormant(formantRatio: number): CallApiReturnType {
    AgoraConsole.warn('setLocalVoiceFormant not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setLocalVoiceEqualization(
    bandFrequency: NATIVE_RTC.AUDIO_EQUALIZATION_BAND_FREQUENCY,
    bandGain: number
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setLocalVoiceEqualization not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setLocalVoiceReverb(
    reverbKey: NATIVE_RTC.AUDIO_REVERB_TYPE,
    value: number
  ): CallApiReturnType {
    AgoraConsole.warn('setLocalVoiceReverb not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setHeadphoneEQPreset(
    preset: NATIVE_RTC.HEADPHONE_EQUALIZER_PRESET
  ): CallApiReturnType {
    AgoraConsole.warn('setHeadphoneEQPreset not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setHeadphoneEQParameters(
    lowGain: number,
    highGain: number
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setHeadphoneEQParameters not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setLogFile(filePath: string): CallApiReturnType {
    AgoraConsole.warn('setLogFile not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setLogFilter(filter: number): CallApiReturnType {
    return this._engine.execute(
      (): Promise<CallIrisApiResult> => {
        AgoraConsole.warn('setLogFilter not supported in this platform!');
        return this._engine.returnResult();
      }
    );
  }
  setLogLevel(level: NATIVE_RTC.LOG_LEVEL): CallApiReturnType {
    let processFunc = async (): Promise<CallIrisApiResult> => {
      AgoraConsole.logLevel = level;
      let numberLevel: number = AgoraTranslate.NATIVE_RTCLOG_LEVEL2Number(
        level
      );
      this._engine.globalVariables.AgoraRTC.setLogLevel(numberLevel);
      return this._engine.returnResult();
    };

    return this._engine.execute(processFunc);
  }
  setLogFileSize(fileSizeInKBytes: number): CallApiReturnType {
    AgoraConsole.warn('setLogFileSize not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  uploadLogFile(requestId: string): CallApiReturnType {
    AgoraConsole.warn('uploadLogFile not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setLocalRenderMode(
    renderMode: NATIVE_RTC.RENDER_MODE_TYPE,
    mirrorMode: NATIVE_RTC.VIDEO_MIRROR_MODE_TYPE
  ): CallApiReturnType {
    AgoraConsole.warn('setLocalRenderMode not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setRemoteRenderMode(
    uid: number,
    renderMode: NATIVE_RTC.RENDER_MODE_TYPE,
    mirrorMode: NATIVE_RTC.VIDEO_MIRROR_MODE_TYPE
  ): CallApiReturnType {
    AgoraConsole.warn('setRemoteRenderMode not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setLocalRenderMode2(
    renderMode: NATIVE_RTC.RENDER_MODE_TYPE
  ): CallApiReturnType {
    AgoraConsole.warn('setLocalRenderMode2 not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setLocalVideoMirrorMode(
    mirrorMode: NATIVE_RTC.VIDEO_MIRROR_MODE_TYPE
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setLocalVideoMirrorMode not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  enableDualStreamMode(enabled: boolean): CallApiReturnType {
    AgoraConsole.warn('enableDualStreamMode not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  enableDualStreamMode2(
    enabled: boolean,
    streamConfig: NATIVE_RTC.SimulcastStreamConfig
  ): CallApiReturnType {
    AgoraConsole.warn('enableDualStreamMode2 not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setDualStreamMode(mode: NATIVE_RTC.SIMULCAST_STREAM_MODE): CallApiReturnType {
    AgoraConsole.warn('setDualStreamMode not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setDualStreamMode2(
    mode: NATIVE_RTC.SIMULCAST_STREAM_MODE,
    streamConfig: NATIVE_RTC.SimulcastStreamConfig
  ): CallApiReturnType {
    AgoraConsole.warn('setDualStreamMode2 not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  enableCustomAudioLocalPlayback(
    trackId: number,
    enabled: boolean
  ): CallApiReturnType {
    AgoraConsole.warn(
      'enableCustomAudioLocalPlayback not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setRecordingAudioFrameParameters(
    sampleRate: number,
    channel: number,
    mode: NATIVE_RTC.RAW_AUDIO_FRAME_OP_MODE_TYPE,
    samplesPerCall: number
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setRecordingAudioFrameParameters not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setPlaybackAudioFrameParameters(
    sampleRate: number,
    channel: number,
    mode: NATIVE_RTC.RAW_AUDIO_FRAME_OP_MODE_TYPE,
    samplesPerCall: number
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setPlaybackAudioFrameParameters not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setMixedAudioFrameParameters(
    sampleRate: number,
    channel: number,
    samplesPerCall: number
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setMixedAudioFrameParameters not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setEarMonitoringAudioFrameParameters(
    sampleRate: number,
    channel: number,
    mode: NATIVE_RTC.RAW_AUDIO_FRAME_OP_MODE_TYPE,
    samplesPerCall: number
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setEarMonitoringAudioFrameParameters not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setPlaybackAudioFrameBeforeMixingParameters(
    sampleRate: number,
    channel: number
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setPlaybackAudioFrameBeforeMixingParameters not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  enableAudioSpectrumMonitor(intervalInMS: number): CallApiReturnType {
    AgoraConsole.warn(
      'enableAudioSpectrumMonitor not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  disableAudioSpectrumMonitor(): CallApiReturnType {
    AgoraConsole.warn(
      'disableAudioSpectrumMonitor not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  registerAudioSpectrumObserver(
    observer: NATIVE_RTC.IAudioSpectrumObserver
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioSpectrumObserver not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  unregisterAudioSpectrumObserver(
    observer: NATIVE_RTC.IAudioSpectrumObserver
  ): CallApiReturnType {
    AgoraConsole.warn(
      'unregisterAudioSpectrumObserver not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  adjustRecordingSignalVolume(volume: number): CallApiReturnType {
    AgoraConsole.warn(
      'adjustRecordingSignalVolume not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  muteRecordingSignal(mute: boolean): CallApiReturnType {
    AgoraConsole.warn('muteRecordingSignal not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  adjustPlaybackSignalVolume(volume: number): CallApiReturnType {
    AgoraConsole.warn(
      'adjustPlaybackSignalVolume not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  adjustUserPlaybackSignalVolume(
    uid: number,
    volume: number
  ): CallApiReturnType {
    AgoraConsole.warn(
      'adjustUserPlaybackSignalVolume not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setLocalPublishFallbackOption(
    option: NATIVE_RTC.STREAM_FALLBACK_OPTIONS
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setLocalPublishFallbackOption not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setRemoteSubscribeFallbackOption(
    option: NATIVE_RTC.STREAM_FALLBACK_OPTIONS
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setRemoteSubscribeFallbackOption not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setHighPriorityUserList(
    uidList: number,
    uidNum: number,
    option: NATIVE_RTC.STREAM_FALLBACK_OPTIONS
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setHighPriorityUserList not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  enableLoopbackRecording(
    enabled: boolean,
    deviceName: string
  ): CallApiReturnType {
    AgoraConsole.warn(
      'enableLoopbackRecording not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  adjustLoopbackSignalVolume(volume: number): CallApiReturnType {
    AgoraConsole.warn(
      'adjustLoopbackSignalVolume not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  getLoopbackRecordingVolume(): CallApiReturnType {
    AgoraConsole.warn(
      'getLoopbackRecordingVolume not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  enableInEarMonitoring(
    enabled: boolean,
    includeAudioFilters: number
  ): CallApiReturnType {
    AgoraConsole.warn('enableInEarMonitoring not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setInEarMonitoringVolume(volume: number): CallApiReturnType {
    AgoraConsole.warn(
      'setInEarMonitoringVolume not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  loadExtensionProvider(
    path: string,
    unload_after_use: boolean
  ): CallApiReturnType {
    AgoraConsole.warn('loadExtensionProvider not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setExtensionProviderProperty(
    provider: string,
    key: string,
    value: string
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setExtensionProviderProperty not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  registerExtension(
    provider: string,
    extension: string,
    type: NATIVE_RTC.MEDIA_SOURCE_TYPE
  ): CallApiReturnType {
    AgoraConsole.warn('registerExtension not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  enableExtension(
    provider: string,
    extension: string,
    enable: boolean,
    type: NATIVE_RTC.MEDIA_SOURCE_TYPE
  ): CallApiReturnType {
    AgoraConsole.warn('enableExtension not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  enableExtension2(
    provider: string,
    extension: string,
    extensionInfo: NATIVE_RTC.ExtensionInfo,
    enable: boolean
  ): CallApiReturnType {
    AgoraConsole.warn('enableExtension2 not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setExtensionProperty(
    provider: string,
    extension: string,
    key: string,
    value: string,
    type: NATIVE_RTC.MEDIA_SOURCE_TYPE
  ): CallApiReturnType {
    AgoraConsole.warn('setExtensionProperty not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  getExtensionProperty(
    provider: string,
    extension: string,
    key: string,
    value: string,
    buf_len: number,
    type: NATIVE_RTC.MEDIA_SOURCE_TYPE
  ): CallApiReturnType {
    AgoraConsole.warn('getExtensionProperty not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setExtensionProperty2(
    provider: string,
    extension: string,
    extensionInfo: NATIVE_RTC.ExtensionInfo,
    key: string,
    value: string
  ): CallApiReturnType {
    AgoraConsole.warn('setExtensionProperty2 not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  getExtensionProperty2(
    provider: string,
    extension: string,
    extensionInfo: NATIVE_RTC.ExtensionInfo,
    key: string,
    value: string,
    buf_len: number
  ): CallApiReturnType {
    AgoraConsole.warn('getExtensionProperty2 not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setCameraCapturerConfiguration(
    config: NATIVE_RTC.CameraCapturerConfiguration
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setCameraCapturerConfiguration not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  createCustomVideoTrack(): CallApiReturnType {
    AgoraConsole.warn('createCustomVideoTrack not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  createCustomEncodedVideoTrack(
    sender_option: NATIVE_RTC.SenderOptions
  ): CallApiReturnType {
    AgoraConsole.warn(
      'createCustomEncodedVideoTrack not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  destroyCustomVideoTrack(video_track_id: number): CallApiReturnType {
    AgoraConsole.warn(
      'destroyCustomVideoTrack not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  destroyCustomEncodedVideoTrack(video_track_id: number): CallApiReturnType {
    AgoraConsole.warn(
      'destroyCustomEncodedVideoTrack not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  switchCamera(): CallApiReturnType {
    AgoraConsole.warn('isCameraZoomSupported not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
    // let process = async ():Promise<CallIrisApiResult> => {
    //   let trackPack = this._engine.entitiesContainer.getLocalVideoTrack(
    //     NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA_PRIMARY
    //   );
    //   let videoTrack: ICameraVideoTrack = trackPack.track as ICameraVideoTrack;
    //   let curDeviceName: string = (videoTrack as any)._deviceName;

    //   try {
    //     let allDevices = (await ImplHelper.enumerateDevices(this._engine))
    //       .videoDevices;
    //     let curIndex = -1;
    //     for (let i = 0; i < allDevices.length; i++) {
    //       if (allDevices[i].deviceName == curDeviceName) {
    //         curIndex = i;
    //         break;
    //       }
    //     }
    //     curIndex++;
    //     let nextDevice = allDevices[curIndex % allDevices.length];
    //     try {
    //       await videoTrack.setDevice(nextDevice.deviceId);
    //     } catch (e) {
    //       AgoraConsole.error('switchCamera setDevice failed');
    //       AgoraConsole.log(e);
    //     }
    //   } catch (e) {
    //     AgoraConsole.error('switchCamera enumerateDevices failed');
    //     AgoraConsole.log(e);
    //   }
    //   return CallIrisApiResult.success();
    // };
    // return this._engine.execute(process);
  }
  isCameraZoomSupported(): CallApiReturnType {
    AgoraConsole.warn('isCameraZoomSupported not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  isCameraFaceDetectSupported(): CallApiReturnType {
    AgoraConsole.warn(
      'isCameraFaceDetectSupported not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  isCameraTorchSupported(): CallApiReturnType {
    AgoraConsole.warn('isCameraTorchSupported not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  isCameraFocusSupported(): CallApiReturnType {
    AgoraConsole.warn('isCameraFocusSupported not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  isCameraAutoFocusFaceModeSupported(): CallApiReturnType {
    AgoraConsole.warn(
      'isCameraAutoFocusFaceModeSupported not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setCameraZoomFactor(factor: number): CallApiReturnType {
    AgoraConsole.warn('setCameraZoomFactor not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  enableFaceDetection(enabled: boolean): CallApiReturnType {
    AgoraConsole.warn('enableFaceDetection not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  getCameraMaxZoomFactor(): CallApiReturnType {
    AgoraConsole.warn('getCameraMaxZoomFactor not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setCameraFocusPositionInPreview(
    positionX: number,
    positionY: number
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setCameraFocusPositionInPreview not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setCameraTorchOn(isOn: boolean): CallApiReturnType {
    AgoraConsole.warn('setCameraTorchOn not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setCameraAutoFocusFaceModeEnabled(enabled: boolean): CallApiReturnType {
    AgoraConsole.warn(
      'setCameraAutoFocusFaceModeEnabled not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  isCameraExposurePositionSupported(): CallApiReturnType {
    AgoraConsole.warn(
      'isCameraExposurePositionSupported not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setCameraExposurePosition(
    positionXinView: number,
    positionYinView: number
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setCameraExposurePosition not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  isCameraExposureSupported(): CallApiReturnType {
    AgoraConsole.warn(
      'isCameraExposureSupported not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setCameraExposureFactor(factor: number): CallApiReturnType {
    AgoraConsole.warn(
      'setCameraExposureFactor not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  isCameraAutoExposureFaceModeSupported(): CallApiReturnType {
    AgoraConsole.warn(
      'isCameraAutoExposureFaceModeSupported not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setCameraAutoExposureFaceModeEnabled(enabled: boolean): CallApiReturnType {
    AgoraConsole.warn(
      'setCameraAutoExposureFaceModeEnabled not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setDefaultAudioRouteToSpeakerphone(
    defaultToSpeaker: boolean
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setDefaultAudioRouteToSpeakerphone not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setEnableSpeakerphone(speakerOn: boolean): CallApiReturnType {
    AgoraConsole.warn('setEnableSpeakerphone not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  isSpeakerphoneEnabled(): CallApiReturnType {
    AgoraConsole.warn('isSpeakerphoneEnabled not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setRouteInCommunicationMode(route: number): CallApiReturnType {
    AgoraConsole.warn(
      'setRouteInCommunicationMode not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  getScreenCaptureSources(
    thumbSize: NATIVE_RTC.SIZE,
    iconSize: NATIVE_RTC.SIZE,
    includeScreen: boolean
  ): CallApiReturnType {
    AgoraConsole.warn(
      'getScreenCaptureSources not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setAudioSessionOperationRestriction(
    restriction: NATIVE_RTC.AUDIO_SESSION_OPERATION_RESTRICTION
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setAudioSessionOperationRestriction not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  startScreenCaptureByDisplayId(
    displayId: number,
    regionRect: NATIVE_RTC.Rectangle,
    captureParams: NATIVE_RTC.ScreenCaptureParameters
  ): CallApiReturnType {
    AgoraConsole.warn(
      'startScreenCaptureByDisplayId not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  startScreenCaptureByScreenRect(
    screenRect: NATIVE_RTC.Rectangle,
    regionRect: NATIVE_RTC.Rectangle,
    captureParams: NATIVE_RTC.ScreenCaptureParameters
  ): CallApiReturnType {
    AgoraConsole.warn(
      'startScreenCaptureByScreenRect not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  getAudioDeviceInfo(deviceInfo: NATIVE_RTC.DeviceInfo): CallApiReturnType {
    AgoraConsole.warn('getAudioDeviceInfo not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  startScreenCaptureByWindowId(
    windowId: number,
    regionRect: NATIVE_RTC.Rectangle,
    captureParams: NATIVE_RTC.ScreenCaptureParameters
  ): CallApiReturnType {
    AgoraConsole.warn(
      'startScreenCaptureByWindowId not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setScreenCaptureContentHint(
    contentHint: NATIVE_RTC.VIDEO_CONTENT_HINT
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setScreenCaptureContentHint not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  updateScreenCaptureRegion(
    regionRect: NATIVE_RTC.Rectangle
  ): CallApiReturnType {
    AgoraConsole.warn(
      'updateScreenCaptureRegion not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  updateScreenCaptureParameters(
    captureParams: NATIVE_RTC.ScreenCaptureParameters
  ): CallApiReturnType {
    AgoraConsole.warn(
      'updateScreenCaptureParameters not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  startScreenCapture(
    captureParams: NATIVE_RTC.ScreenCaptureParameters2
  ): CallApiReturnType {
    let process = async () => {
      this._engine.globalVariables.screenCaptureParameters2 = captureParams;

      let audioType = captureParams.captureAudio
        ? IrisAudioSourceType.kAudioSourceTypeScreenPrimary
        : IrisAudioSourceType.kAudioSourceTypeUnknown;
      let videoType = captureParams.captureVideo
        ? NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_SCREEN_PRIMARY
        : NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_UNKNOWN;
      let irisClient = this._engine.entitiesContainer.getIrisClient();
      this._engine.globalVariables.isScreenSharing = true;

      let trackArray: [ILocalAudioTrack, ILocalVideoTrack] = [null, null];
      try {
        trackArray = await ImplHelper.getOrCreateAudioAndVideoTrackAsync(
          this._engine,
          audioType,
          videoType,
          null
        );
        AgoraConsole.log('ScreenShare track create success');
      } catch (err) {
        err && AgoraConsole.error(err);
        return this._engine.returnResult(false);
      }

      //设置屏幕共享特殊的事件
      let videoTrack: ILocalVideoTrack = trackArray[1] as ILocalVideoTrack;
      if (videoTrack) {
        let trackEventHandler: IrisTrackEventHandler = new IrisTrackEventHandler(
          {
            track: videoTrack,
            videoSourceType: videoType,
            trackType: 'ILocalTrack',
          },
          this._engine
        );
        irisClient.addTrackEventHandler(trackEventHandler);
      }

      return this._engine.returnResult();
    };
    return this._engine.execute(process);
  }
  updateScreenCapture(
    captureParams: NATIVE_RTC.ScreenCaptureParameters2
  ): CallApiReturnType {
    AgoraConsole.warn('updateScreenCapture not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  queryScreenCaptureCapability(): CallApiReturnType {
    AgoraConsole.warn(
      'queryScreenCaptureCapability not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setScreenCaptureScenario(
    screenScenario: NATIVE_RTC.SCREEN_SCENARIO_TYPE
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setScreenCaptureScenario not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  stopScreenCapture(): CallApiReturnType {
    return this.stopScreenCapture2(
      NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_SCREEN_PRIMARY
    );
  }

  stopScreenCapture2(
    sourceType: NATIVE_RTC.VIDEO_SOURCE_TYPE
  ): CallApiReturnType {
    let processFunc = async (): Promise<CallIrisApiResult> => {
      if (!this._engine.globalVariables.isScreenSharing) {
        AgoraConsole.log('screen share is not start');
      }
      let entitiesContainer = this._engine.entitiesContainer;
      let irisClient = entitiesContainer.getIrisClient();
      this._engine.globalVariables.screenCaptureParameters2 = null;
      this._engine.globalVariables.isScreenSharing = false;

      let audioTrackPackage = entitiesContainer.getLocalAudioTrack(
        IrisAudioSourceType.kAudioSourceTypeScreenPrimary,
        null
      );
      if (audioTrackPackage) {
        await irisClient.processAudioTrackClose(
          audioTrackPackage.track as ILocalAudioTrack
        );
        this._engine.rtcEngineEventHandler.onLocalAudioStateChanged(
          NATIVE_RTC.LOCAL_AUDIO_STREAM_STATE.LOCAL_AUDIO_STREAM_STATE_STOPPED,
          0
        );
      }

      let videoTrackPackage = entitiesContainer.getLocalVideoTrack(
        sourceType,
        null
      );
      if (entitiesContainer.getLocalVideoTrack(sourceType, null)) {
        await irisClient.processVideoTrackClose(
          videoTrackPackage.track as ILocalVideoTrack
        );
        this._engine.rtcEngineEventHandler.onLocalVideoStateChanged(
          sourceType,
          NATIVE_RTC.LOCAL_VIDEO_STREAM_STATE.LOCAL_VIDEO_STREAM_STATE_STOPPED,
          0
        );
      }
      return this._engine.returnResult();
    };

    return this._engine.execute(processFunc);
  }

  getCallId(callId: string): CallApiReturnType {
    AgoraConsole.warn('getCallId not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  rate(callId: string, rating: number, description: string): CallApiReturnType {
    AgoraConsole.warn('rate not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  complain(callId: string, description: string): CallApiReturnType {
    AgoraConsole.warn('complain not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  startRtmpStreamWithoutTranscoding(url: string): CallApiReturnType {
    AgoraConsole.warn(
      'startRtmpStreamWithoutTranscoding not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  startRtmpStreamWithTranscoding(
    url: string,
    transcoding: NATIVE_RTC.LiveTranscoding
  ): CallApiReturnType {
    AgoraConsole.warn(
      'startRtmpStreamWithTranscoding not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  updateRtmpTranscoding(
    transcoding: NATIVE_RTC.LiveTranscoding
  ): CallApiReturnType {
    AgoraConsole.warn('updateRtmpTranscoding not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  stopRtmpStream(url: string): CallApiReturnType {
    AgoraConsole.warn('stopRtmpStream not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  startLocalVideoTranscoder(
    config: NATIVE_RTC.LocalTranscoderConfiguration
  ): CallApiReturnType {
    AgoraConsole.warn(
      'startLocalVideoTranscoder not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  updateLocalTranscoderConfiguration(
    config: NATIVE_RTC.LocalTranscoderConfiguration
  ): CallApiReturnType {
    AgoraConsole.warn(
      'updateLocalTranscoderConfiguration not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  stopLocalVideoTranscoder(): CallApiReturnType {
    AgoraConsole.warn(
      'stopLocalVideoTranscoder not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  startCameraCapture(
    sourceType: NATIVE_RTC.VIDEO_SOURCE_TYPE,
    config: NATIVE_RTC.CameraCapturerConfiguration
  ): CallApiReturnType {
    AgoraConsole.warn('startCameraCapture not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  stopCameraCapture(
    sourceType: NATIVE_RTC.VIDEO_SOURCE_TYPE
  ): CallApiReturnType {
    AgoraConsole.warn('stopCameraCapture not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setCameraDeviceOrientation(
    type: NATIVE_RTC.VIDEO_SOURCE_TYPE,
    orientation: NATIVE_RTC.VIDEO_ORIENTATION
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setCameraDeviceOrientation not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setScreenCaptureOrientation(
    type: NATIVE_RTC.VIDEO_SOURCE_TYPE,
    orientation: NATIVE_RTC.VIDEO_ORIENTATION
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setScreenCaptureOrientation not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  startScreenCapture2(
    sourceType: NATIVE_RTC.VIDEO_SOURCE_TYPE,
    config: NATIVE_RTC.ScreenCaptureConfiguration
  ): CallApiReturnType {
    let processFunc = async (): Promise<CallIrisApiResult> => {
      //todo
      return CallIrisApiResult.success();
    };

    return this._engine.execute(processFunc);
  }
  getConnectionState(): CallApiReturnType {
    AgoraConsole.warn('getConnectionState not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
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
  setRemoteUserPriority(
    uid: number,
    userPriority: NATIVE_RTC.PRIORITY_TYPE
  ): CallApiReturnType {
    AgoraConsole.warn('setRemoteUserPriority not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setEncryptionMode(encryptionMode: string): CallApiReturnType {
    AgoraConsole.warn('setEncryptionMode not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setEncryptionSecret(secret: string): CallApiReturnType {
    AgoraConsole.warn('setEncryptionSecret not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  enableEncryption(
    enabled: boolean,
    config: NATIVE_RTC.EncryptionConfig
  ): CallApiReturnType {
    AgoraConsole.warn('enableEncryption not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  createDataStream(
    streamId: number[],
    reliable: boolean,
    ordered: boolean
  ): CallApiReturnType {
    AgoraConsole.warn('createDataStream not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  createDataStream2(
    streamId: number[],
    config: NATIVE_RTC.DataStreamConfig
  ): CallApiReturnType {
    AgoraConsole.warn('createDataStream2 not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  sendStreamMessage(
    streamId: number,
    data: string,
    length: number
  ): CallApiReturnType {
    AgoraConsole.warn('sendStreamMessage not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  addVideoWatermark(watermark: NATIVE_RTC.RtcImage): CallApiReturnType {
    AgoraConsole.warn('addVideoWatermark not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  addVideoWatermark2(
    watermarkUrl: string,
    options: NATIVE_RTC.WatermarkOptions
  ): CallApiReturnType {
    AgoraConsole.warn('addVideoWatermark2 not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  clearVideoWatermarks(): CallApiReturnType {
    AgoraConsole.warn('clearVideoWatermarks not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  pauseAudio(): CallApiReturnType {
    AgoraConsole.warn('pauseAudio not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  resumeAudio(): CallApiReturnType {
    AgoraConsole.warn('resumeAudio not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  enableWebSdkInteroperability(enabled: boolean): CallApiReturnType {
    AgoraConsole.warn(
      'enableWebSdkInteroperability not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  sendCustomReportMessage(
    id: string,
    category: string,
    event: string,
    label: string,
    value: number
  ): CallApiReturnType {
    AgoraConsole.warn(
      'sendCustomReportMessage not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  registerMediaMetadataObserver(
    observer: NATIVE_RTC.IMetadataObserver,
    type: NATIVE_RTC.METADATA_TYPE
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerMediaMetadataObserver not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  unregisterMediaMetadataObserver(
    observer: NATIVE_RTC.IMetadataObserver,
    type: NATIVE_RTC.METADATA_TYPE
  ): CallApiReturnType {
    AgoraConsole.warn(
      'unregisterMediaMetadataObserver not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  startAudioFrameDump(
    channel_id: string,
    user_id: number,
    location: string,
    uuid: string,
    passwd: string,
    duration_ms: number,
    auto_upload: boolean
  ): CallApiReturnType {
    AgoraConsole.warn('startAudioFrameDump not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  stopAudioFrameDump(
    channel_id: string,
    user_id: number,
    location: string
  ): CallApiReturnType {
    AgoraConsole.warn('stopAudioFrameDump not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setAINSMode(
    enabled: boolean,
    mode: NATIVE_RTC.AUDIO_AINS_MODE
  ): CallApiReturnType {
    AgoraConsole.warn('setAINSMode not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  registerLocalUserAccount(
    appId: string,
    userAccount: string
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerLocalUserAccount not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  joinChannelWithUserAccount(
    token: string,
    channelId: string,
    userAccount: string
  ): CallApiReturnType {
    AgoraConsole.warn(
      'joinChannelWithUserAccount not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  joinChannelWithUserAccount2(
    token: string,
    channelId: string,
    userAccount: string,
    options: NATIVE_RTC.ChannelMediaOptions
  ): CallApiReturnType {
    AgoraConsole.warn(
      'joinChannelWithUserAccount2 not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  joinChannelWithUserAccountEx(
    token: string,
    channelId: string,
    userAccount: string,
    options: NATIVE_RTC.ChannelMediaOptions
  ): CallApiReturnType {
    AgoraConsole.warn(
      'joinChannelWithUserAccountEx not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  getUserInfoByUserAccount(
    userAccount: string,
    userInfo: NATIVE_RTC.UserInfo[]
  ): CallApiReturnType {
    AgoraConsole.warn(
      'getUserInfoByUserAccount not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  getUserInfoByUid(
    uid: number,
    userInfo: NATIVE_RTC.UserInfo[]
  ): CallApiReturnType {
    AgoraConsole.warn('getUserInfoByUid not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  startOrUpdateChannelMediaRelay(
    configuration: NATIVE_RTC.ChannelMediaRelayConfiguration
  ): CallApiReturnType {
    AgoraConsole.warn(
      'startOrUpdateChannelMediaRelay not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  startChannelMediaRelay(
    configuration: NATIVE_RTC.ChannelMediaRelayConfiguration
  ): CallApiReturnType {
    AgoraConsole.warn('startChannelMediaRelay not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  updateChannelMediaRelay(
    configuration: NATIVE_RTC.ChannelMediaRelayConfiguration
  ): CallApiReturnType {
    AgoraConsole.warn(
      'updateChannelMediaRelay not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  stopChannelMediaRelay(): CallApiReturnType {
    AgoraConsole.warn('stopChannelMediaRelay not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  pauseAllChannelMediaRelay(): CallApiReturnType {
    AgoraConsole.warn(
      'pauseAllChannelMediaRelay not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  resumeAllChannelMediaRelay(): CallApiReturnType {
    AgoraConsole.warn(
      'resumeAllChannelMediaRelay not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setDirectCdnStreamingAudioConfiguration(
    profile: NATIVE_RTC.AUDIO_PROFILE_TYPE
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setDirectCdnStreamingAudioConfiguration not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setDirectCdnStreamingVideoConfiguration(
    config: NATIVE_RTC.VideoEncoderConfiguration
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setDirectCdnStreamingVideoConfiguration not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  startDirectCdnStreaming(
    eventHandler: NATIVE_RTC.IDirectCdnStreamingEventHandler,
    publishUrl: string,
    options: NATIVE_RTC.DirectCdnStreamingMediaOptions
  ): CallApiReturnType {
    AgoraConsole.warn(
      'startDirectCdnStreaming not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  stopDirectCdnStreaming(): CallApiReturnType {
    AgoraConsole.warn('stopDirectCdnStreaming not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  updateDirectCdnStreamingMediaOptions(
    options: NATIVE_RTC.DirectCdnStreamingMediaOptions
  ): CallApiReturnType {
    AgoraConsole.warn(
      'updateDirectCdnStreamingMediaOptions not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  startRhythmPlayer(
    sound1: string,
    sound2: string,
    config: NATIVE_RTC.AgoraRhythmPlayerConfig
  ): CallApiReturnType {
    AgoraConsole.warn('startRhythmPlayer not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  stopRhythmPlayer(): CallApiReturnType {
    AgoraConsole.warn('stopRhythmPlayer not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  configRhythmPlayer(
    config: NATIVE_RTC.AgoraRhythmPlayerConfig
  ): CallApiReturnType {
    AgoraConsole.warn('configRhythmPlayer not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  takeSnapshot(uid: number, filePath: string): CallApiReturnType {
    AgoraConsole.warn('takeSnapshot not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  enableContentInspect(
    enabled: boolean,
    config: NATIVE_RTC.ContentInspectConfig
  ): CallApiReturnType {
    AgoraConsole.warn('enableContentInspect not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  adjustCustomAudioPublishVolume(
    trackId: number,
    volume: number
  ): CallApiReturnType {
    AgoraConsole.warn(
      'adjustCustomAudioPublishVolume not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  adjustCustomAudioPlayoutVolume(
    trackId: number,
    volume: number
  ): CallApiReturnType {
    AgoraConsole.warn(
      'adjustCustomAudioPlayoutVolume not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setCloudProxy(proxyType: NATIVE_RTC.CLOUD_PROXY_TYPE): CallApiReturnType {
    AgoraConsole.warn('setCloudProxy not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setLocalAccessPoint(
    config: NATIVE_RTC.LocalAccessPointConfiguration
  ): CallApiReturnType {
    AgoraConsole.warn('setLocalAccessPoint not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setAdvancedAudioOptions(
    options: NATIVE_RTC.AdvancedAudioOptions,
    sourceType: number
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setAdvancedAudioOptions not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setAVSyncSource(channelId: string, uid: number): CallApiReturnType {
    AgoraConsole.warn('setAVSyncSource not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  enableVideoImageSource(
    enable: boolean,
    options: NATIVE_RTC.ImageTrackOptions
  ): CallApiReturnType {
    AgoraConsole.warn('enableVideoImageSource not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  getCurrentMonotonicTimeInMs(): CallApiReturnType {
    AgoraConsole.warn(
      'getCurrentMonotonicTimeInMs not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  enableWirelessAccelerate(enabled: boolean): CallApiReturnType {
    AgoraConsole.warn(
      'enableWirelessAccelerate not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  getNetworkType(): CallApiReturnType {
    AgoraConsole.warn('getNetworkType not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setParameters(parameters: string): CallApiReturnType {
    AgoraConsole.warn('setParameters not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  startMediaRenderingTracing(): CallApiReturnType {
    AgoraConsole.warn(
      'startMediaRenderingTracing not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  enableInstantMediaRendering(): CallApiReturnType {
    AgoraConsole.warn(
      'enableInstantMediaRendering not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  getNtpWallTimeInMs(): CallApiReturnType {
    AgoraConsole.warn('getNtpWallTimeInMs not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
}

export class IVideoDeviceManagerImpl implements NATIVE_RTC.IVideoDeviceManager {
  private _engine: IrisRtcEngine;

  public constructor(engine: IrisRtcEngine) {
    this._engine = engine;
  }

  enumerateVideoDevices(): CallApiReturnType {
    let deviceList = [];
    let process = async () => {
      try {
        deviceList = (await ImplHelper.enumerateDevices(this._engine))
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
      this._engine.entitiesContainer.irisClientList.map(async (irisClient) => {
        irisClient.irisClientVariables.videoDeviceId = deviceIdUTF8;
        let videoTrack = irisClient.localVideoTrack;
        if (
          videoTrack.type ==
            NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA_PRIMARY ||
          videoTrack.type ==
            NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA_SECONDARY ||
          videoTrack.type ==
            NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA_THIRD ||
          videoTrack.type ==
            NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA_FOURTH
        ) {
          await TrackHelper.setDevice(
            videoTrack.track as ICameraVideoTrack,
            deviceIdUTF8
          );
        }
      });

      return this._engine.returnResult();
    };
    return this._engine.execute(process);
  }
  getDevice(): CallApiReturnType {
    let process = async () => {
      let list: MediaDeviceInfo[] = [];
      let deviceId = '';
      let irisClient = this._engine.entitiesContainer.getIrisClient();
      if (irisClient.irisClientVariables.videoDeviceId) {
        deviceId = irisClient.irisClientVariables.videoDeviceId;
      } else if (this._engine.globalVariables.deviceEnumerated) {
        deviceId = this._engine.globalVariables.videoDevices[0]?.deviceId || '';
      } else {
        try {
          list = await this._engine.globalVariables.AgoraRTC.getCameras();
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

  numberOfCapabilities(deviceIdUTF8: string): CallApiReturnType {
    AgoraConsole.warn('numberOfCapabilities not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  getCapability(
    deviceIdUTF8: string,
    deviceCapabilityNumber: number,
    capability: NATIVE_RTC.VideoFormat
  ): CallApiReturnType {
    AgoraConsole.warn('getCapability not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  startDeviceTest(hwnd: number): CallApiReturnType {
    AgoraConsole.warn('startDeviceTest not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  stopDeviceTest(): CallApiReturnType {
    AgoraConsole.warn('stopDeviceTest not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  release(): CallApiReturnType {
    let process = async () => {
      let engine = this._engine;
      engine.globalVariables.playbackDevices = new Array();
      engine.globalVariables.recordingDevices = new Array();
      engine.globalVariables.videoDevices = new Array();
      engine.globalVariables.deviceEnumerated = false;
      return this._engine.returnResult();
    };
    return this._engine.execute(process);
  }
}
