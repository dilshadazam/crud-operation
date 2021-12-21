import Sequelize from "sequelize";

const sequelize = new Sequelize(
  "localhost",
  "root",
  "root",
  {
    dialect: "mysql",
    host: "localhost",
    logging: false,
  },

  {
    pool: {
      maax: 100,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

export default sequelize;
