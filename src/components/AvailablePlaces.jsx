import Places from './Places.jsx';
import { useEffect, useState } from 'react';
import Error from './Error.jsx';
import {sortPlacesByDistance} from '../loc.js';
import {fetchAvailablePlaces} from '../http.js';

/**
 * AvailablePlaces component
 * 
 * This component is a functional component that fetches available places from the server
 * and renders them in a Places component.
 * 
 * @param {object} props - The props object containing the onSelectPlace callback function
 * @param {function} props.onSelectPlace - Callback function to be called when a place is selected.
 * @returns {JSX.Element} - The AvailablePlaces component.
 */
export default function AvailablePlaces({ onSelectPlace }) {
  // Create a state variable called availablePlaces to hold the available places
  const [availablePlaces, setAvailablePlaces] = useState([]);
  // Create a state variable called isFetching to track the state of the fetch request
  const [isFetching, setIsFetching] = useState(false);
  // Create a state variable called error to hold any error that occurs during the fetch request
  const [error, setError] = useState();

  // useEffect hook to fetch available places from the server
  useEffect(() => {
    // Define an async function called fetchPlaces to fetch the available places from the server
    const fetchPlaces = async () => {
      // Set the isFetching state to true to indicate that a fetch request is in progress
      setIsFetching(true);

      try {
        // Fetch the available places from the server
        const places = await fetchAvailablePlaces();
        // Get the current position of the user using the Geolocation API
        navigator.geolocation.getCurrentPosition(
          (position) => {
            // Sort the places by distance from the user's current position
            const sortedPlaces = sortPlacesByDistance(places, position.coords.latitude, position.coords.longitude);
            // Update the availablePlaces state with the sorted places
            setAvailablePlaces(sortedPlaces);
            // Set the isFetching state to false to indicate that the fetch request is complete
            setIsFetching(false);
          }
        );
      } catch(error) {
        // If an error occurs during the fetch request, set the error state and set the isFetching state to false
        setError({message: error.message || 'Something went wrong, please try again later.'});
        setIsFetching(false);
      }
    };
    // Call the fetchPlaces function to initiate the fetch request
    fetchPlaces();
  }, []);

  // If an error occurs during the fetch request, render an Error component with the appropriate title and message
  if(error){
    return <Error title="Could not fetch places." message={error.message}/>
  }

  // Render the Places component with the available places and a fallback text
  return (
    <Places
      title="Available Places"
      // Pass an empty array as places, as the actual places are in the state
      places={availablePlaces}
      fallbackText="No places available."
      loadingText={"Loading places..."}
      isLoading={isFetching}
      // Pass the onSelectPlace callback function as a prop
      onSelectPlace={onSelectPlace}
    />
  );
}
