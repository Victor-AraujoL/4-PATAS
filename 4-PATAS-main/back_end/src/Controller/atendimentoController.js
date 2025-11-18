// Importar models COM relacionamentos já configurados
const { Atendimento, Pet, Colaborador, Usuario } = require('../Models/index');
const { Op } = require('sequelize');

class AtendimentoController {

  // ====================================
  // LISTAR TODOS OS ATENDIMENTOS COM RELACIONAMENTOS
  // ====================================
  static async getAll(req, res) {
    try {
      const atendimentos = await Atendimento.findAll({
        include: [
          {
            model: Pet,
            as: 'pet',
            attributes: ['IDPET', 'NOME', 'ESPECIE', 'RACA'],
            required: false // LEFT JOIN
          },
          {
            model: Colaborador,
            as: 'colaborador',
            attributes: ['IDCOLABORADOR', 'NOME', 'CARGO', 'CRMV'],
            required: false // LEFT JOIN
          },
          {
            model: Usuario,
            as: 'usuario',
            attributes: ['IDUSUARIO', 'NOME', 'EMAIL', 'TELEFONE'],
            required: false // LEFT JOIN
          }
        ],
        order: [['DATAHORA', 'DESC']]
      });

      // Converter para JSON puro para garantir serialização correta
      const resultado = atendimentos.map(a => a.get({ plain: true }));

      res.json({
        success: true,
        data: resultado
      });
    } catch (error) {
      console.error('Erro ao buscar atendimentos:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar atendimentos',
        error: error.message
      });
    }
  }

  // ====================================
  // BUSCAR ATENDIMENTO POR ID
  // ====================================
  static async getById(req, res) {
    try {
      const { id } = req.params;

      const atendimento = await Atendimento.findByPk(id, {
        include: [
          {
            model: Pet,
            as: 'pet',
            required: false
          },
          {
            model: Colaborador,
            as: 'colaborador',
            required: false
          },
          {
            model: Usuario,
            as: 'usuario',
            required: false
          }
        ]
      });

      if (!atendimento) {
        return res.status(404).json({
          success: false,
          message: 'Atendimento não encontrado'
        });
      }

      res.json({
        success: true,
        data: atendimento
      });
    } catch (error) {
      console.error('Erro ao buscar atendimento:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar atendimento',
        error: error.message
      });
    }
  }

  // ====================================
  // CRIAR NOVO ATENDIMENTO
  // ====================================
  static async create(req, res) {
    try {
      const novoAtendimento = await Atendimento.create(req.body);

      // Buscar o atendimento recém-criado com relacionamentos
      const atendimentoCompleto = await Atendimento.findByPk(novoAtendimento.IDATENDIMENTO, {
        include: [
          { model: Pet, as: 'pet', required: false },
          { model: Colaborador, as: 'colaborador', required: false },
          { model: Usuario, as: 'usuario', required: false }
        ]
      });

      res.status(201).json({
        success: true,
        message: 'Atendimento criado com sucesso',
        data: atendimentoCompleto
      });
    } catch (error) {
      console.error('Erro ao criar atendimento:', error);
      res.status(400).json({
        success: false,
        message: 'Erro ao criar atendimento',
        error: error.message
      });
    }
  }

  // ====================================
  // ATUALIZAR ATENDIMENTO
  // ====================================
  static async update(req, res) {
    try {
      const { id } = req.params;

      const [updated] = await Atendimento.update(req.body, {
        where: { IDATENDIMENTO: id }
      });

      if (updated) {
        const atendimentoAtualizado = await Atendimento.findByPk(id, {
          include: [
            { model: Pet, as: 'pet', required: false },
            { model: Colaborador, as: 'colaborador', required: false },
            { model: Usuario, as: 'usuario', required: false }
          ]
        });

        res.json({
          success: true,
          message: 'Atendimento atualizado com sucesso',
          data: atendimentoAtualizado
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'Atendimento não encontrado'
        });
      }
    } catch (error) {
      console.error('Erro ao atualizar atendimento:', error);
      res.status(400).json({
        success: false,
        message: 'Erro ao atualizar atendimento',
        error: error.message
      });
    }
  }

  // ====================================
  // DELETAR ATENDIMENTO
  // ====================================
  static async delete(req, res) {
    try {
      const { id } = req.params;

      const deleted = await Atendimento.destroy({
        where: { IDATENDIMENTO: id }
      });

      if (deleted) {
        res.json({
          success: true,
          message: 'Atendimento removido com sucesso'
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'Atendimento não encontrado'
        });
      }
    } catch (error) {
      console.error('Erro ao remover atendimento:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao remover atendimento',
        error: error.message
      });
    }
  }

  // ====================================
  // BUSCAR ATENDIMENTOS POR PET
  // ====================================
  static async getByPetId(req, res) {
    try {
      const { petId } = req.params;

      const atendimentos = await Atendimento.findAll({
        where: { IDPET: petId },
        include: [
          { model: Pet, as: 'pet', required: false },
          { model: Colaborador, as: 'colaborador', required: false },
          { model: Usuario, as: 'usuario', required: false }
        ],
        order: [['DATAHORA', 'DESC']]
      });

      res.json({
        success: true,
        data: atendimentos
      });
    } catch (error) {
      console.error('Erro ao buscar atendimentos do pet:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar atendimentos do pet',
        error: error.message
      });
    }
  }

  // ====================================
  // BUSCAR ATENDIMENTOS POR COLABORADOR
  // ====================================
  static async getByColaboradorId(req, res) {
    try {
      const { colaboradorId } = req.params;

      const atendimentos = await Atendimento.findAll({
        where: { IDCOLABORADOR: colaboradorId },
        include: [
          { model: Pet, as: 'pet', required: false },
          { model: Colaborador, as: 'colaborador', required: false },
          { model: Usuario, as: 'usuario', required: false }
        ],
        order: [['DATAHORA', 'DESC']]
      });

      res.json({
        success: true,
        data: atendimentos
      });
    } catch (error) {
      console.error('Erro ao buscar atendimentos do colaborador:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar atendimentos do colaborador',
        error: error.message
      });
    }
  }

  // ====================================
  // BUSCAR ATENDIMENTOS POR USUARIO
  // ====================================
  static async getByUsuarioId(req, res) {
    try {
      const { usuarioId } = req.params;

      const atendimentos = await Atendimento.findAll({
        where: { IDUSUARIO: usuarioId },
        include: [
          { model: Pet, as: 'pet', required: false },
          { model: Colaborador, as: 'colaborador', required: false },
          { model: Usuario, as: 'usuario', required: false }
        ],
        order: [['DATAHORA', 'DESC']]
      });

      res.json({
        success: true,
        data: atendimentos
      });
    } catch (error) {
      console.error('Erro ao buscar atendimentos do usuário:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar atendimentos do usuário',
        error: error.message
      });
    }
  }

  // ====================================
  // BUSCAR ATENDIMENTOS POR DATA
  // ====================================
  static async getByDate(req, res) {
    try {
      const { data } = req.params;

      const startOfDay = new Date(data);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(data);
      endOfDay.setHours(23, 59, 59, 999);

      const atendimentos = await Atendimento.findAll({
        where: {
          DATAHORA: {
            [Op.between]: [startOfDay, endOfDay]
          }
        },
        include: [
          { model: Pet, as: 'pet', required: false },
          { model: Colaborador, as: 'colaborador', required: false },
          { model: Usuario, as: 'usuario', required: false }
        ],
        order: [['DATAHORA', 'ASC']]
      });

      res.json({
        success: true,
        data: atendimentos
      });
    } catch (error) {
      console.error('Erro ao buscar atendimentos da data:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar atendimentos da data',
        error: error.message
      });
    }
  }
}

module.exports = AtendimentoController;
