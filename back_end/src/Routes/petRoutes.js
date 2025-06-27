const express = require('express');
const router = express.Router();
const PetController = require('../Controller/petController'); // Caminho corrigido

/**
 * @swagger
 * components:
 *   schemas:
 *     Pet:
 *       type: object
 *       required:
 *         - nome
 *         - especie
 *         - usuarioId
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único do pet
 *         nome:
 *           type: string
 *           description: Nome do pet
 *         especie:
 *           type: string
 *           description: Espécie do pet (cão, gato, etc.)
 *         raca:
 *           type: string
 *           description: Raça do pet
 *         idade:
 *           type: integer
 *           description: Idade do pet em anos
 *         peso:
 *           type: number
 *           format: float
 *           description: Peso do pet em kg
 *         cor:
 *           type: string
 *           description: Cor do pet
 *         sexo:
 *           type: string
 *           enum: [macho, fêmea]
 *           description: Sexo do pet
 *         usuarioId:
 *           type: integer
 *           description: ID do proprietário do pet
 *       example:
 *         id: 1
 *         nome: "Rex"
 *         especie: "Cão"
 *         raca: "Golden Retriever"
 *         idade: 3
 *         peso: 25.5
 *         cor: "Dourado"
 *         sexo: "macho"
 *         usuarioId: 1
 */

/**
 * @swagger
 * /api/pets:
 *   post:
 *     summary: Cria um novo pet
 *     tags: [Pets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - especie
 *               - usuarioId
 *             properties:
 *               nome:
 *                 type: string
 *               especie:
 *                 type: string
 *               raca:
 *                 type: string
 *               idade:
 *                 type: integer
 *               peso:
 *                 type: number
 *                 format: float
 *               cor:
 *                 type: string
 *               sexo:
 *                 type: string
 *                 enum: [macho, fêmea]
 *               usuarioId:
 *                 type: integer
 *             example:
 *               nome: "Rex"
 *               especie: "Cão"
 *               raca: "Golden Retriever"
 *               idade: 3
 *               peso: 25.5
 *               cor: "Dourado"
 *               sexo: "macho"
 *               usuarioId: 1
 *     responses:
 *       201:
 *         description: Pet criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pet'
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/', PetController.createPet);

/**
 * @swagger
 * /api/pets:
 *   get:
 *     summary: Lista todos os pets
 *     tags: [Pets]
 *     responses:
 *       200:
 *         description: Lista de pets retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pet'
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/', PetController.getAllPets);

/**
 * @swagger
 * /api/pets/{id}:
 *   get:
 *     summary: Busca um pet por ID
 *     tags: [Pets]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do pet
 *     responses:
 *       200:
 *         description: Pet encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pet'
 *       404:
 *         description: Pet não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/:id', PetController.getPetById);

/**
 * @swagger
 * /api/pets/{id}:
 *   put:
 *     summary: Atualiza um pet
 *     tags: [Pets]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do pet
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               especie:
 *                 type: string
 *               raca:
 *                 type: string
 *               idade:
 *                 type: integer
 *               peso:
 *                 type: number
 *                 format: float
 *               cor:
 *                 type: string
 *               sexo:
 *                 type: string
 *                 enum: [macho, fêmea]
 *               usuarioId:
 *                 type: integer
 *             example:
 *               nome: "Rex Updated"
 *               idade: 4
 *               peso: 26.0
 *     responses:
 *       200:
 *         description: Pet atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pet'
 *       404:
 *         description: Pet não encontrado
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro interno do servidor
 */
router.put('/:id', PetController.updatePet);

/**
 * @swagger
 * /api/pets/{id}:
 *   delete:
 *     summary: Remove um pet
 *     tags: [Pets]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do pet
 *     responses:
 *       200:
 *         description: Pet removido com sucesso
 *       404:
 *         description: Pet não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.delete('/:id', PetController.deletePet);

module.exports = router;