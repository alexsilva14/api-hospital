const AtendimentoRepository = require('../Repositories/AtendimentoRepository');

class AtendimentoController {
  async index(req, res) {
    const atendimentos = await AtendimentoRepository.findAll();
    res.json(atendimentos);
  }

  async show(req, res) {
    const { id } = req.params;
    const atendimento = await AtendimentoRepository.findById(id);
    if (!atendimento) {
      return res.status(404).json({ error: 'Atendimento não encontrado' });
    }
    res.json(atendimento);
  }

  async store(req, res) {
    const { paciente_id, profissional_id, data, observacoes } = req.body;

    if (!paciente_id || !profissional_id || !data) {
      return res.status(400).json({ error: 'Campos obrigatórios estão faltando!' });
    }

    const atendimento = await AtendimentoRepository.create({
      paciente_id,
      profissional_id,
      data,
      observacoes,
    });

    res.status(201).json(atendimento);
  }

  async update(req, res) {
    const { id } = req.params;
    const { paciente_id, profissional_id, data, observacoes } = req.body;

    const atendimentoExistente = await AtendimentoRepository.findById(id);
    if (!atendimentoExistente) {
      return res.status(404).json({ error: 'Atendimento não encontrado' });
    }

    await AtendimentoRepository.update(id, {
      paciente_id,
      profissional_id,
      data,
      observacoes,
    });

    const atendimentoAtualizado = await AtendimentoRepository.findById(id);
    res.json(atendimentoAtualizado);
  }

  async delete(req, res) {
    const { id } = req.params;

    const atendimentoExistente = await AtendimentoRepository.findById(id);
    if (!atendimentoExistente) {
      return res.status(404).json({ error: 'Atendimento não encontrado' });
    }

    await AtendimentoRepository.delete(id);
    res.sendStatus(204);
  }
}

module.exports = new AtendimentoController();
