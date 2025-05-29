import { ApiParam } from 'iris-web-core';

import {
  IMEDIAENGINE_PUSHVIDEOFRAME,
  IRTCENGINEEX_SENDSTREAMMESSAGEEX,
  IRTCENGINE_SENDSTREAMMESSAGE,
} from '../util/iris_rtc_api_type_gen';

export function callApiBufferExtension(
  func_name: string,
  data: any,
  buffer: Array<any>
): ApiParam {
  switch (func_name) {
    case IMEDIAENGINE_PUSHVIDEOFRAME:
      if (typeof data?.frame === 'object') {
        data.frame.buffer = buffer;
      }
      break;
    case IRTCENGINE_SENDSTREAMMESSAGE:
      if (buffer) {
        data.data = buffer[0];
      }
      break;
    case IRTCENGINEEX_SENDSTREAMMESSAGEEX:
      if (buffer) {
        data.data = buffer[0];
      }
      break;
  }
  return data;
}
