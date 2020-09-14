import { useState, useEffect, useContext } from 'react';
import { AppContext } from '../context';
import { useMutation } from '@apollo/react-hooks';
import { INSERT_COMMON_INFO } from '../utils/mutations';
import { checkCookie } from '../utils/helpers';

const useCommonInsert = (shouldExecute) => {
	const { appState, trackingState } = useContext(AppContext);
    const [ commonInfoResult, setResult ] = useState(null);
    const [ commonInfoError, setError ] = useState(null);
    const [ isDuplicateEmail ] = useState(checkCookie('em_sub'));

    const [ 
        insertCommonInfo, { error: mutationError } 
    ] = useMutation(INSERT_COMMON_INFO, {
        onCompleted: (data) => {
            setResult(data.insertCommonInfo.success);
        }
    });

    if(mutationError) {
        console.error('Error occured inserting to common info:', mutationError);
        setError(mutationError);
    };

    const executeRequest = () => {
        const insertEmail = isDuplicateEmail ? '' : 
        trackingState.email || appState.email || appState.pch.email || '';
        console.log('email inserted in Common:', insertEmail);
        insertCommonInfo({
            variables: {
                visitor: {
                    'hsid': Number(trackingState.hsid),
                    'oid': Number(trackingState.oid),
                    'eid': trackingState.eid,
                    'sid': Number(trackingState.sid),
                    'uid': trackingState.uid,
                    'ip_address': trackingState.ip_address,
                    'email': insertEmail,
                    'fname': trackingState.fname,
                    'lname': trackingState.lname,
                    'address': trackingState.address,
                    'city': trackingState.city,
                    'state': trackingState.state,
                    'zip': trackingState.zip,
                }
            }
        });
    };

	useEffect(() => {
        if (shouldExecute) {
            executeRequest();
        };

        // eslint-disable-next-line
    }, [shouldExecute])

    return { commonInfoError, commonInfoResult };
};

export default useCommonInsert;