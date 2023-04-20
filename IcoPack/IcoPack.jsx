import React from "react";

import ico_system from "./ico-system.js";
import ico_sections from "./ico-sections.js";
// // import ico_weather from "./ico-weather.js";

const icoPack = {
    ...ico_system,
    ...ico_sections,
    // ...ico_weather
}

export default ({icon}) => {
    const type = "SVG"
    return icoPack[icon] ? icoPack[icon] : null
}

    