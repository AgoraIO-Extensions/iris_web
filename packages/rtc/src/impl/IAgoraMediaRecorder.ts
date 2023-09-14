import { CallApiReturnType } from 'iris-web-core';
import * as NATIVE_RTC from 'iris-web-rtc';

import { IrisRtcEngine } from '../engine/IrisRtcEngine';
import { Action } from '../util/AgoraActionQueue';

export class IMediaRecorderImpl implements NATIVE_RTC.IMediaRecorder {
  private _engine: IrisRtcEngine;

  public constructor(engine: IrisRtcEngine) {
    this._engine = engine;
  }

  setMediaRecorderObserver(
    callback: NATIVE_RTC.IMediaRecorderObserver
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  startRecording(
    config: NATIVE_RTC.MediaRecorderConfiguration
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  stopRecording(): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  putAction(action: Action) {
    this._engine.actionQueue.putAction(action);
  }
}
