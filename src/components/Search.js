import React, { useState, useContext, Fragment } from 'react';
import { TextInput, Button } from 'grommet';
import { Trash } from 'grommet-icons';
import context from '../context';

const Search = () => {
    const [value, setValue] = useState('');
    const { dispatch } = useContext(context);

    const handleOnChange = eValue => {
        setValue(eValue);
        dispatch({ type: 'SEARCH', payload: eValue });
        dispatch({ type: 'CLEAR_SHOWINGS' });
        dispatch({ type: 'SELECT_FILM', payload: null });
    };

    return (
        <Fragment>
            <TextInput
                placeholder="Search Movie"
                value={value}
                onChange={e => handleOnChange(e.target.value)}
            />
            <Button icon={<Trash />} onClick={() => handleOnChange('')} />
        </Fragment>
    );
};

export default Search;
