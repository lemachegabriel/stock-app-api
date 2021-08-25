require("dotenv").config();

const express = require('express');
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors');

const app = express();

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
    
  })
  

app.listen(process.env.PORT || 8000);
