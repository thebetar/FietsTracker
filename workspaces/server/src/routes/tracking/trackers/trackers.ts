import trackers from './mocks/trackers-mock';

export default class TrackersRouter {
	static getTrackers(req, res) {
		res.json({ trackers });
	}
}
