const PDFDocument = require('pdfkit');

class PDFController {
  
  // Gerar relatório de pets
  static async gerarRelatorioPets(req, res) {
    try {
      const doc = new PDFDocument();
      
      // Configurar headers para download
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=relatorio-pets.pdf');
      
      // Conectar o PDF ao response
      doc.pipe(res);
      
      // Cabeçalho do relatório
      doc.fontSize(20).text('Relatório de Pets', 50, 50);
      doc.fontSize(12).text(`Gerado em: ${new Date().toLocaleDateString('pt-BR')}`, 50, 80);
      doc.moveDown();
      
      // Aqui você buscaria os dados do banco
      // const pets = await PetService.getAllPets();
      
      // Exemplo de dados (substitua pela busca real)
      const pets = [
        { id: 1, nome: 'Rex', especie: 'Cão', raca: 'Golden', idade: 3 },
        { id: 2, nome: 'Miau', especie: 'Gato', raca: 'Persa', idade: 2 }
      ];
      
      // Cabeçalho da tabela
      let yPosition = 120;
      doc.text('ID', 50, yPosition);
      doc.text('Nome', 100, yPosition);
      doc.text('Espécie', 200, yPosition);
      doc.text('Raça', 300, yPosition);
      doc.text('Idade', 400, yPosition);
      
      // Linha separadora
      yPosition += 20;
      doc.moveTo(50, yPosition).lineTo(500, yPosition).stroke();
      
      // Dados dos pets
      pets.forEach((pet) => {
        yPosition += 25;
        doc.text(pet.id.toString(), 50, yPosition);
        doc.text(pet.nome, 100, yPosition);
        doc.text(pet.especie, 200, yPosition);
        doc.text(pet.raca || 'N/A', 300, yPosition);
        doc.text(pet.idade.toString(), 400, yPosition);
      });
      
      // Rodapé
      doc.fontSize(10).text('QuatroPatas - Sistema de Gestão', 50, 700);
      
      // Finalizar o PDF
      doc.end();
      
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      res.status(500).json({ erro: 'Erro ao gerar relatório PDF' });
    }
  }
  
  // Gerar relatório de atendimentos
  static async gerarRelatorioAtendimentos(req, res) {
    try {
      const { dataInicio, dataFim } = req.query;
      
      const doc = new PDFDocument();
      
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=relatorio-atendimentos.pdf');
      
      doc.pipe(res);
      
      // Cabeçalho
      doc.fontSize(20).text('Relatório de Atendimentos', 50, 50);
      doc.fontSize(12).text(`Período: ${dataInicio || 'Início'} até ${dataFim || 'Hoje'}`, 50, 80);
      doc.text(`Gerado em: ${new Date().toLocaleDateString('pt-BR')}`, 50, 100);
      doc.moveDown();
      
      // Exemplo de dados (substitua pela busca real)
      const atendimentos = [
        { 
          id: 1, 
          pet: 'Rex', 
          colaborador: 'Dr. Maria', 
          data: '2024-06-27', 
          tipo: 'Consulta',
          valor: 150.00 
        },
        { 
          id: 2, 
          pet: 'Miau', 
          colaborador: 'Dr. João', 
          data: '2024-06-26', 
          tipo: 'Vacinação',
          valor: 80.00 
        }
      ];
      
      // Cabeçalho da tabela
      let yPosition = 140;
      doc.text('ID', 50, yPosition);
      doc.text('Pet', 80, yPosition);
      doc.text('Veterinário', 150, yPosition);
      doc.text('Data', 250, yPosition);
      doc.text('Tipo', 320, yPosition);
      doc.text('Valor', 420, yPosition);
      
      // Linha separadora
      yPosition += 20;
      doc.moveTo(50, yPosition).lineTo(500, yPosition).stroke();
      
      let total = 0;
      
      // Dados dos atendimentos
      atendimentos.forEach((atendimento) => {
        yPosition += 25;
        doc.text(atendimento.id.toString(), 50, yPosition);
        doc.text(atendimento.pet, 80, yPosition);
        doc.text(atendimento.colaborador, 150, yPosition);
        doc.text(atendimento.data, 250, yPosition);
        doc.text(atendimento.tipo, 320, yPosition);
        doc.text(`R$ ${atendimento.valor.toFixed(2)}`, 420, yPosition);
        
        total += atendimento.valor;
      });
      
      // Total
      yPosition += 40;
      doc.fontSize(14).text(`Total Geral: R$ ${total.toFixed(2)}`, 350, yPosition);
      
      // Rodapé
      doc.fontSize(10).text('QuatroPatas - Sistema de Gestão', 50, 700);
      
      doc.end();
      
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      res.status(500).json({ erro: 'Erro ao gerar relatório PDF' });
    }
  }
  
  // Gerar ficha do pet
  static async gerarFichaPet(req, res) {
    try {
      const { id } = req.params;
      
      const doc = new PDFDocument();
      
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename=ficha-pet-${id}.pdf`);
      
      doc.pipe(res);
      
      // Aqui você buscaria os dados do pet pelo ID
      // const pet = await PetService.getPetById(id);
      
      // Exemplo de dados
      const pet = {
        id: id,
        nome: 'Rex',
        especie: 'Cão',
        raca: 'Golden Retriever',
        idade: 3,
        peso: 25.5,
        cor: 'Dourado',
        proprietario: 'João Silva'
      };
      
      // Cabeçalho
      doc.fontSize(20).text('Ficha do Pet', 50, 50);
      doc.fontSize(16).text(`${pet.nome} (ID: ${pet.id})`, 50, 80);
      doc.moveDown();
      
      // Informações do pet
      let yPos = 120;
      doc.fontSize(12);
      doc.text('DADOS DO ANIMAL', 50, yPos);
      doc.moveTo(50, yPos + 15).lineTo(200, yPos + 15).stroke();
      
      yPos += 30;
      doc.text(`Nome: ${pet.nome}`, 50, yPos);
      yPos += 20;
      doc.text(`Espécie: ${pet.especie}`, 50, yPos);
      yPos += 20;
      doc.text(`Raça: ${pet.raca}`, 50, yPos);
      yPos += 20;
      doc.text(`Idade: ${pet.idade} anos`, 50, yPos);
      yPos += 20;
      doc.text(`Peso: ${pet.peso} kg`, 50, yPos);
      yPos += 20;
      doc.text(`Cor: ${pet.cor}`, 50, yPos);
      
      yPos += 40;
      doc.text('PROPRIETÁRIO', 50, yPos);
      doc.moveTo(50, yPos + 15).lineTo(200, yPos + 15).stroke();
      yPos += 30;
      doc.text(`Nome: ${pet.proprietario}`, 50, yPos);
      
      // Espaço para histórico médico
      yPos += 60;
      doc.text('HISTÓRICO MÉDICO', 50, yPos);
      doc.moveTo(50, yPos + 15).lineTo(200, yPos + 15).stroke();
      yPos += 30;
      doc.text('(Últimos atendimentos seriam listados aqui)', 50, yPos);
      
      doc.end();
      
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      res.status(500).json({ erro: 'Erro ao gerar ficha PDF' });
    }
  }
}

module.exports = PDFController;