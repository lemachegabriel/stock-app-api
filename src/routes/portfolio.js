const express = require('express');
const portfolioController = require('../controllers/portfoliocontroller')
const router = express.Router();

router.post('/sell', portfolioController.sell)
router.post('/create', portfolioController.create);
router.post('/buy', portfolioController.buy)
router.get('/user', portfolioController.userStocks)
router.post('/update', portfolioController.updatePortfolio)

module.exports = router; 