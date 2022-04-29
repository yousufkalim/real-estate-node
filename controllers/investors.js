/**
 * User CRUD controllers
 * @author Shuja Naqvi
 */
const Investors = require("../models/Investors");
const Projects = require("../models/Projects");

/**
 * Create Investor - Signup
 * @param {object} req
 * @param {object} res
 */
exports.create = async (req, res) => {
  try {
    let { phone, email } = req.body; // Getting required fields from body
    const existingInvestor = await Investors.findOne({
      $or: [{ phone: phone }, { email: email }],
    }); // Finding already existing user
    // Extra Validations
    if (existingInvestor) {
      // If we found existing user in db
      return res
        .status(409)
        .json({ success: false, message: "User already exists." });
    }
    // Creating User
    const Investor = await Investors.create(req.body); // Adding user in db
    res.json({ success: true, Investor }); //Success
    // Done
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * Get all Investors
 * @param {object} req
 * @param {object} res
 */
exports.getAll = async (req, res) => {
  try {
    const investors = await Investors.find(); // Finding all the Investors from db
    res.json({ success: true, investors }); // Success
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * Get investor by id
 * @param {object} req
 * @param {object} res
 */
exports.getById = async (req, res) => {
  try {
    const investorId = req.params.investorId; // Getting investor id from URL parameter
    const investor = await Investors.findById(investorId); // Finding investor by id
    res.json({ success: true, investor }); // Success
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * Update investor
 * @param {object} req
 * @param {object} res
 */
exports.update = async (req, res) => {
  try {
    const investorId = req.params.investorId; // Getting investor id from URL parameter
    const investor = await Investors.findByIdAndUpdate(investorId, req.body, {
      new: true,
    }); // Updating the user
    res.json({ success: true, investor }); // Success
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * Delete investor
 * @param {object} req
 * @param {object} res
 */
exports.delete = async (req, res) => {
  try {
    const investorId = req.params.investorId; // Getting investor id from URL parameter
    const investor = await Investors.findByIdAndDelete(investorId); // Deleting the investor
    res.json({ success: true, investor }); // Success
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * Assign shares to investor
 * @param {object} req
 * @param {object} res
 */
exports.assignShare = async (req, res) => {
  try {
    const investorId = req.params.investorId; // Getting investor id from URL parameter
    const existingproject = await Projects.findById(req.body.projects.project);
    if (existingproject.remaining_shares < req.body.projects.shares) {
      return res.json({
        success: false,
        message: "You dont have as much remaining shares for this project",
      });
    }
    const investor = await Investors.findByIdAndUpdate(investorId, req.body, {
      new: true,
    }); // update the investor
    req.body.investors = {
      investor: investorId,
      shares: req.body.projects.shares,
    };
    req.body.remaining_shares =
      existingproject.remaining_shares - req.body.projects.shares;
    const project = await Projects.findByIdAndUpdate(
      req.body.projects.project,
      req.body,
      { new: true }
    );
    res.json({ success: true, investor, project }); // Success
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
