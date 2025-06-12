// src/services/petService.js
// src/services/petService.js
const Pet = require('../Models/pet');

const createPet = async (data) => {
  try {
    const pet = await Pet.create(data);
    return pet;
  } catch (error) {
    throw new Error("Erro ao criar pet: " + error.message);
  }
};

module.exports = {
  createPet
};

const getAllPets = async () => {
  try {
    const pets = await Pet.findAll();
    return { success: true, pets };
  } catch (error) {
    console.error('Erro ao buscar pets:', error);
    return { success: false, error: error.message };
  }
};

const getPetById = async (id) => {
  try {
    const pet = await Pet.findByPk(id);
    if (!pet) {
      return { success: false, error: 'Pet não encontrado' };
    }
    return { success: true, pet };
  } catch (error) {
    console.error('Erro ao buscar pet:', error);
    return { success: false, error: error.message };
  }
};

const updatePet = async (id, data) => {
  try {
    const pet = await Pet.findByPk(id);
    if (!pet) {
      return { success: false, error: 'Pet não encontrado' };
    }
    await pet.update(data);
    return { success: true, pet };
  } catch (error) {
    console.error('Erro ao atualizar pet:', error);
    return { success: false, error: error.message };
  }
};

const deletePet = async (id) => {
  try {
    const pet = await Pet.findByPk(id);
    if (!pet) {
      return { success: false, error: 'Pet não encontrado' };
    }
    await pet.destroy();
    return { success: true };
  } catch (error) {
    console.error('Erro ao deletar pet:', error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  createPet,
  getAllPets,
  getPetById,
  updatePet,
  deletePet,
};
