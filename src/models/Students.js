const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");

class Student {
  static async getAllStudents() {
    //join classes when fetching students
    const [result] = await db.query(`
       SELECT 
    s.id,
    s.admissionNo,
    s.firstName,
    s.lastName,
    s.otherNames,
    s.gender,
    s.dob,
    s.email,
    s.phone,
    s.status,
    s.parentName,
    s.parentPhone,
    s.address,
    s.admissionDate,
    c.name AS class,
    c.arm AS arm,
    d.name AS department

FROM students s
LEFT JOIN classes c
    ON s.classId = c.id
LEFT JOIN departments d
    ON s.departmentId = d.id
ORDER BY s.created_at DESC;
       `);
    return result;
  }

  static async getTotalStudents(search) {
    const [rows] = await db.query(
      `
      SELECT COUNT(*) as total FROM students
      WHERE firstName LIKE ?
    `,
      [`%${search}%`],
    );
    return rows[0].total;
  }
  static async addStudent(
    firstName,
    lastName,
    otherNames,
    admissionNo,
    gender,
    dob,
    email,
    phone,
    address,
    classId,
    parentName,
    parentPhone,
  ) {
    try {
      const id = uuidv4();
      const sql = `
        INSERT INTO students (id, firstName, lastName, otherNames, admissionNo, gender, dob, email, phone, address, classId, parentName, parentPhone)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const [rows] = db.query(sql, [
        id,
        firstName,
        lastName,
        otherNames,
        admissionNo,
        gender,
        dob,
        email,
        phone,
        address,
        classId,
        parentName,
        parentPhone,
      ]);
      return rows;
    } catch (error) {
      console.log(error);
    }
  }
  static async findbyId(id) {
    const [rows] = await db.query("select * from students where id = ?", [id]);
  }
  static async delete(id) {
    const [rows] = await db.query("delete from students where id = ?", [id]);
  }
}

module.exports = Student;
