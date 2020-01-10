const initialAppState = {
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
        debt_type: null,
        debt_amount: null,
        checking_optin: false,
        debt_optin: false,
        email_optin: false
    }
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