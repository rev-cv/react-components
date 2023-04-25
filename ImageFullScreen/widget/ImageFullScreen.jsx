import React, { useState } from "react";
import Image from "Image.jsx";
import Button from "Button.jsx";
import 'ImageFullScreen.sass';


export default ({ listObjImgs=[{},], style={}, index=0 }) => {

    const [visibleImg, setVisibleImg] = useState(listObjImgs[index])
    const [isOpenWidget, closeWidget] = useState(true)
    const [isOpenDesc, setStatusDesc] = useState(false)

    const ifsc = "image-full-screen__canvas__"

    let showHintTimer = false
    let hideHintTimer = false

    if (!isOpenWidget) return null

    return <div className="image-full-screen" style={style} >

        <div className="image-full-screen__canvas">

            <Image
                objImg={visibleImg}
                objectFit="contain"
                onClickByImage={e => console.log("клик по картинке")}
                className={`${ifsc}img`}
            />

            <div
                className={`${ifsc}btn-show-description`}
                onMouseOver={e => {
                    clearTimeout(hideHintTimer);
                    showHintTimer = setTimeout(() => {
                        setStatusDesc(true);
                    }, 100)
                }}
                onMouseLeave={e => {
                    clearTimeout(showHintTimer);
                    hideHintTimer = setTimeout(() => {
                        setStatusDesc(false);
                    }, 500)
                }}
            />

            <div 
                className={isOpenDesc ? `${ifsc}description show` : `${ifsc}description`} >
                {visibleImg.description}
            </div>

            <Button 
                className={`${ifsc}btn-left`}
                onBtnClick={e => console.log('left')}
                icon="IcoArrowLeft"
            />

            <Button
                className={`${ifsc}btn-right`}
                onBtnClick={e => console.log('right')}
                icon="IcoArrowRight"
            />

            <Button
                className={`${ifsc}btn-close`}
                onBtnClick={e => closeWidget(false)}
                icon="IcoClose"
            />

        </div>
    </div>
}