import React, { useState } from "react";
import Button from "Button.jsx";


import { periods_of_actual } from "test-actuals.js";


Array.prototype.arrayIncluded = function (a) {
    var hash = this.reduce(function (acc, i) { acc[i] = true; return acc; }, {});
    return a.every(function (i) { return i in hash; });
};



export default ({ attachedActuals, setAttachActuals, }) => {

    const [attachedDecades, setAttachedDecades] = useState([])

    const changeActuals = (actual) => {


        // ↓ ФИКСАЦИЯ АКТУАЛЬНЫХ СЕЗОНОВ И МЕСЯЦЕВ
        const actuals = attachedDecades.arrayIncluded(actual.attach) ?
            attachedDecades.filter(item => !actual.attach.includes(item))
            :
            [...new Set([...attachedDecades, ...actual.attach])]


        // ↓ ВЫБОР АКТУАЛЬНЫХ МЕСЯЦЕВ
        const month = periods_of_actual.filter(elem => 
            elem.type === "month" & actuals.arrayIncluded(elem.attach) 
        ).sort(elem => elem.attach[0])


        // ↓ СПАЙКА СОСЕДСТВУЮЩИХ МЕСЯЦЕВ
        let adhesions = []

        for (let index = 0; index < month.length; index++) {

            if (index != 0) {
                if (month[index - 1].request[0] + 100 === month[index].request[0]) {
                    adhesions[adhesions.length - 1].f = month[index].text
                    adhesions[adhesions.length - 1].request[1] = month[index].request[1]
                    continue
                }
            }

            adhesions.push({
                s: month[index].text,
                f: month[index].text,
                request: month[index].request,
            })            
        }

        if (adhesions.length >= 2){
            if (adhesions[adhesions.length - 1].f === 'декабрь' & adhesions[0].s === 'январь'){
                adhesions = [
                    ...adhesions.slice(1, -1), 
                    {
                        s: adhesions[adhesions.length - 1].s,
                        f: adhesions[0].f,
                        request: [
                            adhesions[adhesions.length - 1].request[0],
                            adhesions[0].request[1],
                        ]
                    }
                ]
            }
        }


        setAttachActuals(adhesions.map(elem => ({
            id: Number(String(elem.request[0]) + String(elem.request[1])),
            text: elem.s === elem.f ? elem.s : `${elem.s} — ${elem.f}`,
            request: elem.request
        })))

        setAttachedDecades(actuals)

    }


    const addActualElems = (key) => {
        return <div

            className="search-properties__when__stack"
            key={`.search-properties__when > .stack > ${key}`}
            children={

                periods_of_actual.filter(item => item.type === key).map(item => (

                    <Button
                        key={`search-props-when-search-${item.text}`}
                        className={
                            attachedDecades.arrayIncluded(item.attach) ? 'select' : undefined
                        }
                        onBtnClick={e => changeActuals(item)}
                        children={item.text}
                    />

                ))

            }

        />
    }



    return <>

        <div
            className='search-properties__when__preview'
            key='search-props-when-search-title-4545'
            children={attachedActuals.map(elem => elem.text).join(",   ")}
        />

        <div
            className='search-properties__when__title'
            key='search-props-when-search-title-now'
            children='Выбрать ближайший актуальный период'
        />

        <div
            className="search-properties__when__stack"
            key={`.search-properties__when > .stack > now`}
        >

            <Button
                key={`search-props-when-search-now`}
                // className={
                //     attachedDecades.arrayIncluded(item.attach) ? 'select' : undefined
                // }
                onBtnClick={e => console.log('сегодня')}
                children="сегодня"
            />

            <Button
                key={`search-props-when-search-now-week`}
                // className={
                //     attachedDecades.arrayIncluded(item.attach) ? 'select' : undefined
                // }
                onBtnClick={e => console.log('ближайшая неделя')}
                children="7 дней"
            />

            <Button
                key={`search-props-when-search-now-2-week`}
                // className={
                //     attachedDecades.arrayIncluded(item.attach) ? 'select' : undefined
                // }
                onBtnClick={e => console.log('ближайшие 2 недели')}
                children="14 дней"
            />

            <Button
                key={`search-props-when-search-now-month`}
                // className={
                //     attachedDecades.arrayIncluded(item.attach) ? 'select' : undefined
                // }
                onBtnClick={e => console.log('ближайший месяц')}
                children="месяц"
            />

        </div>
    
        <div
            className='search-properties__when__title'
            key='search-props-when-search-title-season'
            children='Выбрать актуальный сезон'
        />

        {addActualElems("season")}

        <div
            className='search-properties__when__title'
            key='search-props-when-search-title-month'
            children='Выбрать актуальные месяцы'
        />

        {addActualElems("month")}

        
    </>
}