const db = require('../models/ConnectDatabase') // Importando o módulo de conexão com o banco de dados

class CategoryRepository {

  async findAll() {
    const rows = await db.query('select * from categories');
    return rows;
  }

  async findById(id) {
    const [row] = await db.query('select * from categories where id = ?', [id]);
    return row;
  }

  async create(name) {
    const result = await db.query('insert into categories (name) values (?)', [name]);
    const insertedId = result.insertId;
    return {
      id: insertedId,
      name
    };
  }

  async update(id, name) {
    const result = await db.query('update categories set name = ? where id = ?', [name, id]);
    return result;
  }

  async delete(id) {
    const deleteCategory = await db.query('delete from categories where id = ?', [id]);
    return deleteCategory;
  }
}

module.exports = new CategoryRepository();
