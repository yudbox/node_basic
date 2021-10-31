const Post = require('../models/post')
const createPath = require('../helpers/create-path')

const handleError = (res, err) => {
  console.log('111111111111111111111111111111111 ___err', err);
  res.status(500).send(err)
}

const getPost = (req, res) => {
    Post.findById(req.params.id)
    .then( post => res.status(200).json(post))
    .catch(err=> handleError(res, err))
}
const deletePost = ( req, res) => {
    Post.findByIdAndDelete(req.params.id)
    .then( post => res.status(200).json(req.params.id))
    .catch(err=> handleError(res, err))
}

const getPosts = ( req, res) => {
    Post.find()
    .sort({createdAt: -1})
    .then( posts => res.status(200).json(posts))
    .catch(err=> handleError(res, err))
}

const editPost = ( req, res ) => {
    const {title, author, text} = req.body
    const { id } = req.params
    Post
    .findByIdAndUpdate(id, { title, author, text }, {new: true})
    .then( post => res.status(200).json(post))
    .catch(err=> handleError(res, err))
}



const addPost = ( req, res ) => {
    const {title, author, text} = req.body
    const post = new Post({ title, author, text })
  
    post
    .save()
    .then( post => res.status(200).json(post))
    .catch(err=> handleError(res, err))
    // const post = {
    //   id: new Date(),
    //   date: (new Date()).toLocaleDateString(),
    //   title,
    //   author,
    //   text
    // } 
}





// const getEditPost = ( req, res) => {
//     const title = 'Edit post'
  
//     Post.findById(req.params.id)
//     .then(post=> {
//       res.render(createPath('edit-post'), {title, post})
//     })
//     .catch(err=> handleError(res, err))
// }


// const getAddPost = ( req, res ) => {
//     const title = 'Add post'
//   res.render(createPath('add-post'), {title})
// }


module.exports = {
    getPost, 
    deletePost, 
    getPosts, 
    editPost, 
    addPost,
    // getAddPost, 
    // getEditPost, 
}