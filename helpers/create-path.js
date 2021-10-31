const path = require("path");

// функция которая с помощью модуля path собирае роут
const createPath = (page) => path.resolve(__dirname, "../views", `${page}.ejs`);

module.exports = createPath