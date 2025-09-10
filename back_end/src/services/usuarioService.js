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

// Login simples: valida por EMAIL ou LOGIN e compara SENHA em texto puro
// Em produção: trocar por hash (bcrypt) e JWT
const loginUsuario = async (req, res) => {
  try {
    const { email, login, senha, password } = req.body || {};

    const credencial = email || login;
    const senhaInformada = senha || password;

    if (!credencial || !senhaInformada) {
      return res.status(400).json({ message: 'Informe email/login e senha.' });
    }

    // Busca por EMAIL primeiro; se não encontrar, tenta LOGIN
    let usuario = null;
    if (email) {
      usuario = await Usuario.findOne({ where: { EMAIL: email } });
    }
    if (!usuario && login) {
      usuario = await Usuario.findOne({ where: { LOGIN: login } });
    }
    if (!usuario && !email && !login) {
      // Se o cliente mandou apenas "credencial" em email/login indistintamente
      usuario = await Usuario.findOne({ where: { EMAIL: credencial } })
        || await Usuario.findOne({ where: { LOGIN: credencial } });
    }

    if (!usuario) {
      return res.status(401).json({ message: 'Usuário não encontrado' });
    }

    // Comparação em texto puro (conforme modelo atual SENHA varchar(20))
    if (usuario.SENHA !== senhaInformada) {
      return res.status(401).json({ message: 'Senha inválida' });
    }

    // Retorna dados essenciais do usuário (evitar retornar SENHA)
    const payload = {
      id: usuario.IDUSUARIO,
      nome: usuario.NOME,
      email: usuario.EMAIL,
      login: usuario.LOGIN,
      admin: usuario.ADMIN,
      ativo: usuario.ATIVO,
    };

    return res.json({ message: 'Login realizado com sucesso', usuario: payload });
  } catch (err) {
    console.error('Erro no login:', err);
    return res.status(500).json({ message: 'Erro ao realizar login' });
  }
};

module.exports = {
  getAllUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario,
  loginUsuario,
};
