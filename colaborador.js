// src/models/colaborador.js
const db = require('../config/db');
const { DataTypes } = require('sequelize');

// Definir o modelo de colaborador
const Colaborador = db.define('Colaborador', {
  IDCOLABORADOR: {
    type: DataTypes.INTEGER,
    primaryKey: true,  // Defina como chave primária
    autoIncrement: true,  // Deixe o campo autoincrementável
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefone: {
    type: DataTypes.STRING,
  },
  logradouro: {
    type: DataTypes.STRING,
  },
  numero: {
    type: DataTypes.STRING,
  },
  complemento: {
    type: DataTypes.STRING,
  },
  bairro: {
    type: DataTypes.STRING,
  },
  cidade: {
    type: DataTypes.STRING,
  },
  estado: {
    type: DataTypes.STRING,
  },
}, {
  tableName: 'colaborador',  // Nome da tabela no banco de dados (sem "s")
  timestamps: false,  // Se não tiver timestamps como 'createdAt' e 'updatedAt'
});

module.exports = Colaborador;
