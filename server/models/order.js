const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productType: { type: String },
    quantity: { type: Number, default: 0 },
    washing: { type: Boolean, default: false },
    ironing: { type: Boolean, default: false },
    drywash: { type: Boolean, default: false },
    chemicalwash: { type: Boolean, default: false },
  })
  
const orderSchema = new mongoose.Schema({
    status: {type: String},
    products: {type: [productSchema]},
    totalPrice : {type: Number, default:0},
    totalQuantity : {type: Number, default:0},
    user: {type: mongoose.Types.ObjectId ,ref:'User'},
})

const Order = mongoose.model('Order',orderSchema)

module.exports = Order;