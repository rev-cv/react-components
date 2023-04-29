import React, { useState, useRef, useEffect } from "react";
import Button from "Button.jsx";
import SearchProperties from "SearchProperties.jsx";
import 'Search.sass';

import { search_types, show_filter_btns_for } from "test-search-types.js";


export default () => {

    // ↓ Какой тип информации ищется?
    const [typeOfSearch, setTypeOfSearch] = useState("notes")

    // ↓ открыта или закрыта SearchProperties?
    const [isOpenSP, toogleOpenSP] = useState(false)

    const refSearchPanel = useRef()

    const getVisibleTabs = (tab, tos = typeOfSearch) => {
        // tab — вкладка, которая должна быть открыта
        // tos — иногда typeOfSearch и tabs должны меняться одновременно
        // если изменить typeOfSearch, а после него сразу tabs,
        // то значение typeOfSearch не успевается измениться
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
    // ↑ так же какие вообще вкладки имеются на SearchProperties?

    // ↓ какие временные метки актуальности добавлены?
    const [attachedActuals, setAttachActuals] = useState([])

    // ↓ какие фильтры растений добавлены?
    const [attachedPlantFilters, setPlantFilters] = useState([])

    // ↓ какие теги контента добавлены?
    const [attachedTags, setTags] = useState([])

    // ↓ список отображенных на панеле фильтров (все типы)
    const [attachedVisibleFiltes, setVisibleFiltes] = useState([])


    const updateVisibleFilters = (initialized = false, filterDelete = 0) => {
        // функция управления визуализации на Search добавленный фильтров

        if (initialized === false){
            // initialized == false — инициализация на удаление filterDelete

        } else {

            let isSomething = false
            if (initialized === "tag" & attachedTags.length > 0) {
                isSomething = true
            } else if (initialized === "plant_filter" & attachedPlantFilters.length > 0) {
                isSomething = true
            } else if (initialized === "actual_date" & attachedActuals.length > 0) {
                isSomething = true
            }

            // STEP 1: удалить из attachedVisibleFiltes уже удаленные фильтры

            if (isSomething) {

                const elemWillDelete = []

                attachedVisibleFiltes.forEach( (x, index) => {
                    // нужный элемент все еще существует в массиве?
                    switch (initialized) {
                        case "tag":
                            if (attachedTags.find(e => x.id_elem === e.id) === undefined){
                                elemWillDelete.push(index)
                            } 
                            break
                        case "plant_filter":
                            break
                        case "actual_date":
                            break
                    }
                })

                // STEP 2: добавление отсутствующих фильтров

                const addingFilter = []

                switch (initialized) {
                    case "tag":
                        const tuy = []

                        attachedVisibleFiltes.forEach(x => {
                            if (x.type === "tag") tuy.push(x.id_elem)
                        })

                        attachedTags.forEach( x => {
                            if (!tuy.includes(x.id)){
                                addingFilter.push({
                                    type: "tag",
                                    text: x.tag,
                                    id_elem: x.id,
                                    icon: "IcoTags"
                                })
                            }
                        })

                        break
                    case "plant_filter":

                        break
                    case "actual_date":

                        break
                }
                
                setVisibleFiltes([
                    ...attachedVisibleFiltes.filter(
                        (item, index) => !elemWillDelete.includes(index)
                    ),
                    ...addingFilter
                ])

            } else {
                // если не найдено последнего эелемента в массиве-инициаторе
                // то значит массив пуст и все целевые фильтры для этого массива
                // должны быть удалены
                setVisibleFiltes([
                    ...attachedVisibleFiltes.filter(
                        item => item.type === "plant_filter"
                    )
                ])
            }
        }
    }

    console.log(attachedVisibleFiltes)

    useEffect(() => updateVisibleFilters("tag"), [attachedTags])
    useEffect(() => updateVisibleFilters("plant_filter"), [attachedPlantFilters])
    useEffect(() => updateVisibleFilters("actual_date"), [attachedActuals])

    const addFilters = () => {
        const filters = attachedVisibleFiltes.map( elem => (
            <Button 
                icon={elem.icon} 
                key={`filter__${elem.type}__${elem.id_elem}`}
                >{elem.text}
            </Button>
        ))
        return filters.length === 0 ? null : filters
    }

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
                    {addFilters()}    {/* filters */}
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

