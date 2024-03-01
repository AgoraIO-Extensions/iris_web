import { ApiParam } from 'iris-web-core';

import {
  IMEDIAENGINE_PUSHVIDEOFRAME_4e544e2,
  IRTCENGINEEX_SENDSTREAMMESSAGEEX_0c34857,
  IRTCENGINE_SENDSTREAMMESSAGE_8715a45,
} from '../util/iris_rtc_api_type_gen';

export function callApiBufferExtension(
  func_name: string,
  data: any,
  buffer: Array<any>
): ApiParam {
  switch (func_name) {
    case IMEDIAENGINE_PUSHVIDEOFRAME_4e544e2:
      if (typeof data?.frame === 'object') {
        data.frame.buffer = buffer;
      }
      break;
    case IRTCENGINE_SENDSTREAMMESSAGE_8715a45:
      if (buffer) {
        data.data = buffer[0];
      }
      break;
    case IRTCENGINEEX_SENDSTREAMMESSAGEEX_0c34857:
      if (buffer) {
        data.data = buffer[0];
      }
      break;
  }
  return data;
}
