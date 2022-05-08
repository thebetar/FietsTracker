import axios from 'axios';

export const baseURL = 'https://lora-fiets-tracker-marcopolo-amsterdam.loca.lt'; // 'http://h2958229.stratoserver.net:3001/';

const instance = axios.create({
	baseURL: baseURL
});

export default instance;
