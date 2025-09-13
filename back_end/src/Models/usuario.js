const db = require('../config/db');
const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

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
    // bcrypt gera ~60 caracteres. Use 60 ou 255.
    type: DataTypes.STRING(60),
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

// Hook para garantir hash de senha em qualquer criação/atualização
Usuario.addHook('beforeSave', async (user) => {
  if (!user.SENHA) return;
  const val = user.SENHA.toString();
  // Evita re-hash se já estiver em formato bcrypt
  if (val.startsWith('$2a$') || val.startsWith('$2b$') || val.startsWith('$2y$')) return;
  const salt = await bcrypt.genSalt(10);
  user.SENHA = await bcrypt.hash(val, salt);
});

module.exports = Usuario;
