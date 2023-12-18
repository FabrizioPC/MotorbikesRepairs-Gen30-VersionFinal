import { DataTypes } from "sequelize";
import sequelize from "../../config/database/database.js";

const Repairs = sequelize.define("repairs", {
   id: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.INTEGER,
   },
   date: {
      type: DataTypes.DATE,
      allowNull: false,
   },
   motorsNumber: {
      type: DataTypes.STRING,
      allowNull: false,
   },
   description: {
      type: DataTypes.STRING,
      allowNull: false,
   },
   userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
   },
   status: {
      type: DataTypes.ENUM("pending", "completed", "cancelled"),
      defaultValue: "pending",
      allowNull: false,
   },
});

export default Repairs;
