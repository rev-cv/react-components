import React, { useState, useEffect } from "react";

import Button from "Button.jsx";
import ButtonContainer from "ButtonContainer.jsx";

import SearchPropsWhat from "SearchPropsWhat.jsx";
import TagContainer from "TagContainer.jsx";
import SearchPropsActuals from "SearchPropsActuals.jsx";

import 'SearchProperties.sass';


import { search_page_btns } from "test-serach-page-btns.js";


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
                        <SearchPropsWhat
                            tabs={tabs}
                            setTypeOfSearch={setTypeOfSearch}
                            updateVisibleTabs={updateVisibleTabs}
                            getVisibleTabs={getVisibleTabs}
                            typeOfSearch={typeOfSearch}
                        />
                    </div>
            }

            {
                /* ОТОБРАЖЕНИЕ СТРАНИЦЫ С ТЕГАМИ */

                !tabs.tags ? null :
                    <div className="search-properties__tags">
                        <TagContainer returnTagsFixed={result => setTags(result)} />
                    </div>
            }

            {
                /* ОТОБРАЖЕНИЕ СТРАНИЦЫ С «АКТУАЛЬНОЕ ВРЕМЯ» */

                !tabs.periods ? null :
                    <div className="search-properties__when">
                        <SearchPropsActuals 
                            attachedActuals={attachedActuals}
                            setAttachActuals={setAttachActuals}
                        />
                    </div>
            }
                
    </div>
}
