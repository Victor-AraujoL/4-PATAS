const express = require('express');
const router = express.Router();
const vacinaController = require('../Controller/vacinaController');

router.get('/', vacinaController.listar);
router.get('/:id', vacinaController.buscarPorId);
router.post('/', vacinaController.criar);
router.put('/:id', vacinaController.atualizar);
router.delete('/:id', vacinaController.excluir);

module.exports = router;
