import { LoggerLevel } from "./logger-level";
import { nextTick } from "node:process";
export abstract class LoggerTargetBase {
  /**
   * 异步写入日志
   * @param message 日志消息
   */
  public abstract write(message: string, level: LoggerLevel): Promise<void>;

  /**
   * 同步写入日志
   * @param message 日志消息
   */
  public abstract writeSync(message: string, level: LoggerLevel): void;
}

/** 控制台日志目标 */
export class ConsoleTarget implements LoggerTargetBase {
  writeSync(message: string, level: LoggerLevel) {
    switch (level) {
      case LoggerLevel.CRITICAL:
      case LoggerLevel.FATAL:
      case LoggerLevel.ERROR:
        console.error(message);
        break;
      case LoggerLevel.WARN:
        console.warn(message);
        break;
      case LoggerLevel.INFO:
        console.info(message);
        break;
      default:
        console.log(message);
    }
  }

  write(message: string, level: LoggerLevel): Promise<void> {
    return new Promise((resolve) => {
      nextTick(() => {
        try {
          this.writeSync(message, level);
          resolve();
        } catch (err) {
          console.error("Failed to write log:", err);
          resolve();
        }
      });
    });
  }
}
