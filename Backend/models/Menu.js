const mongoose = require("mongoose");
const menuSchema = new mongoose.Schema({

    foodName : {
        type : String,
        unique :true,
     },

     desc : {
        type : String,
        
     },

     price:{
        type:Number,
        default : 100 ,
     },
    

},{timestamps :true})


const food = mongoose.model("foodMenu" , menuSchema );
module.exports = food;


