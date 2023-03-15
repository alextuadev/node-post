const express = require("express");
const imagePostController = require("../controllers/imagePostController");
const authMiddleware = require("../middlewares/authMiddleware");
const uploadMiddleware = require("../middlewares/uploadMiddleware");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  uploadMiddleware.single("image"),
  imagePostController.createImagePost
);
router.get("/post/:postId", imagePostController.getImagesByPostId);
router.delete("/:id", authMiddleware, imagePostController.deleteImagePost);

module.exports = router;
