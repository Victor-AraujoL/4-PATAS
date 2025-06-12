const express = require('express');
const router = express.Router();
const PetController = require('../Controller/petController'); // Caminho corrigido

router.post('/', PetController.createPet);
router.get('/', PetController.getAllPets);
router.get('/:id', PetController.getPetById);
router.put('/:id', PetController.updatePet);
router.delete('/:id', PetController.deletePet);

module.exports = router;
