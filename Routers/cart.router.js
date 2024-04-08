const express = require('express');
const cartRouter = express.Router();


const { findUserCart, addProductToCart, removeProductFromCart } = require('../Controllers/Cart.controller');

cartRouter.get('/', findUserCart);
cartRouter.post('/add', addProductToCart);
cartRouter.post('/remove/:productId', removeProductFromCart);

module.exports = cartRouter;