import { PrismaClient } from '@prisma/client';

export default class PrismaConnection {
	static client: PrismaClient;

	static async init() {
		this.client = new PrismaClient();
	}
}
