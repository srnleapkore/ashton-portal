import PropTypes from "prop-types";
import './DeleteConfirmation.css'

const DeleteConfirmationModal = ({ onCancel, onConfirm }) => {
  return (
    <div className="delete-confirmation-modal">
      <i className="fa-solid fa-triangle-exclamation"></i>
      <h2>Confirm Your Request</h2>
      <p>Are you sure you want to permanently deactivate your account?</p>
      <div className="modal-buttons">
        <button onClick={onCancel}>Cancel</button>
        <button id="confirm-delete-button" onClick={onConfirm}>Confirm</button>
      </div>
    </div>
  );
};

DeleteConfirmationModal.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default DeleteConfirmationModal;
