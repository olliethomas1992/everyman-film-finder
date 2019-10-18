import React, { useContext } from 'react';
import { CheckBox } from 'grommet';
import context from '../context';

const London = () => {
    const { state, dispatch } = useContext(context);

    const onChange = () => {
        dispatch({ type: 'LONDON' });
        dispatch({ type: 'GET_CINEMAS' });
    };

    return (
        <CheckBox checked={state.isLondon} label="London" onChange={onChange} />
    );
};

export default London;
