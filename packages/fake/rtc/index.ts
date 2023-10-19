import { FakeAgoraRTCWrapper } from '@agoraio-extensions/agora-rtc-sdk-ng-fake';
import { ERROR_CODE_TYPE } from '@iris/native-rtc-binding';

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
): number {
  let array = func_name.split('_');
  let className = array[0];
  let funName = array[1];
  const isSupportModule = supportList.find((name) => {
    return name.indexOf(className) != -1;
  });
  if (isSupportModule) {
    if (!irisRtcEngine.rtcEngineEventHandler[funName]) {
      AgoraConsole.error(`${func_name} not found in ${className}Dispatch`);
      irisRtcEngine.returnResult(false, -ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);

      return -ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    } else {
      let { ...rest } = JSON.parse(parameters.data);
      const values = Object.values({ ...rest });

      irisRtcEngine.rtcEngineEventHandler[funName](...values);
      return ERROR_CODE_TYPE.ERR_OK;
    }
  } else {
    AgoraConsole.error(`not support module yet: ${func_name}`);
    irisRtcEngine.returnResult(false, -ERROR_CODE_TYPE.ERR_MODULE_NOT_FOUND);

    return -ERROR_CODE_TYPE.ERR_MODULE_NOT_FOUND;
  }
}
