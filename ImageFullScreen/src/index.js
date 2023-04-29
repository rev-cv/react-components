import React from 'react';
import ReactDOM from 'react-dom/client';
import '../../reset.css';
import '../../dependencies.css';
import ImageFullScreen from '../widget/ImageFullScreen.jsx';


import { objImg_1, objImg_2, objImg_3 } from "test-images.js";


const e = React.createElement;
const AppReact = () => {

    const s = {
        width: '200px', 
        height: '200px',
    }

    return <>
        <div id="frame">

            <ImageFullScreen listObjImgs={[objImg_2, objImg_1, ]} />
            
        </div>

        <div style={{color: "white"}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>

        


        {/* ↓ кнопка переключения цветовой схемы */}
        <button
            className='change-theme'
            onClick={() => {
                document.body.classList.toggle('dark-theme')
            }}
        >dark<br />light</button>
    </>
}

const domContainer = document.querySelector('#root');
const root = ReactDOM.createRoot(domContainer);
root.render(e(AppReact));