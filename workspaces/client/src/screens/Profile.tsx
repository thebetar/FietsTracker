import { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Card, Text } from 'react-native-elements';
import { LoginContext } from '../context/LoginContext';
import axios from '../../axios';

export default function ProfileScreen() {
	const {
		user,
		actions: { logout }
	} = useContext(LoginContext) as LoginContext;

	async function deleteUser() {
		try {
			await axios.delete(`/user/${user.id}`);

			logout();
		} catch (error) {
			console.error(error);
			alert('Er ging iets fout bij het verwijderen');
		}
	}

	return (
		<View>
			<Card
				wrapperStyle={{
					justifyContent: 'center',
					alignItems: 'center'
				}}
			>
				<Card.Title>
					<Text h2>Profielgegevens</Text>
				</Card.Title>
				<Card.Divider />
				<Card.Image
					source={{ uri: 'https://loremflickr.com/300/300' }}
					style={{
						padding: 2,
						borderWidth: 4,
						borderColor: 'black',
						width: 200,
						height: 200,
						marginVertical: 10,
						borderRadius: 300
					}}
				/>
				<Text style={{ fontSize: 18 }}>
					<Text style={{ fontWeight: 'bold' }}>Email:</Text>{' '}
					{user.email}
				</Text>
			</Card>
			<Button
				title="Verwijder gebruiker"
				containerStyle={styles.deleteButtonContainer}
				buttonStyle={styles.deleteButton}
				onPress={() => deleteUser()}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	deleteButtonContainer: {
		margin: 10
	},
	deleteButton: {
		backgroundColor: 'crimson'
	}
});
