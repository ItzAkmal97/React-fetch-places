/**
 * fetchAvailablePlaces function
 * 
 * This async function fetches the available places from the server.
 * It makes a GET request to the server at http://localhost:3000/places.
 * It expects the server to return a JSON object containing an array of places.
 * If the server returns a non-200 status code, it throws an error with a message.
 * If the server returns a 200 status code, it returns the array of places.
 * 
 * @returns {Promise<Array>} - A promise that resolves to an array of places.
 * @throws {Error} - If the server returns a non-200 status code.
 */
export async function fetchAvailablePlaces() {
    // Make a GET request to the server at http://localhost:3000/places
    const response = await fetch('http://localhost:3000/places');

    // Parse the response body as JSON
    const resData = await response.json();

    // If the server returns a non-200 status code, throw an error
    if(!response.ok) {  
      throw new Error('Could not fetch places.');
    }

    // Return the array of places from the response data
    return resData.places;
}

export async function fetchUserPlaces() {
    const response = await fetch('http://localhost:3000/user-places');
    const resData = await response.json();

    if(!response.ok) {  
      throw new Error('Could not fetch user places.');
      }

      return resData.places;
}

export async function updateUserPlaces(places) {
    const response = await fetch('http://localhost:3000/user-places', {
      method: 'PUT',
      body: JSON.stringify({places}),
      headers: { 'Content-Type': 'application/json' }
    });

    const resData = await response.json();

    if(!response.ok) {  
      throw new Error('Could not update places.');
      }

      return resData.message
}
