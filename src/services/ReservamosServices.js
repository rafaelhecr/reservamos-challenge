import axios from "axios";

async function getCityInformation(city){
    try {
        const response = await axios.get(`https://search.reservamos.mx/api/v2/places?q=${city}`);
        return response.data;
    } catch (error) {
        console.log("Error getting cities from Reservamos API: ", error);
        return [];
    }
}

export { getCityInformation };