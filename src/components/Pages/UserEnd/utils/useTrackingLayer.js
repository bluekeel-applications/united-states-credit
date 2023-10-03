import { useEffect, useState } from 'react';
import ADD_USER_FLOW from './graphql/ADD_USER_FLOW';
import ADD_USER_EMAIL from './graphql/ADD_USER_EMAIL';
import INSERT_COMMON_INFO from './graphql/INSERT_COMMON_INFO';
import ADD_SELECTION_LOG from './graphql/ADD_SELECTION_LOG';
import { useMutation } from '@apollo/client';
import firePixelBlueKeel from './pixels/bluekeelPixel';
import fireBingPixel from './pixels/bingPixel';
import fireAdwordsEvent from './pixels/adWords';
import fireTiktokPixel from './pixels/tiktokPixel';
import { setCookie, checkCookie } from '@bit/bluekeel.controllers.helpers';

const useTrackingLayer = (tracking, email, offer) => {
    const [ isDuplicate ] = useState(checkCookie('em_sub'));
	const { 
        hsid, pid, oid, eid, sid, uid,
        vertical, loan_type, debt_type, debt_amount,
        ip_address, fname, lname, address, city, state, zip
    } = tracking;
	
	const [ addUserFlow ] = useMutation(ADD_USER_FLOW, { 
		onCompleted: (data) => console.log(data.addUserFlow.message) 
	});
	
    const [ addSelectionLog ] = useMutation(ADD_SELECTION_LOG, { 
		onCompleted: (data) => console.log(data.addSelectionLog.message)
	});

	const [ addUserEmail ] = useMutation(ADD_USER_EMAIL, { 
        onCompleted: (data) => {
            const submittedEmail = data.addUserEmail.body.email
            console.log(data.addUserEmail.message, ':', submittedEmail);
            if(submittedEmail && submittedEmail !== '') {
                console.log('Setting submission cookie!');
                setCookie('em_sub', submittedEmail, 30);
            };
        }
	});
	
    const [ insertCommonInfo ] = useMutation(INSERT_COMMON_INFO, { 
        onCompleted: (data) => console.log(data.insertCommonInfo.message) 
	});
	
	const postToCommonInfo = (emailProp) => {
        insertCommonInfo({
            variables: {
                visitor: {
                    'hsid': Number(hsid),
                    'oid': Number(oid),
                    eid, uid, ip_address,
                    'sid': Number(sid),
                    'email': emailProp, 
                    fname, lname, address, city, state, zip
                }
            }
        });
    };

    const postEmailToMongo = (emailProp) => {
        if(emailProp && emailProp !== '' && emailProp !== 'omit') {
            addUserEmail({
                variables: {
                    clickId: Number(hsid),
                    email: emailProp
                }
            })
        }
	};
	
	const postFlowToMongo = () => {
        addUserFlow({
            variables: {
                clickId: Number(hsid),
                flow: {
                    'pid': Number(pid),
                    vertical, 
                    loan_type,
                    debt_type, 
                    debt_amount
                }
            }
        })
	};
	
    const postSelectionData = () => {
        addSelectionLog({
            variables: { selection: {
                program_id: offer?.program_id,
                group_id: offer?.group_id,
                offer_id: offer?.id,
                link_id: offer?.link_id,
                keyword: offer?.link_text,
            } }
        })
	};

	useEffect(() => {
        const insertEmail = isDuplicate || email === 'omit' ? '' : email;
		firePixelBlueKeel(hsid);
        fireBingPixel(vertical);
        fireTiktokPixel();
        fireAdwordsEvent();
		postToCommonInfo(insertEmail);
		postEmailToMongo(insertEmail);
		postFlowToMongo();
        postSelectionData();
		// eslint-disable-next-line
	}, []);

	return;
};

export default useTrackingLayer;