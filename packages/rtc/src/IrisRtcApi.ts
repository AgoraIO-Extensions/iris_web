import { IrisApiEngine } from 'iris-web-core';

import { IrisRtcEngine } from './engine/IrisRtcEngine';

export function initIrisRtc(irisApiEngine: IrisApiEngine) {
  irisApiEngine.addApiInterceptor(
    new IrisRtcEngine(irisApiEngine.getIrisEventHandlerManager())
  );
}

export let AgoraWrapper = {
  initIrisRtc: initIrisRtc,
};
