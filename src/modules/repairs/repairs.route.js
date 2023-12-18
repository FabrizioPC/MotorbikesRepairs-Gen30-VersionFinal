import express from 'express';
import {
  createRepair,
  deleteRepair,
  findAllRepairs,
  findOneRepair,
  updateRepair,
} from './repairs.controller.js';
import { servicePending } from './repairs.middleware.js';
import { protect, restrictTo } from '../users/users.middleware.js';

export const router = express.Router();

router.use(protect);

router.route('/').post(createRepair);

router.use(restrictTo('employee'));

router.route('/').get(findAllRepairs);
router
  .route('/:id')
  .get(servicePending, findOneRepair)
  .patch(servicePending, updateRepair)
  .delete(deleteRepair);
