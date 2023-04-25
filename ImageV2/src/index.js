import React from 'react';
import ReactDOM from 'react-dom/client';
import '../../reset.css';
import '../../dependencies.css';
import Image from '../widget/Image.jsx';
import { objImg_1, objImg_2 } from "./test-image-list";

const e = React.createElement;
const AppReact = () => {

    const s = {
        width: '200px', 
        height: '200px',
    }

    return <>
        <div id="frame" style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                flexGrow: 1,
            }}>
            <Image objImg={{}} isFullScreen={true} style={s} />
            <Image 
                objectFit="contain" 
                objImg={objImg_2} 
                isFullScreen={true}
                style={s}
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