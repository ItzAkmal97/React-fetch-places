// This is a React component that displays an error message to the user.
// It accepts three props: title, message, and onConfirm.
// The title prop is a string that will be displayed as the title of the error message.
// The message prop is a string that will be displayed as the message of the error message.
// The onConfirm prop is a function that will be called when the user clicks the "Okay" button.
// If the onConfirm prop is not provided, the "Okay" button will not be displayed.

export default function Error({ title, message, onConfirm }) {
  // Return a JSX element that represents the error message to be displayed to the user.
  // The JSX element is a div with the class name "error".
  // Inside the div, there is an h2 element that displays the title of the error message.
  // There is also a p element that displays the message of the error message.
  // If the onConfirm prop is provided, there is a div element that displays an "Okay" button.
  // The "Okay" button is a button element with the class name "button".
  // When the button is clicked, the onConfirm function will be called.
  return (
    <div className="error">
      {/* Display the title of the error message */}
      <h2>{title}</h2>
      {/* Display the message of the error message */}
      <p>{message}</p>
      {/* If the onConfirm prop is provided, display an "Okay" button */}
      {onConfirm && (
        <div id="confirmation-actions">
          <button onClick={onConfirm} className="button">
            Okay
          </button>
        </div>
      )}
    </div>
  );
}
