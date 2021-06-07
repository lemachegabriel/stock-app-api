require("dotenv").config();


const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors())

const uri = "mongodb+srv://gabriel:KYrLeF3DvS98Z4V@login.xxdka.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

mongoose.connect(uri || "mongodb://localhost/data", {useUnifiedTopology:true, useNewUrlParser:true, autoIndex:false}).then(() => {
    console.log("sucsess");
}).catch((err) => {
    console.log("error:"+err)
})
require('./models/user')


app.use('/api', require('./routes'))



app.listen(process.env.Port || 3000);
