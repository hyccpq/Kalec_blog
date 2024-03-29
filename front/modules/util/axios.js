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
		baseURL:'http://localhost:8088/api',
		timeout:5000,
		data:{},
	});
}



export default http;
