const Usuario = require('../Models/usuario');

exports.getAllUsuarios = (req, res) => {
  Usuario.getAll((err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao obter usuários' });
    }
    res.status(200).json(results);
  });
};

exports.getUsuarioById = (req, res) => {
  const { id } = req.params;
  Usuario.getById(id, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao obter usuário' });
    }
    res.status(200).json(results);
  });
};

exports.createUsuario = (req, res) => {
  const { nome, email, login, senha, admin } = req.body;
  const newUsuario = {
    NOME: nome,
    EMAIL: email,
    LOGIN: login,
    SENHA: senha,
    ADMIN: admin || 'N',
    ATIVO: 'S',
    DATACAD: new Date()
  };
  Usuario.create(newUsuario, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao criar usuário' });
    }
    res.status(201).json({ message: 'Usuário criado com sucesso!' });
  });
};

exports.updateUsuario = (req, res) => {
  const { id } = req.params;
  const { nome, email, login, senha, admin, ativo } = req.body;
  const updatedData = {
    NOME: nome,
    EMAIL: email,
    LOGIN: login,
    SENHA: senha,
    ADMIN: admin,
    ATIVO: ativo
  };
  Usuario.update(id, updatedData, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao atualizar usuário' });
    }
    res.status(200).json({ message: 'Usuário atualizado com sucesso!' });
  });
};

exports.deleteUsuario = (req, res) => {
  const { id } = req.params;
  Usuario.delete(id, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao deletar usuário' });
    }
    res.status(200).json({ message: 'Usuário deletado com sucesso!' });
  });
};
