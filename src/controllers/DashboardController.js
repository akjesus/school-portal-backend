const Dashboard = require("../models/Dashboard");

exports.getDashboardData = async (req, res) => {
  try {
    const data = await Dashboard.getDashboardData();
    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
