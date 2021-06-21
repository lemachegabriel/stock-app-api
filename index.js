require("dotenv").config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors({origin:'localhost:3000', credentials:true}))

mongoose.connect(process.env.MONGO_URI || "mongodb://localhost/data", {useUnifiedTopology:true, useNewUrlParser:true, autoIndex:false}).then(() => {
    console.log("sucsess");
}).catch((err) => {
    console.log("error:"+err)
})
require('./src/models/user')

app.use('/api', require('./src/routes'))

app.get('/', (req, res) => {
    res.send('WORKKK!')
  })
  

app.listen(process.env.PORT || 3000);
