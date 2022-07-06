import AgoraRTC, { DeviceInfo } from "agora-rtc-sdk-ng";
import { IrisRtcEngine } from "./IrisRtcEngine";

export class IrisAgoraCallerHandler {
    private _engine: IrisRtcEngine;

    constructor(engine: IrisRtcEngine) {
        this._engine = engine;
        AgoraRTC.onAutoplayFailed = this.onAutoplayFailed.bind(this);
        AgoraRTC.onCameraChanged = this.onCameraChanged.bind(this);
        AgoraRTC.onMicrophoneChanged = this.onMicrophoneChanged.bind(this);
        AgoraRTC.onPlaybackDeviceChanged = this.onMicrophoneChanged.bind(this);
    }

    onAutoplayFailed() {

    }

    onCameraChanged(info: DeviceInfo) {

    }

    onMicrophoneChanged(info: DeviceInfo) {

    }

    onPlaybackDeviceChanged(info: DeviceInfo) {

    }

    release() {
        AgoraRTC.onAutoplayFailed = undefined;
        AgoraRTC.onCameraChanged = undefined;
        AgoraRTC.onMicrophoneChanged = undefined;
        AgoraRTC.onPlaybackDeviceChanged = undefined;
    }



}