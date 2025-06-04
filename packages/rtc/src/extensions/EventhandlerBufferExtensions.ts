import {
  // IAUDIOFRAMEOBSERVER_onPlaybackAudioFrame,
  IRTCENGINEEVENTHANDLER_ONSTREAMMESSAGEEx,
} from '../util/iris_rtc_api_type_gen';

export function eventHandlerBufferExtension(
  func_name: string,
  data: any
): any[] {
  let bufferList: any = [];
  switch (func_name) {
    case IRTCENGINEEVENTHANDLER_ONSTREAMMESSAGEEx:
      if (data.data) {
        bufferList.push(data.data);
      }
      break;
    // case IAUDIOFRAMEOBSERVER_onPlaybackAudioFrame:
    //   if (data?.audioFrame?.buffer) {
    //     bufferList.push(data.audioFrame.buffer);
    //   }
    //   break;
  }
  return bufferList;
}
