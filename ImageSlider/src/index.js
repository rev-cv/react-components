import React from 'react';
import ReactDOM from 'react-dom/client';
import '../../reset.css';
import '../../dependencies.css';
import ImageSlider from '../widget/ImageSlider.jsx';

const e = React.createElement;
const AppReact = () => {

    const objImg_1 = {
        path: null,
        src: "https://www.russiadiscovery.ru/upload/files/files/Kavkazskie_gory.jpg",
        thumbnail: null,

        picKey: "PIC-4457",
        // ↑ код по которому картинка будет вставлена в нужное место в документе
        // актуально только для статей и не имеет отношения к самой картинке

        title: "Картинка №245",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        link: {
            title: "У картинки может быть прикрепленная ссылка",
            description: "У ссылки может быть описание",
            url: "адрес/ссылки.html"
        }
    }

    const objImg_2 = { ...objImg_1, src: "https://kipmu.ru/wp-content/uploads/mountain.jpg" }
    const objImg_3 = { ...objImg_1, src: "https://moya-planeta.ru/upload/images/xl/95/fe/95fe44d0e5fe53e49d874f9c2e07381ca8ea823a.jpg" }
    const objImg_4 = { ...objImg_1, src: "https://sutochno.ru/doc/images/galleries/180/vershina1.jpg" }
    const objImg_5 = { ...objImg_1, src: "https://interesnyefakty.org/wp-content/uploads/Interesnye-fakty-o-gorah.jpg" }
    const objImg_6 = { ...objImg_5 }
    const objImg_7 = { ...objImg_5 }
    const objImg_8 = { ...objImg_5 }
    const objImg_9 = { ...objImg_5 }

    return <>
        <div id="frame" style={{ width: "400px", height: '400px'}}>
            <ImageSlider 
                isFullScreen={true}
                objectFit="contain"
                images_objects = {[
                    objImg_1,
                    objImg_2,
                    objImg_3,
                    objImg_4,
                    // objImg_5,
                ]}
            />
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