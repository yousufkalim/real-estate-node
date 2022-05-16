/**
 * All the validation
 * @author Shuja Naqvi
 */
const { check, validationResult } = require("express-validator");

/*
====================
Validations
====================
*/

// You can create multiple validations strategies (Read express-validator documentation for more details)
// User Signup Validation
exports.validateInvestor = [
  check("first_name", "first_name is required.").notEmpty().trim(),
  check("last_name", "last_name is required.").notEmpty().trim(),
  check("phone", "phone is required.").notEmpty().trim(),
];

// User update Validation
exports.validateInvestorUpdate = [
  check("first_name", "first_name is required.").notEmpty().trim(),
  check("last_name", "last_name is required.").notEmpty().trim(),
];

// Project Validation
exports.validateProject = [
  check("name", "name is required.").notEmpty().trim(),
  check("city", "city is required.").notEmpty().trim(),
  check("start_date", "start_date is required.").notEmpty(),
  check("end_date", "end_date is required.").notEmpty().trim(),
  check("total_cost", "total_cost is required.").notEmpty().trim(),
  check("selling_price", "selling_price is required.").notEmpty().trim(),
];

// Login validation
exports.validateLogin = [
  check("phone", "phone is required.").notEmpty().trim(),
];

// Change password validation
exports.changePasswordValidate = [
  check("oldPassword", "Old Password is required.")
    .notEmpty()
    .trim()
    .isLength({ min: 8 }),
  check("newPassword", "New password is required.")
    .notEmpty()
    .trim()
    .isLength({ min: 8 }),
  check("confirmPassword", "Confirm password is required.")
    .notEmpty()
    .trim()
    .isLength({ min: 8 }),
];

exports.validateOTPCreate = [check("phone", "Phone is required.").notEmpty()];
exports.validateOTPVerify = [
  check("phone", "Phone is required.").notEmpty(),
  check("Otp", "Otp is required.").notEmpty().trim(),
];

/*
======================
Result
======================
*/

/**
 * To check if request validated successfully or not, according to our validation strategies
 * @param {object} req
 * @param {object} res
 * @param {*} next
 */
exports.isValidated = (req, res, next) => {
  const errors = validationResult(req); // Validating the request by previous middleware's strategy
  if (!errors.isEmpty()) {
    // On error
    res.status(400).send({ success: false, message: errors.array()[0].msg }); // Sending first error to the client from array of errors
  } else {
    // Validated successfully
    next(); // Pass the request to next middleware or controller
  }
};
