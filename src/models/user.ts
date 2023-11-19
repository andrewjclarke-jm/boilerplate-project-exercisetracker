import { DataTypes } from "sequelize";
import { sequelizeInstance } from "../db/index.js";
import { error } from "console";

// User Schema/Model
const UserModel = sequelizeInstance.define("User", {
  _id: { type: DataTypes.STRING, primaryKey: true },
  username: { type: DataTypes.STRING, unique: true },
});

UserModel.sync({ alter: true })
  .then((_response) => console.log("User model synced successfully"))
  .catch((error) => console.log("User model sync unsuccessful", error));

export default UserModel;
