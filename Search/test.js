 

// Array.prototype.isIncluded = function (a) {
//     var hash = this.reduce(function (acc, i) { acc[i] = true; return acc; }, {});
//     return a.every(function (i) { return i in hash; });
// };

// console.log(
// 	[1,2,3,4,5,6].isIncluded([5,3,4, 12])
// )


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

gen.map( (month, i_month) => {
	const m100 = (i_month + 1) * 100;
	const month_attach = [];

    ['Ⅰ', 'Ⅱ', 'Ⅲ'].map( (decade, i_dec) => {
    	const attach = `${month[1]}.${i_dec+1}`
    	month_attach.push(attach)
        decades.push({
            type: "month_decade",
            text: `${month[0].slice(0, 3)} (${decade})`,
            request: decade === 'Ⅰ' ? [m100 + 1, m100 + 10] : 
            		decade === 'Ⅱ' ? [m100 + 11, m100 + 20] : 
            			[m100 + 21, m100 + month[2]],
            attach: [attach]
        })
    })

    months.push({
    	type: "month",
    	text: month[0],
    	request: [m100 + 1, m100 + month[2]],
    	attach: month_attach
    })
})


const quarter = ['1 квартал', '2 квартал', '3 квартал', '4 квартал'].map((qua, i_qua) => {
	const m = i_qua === 0 ? [0, 1, 2] :
			i_qua === 1 ? [3, 4, 5] :
			i_qua === 2 ? [6, 7, 8] :
			[9, 10, 11];

	return {
		type: "quarter",
		text: qua,
		request: [months[m[0]].request[0], months[m[2]].request[1]],
		attach: [
			...months[m[0]].attach,
			...months[m[1]].attach,
			...months[m[2]].attach,
		]
	}
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

console.log([
	...season,
	...quarter,
	...months,
	...decades
])