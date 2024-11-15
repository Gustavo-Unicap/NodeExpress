const express = require('express');
const {
  createHabilidade,
  getHabilidades,
  getHabilidadeById,
  updateHabilidade,
  deleteHabilidade,
} = require('../controllers/habilidadeController');

const router = express.Router();

router.post('/', createHabilidade);
router.get('/', getHabilidades);
router.get('/:id', getHabilidadeById);
router.put('/:id', updateHabilidade);
router.delete('/:id', deleteHabilidade);

module.exports = router;
