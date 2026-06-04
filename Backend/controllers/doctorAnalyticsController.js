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
          "UNKNOWN"
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

          dailyData: {},
          weeklyData: {},
          monthlyData: {},
          yearlyData: {}
        };
      }

      doctorData[doctor].totalFeedback++;

      const date = new Date(item.createdAt);

      const day =
        date.toISOString().split("T")[0];

      const week =
        `${date.getFullYear()}-W${Math.ceil(
          date.getDate() / 7
        )}`;

      const month =
        `${date.getFullYear()}-${date.getMonth()+1}`;

      const year =
        `${date.getFullYear()}`;

      doctorData[doctor].dailyData[day] =
        (doctorData[doctor].dailyData[day] || 0) + 1;

      doctorData[doctor].weeklyData[week] =
        (doctorData[doctor].weeklyData[week] || 0) + 1;

      doctorData[doctor].monthlyData[month] =
        (doctorData[doctor].monthlyData[month] || 0) + 1;

      doctorData[doctor].yearlyData[year] =
        (doctorData[doctor].yearlyData[year] || 0) + 1;

      if (item.ratings) {

        Object.values(item.ratings)
        .forEach((value)=>{

          if(ratingMap[value]){

            doctorData[doctor].totalScore +=
            ratingMap[value];

            doctorData[doctor].ratingCount++;

            if(value==="Excellent")
            doctorData[doctor].excellent++;

            if(value==="Good")
            doctorData[doctor].good++;

            if(value==="Fair")
            doctorData[doctor].fair++;

            if(value==="Needs Improvement")
            doctorData[doctor].needsImprovement++;

            if(value==="Poor")
            doctorData[doctor].poor++;
          }

        });

      }

      if(item.doctorExperience){

        doctorData[doctor].totalScore +=
        Number(item.doctorExperience);

        doctorData[doctor].ratingCount++;

      }

      if(item.comment)
        doctorData[doctor].comments.push(item.comment);

      if(item.suggestion)
        doctorData[doctor].comments.push(item.suggestion);

    });

    const result = Object.values(
      doctorData
    ).map((doctor)=>({

      ...doctor,

      averageRating:
        doctor.ratingCount > 0
        ? (
            doctor.totalScore /
            doctor.ratingCount
          ).toFixed(1)
        : 0,

      dailyData:
        Object.entries(
          doctor.dailyData
        ).map(([day,feedback])=>({
          day,
          feedback
        })),

      weeklyData:
        Object.entries(
          doctor.weeklyData
        ).map(([week,feedback])=>({
          week,
          feedback
        })),

      monthlyData:
        Object.entries(
          doctor.monthlyData
        ).map(([month,feedback])=>({
          month,
          feedback
        })),

      yearlyData:
        Object.entries(
          doctor.yearlyData
        ).map(([year,feedback])=>({
          year,
          feedback
        }))

    }));

    res.json(result);

  } catch(error){

    res.status(500).json({
      message:error.message
    });

  }

};

module.exports = {
  getDoctorAnalytics
};