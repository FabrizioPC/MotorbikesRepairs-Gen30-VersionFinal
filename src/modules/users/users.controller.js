import { AppError } from '../../common/errors/appError.js';
import { catchAsync } from '../../common/errors/catchAsync.js';
import {
  encryptedPassword,
  verifyPassword,
} from '../../config/plugins/encripted-password.plugin.js';
import generateJWT from '../../config/plugins/generate-jwt.plugin.js';
import {
  validateLogin,
  validateUpdateUser,
  validateUser,
} from './users.schema.js';
import { UsersService } from './users.service.js';

const usersService = new UsersService();

export const login = catchAsync(async (req, res, next) => {
  const { hasError, errorMessages, userData } = validateLogin(req.body);
  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessages,
    });
  }

  const userExist = await usersService.findUserByEmail(userData.email);

  if (!userExist) {
    return next(new AppError('This account does not exist', 404));
  }

  const isCorrectPassword = await verifyPassword(
    userData.password,
    userExist.password
  );

  if (!isCorrectPassword) {
    return next(new AppError('Incorrect email or password', 401));
  }

  const token = await generateJWT(userExist.id);

  return res.status(200).json({
    token,
    user: {
      id: userExist.id,
      name: userExist.name,
      email: userExist.email,
      role: userExist.role,
    },
  });
});

export const findAllUsers = catchAsync(async (req, res, next) => {
  const users = await usersService.findAllUsers();
  return res.status(200).json(users);
});

export const createUser = catchAsync(async (req, res, next) => {
  const { hasError, errorMessages, userData } = validateUser(req.body);

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessages,
    });
  }

  const userExist = await usersService.findUserByEmail(userData.email);
  if (userExist) {
    return next(new AppError('User with this email already exist', 404));
  }
  const newUser = await usersService.createUser(userData);

  const token = await generateJWT(newUser.id);

  return res.status(201).json({
    token,
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    },
  });
});

export const findOneUserById = catchAsync(async (req, res, next) => {
  const { user } = req;

  return res.status(200).json(user);
});

export const updateUser = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { hasError, errorMessages, userData } = validateUpdateUser(req.body);
  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessages,
    });
  }
  const updatedUser = await usersService.updateUser(user, userData);

  return res.status(200).json(updatedUser);
});

export const deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  await usersService.deleteUser(user);
  return res.status(204).json(null);
});

export const changePassword = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  const { currentPassword, newPassword } = req.body;

  if (currentPassword === newPassword) {
    return next(new AppError('The password cannot be equal', 400));
  }

  const isCorrectPassword = await verifyPassword(
    currentPassword,
    sessionUser.password
  );

  if (!isCorrectPassword) {
    return next(new AppError('Incorrect email or password', 401));
  }

  const hashedNewPassword = await encryptedPassword(newPassword);

  await usersService.updateUser(sessionUser, {
    password: hashedNewPassword,
    passwordChangedAt: new Date(),
  });
  return res.status(200).json({
    message: 'The user password was updated succesfully!',
  });
});
