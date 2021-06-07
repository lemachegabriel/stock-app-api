const express = require('express');
const authcontorller = require('./controllers/authcontorller');
const routes = express.Router();

routes.post('/register', authcontorller.store);
routes.post('/auth', authcontorller.auth)
routes.get('/index', authcontorller.index)

module.exports = routes;