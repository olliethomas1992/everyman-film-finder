import sortByDistance from 'sort-by-distance';
import cinemas from './data/cinemas.json';

const opts = {
    yName: 'latitude',
    xName: 'longitude'
};

export default function reducer(state, { type, payload }) {
    switch (type) {
        case 'SELECT_FILM':
            return { ...state, selectedFilm: payload };
        case 'GET_CINEMAS':
            return {
                ...state,
                cinemas: {
                    byId: {
                        ...state.cinemas.byId,
                        ...cinemas.reduce((newCinemas, cinema) => {
                            newCinemas[cinema.id] = cinema;
                            return newCinemas;
                        }, {})
                    },
                    allIds: [...sortByDistance(state.origin, cinemas, opts)]
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
                    byId: {
                        ...state.films.byId,
                        ...payload.reduce((films, film) => {
                            films[film.FilmId] = film;
                            return films;
                        }, {})
                    },
                    allIds: [...payload]
                }
            };
        case 'GET_SHOWING':
            return {
                ...state,
                showings: {
                    ...state.showings,
                    byId: {
                        ...state.showings.byId,
                        [payload.id]: {
                            id: payload.id,
                            sessions: payload.film.Sessions || []
                        }
                    },
                    allIds: [...state.showings.allIds, payload.id]
                }
            };
        case 'CLEAR_SHOWINGS':
            return {
                ...state,
                showings: {
                    byId: {},
                    allIds: []
                }
            };
        case 'SEARCH':
            return {
                ...state,
                search: payload,
                filteredFilms: {
                    ...state.films
                }
            };
        case 'GET_LOCATION':
            return {
                ...state,
                origin: {
                    latitude: payload.latitude,
                    longitude: payload.longitude
                }
            };
        default:
            return state;
    }
}
