const express = require('express');
const router = express.Router();
const AtendimentoController = require('../Controller/atendimentoController');

router.get('/', AtendimentoController.getAll);
router.get('/pet/:petId', AtendimentoController.getByPetId);
router.get('/colaborador/:colaboradorId', AtendimentoController.getByColaboradorId);
router.get('/usuario/:usuarioId', AtendimentoController.getByUsuarioId);
router.get('/data/:data', AtendimentoController.getByDate);
router.get('/:id', AtendimentoController.getById);
router.post('/', AtendimentoController.create);
router.put('/:id', AtendimentoController.update);
router.delete('/:id', AtendimentoController.delete);

module.exports = router;