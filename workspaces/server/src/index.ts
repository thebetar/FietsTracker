import express from 'express';
import cors from 'cors';
import localtunnel from 'localtunnel';

const PORT = 3000;
const app = express();

app.use(cors());

app.get('/', (req, res) => {
	res.send('Server is working');
});

const BASE_LATITUDE = 52.335;
const BASE_LONGITUDE = 4.86;

app.get('/coords', (req, res) => {
	const latitude = BASE_LATITUDE + Math.random() / 12;
	const longitude = BASE_LONGITUDE + Math.random() / 12;

	res.status(200).send({
		latitude,
		longitude
	});
});

app.listen(PORT || 3000, async () => {
	console.log(`App running on port ${PORT || 3000}`);

	const tunnel = await localtunnel({
		port: PORT || 3000,
		subdomain: 'lora-fiets-tracker-marcopolo'
	});

	console.log(`Localtunnel running on ${tunnel.url}`);

	tunnel.on('close', () => {
		console.log('Localtunnel closed');
	});
});
