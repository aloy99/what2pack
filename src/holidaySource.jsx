import { HOLIDAYS_BASE_URL, HOLIDAYS_API_KEY } from "./apiConfig.jsx";
import dayjs from 'dayjs';

const holidayParams = {
}

function getHolidayDetails(searchTerms) { 
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

        function filterDatesACB(holidays) {
            return (holidays["date"] <= searchTerms.endDate && holidays["date"] >= searchTerms.startDate)
        }

        return json_response.filter(filterDatesACB);
    }

    console.log({'year': 2023, 'country':searchTerms.destination.split(', ').slice(-1), ...holidayParams})
    return fetch(HOLIDAYS_BASE_URL + new URLSearchParams({'year': 2023, 'country':searchTerms.destination.split(', ').slice(-1), ...holidayParams}),
        {
            method: 'GET',
            headers: {'X-Api-Key': HOLIDAYS_API_KEY},
            contentType: 'application/json',
            redirect: 'follow'
        }).then(processResponseACB).then(getDaysACB);
}

export { getHolidayDetails };