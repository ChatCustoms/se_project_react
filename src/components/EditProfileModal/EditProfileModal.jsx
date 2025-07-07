import React, { useState, useEffect, useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./EditProfileModal.css";

const EditProfileModal = ({ isOpen, onClose, onUpdateUser }) => {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    if (currentUser && isOpen) {
      setName(currentUser.name || "");
      setAvatar(currentUser.avatar || "");
    }
  }, [currentUser, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser({ name, avatar });
  };

  if (!isOpen) return null;

  return (
    <div className="edit-profile-modal__overlay">
      <div className="edit-profile-modal__container">
        <button className="edit-profile-modal__close" onClick={onClose}>
          ×
        </button>
        <h2 className="edit-profile-modal__title">Change profile data</h2>
        <form onSubmit={handleSubmit} className="edit-profile-modal__form">
          <label className="edit-profile-modal__label">
            Name*
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="edit-profile-modal__input"
            />
          </label>
          <label className="edit-profile-modal__label">
            Avatar
            <input
              type="url"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              className="edit-profile-modal__input"
            />
          </label>
          <button type="submit" className="edit-profile-modal__save">
            Save changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
