const express = require('express');
const portfolioController = require('../controllers/portfoliocontroller')
const router = express.Router();

router.get('/index', portfolioController.index);
router.post('/create', portfolioController.create);
router.put('/update/:id', portfolioController.update)
router.get('/user/:id', portfolioController.userStocks)

module.exports = router; 