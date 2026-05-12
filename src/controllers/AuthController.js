const StaffModel = require("../models/Staff");
const StudentModel = require("../models/Students");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.loginStaff = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const staff = await StaffModel.getByEmail(email);
    if (!staff) {
      return res
        .status(404)
        .json({ success: false, message: "Staff not found!" });
    }
    const correct = bcrypt.compare(password, staff.password);
    if (!correct) {
      return res
        .status(403)
        .json({ success: false, message: "Invalid Password!" });
    }
    staff.password = undefined;
    const token = jwt.sign(
      { id: staff.id, role: "staff" },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN },
    );
    return res.status(200).json({ success: true, staff, token });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error });
  }
};

exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "No token provided!" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid token!" });
    }
    if (!decoded) {
      return res.status(403).json({ success: false, message: "Unauthorized!" });
    }
    req.user = decoded;
    next();
  });
};

exports.restrictTo = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ success: false, message: "Forbidden!" });
    }
    next();
  };
};

exports.loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const student = await StudentModel.findByEmail(email);
    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found!" });
    }
    const correct = bcrypt.compare(password, student.password);
    if (!correct) {
      return res
        .status(403)
        .json({ success: false, message: "Invalid Password!" });
    }
    student.password = undefined;
    const token = jwt.sign(
      { id: student.id, role: "student" },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN },
    );
    return res.status(200).json({ success: true, student, token });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
