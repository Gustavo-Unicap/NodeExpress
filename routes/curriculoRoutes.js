const express = require('express');
const {
  //createCurriculo,
  getCurriculos,
  getCurriculoById,
  //updateCurriculo,
  deleteCurriculo,
  createCurriculoFull,
  updateCurriculoFull,
} = require('../controllers/curriculoController');

const router = express.Router();

router.post('/', createCurriculoFull);
router.get('/', getCurriculos);
router.get('/:id', getCurriculoById);
router.put('/:id', updateCurriculoFull);
router.delete('/:id', deleteCurriculo);

module.exports = router;
