// чтение и запись файлов и паппок
// если указать путь без ./ то файл будет искаться в node_modules
// а так node ищет файл в той же папке ./man.json

const fs = require('fs')
const path = require('path')
const someMan = require('./man.json')
const csvPar = require('csv-parser')
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

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
`

const man = {
    name: 'Alex',
    surname: 'Frenk',
    age: 25,
    status: 'maried'
}


// все функции в node асинхронные. Сначала выполнится code after reaading
// потом результат чтения

/*
* CASE 1 читаем файл text1.txt
*/

fs.readFile('text1.txt', 'utf-8', (err, readingData)=>{
    // console.log('readingData: ', readingData);
})

/*
* CASE 2 читаем папку poems
*/

//читаем папку. Возвращается массив

fs.readdir('poems', (err, readData)=> {
    // console.log('readData', readData);

    // readData.forEach(file => {
    //     console.log('file extname', path.extname(file));
    //     fs.stat('poems' + '/' + file, (err, data)=> {
    //         console.log('file err', err);
    //         console.log('file data', data.size);
    //     })
        
    // });
})

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

// fs.writeFile('man.json', JSON.stringify(man), err => {
//     if(err) console.log('write err', err);
// })

/*
* CASE 5 подключаем внешний файл someMan
*/
// console.log('someMan', someMan);

/*
* CASE 6 читаем csv файл coma separate value
* для этого устанавливаем npm i csv-parser
*/

const CSVresults = [];

fs.createReadStream('analyze.csv')
  .pipe(csvPar())
  .on('data', (data) => CSVresults.push(data))
  .on('end', () => {
    console.log(CSVresults);
  });

console.log('code after reaading');

/*
* CASE 7 записываем yновый csv файл 
* для этого устанавливаем npm i csv-writer
*/

//7.1 создаем поля таблицы id это название title это отображение в таблице

const csvWriter = createCsvWriter({
    path: 'humans.csv',
    header: [
        {id: 'name', title: 'NAME'},
        {id: 'lang', title: 'LANGUAGE'},
        {id: 'age', title: 'AG'},
    ]
});
// 7.2 создаем данные для заполнения полей, свойства должный соответствовать id при создании

const records = [
    {name: 'Bob',  lang: 'French, English', age: 25},
    {name: 'Mary', lang: 'English', age: 15},
    {name: 'Sam', age: 15}
];
 
// 7.3 записываем данные в таблицу
csvWriter.writeRecords(records)       // returns a promise
    .then(() => {
        console.log('...Done');
    }).catch(err=>{
        console.log('err', err);
    });