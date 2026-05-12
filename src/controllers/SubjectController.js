const SubjectModel = require("../models/Subjects");

exports.getAllSubjects = async (req, res) => {
  try {
    const subjects = await SubjectModel.getAllSubjects();
    res.status(200).json({ success: true, subjects });
  } catch (error) {
    console.error("Error fetching subjects:", error);
    res.status(500).json({ success: false, error: "Failed to fetch subjects" });
  }
};
