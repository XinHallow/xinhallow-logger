/** 日志等级 */
export enum LoggerLevel {
  SILENT = "SILENT",
  TRACE = "TRACE",
  DEBUG = "DEBUG",
  INFO = "INFO",
  WARN = "WARN",
  ERROR = "ERROR",
  FATAL = "FATAL",
  CRITICAL = "CRITICAL",
  ALL = "ALL",
}

/** 日志等级对应的数字 */
export const LoggerLevelNumber = new Map<LoggerLevel, number>([
  [LoggerLevel.SILENT, 0], // 不显示日志
  [LoggerLevel.ALL, 100], // 显示全部日志
  [LoggerLevel.TRACE, 1],
  [LoggerLevel.DEBUG, 2],
  [LoggerLevel.INFO, 3],
  [LoggerLevel.WARN, 4],
  [LoggerLevel.ERROR, 5],
  [LoggerLevel.FATAL, 6],
  [LoggerLevel.CRITICAL, 7],
]);
