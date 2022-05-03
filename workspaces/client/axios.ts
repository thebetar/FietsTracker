import axios from 'axios';

export const baseURL = 'http://h2958229.stratoserver.net:3001/'; // 'http://lora-fiets-tracker-marcopolo.loca.lt';

const instance = axios.create({
	baseURL: baseURL
});

export default instance;
