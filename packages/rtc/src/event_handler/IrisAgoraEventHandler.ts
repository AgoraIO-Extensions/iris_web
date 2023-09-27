import * as NATIVE_RTC from '@iris/native-rtc-binding';
import { DeviceInfo } from 'agora-rtc-sdk-ng';

import { IrisRtcEngine } from '../engine/IrisRtcEngine';
import { AgoraTranslate } from '../util/AgoraTranslate';

export class IrisAgoraEventHandler {
  private _engine: IrisRtcEngine;

  constructor(engine: IrisRtcEngine) {
    this._engine = engine;
    // onAutoplayFailed = this.onAutoplayFailed.bind(this);
    // AgoraRTC.onCameraChanged = this.onCameraChanged.bind(this);
    // AgoraRTC.onMicrophoneChanged = this.onMicrophoneChanged.bind(this);
    // AgoraRTC.onPlaybackDeviceChanged = this.onMicrophoneChanged.bind(this);
  }

  onAutoplayFailed() {
    this._engine.rtcEngineEventHandler.onError(
      NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_READY,
      'auto play failed'
    );
  }

  onCameraChanged(info: DeviceInfo) {
    let deviceId = info.device.deviceId;
    let deviceType: NATIVE_RTC.MEDIA_DEVICE_TYPE =
      NATIVE_RTC.MEDIA_DEVICE_TYPE.VIDEO_CAPTURE_DEVICE;
    let deviceState = AgoraTranslate.DeviceState2NATIVE_RTCMEDIA_DEVICE_STATE_TYPE(
      info.state
    );
    this._engine.rtcEngineEventHandler.onVideoDeviceStateChanged(
      deviceId,
      deviceType,
      deviceState
    );

    // this._engine.rtcEngineEventHandler.onMediaDeviceChanged(deviceType);
  }

  onMicrophoneChanged(info: DeviceInfo) {
    let deviceId = info.device.deviceId;
    let deviceType: NATIVE_RTC.MEDIA_DEVICE_TYPE =
      NATIVE_RTC.MEDIA_DEVICE_TYPE.AUDIO_RECORDING_DEVICE;
    let deviceState = AgoraTranslate.DeviceState2NATIVE_RTCMEDIA_DEVICE_STATE_TYPE(
      info.state
    );
    this._engine.rtcEngineEventHandler.onAudioDeviceStateChanged(
      deviceId,
      deviceType,
      deviceState
    );

    // this._engine.rtcEngineEventHandler.onMediaDeviceChanged(deviceType);
  }

  onPlaybackDeviceChanged(info: DeviceInfo) {
    let deviceId = info.device.deviceId;
    let deviceType: NATIVE_RTC.MEDIA_DEVICE_TYPE =
      NATIVE_RTC.MEDIA_DEVICE_TYPE.AUDIO_PLAYOUT_DEVICE;
    let deviceState = AgoraTranslate.DeviceState2NATIVE_RTCMEDIA_DEVICE_STATE_TYPE(
      info.state
    );
    this._engine.rtcEngineEventHandler.onAudioDeviceStateChanged(
      deviceId,
      deviceType,
      deviceState
    );

    // this._engine.rtcEngineEventHandler.onMediaDeviceChanged(deviceType);
  }

  release() {
    this._engine.globalVariables.AgoraRTC.onAutoplayFailed = undefined;
    this._engine.globalVariables.AgoraRTC.onCameraChanged = undefined;
    this._engine.globalVariables.AgoraRTC.onMicrophoneChanged = undefined;
    this._engine.globalVariables.AgoraRTC.onPlaybackDeviceChanged = undefined;
  }
}
