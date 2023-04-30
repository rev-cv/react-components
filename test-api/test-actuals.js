const gen = [
    ["январь", 'jan', 31],
    ["февраль", 'feb', 29],
    ["март", 'mar', 31],
    ["апрель", 'apr', 30],
    ["май", 'may', 31],
    ["июнь", 'jun', 30],
    ["июль", 'jul', 31],
    ["август", 'aug', 31],
    ["сентябрь", 'sep', 30],
    ["октябрь", 'oct', 31],
    ["ноябрь", 'nov', 30],
    ["декабрь", 'dec', 31],
]


const decades = []
const months = []

gen.map((month, i_month) => {
    const m100 = (i_month + 1) * 100;

    months.push({
        type: "month",
        text: month[0],
        request: [m100 + 1, m100 + month[2]],
        attach: [month[1], ]
    })
})


const season = ['весна', 'лето', 'осень', 'зима'].map((season, i_season) => {
    const m = i_season === 0 ? [2, 3, 4] :
        i_season === 1 ? [5, 6, 7] :
            i_season === 2 ? [8, 9, 10] :
                [11, 0, 1];

    return {
        type: "season",
        text: season,
        request: [months[m[0]].request[0], months[m[2]].request[1]],
        attach: [
            ...months[m[0]].attach,
            ...months[m[1]].attach,
            ...months[m[2]].attach,
        ]
    }
})

export const periods_of_actual = [
    ...season,
    ...months,
    ...decades
]
