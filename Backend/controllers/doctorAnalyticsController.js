const Feedback = require("../models/Feedback");

const ratingMap = {
  Excellent: 5,
  Good: 4,
  Fair: 3,
  "Needs Improvement": 2,
  Poor: 1,
};

const getDoctorAnalytics = async (req, res) => {
  try {

    const feedbacks = await Feedback.find({
      doctorName: { $ne: null, $ne: "" }
    });

    const doctorData = {};

    feedbacks.forEach((item) => {

      const doctor =
        item.doctorName ||
        item.consultantName ||
        "Unknown";

      if (!doctorData[doctor]) {

        doctorData[doctor] = {
          doctorName: doctor,
          totalFeedback: 0,
          totalScore: 0,
          ratingCount: 0,
          comments: [],
          excellent: 0,
          good: 0,
          fair: 0,
          needsImprovement: 0,
          poor: 0,
        };
      }

      doctorData[doctor].totalFeedback++;

      const ratings = item.ratings || {};

      Object.values(ratings).forEach((value) => {

        if (
          typeof value === "string" &&
          ratingMap[value]
        ) {

          doctorData[doctor].totalScore +=
            ratingMap[value];

          doctorData[doctor].ratingCount++;

          if (value === "Excellent")
            doctorData[doctor].excellent++;

          if (value === "Good")
            doctorData[doctor].good++;

          if (value === "Fair")
            doctorData[doctor].fair++;

          if (value === "Needs Improvement")
            doctorData[doctor].needsImprovement++;

          if (value === "Poor")
            doctorData[doctor].poor++;
        }
      });

      if (item.comment) {
        doctorData[doctor].comments.push(
          item.comment
        );
      }

    });

    const result = Object.values(
      doctorData
    ).map((doctor) => ({
      ...doctor,

      averageRating:
        doctor.ratingCount > 0
          ? (
              doctor.totalScore /
              doctor.ratingCount
            ).toFixed(1)
          : 0,
    }));

    result.sort(
      (a, b) =>
        b.averageRating -
        a.averageRating
    );

    res.status(200).json(result);

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  getDoctorAnalytics,
};