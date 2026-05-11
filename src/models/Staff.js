const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");

class StaffModel {
  static async create(data) {
    const id = uuidv4();
    const { name, email, role, phone, teacher, departmentId, password } = data;
    const [result] = await db.query(
      "INSERT INTO staff (id, name, email, role, phone, teacher, departmentId, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [id, name, email, role, phone, teacher, departmentId, password],
    );
    return { id, name, email, role, phone, teacher, departmentId };
  }
static async getAll() {
  const [result] = await db.query(`
    SELECT s.id, s.name, s.email, s.role, s.staffId,
    s.phone, s.teacher, d.name as department 
    FROM staff s 
    LEFT JOIN departments d ON s.departmentId = d.id`);
  return result
}

  static async getByEmail(email) {
    const [rows] = await db.query("SELECT * FROM staff WHERE email = ?", [
      email,
    ]);
    return rows[0];
  }

  static async update(
    id,
    role,
    department_id,
    first_name,
    last_name,
    email,
    username,
    photo,
    phone,
    address,
  ) {
    await db.query(
      "UPDATE staff SET role = ?, first_name = ?, last_name = ?, email = ?, phone = ?, address = ?, updated_at = NOW() WHERE id = ?",
      [role, first_name, last_name, email, phone, address, id],
    );
  }
  static async delete(id) {
    await db.query("DELETE FROM staff WHERE id = ?", [id]);
  }
}

module.exports = StaffModel;
