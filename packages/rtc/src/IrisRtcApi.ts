import { IAgoraRTC } from 'agora-rtc-sdk-ng';
import { IrisApiEngine } from 'iris-web-core';

import packageJson from '../package.json';

import { IrisClientManager } from './engine/IrisClientManager';
import { IrisRtcEngine } from './engine/IrisRtcEngine';
import { AgoraConsole } from './util';

export interface InitIrisRtcOptions {
  agoraRTC?: IAgoraRTC;
  irisRtcEngine?: IrisRtcEngine;
  // irisRtmEngine: IrisApiEngine;
}

function initIrisRtc(
  irisApiEngine: IrisApiEngine,
  options?: InitIrisRtcOptions
) {
  irisApiEngine.addApiInterceptor(
    options?.irisRtcEngine ??
      new IrisRtcEngine(irisApiEngine.getIrisEventHandlerManager(), options)
  );
  // set the first irisApiEngine apiInterceptors to irisClientManager
  // this is a convenient way to get irisClientManager in most cases
  setTimeout(() => {
    if (window.__AGORA_IRIS_API_ENGINE_LIST__.length === 1) {
      window.__AGORA_IRIS_CLIENT_MANAGER__ =
        window.__AGORA_IRIS_API_ENGINE_LIST__[0][
          'apiInterceptors'
        ][0]?.irisClientManager;
    }
  }, 1000);
}

export let IrisWebRtc = {
  IrisRtcEngine: IrisRtcEngine,
  AgoraConsole: AgoraConsole,
  initIrisRtc: initIrisRtc,
};

declare global {
  interface Window {
    __AGORA_IRIS_CLIENT_MANAGER__: IrisClientManager;
    __AGORA_IRIS_VERSION__: string;
  }
}

window.__AGORA_IRIS_VERSION__ = packageJson.version;
