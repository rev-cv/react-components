import React, { useState } from "react";
import './Image.sass';

const example_objImg = {
    path: "путь/до/картинки_на_сервере.png",
    src: "путь/до/картинке_на_стороннем_ресурсе.png",
    thumbnail: "путь/до/mini-картинки_на_сервере.png",

    picKey: "PIC-4457", 
    // ↑ код по которому картинка будет вставлена в нужное место в документе
    // актуально только для статей и не имеет отношения к самой картинке
    
    title: "У картинки может быть заголовок",
    description: "У картинки может быть описание",
    link: {
        title: "У картинки может быть прикрепленная ссылка",
        description: "У ссылки может быть описание",
        url: "адрес/ссылки.html"
    }
}

const IcoNoImage = <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" >
    <path d="M100 5.05036L94.9496 0L0 94.9496L5.05036 100L12.1932 92.8571H85.7143C87.6079 92.8546 89.4232 92.1012 90.7622 90.7622C92.1012 89.4232 92.8546 87.6079 92.8571 85.7143V12.1932L100 5.05036ZM85.7143 85.7143H19.3361L47.1679 57.8821L55.6636 66.3775C57.0031 67.717 58.8199 68.4695 60.7143 68.4695C62.6087 68.4695 64.4255 67.717 65.765 66.3775L71.4286 60.7143L85.7143 74.9904V85.7143ZM85.7143 64.8864L76.4793 55.6511C75.1397 54.3116 73.323 53.559 71.4286 53.559C69.5342 53.559 67.7174 54.3116 66.3779 55.6511L60.7143 61.315L52.225 52.8254L85.7143 19.3361V64.8864Z" fill="var(--color-content-100)" />
    <path d="M14.2864 71.4285V60.7143L32.1436 42.8692L37.0482 47.7739L42.105 42.7168L37.1943 37.806C35.8547 36.4665 34.0379 35.714 32.1436 35.714C30.2492 35.714 28.4324 36.4665 27.0928 37.806L14.2864 50.6128V14.2857H71.4293V7.14282H14.2864C12.3926 7.14471 10.5769 7.89787 9.23774 9.23701C7.8986 10.5761 7.14545 12.3919 7.14355 14.2857V71.4285H14.2864Z" fill="var(--color-content-100)" />
</svg >

const IcoLoading = <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M56.1587 11.5591C56.1587 17.9339 53.4221 37.1402 50.0468 37.1402C46.6841 37.1402 43.9287 17.9339 43.9287 11.5591C43.9287 5.17165 46.6778 0 50.0468 0C53.4221 0 56.1587 5.17795 56.1587 11.5591Z" fill="var(--color-content-100)" />
    <path fillRule="evenodd" clipRule="evenodd" d="M43.9355 88.548C43.9355 82.211 46.6784 63.1559 50.0537 63.1559C53.4227 63.1559 56.1592 82.211 56.1592 88.548C56.1592 94.8724 53.4227 100 50.0537 100C46.6721 100 43.9355 94.8724 43.9355 88.548Z" fill="var(--color-content-100)" />
    <path fillRule="evenodd" clipRule="evenodd" d="M11.6413 44.0882C18.06 44.0882 37.3975 46.8032 37.3975 50.1417C37.3975 53.4803 18.06 56.1827 11.6413 56.1953C5.21009 56.1827 0 53.4803 0 50.1417C0 46.8032 5.21009 44.0945 11.6413 44.0882Z" fill="var(--color-content-100)" />
    <path fillRule="evenodd" clipRule="evenodd" d="M88.4401 56.3842C82.0464 56.3842 62.8154 53.6126 62.8154 50.1921C62.8154 46.7716 82.0402 44 88.4401 44C94.8212 43.9874 100 46.7716 100 50.1921C100 53.6126 94.8212 56.3842 88.4401 56.3842Z" fill="var(--color-content-100)" />
    <path fillRule="evenodd" clipRule="evenodd" d="M82.5475 26.2173C78.0701 30.7212 62.6339 42.3559 60.2481 39.9622C57.8684 37.5622 69.4221 22.022 73.8995 17.5244C78.3895 13.0078 83.9753 11.3133 86.3549 13.7007C88.747 16.107 87.0312 21.707 82.5475 26.2173Z" fill="var(--color-content-100)" />
    <path fillRule="evenodd" clipRule="evenodd" d="M17.6341 74.4252C22.0865 69.9401 37.4224 58.4126 39.8083 60.8189C42.1942 63.2126 30.7282 78.6331 26.2696 83.1118C21.8297 87.5842 16.2877 89.2661 13.9018 86.8724C11.5222 84.4598 13.188 78.8913 17.6341 74.4252Z" fill="var(--color-content-100)" />
    <path fillRule="evenodd" clipRule="evenodd" d="M26.1506 17.5559C30.6969 22.1228 42.4572 37.7952 40.1089 40.1574C37.7606 42.5197 22.1929 30.6708 17.6404 26.1165C13.0941 21.5307 11.3093 15.9181 13.6576 13.5559C16.0059 11.1937 21.598 12.9826 26.1506 17.5559Z" fill="var(--color-content-100)" />
    <path fillRule="evenodd" clipRule="evenodd" d="M73.9685 82.9417C69.441 78.3937 57.7997 62.7528 60.2044 60.3339C62.609 57.9087 78.1579 69.6315 82.6729 74.1795C87.2004 78.7087 88.8975 84.359 86.4928 86.7842C84.0881 89.1968 78.471 87.4772 73.9685 82.9417Z" fill="var(--color-content-100)" />
</svg>

const IcoClosing = <svg className="ico-btn-close" width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.16998 14.83L14.83 9.17004" stroke="var(--color-content-100)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14.83 14.83L9.16998 9.17004" stroke="var(--color-content-100)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="var(--color-content-100)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
</svg>




export default ({ 
    objImg = {}, 
    style={},
    host = 'http://127.0.0.1:8000',
    // ↑ TEST. добавляет полный адрес к картинке при необходимости
    objectFit = "cover",
    // ↑ описывающет то, как картинка будет вписана в контейнер картинки
    isFullScreen = false,
    // ↑ разрешить разворачивать на весь экран?
    onClickByImage = undefined,
    // ↑ дейтствие при клике по картинке
    classList = [],
    // ↑ дополнительные классы переданные извне
    openedFullScreen = false,
    // ↑ было ли открыто окно «на весь экран» ранее?
    // данный функционал нужен только для того, чтобы 
    // переключать картинки находящиеся в слайдере
    isBlockToDirectFullScreenFromSlide = false
    // ↑ костыль. Посылается из ImagesSlider
    // блокирует инструкцию включения/выключения полноэкранного режима
    // передавая тем самым управление ImageSlider
    // блокируемая инструкия ↓ ↓ ↓
    // toogleFullScreen(isOpenFullScreen => !isOpenFullScreen);
    }) => {

    const [ isOpenFullScreen, toogleFullScreen ] = useState(openedFullScreen)
    const [ isLoaded, setLoaded ] = useState(false)
    const classes = [
        "image-box", 
        "image-loaded", 
        isFullScreen ? "pointer" 
            : onClickByImage ? "pointer"
            : null,
        ...classList
    ].join(" ")

    const src = objImg.src ? objImg.src
        : objImg.path ? objImg.path
        : IcoNoImage
    const thumbnail = objImg.thumbnail ? objImg.thumbnail : src

    const setImage = () => {
        // добавляет сордержимое блока image-box
        if (!objImg.src & !objImg.path) return IcoNoImage
        
        return <>
            {
                objImg.thumbnail ? <img src={thumbnail} className="image-box__background" />
                    : IcoLoading
            }
            
            <img 
                src={src} 
                className={
                    objectFit === "contain" ? "image-box__contain" : "image-box__cover"
                } 
                onLoad={e => setLoaded(true)} 
                loading="lazy"
            />
        </>
    }

    const actionByImage = (event) => {
        // обрабатывает событие клика по картинке

        if (isFullScreen & !isBlockToDirectFullScreenFromSlide) 
            toogleFullScreen(isOpenFullScreen => !isOpenFullScreen);

        if (onClickByImage) 
            onClickByImage(event);

        event.stopPropagation();
    }

    const setImageInFullScreen = () => {
        // добавляет блок показывающий картинку на весь экран
        if (isFullScreen & isOpenFullScreen | isFullScreen & openedFullScreen) {
            return <div
                className="image-box-in-full-screen"
                onClick={actionByImage}
                > 

                    <img src={src} />
                    {setDescription()}
                    {IcoClosing}

            </div>
        }
    }

    const setDescription = () => {
        // добавляет описание к картинке (если оно есть), когда картинка развернута на весь экран
        const isTitle = objImg.title !== undefined | objImg.title !== null
        const isDescription = objImg.description !== undefined | objImg.description !== null
        const isLink = objImg.link !== undefined | objImg.link !== null

        if (isTitle | isDescription | isLink ){
            return <div 
                className="image-box-in-full-screen__info"
                onClick={e => {
                    e.currentTarget.classList.add("image-box-in-full-screen__info__over-mouse")
                    e.stopPropagation()
                }}
                onMouseOver={e => {
                    e.currentTarget.classList.add("image-box-in-full-screen__info__over-mouse")
                }}
                >

                <div className="image-box-in-full-screen__info__mes">
                    {
                        isTitle ? <div className="image-box-in-full-screen__info__mes__title">
                            {objImg.title}
                        </div> : null
                    }

                    {
                        isDescription ? <div className="image-box-in-full-screen__info__mes__text">
                            {objImg.description}
                        </div> : null
                    }

                    {
                        isLink ? <div className="image-box-in-full-screen__info__mes__link">
                            виджет «Link»
                        </div> : null
                    }
                </div>

            </div>
        }
    }

    return <>
        <div
            className={isLoaded ? classes : "image-box"}
            style={{...style}}
            onClick={actionByImage}
            > { setImage() }
        </div>
        { setImageInFullScreen() }
    </>
    
    

}