const ClassModel = require("../models/Class");

exports.createClass = async (req, res) => {
  try {
    const { name, arm } = req.body;
    const classData = await ClassModel.create({ name, arm, departmentId });
    res.status(201).json({ success: true, class: classData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllClasses = async (req, res) => {
  try {
    const classes = await ClassModel.getAllClasses();
    res.status(200).json({ success: true, classes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};