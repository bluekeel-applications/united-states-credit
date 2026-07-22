import React, { useContext, memo } from 'react';
import { AppContext } from '../../../context';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DrawerMenu = () => {
    const { appState, dispatchApp } = useContext(AppContext);
  
    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        };
        dispatchApp({ type: 'TOGGLE_DRAWER', payload: open });
    };
    
    const handleLinkOutClick = (url, e) => {
        e.preventDefault();
        window.open(url, '_blank');
        toggleDrawer(false);
    };

    const buttonIconStyle = {
        margin: '0 10px',
        fontSize: '1.5rem',
    };

    const ListComponent = memo(() => (
        <Box
        sx={{ width: 250 }}
        role='presentation'
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
        >
            <List>
                <ListItem key='loan-button' disablePadding>
                    <ListItemButton onClick={(e) => handleLinkOutClick('https://www.bkoffers.com/hitstreet/redirect_one_step.cfm?oid=40&sid=9659&pid=3415&eid=yourEID&uid=yourUID&email=omit', e)}>
                        <ListItemIcon>
                            <FontAwesomeIcon
                                icon={['fal', 'hand-holding-usd']}
                                style={buttonIconStyle}
                            />
                        </ListItemIcon>
                        <ListItemText primary='Find a Loan' />
                    </ListItemButton>
                </ListItem>
                <ListItem key='credit-card-button' disablePadding>
                    <ListItemButton onClick={(e) => handleLinkOutClick('https://www.bkoffers.com/hitstreet/redirect_one_step.cfm?oid=40&sid=9659&pid=3415&eid=yourEID&uid=yourUID&email=omit', e)}>
                        <ListItemIcon>
                            <FontAwesomeIcon
                                icon={['fal', 'credit-card']}
                                style={buttonIconStyle}
                            />
                        </ListItemIcon>
                        <ListItemText primary='Find a Credit Card' />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
            <List>
                {/* <ListItem key='reviews-button' disablePadding>
                    <ListItemButton onClick={(e) => handleLinkOutClick('https://unitedstatescredit.blog/category/reviews/', e)}>
                        <ListItemIcon>
                            <FontAwesomeIcon
                                icon={['fal', 'thumbs-up']}
                                style={buttonIconStyle}
                            />
                        </ListItemIcon>
                        <ListItemText primary='Customer Reviews' />
                    </ListItemButton>
                </ListItem> */}
                <ListItem key='blog-button' disablePadding>
                    <ListItemButton onClick={(e) => handleLinkOutClick('https://blogs.unitedstatescredit.com/posts', e)}>
                        <ListItemIcon>
                            <FontAwesomeIcon
                                icon={['fal', 'blog']}
                                style={buttonIconStyle}
                            />
                        </ListItemIcon>
                        <ListItemText primary='Blog' />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
            <List>       
                <ListItem key='close-button' disablePadding>
                    <ListItemButton onClick={() => toggleDrawer(false)}>
                        <ListItemIcon>
                            <FontAwesomeIcon
                                icon={['fal', 'times']}
                                style={buttonIconStyle}
                            />
                        </ListItemIcon>
                        <ListItemText primary='Close' />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    ));

  return (
    <div>
        <Drawer
            anchor='right'
            open={appState.showDrawer}
            onClose={toggleDrawer(false)}
        >
            <ListComponent/>
        </Drawer>
    </div>
    );
};

export default memo(DrawerMenu);