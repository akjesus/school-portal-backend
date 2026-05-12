const Aplication = require("../models/Applications");
const Email = require("../utils/Email");

exports.getAllApplications = async (req, res) => {
  try {
    const applications = await Aplication.getAllApplications();
    res.status(200).json({ success: true, applications });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createApplication = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      address,
      gender,
      dob,
      classApplied,
      parentName,
      parentPhone,
      paymentProof,
    } = req.body;
    if (
      !fullName ||
      !email ||
      !phone ||
      !dob ||
      !classApplied ||
      !address ||
      !parentName ||
      !parentPhone ||
      !paymentProof
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const application = await Aplication.create({
      fullName,
      email,
      phone,
      dob,
      gender: gender === "Male" ? "M" : "F",
      classApplied,
      address,
      parentName,
      parentPhone,
      paymentProof,
    });
    if (!application) {
      return res
        .status(400)
        .json({ success: false, message: "Failed to create application" });
    }
    res
      .status(201)
      .json({ success: true, message: "Application created successfully" });

    const sendEmail = new Email({
      name: application.fullName,
      email: application.email,
      applicationNo: application.applicationNo,
    });
    await sendEmail.sendApplication();
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, remark } = req.body;
    if (!id || !status) {
      return res.status(400)
        .json({ success: false, message: "Application ID and status are required" });
    }
    const application = await Aplication.updateStatus(id, status, remark);
    if (!application) {
      return res
        .status(404)
        .json({ success: false, message: "Application not found" });
    }
    res.status(200).json({
      success: true,
      message: "Application status updated successfully",
    });
    const sendEmail = new Email({
      name: application.fullName,
      email: application.email,
      applicationNo: application.applicationNo,
    });
    if (status === "approved") {
      await sendEmail.sendAdmission();
    } else if (status === "rejected") {
      await sendEmail.sendRejection();
    }
    
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};
