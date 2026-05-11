const StaffModel = require("../models/Staff");
const bcrypt = require("bcryptjs");

exports.createStaff = async (req, res) => {
  try {
    console.log(req.body)
    const {
      name,
      email,
      role,
      phone,
      teacher,
      departmentId,
      password,
    } = req.body;
    if (
      !name ||
      !email ||
      !role ||
      !phone ||
      !teacher ||
      !departmentId ||
      !password
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const staff = await StaffModel.create({
      name,
      email,
      role,
      phone,
      teacher,
      departmentId,
      password: await bcrypt.hash(password, 10),
    });
    return res.status(201).json({ success: true, staff });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllStaff = async (req, res) => {
    try {
        const staff = await StaffModel.getAll();
        return res.status(200).json({ success: true, staff });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message });
    }
}
