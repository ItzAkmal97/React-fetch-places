import { useEffect } from 'react';

import ProgressBar from './ProgressBar.jsx';

const TIMER = 3000;

/**
 * This is a React component that displays a confirmation dialog for deleting a place.
 * It accepts two props: onConfirm and onCancel.
 * onConfirm is a function that will be called after a certain amount of time (3000ms).
 * onCancel is a function that will be called when the user clicks the "No" button.
 */
export default function DeleteConfirmation({ onConfirm, onCancel }) {
  // useEffect is a React hook that runs some code after the component has rendered.
  // Here, we're using it to set a timer that will call the onConfirm function after a certain amount of time.
  useEffect(() => {
    // start a timer that will call the onConfirm function after TIMER (3000ms)
    const timer = setTimeout(() => {
      // call the onConfirm function
      onConfirm();
    }, TIMER);

    // return a function that will be called when the component is unmounted or when the onConfirm function changes.
    // This function clears the timer so that the onConfirm function is not called after the component has been unmounted.
    return () => {
      clearTimeout(timer);
    };
  }, [onConfirm]); // the [onConfirm] part means that the effect will only run if the onConfirm function changes.

  // return the JSX for the component.
  return (
    <div id="delete-confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id="confirmation-actions">
        {/* button to call the onCancel function when clicked */}
        <button onClick={onCancel} className="button-text">
          No
        </button>
        {/* button to call the onConfirm function when clicked */}
        <button onClick={onConfirm} className="button">
          Yes
        </button>
      </div>
      {/* ProgressBar component to display a progress bar that will be filled after TIMER (3000ms) */}
      <ProgressBar timer={TIMER} />
    </div>
  );
}
