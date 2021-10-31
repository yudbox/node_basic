const express = require("express");
const router = express.Router()

const { getPost, 
        deletePost, 
        getPosts, 
        getEditPost, 
        editPost,
        getAddPost,
        addPost
    } = require('../controllers/post-controller')



router.get("/posts/:id", getPost);
  
router.delete("/posts/:id", deletePost);
  
router.get("/posts", getPosts);
  
router.get("/add-post", getAddPost);
  
router.post("/add-post", addPost);

router.get("/edit/:id", getEditPost)
  
router.put("/edit/:id", editPost);

  module.exports = router