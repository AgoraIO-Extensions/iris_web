import { IAgoraRTC } from 'agora-rtc-sdk-ng';
import { IrisApiEngine } from 'iris-web-core';

import { IrisRtcEngine } from './engine/IrisRtcEngine';

export interface InitIrisRtcOptions {
  fakeAgoraRTC: IAgoraRTC;
}

export function initIrisRtc(
  irisApiEngine: IrisApiEngine,
  options?: InitIrisRtcOptions
) {
  return irisApiEngine.addApiInterceptor(
    new IrisRtcEngine(irisApiEngine.getIrisEventHandlerManager(), options)
  );
}

export let AgoraWrapper = {
  initIrisRtc: initIrisRtc,
  // getIrisRtcEngine: (irisApiEngine: IrisApiEngine) => {
  //   return irisApiEngine.getApiInterceptor();
  // }
};
