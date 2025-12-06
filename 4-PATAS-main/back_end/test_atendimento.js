const fetch = require('node-fetch');

async function testAtendimento() {
  console.log('🧪 Testando criação de atendimento...\n');

  const atendimento = {
    IDPET: 1,
    IDCOLABORADOR: 1,
    RESPONSAVEL: 'Teste da Silva',
    PESO: 12,
    DATAHORA: '2025-12-06T15:08:00',
    MEDICAMENTO: 'Anti verme',
    DIAGNOSTICO: 'Teste de diagnóstico',
    OBSERVACAO: 'Teste de observação',
    DATACAD: new Date().toISOString()
  };

  try {
    console.log('📤 Enviando dados do atendimento:');
    console.log(JSON.stringify(atendimento, null, 2));
    console.log();

    const response = await fetch('http://localhost:3000/api/atendimentos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(atendimento)
    });

    const result = await response.json();

    if (response.ok) {
      console.log('✅ Atendimento criado com sucesso!');
      console.log('\n📥 Resposta do servidor:');
      console.log(JSON.stringify(result, null, 2));
    } else {
      console.log('❌ Erro ao criar atendimento:');
      console.log('Status:', response.status);
      console.log('Resposta:', JSON.stringify(result, null, 2));
    }
  } catch (error) {
    console.error('❌ Erro ao testar:', error.message);
  }
}

testAtendimento();
