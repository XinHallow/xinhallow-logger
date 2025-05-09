import { LoggerLevel, LoggerLevelNumber } from "./logger-level";
import { LoggerFormatter } from "./formatter";
import { ConsoleTarget, LoggerTargetBase } from "./target";

export class Logger {
  /** 日志记录器名称 */
  private readonly name: string | undefined;
  /** 日志记录器等级 */
  private level: LoggerLevel;
  /** 日志记录器格式化器 */
  private formatter: LoggerFormatter;
  /** 日志记录器输出对象 */
  private target: LoggerTargetBase[];
  /** 日志记录器是否同步记录*/
  private readonly sync: boolean;

  /** 创建匿名日志记录器 */
  public constructor();
  /** 根据选项创建日志记录器 */
  public constructor(options: LoggerOptions);
  public constructor(options?: LoggerOptions) {
    this.name = options?.name;
    this.level = options?.level ?? LoggerLevel.ALL;
    this.target = options?.target ?? [new ConsoleTarget()];
    this.formatter = options?.formatter ?? new LoggerFormatter();
    this.sync = options?.sync ?? true;
  }

  /**
   * 更换日志记录器目标
   * @param targets 新目标
   */
  public changeTargets(targets: LoggerTargetBase[]) {
    this.target = targets;
  }

  /**
   * 更换日志记录器记录等级
   * @param newLevel 新等级
   */
  public changeLogLevel(newLevel: LoggerLevel) {
    this.level = newLevel;
  }

  /**
   * 记录 critical 等级的日志
   * @param message 消息
   */
  public critical(message: string) {
    if (
      LoggerLevelNumber.get(LoggerLevel.CRITICAL)! <
      LoggerLevelNumber.get(this.level)!
    )
      return;
    this.record(LoggerLevel.CRITICAL, message);
  }

  /**
   * 记录 fatal 等级的日志
   * @param message 消息
   */
  public fatal(message: string) {
    if (
      LoggerLevelNumber.get(LoggerLevel.FATAL)! <
      LoggerLevelNumber.get(this.level)!
    )
      return;
    this.record(LoggerLevel.FATAL, message);
  }

  /**
   * 记录 error 等级的日志
   * @param message 消息
   */
  public error(message: string) {
    if (
      LoggerLevelNumber.get(LoggerLevel.ERROR)! <
      LoggerLevelNumber.get(this.level)!
    )
      return;
    this.record(LoggerLevel.ERROR, message);
  }

  /**
   * 记录 warn 等级的日志
   * @param message 消息
   */
  public warn(message: string) {
    if (
      LoggerLevelNumber.get(LoggerLevel.WARN)! <
      LoggerLevelNumber.get(this.level)!
    )
      return;
    this.record(LoggerLevel.WARN, message);
  }

  /**
   * 记录 info 等级的日志
   * @param message 消息
   */
  public info(message: string) {
    if (
      LoggerLevelNumber.get(LoggerLevel.INFO)! <
      LoggerLevelNumber.get(this.level)!
    )
      return;
    this.record(LoggerLevel.INFO, message);
  }

  /**
   * 记录 debug 等级的日志
   * @param message 消息
   */
  public debug(message: string) {
    if (
      LoggerLevelNumber.get(LoggerLevel.DEBUG)! <
      LoggerLevelNumber.get(this.level)!
    )
      return;
    this.record(LoggerLevel.DEBUG, message);
  }

  /**
   * 记录 trace 等级的日志
   * @param message 消息
   */
  public trace(message: string) {
    if (
      LoggerLevelNumber.get(LoggerLevel.TRACE)! <
      LoggerLevelNumber.get(this.level)!
    )
      return;
    this.record(LoggerLevel.TRACE, message);
  }

  /**
   * 记录日志消息
   * @param level 等级
   * @param message 消息
   */
  private record(level: LoggerLevel, message: string) {
    const formatResult = this.formatter.format({
      timestamp: Date.now(),
      message: message,
      name: this.name ?? "Anonymous",
      level: level,
    });

    if (this.sync) {
      this.target.forEach((target) => target.writeSync(formatResult));
    } else {
      this.target.forEach((target) => target.write(formatResult));
    }
  }
}

/** 日志记录器构造选项 */
export interface LoggerOptions {
  /** 日志记录器名称 */
  name?: string;
  /** 日志记录器显示等级 */
  level?: LoggerLevel;
  /** 日志记录器格式化器 */
  formatter: LoggerFormatter;
  /** 日志记录器输出对象 */
  target: LoggerTargetBase[];
  /** 是否同步记录 */
  sync?: boolean;
}
