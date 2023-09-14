import * as NATIVE_RTC from '@iris/web-rtc';
import { CallApiReturnType } from 'iris-web-core';

import { IrisRtcEngine } from '../engine/IrisRtcEngine';
import { Action } from '../util';
import { AgoraConsole } from '../util/AgoraConsole';

export class IMusicContentCenterImpl implements NATIVE_RTC.IAudioDeviceManager {
  private _engine: IrisRtcEngine;

  public constructor(engine: IrisRtcEngine) {
    this._engine = engine;
  }

  putAction(action: Action) {
    this._engine.actionQueue.putAction(action);
  }

  enumeratePlaybackDevices(): CallApiReturnType {
    AgoraConsole.warn(
      'enumeratePlaybackDevices not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  enumerateRecordingDevices(): CallApiReturnType {
    AgoraConsole.warn(
      'enumerateRecordingDevices not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setPlaybackDevice(deviceId: string): CallApiReturnType {
    AgoraConsole.warn('setPlaybackDevice not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getPlaybackDevice(deviceId: string): CallApiReturnType {
    AgoraConsole.warn('getPlaybackDevice not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getPlaybackDeviceInfo(): CallApiReturnType {
    AgoraConsole.warn('getPlaybackDeviceInfo not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setPlaybackDeviceVolume(volume: number): CallApiReturnType {
    AgoraConsole.warn(
      'setPlaybackDeviceVolume not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getPlaybackDeviceVolume(volume: number): CallApiReturnType {
    AgoraConsole.warn(
      'getPlaybackDeviceVolume not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setRecordingDevice(deviceId: string): CallApiReturnType {
    AgoraConsole.warn('setRecordingDevice not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getRecordingDevice(deviceId: string): CallApiReturnType {
    AgoraConsole.warn('getRecordingDevice not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getRecordingDeviceInfo(): CallApiReturnType {
    AgoraConsole.warn('getRecordingDeviceInfo not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setRecordingDeviceVolume(volume: number): CallApiReturnType {
    AgoraConsole.warn(
      'setRecordingDeviceVolume not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getRecordingDeviceVolume(volume: number): CallApiReturnType {
    AgoraConsole.warn(
      'getRecordingDeviceVolume not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setLoopbackDevice(deviceId: string): CallApiReturnType {
    AgoraConsole.warn('setLoopbackDevice not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getLoopbackDevice(deviceId: string): CallApiReturnType {
    AgoraConsole.warn('getLoopbackDevice not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setPlaybackDeviceMute(mute: boolean): CallApiReturnType {
    AgoraConsole.warn('setPlaybackDeviceMute not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getPlaybackDeviceMute(mute: boolean): CallApiReturnType {
    AgoraConsole.warn('getPlaybackDeviceMute not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setRecordingDeviceMute(mute: boolean): CallApiReturnType {
    AgoraConsole.warn('setRecordingDeviceMute not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getRecordingDeviceMute(mute: boolean): CallApiReturnType {
    AgoraConsole.warn('getRecordingDeviceMute not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  startPlaybackDeviceTest(testAudioFilePath: string): CallApiReturnType {
    AgoraConsole.warn(
      'startPlaybackDeviceTest not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  stopPlaybackDeviceTest(): CallApiReturnType {
    AgoraConsole.warn('stopPlaybackDeviceTest not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  startRecordingDeviceTest(indicationInterval: number): CallApiReturnType {
    AgoraConsole.warn(
      'startRecordingDeviceTest not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  stopRecordingDeviceTest(): CallApiReturnType {
    AgoraConsole.warn(
      'stopRecordingDeviceTest not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  startAudioDeviceLoopbackTest(indicationInterval: number): CallApiReturnType {
    AgoraConsole.warn(
      'startAudioDeviceLoopbackTest not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  stopAudioDeviceLoopbackTest(): CallApiReturnType {
    AgoraConsole.warn(
      'stopAudioDeviceLoopbackTest not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  followSystemPlaybackDevice(enable: boolean): CallApiReturnType {
    AgoraConsole.warn(
      'followSystemPlaybackDevice not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  followSystemRecordingDevice(enable: boolean): CallApiReturnType {
    AgoraConsole.warn(
      'followSystemRecordingDevice not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  followSystemLoopbackDevice(enable: boolean): CallApiReturnType {
    AgoraConsole.warn(
      'followSystemLoopbackDevice not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  release(): CallApiReturnType {
    AgoraConsole.warn('release not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
}

export class MusicChartCollectionImpl
  implements NATIVE_RTC.MusicChartCollection {
  private _engine: IrisRtcEngine;

  public constructor(engine: IrisRtcEngine) {
    this._engine = engine;
  }

  putAction(action: Action) {
    this._engine.actionQueue.putAction(action);
  }

  getCount(): CallApiReturnType {
    AgoraConsole.warn('getCount not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  get(index: number): CallApiReturnType {
    AgoraConsole.warn('get not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
}

export class IMusicPlayerImpl implements NATIVE_RTC.IMusicPlayer {
  private _engine: IrisRtcEngine;

  public constructor(engine: IrisRtcEngine) {
    this._engine = engine;
  }

  putAction(action: Action) {
    this._engine.actionQueue.putAction(action);
  }
}

export class MusicCollectionImpl implements NATIVE_RTC.MusicCollection {
  private _engine: IrisRtcEngine;

  public constructor(engine: IrisRtcEngine) {
    this._engine = engine;
  }

  putAction(action: Action) {
    this._engine.actionQueue.putAction(action);
  }

  getCount(): CallApiReturnType {
    AgoraConsole.warn('getCount not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getTotal(): CallApiReturnType {
    AgoraConsole.warn('getTotal not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getPage(): CallApiReturnType {
    AgoraConsole.warn('getPage not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getPageSize(): CallApiReturnType {
    AgoraConsole.warn('getPageSize not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  getMusic(index: number): CallApiReturnType {
    AgoraConsole.warn('getMusic not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
}
