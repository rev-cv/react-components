export const search_types = {
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


export const show_filter_btns_for = {
    // какие фильтры актуальны для поисковых типов?
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
    land_for: [],
}