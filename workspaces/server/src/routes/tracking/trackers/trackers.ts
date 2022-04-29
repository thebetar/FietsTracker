import fs from 'fs';

export default class TrackersRouter {
	static getTrackers(req, res) {
		const data = fs.readFileSync('./mocks/trackers.json', {
			encoding: 'utf8'
		});

		res.json({ trackers: JSON.parse(data) });
	}
}
