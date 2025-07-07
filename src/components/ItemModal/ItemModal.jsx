import "./ItemModal.css";
import CloseIcon from "../../images/closeIconX.svg";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal";
import { useState } from "react";

function ItemModal({ activeModal, onClose, card, onDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser?._id;
  console.log("Current user ID:", currentUser?._id);
  console.log("Card owner ID:", card.owner);

  const [showConfirm, setShowConfirm] = useState(false);

  const handleDeleteClick = () => {
    setShowConfirm(true);
  };

  const handleConfirmDelete = () => {
    onDelete(card); // call the parent delete handler
    setShowConfirm(false); // close confirm modal
    onClose(); // also close the main modal
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  return (
    <>
      <div
        className={`modal ${activeModal === "preview" ? "modal_opened" : ""}`}
      >
        <div className="modal__content modal__content_type_image">
          <button className="item-modal__close" onClick={onClose}>
            <img src={CloseIcon} alt="Close" />
          </button>

          <img src={card.imageUrl} alt={card.name} className="modal__image" />

          <div className="item-modal__footer">
            <div className="item-modal__info-row">
              <h2 className="modal__caption">{card.name}</h2>
              {isOwn && (
                <button
                  className="modal__delete"
                  type="button"
                  onClick={handleDeleteClick}
                >
                  Delete item
                </button>
              )}
            </div>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>
        </div>
      </div>

      <ConfirmDeleteModal
        isOpen={showConfirm}
        onClose={handleCancel}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}

export default ItemModal;
