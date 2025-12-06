const sequelize = require('./src/Config/db');
const { Pet, Usuario, Colaborador, Atendimento, Vacina } = require('./src/Models/index');

async function syncDatabase() {
  try {
    console.log('🔄 Iniciando sincronização do banco de dados...\n');

    // Testar conexão
    await sequelize.authenticate();
    console.log('✅ Conexão com o banco de dados estabelecida com sucesso!\n');

    // Sincronizar todos os modelos (alter: true vai adicionar/modificar colunas sem deletar dados)
    console.log('📊 Sincronizando modelos...\n');

    await sequelize.sync({ alter: true });

    console.log('✅ Todos os modelos foram sincronizados com sucesso!\n');

    // Listar as tabelas criadas/atualizadas
    console.log('📋 Tabelas sincronizadas:');
    console.log('   - pet');
    console.log('   - usuario');
    console.log('   - colaborador');
    console.log('   - atendimento');
    console.log('   - vacina\n');

    console.log('✅ Sincronização completa! O banco de dados está atualizado.\n');

  } catch (error) {
    console.error('❌ Erro ao sincronizar banco de dados:', error);
    console.error('\nDetalhes do erro:', error.message);
  } finally {
    await sequelize.close();
    console.log('🔌 Conexão com o banco de dados encerrada.');
  }
}

// Executar a sincronização
syncDatabase();
