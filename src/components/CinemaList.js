import React, { useContext } from 'react';
import { Heading, Text, Box } from 'grommet';
import context from '../context';

const CinemaList = () => {
    const { state } = useContext(context);

    return (
        <Box flex="grow" overflow="scroll">
            <Heading level="3" size="medium">
                Your Closest Cinemas
            </Heading>
            {state.cinemas.allIds.map(cinema => (
                <Box key={cinema.id} direction="row">
                    <Text>{cinema.cinemaName}</Text>
                </Box>
            ))}
        </Box>
    );
};

export default CinemaList;
