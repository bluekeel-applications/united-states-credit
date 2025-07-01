import React, { useState, memo, useContext, useCallback } from 'react';
import { AppContext } from '../../../context';
import TextField from '@mui/material/TextField';
import Radium from 'radium';
import styles from './UserCapture.css.js';
import LegalTerms from './LegalTerms';
import { useMediaQuery } from 'react-responsive';
import { INSERT_COMMON_INFO } from '../../../utils/GraphQL/mutations.js';
import { useQuery, useMutation } from '@apollo/client';
import { FETCH_ARTICLE_BY_KEY } from '../../../utils/GraphQL/queries';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Loading from '../../../components/Shared/Loading.jsx';
import LoadingRedirect from '../../Shared/LoadingRedirect/LoadingRedirect.jsx';
import firePixelBlueKeel from '../../../utils/pixels/bluekeelPixel.js';

const UserCapture = Radium(() => {
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const { trackingState } = useContext(AppContext);
    const [submitting, setSubmitting] = useState(false);
    const [offer, setOffer] = useState(null);
    const [headline, setHeadline] = useState(null);
    // const [ animationComplete, setAnimationComplete ] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
    });
    const [termsChecked, setTermsChecked] = useState(false);

    const findOfferUrl = (offer_array) => {
        let count = 0;
        let offerUrl = null;
        const randomNumber = Math.floor(Math.random() * 100) + 1;
        // Loop the offer array and set the offer url
        offer_array.forEach((offer_obj, idx) => {
            // If an offer is already set, return
            if(!!offerUrl) {
                return;
            };
            // start count
            count += Number(offer_obj.usage);
            // if(idx === 0) {
            //     count = Number(offer_obj.usage);
            // };
            // If the random number is less than or equal to the count, set the offer url
            if(randomNumber <= count && !offerUrl) {
                offerUrl = offer_obj.offer_url;
            };
            // Increment the count
            // if(idx !== 0) {
            //     count += Number(offer_obj.usage);
            // };
            // If this is the last offer and no offer url is set, set the offer url
            if(idx === offer_array.length - 1 && !offerUrl) {
                offerUrl = offer_obj.offer_url;
            };
        });
        console.log('offerUrl', offerUrl);
        return offerUrl;
    };

    const handleInboundData = (data, error) => {
        if(data) {
            let offer = null;
            if(isMobile && !!data.fetchArticleByKey.body.mobile.button_group) {
                offer = data.fetchArticleByKey.body.mobile.button_group[0];
                setHeadline(data.fetchArticleByKey.body.mobile.header);
            } else {
                offer = data.fetchArticleByKey.body.button_group[0];
                setHeadline(data.fetchArticleByKey.body.header);
            };
            const offerUrl = findOfferUrl(offer.offers);
            console.log('offerUrl', offerUrl);
            setOffer(offerUrl);
		};
        if(error) {
			console.error('ERROR fetching Offer from group:', error);
		};
    };

    const { loading } = useQuery(
        FETCH_ARTICLE_BY_KEY, { 
            variables: { key: trackingState.article },
            errorPolicy: 'ignore',
            onCompleted: handleInboundData
        }
    );

    const [ insertCommonInfo ] = useMutation(INSERT_COMMON_INFO, { 
        onCompleted: () => console.log('CommonInfo posted to CF.') 
    });

    const postToCommonInfo = () => {
        insertCommonInfo({
            variables: {
                visitor: {
                    'hsid': Number(trackingState['hsid']),
                    'oid': Number(trackingState.oid),
                    'eid': trackingState.eid, 
                    'uid': trackingState.uid, 
                    'ip_address': trackingState.ip_address,
                    'sid': Number(trackingState.sid),
                    'email': formData.email, 
                    fname: formData.firstName, 
                    lname: formData.lastName, 
                    address: '', 
                    city: '', 
                    state: '', 
                    zip: ''
                }
            }
        });
    };

    const formatPhoneNumber = (value) => {
        // Remove all non-numeric characters
        const phoneNumber = value.replace(/\D/g, '');
        
        // Format the phone number
        if (phoneNumber.length < 4) return phoneNumber;
        if (phoneNumber.length < 7) {
            return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
        }
        return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        
        if (name === 'phone') {
            // Only allow up to 10 digits
            const formattedValue = formatPhoneNumber(value);
            if (formattedValue.replace(/\D/g, '').length <= 10) {
                setFormData(prevState => ({
                    ...prevState,
                    [name]: formattedValue
                }));
            }
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleFinishedAnimation = useCallback(() => {console.log('animation complete')}, []);
    // eslint-disable-next-line
    // const handleFinishedAnimation = useCallback(() => {window.location.href = offer;}, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        setSubmitting(true);
        postToCommonInfo();
        firePixelBlueKeel(trackingState.hsid);
        setTimeout(() => {
            window.location.href = offer;
        }, 2000);
    };

    const isFormValid = () => {
        return formData.firstName && 
               formData.lastName && 
               formData.email && 
               formData.phone && 
               termsChecked;
    };

    if(loading) {
        return <Loading />;
    };

    if(submitting) {
        return <LoadingRedirect setComplete={handleFinishedAnimation} />
    };

    return (
        <div style={styles.mainContainer}>
            <div>
                <div style={styles.headline}>{headline}</div>
            </div>
            <div style={styles.formCard}>
                <div style={styles.titleContainer}>
                    <div style={styles.titleText}>Get Started</div>
                    <span style={styles.arrowIcon}>
                        <FontAwesomeIcon
                            icon={['fal', 'angle-down']}
                        />
                    </span>
                </div>
                <form style={styles.formContainer} onSubmit={handleSubmit}>
                    <TextField
                        id="firstName-input"
                        name="firstName"
                        label="First Name"
                        variant="outlined"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        fullWidth
                        style={styles.input}
                        required
                    />
                    <TextField
                        id="lastName-input"
                        name="lastName"
                        label="Last Name"
                        variant="outlined"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        fullWidth
                        style={styles.input}
                        required
                    />
                    <TextField
                        id="email-input"
                        name="email"
                        label="Email Address"
                        variant="outlined"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        fullWidth
                        style={styles.input}
                        required
                    />
                    <TextField
                        id="phone-input"
                        name="phone"
                        label="Phone Number"
                        variant="outlined"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        fullWidth
                        style={styles.input}
                        required
                        placeholder="(XXX) XXX-XXXX"
                    />
                    <LegalTerms 
                        checked={termsChecked}
                        setChecked={setTermsChecked}
                    />
                    <div style={styles.buttonGroup}>
                        <button
                            type="submit"
                            style={isFormValid() ? styles.submitButton : styles.disabledButton}
                            disabled={!isFormValid() && !loading}
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
});

export default memo(UserCapture);
