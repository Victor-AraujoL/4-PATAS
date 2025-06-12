const petService = require('../services/petService');

const PetService = require('../services/petService');

const createPet = async (req, res) => {
  const {
    NOME, ESPECIE, RACA, COR, PORTE, IDADE, PESO, CARACTERISTICAS,
    SITUACAO_ADOCAO, CASTRADO, SEXO, ORIGEM, LOGRADOURO, NUMERO,
    COMPLEMENTO, BAIRRO, CIDADE, ESTADO, TELEFONE, RESPONSAVEL,
    FOTO, ATIVO, DATACAD
  } = req.body;

  try {
    const pet = await PetService.createPet({
      NOME, ESPECIE, RACA, COR, PORTE, IDADE, PESO, CARACTERISTICAS,
      SITUACAO_ADOCAO, CASTRADO, SEXO, ORIGEM, LOGRADOURO, NUMERO,
      COMPLEMENTO, BAIRRO, CIDADE, ESTADO, TELEFONE, RESPONSAVEL,
      FOTO, ATIVO, DATACAD
    });
    res.status(201).json({ message: "Pet criado com sucesso!", pet });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao criar pet", error: err });
  }
};

module.exports = {
  createPet
};


const getAllPets = async (req, res) => {
  const { success, pets, error } = await petService.getAllPets();
  if (success) {
    return res.status(200).json(pets);
  }
  return res.status(500).json({ message: 'Erro ao buscar pets', error });
};

const getPetById = async (req, res) => {
  const { success, pet, error } = await petService.getPetById(req.params.id);
  if (success) {
    return res.status(200).json(pet);
  }
  return res.status(404).json({ message: 'Pet não encontrado', error });
};

const updatePet = async (req, res) => {
  const { success, pet, error } = await petService.updatePet(req.params.id, req.body);
  if (success) {
    return res.status(200).json({ message: 'Pet atualizado com sucesso!', pet });
  }
  return res.status(404).json({ message: 'Pet não encontrado', error });
};

const deletePet = async (req, res) => {
  const { success, error } = await petService.deletePet(req.params.id);
  if (success) {
    return res.status(200).json({ message: 'Pet deletado com sucesso!' });
  }
  return res.status(404).json({ message: 'Pet não encontrado', error });
};

module.exports = {
  createPet,
  getAllPets,
  getPetById,
  updatePet,
  deletePet
};
