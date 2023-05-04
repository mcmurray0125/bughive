import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { RestaurantsContext } from '../context/RestaurantsContext';
import RestaurantFinder from '../apis/RestaurantFinder';
import StarRating from '../components/StarRating';
import Reviews from '../components/Reviews';
import AddReview from '../components/AddReview';

const RestaurantDetailPage = () => {
  const { id } = useParams();
  const { selectedRestaurant, setSelectedRestaurant } = useContext(RestaurantsContext);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get(`/${id}`)

        setSelectedRestaurant(response.data.data)
      } catch (error) {
        console.log(error)
      }
    };

    fetchData();
  }, [])

  return (
    <div className=''>
      {selectedRestaurant && (
      <>
        <h1 className='display-1 text-center'>{selectedRestaurant.restaurant.name}</h1>
        <div className="text-center">
          <StarRating rating={selectedRestaurant.restaurant.average_rating}/>
          <span className='text-warning'>
            {selectedRestaurant.restaurant.count ? `(${selectedRestaurant.restaurant.count})` : "(0)"}
          </span>
        </div>
        <div className="mt-3">
          <Reviews reviews={selectedRestaurant.reviews} />
        </div>
        <AddReview/>
      </>
    )}</div>
  )
}

export default RestaurantDetailPage