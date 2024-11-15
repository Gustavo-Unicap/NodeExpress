const { Experiencia } = require('../models');

// Criar uma nova experiência
const createExperiencia = async (req, res) => {
  try {
    const experiencia = await Experiencia.create(req.body);
    res.status(201).json(experiencia);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar experiência.' });
  }
};

// Listar todas as experiências
const getExperiencias = async (req, res) => {
  try {
    const experiencias = await Experiencia.findAll();
    res.json(experiencias);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar experiências.' });
  }
};

// Buscar uma experiência por ID
const getExperienciaById = async (req, res) => {
  try {
    const { id } = req.params;
    const experiencia = await Experiencia.findByPk(id);
    if (!experiencia) return res.status(404).json({ error: 'Experiência não encontrada.' });
    res.json(experiencia);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar experiência.' });
  }
};

// Atualizar uma experiência
const updateExperiencia = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Experiencia.update(req.body, { where: { id } });
    if (!updated) return res.status(404).json({ error: 'Experiência não encontrada.' });
    const updatedExperiencia = await Experiencia.findByPk(id);
    res.json(updatedExperiencia);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar experiência.' });
  }
};

// Excluir uma experiência
const deleteExperiencia = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Experiencia.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ error: 'Experiência não encontrada.' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir experiência.' });
  }
};

module.exports = {
  createExperiencia,
  getExperiencias,
  getExperienciaById,
  updateExperiencia,
  deleteExperiencia,
};
