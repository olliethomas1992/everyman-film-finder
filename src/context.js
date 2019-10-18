import { createContext } from 'react';

const context = createContext({
    cinemas: {},
    films: [],
    filmsById: {},
    selectedFilm: null,
    showings: {},
    search: '',
    filteredFilms: [],
    isLondon: true
});

export default context;
