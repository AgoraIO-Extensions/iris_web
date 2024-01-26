import { LOG_LEVEL } from '@iris/native-rtc';

export class AgoraConsole {
  public static logLevel: LOG_LEVEL = LOG_LEVEL.LOG_LEVEL_INFO;

  public static getDate(): string {
    const timestamp = new Date();
    return `${timestamp.toLocaleTimeString()}:${(
      '00' + timestamp.getMilliseconds()
    ).slice(-3)}`;
  }

  public static debug(msg: any) {
    if (AgoraConsole.logLevel > LOG_LEVEL.LOG_LEVEL_NONE) {
      console.log(`[${this.getDate()}][Iris debug]:${msg}`);
    }
  }

  public static log(msg: any) {
    if (
      AgoraConsole.logLevel > LOG_LEVEL.LOG_LEVEL_NONE &&
      AgoraConsole.logLevel <= LOG_LEVEL.LOG_LEVEL_INFO
    ) {
      console.log(`[${this.getDate()}][Iris log]:${msg}`);
    }
  }

  public static warn(msg: any) {
    if (
      AgoraConsole.logLevel > LOG_LEVEL.LOG_LEVEL_NONE &&
      AgoraConsole.logLevel <= LOG_LEVEL.LOG_LEVEL_WARN
    ) {
      console.log(`[${this.getDate()}][Iris warning]:${msg}`);
    }
  }

  public static error(msg: any) {
    if (
      AgoraConsole.logLevel > LOG_LEVEL.LOG_LEVEL_NONE &&
      AgoraConsole.logLevel <= LOG_LEVEL.LOG_LEVEL_ERROR
    ) {
      console.error(`[${this.getDate()}][Iris error]:${msg}`);
    }
  }
}
