const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Vacina = sequelize.define('vacina', {
  IDVACINA: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  NOME: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  Lote: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  Data_validade: {
    type: DataTypes.DATE,
    allowNull: true
  },
  Fornecedor: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  Marca: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  ATIVO: {
    type: DataTypes.STRING(1),
    defaultValue: 'S'
  },
  DATACAD: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'vacina',
  timestamps: false
});

module.exports = Vacina;
