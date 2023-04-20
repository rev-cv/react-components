import React from 'react';
import ReactDOM from 'react-dom/client';
import '../../reset.css';
import '../../dependencies.css';
import LinkCustom from '../widget/Link.jsx';

const e = React.createElement;

const AppReact = () => {

    return <>
        <div id="frame" style={{ 
                flexGrow: 1, 
                display: 'flex', 
                flexDirection: 'column',
                justifyContent: 'center',
                alignContent: 'center',
                maxWidth: '45em',
            }}>

            <div style={{ color: "var(--color-content-100)", lineHeight: "1.6em"}}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud <LinkCustom>exercitation ullamco laboris nisi ut aliquip</LinkCustom> ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat <LinkCustom /> non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>
            <br />
            <div style={{ color: "var(--color-content-100)", lineHeight: "1.6em" }}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud <LinkCustom>exercitation ullamco laboris nisi ut aliquip</LinkCustom> ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat <LinkCustom /> non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>
        </div>

        {/* ↓ кнопка переключения цветовой схемы */}
        <button
            className='change-theme'
            onClick={() => {
                document.body.classList.toggle('dark-theme')
            }}
            >dark<br />light
        </button>
    </>
}

const domContainer = document.querySelector('#root');
const root = ReactDOM.createRoot(domContainer);
root.render(e(AppReact));