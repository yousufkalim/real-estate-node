/**
 * Investor auth controllers
 * @author Shuja Naqvi
 */

const OTPs = require("../models/Otp");
/**
 * Login
 * @param {object} req
 * @param {object} res
 */
exports.login = async (req, res) => {
  try {
    //if otp is verified then user will be logged in successfully
    const { phone } = req.body;
    // Getting user from db
    let otp = await OTPs.findOne({ phone }); //find otp by id
    if (otp.is_verified === true) {
      return res.json({
        success: true,
        message: "Successfully logged in",
      }); // done
    }
    res.json({ success: true, message: "Phone Number is not verified" });
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * Confirm auth
 * @param {object} req
 * @param {object} res
 */
exports.confirmAuth = async (req, res) => {
  // If user authenticated
  res.json({ success: true, user: req.user });
};
