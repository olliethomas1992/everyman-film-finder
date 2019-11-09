import React, { useEffect, useContext } from 'react';
import { Box, Text } from 'grommet';
import Axios from 'axios';
import { isEmpty } from 'lodash';
import Loader from 'react-loader-spinner';
import context from '../context';
import Showing from './Showing';

const ShowingList = () => {
    const { state, dispatch } = useContext(context);

    useEffect(() => {
        const getShowings = async id => {
            const { data } = await Axios.get(
                `https://movieeverymanapi.peachdigital.com/movies/13/${id}`
            );
            const film = data.find(film => film.FilmId === state.selectedFilm);

            if (film) {
                return dispatch({
                    type: 'GET_SHOWING',
                    payload: {
                        film,
                        id
                    }
                });
            }
        };
        state.cinemas.allIds
            // .slice(0, state.closestCinemas)
            .map(async cinema => getShowings(cinema.id));
    }, [dispatch, state.cinemas, state.closestCinemas, state.selectedFilm]);

    if (state.selectedFilm !== null && isEmpty(state.showings)) {
        return (
            <Box pad="large" margin="small" border="bottom" flex>
                <Text>No showings</Text>
            </Box>
        );
    }

    if (!state.showings.allIds.length)
        return (
            <Box pad="large" align="center">
                <Loader type="Oval" color="#000" height={100} width={100} />
            </Box>
        );

    console.log(state);

    return (
        <div>
            <Box pad="large" margin="small" border="bottom" flex>
                {state.cinemas.allIds
                    .filter(cinema => state.showings.byId[cinema.id])
                    .slice(0, state.closestCinemas)
                    .map(cinema => {
                        const showing = state.showings.byId[cinema.id];
                        return showing ? (
                            <Showing key={showing.id} showing={showing} />
                        ) : null;
                    })}
            </Box>
        </div>
    );
};

export default ShowingList;
