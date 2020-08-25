const express = require("express");
const multer = require("multer");
const checkAuth = require("../middleware/check-auth");
const PostController = require('../controllers/posts')
const extractFile = require('../middleware/file')
const router = express.Router();


router.post(
  "",
  checkAuth,
  extractFile,
  PostController.createPost
);

router.put(
  "/:id",
  checkAuth,
 extractFile,
  PostController.updatePost
);

router.get("",PostController.getPost);

router.get("/:id",PostController.getPostById);

router.delete("/:id", checkAuth,PostController.deletePost );

module.exports = router;
