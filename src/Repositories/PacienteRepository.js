const db = require('../models/ConnectDatabase');

class PacienteRepository {
  async findAll() {
    const rows = await db.query('SELECT * FROM pacientes');
    return rows;
  }

  async findById(id) {
    const rows = await db.query('SELECT * FROM pacientes WHERE id = ?', [id]);
    return rows[0];
  }

  async create({ nome, data_nascimento, telefone, email }) {
    const result = await db.query(
      'INSERT INTO pacientes (nome, data_nascimento, telefone, email) VALUES (?, ?, ?, ?)',
      [nome, data_nascimento, telefone, email]
    );
    return {
      id: result.insertId,
      nome,
      data_nascimento,
      telefone,
      email,
    };
  }

  async update(id, { nome, data_nascimento, telefone, email }) {
    const result = await db.query(
      'UPDATE pacientes SET nome = ?, data_nascimento = ?, telefone = ?, email = ? WHERE id = ?',
      [nome, data_nascimento, telefone, email, id]
    );
    return result;
  }

  async delete(id) {
    const result = await db.query('DELETE FROM pacientes WHERE id = ?', [id]);
    return result;
  }
}

module.exports = new PacienteRepository();
