import axios from 'axios';

export const baseURL = 'https://lora-fiets-tracker-marcopolo.loca.lt';

const instance = axios.create({
	baseURL: baseURL
});

export default instance;
