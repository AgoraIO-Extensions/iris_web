import * as NATIVE_RTC from '@iris/native-rtc-binding';
import {
  ChannelMediaRelayError,
  ChannelMediaRelayEvent,
  ChannelMediaRelayState,
  ConnectionDisconnectedReason,
  ConnectionState,
  IAgoraRTCClient,
  IAgoraRTCError,
  IAgoraRTCRemoteUser,
  NetworkQuality,
  RemoteStreamType,
  UID,
} from 'agora-rtc-sdk-ng';

import { IrisAudioSourceType } from '../base/BaseType';

import { IrisClient } from '../engine/IrisClient';
import { RemoteUserPackage } from '../engine/IrisClientManager';
import { NotifyRemoteType } from '../engine/IrisClientObserver';

import { IrisRtcEngine } from '../engine/IrisRtcEngine';
import { AgoraTranslate } from '../util/AgoraTranslate';

export class IrisClientEventHandler {
  private _irisClient: IrisClient;
  private _engine: IrisRtcEngine;
  private agoraRTCClient: IAgoraRTCClient;

  constructor(irisClient: IrisClient, engine: IrisRtcEngine) {
    this._irisClient = irisClient;
    this._engine = engine;
    this.agoraRTCClient = irisClient.agoraRTCClient;
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
    this.agoraRTCClient.on(
      'user-info-updated',
      this.onEventUserInfoUpdated.bind(this)
    );
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
      'channel-media-relay-state',
      this.onEventChannelMediaRelayState.bind(this)
    );
    this.agoraRTCClient.on(
      'channel-media-relay-event',
      this.onEventChannelMediaRelayEvent.bind(this)
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
      'published-user-list',
      this.onEventPublishedUserList.bind(this)
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
        this._irisClient.connection
      );
    else if (
      reason == ConnectionDisconnectedReason.CHANNEL_BANNED ||
      reason == ConnectionDisconnectedReason.IP_BANNED ||
      reason == ConnectionDisconnectedReason.UID_BANNED
    ) {
      this._engine.rtcEngineEventHandler.onConnectionBannedEx(
        this._irisClient.connection
      );
    } else if (
      reason == ConnectionDisconnectedReason.NETWORK_ERROR ||
      reason == ConnectionDisconnectedReason.SERVER_ERROR
    ) {
      this._engine.rtcEngineEventHandler.onConnectionInterruptedEx(
        this._irisClient.connection
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
        this._irisClient.connection,
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
    let remoteUid = user.uid;
    let elapsed = 0;
    this._engine.rtcEngineEventHandler.onUserJoinedEx(
      connection,
      remoteUid as number,
      elapsed
    );

    let userPackage = this._engine.irisClientManager.getRemoteUserPackageByUid(
      user.uid
    );
    if (!userPackage) {
      userPackage = new RemoteUserPackage(
        connection,
        null,
        user.uid,
        NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_REMOTE,
        IrisAudioSourceType.kAudioSourceTypeRemote
      );
      this._engine.irisClientManager.addRemoteUserPackage(userPackage);
    } else {
      userPackage.update({
        uid: user.uid,
      });
    }
  }

  onEventUserLeft(user: IAgoraRTCRemoteUser, reason: string): void {
    let remoteUid = user.uid;
    let reason2 = AgoraTranslate.string2NATIVE_RTCUSER_OFFLINE_REASON_TYPE(
      reason
    );
    this._engine.rtcEngineEventHandler.onUserOfflineEx(
      this._irisClient.connection,
      remoteUid as number,
      reason2
    );

    this._engine.irisClientManager.removeRemoteUserPackage(user.uid);

    this._engine.irisClientManager.removetrackEventHandlerByRemoteUser(
      user,
      'all'
    );
  }

  onEventUserPublished(
    user: IAgoraRTCRemoteUser,
    mediaType: 'audio' | 'video'
  ): void {
    let remoteUser = this._engine.irisClientManager.getRemoteUserPackageByUid(
      user.uid
    );
    if (remoteUser) {
      if (mediaType == 'audio') {
        this._engine.irisClientManager.irisClientObserver.notifyRemote(
          NotifyRemoteType.SUBSCRIBE_AUDIO_TRACK,
          [remoteUser]
        );
      } else if (mediaType == 'video') {
        this._engine.irisClientManager.irisClientObserver.notifyRemote(
          NotifyRemoteType.SUBSCRIBE_VIDEO_TRACK,
          [remoteUser]
        );
      }
    }
  }

  onEventUserUnpublished(
    user: IAgoraRTCRemoteUser,
    mediaType: 'audio' | 'video'
  ): void {
    this._engine.irisClientManager.removetrackEventHandlerByRemoteUser(
      user,
      mediaType
    );
  }

  onEventUserInfoUpdated(
    uid: UID,
    msg:
      | 'mute-audio'
      | 'mute-video'
      | 'enable-local-video'
      | 'unmute-audio'
      | 'unmute-video'
      | 'disable-local-video'
  ): void {
    let remoteUid = uid as number;

    switch (msg) {
      case 'mute-audio':
        this._engine.rtcEngineEventHandler.onUserMuteAudioEx(
          this._irisClient.connection,
          remoteUid,
          true
        );
        this._engine.rtcEngineEventHandler.onUserStateChangedEx(
          this._irisClient.connection,
          remoteUid,
          NATIVE_RTC.REMOTE_USER_STATE.USER_STATE_MUTE_AUDIO
        );
        break;
      case 'mute-video':
        this._engine.rtcEngineEventHandler.onUserMuteVideoEx(
          this._irisClient.connection,
          remoteUid,
          true
        );
        this._engine.rtcEngineEventHandler.onUserStateChangedEx(
          this._irisClient.connection,
          remoteUid,
          NATIVE_RTC.REMOTE_USER_STATE.USER_STATE_MUTE_VIDEO
        );

        break;
      case 'unmute-audio':
        this._engine.rtcEngineEventHandler.onUserMuteAudioEx(
          this._irisClient.connection,
          remoteUid,
          false
        );
        break;
      case 'unmute-video':
        this._engine.rtcEngineEventHandler.onUserMuteVideoEx(
          this._irisClient.connection,
          remoteUid,
          false
        );
        break;
      case 'enable-local-video':
        this._engine.rtcEngineEventHandler.onUserEnableLocalVideoEx(
          this._irisClient.connection,
          remoteUid,
          true
        );
        this._engine.rtcEngineEventHandler.onUserStateChangedEx(
          this._irisClient.connection,
          remoteUid,
          NATIVE_RTC.REMOTE_USER_STATE.USER_STATE_ENABLE_LOCAL_VIDEO
        );
        break;
      case 'disable-local-video':
        this._engine.rtcEngineEventHandler.onUserEnableLocalVideoEx(
          this._irisClient.connection,
          remoteUid,
          false
        );
        break;
    }
  }

  onEventMediaReconnectStart(uid: UID): void {
    //暂时没有找到对应的回调
  }

  onEventMediaReconnectEnd(uid: UID): void {
    //展示没有找到合适的回调
  }
  onEventStreamTypeChanged(uid: UID, streamType: RemoteStreamType): void {
    //展示没有合适的回调
  }

  onEventStreamFallback(
    uid: UID,
    isFallbackOrRecover: 'fallback' | 'recover'
  ): void {
    this._engine.rtcEngineEventHandler.onRemoteSubscribeFallbackToAudioOnly(
      uid as number,
      isFallbackOrRecover == 'fallback' ? true : false
    );
  }

  onEventChannelMediaRelayState(
    state: ChannelMediaRelayState,
    code: ChannelMediaRelayError
  ): void {
    let state2 = AgoraTranslate.ChannelMediaRelayState2NATIVE_RTCCHANNEL_MEDIA_RELAY_STATE(
      state
    );
    let code2 = AgoraTranslate.ChannelMediaRelayError2NATIVE_RTCCHANNEL_MEDIA_RELAY_ERROR(
      code
    );
    this._engine.rtcEngineEventHandler.onChannelMediaRelayStateChanged(
      state2,
      code2
    );
  }

  onEventChannelMediaRelayEvent(event: ChannelMediaRelayEvent): void {
    let event2 = AgoraTranslate.ChannelMediaRelayEvent2NATIVE_RTCCHANNEL_MEDIA_RELAY_EVENT(
      event
    );
    this._engine.rtcEngineEventHandler.onChannelMediaRelayEvent(event2);
  }

  onEventVolumeIndicator(result: { level: number; uid: UID }[]): void {
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
    this._engine.rtcEngineEventHandler.onAudioVolumeIndicationEx(
      this._irisClient.connection,
      speakers,
      speakerNumber,
      totalVolume
    );
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
    let token: string = this._irisClient.irisClientVariables.token;
    this._engine.rtcEngineEventHandler.onTokenPrivilegeWillExpireEx(
      this._irisClient.connection,
      token
    );
  }

  onEventTokenPrivilegeDidExpire(): void {
    this._engine.rtcEngineEventHandler.onRequestTokenEx(
      this._irisClient.connection
    );
  }

  onEventNetworkQuality(stats: NetworkQuality): void {
    //不能对应 onNetworkQuality, 因为这里是得到自己的网络状况，而 onNetworkQuality 是别人的网络状况
    //暂时没有找到对应的回调
  }

  //todo 后边再做
  onEventLiveStreamingError(url: string, err: IAgoraRTCError): void {}

  //todo 后边再做
  onEventLiveStreamingWarning(url: string, warning: IAgoraRTCError): void {}

  onEventException(event: { code: number; msg: string; uid: UID }): void {
    //触发不了onError和onWarning， 错误吗几乎没有重合的部分
  }

  onEventIsUsingCloudProxy(isUsingProxy: boolean): void {
    //todo 暂时没有找到对应的回调
  }

  onEventJoinFallbackToProxy(proxyServer: string): void {
    //todo 暂时没有找到对应的回调
  }

  onEventPublishedUserList(users: IAgoraRTCRemoteUser): void {
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
