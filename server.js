const express = require("express");
const path = require("path");
const app = express();

const PORT = 3000;

// функция которая с помощью модуля path собирае роут
const createPath = (page) => path.resolve(__dirname, "views", `${page}.html`);

app.listen(PORT, (error) => {
  error ? console.log(error) : console.log(`server start at port ${PORT}`);
});

app.get("/", (req, res) => {
//   res.send("Hello world");
res.sendFile(createPath('index'))
});

app.get("/contacts", (req, res) => {
res.sendFile(createPath('contacts'))
});

app.get("/about-us", (req, res) => {
res.redirect('/contacts')
});

/*app.use это мидлвар который применяется ко всем роутам 
* перед выполнением основного колбека
*/

app.use('',(req, res) => {
res
.status(404)
.sendFile(createPath('error'))
});
