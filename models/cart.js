const mongoose = require('mongoose');

const schema = mongoose.Schema;
const CartSchema = new schema (
    {
        productId: {
          type: String,
          default: true
        },
        quantity: {
          type: Number,
          default: true
        },
        name: {
          type: String,
          default: true
        },
        price: {
          type: Number,
          default: true
        },
        active: {
        type: Boolean,
        default: true
        },
         modifiedOn: {
          type: Date,
          default: Date.now
      }
    },
    { timestamps: true }
  );
  
  module.exports = mongoose.model("Cart", CartSchema);
  