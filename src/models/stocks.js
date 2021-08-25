const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Stocks = new Schema({
    ticker:{
        type: String,
        required: true
    },
    name:{
        type:String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

mongoose.model("stocks_information", Stocks)
 