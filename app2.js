const http = require('http')
const fs = require('fs')
const path = require('path')
const db = require('./db')
const imagesDb = db.images
const staticFolder = `${__dirname}/static`

/*
* SERVER
*/

http.createServer((request, response) => {
    const uploadStr = /\/uploads\/[^\/+$]/

    console.log('111111111111_____ request.url', request.url);


    if (request.method === 'GET') {

        if (request.url === '/') {
            sendResp('index.html', 'text/html', response)
        } else {
            sendResp(request.url, getContentType(request.url), response)
        }




    } else if (request.method === 'POST') {
        console.log('request.url', request.url);
        console.log('uploadStr.test(request.url)', uploadStr.test(request.url));
        if (uploadStr.test(request.url)) {
            saveUploadFile(request, response)
        }

        if (request.url === '/form/save') {
            let body = ''
            request.on('data', chunk => {
                body += chunk.toString()
            })
            request.on('end', () => {
                console.log('resp_body', body);
                writeToDb(body, response)
            })
        }

    }



}).listen(3000, (error) => {
    error ? console.log('error', error) : console.log('server started at port 3000');
})

/*
* ОТПРАВКА РЕСУРСОВ
*/

const sendResp = (url, contentType, res) => {
    const file = path.join(staticFolder + '/', url)
    // console.log('file', file);
    fs.readFile(file, (err, content) => {
        if (err) {
            console.log('111111____ sendResp error: ', err);
            res.writeHead(404)
            res.write('text to browser window')
            return res.end()
        }
        console.log('res success file: ', file);
        res.writeHead(200, { 'Content-Type': contentType })
        res.write(content)
        res.end()
    })
}

/*
* ОПРЕДЕЛЯЕМ ТИП КОНТЕНТА
*/

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
            return 'application/octet-stream';
            ;
    }
}

/*
* СОХРАНЯЕМ ФАЙЛЫ
*/

const saveUploadFile = (req, res) => {
    req.setEncoding('binary')
    
    const fileName = path.basename(req.url)

    let file = ''
    req.on('data', chunk => {
        file += chunk
    })
    req.on('end', () => {
        fs.writeFile(`${staticFolder}/images/${fileName}`, file, {encoding: 'binary'}, err=> {
            if(err) {
                console.log('write_err', err)
               return res.end('cannot save image')
            }
            res.end(fileName)
          });
    })
}

const writeToDb = (data, response) => {
    data = JSON.parse(data)
    console.log('writeToDb_____ data', data);
    imagesDb.create({
        image_name: data['input-1'],
        file_name: data['input-2'],
        user_name: data['input-3'],
    }).then(result=> {
        console.log('create_result', result);
        response.end('saved to DB')
    }).catch(err=> {
        console.log('save_err', err);
        response.end('cannot save')
    })

}
