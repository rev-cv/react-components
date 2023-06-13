import React, { useState } from "react";
import Button from "Button.jsx";
import ButtonContainer from "ButtonContainer.jsx";
import { allfilters } from "test-all-plant-filters.js";
// import Folder from 'Folder.jsx';
// import Filter from 'Filter.jsx';
// import Form from 'Form.jsx';
import 'Filter.sass';


export default ({
    allFilters = allfilters,
    attachedFilters = [],
    returnAttachedFiltersFixed = (result) => (console.log(result))
}) => {

    const [attachedIDFilters, updateAttachedFilters] = useState([])
    const [generalDad, setParentForPage] = useState(0)


    // ↓ теги, которые должны быть отображены на странице
    const current_page = !(generalDad === -1) ?
        // ↓ теги с родителем указанным в generalDad
        allFilters.filter(x => x.p === generalDad)
        :
        // ↓ добавленные теги (специальный режим отображения только добавленных тегов)
        // allFilters.filter(elem => fixedIDTags.includes(elem.id))
        []


    return <div className="plant-filter-container">

        <div className="plant-filter-container__bar">

            <div className="plant-filter-container__bar__bread-crumbs">
                123456
            </div>

            {
                !(attachedIDFilters.length == 0 ) ? null :
                    <ButtonContainer>

                        <Button
                            className="tag-container__bar__btn-bread"
                            icon="IcoAttachedFiters"
                            onBtnClick={e => {}}
                            children={124}
                        />

                        <Button
                            className="tag-container__bar__btn-bread clear"
                            icon="IcoClose"
                            onBtnClick={e => {}}
                        />

                    </ButtonContainer>
            }

        </div>

        {allFilters.length}

        {
            current_page.map(x => <div>{x.n}</div>)
        }

        
    </div>


}