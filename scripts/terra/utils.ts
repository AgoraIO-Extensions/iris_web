import { CXXFile, Clazz, MemberFunction } from '@agoraio-extensions/cxx-parser';
import { ParseResult } from '@agoraio-extensions/terra-core';
import { getIrisApiIdValue } from '@agoraio-extensions/terra_shared_configs';

const path = require('path');

let regMap = {
  isCallback: '.*(Observer|Handler|Callback|Receiver|Sink).*',
};

const filterFileList = require('./config/filter_file_list.json');

export function filterFile(cxxfiles: CXXFile[]): CXXFile[] {
  return cxxfiles.filter((file) => {
    const fileName = path.basename(file.file_path);
    return !filterFileList.some((filter: string) =>
      new RegExp(filter, 'g').test(fileName)
    );
  });
}

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