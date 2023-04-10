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

function suggestFromTemperature(temps_max, temps_min, searchParams){
    const temp_max_mean = meanIfNotNull(temps_max);
    const temp_min_mean = meanIfNotNull(temps_min);
    if(temp_max_mean > 30){
        return(
        [
            {
                name: "T-shirt",
                amount: countDaysBetween(searchParams.startDate, searchParams.endDate).toString(),
                remark: "It's going to be very hot in " + searchParams.destination + ". Take enough clothes with you for change."
            },
            {
                name: "shorts",
                amount: countDaysBetween(searchParams.startDate, searchParams.endDate).toString(),
                remark: "Help you stay cool."
            }
        ]);
    }
    else if(temp_max_mean > 20){
        return(
            [
                {
                    name: "T-shirt",
                    amount: countDaysBetween(searchParams.startDate, searchParams.endDate).toString(),
                    remark: "Nice temperature in" + searchParams.destination + "."
                }
            ]);
    }
    else if(temp_max_mean > 10){
        return(
        [
            {
                name: "Jacket",
                amount: "1",
                remark: "It's going to be a bit chilly in " + searchParams.destination + "."
            }
        ]);
    }
    else if(temp_min_mean > 0){
        return(
        [
            {
                name: "Down jacket/warm jacket",
                amount: "1",
                remark: "It's going to be quite cold in " + searchParams.destination + ". Dress warm!"
            }
        ]);
    }
    else{
        return(
        [
            {
                name: "Thick down jacket/very warm jacket",
                amount: "1",
                remark: "It's going to be very very cold in " + searchParams.destination + ". Make sure that you dress very warm!"
            },
            {
                name: "Thick shoes",
                amount: "1",
                remark: "Keep your feet warm."
            }
        ]);
    }
}

function suggestFromWind(winds, searchParams){
    //TODO: complete the rules.
    return (
        [
            {
                name: "SPF 50 Sunscreen",
                amount: "1",
                remark: "It's going to be very sunny at the beach of " + searchParams.destination
            },
            {
                name: "Umbrella",
                amount: "1",
                remark: "It's going to rain a lot in " + searchParams.destination
            }
        ]
    );
}

function suggestFromPrecipitation(pres, searchParams){
    //TODO: complete the rules.
    return (
        [
            {
                name: "SPF 50 Sunscreen",
                amount: "1",
                remark: "It's going to be very sunny at the beach of " + searchParams.destination
            },
            {
                name: "Umbrella",
                amount: "1",
                remark: "It's going to rain a lot in " + searchParams.destination
            }
        ]
    );
}

export {suggestFromTemperature, suggestFromWind, suggestFromPrecipitation}