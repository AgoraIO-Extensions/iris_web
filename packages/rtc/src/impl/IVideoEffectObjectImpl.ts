import * as NATIVE_RTC from '@iris/native-rtc';

import { IrisRtcEngine } from '../engine/IrisRtcEngine';

//@ts-ignore
export class IVideoEffectObjectImpl implements NATIVE_RTC.IVideoEffectObject {
  private _engine: IrisRtcEngine;

  public constructor(engine: IrisRtcEngine) {
    this._engine = engine;
  }
}
