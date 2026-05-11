const db = require("../config/db");

class Student {
  static async getAllStudents() {
    //join classes when fetching students
    const [result] = await db.query(`
       SELECT 
    s.id,
    s.admission_no,
    s.first_name,
    s.last_name,
    s.other_names,
    s.gender,
    s.email,
    s.phone,
    s.status,
    s.admission_date,
    c.name AS class,
    c.arm AS arm,
    d.name AS department

FROM students s
LEFT JOIN classes c
    ON s.class_id = c.id
LEFT JOIN departments d
    ON s.department_id = d.id
ORDER BY s.created_at DESC;
       `);
    return result;
  }

  static async getTotalStudents(search) {
    const [rows] = await db.query(
      `
      SELECT COUNT(*) as total FROM students
      WHERE name LIKE ?
    `,
      [`%${search}%`],
    );
    return rows[0].total;
  }
  static async addStudent(name, admissionNo, className, gender, email, phone) {
    const sql = `
        INSERT INTO students (name, admissionNo, className, gender, email, phone)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
    const [rows] = db.query(
      sql,
      [name, admissionNo, className, gender, email, phone],
      callback,
    );
    return rows;
  }
}

module.exports = Student;
