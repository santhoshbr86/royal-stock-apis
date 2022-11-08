const express = require('express');
const router = express.Router();
const Workout = require('../models/Workout');
const productController = require('../controllers/productController');

router.post('/', productController.createProduct);

// router.get('/:id', workoutController.getWorkout);

router.get('/', productController.getProducts);
router.post('/search', productController.searchProducts);
router.delete('/:id', productController.deleteProduct); 
router.put('/:id', productController.updateProduct);

module.exports = router;
