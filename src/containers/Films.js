import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { Grid, ResponsiveContext, Text, Box } from 'grommet';
import { lastDayOfDecade } from 'date-fns/esm';
import context from '../context';
import FilmItem from '../components/FilmItem';

import SelectedFilm from '../components/SelectedFilm';
import ShowingList from '../components/ShowingList';

const Films = () => {
    const { state, dispatch } = useContext(context);

    useEffect(() => {
        const getCinemas = async () => {
            dispatch({ type: 'GET_CINEMAS' });
        };

        const getLocation = async () => {
            if (process.browser && 'geolocation' in navigator) {
                return navigator.geolocation.getCurrentPosition(function(
                    position
                ) {
                    dispatch({
                        type: 'GET_LOCATION',
                        payload: {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude
                        }
                    });
                    getCinemas();
                });
            }
        };

        const getFilms = async id => {
            const { data } = await axios.get(
                `https://movieeverymanapi.peachdigital.com/movies/13/`
            );

            dispatch({
                type: 'GET_FILMS',
                payload: data
            });
        };

        getLocation();
        getFilms();
    }, [dispatch, state.isLondon]);

    const searchedMovies = state.films.allIds.filter(film => {
        const title = film.Title.toUpperCase();
        const search = state.search.trim().toUpperCase();
        return title.includes(search);
    });

    console.log(searchedMovies.length);

    return (
        <>
            {state.selectedFilm && <SelectedFilm film={state.selectedFilm} />}
            {state.selectedFilm && <ShowingList />}
            {!state.selectedFilm && (
                <ResponsiveContext.Consumer>
                    {size => {
                        let cols = ['small', 'small'];
                        if (size === 'medium') {
                            cols = [
                                'small',
                                'small',
                                'small',
                                'small',
                                'small'
                            ];
                        } else if (size === 'large') {
                            cols = [
                                'small',
                                'small',
                                'small',
                                'small',
                                'small',
                                'small',
                                'small'
                            ];
                        }

                        return (
                            <>
                                {searchedMovies.length ? (
                                    <Grid
                                        columns={cols}
                                        justifyContent="center"
                                    >
                                        {searchedMovies.map(film => {
                                            if (!film) return null;
                                            return (
                                                <FilmItem
                                                    key={film.FilmId}
                                                    film={film}
                                                />
                                            );
                                        })}
                                    </Grid>
                                ) : (
                                    <Box
                                        direction="row"
                                        pad="large"
                                        justify="center"
                                    >
                                        <Text>Film not found</Text>
                                    </Box>
                                )}
                            </>
                        );
                    }}
                </ResponsiveContext.Consumer>
            )}
        </>
    );
};
export default Films;
