import React, { useState, useEffect } from "react";
import Button from "Button.jsx";
import ButtonContainer from "ButtonContainer.jsx";
import TagContainer from "TagContainer.jsx";
import 'SearchProperties.sass';


import { search_types } from "test-search-types.js";
import { search_page_btns } from "test-serach-page-btns.js";
import { periods_of_actual } from "test-actuals.js";


Array.prototype.arrayIncluded = function (a) {
    var hash = this.reduce(function (acc, i) { acc[i] = true; return acc; }, {});
    return a.every(function (i) { return i in hash; });
};


export default ({ 
        isOpenSP,           // открытали страница?
        toogleOpenSP,       // функция для управление открытием / закрытием страницы
        typeOfSearch,       // какой тип информации ищется?
        setTypeOfSearch,    // функция установки типа искомой информации
        tabs,               // какие вкладки отображаются и какая вкладка открыта?
        updateVisibleTabs,  // обновление статуса вкладок → tabs
        getVisibleTabs,     // генерация отображаемых вкладок и того какая вкладка открыта
        refSearchPanel,     // ref для searc-panel

        attachedActuals,    // прикрепленные периоды актуальности
        setAttachActuals,   // функция для прикрепления периодов актуальности
        attachedPlantFilters,// прикрепленные фильтры растений
        setPlantFilters,    // функция для прикрепления фильтров растений
        attachedTags,       // прикрепленные теги контента
        setTags,            // функция для прикрепления тегов контента
    }) => {

    const [isHideDecade, setStatDeacade] = useState(true)


    const changeActuals = (actual) => {
        setAttachActuals(
            attachedActuals.arrayIncluded(actual) ?
                attachedActuals.filter(item => !actual.includes(item))
                :
                [ ...new Set([...attachedActuals, ...actual]) ]
        )

    }


    const changePosition = () => {
        if (refSearchPanel.current == undefined) return {}
        return {
            top: `calc(
            ${refSearchPanel.current.offsetHeight + refSearchPanel.current.offsetTop}px
            + 0.5em * 2`,
            // ↑ .5em — margin для .search-panel
            left: `calc(${refSearchPanel.current.offsetLeft}px)`,
            width: `calc(${refSearchPanel.current.offsetWidth}px - 1.5em * 2)`,
            // ↑ 1.5em — margins left/right заданные в .search-properties
        }
    }

    const [stylePos, setStylePos] = useState(changePosition());

    useEffect(() => {
        if (isOpenSP){
            // ↓ меняет положение и геометрию .search-properties при открытии панели
            setStylePos(changePosition());
            // ↓ меняет положение и геометрию .search-properties при изменении окна
            window.onresize = () => { setStylePos(changePosition()) };
        } else {
            window.onresize = false
        }
        return () => { window.onresize = false };
    }, [isOpenSP]);


    const setMenuSearchProps = () => {
        return search_page_btns.map((item, index, array) => {
            const isActive = Object.keys(tabs).includes(item.type)
            const cl_for_it = []
            if (!isActive) cl_for_it.push("disable")
            if (tabs[item.type]) cl_for_it.push("select")

            return <Button

                key={`search-props-btn-pages-${index}`}

                className={cl_for_it.join(" ")}

                onBtnClick={isActive ? e => {
                    updateVisibleTabs(
                        getVisibleTabs(item.type)
                    )
                } : null}

                >{item.title}
            </Button>
        })
    }


    const setFilterTimingActual = () => {
        const result = []
        const arrr = ["season", "month"]

        arrr.map(key => {
            if (key === "season"){
                result.push(
                    <div 
                        className="search-properties__when__title"
                        key={`search-props-when-search-title${key}`}
                        > Выбрать актуальный сезон
                    </div>
                )
            } else if (key === "month"){
                result.push(
                    <div
                        className="search-properties__when__title"
                        key={`search-props-when-search-title${key}`}
                        >Выбрать актуальные месяцы
                    </div>
                )
            }

            result.push(
                <div
                    className="search-properties__when__stack"
                    key={`.search-properties__when > .stack > ${key}`}
                    > {
                        periods_of_actual
                            .filter(item => item.type === key)
                            .map((item, index, array) => (

                                <Button

                                    key={`search-props-when-search-${item.text}`}

                                    classList={[
                                        attachedActuals.arrayIncluded(item.attach) ?
                                            'select' : null
                                    ]}

                                    onBtnClick={e => changeActuals(item.attach)}

                                    >{item.text}

                                </Button>
                            ))
                    }
                </div>
            )
    
        })

        console.log(result)

        return result
    }


    return <div 
        className={isOpenSP ? "search-properties" : "search-properties closing"}
        style={stylePos}
        >
            
            {/* КНОПКИ ПЕРЕКЛЮЧЕНИЯ СТРАНИЦ */}
            <ButtonContainer className="search-properties__btns" >
                {setMenuSearchProps()}
            </ButtonContainer>

            {
                /* ОТОБРАЖЕНИЕ СТРАНИЦЫ С «ЧТО ИСКАТЬ» */

                !tabs.find_in ? null :

                    <div className="search-properties__what"> 
                        {
                            Object.values(search_types).map((item, index, array) => (

                                <Button

                                    key={`.search-properties > .what > ${index}`}

                                    classList={[
                                        item.type === typeOfSearch ? 'select' : null,
                                        item.type === "all" ? 'select_how_all' : null,
                                    ]}

                                    icon={item.icon}

                                    onBtnClick={e => {
                                        setTypeOfSearch(item.type)
                                        updateVisibleTabs(
                                            getVisibleTabs(
                                                tabs.tags ? "tags"
                                                    : tabs.filters ? "filters"
                                                    : tabs.periods ? "periods" : "find_in",
                                                item.type
                                            )
                                        )
                                    }}

                                    >{item.desc}

                                </Button>
                                
                            ))
                        }
                        
                    </div>
            }

            {
                /* ОТОБРАЖЕНИЕ СТРАНИЦЫ С ТЕГАМИ */

                !tabs.tags ? null :
                    <div className="search-properties__tags">
                        <TagContainer returnTagsFixed={result => setTags(result)}/>
                    </div>
            }

            {
                /* ОТОБРАЖЕНИЕ СТРАНИЦЫ С «ВРЕМЕННЫЕ ФИЛЬТРЫ» */

                !tabs.periods ? null :
                    <div className="search-properties__when">
                        { setFilterTimingActual() }
                    </div>
            }
                
                
    </div>
}

