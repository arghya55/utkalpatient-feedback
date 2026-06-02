const Feedback = require("../models/Feedback");

const getAnalytics = async(req,res)=>{

  const feedbacks =
  await Feedback.find();

  res.json({
    total:feedbacks.length,

    opd:
    feedbacks.filter(
      x=>x.type==="OPD"
    ).length,

    ipd:
    feedbacks.filter(
      x=>x.type==="IPD"
    ).length,

    general:
    feedbacks.filter(
      x=>x.type==="GENERAL"
    ).length
  });
};

module.exports={
  getAnalytics
};