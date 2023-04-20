export const type_of_search = {
    // типы данных по которым ведется поиск
    // для отображения типов на вкладке SearchProperties.«Что искать?»
    // для отображения выбранного типа поиска в Search
    all: { 
        type: "all",
        desc: "везде",
        icon: "IcoAllSections", 
        title: "везде",
        is_active: true,
    },
    articles: {
        type: "articles",
        desc: "в статьях",
        icon: "IcoArticles",
        title: "статьи",
        is_active: true,
    },
    notes: {
        type: "notes",
        desc: "в публичных заметках",
        icon: "IcoNotes",
        title: "заметки",
        is_active: true,
    },
    collections: {
        type: "collections",
        desc: "в публичных коллекциях",
        icon: "IcoCollections",
        title: "коллекции",
        is_active: true,
    },
    taxons: {
        type: "taxons",
        desc: "в таксонах",
        icon: "IcoTaxons",
        title: "таксоны",
        is_active: true,
    },
    drugs: {
        type: "drugs",
        desc: "в препаратах для растений",
        icon: "IcoDrugs",
        title: "препараты",
        is_active: true,
    },
    fertilizers: {
        type: "fertilizers",
        desc: "в удобрениях для растений",
        icon: "IcoFertilizers",
        title: "удобрения",
        is_active: true,
    },
    plants: {
        type: "plants",
        desc: "в растениях",
        icon: "IcoPlants",
        title: "растения",
        is_active: true,
    },
    diseases: {
        type: "diseases",
        desc: "в болезнях растений",
        icon: "IcoDiseases",
        title: "болезни растений",
        is_active: true,
    },
    recipes: {
        type: "recipes",
        desc: "в кулинарных рецептах",
        icon: "IcoRecipes",
        title: "кулинарные рецепты",
        is_active: false,
    },
    asks: {
        type: "asks",
        desc: "в вопросах и ответах",
        icon: "IcoAsks",
        title: "вопросы и ответы",
        is_active: false,
    },
    users: {
        type: "users",
        desc: "среди пользователей",
        icon: "IcoUsers",
        title: "пользователи",
        is_active: false,
    },
}


////////////////////////////////////////////////////////////////////////


export const search_properties_pages = [
    // отображаемые кнопки-вкладки на SearchProperties
    { type: "find_in", title: "Искать где?" },
    { type: "tags", title: "Теги" },
    { type: "filters", title: "Фильтры для растений" },
    { type: "periods", title: "Когда актуально?" },
]


////////////////////////////////////////////////////////////////////////

const type_month = "month"
const type_decade = "month"

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
    const month_attach = [];

    ['Ⅰ', 'Ⅱ', 'Ⅲ'].map((decade, i_dec) => {
        const attach = `${month[1]}.${i_dec + 1}`
        month_attach.push(attach)
        decades.push({
            type: "month_decade",
            text: `${month[0].slice(0, 3)}.${decade}`,
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

export const periods_of_actual = [
    ...season,
    ...quarter,
    ...months,
    ...decades
]

////////////////////////////////////////////////////////////////////////

export const show_filter_btns_for = {
    tags_for: ["articles", "notes", "collections"],
    filters_for: ["plants"],
    actuals_for: [
        "articles", 
        "notes", 
        "collections", 
        "plants", 
        "drugs", 
        "fertilizers", 
        "diseases", 
        "recipes"
    ],
}