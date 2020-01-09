import {library} from "@fortawesome/fontawesome-svg-core";

import {
    faBars, faArrowAltRight, faCreditCard, faHandHoldingUsd, faHomeHeart, faCar
} from '@fortawesome/pro-light-svg-icons';

function initFontAwesome() {
    library.add(
        faBars,
        faArrowAltRight,
        faCreditCard,
        faHandHoldingUsd,
        faHomeHeart,
        faCar
    );
}

export default initFontAwesome;