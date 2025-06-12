const Colaborador = require('../Models/colaborador');

exports.getAllColaboradores = (req, res) => {
  Colaborador.getAll((err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao obter colaboradores' });
    }
    res.status(200).json(results);
  });
};

exports.getColaboradorById = (req, res) => {
  const { id } = req.params;
  Colaborador.getById(id, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao obter colaborador' });
    }
    res.status(200).json(results);
  });
};

exports.createColaborador = (req, res) => {
  const { nome, telefone, logradouro, numero, complemento, bairro, cidade, estado } = req.body;
  const newColaborador = {
    NOME: nome,
    TELEFONE: telefone,
    LOGRADOURO: logradouro,
    NUMERO: numero,
    COMPLEMENTO: complemento,
    BAIRRO: bairro,
    CIDADE: cidade,
    ESTADO: estado,
    ATIVO: 'S',
    DATACAD: new Date()
  };
  Colaborador.create(newColaborador, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao criar colaborador' });
    }
    res.status(201).json({ message: 'Colaborador criado com sucesso!' });
  });
};

exports.updateColaborador = (req, res) => {
  const { id } = req.params;
  const { nome, telefone, logradouro, numero, complemento, bairro, cidade, estado } = req.body;
  const updatedData = {
    NOME: nome,
    TELEFONE: telefone,
    LOGRADOURO: logradouro,
    NUMERO: numero,
    COMPLEMENTO: complemento,
    BAIRRO: bairro,
    CIDADE: cidade,
    ESTADO: estado
  };
  Colaborador.update(id, updatedData, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao atualizar colaborador' });
    }
    res.status(200).json({ message: 'Colaborador atualizado com sucesso!' });
  });
};

exports.deleteColaborador = (req, res) => {
  const { id } = req.params;
  Colaborador.delete(id, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao deletar colaborador' });
    }
    res.status(200).json({ message: 'Colaborador deletado com sucesso!' });
  });
};
