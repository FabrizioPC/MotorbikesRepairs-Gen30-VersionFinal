import User from '../users/users.model.js';
import Repairs from './repairs.model.js';

export class RepairService {
  async findAllRepairs() {
    return await Repairs.findAll({
      where: {
        status: ['pending', 'completed'],
      },
      include: [
        {
          model: User,
        },
      ],
    });
  }
  async findOneRepair(id) {
    return await Repairs.findOne({
      where: {
        id,
      },
    });
  }
  async createRepair(data) {
    return await Repairs.create(data);
  }
  async updateRepair(repair) {
    return await repair.update({ status: 'completed' });
  }
  async deleteRepair(repair) {
    return await repair.update({ status: 'cancelled' });
  }
}
