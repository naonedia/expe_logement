import '../assets/scss/vendor.scss';

// Imports all fontawesome core and solid icons

import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faBars,
    faFlag,
    faChartBar,
    faPeopleCarry,
    faCircle,
    faTimes,
    faDatabase,
    faWalking,
    faCarSide,
    faMapMarkerAlt,
    faSlash,
    faHome,
    faBuilding,
} from '@fortawesome/free-solid-svg-icons';

import { far } from '@fortawesome/free-regular-svg-icons';

// Adds the SVG icon to the library so you can use it in your page

library.add(faBars);
library.add(faFlag);
library.add(faChartBar);
library.add(faPeopleCarry);
library.add(faCircle);
library.add(faTimes);
library.add(faDatabase);
library.add(faWalking);
library.add(faCarSide);
library.add(faMapMarkerAlt);
library.add(faSlash);
library.add(faHome);
library.add(faBuilding);
library.add(far.faCircle);
