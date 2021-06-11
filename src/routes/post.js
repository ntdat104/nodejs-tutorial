const express = require("express");
const { getAllPosts, getPost, createPost, deletePost, updatePost } = require("../controllers/post");

const router = express.Router();

//TODO get all POSTS
router.get("/", getAllPosts);

//TODO get 1 post
router.get("/:id", getPost);

//TODO createPost
router.post("/", createPost);

//TODO deletePost
router.delete("/:id", deletePost);

//TODO updatePost
router.patch("/:id", updatePost);

module.exports = router;
