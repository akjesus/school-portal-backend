const db = require("../config/db");
class Subject {
  static async getAllSubjects() {
    const [result] = await db.query(`SELECT * FROM subjects`);
    return result;
  }
}

module.exports = Subject;