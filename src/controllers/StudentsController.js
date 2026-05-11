const Student = require("../models/Students");

exports.getAllStudents = async (req, res) => {

  try {
    const students = await Student.getAllStudents(); 
    return res.status(200).json({success: true, students});
  } catch (error) {
    console.log(error);
    return res.status(500).json({success: false, message: error.message});
  }
};

exports.createStudent = async (req, res) => {
  const { name, admissionNo, className, gender, email, phone } = req.body;
  try {
    const student = await Student.addStudent(name, admissionNo, className, gender, email, phone);
    return res.status(201).json({success: true, student});
  } catch (error) {
    return res.status(500).json({success: false, message: error.message});
  }
};

