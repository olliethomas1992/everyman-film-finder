import React from 'react';
import { Button, TableCell, Box } from 'grommet';
import { map, kebabCase } from 'lodash';

const TimesList = ({ times }) => (
    <TableCell scope="row">
        {map(times, (time, index) => {
            const sTime = time.StartTime.split(' ');
            if (time.SoldOut) return null;
            return (
                <Box key={index} pad="xsmall">
                    <Button
                        fill="horizontal"
                        primary
                        label={`${sTime[0]}${sTime[1]}`}
                        href={`https://www.everymancinema.com/Booking/${kebabCase(
                            time.CinemaName
                        )}/${time.Scheduleid}`}
                        target="_blank"
                    />
                </Box>
            );
        })}
    </TableCell>
);

export default TimesList;
