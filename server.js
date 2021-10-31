const express = require("express");
const morgan = require('morgan')
const app = express();
const mongoose = require('mongoose') 
const methodOverride = require('method-override')
const postRoutes = require('./routes/post-routes')
const postApiRoutes = require('./routes/api-post-routes')
const contactsRoutes = require('./routes/contacts-routes')
const createPath = require('./helpers/create-path')

const db = 'mongodb+srv://yudbox-node-blog:mongo123456@cluster0.e5cpm.mongodb.net/nodeBlog?retryWrites=true&w=majority'

mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true}).then(()=> {
  console.log('connected to the Mongo');
}).catch(error=> console.log('mongo connection error', error));

app.set('view engine', 'ejs')

const PORT = 3000;



app.listen(PORT, (error) => {
  error ? console.log(error) : console.log(`server start at port ${PORT}`);
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

app.use(express.static('styles'));

app.use(express.urlencoded({extended: false}))

app.use(methodOverride('_method'))

app.use(postRoutes)
app.use(postApiRoutes)
app.use(contactsRoutes)

app.get("/", (req, res) => {
//   res.send("Hello world");
const title = 'home'
res.render(createPath('index'), {title})
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
