const { Sequelize } = require('sequelize'); // Uso de PascalCase para a Classe

const db = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false // Opcional: desativa o log dos SQLs no terminal se preferir
});

module.exports = db;