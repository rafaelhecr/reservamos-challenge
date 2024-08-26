import React from 'react';
import PropTypes from 'prop-types';
import { Grid, styled, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { getCityInformation } from '../services/ReservamosServices';
import { getCityForecast } from '../services/OpenWeatherServices';

const SearchBarComponent = styled('form')({
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
    width: '100%',
    margin: "20px 0 20px 0"
});

const SearchBar = ({persistCityWeather}) => {
    SearchBar.propTypes = {
        persistCityWeather: PropTypes.func.isRequired
    }

    const [loading, setLoading] = React.useState(false);

    const search = async (event) => {
        event.preventDefault();
        setLoading(true);
        const cityToSearch = event.target.search.value;
        const city = await getCity(cityToSearch);
        const weather = await getWeather(city.lat, city.long);
        persistCityWeather({city, weather});
        setLoading(false);
    }

    const getCity = async (cityToSearch) => {
        const results = await getCityInformation(cityToSearch);
        const city = results?.find(city => city.result_type.toLowerCase() === "city");
        return city;
    }

    const getWeather = async (lat, long) =>  await getCityForecast(lat, long);

    return (
        <SearchBarComponent noValidate autoComplete="off" onSubmit={search}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12}>
                    <TextField 
                        id="search" 
                        label="Search" 
                        variant="outlined" 
                        fullWidth type='search'
                        disabled={loading} 
                        InputProps={{
                            endAdornment: loading ? <SearchIcon style={{color: 'gray'}}/> : <SearchIcon style={{color: 'black'}}/>,
                        }}/>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <Typography variant="caption">Type city that you want know Weather</Typography>
                </Grid>
            </Grid>
            
        </SearchBarComponent>
    );
};

export default SearchBar;