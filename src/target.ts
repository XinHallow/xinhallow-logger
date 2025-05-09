export abstract class LoggerTargetBase {
  /**
   * 异步写入日志
   * @param message 日志消息
   */
  public abstract write(message: string): Promise<void>;

  /**
   * 同步写入日志
   * @param message 日志消息
   */
  public abstract writeSync(message: string): void;
}

/** 控制台日志目标 */
export class ConsoleTarget implements LoggerTargetBase {
  writeSync(message: string) {
    console.log(message);
  }

  write(message: string): Promise<void> {
    console.log(message);
    return Promise.resolve(undefined);
  }
}
