const express = require("express");
const router = express.Router();

const {
  createFeedback,
  getAllFeedback,
  getOPDFeedback,
  getIPDFeedback,
  getGeneralFeedback,
} = require("../controllers/feedbackController");

const Feedback = require("../models/Feedback");

// CREATE
router.post("/", createFeedback);

// FILTER ROUTES FIRST
router.get("/opd", getOPDFeedback);

router.get("/ipd", getIPDFeedback);

router.get("/general", getGeneralFeedback);

// ALL
router.get("/", getAllFeedback);

// SINGLE
router.get("/:id", async (req, res) => {
  try {
    const data = await Feedback.findById(
      req.params.id
    );

    res.json(data);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
});

module.exports = router;