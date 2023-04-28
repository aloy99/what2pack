import { NEWS_BASE_URL, NEWS_API_KEY } from "./apiConfig.jsx";  

const newsParams = {
    'sortBy': 'popularity',
    'language': 'en',
    'excludeDomains':'nerdwallet.com, nature.com, thepointsguy.com, wired.com, techcrunch.com, engadget.com'
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
        return json_response;
    }


    var earliestDate = new Date();
    earliestDate.setDate(earliestDate.getDate()-14);
    console.log(earliestDate.toISOString().split('T')[0]);
    return fetch(NEWS_BASE_URL + new URLSearchParams({'from': earliestDate.toISOString().split('T')[0], 'q':searchTerms.destination.split(', ').join(' '), ...newsParams}),
        {
            method: 'GET',
            headers: {
                'X-Api-Key': NEWS_API_KEY,},
            redirect: 'follow'
        }).then(processResponseACB).then(getNewsACB);
}

export { getNewsDetails };