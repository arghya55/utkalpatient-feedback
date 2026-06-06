require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const feedbackRoutes =
require("./routes/feedbackRoutes");

const adminRoutes =
require("./routes/adminRoutes");

const analyticsRoutes =
require("./routes/analyticsRoutes");
const doctorAnalyticsRoutes =
require("./routes/doctorAnalyticsRoutes");
const sentimentRoutes =
require("./routes/sentiment");

const app = express();


// Database Connection

connectDB();


// Middleware

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({
  extended: true
}));


// Routes

app.use(
  "/api/feedback",
  feedbackRoutes
);

app.use(
  "/api/admin",
  adminRoutes
);

app.use(
  "/api/analytics",
  analyticsRoutes
);

app.use(
  "/api/analytics",
  doctorAnalyticsRoutes
);

app.use(
  "/api/sentiment",
  sentimentRoutes
);

// Home Route

app.get("/", (req, res) => {

  res.status(200).json({
    success: true,
    message:
      "Patient Feedback API Running Successfully"
  });

});


// 404 Route

app.use((req, res) => {

  res.status(404).json({
    success: false,
    message: "Route Not Found"
  });

});


// Global Error Handler

app.use(
  (err, req, res, next) => {

    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message
    });

  }
);


// Start Server

const PORT =
process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `🚀 Server Running On Port ${PORT}`
  );

});