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

const SearchBar = ({ persistCityWeather }) => {
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
        const cleanedTemps = clearValues(weather)
        persistCityWeather({ city, weather: cleanedTemps });
        setLoading(false);
    }

    const getCity = async (cityToSearch) => {
        const results = await getCityInformation(cityToSearch);
        const city = results?.find(city => city.result_type.toLowerCase() === "city");
        return city;
    }

    const getWeather = async (lat, long) => await getCityForecast(lat, long);

    // 1. Obtener lista temperaturas
    // 2. Iterar lista temperaturas y comparar si son correspondientes a sus dias
    // 3. Guardar por solo fechas conincientes en un arreglo los objetos del clima
    // 4. Iterar en el nuevo arreglo, usar Math.min(arr) para min, Math.max(arr) para maxima y reduce para temperatura promedio
    // 5. Regresar un objeto con llave del dia y guardarlo en un arreglo final
    // 6. Iterar el proceso por cada dia detectado en arreglo hasta finalizar
    // 7. Regresar arreglo final en persisCityWeather
    const clearValues = (weatherList) => {
        const { list } = weatherList;
        let finalTemps = [];
        let cacheTemps = [];
        let pivotDate = list[0].dt_txt.split(" ")[0];
        list.forEach((weather, index) => {
            // If start date is unique, push it to cache
            if (index === 0 && pivotDate !== list[index + 1]?.dt_txt) {
                cacheTemps.push(weather)
            }
            // Check the next regitry of array exist
            if (list[index + 1]?.dt_txt) {
                // If the next registry is the same date, push it to cache
                if (pivotDate === list[index + 1].dt_txt.split(" ")[0]) {
                    cacheTemps.push(weather)
                } else {
                    // If the next registry is not the same date, calculate the avg, min and max
                    let tmpTempMax = []
                    let tmpTempMin = []
                    const avgTemp = cacheTemps.reduce((acc, weather) => {
                        tmpTempMin.push(weather.main.temp_min)
                        tmpTempMax.push(weather.main.temp_max)
                        return acc + weather.main.temp
                    },0) / cacheTemps.length;
                    const temp = avgTemp.toFixed(2)
                    const temp_min = Math.min(...tmpTempMin)
                    const temp_max = Math.max(...tmpTempMax)
                    finalTemps.push({ date: pivotDate, temp, temp_min, temp_max, icon: weather.weather[0].icon })
                    cacheTemps = [];
                    pivotDate = list[index + 1].dt_txt.split(" ")[0];
                }
            }
        });

        return finalTemps;
    }


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
                            endAdornment: loading ? <SearchIcon style={{ color: 'gray' }} /> : <SearchIcon style={{ color: 'black' }} />,
                        }} />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <Typography variant="caption">Type city that you want know Weather</Typography>
                </Grid>
            </Grid>

        </SearchBarComponent>
    );
};

export default SearchBar;