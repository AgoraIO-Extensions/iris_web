import { CallApiReturnType } from 'iris-web-core';
import * as NATIVE_RTC from 'iris-web-rtc';

import { IrisRtcEngine } from '../engine/IrisRtcEngine';
import { Action } from '../util';

export class IMusicContentCenterImpl implements NATIVE_RTC.IAudioDeviceManager {
  private _engine: IrisRtcEngine;

  public constructor(engine: IrisRtcEngine) {
    this._engine = engine;
  }
  enumeratePlaybackDevices(): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  enumerateRecordingDevices(): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setPlaybackDevice(deviceId: string): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  getPlaybackDevice(deviceId: string): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  getPlaybackDeviceInfo(): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setPlaybackDeviceVolume(volume: number): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  getPlaybackDeviceVolume(volume: number): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setRecordingDevice(deviceId: string): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  getRecordingDevice(deviceId: string): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  getRecordingDeviceInfo(): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setRecordingDeviceVolume(volume: number): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  getRecordingDeviceVolume(volume: number): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setLoopbackDevice(deviceId: string): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  getLoopbackDevice(deviceId: string): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setPlaybackDeviceMute(mute: boolean): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  getPlaybackDeviceMute(mute: boolean): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setRecordingDeviceMute(mute: boolean): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  getRecordingDeviceMute(mute: boolean): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  startPlaybackDeviceTest(testAudioFilePath: string): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  stopPlaybackDeviceTest(): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  startRecordingDeviceTest(indicationInterval: number): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  stopRecordingDeviceTest(): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  startAudioDeviceLoopbackTest(indicationInterval: number): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  stopAudioDeviceLoopbackTest(): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  followSystemPlaybackDevice(enable: boolean): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  followSystemRecordingDevice(enable: boolean): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  followSystemLoopbackDevice(enable: boolean): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  release(): CallApiReturnType {
    throw new Error('Method not implemented.');
  }

  putAction(action: Action) {
    this._engine.actionQueue.putAction(action);
  }
}

export class MusicChartCollectionImpl
  implements NATIVE_RTC.MusicChartCollection {
  private _engine: IrisRtcEngine;

  public constructor(engine: IrisRtcEngine) {
    this._engine = engine;
  }
  getCount(): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  get(index: number): CallApiReturnType {
    throw new Error('Method not implemented.');
  }

  putAction(action: Action) {
    this._engine.actionQueue.putAction(action);
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
  getCount(): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  getTotal(): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  getPage(): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  getPageSize(): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  getMusic(index: number): CallApiReturnType {
    throw new Error('Method not implemented.');
  }

  putAction(action: Action) {
    this._engine.actionQueue.putAction(action);
  }
}
