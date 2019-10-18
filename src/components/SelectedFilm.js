import React, { useContext } from 'react';
import { Box, Image, Heading, Paragraph, ResponsiveContext } from 'grommet';
import context from '../context';

const SelectedFilm = ({ film }) => {
    const { state } = useContext(context);
    const selectedFilm = state.filmsById[film];

    if (!selectedFilm) return null;

    const div = document.createElement('div');
    div.innerHTML = selectedFilm.Teaser;
    const filmText = div.textContent || div.innerText || '';

    return (
        <div>
            <ResponsiveContext.Consumer>
                {size => (
                    <Box
                        direction={size === 'small' ? 'column' : 'row'}
                        flex
                        overflow={{ horizontal: 'hidden' }}
                        pad="large"
                        margin="small"
                        border="bottom"
                        justify="center"
                        align="center"
                    >
                        <Box height="261px" width="175px">
                            <Image
                                height="261px"
                                width="175px"
                                fit="cover"
                                alt={selectedFilm.Title}
                                src={
                                    selectedFilm.Img ||
                                    selectedFilm.MediaItems.QuadStill ||
                                    'https://via.placeholder.com/522'
                                }
                            />
                        </Box>
                        <Box
                            pad={{
                                horizontal: 'medium'
                            }}
                        >
                            <Heading level="3">{selectedFilm.Title}</Heading>
                            {size !== 'small' && (
                                <Paragraph>{filmText}</Paragraph>
                            )}
                        </Box>
                    </Box>
                )}
            </ResponsiveContext.Consumer>
        </div>
    );
};

export default SelectedFilm;
