import "./WeatherCard.css";
import Sunny from "../../images/sunny.png";

function WeaterCard() {
  return (
    <section className="weather-card">
      <p className="weather-card__temp">75 &deg; F</p>
      <img src={Sunny} alt="Sunny skies" className="weather-card__image" />
    </section>
  );
}

export default WeaterCard;
