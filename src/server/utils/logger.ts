import winston, { transports } from 'winston';
import 'winston-mongodb';

const loggerInstance = winston.createLogger({
  format: winston.format.json(),
  transports: [
    new transports.Console({ level: 'info' }),
    new transports.Console({ level: 'warn', stderrLevels: ['warn'] }),
    new transports.MongoDB({
      db: process.env.MONGODB_URI as string,
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true
      },
      dbName: 'opensource-logs',
      collection: 'logs',
      label: 'vercel',
      level: 'info',
      metaKey: 'meta'
    })
  ]
});

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
type AppLoggerMethod = (message: string, data?: unknown) => void;

interface AppLogger {
  info: AppLoggerMethod;
  warn: AppLoggerMethod;
  error: AppLoggerMethod;
}

const logger: AppLogger = {
  info: (message: string, data = {}) => {
    loggerInstance.info('info', { message, meta: { data } });
  },
  warn: (message: string, data = {}) => {
    loggerInstance.warn('warn', { message, meta: { data } });
  },
  error: (message: string, data = {}) => {
    loggerInstance.error('error', { message, meta: { data } });
  }
};

export { logger };
