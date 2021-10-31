const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const contactsSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },

})

// оздаем модель у которой первый аргумент это имя модели, второй имя схемы


const Contacts = mongoose.model('Contacts', contactsSchema)

module.exports = Contacts