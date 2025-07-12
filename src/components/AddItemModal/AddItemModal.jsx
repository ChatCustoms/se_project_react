import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect } from "react";

export default function AddItemModal({
  onClose,
  isOpen,
  onAddItemModalSubmit,
}) {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weatherType, setWeatherType] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleWeatherTypeChange = (e) => {
    setWeatherType(e.target.value);
  };

  useEffect(() => {
    setName("");
    setImageUrl("");
    setWeatherType("");
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItemModalSubmit({
      name,
      imageUrl,
      weatherType,
    });
  };

  return (
    <ModalWithForm
      titleText="Add garment"
      buttonText="Add clothes"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="modal__label">
        Name{" "}
        <input
          id="name"
          className="modal__input"
          type="text"
          placeholder="Name"
          onChange={handleNameChange}
          value={name}
          required
        />
      </label>
      <label className="modal__label">
        Image{" "}
        <input
          id="imageUrl"
          className="modal__input"
          type="text"
          placeholder="Image URL"
          onChange={handleImageUrlChange}
          value={imageUrl}
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
            onChange={handleWeatherTypeChange}
            checked={weatherType === "hot"}
            required
          />
          <span className="modal__radio-text">Hot</span>
        </label>
        <label className="modal__label modal__label_type_radio">
          <input
            id="warm"
            className="modal__radio-input"
            type="radio"
            name="weather"
            value="warm"
            onChange={handleWeatherTypeChange}
            checked={weatherType === "warm"}
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
            onChange={handleWeatherTypeChange}
            checked={weatherType === "cold"}
            required
          />
          <span className="modal__radio-text">Cold</span>
        </label>
      </fieldset>
    </ModalWithForm>
  );
}
