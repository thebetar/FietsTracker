import sqlite3, { Database } from 'sqlite3';

export default class DbConnection {
	static db = null;

	static init() {
		this.db = new sqlite3.Database('./fietstracker.db', (error) => {
			if (error) {
				return console.error('Connecting to DB failed...');
			}

			console.log('Connected to SQLite3 database!');
		}) as Database;
	}

	static async query(str: string) {
		return new Promise((resolve, reject) => {
			const result = [];
			this.db.serialize(() => {
				this.db.each(
					str,
					(error, row) => {
						if (error) {
							throw error;
						}

						result.push(row);
						console.log(`Query: ${new Date().toISOString()}`);
						console.table(row);
					},
					(error) => {
						if (error) {
							reject(error);
						} else {
							resolve(result);
						}
					}
				);
			});
		});
	}

	static async run(str: string) {
		return new Promise((resolve, reject) => {
			this.db.run(str, (error) => {
				if (error) {
					reject(error);
				} else {
					resolve('Success');
				}
			});
		});
	}

	static close() {
		this.db.close();
	}
}
