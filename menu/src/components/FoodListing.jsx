import React, { useState, useEffect } from 'react'
import './FoodListing.css';

const FoodListing = () => {

    const [food, setFood] = useState([]);
    const [formData ,setFormData] =useState({
        foodName : "",
        price: "" ,
        desc: "",
    })

    const menu = async () => {
        try {
            const data = await fetch("http://localhost:3000/menu");
            const response = await data.json();
            console.log(response)
            setFood(response)
        }
        catch (err) {
            console.log(err);

        }
    }

    useEffect(() => {
        menu();
    }, [])

    const handleOnClick = async () => {

        if(!formData.foodName || !formData.price){  
          return alert ("food name or price not entered")
        }

        try{
            const res = await fetch("http://localhost:3000/newfood",{
                method : "POST",
                headers: {"Content-Type":"application/json"},    //teell type is json only
                body:JSON.stringify(formData)  //convert to string coz http accept string only
            });

            const result = await res.json();
            console.log("successfully send" ,result);
            alert("food added!");

            //reset form 
            setFormData({foodName :"", price : "", desc : ""});

        }
        catch(err){
            console.log("error in adding food")
        }

    }

    const handleDelete = async(id) => {
       
        try{
           const res = await fetch(`http://localhost:3000/menu/${id}`,{ 
            method : "DELETE"
        })
        alert("Item deleted")
        }
        catch(err){
            console.log(err)

        }

    }


    return (
        <>
            <div className="menu-container">
                <div className="menu-title"> Our Authentic Dishes
                    <div className="menu-grid">
                        {food.map((item, index) => (
                            <div key={index} className='menu-card'>
                                <h2 className='food-name'>{item.foodName}</h2>
                                <p className='food-price'>Price:{item.price}</p>
                                <p className='food-desc'>description:  {item.desc}</p>
                                <button onClick={ ()=> handleDelete(item._id)}>Remove from Menu</button>
                                
                            </div>
                        ))}
                    </div>
                    <div className="form-Fields">
                        <input type="text" placeholder='Enter Food Name' value ={formData.foodName} onChange={(e) => setFormData({...formData , foodName : e.target.value})} />
                        <input type="text" placeholder='Enter Food Price' value ={formData.price} onChange={(e)=>setFormData({...formData , price : e.target.value})} />
                        <input type="text" placeholder='Enter Food Desc' value ={formData.desc} onChange={(e)=>setFormData({...formData , desc : e.target.value})} /> 
                        <button onClick={handleOnClick}>Add Item</button> 
                    </div>
                 </div>
             </div>
        </>
    )
}

export default FoodListing



