const db = require('../models/ConnectDatabase');

class EspecialidadeRepository {
  async findAll() {
    const rows = await db.query('SELECT * FROM especialidades');
    return rows;
  }

  async findById(id) {
    const rows = await db.query('SELECT * FROM especialidades WHERE id = ?', [id]);
    return rows[0];
  }

  async create({ nome }) {
    const result = await db.query(
      'INSERT INTO especialidades (nome) VALUES (?)',
      [nome]
    );
    return {
      id: result.insertId,
      nome,
    };
  }

  async update(id, { nome }) {
    const result = await db.query(
      'UPDATE especialidades SET nome = ? WHERE id = ?',
      [nome, id]
    );
    return result;
  }

  async delete(id) {
    const result = await db.query('DELETE FROM especialidades WHERE id = ?', [id]);
    return result;
  }
}

module.exports = new EspecialidadeRepository();
