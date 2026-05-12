const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");
class Application {
  static async getAllApplications() {
    const [result] = await db.query(`SELECT * FROM applications`);
    return result;
  }
  static async create(data) {
    const id = uuidv4();
    const applicationNo = `MUC-${Math.floor(1000 + Math.random() * 9000)}`;
    const {
      fullName,
      email,
      phone,
      dob,
      gender,
      classApplied,
      address,
      parentName,
      parentPhone,
      paymentProof,
    } = data;

    const [result] = await db.query(
      `INSERT INTO applications (id, applicationNo, fullName, email, phone, dob, gender, classApplied, address, parentName, parentPhone, paymentProof) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        applicationNo,
        fullName,
        email,
        phone,
        dob,
        gender,
        classApplied,
        address,
        parentName,
        parentPhone,
        paymentProof,
      ],
    );
    if (result.affectedRows > 0) {
      const [application] = await db.query(
        "SELECT fullName, email, applicationNo FROM applications WHERE id = ?",
        [id]
      );
      return application[0];
    }
    else {
      return null;
    }

  }
  static async updateStatus(id, status, remark) {
    const [result] = await db.query(
      `UPDATE applications SET status = ?, adminRemark = ? WHERE id = ?`,
      [status, remark, id],
    );
    if (result.affectedRows > 0) {
      const [application] = await db.query(
        "SELECT fullName, email, applicationNo FROM applications WHERE id = ?",
        [id]
      );
      return application[0];
    }
    else {
      return null;
    }
  }
}

module.exports = Application;
