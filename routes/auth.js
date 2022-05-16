/**
 * User auth routes
 * @author Shuja Naqvi
 */
const router = require("express").Router();
const auth = require("../controllers/auth");
const { checkAuth } = require("../middleware/checkAuth");
const { validateLogin, isValidated } = require("../middleware/validators");

/**
 * ////////////////////////// Routes /////////////////////////
 * @method post Investor login
 * @method get check auth
 */

// Read
router.post("/login", validateLogin, isValidated, auth.login); // Get all users at once
router.get("/", checkAuth, auth.confirmAuth);

// Export
module.exports = router;
