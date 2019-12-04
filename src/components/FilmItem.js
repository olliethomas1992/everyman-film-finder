import React, { useContext } from 'react';
import { Box, Image, Text } from 'grommet';

import context from '../context';

const FilmItem = ({ film }) => {
    const { dispatch } = useContext(context);

    const img = film.Img ? film.Img.replace('http://', 'https://') : undefined;

    const onClickFilm = (e, selectedFilm) => {
        dispatch({ type: 'CLEAR_SHOWINGS' });
        dispatch({ type: 'SELECT_FILM', payload: selectedFilm.FilmId });
    };

    if (!film) return null;
    return (
        <Box
            style={{ cursor: 'pointer' }}
            height="261px"
            width="175px"
            onClick={e => onClickFilm(e, film)}
            margin="auto"
        >
            <Image
                height="261px"
                width="175px"
                fit="cover"
                alt={film.Title}
                src={
                    img ||
                    film.MediaItems.QuadStill ||
                    'https://via.placeholder.com/522'
                }
            />
            <Text textAlign="center">{film.Title}</Text>
        </Box>
    );
};

// Cast: "Justin Fletcher, John Sparkes, Kate Harbour"
// Cert: "U"
// Director: "Richard Starzak, Richard Phelan, Will Becher"
// Experiences: (2) [{…}, {…}]
// FilmId: 39054
// FriendlyName: "shaun-the-sheep-2"
// GroupedFilms: []
// Img: "http://images.mymovies.net/images/film/cin/350x522/fid19142.jpg"
// MediaItems: {YouTubeTrailer: "19142|18244|trl|Shaun+The+Sheep+Movie%3a+Farmagedd…|Shaun+The+Sheep+Movie%3a+Farmageddon+-+Trailer+2", QuadStill: "http://filmdb.everymancinema.com/FilmImages/13/4/39054/shaunstill.jpg", Trailer: "filmId=39054&fid=19142&mid=17557&mtid=trl&fti=Shau…ovie%3a+Farmageddon+-+Teaser+Trailer&pid=EVERYMAN", OneSheet: "http://images.mymovies.net/images/film/cin/350x522/fid19142.jpg"}
// Order: 0
// ReleaseDate: "2019-10-18T00:00:00"
// RunTime: "87"
// Sessions: (8) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
// Synopsis: "Strange lights over the quiet town of Mossingham herald the arrival of a mystery visitor from far across the galaxy... but at nearby Mossy Bottom Farm, Shaun has other things on his mind, as his mischievous schemes are continually thwarted by an exasperated Bitzer.
// ↵
// ↵When an impish and adorable alien with amazing powers crash-lands near Mossy Bottom Farm, Shaun soon sees an opportunity for alien-powered fun and adventure, setting off on a mission to shepherd the intergalactic visitor home before a sinister organisation can capture her... can Shaun and the flock avert Farmageddon on Mossy Bottom Farm before it's too late?
// ↵
// ↵Hold on to your seats as we blast off on an exciting and heart-warming sci-fi comedy adventure that takes us from Mossy Bottom all the way into deep space, via a car wash!"
// Teaser: "When an impish and adorable alien with amazing powers crash-lands near Mossy Bottom Farm, Shaun soon sees an opportunity for alien-powered fun and adventure, setting off on a mission to shepherd the intergalactic visitor home."
// Title: "Shaun The Sheep Movie: Farmageddon"
// Trailer: "filmId=39054&fid=19142&mid=18244&mtid=trl&fti=Shaun+The+Sheep+Movie%3a+Farmageddon&mti=Shaun+The+Sheep+Movie%3a+Farmageddon+-+Trailer+2&pid=EVERYMAN"

export default FilmItem;
