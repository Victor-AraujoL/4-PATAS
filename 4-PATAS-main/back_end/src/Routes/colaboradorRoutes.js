const express = require('express');
const router = express.Router();
const ColaboradorController = require('../services/colaboradorService');

/**
 * @swagger
 * components:
 *   schemas:
 *     Colaborador:
 *       type: object
 *       required:
 *         - nome
 *         - cargo
 *         - email
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único do colaborador
 *         nome:
 *           type: string
 *           description: Nome completo do colaborador
 *         cargo:
 *           type: string
 *           description: Cargo do colaborador (veterinário, assistente, etc.)
 *         email:
 *           type: string
 *           format: email
 *           description: Email do colaborador
 *         telefone:
 *           type: string
 *           description: Telefone do colaborador
 *         especialidade:
 *           type: string
 *           description: Especialidade do colaborador
 *         crmv:
 *           type: string
 *           description: Número do CRMV (para veterinários)
 *         salario:
 *           type: number
 *           format: float
 *           description: Salário do colaborador
 *       example:
 *         id: 1
 *         nome: "Dr. Maria Silva"
 *         cargo: "Veterinária"
 *         email: "maria@clinica.com"
 *         telefone: "(11) 99999-9999"
 *         especialidade: "Clínica Geral"
 *         crmv: "SP-12345"
 *         salario: 8000.00
 */

/**
 * @swagger
 * /api/colaboradores:
 *   get:
 *     summary: Lista todos os colaboradores
 *     tags: [Colaboradores]
 *     responses:
 *       200:
 *         description: Lista de colaboradores retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Colaborador'
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/', ColaboradorController.getAllColaboradores);

/**
 * @swagger
 * /api/colaboradores/{id}:
 *   get:
 *     summary: Busca um colaborador por ID
 *     tags: [Colaboradores]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do colaborador
 *     responses:
 *       200:
 *         description: Colaborador encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Colaborador'
 *       404:
 *         description: Colaborador não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/:id', ColaboradorController.getColaboradorById);

/**
 * @swagger
 * /api/colaboradores:
 *   post:
 *     summary: Cria um novo colaborador
 *     tags: [Colaboradores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - cargo
 *               - email
 *             properties:
 *               nome:
 *                 type: string
 *               cargo:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               telefone:
 *                 type: string
 *               especialidade:
 *                 type: string
 *               crmv:
 *                 type: string
 *               salario:
 *                 type: number
 *                 format: float
 *             example:
 *               nome: "Dr. Maria Silva"
 *               cargo: "Veterinária"
 *               email: "maria@clinica.com"
 *               telefone: "(11) 99999-9999"
 *               especialidade: "Clínica Geral"
 *               crmv: "SP-12345"
 *               salario: 8000.00
 *     responses:
 *       201:
 *         description: Colaborador criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Colaborador'
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/', ColaboradorController.createColaborador);

/**
 * @swagger
 * /api/colaboradores/{id}:
 *   put:
 *     summary: Atualiza um colaborador
 *     tags: [Colaboradores]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do colaborador
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               cargo:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               telefone:
 *                 type: string
 *               especialidade:
 *                 type: string
 *               crmv:
 *                 type: string
 *               salario:
 *                 type: number
 *                 format: float
 *             example:
 *               nome: "Dr. Maria Silva Santos"
 *               especialidade: "Cirurgia"
 *               salario: 9000.00
 *     responses:
 *       200:
 *         description: Colaborador atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Colaborador'
 *       404:
 *         description: Colaborador não encontrado
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro interno do servidor
 */
router.put('/:id', ColaboradorController.updateColaborador);

/**
 * @swagger
 * /api/colaboradores/{id}:
 *   delete:
 *     summary: Remove um colaborador
 *     tags: [Colaboradores]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do colaborador
 *     responses:
 *       200:
 *         description: Colaborador removido com sucesso
 *       404:
 *         description: Colaborador não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.delete('/:id', ColaboradorController.deleteColaborador);

module.exports = router;