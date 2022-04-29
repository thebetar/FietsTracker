import jwt from 'jsonwebtoken';
import PrismaConnection from '../../services/prisma';
import { compare, encrypt } from '../../services/encrypt';
import { User } from '../../types';

export default class AuthRouter {
	static generateAccessToken(user: User) {
		return jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: '30m' });
	}

	static async login(req, res) {
		try {
			if (req.body && req.body.email && req.body.password) {
				const { email, password } = req.body;

				const user = (await PrismaConnection.client.user.findFirst({
					where: {
						email: email.toLowerCase()
					}
				})) as User;

				if (user && (await compare(password.trim(), user.password))) {
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

				const checkUser = (await PrismaConnection.client.user.findFirst(
					{
						where: {
							email: email.toLowerCase()
						}
					}
				)) as User;

				if (checkUser) {
					res.status(400).json({ message: 'Users already exists' });
					return;
				}

				const user = {
					email,
					password: await encrypt(password)
				};
				const result = (await PrismaConnection.client.user.create({
					data: user
				})) as User;

				res.status(200).json({
					token: AuthRouter.generateAccessToken(result),
					user: result
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
