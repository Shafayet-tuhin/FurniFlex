const express = require('express');
const { postPayment, getPayment } = require('../Controller/paymentController');
const router = express.Router() ;

router.get('/' , getPayment)
router.post('/' , postPayment)

module.exports = router;