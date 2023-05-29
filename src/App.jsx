import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import WeatherCard from "./components/weatherCard";
import { Spinner } from "react-bootstrap";

function App() {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [cities, setCities] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    if (city.length > 0 && country.length > 0) {
      setCities([]);
      setError("");
      consultApi();
    }
  };

  const consultApi = async () => {
    try {
      setLoading(true);
      fetch(
        `https://api.openweathermap.org/data/2.5/find?q=${city},${country}&appid=70551e4f98416eab496e31b98f91e2d3`
      ).then((response) => {
        response.json().then((data) => {
          if (data.list.length === 0) {
            setError("No se encontró la ciudad");
            setCities([]);
            setLoading(false);
          } else {
            setCities([data.list[0]]);
            setError("");
            setLoading(false);
          }
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center container_overlay vh-100">
      <h1>Aplicación del Clima</h1>
      <div className="weather_overlay">
        {loading ? (
          <div className="text-center my-2">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          cities.map((city) => (
            <WeatherCard
              icon={`http://openweathermap.org/img/wn/${city.weather[0].icon}.png`}
              city={city.name}
              country={city.sys.country}
              temperature={parseInt(city.main.temp - 273.15)}
              temp_max={parseInt(city.main.temp_max - 273.15)}
              temp_min={parseInt(city.main.temp_min - 273.15)}
              weather={city.weather[0].main}
              key={city.id}
            />
          ))
        )}

        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar ciudad"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <input
            type="text"
            className="form-control mt-2 mb-1"
            placeholder="Buscar país"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          {error && (
            <p className="text-danger mb-0 text-center py-2">{error}</p>
          )}
          <button
            className="btn btn-outline-primary w-100 mt-1"
            onClick={handleSearch}
          >
            Buscar
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
