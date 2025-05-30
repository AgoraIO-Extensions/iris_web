import * as NATIVE_RTC from '@iris/native-rtc';
import {
  ConnectionDisconnectedReason,
  ConnectionState,
  IAgoraRTCClient,
  IAgoraRTCError,
  IAgoraRTCRemoteUser,
  NetworkQuality,
  RemoteStreamType,
  UID,
} from 'agora-rtc-sdk-ng';

import { IrisAudioSourceType, defaultRemoteVideoPlayerConfig } from '../base';

import { IrisClient } from '../engine/IrisClient';
import { RemoteUserPackage } from '../engine/IrisClientManager';
import { NotifyRemoteType } from '../engine/IrisClientObserver';

import { IrisRtcEngine } from '../engine/IrisRtcEngine';
import { AgoraTranslate, getUidFromRemoteUser } from '../util';

export class IrisClientEventHandler {
  private _irisClient: IrisClient;
  private _engine: IrisRtcEngine;
  private agoraRTCClient: IAgoraRTCClient;

  constructor(irisClient: IrisClient, engine: IrisRtcEngine) {
    this._irisClient = irisClient;
    this._engine = engine;
    this.agoraRTCClient = irisClient.agoraRTCClient!;
    this.agoraRTCClient.on(
      'connection-state-change',
      this.onEventConnectionStateChange.bind(this)
    );
    this.agoraRTCClient.on('user-joined', this.onEventUserJoined.bind(this));
    this.agoraRTCClient.on('user-left', this.onEventUserLeft.bind(this));
    this.agoraRTCClient.on(
      'user-published',
      this.onEventUserPublished.bind(this)
    );
    this.agoraRTCClient.on(
      'user-unpublished',
      this.onEventUserUnpublished.bind(this)
    );
    this.agoraRTCClient.on('stream-message', this.onStreamMessage.bind(this));
    this.agoraRTCClient.on(
      'media-reconnect-start',
      this.onEventMediaReconnectStart.bind(this)
    );
    this.agoraRTCClient.on(
      'media-reconnect-end',
      this.onEventMediaReconnectEnd.bind(this)
    );
    this.agoraRTCClient.on(
      'stream-type-changed',
      this.onEventStreamTypeChanged.bind(this)
    );
    this.agoraRTCClient.on(
      'stream-fallback',
      this.onEventStreamFallback.bind(this)
    );
    this.agoraRTCClient.on(
      'volume-indicator',
      this.onEventVolumeIndicator.bind(this)
    );
    this.agoraRTCClient.on('crypt-error', this.onEventCryptError.bind(this));
    this.agoraRTCClient.on(
      'token-privilege-will-expire',
      this.onEventTokenPrivilegeWillExpire.bind(this)
    );
    this.agoraRTCClient.on(
      'token-privilege-did-expire',
      this.onEventTokenPrivilegeDidExpire.bind(this)
    );
    this.agoraRTCClient.on(
      'network-quality',
      this.onEventNetworkQuality.bind(this)
    );
    this.agoraRTCClient.on(
      'live-streaming-error',
      this.onEventLiveStreamingError.bind(this)
    );
    this.agoraRTCClient.on(
      'live-streaming-warning',
      this.onEventLiveStreamingWarning.bind(this)
    );
    this.agoraRTCClient.on('exception', this.onEventException.bind(this));
    this.agoraRTCClient.on(
      'is-using-cloud-proxy',
      this.onEventIsUsingCloudProxy.bind(this)
    );
    this.agoraRTCClient.on(
      'join-fallback-to-proxy',
      this.onEventJoinFallbackToProxy.bind(this)
    );
    this.agoraRTCClient.on(
      'content-inspect-error',
      this.onEventContentInspectError.bind(this)
    );
    this.agoraRTCClient.on(
      'content_inspect_result',
      this.onEventContentInspectResult.bind(this)
    );
  }

  onEventConnectionStateChange(
    curState: ConnectionState,
    revState: ConnectionState,
    reason?: ConnectionDisconnectedReason
  ): void {
    if (curState == 'DISCONNECTED')
      this._engine.rtcEngineEventHandler.onConnectionLostEx(
        this._irisClient.connection!
      );
    else if (
      reason == ConnectionDisconnectedReason.CHANNEL_BANNED ||
      reason == ConnectionDisconnectedReason.IP_BANNED ||
      reason == ConnectionDisconnectedReason.UID_BANNED
    ) {
      this._engine.rtcEngineEventHandler.onConnectionBannedEx(
        this._irisClient.connection!
      );
    } else if (
      reason == ConnectionDisconnectedReason.NETWORK_ERROR ||
      reason == ConnectionDisconnectedReason.SERVER_ERROR
    ) {
      this._engine.rtcEngineEventHandler.onConnectionInterruptedEx(
        this._irisClient.connection!
      );
    }

    if (curState != 'DISCONNECTING') {
      let state = AgoraTranslate.ConnectionState2NATIVE_RTCCONNECTION_STATE_TYPE(
        curState
      );
      let reason2: NATIVE_RTC.CONNECTION_CHANGED_REASON_TYPE =
        NATIVE_RTC.CONNECTION_CHANGED_REASON_TYPE
          .CONNECTION_CHANGED_INTERRUPTED;
      if (reason != null) {
        reason2 = AgoraTranslate.ConnectionDisconnectedReason2NATIVE_RTCCONNECTION_CHANGED_REASON_TYPE(
          reason
        );
      }
      this._engine.rtcEngineEventHandler.onConnectionStateChangedEx(
        this._irisClient.connection!,
        state,
        reason2
      );
    }
  }

  /*
   *  假设我们主客户端A和子客户端B，同时加入频道1， 此时另外一个用户C加入了频道1
   *  1.用户C 加入离开,开始推流,结束推流等行为会触发2次
   *  2.主客户端A会触发 用户B加入(需要过滤掉这个值)
   *  3.子客户端B会触发 用户A加入(需要过滤点这个值)
   **/
  onEventUserJoined(user: IAgoraRTCRemoteUser): void {
    let connection: NATIVE_RTC.RtcConnection = {
      channelId: this.agoraRTCClient.channelName,
      localUid: this.agoraRTCClient.uid as number,
    };
    let remoteUid: number = getUidFromRemoteUser(user);
    let elapsed = 0;
    this._engine.rtcEngineEventHandler.onUserJoinedEx(
      connection,
      remoteUid,
      elapsed
    );
    //if joinchannel with string uid
    if (typeof user.uid === 'string') {
      //@ts-ignore websdk的私有属性
      let _uintid = user._uintid;
      let userInfo: NATIVE_RTC.UserInfo = {
        uid: _uintid,
        userAccount: user.uid as string,
      };
      this._engine.rtcEngineEventHandler.onUserInfoUpdated(_uintid, userInfo);
      this._engine.irisClientManager.addUserInfo(userInfo);
    }
    let userPackage = this._engine.irisClientManager.getRemoteUserPackageByUid(
      remoteUid
    );
    if (!userPackage) {
      userPackage = new RemoteUserPackage(
        connection,
        '',
        defaultRemoteVideoPlayerConfig,
        remoteUid,
        NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_REMOTE,
        IrisAudioSourceType.kAudioSourceTypeRemote
      );
      this._engine.irisClientManager.addRemoteUserPackage(
        userPackage,
        this.agoraRTCClient
      );
    } else {
      userPackage.uid = remoteUid;
    }
    this._engine.rtcEngineEventHandler.onRemoteAudioStateChangedEx(
      this._irisClient.connection,
      remoteUid,
      user.hasAudio
        ? NATIVE_RTC.REMOTE_AUDIO_STATE.REMOTE_AUDIO_STATE_STARTING
        : NATIVE_RTC.REMOTE_AUDIO_STATE.REMOTE_AUDIO_STATE_STOPPED,
      user.hasAudio
        ? NATIVE_RTC.REMOTE_AUDIO_STATE_REASON
            .REMOTE_AUDIO_REASON_REMOTE_UNMUTED
        : NATIVE_RTC.REMOTE_AUDIO_STATE_REASON.REMOTE_AUDIO_REASON_REMOTE_MUTED,
      0
    );
    this._engine.rtcEngineEventHandler.onRemoteVideoStateChangedEx(
      this._irisClient.connection,
      remoteUid,
      user.hasVideo
        ? NATIVE_RTC.REMOTE_VIDEO_STATE.REMOTE_VIDEO_STATE_STARTING
        : NATIVE_RTC.REMOTE_VIDEO_STATE.REMOTE_VIDEO_STATE_STOPPED,
      user.hasVideo
        ? NATIVE_RTC.REMOTE_VIDEO_STATE_REASON
            .REMOTE_VIDEO_STATE_REASON_REMOTE_UNMUTED
        : NATIVE_RTC.REMOTE_VIDEO_STATE_REASON
            .REMOTE_VIDEO_STATE_REASON_REMOTE_MUTED,
      0
    );
  }

  async onEventUserLeft(
    user: IAgoraRTCRemoteUser,
    reason: string
  ): Promise<void> {
    let remoteUid: number = getUidFromRemoteUser(user);
    let remoteUser = this._engine.irisClientManager.getRemoteUserPackageByUid(
      remoteUid
    );
    let reason2 = AgoraTranslate.string2NATIVE_RTCUSER_OFFLINE_REASON_TYPE(
      reason
    );
    this._engine.rtcEngineEventHandler.onUserOfflineEx(
      this._irisClient.connection,
      remoteUid,
      reason2
    );

    //if joinchannel with string uid
    if (typeof user.uid === 'string') {
      this._engine.irisClientManager.removeUserInfoByUid(remoteUid);
    }

    await this._engine.irisClientManager.irisClientObserver.notifyRemote(
      NotifyRemoteType.UNSUBSCRIBE_AUDIO_TRACK,
      [remoteUser]
    );
    await this._engine.irisClientManager.irisClientObserver.notifyRemote(
      NotifyRemoteType.UNSUBSCRIBE_AUDIO_TRACK,
      [remoteUser]
    );
    this._engine.irisClientManager.removeRemoteUserPackage(user.uid as number);
    this._engine.irisClientManager.removetrackEventHandlerByRemoteUser(
      user,
      'all'
    );
  }

  async onEventUserPublished(
    user: IAgoraRTCRemoteUser,
    mediaType: 'audio' | 'video'
  ): Promise<void> {
    let remoteUid: number = getUidFromRemoteUser(user);
    let isLocal = user.uid === this.agoraRTCClient.uid;
    let remoteUser = this._engine.irisClientManager.getRemoteUserPackageByUid(
      remoteUid
    );
    if (remoteUser) {
      if (mediaType == 'audio') {
        await this._engine.irisClientManager.irisClientObserver.notifyRemote(
          NotifyRemoteType.SUBSCRIBE_AUDIO_TRACK,
          [remoteUser],
          false
        );
        this._engine.rtcEngineEventHandler.onUserMuteAudioEx(
          this._irisClient.connection,
          remoteUid,
          false
        );
        if (!isLocal) {
          this._engine.rtcEngineEventHandler.onRemoteAudioStateChangedEx(
            this._irisClient.connection,
            remoteUid,
            NATIVE_RTC.REMOTE_AUDIO_STATE.REMOTE_AUDIO_STATE_STARTING,
            NATIVE_RTC.REMOTE_AUDIO_STATE_REASON
              .REMOTE_AUDIO_REASON_REMOTE_UNMUTED,
            0
          );
        }
        if (user.audioTrack) {
          if (this._engine.globalState.isAudioFrameParametersSet) {
            user.audioTrack.setAudioFrameCallback((buffer) => {
              let channelId =
                this._engine.irisClientManager.localAudioTrackPackages.find(
                  (e) => e.track === user.audioTrack
                )?.irisClient?.connection?.channelId ?? '';

              // Convert AudioBuffer to Uint8Array
              const channelData = buffer.getChannelData(
                this._engine.globalState.audioFrameParameters.channel
              ); // Get data from first channel
              const byteArray = new Uint8Array(channelData.buffer);

              this._engine.mediaEngineEventHandler.onPlaybackAudioFrame(
                channelId,
                {
                  buffer: byteArray,
                }
              );
            }, this._engine.globalState.audioFrameParameters.samplesPerCall);
          }
        }
      } else if (mediaType == 'video') {
        await this._engine.irisClientManager.irisClientObserver.notifyRemote(
          NotifyRemoteType.SUBSCRIBE_VIDEO_TRACK,
          [remoteUser],
          false
        );
        this._engine.rtcEngineEventHandler.onUserMuteVideoEx(
          this._irisClient.connection,
          remoteUid,
          false
        );
        if (!isLocal) {
          this._engine.rtcEngineEventHandler.onRemoteVideoStateChangedEx(
            this._irisClient.connection,
            remoteUid,
            NATIVE_RTC.REMOTE_VIDEO_STATE.REMOTE_VIDEO_STATE_STARTING,
            NATIVE_RTC.REMOTE_VIDEO_STATE_REASON
              .REMOTE_VIDEO_STATE_REASON_REMOTE_UNMUTED,
            0
          );
        }
      }
    }
  }

  async onEventUserUnpublished(
    user: IAgoraRTCRemoteUser,
    mediaType: 'audio' | 'video'
  ): Promise<void> {
    let remoteUid: number = getUidFromRemoteUser(user);
    let remoteUser = this._engine.irisClientManager.getRemoteUserPackageByUid(
      remoteUid
    );
    if (remoteUser) {
      if (mediaType == 'audio') {
        await this._engine.irisClientManager.irisClientObserver.notifyRemote(
          NotifyRemoteType.UNSUBSCRIBE_AUDIO_TRACK,
          [remoteUser]
        );
        this._engine.rtcEngineEventHandler.onUserMuteAudioEx(
          this._irisClient.connection,
          remoteUid,
          true
        );
        this._engine.rtcEngineEventHandler.onRemoteAudioStateChangedEx(
          this._irisClient.connection,
          remoteUid,
          NATIVE_RTC.REMOTE_AUDIO_STATE.REMOTE_AUDIO_STATE_STOPPED,
          NATIVE_RTC.REMOTE_AUDIO_STATE_REASON.REMOTE_AUDIO_REASON_REMOTE_MUTED,
          0
        );
        if (user.audioTrack) {
          if (this._engine.globalState.isAudioFrameParametersSet) {
            user.audioTrack.setAudioFrameCallback(
              null,
              this._engine.globalState.audioFrameParameters.samplesPerCall
            );
          }
        }
      } else if (mediaType == 'video') {
        await this._engine.irisClientManager.irisClientObserver.notifyRemote(
          NotifyRemoteType.UNSUBSCRIBE_VIDEO_TRACK,
          [remoteUser]
        );
        this._engine.rtcEngineEventHandler.onUserMuteVideoEx(
          this._irisClient.connection,
          remoteUid,
          true
        );
        this._engine.rtcEngineEventHandler.onRemoteVideoStateChangedEx(
          this._irisClient.connection,
          remoteUid,
          NATIVE_RTC.REMOTE_VIDEO_STATE.REMOTE_VIDEO_STATE_STOPPED,
          NATIVE_RTC.REMOTE_VIDEO_STATE_REASON
            .REMOTE_VIDEO_STATE_REASON_REMOTE_MUTED,
          0
        );
      }
    }
  }

  onStreamMessage(uid: UID, payload: Uint8Array): void {
    //if joinchannel with string uid
    if (typeof uid === 'string') {
      uid = this._engine.irisClientManager.getUserInfoByUserAccount(uid)?.uid!;
    }
    this._engine.rtcEngineEventHandler.onStreamMessageEx(
      this._irisClient.connection,
      uid,
      this._engine.globalState.streamMessageStreamId,
      payload,
      payload.length,
      0
    );
  }

  onEventMediaReconnectStart(uid: number): void {
    //暂时没有找到对应的回调
  }

  onEventMediaReconnectEnd(uid: number): void {
    //展示没有找到合适的回调
  }
  onEventStreamTypeChanged(uid: number, streamType: RemoteStreamType): void {
    //展示没有合适的回调
  }

  onEventStreamFallback(
    uid: UID,
    isFallbackOrRecover: 'fallback' | 'recover'
  ): void {
    //if joinchannel with string uid
    if (typeof uid === 'string') {
      uid = this._engine.irisClientManager.getUserInfoByUserAccount(uid)?.uid!;
    }
    this._engine.rtcEngineEventHandler.onRemoteSubscribeFallbackToAudioOnly(
      uid,
      isFallbackOrRecover == 'fallback' ? true : false
    );
  }

  onEventVolumeIndicator(result: { level: number; uid: number }[]): void {
    this._engine.irisClientManager.irisClientList.map((irisClient) => {
      let speakers: NATIVE_RTC.AudioVolumeInfo[] = [];
      for (let i = 0; i < result.length; i++) {
        speakers.push(
          AgoraTranslate.volumeIndicatorResult2NATIVE_RTCAudioVolumeInfo(
            result[i]
          )
        );
      }
      let speakerNumber = result.length;
      /* todo
       * - In the local user's callback, `totalVolume` is the sum of the voice volume and audio-mixing volume
       * of the local user.
       * - In the remote users' callback, `totalVolume` is the sum of the voice volume and audio-mixing volume
       * of all the remote speakers.
       */
      let totalVolume = 0;
      if (
        !irisClient.irisClientState.enableAudioVolumeIndicationConfig.reportVad
      ) {
        speakers = speakers.filter(
          (speaker) => speaker.uid !== this.agoraRTCClient.uid
        );
      }
      this._engine.rtcEngineEventHandler.onAudioVolumeIndicationEx(
        this._irisClient.connection,
        speakers,
        speakerNumber,
        totalVolume
      );
    });
  }

  onEventCryptError(): void {
    let errorType: NATIVE_RTC.ENCRYPTION_ERROR_TYPE =
      NATIVE_RTC.ENCRYPTION_ERROR_TYPE.ENCRYPTION_ERROR_INTERNAL_FAILURE;
    this._engine.rtcEngineEventHandler.onEncryptionErrorEx(
      this._irisClient.connection,
      errorType
    );
  }

  onEventTokenPrivilegeWillExpire(): void {
    this._engine.rtcEngineEventHandler.onTokenPrivilegeWillExpireEx(
      this._irisClient.connection,
      this._irisClient.irisClientState.token!
    );
  }

  onEventTokenPrivilegeDidExpire(): void {
    this._engine.rtcEngineEventHandler.onRequestTokenEx(
      this._irisClient.connection
    );
  }

  onEventNetworkQuality(stats: NetworkQuality): void {
    let connection: NATIVE_RTC.RtcConnection = {
      channelId: this.agoraRTCClient.channelName,
      localUid: this.agoraRTCClient.uid as number,
    };
    this._engine.rtcEngineEventHandler.onNetworkQualityEx(
      connection,
      0,
      stats.downlinkNetworkQuality,
      stats.uplinkNetworkQuality
    );
  }

  //todo 后边再做
  onEventLiveStreamingError(url: string, err: IAgoraRTCError): void {}

  //todo 后边再做
  onEventLiveStreamingWarning(url: string, warning: IAgoraRTCError): void {}

  onEventException(event: { code: number; msg: string; uid: number }): void {
    //触发不了onError和onWarning， 错误吗几乎没有重合的部分
  }

  onEventIsUsingCloudProxy(isUsingProxy: boolean): void {
    //todo 暂时没有找到对应的回调
  }

  onEventJoinFallbackToProxy(proxyServer: string): void {
    //todo 暂时没有找到对应的回调
  }

  onEventContentInspectError(error?: IAgoraRTCError): void {
    this._engine.rtcEngineEventHandler.onError(
      NATIVE_RTC.ERROR_CODE_TYPE.ERR_FAILED,
      error?.message || 'Content Inspect Error'
    );
  }

  onEventContentInspectResult(
    data?: 'porn' | 'sexy' | 'neutral',
    error?: IAgoraRTCError
  ) {
    if (data) {
      let result = AgoraTranslate.data2NATIVE_RTC_CONNECT_INSPECT_RESULT(data);
      this._engine.rtcEngineEventHandler.onContentInspectResult(result);
    }
  }

  release() {
    this.agoraRTCClient.removeAllListeners();
  }
}
