import { useContext, useEffect } from 'react';
import { LoginContext } from '../context/LoginContext';

export default function ResolveAuthScreen() {
	const {
		actions: { autoLogin }
	} = useContext(LoginContext) as LoginContext;

	useEffect(() => {
		autoLogin();
	}, []);

	return null;
}
