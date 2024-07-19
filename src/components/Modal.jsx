import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

/**
 * Modal component
 * 
 * This component is a functional component that creates a modal dialog box.
 * It takes in three props: open, children, and onClose.
 * 
 * @param {object} props - The props object containing the open, children, and onClose properties
 * @param {boolean} props.open - A boolean indicating whether the modal should be open or closed
 * @param {JSX.Element} props.children - The JSX element to be rendered inside the modal
 * @param {function} props.onClose - A callback function to be called when the modal is closed
 * @returns {JSX.Element} - The Modal component
 */
function Modal({ open, children, onClose }) {
  // Create a ref to reference the modal dialog element
  const dialog = useRef();

  /**
   * useEffect hook to manage the opening and closing of the modal
   * 
   * This hook runs every time the open prop changes. If the open prop is true,
   * it calls the showModal method on the dialog element to open the modal.
   * If the open prop is false, it calls the close method on the dialog element
   * to close the modal.
   */
  useEffect(() => {
    if (open) {
      // If the modal should be open, call the showModal method on the dialog element
      dialog.current.showModal();
    } else {
      // If the modal should be closed, call the close method on the dialog element
      dialog.current.close();
    }
  }, [open]);

  /**
   * Render the modal component using React's createPortal function
   * 
   * This function creates a new child tree that will be appended to the specified container
   * node when inserted into the DOM. The container node is the element with the id 'modal' in the document.
   * 
   * @returns {JSX.Element} - The Modal component
   */
  return createPortal(
    // Render a <dialog> element with the 'modal' class and the dialog ref
    <dialog className="modal" ref={dialog} onClose={onClose}>
      {/* If the modal is open, render the children JSX element */}
      {open ? children : null}
    </dialog>,
    // Use React's createPortal function to render the <dialog> element inside the element with the id 'modal'
    document.getElementById("modal")
  );
}

export default Modal;
