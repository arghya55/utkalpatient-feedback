const express = require("express");
const router = express.Router();

const {
 getSentimentAnalytics
} = require(
 "../controllers/sentimentController"
);

router.get(
 "/",
 getSentimentAnalytics
);

module.exports = router;