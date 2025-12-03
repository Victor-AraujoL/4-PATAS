const express = require('express');
const router = express.Router();
const AtendimentoController = require('../Controller/atendimentoController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Atendimento:
 *       type: object
 *       required:
 *         - petId
 *         - colaboradorId
 *         - usuarioId
 *         - dataAtendimento
 *         - tipoAtendimento
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único do atendimento
 *         petId:
 *           type: integer
 *           description: ID do pet atendido
 *         colaboradorId:
 *           type: integer
 *           description: ID do colaborador responsável
 *         usuarioId:
 *           type: integer
 *           description: ID do proprietário do pet
 *         dataAtendimento:
 *           type: string
 *           format: date-time
 *           description: Data e hora do atendimento
 *         tipoAtendimento:
 *           type: string
 *           description: Tipo do atendimento (consulta, cirurgia, vacinação, etc.)
 *         descricao:
 *           type: string
 *           description: Descrição detalhada do atendimento
 *         diagnostico:
 *           type: string
 *           description: Diagnóstico do veterinário
 *         prescricao:
 *           type: string
 *           description: Prescrição médica
 *         observacoes:
 *           type: string
 *           description: Observações adicionais
 *         valor:
 *           type: number
 *           format: float
 *           description: Valor do atendimento
 *         status:
 *           type: string
 *           enum: [agendado, em_andamento, concluido, cancelado]
 *           description: Status do atendimento
 *       example:
 *         id: 1
 *         petId: 1
 *         colaboradorId: 1
 *         usuarioId: 1
 *         dataAtendimento: "2024-06-27T14:30:00Z"
 *         tipoAtendimento: "Consulta"
 *         descricao: "Consulta de rotina"
 *         diagnostico: "Animal saudável"
 *         prescricao: "Continuar ração atual"
 *         observacoes: "Próxima consulta em 6 meses"
 *         valor: 150.00
 *         status: "concluido"
 */

/**
 * @swagger
 * /api/atendimentos:
 *   get:
 *     summary: Lista todos os atendimentos
 *     tags: [Atendimentos]
 *     responses:
 *       200:
 *         description: Lista de atendimentos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Atendimento'
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/', AtendimentoController.getAll);

/**
 * @swagger
 * /api/atendimentos/pet/{petId}:
 *   get:
 *     summary: Lista atendimentos por ID do pet
 *     tags: [Atendimentos]
 *     parameters:
 *       - in: path
 *         name: petId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do pet
 *     responses:
 *       200:
 *         description: Lista de atendimentos do pet
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Atendimento'
 *       404:
 *         description: Pet não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/pet/:petId', AtendimentoController.getByPetId);

/**
 * @swagger
 * /api/atendimentos/colaborador/{colaboradorId}:
 *   get:
 *     summary: Lista atendimentos por ID do colaborador
 *     tags: [Atendimentos]
 *     parameters:
 *       - in: path
 *         name: colaboradorId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do colaborador
 *     responses:
 *       200:
 *         description: Lista de atendimentos do colaborador
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Atendimento'
 *       404:
 *         description: Colaborador não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/colaborador/:colaboradorId', AtendimentoController.getByColaboradorId);

/**
 * @swagger
 * /api/atendimentos/data/{data}:
 *   get:
 *     summary: Lista atendimentos por data
 *     tags: [Atendimentos]
 *     parameters:
 *       - in: path
 *         name: data
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: Data dos atendimentos (formato YYYY-MM-DD)
 *         example: "2024-06-27"
 *     responses:
 *       200:
 *         description: Lista de atendimentos da data especificada
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Atendimento'
 *       400:
 *         description: Formato de data inválido
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/data/:data', AtendimentoController.getByDate);

/**
 * @swagger
 * /api/atendimentos/{id}:
 *   get:
 *     summary: Busca um atendimento por ID
 *     tags: [Atendimentos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do atendimento
 *     responses:
 *       200:
 *         description: Atendimento encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Atendimento'
 *       404:
 *         description: Atendimento não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/:id', AtendimentoController.getById);

/**
 * @swagger
 * /api/atendimentos:
 *   post:
 *     summary: Cria um novo atendimento
 *     tags: [Atendimentos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - petId
 *               - colaboradorId
 *               - usuarioId
 *               - dataAtendimento
 *               - tipoAtendimento
 *             properties:
 *               petId:
 *                 type: integer
 *               colaboradorId:
 *                 type: integer
 *               usuarioId:
 *                 type: integer
 *               dataAtendimento:
 *                 type: string
 *                 format: date-time
 *               tipoAtendimento:
 *                 type: string
 *               descricao:
 *                 type: string
 *               diagnostico:
 *                 type: string
 *               prescricao:
 *                 type: string
 *               observacoes:
 *                 type: string
 *               valor:
 *                 type: number
 *                 format: float
 *               status:
 *                 type: string
 *                 enum: [agendado, em_andamento, concluido, cancelado]
 *             example:
 *               petId: 1
 *               colaboradorId: 1
 *               usuarioId: 1
 *               dataAtendimento: "2024-06-27T14:30:00Z"
 *               tipoAtendimento: "Consulta"
 *               descricao: "Consulta de rotina"
 *               valor: 150.00
 *               status: "agendado"
 *     responses:
 *       201:
 *         description: Atendimento criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Atendimento'
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/', AtendimentoController.create);

/**
 * @swagger
 * /api/atendimentos/{id}:
 *   put:
 *     summary: Atualiza um atendimento
 *     tags: [Atendimentos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do atendimento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               petId:
 *                 type: integer
 *               colaboradorId:
 *                 type: integer
 *               usuarioId:
 *                 type: integer
 *               dataAtendimento:
 *                 type: string
 *                 format: date-time
 *               tipoAtendimento:
 *                 type: string
 *               descricao:
 *                 type: string
 *               diagnostico:
 *                 type: string
 *               prescricao:
 *                 type: string
 *               observacoes:
 *                 type: string
 *               valor:
 *                 type: number
 *                 format: float
 *               status:
 *                 type: string
 *                 enum: [agendado, em_andamento, concluido, cancelado]
 *             example:
 *               diagnostico: "Infecção de ouvido"
 *               prescricao: "Antibiótico por 7 dias"
 *               status: "concluido"
 *     responses:
 *       200:
 *         description: Atendimento atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Atendimento'
 *       404:
 *         description: Atendimento não encontrado
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro interno do servidor
 */
router.put('/:id', AtendimentoController.update);

/**
 * @swagger
 * /api/atendimentos/{id}:
 *   delete:
 *     summary: Remove um atendimento
 *     tags: [Atendimentos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do atendimento
 *     responses:
 *       200:
 *         description: Atendimento removido com sucesso
 *       404:
 *         description: Atendimento não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.delete('/:id', AtendimentoController.delete);

module.exports = router;