const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Habilidade = sequelize.define('Habilidade', {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nivel: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Habilidade;
