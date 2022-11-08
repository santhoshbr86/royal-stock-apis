const express = require('express');
const cartController = require('../controllers/cartController')
const router = express.Router();

router.post('/', cartController.addToCart);
router.get('/', cartController.getCart);
router.delete('/:id', cartController.deleteCartItem);
router.put('/:id', cartController.updateCart);
module.exports = router;