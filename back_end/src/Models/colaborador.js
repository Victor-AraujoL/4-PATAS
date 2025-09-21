const db = require('../config/db');
const { DataTypes } = require('sequelize');

const Colaborador = db.define('Colaborador', {
  IDCOLABORADOR: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
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
  tableName: 'colaborador', 
  timestamps: false,
});

module.exports = Colaborador;
