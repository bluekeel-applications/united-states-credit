import React from 'react';
import TextField from '@material-ui/core/TextField';
import Radium from 'radium';

const NameInput = ({ name, setName }) => {

    const handleInputChange = (event) => {
        let name = event.target.value;
        setName(name);
    };

    return (        
        <TextField
            id='name-optin-input'
            label='Name'
            variant='outlined'
            InputProps={{
                autoFocus: true,
                onChange: handleInputChange,
                value: name,
                type: 'name'
            }}
            inputProps={{ 'aria-label': 'name-optin-input' }}
            fullWidth
            style={{ marginBottom: '20px'}}
        />
    )
};

export default Radium(NameInput);