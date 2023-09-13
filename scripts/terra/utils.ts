import path = require('path');

import { CXXFile } from 'terra-cli';

let regMap = {
  isCallback: '.*(Observer|Handler|Callback|Receiver|Sink).*',
};

import filterFileList = require('./config/filter_file_list.json');

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
