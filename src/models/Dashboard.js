const db = require("../config/db");

class DashboardModel {
  static async getDashboardData() {
    try {
      const [students] = await db.query("SELECT COUNT(*) AS count FROM students");
      const [teachers] = await db.query("SELECT COUNT(*) AS count FROM staff");
      const [subjects] = await db.query("SELECT COUNT(*) AS count FROM subjects");
        return {
        students: students[0].count,
        teachers: teachers[0].count,
        subjects: subjects[0].count,
      };
    } catch (error) {
      throw error;
      return null
    }
}}
module.exports = DashboardModel;