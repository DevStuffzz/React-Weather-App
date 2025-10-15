export interface WeatherData {
  hourly: {
    temperature_2m: number[];
    precipitation_probability: number[];
    time: string[];
  };
  current_weather?: {
    temperature: number;
    windspeed: number;
    weathercode: number;
  };
}

const BASE_URL = "https://api.open-meteo.com/v1/forecast";

/**
 * Fetch hourly weather data for a given city
 */
export async function getWeather(lat: number, lon: number, unit: "celsius" | "fahrenheit" = "celsius"): Promise<WeatherData> {
  const tempParam = unit === "fahrenheit" ? "temperature_2m" : "temperature_2m";
  const url = `${BASE_URL}?latitude=${lat}&longitude=${lon}&hourly=${tempParam},precipitation_probability&current_weather=true&temperature_unit=${unit}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }

  return await response.json();
}

/**
 * Mock or simple placeholder for weather alerts.
 * Open-Meteo provides limited disaster data unless using specific endpoints.
 */
export async function getAlerts(lat: number, lon: number): Promise<string[]> {
  // For now, we’ll simulate alerts — you could later replace this with
  // an API like Meteoalarm or Weather.gov alerts API.
  const fakeAlerts: string[] = [];
  
  // Simple random alert example
  if (Math.random() < 0.2) fakeAlerts.push("⚠️ Thunderstorm Warning");
  if (Math.random() < 0.1) fakeAlerts.push("🌪️ Tornado Watch");
  if (Math.random() < 0.05) fakeAlerts.push("🔥 Heat Advisory");

  return fakeAlerts;
}

/**
 * Convert Celsius to Fahrenheit
 */
export function convertTemp(value: number, unit: "celsius" | "fahrenheit"): number {
  return unit === "celsius" ? value : (value * 9) / 5 + 32;
}

/**
 * Helper to format times in local user-friendly style
 */
export function formatTime(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}
