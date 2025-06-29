const express = require("express");
const app = express();
const food = require("./models/Menu");
const db = require("./dbConn/db");
const order = require("./models/Order");
const cors = require("cors");


//Middleware
app.use(cors());
app.use(express.json())


//to demo   C
app.get("/home" , (req,res) => {
    res.send("working");
})

//to add newFood
app.post("/newfood", async(req,res)=> { 

    const data = req.body 
    try{
        const newFood = new food(data);
         const response  = await newFood.save()
        res.status(200).json(response);
    }
    catch(err){
        res.status(500).json(err)
    }
})
//delete item
app.delete("/menu/:id" , async(req,res)=> {
      const id = req.params.id;
    try{
      const deletedItem =  await food.findByIdAndDelete(id);
    if (!deletedItem) return res.status(404).json({message : "Food item Not found"});

    res.status(200).json({ message: 'Food item deleted', deletedItem });
    }
    catch(err){
    res.status(500).json({ message: 'Error deleting food item', error: err.message });
    }
})


//to list the food in menu
app.get('/menu', async(req,res)=> {

  try{
    const allFoods = await food.find()
    res.status(200).json(allFoods);
  }
  catch(err){
    console.log(err);
     res.status(500).json(err);
  }
})

//to add newOrder   ***revise
app.post("/order" , async(req,res)=> {
      const items = req.body;
    try{
     let totalItems = 0;
     let netPrice = 0;
     const processedItem = items.map( (items)=> {const subtotal = items.price *items.quantity;
        totalItems = totalItems+ items.quantity;
        netPrice = netPrice+ subtotal;
      return {...items,subtotal };
    }) 

    const newOrder = await order.create({
        items : processedItem,
        totalItems,
        netPrice
    });
    res.status(200).json(newOrder);
    }
    catch(err) {

        res.status(500).json({message :"Error in placing order"});
    }
})

app.get("/showorder" ,async (req,res)=> {
    //   const data = req.body;
    try{
       const data = await order.find()
       res.status(200).json(data);
    }
    catch(err) {
        console.log(err);
    }
})






app.listen(3000 , ()=>{
    console.log("server working on 3000")
});




