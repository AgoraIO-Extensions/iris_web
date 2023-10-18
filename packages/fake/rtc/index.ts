import { ERROR_CODE_TYPE } from '@iris/native-rtc-binding';

import FakeAgoraRTCWrapper from 'agora-rtc-sdk-ng-fake';
import { AgoraConsole, IrisApiEngine, IrisRtcEngine } from 'iris-web-rtc';

let irisRtcEngine: IrisRtcEngine;
export function createIrisRtcEngineFake(irisApiEngine: IrisApiEngine) {
  let agoraRTC = FakeAgoraRTCWrapper.getFakeAgoraRTC();
  irisRtcEngine = new IrisRtcEngine(
    irisApiEngine.getIrisEventHandlerManager(),
    {
      agoraRTC,
    }
  );
}

export function getIrisRtcEngineFake() {
  return irisRtcEngine;
}

export function triggerEventWithFakeApiEngine(
  func_name: string,
  parameters: any
) {
  let array = func_name.split('_');
  let className = array[0];
  let funName = array[1];
  if (className.includes('RtcEngineEventHandler')) {
    if (!irisRtcEngine.rtcEngineEventHandler[funName]) {
      AgoraConsole.error(`${func_name} not found in ${className}Dispatch`);
      irisRtcEngine.returnResult(false, -ERROR_CODE_TYPE.ERR_MODULE_NOT_FOUND);
    } else {
      irisRtcEngine.rtcEngineEventHandler[funName](parameters);
    }
  } else {
    AgoraConsole.error('not support yet');
    irisRtcEngine.returnResult(false, -ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
  }
}

export let AgoraWrapperFake = {
  createIrisRtcEngineFake: createIrisRtcEngineFake,
  getIrisRtcEngineFake: getIrisRtcEngineFake,
  triggerEventWithFakeApiEngine: triggerEventWithFakeApiEngine,
};
