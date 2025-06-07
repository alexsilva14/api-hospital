const db = require('../models/ConnectDatabase')

class ContactRepository {
    async findAll() {
        const rows = await db.query(
            `select contacts.*, categories.name as category_name from contacts
            left join categories on categories.id = contacts.category_id`
        )
        return rows;
    }

    async findById(id) {
        const [row] = await db.query(
            `select contacts.*, categories.name as category_name from contacts
            left join categories on categories.id = contacts.category_id where contacts.id = ?`, [id]
        )
        return row;
    }

    async findByEmail(email) {
        const [rows] = await db.query(
            `select * from contacts where email = ?`, [email]
        )
        return rows
    }

    async create({ name, email, phone, category_id }) {
        const result = await db.query(`insert into contacts (name, email, phone, category_id) values (?, ?, ?, ?)`,
            [name, email, phone, category_id])

        const insertedId = result.insertId
        return {
            id: insertedId,
            name,
            email,
            phone,
            category_id
        }
    }

    async update(id, {name, email, phone, category_id }) {
      const result = await db.query(
        
        `
        update contacts set name = ?, email = ?, phone = ?, category_id = ?
        where id = ?
        `, [name, email, phone, category_id, id]

      )
      return result

    }

    async delete(id) {
        const deleteItem = await db.query(
            `delete from contacts where id = ?`, [id]
        )
        return deleteItem
    }
}

module.exports = new ContactRepository();
