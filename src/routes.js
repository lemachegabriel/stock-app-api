const express = require('express');
const authcontorller = require('./controllers/authcontorller');
const routes = express.Router();

routes.post('/register', authcontorller.store);
routes.post('/auth', authcontorller.auth)
routes.get('/cookiesGet', authcontorller.verifyJWT)

module.exports = routes;