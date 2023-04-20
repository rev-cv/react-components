import React from "react";
import './AnimationBubble.css';

export default ({ x, y, w }) => {
    if (x === 0) return null
    return <div
        className={`btn-animation-bubble`}
        style={{
            top: y - (w / 2),
            left: x - (w / 2),
            width: w,
            height: w,
        }}
    />
}