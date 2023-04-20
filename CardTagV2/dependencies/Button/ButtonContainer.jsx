import React from "react";
import './ButtonContainer.sass';

export default ({ children, isVertical = false, style = {}, className, classList = [] }) => {
    return (
        <div
        	className = {[
                className, ...classList,
                isVertical ? "btn-container-vertical" : "btn-container-horizontal",
            ].join(" ")}
            style={{ ...style }}
        	>{children}
        </div>
    );
} 

