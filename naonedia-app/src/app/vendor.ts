import '../assets/scss/vendor.scss';

// Imports all fontawesome core and solid icons

import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faBars,
    faFlag,
    faChartBar,
} from '@fortawesome/free-solid-svg-icons';

// Adds the SVG icon to the library so you can use it in your page
library.add(faBars);
library.add(faFlag);
library.add(faChartBar);
