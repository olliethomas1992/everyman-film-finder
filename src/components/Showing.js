import React, { useContext } from 'react';
import {
    Heading,
    Table,
    TableHeader,
    TableRow,
    TableCell,
    TableBody,
    Box,
    Anchor
} from 'grommet';
import { isToday, parseISO, isTomorrow } from 'date-fns';
import mobile from 'is-mobile';
import context from '../context';
import TimesList from './TimesList';

const Showing = ({ showing }) => {
    const { state } = useContext(context);
    const cinema = state.cinemas.byId[showing.id];

    const isMobile = process.browser && mobile();

    const cityLink = `https://citymapper.com/directions?endcoord=${cinema.latitude}%2C${cinema.longitude}&endname=Everyman+${cinema.cinemaName}`;
    const gMapsLink = `https://www.google.com/maps/dir/?api=1&destination=${
        cinema.latitude
    },${cinema.longitude}/Everyman+${cinema.cinemaName
        .split(' ')
        .join('+')}&origin=${state.origin.latitude},${state.origin.longitude}`;

    return (
        <Box overflow="scroll">
            <Box direction="column" flex="shrink">
                <Anchor
                    href={isMobile ? cityLink : gMapsLink}
                    primary
                    target="_blank"
                >
                    <Heading level="3">
                        {cinema.city
                            ? `${cinema.cinemaName} - ${cinema.city}`
                            : cinema.cinemaName}
                    </Heading>
                </Anchor>
            </Box>
            <Table>
                <TableHeader>
                    <TableRow>
                        {showing.sessions.map((showing, index) => {
                            const today = isToday(parseISO(showing.NewDate));
                            const tomorrow = isTomorrow(
                                parseISO(showing.NewDate)
                            );
                            return (
                                <TableCell
                                    align="center"
                                    key={index}
                                    scope="col"
                                    border="bottom"
                                >
                                    {(today && 'Today') ||
                                        (tomorrow && 'Tomorrow') ||
                                        showing.DisplayDate}
                                </TableCell>
                            );
                        })}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        {showing.sessions.map((showing, index) => (
                            <TimesList key={index} times={showing.Times} />
                        ))}
                    </TableRow>
                </TableBody>
            </Table>
        </Box>
    );
};

export default Showing;
