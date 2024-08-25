import { IEnv } from 'src/common/interface/env.interface';
import { LoggerService } from './logger.service';
import { ConfigService } from '@nestjs/config';

describe('LogService Methods', () => {
  let service: LoggerService;
  let mockConfigService: Partial<ConfigService>;

  beforeEach(() => {
    // Reset all mock functions
    jest.clearAllMocks();

    // Mock ConfigService
    mockConfigService = {
      get: jest.fn().mockImplementation((key: string) => {
        switch (key) {
          case 'LOG_LEVEL':
            return 'debug';
          case 'LOG_PATH':
            return './storage/logs';
          default:
            return null;
        }
      }),
    };

    service = new LoggerService(mockConfigService as ConfigService<IEnv>);
  });

  it('should log an info message', () => {
    service.log('Test info log');
  });

  it('should log an error message with trace', () => {
    service.error('Test error log', 'Test trace');
  });

  it('should log an error message without trace', () => {
    service.error('Test error log');
  });

  it('should log a warning message', () => {
    service.warn('Test warning log');
  });

  it('should log a debug message', () => {
    service.debug('Test debug log');
  });

  it('should log a verbose message', () => {
    service.verbose('Test verbose log');
  });

  it('should log a database error with a long trace', () => {
    // Simulate a database error with a long trace
    let errorStack;
    try {
      throw new Error('Simulated database error');
    } catch (error) {
      errorStack = (error as Error).stack;
      service.error('Database error occurred', errorStack);
    }
  });
});
