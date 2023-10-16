/// Generated by terra, DO NOT MODIFY BY HAND.

import { ERROR_CODE_TYPE } from '@iris/native-rtc-binding';
import { ApiParam, CallApiReturnType } from 'iris-web-core';

import { IrisRtcEngine } from '../engine/IrisRtcEngine';
import { IMediaRecorderImpl } from '../impl/IAgoraMediaRecorderImpl';
import { AgoraConsole } from '../util/AgoraConsole';

export class IMediaRecorderDispatch {
  _impl: IMediaRecorderImpl;
  _engine: IrisRtcEngine = null;

  constructor(engine: IrisRtcEngine) {
    this._impl = new IMediaRecorderImpl(engine);
    this._engine = engine;
  }
  setMediaRecorderObserver(apiParam: ApiParam): CallApiReturnType {
    AgoraConsole.warn(
      'setMediaRecorderObserver not supported in this platform!'
    );
    return this._engine.returnResult(false, -ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
  }

  startRecording(apiParam: ApiParam): CallApiReturnType {
    AgoraConsole.warn('startRecording not supported in this platform!');
    return this._engine.returnResult(false, -ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
  }

  stopRecording(): CallApiReturnType {
    AgoraConsole.warn('stopRecording not supported in this platform!');
    return this._engine.returnResult(false, -ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
  }
}
