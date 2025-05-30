// Model para a tabela colaborador
const db = require('../config/db');


class Colaborador {
  // Listar todos os colaboradores
  static async listarTodos() {
    try {
      const [rows] = await db.query('SELECT * FROM colaborador WHERE ATIVO = ? ORDER BY NOME', ['S']);
      return rows;
    } catch (error) {
      throw new Error(`Erro ao listar colaboradores: ${error.message}`);
    }
  }

  // Buscar um colaborador pelo ID
  static async buscarPorId(id) {
    try {
      const [rows] = await db.query('SELECT * FROM colaborador WHERE IDCOLABORADOR = ?', [id]);
      return rows[0];
    } catch (error) {
      throw new Error(`Erro ao buscar colaborador: ${error.message}`);
    }
  }

  // Criar um novo colaborador
  static async criar(colaboradorData) {
    try {
      // Adiciona a data atual de cadastro
      colaboradorData.DATACAD = new Date();
      
      const [result] = await db.query(
        'INSERT INTO colaborador (NOME, TELEFONE, LOGRADOURO, NUMERO, COMPLEMENTO, BAIRRO, CIDADE, ESTADO, ATIVO, DATACAD) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          colaboradorData.NOME,
          colaboradorData.TELEFONE,
          colaboradorData.LOGRADOURO,
          colaboradorData.NUMERO,
          colaboradorData.COMPLEMENTO,
          colaboradorData.BAIRRO,
          colaboradorData.CIDADE,
          colaboradorData.ESTADO || 'MG',
          colaboradorData.ATIVO || 'S',
          colaboradorData.DATACAD
        ]
      );
      
      return { id: result.insertId, ...colaboradorData };
    } catch (error) {
      throw new Error(`Erro ao criar colaborador: ${error.message}`);
    }
  }

  // Atualizar um colaborador existente
  static async atualizar(id, colaboradorData) {
    try {
      const [result] = await db.query(
        'UPDATE colaborador SET NOME = ?, TELEFONE = ?, LOGRADOURO = ?, NUMERO = ?, COMPLEMENTO = ?, BAIRRO = ?, CIDADE = ?, ESTADO = ?, ATIVO = ? WHERE IDCOLABORADOR = ?',
        [
          colaboradorData.NOME,
          colaboradorData.TELEFONE,
          colaboradorData.LOGRADOURO,
          colaboradorData.NUMERO,
          colaboradorData.COMPLEMENTO,
          colaboradorData.BAIRRO,
          colaboradorData.CIDADE,
          colaboradorData.ESTADO || 'MG',
          colaboradorData.ATIVO || 'S',
          id
        ]
      );
      
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error(`Erro ao atualizar colaborador: ${error.message}`);
    }
  }

  // Excluir um colaborador (exclusão lógica - apenas marca como inativo)
  static async excluir(id) {
    try {
      const [result] = await db.query(
        'UPDATE colaborador SET ATIVO = ? WHERE IDCOLABORADOR = ?',
        ['N', id]
      );
      
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error(`Erro ao excluir colaborador: ${error.message}`);
    }
  }
}

module.exports = Colaborador;