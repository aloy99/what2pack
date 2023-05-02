import { UNSPLASH_BASE_URL, UNSPLASH_API_KEY } from "../apiConfig.jsx";

const unsplashParams = {
    'count': 1,
    'client_id': UNSPLASH_API_KEY
}

function getUnsplashImages(searchTerms) { 
    function processResponseACB(response) {
        function throwErrorACB(data) {
            throw new Error("API returned error +" + response.status + " " + data);
        }
        if (!response.ok) {
            return response.text().then(throwErrorACB);
        }
        return response.json();
    }

    function getImageURLACB(json_response) {
        return json_response[0].urls.small;
    }

    return fetch(UNSPLASH_BASE_URL + new URLSearchParams({'query':searchTerms.destination.split(', ').join(' ')+'travel', ...unsplashParams}),
        {
            method: 'GET',
            redirect: 'follow'
        }).then(processResponseACB).then(getImageURLACB);
}

export { getUnsplashImages };