import React, { useState, useRef } from "react";
import { 
    type_of_search, 
    show_filter_btns_for 
} from "displayed_data.js";
import Button from "Button.jsx";
// import Cucumber from "../dependencies/Button/Cucumber.jsx";
import SearchProperties from "SearchProperties.jsx";
import 'Search.sass';

/*

Виджет занимается генерацией запросов к серверу.
Виджет отображает запрос к серверу. Данные берутся из адресной строки.

Виджет не управляется извне, не получает никаких props.

*/


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

    

    /*

    ОПИСАНИЕ ПОСЛЕДОВАТЕЛЬНОСТИ ПРИКРЕПЛЕНИЯ ФИЛЬТРОВ
    
    Фильтры есть трех типов:
    - период актуальности
    - тег (для статей, заметок и коллекций)
    - фильтр (для растений)
    
    Для каждого из этих трех типов фильтров существует отдельный массив
    в котором отображаются добавленные фильтры:
    - attachedActuals
    - attachedTags
    - attachedPlantFilters

    При таком подходе невозможно сделать так, чтобы на панели поиска
    добавленные фильтры отображали в порядке их добавления. Однако, 
    в каждом массиве последний элемент, является последним добавленным элементом.

    Создать массив, который будет содержать информацию необходимую
    только для отрисовки добавленных фильтров — attachedAllFiltes.

    При обновлении одного из массивов (attachedActuals, attachedTags, attachedPlantFilters):
    1. если последний элемент обновленного массива уже пристуствует в attachedAllFiltes — удалить
    2. добавить в attachedAllFiltes последний элемент обновленного массива
    3. убирать все элементы нужного типа, которых нет в обновленном массиве 
    (в обновленном массиве на самом деле могло произойти не добавление элемента, а удаление)

    */

    // ↓ какие временные метки актуальности добавлены?
    const [attachedActuals, setAttachActuals] = useState([])

    // ↓ какие фильтры растений добавлены?
    const [attachedPlantFilters, setPlantFilters] = useState([])

    // ↓ какие теги контента добавлены?
    const [attachedTags, setTags] = useState([])

    // ↓ список отображенных на панеле фильтров (все типы)
    const attachedAllFiltes = []
    // TODO реализовать отображение добавленных фильтров на Search


    const addFilters = () => {
        const filters = [
            <Button icon={"IcoPeriods"} key='filter__11'>text</Button>,
            // <Button icon={"IcoPeriods"}>text</Button>,
            // <Button icon={"IcoPeriods"}>text</Button>,
            // <Button icon={"IcoPeriods"}>text</Button>,
            // <Button icon={"IcoPeriods"}>text</Button>,
            // <Button icon={"IcoPeriods"}>text</Button>,
        ]
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
                    icon={type_of_search[typeOfSearch].icon}
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

