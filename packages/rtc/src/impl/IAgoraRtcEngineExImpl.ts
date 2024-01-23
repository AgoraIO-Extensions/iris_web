import * as NATIVE_RTC from '@iris/native-rtc';
import { CallApiReturnType, CallIrisApiResult } from 'iris-web-core';

import { IrisClient } from '../engine/IrisClient';
import { RemoteUserPackage } from '../engine/IrisClientManager';

import { NotifyRemoteType, NotifyType } from '../engine/IrisClientObserver';

import { IrisRtcEngine } from '../engine/IrisRtcEngine';

import { AgoraConsole } from '../util/AgoraConsole';

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
      let irisClient = new IrisClient(this._engine, connection);
      irisClient.createClient(options);
      irisClient.irisClientState.token = token;
      let agoraRTCClient = irisClient.agoraRTCClient;

      try {
        await agoraRTCClient.join(
          this._engine.globalState.rtcEngineContext.appId,
          connection.channelId,
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
    let processFunc = async (): Promise<CallIrisApiResult> => {
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
        try {
          await agoraRTCClient.leave();
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
        irisClient.release();
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
      let remoteUser = this._engine.irisClientManager.getRemoteUserPackageByUid(
        canvas.uid
      );
      if (remoteUser) {
        remoteUser.update({
          element: canvas.view,
        });
        this._engine.irisClientManager.irisClientObserver.notifyRemote(
          NotifyRemoteType.SUBSCRIBE_VIDEO_TRACK,
          [remoteUser]
        );
      } else {
        let userPackage = new RemoteUserPackage(
          connection,
          canvas.view,
          canvas.uid,
          NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_REMOTE
        );
        let irisClient = this._engine.irisClientManager.getIrisClientByConnection(
          connection
        );
        this._engine.irisClientManager.addRemoteUserPackage(
          userPackage,
          irisClient?.agoraRTCClient
        );
      }

      return this._engine.returnResult();
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
      this._engine.irisClientManager.irisClientObserver.notifyRemote(
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
        mute ? NotifyType.MUTE_TRACK : NotifyType.UNMUTE_TRACK,
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
      this._engine.irisClientManager.irisClientObserver.notifyRemote(
        mute
          ? NotifyRemoteType.UNSUBSCRIBE_AUDIO_TRACK
          : NotifyRemoteType.SUBSCRIBE_AUDIO_TRACK,
        remoteUserPackages
      );

      return this._engine.returnResult();
    };

    return this._engine.execute(processFunc);
  }
}
