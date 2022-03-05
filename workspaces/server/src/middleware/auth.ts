import jwt from 'jsonwebtoken';
import DbConnection from '../modules/db';
import { User } from '../types';

export default async function AuthMiddleware(req, res, next): Promise<void> {
	try {
		if (req.headers['authorization']) {
			const token = req.headers['authorization'];
			const decodedToken = jwt.decode(
				token,
				process.env.TOKEN_SECRET as any
			) as any;

			if (!(decodedToken.email && decodedToken.password)) {
				throw 'Token does not contain the right info';
			}
			const user = (await DbConnection.query(
				`SELECT * FROM users WHERE email = "${decodedToken.email}" AND password = "${decodedToken.password}"`
			)) as User[];
			if (user.length === 0) {
				throw 'Email in token not found!';
			}
			next();
		} else {
			res.status(403).json({
				message: 'No token provided'
			});
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: 'Something went wrong'
		});
	}
}
