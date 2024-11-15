const express = require('express');
const bodyParser = require('body-parser');
const curriculoRoutes = require('./routes/curriculoRoutes');
const habilidadeRoutes = require('./routes/habilidadeRoutes');
const experienciaRoutes = require('./routes/experienciaRoutes');
const { sequelize } = require('./models');

const app = express();
app.use(bodyParser.json());

// Rotas
app.use('/api/curriculos', curriculoRoutes);
app.use('/api/habilidades', habilidadeRoutes);
app.use('/api/experiencias', experienciaRoutes);

// Porta para Render
const PORT = process.env.PORT || 3000;

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log('Banco de dados sincronizado.');
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((error) => console.error('Erro ao sincronizar banco de dados:', error));
