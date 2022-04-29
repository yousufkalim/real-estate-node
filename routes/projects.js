/**
 * Project CRUD routes
 * @author Shuja Naqvi
 */
const router = require("express").Router();
const projects = require("../controllers/projects");
const { validateProject, isValidated } = require("../middleware/validators");
const { upload } = require("../middleware/multer");
/**
 * ////////////////////////// Routes /////////////////////////
 * @method post Create-Project
 * @method get get all Project
 * @method get get Project by id
 * @method put update Project
 * @method delete delete Project
 */

// Create - Project Signup
router.post(
  "/",
  upload.single("file"),
  validateProject,
  isValidated,
  projects.create
);
// Read
router.get("/", projects.getAll); // Get all Projects at once
router.get("/:projectId", projects.getById); // Get one Project by it's id
// Delete
router.delete("/:projectId", projects.delete); // delete a Project by it's id
//create news
router.post("/news", upload.array("images"), projects.news);
//update news
router.put("/", projects.update);
// Export
module.exports = router;
