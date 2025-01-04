/* eslint-disable react-hooks/rules-of-hooks */
 
import React from 'react'
import { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../Context/StoreContext'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'

const cart = () => {
  const { food_list,cartItems,addToCart,removeFromCart,getTotalCartAmount,url}=useContext(StoreContext);
  return (
    <div className='cart'>
      <div className='cart-items'>
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
        </div>
        <br/>
        <hr/>
        {
          food_list.map((food,_id) => {
            if(cartItems[food._id] >0){
              return(
                <React.Fragment key={_id}>
                <div className='cart-items-title '>
                  <img src={url+"/images/"+food.image} alt=''/>
                  <p>{food.name}</p>
                  <p>${food.price}</p>
                  <div className="quantity-counter">
                    <img src={assets.remove_icon_red}onClick={() => removeFromCart(food._id)} alt="" />
                    <p>{cartItems[food._id]}</p>
                    <img src={assets.add_icon_green} onClick={() => addToCart(food._id)} alt="" />
                  </div>
                  <p>${cartItems[food._id] * food.price}</p>
                </div>
                <hr/>
                </React.Fragment>
              );
            }
          })
        }
      </div>
      <div className='cart-bottom'>
        <div className='cart-total'>
          <h2>Cart Total</h2>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>$ {getTotalCartAmount()}</p>
          </div>
          <hr/>
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>$ {getTotalCartAmount()==0?0:2}</p>
          </div>
          <hr/>
          <div className="cart-total-details">
            <p>Total</p>
            <p>$ {getTotalCartAmount()==0?0:getTotalCartAmount()+2}</p>
          </div>
          <hr/>
          <Link to='/order'><button>Proceed to Checkout</button></Link>
        </div>
        <div className='cart-promocode'>
          <p>If you have promocode ,enter it here.</p>
          <div className='cart-promocode-input'>
            <input type ="text" placeholder='Enter promocode'/>
            <button>Apply</button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default cart