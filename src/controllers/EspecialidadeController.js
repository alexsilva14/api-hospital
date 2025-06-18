const EspecialidadeRepository = require('../Repositories/EspecialidadeRepository');

class EspecialidadeController {
  async index(req, res) {
    const especialidades = await EspecialidadeRepository.findAll();
    res.json(especialidades);
  }

  async show(req, res) {
    const { id } = req.params;
    const especialidade = await EspecialidadeRepository.findById(id);
    if (!especialidade) {
      return res.status(404).json({ error: 'Especialidade não encontrada' });
    }
    res.json(especialidade);
  }

  async store(req, res) {
    const { nome } = req.body;

    if (!nome) {
      return res.status(400).json({ error: 'Nome é obrigatório!' });
    }

    const especialidade = await EspecialidadeRepository.create({ nome });
    res.status(201).json(especialidade);
  }

  async update(req, res) {
    const { id } = req.params;
    const { nome } = req.body;

    const especialidadeExistente = await EspecialidadeRepository.findById(id);
    if (!especialidadeExistente) {
      return res.status(404).json({ error: 'Especialidade não encontrada' });
    }
    if (!nome) {
      return res.status(400).json({ error: 'Nome é obrigatório!' });
    }

    await EspecialidadeRepository.update(id, { nome });
    const especialidadeAtualizada = await EspecialidadeRepository.findById(id);
    res.json(especialidadeAtualizada);
  }

  async delete(req, res) {
    const { id } = req.params;

    const especialidadeExistente = await EspecialidadeRepository.findById(id);
    if (!especialidadeExistente) {
      return res.status(404).json({ error: 'Especialidade não encontrada' });
    }

    await EspecialidadeRepository.delete(id);
    res.sendStatus(204);
  }
}

module.exports = new EspecialidadeController();
