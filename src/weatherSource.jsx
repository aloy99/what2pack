import { WEATHER_BASE_URL, WEATHER_API_KEY } from "./apiConfig.js";

const weatherParams = {
    'daily': 'apparent_temperature_max,apparent_temperature_min,uv_index_max,precipitation_sum,windspeed_10m_max',
    'forecast_days': 16,
    'timezone': 'auto',
}

function getWeatherDetails(searchTerms) {
    function processResponseACB(response) {
        function throwErrorACB(data) {
            throw new Error("API returned error +" + response.status + " " + data);
        }
        if (!response.ok) {
            return response.text().then(throwErrorACB);
        }
        return response.json();
    }
    return fetch(WEATHER_BASE_URL + new URLSearchParams({...searchTerms, ...weatherParams}),
        {
            method: 'GET',
            headers: {
                'X-Mashape-Key': WEATHER_API_KEY,
            }
        }).then(processResponseACB);
}

export { getWeatherDetails };