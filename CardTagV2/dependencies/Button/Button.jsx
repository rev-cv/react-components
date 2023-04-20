// changed 2023-04-15
import React, { useRef, useState } from "react";
import './Button.sass';
import Anim from "./AnimationBubble.jsx";
import IcoPack from "../../../IcoPack/IcoPack.jsx";

export default ({
        icon, // иконка svg или image
        description, // описание под названием кнопки
        children, // тело, название кнопки
        fontWeight = 500, //толщина главного текста кнопки
        style = {}, // кастомный стиль для кнопки (цвет, бордер, font-size)
        widgets = [], // виджет с правой части кнопки. Может принимать кнопку удаления тега или счетчики
        onBtnClick, // если не передана функция, то кнопка не работает
        classList = [], // дополнительные классы переданные извне в виде списке
        className = "", // дополнительные классы переданные извне в виде списке
    }) => {


    let useClass = `btn-ico-only`
    if (children) useClass = 'btn-standart'
    if (description) useClass = 'btn-with-description'

    const classes = [useClass, className, ...classList].join(" ")
    const btn = useRef();
    const [bubbles, addNewBubble] = useState([])

    const actionByClick = (event) => {
        // срабатывание нажатия по кнопке

        const datemark = +new Date()
        const rect = btn.current.getBoundingClientRect()

        addNewBubble([
            ...bubbles.filter(item => item[0] + 1000 > datemark),
            [datemark, event.clientX - rect.x, event.clientY - rect.y, rect.width * 1.3]
        ])

        onBtnClick();
        event.stopPropagation();
    }

    const getObjectIcon = () => {
        // Получения иконки, если иконка есть
        if (!icon) return null // картинка не передана

        switch (typeof icon) {
            case 'string':
                // передан ключ типа "Ico…" с помощью которого из IcoPack
                // будет требуемая получена иконка
                if (icon.slice(0, 3) == "Ico") return <IcoPack icon={icon} />
            case 'object':
                // будем думать, что это иконка, а если нет — сам дурак
                return icon
            default:
                return null
        }
    }

    const getButtonText = () => {
        // добавление текста для кнопки
        return children ?
            <div className={`${useClass}__text`} style={{ fontWeight: fontWeight }}>
                <div className={`${useClass}__text__t`}>{children}</div>
                {
                    // добавление описания к кнопке, если есть
                    description ? <div className={`${useClass}__text__description`}>{description} </div> : null
                }
            </div>
            : null
    }

    const getButtonWidgets = () => {
        // добавление виджетов
        return widgets.length > 0 ?
            <div className={`${useClass}__widgets`}>{widgets}</div>
            : null
        // Warning: validateDOMNesting
        // https://stackoverflow.com/questions/47282998
    }

    return (
        <button
            className={classes}
            style={style}
            ref={btn}
            onClick={onBtnClick ? actionByClick : null}
        // onMouseLeave={e => {
        //     setTimeout(() => {
        //         addNewBubble([])
        //     }, 1500)
        // }}
        >

            {getObjectIcon()}
            {getButtonText()}
            {getButtonWidgets()}

            {
                // добавление пузыриков при нажатии
                bubbles.map((item, index, array) => (
                    <Anim key={item[0]} x={item[1]} y={item[2]} w={item[3]} />
                ))
            }
        </button>
    );
}

