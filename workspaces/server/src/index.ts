import express from 'express';
import cors from 'cors';
import localtunnel from 'localtunnel';
import UsersRouter from './routes/users/index';
import AuthRouter from './routes/auth/index';
import TrackersRouter from './routes/trackers/index';
import AuthMiddleware from './middleware/auth';
import PrismaConnection from './services/prisma';
import { config as dotEnvConfig } from 'dotenv';

dotEnvConfig();

const PORT = 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', AuthRouter);
app.use('/users', AuthMiddleware, UsersRouter);
app.use('/trackers', AuthMiddleware, TrackersRouter);

app.use('*', (req, res) => {
	res.send('Server is working');
});

app.listen(PORT || 3000, async () => {
	PrismaConnection.init();

	console.log(`App running on port ${PORT || 3000}`);

	if (process.env.DEV === 'true') {
		return;
	}

	await openTunnel();
});

async function openTunnel() {
	const tunnel = await localtunnel({
		port: PORT || 3000,
		subdomain: 'lora-fiets-tracker-marcopolo'
	});

	console.log(`Localtunnel running on ${tunnel.url}`);

	tunnel.on('close', () => {
		console.log('Localtunnel closed');
	});
}
