import { User } from './../../types';
import { Request, Response } from 'express';
import PrismaConnection from '../../services/prisma';

export default class UsersRouter {
	static async getUsers(req: Request, res: Response): Promise<void> {
		try {
			const users =
				(await PrismaConnection.client.user.findMany()) as User[];

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

	static async deleteUser(req, res) {
		try {
			const user = await PrismaConnection.client.user.findFirst({
				where: { id: req.params.id }
			});

			if (user.id !== req.user.id) {
				res.status(400).json({
					message:
						'You are trying to delete another use than your own'
				});
				return;
			}

			await PrismaConnection.client.user.delete({
				where: {
					id: req.params.id
				}
			});

			res.status(200).json({ message: 'Successfully deleted' });
		} catch (error) {
			console.error(error);
			res.status(500).json({
				messsage: 'Something went wrong, deleting user'
			});
		}
	}
}
