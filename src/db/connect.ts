import { Sequelize } from "sequelize";

export const sequelizeInstance = new Sequelize({
  define: {
    timestamps: false,
  },
  dialect: "sqlite",
  storage: "path/to/database.sqlite",
});

const authenticateDatabaseConnection = async () => {
  try {
    await sequelizeInstance.authenticate();
    console.log("Database Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export default authenticateDatabaseConnection;
