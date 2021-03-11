const axios = require('axios').default;

const api = axios.create({
  baseURL: 'https://api.tibiadata.com/v2/',
})

// api.interceptors.response.use(console.log);

module.exports = api;