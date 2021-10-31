const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const postSchema = new Schema({
    text: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
}, {timestamps: true})

// оздаем модель у которой первый аргумент это имя модели, второй имя схемы


const Post = mongoose.model('Post', postSchema)

module.exports = Post