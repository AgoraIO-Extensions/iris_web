import { IAgoraRTC } from 'agora-rtc-sdk-ng';
import { IrisApiEngine } from 'iris-web-core';

import { IrisRtcEngine } from './engine/IrisRtcEngine';
import { AgoraConsole } from './util';

export interface InitIrisRtcOptions {
  agoraRTC?: IAgoraRTC;
  irisRtcEngine?: IrisRtcEngine;
  // irisRtmEngine: IrisApiEngine;
}

export function initIrisRtc(
  irisApiEngine: IrisApiEngine,
  options?: InitIrisRtcOptions
) {
  irisApiEngine.addApiInterceptor(
    options?.irisRtcEngine ??
      new IrisRtcEngine(irisApiEngine.getIrisEventHandlerManager(), options)
  );
}

export let AgoraWrapper = {
  initIrisRtc: initIrisRtc,
};

export let IrisWebRtc = {
  IrisRtcEngine: IrisRtcEngine,
  AgoraConsole: AgoraConsole,
};
