import { DataTypes } from "sequelize";
import sequelize from "../../config/database/database.js";

const User = sequelize.define("Users", {
   id: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.INTEGER,
      field: "users_id",
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
      type: DataTypes.STRING(100),
      allowNull: false,
   },
   role: {
      type: DataTypes.ENUM("client", "employee"),
   },
   status: {
      type: DataTypes.ENUM("available", "disabled"),
      defaultValue: "available",
   },
});

export default User;
