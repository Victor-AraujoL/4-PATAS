const Colaborador = require('../Models/colaborador');

const getAllColaboradores = async (req, res) => {
  try {
    const colaboradores = await Colaborador.findAll();
    res.json(colaboradores);
  } catch (err) {
    console.error("Erro ao buscar colaboradores:", err);  // Log do erro
    res.status(500).json({ message: 'Erro ao buscar colaboradores' });
  }
};

const getColaboradorById = async (req, res) => {
  const { id } = req.params;
  try {
    const colaborador = await Colaborador.findByPk(id);
    if (!colaborador) {
      return res.status(404).json({ message: 'Colaborador não encontrado' });
    }
    res.json(colaborador);
  } catch (err) {
    console.error("Erro ao buscar colaborador:", err);  // Log do erro
    res.status(500).json({ message: 'Erro ao buscar colaborador' });
  }
};

const createColaborador = async (req, res) => {
  const data = req.body;
  try {
    const colaborador = await Colaborador.create(data);
    res.status(201).json({ message: 'Colaborador criado com sucesso', id: colaborador.id });
  } catch (err) {
    console.error("Erro ao criar colaborador:", err); 
    res.status(500).json({ message: 'Erro ao criar colaborador', error: err.message }); 
  }
};

const updateColaborador = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const colaborador = await Colaborador.findByPk(id);
    if (!colaborador) {
      return res.status(404).json({ message: 'Colaborador não encontrado' });
    }
    await colaborador.update(data);
    res.json({ message: 'Colaborador atualizado com sucesso' });
  } catch (err) {
    console.error("Erro ao atualizar colaborador:", err); 
    res.status(500).json({ message: 'Erro ao atualizar colaborador' });
  }
};

const deleteColaborador = async (req, res) => {
  const { id } = req.params;
  try {
    const colaborador = await Colaborador.findByPk(id);
    if (!colaborador) {
      return res.status(404).json({ message: 'Colaborador não encontrado' });
    }
    await colaborador.destroy();
    res.json({ message: 'Colaborador deletado com sucesso' });
  } catch (err) {
    console.error("Erro ao deletar colaborador:", err);  // Log do erro
    res.status(500).json({ message: 'Erro ao deletar colaborador' });
  }
};

module.exports = {
  getAllColaboradores,
  getColaboradorById,
  createColaborador,
  updateColaborador,
  deleteColaborador
};
