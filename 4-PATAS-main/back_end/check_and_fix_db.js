// Script to check and fix the vacina table structure
const { Sequelize } = require('sequelize');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: console.log
  }
);

async function checkAndFixDatabase() {
  try {
    console.log('Conectando ao banco de dados...');
    await sequelize.authenticate();
    console.log('✓ Conexão estabelecida com sucesso!\n');

    // Verificar estrutura atual da tabela
    console.log('Estrutura atual da tabela vacina:');
    const [columns] = await sequelize.query('DESCRIBE vacina');
    console.table(columns);

    console.log('\n--- Verificando e adicionando colunas necessárias ---\n');

    // Verificar se as colunas existem
    const columnNames = columns.map(col => col.Field);

    const requiredColumns = [
      { name: 'Lote', definition: 'VARCHAR(100) NULL' },
      { name: 'Data_validade', definition: 'DATE NULL' },
      { name: 'Marca', definition: 'VARCHAR(255) NULL' },
      { name: 'Fornecedor', definition: 'VARCHAR(255) NULL' }
    ];

    for (const col of requiredColumns) {
      if (!columnNames.includes(col.name)) {
        console.log(`❌ Coluna '${col.name}' não encontrada. Adicionando...`);
        try {
          await sequelize.query(`ALTER TABLE vacina ADD COLUMN ${col.name} ${col.definition}`);
          console.log(`✓ Coluna '${col.name}' adicionada com sucesso!`);
        } catch (error) {
          console.error(`✗ Erro ao adicionar coluna '${col.name}':`, error.message);
        }
      } else {
        console.log(`✓ Coluna '${col.name}' já existe.`);
      }
    }

    // Verificar estrutura final da tabela
    console.log('\n--- Estrutura final da tabela vacina ---');
    const [finalColumns] = await sequelize.query('DESCRIBE vacina');
    console.table(finalColumns);

    console.log('\n✓ Processo concluído!');
  } catch (error) {
    console.error('Erro:', error);
  } finally {
    await sequelize.close();
  }
}

checkAndFixDatabase();
