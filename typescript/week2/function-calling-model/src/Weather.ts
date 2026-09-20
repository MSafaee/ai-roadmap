import { fetchWeatherApi } from "openmeteo";

const search_url = "https://geocoding-api.open-meteo.com/v1/search?";
const forcast_url = "https://api.open-meteo.com/v1/forecast";

const data = ["temperature_2m", "is_day", "weather_code"];

export async function getLocation(city: string, country?: string) { 

    const locationName = country? `${city}, ${country}`: city;

    const url = new URL(search_url);
    url.searchParams.set("name", locationName);
    url.searchParams.set("count", "5");
    url.searchParams.set("format", "json");

    const response = await fetch(url);

    if (!response.ok) {
        const error = await response.text();
        throw new Error(
            `Geocoding failed: ${response.status} ${error}`
        );
    }

    const data = await response.json();
    const location = data.results?.[0];

    if (!location) throw new Error("Location not found");
    return { latitude: location.latitude, longitude: location.longitude };
}

export async function getWeather(city: string, country?: string) {

    const location = await getLocation(city, country);
    const params = { latitude: location.latitude, longitude: location.longitude, current: data };

    const responses = await fetchWeatherApi(forcast_url, params);
    const currentWeather = responses[0];

    if (!currentWeather) throw new Error("No weather data for this location");

    return JSON.stringify({
        temperature: currentWeather.current()?.variables(0)?.value(),
        isDay: currentWeather.current()?.variables(1)?.value(),
        weatherCode: currentWeather.current()?.variables(2)?.value()
    });
}