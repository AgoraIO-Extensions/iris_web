import * as NATIVE_RTC from '@iris/native-rtc';

import { IrisRtcEngine } from '../engine/IrisRtcEngine';

import { AgoraConsole } from './AgoraConsole';

export default class IrisRtcErrorHandler {
  _engine: IrisRtcEngine;
  constructor(engine: IrisRtcEngine) {
    this._engine = engine;
  }

  public notInitialized() {
    let message = 'not initialized';
    AgoraConsole.error(message);
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_INITIALIZED
    );
  }

  public notInChannel() {
    let message = 'not in channel, please join channel first';
    AgoraConsole.error(message);
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_IN_CHANNEL
    );
  }

  public failed(msg: string) {
    AgoraConsole.error(msg);
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_FAILED
    );
  }
}
