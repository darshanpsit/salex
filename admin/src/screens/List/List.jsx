/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const List = ({url}) => {
  
 
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
     
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Failed to fetch the list');
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const removeFood = async (foodId) => {
    try {
      const response = await axios.delete(`${url}/api/food/remove`, { params: { id: foodId } });
      // console.log(response.data);
      await fetchList();
      if (response.data.success) {
        toast.success(response.data.message);
      }
      else{
        toast.error("error");
      }
    } catch (error) {
      toast.error('Failed to remove the food item');
    }
  };

  return (
    <div className="list add flex-col">
      <p>All Food List</p>
      <div className="list-table">
        <div className="list-table-format title">
        <b>Image</b>
        <b>Name</b>
        <b>Category</b>
        <b>Price</b>
        <b>Action</b>
        </div>
        {list.map((item, index) => {
          return(
          <div key={index} className="list-table-format">
            <img src={`${url}/images/${item.image}`} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{item.price}</p>
            <p onClick={() => removeFood(item._id)} className='cursor'>X</p>
          </div>
          )
        })}
      </div>
    </div>
  );
};

export default List;