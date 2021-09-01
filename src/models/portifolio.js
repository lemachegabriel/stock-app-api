const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Stocks = Schema({
    ticker: {
        type : String
    },
    price: {
        type: Number,
    },
    quantity: {
        type: Number,
    },
    date:{
        type: Date,
        default: Date.now()
    }
})

const Portfolio = new Schema({
    owner:{
        type:String,
        required:true
    },
    portfolio:[Stocks]
})

mongoose.model("Portfolio", Portfolio)