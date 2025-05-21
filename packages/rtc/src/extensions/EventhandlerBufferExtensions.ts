import {
  IAUDIOFRAMEOBSERVER_ONPLAYBACKAUDIOFRAME_4c8de15,
  IRTCENGINEEVENTHANDLER_ONSTREAMMESSAGE_99898cb,
} from '../util/iris_rtc_api_type_gen';

export function eventHandlerBufferExtension(
  func_name: string,
  data: any
): any[] {
  let bufferList: any = [];
  switch (func_name) {
    case IRTCENGINEEVENTHANDLER_ONSTREAMMESSAGE_99898cb:
      if (data.data) {
        bufferList.push(data.data);
      }
      break;
    case IAUDIOFRAMEOBSERVER_ONPLAYBACKAUDIOFRAME_4c8de15:
      if (data?.audioFrame?.buffer) {
        bufferList.push(data.audioFrame.buffer);
      }
      break;
  }
  return bufferList;
}
