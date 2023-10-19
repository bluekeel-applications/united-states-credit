import React, { memo } from 'react';
import styles from './UserSelection.css.js';
import TextField from '@material-ui/core/TextField';
import { capitalizeValue } from '../../../../utils/helpers';

const SearchInput = ({ value, handleChange, name }) => (
    <div style={styles.inputContainer}>
        <TextField
            id={`${name}-input-id`}
            label={name}
            variant='outlined'
            InputProps={{
                autoFocus: false,
                onChange: handleChange,
                value: capitalizeValue(value)
            }}
            inputProps={{ 'aria-label': 'search-query-input' }}
            fullWidth
            style={styles.input}
        />
    </div>
);

export default memo(SearchInput);