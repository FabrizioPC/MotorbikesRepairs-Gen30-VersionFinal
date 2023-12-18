import { DataTypes } from 'sequelize';
import sequelize from '../../config/database/database.js';
import { encryptedPassword } from '../../config/plugins/encripted-password.plugin.js';

const User = sequelize.define(
  'Users',
  {
    id: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.INTEGER,
      field: 'users_id',
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
    passwordChangedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    role: {
      type: DataTypes.ENUM('client', 'employee'),
      allowNull: false,
      defaultValue: 'client',
    },
    status: {
      type: DataTypes.ENUM('available', 'disabled'),
      allowNull: false,
      defaultValue: 'available',
    },
  },
  {
    hooks: {
      beforeCreate: async (user) => {
        user.password = await encryptedPassword(user.password);
      },
    },
  }
);

export default User;
