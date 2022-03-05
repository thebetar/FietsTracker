import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-elements';
import axios from '../axios';

export default function Drawer() {
	function logout() {
		(axios.defaults.headers as any)['authorization'] = '';
	}

	return (
		<View style={styles.container}>
			<Text h3>Menu</Text>
			<Button
				title={'Uitloggen'}
				onPress={logout}
				buttonStyle={{
					...styles.button,
					...styles.primary
				}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginTop: 60,
		alignItems: 'center',
		justifyContent: 'flex-start',
		padding: 16
	},
	button: {
		width: 120,
		height: 40,
		fontSize: 18,
		padding: 4,
		borderRadius: 12
	},
	primary: {
		backgroundColor: '#4287f5',
		borderColor: '#244b8a',
		borderWidth: 1
	}
});
