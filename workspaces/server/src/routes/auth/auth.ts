import jwt from 'jsonwebtoken';
import { v4 } from 'uuid';
import DbConnection from '../../modules/db';
import { compare, encrypt } from '../../modules/encrypt';
import { User } from '../../types';

export default class AuthRouter {
	static generateAccessToken(user: User) {
		return jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: '30m' });
	}

	static async login(req, res) {
		try {
			if (req.body && req.body.email && req.body.password) {
				const { email, password } = req.body;

				const users = (await DbConnection.query(
					`SELECT * FROM users WHERE email = "${email}"`
				)) as User[];

				if (
					users.length === 1 &&
					(await compare(password.trim(), users[0].password))
				) {
					const user = users[0];

					res.status(200).json({
						token: AuthRouter.generateAccessToken(user),
						user
					});
				} else {
					res.status(400).json({ message: 'Gegevens bestaan niet' });
				}
			} else {
				res.status(400).json({
					message: 'Invalid request'
				});
			}
		} catch (error) {
			console.error(error);
			res.status(500).json({
				message: 'Something went wrong'
			});
		}
	}

	static async signup(req, res) {
		try {
			if (req.body && req.body.email && req.body.password) {
				const { email, password } = req.body;

				const users = (await DbConnection.query(
					`SELECT * FROM users WHERE email = "${email}"`
				)) as User[];

				if (users.length !== 0) {
					res.status(400).json({ message: 'Users already exists' });
					return;
				}

				const user = {
					id: v4(),
					email: email,
					password: await encrypt(password)
				};
				await DbConnection.run(
					`INSERT INTO users VALUES ("${user.id}", "${user.email}", "${user.password}")`
				);

				res.status(200).json({
					token: AuthRouter.generateAccessToken(user),
					user
				});
			} else {
				res.status(400).json({
					message: 'Invalid request'
				});
			}
		} catch (error) {
			console.error(error);
			res.status(500).json({
				message: 'Something went wrong'
			});
		}
	}
}
