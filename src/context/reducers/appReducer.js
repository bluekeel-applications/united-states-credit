
const initialAppState = {
    provider: null,
    pch: {
        email: null,
        title: null,
        firstname: null,
        lastname: null,
        address: null,
        city: null,
        state: null,
        zipcode: null
    },
    animationPlayed: false,
    loadingOffers: true,
    showDrawer: false,
    showExpansion: false,
    showStory: false,
    flowState: {
        vertical: null,
        loan_type: null,
        debt_type: 'N/A',
        debt_amount: 'N/A',
        checking_optin: null,
        debt_optin: null,
        email_optin: null
    },
    breadcrumbs: {
        vertical: null,
        loan_type: null,
        debt_type: null,
        debt_amount: null
    },
    program_id: null,
    click_count: 0,
    offers: null,
    link: null,
    offer_page: null,
    four_button: null,
    jump: null,
    email: null,
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
        
        case 'DEEP_DIVE':
            return {
                ...state,
                flowState: {
                    ...initialAppState.flowState,
                    vertical: action.payload.vertical, 
                    loan_type: action.payload.loan_type
                }
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
                flowState: {
                    ...initialAppState.flowState,
                    vertical: action.payload.value
                },
                breadcrumbs:{
                    ...initialAppState.breadcrumbs,
                    vertical: action.payload.crumb
                }
            };

        case 'LOAN_TYPE_PICKED':
            return {
                ...state,
                flowState: {
                    ...state.flowState,
                    loan_type: action.payload.value
                },
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
                flowState: {
                    ...state.flowState,
                    debt_type: action.payload.value
                },
                breadcrumbs:{
                    ...state.breadcrumbs,
                    debt_type: action.payload.crumb,
                    debt_amount: null
                }
            };

        case 'DEBT_AMOUNT_PICKED':
            return {
                ...state,
                flowState: {
                    ...state.flowState,
                    debt_amount: action.payload.value
                },
                breadcrumbs:{
                    ...state.breadcrumbs,
                    debt_amount: action.payload.crumb
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
        case 'EMAIL_OPT_OUT':
            return {
                ...state,
                flowState: {
                    ...state.flowState,
                    email_optin: false
                },
                email: 'N/A'
            };

        case 'FETCH_OFFERS':
            return {
                ...state,
                loadingOffers: true
            };

        case 'FETCH_OFFERS_FAILURE':
            return {
                ...state
            };

        case 'SELECTED_OFFER':
            return {
                ...state,
                offer: action.payload
            };

        case 'FAILED_OFFER_SELECTION':            
            return {
                ...state,
                link: null,
                offer_page: null,
                four_button: null,
                jump: null,
                loadingOffers: false
            };

        case 'RESTART_SEARCH':
            return {
                ...state,
                flowState: {
                    ...state.flowState,
                    vertical: null,
                    loan_type: null,
                    debt_type: 'N/A',
                    debt_amount: 'N/A'
                },
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