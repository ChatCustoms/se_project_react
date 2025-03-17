import { useState } from "react";

import "../blocks/App.css";
import Header from "./Header/Header";
import Main from "./Main/Main";
import ModalWithForm from "./ModalWithForm/ModalWithForm";
import ItemModal from "./ItemModal/ItemModal";

function App() {
  const [weatherData, setWeatherData] = useState({ type: "cold" });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  }

const handleAddClick = () => {
  setActiveModal("add-garment");
};

const handleModalClose = () => {
  setActiveModal("");
}

  return (
    <div className="app">
      <div className="app__content">
        <Header handleAddClick={handleAddClick}/>
        <Main weatherData={weatherData} handleCardClick={handleCardClick}/>
      </div>
      <ModalWithForm
        titleText="Add garment"
        buttonText="Add clothes"
        activeModal={activeModal}
        onClose={handleModalClose}
      >
        <label className="modal__label" htmlFor="name">
          Name{" "}
          <input
            id="name"
            className="modal__input"
            type="text"
            placeholder="Name"
            required
          />
        </label>
        <label className="modal__label" htmlFor="imageURL">
          Image{" "}
          <input
            id="imageURL"
            className="modal__input"
            type="text"
            placeholder="Image URL"
            required
          />
        </label>
        <fieldset className="modal__radio-buttons">
          <legend className="modal__legend">Select the weather type:</legend>
          <label className="modal__label modal__label_type_radio">
            <input
              id="hot"
              className="modal__radio-input"
              type="radio"
              name="weather"
              value="hot"
              required
            />
            <span className="modal__radio-text">Hot</span>
          </label>
          <label className="modal__label modal__label_type_radio">
            <input
              id="hot"
              className="modal__radio-input"
              type="radio"
              name="weather"
              value="warm"
              required
            />
            <span className="modal__radio-text">Warm</span>
          </label>
          <label className="modal__label modal__label_type_radio">
            <input
              id="cold"
              className="modal__radio-input"
              type="radio"
              name="weather"
              value="cold"
            />
            <span className="modal__radio-text">Cold</span>
          </label>
        </fieldset>
      </ModalWithForm>
      <ItemModal activeModal={activeModal} card={selectedCard} onClose={handleModalClose}/>
    </div>
  );
}

export default App;
