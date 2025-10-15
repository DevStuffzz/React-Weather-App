import { useState } from "react";
import axios from "axios";
import Chart from "../components/Chart";
import UnitSwitch from "../components/UnitSwitch";
import AlertsPanel from "../components/AlertsPanel";
import SearchBar from "../components/SearchBar";
import { getAlerts } from "../utils/weatherUtils";
import { cToF } from "../utils/conversions";

interface WeatherData {
  time: string[];
  temperature_2m: number[];
  precipitation_probability: number[];
  weathercode: number[];
  windspeed_10m: number[];
}

export default function Dashboard() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [locationName, setLocationName] = useState("");
  const [unit, setUnit] = useState<"C" | "F">("C");
  const [loading, setLoading] = useState(false);
  const [alerts, setAlerts] = useState<string[]>([]);
async function fetchWeather() {
  try {
    setLoading(true);

    // 1️⃣ Geocode city
    const geoRes = await axios.get(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}`
    );

    const results = geoRes.data.results;
    if (!results || results.length === 0) {
      alert("No results found for that city. Try another name.");
      setWeather(null);
      setAlerts([]);
      return;
    }

    const { latitude, longitude, name, admin1, country } = results[0];
    const fullName = [name, admin1, country].filter(Boolean).join(", ");
    setLocationName(fullName);

    // 2️⃣ Fetch hourly weather
    const res = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,precipitation_probability,weathercode,windspeed_10m&forecast_days=1`
    );

    const data = res.data.hourly;
    if (!data?.time) {
      console.warn("No hourly data returned.");
      setWeather(null);
      return;
    }

    const sliced: WeatherData = {
      time: data.time.slice(0, 12),
      temperature_2m: data.temperature_2m.slice(0, 12),
      precipitation_probability: data.precipitation_probability.slice(0, 12),
      weathercode: data.weathercode.slice(0, 12),
      windspeed_10m: data.windspeed_10m.slice(0, 12),
    };

    setWeather(sliced);

    // 3️⃣ Fetch alerts (mock or from your utils)
    const alertsData = await getAlerts(latitude, longitude);
    setAlerts(alertsData);

  } catch (err) {
    console.error("Error fetching weather:", err);
    alert("Failed to fetch weather data. Please try again later.");
  } finally {
    setLoading(false);
  }
}


  const chartData =
    weather?.time.map((t, i) => ({
      time: new Date(t).getHours() + ":00",
      temp:
        unit === "C"
          ? weather.temperature_2m[i]
          : cToF(weather.temperature_2m[i]),
      rain: weather.precipitation_probability[i],
    })) || [];

  return (
    <div className="max-w-4xl mx-auto mt-10 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Weather Dashboard</h1>
        <UnitSwitch unit={unit} setUnit={setUnit} />
      </div>

      <SearchBar
        city={city}
        setCity={setCity}
        onSearch={fetchWeather}
        loading={loading}
      />

      {weather && (
        <>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">{locationName}</h2>
            <Chart data={chartData} unit={unit} />
          </div>
          <AlertsPanel alerts={alerts} />
        </>
      )}
    </div>
  );
}
