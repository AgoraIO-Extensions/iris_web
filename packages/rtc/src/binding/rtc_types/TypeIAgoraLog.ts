export interface LogConfig {
    filePath: string;
    fileSizeInKB: number;
    level: LOG_LEVEL;
};

export enum LOG_LEVEL {
    LOG_LEVEL_NONE = 0x0000,
    LOG_LEVEL_INFO = 0x0001,
    LOG_LEVEL_WARN = 0x0002,
    LOG_LEVEL_ERROR = 0x0004,
    LOG_LEVEL_FATAL = 0x0008,
    LOG_LEVEL_API_CALL = 0x0010,
};