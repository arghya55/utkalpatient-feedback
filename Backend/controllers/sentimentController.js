// controllers/sentimentController.js

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
  "clean"
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
  "unhappy"
];

const getSentimentAnalytics = async (req,res)=>{

 try{

   const feedbacks =
   await Feedback.find();

   let positive = [];
   let negative = [];

   feedbacks.forEach(item=>{

      const text =
      (
        item.feedback ||
        item.comment ||
        item.suggestion ||
        ""
      ).toLowerCase();

      let posScore = 0;
      let negScore = 0;

      positiveWords.forEach(word=>{
        if(text.includes(word))
          posScore++;
      });

      negativeWords.forEach(word=>{
        if(text.includes(word))
          negScore++;
      });

      if(posScore >= negScore){

        positive.push({
          _id:item._id,
          text
        });

      }else{

        negative.push({
          _id:item._id,
          text
        });

      }

   });

   res.json({

     positiveCount:
     positive.length,

     negativeCount:
     negative.length,

     positive,

     negative

   });

 }
 catch(error){

   res.status(500).json({
     message:error.message
   });

 }

};

module.exports = {
 getSentimentAnalytics
};