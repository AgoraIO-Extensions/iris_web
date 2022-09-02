import { IAgoraRTCClient, ConnectionState, ConnectionDisconnectedReason, IAgoraRTCRemoteUser, UID, RemoteStreamType, ChannelMediaRelayState, ChannelMediaRelayError, ChannelMediaRelayEvent, NetworkQuality, AgoraRTCError, InspectState } from "agora-rtc-sdk-ng";
import { IrisClientType, IrisVideoSourceType } from "../base/BaseType";
import { IrisRtcEngine } from "../engine/IrisRtcEngine";
import * as agorartc from "../terra/rtc_types/Index";
import { AgoraTranslate } from "../tool/AgoraTranslate";
import { IrisTrackEventHandler, IrisTrackEventHandlerParam } from "./IrisTrackEventHandler";

export class IrisClientEventHandler {

    private _client: IAgoraRTCClient;
    private _engine: IrisRtcEngine;
    private _clientType: IrisClientType;

    constructor(client: IAgoraRTCClient, type: IrisClientType, engine: IrisRtcEngine) {
        console.log("IrisClient")
        this._client = client;
        this._clientType = type;
        this._engine = engine;

        this._client.on("connection-state-change", this.onEventConnectionStateChange.bind(this));
        this._client.on("user-joined", this.onEventUserJoined.bind(this));
        this._client.on("user-left", this.onEventUserLeft.bind(this));
        this._client.on("user-published", this.onEventUserPublished.bind(this));
        this._client.on("user-unpublished", this.onEventUserUnpublished.bind(this));
        this._client.on("user-info-updated", this.onEventUserInfoUpdated.bind(this));
        this._client.on("media-reconnect-start", this.onEventMediaReconnectStart.bind(this));
        this._client.on("media-reconnect-end", this.onEventMediaReconnectEnd.bind(this));
        this._client.on("stream-type-changed", this.onEventStreamTypeChanged.bind(this));
        this._client.on("stream-fallback", this.onEventStreamFallback.bind(this));
        this._client.on("channel-media-relay-state", this.onEventChannelMediaRelayState.bind(this));
        this._client.on("channel-media-relay-event", this.onEventChannelMediaRelayEvent.bind(this));
        this._client.on("volume-indicator", this.onEventVolumeIndicator.bind(this));
        this._client.on("crypt-error", this.onEventCryptError.bind(this));
        this._client.on("token-privilege-will-expire", this.onEventTokenPrivilegeWillExpire.bind(this));
        this._client.on("token-privilege-did-expire", this.onEventTokenPrivilegeDidExpire.bind(this));
        this._client.on("network-quality", this.onEventNetworkQuality.bind(this));
        this._client.on("live-streaming-error", this.onEventLiveStreamingError.bind(this));
        this._client.on("live-streaming-warning", this.onEventLiveStreamingWarning.bind(this));
        this._client.on("exception", this.onEventException.bind(this));
        this._client.on("is-using-cloud-proxy", this.onEventIsUsingCloudProxy.bind(this));
        this._client.on("join-fallback-to-proxy", this.onEventJoinFallbackToProxy.bind(this));
        this._client.on("published-user-list", this.onEventPublishedUserList.bind(this));
        this._client.on("content-inspect-connection-state-change", this.onEventContentInspectConnectionStateChange.bind(this));
        this._client.on("content-inspect-error", this.onEventContentInspectError.bind(this));
        this._client.on("content_inspect_result", this.onEventContentInspectResult.bind(this));
    }

    onEventConnectionStateChange(curState: ConnectionState, revState: ConnectionState, reason?: ConnectionDisconnectedReason): void {

        let connection: agorartc.RtcConnection = {
            channelId: this._client.channelName,
            localUid: this._client.uid as number
        };

        if (curState == 'DISCONNECTED')
            this._engine.rtcEngineEventHandler.onConnectionLostEx(connection);
        else if (reason == ConnectionDisconnectedReason.CHANNEL_BANNED
            || reason == ConnectionDisconnectedReason.IP_BANNED
            || reason == ConnectionDisconnectedReason.UID_BANNED
        ) {
            this._engine.rtcEngineEventHandler.onConnectionBannedEx(connection);
        }
        else if (reason == ConnectionDisconnectedReason.NETWORK_ERROR
            || reason == ConnectionDisconnectedReason.SERVER_ERROR
        ) {
            this._engine.rtcEngineEventHandler.onConnectionInterruptedEx(connection);
        }


        if (curState != "DISCONNECTING") {
            let state = AgoraTranslate.ConnectionState2agorartcCONNECTION_STATE_TYPE(curState);
            let reason2: agorartc.CONNECTION_CHANGED_REASON_TYPE = agorartc.CONNECTION_CHANGED_REASON_TYPE.CONNECTION_CHANGED_INTERRUPTED;
            if (reason != null) {
                reason2 = AgoraTranslate.ConnectionDisconnectedReason2agorartcCONNECTION_CHANGED_REASON_TYPE(reason);
            }
            this._engine.rtcEngineEventHandler.onConnectionStateChangedEx(connection, state, reason2);
        }

    }

    /*
    *  假设我们主客户端A和子客户端B，同时加入频道1， 此时另外一个用户C加入了频道1
    *  1.用户C 加入离开,开始推流,结束推流等行为会触发2次
    *  2.主客户端A会触发 用户B加入(需要过滤掉这个值)
    *  3.子客户端B会触发 用户A加入(需要过滤点这个值)
    **/
    onEventUserJoined(user: IAgoraRTCRemoteUser): void {
        let connection: agorartc.RtcConnection = {
            channelId: this._client.channelName,
            localUid: user.uid as number,
        };
        let remoteUid = user.uid;
        let elapsed = 0;
        this._engine.rtcEngineEventHandler.onUserJoinedEx(connection, remoteUid as number, elapsed);


        // let con2: agorartc.RtcConnection = {
        //     channelId: this._client.channelName,
        //     localUid: remoteUid as number
        // };

        //过滤掉情况 2，3
        // if (this._engine.entitiesContainer.isMainClientOrSubClient(con2))
        //     return;

        // //此时如果是情况1下的的第二次触发C加入。那么第二次的加入会被过滤掉
        // if (this._engine.entitiesContainer.getRemoteUser(con2) == null) {
        //     this._engine.entitiesContainer.addRemoteUser(connection, user);
        // }
    }

    onEventUserLeft(user: IAgoraRTCRemoteUser, reason: string): void {
        let connection: agorartc.RtcConnection = {
            channelId: this._client.channelName,
            localUid: this._client.uid as number
        };
        let remoteUid = user.uid;
        let reason2 = AgoraTranslate.string2agorartcUSER_OFFLINE_REASON_TYPE(reason);
        this._engine.rtcEngineEventHandler.onUserOfflineEx(connection, remoteUid as number, reason2);


        let con2: agorartc.RtcConnection = {
            channelId: this._client.channelName,
            localUid: remoteUid as number
        };

        //过滤掉情况 2，3
        if (this._engine.entitiesContainer.isMainClientOrSubClient(con2))
            return;

        // if (this._engine.entitiesContainer.getRemoteUser(con2) != user)
        //     return;


        if (this._clientType == IrisClientType.kClientMian) {
            this._engine.entitiesContainer.removeMainClientTrackEventHandlerByRemoteUser(user, "all");
        }
        else {
            let connection: agorartc.RtcConnection = {
                channelId: this._client.channelName,
                localUid: this._client.uid as number
            };
            this._engine.entitiesContainer.removeSubClientTrackEventHandlerByRemoteUser(connection, user, "all");
        }
    }

    onEventUserPublished(user: IAgoraRTCRemoteUser, mediaType: "audio" | "video"): void {

        let con2: agorartc.RtcConnection = {
            channelId: this._client.channelName,
            localUid: user.uid as number
        };

        //过滤掉情况 2，3
        if (this._engine.entitiesContainer.isMainClientOrSubClient(con2))
            return;

        //这里有bug。 如果A(不订阅)， B（订阅先后加入频道）
        //那么A先捕获到C，并且不订阅
        //B加入频道好后就不能捕获C了。即使订阅也看不到人‘
        //我认为这个情况是可以接受的，用户不要这么干最好s
        //在情况1下。C触发了第二次发布流。但是此时的容器里存放的是前一个触发回调。所以自己不做处理了。
        // if (this._engine.entitiesContainer.getRemoteUser(con2) != user)
        //     return;

        let enableAudio: boolean = this._engine.globalVariables.enabledAudio;
        let enableVideo: boolean = this._engine.globalVariables.enabledVideo

        if (mediaType == 'audio' && enableAudio) {
            let autoSubscribeAudio: boolean = false;
            if (this._clientType == IrisClientType.kClientMian) {
                if (this._engine.mainClientVariables.autoSubscribeAudio == true)
                    autoSubscribeAudio = true;
            }
            else {
                let options = this._engine.subClientVariables.channelMediaOptions.getT(this._client.channelName, this._client.uid);
                if (options && options.autoSubscribeAudio == true) {
                    autoSubscribeAudio = true;
                }
            }

            if (autoSubscribeAudio) {
                this._client.subscribe(user, mediaType)
                    .then(() => {
                        console.log("onEventUserPublished subcribe audio success");
                        if (this._engine.globalVariables.playbackSignalVolumes.has(user.uid)) {
                            user.audioTrack.setVolume(this._engine.globalVariables.playbackSignalVolumes.get(user.uid));
                        }
                        else {
                            user.audioTrack.setVolume(this._engine.globalVariables.playbackSignalVolume);
                        }
                        user.audioTrack.play();

                        let param: IrisTrackEventHandlerParam = {
                            channelName: this._client.channelName,
                            client: this._client,
                            remoteUser: user,
                            track: user.audioTrack,
                            trackType: "IRemoteTrack",
                        };
                        let trackEventHandler = new IrisTrackEventHandler(param, this._engine);

                        if (this._clientType == IrisClientType.kClientMian) {
                            this._engine.entitiesContainer.addMainClientTrackEventHandler(trackEventHandler);
                        }
                        else {
                            let connection: agorartc.RtcConnection = {
                                channelId: this._client.channelName,
                                localUid: this._client.uid as number
                            };
                            this._engine.entitiesContainer.addSubClientTrackEventHandler(connection, trackEventHandler);
                        }
                    })
                    .catch(() => {
                        console.log("onEventUserPublished subcribe audio failed");
                    });
            }
        }
        else if (mediaType == 'video' && enableVideo) {
            //video
            let autoSubscribeVideo: boolean = false;
            if (this._clientType == IrisClientType.kClientMian) {
                if (this._engine.mainClientVariables.autoSubscribeVideo == true)
                    autoSubscribeVideo = true;
            }
            else {
                let options = this._engine.subClientVariables.channelMediaOptions.getT(this._client.channelName, this._client.uid);
                if (options && options.autoSubscribeVideo == true) {
                    autoSubscribeVideo = true;
                }
            }

            if (autoSubscribeVideo) {
                this._client.subscribe(user, mediaType)
                    .then(() => {
                        console.log("onEventUserPublished subcribe video success");
                        user.videoTrack.play(this._engine.generateVideoTrackLabelOrHtmlElement(this._client.channelName, user.uid as number, IrisVideoSourceType.kVideoSourceTypeRemote));

                        let param: IrisTrackEventHandlerParam = {
                            channelName: this._client.channelName,
                            client: this._client,
                            remoteUser: user,
                            track: user.videoTrack,
                            trackType: 'IRemoteVideoTrack',
                        };
                        let trackEventHandler = new IrisTrackEventHandler(param, this._engine);

                        if (this._clientType == IrisClientType.kClientMian) {
                            this._engine.entitiesContainer.addMainClientTrackEventHandler(trackEventHandler);
                        }
                        else {
                            let connection: agorartc.RtcConnection = {
                                channelId: this._client.channelName,
                                localUid: this._client.uid as number
                            };
                            this._engine.entitiesContainer.addSubClientTrackEventHandler(connection, trackEventHandler);
                        }
                    })
                    .catch(() => {
                        console.log("onEventUserPublished subcribe video failed");
                    })
            }
        }

    }

    onEventUserUnpublished(user: IAgoraRTCRemoteUser, mediaType: "audio" | "video"): void {

        let con2: agorartc.RtcConnection = {
            channelId: this._client.channelName,
            localUid: user.uid as number
        };

        //过滤掉情况 2，3
        if (this._engine.entitiesContainer.isMainClientOrSubClient(con2))
            return;


        //在情况1下。C触发了第二次发布流。但是此时的容器里存放的是前一个触发回调的user。所以自己不做处理了。
        // if (this._engine.entitiesContainer.getRemoteUser(con2) != user)
        //     return;

        if (this._clientType == IrisClientType.kClientMian) {
            this._engine.entitiesContainer.removeMainClientTrackEventHandlerByRemoteUser(user, mediaType);
        }
        else {
            let connection: agorartc.RtcConnection = {
                channelId: this._client.channelName,
                localUid: this._client.uid as number
            };
            this._engine.entitiesContainer.removeSubClientTrackEventHandlerByRemoteUser(connection, user, mediaType);
        }
    }

    onEventUserInfoUpdated(uid: UID, msg: "mute-audio" | "mute-video" | "enable-local-video" | "unmute-audio" | "unmute-video" | "disable-local-video"): void {
        let connection: agorartc.RtcConnection = {
            channelId: this._client.channelName,
            localUid: this._client.uid as number
        };
        let remoteUid = uid as number;

        switch (msg) {
            case 'mute-audio':
                this._engine.rtcEngineEventHandler.onUserMuteAudioEx(connection, remoteUid, true);
                this._engine.rtcEngineEventHandler.onUserStateChangedEx(connection, remoteUid, agorartc.REMOTE_USER_STATE.USER_STATE_MUTE_AUDIO);
                break;
            case 'mute-video':
                this._engine.rtcEngineEventHandler.onUserMuteVideoEx(connection, remoteUid, true);
                this._engine.rtcEngineEventHandler.onUserStateChangedEx(connection, remoteUid, agorartc.REMOTE_USER_STATE.USER_STATE_MUTE_VIDEO);

                break;
            case 'unmute-audio':
                this._engine.rtcEngineEventHandler.onUserMuteAudioEx(connection, remoteUid, false);
                break;
            case 'unmute-video':
                this._engine.rtcEngineEventHandler.onUserMuteVideoEx(connection, remoteUid, false);
                break;
            case 'enable-local-video':
                this._engine.rtcEngineEventHandler.onUserEnableLocalVideoEx(connection, remoteUid, true);
                this._engine.rtcEngineEventHandler.onUserStateChangedEx(connection, remoteUid, agorartc.REMOTE_USER_STATE.USER_STATE_ENABLE_LOCAL_VIDEO);
                break;
            case 'disable-local-video':
                this._engine.rtcEngineEventHandler.onUserEnableLocalVideoEx(connection, remoteUid, false);
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

    onEventStreamFallback(uid: UID, isFallbackOrRecover: "fallback" | "recover"): void {
        this._engine.rtcEngineEventHandler.onRemoteSubscribeFallbackToAudioOnly(uid as number, isFallbackOrRecover == 'fallback' ? true : false);
    }

    onEventChannelMediaRelayState(state: ChannelMediaRelayState, code: ChannelMediaRelayError): void {
        let state2 = AgoraTranslate.ChannelMediaRelayState2agorartcCHANNEL_MEDIA_RELAY_STATE(state);
        let code2 = AgoraTranslate.ChannelMediaRelayError2agorartcCHANNEL_MEDIA_RELAY_ERROR(code);
        this._engine.rtcEngineEventHandler.onChannelMediaRelayStateChanged(state2, code2);
    }

    onEventChannelMediaRelayEvent(event: ChannelMediaRelayEvent): void {
        let event2 = AgoraTranslate.ChannelMediaRelayEvent2agorartcCHANNEL_MEDIA_RELAY_EVENT(event);
        this._engine.rtcEngineEventHandler.onChannelMediaRelayEvent(event2);
    }

    onEventVolumeIndicator(result: { level: number; uid: UID; }[]): void {
        let connection: agorartc.RtcConnection = {
            channelId: this._client.channelName,
            localUid: this._client.uid as number
        };

        let speakers: agorartc.AudioVolumeInfo[] = [];
        for (let i = 0; i < result.length; i++) {
            speakers.push(AgoraTranslate.volumeIndicatorResult2agorartcAudioVolumeInfo(result[i]));
        }
        let speakerNumber = result.length;
        /* todo 
         * - In the local user's callback, `totalVolume` is the sum of the voice volume and audio-mixing volume
         * of the local user.
         * - In the remote users' callback, `totalVolume` is the sum of the voice volume and audio-mixing volume
         * of all the remote speakers.
        */
        let totalVolume = 0;
        this._engine.rtcEngineEventHandler.onAudioVolumeIndicationEx(connection, speakers, speakerNumber, totalVolume);
    }

    onEventCryptError(): void {
        let connection: agorartc.RtcConnection = {
            channelId: this._client.channelName,
            localUid: this._client.uid as number
        };
        let errorType: agorartc.ENCRYPTION_ERROR_TYPE = agorartc.ENCRYPTION_ERROR_TYPE.ENCRYPTION_ERROR_INTERNAL_FAILURE;
        this._engine.rtcEngineEventHandler.onEncryptionErrorEx(connection, errorType);
    }

    onEventTokenPrivilegeWillExpire(): void {
        let connection: agorartc.RtcConnection = {
            channelId: this._client.channelName,
            localUid: this._client.uid as number
        };

        let token: string = "";
        if (this._clientType == IrisClientType.kClientMian) {
            if (this._engine.mainClientVariables.token) {
                token = this._engine.mainClientVariables.token
            }
        }
        else {
            let options = this._engine.subClientVariables.channelMediaOptions.getT(this._client.channelName, this._client.uid);
            if (options && options.token) {
                token = options.token;
            }
        }
        this._engine.rtcEngineEventHandler.onTokenPrivilegeWillExpireEx(connection, token);
    }


    onEventTokenPrivilegeDidExpire(): void {
        let connection: agorartc.RtcConnection = {
            channelId: this._client.channelName,
            localUid: this._client.uid as number
        };
        this._engine.rtcEngineEventHandler.onRequestTokenEx(connection);
    }

    onEventNetworkQuality(stats: NetworkQuality): void {
        //不能对应 onNetworkQuality, 因为这里是得到自己的网络状况，而 onNetworkQuality 是别人的网络状况
        //暂时没有找到对应的回调
    }

    //todo 后边再做
    onEventLiveStreamingError(url: string, err: AgoraRTCError): void {


    }

    //todo 后边再做
    onEventLiveStreamingWarning(url: string, warning: AgoraRTCError): void {

    }


    onEventException(event: { code: number; msg: string; uid: UID; }): void {
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
        console.log("onEventPulishedUserList");
        console.log(users);
    }

    /*被外界主动调用的哦*/
    onJoinChannedlSucess(elapsed: number) {
        let connection: agorartc.RtcConnection = {
            channelId: this._client.channelName,
            localUid: this._client.uid as number
        };
        this._engine.rtcEngineEventHandler.onJoinChannelSuccessEx(connection, elapsed);
    }

    //这里需要传入connection ，而不是自己内部生成，是因为这个时候已经leaveChannel，可能已经没有channelName和uid了
    onLeaveChannel(connection: agorartc.RtcConnection, stats: agorartc.RtcStats) {
        this._engine.rtcEngineEventHandler.onLeaveChannelEx(connection, stats);
    }

    onEventContentInspectConnectionStateChange(preState: InspectState, newState: InspectState): void {
        //没有合适的回调
    }

    onEventContentInspectError(error?: AgoraRTCError): void {
        this._engine.rtcEngineEventHandler.onError(-agorartc.ERROR_CODE_TYPE.ERR_FAILED, error?.message || "Content Inspect Error");
    }

    onEventContentInspectResult(data?: "porn" | "sexy" | "neutral", error?: AgoraRTCError) {
        if (data) {
            let result = AgoraTranslate.data2agorartcCONTENT_INSPECT_RESULT(data);
            this._engine.rtcEngineEventHandler.onContentInspectResult(result);
        }
    }

    destruction() {
        this._client.removeAllListeners();
    }
}