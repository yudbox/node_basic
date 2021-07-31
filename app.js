const http = require('http')
const fs = require('fs')
const path = require('path')

http.createServer((request, response) => {
    console.log('request.referer', request.referer);
    console.log('request.method', request.method);
    if (request.method === 'GET') {

        // const baseURL = 'https://' + request.headers.host + '/';
        // const reqUrl = new URL(request.url, baseURL);
        // console.log('request.url', request.url);
        // console.log('reqUrl', reqUrl);
        // console.log('searchParams', reqUrl.searchParams.get('test'));

        if(request.url === '/') {
            sendResp('index.html', 'text/html', response)
        } else {
            sendResp(request.url, getContentType(request.url), response)

        }
        



    } else if(request.method === 'POST') {}


  
}).listen(3000, () => {
    console.log('server started at port 3000');
})

const sendResp = (url, contentType, res) => {
   const file = path.join(`${__dirname}/static/`, url) 
   console.log('file', file);
   fs.readFile(file, (err, content) => {
       if(err) {
           console.log('error file: ',file);
           res.writeHead(404)
           res.write('text to browser window')
         return res.end()
       }
       console.log('res success file: ',file);
       res.writeHead(200, {'Content-Type': contentType})
       res.write(content)
       res.end()
   })
}

const getContentType = (url) => {
    switch (path.extname(url)) {
        case '.html':
        return 'text/html';
    
        case '.css':
        return 'text/css';
    
        case '.js':
        return 'text/javascript';

        case '.json':
        return 'application/json';
            
        case '.ico':
        return 'image/x-icon';
            
        default:
            return 'application/octate-stream';
            ;
    }
}