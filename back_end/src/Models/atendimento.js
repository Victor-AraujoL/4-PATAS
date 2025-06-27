const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Atendimento = sequelize.define('Atendimento', {
  IDATENDIMENTO: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  IDPET: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'pet',
      key: 'IDPET'
    }
  },
  IDCOLABORADOR: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'colaborador', 
      key: 'IDCOLABORADOR'
    }
  },
  IDUSUARIO: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'usuario',
      key: 'IDUSUARIO'
    }
  },
  PESO: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  DATAHORA: {
    type: DataTypes.DATE,
    allowNull: false
  },
  MEDICAMENTO: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  DIAGNOSTICO: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  OBSERVACAO: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  DATACAD: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'atendimento',
  timestamps: false
});

module.exports = Atendimento;