import { addToClickCount } from '../../utils/middleware';

const initialAppState = {
    loadingOffers: false,
    showDrawer: false,
    captured: {
        eid: null,
        uid: null,
        vendor: null,
        deviceType: null,
        geoLocale: null
    },
    flowState: {
        vertical: null,
        loan_type: null,
        debt_type: 'N/A',
        debt_amount: 'N/A',
        checking_optin: false,
        debt_optin: false,
        email_optin: false
    },
    program_id: null,
    click_count: 0,
    offers: null,
    link: null,
    email: null
};

const appStateReducer = (state, action) => {
    switch (action.type) {

        case 'SHOW_DRAWER':
            return {
                ...state,
                showDrawer: true
            };        

        case 'HIDE_DRAWER':
            return {
                ...state,
                showDrawer: false
            };        
// Flow Selections
        case 'VERTICAL_PICKED':
            return {
                ...state,
                flowState: {
                    ...state.flowState,
                    vertical: action.payload
                }
            };

        case 'LOAN_TYPE_PICKED':
            return {
                ...state,
                flowState: {
                    ...state.flowState,
                    loan_type: action.payload
                }
            };

        case 'DEBT_TYPE_PICKED':
            return {
                ...state,
                flowState: {
                    ...state.flowState,
                    debt_type: action.payload
                }
            };

        case 'DEBT_AMOUNT_PICKED':
            return {
                ...state,
                flowState: {
                    ...state.flowState,
                    debt_amount: action.payload
                }
            };

        case 'CHECKING_OPT_IN':
            return {
                ...state,
                flowState: {
                    ...state.flowState,
                    checking_optin: true
                }
            };

        case 'CHECKING_OPT_OUT':
            return {
                ...state,
                flowState: {
                    ...state.flowState,
                    checking_optin: false
                }
            };

        case 'DEBT_OPT_IN':
            return {
                ...state,
                flowState: {
                    ...state.flowState,
                    debt_optin: true
                }
            };

        case 'DEBT_OPT_OUT':
            return {
                ...state,
                flowState: {
                    ...state.flowState,
                    debt_optin: false
                }
            };
        
        case 'EMAIL_OPT_IN':
            return {
                ...state,
                flowState: {
                    ...state.flowState,
                    email_optin: true
                },
                email: action.payload
            };

        case 'FETCH_OFFERS':
            return {
                ...state,
                loadingOffers: true
            };

        case 'FETCH_OFFERS_SUCCESS':
            const { click_count, _id } = action.payload;
            if(!!_id) { addToClickCount(_id); }
            
            return {
                ...state,
                click_count: click_count || 0,
                program_id: _id || 'Unknown PID'
            };

        case 'FETCH_OFFERS_FAILURE':
            return {
                ...state
            };

        case 'SELECTED_OFFER':
            return {
                ...state,
                link: action.payload,
                loadingOffers: false
            };

        case 'RESET':
            return initialAppState;        

        default:
            throw new Error(`Not supported action ${action.type}`);
    }
};

export {
    initialAppState,
    appStateReducer
};