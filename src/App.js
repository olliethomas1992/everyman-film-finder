import React, { useState, useReducer, useContext } from 'react';
import {
    Box,
    Button,
    Heading,
    Grommet,
    Collapsible,
    ResponsiveContext,
    Layer
} from 'grommet';
import { FormClose } from 'grommet-icons';
import Films from './containers/Films';
import Context from './context';
import reducer from './reducer';
import Search from './components/Search';
import London from './components/London';

const theme = {
    global: {
        colors: {
            brand: '#228BE6'
        },
        font: {
            family: 'Roboto',
            size: '18px',
            height: '20px'
        }
    }
};

const AppBar = props => (
    <Box
        tag="header"
        direction="row"
        align="center"
        justify="between"
        background="brand"
        pad={{ left: 'medium', right: 'small', vertical: 'small' }}
        elevation="medium"
        style={{ zIndex: '1' }}
        {...props}
    />
);

function App() {
    const [showSidebar, setShowSideBar] = useState(false);
    const initialState = useContext(Context);
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <Grommet theme={theme} full>
            <Context.Provider value={{ state, dispatch }}>
                <ResponsiveContext.Consumer>
                    {size => (
                        <Box fill>
                            <AppBar>
                                <Heading level="3" margin="none">
                                    Everyman Film Finder
                                </Heading>
                                <Search />
                                {/* SIDE BAR BUTTON */}
                                {/* <Button
                                    icon={<Menu />}
                                    onClick={() => setShowSideBar(!showSidebar)}
                                /> */}
                                <London />
                            </AppBar>
                            <Box
                                direction="row"
                                flex
                                overflow={{ horizontal: 'hidden' }}
                            >
                                <Box
                                    // pad={{
                                    //     horizonal: 'large'
                                    // }}
                                    pad="small"
                                    flex
                                >
                                    <Films />
                                </Box>
                                {!showSidebar || size !== 'small' ? (
                                    <Collapsible
                                        direction="horizontal"
                                        open={showSidebar}
                                    >
                                        <Box
                                            flex
                                            width="medium"
                                            background="light-2"
                                            elevation="small"
                                            align="center"
                                            justify="center"
                                        >
                                            sidebar
                                        </Box>
                                    </Collapsible>
                                ) : (
                                    <Layer>
                                        <Box
                                            background="light-2"
                                            tag="header"
                                            justify="end"
                                            align="center"
                                            direction="row"
                                        >
                                            <Button
                                                icon={<FormClose />}
                                                onClick={() =>
                                                    setShowSideBar(!showSidebar)
                                                }
                                            />
                                        </Box>
                                        <Box
                                            fill
                                            background="light-2"
                                            align="center"
                                            justify="center"
                                        >
                                            sidebar
                                        </Box>
                                    </Layer>
                                )}
                            </Box>
                        </Box>
                    )}
                </ResponsiveContext.Consumer>
            </Context.Provider>
        </Grommet>
    );
}

export default App;
