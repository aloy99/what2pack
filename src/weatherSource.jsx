import { WEATHER_BASE_URL } from "./apiConfig.jsx";

const weatherParams = {
    'daily': 'apparent_temperature_max,apparent_temperature_min,uv_index_max,precipitation_sum,windspeed_10m_max',
    'forecast_days': 16,
    'timezone': 'auto',
}

function getWeatherDetails(searchTerms) { //handle start and end dates, remove them from url search params, then truncate results based on dates
    function processResponseACB(response) {
        function throwErrorACB(data) {
            throw new Error("API returned error +" + response.status + " " + data);
        }
        if (!response.ok) {
            return response.text().then(throwErrorACB);
        }
        return response.json().daily;
    }

    function getDaysACB(dailyData) {
        const startIndex = dailyData.findIndex(searchTerms.startDate)
        const endIndex = dailyData.findIndex(searchTerms.endDate)
        function sliceArraysCB(arr){
            return arr.slice(startIndex, endIndex+1)
        }
        for (const key in Object.keys(dailyData)) {
            dailyData.key = sliceArraysCB(dailyData.key)
        }    
    }


    return fetch(WEATHER_BASE_URL + new URLSearchParams({...searchTerms, ...weatherParams}),
        {
            method: 'GET',
            redirect: 'follow'
        }).then(processResponseACB).then(getDaysACB);
}

export { getWeatherDetails };