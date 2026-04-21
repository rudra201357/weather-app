import "./hero.css";
import { useEffect, useState } from "react";

function Hero() {
    const [weather, setWeather] = useState(null);
    const [city, setCity] = useState("Kolkata");
    const apiKey = process.env.REACT_APP_API_KEY;
    const getAQIText = (aqi) => {
        switch (aqi) {
            case 1: return "Good 🟢";
            case 2: return "Moderate 🟡";
            case 3: return "Unhealthy 😷";
            case 4: return "Unhealthy 🔴";
            case 5: return "Very Unhealthy ⚠️";
            case 6: return "Hazardous ☠️";
            default: return "Unknown";
        }
    };
    const getAQIColor = (aqi) => {
        switch (aqi) {
            case 1: return { background: "green" };
            case 2: return { background: "#e2ff03a5" };
            case 3: return { background: "orange" };
            case 4: return { background: "red" };
            case 5: return { background: "purple" };
            case 6: return { background: "maroon" };
            default: return { color: "" };  
        }   
        };
    const getWeather = () => {
        if (!city) {
            alert("Please enter a city name");
            return;
        }
        fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`)
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    setCity(""); // Clear the input field
                    alert("Invalid City Name. Please try again.");

                    return;
                }
                console.log(data);
                setWeather(data);
            });
    };
  useEffect(() => {
    getWeather();
  },[]);
    return (<div className="hero">
        <div className="search">
            <input type="text" placeholder="Enter city name" onChange={(e) => setCity(e.target.value)}  onKeyDown={(e) => {
    if (e.key === "Enter") {
      getWeather();  // call your API
    }
  }} />
            <button onClick={getWeather}>Get Weather</button>
        </div>
        <div className="weather-info">
            {weather && (
                <div className="result">
                    <div className="result-1">
                        <span id="city">City: {weather.location.name}</span>
                        <span>Country: {weather.location.country}</span>
                        <span>Latitude: {weather.location.lat}</span>
                        <span>Longitude: {weather.location.lon}</span>
                        <span>Local Time: {weather.location.localtime}</span>
                    </div>
                    <div className="result-2">
                        <span id="temp">Temperature: {weather.current.temp_c}°C</span>
                        <span>Condition: {weather.current.condition.text}</span>
                        <span>Wind Speed: {weather.current.wind_kph} kph</span>
                        <span>Wind Direction: {weather.current.wind_dir}</span>
                        <span>Humidity: {weather.current.humidity}%</span>
                        <span id="feelsTemp">Feels Like: {weather.current.feelslike_c}°C</span>
                        <span>Last Updated: {weather.current.last_updated}</span>
                        <span style={getAQIColor(weather.current.air_quality["us-epa-index"])}>AQI: {getAQIText(weather.current.air_quality["us-epa-index"])}</span>
                    </div>

                </div>
            )}
        </div>
    </div>
    );
}
export default Hero;