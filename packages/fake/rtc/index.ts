import { ERROR_CODE_TYPE } from '@iris/native-rtc-binding';

import FakeAgoraRTCWrapper from 'agora-rtc-sdk-ng-fake';
import { AgoraConsole, IrisApiEngine, IrisRtcEngine } from 'iris-web-rtc';

import supportList = require('../../../scripts/terra/config/support_list.json');

let irisRtcEngine: IrisRtcEngine;
export function createIrisRtcEngineFake(irisApiEngine: IrisApiEngine) {
  let agoraRTC = FakeAgoraRTCWrapper.getFakeAgoraRTC();
  irisRtcEngine = new IrisRtcEngine(
    irisApiEngine.getIrisEventHandlerManager(),
    {
      agoraRTC,
    }
  );

  return irisRtcEngine;
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
  const isSupport = supportList.find((name) => {
    return name.indexOf(className) != -1 && name.indexOf(funName) != -1;
  });
  if (isSupport) {
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
