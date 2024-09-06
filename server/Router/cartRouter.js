const express = require('express');
const { createCart, getCartItems, updateQuantity, deleteCartItem, clearCartAfterCheckout } = require('../Controller/cartController');
const router = express.Router() ;


router.delete('/all', clearCartAfterCheckout);
router.get('/' , getCartItems)
router.post('/', createCart)
router.patch('/:id', updateQuantity)
router.delete('/:id', deleteCartItem)


module.exports = router; 