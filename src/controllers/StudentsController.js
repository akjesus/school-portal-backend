const Student = require("../models/Students");

exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.getAllStudents();
    return res.status(200).json({ success: true, students });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.createStudent = async (req, res) => {
  const {
    admissionNo,
    firstName,
    lastName,
    otherNames,
    className,
    gender,
    email,
    dob,
    address,
    classId,
    phone,
    parentName,
    parentPhone,
  } = req.body;
  try {
    console.log(req.body)
    const student = await Student.addStudent(
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
    );
    return res.status(201).json({ success: true, student });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteStudent = async()=> {
  const {id} = req.params 
  try {
    const student = await Student.findbyId(id)
  } catch (error) {
    
  }
}
