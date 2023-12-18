import { catchAsync } from '../../common/errors/catchAsync.js';
import { RepairService } from './repairs.service.js';

const repairsService = new RepairService();

export const servicePending = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const repair = await repairsService.findOneRepair(id);
  if (!repair) {
    return next(new AppError(`Repair with id: ${id} not found`, 404));
  }
  if (repair.status !== 'pending') {
    return next(new AppError(`Repair its completed or cancelled`, 400));
  }
  req.repair = repair;
  next();
});
