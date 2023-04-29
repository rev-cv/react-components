// changed 2023-04-15
import React from "react";
import Button from "Button.jsx";
import Image from "Image.jsx";
import IcoPack from "IcoPack.jsx"
const IconAttached = <IcoPack icon="IcoAttachedFiters" />
import './Tags.sass';

const Tag = ({
    tagObj = {},
    tagsAll = [],   // все теги. Нужны для того, чтобы выбирать детей
    onFix,          // функция фиксирующая клик по тегу, что означает «выбрать тег»
    onExpand,       // функция разворачивающая дочерние теги данного тега
    fixedIDTags =[],// зафиксированные ID тегов
    style = {},
    className,
    classList = [],
    setParentForPage,// функция установки родителя страницы с отображаемыми тегами
    parentsID =[],  // 
    }) => {
    
    const isFix = fixedIDTags.includes(tagObj.id)

    const classes = [
        "card-tag",
        isFix ? "tag-fix" : undefined,
        className,
        ...classList,
    ].join(" ").trim()

    const onClickByTag = (e) => {
        // toogleFix(isFix => !isFix);
        typeof onFix === 'function' ? onFix(tagObj.id) : null;
        e.stopPropagation()
    }

    return <div 
        className={classes}
        onClick={onClickByTag}
        >
            <div className="card-tag__area">
                {
                    // ОТОБРАЖЕНИЕ КАРТИНКИ ФОНОМ, ЕСЛИ ОНА ЕСТЬ
                    !tagObj.cover ? null :
                        <Image 
                            objImg={tagObj.cover} 
                            className='card-tag__area__cover'
                            onClickByImage={onClickByTag}
                        />
                }

                <div className="card-tag__area__content">

                    <div className="card-tag__area__content__tag">
                        {
                            parentsID.includes(tagObj.id) ? IconAttached : null
                            
                        }
                        {tagObj.tag}
                    </div>

                    {
                        // ОТОБРАЖЕНИЕ КНОПКИ ДЛЯ ПОКАЗА ДЕТЕЙ ТЕГА, ЕСЛИ ОНИ ЕСТЬ
                        !(tagObj.is_children) ? null :
                            <Button
                                className="card-tag__area__content__btn-expand-lev-2"
                                icon="IcoArrowRight"
                                onBtnClick={_ => setParentForPage(tagObj.id)}
                            />
                    }

                </div>
            </div>
            
    </div>
}

export default Tag