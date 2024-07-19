/**
 * Places component
 * 
 * This is a functional component that renders a list of places.
 * It accepts several props:
 * - title: The title of the category of places being rendered.
 * - places: An array of places to be rendered.
 * - fallbackText: The text to be displayed if there are no places to render.
 * - onSelectPlace: A callback function to be called when a place is selected.
 * - isLoading: A boolean indicating whether the places are currently being loaded.
 * - loadingText: The text to be displayed while the places are being loaded.
 */
export default function Places({ title, places, fallbackText, onSelectPlace, isLoading, loadingText }) {
  // Log the places array to the console for debugging purposes
  console.log(places);

  // Return JSX that renders the places category section
  return (
    <section className="places-category">
      {/* Render the category title */}
      <h2>{title}</h2>

      {/* If the places are currently being loaded, render the loading text */}
      {isLoading && <p className="fallback-text">{loadingText}</p>}

      {/* If the places are not currently being loaded */}
      {!isLoading && (
        // If there are no places to render, render the fallback text
        places.length === 0 && <p className="fallback-text">{fallbackText}</p>
      )}

      {/* If there are places to render */}
      {!isLoading && places.length > 0 && (
        <ul className="places">
          {/* Render each place as a list item */}
          {places.map((place) => (
            <li key={place.id} className="place-item">
              {/* Render a button for each place */}
              <button onClick={() => onSelectPlace(place)}>
                {/* Render the place image */}
                <img src={`http://localhost:3000/${place.image.src}`} alt={place.image.alt} />
                {/* Render the place title */}
                <h3>{place.title}</h3>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
