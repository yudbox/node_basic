const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

// создали сервер и роутинг

const server = http.createServer((req, res) => {
  console.log('Server request');

// поумолчанию Content-Type это HTML страница
  res.setHeader('Content-Type', 'text/html');

  // функция которая с помощью модуля path собирае роут
  const createPath = (page) => path.resolve(__dirname, 'views', `${page}.html`);
  let basePath = '';

  // в зависимости от req.url создаем нужный роут и записваем его в basePath

  switch(req.url) {
    case '/':
    case '/home':
    case '/index.html':
      basePath = createPath('index');
      res.statusCode = 200;
      break;
    case '/about-us':
      res.statusCode = 301;
      // с помощью setHeader производим редирект на /contacts
      res.setHeader('Location', '/contacts');
      res.end();
      break;
    case '/contacts':
      basePath = createPath('contacts');
      res.statusCode = 200;
      break;
    default:
      basePath = createPath('error');
      res.statusCode = 404;
      break;
  }

  // читаем HTML файл по роуту basePath  отдаем его на фронт через 
  //     res.write(data);   res.end();

  fs.readFile(basePath, (err, data) => {
    if (err) {
      console.log(err);
      res.statusCode = 500;
      res.end();
    } else {
      res.write(data);
      res.end();
    }
  });
});


//запуск сервера на 3000 порту

server.listen(PORT, 'localhost', (error) => {
  error ? console.log(error) : console.log(`listening port ${PORT}`);
});
