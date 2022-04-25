/**
 * Project CRUD controllers
 * @author Shuja Naqvi
 */
const Investors = require("../models/Investors");
const Projects = require("../models/Projects");

/**
 * Project - Create
 * @param {object} req
 * @param {object} res
 */
exports.create = async (req, res) => {
  try {
    if (!req.body.total_shares) {
      req.body.total_shares = 100;
    }
    req.body.unit_share = req.body.total_cost / req.body.total_shares;
    const project = await Projects.create(req.body);
    res.json({ success: true, project }); // Success
    // Done
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * Get all Projects
 * @param {object} req
 * @param {object} res
 */
exports.getAll = async (req, res) => {
  try {
    const projects = await Projects.find(); // Finding all the Projects from db
    res.json({ success: true, projects }); // Success
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * Get project by id
 * @param {object} req
 * @param {object} res
 */
exports.getById = async (req, res) => {
  try {
    const projectId = req.params.projectId; // Getting project Id  from URL parameter
    const project = await Projects.findById(projectId); // Finding project by id
    res.json({ success: true, project }); // Success
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * Delete project
 * @param {object} req
 * @param {object} res
 */
exports.delete = async (req, res) => {
  try {
    const projectId = req.params.projectId; // Getting project Id  from URL parameter
    const projects = await Projects.findByIdAndDelete(projectId); // Deleting the investor
    res.json({ success: true, projects }); // Success
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
