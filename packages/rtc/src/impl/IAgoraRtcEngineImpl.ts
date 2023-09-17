import * as NATIVE_RTC from '@iris/web-rtc';
import AgoraRTC, {
  ClientRole,
  ClientRoleOptions,
  IAgoraRTCClient,
  ILocalAudioTrack,
  ILocalVideoTrack,
  IMicrophoneAudioTrack,
} from 'agora-rtc-sdk-ng';
import {
  AsyncTaskType,
  CallApiReturnType,
  CallIrisApiResult,
} from 'iris-web-core';

import {
  IrisAudioSourceType,
  IrisClientType,
  IrisVideoSourceType,
} from '../base/BaseType';
import { IrisRtcEngine } from '../engine/IrisRtcEngine';
import { IrisClientEventHandler } from '../event_handler/IrisClientEventHandler';

import { IrisTrackEventHandler } from '../event_handler/IrisTrackEventHandler';

import { IRtcEngineExtensions } from '../extensions/IAgoraRtcEngineExtensions';
import { IrisMainClientVariables } from '../states/IrisMainClientVariables';
import { Action } from '../util/AgoraActionQueue';
import { AgoraConsole } from '../util/AgoraConsole';
import { AgoraTranslate } from '../util/AgoraTranslate';

import { ImplHelper } from './ImplHelper';

export const RTCENGINE_KEY = 'RtcEngine';

export class IRtcEngineImpl implements IRtcEngineExtensions {
  private _engine: IrisRtcEngine = null;

  constructor(engine: IrisRtcEngine) {
    this._engine = engine;
  }

  putAction(action: Action) {
    this._engine.actionQueue.putAction(action);
  }

  private execute(task: AsyncTaskType): CallApiReturnType {
    return this._engine.executor.execute(task);
  }

  private returnResult(
    code: number = 0,
    data: string = '{"result": 0}'
  ): Promise<CallIrisApiResult> {
    return Promise.resolve(new CallIrisApiResult(code, data));
  }

  isFeatureAvailableOnDevice(type: NATIVE_RTC.FeatureType): CallApiReturnType {
    AgoraConsole.warn(
      'isFeatureAvailableOnDevice not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }

  release(sync: boolean): CallApiReturnType {
    let processFunc = async (): Promise<CallIrisApiResult> => {
      await this._engine.entitiesContainer.destruction();

      return CallIrisApiResult.success();
    };

    return this.execute(processFunc);
  }

  setAppType(appType: number): CallApiReturnType {
    let processFunc = async (): Promise<CallIrisApiResult> => {
      AgoraRTC.setAppType(appType);
      return Promise.resolve(new CallIrisApiResult(0, '{"result": 0}'));
    };

    return this.execute(processFunc);
  }

  initialize(context: NATIVE_RTC.RtcEngineContext): CallApiReturnType {
    let processFunc = () => {
      this._engine.globalVariables.rtcEngineContext = context;

      AgoraRTC.setArea([
        AgoraTranslate.NATIVE_RTCAREA_CODE2AREAS(context.areaCode),
      ]);

      AgoraRTC.setLogLevel(
        AgoraTranslate.NATIVE_RTCLOG_LEVEL2Number(context?.logConfig?.level)
      );

      let result = AgoraRTC.checkSystemRequirements();
      return this.returnResult(
        result
          ? -NATIVE_RTC.ERROR_CODE_TYPE.ERR_OK
          : -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_READY
      );
    };

    return this.execute(processFunc);
  }
  getVersion(): CallApiReturnType {
    AgoraConsole.warn('getVersion not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getErrorDescription(code: number): CallApiReturnType {
    AgoraConsole.warn('getErrorDescription not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  queryCodecCapability(
    codecInfo: NATIVE_RTC.CodecCapInfo[],
    size: number
  ): CallApiReturnType {
    AgoraConsole.warn('queryCodecCapability not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  preloadChannel(
    token: string,
    channelId: string,
    uid: number
  ): CallApiReturnType {
    AgoraConsole.warn('preloadChannel not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  preloadChannel2(
    token: string,
    channelId: string,
    userAccount: string
  ): CallApiReturnType {
    AgoraConsole.warn('preloadChannel2 not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  updatePreloadChannelToken(token: string): CallApiReturnType {
    AgoraConsole.warn(
      'updatePreloadChannelToken not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  joinChannel(
    token: string,
    channelId: string,
    info: string,
    uid: number
  ): CallApiReturnType {
    let mvs = this._engine.mainClientVariables;
    let rtcEngineContext = this._engine.globalVariables.rtcEngineContext;
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
        rtcEngineContext.channelProfile ||
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
    if (this._engine.mainClientVariables.joinChanneled == true) {
      AgoraConsole.error('already call joinChannel');
      return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_JOIN_CHANNEL_REJECTED;
    }

    this._engine.mainClientVariables.joinChanneled = true;

    let processJoinChannel = async (): Promise<CallIrisApiResult> => {
      // this._engine.mainClientVariables.startPreviewed = false;
      let mainClientVariables: IrisMainClientVariables = this._engine
        .mainClientVariables;
      let globalVariables = this._engine.globalVariables;
      mainClientVariables.mergeChannelMediaOptions(options);
      let mainClient: IAgoraRTCClient = ImplHelper.createMainClient(
        this._engine
      );

      //在JoinChannel之前就必须监听client的event，不然在Join过程中触发的回调会丢失呢
      let entitiesContainer = this._engine.entitiesContainer;
      entitiesContainer.setMainClient(mainClient);
      let clientEventHandler = new IrisClientEventHandler(
        mainClient,
        IrisClientType.kClientMian,
        this._engine
      );
      entitiesContainer.setMainClientEventHandler(clientEventHandler);
      try {
        uid = (await mainClient.join(
          globalVariables.rtcEngineContext.appId,
          channelId,
          token ? token : null,
          uid
        )) as number;
      } catch (reason) {
        AgoraConsole.error('join channel failed: join failed');
        reason && AgoraConsole.error(reason);
        this._engine.rtcEngineEventHandler.onError(
          NATIVE_RTC.ERROR_CODE_TYPE.ERR_JOIN_CHANNEL_REJECTED,
          ''
        );
        this._engine.mainClientVariables.joinChanneled = false;
        this._engine.entitiesContainer.clearMainClientAll(null);
        // next();
        return;
      }

      this._engine.mainClientVariables.token = token;

      let audioSource: IrisAudioSourceType =
        IrisAudioSourceType.kAudioSourceTypeUnknow;
      if (globalVariables.enabledAudio && globalVariables.enabledLocalAudio) {
        if (mainClientVariables.publishAudioTrack) {
          audioSource = IrisAudioSourceType.kAudioSourceTypeMicrophonePrimary;
        }
      }

      let videoSource: IrisVideoSourceType =
        IrisVideoSourceType.kVideoSourceTypeUnknown;
      if (globalVariables.enabledVideo && globalVariables.enabledLocalVideo) {
        if (mainClientVariables.publishCameraTrack) {
          videoSource = IrisVideoSourceType.kVideoSourceTypeCameraPrimary;
        } else if (mainClientVariables.publishSecondaryCameraTrack) {
          videoSource = IrisVideoSourceType.kVideoSourceTypeCameraSecondary;
        } else if (mainClientVariables.publishScreenTrack) {
          videoSource = IrisVideoSourceType.kVideoSourceTypeScreenPrimary;
        } else if (mainClientVariables.publishSecondaryScreenTrack) {
          videoSource = IrisVideoSourceType.kVideoSourceTypeScreenSecondary;
        }
      }

      let clientType = IrisClientType.kClientMian;
      let trackArray: [ILocalAudioTrack, ILocalVideoTrack] = [null, null];
      try {
        trackArray = await ImplHelper.getOrCreateAudioAndVideoTrackAsync(
          this._engine,
          audioSource,
          videoSource,
          clientType,
          null
        );
      } catch (e) {
        AgoraConsole.error('create audio And videoTrack failed');
        AgoraConsole.error(e);
        // next();
        return;
      }

      let con: NATIVE_RTC.RtcConnection = {
        channelId: channelId,
        localUid: mainClient.uid as number,
      };
      //joinChannel success咯
      this._engine.rtcEngineEventHandler.onJoinChannelSuccessEx(con, 0);
      //推送麦克风audio
      let audioTrack: IMicrophoneAudioTrack = trackArray[0] as IMicrophoneAudioTrack;
      if (audioTrack) {
        if (mainClientVariables.publishAudioTrack) {
          entitiesContainer.addMainClientLocalAudioTrack({
            type: IrisAudioSourceType.kAudioSourceTypeMicrophonePrimary,
            track: audioTrack,
          });
          let trackEventHandler: IrisTrackEventHandler = new IrisTrackEventHandler(
            {
              channelName: channelId,
              client: mainClient,
              track: audioTrack,
              trackType: 'ILocalTrack',
            },
            this._engine
          );
          entitiesContainer.addMainClientTrackEventHandler(trackEventHandler);

          try {
            await mainClient.publish(audioTrack);
          } catch (reason) {
            AgoraConsole.error('audio track publish failed');
            AgoraConsole.error(reason);
            entitiesContainer.removeMainClientTrackEventHandlerByTrack(
              audioTrack
            );
            entitiesContainer.removeMainClientLocalAudioTrack(audioTrack);
          }
        }

        //推送屏幕共享audio
        if (mainClientVariables.publishScreenCaptureAudio) {
          let audioTrackPackage = this._engine.entitiesContainer.getLocalAudioTrackByType(
            IrisAudioSourceType.kAudioSourceTypeScreenPrimary
          );
          if (audioTrackPackage) {
            let audioTrack = audioTrackPackage.track as ILocalAudioTrack;

            entitiesContainer.addMainClientLocalAudioTrack({
              type: IrisAudioSourceType.kAudioSourceTypeScreenPrimary,
              track: audioTrack,
            });
            let trackEventHandler: IrisTrackEventHandler = new IrisTrackEventHandler(
              {
                channelName: channelId,
                client: mainClient,
                track: audioTrack,
                trackType: 'ILocalTrack',
              },
              this._engine
            );
            entitiesContainer.addMainClientTrackEventHandler(trackEventHandler);

            try {
              await mainClient.publish(audioTrack);
            } catch (reason) {
              AgoraConsole.error('screen share audio track publish failed');
              AgoraConsole.error(reason);
              entitiesContainer.removeMainClientTrackEventHandlerByTrack(
                audioTrack
              );
              entitiesContainer.removeMainClientLocalAudioTrack(audioTrack);
            }
          }
        }
      }

      //推送video
      let videoTrack: ILocalVideoTrack = trackArray[1] as ILocalVideoTrack;
      if (videoTrack) {
        entitiesContainer.setMainClientLocalVideoTrack({
          type: videoSource,
          track: videoTrack,
        });
        let trackEventHandler: IrisTrackEventHandler = new IrisTrackEventHandler(
          {
            channelName: channelId,
            client: mainClient,
            track: videoTrack,
            trackType: 'ILocalVideoTrack',
          },
          this._engine
        );
        entitiesContainer.addMainClientTrackEventHandler(trackEventHandler);

        try {
          await mainClient.publish(videoTrack);
        } catch (reason) {
          AgoraConsole.error('video track publish failed');
          AgoraConsole.error(reason);
          entitiesContainer.removeMainClientTrackEventHandlerByTrack(
            videoTrack
          );
          entitiesContainer.clearMainClientLocalVideoTrack();
        }
      }

      return this.returnResult();

      // next();
    };

    return this.execute(processJoinChannel);
  }
  updateChannelMediaOptions(
    options: NATIVE_RTC.ChannelMediaOptions
  ): CallApiReturnType {
    let processFunc: AsyncTaskType = async (): Promise<CallIrisApiResult> => {
      this._engine.mainClientVariables.mergeChannelMediaOptions(options);

      //必须先依次 unpublish, 完毕之后，再依次去publish
      let entitiesContainer = this._engine.entitiesContainer;
      let mainClient = entitiesContainer.getMainClient();
      if (mainClient == null) {
        return;
      }

      let argsUnpublish: Array<[
        string,
        IrisAudioSourceType | IrisVideoSourceType,
        'audio' | 'video'
      ]> = [];
      let argsPublish: Array<[
        string,
        IrisAudioSourceType | IrisVideoSourceType,
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
          IrisVideoSourceType.kVideoSourceTypeCameraPrimary,
          'video',
        ]);
      } else if (options.publishCameraTrack == true) {
        argsPublish.push([
          'publishCameraTrack',
          IrisVideoSourceType.kVideoSourceTypeCameraPrimary,
          'video',
        ]);
      }

      if (options.publishSecondaryCameraTrack == false) {
        argsUnpublish.push([
          'publishSecondaryCameraTrack',
          IrisVideoSourceType.kVideoSourceTypeCameraSecondary,
          'video',
        ]);
      } else if (options.publishSecondaryCameraTrack == true) {
        argsPublish.push([
          'publishSecondaryCameraTrack',
          IrisVideoSourceType.kVideoSourceTypeCameraSecondary,
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
          IrisVideoSourceType.kVideoSourceTypeScreenPrimary,
          'video',
        ]);
      } else if (options.publishScreenTrack == true) {
        argsPublish.push([
          'publishScreenTrack',
          IrisVideoSourceType.kVideoSourceTypeScreenPrimary,
          'video',
        ]);
      }

      if (options.publishSecondaryScreenTrack == false) {
        argsUnpublish.push([
          'publishSecondaryScreenTrack',
          IrisVideoSourceType.kVideoSourceTypeScreenSecondary,
          'video',
        ]);
      } else if (options.publishSecondaryScreenTrack == true) {
        argsPublish.push([
          'publishSecondaryScreenTrack',
          IrisVideoSourceType.kVideoSourceTypeScreenSecondary,
          'video',
        ]);
      }

      for (let UnpublishArags of argsUnpublish) {
        let optionName = UnpublishArags[0];
        let audioOrVideoType = UnpublishArags[1];
        let type = UnpublishArags[2];

        if (type == 'audio') {
          //unpublish audio
          let audioPackage = entitiesContainer.getLocalAudioTrackByType(
            audioOrVideoType as IrisAudioSourceType
          );
          if (audioPackage) {
            let track = audioPackage.track as ILocalAudioTrack;
            if (mainClient.localTracks.indexOf(track) != -1) {
              try {
                await mainClient.unpublish(track);
                AgoraConsole.log(optionName + '(false) changed success');
                entitiesContainer.removeMainClientTrackEventHandlerByTrack(
                  track
                );
                entitiesContainer.removeMainClientLocalAudioTrack(track);
              } catch (reason) {
                AgoraConsole.error(optionName + '(false) changed failed');
              }
            }
          }
        } else {
          //unpublish video
          let videoPackage = entitiesContainer.getLocalVideoTrackByType(
            audioOrVideoType as IrisVideoSourceType
          );
          if (videoPackage) {
            let track = videoPackage.track as ILocalVideoTrack;
            if (mainClient.localTracks.indexOf(track) != -1) {
              try {
                await mainClient.unpublish(track);
                AgoraConsole.log(optionName + '(false) changed success');
                entitiesContainer.removeMainClientTrackEventHandlerByTrack(
                  track
                );
                entitiesContainer.setMainClientLocalVideoTrack(null);
              } catch (reason) {
                AgoraConsole.error(optionName + '(false) changed failed');
              }
            }
          }
        }
      }

      for (let publishArags of argsPublish) {
        let optionName = publishArags[0];
        let audioOrVideoType = publishArags[1];
        let type = publishArags[2];
        if (type == 'audio') {
          //publish audio
          let audioPackage = entitiesContainer.getLocalAudioTrackByType(
            audioOrVideoType as IrisAudioSourceType
          );
          if (audioPackage) {
            let track = audioPackage.track as ILocalAudioTrack;
            if (mainClient.localTracks.indexOf(track) == -1) {
              try {
                await mainClient.publish(track);
                AgoraConsole.log(optionName + '(true) changed success');
                let trackEventHandler: IrisTrackEventHandler = new IrisTrackEventHandler(
                  {
                    channelName: mainClient.channelName,
                    client: mainClient,
                    track: track,
                    trackType: 'ILocalTrack',
                  },
                  this._engine
                );

                entitiesContainer.addMainClientTrackEventHandler(
                  trackEventHandler
                );
                entitiesContainer.addMainClientLocalAudioTrack({
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
          let videoPackage = entitiesContainer.getLocalVideoTrackByType(
            audioOrVideoType as IrisVideoSourceType
          );
          if (videoPackage) {
            let track = videoPackage.track as ILocalVideoTrack;
            if (mainClient.localTracks.indexOf(track) == -1) {
              try {
                await mainClient.publish(track);
                AgoraConsole.log(optionName + '(true) changed success');
                let trackEventHandler: IrisTrackEventHandler = new IrisTrackEventHandler(
                  {
                    channelName: mainClient.channelName,
                    client: mainClient,
                    track: track,
                    trackType: 'ILocalVideoTrack',
                  },
                  this._engine
                );

                entitiesContainer.addMainClientTrackEventHandler(
                  trackEventHandler
                );
                entitiesContainer.setMainClientLocalVideoTrack({
                  type: audioOrVideoType as IrisVideoSourceType,
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
        let roleOptions: ClientRoleOptions = null;
        if (options.audienceLatencyLevel != null) {
          roleOptions = AgoraTranslate.NATIVE_RTCAUDIENCE_LATENCY_LEVEL_TYPE2ClientRoleOptions(
            options.audienceLatencyLevel
          );
        }

        try {
          await mainClient.setClientRole(
            AgoraTranslate.NATIVE_RTCCLIENT_ROLE_TYPE2ClientRole(
              options.clientRoleType
            ),
            roleOptions
          );
        } catch (e) {
          AgoraConsole.error('setClientRole failed');
        }
      }

      if (options.token != null) {
        try {
          await mainClient.renewToken(options.token);
          //这里的新token已经在 fun 的第一行被保存了
        } catch (e) {
          AgoraConsole.error('renewToken failed');
        }
      }
      return CallIrisApiResult.success();
    };
    return this.execute(processFunc);
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
      if (this._engine.mainClientVariables.joinChanneled == false) {
        // AgoraConsole.error("you must join channel before you call this method");
        // return CallIrisApiResult.failed(0, -NATIVE_RTC.ERROR_CODE_TYPE.ERR_FAILED);
        return CallIrisApiResult.success();
      }

      this._engine.mainClientVariables.joinChanneled = false;

      let mainClient: IAgoraRTCClient = this._engine.entitiesContainer.getMainClient();
      if (mainClient) {
        //todo 读取 options

        //为了防止离开频道后丢失了channelName和uid，所以需要先保存一下
        let con: NATIVE_RTC.RtcConnection = {
          channelId: mainClient.channelName,
          localUid: mainClient.uid as number,
        };
        let channelId = mainClient.channelName;
        mainClient
          .leave()
          .then(() => {
            this._engine.rtcEngineEventHandler.onLeaveChannelEx(
              con,
              new NATIVE_RTC.RtcStats()
            );
            this._engine.entitiesContainer.clearMainClientAll(channelId);
          })
          .catch((reason) => {
            AgoraConsole.error('leaveChannel failed');
            reason && AgoraConsole.error(reason);
            this._engine.rtcEngineEventHandler.onError(
              NATIVE_RTC.ERROR_CODE_TYPE.ERR_LEAVE_CHANNEL_REJECTED,
              ''
            );
          })
          .finally(() => {
            // next();
          });
      } else {
        // next();
      }

      return CallIrisApiResult.success();
    };

    return this.execute(processFunc);
  }
  renewToken(token: string): CallApiReturnType {
    AgoraConsole.warn('renewToken not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setChannelProfile(
    profile: NATIVE_RTC.CHANNEL_PROFILE_TYPE
  ): CallApiReturnType {
    AgoraConsole.warn('setChannelProfile not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }

  //可以在加入频道前后调用
  setClientRole(role: NATIVE_RTC.CLIENT_ROLE_TYPE): CallApiReturnType {
    let options: NATIVE_RTC.ClientRoleOptions = {
      audienceLatencyLevel:
        NATIVE_RTC.AUDIENCE_LATENCY_LEVEL_TYPE
          .AUDIENCE_LATENCY_LEVEL_ULTRA_LOW_LATENCY,
      //todo 麦克风recording需要排查
      // stopMicrophoneRecording: false,
      // stopPreview: false,
    };
    return this.setClientRole2(role, options);
  }

  setClientRole2(
    role: NATIVE_RTC.CLIENT_ROLE_TYPE,
    options: NATIVE_RTC.ClientRoleOptions
  ): CallApiReturnType {
    let processFunc = async (): Promise<CallIrisApiResult> => {
      this._engine.mainClientVariables.clientRoleType = role;

      let webRole: ClientRole = AgoraTranslate.NATIVE_RTCCLIENT_ROLE_TYPE2ClientRole(
        role
      );
      let webRoleOptions: ClientRoleOptions = AgoraTranslate.NATIVE_RTCClientRoleOptions2ClientRoleOptions(
        options
      );
      //只有观众才能设置 第二个参数。主播不能设置第二个参数
      this._engine.entitiesContainer
        .getMainClient()
        ?.setClientRole(webRole, webRole == 'audience' ? webRoleOptions : null);

      let audioTrack = this._engine.entitiesContainer.getLocalAudioTrackByType(
        IrisAudioSourceType.kAudioSourceTypeMicrophonePrimary
      );
      if (audioTrack) {
        let track = audioTrack.track as IMicrophoneAudioTrack;
        if (track.muted == false) {
          track
            .setMuted(true)
            .then(() => {})
            .catch(() => {
              AgoraConsole.error(' track.setMuted(true) failed');
            });
        } else if (track.muted == true) {
          track
            .setMuted(false)
            .then(() => {})
            .catch(() => {
              AgoraConsole.error(' track.setMuted(false) failed');
            });
        }
      }

      // next();

      return this.returnResult();
    };

    return this.execute(processFunc);
  }

  startEchoTest(): CallApiReturnType {
    AgoraConsole.warn('startEchoTest not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  startEchoTest2(intervalInSeconds: number): CallApiReturnType {
    AgoraConsole.warn('startEchoTest2 not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  startEchoTest3(config: NATIVE_RTC.EchoTestConfiguration): CallApiReturnType {
    AgoraConsole.warn('startEchoTest3 not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  stopEchoTest(): CallApiReturnType {
    AgoraConsole.warn('stopEchoTest not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  enableMultiCamera(
    enabled: boolean,
    config: NATIVE_RTC.CameraCapturerConfiguration
  ): CallApiReturnType {
    AgoraConsole.warn('enableMultiCamera not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  enableVideo(): CallApiReturnType {
    let processVideoTrack = async (): Promise<CallIrisApiResult> => {
      this._engine.globalVariables.enabledVideo = true;

      //找到本端video
      if (this._engine.globalVariables.enabledLocalVideo) {
        let trackPackages = this._engine.entitiesContainer.getLocalVideoTracks();
        for (let trackPackage of trackPackages) {
          if (!trackPackage.track) {
            continue;
          }

          let track = trackPackage.track as ILocalVideoTrack;
          if (track.isPlaying == false) {
            try {
              // TODO(littlegnal): This is a WebGL specific requirement
              // await track.play(this._engine.generateVideoTrackLabelOrHtmlElement("", 0, trackPackage.type));
            } catch (e) {
              AgoraConsole.error('ILocalVideoTrack play(true) failed');
              AgoraConsole.error(e);
            }
          }
          if (track.enabled == false) {
            try {
              await track.setEnabled(true);
            } catch (e) {
              AgoraConsole.error('ILocalVideoTrack setEnable(true) failed');
              AgoraConsole.error(e);
            }
          }
        }
      }

      //找到远端video
      //mainClient的远端用户
      let entitiesContainer = this._engine.entitiesContainer;
      let mainClient = entitiesContainer.getMainClient();
      if (mainClient && mainClient.channelName) {
        let remoteUsers = mainClient.remoteUsers;
        for (let remoteUser of remoteUsers) {
          //todo 远端用户发流的时候。我不订阅，那么他的hasVideo为true， 但是他们的videoTrack是null
          if (
            remoteUser.hasVideo &&
            remoteUser.videoTrack &&
            remoteUser.videoTrack.isPlaying == false
          ) {
            // TODO(littlegnal): This is a WebGL specific requirement
            // remoteUser.videoTrack.play(this._engine.generateVideoTrackLabelOrHtmlElement(mainClient.channelName, remoteUser.uid as number, IrisVideoSourceType.kVideoSourceTypeRemote))
          }
        }
      }

      //subClient的远端用户
      entitiesContainer.getSubClients().walkT((channel_id, uid, subClient) => {
        let remoteUsers = subClient.remoteUsers;
        for (let remoteUser of remoteUsers) {
          if (
            remoteUser.hasVideo &&
            remoteUser.videoTrack &&
            remoteUser.videoTrack.isPlaying == false
          ) {
            // TODO(littlegnal): This is a WebGL specific requirement
            // remoteUser.videoTrack.play(this._engine.generateVideoTrackLabelOrHtmlElement(mainClient.channelName, remoteUser.uid as number, IrisVideoSourceType.kVideoSourceTypeRemote))
          }
        }
      });

      // next();

      return this.returnResult();
    };

    return this.execute(processVideoTrack);
  }
  disableVideo(): CallApiReturnType {
    let processVideoTrack = async (): Promise<CallIrisApiResult> => {
      this._engine.globalVariables.enabledVideo = false;

      //todo 一股脑的全部enable或者disable是否合理?
      //找到本端video
      let trackPackages = this._engine.entitiesContainer.getLocalVideoTracks();
      for (let trackPackage of trackPackages) {
        let track = trackPackage.track as ILocalVideoTrack;
        if (track.enabled == true) {
          try {
            await track.setEnabled(false);
          } catch (e) {
            AgoraConsole.error('ILocalVideoTrack setEnable(false) failed');
            AgoraConsole.error(e);
          }
        }
      }

      //mainClient的远端用户
      let entitiesContainer = this._engine.entitiesContainer;
      let mainClient = entitiesContainer.getMainClient();
      if (mainClient && mainClient.channelName) {
        let remoteUsers = mainClient.remoteUsers;
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

      //subClient的远端用户
      entitiesContainer.getSubClients().walkT((channel_id, uid, subClient) => {
        let remoteUsers = subClient.remoteUsers;
        for (let remoteUser of remoteUsers) {
          if (
            remoteUser.hasVideo &&
            remoteUser.videoTrack &&
            remoteUser.videoTrack.isPlaying
          ) {
            remoteUser.videoTrack.stop();
          }
        }
      });
      return this.returnResult();
    };
    return this.execute(processVideoTrack);
  }
  startPreview(): CallApiReturnType {
    return this.startPreview2(NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA);
  }
  startPreview2(sourceType: NATIVE_RTC.VIDEO_SOURCE_TYPE): CallApiReturnType {
    let process = async (): Promise<CallIrisApiResult> => {
      if (this._engine.globalVariables.enabledVideo == false) {
        AgoraConsole.error('call enableVideo(true) before startPreview');
        // next();
        return;
      }

      // if (this._engine.mainClientVariables.startPreviewed == true) {
      //     AgoraConsole.error("you already call startPreview");
      //     next();
      //     return;
      // }

      if (sourceType >= 4) {
        AgoraConsole.error('Invalid source type');
        // next();
        return;
      }

      // this._engine.mainClientVariables.startPreviewed = true;

      let audioSource: IrisAudioSourceType =
        IrisAudioSourceType.kAudioSourceTypeUnknow;
      let videoSource: IrisVideoSourceType = sourceType as number;

      console.log(`startPreview2 videoSource: ${videoSource}`);

      try {
        await ImplHelper.getOrCreateAudioAndVideoTrackAsync(
          this._engine,
          audioSource,
          videoSource,
          IrisClientType.kClientMian,
          null
        );

        let trackPackages = this._engine.entitiesContainer.getLocalVideoTracks();
        for (let trackPackage of trackPackages) {
          let track = trackPackage.track as ILocalVideoTrack;
          if (!track) {
            continue;
          }

          if (track.enabled == false) {
            try {
              await track.setEnabled(true);
            } catch (e) {
              AgoraConsole.error('ILocalVideoTrack setEnable(true) failed');
              AgoraConsole.error(e);
            }
          }

          if (track.isPlaying) {
            track.stop();
          }

          if (trackPackage.element) {
            track.play(trackPackage.element);
          }
        }

        AgoraConsole.log('start preview createCameraVideoTrack success');
      } catch (err) {
        AgoraConsole.error(
          'Start preview failed: create video and audio track failed'
        );
        err && AgoraConsole.error(err);
        // this._engine.mainClientVariables.startPreviewed = false;
      }
      // next();

      return this.returnResult();
    };

    return this.execute(process);
  }
  stopPreview(): CallApiReturnType {
    return this.stopPreview2(NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA);
  }
  stopPreview2(sourceType: NATIVE_RTC.VIDEO_SOURCE_TYPE): CallApiReturnType {
    let process = async (): Promise<CallIrisApiResult> => {
      let audioSource: IrisAudioSourceType =
        IrisAudioSourceType.kAudioSourceTypeUnknow;
      let videoSource: IrisVideoSourceType =
        IrisVideoSourceType.kVideoSourceTypeUnknown;
      if (
        sourceType == NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA_PRIMARY
      ) {
        audioSource = IrisAudioSourceType.kAudioSourceTypeMicrophonePrimary;
        videoSource = IrisVideoSourceType.kVideoSourceTypeCameraPrimary;
      } else if (
        sourceType == NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_SCREEN_PRIMARY
      ) {
        audioSource = IrisAudioSourceType.kAudioSourceTypeScreenPrimary;
        videoSource = IrisVideoSourceType.kVideoSourceTypeScreenPrimary;
      }

      let audioTrackPackage = this._engine.entitiesContainer.getLocalAudioTrackByType(
        audioSource
      );
      if (audioTrackPackage) {
        let audioTrack = audioTrackPackage.track as ILocalAudioTrack;
        if (audioTrack.enabled) {
          audioTrack
            .setEnabled(false)
            .then(() => {})
            .catch(() => {});
        }
      }

      let videoTrackPackage = this._engine.entitiesContainer.getLocalVideoTrackByType(
        videoSource
      );
      if (videoTrackPackage) {
        let videoTrack = videoTrackPackage.track as ILocalVideoTrack;
        if (videoTrack.enabled) {
          videoTrack
            .setEnabled(false)
            .then(() => {})
            .catch(() => {});
        }
      }
      return this.returnResult();
    };
    return this.execute(process);
  }
  startLastmileProbeTest(
    config: NATIVE_RTC.LastmileProbeConfig
  ): CallApiReturnType {
    AgoraConsole.warn('startLastmileProbeTest not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  stopLastmileProbeTest(): CallApiReturnType {
    AgoraConsole.warn('stopLastmileProbeTest not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setVideoEncoderConfiguration(
    config: NATIVE_RTC.VideoEncoderConfiguration
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setVideoEncoderConfiguration not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setBeautyEffectOptions(
    enabled: boolean,
    options: NATIVE_RTC.BeautyOptions,
    type: NATIVE_RTC.MEDIA_SOURCE_TYPE
  ): CallApiReturnType {
    AgoraConsole.warn('setBeautyEffectOptions not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setLowlightEnhanceOptions(
    enabled: boolean,
    options: NATIVE_RTC.LowlightEnhanceOptions,
    type: NATIVE_RTC.MEDIA_SOURCE_TYPE
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setLowlightEnhanceOptions not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setVideoDenoiserOptions(
    enabled: boolean,
    options: NATIVE_RTC.VideoDenoiserOptions,
    type: NATIVE_RTC.MEDIA_SOURCE_TYPE
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setVideoDenoiserOptions not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setColorEnhanceOptions(
    enabled: boolean,
    options: NATIVE_RTC.ColorEnhanceOptions,
    type: NATIVE_RTC.MEDIA_SOURCE_TYPE
  ): CallApiReturnType {
    AgoraConsole.warn('setColorEnhanceOptions not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
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
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setupRemoteVideo(canvas: NATIVE_RTC.VideoCanvas): CallApiReturnType {
    AgoraConsole.warn('setupRemoteVideo not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setupLocalVideo(canvas: NATIVE_RTC.VideoCanvas): CallApiReturnType {
    AgoraConsole.warn('setupLocalVideo not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setVideoScenario(
    scenarioType: NATIVE_RTC.VIDEO_APPLICATION_SCENARIO_TYPE
  ): CallApiReturnType {
    AgoraConsole.warn('setVideoScenario not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  enableAudio(): CallApiReturnType {
    let processAudioTracks = async (): Promise<CallIrisApiResult> => {
      this._engine.globalVariables.enabledAudio = true;
      //找到本地audio
      let trackPackages = this._engine.entitiesContainer.getLocalAudioTracks();
      for (let trackPackage of trackPackages) {
        let track = trackPackage.track as ILocalAudioTrack;
        if (track.enabled == false) {
          try {
            await track.setEnabled(true);
          } catch (e) {
            AgoraConsole.error('track setEnable(true) failed');
            AgoraConsole.error(e);
          }
        }
      }

      //找到远端audio
      let remoteUsers = this._engine.entitiesContainer.getAllRemoteUsers();
      for (let remoteUser of remoteUsers) {
        if (remoteUser.audioTrack && remoteUser.audioTrack.isPlaying == false) {
          remoteUser.audioTrack.play();
        }
      }

      return this.returnResult();
    };

    return this.execute(processAudioTracks);
  }
  disableAudio(): CallApiReturnType {
    AgoraConsole.warn('disableAudio not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setAudioProfile(
    profile: NATIVE_RTC.AUDIO_PROFILE_TYPE,
    scenario: NATIVE_RTC.AUDIO_SCENARIO_TYPE
  ): CallApiReturnType {
    let processFunc = async (): Promise<CallIrisApiResult> => {
      this._engine.globalVariables.audioProfile = profile;
      this._engine.globalVariables.rtcEngineContext.audioScenario = scenario;

      return this.returnResult();
    };

    return this.execute(processFunc);
  }

  setAudioProfile2(profile: NATIVE_RTC.AUDIO_PROFILE_TYPE): CallApiReturnType {
    let processFunc = async (): Promise<CallIrisApiResult> => {
      this._engine.globalVariables.audioProfile = profile;

      return this.returnResult();
    };

    return this.execute(processFunc);
  }
  setAudioScenario(
    scenario: NATIVE_RTC.AUDIO_SCENARIO_TYPE
  ): CallApiReturnType {
    AgoraConsole.warn('setAudioScenario not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  enableLocalAudio(enabled: boolean): CallApiReturnType {
    let processFunc = async (): Promise<CallIrisApiResult> => {
      this._engine.globalVariables.enabledLocalAudio = enabled;
      //找到本地audio
      let trackPackages = this._engine.entitiesContainer.getLocalAudioTracks();
      for (let trackPackage of trackPackages) {
        let track = trackPackage.track as ILocalAudioTrack;
        if (track.enabled != enabled) {
          try {
            await track.setEnabled(enabled);
          } catch (e) {
            AgoraConsole.error(
              'ILocalAudioTrack setEnable{' + enabled + '} failed'
            );
            AgoraConsole.error(e);
          }
        }
      }
      return this.returnResult();
    };

    return this.execute(processFunc);
  }
  muteLocalAudioStream(mute: boolean): CallApiReturnType {
    AgoraConsole.warn('muteLocalAudioStream not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  muteAllRemoteAudioStreams(mute: boolean): CallApiReturnType {
    AgoraConsole.warn(
      'muteAllRemoteAudioStreams not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setDefaultMuteAllRemoteAudioStreams(mute: boolean): CallApiReturnType {
    AgoraConsole.warn(
      'setDefaultMuteAllRemoteAudioStreams not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  muteRemoteAudioStream(uid: number, mute: boolean): CallApiReturnType {
    AgoraConsole.warn('muteRemoteAudioStream not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  muteLocalVideoStream(mute: boolean): CallApiReturnType {
    AgoraConsole.warn('muteLocalVideoStream not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  enableLocalVideo(enabled: boolean): CallApiReturnType {
    AgoraConsole.warn('enableLocalVideo not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  muteAllRemoteVideoStreams(mute: boolean): CallApiReturnType {
    AgoraConsole.warn(
      'muteAllRemoteVideoStreams not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setDefaultMuteAllRemoteVideoStreams(mute: boolean): CallApiReturnType {
    AgoraConsole.warn(
      'setDefaultMuteAllRemoteVideoStreams not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  muteRemoteVideoStream(uid: number, mute: boolean): CallApiReturnType {
    AgoraConsole.warn('muteRemoteVideoStream not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setRemoteVideoStreamType(
    uid: number,
    streamType: NATIVE_RTC.VIDEO_STREAM_TYPE
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setRemoteVideoStreamType not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setRemoteVideoSubscriptionOptions(
    uid: number,
    options: NATIVE_RTC.VideoSubscriptionOptions
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setRemoteVideoSubscriptionOptions not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setRemoteDefaultVideoStreamType(
    streamType: NATIVE_RTC.VIDEO_STREAM_TYPE
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setRemoteDefaultVideoStreamType not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setSubscribeAudioBlocklist(
    uidList: number,
    uidNumber: number
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setSubscribeAudioBlocklist not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setSubscribeAudioAllowlist(
    uidList: number,
    uidNumber: number
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setSubscribeAudioAllowlist not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setSubscribeVideoBlocklist(
    uidList: number,
    uidNumber: number
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setSubscribeVideoBlocklist not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setSubscribeVideoAllowlist(
    uidList: number,
    uidNumber: number
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setSubscribeVideoAllowlist not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  enableAudioVolumeIndication(
    interval: number,
    smooth: number,
    reportVad: boolean
  ): CallApiReturnType {
    AgoraConsole.warn(
      'enableAudioVolumeIndication not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  startAudioRecording(
    filePath: string,
    quality: NATIVE_RTC.AUDIO_RECORDING_QUALITY_TYPE
  ): CallApiReturnType {
    AgoraConsole.warn('startAudioRecording not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  startAudioRecording2(
    filePath: string,
    sampleRate: number,
    quality: NATIVE_RTC.AUDIO_RECORDING_QUALITY_TYPE
  ): CallApiReturnType {
    AgoraConsole.warn('startAudioRecording2 not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  startAudioRecording3(
    config: NATIVE_RTC.AudioRecordingConfiguration
  ): CallApiReturnType {
    AgoraConsole.warn('startAudioRecording3 not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  registerAudioEncodedFrameObserver(
    config: NATIVE_RTC.AudioEncodedFrameObserverConfig,
    observer: NATIVE_RTC.IAudioEncodedFrameObserver
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioEncodedFrameObserver not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  stopAudioRecording(): CallApiReturnType {
    AgoraConsole.warn('stopAudioRecording not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  createMediaPlayer(): CallApiReturnType {
    AgoraConsole.warn('createMediaPlayer not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  destroyMediaPlayer(media_player: NATIVE_RTC.IMediaPlayer): CallApiReturnType {
    AgoraConsole.warn('destroyMediaPlayer not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  createMediaRecorder(info: NATIVE_RTC.RecorderStreamInfo): CallApiReturnType {
    AgoraConsole.warn('createMediaRecorder not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  destroyMediaRecorder(
    mediaRecorder: NATIVE_RTC.IMediaRecorder
  ): CallApiReturnType {
    AgoraConsole.warn('destroyMediaRecorder not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  startAudioMixing(
    filePath: string,
    loopback: boolean,
    cycle: number
  ): CallApiReturnType {
    AgoraConsole.warn('startAudioMixing not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  startAudioMixing2(
    filePath: string,
    loopback: boolean,
    cycle: number,
    startPos: number
  ): CallApiReturnType {
    AgoraConsole.warn('startAudioMixing2 not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  stopAudioMixing(): CallApiReturnType {
    AgoraConsole.warn('stopAudioMixing not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  pauseAudioMixing(): CallApiReturnType {
    AgoraConsole.warn('pauseAudioMixing not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  resumeAudioMixing(): CallApiReturnType {
    AgoraConsole.warn('resumeAudioMixing not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  selectAudioTrack(index: number): CallApiReturnType {
    AgoraConsole.warn('selectAudioTrack not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getAudioTrackCount(): CallApiReturnType {
    AgoraConsole.warn('getAudioTrackCount not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  adjustAudioMixingVolume(volume: number): CallApiReturnType {
    AgoraConsole.warn(
      'adjustAudioMixingVolume not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  adjustAudioMixingPublishVolume(volume: number): CallApiReturnType {
    AgoraConsole.warn(
      'adjustAudioMixingPublishVolume not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getAudioMixingPublishVolume(): CallApiReturnType {
    AgoraConsole.warn(
      'getAudioMixingPublishVolume not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  adjustAudioMixingPlayoutVolume(volume: number): CallApiReturnType {
    AgoraConsole.warn(
      'adjustAudioMixingPlayoutVolume not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getAudioMixingPlayoutVolume(): CallApiReturnType {
    AgoraConsole.warn(
      'getAudioMixingPlayoutVolume not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getAudioMixingDuration(): CallApiReturnType {
    AgoraConsole.warn('getAudioMixingDuration not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getAudioMixingCurrentPosition(): CallApiReturnType {
    AgoraConsole.warn(
      'getAudioMixingCurrentPosition not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setAudioMixingPosition(pos: number): CallApiReturnType {
    AgoraConsole.warn('setAudioMixingPosition not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setAudioMixingDualMonoMode(
    mode: NATIVE_RTC.AUDIO_MIXING_DUAL_MONO_MODE
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setAudioMixingDualMonoMode not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setAudioMixingPitch(pitch: number): CallApiReturnType {
    AgoraConsole.warn('setAudioMixingPitch not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getEffectsVolume(): CallApiReturnType {
    AgoraConsole.warn('getEffectsVolume not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setEffectsVolume(volume: number): CallApiReturnType {
    AgoraConsole.warn('setEffectsVolume not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  preloadEffect(
    soundId: number,
    filePath: string,
    startPos: number
  ): CallApiReturnType {
    AgoraConsole.warn('preloadEffect not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  playEffect(
    soundId: number,
    filePath: string,
    loopCount: number,
    pitch: number,
    pan: number,
    gain: number,
    publish: boolean,
    startPos: number
  ): CallApiReturnType {
    AgoraConsole.warn('playEffect not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  playAllEffects(
    loopCount: number,
    pitch: number,
    pan: number,
    gain: number,
    publish: boolean
  ): CallApiReturnType {
    AgoraConsole.warn('playAllEffects not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getVolumeOfEffect(soundId: number): CallApiReturnType {
    AgoraConsole.warn('getVolumeOfEffect not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setVolumeOfEffect(soundId: number, volume: number): CallApiReturnType {
    AgoraConsole.warn('setVolumeOfEffect not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  pauseEffect(soundId: number): CallApiReturnType {
    AgoraConsole.warn('pauseEffect not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  pauseAllEffects(): CallApiReturnType {
    AgoraConsole.warn('pauseAllEffects not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  resumeEffect(soundId: number): CallApiReturnType {
    AgoraConsole.warn('resumeEffect not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  resumeAllEffects(): CallApiReturnType {
    AgoraConsole.warn('resumeAllEffects not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  stopEffect(soundId: number): CallApiReturnType {
    AgoraConsole.warn('stopEffect not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  stopAllEffects(): CallApiReturnType {
    AgoraConsole.warn('stopAllEffects not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  unloadEffect(soundId: number): CallApiReturnType {
    AgoraConsole.warn('unloadEffect not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  unloadAllEffects(): CallApiReturnType {
    AgoraConsole.warn('unloadAllEffects not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getEffectDuration(filePath: string): CallApiReturnType {
    AgoraConsole.warn('getEffectDuration not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setEffectPosition(soundId: number, pos: number): CallApiReturnType {
    AgoraConsole.warn('setEffectPosition not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getEffectCurrentPosition(soundId: number): CallApiReturnType {
    AgoraConsole.warn(
      'getEffectCurrentPosition not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  enableSoundPositionIndication(enabled: boolean): CallApiReturnType {
    AgoraConsole.warn(
      'enableSoundPositionIndication not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setRemoteVoicePosition(
    uid: number,
    pan: number,
    gain: number
  ): CallApiReturnType {
    AgoraConsole.warn('setRemoteVoicePosition not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  enableSpatialAudio(enabled: boolean): CallApiReturnType {
    AgoraConsole.warn('enableSpatialAudio not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setRemoteUserSpatialAudioParams(
    uid: number,
    params: NATIVE_RTC.SpatialAudioParams
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setRemoteUserSpatialAudioParams not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setVoiceBeautifierPreset(
    preset: NATIVE_RTC.VOICE_BEAUTIFIER_PRESET
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setVoiceBeautifierPreset not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setAudioEffectPreset(
    preset: NATIVE_RTC.AUDIO_EFFECT_PRESET
  ): CallApiReturnType {
    AgoraConsole.warn('setAudioEffectPreset not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setVoiceConversionPreset(
    preset: NATIVE_RTC.VOICE_CONVERSION_PRESET
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setVoiceConversionPreset not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setAudioEffectParameters(
    preset: NATIVE_RTC.AUDIO_EFFECT_PRESET,
    param1: number,
    param2: number
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setAudioEffectParameters not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setVoiceBeautifierParameters(
    preset: NATIVE_RTC.VOICE_BEAUTIFIER_PRESET,
    param1: number,
    param2: number
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setVoiceBeautifierParameters not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setVoiceConversionParameters(
    preset: NATIVE_RTC.VOICE_CONVERSION_PRESET,
    param1: number,
    param2: number
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setVoiceConversionParameters not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setLocalVoicePitch(pitch: number): CallApiReturnType {
    AgoraConsole.warn('setLocalVoicePitch not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setLocalVoiceFormant(formantRatio: number): CallApiReturnType {
    AgoraConsole.warn('setLocalVoiceFormant not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setLocalVoiceEqualization(
    bandFrequency: NATIVE_RTC.AUDIO_EQUALIZATION_BAND_FREQUENCY,
    bandGain: number
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setLocalVoiceEqualization not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setLocalVoiceReverb(
    reverbKey: NATIVE_RTC.AUDIO_REVERB_TYPE,
    value: number
  ): CallApiReturnType {
    AgoraConsole.warn('setLocalVoiceReverb not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setHeadphoneEQPreset(
    preset: NATIVE_RTC.HEADPHONE_EQUALIZER_PRESET
  ): CallApiReturnType {
    AgoraConsole.warn('setHeadphoneEQPreset not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setHeadphoneEQParameters(
    lowGain: number,
    highGain: number
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setHeadphoneEQParameters not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setLogFile(filePath: string): CallApiReturnType {
    AgoraConsole.warn('setLogFile not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setLogFilter(filter: number): CallApiReturnType {
    AgoraConsole.warn('setLogFilter not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setLogLevel(level: NATIVE_RTC.LOG_LEVEL): CallApiReturnType {
    let processFunc = async (): Promise<CallIrisApiResult> => {
      AgoraConsole.logLevel = level;
      let numberLevel: number = AgoraTranslate.NATIVE_RTCLOG_LEVEL2Number(
        level
      );
      AgoraRTC.setLogLevel(numberLevel);
      return CallIrisApiResult.success();
    };

    return this.execute(processFunc);
  }
  setLogFileSize(fileSizeInKBytes: number): CallApiReturnType {
    AgoraConsole.warn('setLogFileSize not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  uploadLogFile(requestId: string): CallApiReturnType {
    AgoraConsole.warn('uploadLogFile not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setLocalRenderMode(
    renderMode: NATIVE_RTC.RENDER_MODE_TYPE,
    mirrorMode: NATIVE_RTC.VIDEO_MIRROR_MODE_TYPE
  ): CallApiReturnType {
    AgoraConsole.warn('setLocalRenderMode not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setRemoteRenderMode(
    uid: number,
    renderMode: NATIVE_RTC.RENDER_MODE_TYPE,
    mirrorMode: NATIVE_RTC.VIDEO_MIRROR_MODE_TYPE
  ): CallApiReturnType {
    AgoraConsole.warn('setRemoteRenderMode not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setLocalRenderMode2(
    renderMode: NATIVE_RTC.RENDER_MODE_TYPE
  ): CallApiReturnType {
    AgoraConsole.warn('setLocalRenderMode2 not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setLocalVideoMirrorMode(
    mirrorMode: NATIVE_RTC.VIDEO_MIRROR_MODE_TYPE
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setLocalVideoMirrorMode not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  enableDualStreamMode(enabled: boolean): CallApiReturnType {
    AgoraConsole.warn('enableDualStreamMode not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  enableDualStreamMode2(
    enabled: boolean,
    streamConfig: NATIVE_RTC.SimulcastStreamConfig
  ): CallApiReturnType {
    AgoraConsole.warn('enableDualStreamMode2 not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setDualStreamMode(mode: NATIVE_RTC.SIMULCAST_STREAM_MODE): CallApiReturnType {
    AgoraConsole.warn('setDualStreamMode not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setDualStreamMode2(
    mode: NATIVE_RTC.SIMULCAST_STREAM_MODE,
    streamConfig: NATIVE_RTC.SimulcastStreamConfig
  ): CallApiReturnType {
    AgoraConsole.warn('setDualStreamMode2 not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  enableCustomAudioLocalPlayback(
    trackId: number,
    enabled: boolean
  ): CallApiReturnType {
    AgoraConsole.warn(
      'enableCustomAudioLocalPlayback not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
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
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
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
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setMixedAudioFrameParameters(
    sampleRate: number,
    channel: number,
    samplesPerCall: number
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setMixedAudioFrameParameters not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
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
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setPlaybackAudioFrameBeforeMixingParameters(
    sampleRate: number,
    channel: number
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setPlaybackAudioFrameBeforeMixingParameters not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  enableAudioSpectrumMonitor(intervalInMS: number): CallApiReturnType {
    AgoraConsole.warn(
      'enableAudioSpectrumMonitor not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  disableAudioSpectrumMonitor(): CallApiReturnType {
    AgoraConsole.warn(
      'disableAudioSpectrumMonitor not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  registerAudioSpectrumObserver(
    observer: NATIVE_RTC.IAudioSpectrumObserver
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioSpectrumObserver not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  unregisterAudioSpectrumObserver(
    observer: NATIVE_RTC.IAudioSpectrumObserver
  ): CallApiReturnType {
    AgoraConsole.warn(
      'unregisterAudioSpectrumObserver not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  adjustRecordingSignalVolume(volume: number): CallApiReturnType {
    AgoraConsole.warn(
      'adjustRecordingSignalVolume not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  muteRecordingSignal(mute: boolean): CallApiReturnType {
    AgoraConsole.warn('muteRecordingSignal not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  adjustPlaybackSignalVolume(volume: number): CallApiReturnType {
    AgoraConsole.warn(
      'adjustPlaybackSignalVolume not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  adjustUserPlaybackSignalVolume(
    uid: number,
    volume: number
  ): CallApiReturnType {
    AgoraConsole.warn(
      'adjustUserPlaybackSignalVolume not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setLocalPublishFallbackOption(
    option: NATIVE_RTC.STREAM_FALLBACK_OPTIONS
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setLocalPublishFallbackOption not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setRemoteSubscribeFallbackOption(
    option: NATIVE_RTC.STREAM_FALLBACK_OPTIONS
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setRemoteSubscribeFallbackOption not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setHighPriorityUserList(
    uidList: number,
    uidNum: number,
    option: NATIVE_RTC.STREAM_FALLBACK_OPTIONS
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setHighPriorityUserList not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  enableLoopbackRecording(
    enabled: boolean,
    deviceName: string
  ): CallApiReturnType {
    AgoraConsole.warn(
      'enableLoopbackRecording not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  adjustLoopbackSignalVolume(volume: number): CallApiReturnType {
    AgoraConsole.warn(
      'adjustLoopbackSignalVolume not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getLoopbackRecordingVolume(): CallApiReturnType {
    AgoraConsole.warn(
      'getLoopbackRecordingVolume not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  enableInEarMonitoring(
    enabled: boolean,
    includeAudioFilters: number
  ): CallApiReturnType {
    AgoraConsole.warn('enableInEarMonitoring not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setInEarMonitoringVolume(volume: number): CallApiReturnType {
    AgoraConsole.warn(
      'setInEarMonitoringVolume not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  loadExtensionProvider(
    path: string,
    unload_after_use: boolean
  ): CallApiReturnType {
    AgoraConsole.warn('loadExtensionProvider not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setExtensionProviderProperty(
    provider: string,
    key: string,
    value: string
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setExtensionProviderProperty not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  registerExtension(
    provider: string,
    extension: string,
    type: NATIVE_RTC.MEDIA_SOURCE_TYPE
  ): CallApiReturnType {
    AgoraConsole.warn('registerExtension not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  enableExtension(
    provider: string,
    extension: string,
    enable: boolean,
    type: NATIVE_RTC.MEDIA_SOURCE_TYPE
  ): CallApiReturnType {
    AgoraConsole.warn('enableExtension not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  enableExtension2(
    provider: string,
    extension: string,
    extensionInfo: NATIVE_RTC.ExtensionInfo,
    enable: boolean
  ): CallApiReturnType {
    AgoraConsole.warn('enableExtension2 not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setExtensionProperty(
    provider: string,
    extension: string,
    key: string,
    value: string,
    type: NATIVE_RTC.MEDIA_SOURCE_TYPE
  ): CallApiReturnType {
    AgoraConsole.warn('setExtensionProperty not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
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
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setExtensionProperty2(
    provider: string,
    extension: string,
    extensionInfo: NATIVE_RTC.ExtensionInfo,
    key: string,
    value: string
  ): CallApiReturnType {
    AgoraConsole.warn('setExtensionProperty2 not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
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
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setCameraCapturerConfiguration(
    config: NATIVE_RTC.CameraCapturerConfiguration
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setCameraCapturerConfiguration not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  createCustomVideoTrack(): CallApiReturnType {
    AgoraConsole.warn('createCustomVideoTrack not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  createCustomEncodedVideoTrack(
    sender_option: NATIVE_RTC.SenderOptions
  ): CallApiReturnType {
    AgoraConsole.warn(
      'createCustomEncodedVideoTrack not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  destroyCustomVideoTrack(video_track_id: number): CallApiReturnType {
    AgoraConsole.warn(
      'destroyCustomVideoTrack not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  destroyCustomEncodedVideoTrack(video_track_id: number): CallApiReturnType {
    AgoraConsole.warn(
      'destroyCustomEncodedVideoTrack not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  switchCamera(): CallApiReturnType {
    AgoraConsole.warn('isCameraZoomSupported not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    // let process = async ():Promise<CallIrisApiResult> => {
    //   let trackPack = this._engine.entitiesContainer.getLocalVideoTrackByType(
    //     IrisVideoSourceType.kVideoSourceTypeCameraPrimary
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
    // return this.execute(process);
  }
  isCameraZoomSupported(): CallApiReturnType {
    AgoraConsole.warn('isCameraZoomSupported not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  isCameraFaceDetectSupported(): CallApiReturnType {
    AgoraConsole.warn(
      'isCameraFaceDetectSupported not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  isCameraTorchSupported(): CallApiReturnType {
    AgoraConsole.warn('isCameraTorchSupported not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  isCameraFocusSupported(): CallApiReturnType {
    AgoraConsole.warn('isCameraFocusSupported not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  isCameraAutoFocusFaceModeSupported(): CallApiReturnType {
    AgoraConsole.warn(
      'isCameraAutoFocusFaceModeSupported not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setCameraZoomFactor(factor: number): CallApiReturnType {
    AgoraConsole.warn('setCameraZoomFactor not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  enableFaceDetection(enabled: boolean): CallApiReturnType {
    AgoraConsole.warn('enableFaceDetection not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getCameraMaxZoomFactor(): CallApiReturnType {
    AgoraConsole.warn('getCameraMaxZoomFactor not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setCameraFocusPositionInPreview(
    positionX: number,
    positionY: number
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setCameraFocusPositionInPreview not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setCameraTorchOn(isOn: boolean): CallApiReturnType {
    AgoraConsole.warn('setCameraTorchOn not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setCameraAutoFocusFaceModeEnabled(enabled: boolean): CallApiReturnType {
    AgoraConsole.warn(
      'setCameraAutoFocusFaceModeEnabled not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  isCameraExposurePositionSupported(): CallApiReturnType {
    AgoraConsole.warn(
      'isCameraExposurePositionSupported not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setCameraExposurePosition(
    positionXinView: number,
    positionYinView: number
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setCameraExposurePosition not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  isCameraExposureSupported(): CallApiReturnType {
    AgoraConsole.warn(
      'isCameraExposureSupported not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setCameraExposureFactor(factor: number): CallApiReturnType {
    AgoraConsole.warn(
      'setCameraExposureFactor not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  isCameraAutoExposureFaceModeSupported(): CallApiReturnType {
    AgoraConsole.warn(
      'isCameraAutoExposureFaceModeSupported not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setCameraAutoExposureFaceModeEnabled(enabled: boolean): CallApiReturnType {
    AgoraConsole.warn(
      'setCameraAutoExposureFaceModeEnabled not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setDefaultAudioRouteToSpeakerphone(
    defaultToSpeaker: boolean
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setDefaultAudioRouteToSpeakerphone not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setEnableSpeakerphone(speakerOn: boolean): CallApiReturnType {
    AgoraConsole.warn('setEnableSpeakerphone not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  isSpeakerphoneEnabled(): CallApiReturnType {
    AgoraConsole.warn('isSpeakerphoneEnabled not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setRouteInCommunicationMode(route: number): CallApiReturnType {
    AgoraConsole.warn(
      'setRouteInCommunicationMode not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getScreenCaptureSources(
    thumbSize: NATIVE_RTC.SIZE,
    iconSize: NATIVE_RTC.SIZE,
    includeScreen: boolean
  ): CallApiReturnType {
    AgoraConsole.warn(
      'getScreenCaptureSources not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setAudioSessionOperationRestriction(
    restriction: NATIVE_RTC.AUDIO_SESSION_OPERATION_RESTRICTION
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setAudioSessionOperationRestriction not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  startScreenCaptureByDisplayId(
    displayId: number,
    regionRect: NATIVE_RTC.Rectangle,
    captureParams: NATIVE_RTC.ScreenCaptureParameters
  ): CallApiReturnType {
    AgoraConsole.warn(
      'startScreenCaptureByDisplayId not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  startScreenCaptureByScreenRect(
    screenRect: NATIVE_RTC.Rectangle,
    regionRect: NATIVE_RTC.Rectangle,
    captureParams: NATIVE_RTC.ScreenCaptureParameters
  ): CallApiReturnType {
    AgoraConsole.warn(
      'startScreenCaptureByScreenRect not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getAudioDeviceInfo(deviceInfo: NATIVE_RTC.DeviceInfo): CallApiReturnType {
    AgoraConsole.warn('getAudioDeviceInfo not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  startScreenCaptureByWindowId(
    windowId: number,
    regionRect: NATIVE_RTC.Rectangle,
    captureParams: NATIVE_RTC.ScreenCaptureParameters
  ): CallApiReturnType {
    AgoraConsole.warn(
      'startScreenCaptureByWindowId not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setScreenCaptureContentHint(
    contentHint: NATIVE_RTC.VIDEO_CONTENT_HINT
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setScreenCaptureContentHint not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  updateScreenCaptureRegion(
    regionRect: NATIVE_RTC.Rectangle
  ): CallApiReturnType {
    AgoraConsole.warn(
      'updateScreenCaptureRegion not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  updateScreenCaptureParameters(
    captureParams: NATIVE_RTC.ScreenCaptureParameters
  ): CallApiReturnType {
    AgoraConsole.warn(
      'updateScreenCaptureParameters not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  startScreenCapture(
    captureParams: NATIVE_RTC.ScreenCaptureParameters2
  ): CallApiReturnType {
    let processFunc = async (): Promise<CallIrisApiResult> => {
      //todo
      return CallIrisApiResult.success();
    };

    return this.execute(processFunc);
  }
  updateScreenCapture(
    captureParams: NATIVE_RTC.ScreenCaptureParameters2
  ): CallApiReturnType {
    AgoraConsole.warn('updateScreenCapture not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  queryScreenCaptureCapability(): CallApiReturnType {
    AgoraConsole.warn(
      'queryScreenCaptureCapability not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setScreenCaptureScenario(
    screenScenario: NATIVE_RTC.SCREEN_SCENARIO_TYPE
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setScreenCaptureScenario not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  stopScreenCapture(): CallApiReturnType {
    let processFunc = async (): Promise<CallIrisApiResult> => {
      //todo
      return CallIrisApiResult.success();
    };

    return this.execute(processFunc);
  }
  getCallId(callId: string): CallApiReturnType {
    AgoraConsole.warn('getCallId not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  rate(callId: string, rating: number, description: string): CallApiReturnType {
    AgoraConsole.warn('rate not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  complain(callId: string, description: string): CallApiReturnType {
    AgoraConsole.warn('complain not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  startRtmpStreamWithoutTranscoding(url: string): CallApiReturnType {
    AgoraConsole.warn(
      'startRtmpStreamWithoutTranscoding not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  startRtmpStreamWithTranscoding(
    url: string,
    transcoding: NATIVE_RTC.LiveTranscoding
  ): CallApiReturnType {
    AgoraConsole.warn(
      'startRtmpStreamWithTranscoding not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  updateRtmpTranscoding(
    transcoding: NATIVE_RTC.LiveTranscoding
  ): CallApiReturnType {
    AgoraConsole.warn('updateRtmpTranscoding not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  stopRtmpStream(url: string): CallApiReturnType {
    AgoraConsole.warn('stopRtmpStream not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  startLocalVideoTranscoder(
    config: NATIVE_RTC.LocalTranscoderConfiguration
  ): CallApiReturnType {
    AgoraConsole.warn(
      'startLocalVideoTranscoder not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  updateLocalTranscoderConfiguration(
    config: NATIVE_RTC.LocalTranscoderConfiguration
  ): CallApiReturnType {
    AgoraConsole.warn(
      'updateLocalTranscoderConfiguration not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  stopLocalVideoTranscoder(): CallApiReturnType {
    AgoraConsole.warn(
      'stopLocalVideoTranscoder not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  startCameraCapture(
    sourceType: NATIVE_RTC.VIDEO_SOURCE_TYPE,
    config: NATIVE_RTC.CameraCapturerConfiguration
  ): CallApiReturnType {
    AgoraConsole.warn('startCameraCapture not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  stopCameraCapture(
    sourceType: NATIVE_RTC.VIDEO_SOURCE_TYPE
  ): CallApiReturnType {
    AgoraConsole.warn('stopCameraCapture not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setCameraDeviceOrientation(
    type: NATIVE_RTC.VIDEO_SOURCE_TYPE,
    orientation: NATIVE_RTC.VIDEO_ORIENTATION
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setCameraDeviceOrientation not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setScreenCaptureOrientation(
    type: NATIVE_RTC.VIDEO_SOURCE_TYPE,
    orientation: NATIVE_RTC.VIDEO_ORIENTATION
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setScreenCaptureOrientation not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  startScreenCapture2(
    sourceType: NATIVE_RTC.VIDEO_SOURCE_TYPE,
    config: NATIVE_RTC.ScreenCaptureConfiguration
  ): CallApiReturnType {
    let processFunc = async (): Promise<CallIrisApiResult> => {
      //todo
      return CallIrisApiResult.success();
    };

    return this.execute(processFunc);
  }
  stopScreenCapture2(
    sourceType: NATIVE_RTC.VIDEO_SOURCE_TYPE
  ): CallApiReturnType {
    AgoraConsole.warn('stopScreenCapture2 not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getConnectionState(): CallApiReturnType {
    AgoraConsole.warn('getConnectionState not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  registerEventHandler(eventHandler: any): CallApiReturnType {
    let processFunc = async (): Promise<CallIrisApiResult> => {
      console.log('RtcEngineImpl registerEventHandler');

      this._engine.irisEventHandlerManager.addEventHandler(
        RTCENGINE_KEY,
        eventHandler
      );
      return Promise.resolve(CallIrisApiResult.success());
    };

    return this.execute(processFunc);
  }
  unregisterEventHandler(eventHandler: any): CallApiReturnType {
    let processFunc = async (): Promise<CallIrisApiResult> => {
      console.log('unregisterEventHandler registerEventHandler');

      this._engine.irisEventHandlerManager.removeEventHandler(
        RTCENGINE_KEY,
        eventHandler
      );

      return Promise.resolve(CallIrisApiResult.success());
    };

    return this.execute(processFunc);
  }
  setRemoteUserPriority(
    uid: number,
    userPriority: NATIVE_RTC.PRIORITY_TYPE
  ): CallApiReturnType {
    AgoraConsole.warn('setRemoteUserPriority not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setEncryptionMode(encryptionMode: string): CallApiReturnType {
    AgoraConsole.warn('setEncryptionMode not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setEncryptionSecret(secret: string): CallApiReturnType {
    AgoraConsole.warn('setEncryptionSecret not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  enableEncryption(
    enabled: boolean,
    config: NATIVE_RTC.EncryptionConfig
  ): CallApiReturnType {
    AgoraConsole.warn('enableEncryption not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  createDataStream(
    streamId: number[],
    reliable: boolean,
    ordered: boolean
  ): CallApiReturnType {
    AgoraConsole.warn('createDataStream not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  createDataStream2(
    streamId: number[],
    config: NATIVE_RTC.DataStreamConfig
  ): CallApiReturnType {
    AgoraConsole.warn('createDataStream2 not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  sendStreamMessage(
    streamId: number,
    data: string,
    length: number
  ): CallApiReturnType {
    AgoraConsole.warn('sendStreamMessage not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  addVideoWatermark(watermark: NATIVE_RTC.RtcImage): CallApiReturnType {
    AgoraConsole.warn('addVideoWatermark not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  addVideoWatermark2(
    watermarkUrl: string,
    options: NATIVE_RTC.WatermarkOptions
  ): CallApiReturnType {
    AgoraConsole.warn('addVideoWatermark2 not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  clearVideoWatermarks(): CallApiReturnType {
    AgoraConsole.warn('clearVideoWatermarks not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  pauseAudio(): CallApiReturnType {
    AgoraConsole.warn('pauseAudio not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  resumeAudio(): CallApiReturnType {
    AgoraConsole.warn('resumeAudio not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  enableWebSdkInteroperability(enabled: boolean): CallApiReturnType {
    AgoraConsole.warn(
      'enableWebSdkInteroperability not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
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
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  registerMediaMetadataObserver(
    observer: NATIVE_RTC.IMetadataObserver,
    type: NATIVE_RTC.METADATA_TYPE
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerMediaMetadataObserver not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  unregisterMediaMetadataObserver(
    observer: NATIVE_RTC.IMetadataObserver,
    type: NATIVE_RTC.METADATA_TYPE
  ): CallApiReturnType {
    AgoraConsole.warn(
      'unregisterMediaMetadataObserver not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
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
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  stopAudioFrameDump(
    channel_id: string,
    user_id: number,
    location: string
  ): CallApiReturnType {
    AgoraConsole.warn('stopAudioFrameDump not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setAINSMode(
    enabled: boolean,
    mode: NATIVE_RTC.AUDIO_AINS_MODE
  ): CallApiReturnType {
    AgoraConsole.warn('setAINSMode not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  registerLocalUserAccount(
    appId: string,
    userAccount: string
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerLocalUserAccount not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  joinChannelWithUserAccount(
    token: string,
    channelId: string,
    userAccount: string
  ): CallApiReturnType {
    AgoraConsole.warn(
      'joinChannelWithUserAccount not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
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
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
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
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getUserInfoByUserAccount(
    userAccount: string,
    userInfo: NATIVE_RTC.UserInfo[]
  ): CallApiReturnType {
    AgoraConsole.warn(
      'getUserInfoByUserAccount not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getUserInfoByUid(
    uid: number,
    userInfo: NATIVE_RTC.UserInfo[]
  ): CallApiReturnType {
    AgoraConsole.warn('getUserInfoByUid not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  startOrUpdateChannelMediaRelay(
    configuration: NATIVE_RTC.ChannelMediaRelayConfiguration
  ): CallApiReturnType {
    AgoraConsole.warn(
      'startOrUpdateChannelMediaRelay not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  startChannelMediaRelay(
    configuration: NATIVE_RTC.ChannelMediaRelayConfiguration
  ): CallApiReturnType {
    AgoraConsole.warn('startChannelMediaRelay not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  updateChannelMediaRelay(
    configuration: NATIVE_RTC.ChannelMediaRelayConfiguration
  ): CallApiReturnType {
    AgoraConsole.warn(
      'updateChannelMediaRelay not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  stopChannelMediaRelay(): CallApiReturnType {
    AgoraConsole.warn('stopChannelMediaRelay not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  pauseAllChannelMediaRelay(): CallApiReturnType {
    AgoraConsole.warn(
      'pauseAllChannelMediaRelay not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  resumeAllChannelMediaRelay(): CallApiReturnType {
    AgoraConsole.warn(
      'resumeAllChannelMediaRelay not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setDirectCdnStreamingAudioConfiguration(
    profile: NATIVE_RTC.AUDIO_PROFILE_TYPE
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setDirectCdnStreamingAudioConfiguration not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setDirectCdnStreamingVideoConfiguration(
    config: NATIVE_RTC.VideoEncoderConfiguration
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setDirectCdnStreamingVideoConfiguration not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  startDirectCdnStreaming(
    eventHandler: NATIVE_RTC.IDirectCdnStreamingEventHandler,
    publishUrl: string,
    options: NATIVE_RTC.DirectCdnStreamingMediaOptions
  ): CallApiReturnType {
    AgoraConsole.warn(
      'startDirectCdnStreaming not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  stopDirectCdnStreaming(): CallApiReturnType {
    AgoraConsole.warn('stopDirectCdnStreaming not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  updateDirectCdnStreamingMediaOptions(
    options: NATIVE_RTC.DirectCdnStreamingMediaOptions
  ): CallApiReturnType {
    AgoraConsole.warn(
      'updateDirectCdnStreamingMediaOptions not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  startRhythmPlayer(
    sound1: string,
    sound2: string,
    config: NATIVE_RTC.AgoraRhythmPlayerConfig
  ): CallApiReturnType {
    AgoraConsole.warn('startRhythmPlayer not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  stopRhythmPlayer(): CallApiReturnType {
    AgoraConsole.warn('stopRhythmPlayer not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  configRhythmPlayer(
    config: NATIVE_RTC.AgoraRhythmPlayerConfig
  ): CallApiReturnType {
    AgoraConsole.warn('configRhythmPlayer not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  takeSnapshot(uid: number, filePath: string): CallApiReturnType {
    AgoraConsole.warn('takeSnapshot not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  enableContentInspect(
    enabled: boolean,
    config: NATIVE_RTC.ContentInspectConfig
  ): CallApiReturnType {
    AgoraConsole.warn('enableContentInspect not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  adjustCustomAudioPublishVolume(
    trackId: number,
    volume: number
  ): CallApiReturnType {
    AgoraConsole.warn(
      'adjustCustomAudioPublishVolume not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  adjustCustomAudioPlayoutVolume(
    trackId: number,
    volume: number
  ): CallApiReturnType {
    AgoraConsole.warn(
      'adjustCustomAudioPlayoutVolume not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setCloudProxy(proxyType: NATIVE_RTC.CLOUD_PROXY_TYPE): CallApiReturnType {
    AgoraConsole.warn('setCloudProxy not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setLocalAccessPoint(
    config: NATIVE_RTC.LocalAccessPointConfiguration
  ): CallApiReturnType {
    AgoraConsole.warn('setLocalAccessPoint not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setAdvancedAudioOptions(
    options: NATIVE_RTC.AdvancedAudioOptions,
    sourceType: number
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setAdvancedAudioOptions not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setAVSyncSource(channelId: string, uid: number): CallApiReturnType {
    AgoraConsole.warn('setAVSyncSource not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  enableVideoImageSource(
    enable: boolean,
    options: NATIVE_RTC.ImageTrackOptions
  ): CallApiReturnType {
    AgoraConsole.warn('enableVideoImageSource not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getCurrentMonotonicTimeInMs(): CallApiReturnType {
    AgoraConsole.warn(
      'getCurrentMonotonicTimeInMs not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  enableWirelessAccelerate(enabled: boolean): CallApiReturnType {
    AgoraConsole.warn(
      'enableWirelessAccelerate not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getNetworkType(): CallApiReturnType {
    AgoraConsole.warn('getNetworkType not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setParameters(parameters: string): CallApiReturnType {
    AgoraConsole.warn('setParameters not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  startMediaRenderingTracing(): CallApiReturnType {
    AgoraConsole.warn(
      'startMediaRenderingTracing not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  enableInstantMediaRendering(): CallApiReturnType {
    AgoraConsole.warn(
      'enableInstantMediaRendering not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getNtpWallTimeInMs(): CallApiReturnType {
    AgoraConsole.warn('getNtpWallTimeInMs not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
}

export class IVideoDeviceManagerImpl implements NATIVE_RTC.IVideoDeviceManager {
  private _engine: IrisRtcEngine;

  public constructor(engine: IrisRtcEngine) {
    this._engine = engine;
  }

  putAction(action: Action) {
    this._engine.actionQueue.putAction(action);
  }

  enumerateVideoDevices(): CallApiReturnType {
    AgoraConsole.warn('enumerateVideoDevices not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setDevice(deviceIdUTF8: string[]): CallApiReturnType {
    AgoraConsole.warn('setDevice not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getDevice(deviceIdUTF8: string): CallApiReturnType {
    AgoraConsole.warn('getDevice not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  numberOfCapabilities(deviceIdUTF8: string): CallApiReturnType {
    AgoraConsole.warn('numberOfCapabilities not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getCapability(
    deviceIdUTF8: string,
    deviceCapabilityNumber: number,
    capability: NATIVE_RTC.VideoFormat
  ): CallApiReturnType {
    AgoraConsole.warn('getCapability not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  startDeviceTest(hwnd: number): CallApiReturnType {
    AgoraConsole.warn('startDeviceTest not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  stopDeviceTest(): CallApiReturnType {
    AgoraConsole.warn('stopDeviceTest not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  release(): CallApiReturnType {
    AgoraConsole.warn('release not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
}
