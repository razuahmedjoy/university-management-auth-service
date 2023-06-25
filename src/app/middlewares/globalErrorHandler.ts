import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import config from '../../config';
import { IGenericErrorMessage } from '../../interfaces/error';
import handleValidationError from '../../errors/handleValifationError';
import ApiError from '../../errors/ApiError';
// import { errorLogger } from "../../shared/logger";
import { ZodError } from 'zod';
import { handleZodError } from '../../errors/handleZodError';

const globalErrorHandler: ErrorRequestHandler = (
    err,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // config.env === 'development' ? console.log("🤳 Error from global Error handler ", err) : errorLogger.error(err);

    let statusCode = 500;
    let message = 'Something went wrong';
    let errorMessages: IGenericErrorMessage[] = [];

    if (err.name === 'ValidationError') {
        const sinplifiedError = handleValidationError(err);
        statusCode = sinplifiedError.statusCode;
        message = sinplifiedError.message;
        errorMessages = sinplifiedError.errorMessages;
    } else if (err instanceof ZodError) {
        const simplifiedError = handleZodError(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    } else if (err instanceof ApiError) {
        // console.log(err)
        statusCode = err?.statusCode;
        message = err?.message;
        errorMessages = err?.message
            ? [
                  {
                      path: '',
                      message: err?.message,
                  },
              ]
            : [];
    } else if (err instanceof Error) {
        message = err?.message;
        errorMessages = err?.message
            ? [
                  {
                      path: '',
                      message: err?.message,
                  },
              ]
            : [];
    }

    res.status(statusCode).json({
        success: false,
        message,
        errorMessages,
        stack: config.env === 'development' ? err.stack : undefined,
    });
    next();
};

export default globalErrorHandler;
