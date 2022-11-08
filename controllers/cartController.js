const mongoose = require('mongoose');
const Cart = require('../models/cart');
const Product = require('../models/Product');

// All Workout
const getCart = async (req,res) => {
    const {title, load, reps } = req.body;
    try {
        const cart = await Cart.find({});
        res.status(200).json(cart);
    } catch(error) {
        res.status(400).json({error: error.message});
    }
}

// All Workout
const addToCart = async (req,res) => {
    const {productId, quantity} = req.body;
    console.log(productId);
    try {
        const productDetails =  await Product.findById(productId);
        console.log('21', productDetails);
        const cartItem = new Cart({
            productId:productId,
            name:productDetails.name,
            quantity:1,
            price: productDetails.sellingPrice,
            active:true
        });
        cartItem.save().then(cartItem => {
            return res.status(200).json({msg:'Product added successfully', product:cartItem});
        })
      } catch(error) {
        res.status(400).json({error: error.message});
    }
}

const deleteCartItem = async (req, res) => {
    const {id} = req.params;
     console.log(req);
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error:'No such Product'});
    }
    const item = await Cart.findOneAndDelete({_id:id})
    if(!item){
        return res.status(404).json({error:'No such Product'});
    }
    res.status(200).json(item);
};

//update single Product
const updateCart = async (req,res) => {
    const {id} = req.params;
    console.log('333', req.body);
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error:'No such Product'});
    }

    const cart = await Cart.findOneAndUpdate({_id:id},{...req.body});
    console.log(cart);
    if(!cart) {
        return res.status(400).json({error:'No such cart product'});
    }
    res.status(200).json(cart);
}

module.exports = {
    getCart,
    addToCart,
    deleteCartItem,
    updateCart
}