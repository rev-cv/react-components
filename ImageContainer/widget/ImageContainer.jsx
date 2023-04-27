import React, { useState } from "react";
import Image from "Image.jsx";
import ImageFullScreen from "ImageFullScreen.jsx";
import 'ImageContainer.sass';


export default ({ listObjImgs = [{},], style = {}, isFullScreen = true, objectFit ='cover' }) => {

    const [openFullScreen, toogleFullScreen] = useState(-1)

    return <div className={`image-group group-${listObjImgs.length}`} style={style}>

        {
            listObjImgs.map( (objImg, indexObjImg) => (
                <Image 
                    key={`image-group → ${indexObjImg}`}
                    className={isFullScreen ? "pointer" : undefined}
                    objImg={objImg}
                    onClickByImage={e => toogleFullScreen(indexObjImg)}
                    objectFit={objectFit}
                />
            ))
        }

        {
            openFullScreen >= 0 ?
                <ImageFullScreen 
                    listObjImgs={listObjImgs} 
                    index={openFullScreen} 
                    returnFunc={index => toogleFullScreen(-1)}
                />
                : null
        }

    </div>
}