const PDFDocument = require('pdfkit');

class APIDocumentationController {
  
  static async gerarDocumentacaoCompleta(req, res) {
    try {
      const doc = new PDFDocument({ margin: 50 });
      
      // Configurar headers para download
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=pet-care-api-documentation.pdf');
      
      // Conectar o PDF ao response
      doc.pipe(res);
      
      // === PÁGINA DE CAPA ===
      doc.fontSize(24).fillColor('blue').text('QuatroPatas API', 50, 100);
      doc.fontSize(20).fillColor('black').text('Documentação Técnica dos Endpoints', 50, 140);
      doc.fontSize(12).text(`Versão: 1.0.0`, 50, 180);
      doc.text(`Gerado em: ${new Date().toLocaleDateString('pt-BR')}`, 50, 200);
      doc.text(`Sistema de Gestão Veterinária`, 50, 220);
      
      // Informações gerais
      doc.fontSize(14).fillColor('darkblue').text('INFORMAÇÕES GERAIS', 50, 280);
      doc.fontSize(10).fillColor('black').text('Base URL: http://localhost:3000', 50, 300);
      doc.text('Content-Type: application/json', 50, 315);
      doc.text('Métodos suportados: GET, POST, PUT, DELETE', 50, 330);
      
      // === NOVA PÁGINA - ÍNDICE ===
      doc.addPage();
      doc.fontSize(18).fillColor('darkblue').text('ÍNDICE', 50, 50);
      doc.fontSize(12).fillColor('black');
      
      let yPos = 80;
      const sections = [
        '1. Pets ......................................................... 3',
        '2. Usuários ..................................................... 4', 
        '3. Colaboradores ................................................ 5',
        '4. Vacinas ..................................................... 6',
        '5. Atendimentos ................................................ 7',
        '6. Relatórios PDF .............................................. 8',
        '7. Códigos de Status ........................................... 9'
      ];
      
      sections.forEach(section => {
        doc.text(section, 50, yPos);
        yPos += 20;
      });
      
      // === SEÇÃO 1: PETS ===
      doc.addPage();
      doc.fontSize(18).fillColor('darkblue').text('1. PETS', 50, 50);
      doc.fontSize(12).fillColor('black').text('Endpoints para gerenciamento de pets', 50, 75);
      
      yPos = 100;
      
      // GET /api/pets
      doc.fontSize(14).fillColor('green').text('GET /api/pets', 50, yPos);
      yPos += 20;
      doc.fontSize(10).fillColor('black').text('Descrição: Lista todos os pets cadastrados', 70, yPos);
      yPos += 15;
      doc.text('Parâmetros: Nenhum', 70, yPos);
      yPos += 15;
      doc.text('Resposta 200: Array de pets com id, nome, especie, raca, etc.', 70, yPos);
      yPos += 30;
      
      // POST /api/pets
      doc.fontSize(14).fillColor('blue').text('POST /api/pets', 50, yPos);
      yPos += 20;
      doc.fontSize(10).fillColor('black').text('Descrição: Cria um novo pet', 70, yPos);
      yPos += 15;
      doc.text('Body: JSON com nome, especie, raca, idade, usuarioId', 70, yPos);
      yPos += 15;
      doc.text('Resposta 201: Pet criado com sucesso', 70, yPos);
      yPos += 30;
      
      // GET /api/pets/:id
      doc.fontSize(14).fillColor('green').text('GET /api/pets/{id}', 50, yPos);
      yPos += 20;
      doc.fontSize(10).fillColor('black').text('Descrição: Busca um pet específico pelo ID', 70, yPos);
      yPos += 15;
      doc.text('Parâmetros: id (integer) - ID do pet', 70, yPos);
      yPos += 15;
      doc.text('Exemplo: GET /api/pets/1', 70, yPos);
      yPos += 30;
      
      // PUT /api/pets/:id
      doc.fontSize(14).fillColor('orange').text('PUT /api/pets/{id}', 50, yPos);
      yPos += 20;
      doc.fontSize(10).fillColor('black').text('Descrição: Atualiza dados de um pet', 70, yPos);
      yPos += 15;
      doc.text('Parâmetros: id (integer) - ID do pet', 70, yPos);
      yPos += 15;
      doc.text('Body: Campos a serem atualizados', 70, yPos);
      yPos += 30;
      
      // DELETE /api/pets/:id
      doc.fontSize(14).fillColor('red').text('DELETE /api/pets/{id}', 50, yPos);
      yPos += 20;
      doc.fontSize(10).fillColor('black').text('Descrição: Remove um pet', 70, yPos);
      yPos += 15;
      doc.text('Parâmetros: id (integer) - ID do pet', 70, yPos);
      yPos += 15;
      doc.text('Resposta 200: Pet removido com sucesso', 70, yPos);
      
      // === SEÇÃO 2: USUÁRIOS ===
      doc.addPage();
      doc.fontSize(18).fillColor('darkblue').text('2. USUÁRIOS', 50, 50);
      doc.fontSize(12).fillColor('black').text('Endpoints para gerenciamento de proprietários', 50, 75);
      
      yPos = 100;
      const usuarioEndpoints = [
        { method: 'GET', url: '/api/usuarios', desc: 'Lista todos os usuários cadastrados' },
        { method: 'GET', url: '/api/usuarios/{id}', desc: 'Busca usuário por ID' },
        { method: 'POST', url: '/api/usuarios', desc: 'Cria novo usuário (nome, email obrigatórios)' },
        { method: 'PUT', url: '/api/usuarios/{id}', desc: 'Atualiza dados do usuário' },
        { method: 'DELETE', url: '/api/usuarios/{id}', desc: 'Remove usuário do sistema' }
      ];
      
      usuarioEndpoints.forEach(endpoint => {
        const color = endpoint.method === 'GET' ? 'green' : 
                     endpoint.method === 'POST' ? 'blue' :
                     endpoint.method === 'PUT' ? 'orange' : 'red';
        
        doc.fontSize(14).fillColor(color).text(`${endpoint.method} ${endpoint.url}`, 50, yPos);
        yPos += 15;
        doc.fontSize(10).fillColor('black').text(endpoint.desc, 70, yPos);
        yPos += 25;
      });
      
      // Schema do usuário
      yPos += 20;
      doc.fontSize(12).fillColor('darkblue').text('Campos do Usuário:', 50, yPos);
      yPos += 15;
      doc.fontSize(10).fillColor('black').text('• nome (obrigatório)', 70, yPos);
      yPos += 12;
      doc.text('• email (obrigatório)', 70, yPos);
      yPos += 12;
      doc.text('• telefone, endereco, cpf (opcionais)', 70, yPos);
      
      // === SEÇÃO 3: COLABORADORES ===
      doc.addPage();
      doc.fontSize(18).fillColor('darkblue').text('3. COLABORADORES', 50, 50);
      doc.fontSize(12).fillColor('black').text('Endpoints para gerenciamento de funcionários', 50, 75);
      
      yPos = 100;
      const colaboradorEndpoints = [
        { method: 'GET', url: '/api/colaboradores', desc: 'Lista todos os colaboradores' },
        { method: 'GET', url: '/api/colaboradores/{id}', desc: 'Busca colaborador por ID' },
        { method: 'POST', url: '/api/colaboradores', desc: 'Cria novo colaborador' },
        { method: 'PUT', url: '/api/colaboradores/{id}', desc: 'Atualiza dados do colaborador' },
        { method: 'DELETE', url: '/api/colaboradores/{id}', desc: 'Remove colaborador' }
      ];
      
      colaboradorEndpoints.forEach(endpoint => {
        const color = endpoint.method === 'GET' ? 'green' : 
                     endpoint.method === 'POST' ? 'blue' :
                     endpoint.method === 'PUT' ? 'orange' : 'red';
        
        doc.fontSize(14).fillColor(color).text(`${endpoint.method} ${endpoint.url}`, 50, yPos);
        yPos += 15;
        doc.fontSize(10).fillColor('black').text(endpoint.desc, 70, yPos);
        yPos += 25;
      });
      
      // Schema do colaborador
      yPos += 20;
      doc.fontSize(12).fillColor('darkblue').text('Campos do Colaborador:', 50, yPos);
      yPos += 15;
      doc.fontSize(10).fillColor('black').text('• nome, cargo, email (obrigatórios)', 70, yPos);
      yPos += 12;
      doc.text('• telefone, especialidade, crmv, salario (opcionais)', 70, yPos);
      
      // === SEÇÃO 4: VACINAS ===
      doc.addPage();
      doc.fontSize(18).fillColor('darkblue').text('4. VACINAS', 50, 50);
      doc.fontSize(12).fillColor('black').text('Endpoints para controle de estoque de vacinas', 50, 75);
      
      yPos = 100;
      const vacinaEndpoints = [
        { method: 'GET', url: '/api/vacinas', desc: 'Lista todas as vacinas em estoque' },
        { method: 'GET', url: '/api/vacinas/{id}', desc: 'Busca vacina específica por ID' },
        { method: 'POST', url: '/api/vacinas', desc: 'Cadastra nova vacina no estoque' },
        { method: 'PUT', url: '/api/vacinas/{id}', desc: 'Atualiza dados da vacina' },
        { method: 'DELETE', url: '/api/vacinas/{id}', desc: 'Remove vacina do estoque' }
      ];
      
      vacinaEndpoints.forEach(endpoint => {
        const color = endpoint.method === 'GET' ? 'green' : 
                     endpoint.method === 'POST' ? 'blue' :
                     endpoint.method === 'PUT' ? 'orange' : 'red';
        
        doc.fontSize(14).fillColor(color).text(`${endpoint.method} ${endpoint.url}`, 50, yPos);
        yPos += 15;
        doc.fontSize(10).fillColor('black').text(endpoint.desc, 70, yPos);
        yPos += 25;
      });
      
      // Schema da vacina
      yPos += 20;
      doc.fontSize(12).fillColor('darkblue').text('Campos da Vacina:', 50, yPos);
      yPos += 15;
      doc.fontSize(10).fillColor('black').text('• nome, fabricante, lote (obrigatórios)', 70, yPos);
      yPos += 12;
      doc.text('• dataVencimento, tipoAnimal, estoque (opcionais)', 70, yPos);
      
      // === SEÇÃO 5: ATENDIMENTOS ===
      doc.addPage();
      doc.fontSize(18).fillColor('darkblue').text('5. ATENDIMENTOS', 50, 50);
      doc.fontSize(12).fillColor('black').text('Endpoints para gestão de consultas e procedimentos', 50, 75);
      
      yPos = 100;
      
      // Endpoints principais
      doc.fontSize(14).fillColor('green').text('GET /api/atendimentos', 50, yPos);
      yPos += 15;
      doc.fontSize(10).fillColor('black').text('Lista todos os atendimentos', 70, yPos);
      yPos += 25;
      
      // Endpoints de filtro
      doc.fontSize(12).fillColor('darkblue').text('Endpoints de Filtro Específico:', 50, yPos);
      yPos += 20;
      
      const filtros = [
        'GET /api/atendimentos/pet/{petId} - Atendimentos de um pet',
        'GET /api/atendimentos/colaborador/{colaboradorId} - Por veterinário',
        'GET /api/atendimentos/usuario/{usuarioId} - Por proprietário',
        'GET /api/atendimentos/data/{data} - Por data (YYYY-MM-DD)'
      ];
      
      filtros.forEach(filtro => {
        doc.fontSize(10).fillColor('green').text(filtro, 70, yPos);
        yPos += 15;
      });
      
      yPos += 20;
      
      // Outros métodos
      doc.fontSize(14).fillColor('blue').text('POST /api/atendimentos', 50, yPos);
      yPos += 15;
      doc.fontSize(10).fillColor('black').text('Cria novo atendimento', 70, yPos);
      yPos += 20;
      
      doc.fontSize(14).fillColor('orange').text('PUT /api/atendimentos/{id}', 50, yPos);
      yPos += 15;
      doc.fontSize(10).fillColor('black').text('Atualiza atendimento existente', 70, yPos);
      yPos += 20;
      
      doc.fontSize(14).fillColor('red').text('DELETE /api/atendimentos/{id}', 50, yPos);
      yPos += 15;
      doc.fontSize(10).fillColor('black').text('Remove atendimento', 70, yPos);
      yPos += 30;
      
      // Campos obrigatórios
      doc.fontSize(12).fillColor('darkblue').text('Campos Obrigatórios para Criação:', 50, yPos);
      yPos += 15;
      doc.fontSize(10).fillColor('black').text('• petId, colaboradorId, usuarioId', 70, yPos);
      yPos += 12;
      doc.text('• dataAtendimento, tipoAtendimento', 70, yPos);
      
      // === SEÇÃO 6: RELATÓRIOS PDF ===
      doc.addPage();
      doc.fontSize(18).fillColor('darkblue').text('6. RELATÓRIOS PDF', 50, 50);
      doc.fontSize(12).fillColor('black').text('Endpoints para geração de relatórios em PDF', 50, 75);
      
      yPos = 100;
      
      const relatorios = [
        {
          endpoint: 'GET /api/pdf/pets',
          desc: 'Relatório completo de todos os pets',
          params: 'Nenhum parâmetro'
        },
        {
          endpoint: 'GET /api/pdf/atendimentos',
          desc: 'Relatório de atendimentos com filtros',
          params: 'Query: dataInicio, dataFim (opcionais)'
        },
        {
          endpoint: 'GET /api/pdf/pets/{id}/ficha',
          desc: 'Ficha individual detalhada do pet',
          params: 'Path: id do pet'
        },
        {
          endpoint: 'GET /api/pdf/colaboradores',
          desc: 'Relatório de todos os funcionários',
          params: 'Nenhum parâmetro'
        },
        {
          endpoint: 'GET /api/pdf/vacinas',
          desc: 'Relatório de estoque de vacinas',
          params: 'Nenhum parâmetro'
        },
        {
          endpoint: 'GET /api/pdf/documentacao',
          desc: 'Esta documentação completa da API',
          params: 'Nenhum parâmetro'
        }
      ];
      
      relatorios.forEach(rel => {
        doc.fontSize(14).fillColor('purple').text(rel.endpoint, 50, yPos);
        yPos += 15;
        doc.fontSize(10).fillColor('black').text(`Descrição: ${rel.desc}`, 70, yPos);
        yPos += 12;
        doc.text(`Parâmetros: ${rel.params}`, 70, yPos);
        yPos += 12;
        doc.text('Resposta: Arquivo PDF para download', 70, yPos);
        yPos += 25;
      });
      
      // Exemplo de uso
      yPos += 15;
      doc.fontSize(12).fillColor('darkblue').text('Exemplo de Uso com Filtro:', 50, yPos);
      yPos += 15;
      doc.font('Courier').fontSize(9).fillColor('black').text('GET /api/pdf/atendimentos?dataInicio=2024-01-01&dataFim=2024-12-31', 70, yPos);
      
      // === SEÇÃO 7: CÓDIGOS DE STATUS ===
      doc.addPage();
      doc.fontSize(18).fillColor('darkblue').text('7. CÓDIGOS DE STATUS HTTP', 50, 50);
      
      yPos = 80;
      
      const statusCodes = [
        { code: '200', desc: 'OK - Requisição bem-sucedida' },
        { code: '201', desc: 'Created - Recurso criado com sucesso' },
        { code: '400', desc: 'Bad Request - Dados inválidos ou malformados' },
        { code: '404', desc: 'Not Found - Recurso não encontrado' },
        { code: '500', desc: 'Internal Server Error - Erro interno do servidor' }
      ];
      
      statusCodes.forEach(status => {
        doc.fontSize(12).fillColor('darkgreen').text(status.code, 50, yPos);
        doc.fillColor('black').text(status.desc, 100, yPos);
        yPos += 20;
      });
      
      yPos += 30;
      doc.fontSize(14).fillColor('darkblue').text('Estrutura de Resposta de Erro:', 50, yPos);
      yPos += 20;
      doc.font('Courier').fontSize(9).fillColor('black').text('{', 70, yPos);
      yPos += 12;
      doc.text('  "erro": "Mensagem descritiva do erro"', 70, yPos);
      yPos += 12;
      doc.text('}', 70, yPos);
      
      yPos += 40;
      doc.font('Helvetica').fontSize(14).fillColor('darkblue').text('Exemplos de Uso:', 50, yPos);
      yPos += 20;
      
      doc.fontSize(12).fillColor('darkblue').text('1. Cadastrar um novo pet:', 50, yPos);
      yPos += 15;
      doc.font('Courier').fontSize(9).fillColor('black').text('POST /api/pets', 70, yPos);
      yPos += 12;
      doc.text('Body: {"nome": "Rex", "especie": "Cão", "usuarioId": 1}', 70, yPos);
      yPos += 25;
      
      doc.font('Helvetica').fontSize(12).fillColor('darkblue').text('2. Buscar atendimentos por data:', 50, yPos);
      yPos += 15;
      doc.font('Courier').fontSize(9).fillColor('black').text('GET /api/atendimentos/data/2024-06-27', 70, yPos);
      yPos += 25;
      
      doc.font('Helvetica').fontSize(12).fillColor('darkblue').text('3. Gerar relatório PDF:', 50, yPos);
      yPos += 15;
      doc.font('Courier').fontSize(9).fillColor('black').text('GET /api/pdf/pets', 70, yPos);
      
      // Rodapé final
      yPos += 50;
      doc.font('Helvetica').fontSize(10).fillColor('gray').text('QuatroPatas API - Documentação Técnica v1.0.0', 50, yPos);
      yPos += 15;
      doc.text(`Documento gerado em ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}`, 50, yPos);
      
      // Finalizar o PDF
      doc.end();
      
    } catch (error) {
      console.error('Erro ao gerar documentação PDF:', error);
      res.status(500).json({ 
        erro: 'Erro ao gerar documentação PDF',
        detalhes: error.message 
      });
    }
  }
}

module.exports = APIDocumentationController;