const express = require('express');
const portfolioController = require('../controllers/portfoliocontroller')
const router = express.Router();

//router.get('/index', portfolioController.index);
router.post('/create', portfolioController.create);
router.post('/update', portfolioController.update)
router.post('/user', portfolioController.userStocks)

module.exports = router; 