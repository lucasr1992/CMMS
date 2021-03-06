import 'reflect-metadata';
import uploadConfig from './config/upload';

import express, { Request, Response, NextFunction} from 'express';
import cors from 'cors';
import 'express-async-errors';

import routes from './routes/Index';
import AppError from './errors/AppError';
import './database/Index';



const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: 'internal server error',
  });
});


app.listen(3333, () => {
  console.log('Server Run');
});

