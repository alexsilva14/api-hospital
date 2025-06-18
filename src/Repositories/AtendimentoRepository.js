const db = require('../models/ConnectDatabase');

class AtendimentoRepository {
  async findAll() {
    const rows = await db.query('SELECT * FROM atendimentos');
    return rows;
  }

  async findById(id) {
    const rows = await db.query('SELECT * FROM atendimentos WHERE id = ?', [id]);
    return rows[0];
  }

  async create({ paciente_id, profissional_id, data, observacoes }) {
    const result = await db.query(
      'INSERT INTO atendimentos (paciente_id, profissional_id, data, observacoes) VALUES (?, ?, ?, ?)',
      [paciente_id, profissional_id, data, observacoes]
    );
    return {
      id: result.insertId,
      paciente_id,
      profissional_id,
      data,
      observacoes
    };
  }

  async update(id, { paciente_id, profissional_id, data, observacoes }) {
    await db.query(
      'UPDATE atendimentos SET paciente_id = ?, profissional_id = ?, data = ?, observacoes = ? WHERE id = ?',
      [paciente_id, profissional_id, data, observacoes, id]
    );
  }

  async delete(id) {
    await db.query('DELETE FROM atendimentos WHERE id = ?', [id]);
  }
}

module.exports = new AtendimentoRepository();
