const db = require('../models/ConnectDatabase');

class ProfissionalRepository {
  async findAll() {
    const rows = await db.query('SELECT * FROM profissionais');
    return rows;
  }

  async findById(id) {
    const rows = await db.query('SELECT * FROM profissionais WHERE id = ?', [id]);
    return rows[0];
  }

  async create({ nome, especialidade_id }) {
    const result = await db.query(
      'INSERT INTO profissionais (nome, especialidade_id) VALUES (?, ?)',
      [nome, especialidade_id]
    );
    return {
      id: result.insertId,
      nome,
      especialidade_id
    };
  }

  async update(id, { nome, especialidade_id }) {
    await db.query(
      'UPDATE profissionais SET nome = ?, especialidade_id = ? WHERE id = ?',
      [nome, especialidade_id, id]
    );
  }

  async delete(id) {
    await db.query('DELETE FROM profissionais WHERE id = ?', [id]);
  }
}

module.exports = new ProfissionalRepository();
