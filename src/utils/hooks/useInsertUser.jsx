import { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_NEW_USER } from '../GraphQL/mutations';
import firePixelBlueKeel from '../pixels/bluekeelPixel';

const useInsertNewUser = (tracking, hsid, ip_address, shouldExecute) => {

    const [ addNewUser ] = useMutation(ADD_NEW_USER, { 
        onCompleted: (data) => console.log(data.addNewUser.message)
    });

	const createNewUser = async() => {
        addNewUser({ 
            variables: { 
                visitor: {
                    clickId: hsid,
                    ip_address,
                    program: {
                        pid: tracking['pid'],
                        oid: tracking['oid'],
                        eid: tracking['eid'],
                        sid: tracking['sid'],
                        uid: tracking['uid']
                    }
                } 
            } 
        });

		if(tracking['sid'] === 5102 || tracking['sid'] === 9113 || tracking['sid'] === 9371 || tracking['sid'] === 9419 || tracking['sid'] === 9474) {
			firePixelBlueKeel(hsid);
        };
	};

	useEffect(() => {
        if (shouldExecute) {
            createNewUser();
        };
		// eslint-disable-next-line
	}, [shouldExecute]);

	return;
};

export default useInsertNewUser;