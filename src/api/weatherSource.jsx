import { WEATHER_BASE_URL } from "../apiConfig.jsx";
import dayjs from 'dayjs';

const weatherParams = {
    'daily': 'apparent_temperature_max,apparent_temperature_min,uv_index_max,precipitation_sum,windspeed_10m_max',
    'forecast_days': 16,
    'timezone': 'auto',
}

function getWeatherDetails(searchTerms) { //handle destination name, start and end dates, remove them from url search params, then truncate results based on dates
    function processResponseACB(response) {
        function throwErrorACB(data) {
            throw new Error("API returned error +" + response.status + " " + data);
        }
        if (!response.ok) {
            return response.text().then(throwErrorACB);
        }
        return response.json();
    }

    function getDaysACB(json_response) {
        const dailyData = json_response.daily;
        //create time array with days
        
        var getDaysArray = function(start, end) {
            for(var arr=[],dt=new Date(start); dt<=new Date(end); dt.setDate(dt.getDate()+1)){
                arr.push(dayjs(new Date(dt)).format('YYYY-MM-DD'));
            }
            return arr;
        };
        const timeArray = getDaysArray(searchTerms.startDate, searchTerms.endDate)
        var output = {
            'time': timeArray
        };

        var timeDays = output.time.length;

        const startIndex = dailyData.time.indexOf(searchTerms.startDate);
        const endIndex = dailyData.time.indexOf(searchTerms.endDate);
        function sliceArraysCB(arr){
            return arr.slice(startIndex, endIndex+1)
        }
        for (const key of Object.keys(dailyData)) {
            if (key !== 'time'){
                output[key] = new Array(timeDays).fill(); //create null array of length instead
                for (let i = 0; i < timeDays; i++) {
                    const currIndex = dailyData.time.indexOf(output.time[i]);
                    if (currIndex !== -1) {
                        output[key][i] = dailyData[key][currIndex];
                    }
                }
            }
        }
        // console.log(output);
        return output;
    }


    return fetch(WEATHER_BASE_URL + new URLSearchParams({...searchTerms.latlng, ...weatherParams}),
        {
            method: 'GET',
            redirect: 'follow'
        }).then(processResponseACB).then(getDaysACB);
}

export { getWeatherDetails };