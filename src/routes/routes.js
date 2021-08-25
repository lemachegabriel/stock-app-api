const express = require('express');
const authcontorller = require('../controllers/authcontorller');
const routes = express.Router();
const GetVar = require('../requests/HighLowData')
const stockdata = require('../requests/stockData')


routes.post('/register', authcontorller.store);
routes.post('/auth', authcontorller.auth)
routes.get('/cookiesGet', authcontorller.verifyJWT)
routes.get('/logout', authcontorller.logout)

routes.get('/data', GetVar.GetVar)
routes.get('/datav', stockdata.getData)

module.exports = routes;