import * as NATIVE_RTC from '@iris/rtc';
import { ICameraVideoTrack } from 'agora-rtc-sdk-ng';

import { CallApiReturnType } from 'iris-web-core';

import { IrisVideoSourceType, VideoTrackPackage } from '../base/BaseType';
import { IrisRtcEngine } from '../engine/IrisRtcEngine';
import { Action } from '../util/AgoraActionQueue';
import { AgoraConsole } from '../util/AgoraConsole';

import { ImplHelper } from './ImplHelper';

export class VideoDeviceManagerImpl implements NATIVE_RTC.IVideoDeviceManager {
  private _engine: IrisRtcEngine;

  public constructor(engine: IrisRtcEngine) {
    this._engine = engine;
  }
  enumerateVideoDevices(): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setDevice(deviceIdUTF8: string): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  getDevice(deviceIdUTF8: string): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  numberOfCapabilities(deviceIdUTF8: string): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  getCapability(
    deviceIdUTF8: string,
    deviceCapabilityNumber: number,
    capability: NATIVE_RTC.VideoFormat
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  startDeviceTest(hwnd: number): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  stopDeviceTest(): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  release(): CallApiReturnType {
    throw new Error('Method not implemented.');
  }

  putAction(action: Action) {
    this._engine.actionQueue.putAction(action);
  }
}
