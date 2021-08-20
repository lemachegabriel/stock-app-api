const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Stocks = new Schema({
    ticker:{
        type: String,
        required: true
    },
    open:{
        type: Number,
        required: true
    },
    close:{
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

mongoose.model("stocks_information", Stocks)
 