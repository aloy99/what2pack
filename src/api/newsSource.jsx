import { NEWS_BASE_URL, NEWS_API_KEY, NEWS_API_HOST } from "../apiConfig.jsx";  

const newsParams = {
    'count': 8,
    'safeSearch': 'Moderate',
    'freshness': 'week',
    'sortBy': 'date',
    'setLang': 'en',
    'mkt': 'en-GB'
}

function getNewsDetails(searchTerms) { 
    function processResponseACB(response) {
        function throwErrorACB(data) {
            throw new Error("API returned error +" + response.status + " " + data);
        }
        if (!response.ok) {
            return response.text().then(throwErrorACB);
        }
        return response.json();
    }

    function getNewsACB(json_response) {
        const result = json_response.value;
        return result;
    }

    return fetch(NEWS_BASE_URL + new URLSearchParams({'q':searchTerms.destination.split(', ').join(' '), ...newsParams}),
        {
            method: 'GET',
            headers: {
                'X-BingApis-SDK': true,
                'X-RapidAPI-Host': NEWS_API_HOST,
                'X-RapidAPI-Key': NEWS_API_KEY,},
            redirect: 'follow'
        }).then(processResponseACB).then(getNewsACB);
}

export { getNewsDetails };