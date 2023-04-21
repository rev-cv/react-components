import React, { useState } from "react";
import 'Image.sass';
import IcoPack from "IcoPack.jsx";

const IcoNoImage = <IcoPack icon="IcoNoImage" />
const IcoLoading = <IcoPack icon="IcoLoading" />
const IcoClosing = <IcoPack icon="IcoClosing" />

export default ({ 
    objImg = {}, 
    style={},
    host = 'http://127.0.0.1:8000',
    // ↑ TEST. добавляет полный адрес к картинке при необходимости
    objectFit = "cover",
    // ↑ описывающет то, как картинка будет вписана в контейнер картинки
    isFullScreen = false,
    // ↑ разрешить разворачивать на весь экран?
    onClickByImage = undefined,
    // ↑ дейтствие при клике по картинке
    classList = [],
    // ↑ дополнительные классы переданные извне
    openedFullScreen = false,
    // ↑ было ли открыто окно «на весь экран» ранее?
    // данный функционал нужен только для того, чтобы 
    // переключать картинки находящиеся в слайдере
    isBlockToDirectFullScreenFromSlide = false
    // ↑ костыль. Посылается из ImagesSlider
    // блокирует инструкцию включения/выключения полноэкранного режима
    // передавая тем самым управление ImageSlider
    // блокируемая инструкия ↓ ↓ ↓
    // toogleFullScreen(isOpenFullScreen => !isOpenFullScreen);
    }) => {

    const [ isOpenFullScreen, toogleFullScreen ] = useState(openedFullScreen)
    const [ isLoaded, setLoaded ] = useState(false)
    const classes = [
        "image-box", 
        "image-loaded", 
        isFullScreen ? "pointer" 
            : onClickByImage ? "pointer"
            : null,
        ...classList
    ].join(" ")

    const src = objImg.src ? objImg.src
        : objImg.path ? objImg.path
        : IcoNoImage
    const thumbnail = objImg.thumbnail ? objImg.thumbnail : src

    const setImage = () => {
        // добавляет сордержимое блока image-box
        if (!objImg.src & !objImg.path) return IcoNoImage
        
        return <>
            {
                objImg.thumbnail ? <img src={thumbnail} className="image-box__background" />
                    : IcoLoading
            }
            
            <img 
                src={src} 
                className={
                    objectFit === "contain" ? "image-box__contain" : "image-box__cover"
                } 
                onLoad={e => setLoaded(true)} 
                loading="lazy"
            />
        </>
    }

    const actionByImage = (event) => {
        // обрабатывает событие клика по картинке

        if (isFullScreen & !isBlockToDirectFullScreenFromSlide) 
            toogleFullScreen(isOpenFullScreen => !isOpenFullScreen);

        if (onClickByImage) 
            onClickByImage();

        event.stopPropagation();
    }

    const setImageInFullScreen = () => {
        // добавляет блок показывающий картинку на весь экран
        if (isFullScreen & isOpenFullScreen | isFullScreen & openedFullScreen) {
            return <div
                className="image-box-in-full-screen"
                onClick={actionByImage}
                > 

                    <img src={src} />
                    {setDescription()}
                    {IcoClosing}

            </div>
        }
    }

    const setDescription = () => {
        // добавляет описание к картинке (если оно есть), когда картинка развернута на весь экран
        const isTitle = objImg.title !== undefined | objImg.title !== null
        const isDescription = objImg.description !== undefined | objImg.description !== null
        const isLink = objImg.link !== undefined | objImg.link !== null

        if (isTitle | isDescription | isLink ){
            return <div 
                className="image-box-in-full-screen__info"
                onClick={e => {
                    e.currentTarget.classList.add("image-box-in-full-screen__info__over-mouse")
                    e.stopPropagation()
                }}
                onMouseOver={e => {
                    e.currentTarget.classList.add("image-box-in-full-screen__info__over-mouse")
                }}
                >

                <div className="image-box-in-full-screen__info__mes">
                    {
                        isTitle ? <div className="image-box-in-full-screen__info__mes__title">
                            {objImg.title}
                        </div> : null
                    }

                    {
                        isDescription ? <div className="image-box-in-full-screen__info__mes__text">
                            {objImg.description}
                        </div> : null
                    }

                    {
                        isLink ? <div className="image-box-in-full-screen__info__mes__link">
                            виджет «Link»
                        </div> : null
                    }
                </div>

            </div>
        }
    }

    return <>
        <div
            className={isLoaded ? classes : "image-box"}
            style={{...style}}
            onClick={actionByImage}
            > { setImage() }
        </div>
        { setImageInFullScreen() }
    </>
    
    

}