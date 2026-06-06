const Feedback = require("../models/Feedback");

const positiveWords = [
  "good",
  "excellent",
  "great",
  "nice",
  "happy",
  "satisfied",
  "best",
  "awesome",
  "clean",
  "helpful",
  "friendly"
];

const negativeWords = [
  "bad",
  "poor",
  "dirty",
  "delay",
  "late",
  "worst",
  "problem",
  "issue",
  "unhappy",
  "rude",
  "slow"
];

const getSentimentAnalytics = async (
  req,
  res
) => {

  try {

    const feedbacks =
      await Feedback.find();

    let positive = [];
    let negative = [];
    let neutral = [];

    feedbacks.forEach(item => {

      const text = (
        item.feedback ||
        item.comment ||
        item.suggestion ||
        ""
      ).toLowerCase();

      let posScore = 0;
      let negScore = 0;

      positiveWords.forEach(word => {
        if (text.includes(word))
          posScore++;
      });

      negativeWords.forEach(word => {
        if (text.includes(word))
          negScore++;
      });

      const feedbackObj = {
        _id: item._id,
        text,
        createdAt: item.createdAt
      };

      if (posScore > negScore) {

        positive.push(feedbackObj);

      } else if (negScore > posScore) {

        negative.push(feedbackObj);

      } else {

        neutral.push(feedbackObj);

      }

    });

    res.json({

      positiveCount:
        positive.length,

      negativeCount:
        negative.length,

      neutralCount:
        neutral.length,

      positive,

      negative,

      neutral

    });

  } catch(error){

    res.status(500).json({
      message:error.message
    });

  }

};

module.exports = {
  getSentimentAnalytics
};