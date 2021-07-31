const mysql = require('mysql')
const mysqlTwo = require('mysql2')
const config = require('./config')

const db = mysql.createConnection({
    host: "itgid.mysql.tools",
    user: "itgid_nodetest",
    database: "itgid_nodecourse",
    password: "Al6gAi50YiB0",

})

db.connect(err=> {
    if(err) {
        console.log('err------->', err);
        return err
    }

    console.log('connected to DB');
     
})


let query="SELECT * FROM user";

db.query(query, (err, result, field) =>{
    console.log(err);
    console.log(result);
     // console.log(field);
});

db.end( err => {
    if (err) {
        console.log(err);
        return err;
    }
    else {
        console.log('Database ----- Close');
    }
});



//Последовательные запросы к БД

const main = async () => {
    const db2 = await mysqlTwo.createConnection(config)
    const [rows,fields] = await db2.execute('SELECT * FROM user WHERE id=1')
    console.log('rows', rows[0]['firstname']);


    // в этой строчке мы меняем поле firstname в таблице user где id = 2
    await db2.execute(`UPDATE user SET firstname = '${rows[0]['firstname']}' WHERE id = 2`)
    db2.end()

    return rows


}


const getResult = async () => {
    const result = await main()
    console.log(result); 
}

getResult()