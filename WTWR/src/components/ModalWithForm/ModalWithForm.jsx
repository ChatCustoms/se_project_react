import "./ModalWithForm.css";
import CloseIcon from "../../images/closeIcon.svg";

function ModalWithForm({ children, titleText, buttonText, activeModal, onClose }) {
  return (
    <div className={`modal ${activeModal === "add-garment" && "modal_opened"}`}>
      <div className="modal__content">
        <h2 className="modal__title">{titleText}</h2>
        <button className="modal__close" type="button" onClick={onClose}>
          <input type="image" src={CloseIcon} alt="Close" />
        </button>
        <form className="modal__form">
          {children}
          <button className="modal__submit" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
