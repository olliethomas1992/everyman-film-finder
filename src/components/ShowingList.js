import React, { useEffect, useContext } from 'react';
import { Box, Text } from 'grommet';
import Axios from 'axios';
import { map, isEmpty } from 'lodash';
import context from '../context';
import Showing from './Showing';

const ShowingList = () => {
    const { state, dispatch } = useContext(context);

    useEffect(() => {
        const getShowings = async cinemaId => {
            const { data } = await Axios.get(
                `https://movieeverymanapi.peachdigital.com/movies/13/${cinemaId}`
            );
            const film = data.find(film => film.FilmId === state.selectedFilm);

            if (film) {
                dispatch({
                    type: 'GET_SHOWING',
                    payload: {
                        film,
                        cinemaId
                    }
                });
            }
        };
        map(state.cinemas, cinema => {
            if (cinema.CinemaId) {
                getShowings(cinema.CinemaId);
            }
        });
    }, [dispatch, state.cinemas, state.selectedFilm]);

    if (state.selectedFilm !== null && isEmpty(state.showings)) {
        return (
            <Box pad="large" margin="small" border="bottom" flex>
                <Text>No showings</Text>
            </Box>
        );
    }

    return (
        <div>
            <Box pad="large" margin="small" border="bottom" flex>
                {map(state.showings, showing => (
                    <Showing key={showing.cinemaId} showing={showing} />
                ))}
            </Box>
        </div>
    );
};

export default ShowingList;
