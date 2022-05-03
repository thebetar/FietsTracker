import { Request, Response } from 'express';
import PrismaConnection from '../../services/prisma';
import { Log } from '../../types';

export default class TrackersRouter {
	static async getTrackers(req: Request, res: Response) {
		const userTrackers = await PrismaConnection.client.userTracker.findMany(
			{
				where: { userId: (req as any).user.id }
			}
		);

		const trackers = await PrismaConnection.client.tracker.findMany({
			where: {
				id: {
					in: userTrackers.map((userTracker) => userTracker.trackerId)
				}
			},
			include: {
				logs: true
			}
		});
		res.json({ trackers });
	}

	static async getTracker(req: Request, res: Response) {
		if (req.params.id) {
			const tracker = await PrismaConnection.client.tracker.findFirst({
				where: { id: req.params.id }
			});
			res.json({
				tracker
			});
		} else {
			res.status(400).json({ message: 'No id passed' });
		}
	}

	static async getTrackerCoords(req: Request, res: Response) {
		if (req.params.id) {
			const logs = await PrismaConnection.client.log.findMany({
				where: { trackerId: req.params.id }
			});

			const coords = logs.pop();
			res.json({ coords });
		} else {
			res.status(400).json({ message: 'No id passed' });
		}
	}

	static async putTracker(req: Request, res: Response) {
		if (req.params.id) {
			const tracker = await PrismaConnection.client.tracker.update({
				where: { id: req.params.id },
				data: req.body
			});

			res.json({ tracker });
		} else {
			res.status(400).json({ message: 'No id passed' });
		}
	}
}
