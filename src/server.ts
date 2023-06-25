import mongoose from 'mongoose';
import app from './app';
import config from './config';
import { logger, errorLogger } from './shared/logger';
import { Server } from 'http';

process.on('uncaughtException', err => {
    errorLogger.error(err);
    process.exit(1);
});

let server: Server;

async function bootstrap() {
    try {
        await mongoose.connect(config.databaseURL as string);

        logger.info('Database connected Successfully');

        server = app.listen(config.port, () => {
            logger.info(
                `Server is running on port http://localhost:${config.port}`
            );
        });
    } catch (err) {
        errorLogger.error(err);
    }

    process.on('unhandledRejection', err => {
        console.log(
            'Unhandled Rejection is Detected, we Are closing our server...'
        );

        if (server) {
            server.close(() => {
                errorLogger.error(err);
                process.exit(1);
            });
        } else {
            process.exit(1);
        }
    });
}

bootstrap();

process.on('SIGTERM', () => {
    logger.info('SIGTERM is Detected, we Are closing our server...');
    if (server) {
        server.close();
    }
});
