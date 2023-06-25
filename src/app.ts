import express, { Application, Request, Response } from 'express';
import { UserRoutes } from './app/modules/users/user.route';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
const app: Application = express();
import cors from 'cors';
// import ApiError from './errors/ApiError'

app.use(cors());
// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application Routes
app.use('/api/v1/users', UserRoutes);

// testing
app.get('/', async (req: Request, res: Response) => {
    // throw new ApiError(400,'Custom error checking')
    // throw new Error('Custom error checking')
    res.send('Hello World');

    // next('Custom error checking')
});

app.use(globalErrorHandler);

export default app;
