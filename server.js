const express = require("express");
const path = require("path");
const app = express();

app.set('view engine', 'ejs')

const PORT = 3000;

// функция которая с помощью модуля path собирае роут
const createPath = (page) => path.resolve(__dirname, "ejs-views", `${page}.ejs`);

app.listen(PORT, (error) => {
  error ? console.log(error) : console.log(`server start at port ${PORT}`);
});

app.get("/", (req, res) => {
//   res.send("Hello world");
const title = 'home'
res.render(createPath('index'), {title})
});

app.get("/contacts", (req, res) => {
  const title = 'contacts'
  const contacts = [
    {name: 'youtube', link: 'https://youtube.com'},
    {name: 'github', link: 'https://github.com'},
    {name: 'facebook', link: 'https://facebook.com'},
  ]
res.render(createPath('contacts'), {contacts, title})
});

app.get("/posts/:id", (req, res) => {
  const title = 'post'
  res.render(createPath('post'), {title})
});

app.get("/posts", (req, res) => {
  const title = 'posts'
res.render(createPath('posts'), {title})
});

app.get("/add-post", (req, res) => {
  const title = 'Add post'
res.render(createPath('add-post'), {title})
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
