import React, { useContext } from 'react';
import {
    Heading,
    Table,
    TableHeader,
    TableRow,
    TableCell,
    TableBody,
    Box
} from 'grommet';
import { isToday, parseISO, isTomorrow } from 'date-fns';
import context from '../context';
import TimesList from './TimesList';

const Showing = ({ showing }) => {
    const { state } = useContext(context);

    return (
        <Box overflow="scroll">
            <Heading level="3">
                {state.cinemas[showing.cinemaId].CinemaName}
            </Heading>
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
