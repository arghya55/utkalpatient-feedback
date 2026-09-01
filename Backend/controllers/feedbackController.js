const Feedback = require("../models/Feedback");
const sendEmail = require("../services/emailservice");

// CREATE FEEDBACK

const createFeedback = async (req, res) => {
  try {
    console.log("Incoming Data:", req.body);

    const feedback = await Feedback.create(req.body);

    const recipientEmail =
      req.body.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.body.email)
        ? req.body.email
        : null;

    if (recipientEmail) {
      sendEmail(recipientEmail, "Thank You for Your Feedback", `
        Dear ${req.body.name || "Patient"},

        Thank you for your valuable feedback.

        Regards,
        Utkal Hospital
      `).catch((err) => {
        console.error("Email Error:", err.message);
      });
    }

    res.status(201).json({
      success: true,
      message: "Feedback submitted successfully",
      data: feedback,
    });
  } catch (error) {
    console.log("Mongo Error:", error);

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