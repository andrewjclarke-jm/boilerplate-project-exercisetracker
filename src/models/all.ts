import { DataTypes } from "sequelize";
import { sequelizeInstance } from "../db/index.js";

export const UserModel = sequelizeInstance.define("users", {
  username: { type: DataTypes.STRING, unique: true },
});

export const ExerciseModel = sequelizeInstance.define("exercises", {
  exerciseId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  duration: { type: DataTypes.INTEGER, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
  date: { type: DataTypes.STRING, allowNull: false },
});

UserModel.hasMany(ExerciseModel, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

ExerciseModel.belongsTo(UserModel);

UserModel.sync({ force: true })
  .then((_response) => console.log("\n\n\nUser model synced successfully"))
  .catch((error) => console.log("User model sync unsuccessful", error));

ExerciseModel.sync({ force: true })
  .then((_response) => console.log("\n\n\nExercise model synced successfully"))
  .catch((error) => console.log("Exercise model sync unsuccessful", error));
