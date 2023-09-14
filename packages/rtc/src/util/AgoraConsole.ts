import { LOG_LEVEL } from 'iris-web-rtc';

export class AgoraConsole {
  public static logLevel: LOG_LEVEL = LOG_LEVEL.LOG_LEVEL_ERROR;

  public static log(msg: any) {
    if (AgoraConsole.logLevel >= LOG_LEVEL.LOG_LEVEL_INFO) {
      console.log('[Iris]:' + msg);
    }
  }

  public static warn(msg: any) {
    if (AgoraConsole.logLevel >= LOG_LEVEL.LOG_LEVEL_WARN) {
      console.warn('[Iris]:' + msg);
    }
  }

  public static error(msg: any) {
    if (AgoraConsole.logLevel >= LOG_LEVEL.LOG_LEVEL_ERROR) {
      console.log('[Iris error]:' + msg);
      let stack = new Error().stack;
      console.log(stack);
    }
  }
}
