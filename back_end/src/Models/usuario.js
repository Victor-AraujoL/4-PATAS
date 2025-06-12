const db = require('../config/db');
const { DataTypes } = require('sequelize');

const Usuario = db.define('Usuario', {
  IDUSUARIO: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  NOME: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  EMAIL: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  LOGIN: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  SENHA: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  ADMIN: {
    type: DataTypes.STRING(1),
    defaultValue: 'N',
    allowNull: true,
  },
  ATIVO: {
    type: DataTypes.STRING(1),
    defaultValue: 'S',
    allowNull: true,
  },
  DATACAD: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: 'usuario',
  timestamps: false,
});

module.exports = Usuario;