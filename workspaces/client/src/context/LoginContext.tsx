import { createContext, useState } from 'react';

export type LoginContext = {
	loggedIn: boolean;
	user: User;
	actions: {
		login: (user: User) => void;
		logout: () => void;
	};
};

export type User = {
	email: string;
};

export const LoginContext = createContext({});

export default function LoginProvider({ children, navigation }: any) {
	const [loggedIn, setLoggedIn] = useState(false);
	const [user, setUser] = useState({});

	function login(user: User) {
		setLoggedIn(true);
		console.log('User', user);
		setUser(user);
	}

	function logout() {
		setLoggedIn(false);
		setUser({});
	}

	return (
		<LoginContext.Provider
			value={
				{ loggedIn, user, actions: { login, logout } } as LoginContext
			}
		>
			{children}
		</LoginContext.Provider>
	);
}
