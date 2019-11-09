import { createContext } from 'react';

const context = createContext({
    cinemas: {
        byId: {},
        allIds: []
    },
    films: {
        byId: {},
        allIds: []
    },
    selectedFilm: null,
    showings: {
        byId: {},
        allIds: []
    },
    search: '',
    filteredFilms: [],
    origin: {
        latitude: 0,
        longitude: 0
    },
    closestCinemas: 10
});

export default context;
