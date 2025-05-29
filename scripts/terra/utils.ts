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

function cutStringByIndex(str: string, index: number, cutNumber: number): string {
  const underscoreCount = str.split('_').length - 1;
  if (index > 0 && underscoreCount >= cutNumber) {
    return str.substring(0, index);
  } else {
    return str;
  }
}

export function revertIrisApiId(
  memberFunc: MemberFunction
): MemberFunction {
  let value = getIrisApiIdValue(memberFunc, true);
  memberFunc.name = cutStringByIndex(value, value.lastIndexOf('_'), 1);
  const originalKey = memberFunc.user_data.IrisApiIdParser.key;
  const originalValue = memberFunc.user_data.IrisApiIdParser.value;
  const cutKey = cutStringByIndex(originalKey, originalKey.lastIndexOf('_'), 2);
  const cutValue = cutStringByIndex(originalValue, originalValue.lastIndexOf('_'), 2);
  memberFunc.user_data.IrisApiIdParser.key = cutKey;
  memberFunc.user_data.IrisApiIdParser.value = cutValue;
  return memberFunc;
}

export function appendNumberToDuplicateMemberFunction(
  arr: MemberFunction[]
): MemberFunction[] {
  const count = {};
  arr.forEach((item: MemberFunction) => {
    if (count[item.name] === undefined) {
      count[item.name] = 1;
    } else {
      count[item.name]++;
    }

    if (count[item.name] > 1) {
      item.user_data.IrisApiIdParser.key = item.user_data.IrisApiIdParser.key + count[item.name];
      item.user_data.IrisApiIdParser.value = item.user_data.IrisApiIdParser.value + count[item.name];
      item.name += count[item.name];
    }
  });
  return arr;
}
