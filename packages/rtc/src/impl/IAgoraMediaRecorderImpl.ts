import * as NATIVE_RTC from '@iris/native-rtc-binding';
import { CallApiReturnType } from 'iris-web-core';

import { IrisRtcEngine } from '../engine/IrisRtcEngine';
import { AgoraConsole } from '../util/AgoraConsole';

export class IMediaRecorderImpl implements NATIVE_RTC.IMediaRecorder {
  private _engine: IrisRtcEngine;

  public constructor(engine: IrisRtcEngine) {
    this._engine = engine;
  }

  setMediaRecorderObserver(
    callback: NATIVE_RTC.IMediaRecorderObserver
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setMediaRecorderObserver not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  startRecording(
    config: NATIVE_RTC.MediaRecorderConfiguration
  ): CallApiReturnType {
    AgoraConsole.warn('startRecording not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  stopRecording(): CallApiReturnType {
    AgoraConsole.warn('stopRecording not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
}
