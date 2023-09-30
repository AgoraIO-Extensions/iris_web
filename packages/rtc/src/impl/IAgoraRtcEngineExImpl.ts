import * as NATIVE_RTC from '@iris/native-rtc-binding';
import { ILocalAudioTrack, ILocalVideoTrack } from 'agora-rtc-sdk-ng';
import { CallApiReturnType, CallIrisApiResult } from 'iris-web-core';

import { IrisAudioSourceType } from '../base/BaseType';
import { IrisClient, IrisClientType } from '../engine/IrisClient';
import { AudioTrackPackage } from '../engine/IrisClientManager';
import { NotifyType } from '../engine/IrisClientObserver';

import { IrisRtcEngine } from '../engine/IrisRtcEngine';

import { IrisTrackEventHandler } from '../event_handler/IrisTrackEventHandler';
import { ClientHelper } from '../helper/ClientHelper';

import { AgoraConsole } from '../util/AgoraConsole';

export class IRtcEngineExImpl implements NATIVE_RTC.IRtcEngineEx {
  private _engine: IrisRtcEngine;

  public constructor(engine: IrisRtcEngine) {
    this._engine = engine;
  }

  enableContentInspectEx(
    enabled: boolean,
    config: NATIVE_RTC.ContentInspectConfig,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn('enableContentInspectEx not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }

  joinChannelEx(
    token: string,
    connection: NATIVE_RTC.RtcConnection,
    options: NATIVE_RTC.ChannelMediaOptions
  ): CallApiReturnType {
    let processJoinChannel = async (): Promise<CallIrisApiResult> => {
      let irisClient = new IrisClient(
        this._engine,
        IrisClientType.SUB,
        connection
      );
      irisClient.createClient(options);
      irisClient.irisClientVariables.token = token;
      let agoraRTCClient = irisClient.agoraRTCClient;

      try {
        await agoraRTCClient.join(
          this._engine.globalVariables.rtcEngineContext.appId,
          connection.channelId,
          token ? token : null,
          connection.localUid
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

      await this._engine.irisClientManager.irisClientObserver.notify(
        NotifyType.START_TRACK,
        [
          ...this._engine.irisClientManager.localAudioTrackPackages,
          ...this._engine.irisClientManager.localVideoTrackPackages,
        ],
        [irisClient]
      );

      this._engine.rtcEngineEventHandler.onJoinChannelSuccessEx(connection, 0);
      return this._engine.returnResult();
    };
    return this._engine.execute(processJoinChannel);
  }
  leaveChannelEx(connection: NATIVE_RTC.RtcConnection): CallApiReturnType {
    let processFunc = async (): Promise<CallIrisApiResult> => {
      if (this._engine.irisClientManager.irisClientList.length === 0) {
        return this._engine.returnResult();
      }

      let irisClient = this._engine.irisClientManager.getIrisClient(connection);

      await this._engine.irisClientManager.irisClientObserver.notify(
        NotifyType.STOP_TRACK,
        [
          ...this._engine.irisClientManager.localAudioTrackPackages,
          ...this._engine.irisClientManager.localVideoTrackPackages,
        ]
      );

      let agoraRTCClient = irisClient?.agoraRTCClient;
      if (agoraRTCClient) {
        try {
          await agoraRTCClient.leave();
        } catch (e) {
          AgoraConsole.error(e);
          this._engine.returnResult(false);
          this._engine.rtcEngineEventHandler.onError(
            NATIVE_RTC.ERROR_CODE_TYPE.ERR_LEAVE_CHANNEL_REJECTED,
            ''
          );
        }
        this._engine.rtcEngineEventHandler.onLeaveChannelEx(
          connection,
          new NATIVE_RTC.RtcStats()
        );
        console.log(this._engine.irisClientManager.irisClientList, 888);
        irisClient.release();
        console.log(this._engine.irisClientManager.irisClientList.length, 999);
      }

      return this._engine.returnResult();
    };
    return this._engine.execute(processFunc);
  }
  leaveChannelEx2(
    connection: NATIVE_RTC.RtcConnection,
    options: NATIVE_RTC.LeaveChannelOptions
  ): CallApiReturnType {
    AgoraConsole.warn('leaveChannelEx2 not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  updateChannelMediaOptionsEx(
    options: NATIVE_RTC.ChannelMediaOptions,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    let processInSequence = async () => {
      let irisClientManager = this._engine.irisClientManager;
      let irisClient = irisClientManager.getIrisClient(connection);
      irisClient.irisClientVariables.mergeChannelMediaOptions(options);

      let agoraRTCClient = irisClient?.agoraRTCClient;
      if (!agoraRTCClient) {
        return this._engine.returnResult(
          false,
          -NATIVE_RTC.ERROR_CODE_TYPE.ERR_FAILED
        );
      }

      //必须先依次 unpublish, 完毕之后，再依次去publish
      if (agoraRTCClient == null) {
        return this._engine.returnResult(false);
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

      if (!options.publishCameraTrack) {
        argsUnpublish.push([
          'publishCameraTrack',
          NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA_PRIMARY,
          'video',
        ]);
      } else if (options.publishCameraTrack) {
        argsPublish.push([
          'publishCameraTrack',
          NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA_PRIMARY,
          'video',
        ]);
      }

      if (!options.publishSecondaryCameraTrack) {
        argsUnpublish.push([
          'publishSecondaryCameraTrack',
          NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA_SECONDARY,
          'video',
        ]);
      } else if (options.publishSecondaryCameraTrack) {
        argsPublish.push([
          'publishSecondaryCameraTrack',
          NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA_SECONDARY,
          'video',
        ]);
      }

      if (!options.publishThirdCameraTrack) {
        argsUnpublish.push([
          'publishThirdCameraTrack',
          NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA_THIRD,
          'video',
        ]);
      } else if (options.publishThirdCameraTrack) {
        argsPublish.push([
          'publishThirdCameraTrack',
          NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA_THIRD,
          'video',
        ]);
      }

      if (!options.publishFourthCameraTrack) {
        argsUnpublish.push([
          'publishFourthCameraTrack',
          NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA_FOURTH,
          'video',
        ]);
      } else if (options.publishFourthCameraTrack) {
        argsPublish.push([
          'publishFourthCameraTrack',
          NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA_FOURTH,
          'video',
        ]);
      }

      if (!options.publishMicrophoneTrack) {
        argsUnpublish.push([
          'publishMicrophoneTrack',
          IrisAudioSourceType.kAudioSourceTypeMicrophonePrimary,
          'audio',
        ]);
      } else if (options.publishMicrophoneTrack) {
        argsPublish.push([
          'publishMicrophoneTrack',
          IrisAudioSourceType.kAudioSourceTypeMicrophonePrimary,
          'audio',
        ]);
      }

      if (!options.publishScreenCaptureVideo) {
        argsUnpublish.push([
          'publishScreenCaptureVideo',
          NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_SCREEN_PRIMARY,
          'audio',
        ]);
      } else if (options.publishScreenCaptureVideo) {
        argsPublish.push([
          'publishScreenCaptureVideo',
          NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_SCREEN_PRIMARY,
          'audio',
        ]);
      }

      if (!options.publishScreenCaptureAudio) {
        argsUnpublish.push([
          'publishScreenCaptureAudio',
          IrisAudioSourceType.kAudioSourceTypeScreenCapture,
          'audio',
        ]);
      } else if (options.publishScreenCaptureAudio) {
        argsPublish.push([
          'publishScreenCaptureAudio',
          IrisAudioSourceType.kAudioSourceTypeScreenCapture,
          'audio',
        ]);
      }

      if (!options.publishScreenTrack) {
        argsUnpublish.push([
          'publishScreenTrack',
          NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_SCREEN_PRIMARY,
          'video',
        ]);
      } else if (options.publishScreenTrack) {
        argsPublish.push([
          'publishScreenTrack',
          NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_SCREEN_PRIMARY,
          'video',
        ]);
      }

      if (!options.publishSecondaryScreenTrack) {
        argsUnpublish.push([
          'publishSecondaryScreenTrack',
          NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_SCREEN_SECONDARY,
          'video',
        ]);
      } else if (options.publishSecondaryScreenTrack) {
        argsPublish.push([
          'publishSecondaryScreenTrack',
          NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_SCREEN_SECONDARY,
          'video',
        ]);
      }

      if (!options.publishThirdScreenTrack) {
        argsUnpublish.push([
          'publishThirdScreenTrack',
          NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_SCREEN_THIRD,
          'video',
        ]);
      } else if (options.publishThirdScreenTrack) {
        argsPublish.push([
          'publishThirdScreenTrack',
          NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_SCREEN_THIRD,
          'video',
        ]);
      }

      if (!options.publishFourthScreenTrack) {
        argsUnpublish.push([
          'publishFourthScreenTrack',
          NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_SCREEN_FOURTH,
          'video',
        ]);
      } else if (options.publishFourthScreenTrack) {
        argsPublish.push([
          'publishFourthScreenTrack',
          NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_SCREEN_FOURTH,
          'video',
        ]);
      }

      if (!options.publishCustomAudioTrack) {
        argsUnpublish.push([
          'publishCustomAudioTrack',
          IrisAudioSourceType.kAudioSourceTypeCustom,
          'audio',
        ]);
      } else if (options.publishCustomAudioTrack) {
        argsPublish.push([
          'publishCustomAudioTrack',
          IrisAudioSourceType.kAudioSourceTypeCustom,
          'audio',
        ]);
      }

      if (!options.publishCustomVideoTrack) {
        argsUnpublish.push([
          'publishCustomVideoTrack',
          NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CUSTOM,
          'video',
        ]);
      } else if (options.publishCustomVideoTrack) {
        argsPublish.push([
          'publishCustomVideoTrack',
          NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CUSTOM,
          'video',
        ]);
      }

      if (!options.publishEncodedVideoTrack) {
        argsUnpublish.push([
          'publishEncodedVideoTrack',
          NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_UNKNOWN,
          'video',
        ]);
      } else if (options.publishEncodedVideoTrack) {
        argsPublish.push([
          'publishEncodedVideoTrack',
          NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_UNKNOWN,
          'video',
        ]);
      }

      if (!options.publishMediaPlayerAudioTrack) {
        argsUnpublish.push([
          'publishMediaPlayerAudioTrack',
          IrisAudioSourceType.kAudioSourceTypeUnknown,
          'audio',
        ]);
      } else if (options.publishMediaPlayerAudioTrack) {
        argsPublish.push([
          'publishMediaPlayerAudioTrack',
          IrisAudioSourceType.kAudioSourceTypeUnknown,
          'audio',
        ]);
      }

      if (!options.publishMediaPlayerVideoTrack) {
        argsUnpublish.push([
          'publishMediaPlayerVideoTrack',
          NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_MEDIA_PLAYER,
          'video',
        ]);
      } else if (options.publishMediaPlayerVideoTrack) {
        argsPublish.push([
          'publishMediaPlayerVideoTrack',
          NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_MEDIA_PLAYER,
          'video',
        ]);
      }

      if (!options.publishTranscodedVideoTrack) {
        argsUnpublish.push([
          'publishTranscodedVideoTrack',
          NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_TRANSCODED,
          'video',
        ]);
      } else if (options.publishTranscodedVideoTrack) {
        argsPublish.push([
          'publishTranscodedVideoTrack',
          NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_TRANSCODED,
          'video',
        ]);
      }

      for (let UnpublishArgs of argsUnpublish) {
        let optionName = UnpublishArgs[0];
        let audioOrVideoType = UnpublishArgs[1];
        let type = UnpublishArgs[2];

        if (type == 'audio') {
          //unpublish audio
          let audioPackage = irisClientManager.getLocalAudioTrack(
            audioOrVideoType as IrisAudioSourceType,
            connection
          );
          if (audioPackage) {
            let track = audioPackage.track as ILocalAudioTrack;
            if (agoraRTCClient.localTracks.indexOf(track) != -1) {
              try {
                await agoraRTCClient.unpublish(track);
                AgoraConsole.log(optionName + '(false) changed success');
                irisClient.removeTrackEventHandlerByTrack(track);
                irisClient.removeLocalAudioTrack(audioPackage);
              } catch (reason) {
                AgoraConsole.error(optionName + '(false) changed failed');
              }
            }
          }
        } else {
          //unpublish video
          let videoPackage = irisClientManager.getLocalVideoTrack(
            audioOrVideoType as NATIVE_RTC.VIDEO_SOURCE_TYPE,
            connection
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
          let audioPackage = irisClientManager.getLocalAudioTrack(
            audioOrVideoType as IrisAudioSourceType,
            connection
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
                irisClient.addLocalAudioTrack(
                  new AudioTrackPackage(
                    audioOrVideoType as IrisAudioSourceType,
                    track
                  )
                );
              } catch (reason) {
                AgoraConsole.error(optionName + '(true) changed failed');
              }
            }
          }
        } else {
          //publish video
          let videoPackage = irisClientManager.getLocalVideoTrack(
            audioOrVideoType as NATIVE_RTC.VIDEO_SOURCE_TYPE,
            connection
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
                irisClient.localVideoTrack.update(
                  audioOrVideoType as NATIVE_RTC.VIDEO_SOURCE_TYPE,
                  track
                );
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
        } catch (e) {
          return this._engine.returnResult(false);
        }
      }

      return this._engine.returnResult();
    };

    return this._engine.execute(processInSequence);
  }
  setVideoEncoderConfigurationEx(
    config: NATIVE_RTC.VideoEncoderConfiguration,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setVideoEncoderConfigurationEx not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setupRemoteVideoEx(
    canvas: NATIVE_RTC.VideoCanvas,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn('setupRemoteVideoEx not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  muteRemoteAudioStreamEx(
    uid: number,
    mute: boolean,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'muteRemoteAudioStreamEx not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  muteRemoteVideoStreamEx(
    uid: number,
    mute: boolean,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'muteRemoteVideoStreamEx not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setRemoteVideoStreamTypeEx(
    uid: number,
    streamType: NATIVE_RTC.VIDEO_STREAM_TYPE,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setRemoteVideoStreamTypeEx not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  muteLocalAudioStreamEx(
    mute: boolean,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn('muteLocalAudioStreamEx not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  muteLocalVideoStreamEx(
    mute: boolean,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn('muteLocalVideoStreamEx not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  muteAllRemoteAudioStreamsEx(
    mute: boolean,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'muteAllRemoteAudioStreamsEx not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  muteAllRemoteVideoStreamsEx(
    mute: boolean,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'muteAllRemoteVideoStreamsEx not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setSubscribeAudioBlocklistEx(
    uidList: number,
    uidNumber: number,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setSubscribeAudioBlocklistEx not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setSubscribeAudioAllowlistEx(
    uidList: number,
    uidNumber: number,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setSubscribeAudioAllowlistEx not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setSubscribeVideoBlocklistEx(
    uidList: number,
    uidNumber: number,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setSubscribeVideoBlocklistEx not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setSubscribeVideoAllowlistEx(
    uidList: number,
    uidNumber: number,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setSubscribeVideoAllowlistEx not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setRemoteVideoSubscriptionOptionsEx(
    uid: number,
    options: NATIVE_RTC.VideoSubscriptionOptions,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setRemoteVideoSubscriptionOptionsEx not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setRemoteVoicePositionEx(
    uid: number,
    pan: number,
    gain: number,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setRemoteVoicePositionEx not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setRemoteUserSpatialAudioParamsEx(
    uid: number,
    params: NATIVE_RTC.SpatialAudioParams,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setRemoteUserSpatialAudioParamsEx not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setRemoteRenderModeEx(
    uid: number,
    renderMode: NATIVE_RTC.RENDER_MODE_TYPE,
    mirrorMode: NATIVE_RTC.VIDEO_MIRROR_MODE_TYPE,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn('setRemoteRenderModeEx not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  enableLoopbackRecordingEx(
    connection: NATIVE_RTC.RtcConnection,
    enabled: boolean,
    deviceName: string
  ): CallApiReturnType {
    AgoraConsole.warn(
      'enableLoopbackRecordingEx not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  adjustRecordingSignalVolumeEx(
    volume: number,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'adjustRecordingSignalVolumeEx not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  muteRecordingSignalEx(
    mute: boolean,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn('muteRecordingSignalEx not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  adjustUserPlaybackSignalVolumeEx(
    uid: number,
    volume: number,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'adjustUserPlaybackSignalVolumeEx not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  getConnectionStateEx(
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn('getConnectionStateEx not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  enableEncryptionEx(
    connection: NATIVE_RTC.RtcConnection,
    enabled: boolean,
    config: NATIVE_RTC.EncryptionConfig
  ): CallApiReturnType {
    AgoraConsole.warn('enableEncryptionEx not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  createDataStreamEx(
    streamId: number[],
    reliable: boolean,
    ordered: boolean,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn('createDataStreamEx not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  createDataStreamEx2(
    streamId: number[],
    config: NATIVE_RTC.DataStreamConfig,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn('createDataStreamEx2 not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  sendStreamMessageEx(
    streamId: number,
    data: string,
    length: number,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn('sendStreamMessageEx not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  addVideoWatermarkEx(
    watermarkUrl: string,
    options: NATIVE_RTC.WatermarkOptions,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn('addVideoWatermarkEx not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  clearVideoWatermarkEx(
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn('clearVideoWatermarkEx not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  sendCustomReportMessageEx(
    id: string,
    category: string,
    event: string,
    label: string,
    value: number,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'sendCustomReportMessageEx not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  enableAudioVolumeIndicationEx(
    interval: number,
    smooth: number,
    reportVad: boolean,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'enableAudioVolumeIndicationEx not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  startRtmpStreamWithoutTranscodingEx(
    url: string,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'startRtmpStreamWithoutTranscodingEx not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  startRtmpStreamWithTranscodingEx(
    url: string,
    transcoding: NATIVE_RTC.LiveTranscoding,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'startRtmpStreamWithTranscodingEx not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  updateRtmpTranscodingEx(
    transcoding: NATIVE_RTC.LiveTranscoding,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'updateRtmpTranscodingEx not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  stopRtmpStreamEx(
    url: string,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn('stopRtmpStreamEx not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  startOrUpdateChannelMediaRelayEx(
    configuration: NATIVE_RTC.ChannelMediaRelayConfiguration,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'startOrUpdateChannelMediaRelayEx not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  startChannelMediaRelayEx(
    configuration: NATIVE_RTC.ChannelMediaRelayConfiguration,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'startChannelMediaRelayEx not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  updateChannelMediaRelayEx(
    configuration: NATIVE_RTC.ChannelMediaRelayConfiguration,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'updateChannelMediaRelayEx not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  stopChannelMediaRelayEx(
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'stopChannelMediaRelayEx not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  pauseAllChannelMediaRelayEx(
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'pauseAllChannelMediaRelayEx not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  resumeAllChannelMediaRelayEx(
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'resumeAllChannelMediaRelayEx not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  getUserInfoByUserAccountEx(
    userAccount: string,
    userInfo: NATIVE_RTC.UserInfo[],
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'getUserInfoByUserAccountEx not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  getUserInfoByUidEx(
    uid: number,
    userInfo: NATIVE_RTC.UserInfo[],
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn('getUserInfoByUidEx not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  enableDualStreamModeEx(
    enabled: boolean,
    streamConfig: NATIVE_RTC.SimulcastStreamConfig,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn('enableDualStreamModeEx not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setDualStreamModeEx(
    mode: NATIVE_RTC.SIMULCAST_STREAM_MODE,
    streamConfig: NATIVE_RTC.SimulcastStreamConfig,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn('setDualStreamModeEx not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setHighPriorityUserListEx(
    uidList: number,
    uidNum: number,
    option: NATIVE_RTC.STREAM_FALLBACK_OPTIONS,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setHighPriorityUserListEx not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  takeSnapshotEx(
    connection: NATIVE_RTC.RtcConnection,
    uid: number,
    filePath: string
  ): CallApiReturnType {
    AgoraConsole.warn('takeSnapshotEx not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  startMediaRenderingTracingEx(
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn(
      'startMediaRenderingTracingEx not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
}
