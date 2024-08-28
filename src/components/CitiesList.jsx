import React, { useState } from 'react';
import { Card, CardContent, Typography, Grid, Accordion, AccordionSummary, AccordionDetails, CardActions } from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const CitiesList = ({ cities }) => {
    return (
        <Grid container spacing={2}>
            {cities.map((city, index) => (
                <CardExpandibleComponent city={city} key={city.display + index} />
            ))}
        </Grid>
    );
};
const CardExpandibleComponent = ({ city }) => {
    const [expanded, setExpanded] = useState(null);

    const handleAccordionChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : null);
    };

    return (
        <Grid item xs={12} sm={6} md={6 } key={city.id}>
            <Card sx={{ minWidth: 250  }}>
                <CardContent>
                    <Grid item xs={12}>
                    {city?.weather[0]?.icon ?
                        <img src={`https://openweathermap.org/img/wn/${city?.weather[0]?.icon}@2x.png`} alt="" srcset="" />
                        : null
                    }
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h5" component="h2">
                            {city?.city?.display}
                        </Typography>
                        <Typography color="textSecondary">
                            {city?.city?.state}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant='h4' component="h4">
                            {city?.weather[0]?.temp}°C
                        </Typography>
                    </Grid>
                </CardContent>
                <CardActions>
                    <Accordion expanded={expanded === city.id} onChange={handleAccordionChange(city.id)} elevation={0}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>More information by days: </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <TableContainer>
                                <Table 
                                    sx={{ maxWidth:  150, width: "100%" }} 
                                    size="small" 
                                    options={{ search: false, paging: false, rowStyle: { height: 6, fontSize:10 } }}
                                    aria-label="Table of temperatures, avg, min and max"
                                    >
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Date/Time</TableCell>
                                            <TableCell align="right">Avg</TableCell>
                                            <TableCell align="right">Min</TableCell>
                                            <TableCell align="right">Max</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {city?.weather?.map((row) => (
                                            <TableRow
                                                key={row.temp + row.date}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {row.date}
                                                </TableCell>
                                                <TableCell align="right">{row.temp} °C</TableCell>
                                                <TableCell align="right">{row.temp_min} °C</TableCell>
                                                <TableCell align="right">{row.temp_max} °C</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </AccordionDetails>
                    </Accordion>
                </CardActions>
            </Card>

        </Grid>
    );
};

export default CitiesList;