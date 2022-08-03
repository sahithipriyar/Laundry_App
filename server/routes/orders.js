const express = require('express');
const bodyParser = require('body-parser')
const Order = require('../models/order');
const router = express.Router()

router.use(bodyParser());

router.get("/orders", async (req, res) => {
    try{
        const orders = await Order.find({user: req.user});
        //console.log(orders[0].products);
        res.status(200).json({
        status: "success",
        orders
    })
    }  catch (e) {
        return res.status(500).json({
            status: "Failed",
            message: e.message
        })
    }
    
})

router.put("/orders/:orderId", async (req, res) => {
    try {
        const order = await Order.updateOne({_id: req.params.orderId, user: req.user},  {status: "Cancelled"})
        return res.status(200).json({
            status: "Success",
            order
        })
        

    } catch (e) {
        return res.status(500).json({
            status: "Failed",
            message: e.message
        })
    }
})

router.get("/orders/:orderId", async (req, res) => {
    try {
        const order = await Order.findOne({_id: req.params.orderId, user: req.user})
        return res.status(200).json({
            status: "Success",
            order
        })
        

    } catch (e) {
        return res.status(500).json({
            status: "Failed",
            message: e.message
        })
    }
})

router.post("/orders", async (req, res) => {
    try{
    const order = await Order.create({
        user: req.user,
        status : req.body.status,
        products : req.body.products,
        totalPrice: req.body.totalPrice,
        totalQuantity: req.body.totalQuantity
    })
    //console.log(order);
    return res.status(200).json({
        status: "Order is created",
        data : order
    })
    }   catch(e) {
        return res.status(500).json({
            status: "Failed",
            message: e.message
        })
    }
})
module.exports = router