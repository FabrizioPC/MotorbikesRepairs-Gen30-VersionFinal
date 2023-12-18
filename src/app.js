import express from 'express';
import { router } from './routes/routes.js';
import { globalErrorHandler } from './common/errors/error.controller.js';
import { AppError } from './common/errors/appError.js';
import morgan from 'morgan';
import { envs } from './config/enviroments/enviroments.js';
import { enableCors } from './config/plugins/cors.plugin.js';

const app = express();
const ACCEPTED_ORIGINS = ['http://localhost:3000', 'http://localhost:8080'];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

enableCors(app, ACCEPTED_ORIGINS);

if (envs.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use('/api/v1', router);

app.use(globalErrorHandler);

app.all('*', (req, res, next) => {
  return next(
    new AppError(`Can't find ${req.originalUrl} on this server!`, 404)
  );
});

export default app;
