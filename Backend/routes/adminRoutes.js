const express = require("express");

const router = express.Router();

router.post("/login", async (req, res) => {

  try {

    const { text, password } =
      req.body;

    // Admin Credentials

    if (
      text === "admin" &&
      password === "admin123"
    ) {

      return res.status(200).json({

        success: true,

        token: "admin-token",

        admin: {
          text
        }

      });

    }

    return res.status(401).json({

      success: false,

      message:
        "Invalid Username or Password"

    });

  } catch (error) {

    return res.status(500).json({

      success: false,

      message: error.message

    });

  }

});

module.exports = router;