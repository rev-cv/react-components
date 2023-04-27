
const example_objImg = {
    path: "путь/до/картинки_на_сервере.png",
    src: "путь/до/картинке_на_стороннем_ресурсе.png",
    thumbnail: "путь/до/mini-картинки_на_сервере.png",

    picKey: "PIC-4457",
    // ↑ код по которому картинка будет вставлена в нужное место в документе
    // актуально только для статей и не имеет отношения к самой картинке

    title: "У картинки может быть заголовок",
    description: "У картинки может быть описание",
    link: {
        "anid": "4g5t-7ert-5478-jhff-0000",
        "type_link": "url",
        "link": "https://ru.wikipedia.org/wiki/",
        "is_partner": false,
        "title": "Wikipedia",
        "message": "Вступив в 1685 году на молдавский престол, Константин Кантемир должен был по обычаям того времени послать в Константинополь заложником одного из своих сыновей, сначала старшего — Антиоха, а в 1687 г.",
        "cover": {} // objImg
    }
}

export const objImg_1 = {
    path: null,
    src: "https://semena-zakaz.ru/upload/iblock/347/b80l0gm1gfy82akd3s0uqda128gc2yjq/890c24f6_be2f_11e7_8477_9c5c8ebecd88_f7bb1293_be30_11e7_8477_9c5c8ebecd88.resize2.jpg",
    thumbnail: null,

    picKey: "PIC-4457",
    // ↑ код по которому картинка будет вставлена в нужное место в документе
    // актуально только для статей и не имеет отношения к самой картинке

    title: "Картинка №245",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    link: {
        "anid": "4g5t-7ert-5478-jhff-0000",
        "type_link": "url",
        "link": "https://ru.wikipedia.org/wiki/",
        "is_partner": false,
        "title": "Wikipedia",
        "message": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "cover": {} // objImg
    }
}

export const objImg_2 = { 
    ...objImg_1, 
    src: "https://planetaflora.ru/images/2022/04/01/golubie-cvety.jpg",
    description: "Вступив в 1685 году на молдавский престол, Константин Кантемир должен был по обычаям того времени послать в Константинополь заложником одного из своих сыновей, сначала старшего — Антиоха, а в 1687 г."

}

export const objImg_3 = {
    path: null,
    src: "https://habrastorage.org/r/w1560/webt/vn/tg/pz/vntgpzpgemeytutve-gevcpoq0e.jpeg",
    thumbnail: null,

    picKey: "PIC-4457",
    // ↑ код по которому картинка будет вставлена в нужное место в документе
    // актуально только для статей и не имеет отношения к самой картинке

    title: "",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    link: {
        "anid": "4g5t-7ert-5478-jhff-0000",
        "type_link": "url",
        "link": "https://ru.wikipedia.org/wiki/",
        "is_partner": false,
        "title": "Wikipedia",
        "message": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "cover": {} // objImg
    }
}