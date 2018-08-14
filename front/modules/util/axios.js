import axios from 'axios'
let http;
if(typeof window !== 'undefined'){
  http = axios.create({
    baseURL:`${location.protocol}//${location.hostname}:${location.port}/api`,
    timeout:5000,
    data:{},
  });
} else {
  http = axios.create({
    // baseURL:'https://www.kalecgos.top/api/',
	baseURL:'http://localhost:5678/api/',
    timeout:5000,
    data:{},
  });
}



export default http;
