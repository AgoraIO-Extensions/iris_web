import { CXXFile, Clazz, MemberFunction } from '@agoraio-extensions/cxx-parser';
import { ParseResult } from '@agoraio-extensions/terra-core';
import { getIrisApiIdValue } from '@agoraio-extensions/terra_shared_configs';

const path = require('path');

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