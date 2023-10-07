import { ApiParam } from 'iris-web-core';

import { IrisApiType } from '../base/IrisApiType';

export function callApiBufferExtension(
  func_name: IrisApiType,
  data: any,
  buffer: Array<any>
): ApiParam {
  switch (func_name) {
    case IrisApiType.FUNC_MEDIAENGINE_PUSHVIDEOFRAME:
      if (data?.frame?.buffer) {
        data.frame.buffer = buffer;
      }
      break;
  }
  return data;
}
