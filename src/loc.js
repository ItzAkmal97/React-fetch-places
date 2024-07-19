/**
 * This function takes an angle in degrees and converts it to radians.
 * 
 * @param {number} value - The angle in degrees.
 * @return {number} The angle in radians.
 */
function toRad(value) {
  // Convert the angle from degrees to radians.
  // The formula to convert degrees to radians is: radians = (degrees * pi) / 180
  // where pi is a mathematical constant representing the ratio of the circumference of a circle to its diameter.
  // Here, we use the predefined Math.PI constant to calculate the radians.
  // We multiply the value by Math.PI and then divide it by 180 to get the result in radians.
  return (value * Math.PI) / 180;
}

/**
 * Calculates the distance between two geographical coordinates using the
 * Haversine formula.
 *
 * @param {number} lat1 - The latitude of the first coordinate.
 * @param {number} lng1 - The longitude of the first coordinate.
 * @param {number} lat2 - The latitude of the second coordinate.
 * @param {number} lng2 - The longitude of the second coordinate.
 * @return {number} The distance between the two coordinates in kilometers.
 */
function calculateDistance(lat1, lng1, lat2, lng2) {
  // Earth's radius in kilometers.
  const R = 6371;

  // Convert latitude and longitude to radians for trigonometric functions.
  const dLat = toRad(lat2 - lat1); // Difference in latitude.
  const dLon = toRad(lng2 - lng1); // Difference in longitude.

  // Convert latitude to radians.
  const l1 = toRad(lat1); // Latitude of the first coordinate.
  const l2 = toRad(lat2); // Latitude of the second coordinate.

  // Calculate the half-value of the square of the sine.
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(l1) * Math.cos(l2);

  // Calculate the distance using the Haversine formula.
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;

  // Return the distance in kilometers.
  return d;
}

export function sortPlacesByDistance(places, lat, lon) {
  const sortedPlaces = [...places];
  sortedPlaces.sort((a, b) => {
    const distanceA = calculateDistance(lat, lon, a.lat, a.lon);
    const distanceB = calculateDistance(lat, lon, b.lat, b.lon);
    return distanceA - distanceB;
  });
  return sortedPlaces;
}
