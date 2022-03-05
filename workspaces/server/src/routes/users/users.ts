import DbConnection from '../../modules/db';
import { v4 } from 'uuid';
import { encrypt } from '../../modules/encrypt';

export default class UsersRouter {
	static async getUsers(req, res) {
		try {
			const users = await DbConnection.query('SELECT * FROM users');

			if (users) {
				res.status(200).json(users);
				return;
			}
			res.status(400).json({
				message: 'No users found'
			});
		} catch (error) {
			console.error(error);
			res.status(500).json({
				messsage: 'Something went wrong'
			});
		}
	}
}
