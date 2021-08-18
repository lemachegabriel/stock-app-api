const express = require('express');
const stockController = require('../controllers/stockscontroller')
const router = express.Router();

router.get('/stock', stockController.index);
router.get('/show/:id', stockController.show);
router.post('/stock', stockController.store); 
router.put('/stock/:id', stockController.update);
router.post('/stock/:id', stockController.destroy);

module.exports = router;