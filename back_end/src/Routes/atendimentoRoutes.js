const express = require('express');
const router = express.Router();
const AtendimentoController = require('../Controller/atendimentoController');

router.get('/', AtendimentoController.getAllAtendimentos);
router.get('/:id', AtendimentoController.getAtendimentoById);
router.post('/', AtendimentoController.createAtendimento);
router.put('/:id', AtendimentoController.updateAtendimento);
router.delete('/:id', AtendimentoController.deleteAtendimento);
router.get('/pet/:idPet', AtendimentoController.getAtendimentosByPet);
router.get('/colaborador/:idColaborador', AtendimentoController.getAtendimentosByColaborador);
router.get('/usuario/:idUsuario', AtendimentoController.getAtendimentosByUsuario);

module.exports = router;