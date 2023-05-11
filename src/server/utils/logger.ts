import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import winston from 'winston';
import winstonDaily from 'winston-daily-rotate-file';
import { LOG_DIR, NODE_ENV } from '../config';

// logs dir
const logDir: string = join(__dirname, LOG_DIR || 'logs');
const logLevel = NODE_ENV === 'tests' ? 'error' : 'debug';

if (!existsSync(logDir)) {
  mkdirSync(logDir);
}

// Define log format
const logFormat = winston.format.printf(
  ({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`
);

/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */
const loggerInstance = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    logFormat
  ),
  transports: [
    // debug log setting
    new winstonDaily({
      level: logLevel,
      datePattern: 'YYYY-MM-DD',
      dirname: logDir + '/debug', // log file /logs/debug/*.log in save
      filename: `%DATE%.log`,
      maxFiles: 30, // 30 Days saved
      json: false,
      zippedArchive: true
    }),
    // error log setting
    new winstonDaily({
      level: 'error',
      datePattern: 'YYYY-MM-DD',
      dirname: logDir + '/error', // log file /logs/error/*.log in save
      filename: `%DATE%.log`,
      maxFiles: 30, // 30 Days saved
      handleExceptions: true,
      json: false,
      zippedArchive: true
    })
  ]
});

loggerInstance.add(
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.splat(),
      winston.format.colorize()
    )
  })
);

// if (process.env.NODE_ENV === 'test') {
//   logger.transports.forEach((t) => (t.silent = true));
// }

const stream = {
  write: (message: string) => {
    loggerInstance.info(message.substring(0, message.lastIndexOf('\n')));
  }
};

/**
 * A Logger type extension to be used project wide.
 *
 * @property {Function} info - Logs informational messages.
 * @property {Function} warn - Logs warning messages.
 * @property {Function} error - Logs error messages.
 * @example
 * ```ts
 *  const log: AppLogger = logger;
 *  log.info("Informational message");
 *  log.info({hello:"world"});
 *  log.warn("Warning message");
 *  log.error("Error message");
 * ```
 */
interface AppLogger {
  info: (...args: unknown[]) => void;
  warn: (...args: unknown[]) => void;
  error: (...args: unknown[]) => void;
}

const stringifyArgs = (args: unknown[]): string => {
  return args
    .map((arg) => (typeof arg === 'string' ? arg : JSON.stringify(arg)))
    .join(' ');
};

const logger: AppLogger = {
  info: (...args) => {
    const message = stringifyArgs(args);
    loggerInstance.info(message);
  },
  warn: (...args) => {
    const message = stringifyArgs(args);
    loggerInstance.warn(message);
  },
  error: (...args) => {
    const message = stringifyArgs(args);
    loggerInstance.error(message);
  }
};

export { logger, stream };
