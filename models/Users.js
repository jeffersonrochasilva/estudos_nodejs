const db = require("./db");

const User = db.sequelize.define("User", {
  name: { type: db.Sequelize.STRING, allowNull: false },
  email: {
    type: db.Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true },
  },
  password: { type: db.Sequelize.STRING, allowNull: false },
});

User.sync({ force: false });
module.exports = User;
