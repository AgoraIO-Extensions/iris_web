import * as NATIVE_RTC from '@iris/native-rtc';
import { ApiParam, CallApiReturnType } from 'iris-web-core';

import { IMediaEngineDispatch } from '../binding/IAgoraMediaEngineDispatch';
import { IrisRtcEngine } from '../engine/IrisRtcEngine';
import { IMediaEngineImpl } from '../impl/IAgoraMediaEngineImpl';

export interface IMediaEngineExtensions extends NATIVE_RTC.IMediaEngine {
  unregisterAudioFrameObserver(
    observer: NATIVE_RTC.IAudioFrameObserver
  ): CallApiReturnType;
}

export class MediaEngineDispatchExtensions extends IMediaEngineDispatch {
  constructor(engine: IrisRtcEngine) {
    super(engine);
    this._impl = new IMediaEngineImpl(engine);
  }

  unregisterAudioFrameObserver(apiParam: ApiParam): CallApiReturnType {
    let obj = JSON.parse(apiParam.data) as any;
    let observer = obj.observer;
    if (observer === undefined) throw 'observer is undefined';

    return this._impl.unregisterAudioFrameObserver(observer);
  }
}
