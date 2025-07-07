import React from "react";
import "./ConfirmDeleteModal.css";

function ConfirmDeleteModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className={`confirm-modal ${isOpen ? "confirm-modal_opened" : ""}`}>
      {" "}
      <div className="confirm-modal__content">
        <button className="confirm-modal__close" onClick={onClose}>
          ×
        </button>
        <p className="confirm-modal__text">
          Are you sure you want to delete this item?
          <br />
          This action is irreversible.
        </p>
        <button className="confirm-modal__confirm" onClick={onConfirm}>
          Yes, delete item
        </button>
        <button className="confirm-modal__cancel" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;
