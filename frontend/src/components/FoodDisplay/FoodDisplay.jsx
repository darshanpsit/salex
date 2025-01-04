/* eslint-disable react/prop-types */
import {useContext} from 'react'
import './FoodDisplay.css'
import FoodItemCard from '../FoodItemCard/FoodItemCard'
import { StoreContext } from '../../Context/StoreContext'

const FoodDisplay = ({category}) => {
  const {food_list}=useContext(StoreContext);
  return (
    <div className='food-display' id='food-display'>
        <h2>Top dishes near you</h2>
        <div className='food-display-list'>
       { food_list.map((food,index) => {
        if(category===food.category || category==='All')
              return <FoodItemCard key={index} id={food._id}
              name={food.name} image={food.image}
              price={food.price}  description={food.description}/>
              })}
        </div>
    </div>
  )
}

export default FoodDisplay