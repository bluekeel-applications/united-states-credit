import { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_NEW_USER, ADD_START_URL } from '../GraphQL/mutations';
// import firePixelBlueKeel from '../pixels/bluekeelPixel';

const useInsertUser = (tracking, hsid, ip_address, shouldExecute) => {

    const [ addNewUser ] = useMutation(ADD_NEW_USER, { 
        onCompleted: (data) => console.log(data.addNewUser.message)
    });
    const [ addStartUrl ] = useMutation(ADD_START_URL, { 
        onCompleted: (data) => console.log(data.addStartUrl.message)
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
        addStartUrl({
            variables: {
                clickId: Number(hsid),
                url: window.location.search
            }
        });
        // const sidList = [5102, 9113, 9371, 9419, 9474, 9560, 9568, 9641, 9649];
		// if(sidList.includes(tracking['sid'])) {
		// 	firePixelBlueKeel(hsid);
        // };
	};

	useEffect(() => {
        if (shouldExecute) {
            createNewUser();
        };
		// eslint-disable-next-line
	}, [shouldExecute]);

	return;
};

export default useInsertUser;