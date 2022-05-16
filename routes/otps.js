/**
 * OTP CRUD routes
 * @author Shuja Naqvi
 */
const router = require("express").Router();
const OTPs = require("../controllers/otp");
const {
  validateOTPCreate,
  validateOTPVerify,
  isValidated,
} = require("../middleware/validators");

/**
 * ////////////////////////// Routes /////////////////////////
 * @method post create otp
 * @method put verify otp
 */

// Create - OTP
router.post("/", validateOTPCreate, isValidated, OTPs.create);

router.put("/", validateOTPVerify, isValidated, OTPs.verify); //verify otp

module.exports = router;
