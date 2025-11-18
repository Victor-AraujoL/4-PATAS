const db = require('../config/db');
const { DataTypes } = require('sequelize');

const Colaborador = db.define('Colaborador', {
  IDCOLABORADOR: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  NOME: {
    type: DataTypes.STRING(255),
    allowNull: true,
    field: 'NOME'
  },
  CARGO: {
    type: DataTypes.STRING(100),
    allowNull: true,
    field: 'CARGO'
  },
  CRMV: {
    type: DataTypes.STRING(50),
    allowNull: true,
    field: 'CRMV'
  },
  EMAIL: {
    type: DataTypes.STRING(255),
    allowNull: true,
    field: 'EMAIL'
  },
  TELEFONE: {
    type: DataTypes.STRING(20),
    allowNull: true,
    field: 'TELEFONE'
  },
  LOGRADOURO: {
    type: DataTypes.STRING(255),
    allowNull: true,
    field: 'LOGRADOURO'
  },
  NUMERO: {
    type: DataTypes.STRING(20),
    allowNull: true,
    field: 'NUMERO'
  },
  COMPLEMENTO: {
    type: DataTypes.STRING(100),
    allowNull: true,
    field: 'COMPLEMENTO'
  },
  BAIRRO: {
    type: DataTypes.STRING(100),
    allowNull: true,
    field: 'BAIRRO'
  },
  CIDADE: {
    type: DataTypes.STRING(100),
    allowNull: true,
    field: 'CIDADE'
  },
  ESTADO: {
    type: DataTypes.STRING(2),
    allowNull: true,
    defaultValue: 'MG',
    field: 'ESTADO'
  },
  ATIVO: {
    type: DataTypes.STRING(1),
    allowNull: true,
    defaultValue: 'S',
    field: 'ATIVO'
  },
  OBSERVACOES: {
    type: DataTypes.TEXT,
    allowNull: true,
    field: 'OBSERVACOES'
  },
  DATACAD: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'DATACAD'
  }
}, {
  tableName: 'colaborador',
  timestamps: false,
});

module.exports = Colaborador;
