import express from 'express';
import {
  createUser,
  deleteUser,
  findAllUsers,
  findOneUserById,
  login,
  updateUser,
  changePassword,
} from './users.controller.js';
import {
  protect,
  protectAccountOwner,
  restrictTo,
  verifyUserExist,
} from './users.middleware.js';

export const router = express.Router();

router.route('/').post(createUser);

router.route('/login').post(login);

router.use(protect);

router.route('/').get(findAllUsers);

router.patch('/change-password', changePassword);

router
  .route('/:id')
  .get(restrictTo('employee'), verifyUserExist, findOneUserById)
  .patch(verifyUserExist, protectAccountOwner, updateUser)
  .delete(verifyUserExist, protectAccountOwner, deleteUser);
