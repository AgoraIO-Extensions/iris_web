import * as agorartc from '../terra/rtc_types/Index';

export class AgoraConsole {

    public static logLevel: agorartc.LOG_LEVEL = agorartc.LOG_LEVEL.LOG_LEVEL_ERROR;

    public static log(msg: any) {
        if (AgoraConsole.logLevel >= agorartc.LOG_LEVEL.LOG_LEVEL_INFO) {
            console.log(msg);
        }
    };

    public static warn(msg: any) {
        if (AgoraConsole.logLevel >= agorartc.LOG_LEVEL.LOG_LEVEL_WARN) {
            console.warn(msg);
        }
    };

    public static error(msg: any) {
        if (AgoraConsole.logLevel >= agorartc.LOG_LEVEL.LOG_LEVEL_ERROR) {
            console.error(msg);
        }
    };


}