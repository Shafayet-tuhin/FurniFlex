const express = require('express');
const { createProducts, getProducts } = require('../Controller/productController');
const router = express.Router() ;

router.get('/' , getProducts)
router.post('/' , createProducts)

module.exports = router;