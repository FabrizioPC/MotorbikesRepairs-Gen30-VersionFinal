import { AppError } from '../../common/errors/appError.js';
import { catchAsync } from '../../common/errors/catchAsync.js';
import { validateRepairSchema } from './repairs.schema.js';
import { RepairService } from './repairs.service.js';

const repairsService = new RepairService();

export const findAllRepairs = catchAsync(async (req, res, next) => {
  const repairs = await repairsService.findAllRepairs();
  return res.status(200).json(repairs);
});

export const findOneRepair = catchAsync(async (req, res, next) => {
  const { repair } = req;
  return res.status(200).json(repair);
});

export const createRepair = catchAsync(async (req, res, next) => {
  const { hasError, errorMessages, repairData } = validateRepairSchema(
    req.body
  );
  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessages,
    });
  }
  const repair = await repairsService.createRepair(repairData);
  return res.status(201).json(repair);
});

export const updateRepair = catchAsync(async (req, res, next) => {
  const { repair } = req;
  const updatedRepair = await repairsService.updateRepair(repair);
  return res.status(200).json(updatedRepair);
});

export const deleteRepair = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const repair = await repairsService.findOneRepair(id);
  if (!repair) {
    return next(new AppError(`Repair with id: ${id} not found`, 404));
  }
  if (repair.status === 'completed') {
    return next(
      new AppError(`The repair is completed, it cannot be cancelled`, 400)
    );
  }
  await repairsService.deleteRepair(repair);
  return res.status(204).json(null);
});
