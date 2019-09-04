import '../assets/scss/vendor.scss';

// Imports all fontawesome core and solid icons

import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faBroom,
    faChartPie,
    faCogs,
    faDatabase,
    faLayerGroup,
    faMagic,
    faSearch,
    faServer,
    faTimes
} from '@fortawesome/free-solid-svg-icons';

import { far } from '@fortawesome/free-regular-svg-icons';

// Adds the SVG icon to the library so you can use it in your page

library.add(faBroom);
library.add(faChartPie);
library.add(faCogs);
library.add(faDatabase);
library.add(faLayerGroup);
library.add(faMagic);
library.add(faSearch);
library.add(faServer);
library.add(faTimes);
