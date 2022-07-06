import { IAgoraRTCClient, ConnectionState, ConnectionDisconnectedReason, IAgoraRTCRemoteUser, UID, RemoteStreamType, ChannelMediaRelayState, ChannelMediaRelayError, ChannelMediaRelayEvent, NetworkQuality } from "agora-rtc-sdk-ng";
import { AgoraRtcEr }
import { IrisRtcEngine } from "./IrisRtcEngine";

export class IrisClientCallerHandler {

    private _client: IAgoraRTCClient;
    private _engine: IrisRtcEngine;

    constructor(client: IAgoraRTCClient, engine: IrisRtcEngine) {
        this._client = client;
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
    }

    onEventConnectionStateChange(curState: ConnectionState, revState: ConnectionState, reason?: ConnectionDisconnectedReason): void;
    onEventUserJoined(user: IAgoraRTCRemoteUser): void;
    onEventUserLeft(user: IAgoraRTCRemoteUser, reason: string): void;
    onEventUserPublished(user: IAgoraRTCRemoteUser, mediaType: "audio" | "video"): void;
    onEventUserUnpublished(user: IAgoraRTCRemoteUser, mediaType: "audio" | "video"): void;
    onEventUserInfoUpdated(uid: UID, msg: "mute-audio" | "mute-video" | "enable-local-video" | "unmute-audio" | "unmute-video" | "disable-local-video"): void;
    onEventMediaReconnectStart(uid: UID): void;
    onEventMediaReconnectEnd(uid: UID): void;
    onEventStreamTypeChanged(uid: UID, streamType: RemoteStreamType): void;
    onEventStreamFallback(uid: UID, isFallbackOrRecover: "fallback" | "recover"): void;
    onEventChannelMediaRelayState(state: ChannelMediaRelayState, code: ChannelMediaRelayError): void;
    onEventChannelMediaRelayEvent(event: ChannelMediaRelayEvent): void;
    onEventVolumeIndicator(result: { level: number; uid: UID; }[]): void;
    onEventCryptError(): void;
    onEventTokenPrivilegeWillExpire(): void;
    onEventTokenPrivilegeDidExpire(): void;
    onEventNetworkQuality(stats: NetworkQuality): void;
    onEventLiveStreamingError(url: string, err: AgoraRTCError): void;
    onEventLiveStreamingWarning(url: string, warning: AgoraRTCError): void;
    onEventException(event: { code: number; msg: string; uid: UID; }): void;
    onEventIsUsingCloudProxy(isUsingProxy: boolean): void;
    onEventJoinFallbackToProxy(proxyServer: string): void;
    onEventPublishedUserList(users: IAgoraRTCRemoteUser): void;


    release() {
        this._client.removeAllListeners();
    }


}