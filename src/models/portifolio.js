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
    money:{
        type:Number,
        default:1000
    },
    portfolio:[Stocks]
})

mongoose.model("Portfolio", Portfolio)