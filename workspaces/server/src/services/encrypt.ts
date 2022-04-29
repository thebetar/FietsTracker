import bcrypt from 'bcrypt';

const saltRounds = 10;

export async function encrypt(password: string): Promise<string> {
	const hash = await bcrypt.hash(password, saltRounds);
	return hash;
}

export async function compare(
	password: string,
	hash: string
): Promise<boolean> {
	return await bcrypt.compare(password, hash);
}

export default { encrypt, compare };
