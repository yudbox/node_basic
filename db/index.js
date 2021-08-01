//Это программа для для подключения к БД 
const Sequelize = require('sequelize')

const seq = new Sequelize('tableName', 'userName', 'password', {
    dialect: 'mysql',
    host: 'localhost'
})

const images = require('./images')(seq)

module.exports = {
    seq,
    images,

}