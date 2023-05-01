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


    const setff = (title, text, list, setter) => {
        return <>

            <div className="search-properties__title">{title}</div>

            {
                list.map(elem => (
                    <ButtonContainer
                        key={`search-properties__title > ${elem.id}`}
                        className='search-properties__container-filter'
                    >
                        <Button
                            className='disable'
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
    >
        {
            attachedActuals.length === 0 ? null :
                setff(
                    'Прикрепленные к запросу периоды актуальности', 'text',
                    attachedActuals, setAttachActuals,
                )
        }

        {
            attachedTags.length === 0 ? null :
                setff(
                    'Прикрепленные к запросу теги', 'tag',
                    attachedTags, setTags,
                )
        }

    </div>
}