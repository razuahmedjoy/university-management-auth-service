import { IGenerticErrorMessage } from './error';

export type IGenericErrorResponse = {
    statusCode: number;
    message: string;
    errorMessages: IGenerticErrorMessage[];
    stack?: string;
};
