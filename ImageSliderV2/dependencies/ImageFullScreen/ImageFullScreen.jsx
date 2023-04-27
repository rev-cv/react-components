import React, { useState } from "react";
import Image from "Image.jsx";
import Button from "Button.jsx";
import 'ImageFullScreen.sass';


export default ({ listObjImgs = [{},], index = 0, style = {}, returnFunc = index => index }) => {

    const [currentIndexImg, setCurrentIndexImg] = useState(index)
    const visibleImg = listObjImgs[currentIndexImg]

    const [isOpenWidget, closeWidget] = useState(true)

    const [isOpenDesc, setStatusDesc] = useState(false)
    const [offset, setOffset] = useState('offset-center') // offset-left, offset-right

    let showHintTimer = false
    let hideHintTimer = false
    
    const ifsc = "image-full-screen__canvas__"

    const newImg = (direction) => {
        setOffset('offset-hide')
        setTimeout(() => {
            if (direction == 'back') {
                if (currentIndexImg - 1 < 0) {
                    setCurrentIndexImg(listObjImgs.length - 1)
                } else {
                    setCurrentIndexImg(currentIndexImg - 1)
                }
                setOffset('offset-left')
            } else if (direction == 'next') {
                if (currentIndexImg + 1 >= listObjImgs.length) {
                    setCurrentIndexImg(0)
                } else {
                    setCurrentIndexImg(currentIndexImg + 1)
                }
                setOffset('offset-right')
            }
        }, 200);
    }

    const instructionExit = () => {
        setOffset('offset-hide')
        setTimeout(() => {
            closeWidget(false);
            returnFunc(currentIndexImg);
        }, 150)
    }

    if (!isOpenWidget) return null

    return <div className={`image-full-screen ${offset}`} style={style} >

        <div className="image-full-screen__canvas">

            <Image
                className={`${ifsc}img`}
                objImg={visibleImg}
                objectFit="contain"
                onClickByImage={e => instructionExit()}
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

            {
                listObjImgs.length > 1 ?
                    <>
                        <Button
                            className={`${ifsc}btn-left`}
                            onBtnClick={e => newImg('back')}
                            icon="IcoArrowLeft"
                        />

                        <Button
                            className={`${ifsc}btn-right`}
                            onBtnClick={e => newImg('next')}
                            icon="IcoArrowRight"
                        />

                        <div className={`${ifsc}counter`}>
                            {`${currentIndexImg + 1} / ${listObjImgs.length}`}
                        </div>
                    </>
                    : null
            }

            <Button
                className={`${ifsc}btn-close`}
                onBtnClick={e => instructionExit()}
                icon="IcoClose"
            />

        </div>
    </div>
}