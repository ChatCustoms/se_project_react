import "./ItemModal.css";
// import "../ModalWithForm/ModalWithForm.css";
import CloseIcon from "../../images/closeIconX.svg";

function ItemModal({ activeModal, onClose, card, onDelete }) {
  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button type="button" className="modal__close" onClick={onClose}>
          <img src={CloseIcon} alt="Close" />
        </button>
        <img src={card.imageUrl} alt="image of clothing" className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
          <button className="modal__delete" type="button" onClick={onDelete}>Delete item</button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
