import { LOG_LEVEL } from '@iris/web-rtc';

export class AgoraConsole {
  public static logLevel: LOG_LEVEL = LOG_LEVEL.LOG_LEVEL_ERROR;

  public static getDate(): string {
    const timestamp = new Date();
    return `${timestamp.toLocaleTimeString()}:${(
      '00' + timestamp.getMilliseconds()
    ).slice(-3)}`;
  }

  public static log(msg: any) {
    if (AgoraConsole.logLevel >= LOG_LEVEL.LOG_LEVEL_INFO) {
      console.log(
        `%c[${this.getDate()}] [Iris log]:`,
        'color:#E040FB; font-weight: bold;',
        msg
      );
    }
  }

  public static warn(msg: any) {
    if (AgoraConsole.logLevel >= LOG_LEVEL.LOG_LEVEL_WARN) {
      console.log(
        `%c[${this.getDate()}] [Iris warning]:`,
        'color:#FFD600; font-weight: bold;',
        msg
      );
    }
  }

  public static error(msg: any) {
    if (AgoraConsole.logLevel >= LOG_LEVEL.LOG_LEVEL_ERROR) {
      console.error(`[${this.getDate()}] [Iris error]:${msg}`);
    }
  }
}
