// чтение и запись файлов и паппок
// если указать путь без ./ то файл будет искаться в node_modules
// а так node ищет файл в той же папке ./man.json

const fs = require("fs");
const path = require("path");
const someMan = require("./creWriteTexts/man.json");
const csvPar = require("csv-parser");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const zlib = require("zlib");
const { pipeline } = require('stream');
const { promisify } = require('util');


const versePart = `
В томленьях грусти безнадежной,
В тревогах шумной суеты,
Звучал мне долго голос нежный
И снились милые черты.

Шли годы. Бурь порыв мятежный
Рассеял прежние мечты,
И я забыл твой голос нежный,
Твои небесные черты.

В глуши, во мраке заточенья
Тянулись тихо дни мои
Без божества, без вдохновенья,
Без слез, без жизни, без любви.
`;

const man = {
  name: "Alex",
  surname: "Frenk",
  age: 25,
  status: "maried",
};

// все функции в node асинхронные. Сначала выполнится code after reaading
// потом результат чтения

/*
 * CASE 1 читаем файл text1.txt
 * 'utf-8' это второй параметр который переводит бинарную readingData в строки
 */

fs.readFile("./creWriteTexts/text1.txt", "utf-8", (err, readingData) => {
  // console.log('readingData: ', readingData);
});

/*
 * CASE 2.1 создаем папку poems2 пишем в нее файл myPoem.txt
 */

// fs.mkdir('./poems2', ()=> {
//     console.log('create poem');
//     fs.writeFile('./poems2/myPoem.txt', 'Моя супер поема', (error)=>{
//         error && console.log('error', error);
//     })
// })

/*
 * CASE 2.2 удаляем файл myPoem.txt удаляем папку poems2
 */

// if(fs.existsSync('./poems2/myPoem.txt')) {
//     console.log('fs.existsSync1', fs.existsSync('./poems2/myPoem.txt'));
//     fs.unlink('./poems2/myPoem.txt', (err, second)=>{
//         err && console.log('unlink err',err);

// /*
// * CASE 2.3 удаляем папку poems2. С помощью rmdir папку можно удалить
// *          только если она пустая иначе выдаст ошибку поэтому сначала
// *          удаляем  файл выше
// */

//         if (fs.existsSync('./poems2')) {
//             console.log('fs.existsSync2', fs.existsSync('./poems2'));
//             fs.rmdir('./poems2', (err, second)=>{
//                 err && console.log('rmdir err',err);
//                 console.log('second2', second);
//             })
//         }
//     })
// }

/*
 * CASE 2.4 читаем папку poems
 */

//читаем папку. Возвращается массив из всех папок и файлов

// fs.readdir('poems', (err, readData)=> {
//     console.log('readData', readData);

//     readData.forEach(file => {
//         console.log('file extname', path.extname(file));
//         fs.stat('poems' + '/' + file, (err, data)=> {
//             console.log('file err', err);
//             console.log('file data', data.size);
//         })

//     });
// })

/*
 * CASE 3 записываем текст в файл
 */

// fs.writeFile('poems/text2.txt', versePart, err => {
//     if(err) console.log('write err', err);
// })

/*
 * CASE 4 записываем обект в json файл
 * при этом второй аргумент должен быть в json формате
 */

// fs.writeFile('./creWriteTexts/man.json', JSON.stringify(man), err => {
//     if(err) console.log('write err', err);
// })

/*
 * CASE 5 подключаем внешний файл config
 */
// console.log('someMan', someMan);

/*
 * CASE 6 читаем csv файл coma separate value
 * для этого устанавливаем npm i csv-parser
 */

const CSVresults = [];

// fs.createReadStream('./creWriteTexts/analyze.csv')
//   .pipe(csvPar())
//   .on('data', (data) => CSVresults.push(data))
//   .on('end', () => {
//     console.log(CSVresults);
//   });

// console.log('code after reaading');

/*
 * CASE 7 записываем yновый csv файл
 * для этого устанавливаем npm i csv-writer
 */

//7.1 создаем поля таблицы id это название title это отображение в таблице

// const csvWriter = createCsvWriter({
//     path: './creWriteTexts/humans.csv',
//     header: [
//         {id: 'name', title: 'NAME'},
//         {id: 'lang', title: 'LANGUAGE'},
//         {id: 'age', title: 'AG'},
//     ]
// });
// 7.2 создаем данные для заполнения полей, свойства должный соответствовать id при создании

const records = [
  { name: "Bob", lang: "French, English", age: 25 },
  { name: "Mary", lang: "English", age: 15 },
  { name: "Sam", age: 15 },
];

// 7.3 записываем данные в таблицу
// csvWriter.writeRecords(records)       // returns a promise
//     .then(() => {
//         console.log('...Done');
//     }).catch(err=>{
//         console.log('err', err);
//     });

/*
 * CASE 8 разбираем со стримами
 */
// 8.1. создали читающий поток и поместили в него большой файл
const readStream = fs.createReadStream("./creWriteTexts/bigFile.txt");
// 8.2. создали пишущий поток который будет записывать данные в new-bigFile.txt
//       маленькими порциями чанками
const writeStream = fs.createWriteStream("./creWriteTexts/new-bigFile.txt");
const compressedWriteStream = fs.createWriteStream("./creWriteTexts/new-bigFile.txt.gz");

const compressStream = zlib.createGzip();

// readStream.on('data', chunk => {
//     // чанки это маленькие порции на которые разбивается файл
//     console.log('=====================');
//     console.log(chunk)
//     // маленькими порциями чанками записываем в файл new-bigFile.txt
//     writeStream.write(chunk)
// })

// 8.3 Дуплексная запись это два первых метода вместе ,
//     сначала чтение одного файла и затем запись в другой файл малыми порциями

// readStream.pipe(writeStream) // выполнит тоже самое, но тут нет возможности обработать ошибку

//  при ошибке запустим функцию handleError которая:
const handleError = () => {
  console.log("some error");
  // остановит чтение файла
  readStream.destroy();
  // запишет в новый файл текст:
  writeStream("Finish with error ...");
};

// readStream
// .on("error", handleError)
// .pipe(writeStream)
// .on("error", handleError);


// 8.4. трансформирующая запись (поток можно сжимать)



// pipeline(readStream, compressStream, compressedWriteStream, (err) => {
//     if (err) {
//       console.error('An error occurred:', err);
//       handleError()
//       process.exitCode = 1;
//     }
//   });



//   const unReadStream = fs.createReadStream("./creWriteTexts/new-bigFile.txt.gz");

// const unWriteStream = fs.createWriteStream("./creWriteTexts/new-bigFile2.txt");

// const unCompressStream = zlib.createGzip();

// const { deflate, unzip } = require('zlib');

// const input = './creWriteTexts/new-bigFile.txt.gz';
// let bufferID='';
// deflate(input, (err, buffer) => {
//   if (err) {
//     console.error('An error occurred:', err);
//     process.exitCode = 1;
//   }
//   bufferID = buffer.toString('base64');
// console.log('buffer', buffer.toString('base64'));
// console.log('1111111111111111111 bufferID ', bufferID);
// });



// const buffer = Buffer.from(bufferID, 'base64');
// unzip(buffer, (err, buffer) => {
//   if (err) {
//     console.error('An error occurred:', err);
//     process.exitCode = 1;
//   }
//   console.log('1111111111111111111111111', buffer.toString());
// });


