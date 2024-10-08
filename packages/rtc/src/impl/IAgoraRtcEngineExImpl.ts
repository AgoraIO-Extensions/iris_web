import * as NATIVE_RTC from '@iris/native-rtc';
import {
  ILocalAudioTrack,
  IMicrophoneAudioTrack,
  VideoPlayerConfig,
} from 'agora-rtc-sdk-ng';
import { CallApiReturnType, CallIrisApiResult } from 'iris-web-core';

import { IrisAudioSourceType } from '../base/BaseType';

import { defaultLeaveChannelOptions } from '../base/DefaultValue';
import { IrisClient } from '../engine/IrisClient';

import { AudioTrackPackage } from '../engine/IrisClientManager';
import { NotifyRemoteType, NotifyType } from '../engine/IrisClientObserver';

import { IrisRtcEngine } from '../engine/IrisRtcEngine';
import { SendDataStreamMessage } from '../helper/ClientHelper';
import { AgoraConsole, AgoraTranslate, isDefined } from '../util';

//@ts-ignore
export class IRtcEngineExImpl implements NATIVE_RTC.IRtcEngineEx {
  private _engine: IrisRtcEngine;

  public constructor(engine: IrisRtcEngine) {
    this._engine = engine;
  }

  joinChannelEx_a3cd08c(
    token: string,
    connection: NATIVE_RTC.RtcConnection,
    options: NATIVE_RTC.ChannelMediaOptions
  ): CallApiReturnType {
    let processJoinChannel = async (): Promise<CallIrisApiResult> => {
      let irisClient = new IrisClient(this._engine);
      irisClient.connection = connection;
      irisClient.createClient(options);
      irisClient.irisClientState.token = token;
      let agoraRTCClient = irisClient.agoraRTCClient;
      try {
        await agoraRTCClient!.join(
          this._engine.globalState.rtcEngineContext.appId!,
          connection.channelId!,
          token ? token : null,
          connection.localUid
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
      this._engine.rtcEngineEventHandler.onJoinChannelSuccess_263e4cd(
        connection,
        0
      );

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
          let audioTrack = await this._engine.implHelper.createMicrophoneAudioTrack();
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

      return this._engine.returnResult();
    };
    return this._engine.execute(processJoinChannel);
  }
  leaveChannelEx_c81e1a4(
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    return this.leaveChannelEx_b03ee9a(connection, defaultLeaveChannelOptions);
  }

  leaveChannelEx_b03ee9a(
    connection: NATIVE_RTC.RtcConnection,
    options: NATIVE_RTC.LeaveChannelOptions
  ): CallApiReturnType {
    let processFunc = async (): Promise<CallIrisApiResult> => {
      if (!options) {
        options = defaultLeaveChannelOptions;
      }
      if (this._engine.irisClientManager.irisClientList.length === 0) {
        return this._engine.returnResult();
      }

      let irisClient = this._engine.irisClientManager.getIrisClientByConnection(
        connection
      );

      await this._engine.irisClientManager.irisClientObserver.notifyLocal(
        NotifyType.UNPUBLISH_TRACK,
        [
          ...this._engine.irisClientManager.localAudioTrackPackages,
          ...this._engine.irisClientManager.localVideoTrackPackages,
        ]
      );

      let agoraRTCClient = irisClient?.agoraRTCClient;
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
          this._engine.getImplInstance('RtcEngine').stopAllEffects();
        }
        if (options.stopAudioMixing) {
          //todo audio Mixing
        }
        try {
          await this._engine.clientHelper.leave(agoraRTCClient);
        } catch (e) {
          AgoraConsole.error(e);
          this._engine.returnResult(false);
          this._engine.rtcEngineEventHandler.onError_d26c0fd(
            NATIVE_RTC.ERROR_CODE_TYPE.ERR_LEAVE_CHANNEL_REJECTED,
            ''
          );
        }
        this._engine.rtcEngineEventHandler.onLeaveChannel_c8e730d(
          connection,
          new NATIVE_RTC.RtcStats()
        );
        await irisClient.release();
      }
      return this._engine.returnResult();
    };
    return this._engine.execute(processFunc);
  }

  updateChannelMediaOptionsEx_457bb35(
    options: NATIVE_RTC.ChannelMediaOptions,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    let processInSequence = async () => {
      await this._engine.implHelper.updateChannelMediaOptions(
        options,
        connection
      );

      return this._engine.returnResult();
    };

    return this._engine.execute(processInSequence);
  }
  setupRemoteVideoEx_522a409(
    canvas: NATIVE_RTC.VideoCanvas,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    let processVideoTrack = async (): Promise<CallIrisApiResult> => {
      if (isDefined(canvas.uid) && isDefined(canvas.view)) {
        let remoteUserPackage = this._engine.irisClientManager.getRemoteUserPackageByUid(
          canvas.uid
        );
        if (remoteUserPackage) {
          remoteUserPackage.element = canvas.view;
        }
        let irisClient = this._engine.irisClientManager.getIrisClientByConnection(
          connection
        );
        if (irisClient) {
          let remoteUser = irisClient.agoraRTCClient?.remoteUsers.find(
            (user) => user.uid === canvas.uid
          );
          // subscribe video maybe called before setupVideo, so we need to play video here too
          if (remoteUser && remoteUser.videoTrack) {
            this._engine.trackHelper.play(
              remoteUser.videoTrack!,
              remoteUserPackage.element,
              remoteUserPackage.videoPlayerConfig
            );
          }
        }
        return this._engine.returnResult();
      } else {
        return this._engine.returnResult(
          false,
          -NATIVE_RTC.ERROR_CODE_TYPE.ERR_INVALID_ARGUMENT
        );
      }
    };

    return this._engine.execute(processVideoTrack);
  }
  muteRemoteAudioStreamEx_6d93082(
    uid: number,
    mute: boolean,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    let processFunc = async (): Promise<CallIrisApiResult> => {
      let remoteUserPackages = this._engine.irisClientManager.getRemoteUserPackagesByConnection(
        connection
      );
      let remoteUsers = remoteUserPackages.filter((userPackage) => {
        return userPackage.uid == uid;
      });
      await this._engine.irisClientManager.irisClientObserver.notifyRemote(
        mute
          ? NotifyRemoteType.UNSUBSCRIBE_AUDIO_TRACK
          : NotifyRemoteType.SUBSCRIBE_AUDIO_TRACK,
        remoteUsers
      );

      return this._engine.returnResult();
    };

    return this._engine.execute(processFunc);
  }
  muteLocalAudioStreamEx_3cf17a4(
    mute: boolean,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    let processFunc = async (): Promise<CallIrisApiResult> => {
      let localAudioTrackPackages = this._engine.irisClientManager.getLocalAudioTrackPackageByConnection(
        connection
      );
      await this._engine.irisClientManager.irisClientObserver.notifyLocal(
        mute ? NotifyType.UNPUBLISH_TRACK : NotifyType.PUBLISH_TRACK,
        localAudioTrackPackages
      );

      return this._engine.returnResult();
    };

    return this._engine.execute(processFunc);
  }
  muteAllRemoteAudioStreamsEx_3cf17a4(
    mute: boolean,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    let processFunc = async (): Promise<CallIrisApiResult> => {
      let remoteUserPackages = this._engine.irisClientManager.getRemoteUserPackagesByConnection(
        connection
      );
      await this._engine.irisClientManager.irisClientObserver.notifyRemote(
        mute
          ? NotifyRemoteType.UNSUBSCRIBE_AUDIO_TRACK
          : NotifyRemoteType.SUBSCRIBE_AUDIO_TRACK,
        remoteUserPackages
      );

      return this._engine.returnResult();
    };

    return this._engine.execute(processFunc);
  }

  muteRemoteVideoStreamEx_6d93082(
    uid: number,
    mute: boolean,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    let processFunc = async (): Promise<CallIrisApiResult> => {
      let remoteUserPackages = this._engine.irisClientManager.getRemoteUserPackagesByConnection(
        connection
      );
      let remoteUsers = remoteUserPackages.filter((userPackage) => {
        return userPackage.uid == uid;
      });
      await this._engine.irisClientManager.irisClientObserver.notifyRemote(
        mute
          ? NotifyRemoteType.UNSUBSCRIBE_VIDEO_TRACK
          : NotifyRemoteType.SUBSCRIBE_VIDEO_TRACK,
        remoteUsers
      );

      return this._engine.returnResult();
    };

    return this._engine.execute(processFunc);
  }
  muteLocalVideoStreamEx_3cf17a4(
    mute: boolean,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    let processFunc = async (): Promise<CallIrisApiResult> => {
      let localVideoTrackPackages = this._engine.irisClientManager.getLocalVideoTrackPackageByConnection(
        connection
      );
      await this._engine.irisClientManager.irisClientObserver.notifyLocal(
        mute ? NotifyType.UNPUBLISH_TRACK : NotifyType.PUBLISH_TRACK,
        localVideoTrackPackages
      );

      return this._engine.returnResult();
    };

    return this._engine.execute(processFunc);
  }
  muteAllRemoteVideoStreamsEx_3cf17a4(
    mute: boolean,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    let processFunc = async (): Promise<CallIrisApiResult> => {
      let remoteUserPackages = this._engine.irisClientManager.getRemoteUserPackagesByConnection(
        connection
      );
      await this._engine.irisClientManager.irisClientObserver.notifyRemote(
        mute
          ? NotifyRemoteType.UNSUBSCRIBE_VIDEO_TRACK
          : NotifyRemoteType.SUBSCRIBE_VIDEO_TRACK,
        remoteUserPackages
      );

      return this._engine.returnResult();
    };

    return this._engine.execute(processFunc);
  }
  createDataStreamEx_9f641b6(
    config: NATIVE_RTC.DataStreamConfig,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    let processFunc = async (): Promise<CallIrisApiResult> => {
      let irisClient = this._engine.irisClientManager.getIrisClientByConnection(
        connection
      );
      irisClient.irisClientState.dataStreamConfig = config;
      return this._engine.returnResult();
    };

    return this._engine.execute(processFunc);
  }
  sendStreamMessageEx_0c34857(
    streamId: number,
    data: Uint8Array,
    length: number,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    let process = async () => {
      let irisClient = this._engine.irisClientManager.getIrisClientByConnection(
        connection
      );
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

  setRemoteRenderModeEx_a72fe4e(
    uid: number,
    renderMode: NATIVE_RTC.RENDER_MODE_TYPE,
    mirrorMode: NATIVE_RTC.VIDEO_MIRROR_MODE_TYPE,
    connection: NATIVE_RTC.RtcConnection
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
        connection
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
}
