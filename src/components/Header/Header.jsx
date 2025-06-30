import "./Header.css";
import avatar from "../../images/Avatar.png";
import logo from "../../images/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch.jsx";
import { Link } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";

function Header({ handleAddClick, weatherData, isOpen, onLogin, onRegister }) {
  const currentUser = useContext(CurrentUserContext);
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  console.log("Header - currentUser:", currentUser);
  return (
    <header className="header">
      <div className="header__container">
        <Link to="/">
          {" "}
          <img className="header__logo" src={logo} alt="WTWR" />
        </Link>
        <p className="header__date-and-location">
          {currentDate}, {weatherData.city}
        </p>
      </div>
      <ToggleSwitch />
      <button
        type="button"
        onClick={handleAddClick}
        className="header__add-clothes-btn"
      >
        + Add clothes
      </button>
      {!currentUser ? (
        <div className="header__auth-buttons">
          <button type="button" className="header__login-btn" onClick={onLogin}>
            Log In
          </button>
          <button
            type="button"
            className="header__register-btn"
            onClick={onRegister}
          >
            Sign Up
          </button>
        </div>
      ) : (
        <Link to="/profile" className="header__user-container">
          <p className="header__username">{currentUser.name}</p>
          {currentUser.avatar ? (
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="header__avatar"
            />
          ) : (
            <div className="header__avatar-placeholder">
              {currentUser.name.charAt(0)}
            </div>
          )}
        </Link>
      )}
    </header>
  );
}

export default Header;
