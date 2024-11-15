const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Experiencia = sequelize.define('Experiencia', {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  empresa: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  duracao: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Experiencia;
