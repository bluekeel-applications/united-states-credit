// import { addToClickCount } from '../../utils/middleware';

const initialAppState = {
    loadingOffers: true,
    showDrawer: false,
    showExpansion: false,
    flowState: {
        vertical: null,
        loan_type: null,
        debt_type: 'N/A',
        debt_amount: 'N/A',
        checking_optin: false,
        debt_optin: false,
        email_optin: false
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
    email: null
};

const appStateReducer = (state, action) => {
    switch (action.type) {

        case 'SHOW_EXPANSION':
            return {
                ...state,
                showExpansion: true
            };        

        case 'HIDE_EXPANSION':
            return {
                ...state,
                showExpansion: false
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

        case 'FETCH_OFFERS':
            return {
                ...state,
                loadingOffers: true
            };

        // case 'FETCH_OFFERS_SUCCESS':
        //     const { click_count, _id } = action.payload;
        //     const addToCCount = async() => {
        //         if(!!_id) { 
        //             const res = await addToClickCount(_id); 
        //             if(res && res.status === 'failed') {
        //                 console.warn('Error trying to add to click count:', res[0].message,  '...trying again');
        //                 addToCCount();
        //                 return;
        //             }
        //             if(res && !res.status) {
        //                 console.log('Successfully added +1 to the click count');
        //                 return;
        //             }
        //             console.log('something else happened:', res);
        //         }
        //     };
        //     addToCCount();
        //     return {
        //         ...state,
        //         click_count: click_count || 0,
        //         program_id: _id || 'Unknown PID'
        //     };

        case 'FETCH_OFFERS_FAILURE':
            return {
                ...state
            };

        case 'SELECTED_OFFER':
            const { link, offer_page, four_button, jump } = action.payload
            return {
                ...state,
                link,
                offer_page,
                four_button,
                jump,
                loadingOffers: false
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