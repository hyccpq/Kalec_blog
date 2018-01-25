import axios from 'axios'


const http = axios.create({
  baseURL:`http://${location.hostname}:${location.port}/api`,
  timeout:5000,
  data:{},
});


export default http;
