import "./ItemModal.css";
// import "../ModalWithForm/ModalWithForm.css";
import CloseIcon from "../../images/closeIconX.svg";

function ItemModal({ activeModal, onClose, card }) {
  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button type="button" className="modal__close" onClick={onClose}>
          <img src={CloseIcon} alt="Close" />
        </button>
        <img src={card.link} alt="image of clothing" className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
