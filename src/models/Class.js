const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");

class ClassModel {
  static async create(data) {
    const id = uuidv4();
    const { name, arm } = data;
    const sql = `
      INSERT INTO classes (id, name, arm)
      VALUES (?, ?, ?, ?)
    `;
    await db.query(sql, [id, name, arm]);
    return { id, name, arm };
  }
  static async getAllClasses() {
    const [result] = await db.query(`
      SELECT c.id, c.name, c.arm, capacity
      FROM classes c
      ORDER BY c.created_at DESC;
    `);
    return result;
  }
}

module.exports = ClassModel;
