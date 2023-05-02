import React, { useState, useEffect } from "react";
import Button from "Button.jsx";
import ButtonContainer from "ButtonContainer.jsx";

export default ({
    isOpenAF,
    refSearchPanel,     // ref для searc-panel

    attachedActuals,    // прикрепленные периоды актуальности
    setAttachActuals,   // функция для прикрепления периодов актуальности
    attachedPlantFilters,// прикрепленные фильтры растений
    setPlantFilters,    // функция для прикрепления фильтров растений
    attachedTags,       // прикрепленные теги контента
    setTags,            // функция для прикрепления тегов контента
    attachedRelativeActuals = "none",
    setAttachRelativeActuals,
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
        if (isOpenAF) {
            // ↓ меняет положение и геометрию .search-properties при открытии панели
            setStylePos(changePosition());
            // ↓ меняет положение и геометрию .search-properties при изменении окна
            window.onresize = () => { setStylePos(changePosition()) };
        } else {
            window.onresize = false
        }
        return () => { window.onresize = false };
    }, [isOpenAF]);


    const setff = (title, text, list, setter, icon) => {
        return <>

            <div className="search-properties__title">{title}</div>

            {
                list.map(elem => (
                    <ButtonContainer
                        key={`search-properties__title > ${elem.id}`}
                        className='search-properties__container-filter'
                    >
                        <Button 
                            className='search-properties__container-filter__text'
                            icon={icon} 
                            children={elem[text]} 
                        />
                        <Button
                            className='search-properties__container-filter__delete'
                            icon="IcoClose"
                            onBtnClick={e => setter([...list.filter(x => x.id != elem.id)])}
                        />
                    </ButtonContainer>
                ))
            }
        </>
    }


    return <div
        className={isOpenAF ? "search-properties" : "search-properties closing"}
        style={stylePos}
    ><div className='search-properties__container-attached-filters' >
        {
            attachedRelativeActuals === "none" ? null :
                <>
                    <div className="search-properties__title">
                        Актуально в течении
                    </div>

                    <ButtonContainer
                        key="search-properties__title > relative-actuals"
                        className='search-properties__container-filter'
                    >

                        <Button
                            className='search-properties__container-filter__text'
                            children={
                                attachedRelativeActuals === 'today' ? 'сегодня' 
                                : attachedRelativeActuals === '7d' ? 'ближайшей недели'
                                : attachedRelativeActuals === '14d' ? 'ближайших 2х недель'
                                : attachedRelativeActuals === '1m' ? 'ближайшего месяца'
                                : null
                            }
                            icon='IcoPeriods'
                        />
                        <Button
                            className='search-properties__container-filter__delete'
                            icon="IcoClose"
                            onBtnClick={e => setAttachRelativeActuals('none')}
                        />
                        
                    </ButtonContainer>
                
                </>
        }

        {
            attachedActuals.length === 0 ? null :
                setff(
                    'Периоды актуальности', 'text',
                    attachedActuals, setAttachActuals,
                    'IcoPeriods'
                )
        }

        {
            attachedTags.length === 0 ? null :
                setff(
                    'Теги', 'tag',
                    attachedTags, setTags,
                    'IcoTags'
                )
        }

    </div>
    </div>
}