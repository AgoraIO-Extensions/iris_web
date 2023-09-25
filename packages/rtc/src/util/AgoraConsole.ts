import { LOG_LEVEL } from '@iris/web-rtc';

export class AgoraConsole {
  public static logLevel: LOG_LEVEL = LOG_LEVEL.LOG_LEVEL_ERROR;

  public static getDate(): string {
    const timestamp = new Date();
    return `${timestamp.toLocaleTimeString()}:${(
      '00' + timestamp.getMilliseconds()
    ).slice(-3)}`;
  }

  public static debug(msg: any) {
    if (AgoraConsole.logLevel > LOG_LEVEL.LOG_LEVEL_INFO) {
      console.log(`\x1B[35m[${this.getDate()}][Iris debug]:\x1B[30m ${msg}`);
    }
  }

  public static log(msg: any) {
    if (AgoraConsole.logLevel >= LOG_LEVEL.LOG_LEVEL_INFO) {
      console.log(`\x1B[35m[${this.getDate()}][Iris log]:\x1B[30m ${msg}`);
    }
  }

  public static warn(msg: any) {
    if (AgoraConsole.logLevel >= LOG_LEVEL.LOG_LEVEL_WARN) {
      console.log(`\x1B[33m[${this.getDate()}][Iris warning]:\x1B[30m${msg}`);
    }
  }

  public static error(msg: any) {
    if (AgoraConsole.logLevel >= LOG_LEVEL.LOG_LEVEL_ERROR) {
      console.error(`[${this.getDate()}] [Iris error]:${msg}`);
    }
  }
}
