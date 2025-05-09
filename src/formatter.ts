import { LoggerLevel } from "./logger-level";

const defaultLoggerFormatterFunc: LoggerFormatterFunc = (args) => {
  return `[${args.name}] ${args.level}: ${args.message}`;
};

export class LoggerFormatter {
  /** 格式化函数 */
  private readonly formatter: LoggerFormatterFunc;

  /** 构建日志记录器格式化器 */
  constructor(func?: LoggerFormatterFunc) {
    this.formatter = func ?? defaultLoggerFormatterFunc;
  }

  /**
   * 格式化日志
   * @param args 格式化参数
   */
  public format(args: LoggerFormatterFuncArgs) {
    return this.formatter(args);
  }
}

/** 日志记录器格式化器函数 */
export type LoggerFormatterFunc = (args: LoggerFormatterFuncArgs) => string;

/** 日志记录器格式化器参数 */
export interface LoggerFormatterFuncArgs {
  /** 日志记录器名称 */
  name: string;
  /** 日志等级 */
  level: LoggerLevel;
  /** 日志消息 */
  message: string;
  /** 日志时间 */
  timestamp: number;
}
