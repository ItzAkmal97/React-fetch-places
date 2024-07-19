import { useState, useEffect } from 'react';

/**
 * ProgressBar component
 *
 * This component is a functional component that displays a progress bar.
 * It takes in a timer prop, which is the total time in milliseconds for the progress bar to fill up.
 *
 * @param {object} props - The props object containing the timer property
 * @param {number} props.timer - The total time in milliseconds for the progress bar to fill up
 * @returns {JSX.Element} - The ProgressBar component
 */
export default function ProgressBar({ timer }) {
  /**
   * remainingTime state variable.
   * This variable holds the remaining time in milliseconds for the progress bar to fill up.
   * It is initialized with the timer prop and will decrease by 10 milliseconds every 10 milliseconds.
   */
  const [remainingTime, setRemainingTime] = useState(timer);

  /**
   * useEffect hook to update the remainingTime state variable every 10 milliseconds.
   * This hook runs only once when the component mounts.
   * It sets up an interval that decreases the remainingTime by 10 milliseconds every 10 milliseconds.
   * The interval is cleared when the component unmounts.
   */
  useEffect(() => {
    /**
     * interval variable holds the ID of the interval.
     * This variable is used to clear the interval when the component unmounts.
     */
    const interval = setInterval(() => {
      /**
       * setRemainingTime is a function provided by the useState hook to update the remainingTime state variable.
       * It takes in the previous state as the first argument and returns the new state.
       * In this case, we subtract 10 milliseconds from the previous remainingTime value.
       */
      setRemainingTime((prevTime) => prevTime - 10);
    }, 10);

    /**
     * Return a function that will be called when the component is unmounted or when the remainingTime state variable changes.
     * This function clears the interval to prevent memory leaks.
     */
    return () => {
      clearInterval(interval);
    };
  }, []);

  /**
   * Render a progress element with the remainingTime value as the value attribute and the timer prop as the max attribute.
   * The progress element will display the progress of the progress bar.
   */
  return <progress value={remainingTime} max={timer} />;
}
