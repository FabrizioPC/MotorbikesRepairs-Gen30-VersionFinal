import express from 'express';
import {
  createRepair,
  deleteRepair,
  findAllRepairs,
  findOneRepair,
  updateRepair,
} from './repairs.controller.js';
import { servicePending } from './repairs.middleware.js';

export const router = express.Router();

router.route('/').get(findAllRepairs);
router.route('/').post(createRepair);
router
  .route('/:id')
  .get(servicePending, findOneRepair)
  .patch(servicePending, updateRepair)
  .delete(deleteRepair);
