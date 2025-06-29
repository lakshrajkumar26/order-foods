const mongoose = require("mongoose");

const orderSchema =new mongoose.Schema({

    items :[{
        foodName :String,
        quantity : Number,
        price: Number,
        subtotal : Number,
    }],

    totalItems:{
        type:Number,
        default : 0,
    },
    netPrice:{
        type:Number,
        default : 0,
    },
    createdAt : {type : Date ,default :Date.now},
})

const order  = mongoose.model("Order",orderSchema);

module.exports = order;