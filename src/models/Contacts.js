const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");

class Contact {
  static async getAllContacts() {
    const [result] = await db.query(`SELECT * FROM contacts`);
    return result;
  }
  static async create(data) {
    const id = uuidv4();
    const { fullName, email, phone, subject, message } = data;
    const [result] = await db.query(
      `INSERT INTO contacts (id, fullName, email, phone, subject, message) VALUES (?, ?, ?, ?, ?, ?)`,
      [id, fullName, email, phone, subject, message],
    );
    if (result.affectedRows > 0) {
      const [contact] = await db.query(
        "SELECT fullName, email, phone, subject FROM contacts WHERE id = ?",
        [id],
      );
      return contact[0];
    } else {
      return null;
    }
  }
}

module.exports = Contact;
