import Repairs from '../../modules/repairs/repairs.model.js';
import User from '../../modules/users/users.model.js';

export const initModel = () => {
  User.hasMany(Repairs);
  Repairs.belongsTo(User);
};
