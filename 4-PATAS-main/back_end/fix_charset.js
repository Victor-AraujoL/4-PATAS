const mysql = require('mysql2/promise');
require('dotenv').config();

async function fixCharset() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });

  try {
    console.log('🔧 Corrigindo charset e collation do banco de dados...\n');

    // Alterar charset do banco de dados
    console.log('📊 Alterando charset do banco de dados para utf8mb4...');
    await connection.query(`ALTER DATABASE ${process.env.DB_NAME} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
    console.log('✅ Charset do banco alterado!\n');

    // Lista de tabelas
    const tables = ['pet', 'usuario', 'colaborador', 'atendimento', 'vacina'];

    for (const table of tables) {
      console.log(`🔄 Convertendo tabela: ${table}`);

      // Converter tabela para utf8mb4
      await connection.query(`ALTER TABLE ${table} CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
      console.log(`✅ Tabela ${table} convertida!`);
    }

    console.log('\n✅ Todas as tabelas foram convertidas para utf8mb4_unicode_ci!\n');

    // Verificar charset atual
    console.log('📋 Verificando charset das tabelas:\n');
    const [tableInfo] = await connection.query(`
      SELECT TABLE_NAME, TABLE_COLLATION
      FROM information_schema.TABLES
      WHERE TABLE_SCHEMA = '${process.env.DB_NAME}'
      ORDER BY TABLE_NAME
    `);

    console.table(tableInfo);

  } catch (error) {
    console.error('❌ Erro ao corrigir charset:', error.message);
  } finally {
    await connection.end();
    console.log('\n🔌 Conexão encerrada.');
  }
}

fixCharset();
