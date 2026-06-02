const Feedback = require("../models/Feedback");


// CREATE FEEDBACK

const createFeedback = async (req, res) => {

  try {

    const feedback =
      await Feedback.create(req.body);

    res.status(201).json(feedback);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};


// ALL FEEDBACK

const getAllFeedback = async (req, res) => {

  try {

    const feedback =
      await Feedback.find()
      .sort({ createdAt: -1 });

    res.json(feedback);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};


// OPD FEEDBACK

const getOPDFeedback = async (req, res) => {

  try {

    const feedback =
      await Feedback.find({
        type: "OPD",
      }).sort({ createdAt: -1 });

    res.json(feedback);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};


// IPD FEEDBACK

const getIPDFeedback = async (req, res) => {

  try {

    const feedback =
      await Feedback.find({
        type: "IPD",
      }).sort({ createdAt: -1 });

    res.json(feedback);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};


// GENERAL FEEDBACK

const getGeneralFeedback = async (req, res) => {

  try {

    const feedback =
      await Feedback.find({
        type: "GENERAL",
      }).sort({ createdAt: -1 });

    res.json(feedback);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};


module.exports = {
  createFeedback,
  getAllFeedback,
  getOPDFeedback,
  getIPDFeedback,
  getGeneralFeedback,
};