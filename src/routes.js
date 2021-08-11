const express = require('express');
const authcontorller = require('./controllers/authcontorller');
const routes = express.Router();

routes.post('/register', authcontorller.store);
routes.post('/auth', authcontorller.auth)
routes.get('/cookies', authcontorller.auth_cookies)

module.exports = routes;