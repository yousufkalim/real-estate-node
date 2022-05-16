/**
 * User OTP controllers
 * @author Shuja Naqvi
 */
const OTPs = require("../models/Otp");
const Investors = require("../models/Investors");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilio_sender = process.env.TWILIO_SENDER;
const client = require("twilio")(accountSid, authToken);

/**
 * Create OTP
 * @param {object} req
 * @param {object} res
 */
exports.create = async (req, res) => {
  try {
    let { phone } = req.body; // Getting required fields from body
    const existingInvestor = await Investors.findOne({ phone: phone }); // Finding already existing user
    if (!existingInvestor) {
      // If we found existing user in db
      return res
        .status(409)
        .json({ success: false, message: "User not found" });
    }
    req.body.otp = Math.floor(100000 + Math.random() * 900000);
    req.body.is_verified = false;
    if (client.messages) {
      client.messages
        .create({
          body: `Please confirm your phone number,Your One Time Password is ${req.body.otp}.... :)`,
          from: twilio_sender,
          to: phone,
        })
        .then((message) => console.log(message.sid))
        .catch((e) => {
          return console.error("Got an error:", e.code, e.message);
        });
    }
    let otp = await OTPs.findOneAndUpdate({ phone }, req.body, {
      upsert: true,
      new: true,
    });
    return res.json({
      success: true,
      message: "OTP sent",
      otp: otp,
    });
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

//verify Otp
exports.verify = async (req, res) => {
  try {
    let { phone, Otp } = req.body; // Getting required fields from body
    let otp = await OTPs.findOne({ phone }); //find otp by id
    if (otp.otp == Otp) {
      otp.is_verified = true;
      await otp.save();
      return res.json({
        success: true,
        message: "OTP verified",
        otp: otp,
      });
    }
    //if otp is invalid
    return res.status(404).json({ success: false, message: "OTP is invalid" });
  } catch (err) {
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
