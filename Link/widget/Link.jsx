import React, { useState, useRef } from "react";
import Hint from 'LinkHint.jsx';
import 'Link.sass';


const eol = {
    "anid": "4g5t-7ert-5478-jhff-0000",
    "type_link": "url",
    "link": "https://ru.wikipedia.org/wiki/",
    "is_partner": false,
    "title": "Wikipedia",
    "message": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "cover": {} // objImg
}


export default ({ children, objLink = eol, style = {}, isHint=true, isReactLink = false, href=""}) => {

    // const [showHint, signalShowMouse] = useState(false)
    const [directHint, setDirectHint] = useState({
        event: null,    // событие вызвавшее отрисовку Hint
        block_1: false, // блок для Hint по наведении на ссылку
        block_2: false, // блок для Hint по наведении на Hint
    })

    const [event, setEvent] = useState(null)
    const [block_1, setBlock1] = useState(false)
    const [block_2, setBlock2] = useState(false)

    let showHintTimer = false
    let hideHintTimer = false

    const setHint = () => {
        
        if (!block_1 & !block_2) {
            // если не одного блока, Hint не отрисовывается
            return null
        }

        return <Hint
            event={event}
            objLink={objLink}
            setBlock2={setBlock2}
        />
    }

    if (isReactLink) return <></>

    return <>
        <a 
            className="link-custom"
            style={style}
            href={href ? href : objLink.link}
            onMouseOver={ e=> {
                clearTimeout(hideHintTimer);
                showHintTimer = setTimeout(() => {
                    setEvent(e);
                    setBlock1(true);
                    // setBlock2(true);
                }, 500)
            }}
            onMouseLeave={e => {
                clearTimeout(showHintTimer);
                hideHintTimer = setTimeout(() => {
                    setBlock1(false);
                }, 500)
            } }
            >{children ? children : "link"} 
        </a>
        {setHint()}
    </>
}

