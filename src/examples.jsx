const PLAN_EXAMPLE = {
    destination: "Paris", 
    startDate: "2023-03-28", 
    endDate: "2023-04-01"
}

const WEATHER_RESPONSE_EXAMPLE = {
    "time": [
        "2023-04-24",
        "2023-04-25",
        "2023-04-26",
        "2023-04-27",
        "2023-04-28",
        "2023-04-29"
    ],
    "apparent_temperature_max": [
        23.1,
        21.5,
        16.8,
        null,
        null,
        null
    ],
    "apparent_temperature_min": [
        12.8,
        9.9,
        6.8,
        null,
        null,
        null
    ],
    "uv_index_max": [
        6.1,
        5.75,
        6.15,
        null,
        null,
        null
    ],
    "precipitation_sum": [
        0,
        1.5,
        0,
        null,
        null,
        null
    ],
    "windspeed_10m_max": [
        15.3,
        18.5,
        17.1,
        null,
        null,
        null
    ]
}

const ITEM_EXAMPLE = {
    name: "SPF 50 Sunscreen",
    amount: "1",
    remark: "It's going to be very sunny at the beach"
}

const SUGGESTIONS_EXAMPLE = [
    {
        "name": "Down jacket/warm jacket",
        "amount": 1,
        "remark": "It's going to be quite cold. Dress warm!"
    },
    {
        "name": "SPF 50 Sunscreen",
        "amount": 1,
        "remark": "It's going to be very sunny at the beach."
    },
    {
        "name": "Umbrella",
        "amount": 1,
        "remark": "It's going to rain a lot."
    },
    {
        "name": "SPF 50 Sunscreen",
        "amount": 1,
        "remark": "It's going to be very sunny at the beach."
    }
]