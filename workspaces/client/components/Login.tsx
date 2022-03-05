import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Input, Button } from 'react-native-elements';
import axios from '../axios';

export default function Login({ login }: { login: () => void }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	function handleChange(text: string, type: string) {
		if (type === 'email') {
			setEmail(text);
		}
		if (type === 'password') {
			setPassword(text);
		}
	}

	async function loginAttempt() {
		try {
			const { data } = await axios.post('/auth/login', {
				email,
				password
			});

			if (data.token) {
				(axios.defaults.headers as any)['authorization'] = data.token;
				login();
				return;
			}
			throw 'Geen token gekregen';
		} catch (error: any) {
			console.error(error);
			alert('Verkeerde gegevens...');
		}
	}

	return (
		<View style={styles.formContainer}>
			<Card>
				<Card.Title h3>Login</Card.Title>
				<Card.Divider />
				<Input
					onChangeText={(text) => handleChange(text, 'email')}
					leftIcon={{ name: 'email' }}
					placeholder="Email"
				/>
				<Input
					onChangeText={(text) => handleChange(text, 'password')}
					leftIcon={{ name: 'lock' }}
					placeholder="Wachtwoord"
				/>
				<Button
					title={'Inloggen'}
					buttonStyle={{
						...styles.button
					}}
					onPress={loginAttempt}
				/>
			</Card>
		</View>
	);
}

const styles = StyleSheet.create({
	formContainer: {
		height: '80%',
		width: '95%',
		display: 'flex',
		justifyContent: 'center'
	},
	button: {
		padding: 8,
		borderColor: '#244b8a',
		borderWidth: 2,
		borderRadius: 14,
		backgroundColor: '#4287f5'
	}
});
