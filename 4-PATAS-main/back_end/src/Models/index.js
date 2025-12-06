// ====================================
// IMPORTAR TODOS OS MODELS
// ====================================
const Atendimento = require('./atendimento');
const Pet = require('./pet');
const Colaborador = require('./colaborador');
const Usuario = require('./usuario');
const Vacina = require('./vacina');

// ====================================
// CONFIGURAR RELACIONAMENTOS SEQUELIZE
// ====================================

// Atendimento pertence a Pet (Many-to-One)
Atendimento.belongsTo(Pet, {
  foreignKey: 'IDPET',
  as: 'pet'
});

// Atendimento pertence a Colaborador (Many-to-One)
Atendimento.belongsTo(Colaborador, {
  foreignKey: 'IDCOLABORADOR',
  as: 'colaborador'
});

// Atendimento pertence a Vacina (Many-to-One)
Atendimento.belongsTo(Vacina, {
  foreignKey: 'IDVACINA',
  as: 'vacina'
});

// Relacionamentos inversos (One-to-Many) - opcional mas recomendado
Pet.hasMany(Atendimento, {
  foreignKey: 'IDPET',
  as: 'atendimentos'
});

Colaborador.hasMany(Atendimento, {
  foreignKey: 'IDCOLABORADOR',
  as: 'atendimentos'
});

Vacina.hasMany(Atendimento, {
  foreignKey: 'IDVACINA',
  as: 'atendimentos'
});

console.log('✅ Relacionamentos Sequelize configurados com sucesso!');

// ====================================
// EXPORTAR MODELS COM RELACIONAMENTOS
// ====================================
module.exports = {
  Atendimento,
  Pet,
  Colaborador,
  Usuario,
  Vacina
};
