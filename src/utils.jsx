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

function maxIfNotNull(arr){
    let max = 0;
    for(const item of arr){
        if(item){
            if(item > max){
                max = item;
            }
        }
    }
    return max;
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
                remark: "Stay cool."
            },
            {
                name: "sandals/flip-flops",
                amount: 1,
                remark: "Keep your feet cool."
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
                name: "Windproof jacket",
                amount: 1,
                remark: "It's going to be very windy."
            }
        ]
    );
}

function suggestFromUV(uvs){
    const uv_mean = meanIfNotNull(uvs);
    if (uv_mean < 3){
        return (
            [ 
                {
                    name: "Sunscreen SPF 15+",
                    amount: 1,
                    remark: "Low UV index. Minimal sun protection required."
                },
                {
                    name: "Sunglasses",
                    amount: 1,
                    remark: "Wear sunglasses to protect your eyes."
                }
            ]
        )
    }
    else if (uv_mean < 6){
        return (
            [ 
                {
                    name: "Sunscreen SPF 30+",
                    amount: 1,
                    remark: "Moderate UV index. Take precautions."
                },
                {
                    name: "Sunglasses",
                    amount: 1,
                    remark: "Wear sunglasses to protect your eyes."
                },
                {
                    name: "Sunhat",
                    amount: 1,
                    remark: "Cover your face."
                }
            ]
        );
    }
    else if (uv_mean < 8){
        return (
            [ 
                {
                    name: "Sunscreen SPF 50",
                    amount: 1,
                    remark: "High UV index."
                },
                {
                    name: "Sunglasses",
                    amount: 1,
                    remark: "Wear sunglasses to protect your eyes."
                },
                {
                    name: "Sun protective clothing",
                    amount: 1,
                    remark: "Seek shade if necessary."
                }
            ]
        );
    }
    else if (uv_mean < 10){
        return (
            [ 
                {
                    name: "SPF 50 Sunscreen",
                    amount: 1,
                    remark: "Very high UV index. Take precautions."
                },
                {
                    name: "Sunglasses",
                    amount: 1,
                    remark: "Wear sunglasses to protect your eyes."
                },
                {
                    name: "Sun protective clothing",
                    amount: 1,
                    remark: "To protect your skin from sunburn. Seek shade if necessary."
                }
            ]
        );
    }
    else {
        return (
            [
                {
                    name: "SPF 50 Sunscreen",
                    amount: 1,
                    remark: "Extremely high UV index. Avoid the sun between 11 am and 4 pm."
                },
                {
                    name: "Sunglasses",
                    amount: 1,
                    remark: "Wear sunglasses to protect your eyes."
                },
                {
                    name: "Sun protective clothing",
                    amount: 1,
                    remark: "Unprotected skin can burn in minutes. Take full precations or seek shade."
                }
            ]
        )
    }
}

function suggestFromPrecipitation(pres){
    const pres_max = maxIfNotNull(pres);
    if (pres_max < 0.2){
        return (
            [
                {
                    name: "No umbrella needed",
                    amount: 1,
                    remark: "It's not going to rain during this period."
                }
            ]
        );        
    }
    else if (pres_max < 4){
        return (
            [
                {
                    name: "Umbrella",
                    amount: 1,
                    remark: "Light rain during this period."
                }
            ]
        );     
    }
    else if (pres_max < 9){
        return (
            [
                {
                    name: "Umbrella",
                    amount: 1,
                    remark: "Moderate rain during this period."
                }
            ]
        );     
    }
    else if (pres_max < 40){
        return (
            [
                {
                    name: "Umbrella",
                    amount: 1,
                    remark: "Heavy rain during this period."
                },
                {
                    name: "Poncho",
                    amount: 1,
                    remark: "Keep you dry when you are out there."
                }
            ]
        );     
    }
    else{
        return (
            [
                {
                    name: "Umbrella",
                    amount: 1,
                    remark: "Violent rain. We suggest you to stay indoors."
                },
                {
                    name: "Poncho",
                    amount: 1,
                    remark: "Be ready to get wet."
                }
            ]
        );     
    }
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

export {suggestACB};