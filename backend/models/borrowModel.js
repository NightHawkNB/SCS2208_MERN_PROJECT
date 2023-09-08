const mongoose = require('mongoose')
const Schema = mongoose.Schema

const borrowSchema = new Schema({
    book_id: {
        type: String,
        required: true
    },
    user_id:{
        type: String,
        required: true
    },
    borrow_date: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Borrow', borrowSchema)