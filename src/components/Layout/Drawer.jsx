import React from 'react';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory } from 'react-router-dom';

const Drawer = ({ show, toggle }) => {
    let history = useHistory();
    // iOS has a "swipe to go back" feature that interferes with the discovery feature, so discovery has to be disabled.
    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

    const handleLinkOutClick = (url, e) => {
        e.preventDefault();
        window.open(url, '_blank');
        toggleDrawer(false);
    };

    const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
    };
        toggle(open);
    };

    const list = () => (
        <div role='presentation'>
            <List>            
                <ListItem button onClick={() => history.push('/verticals')}>
                    <FontAwesomeIcon
                    icon={['fal', 'search-dollar']}
                    className='drawer-button-icon'
                    />
                    <ListItemText primary='Start a Visual Credit Search' />
                </ListItem>
                <Divider />
                <ListItem button onClick={() => history.push('/personal_loans')}>
                    <FontAwesomeIcon
                    icon={['fal', 'hand-holding-usd']}
                    className='drawer-button-icon'
                    />
                    <ListItemText primary='Find a Loan' />
                </ListItem>
                <Divider />
                <ListItem button onClick={() => history.push('/credit_cards')}>
                    <FontAwesomeIcon
                    icon={['fal', 'credit-card']}
                    className='drawer-button-icon'
                    />
                    <ListItemText primary='Find a Credit Card' />
                </ListItem>
                <Divider />
                <ListItem button onClick={(e) => handleLinkOutClick('https://unitedstatescredit.blog/category/reviews/', e)}>
                    <FontAwesomeIcon
                    icon={['fal', 'thumbs-up']}
                    className='drawer-button-icon'
                    />
                    <ListItemText primary='Customer Reviews' />
                </ListItem>
                <Divider />
                <ListItem button onClick={(e) => handleLinkOutClick('https://unitedstatescredit.blog/', e)}>
                    <FontAwesomeIcon
                    icon={['fal', 'blog']}
                    className='drawer-button-icon'
                    />
                    <ListItemText primary='Blog' />
                </ListItem>
                <Divider />
                <ListItem button onClick={() => toggle(false)}>
                    <FontAwesomeIcon
                    icon={['fal', 'times']}
                    className='drawer-button-icon'
                    />
                    <ListItemText primary='Close' />
                </ListItem>
                <Divider />
            </List>
        </div>
      );

    return (        
        <SwipeableDrawer
            anchor='right'
            open={show}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
            disableBackdropTransition={!iOS} 
            disableDiscovery={iOS}
        >
            {list()}
        </SwipeableDrawer>
    )
};

export default Drawer;