import React, { useContext, useEffect, Fragment } from 'react';
import axios from 'axios';
import { Grid } from 'grommet';
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
        <Fragment>
            <SelectedFilm film={state.selectedFilm} />
            <ShowingList />
            <Grid
                columns={['small', 'small', 'small', 'small', 'small']}
                gap="small"
                justifyContent="between"
            >
                {map(state.films, film => {
                    const title = film.Title.toUpperCase();
                    const search = state.search.trim().toUpperCase();
                    if (title.includes(search)) {
                        return <FilmItem key={film.FilmId} film={film} />;
                    }
                })}
            </Grid>
        </Fragment>
    );
};
export default Films;
