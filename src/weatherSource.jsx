import { WEATHER_BASE_URL, WEATHER_API_KEY } from "./apiConfig.js";

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
    return fetch(WEATHER_BASE_URL + 'recipes/informationBulk?ids=' + new URLSearchParams(searchTerms),
        {
            method: 'GET',
            headers: {
                'X-Mashape-Key': WEATHER_API_KEY,
            }
        }).then(processResponseACB);
}

export { getWeatherDetails };