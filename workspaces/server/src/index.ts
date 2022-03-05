import express from 'express';
import cors from 'cors';
import localtunnel from 'localtunnel';
import UsersRouter from './routes/users/index';
import TrackingRouter from './routes/tracking/index';
import AuthRouter from './routes/auth/index';
import AuthMiddleware from './middleware/auth';
import DbConnection from './modules/db';
import { config as dotEnvConfig } from 'dotenv';

dotEnvConfig();

const PORT = 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
	res.send('Server is working');
});

app.use('/auth', AuthRouter);
app.use('/users', AuthMiddleware, UsersRouter);
app.use('/tracking', AuthMiddleware, TrackingRouter);

app.listen(PORT || 3000, async () => {
	DbConnection.init();

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
