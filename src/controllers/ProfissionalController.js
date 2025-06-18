const ProfissionalRepository = require('../Repositories/ProfissionalRepository');

class ProfissionalController {
  async index(req, res) {
    const profissionais = await ProfissionalRepository.findAll();
    res.json(profissionais);
  }

  async show(req, res) {
    const { id } = req.params;
    const profissional = await ProfissionalRepository.findById(id);
    if (!profissional) {
      return res.status(404).json({ error: 'Profissional não encontrado' });
    }
    res.json(profissional);
  }

  async store(req, res) {
    const { nome, especialidade_id } = req.body;
    if (!nome || !especialidade_id) {
      return res.status(400).json({ error: 'Nome e especialidade são obrigatórios!' });
    }

    const profissional = await ProfissionalRepository.create({ nome, especialidade_id });
    res.status(201).json(profissional);
  }

  async update(req, res) {
    const { id } = req.params;
    const { nome, especialidade_id } = req.body;

    const profissionalExistente = await ProfissionalRepository.findById(id);
    if (!profissionalExistente) {
      return res.status(404).json({ error: 'Profissional não encontrado' });
    }

    await ProfissionalRepository.update(id, { nome, especialidade_id });
    const atualizado = await ProfissionalRepository.findById(id);
    res.json(atualizado);
  }

  async delete(req, res) {
    const { id } = req.params;

    const profissionalExistente = await ProfissionalRepository.findById(id);
    if (!profissionalExistente) {
      return res.status(404).json({ error: 'Profissional não encontrado' });
    }

    await ProfissionalRepository.delete(id);
    res.sendStatus(204);
  }
}

module.exports = new ProfissionalController();
