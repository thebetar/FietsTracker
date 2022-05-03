import { createContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '../../axios';

export type LoginContext = {
	loggedIn: boolean;
	user: User;
	actions: {
		login: (
			email: string,
			password: string,
			callback?: () => void
		) => Promise<void>;
		signup: (
			email: string,
			password: string,
			controlPassword: string,
			callback?: () => void
		) => Promise<void>;
		logout: () => Promise<void>;
		autoLogin: () => Promise<void>;
	};
	error: string;
};

export type User = {
	id: string;
	email: string;
	password: string;
};

export const LoginContext = createContext({});

export default function LoginProvider({ children, navigation }: any) {
	const [loggedIn, setLoggedIn] = useState(false);
	const [user, setUser] = useState({});
	const [error, setError] = useState('');

	async function login(
		email: string,
		password: string,
		callback: () => void
	): Promise<void> {
		try {
			const { data } = await axios.post('/auth/login', {
				email,
				password
			});

			if (!data.token) {
				throw 'Onjuiste inloggegevens.';
			}

			handleSuccess(data);

			if (callback) {
				callback();
			}
		} catch (error) {
			handleError(error);
		}
	}

	async function signup(
		email: string,
		password: string,
		controlPassword: string,
		callback: () => void
	): Promise<void> {
		try {
			if (password !== controlPassword) {
				throw 'Wachtwoorden komen niet overeen';
			}

			const { data } = await axios.post('/auth/signup', {
				email,
				password
			});

			if (!data.token) {
				throw 'Er is iets fout gegaan bij het aanmaken van uw account.';
			}

			handleSuccess(data);

			if (callback) {
				callback();
			}
		} catch (error) {
			handleError(error);
		}
	}

	async function logout() {
		await AsyncStorage.clear();

		setLoggedIn(false);
		setUser({});
	}

	async function autoLogin() {
		const token = await AsyncStorage.getItem('token').catch(console.error);

		if (token) {
			(axios.defaults.headers as any)['authorization'] = token;
			setLoggedIn(true);

			const user = (await AsyncStorage.getItem('user')) as string;
			setUser(JSON.parse(user));
		}
	}

	function handleError(error: any) {
		if (typeof error === 'string') {
			setError(error);
		} else {
			setError('Verkeerde inloggegevens');
		}
		console.error(error);
		logout();
	}

	async function handleSuccess(data: {
		token: string;
		user: User;
	}): Promise<void> {
		const { token, user } = data;
		(axios.defaults.headers as any)['authorization'] = token;

		await AsyncStorage.setItem('token', token).catch(console.error);
		await AsyncStorage.setItem('user', JSON.stringify(user)).catch(
			console.error
		);

		setError('');
		setUser(user);
		setLoggedIn(true);
	}

	return (
		<LoginContext.Provider
			value={
				{
					loggedIn,
					user,
					error,
					actions: { signup, login, logout, autoLogin }
				} as LoginContext
			}
		>
			{children}
		</LoginContext.Provider>
	);
}
