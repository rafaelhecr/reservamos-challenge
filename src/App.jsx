import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import SearchBar from './components/SearchBar'
import CitiesList from './components/CitiesList'
import './App.css'


const darkTheme = createTheme({
  palette: {
    mode: 'light',
  },
});


function App() {

  const [cities, setCities] = React.useState([]);

  const persistCityWeather = (cityWeather) => {
    setCities([...cities, cityWeather]);
  }
  console.log(cities)
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className='screen-sizer'>
        <SearchBar persistCityWeather={persistCityWeather}/>
        <CitiesList cities={cities} />
      </div>
    </ThemeProvider>
    
  )
}

export default App
