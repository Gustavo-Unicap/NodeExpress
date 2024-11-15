const { Curriculo, Habilidade, Experiencia } = require('../models');

// Criar um novo currículo
const createCurriculo = async (req, res) => {
  try {
    const curriculo = await Curriculo.create(req.body);
    res.status(201).json(curriculo);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar currículo.' });
  }
};

// Listar todos os currículos com habilidades e experiências
const getCurriculos = async (req, res) => {
  try {
    const curriculos = await Curriculo.findAll({
      include: [
        { model: Habilidade, as: 'Habilidades' },
        { model: Experiencia, as: 'Experiencias' },
      ],
    });
    res.json(curriculos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar currículos.' });
  }
};

// Buscar um currículo por ID
const getCurriculoById = async (req, res) => {
  try {
    const { id } = req.params;
    const curriculo = await Curriculo.findByPk(id, {
      include: [
        { model: Habilidade, as: 'Habilidades' },
        { model: Experiencia, as: 'Experiencias' }, 
      ],
    });
    if (!curriculo) return res.status(404).json({ error: 'Currículo não encontrado.' });
    res.json(curriculo);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar currículo.' });
  }
};

// Atualizar um currículo
const updateCurriculo = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Curriculo.update(req.body, { where: { id } });
    if (!updated) return res.status(404).json({ error: 'Currículo não encontrado.' });
    const updatedCurriculo = await Curriculo.findByPk(id);
    res.json(updatedCurriculo);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar currículo.' });
  }
};

// Excluir um currículo
const deleteCurriculo = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Curriculo.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ error: 'Currículo não encontrado.' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir currículo.' });
  }
};

// Criar um currículo com habilidades e experiências
const createCurriculoFull = async (req, res) => {
  const { nome, descricao, habilidades, experiencias } = req.body;

  try {
    const curriculo = await Curriculo.create(
      {
        nome,
        descricao,
        Habilidades: habilidades,
        Experiencias: experiencias,
      },
      {
        include: [
          { model: Habilidade, as: 'Habilidades' },
          { model: Experiencia, as: 'Experiencias' },
        ],
      }
    );
    res.status(201).json(curriculo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar currículo com relações.' });
  }
};

const updateCurriculoFull = async (req, res) => {
  const { nome, descricao, Habilidades, Experiencias } = req.body;

  try {
    // Atualizando o Currículo
    const [updatedRows] = await Curriculo.update(
      { nome, descricao },
      { where: { id: req.params.id } }
    );

    // Verificando se o currículo foi encontrado e/ou atualizado
    if (updatedRows === 0) {
      return res.status(404).json({ error: 'Currículo não encontrado' });
    }

    // Atualizando ou criando as habilidades
    if (Habilidades && Habilidades.length > 0) {
      for (const habilidade of Habilidades) {
        if (habilidade.id) {
          // Se o ID da habilidade existe, atualiza
          await Habilidade.update(
            { titulo: habilidade.titulo, nivel: habilidade.nivel },
            { where: { id: habilidade.id } }
          );
        } else {
          // Caso contrário, cria
          await Habilidade.create({ 
            titulo: habilidade.titulo, 
            nivel: habilidade.nivel, 
            curriculoId: req.params.id 
          });
        }
      }
    }

    // Atualizando ou criando as experiências
    if (Experiencias && Experiencias.length > 0) {
      for (const experiencia of Experiencias) {
        if (experiencia.id) {
          // Se o ID da experiência existe, atualiza
          await Experiencia.update(
            { titulo: experiencia.titulo, empresa: experiencia.empresa, duracao: experiencia.duracao },
            { where: { id: experiencia.id } }
          );
        } else {
          // Caso contrário, cria
          await Experiencia.create({
            titulo: experiencia.titulo,
            empresa: experiencia.empresa,
            duracao: experiencia.duracao,
            curriculoId: req.params.id
          });
        }
      }
    }

    // Buscando o currículo atualizado com as suas habilidades e experiências
    const updatedCurriculo = await Curriculo.findOne({
      where: { id: req.params.id },
      include: [
        { model: Habilidade, as: 'Habilidades' },
        { model: Experiencia, as: 'Experiencias' }
      ]
    });

    // Retornando o currículo atualizado
    res.status(200).json(updatedCurriculo);
  } catch (error) {
    console.error('Erro ao atualizar currículo:', error);
    res.status(500).json({ error: 'Erro ao atualizar currículo com relações.' });
  }
};

module.exports = {
  createCurriculo,
  getCurriculos,
  getCurriculoById,
  updateCurriculo,
  deleteCurriculo,
  createCurriculoFull,
  updateCurriculoFull
};
