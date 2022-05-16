/**
 * News CRUD routes
 * @author Shuja Naqvi
 */
const router = require("express").Router();
const news = require("../controllers/news");
const { upload } = require("../middleware/multer");
/**
 * ////////////////////////// Routes /////////////////////////
 * @method post Create-news
 * @method get get all news
 * @method get get news by id
 * @method put update news
 * @method delete delete news
 */

// Create - news Signup
router.post("/", upload.array("files"), news.create);
// Read
router.get("/", news.getAll); // Get all newss at once
router.get("/:newsId", news.getById); // Get one news by it's id
// Delete
router.delete("/:newsId", news.delete); // delete a news by it's id
//update news
router.put("/update", upload.array("images"), news.update);

// Export
module.exports = router;
