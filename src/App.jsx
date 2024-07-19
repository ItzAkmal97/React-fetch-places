import { useRef, useState, useCallback, useEffect } from 'react';

import Places from './components/Places.jsx';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import AvailablePlaces from './components/AvailablePlaces.jsx';
import { updateUserPlaces, fetchUserPlaces } from './http.js';
import Error from './components/Error.jsx';

// App component
// This is the main component of the application. It renders the UI and handles user interactions.
function App() {
  // Create a reference to keep track of the selected place
  const selectedPlace = useRef();

  // Create state variables to hold the user's places and error messages
  const [userPlaces, setUserPlaces] = useState([]); // User's places
  const [errorUpdatingPlaces, setErrorUpdatingPlaces] = useState(); // Error occurred during updating user's places
  const [modalIsOpen, setModalIsOpen] = useState(false); // Modal is open or closed

  const [isFetching, setIsFetching] = useState(false); // Fetch request is in progress
  const [error, setError] = useState(); // Error occurred during fetch request

  // Fetch user's places from the server and update the state when the component mounts
  useEffect(() => {
    // Fetch user's places from the server and update the state
    async function fetchPlaces() {
      // Set the isFetching state to true to indicate that a fetch request is in progress
      setIsFetching(true);

      try {
        // Fetch the user's places from the server
        const places = await fetchUserPlaces();

        // Update the userPlaces state with the fetched places
        setUserPlaces(places);
      } catch (error) {
        // If an error occurs during the fetch request, set the error state with an appropriate error message
        setError({ message: error.message } || 'Could not fetch places, please try again later.');
      }

      // Set the isFetching state to false to indicate that the fetch request is complete
      setIsFetching(false);
    }

    fetchPlaces();
  }, []);

  // Handle the start of removing a place
  function handleStartRemovePlace(place) {
    // Set the modalIsOpen state to true to open the modal
    setModalIsOpen(true);
    // Set the current selected place in the ref
    selectedPlace.current = place;
  }

  // Handle the stop of removing a place
  function handleStopRemovePlace() {
    // Set the modalIsOpen state to false to close the modal
    setModalIsOpen(false);
  }

  // Handle the selection of a place
  async function handleSelectPlace(selectedPlace) {
    // Update the userPlaces state by adding the selected place and preserving the order
    setUserPlaces((prevPickedPlaces) => {
      if (!prevPickedPlaces) {
        prevPickedPlaces = [];
      }
      if (prevPickedPlaces.some((place) => place.id === selectedPlace.id)) {
        return prevPickedPlaces;
      }
      return [selectedPlace, ...prevPickedPlaces];
    });

    try {
      // Update the user's places on the server
      await updateUserPlaces([selectedPlace, ...userPlaces]);
    } catch (error) {
      // If an error occurs during updating, set the userPlaces state back to the previous state
      setUserPlaces(userPlaces);
      // Set the errorUpdatingPlaces state with an appropriate error message
      setErrorUpdatingPlaces({ message: error.message } || 'Could not update the place, please try again later.');
    }
  }

  // Handle the removal of a place
  const handleRemovePlace = useCallback(async function handleRemovePlace() {
    // Update the userPlaces state by removing the selected place
    setUserPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current.id)
    );

    try {
      // Update the user's places on the server
      await updateUserPlaces(userPlaces.filter((place) => place.id !== selectedPlace.current.id));
    } catch (error) {
      // If an error occurs during updating, set the userPlaces state back to the previous state
      setUserPlaces(userPlaces);
      // Set the errorUpdatingPlaces state with an appropriate error message
      setErrorUpdatingPlaces({ message: error.message } || 'Could not delete place, please try again later.');
    }

    // Set the modalIsOpen state to false to close the modal
    setModalIsOpen(false);
  }, [userPlaces]);

  // Handle the close of the error modal
  function handleErrorUpdatingPlaces() {
    // Set the errorUpdatingPlaces state to null to close the modal
    setErrorUpdatingPlaces(null);
  }

  // Render the UI
  return (
    <>
      {/* Error modal */}
      <Modal open={errorUpdatingPlaces} onClose={handleErrorUpdatingPlaces}>
        {errorUpdatingPlaces && (
          <Error
            title="Something went wrong"
            message={errorUpdatingPlaces.message}
            onConfirm={handleErrorUpdatingPlaces}
          />
        )}
      </Modal>

      {/* Remove place modal */}
      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        {/* Header */}
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or you have visited.
        </p>
      </header>
      <main>
        {/* Error component */}
        {error && <Error title="Something went wrong" message={error.message} />}

        {/* User's places component */}
        {!error && (
          <Places
            title="I'd like to visit ..."
            fallbackText="Select the places you would like to visit below."
            places={userPlaces}
            loadingText="Loading places..."
            isLoading={isFetching}
            onSelectPlace={handleStartRemovePlace}
          />
        )}

        {/* Available places component */}
        <AvailablePlaces onSelectPlace={handleSelectPlace} />
      </main>
    </>
  );
}

export default App;
