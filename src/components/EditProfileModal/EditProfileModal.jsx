import React, { useState, useEffect, useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const EditProfileModal = ({ isOpen, onClose, onUpdateUser }) => {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setAvatar(currentUser.avatar);
    }
  }, [currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser({ name, avatar });
  };

  return isOpen ? (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="url"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
        />
        <button type="submit">Save</button>
      </form>
      <button onClick={onClose}>Close</button>
    </div>
  ) : null;
};

export const addCardLike = (id, token) => {
  return fetch(`${BASE_URL}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.ok ? res.json() : Promise.reject("Like failed"));
};

export const removeCardLike = (id, token) => {
  return fetch(`${BASE_URL}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.ok ? res.json() : Promise.reject("Dislike failed"));
};

export default EditProfileModal;
