import React, { useState, useReducer, useContext } from 'react';
import {
    Box,
    Button,
    Grommet,
    Collapsible,
    ResponsiveContext,
    Layer
} from 'grommet';
import { Close, Menu } from 'grommet-icons';
import Logo from './logo.png';
import Films from './containers/Films';
import Context from './context';
import reducer from './reducer';
import Search from './components/Search';
import Background from './background.jpg';

const theme = {
    global: {
        colors: {
            brand: '#000'
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
                                <img
                                    height="50"
                                    src={Logo}
                                    alt="Everyman Film Finder"
                                    style={{
                                        marginRight: '25px'
                                    }}
                                />
                                <Box
                                    flex="grow"
                                    direction="row"
                                    align="center"
                                    justify="center"
                                >
                                    <Search />
                                </Box>
                                {/* SIDE BAR BUTTON */}
                                {/* <Button
                                    icon={<Menu />}
                                    onClick={() => setShowSideBar(!showSidebar)}
                                /> */}
                            </AppBar>
                            <Box
                                direction="row"
                                flex
                                overflow={{ horizontal: 'hidden' }}
                            >
                                <Box
                                    pad="small"
                                    flex="grow"
                                    overflow="scroll"
                                    style={{
                                        backgroundImage: `url(${Background})`,
                                        backgroundRepeat: 'no-repeat',
                                        backgroundAttachment: 'fixed'
                                    }}
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
                                                icon={<Close />}
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
