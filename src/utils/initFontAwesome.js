import {library} from "@fortawesome/fontawesome-svg-core";

import {
    faBars, faArrowAltRight, faCreditCard, faHandHoldingUsd, faHomeHeart, faCar, faPercent, faDollarSign, faMoneyBillWave, faGift, faGraduationCap, faPlaneDeparture, faChartLine, faBriefcase, faExchange
} from '@fortawesome/pro-light-svg-icons';

function initFontAwesome() {
    library.add(
        faBars,
        faArrowAltRight,
        faCreditCard,
        faHandHoldingUsd,
        faHomeHeart,
        faCar,
        faPercent,
        faDollarSign,
        faMoneyBillWave,
        faGift,
        faGraduationCap,
        faPlaneDeparture,
        faChartLine,
        faBriefcase,
        faExchange
    );
}

export default initFontAwesome;