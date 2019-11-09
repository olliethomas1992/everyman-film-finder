import React, { useState, useContext } from 'react';
import { TextInput, Button } from 'grommet';
import { Trash, Close } from 'grommet-icons';
import context from '../context';

const Search = () => {
    const [value, setValue] = useState('');
    const { state, dispatch } = useContext(context);

    const handleOnChange = eValue => {
        setValue(eValue);
        dispatch({ type: 'SEARCH', payload: eValue });
        dispatch({ type: 'CLEAR_SHOWINGS' });
        dispatch({ type: 'SELECT_FILM', payload: null });
    };

    return (
        <>
            {!state.selectedFilm && (
                <>
                    <TextInput
                        placeholder="Search Movie"
                        value={value}
                        onChange={e => handleOnChange(e.target.value)}
                        style={{
                            backgroundColor: 'white',
                            color: 'black'
                        }}
                    />
                    <Button
                        icon={<Trash />}
                        onClick={() => handleOnChange('')}
                    />
                </>
            )}
            {state.selectedFilm && (
                <Button
                    style={{
                        maxWidth: '100%'
                    }}
                    icon={<Close />}
                    label={state.films.byId[state.selectedFilm].Title}
                    onClick={() => handleOnChange('')}
                />
            )}
        </>
    );
};

export default Search;
