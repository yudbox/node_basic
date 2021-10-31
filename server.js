const express = require("express");
const path = require("path");
const morgan = require('morgan')
const app = express();
const mongoose = require('mongoose')
const Post = require('./models/post') 
const Contacts = require('./models/contacts') 

const db = 'mongodb+srv://yudbox-node-blog:mongo123456@cluster0.e5cpm.mongodb.net/nodeBlog?retryWrites=true&w=majority'

mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true}).then(()=> {
  console.log('connected to the Mongo');
}).catch(error=> console.log('mongo connection error', error));

app.set('view engine', 'ejs')

const PORT = 3000;

// функция которая с помощью модуля path собирае роут
const createPath = (page) => path.resolve(__dirname, "ejs-views", `${page}.ejs`);

app.listen(PORT, (error) => {
  error ? console.log(error) : console.log(`server start at port ${PORT}`);
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

app.use(express.static('styles'));

app.use(express.urlencoded({extended: false}))

app.get("/", (req, res) => {
//   res.send("Hello world");
const title = 'home'
res.render(createPath('index'), {title})
});

app.get("/contacts", (req, res) => {
  const title = 'contacts'
  Contacts.find()
    .then( contacts => res.render(createPath('contacts'), {contacts, title}))
    .catch(err=> {
      console.log('1111111111111111111111111111111111');
      console.log('post save error', err );
      res.render(createPath('error'), {title: 'Error'})
    })

});

app.get("/posts/:id", (req, res) => {
  const title = 'post'
  Post.findById(req.params.id)
  .then( post => res.render(createPath('post'), {title, post}))
  .catch(err=> {
    console.log('111111111111111111111111111111111');
    console.log('post save error', err );
    res.render(createPath('error'), {title: 'Error'})
  })
});

app.get("/posts", (req, res) => {
  const title = 'posts'
  Post.find()
  .sort({createdAt: -1})
  .then( posts => res.render(createPath('posts'), {title, posts}))
  .catch(err=> {
    console.log('1111111111111111111111111111111111');
    console.log('post save error', err );
    res.render(createPath('error'), {title: 'Error'})
  })
});

app.get("/add-post", (req, res) => {
  const title = 'Add post'
res.render(createPath('add-post'), {title})
});

app.post("/add-post", (req, res) => {
  const {title, author, text} = req.body

  const post = new Post({ title, author, text })

  post.save().then(result=> res.redirect('/posts'))
  .catch(err=> {
    console.log('1111111111111111111111111111111111');
    console.log('post save error', err );
    res.render(createPath('error'), {title: 'Error'})
  })
  // const post = {
  //   id: new Date(),
  //   date: (new Date()).toLocaleDateString(),
  //   title,
  //   author,
  //   text
  // }

res.render(createPath('post'), {post, title})
});

app.get("/about-us", (req, res) => {
res.redirect('/contacts')
});

/*app.use это мидлвар который применяется ко всем роутам 
* перед выполнением основного колбека
* его нужно ставить после всех роутов иначе он будет срабатывать раньше
*/

app.use('',(req, res) => {
  const title = 'Error page'
res
.status(404)
.render(createPath('error'), {title})
});
