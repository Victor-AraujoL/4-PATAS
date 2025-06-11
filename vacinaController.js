const vacinaService = require('../services/vacinaService');

const vacinaController = {
  async listar(req, res) {
    try {
      const vacinas = await vacinaService.listar();
      res.json(vacinas);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async buscarPorId(req, res) {
    try {
      const vacina = await vacinaService.buscarPorId(req.params.id);
      if (!vacina) return res.status(404).json({ error: "Vacina não encontrada" });
      res.json(vacina);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async criar(req, res) {
    try {
      const nova = await vacinaService.criar(req.body);
      res.status(201).json(nova);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async atualizar(req, res) {
    try {
      const atualizada = await vacinaService.atualizar(req.params.id, req.body);
      if (!atualizada) return res.status(404).json({ error: "Vacina não encontrada" });
      res.json(atualizada);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async excluir(req, res) {
    try {
      const deletada = await vacinaService.excluir(req.params.id);
      if (!deletada) return res.status(404).json({ error: "Vacina não encontrada" });
      res.json({ message: "Vacina excluída com sucesso" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = vacinaController;
