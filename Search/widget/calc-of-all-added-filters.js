/*
Функция объединяет все фильтры (периоды актуальности, теги, фильтры растений) ↲
что нужно для того, чтобы визуально отобразить все фильтры.
*/

export const calcFilters = ({
    initialized,
    attachedTags,
    attachedPlantFilters,
    attachedActuals,
    attachedVisibleFiltes,
    setVisibleFiltes,
}) => {
    console.log(attachedActuals)

    if (initialized === false) {
        // initialized == false — инициализация на удаление filterDelete

    } else {

        let isSomething = false
        if (initialized === "tag" & attachedTags.length > 0) {
            isSomething = true
        } else if (initialized === "plant_filter" & attachedPlantFilters.length > 0) {
            isSomething = true
        } else if (initialized === "actual_date" & attachedActuals.length > 0) {
            isSomething = true
        }

        // STEP 1: удалить из attachedVisibleFiltes уже удаленные фильтры

        if (isSomething) {

            const elemWillDelete = []

            attachedVisibleFiltes.forEach((x, index) => {
                // нужный элемент все еще существует в массиве?
                switch (initialized) {
                    case "tag":
                        if (attachedTags.find(e => x.id_elem === e.id) === undefined) {
                            elemWillDelete.push(index)
                        }
                        break
                    case "plant_filter":
                        break
                    case "actual_date":
                        break
                }
            })

            // STEP 2: добавление отсутствующих фильтров

            const addingFilter = []

            switch (initialized) {
                case "tag":
                    const tuy = []

                    attachedVisibleFiltes.forEach(x => {
                        if (x.type === "tag") tuy.push(x.id_elem)
                    })

                    attachedTags.forEach(x => {
                        if (!tuy.includes(x.id)) {
                            addingFilter.push({
                                type: "tag",
                                text: x.tag,
                                id_elem: x.id,
                                icon: "IcoTags"
                            })
                        }
                    })

                    break
                case "plant_filter":

                    break
                case "actual_date":

                    break
            }

            setVisibleFiltes([
                ...attachedVisibleFiltes.filter(
                    (item, index) => !elemWillDelete.includes(index)
                ),
                ...addingFilter
            ])

        } else {
            // если не найдено последнего эелемента в массиве-инициаторе ↲
            // то значит массив пуст и все целевые фильтры ↲
            // для этого массива должны быть удалены
            setVisibleFiltes([
                ...attachedVisibleFiltes.filter(
                    item => item.type === "plant_filter"
                )
            ])
        }
    }
}