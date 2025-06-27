const express = require('express');
const router = express.Router();
const vacinaController = require('../Controller/vacinaController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Vacina:
 *       type: object
 *       required:
 *         - nome
 *         - fabricante
 *         - lote
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único da vacina
 *         nome:
 *           type: string
 *           description: Nome da vacina
 *         fabricante:
 *           type: string
 *           description: Fabricante da vacina
 *         lote:
 *           type: string
 *           description: Número do lote da vacina
 *         dataVencimento:
 *           type: string
 *           format: date
 *           description: Data de vencimento da vacina
 *         dataFabricacao:
 *           type: string
 *           format: date
 *           description: Data de fabricação da vacina
 *         tipoAnimal:
 *           type: string
 *           description: Tipo de animal para o qual a vacina é destinada
 *         doencasPrevine:
 *           type: string
 *           description: Doenças que a vacina previne
 *         dosagem:
 *           type: string
 *           description: Dosagem recomendada
 *         estoque:
 *           type: integer
 *           description: Quantidade em estoque
 *       example:
 *         id: 1
 *         nome: "V10"
 *         fabricante: "Zoetis"
 *         lote: "VET2024001"
 *         dataVencimento: "2025-12-31"
 *         dataFabricacao: "2024-01-15"
 *         tipoAnimal: "Cão"
 *         doencasPrevine: "Cinomose, Hepatite, Parvovirose"
 *         dosagem: "1ml"
 *         estoque: 50
 */

/**
 * @swagger
 * /api/vacinas:
 *   get:
 *     summary: Lista todas as vacinas
 *     tags: [Vacinas]
 *     responses:
 *       200:
 *         description: Lista de vacinas retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Vacina'
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/', vacinaController.listar);

/**
 * @swagger
 * /api/vacinas/{id}:
 *   get:
 *     summary: Busca uma vacina por ID
 *     tags: [Vacinas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da vacina
 *     responses:
 *       200:
 *         description: Vacina encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vacina'
 *       404:
 *         description: Vacina não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/:id', vacinaController.buscarPorId);

/**
 * @swagger
 * /api/vacinas:
 *   post:
 *     summary: Cria uma nova vacina
 *     tags: [Vacinas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - fabricante
 *               - lote
 *             properties:
 *               nome:
 *                 type: string
 *               fabricante:
 *                 type: string
 *               lote:
 *                 type: string
 *               dataVencimento:
 *                 type: string
 *                 format: date
 *               dataFabricacao:
 *                 type: string
 *                 format: date
 *               tipoAnimal:
 *                 type: string
 *               doencasPrevine:
 *                 type: string
 *               dosagem:
 *                 type: string
 *               estoque:
 *                 type: integer
 *             example:
 *               nome: "V10"
 *               fabricante: "Zoetis"
 *               lote: "VET2024001"
 *               dataVencimento: "2025-12-31"
 *               dataFabricacao: "2024-01-15"
 *               tipoAnimal: "Cão"
 *               doencasPrevine: "Cinomose, Hepatite, Parvovirose"
 *               dosagem: "1ml"
 *               estoque: 50
 *     responses:
 *       201:
 *         description: Vacina criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vacina'
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/', vacinaController.criar);

/**
 * @swagger
 * /api/vacinas/{id}:
 *   put:
 *     summary: Atualiza uma vacina
 *     tags: [Vacinas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da vacina
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               fabricante:
 *                 type: string
 *               lote:
 *                 type: string
 *               dataVencimento:
 *                 type: string
 *                 format: date
 *               dataFabricacao:
 *                 type: string
 *                 format: date
 *               tipoAnimal:
 *                 type: string
 *               doencasPrevine:
 *                 type: string
 *               dosagem:
 *                 type: string
 *               estoque:
 *                 type: integer
 *             example:
 *               estoque: 45
 *               dataVencimento: "2026-01-31"
 *     responses:
 *       200:
 *         description: Vacina atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vacina'
 *       404:
 *         description: Vacina não encontrada
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro interno do servidor
 */
router.put('/:id', vacinaController.atualizar);

/**
 * @swagger
 * /api/vacinas/{id}:
 *   delete:
 *     summary: Remove uma vacina
 *     tags: [Vacinas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da vacina
 *     responses:
 *       200:
 *         description: Vacina removida com sucesso
 *       404:
 *         description: Vacina não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.delete('/:id', vacinaController.excluir);

module.exports = router;