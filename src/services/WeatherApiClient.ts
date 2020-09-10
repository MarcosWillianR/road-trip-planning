import axios from 'axios';

const weatherAPI = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
});

export default weatherAPI;
