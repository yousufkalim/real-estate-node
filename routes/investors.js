/**
 * Investor CRUD routes
 * @author Shuja Naqvi
 */
const router = require("express").Router();
const investors = require("../controllers/investors");
const {
  validateInvestor,
  validateInvestorUpdate,
  isValidated,
} = require("../middleware/validators");
/**
 * ////////////////////////// Routes /////////////////////////
 * @method post Investor signup
 * @method get get all Investor
 * @method get get Investor by id
 * @method put update Investor
 * @method delete delete Investor
 */

// Create - Investor Signup
router.post("/", validateInvestor, isValidated, investors.create);
// Read
router.get("/", investors.getAll); // Get all investor at once
router.get("/:investorId", investors.getById); // Get one investor by it's id
// Update
router.put(
  "/:investorId",
  validateInvestorUpdate,
  isValidated,
  investors.update
); // Update a specific investor by it's id
//Assign share to investor
router.put("/shares/:investorId", investors.assignShare);
// Delete
router.delete("/:investorId", investors.delete); // delete a investor user by it's id

// Export
module.exports = router;
