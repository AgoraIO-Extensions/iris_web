import * as agorartc from './rtc_types/Index';
import { IrisRtcEngine } from "../engine/IrisRtcEngine";
import { EventParam } from '../engine/IrisApiEngine';

export class RtcEngineEventHandler {

    classPrefix: string = "RtcEngineEventHandler_";

    _engine: IrisRtcEngine = null;

    constructor(engine: IrisRtcEngine) {
        this._engine = engine;
    }

    //IRtcEngineEventHandler
    eventHandlerType(): string {
        return "IRtcEngineEventHandlerEx";
    };

    private eventKey(event: string): string {
        return `${this.classPrefix}${event}`;
    }

    onJoinChannelSuccess(channel: string, uid: agorartc.uid_t, elapsed: number): void {
        let obj = {
            channel,
            uid,
            elapsed,
        };
        let json = JSON.stringify(obj);
        let key = this.eventKey("onJoinChannelSuccess");

        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        console.log(`onJoinChannelSuccess eventParam ${JSON.stringify(eventParam)}`);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onRejoinChannelSuccess(channel: string, uid: agorartc.uid_t, elapsed: number): void {
        let obj = {
            channel,
            uid,
            elapsed,
        };
        let json = JSON.stringify(obj);
        let key = 'onRejoinChannelSuccess';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
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
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onWarning(warn: number, msg: string) {
        let obj = {
            warn,
            msg,
        };
        let json = JSON.stringify(obj);
        let key = 'onWarning';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    }

    onError(err: number, msg: string): void {
        let obj = {
            err,
            msg,
        };
        let json = JSON.stringify(obj);
        let key = 'onError';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
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
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onLastmileProbeResult(result: agorartc.LastmileProbeResult): void {
        let obj = {
            result,
        };
        let json = JSON.stringify(obj);
        let key = 'onLastmileProbeResult';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onAudioVolumeIndication(speakers: agorartc.AudioVolumeInfo[], speakerNumber: number, totalVolume: number): void {
        let obj = {
            speakers,
            speakerNumber,
            totalVolume,
        };
        let json = JSON.stringify(obj);
        let key = 'onAudioVolumeIndication';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onLeaveChannel(stats: agorartc.RtcStats): void {
        let obj = {
            stats,
        };
        let json = JSON.stringify(obj);
        let key = 'onLeaveChannel';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onRtcStats(stats: agorartc.RtcStats): void {
        let obj = {
            stats,
        };
        let json = JSON.stringify(obj);
        let key = 'onRtcStats';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onAudioDeviceStateChanged(deviceId: string, deviceType: number, deviceState: number): void {
        let obj = {
            deviceId,
            deviceType,
            deviceState,
        };
        let json = JSON.stringify(obj);
        let key = 'onAudioDeviceStateChanged';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onAudioMixingFinished(): void {
        let obj = {

        };
        let json = JSON.stringify(obj);
        let key = 'onAudioMixingFinished';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onAudioEffectFinished(soundId: number): void {
        let obj = {
            soundId,
        };
        let json = JSON.stringify(obj);
        let key = 'onAudioEffectFinished';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onVideoDeviceStateChanged(deviceId: string, deviceType: number, deviceState: number): void {
        let obj = {
            deviceId,
            deviceType,
            deviceState,
        };
        let json = JSON.stringify(obj);
        let key = 'onVideoDeviceStateChanged';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onMediaDeviceChanged(deviceType: number): void {
        let obj = {
            deviceType,
        };
        let json = JSON.stringify(obj);
        let key = 'onMediaDeviceChanged';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onNetworkQuality(uid: agorartc.uid_t, txQuality: number, rxQuality: number): void {
        let obj = {
            uid,
            txQuality,
            rxQuality,
        };
        let json = JSON.stringify(obj);
        let key = 'onNetworkQuality';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onIntraRequestReceived(): void {
        let obj = {

        };
        let json = JSON.stringify(obj);
        let key = 'onIntraRequestReceived';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onUplinkNetworkInfoUpdated(info: agorartc.UplinkNetworkInfo): void {
        let obj = {
            info,
        };
        let json = JSON.stringify(obj);
        let key = 'onUplinkNetworkInfoUpdated';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onDownlinkNetworkInfoUpdated(info: agorartc.DownlinkNetworkInfo): void {
        let obj = {
            info,
        };
        let json = JSON.stringify(obj);
        let key = 'onDownlinkNetworkInfoUpdated';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onLastmileQuality(quality: number): void {
        let obj = {
            quality,
        };
        let json = JSON.stringify(obj);
        let key = 'onLastmileQuality';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onFirstLocalVideoFrame(width: number, height: number, elapsed: number): void {
        let obj = {
            width,
            height,
            elapsed,
        };
        let json = JSON.stringify(obj);
        let key = 'onFirstLocalVideoFrame';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onFirstLocalVideoFramePublished(elapsed: number): void {
        let obj = {
            elapsed,
        };
        let json = JSON.stringify(obj);
        let key = 'onFirstLocalVideoFramePublished';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onVideoSourceFrameSizeChanged(sourceType: agorartc.VIDEO_SOURCE_TYPE, width: number, height: number): void {
        let obj = {
            sourceType,
            width,
            height,
        };
        let json = JSON.stringify(obj);
        let key = 'onVideoSourceFrameSizeChanged';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
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
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
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
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onLocalVideoStateChanged(state: agorartc.LOCAL_VIDEO_STREAM_STATE, error: agorartc.LOCAL_VIDEO_STREAM_ERROR): void {
        let obj = {
            state,
            error,
        };
        let json = JSON.stringify(obj);
        let key = 'onLocalVideoStateChanged';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
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
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
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
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onUserJoined(uid: agorartc.uid_t, elapsed: number): void {
        let obj = {
            uid,
            elapsed,
        };
        let json = JSON.stringify(obj);
        let key = 'onUserJoined';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onUserOffline(uid: agorartc.uid_t, reason: agorartc.USER_OFFLINE_REASON_TYPE): void {
        let obj = {
            uid,
            reason,
        };
        let json = JSON.stringify(obj);
        let key = 'onUserOffline';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onUserMuteAudio(uid: agorartc.uid_t, muted: boolean): void {
        let obj = {
            uid,
            muted,
        };
        let json = JSON.stringify(obj);
        let key = 'onUserMuteAudio';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onUserMuteVideo(userId: agorartc.uid_t, muted: boolean): void {
        let obj = {
            userId,
            muted,
        };
        let json = JSON.stringify(obj);
        let key = 'onUserMuteVideo';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onUserEnableVideo(uid: agorartc.uid_t, enabled: boolean): void {
        let obj = {
            uid,
            enabled,
        };
        let json = JSON.stringify(obj);
        let key = 'onUserEnableVideo';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onUserStateChanged(uid: agorartc.uid_t, state: number): void {
        let obj = {
            uid,
            state,
        };
        let json = JSON.stringify(obj);
        let key = 'onUserStateChanged';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onUserEnableLocalVideo(uid: agorartc.uid_t, enabled: boolean): void {
        let obj = {
            uid,
            enabled,
        };
        let json = JSON.stringify(obj);
        let key = 'onUserEnableLocalVideo';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onApiCallExecuted(err: number, api: string, result: string): void {
        let obj = {
            err,
            api,
            result,
        };
        let json = JSON.stringify(obj);
        let key = 'onApiCallExecuted';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onLocalAudioStats(stats: agorartc.LocalAudioStats): void {
        let obj = {
            stats,
        };
        let json = JSON.stringify(obj);
        let key = 'onLocalAudioStats';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onRemoteAudioStats(stats: agorartc.RemoteAudioStats): void {
        let obj = {
            stats,
        };
        let json = JSON.stringify(obj);
        let key = 'onRemoteAudioStats';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onLocalVideoStats(stats: agorartc.LocalVideoStats): void {
        let obj = {
            stats,
        };
        let json = JSON.stringify(obj);
        let key = 'onLocalVideoStats';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onRemoteVideoStats(stats: agorartc.RemoteVideoStats): void {
        let obj = {
            stats,
        };
        let json = JSON.stringify(obj);
        let key = 'onRemoteVideoStats';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onCameraReady(): void {
        let obj = {

        };
        let json = JSON.stringify(obj);
        let key = 'onCameraReady';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
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
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
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
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
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
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onVideoStopped(): void {
        let obj = {

        };
        let json = JSON.stringify(obj);
        let key = 'onVideoStopped';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onAudioMixingStateChanged(state: agorartc.AUDIO_MIXING_STATE_TYPE, reason: agorartc.AUDIO_MIXING_REASON_TYPE): void {
        let obj = {
            state,
            reason,
        };
        let json = JSON.stringify(obj);
        let key = 'onAudioMixingStateChanged';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onRhythmPlayerStateChanged(state: agorartc.RHYTHM_PLAYER_STATE_TYPE, errorCode: agorartc.RHYTHM_PLAYER_ERROR_TYPE): void {
        let obj = {
            state,
            errorCode,
        };
        let json = JSON.stringify(obj);
        let key = 'onRhythmPlayerStateChanged';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onConnectionLost(): void {
        let obj = {

        };
        let json = JSON.stringify(obj);
        let key = 'onConnectionLost';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onConnectionInterrupted(): void {
        let obj = {

        };
        let json = JSON.stringify(obj);
        let key = 'onConnectionInterrupted';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onConnectionBanned(): void {
        let obj = {

        };
        let json = JSON.stringify(obj);
        let key = 'onConnectionBanned';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
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
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
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
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onRequestToken(): void {
        let obj = {

        };
        let json = JSON.stringify(obj);
        let key = 'onRequestToken';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onTokenPrivilegeWillExpire(token: string): void {
        let obj = {
            token,
        };
        let json = JSON.stringify(obj);
        let key = 'onTokenPrivilegeWillExpire';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onFirstLocalAudioFramePublished(elapsed: number): void {
        let obj = {
            elapsed,
        };
        let json = JSON.stringify(obj);
        let key = 'onFirstLocalAudioFramePublished';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onFirstRemoteAudioFrame(uid: agorartc.uid_t, elapsed: number): void {
        let obj = {
            uid,
            elapsed,
        };
        let json = JSON.stringify(obj);
        let key = 'onFirstRemoteAudioFrame';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onFirstRemoteAudioDecoded(uid: agorartc.uid_t, elapsed: number): void {
        let obj = {
            uid,
            elapsed,
        };
        let json = JSON.stringify(obj);
        let key = 'onFirstRemoteAudioDecoded';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onLocalAudioStateChanged(state: agorartc.LOCAL_AUDIO_STREAM_STATE, error: agorartc.LOCAL_AUDIO_STREAM_ERROR): void {
        let obj = {
            state,
            error,
        };
        let json = JSON.stringify(obj);
        let key = 'onLocalAudioStateChanged';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
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
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onActiveSpeaker(userId: agorartc.uid_t): void {
        let obj = {
            userId,
        };
        let json = JSON.stringify(obj);
        let key = 'onActiveSpeaker';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onContentInspectResult(result: agorartc.CONTENT_INSPECT_RESULT): void {
        let obj = {
            result,
        };
        let json = JSON.stringify(obj);
        let key = 'onContentInspectResult';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
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
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onClientRoleChanged(oldRole: agorartc.CLIENT_ROLE_TYPE, newRole: agorartc.CLIENT_ROLE_TYPE): void {
        let obj = {
            oldRole,
            newRole,
        };
        let json = JSON.stringify(obj);
        let key = 'onClientRoleChanged';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onClientRoleChangeFailed(reason: agorartc.CLIENT_ROLE_CHANGE_FAILED_REASON, currentRole: agorartc.CLIENT_ROLE_TYPE): void {
        let obj = {
            reason,
            currentRole,
        };
        let json = JSON.stringify(obj);
        let key = 'onClientRoleChangeFailed';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onAudioDeviceVolumeChanged(deviceType: agorartc.MEDIA_DEVICE_TYPE, volume: number, muted: boolean): void {
        let obj = {
            deviceType,
            volume,
            muted,
        };
        let json = JSON.stringify(obj);
        let key = 'onAudioDeviceVolumeChanged';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onRtmpStreamingStateChanged(url: string, state: agorartc.RTMP_STREAM_PUBLISH_STATE, errCode: agorartc.RTMP_STREAM_PUBLISH_ERROR_TYPE): void {
        let obj = {
            url,
            state,
            errCode,
        };
        let json = JSON.stringify(obj);
        let key = 'onRtmpStreamingStateChanged';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onRtmpStreamingEvent(url: string, eventCode: agorartc.RTMP_STREAMING_EVENT): void {
        let obj = {
            url,
            eventCode,
        };
        let json = JSON.stringify(obj);
        let key = 'onRtmpStreamingEvent';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onTranscodingUpdated(): void {
        let obj = {

        };
        let json = JSON.stringify(obj);
        let key = 'onTranscodingUpdated';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onAudioRoutingChanged(routing: number): void {
        let obj = {
            routing,
        };
        let json = JSON.stringify(obj);
        let key = 'onAudioRoutingChanged';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onChannelMediaRelayStateChanged(state: number, code: number): void {
        let obj = {
            state,
            code,
        };
        let json = JSON.stringify(obj);
        let key = 'onChannelMediaRelayStateChanged';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onChannelMediaRelayEvent(code: number): void {
        let obj = {
            code,
        };
        let json = JSON.stringify(obj);
        let key = 'onChannelMediaRelayEvent';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onLocalPublishFallbackToAudioOnly(isFallbackOrRecover: boolean): void {
        let obj = {
            isFallbackOrRecover,
        };
        let json = JSON.stringify(obj);
        let key = 'onLocalPublishFallbackToAudioOnly';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onRemoteSubscribeFallbackToAudioOnly(uid: agorartc.uid_t, isFallbackOrRecover: boolean): void {
        let obj = {
            uid,
            isFallbackOrRecover,
        };
        let json = JSON.stringify(obj);
        let key = 'onRemoteSubscribeFallbackToAudioOnly';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
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
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
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
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onConnectionStateChanged(state: agorartc.CONNECTION_STATE_TYPE, reason: agorartc.CONNECTION_CHANGED_REASON_TYPE): void {
        let obj = {
            state,
            reason,
        };
        let json = JSON.stringify(obj);
        let key = 'onConnectionStateChanged';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onWlAccMessage(reason: agorartc.WLACC_MESSAGE_REASON, action: agorartc.WLACC_SUGGEST_ACTION, wlAccMsg: string): void {
        let obj = {
            reason,
            action,
            wlAccMsg,
        };
        let json = JSON.stringify(obj);
        let key = 'onWlAccMessage';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onWlAccStats(currentStats: agorartc.WlAccStats, averageStats: agorartc.WlAccStats): void {
        let obj = {
            currentStats,
            averageStats,
        };
        let json = JSON.stringify(obj);
        let key = 'onWlAccStats';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onNetworkTypeChanged(type: agorartc.NETWORK_TYPE): void {
        let obj = {
            type,
        };
        let json = JSON.stringify(obj);
        let key = 'onNetworkTypeChanged';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onEncryptionError(errorType: agorartc.ENCRYPTION_ERROR_TYPE): void {
        let obj = {
            errorType,
        };
        let json = JSON.stringify(obj);
        let key = 'onEncryptionError';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onPermissionError(permissionType: agorartc.PERMISSION_TYPE): void {
        let obj = {
            permissionType,
        };
        let json = JSON.stringify(obj);
        let key = 'onPermissionError';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onLocalUserRegistered(uid: agorartc.uid_t, userAccount: string): void {
        let obj = {
            uid,
            userAccount,
        };
        let json = JSON.stringify(obj);
        let key = 'onLocalUserRegistered';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onUserInfoUpdated(uid: agorartc.uid_t, info: agorartc.UserInfo): void {
        let obj = {
            uid,
            info,
        };
        let json = JSON.stringify(obj);
        let key = 'onUserInfoUpdated';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onUploadLogResult(requestId: string, success: boolean, reason: agorartc.UPLOAD_ERROR_REASON): void {
        let obj = {
            requestId,
            success,
            reason,
        };
        let json = JSON.stringify(obj);
        let key = 'onUploadLogResult';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
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
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
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
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
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
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
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
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
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
        let eventParam = new EventParam(key2, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onExtensionStarted(provider: string, extension: string): void {
        let obj = {
            provider,
            extension,
        };
        let json = JSON.stringify(obj);
        let key = 'onExtensionStarted';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onExtensionStopped(provider: string, extension: string): void {
        let obj = {
            provider,
            extension,
        };
        let json = JSON.stringify(obj);
        let key = 'onExtensionStopped';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
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
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onUserAccountUpdated(uid: agorartc.uid_t, userAccount: string): void {
        let obj = {
            uid,
            userAccount,
        };
        let json = JSON.stringify(obj);
        let key = 'onUserAccountUpdated';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };


    //IRtcEngineEventHandlerEx
    // eventHandlerTypeEx(): string {
    //     let obj = {

    //     };
    //     let json = JSON.stringify(obj);
    //     let key = 'eventHandlerTypeEx';
    //             let eventParam = new EventParam(key, json, 0, '',[], [], 0);
    // this._engine.getEventHandler()?.onEvent(eventParam);
    // };

    onJoinChannelSuccessEx(connection: agorartc.RtcConnection, elapsed: number): void {
        let obj = {
            connection,
            elapsed,
        };
        let json = JSON.stringify(obj);
        // let key = 'onJoinChannelSuccessEx';
        let key = this.eventKey('onJoinChannelSuccessEx');
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onRejoinChannelSuccessEx(connection: agorartc.RtcConnection, elapsed: number): void {
        let obj = {
            connection,
            elapsed,
        };
        let json = JSON.stringify(obj);
        let key = 'onRejoinChannelSuccessEx';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
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
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
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
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onLeaveChannelEx(connection: agorartc.RtcConnection, stats: agorartc.RtcStats): void {
        let obj = {
            connection,
            stats,
        };
        let json = JSON.stringify(obj);
        let key = this.eventKey('onLeaveChannelEx');
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onRtcStatsEx(connection: agorartc.RtcConnection, stats: agorartc.RtcStats): void {
        let obj = {
            connection,
            stats,
        };
        let json = JSON.stringify(obj);
        let key = 'onRtcStatsEx';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
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
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onIntraRequestReceivedEx(connection: agorartc.RtcConnection): void {
        let obj = {
            connection,
        };
        let json = JSON.stringify(obj);
        let key = 'onIntraRequestReceivedEx';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
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
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onFirstLocalVideoFramePublishedEx(connection: agorartc.RtcConnection, elapsed: number): void {
        let obj = {
            connection,
            elapsed,
        };
        let json = JSON.stringify(obj);
        let key = 'onFirstLocalVideoFramePublishedEx';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
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
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
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
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
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
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onLocalVideoStateChangedEx(connection: agorartc.RtcConnection, state: agorartc.LOCAL_VIDEO_STREAM_STATE, errorCode: agorartc.LOCAL_VIDEO_STREAM_ERROR): void {
        let obj = {
            connection,
            state,
            errorCode,
        };
        let json = JSON.stringify(obj);
        let key = 'onLocalVideoStateChangedEx';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
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
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
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
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onUserJoinedEx(connection: agorartc.RtcConnection, remoteUid: agorartc.uid_t, elapsed: number): void {
        let obj = {
            connection,
            remoteUid,
            elapsed,
        };
        let json = JSON.stringify(obj);
        let key = this.eventKey('onUserJoinedEx');
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onUserOfflineEx(connection: agorartc.RtcConnection, remoteUid: agorartc.uid_t, reason: agorartc.USER_OFFLINE_REASON_TYPE): void {
        let obj = {
            connection,
            remoteUid,
            reason,
        };
        let json = JSON.stringify(obj);
        let key = 'onUserOfflineEx';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onUserMuteAudioEx(connection: agorartc.RtcConnection, remoteUid: agorartc.uid_t, muted: boolean): void {
        let obj = {
            connection,
            remoteUid,
            muted,
        };
        let json = JSON.stringify(obj);
        let key = 'onUserMuteAudioEx';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onUserMuteVideoEx(connection: agorartc.RtcConnection, remoteUid: agorartc.uid_t, muted: boolean): void {
        let obj = {
            connection,
            remoteUid,
            muted,
        };
        let json = JSON.stringify(obj);
        let key = 'onUserMuteVideoEx';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onUserEnableVideoEx(connection: agorartc.RtcConnection, remoteUid: agorartc.uid_t, enabled: boolean): void {
        let obj = {
            connection,
            remoteUid,
            enabled,
        };
        let json = JSON.stringify(obj);
        let key = 'onUserEnableVideoEx';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onUserEnableLocalVideoEx(connection: agorartc.RtcConnection, remoteUid: agorartc.uid_t, enabled: boolean): void {
        let obj = {
            connection,
            remoteUid,
            enabled,
        };
        let json = JSON.stringify(obj);
        let key = 'onUserEnableLocalVideoEx';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onUserStateChangedEx(connection: agorartc.RtcConnection, remoteUid: agorartc.uid_t, state: number): void {
        let obj = {
            connection,
            remoteUid,
            state,
        };
        let json = JSON.stringify(obj);
        let key = 'onUserStateChangedEx';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onLocalAudioStatsEx(connection: agorartc.RtcConnection, stats: agorartc.LocalAudioStats): void {
        let obj = {
            connection,
            stats,
        };
        let json = JSON.stringify(obj);
        let key = 'onLocalAudioStatsEx';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onRemoteAudioStatsEx(connection: agorartc.RtcConnection, stats: agorartc.RemoteAudioStats): void {
        let obj = {
            connection,
            stats,
        };
        let json = JSON.stringify(obj);
        let key = 'onRemoteAudioStatsEx';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onLocalVideoStatsEx(connection: agorartc.RtcConnection, stats: agorartc.LocalVideoStats): void {
        let obj = {
            connection,
            stats,
        };
        let json = JSON.stringify(obj);
        let key = 'onLocalVideoStatsEx';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onRemoteVideoStatsEx(connection: agorartc.RtcConnection, stats: agorartc.RemoteVideoStats): void {
        let obj = {
            connection,
            stats,
        };
        let json = JSON.stringify(obj);
        let key = 'onRemoteVideoStatsEx';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onConnectionLostEx(connection: agorartc.RtcConnection): void {
        let obj = {
            connection,
        };
        let json = JSON.stringify(obj);
        let key = 'onConnectionLostEx';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onConnectionInterruptedEx(connection: agorartc.RtcConnection): void {
        let obj = {
            connection,
        };
        let json = JSON.stringify(obj);
        let key = 'onConnectionInterruptedEx';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onConnectionBannedEx(connection: agorartc.RtcConnection): void {
        let obj = {
            connection,
        };
        let json = JSON.stringify(obj);
        let key = 'onConnectionBannedEx';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
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
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
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
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onRequestTokenEx(connection: agorartc.RtcConnection): void {
        let obj = {
            connection,
        };
        let json = JSON.stringify(obj);
        let key = 'onRequestTokenEx';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onTokenPrivilegeWillExpireEx(connection: agorartc.RtcConnection, token: string): void {
        let obj = {
            connection,
            token,
        };
        let json = JSON.stringify(obj);
        let key = 'onTokenPrivilegeWillExpireEx';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onFirstLocalAudioFramePublishedEx(connection: agorartc.RtcConnection, elapsed: number): void {
        let obj = {
            connection,
            elapsed,
        };
        let json = JSON.stringify(obj);
        let key = 'onFirstLocalAudioFramePublishedEx';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onFirstRemoteAudioFrameEx(connection: agorartc.RtcConnection, userId: agorartc.uid_t, elapsed: number): void {
        let obj = {
            connection,
            userId,
            elapsed,
        };
        let json = JSON.stringify(obj);
        let key = 'onFirstRemoteAudioFrameEx';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onFirstRemoteAudioDecodedEx(connection: agorartc.RtcConnection, uid: agorartc.uid_t, elapsed: number): void {
        let obj = {
            connection,
            uid,
            elapsed,
        };
        let json = JSON.stringify(obj);
        let key = 'onFirstRemoteAudioDecodedEx';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onLocalAudioStateChangedEx(connection: agorartc.RtcConnection, state: agorartc.LOCAL_AUDIO_STREAM_STATE, error: agorartc.LOCAL_AUDIO_STREAM_ERROR): void {
        let obj = {
            connection,
            state,
            error,
        };
        let json = JSON.stringify(obj);
        let key = 'onLocalAudioStateChangedEx';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
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
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onActiveSpeakerEx(connection: agorartc.RtcConnection, uid: agorartc.uid_t): void {
        let obj = {
            connection,
            uid,
        };
        let json = JSON.stringify(obj);
        let key = 'onActiveSpeakerEx';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onClientRoleChangedEx(connection: agorartc.RtcConnection, oldRole: agorartc.CLIENT_ROLE_TYPE, newRole: agorartc.CLIENT_ROLE_TYPE): void {
        let obj = {
            connection,
            oldRole,
            newRole,
        };
        let json = JSON.stringify(obj);
        let key = 'onClientRoleChangedEx';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onClientRoleChangeFailedEx(connection: agorartc.RtcConnection, reason: agorartc.CLIENT_ROLE_CHANGE_FAILED_REASON, currentRole: agorartc.CLIENT_ROLE_TYPE): void {
        let obj = {
            connection,
            reason,
            currentRole,
        };
        let json = JSON.stringify(obj);
        let key = 'onClientRoleChangeFailedEx';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
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
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
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
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onConnectionStateChangedEx(connection: agorartc.RtcConnection, state: agorartc.CONNECTION_STATE_TYPE, reason: agorartc.CONNECTION_CHANGED_REASON_TYPE): void {
        let obj = {
            connection,
            state,
            reason,
        };
        let json = JSON.stringify(obj);
        let key = 'onConnectionStateChangedEx';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
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
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onWlAccStatsEx(connection: agorartc.RtcConnection, currentStats: agorartc.WlAccStats, averageStats: agorartc.WlAccStats): void {
        let obj = {
            connection,
            currentStats,
            averageStats,
        };
        let json = JSON.stringify(obj);
        let key = 'onWlAccStatsEx';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onNetworkTypeChangedEx(connection: agorartc.RtcConnection, type: agorartc.NETWORK_TYPE): void {
        let obj = {
            connection,
            type,
        };
        let json = JSON.stringify(obj);
        let key = 'onNetworkTypeChangedEx';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onEncryptionErrorEx(connection: agorartc.RtcConnection, errorType: agorartc.ENCRYPTION_ERROR_TYPE): void {
        let obj = {
            connection,
            errorType,
        };
        let json = JSON.stringify(obj);
        let key = 'onEncryptionErrorEx';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
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
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    };

    onUserAccountUpdatedEx(connection: agorartc.RtcConnection, remoteUid: agorartc.uid_t, userAccount: string): void {
        let obj = {
            connection,
            remoteUid,
            userAccount,
        };
        let json = JSON.stringify(obj);
        let key = 'onUserAccountUpdatedEx';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
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
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
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
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    }


    onDirectCdnStreamingStats(stats: agorartc.DirectCdnStreamingStats): void {
        let obj = {
            stats,
        };
        let json = JSON.stringify(obj);
        let key = 'DirectCdnStreamingEventHandler_onDirectCdnStreamingStats';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    }

    //IMediaRecorderObserver
    onRecorderStateChanged(state: agorartc.RecorderState, error: agorartc.RecorderErrorCode): void {
        let obj = {
            state,
            error
        };
        let json = JSON.stringify(obj);
        let key = 'MediaRecorderObserver_onRecorderStateChanged';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    }

    onRecorderInfoUpdated(info: agorartc.RecorderInfo): void {
        let obj = {
            info,
        };
        let json = JSON.stringify(obj);
        let key = 'MediaRecorderObserver_onRecorderInfoUpdated';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    }


    //webgl的特殊回调 当设备信号被枚举了
    onDevicesEnumerated() {
        let obj = {

        };
        let json = JSON.stringify(obj);
        let key = 'WebGL_onDevicesEnumerated';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    }

    //当音频设备被查找后
    onPlaybackDevicesEnumerated(devices: agorartc.DeviceInfo[]) {
        let obj = {
            devices
        };
        let json = JSON.stringify(obj);
        let key = 'WebGL_onPlaybackDevicesEnumerated';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    }

    //当音频录音设备被查找后
    onRecordingDevicesEnumerated(devices: agorartc.DeviceInfo[]) {
        let obj = {
            devices
        };
        let json = JSON.stringify(obj);
        let key = 'WebGL_onRecordingDevicesEnumerated';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    }

    //当摄像头设备被枚举后
    onVideoDevicesEnumerated(devices: agorartc.DeviceInfo[]) {
        let obj = {
            devices
        };
        let json = JSON.stringify(obj);
        let key = 'WebGL_onVideoDevicesEnumerated';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    }

    onEngineDestroy() {
        let obj = {

        };
        let json = JSON.stringify(obj);
        let key = 'WebGL_onEngineDestroy';
        let eventParam = new EventParam(key, json, 0, '', [], [], 0);
        this._engine.getEventHandler()?.onEvent(eventParam);
    }
}