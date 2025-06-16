const db = require('../config/db');
const { DataTypes } = require('sequelize');

const Atendimento = db.define('Atendimento', {
  IDATENDIMENTO: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  IDPET: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  IDCOLABORADOR: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  IDUSUARIO: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  PESO: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  DATAHORA: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  MEDICAMENTO: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  DIAGNOSTICO: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  OBSERVACAO: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  DATACAD: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'atendimento', 
  timestamps: false,
});

Atendimento.getAll = (callback) => {
  Atendimento.findAll({
    order: [['DATAHORA', 'DESC']]
  })
  .then(results => callback(null, results))
  .catch(err => callback(err, null));
};

Atendimento.getById = (id, callback) => {
  Atendimento.findByPk(id)
  .then(result => callback(null, result))
  .catch(err => callback(err, null));
};

Atendimento.create = (data, callback) => {
  Atendimento.create(data)
  .then(result => callback(null, result))
  .catch(err => callback(err, null));
};

Atendimento.update = (id, data, callback) => {
  Atendimento.update(data, { where: { IDATENDIMENTO: id } })
  .then(result => callback(null, result))
  .catch(err => callback(err, null));
};

Atendimento.delete = (id, callback) => {
  Atendimento.destroy({ where: { IDATENDIMENTO: id } })
  .then(result => callback(null, result))
  .catch(err => callback(err, null));
};

Atendimento.getByPet = (idPet, callback) => {
  Atendimento.findAll({
    where: { IDPET: idPet },
    order: [['DATAHORA', 'DESC']]
  })
  .then(results => callback(null, results))
  .catch(err => callback(err, null));
};

Atendimento.getByColaborador = (idColaborador, callback) => {
  Atendimento.findAll({
    where: { IDCOLABORADOR: idColaborador },
    order: [['DATAHORA', 'DESC']]
  })
  .then(results => callback(null, results))
  .catch(err => callback(err, null));
};

Atendimento.getByUsuario = (idUsuario, callback) => {
  Atendimento.findAll({
    where: { IDUSUARIO: idUsuario },
    order: [['DATAHORA', 'DESC']]
  })
  .then(results => callback(null, results))
  .catch(err => callback(err, null));
};

module.exports = Atendimento;