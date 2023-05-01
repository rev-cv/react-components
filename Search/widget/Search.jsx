import React, { useState, useRef, useEffect } from "react";
import Button from "Button.jsx";
import SearchProperties from "SearchProperties.jsx";
import SearchAddedFilters from "SearchAddedFilters.jsx";


import 'Search.sass';
import 'SearchProperties.sass';


import { search_types, show_filter_btns_for } from "test-search-types.js";


export default () => {


    const refSearchPanel = useRef()


    // ↓ Какой тип информации ищется?
    const [typeOfSearch, setTypeOfSearch] = useState("notes")

    // ↓ открыт или закрыт SearchProperties?
    const [isOpenSP, toogleOpenSP] = useState(false)

    // ↓ открыт или закрыт SearchAddedFilters?
    const [isOpenAF, toogleOpenAF] = useState(false)


    const tooglePanels = arg => {

        if (arg === 'added-filters') {
            if (isOpenAF) {
                // открыт SearchAddedFilters и его нужно закрыть
                toogleOpenAF(false)
            } else {
                // нужно закрыть все остальные панели и открыть SearchAddedFilters
                if (isOpenSP) toogleOpenSP(false)

                setTimeout(() => {
                    toogleOpenAF(true)
                }, 150);
            }
        } else if (isOpenSP & tabs[arg]) {
            // открыт SearchProperties и его нужно закрыть
            toogleOpenSP(false)
        } else if (isOpenSP & !tabs[arg]) {
            // открыт SearchProperties и нужно просто изменить вкладку
            updateVisibleTabs(getVisibleTabs(arg))
        } else {
            // нужно закрыть все остальные панели и открыть SearchProperties
            if (isOpenAF) toogleOpenAF(false)

            setTimeout(() => {
                updateVisibleTabs(getVisibleTabs(arg))
                toogleOpenSP(true)
            }, 150);
        }
    }


    const getVisibleTabs = (tab, tos = typeOfSearch) => {
        /*
            функция управляет вкладками в SearchProperties
            - выбор открытой вкладки
            - активация / деактивация вкладки
        */

        /*
            tab — вкладка, которая должна быть открыта
            tos — иногда typeOfSearch и tabs должны меняться одновременно ↲
            если изменить typeOfSearch, а после него сразу tabs, ↲
            то значение typeOfSearch не успевается измениться.
        */

        const result = {}

        result.find_in = tab === "find_in" ? true : false

        if (show_filter_btns_for.tags_for.includes(tos)) {
            result.tags = tab === "tags" ? true : false
        }

        if (show_filter_btns_for.filters_for.includes(tos)) {
            result.filters = tab === "filters" ? true : false
        }

        if (show_filter_btns_for.actuals_for.includes(tos)) {
            result.periods = tab === "periods" ? true : false
        }

        return result
    }


    // ↓ какая вкладка открыта на SearchProperties?
    const [tabs, updateVisibleTabs] = useState(getVisibleTabs("find_in"))

    // ↓ какие временные метки актуальности добавлены?
    const [attachedActuals, setAttachActuals] = useState([])

    // ↓ какие фильтры растений добавлены?
    const [attachedPlantFilters, setPlantFilters] = useState([])

    // ↓ какие теги контента добавлены?
    const [attachedTags, setTags] = useState([])


    const countAllFilters =
        + attachedPlantFilters.length
        + attachedActuals.length
        + attachedTags.length;


    const addButtonFilters = () => {

        const filters_btns = [

            !show_filter_btns_for.tags_for.includes(typeOfSearch) ? null :
                <Button
                    icon={"IcoTags"}
                    key='filters-button => tags'
                    onBtnClick={e => tooglePanels("tags")}
                />,
            
            !show_filter_btns_for.filters_for.includes(typeOfSearch) ? null :
                <Button
                    icon={"IcoFilters"}
                    key='filters-button => filters'
                    onBtnClick={e => tooglePanels("filters")}
                />,

            !show_filter_btns_for.actuals_for.includes(typeOfSearch) ? null :
                <Button
                    icon={"IcoPeriods"}
                    key='filters-button => periods'
                    onBtnClick={e => tooglePanels("periods")}
                />

        ]

        return filters_btns.length === 0 ? null : 
        <div className="search-panel__adding-filters">
            {filters_btns}
        </div>
    }


    return <>
        <div className="container-for-search-panel" >

            <div className="search-panel" ref={refSearchPanel} >

                {/* ЧТО ИСКАТЬ? КАКИЕ ОБЪЕКТЫ ИСКАТЬ? */}
                <Button
                    className="search-panel__what-search"
                    icon={search_types[typeOfSearch].icon}
                    onBtnClick={e => tooglePanels("find_in")}
                />
                

                {/* ФИЛЬТРЫ И ТЕКСТ ПОИСКОВОГО ЗАПРОСА */}
                <div className="search-panel__body-request">
                    {
                        countAllFilters === 0 ? null :
                            <Button
                                icon='IcoСlip'
                                onBtnClick={e => tooglePanels('added-filters')}
                                children={countAllFilters}
                            />
                    }
                    <input className="search-panel__text-request" placeholder="искать …"/>
                </div>


                {/* КНОПКИ ОТКРЫТИЯ ОКОН С ФИЛЬТРАМИ */}
                {addButtonFilters()} {/* adding-filters */}


                {/* КНОПКА ОТПРАВКИ ЗАПРОСА */}
                <Button 
                    className="search-panel__btn-send"
                    icon={"IcoSearch"} 
                    onBtnClick={() => console.log("ok")}
                />    

            </div>

            <SearchProperties
                isOpenSP={isOpenSP}
                refSearchPanel={refSearchPanel}
                toogleOpenSP={toogleOpenSP}
                typeOfSearch={typeOfSearch}
                setTypeOfSearch={setTypeOfSearch}
                tabs={tabs}
                updateVisibleTabs={updateVisibleTabs}
                getVisibleTabs={getVisibleTabs}

                // ↓ массивы с добавленными фильтрами разных типов
                attachedActuals={attachedActuals}
                setAttachActuals={setAttachActuals}
                attachedPlantFilters={attachedPlantFilters}
                setPlantFilters={setPlantFilters}
                attachedTags={attachedTags}
                setTags={setTags}
            />

            <SearchAddedFilters 
                isOpenAF={isOpenAF}
                refSearchPanel={refSearchPanel}

                // ↓ массивы с добавленными фильтрами разных типов
                attachedActuals={attachedActuals}
                setAttachActuals={setAttachActuals}
                attachedPlantFilters={attachedPlantFilters}
                setPlantFilters={setPlantFilters}
                attachedTags={attachedTags}
                setTags={setTags}
            />

        </div>

        {
            /* шторка затемняющая содержимое страницы */
            (isOpenSP | isOpenAF) ? 
                <div className="parent-blind">
                    <div
                        className="blind"
                        onClick={e => {
                            if (isOpenSP) toogleOpenSP(false);
                            if (isOpenAF) toogleOpenAF(false);
                        }}
                    />
                </div> : null
        }
    </>
}

