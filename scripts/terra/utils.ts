import { CXXFile, Clazz, MemberFunction } from '@agoraio-extensions/cxx-parser';
import { getIrisApiIdValue } from '@agoraio-extensions/terra_shared_configs';

let regMap = {
  isCallback: '.*(Observer|Handler|Callback|Receiver|Sink).*',
};

export function isMatch(str: string, type: string): boolean {
  let result = false;
  if (regMap[type]) {
    result = new RegExp(regMap[type]).test(str);
  }
  return result;
}

export function getIrisApiIdForWrapperFunc(
  memberFunc: MemberFunction
) {
  return getIrisApiIdValue(memberFunc, true);
}