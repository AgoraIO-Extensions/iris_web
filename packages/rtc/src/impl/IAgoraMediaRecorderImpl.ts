import { CallApiReturnType } from 'iris-web-core';
import * as NATIVE_RTC from 'iris-web-rtc';

import { IrisRtcEngine } from '../engine/IrisRtcEngine';
import { Action } from '../util/AgoraActionQueue';
import { AgoraConsole } from '../util/AgoraConsole';

export class IMediaRecorderImpl implements NATIVE_RTC.IMediaRecorder {
  private _engine: IrisRtcEngine;

  public constructor(engine: IrisRtcEngine) {
    this._engine = engine;
  }

  putAction(action: Action) {
    this._engine.actionQueue.putAction(action);
  }

  setMediaRecorderObserver(
    callback: NATIVE_RTC.IMediaRecorderObserver
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setMediaRecorderObserver not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  startRecording(
    config: NATIVE_RTC.MediaRecorderConfiguration
  ): CallApiReturnType {
    AgoraConsole.warn('startRecording not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  stopRecording(): CallApiReturnType {
    AgoraConsole.warn('stopRecording not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
}
