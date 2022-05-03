import { useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Input, Button, Text } from 'react-native-elements';
import { LoginContext, User } from '../context/LoginContext';

export default function LoginScreen() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [controlPassword, setControlPassword] = useState('');
	const [loginToggle, setLoginToggle] = useState(true);

	const {
		error,
		actions: { login, signup }
	} = useContext(LoginContext) as LoginContext;

	function loginAttempt(type: string) {
		if (type === 'login') {
			login(email, password);
		} else if (type === 'signup') {
			signup(email, password, controlPassword);
		}
	}

	return (
		<View style={styles.formContainer}>
			<Card containerStyle={{ width: '90%' }}>
				<Card.Title h3>
					{loginToggle ? 'Inloggen' : 'Maak aan'}
				</Card.Title>
				{error ? (
					<Text h4 style={{ color: 'red', textAlign: 'center' }}>
						{error}
					</Text>
				) : null}
				<Card.Divider />
				<Input
					onChangeText={setEmail}
					leftIcon={{ name: 'email' }}
					placeholder="Email"
				/>
				<Input
					onChangeText={setPassword}
					leftIcon={{ name: 'lock' }}
					placeholder="Wachtwoord"
					secureTextEntry={true}
					autoCapitalize="none"
				/>
				{!loginToggle ? (
					<Input
						onChangeText={setControlPassword}
						leftIcon={{ name: 'lock' }}
						placeholder="Controle wachtwoord"
						secureTextEntry={true}
						autoCapitalize="none"
					/>
				) : null}
				<Button
					title={loginToggle ? 'Inloggen' : 'Maak account aan'}
					buttonStyle={{
						...styles.button
					}}
					onPress={() =>
						loginAttempt(loginToggle ? 'login' : 'signup')
					}
					disabled={
						email.length === 0 ||
						password.length === 0 ||
						(!loginToggle && controlPassword.length === 0)
					}
				/>
				<Button
					title={
						loginToggle
							? 'Maak account aan'
							: 'Ga terug naar inloggen'
					}
					buttonStyle={{
						...styles.button,
						...styles.secondary
					}}
					onPress={() => setLoginToggle(!loginToggle)}
				/>
			</Card>
		</View>
	);
}

export const styles = StyleSheet.create({
	formContainer: {
		height: '100%',
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	},
	button: {
		padding: 8,
		borderColor: '#244b8a',
		borderWidth: 2,
		borderRadius: 14,
		backgroundColor: '#4287f5',
		marginVertical: 4
	},
	secondary: {
		borderColor: '#018786',
		backgroundColor: '#03DAC6'
	}
});
