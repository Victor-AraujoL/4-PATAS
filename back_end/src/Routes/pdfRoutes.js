const express = require('express');
const router = express.Router();
const PDFController = require('../Controller/pdfController');
const APIDocumentationController = require('../Controller/apiDocumentationController');

/**
 * @swagger
 * components:
 *   schemas:
 *     RelatorioParams:
 *       type: object
 *       properties:
 *         dataInicio:
 *           type: string
 *           format: date
 *           description: Data de início do relatório
 *         dataFim:
 *           type: string
 *           format: date
 *           description: Data de fim do relatório
 *       example:
 *         dataInicio: "2024-01-01"
 *         dataFim: "2024-12-31"
 */

/**
 * @swagger
 * /api/pdf/pets:
 *   get:
 *     summary: Gera relatório de pets em PDF
 *     tags: [PDFs e Relatórios]
 *     responses:
 *       200:
 *         description: PDF gerado com sucesso
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *         headers:
 *           Content-Disposition:
 *             description: Nome do arquivo para download
 *             schema:
 *               type: string
 *               example: attachment; filename=relatorio-pets.pdf
 *       500:
 *         description: Erro ao gerar PDF
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 erro:
 *                   type: string
 *                   example: "Erro ao gerar relatório PDF"
 */
router.get('/pets', PDFController.gerarRelatorioPets);

/**
 * @swagger
 * /api/pdf/atendimentos:
 *   get:
 *     summary: Gera relatório de atendimentos em PDF
 *     tags: [PDFs e Relatórios]
 *     parameters:
 *       - in: query
 *         name: dataInicio
 *         schema:
 *           type: string
 *           format: date
 *         description: Data de início do relatório (opcional)
 *         example: "2024-01-01"
 *       - in: query
 *         name: dataFim
 *         schema:
 *           type: string
 *           format: date
 *         description: Data de fim do relatório (opcional)
 *         example: "2024-12-31"
 *     responses:
 *       200:
 *         description: PDF gerado com sucesso
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *         headers:
 *           Content-Disposition:
 *             description: Nome do arquivo para download
 *             schema:
 *               type: string
 *               example: attachment; filename=relatorio-atendimentos.pdf
 *       500:
 *         description: Erro ao gerar PDF
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 erro:
 *                   type: string
 */
router.get('/atendimentos', PDFController.gerarRelatorioAtendimentos);

/**
 * @swagger
 * /api/pdf/pets/{id}/ficha:
 *   get:
 *     summary: Gera ficha completa do pet em PDF
 *     tags: [PDFs e Relatórios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do pet
 *         example: 1
 *     responses:
 *       200:
 *         description: Ficha do pet em PDF gerada com sucesso
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *         headers:
 *           Content-Disposition:
 *             description: Nome do arquivo para download
 *             schema:
 *               type: string
 *               example: attachment; filename=ficha-pet-1.pdf
 *       404:
 *         description: Pet não encontrado
 *       500:
 *         description: Erro ao gerar PDF
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 erro:
 *                   type: string
 */
router.get('/pets/:id/ficha', PDFController.gerarFichaPet);

/**
 * @swagger
 * /api/pdf/colaboradores:
 *   get:
 *     summary: Gera relatório de colaboradores em PDF
 *     tags: [PDFs e Relatórios]
 *     responses:
 *       200:
 *         description: PDF gerado com sucesso
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       500:
 *         description: Erro ao gerar PDF
 */
router.get('/colaboradores', async (req, res) => {
  try {
    const PDFDocument = require('pdfkit');
    const doc = new PDFDocument();
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=relatorio-colaboradores.pdf');
    
    doc.pipe(res);
    
    doc.fontSize(20).text('Relatório de Colaboradores', 50, 50);
    doc.fontSize(12).text(`Gerado em: ${new Date().toLocaleDateString('pt-BR')}`, 50, 80);
    
    // Aqui você colocaria a lógica para buscar colaboradores
    doc.fontSize(12).text('Lista de colaboradores seria exibida aqui...', 50, 120);
    
    doc.end();
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao gerar relatório PDF' });
  }
});

/**
 * @swagger
 * /api/pdf/vacinas:
 *   get:
 *     summary: Gera relatório de estoque de vacinas em PDF
 *     tags: [PDFs e Relatórios]
 *     responses:
 *       200:
 *         description: PDF gerado com sucesso
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       500:
 *         description: Erro ao gerar PDF
 */
router.get('/vacinas', async (req, res) => {
  try {
    const PDFDocument = require('pdfkit');
    const doc = new PDFDocument();
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=relatorio-vacinas.pdf');
    
    doc.pipe(res);
    
    doc.fontSize(20).text('Relatório de Estoque - Vacinas', 50, 50);
    doc.fontSize(12).text(`Gerado em: ${new Date().toLocaleDateString('pt-BR')}`, 50, 80);
    
    // Aqui você colocaria a lógica para buscar vacinas
    doc.fontSize(12).text('Estoque de vacinas seria exibido aqui...', 50, 120);
    
    doc.end();
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao gerar relatório PDF' });
  }
});

/**
 * @swagger
 * /api/pdf/documentacao:
 *   get:
 *     summary: Gera documentação completa da API em PDF
 *     tags: [PDFs e Relatórios]
 *     description: |
 *       Gera um PDF completo com toda a documentação técnica da API, incluindo:
 *       - Todos os endpoints disponíveis
 *       - Métodos HTTP suportados
 *       - Parâmetros de entrada
 *       - Exemplos de request/response
 *       - Códigos de status HTTP
 *       - Schemas dos objetos
 *       
 *       Este documento é ideal para entrega de projetos ou documentação técnica.
 *     responses:
 *       200:
 *         description: Documentação da API gerada em PDF
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *         headers:
 *           Content-Disposition:
 *             description: Nome do arquivo para download
 *             schema:
 *               type: string
 *               example: attachment; filename=pet-care-api-documentation.pdf
 *       500:
 *         description: Erro ao gerar documentação
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 erro:
 *                   type: string
 *                   example: "Erro ao gerar documentação PDF"
 */
router.get('/documentacao', APIDocumentationController.gerarDocumentacaoCompleta);

module.exports = router;