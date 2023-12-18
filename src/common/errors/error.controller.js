import { envs } from '../../config/enviroments/enviroments.js';
import { AppError } from './appError.js';
import Error from './error.model.js';

const handleCastError23505 = () => {
  return new AppError('Duplicate field value: please another value', 400);
};
const handleCasterror22P02 = () => {
  return new AppError('Invalid data type in database', 400);
};
const handleJWTExpiredError = () => {
  return new AppError('Your token has expired! Please login again', 401);
};
const handleJWTError = () => {
  return new AppError('Invalid Token. Please login again', 401);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err,
  });
};

const sendErrorProd = async (err, res) => {
  await Error.create({
    status: err.status,
    message: err.message,
    stack: err.stack,
  });

  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error('ERROR 🧨', err);
    res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong!',
    });
  }
};

export const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'fail';

  if (envs.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  }
  if (envs.NODE_ENV === 'production') {
    let error = err;

    if (err.parent?.code === '23505') error = handleCastError23505();
    if (err.parent?.code === '22P02') error = handleCasterror22P02();
    if (err.name === 'TokenExpiredError') error = handleJWTExpiredError();
    if (err.name === 'JsonWebTokenError') error = handleJWTError();

    sendErrorProd(error, res);
  }
};
