const express = require("express");
const router = express.Router()

const { getPost, 
        deletePost, 
        getPosts, 
        editPost,
        addPost,
        getEditPost, 
        getAddPost,
    } = require('../controllers/api-post-controller')

// Get All Posts
router.get("/api/posts", getPosts);

// Add New Post
router.post("/api/post", addPost);

//Get Post by Id
router.get("/api/posts/:id", getPost);

// Delete Post by Id 
router.delete("/api/posts/:id", deletePost);

// Update post by Id
router.put("api/post/:id", editPost);
  


// router.get("/add-post", getAddPost);
// router.get("/edit/:id", getEditPost)
  

  module.exports = router