const mongoose = require('mongoose');
const Product = require('../models/Product');

// All Workout
const getProducts = async (req,res) => {
    // const {title, load, reps } = req.body;
    try {
        const product = await Product.find({});
        res.status(200).json(product);
    } catch(error) {
        res.status(400).json({error: error.message});
    }
}

// search products
const searchProducts = async (req,res) => {
    try{
        const query = {};
        filterData = req.body;
        console.log(filterData);
        for(let key in filterData){
            if(filterData[key].length){
                switch(key){
                    case 'categories': query.category = filterData[key];
                                    break;
                    case 'brands': query.brand = filterData[key];
                                    break;
                    default:break;
                }
            }
        }
        const product = await Product.find(query);
        res.status(200).json(product);
    } catch(error) {
        res.status(400).json({error: error.message});
    }
}

// Get single Product
const getProduct = async (req,res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error:'No such workouts'});
    }
    const product = await Product.findById(id);
    if(!product){
        return res.status(404).json({error:'No such workouts1'});
    }
    res.status(200).json(product);
}

// create Workout
const createProduct = async (req,res) => {
    const {name,unit,mrp, sellingPrice, purchaseRate, brand, category, quantity, stock, barcode} = req.body;
    try {
        const product = await Product.create({name,unit,mrp, sellingPrice, purchaseRate, brand, category, quantity});
        res.status(200).json(product);
    } catch(error) {
        res.status(400).json({error: error.message});
    }
}

// delete single product
const deleteProduct = async (req,res) => {
    const {id} = req.params;
    console.log(req);
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error:'No such Product'});
    }
    const product = await Product.findOneAndDelete({_id:id})
    if(!product){
        return res.status(404).json({error:'No such Product'});
    }
    res.status(200).json(product);
}

//update single Product
const updateProduct = async (req,res) => {
    const {id} = req.params;
    console.log('333');
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error:'No such Product'});
    }
    const product = await Product.findOneAndUpdate({_id:id},{...req.body});
    if(!product){
        return res.status(400).json({error:'No such Product'});
    }
    res.status(200).json(product);
}

module.exports = {
    createProduct,
    getProducts,
    searchProducts,
    getProduct,
    deleteProduct,
    updateProduct
}