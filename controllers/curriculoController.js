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
      include: [Habilidade, Experiencia],
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
      include: [Habilidade, Experiencia],
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

module.exports = {
  createCurriculo,
  getCurriculos,
  getCurriculoById,
  updateCurriculo,
  deleteCurriculo,
};
