import "./Header.css";
import avatar from "../../images/Avatar.png"
import logo from "../../images/logo.svg";

function Header() {
  return (
    <header className="header">

      <img className="header__logo" src={logo} />
      <p className="header__date-and-location">Date, Location</p>
      <button className="header__add-clothes-btn">+ Add clothes</button>
      <div className="header__user-container">
        <p className="header__username">Terrence Tegegne</p>
        <img src={avatar} alt="Terrence Tegegne" className="header__avatar" />
      </div>
    </header>
  );
}

export default Header;
