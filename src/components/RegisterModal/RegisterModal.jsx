import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterModal.css";
import { useState } from "react";

const RegisterModal = ({ isOpen, onClose, onRegister }) => {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({ name, avatar, email, password });
  };

  return (
    <ModalWithForm
      titleText="Sign Up"
      buttonText="Register"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="modal__label" htmlFor="name">
        Name{" "}
        <input
          id="register-name"
          className="modal__input"
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          value={name}
          required
        />
      </label>
      <label className="modal__label" htmlFor="avatar">
        Avatar URL{" "}
        <input
          id="avatar"
          className="modal__input"
          type="url"
          placeholder="Avatar URL"
          onChange={(e) => setAvatar(e.target.value)}
          value={avatar}
          required
        />
      </label>
      <label className="modal__label" htmlFor="email">
        Email{" "}
        <input
          id="email"
          className="modal__input"
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
      </label>
      <label className="modal__label" htmlFor="password">
        Password{" "}
        <input
          id="password"
          className="modal__input"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
      </label>
    </ModalWithForm>
  );
};

export default RegisterModal;
