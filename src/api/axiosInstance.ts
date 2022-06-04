import axios from 'axios';

export const api = axios.create({
  // baseURL: 'http://localhost:3001/'
  baseURL: 'https://vetheal-app.herokuapp.com/'
  // baseURL: 'http://localhost:8000/'
});
