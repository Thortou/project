import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createLogger } from 'src/common/configurations/logger.config';
import { IEnv } from 'src/common/interface/env.interface';
import { ILogger } from 'src/infrastructure/ports/logger/logger.interface';
import { Logger } from 'winston';

@Injectable()
export class LoggerService implements ILogger {
  private readonly logger: Logger;

  constructor(configService: ConfigService<IEnv>) {
    this.logger = createLogger(configService);
  }

  /**
   * Logs an informational message
   * @param message - The message to log
   * @param context - Additional context information (optional)
   */
  log(message: string, context?: Record<string, unknown>) {
    this.logger.info(message, context);
  }

  /**
   * Logs an error message
   * @param message - The message to log
   * @param trace - The stack trace (optional)
   * @param context - Additional context information (optional)
   */
  error(message: string, trace?: string, context?: Record<string, unknown>) {
    this.logger.error(message, { trace, ...context });
  }

  /**
   * Logs a warning message
   * @param message - The message to log
   * @param context - Additional context information (optional)
   */
  warn(message: string, context?: Record<string, unknown>) {
    this.logger.warn(message, context);
  }

  /**
   * Logs a debug message
   * @param message - The message to log
   * @param context - Additional context information (optional)
   */
  debug(message: string, context?: Record<string, unknown>) {
    this.logger.debug(message, context);
  }

  /**
   * Logs a verbose message
   * @param message - The message to log
   * @param context - Additional context information (optional)
   */
  verbose(message: string, context?: Record<string, unknown>) {
    this.logger.verbose(message, context);
  }
}
