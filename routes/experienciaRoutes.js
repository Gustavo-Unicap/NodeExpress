const express = require('express');
const {
  createExperiencia,
  getExperiencias,
  getExperienciaById,
  updateExperiencia,
  deleteExperiencia,
} = require('../controllers/experienciaController');

const router = express.Router();

router.post('/', createExperiencia);
router.get('/', getExperiencias);
router.get('/:id', getExperienciaById);
router.put('/:id', updateExperiencia);
router.delete('/:id', deleteExperiencia);

module.exports = router;
