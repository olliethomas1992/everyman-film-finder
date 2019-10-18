import cinemasUk from './data/cinemas.json';
import cinemasLondon from './data/cinemasLondon.json';

export default function reducer(state, { type, payload }) {
    const cinemas = state.isLondon ? cinemasLondon : cinemasUk;

    switch (type) {
        case 'SELECT_FILM':
            return { ...state, selectedFilm: payload };
        case 'GET_CINEMAS':
            return {
                ...state,
                cinemas: {
                    ...state.cinemas,
                    ...cinemas.reduce((newCinemas, cinema) => {
                        newCinemas[cinema.CinemaId] = cinema;
                        return newCinemas;
                    }, {})
                }
            };
        case 'GET_FILMS':
            return {
                ...state,
                filmsById: {
                    ...state.filmsById,
                    ...payload.reduce((films, film) => {
                        films[film.FilmId] = film;
                        return films;
                    }, {})
                },
                films: {
                    ...state.films,
                    ...payload
                }
            };
        case 'GET_SHOWING':
            return {
                ...state,
                showings: {
                    ...state.showings,
                    [payload.cinemaId]: {
                        cinemaId: payload.cinemaId,
                        sessions: payload.film.Sessions || []
                    }
                }
            };
        case 'CLEAR_SHOWINGS':
            return {
                ...state,
                showings: {}
            };
        case 'SEARCH':
            return {
                ...state,
                search: payload,
                filteredFilms: {
                    ...state.films
                }
            };
        case 'LONDON':
            return {
                ...state,
                isLondon: !state.isLondon
            };
        default:
            return state;
    }
}
