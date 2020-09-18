const initialAppState = {
    provider: null,
    pch: {
        email: '',
        title: '',
        firstname: '',
        lastname: '',
        address: '',
        city: '',
        state: '',
        zipcode: ''
    },
    animationPlayed: false,
    loadingOffers: true,
    showDrawer: false,
    showNavStart: false,
    showExpansion: false,
    showStory: false,
    vertical: 'direct',
    loan_type: 'N/A',
    debt_type: 'N/A',
    debt_amount: 'N/A',
    checking_optin: false,
    debt_optin: false,
    email_optin: null,
    breadcrumbs: {
        vertical: null,
        loan_type: null,
        debt_type: null,
        debt_amount: null
    },
    redirection: false,
    program_id: null,
    click_count: 0,
    offers: null,
    link: null,
    offer_page: null,
    four_button: null,
    jump: null,
    email: null,
    em_sub: false,
    offer: null
};

const appStateReducer = (state, action) => {
    switch (action.type) {

        case 'SET_PROVIDER':
            return {
                ...state,
                provider: action.payload
            };

        case 'FOUND_PCH_USER':
            return {
                ...state,
                pch: {
                    ...state.pch,
                    email: action.payload.EmailAddress,
                    title: action.payload.Title,
                    firstname: action.payload.FirstName,
                    lastname: action.payload.LastName,
                    address: action.payload.Address1,
                    city: action.payload.City,
                    state: action.payload.State,
                    zipcode: action.payload.ZipCode
                }
            };

        case 'ANIMATION_COMPLETED':
            return {
                ...state,
                animationPlayed: true
            };
        
        case 'TOGGLE_START_IN_NAV':
            return {
                ...state,
                showNavStart: action.payload
            };
        
        case 'DEEP_DIVE':
            return {
                ...state,
                vertical: action.payload.vertical, 
                loan_type: action.payload.loan_type
            };

        case 'REDIRECTION':
            return {
                ...state,
                redirection: true
            };

        case 'SHOW_EXPANSION':
            return {
                ...state,
                showExpansion: true
            };        

        case 'HIDE_EXPANSION':
            return {
                ...state,
                showExpansion: false,
                showStory: true
            }; 
// Flow Selections
        case 'VERTICAL_PICKED':
            return {
                ...state,
                vertical: action.payload.value,
                breadcrumbs:{
                    ...initialAppState.breadcrumbs,
                    vertical: action.payload.crumb
                }
            };

        case 'LOAN_TYPE_PICKED':
            return {
                ...state,
                loan_type: action.payload.value,
                breadcrumbs:{
                    ...state.breadcrumbs,
                    loan_type: action.payload.crumb,
                    debt_type: null,
                    debt_amount: null
                }
            };

        case 'DEBT_TYPE_PICKED':
            return {
                ...state,
                debt_type: action.payload.value,
                breadcrumbs:{
                    ...state.breadcrumbs,
                    debt_type: action.payload.crumb,
                    debt_amount: null
                }
            };

        case 'DEBT_AMOUNT_PICKED':
            return {
                ...state,
                debt_amount: action.payload.value,
                breadcrumbs:{
                    ...state.breadcrumbs,
                    debt_amount: action.payload.crumb
                }
            };
        
        case 'CLICK_SET_EMAIL':
            return {
                ...state,
                em_sub: true
            };

        case 'SELECTED_OFFER':
            return {
                ...state,
                offer: action.payload
            };

        case 'RESTART_SEARCH':
            return {
                ...state,                
                vertical: null,
                loan_type: null,
                debt_type: 'N/A',
                debt_amount: 'N/A',
                breadcrumbs: {
                    vertical: null,
                    loan_type: null,
                    debt_type: null,
                    debt_amount: null
                }
            };        

        default:
            throw new Error(`Not supported action ${action.type}`);
    }
};

export {
    initialAppState,
    appStateReducer
};