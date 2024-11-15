const express = require('express');
const {
  createCurriculo,
  getCurriculos,
  getCurriculoById,
  updateCurriculo,
  deleteCurriculo,
} = require('../controllers/curriculoController');

const router = express.Router();

router.post('/', createCurriculo);
router.get('/', getCurriculos);
router.get('/:id', getCurriculoById);
router.put('/:id', updateCurriculo);
router.delete('/:id', deleteCurriculo);

module.exports = router;
