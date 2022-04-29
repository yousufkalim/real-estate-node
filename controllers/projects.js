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
    req.body.remaining_shares = req.body.total_shares;
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

/**
 * create  news
 * @param {object} req
 * @param {object} res
 */
exports.news = async (req, res) => {
  try {
    const { projectId, news } = req.body; // Getting project Id  from URL parameter
    const existingproject = await Projects.findById(projectId); // Updating the user
    if (req.files != undefined && req.files.length != 0) {
      const pictures = req.files.map((file) => ({
        file: file.path,
      }));
      news.pictures = pictures;
    }
    req.body.history = {
      end_date: "",
      selling_price: "",
      end_date: "",
      total_cost: "",
      total_shares: "",
      unit_share: "",
    };
    if (!existingproject) {
      return res.json({ success: false, message: "Invalid Project Id" }); // Success
    }
    if (news.news_date) {
      news.news_date = new Date(news.news_date);
    }
    if (news.new_end_date) {
      news.new_end_date = new Date(news.new_end_date);
      req.body.end_date = req.body.news.new_end_date;
      req.body.history.end_date = existingproject.end_date;
    }
    if (news.new_total_cost) {
      req.body.total_cost = news.new_total_cost;
      req.body.unit_share =
        req.body.total_cost / existingproject.total_shares.toFixed(2);
      req.body.history.total_cost = existingproject.total_cost;
    }
    if (news.new_selling_price) {
      req.body.selling_price = news.new_selling_price;
      req.body.history.selling_price = existingproject.selling_price;
      req.body.history.total_shares = existingproject.total_shares;
      req.body.history.unit_share = existingproject.unit_share;
    }
    const project = await Projects.findByIdAndUpdate(projectId, req.body, {
      new: true,
    }); // Updating the user
    res.json({ success: true, project }); // Success
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * update  Project
 * @param {object} req
 * @param {object} res
 */
exports.update = async (req, res) => {
  try {
    const { projectId } = req.body; // Getting project Id  from URL parameter
    const existingproject = await Projects.findById(projectId); // Updating the user
    req.body.history = {
      end_date: "",
      selling_price: "",
      end_date: "",
      total_cost: "",
      total_shares: "",
      unit_share: "",
    };
    if (!existingproject) {
      return res.json({ success: false, message: "Invalid Project Id" }); // Success
    }
    if (req.body.end_date) {
      req.body.history.end_date = new Date(existingproject.end_date);
    }
    if (req.body.total_cost) {
      req.body.unit_share = (
        req.body.total_cost / existingproject.total_shares
      ).toFixed(2);
      req.body.history.total_cost = existingproject.total_cost;
    }
    if (req.body.total_shares) {
      req.body.history.total_shares = existingproject.total_shares;
      req.body.history.unit_share = existingproject.unit_share;
      req.body.unit_share = (
        req.body.total_cost / req.body.total_shares
      ).toFixed(2);
    }
    if (req.body.selling_price) {
      req.body.history.selling_price = existingproject.selling_price;
    }
    const project = await Projects.findByIdAndUpdate(projectId, req.body, {
      new: true,
    }); // Updating the user
    res.json({ success: true, project }); // Success
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
