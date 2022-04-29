import { Coords } from '../../types';
export default class TrackingRouter {
	static getCoords(req, res) {
		const BASE_LATITUDE = 52.335;
		const BASE_LONGITUDE = 4.86;

		const latitude = BASE_LATITUDE + Math.random() / 12;
		const longitude = BASE_LONGITUDE + Math.random() / 12;

		const coords = { latitude, longitude } as Coords;

		res.status(200).send(coords);
	}
}
