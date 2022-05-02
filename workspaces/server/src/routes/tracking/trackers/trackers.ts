import fs from 'fs';
import { Request, Response } from 'express';
import trackers from './mocks/trackers-mock.json';

export default class TrackersRouter {
	static getTrackers(req: Request, res: Response) {
		res.json({ trackers });
	}

	static getTracker(req: Request, res: Response) {
		if (req.params.id) {
			res.json({
				tracker: trackers.find(
					(tracker) => tracker.id === req.params.id
				)
			});
		} else {
			res.status(400).json({ message: 'No id passed' });
		}
	}

	static putTracker(req: Request, res: Response) {
		if (req.params.id) {
			const newTrackers = [
				trackers.filter((tracker) => tracker.id !== req.params.id),
				req.body
			];
			fs.writeFileSync(
				`./mocks/trackers-mock.json`,
				JSON.stringify(newTrackers)
			);

			res.json({ trackers: newTrackers });
		} else {
			res.status(400).json({ message: 'No id passed' });
		}
	}
}
