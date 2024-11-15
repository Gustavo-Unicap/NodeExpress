const { Habilidade } = require('../models');

// Criar uma nova habilidade
const createHabilidade = async (req, res) => {
  try {
    const habilidade = await Habilidade.create(req.body);
    res.status(201).json(habilidade);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar habilidade.' });
  }
};

// Listar todas as habilidades
const getHabilidades = async (req, res) => {
  try {
    const habilidades = await Habilidade.findAll();
    res.json(habilidades);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar habilidades.' });
  }
};

// Buscar uma habilidade por ID
const getHabilidadeById = async (req, res) => {
  try {
    const { id } = req.params;
    const habilidade = await Habilidade.findByPk(id);
    if (!habilidade) return res.status(404).json({ error: 'Habilidade não encontrada.' });
    res.json(habilidade);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar habilidade.' });
  }
};

// Atualizar uma habilidade
const updateHabilidade = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Habilidade.update(req.body, { where: { id } });
    if (!updated) return res.status(404).json({ error: 'Habilidade não encontrada.' });
    const updatedHabilidade = await Habilidade.findByPk(id);
    res.json(updatedHabilidade);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar habilidade.' });
  }
};

// Excluir uma habilidade
const deleteHabilidade = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Habilidade.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ error: 'Habilidade não encontrada.' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir habilidade.' });
  }
};

module.exports = {
  createHabilidade,
  getHabilidades,
  getHabilidadeById,
  updateHabilidade,
  deleteHabilidade,
};
