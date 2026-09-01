import * as NATIVE_RTC from '@iris/native-rtc';
import { ApiParam, CallApiReturnType } from 'iris-web-core';

import { IRtcEngineDispatch } from '../binding/IAgoraRtcEngineDispatch';

import { IrisRtcEngine } from '../engine/IrisRtcEngine';
import { IRtcEngineImpl } from '../impl/IAgoraRtcEngineImpl';
import { normalizeBackgroundSource } from '../virtual_background/VirtualBackgroundMapper';

export interface IRtcEngineExtensions extends NATIVE_RTC.IRtcEngine {
  setAppType(appType: number): CallApiReturnType;
  release(): CallApiReturnType;
}

export class RtcEngineDispatchExtensions extends IRtcEngineDispatch {
  constructor(engine: IrisRtcEngine) {
    super(engine);
    this._impl = new IRtcEngineImpl(engine);
  }

  setAppType(apiParam: ApiParam): CallApiReturnType {
    let obj = JSON.parse(apiParam.data) as any;
    let appType = obj.appType;
    if (appType === undefined) throw 'appType is undefined';

    return this._impl.setAppType(appType);
  }

  release(apiParam: ApiParam): CallApiReturnType {
    return this._impl.release();
  }

  isFeatureAvailableOnDevice_a694b62(apiParam: ApiParam): CallApiReturnType {
    const obj = JSON.parse(apiParam.data) as { type: NATIVE_RTC.FeatureType };
    return this._impl.isFeatureAvailableOnDevice(obj.type);
  }

  enableVirtualBackground_6dd8ee4(apiParam: ApiParam): CallApiReturnType {
    const obj = JSON.parse(apiParam.data) as Record<string, unknown>;
    return this._impl.enableVirtualBackground(
      obj.enabled as boolean,
      normalizeBackgroundSource(
        obj.backgroundSource as Record<string, unknown> | undefined
      ),
      obj.segproperty as NATIVE_RTC.SegmentationProperty,
      obj.type as NATIVE_RTC.MEDIA_SOURCE_TYPE
    );
  }
}
