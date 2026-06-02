const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");

const loginAdmin = async (req, res) => {

  try {

    const { text, password } =
      req.body;

    const admin =
      await Admin.findOne({ text });

    if (!admin) {

      return res.status(401).json({
        message: "Invalid Username",
      });

    }

    if (password !== admin.password) {

      return res.status(401).json({
        message: "Invalid Password",
      });

    }

    const token = jwt.sign(
      {
        id: admin._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      token,
      text: admin.text,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

module.exports = {
  loginAdmin,
};