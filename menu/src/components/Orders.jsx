import React, { useEffect, useState } from 'react';
import './Orders.css';
import axios from 'axios';




const Orders = () => {

    const [orderInfo, setOrderInfo] = useState([{ foodName: "idle", quantity: 2, price: 150 }]);  //its a array of 3 object not a string so ==>  for debug

    const [currentOrder, setCurrentOrder] = useState({   // here adding 3 objects 
        foodName: "", quantity: "", price: ""
    });


    const [givenOrders, setGivenOrders] = useState([]);  //fetch orders



    const handleInputChange = (e) => {
        console.log(e.target.name, " = ", console.log(e.target.value))
        const { name, value } = e.target;    //destr
        setCurrentOrder({ ...currentOrder, [name]: value });      //adding [name] : value => in currentOrder
    }



    const handleSubmit = async () => {
        const newOrder = {   //here  giving the obj by bundling all string together
            foodName: currentOrder.foodName,
            quantity: parseInt(currentOrder.quantity),
            price: parseInt(currentOrder.price)
        };
        console.log("newOrder", newOrder)
        setOrderInfo([...orderInfo, newOrder]);
        console.log("orderIndo :", orderInfo);
        console.log("currentOrder :", currentOrder);
        setCurrentOrder({ foodName: "", quantity: "", price: "" });

        try {
            const res = await axios.post("http://localhost:3000/order", [currentOrder]);
            console.log(res);
        }
        catch (err) {
            console.log(err);

        }
    }

    const fetchOrders = async () => {
        const res = await axios.get("http://localhost:3000/showorder");
        console.log("given orders", res.data)
        setGivenOrders(res.data);
    }

    useEffect(() => {
        fetchOrders();
    }, [])




    //we use name to identify and value to data
    return (
    <>
        <div className="main">
            <div className="order-info">
                <h2>Food Name</h2>
                <input type="text" name="foodName" value={currentOrder.foodName} onChange={(e) => handleInputChange(e)} />
                <h2>Quantity</h2>
                <input type="text" name="quantity" value={currentOrder.quantity} onChange={(e) => handleInputChange(e)} />
                <h2>Price</h2>
                <input type="text" name="price" value={currentOrder.price} onChange={(e) => handleInputChange(e)} />
                <button onClick={() => handleSubmit()}>Add Order</button>
            </div></div>

        <div className="order-dashboard">
            {givenOrders.map((order, index) => (<ul>
                <div className="order-card" key={order._id}>
                    <h3>Order #{index + 1}</h3>
                    <p><strong>Order ID:</strong> {order._id}</p>
                    <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                    <p><strong>Total Items:</strong> {order.totalItems}</p>
                    <p><strong>Total Price:</strong> ₹{order.netPrice}</p>

                    {/* {order.items.map( (ele ,index)=> (<ul>
                        <li key={index}> foodname :{ele.items.foodName}</li>
                    </ul>))} */}
                    <ul>
        {order.items.map((item, i) => (
          <li key={item._id}>
            {item.foodName} × {item.quantity} = ₹{item.subtotal}
          </li>
        ))}
      </ul>
                </div>


            </ul>
            ))}
        </div>
    </>
    )
}

export default Orders