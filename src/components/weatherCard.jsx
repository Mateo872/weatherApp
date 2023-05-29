const WeatherCard = ({
  city,
  country,
  temperature,
  weather,
  icon,
  temp_max,
  temp_min,
}) => {
  return (
    <div>
      <div>
        <div className="text-center">
          <img src={icon} alt={city} className="w-50" />
        </div>
        <h3>{city}</h3>
        <h5>{country}</h5>
        <p>Temperatura: {temperature} °C</p>
        <p>Temperatura máxima: {temp_max} °C</p>
        <p>Temperatura mínima: {temp_min} °C</p>
        <p>Clima: {weather}</p>
      </div>
    </div>
  );
};

export default WeatherCard;
