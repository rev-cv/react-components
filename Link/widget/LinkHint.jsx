import React, { useState, useRef } from "react";

export default ({ event, objLink, setBlock2 }) => {

    let hideTimer = false

    if (!event) return null

    const considerStyles = () => {

        let left = event.clientX - 5
        let top = event.clientY
        const isTop = event.clientY === event.target.offsetTop

        // ↓ сместит Hint от правого края
        if (window.innerWidth < left + 300) {
            left = window.innerWidth - 300
        }

        // ↓ сместит Hint от верхнего края
        if (top < 300 & isTop){
            top = 300
        // ↓ сместит Hint от нижнего края
        } else if (window.innerHeight < top + 300 ){
            top = window.innerHeight - 300
        }

        return {
            left, top,
            transform: isTop ? "translateY(calc(-100% - .5em))" : 0
        }
    }

    return <div 
        className="link-custom-hint" 
        style={considerStyles()}
        onMouseOver={e => {
            clearTimeout(hideTimer)
            setBlock2(true)
        }}
        onMouseLeave={e => {
            hideTimer = setTimeout(() => {
                setBlock2(false)
            }, 500)
        }}
        >
        
        <div className="link-custom-hint__container" >
            {
                objLink.title ?
                    <h3 className="link-custom-hint__title">{objLink.title}</h3> : null
            }

            {
                objLink.message ?
                    <div className="link-custom-hint__message">{objLink.message}</div> : null
            }
        </div>

        


    </div>
}