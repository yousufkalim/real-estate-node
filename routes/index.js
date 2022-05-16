/**
 * All api routes handles here
 * @author Shuja Naqvi
 */
const router = require("express").Router();

// Parent Routes
router.use("/admins", require("./admins")); // All the admin routes
router.use("/investors", require("./investors")); // All the investors routes
router.use("/otps", require("./otps")); // All the otps routes
router.use("/news", require("./news")); // All the otps routes
router.use("/projects", require("./projects")); // All the Project routes
router.use("/auth", require("./auth")); // All the auth routes

// Export
module.exports = router;
