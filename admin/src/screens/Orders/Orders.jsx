/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import './Orders.css';
import axios from "axios";
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';

const Orders = ({ url }) => {

  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/list");
      if (response.data.success) {
        setOrders(response.data.data);
        console.log(response.data.data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      toast.error("Failed to fetch orders");
    }
  };

  const statusHandler = async (e, orderId) => {
    try {
      const response = await axios.post(url + "/api/order/status", {
        orderId,
        status: e.target.value
      });
      if (response.data.success) {
        await fetchAllOrders();
      } else {
        toast.error("Failed to update order status");
      }
    } catch (error) {
      toast.error("Error updating order status");
    }
  };
  
  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="Parcel Icon" />
            <div>
              <p className="order-item-food">
                {order.items.map((item, index) => (
                  `${item.name} x ${item.quantity}${index < order.items.length - 1 ? ',' : ''}`
                ))}
              </p>
              <p className='order-item-name'>{`${order.address.first_name} ${order.address.last_name}`}</p>
              <div className='order-item-address'>
                <p>{`${order.address.street}, `}</p>
                <p>{`${order.address.city}, ${order.address.state}, ${order.address.country}, ${order.address.zip_code}`}</p>
              </div>
              <p className='order-item-phone'>{order.address.phone}</p>
            </div>
            <p>Items: {order.items.length}</p>
            <p>${order.amount}</p>
            <select onChange={(e) => statusHandler(e, order._id)} value={order.status}>
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
           
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
