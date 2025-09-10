const Atendimento = require('../Models/atendimento');

const getAllAtendimentos = async (req, res) => {
  try {
    const atendimentos = await Atendimento.findAll({
      order: [['DATAHORA', 'DESC']]
    });
    res.json(atendimentos);
  } catch (err) {
    console.error("Erro ao buscar atendimentos:", err);
    res.status(500).json({ message: 'Erro ao buscar atendimentos' });
  }
};

const getAtendimentoById = async (req, res) => {
  const { id } = req.params;
  try {
    const atendimento = await Atendimento.findByPk(id);
    if (!atendimento) {
      return res.status(404).json({ message: 'Atendimento não encontrado' });
    }
    res.json(atendimento);
  } catch (err) {
    console.error("Erro ao buscar atendimento:", err);
    res.status(500).json({ message: 'Erro ao buscar atendimento' });
  }
};

const createAtendimento = async (req, res) => {
  const data = req.body;
  try {
    if (!data.DATACAD) {
      data.DATACAD = new Date();
    }
    
    const atendimento = await Atendimento.create(data);
    res.status(201).json({ 
      message: 'Atendimento criado com sucesso', 
      id: atendimento.IDATENDIMENTO,
      atendimento: atendimento
    });
  } catch (err) {
    console.error("Erro ao criar atendimento:", err);
    res.status(500).json({ message: 'Erro ao criar atendimento', error: err.message });
  }
};

const updateAtendimento = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const atendimento = await Atendimento.findByPk(id);
    if (!atendimento) {
      return res.status(404).json({ message: 'Atendimento não encontrado' });
    }
    
    await atendimento.update(data);
    const atendimentoAtualizado = await Atendimento.findByPk(id);
    res.json({ 
      message: 'Atendimento atualizado com sucesso',
      atendimento: atendimentoAtualizado
    });
  } catch (err) {
    console.error("Erro ao atualizar atendimento:", err);
    res.status(500).json({ message: 'Erro ao atualizar atendimento' });
  }
};

const deleteAtendimento = async (req, res) => {
  const { id } = req.params;
  try {
    const atendimento = await Atendimento.findByPk(id);
    if (!atendimento) {
      return res.status(404).json({ message: 'Atendimento não encontrado' });
    }
    await atendimento.destroy();
    res.json({ message: 'Atendimento deletado com sucesso' });
  } catch (err) {
    console.error("Erro ao deletar atendimento:", err);
    res.status(500).json({ message: 'Erro ao deletar atendimento' });
  }
};

const getAtendimentosByPet = async (req, res) => {
  const { idPet } = req.params;
  try {
    const atendimentos = await Atendimento.findAll({
      where: { IDPET: idPet },
      order: [['DATAHORA', 'DESC']]
    });
    res.json(atendimentos);
  } catch (err) {
    console.error("Erro ao buscar atendimentos do pet:", err);
    res.status(500).json({ message: 'Erro ao buscar atendimentos do pet' });
  }
};

const getAtendimentosByColaborador = async (req, res) => {
  const { idColaborador } = req.params;
  try {
    const atendimentos = await Atendimento.findAll({
      where: { IDCOLABORADOR: idColaborador },
      order: [['DATAHORA', 'DESC']]
    });
    res.json(atendimentos);
  } catch (err) {
    console.error("Erro ao buscar atendimentos do colaborador:", err);
    res.status(500).json({ message: 'Erro ao buscar atendimentos do colaborador' });
  }
};

const getAtendimentosByUsuario = async (req, res) => {
  const { idUsuario } = req.params;
  try {
    const atendimentos = await Atendimento.findAll({
      where: { IDUSUARIO: idUsuario },
      order: [['DATAHORA', 'DESC']]
    });
    res.json(atendimentos);
  } catch (err) {
    console.error("Erro ao buscar atendimentos do usuário:", err);
    res.status(500).json({ message: 'Erro ao buscar atendimentos do usuário' });
  }
};

module.exports = {
  getAllAtendimentos,
  getAtendimentoById,
  createAtendimento,
  updateAtendimento,
  deleteAtendimento,
  getAtendimentosByPet,
  getAtendimentosByColaborador,
  getAtendimentosByUsuario
};
