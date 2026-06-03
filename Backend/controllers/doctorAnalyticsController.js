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

    const feedbacks = await Feedback.find();

    const doctorData = {};

    feedbacks.forEach((item) => {

      const doctor =
        (
          item.doctorName ||
          item.consultantName ||
          "Unknown"
        )
        .trim()
        .toUpperCase();

      if (!doctorData[doctor]) {

        doctorData[doctor] = {

          doctorName: doctor,

          totalFeedback: 0,

          totalScore: 0,

          ratingCount: 0,

          excellent: 0,

          good: 0,

          fair: 0,

          needsImprovement: 0,

          poor: 0,

          comments: [],
        };

      }

      doctorData[doctor].totalFeedback++;

      // OPD Ratings

      if (item.ratings) {

        Object.values(item.ratings)
          .forEach((value) => {

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

              if (
                value ===
                "Needs Improvement"
              )
                doctorData[doctor]
                  .needsImprovement++;

              if (value === "Poor")
                doctorData[doctor].poor++;

            }

          });

      }

      // IPD Doctor Rating

      if (item.doctorExperience) {

        doctorData[doctor].totalScore +=
          Number(item.doctorExperience);

        doctorData[doctor].ratingCount++;

      }

      // Comments

      if (item.comment) {

        doctorData[doctor].comments.push(
          item.comment
        );

      }

      if (item.suggestion) {

        doctorData[doctor].comments.push(
          item.suggestion
        );

      }

    });

    const result =
      Object.values(doctorData)
        .map((doctor) => ({

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