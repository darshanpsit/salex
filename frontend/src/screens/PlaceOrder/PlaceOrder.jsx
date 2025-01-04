/* eslint-disable react-hooks/exhaustive-deps */
 /* eslint-disable react-hooks/rules-of-hooks */ 
/* eslint-disable no-unused-vars */
import React, { useContext,useState,useEffect } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'
import{useNavigate} from'react-router-dom'

const placeOrder = () => {
  const {getTotalCartAmount,food_list,cartItems,url,token}=useContext(StoreContext)
const navigate = useNavigate()
  const [data,setData]= useState({
    first_name:"",
    last_name: "",
    email: "",
    street: "",
    zip_code: "",
    country:"",
    phone:"",
    city:"",
    state:""
  })

  const onChangeHandler=(e)=>{
    const {name,value}=e.target
    setData({...data,[name]:value})
  }

  const onSubmitHandler =async (e) => {
    e.preventDefault()
    let orderItems=[]
    food_list.map((item)=>{
      if(cartItems[item._id]>0) {
        let itemInfo = item;
        itemInfo.quantity = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })
    let orderData={
      address:data,
      items:orderItems,
      amount:getTotalCartAmount()+2
    }
    try{
      console.log(orderData)
      let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}})
        console.log(response.data)
        const {session_url} = response.data
        window.location.replace(session_url)
      
    }catch(err){
      console.log(err)
    }
    
  }

  useEffect(() => {
    if(!token){
      navigate('/cart')
    }
    else if(getTotalCartAmount()===0)
      navigate('/cart')
  },[token]);
 
  const subtotal = getTotalCartAmount();
  const deliveryFee = subtotal === 0 ? 0 : 2;
  const total = subtotal + deliveryFee;

  return (
    <div className="place-order-container">
      {/* Delivery Information Section */}
      <div className="delivery-information">
        <h2>Delivery Information</h2>
        <form onSubmit={onSubmitHandler}>
          <div className="input-group">
            <input required  name="first_name" value={data.first_name} onChange={(e)=>onChangeHandler(e)} type="text" placeholder="First Name" />
            <input required  name="last_name" value={data.last_name} onChange={(e)=>onChangeHandler(e)} type="text" placeholder="Last Name" />
          </div>
          <input required  name="email" value={data.email} onChange={(e)=>onChangeHandler(e)} type="email" placeholder="Email address" />
          <input required  name="street" value={data.street} onChange={(e)=>onChangeHandler(e)} type="text" placeholder="Street" />
          <div className="input-group">
            <input required  name="city" value={data.city} onChange={(e)=>onChangeHandler(e)} type="text" placeholder="City" />
            <input required  name="state" value={data.state} onChange={(e)=>onChangeHandler(e)} type="text" placeholder="State" />
          </div>
          <div className="input-group">
            <input required  name="zip_code" value={data.zip_code} onChange={(e)=>onChangeHandler(e)} type="text" placeholder="Zip Code" />
            <input required  name="country" value={data.country} onChange={(e)=>onChangeHandler(e)} type="text" placeholder="Country" />
          </div>
          <input required  name="phone" value={data.phone} onChange={(e)=>onChangeHandler(e)} type="tel" placeholder="Phone" />
        </form>
      </div>

      {/* Cart Totals Section */}
      <div className="cart-totals">
        <h2>Cart Totals</h2>
        <div className="totals-row">
          <p>Subtotal</p>
          <p>${getTotalCartAmount()}</p>
        </div>
        <div className="totals-row">
          <p>Delivery Fee</p>
          <p>${deliveryFee}</p>
        </div>
        <div className="totals-row total">
          <p>Total</p>
          <p>${total}</p>
        </div>
        <button onClick={onSubmitHandler} className="proceed-btn">Proceed to Payment</button>
      </div>
    </div>
  );
};

export default placeOrder