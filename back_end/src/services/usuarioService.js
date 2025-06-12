const Usuario = require('../Models/usuario'); // ⚠️ Caminho ajustado para sua estrutura

const getAllUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (err) {
    console.error("Erro ao buscar usuários:", err);
    res.status(500).json({ message: 'Erro ao buscar usuários' });
  }
};

const getUsuarioById = async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.json(usuario);
  } catch (err) {
    console.error("Erro ao buscar usuário:", err);
    res.status(500).json({ message: 'Erro ao buscar usuário' });
  }
};

const createUsuario = async (req, res) => {
  const data = req.body;
  try {
    const usuario = await Usuario.create(data);
    res.status(201).json({ message: 'Usuário criado com sucesso', id: usuario.IDUSUARIO });
  } catch (err) {
    console.error("Erro ao criar usuário:", err);
    res.status(500).json({ message: 'Erro ao criar usuário', error: err.message });
  }
};

const updateUsuario = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    await usuario.update(data);
    res.json({ message: 'Usuário atualizado com sucesso' });
  } catch (err) {
    console.error("Erro ao atualizar usuário:", err);
    res.status(500).json({ message: 'Erro ao atualizar usuário' });
  }
};

const deleteUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    await usuario.destroy();
    res.json({ message: 'Usuário deletado com sucesso' });
  } catch (err) {
    console.error("Erro ao deletar usuário:", err);
    res.status(500).json({ message: 'Erro ao deletar usuário' });
  }
};

module.exports = {
  getAllUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario
};