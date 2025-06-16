const Atendimento = require('../Models/atendimento');

exports.getAllAtendimentos = (req, res) => {
  Atendimento.getAll((err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao obter atendimentos' });
    }
    res.status(200).json(results);
  });
};

exports.getAtendimentoById = (req, res) => {
  const { id } = req.params;
  Atendimento.getById(id, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao obter atendimento' });
    }
    if (!results) {
      return res.status(404).json({ message: 'Atendimento não encontrado' });
    }
    res.status(200).json(results);
  });
};

exports.createAtendimento = (req, res) => {
  const { idpet, idcolaborador, idusuario, peso, datahora, medicamento, diagnostico, observacao } = req.body;
  const newAtendimento = {
    IDPET: idpet,
    IDCOLABORADOR: idcolaborador,
    IDUSUARIO: idusuario,
    PESO: peso,
    DATAHORA: datahora,
    MEDICAMENTO: medicamento,
    DIAGNOSTICO: diagnostico,
    OBSERVACAO: observacao,
    DATACAD: new Date()
  };
  
  Atendimento.create(newAtendimento, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao criar atendimento' });
    }
    res.status(201).json({ message: 'Atendimento criado com sucesso!' });
  });
};

exports.updateAtendimento = (req, res) => {
  const { id } = req.params;
  const { idpet, idcolaborador, idusuario, peso, datahora, medicamento, diagnostico, observacao } = req.body;
  const updatedData = {
    IDPET: idpet,
    IDCOLABORADOR: idcolaborador,
    IDUSUARIO: idusuario,
    PESO: peso,
    DATAHORA: datahora,
    MEDICAMENTO: medicamento,
    DIAGNOSTICO: diagnostico,
    OBSERVACAO: observacao
  };
  
  Atendimento.update(id, updatedData, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao atualizar atendimento' });
    }
    res.status(200).json({ message: 'Atendimento atualizado com sucesso!' });
  });
};

exports.deleteAtendimento = (req, res) => {
  const { id } = req.params;
  Atendimento.delete(id, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao deletar atendimento' });
    }
    res.status(200).json({ message: 'Atendimento deletado com sucesso!' });
  });
};

exports.getAtendimentosByPet = (req, res) => {
  const { idPet } = req.params;
  Atendimento.getByPet(idPet, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao obter atendimentos do pet' });
    }
    res.status(200).json(results);
  });
};

exports.getAtendimentosByColaborador = (req, res) => {
  const { idColaborador } = req.params;
  Atendimento.getByColaborador(idColaborador, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao obter atendimentos do colaborador' });
    }
    res.status(200).json(results);
  });
};

exports.getAtendimentosByUsuario = (req, res) => {
  const { idUsuario } = req.params;
  Atendimento.getByUsuario(idUsuario, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao obter atendimentos do usuário' });
    }
    res.status(200).json(results);
  });
};