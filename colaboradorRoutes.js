// src/routes/colaboradorRoutes.js
const express = require('express');
const router = express.Router();
const ColaboradorController = require('../services/colaboradorService');

router.get('/', ColaboradorController.getAllColaboradores);
router.get('/:id', ColaboradorController.getColaboradorById);
router.post('/', ColaboradorController.createColaborador);
router.put('/:id', ColaboradorController.updateColaborador);
router.delete('/:id', ColaboradorController.deleteColaborador);

module.exports = router;
