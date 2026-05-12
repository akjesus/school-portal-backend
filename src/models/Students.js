const db = require("../config/db");

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
    s.email,
    s.phone,
    s.status,
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
    admissionNo,
    gender,
    dob,
    email,
    phone,
    address,
    parentName,
    parentPhone,
  ) {
    const id = uuidv4();
    const sql = `
        INSERT INTO students (id, firstName, lastName, admissionNo, gender, dob, email, phone, address, parentName, parentPhone)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
    const [rows] = db.query(sql, [
      id,
      firstName,
      lastName,
      admissionNo,
      gender,
      dob,
      email,
      phone,
      address,
      parentName,
      parentPhone,
    ]);
    return rows;
  }
}

module.exports = Student;
