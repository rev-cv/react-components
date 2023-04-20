// changed 2023-04-15
import React, { useState } from "react";
import Button from "Button.jsx";
import ButtonContainer from "ButtonContainer.jsx";
import { tags } from "./test-tags.js";
import Tag from './Tag.jsx';


const excludeTags = (id) => {
    const excludes = []

    const excludeParents = (parent_id) => {
        // → убирает из списка зафиксированных тегов все родительские теги 
        excludes.push(parent_id)
        if (parent_id != undefined & parent_id != 0) {
            excludeParents(
                tags.filter(elem => elem.id === parent_id)[0].parent_id
            )
        }
    }

    const excludeChildren = (child_id) => {
        // → убирает из списка зафиксированных тегов все дочерние теги 
        if (tags.filter(elem => elem.id === child_id)[0].is_children) {
            tags.filter(elem => elem.parent_id === child_id).map(elem => {
                excludes.push(elem.id)
                excludeChildren(elem.id)
            })
        }
    }

    excludeParents(id)
    excludeChildren(id)
    return excludes
}

export default ({
    parent_id = 0,
    returnTagsFixed = (result) => (console.log(result))
}) => {

    // ↓ список ID выбранный тегов
    const [fixedIDTags, updateFixedTags] = useState([])
    const [generalDad, setParentForPage] = useState(0)
    // ↑ папочка чьи дети сейчас отображаются
    // если значение -1, то включается особый режим 
    // отображающий только добавленные теги


    const fixIDTags = (newID) => {
        // 1. фиксирует добавление тега в список fixedIDTags
        // 2. удаляет из fixedIDTags всех родителей и детей данного тега
        // ↑ иначе это не имеет смысла, ведь у выбранного тега ве дети учавствуют в поиске
        // 3. с помощью returnTagsFixed передает список добавленных тегов инициатору
        const isDel = fixedIDTags.includes(newID)
        const exclude = excludeTags(newID)
        const newFixedIDTags = fixedIDTags.filter(elem => !exclude.includes(elem))
        if (!isDel) newFixedIDTags.push(newID)
        updateFixedTags(newFixedIDTags)

        if (typeof returnTagsFixed === 'function') {
            // → возвращает в переданную функцию список добавленных тегов
            returnTagsFixed(
                tags.filter(tag => newFixedIDTags.includes(tag.id))
            )
        }
    }


    // ↓ теги, которые должны быть отображены на странице
    const current_page = !(generalDad === -1) ?
        // ↓ теги с родителем указанным в generalDad
        tags.filter(elem => elem.parent_id === generalDad)
        :
        // ↓ добавленные теги (специальный режим отображения только добавленных тегов)
        tags.filter(elem => fixedIDTags.includes(elem.id))

    if (current_page.length === 0 & generalDad === -1) setParentForPage(0)
    // выход из режима просмотра ТОЛЬКО добавленных тегов
    // ↑ если нет тегов для отображения в этом режиме
    // ↑ возврат в обычный режим и переход на домашнюю страницу

    const buildBreadCrumbs = (parent_id, array) => {
        // генерация «хлебных крошек»
        const current_tag = tags.filter(elem => elem.id === parent_id)[0]
        if (current_tag != undefined) {
            array.unshift(
                generalDad != current_tag.id ?
                    <Button
                        key={`btn-bread => ${current_tag.id}`}
                        className="tag-container__bar__bread-crumbs__btn-bread"
                        onBtnClick={e => setParentForPage(current_tag.id)}
                    >{current_tag.tag}
                    </Button>
                    :
                    // ↓ последняя «крошка» не должна быть кнопкой
                    <div
                        key={`btn-bread => ${current_tag.id}`}
                        className="tag-container__bar__bread-crumbs__message"
                    >{current_tag.tag}
                    </div>
            )
            // ↓ разделительный знак между «крошками»
            array.unshift(
                <div key={`btn-bread-splach => ${current_tag.id}`}>·</div>
            )
            return buildBreadCrumbs(current_tag.parent_id, array)
        }
        return array
    }

    const bread_crumbs = buildBreadCrumbs(generalDad, [])
    // ↑ дорожка из хлебных крошек отображаемая в баре с тегами

    if (generalDad === -1) {
        // если включен режим просмотра добавленных тегов
        // то вместо хлебных дорожек отображается сообщение
        bread_crumbs.unshift(
            <div
                key='btn-bread-splach => message'
                className="tag-container__bar__bread-crumbs__message"
            >добавленое
            </div>
        )
        bread_crumbs.unshift(
            <div key={`btn-bread-splach => -1`}>·</div>
        )
    }

    // ↓ «в хлебных крошках» всегда самая первая кнопка → возврат домой
    bread_crumbs.unshift(
        <Button
            key={'btn-bread => home'}
            className="tag-container__bar__bread-crumbs__btn-home"
            icon="IcoHome"
            onBtnClick={e => setParentForPage(0)}
        />
    )


    const search_for_tags_with_fixed_children = () => {
        // поиск всех тегов, у которых имеются добавленные дочерние теги
        const array = []

        const searchParents = (parent_id) => {
            // → убирает из списка зафиксированных тегов все родительские теги 
            array.push(parent_id)
            if (parent_id != undefined & parent_id != 0) {
                searchParents(
                    tags.filter(elem => elem.id === parent_id)[0].parent_id
                )
            }
        }

        fixedIDTags.forEach(idtag => searchParents(idtag))
        return array.filter(item => !fixedIDTags.includes(item))
    }

    let parentID_with_included_tags = search_for_tags_with_fixed_children()
    // ↑ список родителей у которых добавлены теги
    // необходимо как-то визуализировать наличие у родителей добавленных тегов



    return <div className="tag-container">

        <div className="tag-container__bar">

            <div className="tag-container__bar__bread-crumbs">
                {bread_crumbs}
            </div>

            {
                !(fixedIDTags.length > 0) ? null :
                    <ButtonContainer>

                        <Button
                            className="tag-container__bar__bread-crumbs__btn-bread"
                            icon="IcoAttachedFiters"
                            onBtnClick={e => generalDad != -1 ? setParentForPage(-1) : setParentForPage(0)}
                        >{fixedIDTags.length}
                        </Button>

                        <Button
                            className="tag-container__bar__bread-crumbs__btn-bread"
                            icon="IcoClose"
                            onBtnClick={e => updateFixedTags([])}
                        >
                        </Button>

                    </ButtonContainer>
            }

        </div>

        <div className="tag-container__tag-list">
            {
                current_page.map((item, index, array) => (
                    <Tag
                        key={`tag-container=>tag:${index}`}
                        tagObj={item}
                        tagsAll={tags}
                        onFix={fixIDTags}
                        fixedIDTags={fixedIDTags}
                        setParentForPage={setParentForPage}
                        parentsID={parentID_with_included_tags}
                    />
                ))
            }
        </div>

    </div>
}