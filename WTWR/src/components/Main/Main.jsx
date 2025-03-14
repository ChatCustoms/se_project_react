import WeaterCard from "../WeatherCard/WeatherCard";

function Main() {
  return (
    <main>
      <WeaterCard />
      <section className="cards">
        <p className="cards__text">
          Today is 75 &deg; F / You may want to wear:
        </p>
      </section>
    </main>
  );
}

export default Main;
