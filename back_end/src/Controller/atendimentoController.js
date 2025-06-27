const Atendimento = require('../Models/atendimento');
const { Op } = require('sequelize');

class AtendimentoController {
  
  static async create(req, res) {
    try {
      const novoAtendimento = await Atendimento.create(req.body);
      
      res.status(201).json({
        success: true,
        message: 'Atendimento criado com sucesso',
        data: novoAtendimento
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Erro ao criar atendimento',
        error: error.message
      });
    }
  }

  static async getAll(req, res) {
    try {
      const atendimentos = await Atendimento.findAll({
        order: [['DATAHORA', 'DESC']]
      });

      res.json({
        success: true,
        data: atendimentos
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar atendimentos',
        error: error.message
      });
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;
      
      const atendimento = await Atendimento.findByPk(id);

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
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar atendimento',
        error: error.message
      });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      
      const [updated] = await Atendimento.update(req.body, {
        where: { IDATENDIMENTO: id } 
      });

      if (updated) {
        const atendimentoAtualizado = await Atendimento.findByPk(id);
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
      res.status(400).json({
        success: false,
        message: 'Erro ao atualizar atendimento',
        error: error.message
      });
    }
  }

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
      res.status(500).json({
        success: false,
        message: 'Erro ao remover atendimento',
        error: error.message
      });
    }
  }

  static async getByPetId(req, res) {
    try {
      const { petId } = req.params;
      const atendimentos = await Atendimento.findAll({
        where: { IDPET: petId },
        order: [['DATAHORA', 'DESC']]
      });
      
      res.json({
        success: true,
        data: atendimentos
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar atendimentos do pet',
        error: error.message
      });
    }
  }

  static async getByColaboradorId(req, res) {
    try {
      const { colaboradorId } = req.params;
      const atendimentos = await Atendimento.findAll({
        where: { IDCOLABORADOR: colaboradorId },
        order: [['DATAHORA', 'DESC']]
      });
      
      res.json({
        success: true,
        data: atendimentos
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar atendimentos do colaborador',
        error: error.message
      });
    }
  }

  static async getByUsuarioId(req, res) {
    try {
      const { usuarioId } = req.params;
      const atendimentos = await Atendimento.findAll({
        where: { IDUSUARIO: usuarioId },
        order: [['DATAHORA', 'DESC']]
      });
      
      res.json({
        success: true,
        data: atendimentos
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar atendimentos do usuário',
        error: error.message
      });
    }
  }

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
        order: [['DATAHORA', 'ASC']]
      });
      
      res.json({
        success: true,
        data: atendimentos
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar atendimentos da data',
        error: error.message
      });
    }
  }
}

module.exports = AtendimentoController;