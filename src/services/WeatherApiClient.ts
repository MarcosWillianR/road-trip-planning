import axios from 'axios';

const weatherAPI = axios.create({
  baseURL: 'http://api.openweathermap.org/data/2.5',
  timeout: 3000,
});

export default weatherAPI;
