import React, { useState } from "react";
import 'Image.sass';
import IcoPack from "IcoPack.jsx";

const IcoNoImage = <IcoPack icon="IcoNoImage" />
const IcoLoading = <IcoPack icon="IcoLoading" />

export default ({
    objImg = {},
    style = {},
    className = undefined,
    // ↑ дополнительные классы переданные извне
    objectFit = "cover",
    // ↑ описывающет то, как картинка будет вписана в контейнер картинки
    onClickByImage = () => objImg,
    // ↑ фнкция срабатывающая при клике по картинке ↲
    // возвращает objImg по умолчанию
}) => {

    const [isLoaded, setLoaded] = useState(false)

    let classes = 'image-box image-loaded'
    if (className) classes += ` ${className}`


    const setImage = () => {
        // добавляет сордержимое блока image-box
        let src;

        if (objImg.src) { src = objImg.src } 
        else if (objImg.path) { src = objImg.path } 
        else { return IcoNoImage }

        
        return <>

            { isLoaded ? null : IcoLoading /* ← анимация загрузки */}

            <img
                src={src}
                className={
                    objectFit === "contain" ? "image-box__contain" : "image-box__cover"
                }
                // onLoad={e => {
                //     setTimeout(() => {
                //         setLoaded(true)
                //     }, 10000);
                // }} 
                onLoad={e => setLoaded(true)}
                loading="lazy"
            />
        </>
    }


    return <>
        <div
            className={isLoaded ? classes : "image-box"}
            style={{ ...style }}
            onClick={e => {
                onClickByImage();
                e.stopPropagation();
            }}
        > {setImage()}
        </div>
    </>
}