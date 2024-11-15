const sequelize = require('../config/database');
const Curriculo = require('./curriculo');
const Habilidade = require('./habilidade');
const Experiencia = require('./experiencia');

// Definindo relações
Curriculo.hasMany(Habilidade, { foreignKey: 'curriculoId',onDelete: 'CASCADE', });
Curriculo.hasMany(Experiencia, { foreignKey: 'curriculoId' ,onDelete: 'CASCADE',});
Habilidade.belongsTo(Curriculo, { foreignKey: 'curriculoId' });
Experiencia.belongsTo(Curriculo, { foreignKey: 'curriculoId' });

module.exports = {
  sequelize,
  Curriculo,
  Habilidade,
  Experiencia,
};
