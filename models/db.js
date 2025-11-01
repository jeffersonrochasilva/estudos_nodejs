const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

sequelize
  .authenticate()
  .then(() => console.log("Banco de dados conectado com sucesso!"))
  .catch((err) => console.error("Erro ao conectar ao banco de dados:", err));

module.exports = {
  Sequelize: Sequelize,
  sequelize: sequelize,
};
