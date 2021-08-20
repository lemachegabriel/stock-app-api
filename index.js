require("dotenv").config();
const axios = require('axios')

const express = require('express');
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors');

const app = express();


const getData = async () => {
    const header1 = {'User-Agent' : "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246"}
    let quote = 'B3SA3.SA'
    let range = '1D'
    let interval = '1d'

    url = `https://query1.finance.yahoo.com/v8/finance/chart/${quote}?region=US&lang=en-US&includePrePost=false&interval=${interval}&useYfid=true&range=${range}&corsDomain=finance.yahoo.com&.tsrc=finance`
    req = await axios.get(url, {headers : header1} ).then((res) => {
        console.log(res.data['chart']['result'][0]['indicators']['quote'])
    }).catch((err) => {
        console.log(err)
    })
    

}

app.use(cors({origin: process.env.APP_URL, credentials: true}))
app.use(cookieParser())

mongoose.connect(process.env.MONGO_URI || "mongodb://localhost/data", {useUnifiedTopology:true, useNewUrlParser:true, autoIndex:false}).then(() => {
    console.log("sucsess");
}).catch((err) => {
    console.log("error:"+err)
})
require('./src/models/user')
require('./src/models/stocks')

app.use(express.json())
app.use('/api', require('./src/routes/routes'))
app.use('/quotes', require('./src/routes/stockRoutes'))

app.get('/', (req, res) => {
    res.send('WORKKK!')
    getData()
  })
  

app.listen(process.env.PORT || 8000);
