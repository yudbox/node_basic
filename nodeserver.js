const http = require('http')

http.createServer((request, response) => {
    console.log('server started at port 3000');
    console.log('request', request.referer);
    console.log('request.method', request.method);
    if (request.method === 'GET') {

        const baseURL = 'http://' + request.headers.host + '/';
        const reqUrl = new URL(request.url, baseURL);
        console.log('reqUrl', reqUrl);
        console.log('searchParams', reqUrl.searchParams.get('test'));
        // let reqParams = url.parse(request.url, true)

        switch(reqUrl.pathname) {
            case '/':
                homepage(request, response)
            break;
            case '/about':
                about(request, response)
            break;

            default:
                page404(request, response)
                break; 
        }

    } else if(request.method === 'POST') {

        switch(reqUrl.pathname) {

            case '/about':
                about2(request, response)
            break;

            default:
                page404(request, response)
                break; 
        }

        page404(request, response)




        // let body = ''
        // request.on('data', chunk => {
        //     console.log('chunk', chunk);
        //     body +=chunk.toString()
        // })
        // request.on('end', () => {
        //     let params = parse(body)
        //     console.log('params', params);
        //     console.log('params.id', params.id);
        //     response.end('Everything ok POST')
        // })
        
    }


  
}).listen(3000)

const homepage = (request, response) => {
    response.end("homepage")
}
const about = (request, response) => {
    response.end("about")
}

const about2 = (request, response) => {
    response.end("about_POST")
}
const page404 = (request, response) => {
    response.end("page404")
}