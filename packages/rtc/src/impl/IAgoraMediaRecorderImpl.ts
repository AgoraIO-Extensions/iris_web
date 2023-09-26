import * as NATIVE_RTC from '@iris/web-rtc';
import { CallApiReturnType, CallIrisApiResult } from 'iris-web-core';

import { IrisRtcEngine } from '../engine/IrisRtcEngine';
import { AgoraConsole } from '../util/AgoraConsole';

export class IMediaRecorderImpl implements NATIVE_RTC.IMediaRecorder {
  private _engine: IrisRtcEngine;

  public constructor(engine: IrisRtcEngine) {
    this._engine = engine;
  }

  private returnResult(
    isSuccess: boolean = true,
    code: number = NATIVE_RTC.ERROR_CODE_TYPE.ERR_OK,
    data: string = '{"result": 0}'
  ): Promise<CallIrisApiResult> {
    if (!isSuccess) {
      code = -NATIVE_RTC.ERROR_CODE_TYPE.ERR_FAILED;
    }
    return Promise.resolve(new CallIrisApiResult(code, data));
  }

  setMediaRecorderObserver(
    callback: NATIVE_RTC.IMediaRecorderObserver
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setMediaRecorderObserver not supported in this platform!'
    );
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  startRecording(
    config: NATIVE_RTC.MediaRecorderConfiguration
  ): CallApiReturnType {
    AgoraConsole.warn('startRecording not supported in this platform!');
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  stopRecording(): CallApiReturnType {
    AgoraConsole.warn('stopRecording not supported in this platform!');
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
}
