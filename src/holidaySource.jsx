import { HOLIDAYS_BASE_URL, HOLIDAYS_API_KEY } from "./apiConfig.jsx";
import dayjs from 'dayjs';

const holidayParams = {
    'type': 'major_holiday'
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

        var date_check = {}
        function filterDatesCB(holidays) {
            if (holidays.date in date_check){
                return false;
            }
            date_check[holidays.date] = true;
            return (holidays["date"] <= searchTerms.endDate && holidays["date"] >= searchTerms.startDate)
        }

        function sortDatesCB(holidayA, holidayB){
            if (holidayA['date'] > holidayB['date']){
                return 1;
            }
            return -1;
        }

        json_response.sort(sortDatesCB);

        return json_response.filter(filterDatesCB);
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