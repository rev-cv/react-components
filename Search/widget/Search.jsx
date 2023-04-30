import React, { useState, useRef, useEffect } from "react";
import Button from "Button.jsx";
import SearchProperties from "SearchProperties.jsx";
import { calcFilters } from "calc-of-all-added-filters.js";
import 'Search.sass';


import { search_types, show_filter_btns_for } from "test-search-types.js";


export default () => {

    const refSearchPanel = useRef()

    // ↓ Какой тип информации ищется?
    const [typeOfSearch, setTypeOfSearch] = useState("notes")

    // ↓ открыт или закрыт SearchProperties?
    const [isOpenSP, toogleOpenSP] = useState(false)


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

    // ↓ список отображенных на панеле фильтров (все типы)
    const [attachedVisibleFiltes, setVisibleFiltes] = useState([])


    const p = {
        initialized: "plant_filter",
        attachedTags,
        attachedPlantFilters,
        attachedActuals,
        attachedVisibleFiltes,
        setVisibleFiltes,
    }
    useEffect(() => calcFilters(p), [attachedPlantFilters])
    useEffect(() => calcFilters({ ...p, initialized: 'tag' }), [attachedTags])
    useEffect(() => calcFilters({ ...p, initialized: 'actual_date' }), [attachedActuals])


    const toogleSearchProperties = (typeTab) => {
        // управляет поведением кнопок раскрывающих / скрывающих SearchProperties
        
        if (isOpenSP & tabs[typeTab]) {
            toogleOpenSP(false)
        } else if (isOpenSP & !tabs[typeTab]) {
            updateVisibleTabs(getVisibleTabs(typeTab))
        } else {
            updateVisibleTabs(getVisibleTabs(typeTab))
            toogleOpenSP(true)
        }
    }


    const addButtonFilters = () => {

        const filters_btns = [

            !show_filter_btns_for.tags_for.includes(typeOfSearch) ? null :
                <Button
                    icon={"IcoTags"}
                    key='filters-button => tags'
                    onBtnClick={e => toogleSearchProperties("tags")}
                />,
            
            !show_filter_btns_for.filters_for.includes(typeOfSearch) ? null :
                <Button
                    icon={"IcoFilters"}
                    key='filters-button => filters'
                    onBtnClick={e => toogleSearchProperties("filters")}
                />,

            !show_filter_btns_for.actuals_for.includes(typeOfSearch) ? null :
                <Button
                    icon={"IcoPeriods"}
                    key='filters-button => periods'
                    onBtnClick={e => toogleSearchProperties("periods")}
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
                    onBtnClick={e => toogleSearchProperties("find_in")}
                />
                

                {/* ФИЛЬТРЫ И ТЕКСТ ПОИСКОВОГО ЗАПРОСА */}
                <div className="search-panel__body-request">
                    {/*{addFilters()}     filters */}
                    {
                        attachedVisibleFiltes.length === 0 ? null :
                            <Button
                                >{attachedVisibleFiltes.length}
                            </Button>
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

        </div>

        {
            /* шторка затемняющая содержимое страницы */
            !isOpenSP ? null :
                <div className="parent-blind">
                    <div 
                        className="blind"
                        onClick={e => toogleOpenSP(false)}
                    />
                </div>
        }
    </>
}

