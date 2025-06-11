// src/Models/pet.js
const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/db');

const Pet = db.define('Pet', {
  IDPET: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  NOME: {
    type: DataTypes.STRING
  },
  ESPECIE: {
    type: DataTypes.STRING
  },
  RACA: {
    type: DataTypes.STRING
  },
  COR: {
    type: DataTypes.STRING
  },
  PORTE: {
    type: DataTypes.STRING
  },
  IDADE: {
    type: DataTypes.STRING
  },
  PESO: {
    type: DataTypes.FLOAT
  },
  CARACTERISTICAS: {
    type: DataTypes.TEXT
  },
  SITUACAO_ADOCAO: {
    type: DataTypes.STRING
  },
  CASTRADO: {
    type: DataTypes.STRING
  },
  SEXO: {
    type: DataTypes.STRING
  },
  ORIGEM: {
    type: DataTypes.STRING
  },
  LOGRADOURO: {
    type: DataTypes.STRING
  },
  NUMERO: {
    type: DataTypes.STRING
  },
  COMPLEMENTO: {
    type: DataTypes.STRING
  },
  BAIRRO: {
    type: DataTypes.STRING
  },
  CIDADE: {
    type: DataTypes.STRING
  },
  ESTADO: {
    type: DataTypes.STRING
  },
  TELEFONE: {
    type: DataTypes.STRING
  },
  RESPONSAVEL: {
    type: DataTypes.STRING
  },
  FOTO: {
    type: DataTypes.STRING
  },
  ATIVO: {
    type: DataTypes.STRING
  },
  DATACAD: {
    type: DataTypes.DATE
  }
}, {
  tableName: 'pet',
  timestamps: false
});

module.exports = Pet;
