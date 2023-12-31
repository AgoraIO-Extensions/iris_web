/// Generated by terra, DO NOT MODIFY BY HAND.

import { ERROR_CODE_TYPE } from '@iris/native-rtc-binding';
import { ApiParam, CallApiReturnType } from 'iris-web-core';

import { IrisRtcEngine } from '../engine/IrisRtcEngine';
import { IAudioDeviceManagerImpl } from '../impl/IAudioDeviceManagerImpl';
import { AgoraConsole } from '../util/AgoraConsole';

export class IAudioDeviceManagerDispatch {
  _impl: IAudioDeviceManagerImpl;
  _engine: IrisRtcEngine = null;

  constructor(engine: IrisRtcEngine) {
    this._impl = new IAudioDeviceManagerImpl(engine);
    this._engine = engine;
  }
  enumeratePlaybackDevices(): CallApiReturnType {
    AgoraConsole.warn(
      'enumeratePlaybackDevices not supported in this platform!'
    );
    return this._engine.returnResult(false, -ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
  }

  enumerateRecordingDevices(): CallApiReturnType {
    AgoraConsole.warn(
      'enumerateRecordingDevices not supported in this platform!'
    );
    return this._engine.returnResult(false, -ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
  }

  setPlaybackDevice(apiParam: ApiParam): CallApiReturnType {
    AgoraConsole.warn('setPlaybackDevice not supported in this platform!');
    return this._engine.returnResult(false, -ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
  }

  getPlaybackDevice(): CallApiReturnType {
    AgoraConsole.warn('getPlaybackDevice not supported in this platform!');
    return this._engine.returnResult(false, -ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
  }

  getPlaybackDeviceInfo(): CallApiReturnType {
    AgoraConsole.warn('getPlaybackDeviceInfo not supported in this platform!');
    return this._engine.returnResult(false, -ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
  }

  setPlaybackDeviceVolume(apiParam: ApiParam): CallApiReturnType {
    AgoraConsole.warn(
      'setPlaybackDeviceVolume not supported in this platform!'
    );
    return this._engine.returnResult(false, -ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
  }

  getPlaybackDeviceVolume(): CallApiReturnType {
    AgoraConsole.warn(
      'getPlaybackDeviceVolume not supported in this platform!'
    );
    return this._engine.returnResult(false, -ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
  }

  setRecordingDevice(apiParam: ApiParam): CallApiReturnType {
    AgoraConsole.warn('setRecordingDevice not supported in this platform!');
    return this._engine.returnResult(false, -ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
  }

  getRecordingDevice(apiParam: ApiParam): CallApiReturnType {
    AgoraConsole.warn('getRecordingDevice not supported in this platform!');
    return this._engine.returnResult(false, -ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
  }

  getRecordingDeviceInfo(): CallApiReturnType {
    AgoraConsole.warn('getRecordingDeviceInfo not supported in this platform!');
    return this._engine.returnResult(false, -ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
  }

  setRecordingDeviceVolume(apiParam: ApiParam): CallApiReturnType {
    AgoraConsole.warn(
      'setRecordingDeviceVolume not supported in this platform!'
    );
    return this._engine.returnResult(false, -ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
  }

  getRecordingDeviceVolume(apiParam: ApiParam): CallApiReturnType {
    AgoraConsole.warn(
      'getRecordingDeviceVolume not supported in this platform!'
    );
    return this._engine.returnResult(false, -ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
  }

  setLoopbackDevice(apiParam: ApiParam): CallApiReturnType {
    AgoraConsole.warn('setLoopbackDevice not supported in this platform!');
    return this._engine.returnResult(false, -ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
  }

  getLoopbackDevice(apiParam: ApiParam): CallApiReturnType {
    AgoraConsole.warn('getLoopbackDevice not supported in this platform!');
    return this._engine.returnResult(false, -ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
  }

  setPlaybackDeviceMute(apiParam: ApiParam): CallApiReturnType {
    AgoraConsole.warn('setPlaybackDeviceMute not supported in this platform!');
    return this._engine.returnResult(false, -ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
  }

  getPlaybackDeviceMute(apiParam: ApiParam): CallApiReturnType {
    AgoraConsole.warn('getPlaybackDeviceMute not supported in this platform!');
    return this._engine.returnResult(false, -ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
  }

  setRecordingDeviceMute(apiParam: ApiParam): CallApiReturnType {
    AgoraConsole.warn('setRecordingDeviceMute not supported in this platform!');
    return this._engine.returnResult(false, -ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
  }

  getRecordingDeviceMute(apiParam: ApiParam): CallApiReturnType {
    AgoraConsole.warn('getRecordingDeviceMute not supported in this platform!');
    return this._engine.returnResult(false, -ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
  }

  startPlaybackDeviceTest(apiParam: ApiParam): CallApiReturnType {
    AgoraConsole.warn(
      'startPlaybackDeviceTest not supported in this platform!'
    );
    return this._engine.returnResult(false, -ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
  }

  stopPlaybackDeviceTest(): CallApiReturnType {
    AgoraConsole.warn('stopPlaybackDeviceTest not supported in this platform!');
    return this._engine.returnResult(false, -ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
  }

  startRecordingDeviceTest(apiParam: ApiParam): CallApiReturnType {
    AgoraConsole.warn(
      'startRecordingDeviceTest not supported in this platform!'
    );
    return this._engine.returnResult(false, -ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
  }

  stopRecordingDeviceTest(): CallApiReturnType {
    AgoraConsole.warn(
      'stopRecordingDeviceTest not supported in this platform!'
    );
    return this._engine.returnResult(false, -ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
  }

  startAudioDeviceLoopbackTest(apiParam: ApiParam): CallApiReturnType {
    AgoraConsole.warn(
      'startAudioDeviceLoopbackTest not supported in this platform!'
    );
    return this._engine.returnResult(false, -ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
  }

  stopAudioDeviceLoopbackTest(): CallApiReturnType {
    AgoraConsole.warn(
      'stopAudioDeviceLoopbackTest not supported in this platform!'
    );
    return this._engine.returnResult(false, -ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
  }

  followSystemPlaybackDevice(apiParam: ApiParam): CallApiReturnType {
    AgoraConsole.warn(
      'followSystemPlaybackDevice not supported in this platform!'
    );
    return this._engine.returnResult(false, -ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
  }

  followSystemRecordingDevice(apiParam: ApiParam): CallApiReturnType {
    AgoraConsole.warn(
      'followSystemRecordingDevice not supported in this platform!'
    );
    return this._engine.returnResult(false, -ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
  }

  followSystemLoopbackDevice(apiParam: ApiParam): CallApiReturnType {
    AgoraConsole.warn(
      'followSystemLoopbackDevice not supported in this platform!'
    );
    return this._engine.returnResult(false, -ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
  }

  release(): CallApiReturnType {
    AgoraConsole.warn('release not supported in this platform!');
    return this._engine.returnResult(false, -ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
  }
}
