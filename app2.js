const http = require('http')

const PORT = 3000;

http.createServer((req, res)=> {
    console.log('req.url, req.method', req.url, req.method);
    
    res.setHeader('Content-type', 'text/html')
    
    res.write('<h1>hello world</h1>')
    res.write('<p>hello my name is...</p>')
    res.end()





}).listen(PORT, 'localhost', error => {
    error ? console.log('error', error) : console.log(`server started at port ${PORT}`);;
})