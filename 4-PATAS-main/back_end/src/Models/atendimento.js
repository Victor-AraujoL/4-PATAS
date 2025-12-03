const { DataTypes } = require('sequelize');
const sequelize = require('../Config/db');

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
  RESPONSAVEL: {
    type: DataTypes.STRING(255),
    allowNull: false
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