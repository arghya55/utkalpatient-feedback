const express = require("express");

const router = express.Router();

const {
  getDoctorAnalytics,
} = require(
  "../controllers/doctorAnalyticsController"
);

router.get(
  "/doctor-analytics",
  getDoctorAnalytics
);

module.exports = router;