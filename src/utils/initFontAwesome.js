import {library} from "@fortawesome/fontawesome-svg-core";

import {
    faBars, faArrowAltRight
} from '@fortawesome/pro-light-svg-icons';

function initFontAwesome() {
    library.add(
        faBars,
        faArrowAltRight
    );
}

export default initFontAwesome;