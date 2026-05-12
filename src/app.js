const express = require("express");
const cors = require("cors");
require("dotenv").config();
const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Routes
app.use("/api/v1/students", require("./routes/StudentRoutes"));
app.use("/api/v1/auth", require("./routes/AuthRoutes"));
app.use("/api/v1/staff", require("./routes/StaffRoutes"));
app.use("/api/v1/subjects", require("./routes/SubjectRoutes"));
app.use("/api/v1/applications", require("./routes/ApplicationRoutes"));
app.use("/api/v1/contacts", require("./routes/ContactRoutes"));
app.use("/api/v1/dashboard", require("./routes/DashboardRoutes"));


app.get("/", (req, res) => {
  res.json({"message": "School Portal API Running"});
});

//404 error handler
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: "Route not found!" });
});

module.exports = app;
