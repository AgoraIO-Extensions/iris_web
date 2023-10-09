import { ApiParam } from 'iris-web-core';

export function callApiBufferExtension(
  func_name: string,
  data: any,
  buffer: Array<any>
): ApiParam {
  switch (func_name) {
    case 'MediaEngine_pushVideoFrame':
      if (typeof data?.frame === 'object') {
        data.frame.buffer = buffer;
      }
      break;
  }
  return data;
}
