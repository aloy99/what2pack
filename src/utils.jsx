function meanIfNotNull(arr){
    let sum = 0;
    let cnt = 0;
    for(const item of arr){
        if(item){
            sum += item;
            cnt ++;
        }
    }
    return (cnt === 0) ? undefined : sum / cnt;
}

function countDaysBetween(start, end){
    const date_start = new Date(start);
    const date_end = new Date(end);
    const diff = date_end.getTime() - date_start.getTime();
    console.log(diff);
    return diff;
}

function suggestFromTemperature(temps_max, temps_min){
    const temp_max_mean = meanIfNotNull(temps_max);
    const temp_min_mean = meanIfNotNull(temps_min);
    if(temp_max_mean > 30){
        return(
        [
            {
                name: "T-shirt",
                amount: 1,
                remark: "It's going to be very hot. Take enough clothes with you for change."
            },
            {
                name: "shorts",
                amount: 1,
                remark: "Help you stay cool."
            }
        ]);
    }
    else if(temp_max_mean > 20){
        return(
            [
                {
                    name: "T-shirt",
                    // amount: countDaysBetween(searchParams.startDate, searchParams.endDate).toString(),
                    amount: 1,
                    remark: "Nice temperature."
                }
            ]);
    }
    else if(temp_max_mean > 10){
        return(
        [
            {
                name: "Jacket",
                amount: 1,
                remark: "It's going to be a bit chilly."
            }
        ]);
    }
    else if(temp_min_mean > 0){
        return(
        [
            {
                name: "Down jacket/warm jacket",
                amount: 1,
                remark: "It's going to be quite cold. Dress warm!"
            }
        ]);
    }
    else{
        return(
        [
            {
                name: "Thick down jacket/very warm jacket",
                amount: 1,
                remark: "It's going to be very very cold. Make sure that you dress very warm!"
            },
            {
                name: "Thick shoes",
                amount: 1,
                remark: "Keep your feet warm."
            }
        ]);
    }
}

function suggestFromWind(winds){
    //TODO: complete the rules.
    return (
        [
            {
                name: "SPF 50 Sunscreen",
                amount: 1,
                remark: "It's going to be very sunny at the beach."
            },
            {
                name: "Umbrella",
                amount: 1,
                remark: "It's going to rain a lot."
            }
        ]
    );
}

function suggestFromUV(uvs){
    //TODO: complete the rules.
    return (
        [
            {
                name: "SPF 50 Sunscreen",
                amount: 1,
                remark: "It's going to be very sunny at the beach."
            }
        ]
    );
}

function suggestFromPrecipitation(pres){
    //TODO: complete the rules.
    return (
        [
            {
                name: "Umbrella",
                amount: 1,
                remark: "It's going to rain a lot."
            }
        ]
    );
}

function suggestACB(weather_data){
    const temps_max = weather_data.apparent_temperature_max;
    const temps_min = weather_data.apparent_temperature_min;
    const winds = weather_data.windspeed_10m_max;
    const uvs = weather_data.uv_index_max;
    const precipitations = weather_data.precipitation_sum;
    const suggestions = [...new Set([...suggestFromTemperature(temps_max, temps_min),
                        ...suggestFromWind(winds),
                        ...suggestFromUV(uvs),
                        ...suggestFromPrecipitation(precipitations)])];
    console.log(suggestions);
    return suggestions;
}

export {suggestACB}