export type User = {
	id: string;
	email: string;
	password: string;
};

export type Coords = {
	latitude: number;
	longitude: number;
	altitude?: number;
	date?: string;
};

export type Log = {
	userId: string;
	trackerId: string;
	latitude: number;
	longitude: number;
	altitude?: number;
	date: string;
};

export type Tracker = {
	id: string;
	name?: string;
	type?: string;
	logs?: Coords[];
};
