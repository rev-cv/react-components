import React from "react";
import Image from "Image.jsx";
import 'ImageContainer.sass';


export default ({ listObjImgs = [{},], style = {}, isFullScreen=true }) => {

    return <div className={`image-group group-${listObjImgs.length}`} style={style}>
        {
            listObjImgs.map( (objImg, indexObjImg) => (
                <Image 
                    key={`image-group → ${indexObjImg}`}
                    objImg={objImg}
                    className={isFullScreen? "pointer" : undefined}
                />
            ))
        }
    </div>
}