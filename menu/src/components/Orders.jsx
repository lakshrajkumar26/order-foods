import React, { useState } from 'react'





const Orders = () => {

const [orderInfo , setOrderInfo] = useState([{foodName : "idle", quantity : 2, price : 150,}])
const handleOrderName = (e) => {
    console.log(e.target.value)

}

const handleOrderQuantity = (e) => {
    const newFoodName = e.target.value
    setOrderInfo([...orderInfo,newFoodName])
}

const handleOrderPrice = (e) => {
     console.log(e.target.value)
}

  return (<>
    <div className="main">
        <div className="order-info">
            <input type="text" name="foodName" value={orderInfo.foodName} onChange={ (e)=> handleOrderName(e) }/>
            <input type="text" name="foodName" value={orderInfo.price} onChange={ (e)=> handleOrderQuantity(e) }/>
            <input type="text" name="foodName" value={orderInfo.price} onChange={ (e)=> handleOrderPrice(e) }/>
        </div></div>    
</>
  )
}

export default Orders