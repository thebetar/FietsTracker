import { useContext } from 'react';
import { View } from 'react-native';
import { Card, Text } from 'react-native-elements';
import { LoginContext } from '../context/LoginContext';

export default function ProfileScreen() {
	const { user } = useContext(LoginContext) as LoginContext;

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
		</View>
	);
}
