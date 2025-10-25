// models/db.js
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("cadastro", "root", "Mudar@1234", {
  host: "localhost",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => console.log("Banco de dados conectado com sucesso!"))
  .catch((err) => console.error("Erro ao conectar ao banco de dados:", err));

module.exports = {
  Sequelize: Sequelize,
  sequelize: sequelize,
};
