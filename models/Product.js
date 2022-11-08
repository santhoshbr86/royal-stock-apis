const mongoose = require('mongoose');

const schema = mongoose.Schema;

const ProductSchema = new schema ({
    name:{
        type:String,
        require:true
    },
    unit: {
        type:String,
        require:true
    },
    mrp: {
        type:Number,
        require:true
    },
    sellingPrice: {
        type:Number,
        require:true
    },
    purchaseRate: {
        type:Number,
        require:true
    },
    brand: {
        type:String,
        require:true
    },
    category: {
        type:String,
        require:true
    },
    quantity: {
        type:Number,
        require:true
    },
    stock: {
        type:Number,
        require:true
    },
    barcode: {
        type:String,
        require:true
    }
}, { timestamps: true});

module.exports =  mongoose.model('Product', ProductSchema);
