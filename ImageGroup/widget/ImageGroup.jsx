import React from "react";
import 'ImageGroup.sass';

export default ({ style={}, children=[] }) => {

    if (children.length > 9 | children.length < 1) return null

    return <div 
        className={`image-group group-${children.length}`} 
        style={style}
        >{children}        
    </div>
}