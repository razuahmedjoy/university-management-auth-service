import { createLogger, format, transports } from 'winston';
import path from 'path';
const { combine, timestamp, label, printf } = format;
import DailyRotateFile from 'winston-daily-rotate-file';

// custom log format
const myFormat = printf(({ level, message, label, timestamp }) => {
    const date = new Date(timestamp);
    return `${date.toDateString()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
    level: 'info',
    format: combine(label({ label: 'UM' }), timestamp(), myFormat),
    transports: [
        new transports.Console(),
        new DailyRotateFile({
            filename: path.join(
                process.cwd(),
                'logs/winston/successes/UM-%DATE%-success.log'
            ),
            datePattern: 'YYYY-MM-DD-HH',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
        }),
    ],
});
const errorLogger = createLogger({
    level: 'error',
    format: combine(label({ label: 'UM' }), timestamp(), myFormat),
    transports: [
        new transports.Console(),
        new DailyRotateFile({
            filename: path.join(
                process.cwd(),
                'logs/winston/errors/UM-%DATE%-error.log'
            ),
            datePattern: 'YYYY-MM-DD-HH',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
        }),
    ],
});

export { logger, errorLogger };
