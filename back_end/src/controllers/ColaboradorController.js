const db = require('../config/db');
const Colaborador = require('../models/Colaborador');

// Listar todos os colaboradores
exports.getAll = async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM colaborador');
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar colaboradores', detalhes: err.message });
  }
};

// Buscar colaborador por ID
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const [results] = await db.query('SELECT * FROM colaborador WHERE IDCOLABORADOR = ?', [id]);

    if (results.length === 0) {
      return res.status(404).json({ error: 'Colaborador não encontrado' });
    }

    res.json(results[0]);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar colaborador', detalhes: err.message });
  }
};

// Criar novo colaborador
exports.create = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Corpo da requisição vazio!" });
    }

    const { nome, telefone, logradouro, numero, complemento, bairro, cidade, estado } = req.body;

    if (!nome) {
      return res.status(400).json({ error: "O campo 'nome' é obrigatório!" });
    }

    const colaboradorData = {
      NOME: nome.trim(),
      TELEFONE: telefone ? telefone.trim() : null,
      LOGRADOURO: logradouro ? logradouro.trim() : null,
      NUMERO: numero ? numero.trim() : null,
      COMPLEMENTO: complemento ? complemento.trim() : null,
      BAIRRO: bairro ? bairro.trim() : null,
      CIDADE: cidade ? cidade.trim() : null,
      ESTADO: estado ? estado.trim().toUpperCase() : 'MG',
      ATIVO: 'S'
    };

    const novoColaborador = await Colaborador.criar(colaboradorData);

    res.status(201).json({
      message: "Colaborador cadastrado!",
      data: novoColaborador
    });
  } catch (error) {
    console.error("Erro no cadastro:", error);
    res.status(500).json({
      error: "Erro interno no servidor",
      detalhes: error.message
    });
  }
};

// Atualizar colaborador
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const [result] = await db.query('UPDATE colaborador SET ? WHERE IDCOLABORADOR = ?', [data, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Colaborador não encontrado' });
    }

    res.json({ message: 'Colaborador atualizado!' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar colaborador', detalhes: err.message });
  }
};

// Deletar colaborador
exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.query('DELETE FROM colaborador WHERE IDCOLABORADOR = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Colaborador não encontrado' });
    }

    res.json({ message: 'Colaborador removido!' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao remover colaborador', detalhes: err.message });
  }
};
