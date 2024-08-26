import axios from "axios";

const APP_ID = "0eebd1fcf852d29ca0340c5c451d4c9a"
const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast"
const UNITS = "metric"
const LANG = "es"

async function getCityForecast(lat, lon){
    try {
        const response = await axios.get(`${FORECAST_URL}?appid=${APP_ID}&units=${UNITS}&lang=${LANG}&lat=${lat}&lon=${lon}`);
        return response.data;
    } catch (error) {
        console.log("Error getting forecast from OpenWeather API: ", error);
        return null;
    }
}

export { getCityForecast };