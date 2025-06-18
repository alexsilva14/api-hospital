const PacienteRepository = require('../Repositories/PacienteRepository');

class PacienteController {
  async index(req, res) {
    const pacientes = await PacienteRepository.findAll();
    res.json(pacientes);
  }

  async show(req, res) {
    const { id } = req.params;
    const paciente = await PacienteRepository.findById(id);
    if (!paciente) {
      return res.status(404).json({ error: 'Paciente não encontrado' });
    }
    res.json(paciente);
  }

  async store(req, res) {
    const { nome, data_nascimento, telefone, email } = req.body;

    if (!nome) {
      return res.status(400).json({ error: 'Nome é obrigatório!' });
    }

    const paciente = await PacienteRepository.create({ nome, data_nascimento, telefone, email });
    res.status(201).json(paciente);
  }

  async update(req, res) {
    const { id } = req.params;
    const { nome, data_nascimento, telefone, email } = req.body;

    const pacienteExistente = await PacienteRepository.findById(id);
    if (!pacienteExistente) {
      return res.status(404).json({ error: 'Paciente não encontrado' });
    }
    if (!nome) {
      return res.status(400).json({ error: 'Nome é obrigatório!' });
    }

    await PacienteRepository.update(id, { nome, data_nascimento, telefone, email });
    const pacienteAtualizado = await PacienteRepository.findById(id);
    res.json(pacienteAtualizado);
  }

  async delete(req, res) {
    const { id } = req.params;

    const pacienteExistente = await PacienteRepository.findById(id);
    if (!pacienteExistente) {
      return res.status(404).json({ error: 'Paciente não encontrado' });
    }

    await PacienteRepository.delete(id);
    res.sendStatus(204);
  }
}

module.exports = new PacienteController();
