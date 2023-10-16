import { useEffect, useState } from 'react';
import { ADD_USER_EMAIL, ADD_USER_FLOW, INSERT_COMMON_INFO } from '../GraphQL/mutations';
import { useMutation } from '@apollo/client';
import firePixelBlueKeel from '../pixels/bluekeelPixel';
import fireBingPixel from '../pixels/bingPixel';
import fireTiktokPixel from '../pixels/tiktokPixel';
import fireAdwordsEvent from '../pixels/adWords';
import { setCookie, checkCookie } from '@bit/bluekeel.controllers.helpers';

const useClickSubmit = (tracking, email, shouldExecute) => {
    const [ isDuplicate ] = useState(checkCookie('em_sub'));

	const { 
        hsid, pid, oid, eid, sid, uid,
        vertical, loan_type, debt_type, debt_amount,
        ip_address, fname, lname, address, city, state, zip
    } = tracking;

    const [ addUserFlow ] = useMutation(ADD_USER_FLOW, { 
        onCompleted: () => console.log('UserFlow posted to Mongo.') 
    });

    const [ insertCommonInfo ] = useMutation(INSERT_COMMON_INFO, { 
        onCompleted: () => console.log('CommonInfo posted to CF.') 
    });

    const [ addUserEmail ] = useMutation(ADD_USER_EMAIL, { 
        onCompleted: (data) => {
            const submittedEmail = data.addUserEmail.body.email
            console.log('Email posted to Mongo:', submittedEmail)
            if(submittedEmail && submittedEmail !== '') {
                console.log('Setting submission cookie!');
                setCookie('em_sub', submittedEmail, 30);
            };
        }
    });

    const postToCommonInfo = emailProp => {
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

    const postEmailToMongo = emailProp => {
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
                    vertical, loan_type,
                    debt_type, debt_amount
                }
            }
        })
    };

	useEffect(() => {
        if(shouldExecute) {
            const insertEmail = isDuplicate || email === 'omit' ? '' : email;
            firePixelBlueKeel(hsid);
            fireBingPixel(vertical);
            fireTiktokPixel();
            fireAdwordsEvent();
            postToCommonInfo(insertEmail);
            postEmailToMongo(insertEmail);
            postFlowToMongo();
        };

		// eslint-disable-next-line
	}, [shouldExecute]);

	return;
};

export default useClickSubmit;