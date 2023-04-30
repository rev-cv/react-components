import React from "react";
import Button from "Button.jsx";


import { search_types } from "test-search-types.js";


export default ({ tabs, setTypeOfSearch, updateVisibleTabs, getVisibleTabs, typeOfSearch }) => {
    return Object.values(search_types).map((item, index, array) => (

        <Button

            key={`.search-properties > .what > ${index}`}

            classList={[
                item.type === typeOfSearch ? 'select' : null,
                item.type === "all" ? 'select_how_all' : null,
            ]}

            icon={item.icon}

            onBtnClick={e => {
                setTypeOfSearch(item.type);
                updateVisibleTabs(
                    getVisibleTabs(
                        tabs.tags ? "tags"
                            : tabs.filters ? "filters"
                                : tabs.periods ? "periods" : "find_in",
                        item.type
                    )
                );
            }}

            >{item.desc}

        </Button>

    ))
}