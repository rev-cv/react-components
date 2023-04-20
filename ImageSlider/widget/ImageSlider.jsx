import React, { useState } from "react";
import Image from "Image.jsx";
import Button from "Button.jsx";
import 'ImageSlider.sass';


export default ({ images_objects = [], style = {}, objectFit = "cover", isFullScreen = false }) => {
    /*
        - images_objects ← стандартизированные объекты содержащие картинку
        - objectFit ← как будет картинка вписана в контейнер слайдера?
            - "cover" ← заполнена картинкой вся область
            - "contain" ← вписана в область по наибольшей стороне
        - isFullScreen ← при клике по картинке разворачивать на весь экран?
    */

    if (images_objects.length < 1) return null
    
    const [displayed, displayImg] = useState(0)
    const [isOpenFullScreenInSlider, toogleFullScreenFromSlider] = useState(false)

    const switching = (event, side) => {
        if (side == "right"){
            images_objects.length == displayed + 1 ? 
                displayImg(0) : displayImg(displayed + 1)
        } else if (side == "left") {
            displayed == 0 ? 
                displayImg(images_objects.length - 1) : displayImg(displayed - 1)
        }
        event.stopPropagation();
    }

    return <div 
            className={isOpenFullScreenInSlider ? `image-slide slider-full-screen` : `image-slide`} 
            style={style} 
            >

            <div className="image-slide__slides">
                {
                    images_objects.map((img, i) =>

                        <div 
                            className={[
                                    "image-slide__slides__slide",
                                    displayed == i ? "slide-show" : "slide-hide"
                            ].join(" ") }
                            key={`image_in_slider >> number = ${i}`}
                            >

                            <Image
                                objImg={img}
                                objectFit={objectFit}
                                isFullScreen={isFullScreen}
                                openedFullScreen={isOpenFullScreenInSlider}
                                onClickByImage={
                                    e => toogleFullScreenFromSlider(
                                        isOpenFullScreenInSlider => !isOpenFullScreenInSlider
                                    ) 
                                }
                                isBlockToDirectFullScreenFromSlide={true}
                            />

                            <div className="image-slide__slides__slide__desc"></div>

                        </div>

                    )
                }
            </div>

            <Button 
                classList={["image-slide__btn-left-switching"]} 
                onBtnClick={e => switching(e, "left")}
                icon="IcoArrowLeft"
            />

            <div className="image-slide__status-switching">
                {`${displayed+1} / ${images_objects.length}`}
            </div>

            <Button 
                classList={["image-slide__btn-right-switching"]} 
                onBtnClick={e => switching(e, "right")}
                icon="IcoArrowRight"
            />
    </div>
}