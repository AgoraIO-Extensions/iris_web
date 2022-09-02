import * as agorartc from './rtc_types/Index';
import { IrisRtcEngine } from "../engine/IrisRtcEngine";

export class RtcEngineEventHandler {

    _engine: IrisRtcEngine = null;

    constructor(engine: IrisRtcEngine) {
        this._engine = engine;
    }

    //IRtcEngineEventHandler
    eventHandlerType(): string {
        return "IRtcEngineEventHandlerEx";
    };

    onJoinChannelSuccess(channel: string, uid: agorartc.uid_t, elapsed: number): void {
        let obj = {
            channel,
            uid,
            elapsed,
        };
        let json = JSON.stringify(obj);
        let key = 'onJoinChannelSuccess';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onRejoinChannelSuccess(channel: string, uid: agorartc.uid_t, elapsed: number): void {
        let obj = {
            channel,
            uid,
            elapsed,
        };
        let json = JSON.stringify(obj);
        let key = 'onRejoinChannelSuccess';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onProxyConnected(channel: string, uid: agorartc.uid_t, proxyType: agorartc.PROXY_TYPE, localProxyIp: string, elapsed: number): void {
        let obj = {
            channel,
            uid,
            proxyType,
            localProxyIp,
            elapsed,
        };
        let json = JSON.stringify(obj);
        let key = 'onProxyConnected';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onWarning(warn: number, msg: string) {
        let obj = {
            warn,
            msg,
        };
        let json = JSON.stringify(obj);
        let key = 'onWarning';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    }

    onError(err: number, msg: string): void {
        let obj = {
            err,
            msg,
        };
        let json = JSON.stringify(obj);
        let key = 'onError';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onAudioQuality(uid: agorartc.uid_t, quality: number, delay: number, lost: number): void {
        let obj = {
            uid,
            quality,
            delay,
            lost,
        };
        let json = JSON.stringify(obj);
        let key = 'onAudioQuality';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onLastmileProbeResult(result: agorartc.LastmileProbeResult): void {
        let obj = {
            result,
        };
        let json = JSON.stringify(obj);
        let key = 'onLastmileProbeResult';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onAudioVolumeIndication(speakers: agorartc.AudioVolumeInfo[], speakerNumber: number, totalVolume: number): void {
        let obj = {
            speakers,
            speakerNumber,
            totalVolume,
        };
        let json = JSON.stringify(obj);
        let key = 'onAudioVolumeIndication';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onLeaveChannel(stats: agorartc.RtcStats): void {
        let obj = {
            stats,
        };
        let json = JSON.stringify(obj);
        let key = 'onLeaveChannel';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onRtcStats(stats: agorartc.RtcStats): void {
        let obj = {
            stats,
        };
        let json = JSON.stringify(obj);
        let key = 'onRtcStats';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onAudioDeviceStateChanged(deviceId: string, deviceType: number, deviceState: number): void {
        let obj = {
            deviceId,
            deviceType,
            deviceState,
        };
        let json = JSON.stringify(obj);
        let key = 'onAudioDeviceStateChanged';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onAudioMixingFinished(): void {
        let obj = {

        };
        let json = JSON.stringify(obj);
        let key = 'onAudioMixingFinished';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onAudioEffectFinished(soundId: number): void {
        let obj = {
            soundId,
        };
        let json = JSON.stringify(obj);
        let key = 'onAudioEffectFinished';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onVideoDeviceStateChanged(deviceId: string, deviceType: number, deviceState: number): void {
        let obj = {
            deviceId,
            deviceType,
            deviceState,
        };
        let json = JSON.stringify(obj);
        let key = 'onVideoDeviceStateChanged';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onMediaDeviceChanged(deviceType: number): void {
        let obj = {
            deviceType,
        };
        let json = JSON.stringify(obj);
        let key = 'onMediaDeviceChanged';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onNetworkQuality(uid: agorartc.uid_t, txQuality: number, rxQuality: number): void {
        let obj = {
            uid,
            txQuality,
            rxQuality,
        };
        let json = JSON.stringify(obj);
        let key = 'onNetworkQuality';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onIntraRequestReceived(): void {
        let obj = {

        };
        let json = JSON.stringify(obj);
        let key = 'onIntraRequestReceived';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onUplinkNetworkInfoUpdated(info: agorartc.UplinkNetworkInfo): void {
        let obj = {
            info,
        };
        let json = JSON.stringify(obj);
        let key = 'onUplinkNetworkInfoUpdated';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onDownlinkNetworkInfoUpdated(info: agorartc.DownlinkNetworkInfo): void {
        let obj = {
            info,
        };
        let json = JSON.stringify(obj);
        let key = 'onDownlinkNetworkInfoUpdated';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onLastmileQuality(quality: number): void {
        let obj = {
            quality,
        };
        let json = JSON.stringify(obj);
        let key = 'onLastmileQuality';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onFirstLocalVideoFrame(width: number, height: number, elapsed: number): void {
        let obj = {
            width,
            height,
            elapsed,
        };
        let json = JSON.stringify(obj);
        let key = 'onFirstLocalVideoFrame';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onFirstLocalVideoFramePublished(elapsed: number): void {
        let obj = {
            elapsed,
        };
        let json = JSON.stringify(obj);
        let key = 'onFirstLocalVideoFramePublished';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onVideoSourceFrameSizeChanged(sourceType: agorartc.VIDEO_SOURCE_TYPE, width: number, height: number): void {
        let obj = {
            sourceType,
            width,
            height,
        };
        let json = JSON.stringify(obj);
        let key = 'onVideoSourceFrameSizeChanged';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onFirstRemoteVideoDecoded(uid: agorartc.uid_t, width: number, height: number, elapsed: number): void {
        let obj = {
            uid,
            width,
            height,
            elapsed,
        };
        let json = JSON.stringify(obj);
        let key = 'onFirstRemoteVideoDecoded';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onVideoSizeChanged(uid: agorartc.uid_t, width: number, height: number, rotation: number): void {
        let obj = {
            uid,
            width,
            height,
            rotation,
        };
        let json = JSON.stringify(obj);
        let key = 'onVideoSizeChanged';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onLocalVideoStateChanged(state: agorartc.LOCAL_VIDEO_STREAM_STATE, error: agorartc.LOCAL_VIDEO_STREAM_ERROR): void {
        let obj = {
            state,
            error,
        };
        let json = JSON.stringify(obj);
        let key = 'onLocalVideoStateChanged';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onRemoteVideoStateChanged(uid: agorartc.uid_t, state: agorartc.REMOTE_VIDEO_STATE, reason: agorartc.REMOTE_VIDEO_STATE_REASON, elapsed: number): void {
        let obj = {
            uid,
            state,
            reason,
            elapsed,
        };
        let json = JSON.stringify(obj);
        let key = 'onRemoteVideoStateChanged';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onFirstRemoteVideoFrame(userId: agorartc.uid_t, width: number, height: number, elapsed: number): void {
        let obj = {
            userId,
            width,
            height,
            elapsed,
        };
        let json = JSON.stringify(obj);
        let key = 'onFirstRemoteVideoFrame';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onUserJoined(uid: agorartc.uid_t, elapsed: number): void {
        let obj = {
            uid,
            elapsed,
        };
        let json = JSON.stringify(obj);
        let key = 'onUserJoined';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onUserOffline(uid: agorartc.uid_t, reason: agorartc.USER_OFFLINE_REASON_TYPE): void {
        let obj = {
            uid,
            reason,
        };
        let json = JSON.stringify(obj);
        let key = 'onUserOffline';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onUserMuteAudio(uid: agorartc.uid_t, muted: boolean): void {
        let obj = {
            uid,
            muted,
        };
        let json = JSON.stringify(obj);
        let key = 'onUserMuteAudio';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onUserMuteVideo(userId: agorartc.uid_t, muted: boolean): void {
        let obj = {
            userId,
            muted,
        };
        let json = JSON.stringify(obj);
        let key = 'onUserMuteVideo';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onUserEnableVideo(uid: agorartc.uid_t, enabled: boolean): void {
        let obj = {
            uid,
            enabled,
        };
        let json = JSON.stringify(obj);
        let key = 'onUserEnableVideo';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onUserStateChanged(uid: agorartc.uid_t, state: number): void {
        let obj = {
            uid,
            state,
        };
        let json = JSON.stringify(obj);
        let key = 'onUserStateChanged';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onUserEnableLocalVideo(uid: agorartc.uid_t, enabled: boolean): void {
        let obj = {
            uid,
            enabled,
        };
        let json = JSON.stringify(obj);
        let key = 'onUserEnableLocalVideo';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onApiCallExecuted(err: number, api: string, result: string): void {
        let obj = {
            err,
            api,
            result,
        };
        let json = JSON.stringify(obj);
        let key = 'onApiCallExecuted';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onLocalAudioStats(stats: agorartc.LocalAudioStats): void {
        let obj = {
            stats,
        };
        let json = JSON.stringify(obj);
        let key = 'onLocalAudioStats';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onRemoteAudioStats(stats: agorartc.RemoteAudioStats): void {
        let obj = {
            stats,
        };
        let json = JSON.stringify(obj);
        let key = 'onRemoteAudioStats';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onLocalVideoStats(stats: agorartc.LocalVideoStats): void {
        let obj = {
            stats,
        };
        let json = JSON.stringify(obj);
        let key = 'onLocalVideoStats';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onRemoteVideoStats(stats: agorartc.RemoteVideoStats): void {
        let obj = {
            stats,
        };
        let json = JSON.stringify(obj);
        let key = 'onRemoteVideoStats';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onCameraReady(): void {
        let obj = {

        };
        let json = JSON.stringify(obj);
        let key = 'onCameraReady';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onCameraFocusAreaChanged(x: number, y: number, width: number, height: number): void {
        let obj = {
            x,
            y,
            width,
            height,
        };
        let json = JSON.stringify(obj);
        let key = 'onCameraFocusAreaChanged';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onCameraExposureAreaChanged(x: number, y: number, width: number, height: number): void {
        let obj = {
            x,
            y,
            width,
            height,
        };
        let json = JSON.stringify(obj);
        let key = 'onCameraExposureAreaChanged';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onFacePositionChanged(imageWidth: number, imageHeight: number, vecRectangle: agorartc.Rectangle[], vecDistance: number, numFaces: number): void {
        let obj = {
            imageWidth,
            imageHeight,
            vecRectangle,
            vecDistance,
            numFaces,
        };
        let json = JSON.stringify(obj);
        let key = 'onFacePositionChanged';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onVideoStopped(): void {
        let obj = {

        };
        let json = JSON.stringify(obj);
        let key = 'onVideoStopped';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onAudioMixingStateChanged(state: agorartc.AUDIO_MIXING_STATE_TYPE, reason: agorartc.AUDIO_MIXING_REASON_TYPE): void {
        let obj = {
            state,
            reason,
        };
        let json = JSON.stringify(obj);
        let key = 'onAudioMixingStateChanged';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onRhythmPlayerStateChanged(state: agorartc.RHYTHM_PLAYER_STATE_TYPE, errorCode: agorartc.RHYTHM_PLAYER_ERROR_TYPE): void {
        let obj = {
            state,
            errorCode,
        };
        let json = JSON.stringify(obj);
        let key = 'onRhythmPlayerStateChanged';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onConnectionLost(): void {
        let obj = {

        };
        let json = JSON.stringify(obj);
        let key = 'onConnectionLost';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onConnectionInterrupted(): void {
        let obj = {

        };
        let json = JSON.stringify(obj);
        let key = 'onConnectionInterrupted';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onConnectionBanned(): void {
        let obj = {

        };
        let json = JSON.stringify(obj);
        let key = 'onConnectionBanned';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onStreamMessage(userId: agorartc.uid_t, streamId: number, data: string, length: number, sentTs: number): void {
        let obj = {
            userId,
            streamId,
            data,
            length,
            sentTs,
        };
        let json = JSON.stringify(obj);
        let key = 'onStreamMessage';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onStreamMessageError(userId: agorartc.uid_t, streamId: number, code: number, missed: number, cached: number): void {
        let obj = {
            userId,
            streamId,
            code,
            missed,
            cached,
        };
        let json = JSON.stringify(obj);
        let key = 'onStreamMessageError';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onRequestToken(): void {
        let obj = {

        };
        let json = JSON.stringify(obj);
        let key = 'onRequestToken';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onTokenPrivilegeWillExpire(token: string): void {
        let obj = {
            token,
        };
        let json = JSON.stringify(obj);
        let key = 'onTokenPrivilegeWillExpire';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onFirstLocalAudioFramePublished(elapsed: number): void {
        let obj = {
            elapsed,
        };
        let json = JSON.stringify(obj);
        let key = 'onFirstLocalAudioFramePublished';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onFirstRemoteAudioFrame(uid: agorartc.uid_t, elapsed: number): void {
        let obj = {
            uid,
            elapsed,
        };
        let json = JSON.stringify(obj);
        let key = 'onFirstRemoteAudioFrame';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onFirstRemoteAudioDecoded(uid: agorartc.uid_t, elapsed: number): void {
        let obj = {
            uid,
            elapsed,
        };
        let json = JSON.stringify(obj);
        let key = 'onFirstRemoteAudioDecoded';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onLocalAudioStateChanged(state: agorartc.LOCAL_AUDIO_STREAM_STATE, error: agorartc.LOCAL_AUDIO_STREAM_ERROR): void {
        let obj = {
            state,
            error,
        };
        let json = JSON.stringify(obj);
        let key = 'onLocalAudioStateChanged';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onRemoteAudioStateChanged(uid: agorartc.uid_t, state: agorartc.REMOTE_AUDIO_STATE, reason: agorartc.REMOTE_AUDIO_STATE_REASON, elapsed: number): void {
        let obj = {
            uid,
            state,
            reason,
            elapsed,
        };
        let json = JSON.stringify(obj);
        let key = 'onRemoteAudioStateChanged';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onActiveSpeaker(userId: agorartc.uid_t): void {
        let obj = {
            userId,
        };
        let json = JSON.stringify(obj);
        let key = 'onActiveSpeaker';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onContentInspectResult(result: agorartc.CONTENT_INSPECT_RESULT): void {
        let obj = {
            result,
        };
        let json = JSON.stringify(obj);
        let key = 'onContentInspectResult';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onSnapshotTaken(channel: string, uid: agorartc.uid_t, filePath: string, width: number, height: number, errCode: number): void {
        let obj = {
            channel,
            uid,
            filePath,
            width,
            height,
            errCode,
        };
        let json = JSON.stringify(obj);
        let key = 'onSnapshotTaken';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onClientRoleChanged(oldRole: agorartc.CLIENT_ROLE_TYPE, newRole: agorartc.CLIENT_ROLE_TYPE): void {
        let obj = {
            oldRole,
            newRole,
        };
        let json = JSON.stringify(obj);
        let key = 'onClientRoleChanged';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onClientRoleChangeFailed(reason: agorartc.CLIENT_ROLE_CHANGE_FAILED_REASON, currentRole: agorartc.CLIENT_ROLE_TYPE): void {
        let obj = {
            reason,
            currentRole,
        };
        let json = JSON.stringify(obj);
        let key = 'onClientRoleChangeFailed';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onAudioDeviceVolumeChanged(deviceType: agorartc.MEDIA_DEVICE_TYPE, volume: number, muted: boolean): void {
        let obj = {
            deviceType,
            volume,
            muted,
        };
        let json = JSON.stringify(obj);
        let key = 'onAudioDeviceVolumeChanged';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onRtmpStreamingStateChanged(url: string, state: agorartc.RTMP_STREAM_PUBLISH_STATE, errCode: agorartc.RTMP_STREAM_PUBLISH_ERROR_TYPE): void {
        let obj = {
            url,
            state,
            errCode,
        };
        let json = JSON.stringify(obj);
        let key = 'onRtmpStreamingStateChanged';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onRtmpStreamingEvent(url: string, eventCode: agorartc.RTMP_STREAMING_EVENT): void {
        let obj = {
            url,
            eventCode,
        };
        let json = JSON.stringify(obj);
        let key = 'onRtmpStreamingEvent';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onTranscodingUpdated(): void {
        let obj = {

        };
        let json = JSON.stringify(obj);
        let key = 'onTranscodingUpdated';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onAudioRoutingChanged(routing: number): void {
        let obj = {
            routing,
        };
        let json = JSON.stringify(obj);
        let key = 'onAudioRoutingChanged';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onChannelMediaRelayStateChanged(state: number, code: number): void {
        let obj = {
            state,
            code,
        };
        let json = JSON.stringify(obj);
        let key = 'onChannelMediaRelayStateChanged';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onChannelMediaRelayEvent(code: number): void {
        let obj = {
            code,
        };
        let json = JSON.stringify(obj);
        let key = 'onChannelMediaRelayEvent';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onLocalPublishFallbackToAudioOnly(isFallbackOrRecover: boolean): void {
        let obj = {
            isFallbackOrRecover,
        };
        let json = JSON.stringify(obj);
        let key = 'onLocalPublishFallbackToAudioOnly';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onRemoteSubscribeFallbackToAudioOnly(uid: agorartc.uid_t, isFallbackOrRecover: boolean): void {
        let obj = {
            uid,
            isFallbackOrRecover,
        };
        let json = JSON.stringify(obj);
        let key = 'onRemoteSubscribeFallbackToAudioOnly';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onRemoteAudioTransportStats(uid: agorartc.uid_t, delay: number, lost: number, rxKBitRate: number): void {
        let obj = {
            uid,
            delay,
            lost,
            rxKBitRate,
        };
        let json = JSON.stringify(obj);
        let key = 'onRemoteAudioTransportStats';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onRemoteVideoTransportStats(uid: agorartc.uid_t, delay: number, lost: number, rxKBitRate: number): void {
        let obj = {
            uid,
            delay,
            lost,
            rxKBitRate,
        };
        let json = JSON.stringify(obj);
        let key = 'onRemoteVideoTransportStats';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onConnectionStateChanged(state: agorartc.CONNECTION_STATE_TYPE, reason: agorartc.CONNECTION_CHANGED_REASON_TYPE): void {
        let obj = {
            state,
            reason,
        };
        let json = JSON.stringify(obj);
        let key = 'onConnectionStateChanged';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onWlAccMessage(reason: agorartc.WLACC_MESSAGE_REASON, action: agorartc.WLACC_SUGGEST_ACTION, wlAccMsg: string): void {
        let obj = {
            reason,
            action,
            wlAccMsg,
        };
        let json = JSON.stringify(obj);
        let key = 'onWlAccMessage';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onWlAccStats(currentStats: agorartc.WlAccStats, averageStats: agorartc.WlAccStats): void {
        let obj = {
            currentStats,
            averageStats,
        };
        let json = JSON.stringify(obj);
        let key = 'onWlAccStats';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onNetworkTypeChanged(type: agorartc.NETWORK_TYPE): void {
        let obj = {
            type,
        };
        let json = JSON.stringify(obj);
        let key = 'onNetworkTypeChanged';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onEncryptionError(errorType: agorartc.ENCRYPTION_ERROR_TYPE): void {
        let obj = {
            errorType,
        };
        let json = JSON.stringify(obj);
        let key = 'onEncryptionError';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onPermissionError(permissionType: agorartc.PERMISSION_TYPE): void {
        let obj = {
            permissionType,
        };
        let json = JSON.stringify(obj);
        let key = 'onPermissionError';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onLocalUserRegistered(uid: agorartc.uid_t, userAccount: string): void {
        let obj = {
            uid,
            userAccount,
        };
        let json = JSON.stringify(obj);
        let key = 'onLocalUserRegistered';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onUserInfoUpdated(uid: agorartc.uid_t, info: agorartc.UserInfo): void {
        let obj = {
            uid,
            info,
        };
        let json = JSON.stringify(obj);
        let key = 'onUserInfoUpdated';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onUploadLogResult(requestId: string, success: boolean, reason: agorartc.UPLOAD_ERROR_REASON): void {
        let obj = {
            requestId,
            success,
            reason,
        };
        let json = JSON.stringify(obj);
        let key = 'onUploadLogResult';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onAudioSubscribeStateChanged(channel: string, uid: agorartc.uid_t, oldState: agorartc.STREAM_SUBSCRIBE_STATE, newState: agorartc.STREAM_SUBSCRIBE_STATE, elapseSinceLastState: number): void {
        let obj = {
            channel,
            uid,
            oldState,
            newState,
            elapseSinceLastState,
        };
        let json = JSON.stringify(obj);
        let key = 'onAudioSubscribeStateChanged';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onVideoSubscribeStateChanged(channel: string, uid: agorartc.uid_t, oldState: agorartc.STREAM_SUBSCRIBE_STATE, newState: agorartc.STREAM_SUBSCRIBE_STATE, elapseSinceLastState: number): void {
        let obj = {
            channel,
            uid,
            oldState,
            newState,
            elapseSinceLastState,
        };
        let json = JSON.stringify(obj);
        let key = 'onVideoSubscribeStateChanged';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onAudioPublishStateChanged(channel: string, oldState: agorartc.STREAM_PUBLISH_STATE, newState: agorartc.STREAM_PUBLISH_STATE, elapseSinceLastState: number): void {
        let obj = {
            channel,
            oldState,
            newState,
            elapseSinceLastState,
        };
        let json = JSON.stringify(obj);
        let key = 'onAudioPublishStateChanged';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onVideoPublishStateChanged(channel: string, oldState: agorartc.STREAM_PUBLISH_STATE, newState: agorartc.STREAM_PUBLISH_STATE, elapseSinceLastState: number): void {
        let obj = {
            channel,
            oldState,
            newState,
            elapseSinceLastState,
        };
        let json = JSON.stringify(obj);
        let key = 'onVideoPublishStateChanged';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onExtensionEvent(provider: string, extension: string, key: string, value: string): void {
        let obj = {
            provider,
            extension,
            key,
            value,
        };
        let json = JSON.stringify(obj);
        let key2 = 'onExtensionEvent';
        this._engine.getEventHandler()?.onEvent(key2, json, null, null, 0);
    };

    onExtensionStarted(provider: string, extension: string): void {
        let obj = {
            provider,
            extension,
        };
        let json = JSON.stringify(obj);
        let key = 'onExtensionStarted';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onExtensionStopped(provider: string, extension: string): void {
        let obj = {
            provider,
            extension,
        };
        let json = JSON.stringify(obj);
        let key = 'onExtensionStopped';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onExtensionError(provider: string, extension: string, error: number, message: string): void {
        let obj = {
            provider,
            extension,
            error,
            message,
        };
        let json = JSON.stringify(obj);
        let key = 'onExtensionError';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onUserAccountUpdated(uid: agorartc.uid_t, userAccount: string): void {
        let obj = {
            uid,
            userAccount,
        };
        let json = JSON.stringify(obj);
        let key = 'onUserAccountUpdated';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };


    //IRtcEngineEventHandlerEx
    // eventHandlerTypeEx(): string {
    //     let obj = {

    //     };
    //     let json = JSON.stringify(obj);
    //     let key = 'eventHandlerTypeEx';
    //     this._engine.getEventHandler()?.OnEvent(key, json, null, null, 0);
    // };

    onJoinChannelSuccessEx(connection: agorartc.RtcConnection, elapsed: number): void {
        let obj = {
            connection,
            elapsed,
        };
        let json = JSON.stringify(obj);
        let key = 'onJoinChannelSuccessEx';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onRejoinChannelSuccessEx(connection: agorartc.RtcConnection, elapsed: number): void {
        let obj = {
            connection,
            elapsed,
        };
        let json = JSON.stringify(obj);
        let key = 'onRejoinChannelSuccessEx';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onAudioQualityEx(connection: agorartc.RtcConnection, remoteUid: agorartc.uid_t, quality: number, delay: number, lost: number): void {
        let obj = {
            connection,
            remoteUid,
            quality,
            delay,
            lost,
        };
        let json = JSON.stringify(obj);
        let key = 'onAudioQualityEx';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onAudioVolumeIndicationEx(connection: agorartc.RtcConnection, speakers: agorartc.AudioVolumeInfo[], speakerNumber: number, totalVolume: number): void {
        let obj = {
            connection,
            speakers,
            speakerNumber,
            totalVolume,
        };
        let json = JSON.stringify(obj);
        let key = 'onAudioVolumeIndicationEx';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onLeaveChannelEx(connection: agorartc.RtcConnection, stats: agorartc.RtcStats): void {
        let obj = {
            connection,
            stats,
        };
        let json = JSON.stringify(obj);
        let key = 'onLeaveChannelEx';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onRtcStatsEx(connection: agorartc.RtcConnection, stats: agorartc.RtcStats): void {
        let obj = {
            connection,
            stats,
        };
        let json = JSON.stringify(obj);
        let key = 'onRtcStatsEx';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onNetworkQualityEx(connection: agorartc.RtcConnection, remoteUid: agorartc.uid_t, txQuality: number, rxQuality: number): void {
        let obj = {
            connection,
            remoteUid,
            txQuality,
            rxQuality,
        };
        let json = JSON.stringify(obj);
        let key = 'onNetworkQualityEx';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onIntraRequestReceivedEx(connection: agorartc.RtcConnection): void {
        let obj = {
            connection,
        };
        let json = JSON.stringify(obj);
        let key = 'onIntraRequestReceivedEx';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onFirstLocalVideoFrameEx(connection: agorartc.RtcConnection, width: number, height: number, elapsed: number): void {
        let obj = {
            connection,
            width,
            height,
            elapsed,
        };
        let json = JSON.stringify(obj);
        let key = 'onFirstLocalVideoFrameEx';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onFirstLocalVideoFramePublishedEx(connection: agorartc.RtcConnection, elapsed: number): void {
        let obj = {
            connection,
            elapsed,
        };
        let json = JSON.stringify(obj);
        let key = 'onFirstLocalVideoFramePublishedEx';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onVideoSourceFrameSizeChangedEx(connection: agorartc.RtcConnection, sourceType: agorartc.VIDEO_SOURCE_TYPE, width: number, height: number): void {
        let obj = {
            connection,
            sourceType,
            width,
            height,
        };
        let json = JSON.stringify(obj);
        let key = 'onVideoSourceFrameSizeChangedEx';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onFirstRemoteVideoDecodedEx(connection: agorartc.RtcConnection, remoteUid: agorartc.uid_t, width: number, height: number, elapsed: number): void {
        let obj = {
            connection,
            remoteUid,
            width,
            height,
            elapsed,
        };
        let json = JSON.stringify(obj);
        let key = 'onFirstRemoteVideoDecodedEx';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onVideoSizeChangedEx(connection: agorartc.RtcConnection, uid: agorartc.uid_t, width: number, height: number, rotation: number): void {
        let obj = {
            connection,
            uid,
            width,
            height,
            rotation,
        };
        let json = JSON.stringify(obj);
        let key = 'onVideoSizeChangedEx';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onLocalVideoStateChangedEx(connection: agorartc.RtcConnection, state: agorartc.LOCAL_VIDEO_STREAM_STATE, errorCode: agorartc.LOCAL_VIDEO_STREAM_ERROR): void {
        let obj = {
            connection,
            state,
            errorCode,
        };
        let json = JSON.stringify(obj);
        let key = 'onLocalVideoStateChangedEx';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onRemoteVideoStateChangedEx(connection: agorartc.RtcConnection, remoteUid: agorartc.uid_t, state: agorartc.REMOTE_VIDEO_STATE, reason: agorartc.REMOTE_VIDEO_STATE_REASON, elapsed: number): void {
        let obj = {
            connection,
            remoteUid,
            state,
            reason,
            elapsed,
        };
        let json = JSON.stringify(obj);
        let key = 'onRemoteVideoStateChangedEx';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onFirstRemoteVideoFrameEx(connection: agorartc.RtcConnection, remoteUid: agorartc.uid_t, width: number, height: number, elapsed: number): void {
        let obj = {
            connection,
            remoteUid,
            width,
            height,
            elapsed,
        };
        let json = JSON.stringify(obj);
        let key = 'onFirstRemoteVideoFrameEx';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onUserJoinedEx(connection: agorartc.RtcConnection, remoteUid: agorartc.uid_t, elapsed: number): void {
        let obj = {
            connection,
            remoteUid,
            elapsed,
        };
        let json = JSON.stringify(obj);
        let key = 'onUserJoinedEx';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onUserOfflineEx(connection: agorartc.RtcConnection, remoteUid: agorartc.uid_t, reason: agorartc.USER_OFFLINE_REASON_TYPE): void {
        let obj = {
            connection,
            remoteUid,
            reason,
        };
        let json = JSON.stringify(obj);
        let key = 'onUserOfflineEx';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onUserMuteAudioEx(connection: agorartc.RtcConnection, remoteUid: agorartc.uid_t, muted: boolean): void {
        let obj = {
            connection,
            remoteUid,
            muted,
        };
        let json = JSON.stringify(obj);
        let key = 'onUserMuteAudioEx';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onUserMuteVideoEx(connection: agorartc.RtcConnection, remoteUid: agorartc.uid_t, muted: boolean): void {
        let obj = {
            connection,
            remoteUid,
            muted,
        };
        let json = JSON.stringify(obj);
        let key = 'onUserMuteVideoEx';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onUserEnableVideoEx(connection: agorartc.RtcConnection, remoteUid: agorartc.uid_t, enabled: boolean): void {
        let obj = {
            connection,
            remoteUid,
            enabled,
        };
        let json = JSON.stringify(obj);
        let key = 'onUserEnableVideoEx';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onUserEnableLocalVideoEx(connection: agorartc.RtcConnection, remoteUid: agorartc.uid_t, enabled: boolean): void {
        let obj = {
            connection,
            remoteUid,
            enabled,
        };
        let json = JSON.stringify(obj);
        let key = 'onUserEnableLocalVideoEx';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onUserStateChangedEx(connection: agorartc.RtcConnection, remoteUid: agorartc.uid_t, state: number): void {
        let obj = {
            connection,
            remoteUid,
            state,
        };
        let json = JSON.stringify(obj);
        let key = 'onUserStateChangedEx';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onLocalAudioStatsEx(connection: agorartc.RtcConnection, stats: agorartc.LocalAudioStats): void {
        let obj = {
            connection,
            stats,
        };
        let json = JSON.stringify(obj);
        let key = 'onLocalAudioStatsEx';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onRemoteAudioStatsEx(connection: agorartc.RtcConnection, stats: agorartc.RemoteAudioStats): void {
        let obj = {
            connection,
            stats,
        };
        let json = JSON.stringify(obj);
        let key = 'onRemoteAudioStatsEx';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onLocalVideoStatsEx(connection: agorartc.RtcConnection, stats: agorartc.LocalVideoStats): void {
        let obj = {
            connection,
            stats,
        };
        let json = JSON.stringify(obj);
        let key = 'onLocalVideoStatsEx';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onRemoteVideoStatsEx(connection: agorartc.RtcConnection, stats: agorartc.RemoteVideoStats): void {
        let obj = {
            connection,
            stats,
        };
        let json = JSON.stringify(obj);
        let key = 'onRemoteVideoStatsEx';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onConnectionLostEx(connection: agorartc.RtcConnection): void {
        let obj = {
            connection,
        };
        let json = JSON.stringify(obj);
        let key = 'onConnectionLostEx';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onConnectionInterruptedEx(connection: agorartc.RtcConnection): void {
        let obj = {
            connection,
        };
        let json = JSON.stringify(obj);
        let key = 'onConnectionInterruptedEx';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onConnectionBannedEx(connection: agorartc.RtcConnection): void {
        let obj = {
            connection,
        };
        let json = JSON.stringify(obj);
        let key = 'onConnectionBannedEx';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onStreamMessageEx(connection: agorartc.RtcConnection, remoteUid: agorartc.uid_t, streamId: number, data: string, length: number, sentTs: number): void {
        let obj = {
            connection,
            remoteUid,
            streamId,
            data,
            length,
            sentTs,
        };
        let json = JSON.stringify(obj);
        let key = 'onStreamMessageEx';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onStreamMessageErrorEx(connection: agorartc.RtcConnection, remoteUid: agorartc.uid_t, streamId: number, code: number, missed: number, cached: number): void {
        let obj = {
            connection,
            remoteUid,
            streamId,
            code,
            missed,
            cached,
        };
        let json = JSON.stringify(obj);
        let key = 'onStreamMessageErrorEx';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onRequestTokenEx(connection: agorartc.RtcConnection): void {
        let obj = {
            connection,
        };
        let json = JSON.stringify(obj);
        let key = 'onRequestTokenEx';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onTokenPrivilegeWillExpireEx(connection: agorartc.RtcConnection, token: string): void {
        let obj = {
            connection,
            token,
        };
        let json = JSON.stringify(obj);
        let key = 'onTokenPrivilegeWillExpireEx';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onFirstLocalAudioFramePublishedEx(connection: agorartc.RtcConnection, elapsed: number): void {
        let obj = {
            connection,
            elapsed,
        };
        let json = JSON.stringify(obj);
        let key = 'onFirstLocalAudioFramePublishedEx';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onFirstRemoteAudioFrameEx(connection: agorartc.RtcConnection, userId: agorartc.uid_t, elapsed: number): void {
        let obj = {
            connection,
            userId,
            elapsed,
        };
        let json = JSON.stringify(obj);
        let key = 'onFirstRemoteAudioFrameEx';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onFirstRemoteAudioDecodedEx(connection: agorartc.RtcConnection, uid: agorartc.uid_t, elapsed: number): void {
        let obj = {
            connection,
            uid,
            elapsed,
        };
        let json = JSON.stringify(obj);
        let key = 'onFirstRemoteAudioDecodedEx';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onLocalAudioStateChangedEx(connection: agorartc.RtcConnection, state: agorartc.LOCAL_AUDIO_STREAM_STATE, error: agorartc.LOCAL_AUDIO_STREAM_ERROR): void {
        let obj = {
            connection,
            state,
            error,
        };
        let json = JSON.stringify(obj);
        let key = 'onLocalAudioStateChangedEx';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onRemoteAudioStateChangedEx(connection: agorartc.RtcConnection, remoteUid: agorartc.uid_t, state: agorartc.REMOTE_AUDIO_STATE, reason: agorartc.REMOTE_AUDIO_STATE_REASON, elapsed: number): void {
        let obj = {
            connection,
            remoteUid,
            state,
            reason,
            elapsed,
        };
        let json = JSON.stringify(obj);
        let key = 'onRemoteAudioStateChangedEx';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onActiveSpeakerEx(connection: agorartc.RtcConnection, uid: agorartc.uid_t): void {
        let obj = {
            connection,
            uid,
        };
        let json = JSON.stringify(obj);
        let key = 'onActiveSpeakerEx';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onClientRoleChangedEx(connection: agorartc.RtcConnection, oldRole: agorartc.CLIENT_ROLE_TYPE, newRole: agorartc.CLIENT_ROLE_TYPE): void {
        let obj = {
            connection,
            oldRole,
            newRole,
        };
        let json = JSON.stringify(obj);
        let key = 'onClientRoleChangedEx';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onClientRoleChangeFailedEx(connection: agorartc.RtcConnection, reason: agorartc.CLIENT_ROLE_CHANGE_FAILED_REASON, currentRole: agorartc.CLIENT_ROLE_TYPE): void {
        let obj = {
            connection,
            reason,
            currentRole,
        };
        let json = JSON.stringify(obj);
        let key = 'onClientRoleChangeFailedEx';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onRemoteAudioTransportStatsEx(connection: agorartc.RtcConnection, remoteUid: agorartc.uid_t, delay: number, lost: number, rxKBitRate: number): void {
        let obj = {
            connection,
            remoteUid,
            delay,
            lost,
            rxKBitRate,
        };
        let json = JSON.stringify(obj);
        let key = 'onRemoteAudioTransportStatsEx';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onRemoteVideoTransportStatsEx(connection: agorartc.RtcConnection, remoteUid: agorartc.uid_t, delay: number, lost: number, rxKBitRate: number): void {
        let obj = {
            connection,
            remoteUid,
            delay,
            lost,
            rxKBitRate,
        };
        let json = JSON.stringify(obj);
        let key = 'onRemoteVideoTransportStatsEx';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onConnectionStateChangedEx(connection: agorartc.RtcConnection, state: agorartc.CONNECTION_STATE_TYPE, reason: agorartc.CONNECTION_CHANGED_REASON_TYPE): void {
        let obj = {
            connection,
            state,
            reason,
        };
        let json = JSON.stringify(obj);
        let key = 'onConnectionStateChangedEx';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onWlAccMessageEx(connection: agorartc.RtcConnection, reason: agorartc.WLACC_MESSAGE_REASON, action: agorartc.WLACC_SUGGEST_ACTION, wlAccMsg: string): void {
        let obj = {
            connection,
            reason,
            action,
            wlAccMsg,
        };
        let json = JSON.stringify(obj);
        let key = 'onWlAccMessageEx';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onWlAccStatsEx(connection: agorartc.RtcConnection, currentStats: agorartc.WlAccStats, averageStats: agorartc.WlAccStats): void {
        let obj = {
            connection,
            currentStats,
            averageStats,
        };
        let json = JSON.stringify(obj);
        let key = 'onWlAccStatsEx';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onNetworkTypeChangedEx(connection: agorartc.RtcConnection, type: agorartc.NETWORK_TYPE): void {
        let obj = {
            connection,
            type,
        };
        let json = JSON.stringify(obj);
        let key = 'onNetworkTypeChangedEx';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onEncryptionErrorEx(connection: agorartc.RtcConnection, errorType: agorartc.ENCRYPTION_ERROR_TYPE): void {
        let obj = {
            connection,
            errorType,
        };
        let json = JSON.stringify(obj);
        let key = 'onEncryptionErrorEx';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onUploadLogResultEx(connection: agorartc.RtcConnection, requestId: string, success: boolean, reason: agorartc.UPLOAD_ERROR_REASON): void {
        let obj = {
            connection,
            requestId,
            success,
            reason,
        };
        let json = JSON.stringify(obj);
        let key = 'onUploadLogResultEx';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onUserAccountUpdatedEx(connection: agorartc.RtcConnection, remoteUid: agorartc.uid_t, userAccount: string): void {
        let obj = {
            connection,
            remoteUid,
            userAccount,
        };
        let json = JSON.stringify(obj);
        let key = 'onUserAccountUpdatedEx';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };

    onSnapshotTakenEx(connection: agorartc.RtcConnection, filePath: string, width: number, height: number, errCode: number): void {
        let obj = {
            connection,
            filePath,
            width,
            height,
            errCode,
        };
        let json = JSON.stringify(obj);
        let key = 'onSnapshotTakenEx';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    };



    //todo IDirectCdnStreamingEventHandler
    onDirectCdnStreamingStateChanged(state: agorartc.DIRECT_CDN_STREAMING_STATE, error: agorartc.DIRECT_CDN_STREAMING_ERROR, message: string): void {
        let obj = {
            state,
            error,
            message,
        };
        let json = JSON.stringify(obj);
        let key = 'DirectCdnStreamingEventHandler_onDirectCdnStreamingStateChanged';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    }


    onDirectCdnStreamingStats(stats: agorartc.DirectCdnStreamingStats): void {
        let obj = {
            stats,
        };
        let json = JSON.stringify(obj);
        let key = 'DirectCdnStreamingEventHandler_onDirectCdnStreamingStats';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    }

    //IMediaRecorderObserver
    onRecorderStateChanged(state: agorartc.RecorderState, error: agorartc.RecorderErrorCode): void {
        let obj = {
            state,
            error
        };
        let json = JSON.stringify(obj);
        let key = 'MediaRecorderObserver_onRecorderStateChanged';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    }

    onRecorderInfoUpdated(info: agorartc.RecorderInfo): void {
        let obj = {
            info,
        };
        let json = JSON.stringify(obj);
        let key = 'MediaRecorderObserver_onRecorderInfoUpdated';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    }


    //webgl的特殊回调 当设备信号被枚举了
    OnDevicesEnumerated() {
        let obj = {

        };
        let json = JSON.stringify(obj);
        let key = 'WebGL_onDevicesEnumerated';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    }

    //当音频设备被查找后
    OnPlaybackDevicesEnumerated(devices: agorartc.DeviceInfo[]) {
        let obj = {
            devices
        };
        let json = JSON.stringify(obj);
        let key = 'WebGL_onPlaybackDevicesEnumerated';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    }

    //当音频录音设备被查找后
    OnRecordingDevicesEnumerated(devices: agorartc.DeviceInfo[]) {
        let obj = {
            devices
        };
        let json = JSON.stringify(obj);
        let key = 'WebGL_onRecordingDevicesEnumerated';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    }

    //当摄像头设备被枚举后
    OnVideoDevicesEnumerated(devices: agorartc.DeviceInfo[]) {
        let obj = {
            devices
        };
        let json = JSON.stringify(obj);
        let key = 'WebGL_onVideoDevicesEnumerated';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    }

    OnEngineDestroy() {
        let obj = {

        };
        let json = JSON.stringify(obj);
        let key = 'WebGL_onEngineDestroy';
        this._engine.getEventHandler()?.onEvent(key, json, null, null, 0);
    }
}