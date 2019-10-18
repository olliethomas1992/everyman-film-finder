import React, { useContext, useEffect, Fragment } from 'react';
import axios from 'axios';
import { Grid, ResponsiveContext, Heading } from 'grommet';
import { map } from 'lodash';
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

        const getFilms = async cinemaId => {
            const { data } = await axios.get(
                `https://movieeverymanapi.peachdigital.com/movies/13/`
            );

            dispatch({
                type: 'GET_FILMS',
                payload: data
            });
        };

        getCinemas();
        getFilms();
    }, [dispatch, state.isLondon]);

    return (
        <>
            <SelectedFilm film={state.selectedFilm} />
            <ShowingList />
            <ResponsiveContext.Consumer>
                {size => {
                    let cols = ['small', 'small'];
                    if (size === 'medium') {
                        cols = ['small', 'small', 'small', 'small', 'small'];
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
                            <Heading alignSelf="center" level="4">
                                Films
                            </Heading>
                            <Grid columns={cols} justifyContent="center">
                                {map(state.films, film => {
                                    const title = film.Title.toUpperCase();
                                    const search = state.search
                                        .trim()
                                        .toUpperCase();
                                    if (title.includes(search)) {
                                        return (
                                            <FilmItem
                                                key={film.FilmId}
                                                film={film}
                                            />
                                        );
                                    }
                                })}
                            </Grid>
                        </>
                    );
                }}
            </ResponsiveContext.Consumer>
        </>
    );
};
export default Films;
