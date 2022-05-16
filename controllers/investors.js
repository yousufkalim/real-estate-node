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
    let { phone } = req.body; // Getting required fields from body
    const existingInvestor = await Investors.findOne({
      phone: phone,
    }); // Finding already existing user
    // Extra Validations
    if (existingInvestor) {
      // If we found existing user in db
      return res
        .status(409)
        .json({ success: false, message: "Phone Number is already taken." });
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
    const investors = await Investors.find().populate({
      path: "projects",
      populate: {
        path: "project",
      },
    }); // Finding project by id; // Finding all the Investors from db
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
    const investor = await Investors.findById(investorId).populate({
      path: "projects",
      populate: {
        path: "project",
      },
    }); // Finding project by id; // Finding investor by id
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
    if (investor.projects.length > 0) {
      investor.projects.map(async (project) => {
        let findProject = await Projects.findById(project.project);
        const remaining_shares = project.shares + findProject.remaining_shares;
        findProject = await Projects.findByIdAndUpdate(project.project, {
          $pull: { investors: { investor: investorId } },
          remaining_shares: remaining_shares,
        });
      });
    }
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
    req.body.projects = {
      project: req.body.project,
      shares: req.body.shares,
    };
    req.body.investors = {
      investor: investorId,
      shares: req.body.projects.shares,
    };
    let existingproject = await Projects.findById(req.body.projects.project);
    let investor = await Investors.findById(investorId);
    investor?.projects.push(req.body.projects);
    existingproject.remaining_shares =
      existingproject.remaining_shares - req.body.projects.shares;
    existingproject?.investors.push(req.body.investors);
    await existingproject.save();
    await investor.save();
    res.json({ success: true, investor, existingproject }); // Success
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
exports.editAssignShare = async (req, res) => {
  try {
    const investorId = req.params.investorId; // Getting investor id from URL parameter
    req.body.projects = {
      project: req.body._id,
      shares: req.body.shares,
    };
    req.body.investors = {
      investor: investorId,
      shares: req.body.shares,
    };
    let existingproject = await Projects.findById(req.body.projects.project);
    let test = existingproject.investors.filter((_) => {
      return _.investor == investorId;
    });
    req.body.remaining_shares =
      existingproject.remaining_shares + test[0].shares - req.body.shares;
    const investor = await Investors.findOneAndUpdate(
      { _id: investorId, "projects.project": req.body._id },
      { $set: { "projects.$.shares": req.body.shares } },
      {
        new: true,
      }
    ); // update the investor
    const project = await Projects.findOneAndUpdate(
      { _id: req.body._id, "investors.investor": investorId },
      {
        $set: { "investors.$.shares": req.body.shares },
        remaining_shares: req.body.remaining_shares,
      },

      {
        new: true,
      }
    );
    res.json({ success: true, investor, project }); // Success
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
exports.deleteShare = async (req, res) => {
  try {
    const investorId = req.params.investorId; // Getting investor id from URL parameter
    let existingproject = await Projects.findById(req.body.project._id);
    existingproject.remaining_shares =
      existingproject.remaining_shares + req.body.shares;
    existingproject = await Projects.findByIdAndUpdate(req.body.project._id, {
      $pull: { investors: { investor: investorId } },
      remaining_shares: existingproject.remaining_shares,
    });
    const investor = await Investors.findByIdAndUpdate(investorId, {
      $pull: { projects: { project: req.body.project._id } },
    });
    res.json({ success: true, investor, existingproject }); // Success
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
