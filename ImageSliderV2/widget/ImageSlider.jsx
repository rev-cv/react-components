import React, { useState } from "react";
import Image from "Image.jsx";
import Button from "Button.jsx";
import ImageFullScreen from "ImageFullScreen.jsx";
import LinkCustom from "Link.jsx";
import 'ImageSlider.sass';


export default ({ 
    listObjImgs = [{},],
    index = 0, 
    isFullScreen = true,
    isDescription = true,
    style = {},
    returnFunc = index => index 
}) => {

    const [currentIndexImg, setCurrentIndexImg] = useState(index)
    const visibleImg = listObjImgs[currentIndexImg]
    const [offset, setOffset] = useState('offset-none') // offset-left, offset-right
    const [openFullScreen, toogleFullScreen] = useState(-1)


    const newImg = (index) => {

        let osettingOffset = 'offset-none'
        if (currentIndexImg < index) {
            osettingOffset = 'offset-s-right'
        } else if (index < currentIndexImg) {
            osettingOffset = 'offset-s-left'
        } else {
            return false
        }

        index = index > listObjImgs.length - 1 ? 0 : index < 0 ? listObjImgs.length - 1 : index

        setOffset('offset-s-hide')

        setTimeout(() => {
            setOffset(osettingOffset);
            setCurrentIndexImg(index);
        }, 200);
    }


    const isT = typeof visibleImg.title === 'string' & visibleImg.title != ""
    const isD = typeof visibleImg.description === 'string' & visibleImg.description != ""
    const isL = typeof visibleImg.link === 'object' & visibleImg.link != undefined
    if (isDescription & (!isT & !isD & !isL)) isDescription = false


    return <div className={`image-slider ${offset}`} style={style} >

        <div className='image-slider__canvas' >

            <div className="image-slider__canvas__img">

                <Image
                    className={isFullScreen ? "pointer" : null}
                    objImg={visibleImg}
                    objectFit="contain"
                    onClickByImage={e => {
                        console.log(currentIndexImg);
                        toogleFullScreen(currentIndexImg);
                    }}
                />

                {
                    listObjImgs.length > 1 ?
                        <>
                            <Button
                                className="image-slider__canvas__img__btn-left"
                                onBtnClick={e => newImg(currentIndexImg - 1)}
                                icon="IcoArrowLeft"
                            />

                            <Button
                                className="image-slider__canvas__img__btn-right"
                                onBtnClick={e => newImg(currentIndexImg + 1)}
                                icon="IcoArrowRight"
                            />
                        </>
                        : null
                }
                
            </div>
            
        </div>


        {/* ↓↓↓ ПРЕВЬЮШКИ ВСЕХ КАРТИНОК В СЛАЙДЕРЕ ↓↓↓ */}
        {
            listObjImgs.length > 1 ?
                <div className="image-slider__thumbs">
                    {
                        listObjImgs.map((objImg, indexObjImg) => (
                            <Image
                                key={`image-slider → thumb-${indexObjImg}`}
                                className={indexObjImg === currentIndexImg ? "selected" : "not-selected"}
                                objImg={objImg}
                                objectFit="cover"
                                onClickByImage={e => newImg(indexObjImg)}
                            />
                        ))
                    }
                </div>
                : null
        }
        


        {/* ↓↓↓ ОПИСАНИЕ К КАРТИНКЕ ↓↓↓ */}
        {
            !(isDescription) ? null :
                <div className="image-slider__description">

                    {
                        !isT ? null :
                            <div
                                className="image-slider__description__title"
                                children={visibleImg.title}
                            />
                    }

                    {
                        !isD ? null : <div children={visibleImg.description} />
                    }

                    {
                        !isL ? null :
                            <div className="image-slider__description__link">
                                <LinkCustom objLink={visibleImg.link} isHint={false} />
                                {/* <a href={visibleImg.link.url} >{visibleImg.link.title}</a> */}
                            </div>
                    }

                </div>
        }

        {
            openFullScreen >= 0 ?
                <ImageFullScreen
                    listObjImgs={listObjImgs}
                    index={currentIndexImg}
                    returnFunc={index => {
                        toogleFullScreen(-1);
                        setOffset('offset-none')
                        setCurrentIndexImg(index)
                    }}
                />
                : null
        }
    </div>
}