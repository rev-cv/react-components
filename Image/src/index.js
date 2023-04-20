import React from 'react';
import ReactDOM from 'react-dom/client';
import '../../reset.css';
import '../../dependencies.css';
import Image from '../widget/Image.jsx';
import { objImg_1, objImg_2 } from "./test-image-list";

const e = React.createElement;
const AppReact = () => {

    return <>
        <div id="frame" style={{width: '200px', height: '200px'}}>
            <Image objImg={objImg_1} isFullScreen={true} />
            <Image 
                objectFit="contain" 
                // style={{ marginTop: "10px", height: "400px", width: "400px" }} 
                objImg={objImg_2} isFullScreen={true}
            />
        </div>


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