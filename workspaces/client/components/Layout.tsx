import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Routes, Route, useNavigate } from 'react-router-native';
import Maps from './Maps';
import Login from './Login';

export default function Layout() {
	const navigate = useNavigate();

	const [loggedIn, setLoggedIn] = useState(false);

	function login() {
		setLoggedIn(true);
		navigate('/maps');
	}

	useEffect(() => {
		navigate('/');
	}, []);

	return (
		<View style={styles.container}>
			<Routes>
				<Route path="/" element={<Login login={login} />} />
				<Route path="/maps" element={<Maps navigate={navigate} />} />
			</Routes>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		height: '85%',
		width: '100%',
		flexDirection: 'column',
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	}
});
