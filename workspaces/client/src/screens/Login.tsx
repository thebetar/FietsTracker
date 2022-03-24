import { useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Input, Button } from 'react-native-elements';
import axios from '../../axios';
import { LoginContext, User } from '../context/LoginContext';

export default function LoginScreen({ navigation }: any) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [controlPassword, setControlPassword] = useState('');
	const [loginToggle, setLoginToggle] = useState(true);

	const {
		actions: { login, logout }
	} = useContext(LoginContext) as LoginContext;

	async function loginAttempt(type: string) {
		try {
			if (type === 'signup' && password !== controlPassword) {
				throw 'Wachtwoorden komen niet overeen';
			}

			const { data } = await axios.post(`/auth/${type}`, {
				email,
				password
			});

			if (data.token) {
				const { token, user } = data;
				(axios.defaults.headers as any)['authorization'] = token;
				login(user);
				navigation.navigate('Maps');
				return;
			}
			throw 'Er ging iets fout';
		} catch (error: any) {
			if (typeof error === 'string') {
				alert(error);
			} else {
				alert('Verkeerde inloggegevens');
			}
			logout();
		}
	}

	return (
		<View style={styles.formContainer}>
			<Card>
				<Card.Title h3>Inloggen</Card.Title>
				<Card.Divider />
				<Input
					onChangeText={setEmail}
					leftIcon={{ name: 'email' }}
					placeholder="Email	"
				/>
				<Input
					onChangeText={setPassword}
					leftIcon={{ name: 'lock' }}
					placeholder="Wachtwoord"
					secureTextEntry={true}
				/>
				{!loginToggle ? (
					<Input
						onChangeText={setControlPassword}
						leftIcon={{ name: 'lock' }}
						placeholder="Controle wachtwoord"
						secureTextEntry={true}
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
		backgroundColor: '#4287f5',
		marginVertical: 4
	},
	secondary: {
		borderColor: '#018786',
		backgroundColor: '#03DAC6'
	}
});
