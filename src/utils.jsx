const thresholdPrecipitation = [0.2, 4, 9, 40];

function isPlanEqual(planA, planB){
    return planA.destination === planB.destination
    && planA.startDate === planB.startDate
    && planA.endDate === planB.endDate;
}

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
    if(temp_max_mean > 30){
        return(
        [
            {
                name: "T-shirt",
                amount: 1,
                remark: "👕"
            },
            {
                name: "shorts",
                amount: 1,
                remark: "🩳"
            },
            {
                name: "sandals/flip-flops",
                amount: 1,
                remark: "🩴"
            }
        ]);
    }
    else if(temp_max_mean > 20){
        return(
            [
                {
                    name: "T-shirt",
                    amount: 1,
                    remark: "👕"
                }
            ]);
    }
    else if(temp_max_mean > 10){
        return(
        [
            {
                name: "Jacket",
                amount: 1,
                remark: "🧥"
            },
            {
                name: "T-shirt",
                amount: 1,
                remark: "👕"
            }
        ]);
    }
    else if(temp_max_mean > 0){
        return(
        [
            {
                name: "Down jacket/warm jacket",
                amount: 1,
                remark: "🧥"
            }
        ]);
    }
    else{
        return(
        [
            {
                name: "Thick down jacket/very warm jacket",
                amount: 1,
                remark: "🧥"
            },
            {
                name: "Thick shoes",
                amount: 1,
                remark: "🥾"
            }
        ]);
    }
}

function suggestFromWind(winds){
    const winds_max = maxIfNotNull(winds);
    if (winds_max < 15){
        return (
            [
                {
                    name: "Windproof clothing",
                    amount: 0,
                    remark: "😌"
                }
            ]
        );
    }
    else if (winds_max < 30){
        return (
            [
                {
                    name: "Hat",
                    amount: 1,
                    remark: "🥶"
                }
            ]
        );
    }
    else if (winds_max < 45){
        return (
            [
                {
                    name: "Hat",
                    amount: 1,
                    remark: "🥶"
                },
                {
                    name: "Windproof jacket",
                    amount: 1,
                    remark: "🍃"
                }
            ]
        );
    }
    else {
        return (
            [
                {
                    name: "Hat",
                    amount: 1,
                    remark: "🥶"
                },
                {
                    name: "Windproof jacket",
                    amount: 1,
                    remark: "🍃"
                },
                {
                    name: "Scarf",
                    amount: 1,
                    remark: "🧣"
                }
            ]
        );
    }
}

function suggestFromUV(uvs){
    const uv_mean = meanIfNotNull(uvs);
    if (uv_mean < 3){
        return (
            [ 
                {
                    name: "Sunscreen SPF 15+",
                    amount: 1,
                    remark: "⛅"
                },
                {
                    name: "Sunglasses",
                    amount: 1,
                    remark: "😎"
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
                    remark: "🌤️"
                },
                {
                    name: "Sunglasses",
                    amount: 1,
                    remark: "😎"
                },
                {
                    name: "Sunhat",
                    amount: 1,
                    remark: "👒"
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
                    remark: "☀️"
                },
                {
                    name: "Sunglasses",
                    amount: 1,
                    remark: "😎"
                },
                {
                    name: "Sun protective clothing",
                    amount: 1,
                    remark: "🥵"
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
                    remark: "☀️"
                },
                {
                    name: "Sunglasses",
                    amount: 1,
                    remark: "😎"
                },
                {
                    name: "Sun protective clothing",
                    amount: 1,
                    remark: "🥵"
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
                    remark: "🥵"
                },
                {
                    name: "Sunglasses",
                    amount: 1,
                    remark: "😎"
                },
                {
                    name: "Sun protective clothing",
                    amount: 1,
                    remark: "🥵"
                }
            ]
        )
    }
}

function suggestFromPrecipitation(pres){
    const pres_max = maxIfNotNull(pres);
    if (pres_max < thresholdPrecipitation[0]){
        return (
            [
                {
                    name: "Umbrella",
                    amount: 0,
                    remark: "🌞"
                }
            ]
        );        
    }
    else if (pres_max < thresholdPrecipitation[2]){
        return (
            [
                {
                    name: "Umbrella",
                    amount: 1,
                    remark: "☔"
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
                    remark: "☔"
                },
                {
                    name: "Poncho",
                    amount: 1,
                    remark: "🌧️"
                }
            ]
        );     
    }
}

function suggestACB(response){
    const weather_data = response[0];
    const holiday_data = response[1];
    const news_data = response[2];
    const unsplash_data = response[3];
    const temps_max = weather_data.apparent_temperature_max;
    const temps_min = weather_data.apparent_temperature_min;
    const winds = weather_data.windspeed_10m_max;
    const uvs = weather_data.uv_index_max;
    const precipitations = weather_data.precipitation_sum;
    const times = weather_data.time;
    // const suggestions_concat = suggestFromTemperature(temps_max, temps_min).concat(suggestFromWind(winds))
    //                                                                        .concat(suggestFromUV(uvs))
    //                                                                        .concat(suggestFromPrecipitation(precipitations));
    // // filter out the items with the same name                                                                
    // const suggestions = [...new Map(suggestions_concat.map(s => [s['name'], s])).values()];
    // console.log(weather_data)
    let weathers = [];
    times.forEach((time, i) => {
        weathers.push({
            i: i,
            time: time.split('-').slice(-1),
            temp_max: temps_max[i],
            temp_min: temps_min[i],
            precipitation: precipitations[i],
            uv: uvs[i]
        });
    });
    // console.log(weathers)
    // get packing suggestions from all weather perspectives
    const suggestions = [...new Set([...suggestFromTemperature(temps_max, temps_min),
        ...suggestFromWind(winds),
        ...suggestFromUV(uvs),
        ...suggestFromPrecipitation(precipitations)])];
    for (let suggestion of suggestions) {
        suggestion.ifPacked = false;
    }
    for (let i = 0; i < suggestions.length; i++) {
        suggestions[i].index = i;
    }
    return {'weathers':weathers, 'items':suggestions, 'holidays':holiday_data, 'news':news_data, 'image':unsplash_data};
}

export {isPlanEqual, thresholdPrecipitation, suggestACB};