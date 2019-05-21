import '../assets/scss/vendor.scss';

// Imports all fontawesome core and solid icons

import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faBars,
    faBuilding,
    faCalendarAlt,
    faCarSide,
    faChartBar,
    faCircle,
    faDatabase,
    faFlag,
    faHome,
    faMapMarkedAlt,
    faMapMarkerAlt,
    faPeopleCarry,
    faSlash,
    faTimes,
    faTools,
    faUsers,
    faWalking
} from '@fortawesome/free-solid-svg-icons';

import { far } from '@fortawesome/free-regular-svg-icons';

// Adds the SVG icon to the library so you can use it in your page

library.add(faBars);
library.add(faBuilding);
library.add(faCalendarAlt);
library.add(faCarSide);
library.add(faChartBar);
library.add(faCircle);
library.add(faDatabase);
library.add(faFlag);
library.add(faHome);
library.add(faMapMarkedAlt);
library.add(faMapMarkerAlt);
library.add(faPeopleCarry);
library.add(faSlash);
library.add(faTimes);
library.add(faTools);
library.add(faUsers);
library.add(faWalking);

library.add(far.faCircle);
