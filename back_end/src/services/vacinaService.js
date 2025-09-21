const Vacina = require('../Models/vacina');

const vacinaService = {
  async listar() {
    return await Vacina.findAll();
  },

  async buscarPorId(id) {
    return await Vacina.findByPk(id);
  },

  async criar(dados) {
    return await Vacina.create(dados);
  },

  async atualizar(id, dados) {
    const vacina = await Vacina.findByPk(id);
    if (!vacina) return null;
    return await vacina.update(dados);
  },

  async excluir(id) {
    const vacina = await Vacina.findByPk(id);
    if (!vacina) return null;
    await vacina.destroy();
    return true;
  }
};

module.exports = vacinaService;
